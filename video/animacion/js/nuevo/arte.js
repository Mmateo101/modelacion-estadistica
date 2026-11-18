/* Kit de ilustración del video: teatro de papel con profundidad, luz y figuras articuladas.
   Todo se dibuja en SVG por capas; cada capa vive a una distancia distinta de la cámara. */
(function () {
  const SVGNS = "http://www.w3.org/2000/svg";
  const P = 1500; // distancia de la cámara (perspectiva)

  const C = {
    noche0: "#0B1030", noche1: "#141B4A", noche2: "#27337A", noche3: "#3F4FA3",
    luna: "#FFF1C9", luz: "#FFC56B", luzC: "#FFE3A8", fuego: "#F28C3A",
    coral: "#E4674E", rosa: "#F2A69A", ciruela: "#5B2A5E", vino: "#7B2D43",
    teal: "#1F6F78", teal2: "#2FA39A", menta: "#9AD4C4", frio: "#7FB2E6", frio2: "#3C6FB4",
    papel: "#F6EBD6", papel2: "#E9D8B8", crema: "#FFF8E8", tinta: "#171728", gris: "#8C93A8",
    madera: "#8A5A3C", madera2: "#6B4028", madera3: "#B98052",
    libros: ["#E4674E", "#F2B24C", "#2FA39A", "#3C6FB4", "#8E5BA8", "#F2A69A", "#1F6F78", "#C9463D", "#F6EBD6", "#5B8F4E"],
  };

  gsap.registerPlugin({
    name: "redraw",
    init(target) { this.t = target; },
    render(r, d) { d.t._redraw(r); },
  });

  const s = (tag, attrs = {}, parent, text) => {
    const e = document.createElementNS(SVGNS, tag);
    for (const k in attrs) if (attrs[k] != null) e.setAttribute(k, attrs[k]);
    if (text != null) e.textContent = text;
    if (parent) parent.appendChild(e);
    return e;
  };
  const h = (tag, attrs = {}, parent, html) => {
    const e = document.createElement(tag);
    for (const k in attrs) {
      if (k === "style") Object.assign(e.style, attrs[k]);
      else if (k === "class") e.className = attrs[k];
      else e.setAttribute(k, attrs[k]);
    }
    if (html != null) e.innerHTML = html;
    if (parent) parent.appendChild(e);
    return e;
  };
  const rng = (seed = 1) => { let v = seed >>> 0 || 1; return () => ((v = (v * 1664525 + 1013904223) >>> 0) / 4294967296); };
  const rad = (d) => (d * Math.PI) / 180;
  const dir = (a) => [Math.sin(rad(a)), Math.cos(rad(a))]; // 0 = hacia abajo, + = hacia adelante

  /* ---------- Plano: un encuadre con su cámara y sus capas ---------- */
  function plano(parent, { fondo = C.noche0, id } = {}) {
    const el = h("div", { class: "plano", id: id || "", style: { background: fondo } }, parent);
    const cam = h("div", { class: "cam" }, el);
    const luces = h("div", { class: "luces" }, el); // luz por encima de todo (pantalla)
    const hud = h("div", { class: "hud" }, el);     // texto fijo a la pantalla
    const pl = {
      el, cam, luces, hud,
      /* capa a profundidad z (negativo = lejos). sombra: la capa proyecta sombra de papel sobre las de atrás */
      capa(z, { sombra = true, blur = 0, cls = "" } = {}) {
        const k = (P - z) / P;
        const svg = s("svg", { class: "capa " + cls, viewBox: "-480 -270 2880 1620", width: 2880, height: 1620 }, cam);
        svg.style.transform = `translateZ(${z}px) scale(${k})`;
        const f = [];
        if (sombra) f.push("drop-shadow(0px 10px 12px rgba(5,8,30,.42))");
        if (blur) f.push(`blur(${blur}px)`);
        if (f.length) svg.style.filter = f.join(" ");
        svg._z = z;
        return svg;
      },
      /* capa HTML a profundidad z (para halos de luz con modo de fusión) */
      capaLuz(z, modo = "screen") {
        const k = (P - z) / P;
        const d = h("div", { class: "capa-luz", style: { transform: `translateZ(${z}px) scale(${k})`, mixBlendMode: modo } }, cam);
        return d;
      },
    };
    return pl;
  }

  /* Halo de luz (div con degradado radial). parent: capaLuz o .luces */
  function halo(parent, x, y, r, color, op = 1, ry) {
    return h("div", { class: "halo", style: { left: x - r + 480 + "px", top: y - (ry || r) + 270 + "px", width: r * 2 + "px", height: (ry || r) * 2 + "px", background: `radial-gradient(closest-side, ${color}, rgba(0,0,0,0))`, opacity: op } }, parent);
  }
  /* Halo en coordenadas de pantalla (dentro de .luces, sin sangrado) */
  function haloP(parent, x, y, r, color, op = 1, ry) {
    return h("div", { class: "halo", style: { left: x - r + "px", top: y - (ry || r) + "px", width: r * 2 + "px", height: (ry || r) * 2 + "px", background: `radial-gradient(closest-side, ${color}, rgba(0,0,0,0))`, opacity: op } }, parent);
  }

  const rect = (p, x, y, w, hh, fill, extra = {}) => s("rect", Object.assign({ x, y, width: w, height: hh, fill }, extra), p);
  const path = (p, d, fill, extra = {}) => s("path", Object.assign({ d, fill }, extra), p);
  const circ = (p, cx, cy, r, fill, extra = {}) => s("circle", Object.assign({ cx, cy, r, fill }, extra), p);
  const g = (p, attrs = {}) => s("g", attrs, p);

  /* ---------- Figuras articuladas (de perfil, mirando a +x) ---------- */
  const TALLA = {
    adulto: { torso: 118, cuello: 10, cab: 30, brazo: [62, 58], pierna: [86, 84], wB: 21, wP: 27, wT: 60, mano: 11, pie: 30 },
    nino: { torso: 74, cuello: 7, cab: 28, brazo: [40, 38], pierna: [48, 48], wB: 17, wP: 21, wT: 48, mano: 9, pie: 22 },
  };
  const POSE0 = { lean: 0, cabeza: 0, bF: [8, 6], bT: [-8, 4], pF: [4, 0], pT: [-4, 0], y: 0 };
  const flat = (p) => [p.lean, p.cabeza, p.bF[0], p.bF[1], p.bT[0], p.bT[1], p.pF[0], p.pF[1], p.pT[0], p.pT[1], p.y || 0];
  const unflat = (a) => ({ lean: a[0], cabeza: a[1], bF: [a[2], a[3]], bT: [a[4], a[5]], pF: [a[6], a[7]], pT: [a[8], a[9]], y: a[10] });

  /* o: x, y (cadera), s, flip, talla ('adulto'|'nino'), piel, pelo, ropa, pantalon, zapato, peinado ('corto'|'largo'|'chongo'|'rizado'|'calvo'), pose */
  function figura(parent, o = {}) {
    const T = TALLA[o.talla || "adulto"];
    const col = { piel: o.piel || "#E0A77E", pelo: o.pelo || "#2A1E1A", ropa: o.ropa || C.coral, pantalon: o.pantalon || "#2B3558", zapato: o.zapato || C.tinta };
    const root = g(parent, { transform: `translate(${o.x || 0},${o.y || 0}) scale(${(o.flip ? -1 : 1) * (o.s || 1)},${o.s || 1})` });
    const lim = (color, w) => s("path", { fill: "none", stroke: color, "stroke-width": w, "stroke-linecap": "round", "stroke-linejoin": "round" }, root);
    const oscuro = (hex, k = 0.8) => d3.color(hex).darker(1 - k + 0.35).formatHex();
    // orden de dibujo: brazo y pierna de atrás, torso, pierna de enfrente, cabeza, brazo de enfrente
    const bT = lim(oscuro(col.ropa), T.wB), mT = circ(root, 0, 0, T.mano, oscuro(col.piel, 0.9));
    const pT = lim(oscuro(col.pantalon), T.wP), zT = s("path", { fill: col.zapato }, root);
    const torso = lim(col.ropa, T.wT);
    const cadera = circ(root, 0, 0, T.wT * 0.5, col.pantalon);
    const pF = lim(col.pantalon, T.wP), zF = s("path", { fill: col.zapato }, root);
    const cuello = lim(col.piel, T.cab * 0.5);
    const cabG = g(root);
    const bF = lim(col.ropa, T.wB), mF = circ(root, 0, 0, T.mano, col.piel);

    // cabeza (dibujada alrededor de 0,0 = centro de la cabeza)
    const R = T.cab, pein = o.peinado || "corto";
    if (pein === "largo") path(cabG, `M${-R * 1.02},${-R * 0.2} Q${-R * 1.5},${R * 1.3} ${-R * 0.9},${R * 2.3} L${-R * 0.1},${R * 2.2} Q${-R * 0.4},${R * 0.9} ${-R * 0.2},${R * 0.3} Z`, col.pelo);
    if (pein === "chongo") circ(cabG, -R * 0.75, -R * 0.85, R * 0.48, col.pelo);
    s("ellipse", { cx: 0, cy: 0, rx: R * 0.92, ry: R, fill: col.piel }, cabG);
    path(cabG, `M${R * 0.82},${-R * 0.02} q${R * 0.26},${R * 0.2} ${-R * 0.02},${R * 0.34} Z`, col.piel); // nariz
    circ(cabG, -R * 0.12, R * 0.12, R * 0.17, oscuro(col.piel, 0.92));                                      // oreja
    s("ellipse", { cx: R * 0.42, cy: R * 0.34, rx: R * 0.2, ry: R * 0.13, fill: "#E8806F", opacity: 0.4 }, cabG); // mejilla
    s("path", { d: `M${R * 0.44},${-R * 0.02} q${R * 0.1},${R * 0.09} ${R * 0.2},0`, fill: "none", stroke: C.tinta, "stroke-width": 2.6, "stroke-linecap": "round" }, cabG); // ojo
    if (pein === "calvo") path(cabG, `M${-R * 0.9},${-R * 0.1} Q${-R * 1.0},${-R * 0.75} ${-R * 0.5},${-R * 0.85} Q${-R * 0.75},${-R * 0.4} ${-R * 0.62},${R * 0.2} Z`, col.pelo);
    else if (pein === "rizado") { for (let i = 0; i < 9; i++) { const a = rad(-205 + i * 28); circ(cabG, Math.cos(a) * R * 0.8, Math.sin(a) * R * 0.86 - R * 0.05, R * 0.36, col.pelo); } circ(cabG, -R * 0.2, -R * 0.75, R * 0.5, col.pelo); }
    else path(cabG, `M${R * 0.72},${-R * 0.42} Q${R * 0.5},${-R * 1.25} ${-R * 0.3},${-R * 1.08} Q${-R * 1.2},${-R * 0.9} ${-R * 1.0},${R * 0.2} Q${-R * 0.7},${R * 0.5} ${-R * 0.42},${R * 0.2} Q${-R * 0.5},${-R * 0.3} ${-R * 0.1},${-R * 0.5} Q${R * 0.4},${-R * 0.62} ${R * 0.72},${-R * 0.42} Z`, col.pelo);

    const f = { root, T, cabG, pose: Object.assign({}, POSE0, o.pose || {}), col };
    const limb = (el, base, a, len, mano, zap) => {
      const d1 = dir(a[0]), j1 = [base[0] + d1[0] * len[0], base[1] + d1[1] * len[0]];
      const d2 = dir(a[0] + a[1]), j2 = [j1[0] + d2[0] * len[1], j1[1] + d2[1] * len[1]];
      el.setAttribute("d", `M${base[0].toFixed(1)},${base[1].toFixed(1)} L${j1[0].toFixed(1)},${j1[1].toFixed(1)} L${j2[0].toFixed(1)},${j2[1].toFixed(1)}`);
      if (mano) { mano.setAttribute("cx", j2[0]); mano.setAttribute("cy", j2[1]); }
      if (zap) {
        const ang = a[0] + a[1], c = Math.cos(rad(-ang)), sn = Math.sin(rad(-ang));
        const pt = (x, y) => `${(j2[0] + x * c - y * sn).toFixed(1)},${(j2[1] + x * sn + y * c).toFixed(1)}`;
        const w = T.wP * 0.5, L = T.pie;
        zap.setAttribute("d", `M${pt(-w, -4)} L${pt(-w, w * 0.8)} L${pt(L, w * 0.8)} Q${pt(L + 4, -2)} ${pt(L * 0.45, -6)} Z`);
      }
      return j2;
    };
    f.draw = (p) => {
      f.pose = p;
      const hip = [0, p.y || 0];
      const up = dir(180 - p.lean); // hacia arriba, inclinado hacia adelante con lean > 0
      const sh = [hip[0] + up[0] * T.torso, hip[1] + up[1] * T.torso];
      torso.setAttribute("d", `M${hip[0]},${hip[1] - T.wT * 0.18} L${sh[0].toFixed(1)},${(sh[1] + T.wT * 0.3).toFixed(1)}`);
      cadera.setAttribute("cx", hip[0]); cadera.setAttribute("cy", hip[1]);
      const hu = dir(180 - p.lean - p.cabeza);
      const hc = [sh[0] + hu[0] * (T.cuello + T.cab), sh[1] + hu[1] * (T.cuello + T.cab) - T.wT * 0.12];
      cuello.setAttribute("d", `M${sh[0].toFixed(1)},${sh[1].toFixed(1)} L${hc[0].toFixed(1)},${hc[1].toFixed(1)}`);
      cabG.setAttribute("transform", `translate(${hc[0].toFixed(1)},${hc[1].toFixed(1)}) rotate(${(p.lean + p.cabeza).toFixed(1)})`);
      const hom = [sh[0], sh[1] + T.wT * 0.2];
      f.manoF = limb(bF, hom, p.bF, T.brazo, mF);
      f.manoT = limb(bT, hom, p.bT, T.brazo, mT);
      limb(pF, hip, p.pF, T.pierna, null, zF);
      limb(pT, hip, p.pT, T.pierna, null, zT);
      f.cab = hc;
    };
    f.draw(f.pose);
    f._last = flat(f.pose);
    return f;
  }
  /* Anima una figura hacia una pose nueva dentro de la línea de tiempo */
  function posar(tl, f, pose, at, dur = 0.8, ease = "power2.inOut") {
    const a = f._last.slice(), b = flat(Object.assign({}, unflat(a), pose));
    f._last = b;
    tl.to({ _redraw(r) { f.draw(unflat(a.map((v, i) => v + (b[i] - v) * r))); } }, { redraw: 1, duration: dur, ease }, at);
  }

  /* ---------- Utilería ---------- */
  const U = {
    /* Librero. lleno: 0 (vacío) a 1. Devuelve el grupo; g._libros = lista de lomos */
    estante(p, x, y, w, hh, { filas = 4, lleno = 1, seed = 3, madera = C.madera, fondo = C.madera2, paleta = C.libros } = {}) {
      const gg = g(p);
      rect(gg, x, y, w, hh, madera, { rx: 6 });
      rect(gg, x + 12, y + 12, w - 24, hh - 24, fondo);
      const r = rng(seed), fh = (hh - 24) / filas;
      gg._libros = [];
      for (let i = 0; i < filas; i++) {
        const base = y + 12 + fh * (i + 1);
        let bx = x + 18;
        while (lleno > 0 && bx < x + w - 34) {
          if (r() > lleno) { bx += 18 + r() * 40; continue; }
          const bw = 13 + r() * 13, bh = fh * (0.5 + r() * 0.36), col = paleta[Math.floor(r() * paleta.length)];
          const tilt = r() > 0.9 ? 9 : 0;
          const b = g(gg, { transform: tilt ? `rotate(${tilt} ${bx} ${base - 10})` : null });
          rect(b, bx, base - 10 - bh, bw, bh, col, { rx: 2 });
          rect(b, bx, base - 10 - bh * 0.82, bw, 4, "rgba(255,255,255,.35)");
          rect(b, bx, base - 10 - bh * 0.2, bw, 3, "rgba(0,0,0,.2)");
          gg._libros.push(b);
          bx += bw + 2 + (tilt ? 8 : 0);
        }
        rect(gg, x + 8, base - 10, w - 16, 10, madera);
      }
      return gg;
    },
    /* Ventana con cielo nocturno o de día */
    ventana(p, x, y, w, hh, { noche = true, marco = C.papel, luna = true, cortina = null } = {}) {
      const gg = g(p);
      const id = "v" + Math.round(x) + "_" + Math.round(y) + (noche ? "n" : "d");
      const defs = s("defs", {}, gg);
      const lg = s("linearGradient", { id, x1: 0, y1: 0, x2: 0, y2: 1 }, defs);
      s("stop", { offset: 0, "stop-color": noche ? "#101A52" : "#8FD0F2" }, lg);
      s("stop", { offset: 1, "stop-color": noche ? "#3A4A9A" : "#E6F5FB" }, lg);
      rect(gg, x - 12, y - 12, w + 24, hh + 24, marco, { rx: 6 });
      rect(gg, x, y, w, hh, `url(#${id})`);
      if (noche) {
        const r = rng(x + y);
        for (let i = 0; i < 9; i++) circ(gg, x + 10 + r() * (w - 20), y + 10 + r() * (hh * 0.7), 1.5 + r() * 1.6, C.luna, { opacity: 0.5 + r() * 0.5 });
        if (luna) { circ(gg, x + w * 0.7, y + hh * 0.3, 22, C.luna); circ(gg, x + w * 0.7 + 10, y + hh * 0.3 - 7, 19, "#1F2A6A"); }
      } else {
        path(gg, `M${x},${y + hh * 0.8} q${w * 0.25},-${hh * 0.25} ${w * 0.5},-${hh * 0.05} t${w * 0.5},-${hh * 0.1} V${y + hh} H${x} Z`, "#8CC084");
        circ(gg, x + w * 0.25, y + hh * 0.3, 20, "#FFF3B0");
      }
      rect(gg, x + w / 2 - 5, y, 10, hh, marco);
      rect(gg, x, y + hh / 2 - 5, w, 10, marco);
      rect(gg, x - 22, y + hh + 8, w + 44, 14, marco, { rx: 4 });
      if (cortina) {
        path(gg, `M${x - 16},${y - 20} h${w * 0.36} q-${w * 0.1},${hh * 0.5} -${w * 0.3},${hh + 30} h-${w * 0.06} Z`, cortina);
        path(gg, `M${x + w + 16},${y - 20} h-${w * 0.36} q${w * 0.1},${hh * 0.5} ${w * 0.3},${hh + 30} h${w * 0.06} Z`, cortina);
        rect(gg, x - 30, y - 30, w + 60, 12, C.madera2, { rx: 6 });
      }
      return gg;
    },
    /* Lámpara de mesa; devuelve { g, foco: [x, y] } */
    lampara(p, x, y, { pantalla = C.luzC, base = C.madera2, s: k = 1 } = {}) {
      const gg = g(p, { transform: `translate(${x},${y}) scale(${k})` });
      rect(gg, -6, -70, 12, 70, base);
      s("ellipse", { cx: 0, cy: 0, rx: 34, ry: 9, fill: base }, gg);
      path(gg, "M-44,-70 L-26,-136 L26,-136 L44,-70 Z", pantalla);
      path(gg, "M-44,-70 L-26,-136 L-10,-136 L-22,-70 Z", "rgba(255,255,255,.35)");
      return { g: gg, foco: [x, y - 96 * k] };
    },
    /* Marco de cuadro con un paisaje mínimo */
    cuadro(p, x, y, w, hh, col = C.teal) {
      const gg = g(p);
      rect(gg, x - 8, y - 8, w + 16, hh + 16, C.madera3, { rx: 3 });
      rect(gg, x, y, w, hh, C.crema);
      path(gg, `M${x},${y + hh} L${x + w * 0.35},${y + hh * 0.35} L${x + w * 0.6},${y + hh * 0.7} L${x + w * 0.78},${y + hh * 0.5} L${x + w},${y + hh} Z`, col);
      circ(gg, x + w * 0.75, y + hh * 0.26, hh * 0.1, C.coral);
      return gg;
    },
    /* Planta en maceta (para primeros planos) */
    planta(p, x, y, k = 1, col = "#2F6B55", maceta = C.coral) {
      const gg = g(p, { transform: `translate(${x},${y}) scale(${k})` });
      const hojas = g(gg);
      [[-70, -150, -28], [-34, -210, -12], [8, -230, 4], [50, -190, 18], [82, -130, 32], [-10, -160, -4], [30, -140, 12]].forEach(([hx, hy, rot], i) => {
        path(hojas, `M0,-40 Q${hx * 0.2 - 26},${hy * 0.55} ${hx},${hy} Q${hx * 0.6 + 26},${hy * 0.5} 0,-40 Z`, i % 2 ? col : d3.color(col).brighter(0.5).formatHex(), { transform: `rotate(${rot * 0.2})` });
      });
      path(gg, "M-46,-44 H46 L34,34 H-34 Z", maceta);
      rect(gg, -52, -54, 104, 18, d3.color(maceta).darker(0.5).formatHex(), { rx: 5 });
      gg._hojas = hojas;
      return gg;
    },
    /* Libro abierto visto de lado (en las manos); origen en el lomo */
    libroAbierto(p, x, y, k = 1, tapa = C.coral) {
      const gg = g(p, { transform: `translate(${x},${y}) scale(${k})` });
      path(gg, "M-46,-8 Q-24,-22 0,-6 Q24,-22 46,-8 L46,6 Q24,-8 0,8 Q-24,-8 -46,6 Z", tapa);
      path(gg, "M-42,-14 Q-22,-26 0,-10 L0,2 Q-22,-14 -42,-2 Z", C.crema);
      path(gg, "M42,-14 Q22,-26 0,-10 L0,2 Q22,-14 42,-2 Z", "#FFFDF4");
      return gg;
    },
    /* Pupitre con silla (origen en el piso, al centro) */
    pupitre(p, x, y, k = 1, col = C.madera3) {
      const gg = g(p, { transform: `translate(${x},${y}) scale(${k})` });
      rect(gg, -64, -112, 128, 14, col, { rx: 4 });
      rect(gg, -58, -98, 10, 98, d3.color(col).darker(0.6).formatHex());
      rect(gg, 48, -98, 10, 98, d3.color(col).darker(0.6).formatHex());
      rect(gg, -58, -84, 116, 24, d3.color(col).darker(0.3).formatHex());
      return gg;
    },
    /* Estrellas que titilan: devuelve la lista */
    estrellas(p, n, seed, { x0 = -300, x1 = 2220, y0 = -200, y1 = 600 } = {}) {
      const r = rng(seed), out = [];
      for (let i = 0; i < n; i++) out.push(circ(p, x0 + r() * (x1 - x0), y0 + r() * (y1 - y0), 1.2 + r() * 2.4, C.luna, { opacity: 0.35 + r() * 0.6 }));
      return out;
    },
  };

  /* Motas de polvo dentro de un haz de luz. Movimiento determinista dentro de la línea de tiempo. */
  function polvo(tl, svg, { x, y, w, hh, n = 26, seed = 5, color = C.luzC, t0 = 0, dur = 8 }) {
    const r = rng(seed), gg = g(svg);
    for (let i = 0; i < n; i++) {
      const c = circ(gg, x + r() * w, y + r() * hh, 1.6 + r() * 2.6, color, { opacity: 0 });
      const d = 3 + r() * 4, del = r() * 3;
      tl.to(c, { attr: { cy: `-=${30 + r() * 70}`, cx: `+=${(r() - 0.5) * 60}` }, duration: dur, ease: "none" }, t0);
      tl.to(c, { opacity: 0.25 + r() * 0.55, duration: d / 2, yoyo: true, repeat: Math.ceil(dur / d) * 2 - 1, ease: "sine.inOut" }, t0 + del * 0.3);
    }
    return gg;
  }

  window.A = { C, P, s, h, g, rect, path, circ, rng, rad, dir, plano, halo, haloP, figura, posar, U, polvo, POSE0 };
})();
