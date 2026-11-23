# Desigualdad en el acceso a la lectura · Modelación estadística

**Análisis estadístico de la desigualdad en el acceso a la lectura en la infancia y su impacto en los hábitos de lectura en la vida adulta**

Proyecto de MA1001B · Modelación estadística para la toma de decisiones (Tecnológico de Monterrey, Campus Monterrey). Usamos el Módulo sobre Lectura (MOLEC) del INEGI, de 2019 a 2024: 11,685 adultos alfabetos de 32 áreas urbanas. Con ocho preguntas sueltas de la encuesta construimos dos índices de acceso a la lectura en la infancia, uno del hogar y otro de la primaria. Después analizamos si se relacionan con leer libros de adulto y con cuántos libros se leen. Todas las pruebas usan un nivel de significancia de 0.04 (96% de confianza).

**Integrantes:** Fernando Isaac Martínez García · Mateo Rodolfo Flores Torres · Eliel Silva Morales · César Julián Leal Salazar
**Tutoras:** Dra. Blanca Rosa Ruiz Hernández · Dra. María Guadalupe Tobías Lara

| | Dónde |
|---|---|
| Presentación interactiva | [modelacion-estadistica-presentacion.vercel.app](https://modelacion-estadistica-presentacion.vercel.app) · carpeta raíz (`index.html`) |
| Video del concurso (4:27) | [`video/Video_final.mp4`](video/Video_final.mp4) (comprimido) · la versión en alta calidad (262 MB) está en [Releases](../../releases/latest) |
| Póster científico (90 × 120 cm) | [`poster/Poster_1_propio.pdf`](poster/Poster_1_propio.pdf) · [`poster/Poster_2_boceto.pdf`](poster/Poster_2_boceto.pdf) · fuente en LaTeX y gráficas en R en [`poster/latex/`](poster/latex) |
| Reporte técnico para Expo Ingenierías | [`manuscrito/Reporte_Lectura_Expo.pdf`](manuscrito/Reporte_Lectura_Expo.pdf) · [Word](manuscrito/Reporte_Expo_Ingenierias.docx) |
| Imágenes del perfil (carrusel) | [`carrusel/`](carrusel) |
| Manuscrito final | [`manuscrito/Reporte_final.docx`](manuscrito/Reporte_final.docx) (10 páginas) · [versión extendida](manuscrito/Reporte_final_version_extendida.docx) · [abstract](manuscrito/Abstract.docx) |
| Código en R | [`codigo/`](codigo) |
| Bases de datos | [`datos/`](datos) |

## Resultados principales

1. **Los dos índices no son independientes.** Prueba ji-cuadrada de independencia: χ² = 2,414.77 > 27.14 (16 grados de libertad). El acceso escolar tiende a acompañar al del hogar.
2. **El acceso en el hogar se asocia con leer.** Leyó al menos un libro 28.1% de quienes tuvieron acceso bajo en el hogar (IC 96%: 26.8% a 29.3%) y 59.7% de quienes tuvieron acceso alto (IC 96%: 58.1% a 61.3%). Los intervalos no se traslapan.
3. **Solo en casa frente a solo en la escuela.** Leyó 46.4% de quienes tuvieron estímulos solo en casa (232 de 500) y 27.0% de quienes los tuvieron solo en la escuela (533 de 1,977). Prueba z de diferencia de proporciones: z = 8.41 > 2.054, se rechaza H₀.
4. **Cuántos libros.** Entre quienes sí leen, la diferencia en la cantidad de libros es significativa pero pequeña: de 0.43 a 1.13 libros al año (t de Welch).

Son asociaciones, no causalidad: la muestra cubre 32 áreas urbanas, las respuestas sobre la infancia son de memoria y no usamos el factor de expansión.

## Estructura del repositorio

```
index.html, css/, js/, assets/, tools/   presentación interactiva (se publica en Vercel desde la raíz)
video/
  Video_final.mp4                       video del concurso (comprimido para GitHub)
  animacion/                            código de la animación (HTML + GSAP + D3) y herramientas de exportación
  guiones/                              guion del video y guion de grabación por persona
poster/                                 los dos pósters en PDF
  latex/                                fuente LaTeX (lualatex), gráficas en R (figuras_poster.R) y carrusel
carrusel/                               tres imágenes del perfil del proyecto (GIF + dos PNG)
manuscrito/                             reporte final, versión extendida, abstract y reporte técnico para Expo Ingenierías (PDF)
codigo/
  01_limpieza_y_union.qmd               limpieza: une los seis levantamientos y filtra la muestra analítica
  02_preparacion_variables.Rmd          construye los índices de acceso y las variables de análisis
  03_analisis_inferencial.Rmd           intervalos de confianza y pruebas de hipótesis
  03b_analisis_inferencial_v1.qmd       primera versión del análisis inferencial
  04_reporte_final_graficas.qmd         tablas y gráficas del reporte final
datos/
  crudos/                               bases del MOLEC tal como las publica el INEGI (2019–2025)
  procesados/molec_2019_2024.csv        salida de 01: los seis años unidos y limpios
  procesados/molec_analisis.csv         salida de 02: base con los índices, la que usan 03 y 04
```

## Cómo reproducir el análisis

Abre la carpeta `codigo/` en RStudio (o fija ahí el directorio de trabajo) y corre los archivos en orden. Las rutas son relativas a esa carpeta.

1. `01_limpieza_y_union.qmd` lee `datos/crudos/` y escribe `datos/procesados/molec_2019_2024.csv`.
2. `02_preparacion_variables.Rmd` lee esa base (y las crudas) y escribe `datos/procesados/molec_analisis.csv`.
3. `03_analisis_inferencial.Rmd` y `04_reporte_final_graficas.qmd` leen `molec_analisis.csv`.

La base de 2025 se incluye solo como referencia: no entra al análisis porque el cuestionario cambió ese año.

## Presentación interactiva

Se ve como un libro ilustrado y animado.

- Abre `index.html` con doble clic. Funciona sin internet porque las fuentes, GSAP y D3 vienen en el repositorio.
- O sirve la carpeta con `npx serve .` y abre la dirección que aparece.
- Usa Chrome para la mejor calidad de animación. En proyector, presiona **F** para pantalla completa.

| Tecla | Acción |
| --- | --- |
| Espacio, →, AvPág | Siguiente paso, o la transición a la siguiente diapositiva cuando ya no quedan pasos |
| ←, Retroceso, RePág | Paso anterior (salta sin repetir la animación) |
| F | Pantalla completa |
| R | Repite la diapositiva desde su primer paso |
| 1–9, 0 | Salta a una diapositiva (0 = diapositiva 10) |
| N | Muestra u oculta las notas del presentador |

La URL guarda la posición (`#8.3` = diapositiva 8, paso 3), así que puedes recargar sin perder tu lugar.

```
index.html            filtros SVG compartidos y el orden de carga de los scripts
css/                  paleta, textura de papel, tarjetas y fuentes locales
js/data.js            TODOS los números de la presentación
js/main.js            motor: escala, pasos, navegación y notas
js/lib.js             utilidades: texto que se escribe solo, acuarela, contadores, trazos
js/characters.js      Héctor, Eduardo y la utilería, dibujados en SVG
js/transitions.js     vuelta de página, tinta que se expande, acuarela
js/charts/charts.js   gráficas en D3 que reproducen las de R
js/slides/slideNN.js  una línea de tiempo de GSAP por diapositiva
```

Nota de datos: las barras de error de la gráfica «solo escuela frente a solo hogar» (diapositiva 8) se calculan como p ± 2.054·√(p(1−p)/n), igual que en la gráfica de R, y así están marcadas en `data.js`. Los bigotes del diagrama de caja de la diapositiva 10 siguen la regla de R (1.5 · RIC) aplicada a los cuartiles.

## Video

`video/animacion/` contiene la animación completa del video: una página web que corre sola y se exporta a MP4 cuadro por cuadro con Chrome sin interfaz y ffmpeg. Las instrucciones están en [`video/animacion/LEEME.md`](video/animacion/LEEME.md). La versión final ya tiene las grabaciones reales de los cuatro integrantes (voz y cameos): `tools/preparar_medios.mjs` las procesa, `tools/mezcla.mjs` empareja el volumen (EBU R128) y `tools/render.mjs` exporta el video. Las grabaciones originales no se suben al repositorio; el guion de grabación (qué dice cada quien) está en `video/guiones/`.

Se usó IA (Claude, de Anthropic) como apoyo en el código, la redacción y la animación. El equipo verificó todos los resultados.
