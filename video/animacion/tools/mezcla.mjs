/* Pista de audio del video: grabaciones reales (G.medios con audio) + voz guía de Windows
   solo para las líneas que todavía no se graban (las que no tienen `rec` en guion.js).
   Volumen parejo: cada fragmento se mide (sonoridad integrada, EBU R128) y se lleva a -20 LUFS;
   luego toda la pista pasa por un compresor suave y una normalización final a -16 LUFS (pico -1.5 dB).
   Uso: node tools/mezcla.mjs                  → ../render/audio_mezcla.wav + tabla de volúmenes
        node tools/mezcla.mjs --video=X.mp4    → además pone la pista al video (X_con_audio.mp4) */
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";
import { mkdirSync, writeFileSync, readFileSync, existsSync, rmSync } from "node:fs";

const here = dirname(fileURLToPath(import.meta.url));
globalThis.window = {};
new Function("window", readFileSync(join(here, "..", "js", "nuevo", "guion.js"), "utf8"))(globalThis.window);
const G = globalThis.window.GUION;
const outDir = resolve(here, "..", "..", "render");
const medDir = join(outDir, "medios");
const ttsDir = join(outDir, "voz_pendiente");
const META = -20;
const mmss = (t) => `${Math.floor(t / 60)}:${(t % 60).toFixed(1).padStart(4, "0")}`;
const ff = (args) => spawnSync("ffmpeg", ["-hide_banner", "-nostats", ...args], { encoding: "utf8" });
/* sonoridad integrada (LUFS) de un tramo de un archivo */
const lufs = (f, ss = 0, hasta = null) => {
  const a = ["-ss", String(ss)];
  if (hasta != null) a.push("-to", String(hasta));
  const r = ff([...a, "-i", f, "-af", "ebur128=framelog=quiet", "-f", "null", "-"]);
  const m = /I:\s+(-?[\d.]+) LUFS/.exec(r.stderr.split("Summary:").pop());
  return m ? +m[1] : -70;
};

// 1) voz guía solo para lo que falta grabar
const pend = G.voz.filter((v) => !v.rec);
rmSync(ttsDir, { recursive: true, force: true });
mkdirSync(ttsDir, { recursive: true });
if (pend.length) {
  const limpia = (x) => x.replace(/(\d),(\d{3})/g, "$1$2").replace(/[«»]/g, "").replace(/\bR\b/g, "erre").replace(/ODS/g, "O D S").replace(/MOLEC/g, "Mólec");
  writeFileSync(join(ttsDir, "lineas.json"), JSON.stringify(pend.map((v) => ({ x: limpia(v.x) }))));
  const ps = spawnSync("powershell", ["-NoProfile", "-ExecutionPolicy", "Bypass", "-File", join(here, "voz-guia.ps1"), "-Json", join(ttsDir, "lineas.json"), "-Out", ttsDir], { stdio: "inherit" });
  if (ps.status !== 0) process.exit(1);
}

// 2) cada fragmento, medido y llevado al mismo volumen
const piezas = [];
pend.forEach((v, i) => {
  const f = join(ttsDir, String(i).padStart(2, "0") + ".wav");
  // si la voz guía dura más que su espacio en el guion, se acelera un poco (máx. 1.3×) para no pisar lo siguiente
  const len = +spawnSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f], { encoding: "utf8" }).stdout;
  const vel = Math.min(1.3, Math.max(1, len / (v.t1 - v.t0 + 0.4)));
  piezas.push({ f, ss: 0, hasta: null, abs: v.t0, vel, nombre: "voz guía · " + v.x.slice(0, 48) });
});
(G.medios || []).filter((m) => m.audio).forEach((m) => {
  const f = join(medDir, m.src + ".wav");
  if (!existsSync(f)) { console.log("FALTA", f, "→ corre node tools/preparar_medios.mjs"); process.exit(1); }
  piezas.push({ f, ss: m.ss, hasta: m.hasta, abs: m.abs, nombre: m.src });
});
const inputs = [], filtros = [];
let tabla = `inicio  medido   ganancia  fragmento\n`;
piezas.sort((a, b) => a.abs - b.abs).forEach((p, k) => {
  p.lufs = lufs(p.f, p.ss, p.hasta);
  p.gan = Math.max(-20, Math.min(20, META - p.lufs));
  inputs.push("-i", p.f);
  const recorte = p.hasta != null ? `atrim=start=${p.ss}:end=${p.hasta},asetpts=PTS-STARTPTS,afade=t=in:d=0.06,afade=t=out:st=${Math.max(0, p.hasta - p.ss - 0.15)}:d=0.15,` : "";
  filtros.push(`[${k}:a]aresample=48000,aformat=channel_layouts=mono,${recorte}${p.vel > 1.01 ? `atempo=${p.vel.toFixed(3)},` : ""}volume=${p.gan.toFixed(2)}dB,adelay=${Math.round(p.abs * 1000)}:all=1[a${k}]`);
  tabla += `${mmss(p.abs).padStart(6)}  ${p.lufs.toFixed(1).padStart(6)}  ${(p.gan >= 0 ? "+" : "") + p.gan.toFixed(1).padStart(5)} dB  ${p.nombre}\n`;
});
const k = piezas.length;
const crudo = join(outDir, "audio_mezcla_crudo.wav");
const mix = filtros.join(";") + ";" + Array.from({ length: k }, (_, i) => `[a${i}]`).join("") +
  `amix=inputs=${k}:normalize=0,acompressor=threshold=-24dB:ratio=2.5:attack=8:release=220:makeup=1,apad=whole_dur=${G.dur}[m]`;
let r = spawnSync("ffmpeg", ["-y", "-loglevel", "error", ...inputs, "-filter_complex", mix, "-map", "[m]", "-ar", "48000", "-t", String(G.dur), crudo], { stdio: "inherit" });
if (r.status !== 0) process.exit(1);

// 3) normalización final en dos pasadas (lineal: no cambia la dinámica)
const med = ff(["-i", crudo, "-af", "loudnorm=I=-16:TP=-1.5:LRA=7:print_format=json", "-f", "null", "-"]).stderr;
const j = JSON.parse(med.slice(med.lastIndexOf("{"), med.lastIndexOf("}") + 1));
const wav = join(outDir, "audio_mezcla.wav");
r = spawnSync("ffmpeg", ["-y", "-loglevel", "error", "-i", crudo, "-af",
  `loudnorm=I=-16:TP=-1.5:LRA=7:measured_I=${j.input_i}:measured_TP=${j.input_tp}:measured_LRA=${j.input_lra}:measured_thresh=${j.input_thresh}:offset=${j.target_offset}:linear=true`,
  "-ar", "48000", wav], { stdio: "inherit" });
if (r.status !== 0) process.exit(1);
rmSync(crudo, { force: true });

// 4) comprobación: volumen de cada fragmento ya en la pista final
tabla += `\nEn la pista final (cada fragmento debería quedar cerca del mismo valor):\n`;
const fin = piezas.map((p) => { const d = (p.hasta != null ? p.hasta - p.ss : 2.5); const v = lufs(wav, p.abs, p.abs + d); tabla += `${mmss(p.abs).padStart(6)}  ${v.toFixed(1).padStart(6)} LUFS  ${p.nombre}\n`; return v; }).filter((v) => v > -60);
const prom = fin.reduce((a, b) => a + b, 0) / fin.length;
tabla += `\nPromedio ${prom.toFixed(1)} LUFS · rango ${Math.min(...fin).toFixed(1)} a ${Math.max(...fin).toFixed(1)} · pista completa ${lufs(wav).toFixed(1)} LUFS\n`;
writeFileSync(join(outDir, "audio_mezcla_tiempos.txt"), tabla);
console.log(tabla + "\nPista:", wav);

const vopt = process.argv.find((a) => a.startsWith("--video="));
if (vopt) {
  const vid = resolve(outDir, vopt.split("=")[1]);
  const out = vid.replace(/\.mp4$/, "_con_audio.mp4");
  spawnSync("ffmpeg", ["-y", "-loglevel", "error", "-i", vid, "-i", wav, "-map", "0:v", "-map", "1:a", "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-shortest", out], { stdio: "inherit" });
  console.log("Video con audio:", out);
}
