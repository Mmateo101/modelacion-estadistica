# Guion del video · versión 4

**Proyecto:** Análisis estadístico de la desigualdad en el acceso a la lectura en la infancia y su impacto en los hábitos de lectura en la vida adulta
**Estado:** 12 escenas animadas (`animacion/nuevo.html`, también en `http://localhost:5500` con la vista previa). Duración: **4:52.3**. Faltan las fotos y cameos de cada quien, la voz en off y la música. El guion para grabar está en `Guion_Grabacion.md`.

**Cambios de la versión 4:** ya no se menciona «Equipo 7» en ninguna parte · se agregó por qué importa el problema y cómo llevó a la pregunta · «Alcance» va en grande y la transición al fichero de la innovación es un vuelo a través de las fichas · rótulo «Innovación: los índices de acceso» · el pizarrón dice «hicimos pruebas de hipótesis e intervalos de confianza en R» · la independencia ya no explica los pasos: solo compara con lo esperado y da el resultado · el resultado 2 se queda solo con los intervalos (sin prueba z y sin textos que duraban muy poco) · el resultado 3 explica cómo se definieron los grupos y muestra la prueba que hicimos (z) · el impacto dice solo «Propuesta» · se quitó la grabación de pantalla de RStudio · las cuatro despedidas van dentro del libro.

---

## 1. Revisión contra el Anexo 4

| Lo que pide la convocatoria | Dónde está | Cómo se cumple |
|---|---|---|
| MP4, 3 a 5 min, nombre ≤ 30 caracteres | 1920×1080, 30 fps, 4:52.3 · propuesta de nombre: `AccesoLectura_MA1001B.mp4` | Cumple. Quedan 7.7 s de margen: si la edición alarga algo, se pasa |
| No generado completamente con IA | Voces, fotos y cameos del equipo | Cumple cuando graben sus partes; hoy la voz es de prueba |
| Explicación audible | Narración en todas las escenas | Cumple |
| Imágenes o extractos de las pruebas | Escena 5: tres salidas originales de R, en grande; cada resultado inferencial muestra estadístico o intervalo, valor frontera y decisión | Cumple |
| Ni solo demo ni solo explicación | Cameos + voz + animación de resultados | Cumple |
| Presentación: proyecto, integrantes, tutoras, modelo educativo, clase | Escena 2 | La voz dice «estudiantes de profesional del Tec de Monterrey», la clase y las tutoras |
| Define el problema | Escena 3 | Rótulo «EL PROBLEMA» y el cameo empieza con «El problema:» |
| Por qué importa y cómo surge la pregunta | Escena 3 | Rótulo «POR QUÉ IMPORTA»: «El hábito lector se forma en la infancia… y el acceso a la lectura no es igual para todos». La voz termina con «Eso nos llevó a preguntarnos:» |
| Describe el proyecto | Escenas 3 y 4 | Rótulo «PREGUNTA DE INVESTIGACIÓN» con las dos subpreguntas |
| Por qué es innovador | Escena 4 | Título «Innovación · los índices de acceso»; Mateo lo dice justo cuando aparece |
| Justifica el alcance | Escena 4 | Título grande «Alcance»; la voz empieza con «El alcance:». Los límites (32 áreas urbanas, sin factor de expansión) están en la escena 10 |
| Técnicas con figuras | Escena 5 y resultados | Cumple |
| Presenta, discute y concluye resultados | Escenas 6 a 10 | Resultados numerados del 1 al 4 |
| Impacto social | Escena 11 | Rótulo «IMPACTO SOCIAL», la voz empieza con «Su impacto social:» y en pantalla «Propuesta» |

## 2. Reglas que se aplicaron

- **Si un texto está tan poco tiempo en pantalla que no se alcanza a leer, se quita.**
- **No se muestran intervalo y prueba de hipótesis para la misma comparación.** Resultado 2: intervalos. Resultado 3: prueba z (es la Prueba 2 del reporte). Resultado 4: intervalo de la diferencia de medias.
- **Nada grupal:** cada toma es de una sola persona.
- Primero lo que vimos en la muestra (descriptivo) y luego lo que podemos inferir (rótulo «… · 96% DE CONFIANZA»).

## 3. Escaleta

| # | Escena | Rótulo en pantalla | Inicio | Dur. | Quién habla |
|---|---|---|---|---|---|
| 1 | Dos infancias | — | 0:00 | 28 s | Voz en off |
| 2 | Quiénes somos | — | 0:28 | 26 s | **Cuatro fotos** + voz |
| 3 | Problema, por qué importa y pregunta | EL PROBLEMA → POR QUÉ IMPORTA → PREGUNTA DE INVESTIGACIÓN | 0:54 | 32.5 s | **Cameo 1** + voz |
| 4 | Alcance e innovación | Alcance → Innovación · los índices de acceso | 1:26.5 | 29 s | Voz + **Cameo 4** |
| 5 | Técnicas y supuestos | TÉCNICAS Y SUPUESTOS | 1:55.5 | 18.5 s | **Cameo 2** + voz |
| 6 | ¿Son independientes los índices? | RESULTADO 1 | 2:14 | 16.8 s | Voz en off |
| 7 | El acceso en el hogar | RESULTADO 2 | 2:30.8 | 22.5 s | Voz en off |
| 8 | Solo en casa o solo en la escuela | RESULTADO 3 | 2:53.3 | 28.5 s | Voz en off |
| 9 | Cuántos libros | RESULTADO 4 | 3:21.8 | 17 s | Voz en off |
| 10 | Limitaciones y conclusiones | LIMITACIONES → CONCLUSIONES | 3:38.8 | 26.5 s | **Cameo 3** |
| 11 | Impacto social | IMPACTO SOCIAL · Propuesta | 4:05.3 | 28 s | Voz en off |
| 12 | Cierre | — | 4:33.3 | 19 s | **Cuatro fotos** en el libro + voz |

---

## 4. Guion escena por escena

`>` es lo que se dice. «En pantalla» es lo único que se lee.

### 1 · Dos infancias (28 s)

Seis planos: la calle con dos casas; la sala de Héctor, con el librero vacío; su salón, donde la maestra lee; el cuarto de Eduardo, donde le leen; su salón gris; los dos, de adultos, frente a un muro de libros.

> Héctor creció en una casa sin libros…
> …pero en la escuela, sus maestros lo motivaban a leer.
> A Eduardo le leían todas las noches…
> …pero en su escuela nadie hablaba de libros.
> ¿Quién leerá más de adulto?

### 2 · Quiénes somos (26 s)

Un libro ancho, abierto como álbum: cuatro fotos (cada quien saludando) con su nombre y matrícula. El libro se cierra y muestra el título; entran las fichas de la clase y de las tutoras.

> Somos Fernando, Mateo, Eliel y César, estudiantes de profesional del Tec de Monterrey…
> …y hoy les vamos a presentar nuestra investigación:
> «Desigualdad en el acceso a la lectura».
> En la clase de Modelación estadística, con las doctoras Blanca Ruiz y María Guadalupe Tobías.

En pantalla: «INTEGRANTES» · nombres y matrículas · tapa «Desigualdad en el acceso a la lectura · MOLEC · INEGI · 2019–2024» · «MA1001B · Modelación estadística para la toma de decisiones» · tutoras.

### 3 · Problema, por qué importa y pregunta (32.5 s)

La ciudad al anochecer: se enciende 41.7% de las ventanas. La cámara sube al cielo: primero por qué importa, luego la pregunta escrita con luz y las dos subpreguntas.

> (cameo 1) El problema: en el Módulo sobre Lectura del INEGI, solo 41.7% de los adultos alfabetos de la muestra leyó al menos un libro en el último año.
> (voz) Importa porque el hábito lector se forma en la infancia, y el acceso no es igual para todos. Eso nos llevó a preguntarnos:
> (voz) ¿cómo se relaciona el acceso a la lectura en la infancia con leer o no leer libros de adulto, y con cuántos?

En pantalla: «41.7%» · «El hábito lector se forma en la infancia… y el acceso a la lectura no es igual para todos.» · la pregunta · «a) ¿Leyó o no leyó libros?» · «b) ¿Cuántos libros leyó?».

### 4 · Alcance e innovación (29 s)

El fichero: «Alcance» en grande; seis cajones (2019–2024) se abren, las fichas vuelan a una pila y el contador sube a 11,685. Transición: la pila de fichas vuela hacia la cámara, destello y entramos a un segundo plano. Ahí aparece «Innovación · los índices de acceso», Mateo en un marco y a su lado «Dos índices de acceso». Después las ocho fichas suben a los dos paneles (opacos, sin el fichero detrás) y se palomean.

> (voz) El alcance: seis levantamientos del MOLEC, de 2019 a 2024: 11,685 adultos de 32 áreas urbanas.
> (cameo 4) La innovación: con ocho preguntas sueltas de la encuesta construimos dos índices de acceso a la lectura.
> (voz) Uno del hogar y otro de la primaria, para compararlos frente a frente.

En pantalla: «Alcance» · «seis levantamientos · 2019–2024» · «11,685 adultos alfabetos» · «32 áreas urbanas» · «Módulo sobre Lectura (MOLEC) · INEGI» · «Innovación · los índices de acceso» · «Dos índices de acceso: Hogar · 4 preguntas · de 0 a 4 / Primaria · 4 preguntas · de 0 a 4» · los ocho estímulos · «Acceso bajo = 0 o 1 estímulos · medio = 2 · alto = 3 o 4».

### 5 · Técnicas y supuestos (18.5 s)

El pizarrón. Eliel en el marco; cuando sale, entran en grande tres salidas originales de R (intervalos, pruebas y diferencias). Con gis, tres curvas y el supuesto de cada técnica, con palomita.

> (cameo 2) Hicimos pruebas de hipótesis e intervalos de confianza en R, con significancia de 0.04.
> (voz) Cada técnica tiene su propio supuesto, y verificamos cada uno.

En pantalla: «Nivel de significancia: α = 0.04 · 96% de confianza» · proporciones → n·p ≥ 5 y n·(1−p) ≥ 5 · ji-cuadrada → esperadas ≥ 5 · t de Welch → los libros no son normales, Teorema del Límite Central.

### 6 · Resultado 1: ¿son independientes los dos índices? (16.8 s)

El vitral se enciende con la tabla de personas (hogar en renglones, escuela en columnas). Cada celda se pinta según tenga más o menos personas de las que esperaríamos si fueran independientes; se marca la diagonal. Luego la ji-cuadrada y la decisión.

> ¿Son independientes los dos índices? Los comparamos con lo que esperaríamos si fueran independientes.
> La prueba ji-cuadrada da evidencia de que no lo son: el acceso escolar tiende a acompañar al del hogar.

En pantalla: «más personas de las esperadas / menos de las esperadas · si los índices fueran independientes» · χ² con 16 grados de libertad · «valor frontera 27.14» · «H₀: los dos índices son independientes» · «χ² = 2,414.77 > 27.14 · se tiene evidencia para rechazar H₀» · «el acceso escolar tiende a acompañar al del hogar».

### 7 · Resultado 2: el acceso en el hogar (22.5 s)

Dos edificios de 100 ventanas; se enciende el porcentaje que leyó en cada grupo. La cámara sube al cielo: los dos intervalos de confianza, grandes, con el hueco entre ellos.

> Leyó al menos un libro 28.1% de quienes tuvieron acceso bajo en el hogar…
> …y 59.7% de quienes tuvieron acceso alto.
> Con 96% de confianza, estos intervalos no se traslapan.

En pantalla: «¿Leyó al menos un libro en los últimos 12 meses?» · «Acceso bajo en el hogar · 0 o 1 estímulos» · «Acceso alto en el hogar · 3 o 4 estímulos» · «IC 96%: 26.8% a 29.3%» · «IC 96%: 58.1% a 61.3%» · «no se traslapan».

### 8 · Resultado 3: solo en casa o solo en la escuela (28.5 s)

Primero dos tarjetas definen los grupos, sobre dos frascos con Héctor y Eduardo al lado. Luego las luciérnagas llenan los frascos hasta su porcentaje. Al final, en una franja arriba, la prueba z de diferencia de proporciones: el estadístico se va hasta 8.41, muy lejos del valor frontera.

> Separamos a quienes tuvieron estímulos solo en la escuela, como Héctor, de quienes los tuvieron solo en casa, como Eduardo.
> Solo en la escuela leyó 27.0%; solo en casa, 46.4%.
> La prueba z de diferencia de proporciones da evidencia de que estas proporciones son distintas.

En pantalla: «Solo en la escuela: al menos un estímulo en la escuela y ninguno en casa» · «Solo en casa: al menos un estímulo en casa y ninguno en la escuela» · «1,977 personas» · «500 personas» · «27.0%» · «46.4%» · «Prueba z de diferencia de proporciones» · «valor frontera ±2.054» · «z = 8.41» · «H₀: p_casa = p_escuela · z = 8.41 > 2.054 → se tiene evidencia para rechazar H₀».

### 9 · Resultado 4: cuántos libros (17 s)

> Entre quienes sí leen, la diferencia en cantidad de libros es significativa pero pequeña: entre 0.43 y 1.13 libros al año.

En pantalla: 3.07 y 3.85 libros al año · la regla con el intervalo · «H₀: μ_alto = μ_bajo · t = 4.56 > 1.751 → se tiene evidencia para rechazar H₀».

### 10 · Limitaciones y conclusiones (26.5 s)

> (cameo 3) Son asociaciones, no causalidad: 32 áreas urbanas, respuestas de memoria y sin factor de expansión.
> Concluimos que el acceso en la infancia se relaciona sobre todo con volverse lector…
> …que el hogar se asocia más con leer que la escuela…
> …y que los dos índices no son independientes.

### 11 · Impacto social (28 s)

La calle al amanecer. «Propuesta» en grande; los cuatro letreros y los libros que viajan de la escuela a las casas; al final los ODS.

> Su impacto social: evidencia de que la brecha lectora se asocia sobre todo con el acceso en el hogar.
> Por eso proponemos diagnosticar el acceso en casa, focalizar a quienes tuvieron cero o un estímulo, reforzar las bibliotecas de aula e involucrar a las familias.
> Contribuye a los ODS 4 y 10: educación de calidad y menos desigualdades.

En pantalla: «Propuesta» · 1 Diagnóstico · 2 Focalización · 3 Bibliotecas de aula · 4 Familias · ODS 4 y ODS 10.

### 12 · Cierre (19 s)

El libro se abre con las cuatro despedidas dentro (una foto o clip por integrante, con su nombre). Luego las páginas muestran los créditos, el libro se cierra y se guarda en el librero del fondo.

> (voz) La desigualdad en el acceso empieza en casa… y ahí también puede empezar la solución.

En pantalla: la frase · créditos (integrantes, tutoras, clase) · ficha de préstamo con la fuente de los datos y la nota de uso de IA.

---

## 5. Auditoría estadística

| Afirmación | Cifra exacta | Reporte |
|---|---|---|
| Proporción de lectores | 41.7% (4,868 de 11,685) | 4.2 |
| Por qué importa | «El hábito lector se forma en la infancia» | Abstract |
| Alcance | 6 levantamientos, 2019–2024; 11,685 adultos alfabetos; 32 áreas urbanas | 3.1 |
| Índices | dos índices de 0 a 4 construidos por el equipo con p34a–d y p36a–d | 3.2 |
| Nivel de significancia | α = 0.04 | 3.3 |
| Supuestos | n·p ≥ 5 (mínimo 232); esperadas ≥ 5 (mínima 184.8); t de Welch con TLC | Tabla 2 |
| Independencia | χ² = 2,414.77; 16 gl; frontera 27.14; diagonal con más de lo esperado en las 5 celdas | Tabla 6, prueba 1; Tabla 4.1 |
| Acceso en el hogar | 28.1% (26.8% a 29.3%) y 59.7% (58.1% a 61.3%) | Tabla 5 |
| Solo casa o solo escuela | 46.4% (232 de 500) y 27.0% (533 de 1,977); z = 8.41 > 2.054; p = 4.3×10⁻¹⁷ | Prueba 2 |
| Cuántos libros | 3.85 y 3.07; IC 96%: 0.43 a 1.13; t = 4.56 > 1.751 | Tabla 5, prueba 4 |
| Impacto | «la brecha lectora se asocia sobre todo con el acceso en el hogar» | Resumen y 6 |

## 6. Tomas que hay que grabar

Ver `Guion_Grabacion.md` (qué dice cada quien, cuándo entra y el tamaño de cada marco). Los tiempos exactos también quedan en `render/cameos.json` al exportar.
