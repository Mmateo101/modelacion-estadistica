# Animación del video

El video se arma como una página web que corre sola y se exporta a MP4 cuadro por cuadro.

| Página | Qué es |
|---|---|
| `nuevo.html` | **Versión 4 (la vigente):** teatro de papel con luz. 12 escenas, 4:53 |

## Verla

Con la vista previa abierta, entra a `http://localhost:5500/nuevo.html`, o abre `nuevo.html` con doble clic en Chrome.

| Tecla | Qué hace |
|---|---|
| Espacio | Pausa / sigue |
| ← → | Retrocede / avanza 2 s (con Shift, 10 s) |
| 1–9 | Salta a la escena |
| G | Muestra u oculta la guía (reloj y nombre de la escena) |
| F | Pantalla completa |

## Dónde está cada cosa

| Archivo | Contenido |
|---|---|
| `js/nuevo/guion.js` | Texto de la narración y tiempos de cada escena |
| `js/nuevo/arte.js` | Kit de ilustración: planos con capas a distinta profundidad, luces, figuras articuladas, utilería (libreros, ventanas, lámparas…) |
| `js/nuevo/motor.js` | Línea de tiempo, cámara, transiciones entre planos y escenas, marcos para las tomas reales, subtítulos y controles |
| `js/nuevo/comun.js` | Utilidades de las escenas: rótulos, contadores, sellos, figuras que caminan, luciérnagas |
| `js/nuevo/historia.js` | Escena 1: los seis planos de la historia |
| `js/nuevo/escenas2.js` | El libro del equipo, la ciudad (problema, por qué importa y pregunta), el fichero (alcance → innovación: los índices) y el pizarrón |
| `js/nuevo/indep.js` | Resultado de independencia: el vitral y la ji-cuadrada |
| `js/nuevo/ventanas.js` | Resultado del hogar: edificios e intervalos de confianza que no se traslapan |
| `js/nuevo/escenas3.js` | Frascos (solo casa vs. solo escuela, con prueba z), escritorio, lupa y conclusiones, amanecer (propuesta) y el cierre en el librero |

El orden de las escenas lo decide `guion.js`, no el orden de los archivos.
| `js/data.js` | Los números, tomados del reporte final |

Dentro de cada escena los tiempos son locales: 0 es el inicio de esa escena.

## Exportar a MP4

Hace falta Node 22 o más nuevo, Google Chrome y ffmpeg. Desde esta carpeta:

```bash
node tools/render.mjs --final --salida=Video.mp4
```

Exporta `nuevo.html` completo a `../render/Video.mp4`, con subtítulos (`--subs=0` los quita).

```bash
node tools/render.mjs --final --desde=28 --hasta=58 --salida=tramo.mp4
```

Exporta solo un tramo, en segundos. Conviene exportar por tramos de menos de un minuto de video y unirlos después: cada cuadro tarda alrededor de 0.3 s.

```bash
node tools/cuadros.mjs ../render/cuadros 6 16 40.5
```

Guarda cuadros sueltos (en esos segundos) para revisar.

```bash
node tools/render.mjs --final --limpio=1 --subs=0 --salida=Base_para_editar.mp4
```

Versión para el editor de video: sin rótulos dentro de los marcos ni subtítulos, para poner encima las tomas reales. `../render/cameos.json` dice en qué segundo entra cada toma y en qué rectángulo va.

```bash
node tools/voz-guia.mjs
```

Lee el guion con la voz de Windows y avisa si alguna línea no cabe en su hueco. Es solo una guía de tiempos.
