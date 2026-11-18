/* Escena 1 · Dos infancias. Seis planos dibujados desde cero:
   A calle de noche · B la sala de Héctor · C el salón de Héctor · D el cuarto de Eduardo · E el salón de Eduardo · F la pregunta. */
(function () {
  const { C, s, g, rect, path, circ, U, figura, posar, halo, haloP, rng } = A;
  const PIEL = ["#E0A77E", "#C98B62", "#A9714D", "#EDBE98"];

  const grad = (svg, id, stops, attrs = { x1: 0, y1: 0, x2: 0, y2: 1 }, tipo = "linearGradient") => {
    const d = svg.querySelector("defs") || s("defs", {}, svg);
    const lg = s(tipo, Object.assign({ id }, attrs), d);
    stops.forEach(([o, c, op]) => s("stop", { offset: o, "stop-color": c, "stop-opacity": op == null ? 1 : op }, lg));
    return `url(#${id})`;
  };
  const tablas = (p, y, color, n = 9) => { for (let i = 1; i < n; i++) rect(p, -480, y + i * i * 5.2, 2880, 2.5, color); };
  const parpadeo = (tl, el, t0, t1, seed, lo = 0.55, hi = 1) => {
    const r = rng(seed);
    let t = t0;
    while (t < t1) { const d = 0.08 + r() * 0.28; tl.to(el, { opacity: lo + r() * (hi - lo), duration: d, ease: "none" }, t); t += d; }
  };

  /* ================= A · La calle ================= */
  function calle(parent) {
    const pl = A.plano(parent, { fondo: "linear-gradient(#070B26 0%, #141B4A 45%, #2B3A86 100%)" });
    const cielo = pl.capa(-1100, { sombra: false });
    pl.estrellas = U.estrellas(cielo, 150, 7, { x0: -480, x1: 2400, y0: -270, y1: 640 });
    circ(cielo, 1480, 150, 150, "rgba(255,241,201,.10)");
    circ(cielo, 1480, 150, 96, "rgba(255,241,201,.16)");
    circ(cielo, 1480, 150, 62, C.luna);
    circ(cielo, 1462, 136, 12, "rgba(210,190,150,.5)"); circ(cielo, 1500, 170, 8, "rgba(210,190,150,.5)");

    const ciudad = pl.capa(-760);
    const r = rng(11);
    for (let x = -480; x < 2400;) {
      const w = 90 + r() * 120, hh = 120 + r() * 260;
      rect(ciudad, x, 760 - hh, w, hh + 300, "#141B4A");
      for (let wy = 760 - hh + 18; wy < 740; wy += 34) for (let wx = x + 12; wx < x + w - 18; wx += 26) if (r() > 0.72) rect(ciudad, wx, wy, 10, 14, r() > 0.5 ? C.luz : "#8FA4E6", { opacity: 0.75 });
      x += w + 6;
    }
    const lomas = pl.capa(-430);
    path(lomas, "M-480,800 Q-100,640 300,740 T1000,700 T1700,730 T2400,690 V1400 H-480 Z", "#101640");
    path(lomas, "M-480,860 Q200,760 700,820 T1500,790 T2400,830 V1400 H-480 Z", "#0C1236");

    const casas = pl.capa(-120);
    const casa = (cx, muro, techo, luzCol, frente) => {
      const gg = g(casas);
      rect(gg, cx - 230, 560, 460, 320, muro);
      path(gg, `M${cx - 280},566 L${cx},360 L${cx + 280},566 Z`, techo);
      rect(gg, cx + 120, 400, 54, 110, techo);
      rect(gg, cx - 40, 730, 90, 150, frente, { rx: 6 });
      circ(gg, cx + 30, 808, 6, C.luz);
      rect(gg, cx - 198, 628, 132, 122, C.papel, { rx: 4 });
      const win = rect(gg, cx - 188, 638, 112, 102, luzCol);
      rect(gg, cx - 136, 638, 8, 102, C.papel); rect(gg, cx - 188, 685, 112, 8, C.papel);
      rect(gg, cx + 76, 628, 112, 102, C.papel, { rx: 4 });
      rect(gg, cx + 86, 638, 92, 82, "#0E1436");
      for (let i = 0; i < 7; i++) rect(gg, cx - 230 + i * 70, 560, 3, 320, "rgba(0,0,0,.10)");
      return win;
    };
    pl.vH = casa(470, "#33457C", "#1B2752", "#A9CDFF", "#1B2752");
    pl.vE = casa(1450, "#B4553F", "#6E2440", C.luz, "#6E2440");
    // siluetas en la ventana cálida: alguien lee
    path(casas, "M1290,740 q6,-40 26,-40 q20,0 24,40 Z", "#7A3B24"); circ(casas, 1316, 690, 13, "#7A3B24");
    path(casas, "M1336,740 q4,-24 16,-24 q13,0 16,24 Z", "#7A3B24"); circ(casas, 1352, 710, 9, "#7A3B24");
    for (let x = 720; x < 1200; x += 46) { rect(casas, x, 800, 12, 84, "#1B2752", { rx: 5 }); }
    rect(casas, 712, 824, 500, 10, "#1B2752"); rect(casas, 712, 858, 500, 10, "#1B2752");

    const piso = pl.capa(0);
    path(piso, "M-480,872 Q960,846 2400,872 V1500 H-480 Z", "#0A0F2E");
    path(piso, "M470,880 q-30,90 -150,210 h260 q-30,-110 -20,-210 Z", "#141B4A");
    path(piso, "M1450,880 q-30,90 -150,210 h260 q-30,-110 -20,-210 Z", "#141B4A");
    const arbol = (x, y, k, col) => {
      const gg = g(piso, { transform: `translate(${x},${y}) scale(${k})` });
      rect(gg, -12, -150, 24, 150, "#2A1E3A", { rx: 8 });
      const copa = g(gg);
      circ(copa, 0, -230, 110, col); circ(copa, -80, -170, 78, d3.color(col).darker(0.4).formatHex()); circ(copa, 84, -176, 82, d3.color(col).darker(0.25).formatHex()); circ(copa, 10, -300, 70, d3.color(col).brighter(0.3).formatHex());
      return copa;
    };
    pl.copas = [arbol(960, 890, 1.25, "#1E4A5A"), arbol(60, 900, 1.0, "#173C52"), arbol(1880, 900, 1.05, "#173C52")];

    const frente = pl.capa(320, { blur: 4, sombra: false });
    circ(frente, -180, 1130, 300, "#050818"); circ(frente, 180, 1210, 260, "#050818"); circ(frente, 2100, 1150, 320, "#050818"); circ(frente, 1780, 1230, 240, "#050818");

    pl.gH = haloP(pl.luces, 318, 690, 300, "rgba(130,180,255,.55)", 0.9);
    pl.gE = haloP(pl.luces, 1298, 690, 340, "rgba(255,190,90,.6)", 0.9);
    haloP(pl.luces, 1480, 150, 420, "rgba(255,241,201,.28)");
    pl.nH = N.t(pl.hud, "Héctor", { x: 240, y: 906, w: 460, size: 92, font: "hand", color: "#BFDcff", align: "center" });
    pl.nE = N.t(pl.hud, "Eduardo", { x: 1220, y: 906, w: 460, size: 92, font: "hand", color: C.luzC, align: "center" });
    return pl;
  }

  /* ================= B · La sala de Héctor ================= */
  function salaHector(parent) {
    const pl = A.plano(parent, { fondo: "#0D1430" });
    const pared = pl.capa(-520, { sombra: false });
    rect(pared, -480, -270, 2880, 1066, "#1C2850");
    for (let x = -480; x < 2400; x += 96) rect(pared, x, -270, 40, 1066, "#202D58");
    rect(pared, -480, 770, 2880, 28, "#121A3A");
    rect(pared, -480, 798, 2880, 600, "#241C3C");
    tablas(pared, 800, "#1B1430");
    U.ventana(pared, 1330, 190, 300, 340, { noche: true, marco: "#B9C3DE", cortina: "#2C3D74" });
    U.cuadro(pared, 300, 236, 150, 116, "#3C6FB4");
    U.cuadro(pared, 490, 290, 96, 76, "#5B2A5E");

    const mueb = pl.capa(-300);
    // el librero vacío
    const est = U.estante(mueb, 650, 214, 450, 560, { filas: 4, lleno: 0, madera: "#46548A", fondo: "#131B3C" });
    circ(mueb, 760, 300, 34, "#B9C3DE"); circ(mueb, 760, 300, 27, "#1C2850");
    s("path", { d: "M760,300 V282 M760,300 H774", stroke: "#B9C3DE", "stroke-width": 4, "stroke-linecap": "round", fill: "none" }, mueb);
    path(mueb, "M980,470 q-22,-34 0,-62 q22,28 0,62 Z", "#55628F"); rect(mueb, 962, 468, 36, 10, "#55628F");
    rect(mueb, 700, 592, 60, 18, "#55628F", { rx: 3 });
    s("path", { d: "M1088,226 q-40,6 -52,54 M1088,250 q-24,2 -40,30 M1062,228 v44 M1088,226 l-46,48", stroke: "#8C93A8", "stroke-width": 1.6, fill: "none", opacity: 0.7 }, mueb);
    // sofá con un adulto rendido
    rect(mueb, 96, 548, 500, 210, "#33407A", { rx: 46 });
    const papa = figura(mueb, { x: 372, y: 684, s: 1.22, piel: "#B58A70", pelo: "#1E1A22", ropa: "#5A6696", pantalon: "#242D52", peinado: "calvo", pose: { lean: -16, cabeza: 44, pF: [84, -80], pT: [76, -72], bF: [16, 34], bT: [6, 26] } });
    rect(mueb, 70, 672, 560, 110, "#3D4C8E", { rx: 34 });
    rect(mueb, 56, 610, 84, 172, "#44539A", { rx: 34 });
    rect(mueb, 560, 610, 84, 172, "#44539A", { rx: 34 });
    pl.papa = papa;

    const tvl = pl.capa(-150);
    // el haz del televisor
    path(tvl, "M1452,566 L1452,672 L560,980 L420,640 Z", grad(tvl, "hazTV", [[0, "#BFE0FF", 0.42], [1, "#BFE0FF", 0]], { x1: 1, y1: 0, x2: 0, y2: 0.4 }));
    pl.haz = tvl.lastChild;
    rect(tvl, 1400, 690, 330, 96, "#2B3668", { rx: 8 }); rect(tvl, 1424, 716, 130, 44, "#1C2550", { rx: 4 }); rect(tvl, 1576, 716, 130, 44, "#1C2550", { rx: 4 });
    rect(tvl, 1440, 540, 250, 156, "#080C22", { rx: 12 });
    pl.pantalla = rect(tvl, 1452, 552, 226, 132, "#CFE6FF", { rx: 6 });
    s("path", { d: "M1560,540 L1520,470 M1560,540 L1610,476", stroke: "#080C22", "stroke-width": 6, "stroke-linecap": "round" }, tvl);

    const fig = pl.capa(0);
    s("ellipse", { cx: 1010, cy: 846, rx: 400, ry: 50, fill: "#4B2A66" }, fig);
    s("ellipse", { cx: 1010, cy: 846, rx: 330, ry: 38, fill: "none", stroke: "#6A4390", "stroke-width": 6 }, fig);
    pl.nino = figura(fig, { x: 930, y: 806, s: 1.55, talla: "nino", piel: PIEL[0], pelo: "#241A1A", ropa: "#3F78C4", pantalon: "#27325E", pose: { lean: 12, cabeza: -16, pF: [128, -158], pT: [118, -150], bF: [34, 56], bT: [28, 60] } });
    rect(fig, 1180, 812, 34, 34, "#E4674E", { rx: 5, transform: "rotate(-12 1197 829)" }); rect(fig, 1226, 818, 30, 30, "#F2B24C", { rx: 5 });
    pl.figCapa = fig;

    const fr = pl.capa(300, { blur: 5, sombra: false });
    rect(fr, -480, -270, 470, 1620, "#04061A");
    U.planta(fr, 1930, 1190, 3.0, "#070B22", "#04061A");

    pl.gTV = haloP(pl.luces, 1500, 620, 760, "rgba(120,175,255,.42)");
    pl.etq = N.t(pl.hud, "Héctor", { x: 150, y: 868, size: 100, font: "hand", color: "#BFDCFF" });
    pl.etq2 = N.t(pl.hud, "en casa: un librero vacío", { x: 156, y: 966, size: 34, font: "body", color: "#BFDCFF" });
    return pl;
  }

  /* ================= C y E · Los salones ================= */
  function aula(parent, calida) {
    const P = calida
      ? { fondo: "#F0DDB8", pared: "#F8E9C9", raya: "#F4E1BB", lambrin: "#E2B780", piso: "#C88A5C", tabla: "#B5774B", piz: "#1F6F78", marco: C.madera, mad: C.madera3 }
      : { fondo: "#8E97AA", pared: "#B9C0CE", raya: "#B3BAC9", lambrin: "#8F98AC", piso: "#6F7790", tabla: "#636B84", piz: "#39445A", marco: "#4A5268", mad: "#7C8499" };
    const pl = A.plano(parent, { fondo: P.fondo });
    const pared = pl.capa(-520, { sombra: false });
    rect(pared, -480, -270, 2880, 1066, P.pared);
    for (let x = -480; x < 2400; x += 120) rect(pared, x, -270, 60, 900, P.raya);
    rect(pared, -480, 620, 2880, 180, P.lambrin);
    rect(pared, -480, 612, 2880, 14, calida ? "#C99A62" : "#7C8499");
    rect(pared, -480, 798, 2880, 600, P.piso);
    tablas(pared, 800, P.tabla);
    if (calida) {
      U.ventana(pared, 120, 150, 250, 380, { noche: false, marco: "#FFF8E8" });
      U.ventana(pared, 470, 150, 250, 380, { noche: false, marco: "#FFF8E8" });
    } else {
      [140, 420].forEach((x) => { rect(pared, x - 10, 150, 220, 150, "#DDE2EA", { rx: 4 }); rect(pared, x, 160, 200, 130, "#C3CAD6"); rect(pared, x + 96, 160, 8, 130, "#DDE2EA"); });
    }
    // pizarrón
    rect(pared, 880, 150, 620, 350, P.marco, { rx: 8 });
    rect(pared, 898, 168, 584, 314, P.piz);
    rect(pared, 880, 500, 620, 16, P.marco, { rx: 4 });
    pl.piz = g(pared);
    if (calida) {
      s("text", { x: 1190, y: 262, "text-anchor": "middle", "font-family": "Caveat, cursive", "font-weight": 700, "font-size": 78, fill: "#FFFDF4" }, pl.piz, "Había una vez…");
      [[960, 330], [1060, 420], [1420, 320], [1330, 430]].forEach(([x, y]) => path(pl.piz, `M${x},${y - 16} L${x + 4},${y - 4} L${x + 16},${y} L${x + 4},${y + 4} L${x},${y + 16} L${x - 4},${y + 4} L${x - 16},${y} L${x - 4},${y - 4} Z`, "#F2B24C"));
    } else {
      for (let i = 0; i < 5; i++) for (let j = 0; j < 3; j++) s("text", { x: 940 + j * 190, y: 226 + i * 54, "font-family": "Caveat, cursive", "font-size": 44, fill: "#C9D0DC", opacity: 0.8 }, pl.piz, `${j + 2} × ${i + 1} = ${(j + 2) * (i + 1)}`);
    }
    // reloj
    circ(pared, 800, 210, 44, "#FFF8E8"); circ(pared, 800, 210, 38, calida ? "#FFF8E8" : "#E3E7EE");
    s("path", { d: "M800,210 V184 M800,210 H820", stroke: C.tinta, "stroke-width": 5, "stroke-linecap": "round", fill: "none" }, pared);

    const mueb = pl.capa(-300);
    pl.est = U.estante(mueb, 1590, 250, 320, 560, calida ? { filas: 4, lleno: 0.96, seed: 9 } : { filas: 4, lleno: 0, madera: "#7C8499", fondo: "#5B6278" });
    if (calida) {
      const rot = N.t(pl.hud, "", {});
      rot.remove();
      s("text", { x: 1750, y: 232, "text-anchor": "middle", "font-family": "Nunito, sans-serif", "font-weight": 800, "font-size": 26, fill: C.madera2, "letter-spacing": 3 }, mueb, "BIBLIOTECA");
    }
    // maestra
    const fl = 800;
    pl.maestra = figura(mueb, calida
      ? { x: 1380, y: fl - 236, s: 1.32, flip: true, piel: PIEL[1], pelo: "#3A2418", ropa: "#8E5BA8", pantalon: "#3A2C52", peinado: "chongo", pose: { lean: 4, cabeza: -4, bF: [118, -34], bT: [18, 30] } }
      : { x: 1240, y: fl - 236, s: 1.32, piel: "#B9A090", pelo: "#3C3C46", ropa: "#5E667C", pantalon: "#3C4458", peinado: "corto", pose: { lean: 2, cabeza: -8, bF: [128, -22], bT: [8, 8] } });
    if (calida) pl.libroM = U.libroAbierto(mueb, 0, 0, 1.25, C.coral);

    const fig = pl.capa(0);
    pl.ninos = [];
    const sillas = calida ? [[430, 0], [700, 1], [980, 2]] : [[300, 0], [560, 1], [820, 2], [1080, 3]];
    const ropaC = ["#E4674E", "#2FA39A", "#3F78C4", "#F2B24C"], ropaG = ["#7F879B", "#8E96A8", "#747C92", "#9AA1B2"];
    sillas.forEach(([x, i]) => {
      const esEl = calida ? i === 2 : i === 1;
      const o = calida
        ? { x: x - 36, y: fl - 96, s: 1.42, talla: "nino", piel: PIEL[i % 4], pelo: ["#3A2418", "#1E1A22", "#241A1A"][i], ropa: esEl ? "#3F78C4" : ropaC[i], pantalon: "#2B3558", peinado: i === 0 ? "largo" : "corto", pose: { lean: 10, cabeza: esEl ? 14 : -6, pF: [88, -88], pT: [82, -84], bF: [64, 40], bT: [56, 44] } }
        : { x: x - 36, y: fl - 96, s: 1.42, talla: "nino", piel: esEl ? PIEL[2] : "#B9A898", pelo: esEl ? "#5A3418" : "#3C3C46", ropa: esEl ? "#F2A03C" : ropaG[i], pantalon: esEl ? "#4A3A2E" : "#4A5268", peinado: esEl ? "rizado" : (i === 2 ? "largo" : "corto"), pose: { lean: 22, cabeza: esEl ? -34 : 30, pF: [88, -88], pT: [82, -84], bF: [70, 30], bT: [62, 34] } };
      const f = figura(fig, o);
      U.pupitre(fig, x + 30, fl, 1.28, P.mad);
      if (!calida) rect(fig, x - 6, fl - 152, 70, 10, "#E3E7EE", { rx: 2, transform: `rotate(-3 ${x + 30} ${fl - 148})` });
      pl.ninos.push(f);
      if (esEl) { pl.prota = f; pl.elX = x; }
    });
    if (calida) {
      // el libro de Héctor brilla
      pl.luzLibro = circ(fig, pl.elX + 34, fl - 176, 150, grad(fig, "luzLibro", [[0, "#FFE3A8", 0.9], [1, "#FFE3A8", 0]], { cx: 0.5, cy: 0.5, r: 0.5 }, "radialGradient"));
      pl.libro = U.libroAbierto(fig, pl.elX + 34, fl - 158, 1.2, "#F2B24C");
      pl.aves = [0, 1, 2, 3, 4].map(() => s("path", { d: "M-16,0 Q-8,-12 0,0 Q8,-12 16,0", fill: "none", stroke: "#FFF8E8", "stroke-width": 5, "stroke-linecap": "round", "stroke-linejoin": "round" }, fig));
      // rayos de sol
      const sol = pl.capa(-120, { sombra: false });
      [[120, 370], [470, 720]].forEach(([a, b], i) => path(sol, `M${a},150 L${b},150 L${b + 900},1100 L${a + 620},1100 Z`, grad(sol, "sol" + i, [[0, "#FFF3B0", 0.5], [1, "#FFF3B0", 0]], { x1: 0, y1: 0, x2: 0.6, y2: 1 })));
      pl.sol = sol;
    }
    const fr = pl.capa(300, { blur: 5, sombra: false });
    const osc = calida ? "#5B3A22" : "#2B3140";
    [[260, 1150], [980, 1190], [1700, 1140]].forEach(([x, y]) => { circ(fr, x, y - 250, 96, osc); rect(fr, x - 130, y - 170, 260, 500, osc, { rx: 80 }); });
    if (calida) haloP(pl.luces, 300, 300, 900, "rgba(255,230,150,.34)");
    else haloP(pl.luces, 960, 80, 800, "rgba(200,215,240,.16)");
    return pl;
  }

  /* ================= D · El cuarto de Eduardo ================= */
  function cuartoEduardo(parent) {
    const pl = A.plano(parent, { fondo: "#1E1028" });
    const pared = pl.capa(-520, { sombra: false });
    rect(pared, -480, -270, 2880, 1066, "#3A2144");
    const r = rng(21);
    for (let i = 0; i < 90; i++) { const x = -480 + r() * 2880, y = -270 + r() * 1000; path(pared, `M${x},${y - 9} L${x + 3},${y - 3} L${x + 9},${y} L${x + 3},${y + 3} L${x},${y + 9} L${x - 3},${y + 3} L${x - 9},${y} L${x - 3},${y - 3} Z`, "#4C2D57"); }
    rect(pared, -480, 770, 2880, 28, "#24122C");
    rect(pared, -480, 798, 2880, 600, "#2C1830");
    tablas(pared, 800, "#221026");
    U.ventana(pared, 150, 170, 280, 330, { noche: true, marco: "#F6EBD6", cortina: "#7B2D43" });
    U.cuadro(pared, 1130, 210, 170, 130, C.teal2);

    const mueb = pl.capa(-300);
    pl.est = U.estante(mueb, 1390, 150, 420, 650, { filas: 5, lleno: 0.97, seed: 5, madera: "#8A5A3C", fondo: "#4A2A22" });
    // buró y lámpara
    rect(mueb, 470, 650, 150, 150, "#7A4A34", { rx: 6 }); rect(mueb, 486, 676, 118, 44, "#5E3626", { rx: 4 }); circ(mueb, 545, 698, 6, C.luz);
    pl.lamp = U.lampara(mueb, 545, 650, { pantalla: "#FFE3A8", base: "#5E3626", s: 1.25 });
    rect(mueb, 500, 630, 60, 12, "#2FA39A", { rx: 2 }); rect(mueb, 506, 618, 50, 12, "#E4674E", { rx: 2 });

    const cama = pl.capa(-150);
    pl.cono = s("ellipse", { cx: 620, cy: 640, rx: 760, ry: 520, fill: grad(cama, "cono", [[0, "#FFC56B", 0.5], [0.5, "#FFC56B", 0.18], [1, "#FFC56B", 0]], { cx: 0.5, cy: 0.5, r: 0.5 }, "radialGradient") }, cama);
    rect(cama, 640, 470, 46, 330, "#8A5A3C", { rx: 14 });
    rect(cama, 660, 690, 700, 110, "#6B4028", { rx: 10 });
    rect(cama, 672, 640, 680, 70, "#FFF8E8", { rx: 22 });
    rect(cama, 690, 606, 190, 62, "#FFFFFF", { rx: 28 });
    // el niño acostado
    const nc = g(cama, { transform: "translate(792,612) rotate(-78)" });
    s("ellipse", { cx: 0, cy: 0, rx: 34, ry: 37, fill: PIEL[2] }, nc);
    for (let i = 0; i < 9; i++) { const a = A.rad(-205 + i * 28); circ(nc, Math.cos(a) * 30, Math.sin(a) * 32 - 2, 14, "#5A3418"); }
    circ(nc, -8, -28, 18, "#5A3418");
    s("path", { d: "M14,2 q5,5 10,0", fill: "none", stroke: C.tinta, "stroke-width": 2.6, "stroke-linecap": "round" }, nc);
    s("ellipse", { cx: 16, cy: 14, rx: 8, ry: 5, fill: "#E8806F", opacity: 0.45 }, nc);
    pl.cobija = path(cama, "M836,668 Q880,596 1010,612 Q1180,590 1352,640 L1356,724 L836,724 Z", "#2FA39A");
    for (let i = 0; i < 6; i++) path(cama, `M${880 + i * 80},${640 - (i % 2) * 8} q20,-14 40,0 q-20,14 -40,0 Z`, "#9AD4C4", { opacity: 0.7 });
    rect(cama, 830, 716, 536, 84, "#268C84", { rx: 8 });
    rect(cama, 1336, 600, 40, 200, "#8A5A3C", { rx: 12 });

    const fig = pl.capa(0);
    pl.mama = figura(fig, { x: 1090, y: 664, s: 1.34, flip: true, piel: PIEL[2], pelo: "#3A2418", ropa: "#E4674E", pantalon: "#5B2A5E", peinado: "largo", pose: { lean: 12, cabeza: 16, pF: [86, -86], pT: [80, -82], bF: [48, 62], bT: [40, 66] } });
    pl.libro = U.libroAbierto(fig, 0, 0, 1.3, "#F2B24C");
    pl.suenos = g(fig);
    const forma = (d, col) => { const e = path(pl.suenos, d, col); e.style.opacity = 0; return e; };
    pl.formas = [
      forma("M0,-22 L6,-6 L22,0 L6,6 L0,22 L-6,6 L-22,0 L-6,-6 Z", "#FFE3A8"),
      forma("M-40,0 q40,34 80,0 l-10,22 h-60 Z M0,-4 v-46 l30,34 Z", "#FFF8E8"),
      forma("M-48,6 q10,-36 54,-30 q30,4 40,30 q-20,22 -60,18 q-22,-2 -34,-18 Z M46,6 l22,-18 v36 Z", "#9AD4C4"),
      forma("M-20,0 Q-10,-16 0,0 Q10,-16 20,0", "none"),
      forma("M0,-16 L4,-4 L16,0 L4,4 L0,16 L-4,4 L-16,0 L-4,-4 Z", "#F2A69A"),
      forma("M-30,10 a30,30 0 1,1 40,-34 a24,24 0 1,0 -40,34 Z", "#FFF1C9"),
    ];
    pl.formas[3].setAttribute("stroke", "#FFF8E8"); pl.formas[3].setAttribute("stroke-width", 5); pl.formas[3].setAttribute("stroke-linecap", "round");

    const fr = pl.capa(300, { blur: 5, sombra: false });
    rect(fr, 1960, -270, 440, 1620, "#0B0612");
    circ(fr, -150, 1160, 260, "#0B0612"); rect(fr, -330, 940, 260, 400, "#0B0612", { rx: 40 });
    pl.gL = haloP(pl.luces, 560, 520, 720, "rgba(255,190,90,.5)");
    pl.etq = N.t(pl.hud, "Eduardo", { x: 1380, y: 868, size: 100, font: "hand", color: C.luzC });
    pl.etq2 = N.t(pl.hud, "en casa: un cuento cada noche", { x: 1384, y: 966, size: 34, font: "body", color: C.luzC });
    return pl;
  }

  /* ================= F · La pregunta ================= */
  function pregunta(parent) {
    const pl = A.plano(parent, { fondo: "#070A22" });
    const fondo = pl.capa(-520, { sombra: false });
    U.estante(fondo, -420, -40, 2760, 900, { filas: 6, lleno: 0.97, seed: 31, madera: "#2B2248", fondo: "#120E2A", paleta: ["#3A3470", "#4A3A7A", "#2F4A86", "#5B2A5E", "#27337A", "#6A4390", "#1F4F78"] });
    rect(fondo, -480, 860, 2880, 600, "#0C0A22");
    const conos = pl.capa(-200, { sombra: false });
    pl.cH = path(conos, "M560,-270 L700,-270 L900,880 L360,880 Z", grad(conos, "cH", [[0, "#A9CDFF", 0.42], [1, "#A9CDFF", 0.04]]));
    pl.cE = path(conos, "M1220,-270 L1360,-270 L1560,880 L1020,880 Z", grad(conos, "cE", [[0, "#FFC56B", 0.46], [1, "#FFC56B", 0.04]]));
    s("ellipse", { cx: 630, cy: 884, rx: 290, ry: 34, fill: "rgba(169,205,255,.28)" }, conos);
    s("ellipse", { cx: 1290, cy: 884, rx: 290, ry: 34, fill: "rgba(255,197,107,.3)" }, conos);
    const fig = pl.capa(0);
    const fl = 880;
    pl.hN = figura(fig, { x: 630, y: fl - 152, s: 1.5, talla: "nino", piel: PIEL[0], pelo: "#241A1A", ropa: "#3F78C4", pantalon: "#27325E" });
    pl.eN = figura(fig, { x: 1290, y: fl - 152, s: 1.5, flip: true, talla: "nino", piel: PIEL[2], pelo: "#5A3418", ropa: "#F2A03C", pantalon: "#4A3A2E", peinado: "rizado" });
    pl.hA = figura(fig, { x: 630, y: fl - 232, s: 1.3, piel: PIEL[0], pelo: "#241A1A", ropa: "#3F78C4", pantalon: "#27325E", pose: { bF: [38, 96], bT: [30, 100] } });
    pl.eA = figura(fig, { x: 1290, y: fl - 232, s: 1.3, flip: true, piel: PIEL[2], pelo: "#5A3418", ropa: "#F2A03C", pantalon: "#4A3A2E", peinado: "rizado", pose: { bF: [38, 96], bT: [30, 100] } });
    const libro = (f, col) => { const gg = g(f.root); rect(gg, f.manoF[0] - 18, f.manoF[1] - 44, 44, 60, col, { rx: 4 }); rect(gg, f.manoF[0] - 18, f.manoF[1] - 44, 9, 60, "rgba(0,0,0,.25)"); f.root.insertBefore(gg, f.root.lastChild.previousSibling); return gg; };
    pl.lH = libro(pl.hA, "#FFF8E8"); pl.lE = libro(pl.eA, "#FFF8E8");
    const fr = pl.capa(300, { blur: 6, sombra: false });
    rect(fr, -480, 1010, 2880, 400, "#03040F");
    haloP(pl.luces, 630, 420, 520, "rgba(130,180,255,.3)");
    haloP(pl.luces, 1290, 420, 520, "rgba(255,190,90,.32)");
    pl.q = N.t(pl.hud, "¿Quién leerá más de adulto?", { x: 0, y: 56, w: 1920, size: 100, align: "center", color: C.crema });
    pl.marcaH = N.t(pl.hud, "?", { x: 580, y: 196, w: 100, size: 150, align: "center", color: "#BFDCFF", weight: 700 });
    pl.marcaE = N.t(pl.hud, "?", { x: 1240, y: 196, w: 100, size: 150, align: "center", color: C.luzC, weight: 700 });
    return pl;
  }

  N.add({
    id: "historia",
    build(el, tl) {
      const pa = calle(el), pb = salaHector(el), pc = aula(el, true), pd = cuartoEduardo(el), pe = aula(el, false), pf = pregunta(el);
      const T = { b: 3.3, c: 8.7, d: 13.6, e: 18.7, f: 23.4 };

      // ---- A · la calle (0 – 3.3)
      N.entra(tl, pa, 0);
      N.camara(tl, pa, { z: -120, y: -30 }, { z: 110, y: 10 }, 0, 2.6, "sine.out");
      tl.to(pa.cam, { x: 660, y: -160, z: 780, duration: 0.8, ease: "power2.in" }, 2.55);
      tl.fromTo(pa.estrellas, { opacity: 0.2 }, { opacity: 1, duration: 0.7, stagger: { each: 0.011, repeat: 3, yoyo: true }, ease: "sine.inOut" }, 0);
      pa.copas.forEach((c, i) => tl.fromTo(c, { rotation: -2.5, svgOrigin: "0 -150" }, { rotation: 2.5, svgOrigin: "0 -150", duration: 1.5 + i * 0.3, yoyo: true, repeat: 2, ease: "sine.inOut" }, 0));
      parpadeo(tl, pa.vH, 0, 3.3, 3, 0.45, 1);
      parpadeo(tl, pa.gH, 0, 3.3, 3, 0.45, 0.95);
      N.show(tl, [pa.nH, pa.nE], 0.7, { stagger: 0.35, y: 16 });
      N.hide(tl, [pa.nH, pa.nE], 2.5, 0.3);
      N.atraves(tl, pa, pb, 2.75, 0.7);

      // ---- B · la sala de Héctor (3.3 – 8.7)
      N.camara(tl, pb, { x: 70, z: -60 }, { x: -70, z: 90 }, T.b - 0.4, T.c + 0.2);
      parpadeo(tl, pb.pantalla, T.b - 0.4, T.c + 0.4, 9, 0.5, 1);
      parpadeo(tl, pb.gTV, T.b - 0.4, T.c + 0.4, 9, 0.5, 1);
      parpadeo(tl, pb.haz, T.b - 0.4, T.c + 0.4, 9, 0.45, 1);
      posar(tl, pb.nino, { cabeza: 8, lean: 16 }, T.b + 2.2, 1.6);
      posar(tl, pb.papa, { cabeza: 52 }, T.b + 1.0, 2.0);
      posar(tl, pb.papa, { cabeza: 44 }, T.b + 3.2, 2.0);
      N.write(tl, pb.etq, T.b + 0.3, 0.6);
      N.show(tl, pb.etq2, T.b + 1.0, { y: 10 });
      N.hoja(tl, pb, pc, T.c - 0.45, 0.9);

      // ---- C · el salón de Héctor (8.7 – 13.6)
      N.camara(tl, pc, { x: -40, z: -80 }, { x: 60, y: 20, z: 150 }, T.c - 0.4, T.d + 0.3);
      const ms = pc.maestra;
      const pon = () => { const m = ms.manoF; pc.libroM.setAttribute("transform", `translate(${(1380 - m[0] * 1.32).toFixed(1)},${(564 + m[1] * 1.32 - 16).toFixed(1)}) scale(1.25)`); };
      pon();
      const mov = { _redraw() { pon(); } };
      posar(tl, ms, { bF: [132, -40], cabeza: -10 }, T.c + 0.8, 1.2);
      tl.to(mov, { redraw: 1, duration: 1.2 }, T.c + 0.8);
      posar(tl, ms, { bF: [112, -30], cabeza: 0 }, T.c + 2.6, 1.4);
      tl.to({ _redraw() { pon(); } }, { redraw: 1, duration: 1.4 }, T.c + 2.6);
      posar(tl, pc.prota, { cabeza: -6, lean: 6 }, T.c + 1.6, 1.0);
      tl.fromTo(pc.luzLibro, { opacity: 0, scale: 0.4, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" }, T.c + 1.2);
      tl.to(pc.luzLibro, { scale: 1.12, duration: 0.9, yoyo: true, repeat: 3, ease: "sine.inOut" }, T.c + 2.4);
      pc.aves.forEach((b, i) => {
        const x0 = pc.elX + 34, y0 = 800 - 190, t = T.c + 1.6 + i * 0.42;
        tl.fromTo(b, { x: x0, y: y0, scale: 0.3, opacity: 0 }, { x: x0 + 120 + i * 90, y: y0 - 260 - i * 46, scale: 1 + i * 0.12, opacity: 1, duration: 2.2, ease: "power1.out" }, t);
        tl.to(b, { scaleY: 0.5, duration: 0.18, yoyo: true, repeat: 11, ease: "sine.inOut" }, t);
        tl.to(b, { opacity: 0, duration: 0.6 }, t + 1.9);
      });
      N.iris(tl, pc, pd, T.d - 0.5, 560, 520, 0.9);

      // ---- D · el cuarto de Eduardo (13.6 – 18.7)
      N.camara(tl, pd, { x: -50, z: -70 }, { x: 40, y: 10, z: 130 }, T.d - 0.5, T.e + 0.3);
      const ma = pd.mama;
      const ponD = () => { const m = ma.manoF; pd.libro.setAttribute("transform", `translate(${(1090 - m[0] * 1.34 - 10).toFixed(1)},${(664 + m[1] * 1.34 - 14).toFixed(1)}) scale(1.3)`); };
      ponD();
      posar(tl, ma, { cabeza: 8, bF: [52, 66] }, T.d + 1.4, 1.2);
      tl.to({ _redraw() { ponD(); } }, { redraw: 1, duration: 1.2 }, T.d + 1.4);
      posar(tl, ma, { cabeza: 18, bF: [48, 62] }, T.d + 3.2, 1.2);
      tl.to({ _redraw() { ponD(); } }, { redraw: 1, duration: 1.2 }, T.d + 3.2);
      tl.fromTo(pd.gL, { opacity: 0.8 }, { opacity: 1, duration: 1.3, yoyo: true, repeat: 3, ease: "sine.inOut" }, T.d - 0.4);
      pd.formas.forEach((f, i) => {
        const t = T.d + 0.9 + i * 0.5, x0 = 930, y0 = 560;
        tl.fromTo(f, { x: x0, y: y0, scale: 0.2, opacity: 0, rotation: -20 }, { x: x0 - 330 + i * 110, y: y0 - 250 - (i % 3) * 80, scale: 1.25, opacity: 0.95, rotation: 12, duration: 2.6, ease: "power1.out" }, t);
        tl.to(f, { opacity: 0, duration: 0.7 }, t + 2.4);
      });
      N.write(tl, pd.etq, T.d + 0.3, 0.6);
      N.show(tl, pd.etq2, T.d + 1.0, { y: 10 });
      N.hoja(tl, pd, pe, T.e - 0.45, 0.9);

      // ---- E · el salón de Eduardo (18.7 – 23.4)
      N.camara(tl, pe, { x: 70, z: -70 }, { x: -60, z: 80 }, T.e - 0.4, T.f + 0.3);
      posar(tl, pe.maestra, { bF: [140, -30] }, T.e + 0.6, 0.9);
      posar(tl, pe.maestra, { bF: [118, -16] }, T.e + 2.0, 0.9);
      posar(tl, pe.maestra, { bF: [136, -28] }, T.e + 3.2, 0.9);
      posar(tl, pe.prota, { cabeza: -42, lean: 14 }, T.e + 1.4, 1.4);
      pe.ninos.forEach((f, i) => { if (f !== pe.prota) { posar(tl, f, { cabeza: 36 }, T.e + 0.8 + i * 0.3, 0.8); posar(tl, f, { cabeza: 28 }, T.e + 2.4 + i * 0.3, 0.8); } });
      N.fundido(tl, pe, pf, T.f - 0.5, 0.7);

      // ---- F · la pregunta (23.4 – 28)
      N.camara(tl, pf, { z: -140 }, { z: 60 }, T.f - 0.5, 28);
      [[pf.hN, pf.hA, pf.cH], [pf.eN, pf.eA, pf.cE]].forEach(([nino, adulto, cono], i) => {
        const t = T.f + 0.2 + i * 0.25;
        tl.fromTo(cono, { opacity: 0 }, { opacity: 1, duration: 0.8 }, T.f - 0.3 + i * 0.25);
        tl.fromTo(adulto.root, { opacity: 0 }, { opacity: 1, duration: 0.9, ease: "power1.inOut" }, t + 0.5);
        tl.to(nino.root, { opacity: 0, duration: 0.9, ease: "power1.inOut" }, t + 0.5);
      });
      N.write(tl, pf.q, T.f + 1.0, 1.5);
      tl.fromTo([pf.marcaH, pf.marcaE], { autoAlpha: 0, scale: 0.3, y: 40 }, { autoAlpha: 1, scale: 1, y: 0, duration: 0.7, ease: "back.out(2.2)", stagger: 0.25 }, T.f + 2.0);
      tl.to([pf.marcaH, pf.marcaE], { y: -14, duration: 0.9, yoyo: true, repeat: 1, ease: "sine.inOut" }, T.f + 2.9);
    },
  });
})();
