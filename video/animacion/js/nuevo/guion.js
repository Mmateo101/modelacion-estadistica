/* Texto de la narración y tiempos (v4). dur = duración de la escena; voz con tiempos locales.
   q: "voz" = voz en off; cualquier otro valor = quién lo dice a cámara.
   Cada línea está auditada contra el reporte final (ver Guion_Video.md, sección 7). */
window.GUION = {
  fps: 30,
  equipo: ["Fernando", "Mateo", "Eliel", "César"],
  cameos: { 1: "Fernando", 2: "Eliel", 3: "César", 4: "Mateo" },
  /* Grabaciones reales. orig = archivo en Video/Grabaciones/ · src = versión procesada:
     video en media/<src>.mp4 y audio en ../render/medios/<src>.wav (los genera tools/preparar_medios.mjs).
     at = segundo de la escena en que arranca el archivo · ss = desde qué segundo del archivo · hasta = hasta qué segundo.
     cam = marco donde va el video · video / audio = qué se usa. */
  medios: [
    // historia · Fernando (voz)
    { escena: "historia", orig: "Fernando/02_voz_historia_hector.m4a", src: "fernando/02_voz_historia_hector", at: 3.45, ss: 0.2, hasta: 2.3, audio: true },
    { escena: "historia", orig: "Fernando/03_voz_historia_maestros.m4a", src: "fernando/03_voz_historia_maestros", at: 9.05, ss: 0.2, hasta: 3.2, audio: true },
    { escena: "historia", orig: "Fernando/04_voz_historia_eduardo.m4a", src: "fernando/04_voz_historia_eduardo", at: 13.85, ss: 0.1, hasta: 2.4, audio: true },
    { escena: "historia", orig: "Fernando/05_voz_historia_escuela_gris.m4a", src: "fernando/05_voz_historia_escuela_gris", at: 19.05, ss: 0.3, hasta: 3.1, audio: true },
    { escena: "historia", orig: "Fernando/06_voz_historia_quien_leera.m4a", src: "fernando/06_voz_historia_quien_leera", at: 24.25, ss: 0.3, hasta: 2.1, audio: true },
    // quiénes somos · Mateo (voz) y saludos
    { escena: "equipo", orig: "Mateo/02_voz_equipo_somos.ogg", src: "mateo/02_voz_equipo_somos", at: 1.74, ss: 0.9, hasta: 8.6, audio: true },
    { escena: "equipo", orig: "Mateo/03_voz_equipo_presentar.ogg", src: "mateo/03_voz_equipo_presentar", at: 9.38, ss: 1.1, hasta: 7.6, audio: true },
    { escena: "equipo", orig: "Mateo/04_voz_equipo_clase_y_tutoras.ogg", src: "mateo/04_voz_equipo_clase_y_tutoras", at: 17.35, ss: 0.5, hasta: 8.3, audio: true },
    { escena: "equipo", orig: "Fernando/01_saludo_y_despedida.mov", src: "fernando/01_saludo_y_despedida", cam: "A1", at: 2.4, ss: 0, hasta: 3.36, video: true },
    { escena: "equipo", orig: "Mateo/01_saludo.mp4", src: "mateo/01_saludo", cam: "A2", at: 3.6, ss: 0, hasta: 3.05, video: true },
    { escena: "equipo", orig: "Eliel/01_saludo.mp4", src: "eliel/01_saludo", cam: "A3", at: 4.8, ss: 0, hasta: 3.5, video: true },
    { escena: "equipo", orig: "César/01_saludo.mp4", src: "cesar/01_saludo", cam: "A4", at: 6.0, ss: 0, hasta: 4.06, video: true },
    // problema · cameo de Fernando, luego voz de Mateo
    { escena: "problema", orig: "Fernando/07_cameo_problema.mov", src: "fernando/07_cameo_problema", cam: "B", at: 0.6, ss: 0, hasta: 9.4, video: true, audio: true },
    { escena: "problema", orig: "Mateo/05_voz_importa_y_pregunta.ogg", src: "mateo/05_voz_importa_y_pregunta", at: 12.66, ss: 2.2, hasta: 19.4, audio: true },
    // alcance e innovación · Mateo
    { escena: "datos", orig: "Mateo/06_voz_alcance.ogg", src: "mateo/06_voz_alcance", at: 0.35, ss: 0.7, hasta: 11.74, audio: true },
    { escena: "datos", orig: "Mateo/07_cameo_innovacion.mp4", src: "mateo/07_cameo_innovacion", cam: "E", at: 14.4, ss: 0, hasta: 11.52, video: true, audio: true },
    { escena: "datos", orig: "Mateo/08_voz_dos_indices.ogg", src: "mateo/08_voz_dos_indices", at: 26.14, ss: 0.4, hasta: 5.6, audio: true },
    // los datos · Mateo (voz del MOLEC)
    { escena: "molec", orig: "Mateo/10_voz_molec.ogg", src: "mateo/10_voz_molec", at: 0.6, ss: 0, hasta: 12.95, audio: true },
    // técnicas · cameo de Eliel
    { escena: "tecnicas", orig: "Eliel/09_cameo_tecnicas.mp4", src: "eliel/09_cameo_tecnicas", cam: "C", at: 0.36, ss: 0.8, hasta: 6.5, video: true, audio: true },
    // técnicas, independencia y el hogar · Eliel (voz)
    { escena: "tecnicas", orig: "Eliel/02_voz_tecnicas_supuestos.m4a", src: "eliel/02_voz_tecnicas_supuestos", at: 8.75, ss: 0.85, hasta: 5.23, audio: true },
    { escena: "independencia", orig: "Eliel/03_voz_indep_pregunta.m4a", src: "eliel/03_voz_indep_pregunta", at: 0.15, ss: 0.63, hasta: 6.85, audio: true },
    { escena: "independencia", orig: "Eliel/04_voz_indep_ji_cuadrada.m4a", src: "eliel/04_voz_indep_ji_cuadrada", at: 7.85, ss: 1.29, hasta: 7.45, audio: true },
    { escena: "ventanas", orig: "Eliel/05_voz_ventanas_bajo.m4a", src: "eliel/05_voz_ventanas_bajo", at: 0.75, ss: 1.15, hasta: 6.6, audio: true },
    { escena: "ventanas", orig: "Eliel/06_voz_ventanas_alto.m4a", src: "eliel/06_voz_ventanas_alto", at: 8.75, ss: 1.03, hasta: 5.7, audio: true },
    { escena: "ventanas", orig: "Eliel/07_voz_ventanas_intervalos.m4a", src: "eliel/07_voz_ventanas_intervalos", at: 14.75, ss: 1.01, hasta: 5.45, audio: true },
    // resultados 3 y 4 · César (voz)
    { escena: "solo", orig: "César/02_voz_res3_grupos.mp3", src: "cesar/02_voz_res3_grupos", at: 0.5, ss: 0, hasta: 6.87, audio: true },
    { escena: "solo", orig: "César/03_voz_res3_porcentajes.mp3", src: "cesar/03_voz_res3_porcentajes", at: 9.9, ss: 0.4, hasta: 6.08, audio: true },
    { escena: "solo", orig: "César/04_voz_res3_prueba_z.mp3", src: "cesar/04_voz_res3_prueba_z", at: 18.9, ss: 0, hasta: 5.23, audio: true },
    { escena: "libros", orig: "César/05_voz_res4_libros.mp3", src: "cesar/05_voz_res4_libros", at: 0.8, ss: 0.4, hasta: 9.8, audio: true },
    // limitaciones y conclusiones · cameo de César (cuatro tomas en el mismo marco)
    { escena: "limites", orig: "César/06_cameo_limitaciones.mp4", src: "cesar/06_cameo_limitaciones", cam: "D", at: 0.6, ss: 1.0, hasta: 8.55, video: true, audio: true },
    { escena: "limites", orig: "César/07_cameo_conclusion1.mp4", src: "cesar/07_cameo_conclusion1", cam: "D", at: 8.6, ss: 1.0, hasta: 6.3, video: true, audio: true },
    { escena: "limites", orig: "César/08_cameo_conclusion2.mp4", src: "cesar/08_cameo_conclusion2", cam: "D", at: 14.1, ss: 0.7, hasta: 4.6, video: true, audio: true },
    { escena: "limites", orig: "César/09_cameo_conclusion3.mp4", src: "cesar/09_cameo_conclusion3", cam: "D", at: 18.2, ss: 0.5, hasta: 3.95, video: true, audio: true },
    // impacto · Fernando (voz)
    { escena: "impacto", orig: "Fernando/08_voz_impacto_social.m4a", src: "fernando/08_voz_impacto_social", at: 0.65, ss: 0.4, hasta: 5.4, audio: true },
    { escena: "impacto", orig: "Fernando/09_voz_impacto_propuesta.m4a", src: "fernando/09_voz_impacto_propuesta", at: 9.25, ss: 0.3, hasta: 8.8, audio: true },
    { escena: "impacto", orig: "Fernando/10_voz_impacto_ods.m4a", src: "fernando/10_voz_impacto_ods", at: 19.0, ss: 0, hasta: 4.6, audio: true },
    // cierre · Fernando (voz) y despedidas
    { escena: "cierre", orig: "Fernando/11_voz_cierre_desigualdad.m4a", src: "fernando/11_voz_cierre_desigualdad", at: 1.0, ss: 0, hasta: 2.4, audio: true },
    { escena: "cierre", orig: "Fernando/12_voz_cierre_solucion.m4a", src: "fernando/12_voz_cierre_solucion", at: 5.05, ss: 0.1, hasta: 2.6, audio: true },
    { escena: "cierre", orig: "Fernando/01_saludo_y_despedida.mov", src: "fernando/01_saludo_y_despedida", cam: "F1", at: 1.0, ss: 0, hasta: 3.36, video: true },
    { escena: "cierre", orig: "Mateo/09_despedida.mp4", src: "mateo/09_despedida", cam: "F2", at: 1.5, ss: 0, hasta: 3.3, video: true },
    { escena: "cierre", orig: "Eliel/08_despedida.mp4", src: "eliel/08_despedida", cam: "F3", at: 2.0, ss: 0, hasta: 3.5, video: true },
    { escena: "cierre", orig: "César/10_despedida.mp4", src: "cesar/10_despedida", cam: "F4", at: 2.5, ss: 0, hasta: 3.72, video: true },
  ],
  escenas: [
    {
      id: "historia", nombre: "Dos infancias", dur: 28, pausas: { lead: 1.8 },
      voz: [
        { t0: 3.6, t1: 5.7, q: "voz", rec: "Fernando", x: "Héctor creció en una casa sin libros…" },
        { t0: 9.2, t1: 11.9, q: "voz", rec: "Fernando", x: "…pero en la escuela, sus maestros lo motivaban a leer." },
        { t0: 14.0, t1: 16.0, q: "voz", rec: "Fernando", x: "A Eduardo le leían todas las noches…" },
        { t0: 19.2, t1: 21.5, q: "voz", rec: "Fernando", x: "…pero en su escuela nadie hablaba de libros." },
        { t0: 24.4, t1: 25.7, q: "voz", rec: "Fernando", x: "¿Quién leerá más de adulto?" },
      ],
    },
    {
      id: "equipo", nombre: "Quiénes somos", dur: 26,
      voz: [
        { t0: 2.0, t1: 9.2, q: "voz", rec: "Mateo", x: "Somos Fernando, Mateo, Eliel y César, estudiantes de profesional del Tecnológico de Monterrey." },
        { t0: 9.6, t1: 15.7, q: "voz", rec: "Mateo", x: "Hoy les vamos a presentar nuestra investigación: «Desigualdad en el acceso a la lectura»." },
        { t0: 17.6, t1: 24.9, q: "voz", rec: "Mateo", x: "Una investigación que desarrollamos en la clase de Modelación estadística, con las doctoras Blanca Ruiz y María Guadalupe Tobías." },
      ],
    },
    {
      id: "molec", nombre: "Los datos: el MOLEC", dur: 15.5, pausas: { tail: 2.0 },
      voz: [
        { t0: 0.6, t1: 13.3, q: "voz", rec: "Mateo", x: "Para hacerla, usamos el MOLEC, el Módulo sobre Lectura del INEGI. Cada febrero, pregunta a personas de 18 años o más que saben leer qué leen hoy… y qué estímulos de lectura tuvieron en su infancia." },
      ],
    },
    {
      id: "problema", nombre: "Problema y pregunta", dur: 31,
      voz: [
        { t0: 0.6, t1: 9.9, q: "Cameo 1", rec: "Fernando", x: "El problema que encontramos es que, de los datos de la muestra, solo el 41.7% de los adultos alfabetos había leído al menos un libro en el último año: un dato demasiado bajo." },
        { t0: 12.9, t1: 19.2, q: "voz", rec: "Mateo", x: "Importa porque el hábito lector se forma en la infancia, y el acceso no es igual para todos." },
        { t0: 19.7, t1: 29.4, q: "voz", rec: "Mateo", x: "Eso nos llevó a preguntarnos: ¿cómo se relaciona el acceso a la lectura en la infancia con leer o no leer libros de adulto, y con cuántos?" },
      ],
    },
    {
      id: "datos", nombre: "Alcance e innovación", dur: 34.0,
      voz: [
        { t0: 0.6, t1: 11.6, q: "voz", rec: "Mateo", x: "El alcance fue utilizar seis levantamientos del MOLEC, de 2019 a 2024, utilizando 11,685 adultos de 32 áreas urbanas." },
        { t0: 14.4, t1: 25.9, q: "Cameo 4", rec: "Mateo", x: "Nuestra innovación fue que usamos ocho preguntas de la encuesta que hablan sobre la lectura en la infancia y construimos dos índices de acceso a la lectura." },
        { t0: 26.4, t1: 31.0, q: "voz", rec: "Mateo", x: "Uno del hogar y otro de la primaria, para compararlos frente a frente." },
      ],
    },
    {
      id: "tecnicas", nombre: "Técnicas y supuestos", dur: 18.5,
      voz: [
        { t0: 0.6, t1: 5.9, q: "Cameo 2", rec: "Eliel", x: "Hicimos pruebas de hipótesis e intervalos de confianza en R, con un nivel de significancia de 0.04." },
        { t0: 9.0, t1: 12.9, q: "voz", rec: "Eliel", x: "Cada técnica tiene su propio supuesto, y verificamos cada uno." },
      ],
    },
    {
      id: "independencia", nombre: "Resultado: independencia", dur: 16.8,
      voz: [
        { t0: 0.4, t1: 6.1, q: "voz", rec: "Eliel", x: "¿Son independientes los índices? Los comparamos con lo que esperaríamos si fueran independientes." },
        { t0: 8.1, t1: 13.7, q: "voz", rec: "Eliel", x: "La prueba ji-cuadrada da evidencia de que no lo son: el acceso escolar tiende a acompañar al del hogar." },
      ],
    },
    {
      id: "ventanas", nombre: "Resultado: el hogar", dur: 22.5,
      voz: [
        { t0: 1.0, t1: 6.0, q: "voz", rec: "Eliel", x: "Leyó al menos un libro 28.1% de quienes tuvieron acceso bajo en el hogar…" },
        { t0: 9.0, t1: 13.2, q: "voz", rec: "Eliel", x: "…y 59.7% de quienes tuvieron acceso alto." },
        { t0: 15.0, t1: 18.9, q: "voz", rec: "Eliel", x: "Con 96% de confianza, estos intervalos no se traslapan." },
      ],
    },
    {
      id: "solo", nombre: "Resultado: casa o escuela", dur: 28.5,
      voz: [
        { t0: 0.6, t1: 7.3, q: "voz", rec: "César", x: "Separamos a quienes tuvieron estímulo solo en la escuela, como Héctor, de quienes lo tuvieron solo en casa, como Eduardo." },
        { t0: 10.1, t1: 15.4, q: "voz", rec: "César", x: "Solo en la escuela leyó 27.0%; solo en casa, 46.4%." },
        { t0: 19.0, t1: 23.9, q: "voz", rec: "César", x: "La prueba z de diferencia de proporciones da evidencia de que esas proporciones son distintas." },
      ],
    },
    {
      id: "libros", nombre: "Resultado: cuántos libros", dur: 17,
      voz: [
        { t0: 1.0, t1: 9.7, q: "voz", rec: "César", x: "Entre quienes sí leen, la diferencia en cantidad de libros es significativa pero pequeña: entre 0.43 y 1.13 libros al año." },
      ],
    },
    {
      id: "limites", nombre: "Límites y conclusiones", dur: 22.5,
      voz: [
        { t0: 0.6, t1: 7.6, q: "Cameo 3", rec: "César", x: "Son asociaciones, no causalidad: 32 áreas urbanas, respuestas de memoria y sin factor de expansión." },
        { t0: 8.9, t1: 13.5, q: "Cameo 3", rec: "César", x: "Concluimos que el acceso en la infancia se relaciona sobre todo con volverse lector…" },
        { t0: 14.3, t1: 17.7, q: "Cameo 3", rec: "César", x: "…que el hogar se asocia más con leer que la escuela…" },
        { t0: 18.3, t1: 21.3, q: "Cameo 3", rec: "César", x: "…y que los dos índices no son independientes." },
      ],
    },
    {
      id: "impacto", nombre: "Impacto social", dur: 25,
      voz: [
        { t0: 0.8, t1: 5.4, q: "voz", rec: "Fernando", x: "Su impacto social: evidencia de que la brecha lectora se asocia sobre todo con el acceso en el hogar." },
        { t0: 9.4, t1: 17.7, q: "voz", rec: "Fernando", x: "Por eso proponemos diagnosticar el acceso en casa, focalizar a quienes tuvieron cero o un estímulo, reforzar las bibliotecas de aula e involucrar a las familias." },
        { t0: 19.0, t1: 23.5, q: "voz", rec: "Fernando", x: "Contribuye a los ODS 4 y 10: educación de calidad y menos desigualdades." },
      ],
    },
    {
      id: "cierre", nombre: "Cierre", dur: 19, pausas: { tail: 7.5, vel: 1.5 },
      voz: [
        { t0: 1.0, t1: 3.3, q: "voz", rec: "Fernando", x: "La desigualdad en el acceso empieza en casa…" },
        { t0: 5.2, t1: 7.6, q: "voz", rec: "Fernando", x: "…y ahí también puede empezar la solución." },
      ],
    },
  ],
};
(function (G) {
  /* Los tiempos de guion.js y de las escenas son "internos". Para que no haya silencios largos,
     cada escena se reproduce con un mapa de tiempo: donde hay voz va a 1×, y en los silencios
     entre frases el tiempo se comprime (la animación corre más rápido, hasta `vel` veces). */
  const BASE = { lead: 1.4, gap: 1.0, tail: 1.2, vel: 2.0 };
  const cuanto = (L, meta, vel) => (L <= meta ? L : Math.max(meta, L / vel));
  let t = 0;
  G.voz = [];
  G.escenas.forEach((e, i) => {
    const P = Object.assign({}, BASE, e.pausas || {});
    const T = e.dur;
    // tramos con voz: grabaciones (de principio a fin del recorte) y líneas que aún no se graban
    const tramos = [];
    (G.medios || []).filter((m) => m.escena === e.id && m.audio).forEach((m) => tramos.push([m.at, m.at + (m.hasta - m.ss)]));
    e.voz.filter((v) => !v.rec).forEach((v) => tramos.push([v.t0, v.t1]));
    tramos.sort((a, b) => a[0] - b[0]);
    const u = [];
    tramos.forEach(([a, b]) => { a = Math.max(0, a); b = Math.min(T, b); if (u.length && a <= u[u.length - 1][1] + 0.3) u[u.length - 1][1] = Math.max(u[u.length - 1][1], b); else u.push([a, b]); });
    const mapa = [[0, 0]];
    let o = 0, ant = 0;
    u.forEach(([a, b], k) => {
      o += cuanto(a - ant, k === 0 ? P.lead : P.gap, P.vel); mapa.push([o, a]);
      o += b - a; mapa.push([o, b]); ant = b;
    });
    o += cuanto(T - ant, P.tail, P.vel); mapa.push([o, T]);
    e.Tin = T; e.mapa = mapa; e.dur = +o.toFixed(3);
    e.map = (x) => { for (let k = 1; k < mapa.length; k++) if (x <= mapa[k][1] || k === mapa.length - 1) { const [o0, i0] = mapa[k - 1], [o1, i1] = mapa[k]; return i1 === i0 ? o0 : o0 + ((x - i0) * (o1 - o0)) / (i1 - i0); } return o; };
    e.n = i + 1; e.t0 = t; e.t1 = t + e.dur; t = e.t1;
    e.voz.forEach((v) => G.voz.push({ t0: e.t0 + e.map(v.t0), t1: e.t0 + e.map(v.t1), q: v.q, x: v.x, rec: v.rec, escena: e.id }));
  });
  G.dur = t;
  const esc = Object.fromEntries(G.escenas.map((e) => [e.id, e]));
  (G.medios || []).forEach((m) => { const e = esc[m.escena]; m.abs = e.t0 + e.map(m.at); });
})(window.GUION);
