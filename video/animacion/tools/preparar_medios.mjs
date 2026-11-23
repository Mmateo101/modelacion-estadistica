/* Prepara las grabaciones reales para el video a partir de Video/Grabaciones/ (lista en guion.js → medios).
   Video → media/<src>.mp4 (30 fps, máx. 1280 de ancho, todos los cuadros clave: búsqueda exacta cuadro por cuadro)
   Audio → ../render/medios/<src>.wav (mono 48 kHz, filtro de graves, ruido reducido en Mateo; el volumen se empareja en mezcla.mjs)
   Uso: node tools/preparar_medios.mjs          (solo lo que falta)
        node tools/preparar_medios.mjs --todo   (rehace todo) */
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";
import { mkdirSync, readFileSync, existsSync } from "node:fs";

const here = dirname(fileURLToPath(import.meta.url));
globalThis.window = {};
new Function("window", readFileSync(join(here, "..", "js", "nuevo", "guion.js"), "utf8"))(globalThis.window);
const G = globalThis.window.GUION;
const grab = resolve(here, "..", "..", "Grabaciones");
const vidDir = resolve(here, "..", "media");
const audDir = resolve(here, "..", "..", "render", "medios");
const todo = process.argv.includes("--todo");

const hechos = new Set();
for (const m of G.medios) {
  const orig = join(grab, m.orig);
  if (!existsSync(orig)) { console.log("FALTA", orig); process.exit(1); }
  for (const tipo of ["video", "audio"]) {
    if (!m[tipo] || hechos.has(tipo + m.src)) continue;
    hechos.add(tipo + m.src);
    const out = tipo === "video" ? join(vidDir, m.src + ".mp4") : join(audDir, m.src + ".wav");
    if (existsSync(out) && !todo) continue;
    mkdirSync(dirname(out), { recursive: true });
    let args;
    if (tipo === "video") {
      args = ["-i", orig, "-an", "-vf", "fps=30,scale='min(1280,iw)':-2,format=yuv420p", "-c:v", "libx264", "-preset", "fast", "-crf", "20", "-g", "1", "-movflags", "+faststart", out];
    } else {
      const ruido = m.src.startsWith("mateo/07") ? "afftdn=nr=24:nf=-34:tn=1," : m.src.startsWith("mateo/") ? "afftdn=nr=14:nf=-30:tn=1," : "";
      args = ["-i", orig, "-vn", "-ac", "1", "-ar", "48000", "-af", `highpass=f=80,${ruido}anull`, out];
    }
    const r = spawnSync("ffmpeg", ["-y", "-loglevel", "error", ...args], { stdio: "inherit" });
    console.log((r.status === 0 ? "ok   " : "ERROR ") + tipo.padEnd(6) + m.src);
  }
}
