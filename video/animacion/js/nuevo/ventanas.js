/* Escena de datos de muestra · Leer o no leer.
   Plano 1 (descriptivo): dos edificios de 100 ventanas; las encendidas son el % que leyó en cada grupo.
   Plano 2 (inferencial): intervalos de confianza al 96% para cada proporción; no se traslapan. */
(function () {
  const { C, s, g, rect, path, circ, U, haloP, rng } = A;
  const D = window.DATA;
  const NUN = "Nunito, sans-serif", FRA = "Fraunces, serif";
  const bajo = D.niveles.hogar[0], alto = D.niveles.hogar[2];

  const grad = (svg, id, stops, attrs = { x1: 0, y1: 0, x2: 0, y2: 1 }, tipo = "linearGradient") => {
    const d = svg.querySelector("defs") || s("defs", {}, svg);
    const lg = s(tipo, Object.assign({ id }, attrs), d);
    stops.forEach(([o, c, op]) => s("stop", { offset: o, "stop-color": c, "stop-opacity": op == null ? 1 : op }, lg));
    return `url(#${id})`;
  };
  /* Texto de neón: una copia difuminada detrás y otra nítida */
  const neon = (p, x, y, txt, size, color, anchor = "middle") => {
    const a = { x, y, "text-anchor": anchor, "font-family": FRA, "font-weight": 700, "font-size": size, fill: color };
    const b1 = s("text", Object.assign({}, a, { style: "filter:blur(10px)", opacity: 0.9 }), p, txt);
    const b2 = s("text", Object.assign({}, a, { fill: "#FFFDF4" }), p, txt);
    return { set(v) { b1.textContent = v; b2.textContent = v; }, els: [b1, b2] };
  };

  /* ---------- Plano 1: los edificios ---------- */
  function edificios(parent) {
    const pl = A.plano(parent, { fondo: "linear-gradient(#060A24 0%, #121A4C 50%, #2A387E 100%)" });
    const cielo = pl.capa(-1100, { sombra: false });
    pl.estrellas = U.estrellas(cielo, 170, 17, { x0: -480, x1: 2400, y0: -270, y1: 700 });
    circ(cielo, 1770, 170, 90, "rgba(255,241,201,.14)"); circ(cielo, 1770, 170, 56, C.luna);
    const lejos = pl.capa(-700);
    const r = rng(41);
    for (let x = -480; x < 2400;) {
      const w = 80 + r() * 130, hh = 160 + r() * 330;
      rect(lejos, x, 900 - hh, w, hh + 300, "#131A48");
      for (let wy = 900 - hh + 18; wy < 880; wy += 34) for (let wx = x + 12; wx < x + w - 18; wx += 26) if (r() > 0.78) rect(lejos, wx, wy, 10, 14, r() > 0.5 ? "#E8B765" : "#7F95DD", { opacity: 0.6 });
      x += w + 8;
    }
    const ed = pl.capa(-120);
    pl.grupos = [
      { x: 250, muro: "#2A3972", lado: "#223062", techo: "#18224E", luz: "#FFD98A", col: "#BFDCFF", n: 28, d: bajo, titulo: "Acceso bajo en el hogar", sub: "0 o 1 estímulos en la infancia", seed: 5 },
      { x: 1070, muro: "#8F4436", lado: "#7A372C", techo: "#5B2433", luz: "#FFD98A", col: C.luzC, n: 60, d: alto, titulo: "Acceso alto en el hogar", sub: "3 o 4 estímulos en la infancia", seed: 9 },
    ];
    pl.grupos.forEach((G) => {
      const gg = g(ed);
      rect(gg, G.x, 268, 600, 612, G.muro);
      rect(gg, G.x, 268, 26, 612, G.lado); rect(gg, G.x + 574, 268, 26, 612, G.lado);
      rect(gg, G.x - 16, 250, 632, 26, G.techo, { rx: 4 });
      rect(gg, G.x + 440, 176, 70, 76, G.techo, { rx: 6 }); rect(gg, G.x + 430, 168, 90, 14, G.lado, { rx: 4 });
      s("path", { d: `M${G.x + 90},250 V150 M${G.x + 70},176 H${G.x + 110} M${G.x + 78},200 H${G.x + 102}`, stroke: G.techo, "stroke-width": 6, "stroke-linecap": "round", fill: "none" }, gg);
      G.vent = []; G.brillo = g(gg, { style: "filter:blur(7px)" });
      for (let i = 0; i < 100; i++) {
        const cx = G.x + 44 + (i % 10) * 52, cy = 298 + Math.floor(i / 10) * 56;
        const b = rect(G.brillo, cx - 5, cy - 5, 48, 52, G.luz, { rx: 6, opacity: 0 });
        const w = rect(gg, cx, cy, 38, 42, "#0C1232", { rx: 3 });
        rect(gg, cx, cy + 42, 38, 5, G.lado);
        G.vent.push({ w, b });
      }
      gg.appendChild(G.brillo); // el resplandor va encima del muro
      G.vent.forEach((v) => gg.appendChild(v.w));
      const rr = rng(G.seed);
      G.orden = G.vent.map((v, i) => i).sort(() => rr() - 0.5).slice(0, G.n);
      // letrero de neón en la azotea
      G.neon = neon(gg, G.x + 250, 226, "0.0%", 104, G.col);
    });
    const piso = pl.capa(0);
    path(piso, "M-480,878 H2400 V1500 H-480 Z", "#080C28");
    rect(piso, -480, 878, 2880, 10, "#1B2456");
    for (let x = -400; x < 2400; x += 230) { rect(piso, x, 740, 8, 142, "#1B2456"); circ(piso, x + 4, 732, 13, "#FFE3A8"); }
    const fr = pl.capa(320, { blur: 5, sombra: false });
    circ(fr, -160, 1180, 330, "#04061A"); circ(fr, 2090, 1200, 340, "#04061A"); rect(fr, 880, 1040, 160, 400, "#04061A", { rx: 60 });
    haloP(pl.luces, 1770, 150, 380, "rgba(255,241,201,.22)");
    pl.gB = haloP(pl.luces, 550, 600, 520, "rgba(255,205,120,.0)");
    pl.gA = haloP(pl.luces, 1370, 600, 620, "rgba(255,205,120,.0)");
    pl.grupos.forEach((G, i) => {
      G.t1 = N.t(pl.hud, G.titulo, { x: G.x - 60, y: 884, w: 720, size: 44, align: "center", color: G.col, weight: 700 });
      G.t2 = N.t(pl.hud, G.sub, { x: G.x - 60, y: 938, w: 720, size: 27, font: "body", align: "center", color: "#DDE3F5" });
    });
    pl.kicker = N.t(pl.hud, "RESULTADO 2 · LO QUE VIMOS EN LA MUESTRA", { x: 80, y: 44, size: 24, font: "body", color: C.luzC, weight: 800 });
    pl.kicker.style.letterSpacing = ".2em";
    pl.q = N.t(pl.hud, "¿Leyó al menos un libro en los últimos 12 meses?", { x: 80, y: 78, w: 1300, size: 50, color: C.crema });
    return pl;
  }

  /* ---------- Plano 2: intervalos de confianza ---------- */
  function inferencia(parent) {
    const pl = A.plano(parent, { fondo: "linear-gradient(#04061C 0%, #0D1340 60%, #1D2868 100%)" });
    const cielo = pl.capa(-1100, { sombra: false });
    pl.estrellas = U.estrellas(cielo, 220, 23, { x0: -480, x1: 2400, y0: -270, y1: 1350 });
    const ch = pl.capa(-150, { sombra: false });

    // ---- arriba: intervalos de confianza
    const x = d3.scaleLinear().domain([0.2, 0.7]).range([300, 1620]);
    const ay = 452, ry = 330;
    pl.gI = g(ch); // los intervalos: empiezan grandes y al centro, luego se comprimen y suben
    pl.zoomI = { _redraw(r) { const k = 1.32 + (1 - 1.32) * r, c = 610 + (340 - 610) * r; pl.gI.setAttribute("transform", `translate(960,${c.toFixed(1)}) scale(${k.toFixed(4)}) translate(-960,-340)`); } };
    pl.zoomI._redraw(0);
    pl.eje = s("path", { d: `M300,${ay} H1620`, stroke: "#DDE3F5", "stroke-width": 3, fill: "none" }, pl.gI);
    pl.tks = g(pl.gI);
    [0.2, 0.3, 0.4, 0.5, 0.6, 0.7].forEach((v) => {
      rect(pl.tks, x(v) - 1.5, ay, 3, 12, "#DDE3F5");
      s("text", { x: x(v), y: ay + 46, "text-anchor": "middle", "font-family": NUN, "font-weight": 700, "font-size": 28, fill: "#DDE3F5" }, pl.tks, Math.round(v * 100) + "%");
    });
    pl.ics = [
      { d: bajo, col: "#9CC8FF", nombre: "Acceso bajo en el hogar", pct: "28.1%", ic: "IC 96%: 26.8% a 29.3%" },
      { d: alto, col: C.luz, nombre: "Acceso alto en el hogar", pct: "59.7%", ic: "IC 96%: 58.1% a 61.3%" },
    ].map((v) => {
      const gg = g(pl.gI), cx = x(v.d.p), x1 = x(v.d.li), x2 = x(v.d.ls);
      const o = { cx, x1, x2 };
      o.glow = rect(gg, x1 - 8, ry - 22, x2 - x1 + 16, 44, v.col, { rx: 22, style: "filter:blur(14px)", opacity: 0.85 });
      o.bar = rect(gg, x1, ry - 9, x2 - x1, 18, v.col, { rx: 9 });
      o.c1 = rect(gg, x1 - 3, ry - 26, 6, 52, "#FFFDF4", { rx: 3 });
      o.c2 = rect(gg, x2 - 3, ry - 26, 6, 52, "#FFFDF4", { rx: 3 });
      o.dot = circ(gg, cx, ry, 13, "#FFFDF4", { stroke: v.col, "stroke-width": 5 });
      o.guia = s("line", { x1: cx, x2: cx, y1: ry + 30, y2: ay, stroke: v.col, "stroke-width": 2, "stroke-dasharray": "4 7", opacity: 0.8 }, gg);
      o.t1 = s("text", { x: cx, y: ry - 138, "text-anchor": "middle", "font-family": FRA, "font-weight": 600, "font-size": 36, fill: v.col }, gg, v.nombre);
      o.t2 = s("text", { x: cx, y: ry - 52, "text-anchor": "middle", "font-family": FRA, "font-weight": 700, "font-size": 82, fill: "#FFFDF4" }, gg, v.pct);
      o.t3 = s("text", { x: cx, y: ry + 74, "text-anchor": "middle", "font-family": NUN, "font-weight": 800, "font-size": 28, fill: v.col, style: "paint-order:stroke;stroke:#0A0F36;stroke-width:8px" }, gg, v.ic);
      return o;
    });
    const gx1 = x(bajo.ls) + 30, gx2 = x(alto.li) - 30;
    pl.hueco = g(pl.gI, { stroke: "#FFFDF4", "stroke-width": 4, "stroke-linecap": "round", fill: "none" });
    s("path", { d: `M${gx1},${ry} H${gx2}`, "stroke-dasharray": "2 13" }, pl.hueco);
    s("path", { d: `M${gx1 + 18},${ry - 13} L${gx1},${ry} L${gx1 + 18},${ry + 13} M${gx2 - 18},${ry - 13} L${gx2},${ry} L${gx2 - 18},${ry + 13}` }, pl.hueco);
    pl.noTras = s("text", { x: (gx1 + gx2) / 2, y: ry - 40, "text-anchor": "middle", "font-family": FRA, "font-style": "italic", "font-weight": 600, "font-size": 58, fill: "#FFFDF4", opacity: 0 }, pl.gI, "no se traslapan");

    pl.kicker = N.t(pl.hud, "RESULTADO 2 · LO QUE PODEMOS INFERIR · 96% DE CONFIANZA", { x: 80, y: 44, size: 24, font: "body", color: C.luzC, weight: 800 });
    pl.kicker.style.letterSpacing = ".2em";
    pl.tit = N.t(pl.hud, "Intervalos de confianza de la proporción de lectores", { x: 80, y: 78, w: 1760, size: 46, color: C.crema });
    haloP(pl.luces, 960, 1180, 900, "rgba(90,110,220,.25)");
    return pl;
  }

  N.add({
    id: "ventanas",
    build(el, tl) {
      const p1 = edificios(el), p2 = inferencia(el);
      // ---- Plano 1 (0 – 13.6)
      N.entra(tl, p1, 0);
      N.camara(tl, p1, { z: -160, y: 30 }, { z: 70, y: 0 }, 0, 12.4, "sine.out");
      tl.fromTo(p1.estrellas, { opacity: 0.2 }, { opacity: 1, duration: 0.8, stagger: { each: 0.012, repeat: 9, yoyo: true }, ease: "sine.inOut" }, 0);
      N.show(tl, [p1.kicker, p1.q], 0.3, { stagger: 0.2, y: 14 });
      p1.grupos.forEach((G, i) => {
        const t0 = i ? 9.0 : 2.4, dur = i ? 3.0 : 2.4;
        N.show(tl, [G.t1, G.t2], 0.8 + i * 0.3, { stagger: 0.15, y: 14 });
        G.orden.forEach((idx, k) => {
          const t = t0 + (k / G.n) * dur, v = G.vent[idx];
          tl.to(v.w, { fill: G.luz, duration: 0.12, ease: "none" }, t);
          tl.fromTo(v.b, { opacity: 0 }, { opacity: 0.9, duration: 0.3, ease: "power2.out" }, t);
          tl.to(v.b, { opacity: 0.55, duration: 0.6 }, t + 0.3);
        });
        tl.to({ _redraw(r) { G.neon.set((G.d.p * 100 * r).toFixed(1) + "%"); } }, { redraw: 1, duration: dur, ease: "none" }, t0);
        tl.fromTo(G.neon.els, { opacity: 0.25 }, { opacity: (j) => (j ? 1 : 0.9), duration: 0.4 }, t0);
        tl.to(i ? p1.gA : p1.gB, { background: "radial-gradient(closest-side, rgba(255,205,120,.34), rgba(0,0,0,0))", duration: dur }, t0);
      });
      // la cámara sube al cielo
      tl.to(p1.cam, { y: 760, z: -60, duration: 1.3, ease: "power2.in" }, 12.4);
      N.hide(tl, p1.hud, 12.5, 0.5);
      N.fundido(tl, p1, p2, 13.0, 0.7);

      // ---- Plano 2 (13.0 – 22.5)
      N.camara(tl, p2, { y: -200, z: -80 }, { y: 0, z: 0 }, 13.0, 15.2, "power2.out");
      tl.fromTo(p2.estrellas, { opacity: 0.15 }, { opacity: 0.9, duration: 0.9, stagger: { each: 0.01, repeat: 7, yoyo: true }, ease: "sine.inOut" }, 13.0);
      N.show(tl, [p2.kicker, p2.tit], 13.7, { stagger: 0.2, y: 14 });
      tl.fromTo([p2.eje, p2.tks], { opacity: 0 }, { opacity: 1, duration: 0.6 }, 14.2);
      p2.ics.forEach((o, i) => {
        const t = 14.8 + i * 0.7;
        tl.fromTo(o.dot, { opacity: 0, scale: 0, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(3)" }, t);
        tl.fromTo([o.t1, o.t2], { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }, t + 0.1);
        tl.fromTo([o.bar, o.glow], { scaleX: 0, opacity: 0, transformOrigin: "50% 50%" }, { scaleX: 1, opacity: (j) => (j ? 0.85 : 1), duration: 0.8, ease: "power2.out" }, t + 0.5);
        tl.fromTo([o.c1, o.c2], { opacity: 0, scaleY: 0, transformOrigin: "50% 50%" }, { opacity: 1, scaleY: 1, duration: 0.3 }, t + 1.1);
        tl.fromTo([o.guia, o.t3], { opacity: 0 }, { opacity: (j) => (j ? 1 : 0.8), duration: 0.4 }, t + 1.2);
      });
      tl.fromTo(p2.hueco, { opacity: 0 }, { opacity: 1, duration: 0.5 }, 17.6);
      tl.fromTo(p2.noTras, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.7 }, 17.8);
    },
  });
})();
