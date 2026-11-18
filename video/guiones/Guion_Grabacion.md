# Guion de grabación · versión 4

Qué tiene que grabar cada quien. Nada es grupal: cada toma es de una sola persona. Las líneas entre comillas se dicen tal cual (son las que ya están auditadas contra el reporte).

**Reglas para todas las tomas:** horizontal, 1080p, 30 fps · celular en tripié o recargado, a la altura de los ojos · plano medio (de la cintura para arriba) mirando a cámara · luz de frente (una ventana delante, no detrás) · micrófono o audífonos con micrófono cerca de la boca · lugar callado · 1 s de silencio antes y después de hablar · tres tomas de cada línea, hablando despacio.

---

## Fernando

| Toma | Qué | Formato | En el video |
|---|---|---|---|
| A1 | Foto o clip de 3 s saludando a cámara | 4:3 horizontal | 0:30.4 a 0:41.4 (marco de 384×288) |
| B · Cameo 1 | «El problema: en el Módulo sobre Lectura del INEGI, solo 41.7% de los adultos alfabetos de la muestra leyó al menos un libro en el último año.» | 16:9, ~11 s | 0:54.6 a 1:06.5 (marco de 800×450) |
| F1 | Foto o clip de 3 s despidiéndose (mano, sonrisa) | 4:3 horizontal | 4:34.3 a 4:42.5, dentro del libro (marco de 360×270) |

## Mateo

| Toma | Qué | Formato | En el video |
|---|---|---|---|
| A2 | Foto o clip de 3 s saludando a cámara | 4:3 horizontal | 0:31.6 a 0:41.4 |
| E · Cameo 4 | «La innovación: con ocho preguntas sueltas de la encuesta construimos dos índices de acceso a la lectura.» | 16:9, ~7.5 s | 1:40.9 a 1:48.5 (marco de 760×428) |
| F2 | Foto o clip de 3 s despidiéndose | 4:3 horizontal | 4:34.8 a 4:42.5 |

## Eliel

| Toma | Qué | Formato | En el video |
|---|---|---|---|
| A3 | Foto o clip de 3 s saludando a cámara | 4:3 horizontal | 0:32.8 a 0:41.4 |
| C · Cameo 2 | «Hicimos pruebas de hipótesis e intervalos de confianza en R, con significancia de 0.04.» | 16:9, ~8 s | 1:56.1 a 2:04.3 (marco de 720×405) |
| F3 | Foto o clip de 3 s despidiéndose | 4:3 horizontal | 4:35.3 a 4:42.5 |

## César

| Toma | Qué | Formato | En el video |
|---|---|---|---|
| A4 | Foto o clip de 3 s saludando a cámara | 4:3 horizontal | 0:34.0 a 0:41.4 |
| D · Cameo 3 | Las cuatro líneas de abajo, seguidas, con una pausa corta entre cada una | 16:9, ~25 s | 3:39.4 a 4:04.9 (marco de 800×450) |
| F4 | Foto o clip de 3 s despidiéndose | 4:3 horizontal | 4:35.8 a 4:42.5 |

Líneas del cameo 3:

1. «Son asociaciones, no causalidad: 32 áreas urbanas, respuestas de memoria y sin factor de expansión.»
2. «Concluimos que el acceso en la infancia se relaciona sobre todo con volverse lector…»
3. «…que el hogar se asocia más con leer que la escuela…»
4. «…y que los dos índices no son independientes.»

## Grabación de pantalla (quien tenga RStudio abierto)

| Toma | Qué | En el video |
|---|---|---|
| P1 | RStudio corriendo `codigo/04_reporte_final_graficas.qmd` hasta que se vean `prop.test`, `chisq.test` y `t.test` con sus resultados. 10 s, 16:9 | 2:04.3 a 2:13.6 (marco de 720×405) |

---

## Voz en off (una sola persona)

Se graba todo seguido, despacio, con una pausa de 2 s entre bloques. Los tiempos son los del video; si una línea no cabe, es mejor hablar un poco más rápido que cambiar el texto.

| Tiempo | Línea |
|---|---|
| 0:03.6 | Héctor creció en una casa sin libros… |
| 0:09.2 | …pero en la escuela, sus maestros lo motivaban a leer. |
| 0:14.0 | A Eduardo le leían todas las noches… |
| 0:19.2 | …pero en su escuela nadie hablaba de libros. |
| 0:24.4 | ¿Quién leerá más de adulto? |
| 0:30.0 | Somos Fernando, Mateo, Eliel y César, estudiantes de profesional del Tec de Monterrey… |
| 0:37.6 | …y hoy les vamos a presentar nuestra investigación: |
| 0:42.2 | «Desigualdad en el acceso a la lectura». |
| 0:46.2 | En la clase de Modelación estadística, con las doctoras Blanca Ruiz y María Guadalupe Tobías. |
| 1:06.9 | Importa porque el hábito lector se forma en la infancia, y el acceso no es igual para todos. Eso nos llevó a preguntarnos: |
| 1:16.9 | ¿cómo se relaciona el acceso a la lectura en la infancia con leer o no leer libros de adulto, y con cuántos? |
| 1:27.1 | El alcance: seis levantamientos del MOLEC, de 2019 a 2024: 11,685 adultos de 32 áreas urbanas. |
| 1:48.9 | Uno del hogar y otro de la primaria, para compararlos frente a frente. |
| 2:04.5 | Cada técnica tiene su propio supuesto, y verificamos cada uno. |
| 2:14.4 | ¿Son independientes los dos índices? Los comparamos con lo que esperaríamos si fueran independientes. |
| 2:22.1 | La prueba ji-cuadrada da evidencia de que no lo son: el acceso escolar tiende a acompañar al del hogar. |
| 2:31.8 | Leyó al menos un libro 28.1% de quienes tuvieron acceso bajo en el hogar… |
| 2:39.8 | …y 59.7% de quienes tuvieron acceso alto. |
| 2:45.8 | Con 96% de confianza, estos intervalos no se traslapan. |
| 2:53.9 | Separamos a quienes tuvieron estímulos solo en la escuela, como Héctor, de quienes los tuvieron solo en casa, como Eduardo. |
| 3:03.4 | Solo en la escuela leyó 27.0%; solo en casa, 46.4%. |
| 3:12.3 | La prueba z de diferencia de proporciones da evidencia de que estas proporciones son distintas. |
| 3:22.8 | Entre quienes sí leen, la diferencia en cantidad de libros es significativa pero pequeña: entre 0.43 y 1.13 libros al año. |
| 4:06.1 | Su impacto social: evidencia de que la brecha lectora se asocia sobre todo con el acceso en el hogar. |
| 4:14.7 | Por eso proponemos diagnosticar el acceso en casa, focalizar a quienes tuvieron cero o un estímulo, reforzar las bibliotecas de aula e involucrar a las familias. |
| 4:26.9 | Contribuye a los ODS 4 y 10: educación de calidad y menos desigualdades. |
| 4:34.3 | La desigualdad en el acceso empieza en casa… |
| 4:38.5 | …y ahí también puede empezar la solución. |

Cómo se dicen las cifras: «cuarenta y uno punto siete por ciento» · «once mil seiscientos ochenta y cinco» · «cero punto cero cuatro» · «veintiocho punto uno» · «cincuenta y nueve punto siete» · «veintisiete punto cero» · «cuarenta y seis punto cuatro» · «cero punto cuarenta y tres y uno punto trece» · «ji-cuadrada» (no «chi»).
