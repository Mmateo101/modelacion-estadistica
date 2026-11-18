/* Voz guía: lee el guion con la voz de Windows para comprobar que cada línea cabe en su tiempo
   y para tener una pista de referencia en el animatic. NO es la voz del video final.
   Uso: node tools/voz-guia.mjs            → ../render/voz_guia.wav + tabla de tiempos
        node tools/voz-guia.mjs --mezclar  → además crea ../render/Animatic_con_voz_guia.mp4 */
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";
import { mkdirSync, writeFileSync, readFileSync, existsSync, rmSync } from "node:fs";

const here = dirname(fileURLToPath(import.meta.url));
globalThis.window = {};
new Function("window", readFileSync(join(here, "..", "js", "nuevo", "guion.js"), "utf8"))(globalThis.window);
const G = globalThis.window.GUION;
const outDir = resolve(here, "..", "..", "render");
const dir = join(outDir, "voz");
rmSync(dir, { recursive: true, force: true });
mkdirSync(dir, { recursive: true });
const limpia = (x) => x.replace(/(\d),(\d{3})/g, "$1$2").replace(/[«»]/g, "").replace(/\bR\b/g, "erre").replace(/ODS/g, "O D S");
writeFileSync(join(dir, "lineas.json"), JSON.stringify(G.voz.map((v) => ({ x: limpia(v.x) }))));
const ps = spawnSync("powershell", ["-NoProfile", "-ExecutionPolicy", "Bypass", "-File", join(here, "voz-guia.ps1"), "-Json", join(dir, "lineas.json"), "-Out", dir], { stdio: "inherit" });
if (ps.status !== 0) process.exit(1);

const dur = (f) => +spawnSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f]).stdout.toString().trim();
const mmss = (t) => `${Math.floor(t / 60)}:${(t % 60).toFixed(1).padStart(4, "0")}`;
let tabla = "inicio  hueco  voz    holgura  línea\n";
const inputs = [], filtros = [];
G.voz.forEach((v, i) => {
  const f = join(dir, String(i).padStart(2, "0") + ".wav");
  const d = dur(f), hueco = v.t1 - v.t0;
  tabla += `${mmss(v.t0).padStart(6)}  ${hueco.toFixed(1).padStart(5)}  ${d.toFixed(1).padStart(5)}  ${(hueco - d >= 0 ? "+" : "") + (hueco - d).toFixed(1).padStart(5)}${hueco - d < -0.3 ? "  ⚠" : "   "}  ${v.x.slice(0, 70)}\n`;
  inputs.push("-i", f);
  filtros.push(`[${i}:a]adelay=${Math.round(v.t0 * 1000)}:all=1[a${i}]`);
});
writeFileSync(join(outDir, "voz_guia_tiempos.txt"), tabla);
console.log(tabla);
const wav = join(outDir, "voz_guia.wav");
const mix = filtros.join(";") + ";" + G.voz.map((_, i) => `[a${i}]`).join("") + `amix=inputs=${G.voz.length}:normalize=0,apad=whole_dur=${G.dur}[m]`;
spawnSync("ffmpeg", ["-y", "-loglevel", "error", ...inputs, "-filter_complex", mix, "-map", "[m]", "-t", String(G.dur), wav], { stdio: "inherit" });
console.log("Voz guía:", wav);
if (process.argv.includes("--mezclar")) {
  const vid = join(outDir, "Animatic_guia.mp4");
  if (!existsSync(vid)) { console.log("Falta Animatic_guia.mp4: corre primero tools/render.mjs"); process.exit(0); }
  const out = join(outDir, "Animatic_con_voz_guia.mp4");
  spawnSync("ffmpeg", ["-y", "-loglevel", "error", "-i", vid, "-i", wav, "-c:v", "copy", "-c:a", "aac", "-b:a", "160k", "-shortest", out], { stdio: "inherit" });
  console.log("Animatic con voz guía:", out);
}
