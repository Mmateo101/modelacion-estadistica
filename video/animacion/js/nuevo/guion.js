/* Texto de la narración y tiempos (v4). dur = duración de la escena; voz con tiempos locales.
   q: "voz" = voz en off; cualquier otro valor = quién lo dice a cámara.
   Cada línea está auditada contra el reporte final (ver Guion_Video.md, sección 7). */
window.GUION = {
  fps: 30,
  equipo: ["Fernando", "Mateo", "Eliel", "César"],
  cameos: { 1: "Fernando", 2: "Eliel", 3: "César", 4: "Mateo" },
  escenas: [
    {
      id: "historia", nombre: "Dos infancias", dur: 28,
      voz: [
        { t0: 3.6, t1: 7.6, q: "voz", x: "Héctor creció en una casa sin libros…" },
        { t0: 9.2, t1: 13.7, q: "voz", x: "…pero en la escuela, sus maestros lo motivaban a leer." },
        { t0: 14.0, t1: 18.0, q: "voz", x: "A Eduardo le leían todas las noches…" },
        { t0: 19.2, t1: 23.0, q: "voz", x: "…pero en su escuela nadie hablaba de libros." },
        { t0: 24.4, t1: 27.2, q: "voz", x: "¿Quién leerá más de adulto?" },
      ],
    },
    {
      id: "equipo", nombre: "Quiénes somos", dur: 26,
      voz: [
        { t0: 2.0, t1: 9.4, q: "voz", x: "Somos Fernando, Mateo, Eliel y César, estudiantes de profesional del Tec de Monterrey…" },
        { t0: 9.6, t1: 13.6, q: "voz", x: "…y hoy les vamos a presentar nuestra investigación:" },
        { t0: 14.2, t1: 17.6, q: "voz", x: "«Desigualdad en el acceso a la lectura»." },
        { t0: 18.2, t1: 25.4, q: "voz", x: "En la clase de Modelación estadística, con las doctoras Blanca Ruiz y María Guadalupe Tobías." },
      ],
    },
    {
      id: "problema", nombre: "Problema y pregunta", dur: 32.5,
      voz: [
        { t0: 0.6, t1: 12.4, q: "Cameo 1", x: "El problema: en el Módulo sobre Lectura del INEGI, solo 41.7% de los adultos alfabetos de la muestra leyó al menos un libro en el último año." },
        { t0: 12.9, t1: 22.4, q: "voz", x: "Importa porque el hábito lector se forma en la infancia, y el acceso no es igual para todos. Eso nos llevó a preguntarnos:" },
        { t0: 22.9, t1: 31.4, q: "voz", x: "¿cómo se relaciona el acceso a la lectura en la infancia con leer o no leer libros de adulto, y con cuántos?" },
      ],
    },
    {
      id: "datos", nombre: "Alcance e innovación", dur: 29,
      voz: [
        { t0: 0.6, t1: 12.5, q: "voz", x: "El alcance: seis levantamientos del MOLEC, de 2019 a 2024: 11,685 adultos de 32 áreas urbanas." },
        { t0: 14.4, t1: 22.0, q: "Cameo 4", x: "La innovación: con ocho preguntas sueltas de la encuesta construimos dos índices de acceso a la lectura." },
        { t0: 22.4, t1: 28.4, q: "voz", x: "Uno del hogar y otro de la primaria, para compararlos frente a frente." },
      ],
    },
    {
      id: "tecnicas", nombre: "Técnicas y supuestos", dur: 18.5,
      voz: [
        { t0: 0.6, t1: 8.6, q: "Cameo 2", x: "Hicimos pruebas de hipótesis e intervalos de confianza en R, con significancia de 0.04." },
        { t0: 9.0, t1: 14.4, q: "voz", x: "Cada técnica tiene su propio supuesto, y verificamos cada uno." },
      ],
    },
    {
      id: "independencia", nombre: "Resultado: independencia", dur: 16.8,
      voz: [
        { t0: 0.4, t1: 7.8, q: "voz", x: "¿Son independientes los dos índices? Los comparamos con lo que esperaríamos si fueran independientes." },
        { t0: 8.1, t1: 16.1, q: "voz", x: "La prueba ji-cuadrada da evidencia de que no lo son: el acceso escolar tiende a acompañar al del hogar." },
      ],
    },
    {
      id: "ventanas", nombre: "Resultado: el hogar", dur: 22.5,
      voz: [
        { t0: 1.0, t1: 8.4, q: "voz", x: "Leyó al menos un libro 28.1% de quienes tuvieron acceso bajo en el hogar…" },
        { t0: 9.0, t1: 14.6, q: "voz", x: "…y 59.7% de quienes tuvieron acceso alto." },
        { t0: 15.0, t1: 21.6, q: "voz", x: "Con 96% de confianza, estos intervalos no se traslapan." },
      ],
    },
    {
      id: "solo", nombre: "Resultado: casa o escuela", dur: 28.5,
      voz: [
        { t0: 0.6, t1: 9.8, q: "voz", x: "Separamos a quienes tuvieron estímulos solo en la escuela, como Héctor, de quienes los tuvieron solo en casa, como Eduardo." },
        { t0: 10.1, t1: 18.6, q: "voz", x: "Solo en la escuela leyó 27.0%; solo en casa, 46.4%." },
        { t0: 19.0, t1: 27.6, q: "voz", x: "La prueba z de diferencia de proporciones da evidencia de que estas proporciones son distintas." },
      ],
    },
    {
      id: "libros", nombre: "Resultado: cuántos libros", dur: 17,
      voz: [
        { t0: 1.0, t1: 12.1, q: "voz", x: "Entre quienes sí leen, la diferencia en cantidad de libros es significativa pero pequeña: entre 0.43 y 1.13 libros al año." },
      ],
    },
    {
      id: "limites", nombre: "Límites y conclusiones", dur: 26.5,
      voz: [
        { t0: 0.6, t1: 10.0, q: "Cameo 3", x: "Son asociaciones, no causalidad: 32 áreas urbanas, respuestas de memoria y sin factor de expansión." },
        { t0: 10.4, t1: 16.4, q: "Cameo 3", x: "Concluimos que el acceso en la infancia se relaciona sobre todo con volverse lector…" },
        { t0: 16.8, t1: 21.0, q: "Cameo 3", x: "…que el hogar se asocia más con leer que la escuela…" },
        { t0: 21.4, t1: 25.4, q: "Cameo 3", x: "…y que los dos índices no son independientes." },
      ],
    },
    {
      id: "impacto", nombre: "Impacto social", dur: 28,
      voz: [
        { t0: 0.8, t1: 9.0, q: "voz", x: "Su impacto social: evidencia de que la brecha lectora se asocia sobre todo con el acceso en el hogar." },
        { t0: 9.4, t1: 21.4, q: "voz", x: "Por eso proponemos diagnosticar el acceso en casa, focalizar a quienes tuvieron cero o un estímulo, reforzar las bibliotecas de aula e involucrar a las familias." },
        { t0: 21.6, t1: 28.0, q: "voz", x: "Contribuye a los ODS 4 y 10: educación de calidad y menos desigualdades." },
      ],
    },
    {
      id: "cierre", nombre: "Cierre", dur: 19,
      voz: [
        { t0: 1.0, t1: 4.8, q: "voz", x: "La desigualdad en el acceso empieza en casa…" },
        { t0: 5.2, t1: 8.8, q: "voz", x: "…y ahí también puede empezar la solución." },
      ],
    },
  ],
};
(function (G) {
  let t = 0;
  G.voz = [];
  G.escenas.forEach((e, i) => {
    e.n = i + 1; e.t0 = t; e.t1 = t + e.dur; t = e.t1;
    e.voz.forEach((v) => G.voz.push({ t0: e.t0 + v.t0, t1: e.t0 + v.t1, q: v.q, x: v.x, escena: e.id }));
  });
  G.dur = t;
})(window.GUION);
