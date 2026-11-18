/* Resultado · Independencia entre los dos índices: el vitral.
   Lo observado (Tabla 4.1) comparado con lo esperado si fueran independientes (más / menos),
   y la prueba ji-cuadrada (Tabla 6, prueba 1). */
(function () {
  const { C, s, g, rect, path, circ, h, rng } = A;
  const D = window.DATA;
  const FRA = "Fraunces, serif", NUN = "Nunito, sans-serif";

  N.add({
    id: "independencia",
    build(el, tl, T) {
      const pl = A.plano(el, { fondo: "#0D0A1E" });
      N.entra(tl, pl, 0);
      const muro = pl.capa(-520, { sombra: false });
      rect(muro, -480, -270, 2880, 1620, "#171230");
      const r = rng(9);
      for (let y = -270, f = 0; y < 900; y += 64, f++) for (let x = -480 + (f % 2) * 70; x < 2400; x += 140) rect(muro, x + 3, y + 3, 134, 58, r() > 0.5 ? "#1C1638" : "#1A1434", { rx: 4 });
      rect(muro, -480, 880, 2880, 600, "#0E0B20");
      const luz = pl.capaLuz(-160);
      const haloV = A.halo(luz, 752, 520, 720, "rgba(255,170,110,.0)");
      const rayoC = pl.capa(-120, { sombra: false });
      const rayo = path(rayoC, "M400,850 L1110,850 L1500,1200 L120,1200 Z", W.grad(rayoC, "i7rayo", [[0, "#FFC890", 0.28], [1, "#FFC890", 0]]), { opacity: 0 });
      A.polvo(tl, rayoC, { x: 300, y: 860, w: 1000, hh: 220, n: 26, seed: 21, color: "#FFE3B8", t0: 0, dur: T });

      // ---- el vitral: una celda por combinación de estímulos (hogar en renglones, escuela en columnas)
      const vit = pl.capa(-140);
      const x0 = 380, y0 = 250, pw = 132, ph = 104, lead = 14;
      const marco = g(vit, { opacity: 0 });
      path(marco, `M${x0 - 34},${y0 + 640} V${y0} Q${x0 - 34},${y0 - 150} 752,${y0 - 214} Q${1124 + 34},${y0 - 150} ${1124 + 34},${y0} V${y0 + 640} Z`, "#2E2850");
      path(marco, `M${x0},${y0 + 604} V${y0} Q${x0},${y0 - 128} 752,${y0 - 180} Q1124,${y0 - 128} 1124,${y0} V${y0 + 604} Z`, "#0A0816");
      const roseta = g(vit, { opacity: 0 });
      circ(roseta, 752, y0 - 70, 70, "#3A2A66");
      for (let i = 0; i < 8; i++) path(roseta, "M0,-60 Q22,-30 0,0 Q-22,-30 0,-60 Z", i % 2 ? "#7A3E7E" : "#E0704E", { transform: `translate(752,${y0 - 70}) rotate(${i * 45})`, opacity: 0.85 });
      circ(roseta, 752, y0 - 70, 16, "#FFD27A");

      const n = D.totalTabla;
      const escala = d3.scaleLinear().domain([0, 300, 700, 1400]).range(["#221C46", "#6A3A86", "#E0704E", "#FFD27A"]).interpolate(d3.interpolateRgb);
      const MAS = "#F2A04C", MENOS = "#3E5FB0";
      const brillo = g(vit, { style: "filter:blur(10px)" });
      const celdas = [];
      D.contingencia.forEach((fila, ri) => fila.forEach((o, ci) => {
        const e = (D.totalesFila[ri] * D.totalesColumna[ci]) / n;
        const x = x0 + lead + ci * (pw + lead), y = y0 + lead + ri * (ph + lead);
        const b = rect(brillo, x - 4, y - 4, pw + 8, ph + 8, escala(o), { opacity: 0 });
        const p = rect(vit, x, y, pw, ph, "#151230", { rx: 3 });
        const ref = path(vit, `M${x + 8},${y + 8} L${x + 40},${y + 8} L${x + 8},${y + 40} Z`, "#FFFFFF", { opacity: 0 });
        const num = s("text", { x: x + pw / 2, y: y + ph / 2 + 10, "text-anchor": "middle", "font-family": NUN, "font-weight": 800, "font-size": 27, fill: "#FFFDF4", opacity: 0, style: "paint-order:stroke;stroke:rgba(14,10,30,.75);stroke-width:5px" }, null, String(o));
        const sig = s("text", { x: x + pw / 2, y: y + ph / 2 + 22, "text-anchor": "middle", "font-family": FRA, "font-weight": 700, "font-size": 64, fill: "#FFFDF4", opacity: 0 }, null, o > e ? "+" : "−");
        celdas.push({ ri, ci, o, e, x, y, b, p, ref, num, sig, mas: o > e });
      }));
      vit.appendChild(brillo);
      celdas.forEach((c) => { vit.appendChild(c.p); vit.appendChild(c.ref); vit.appendChild(c.num); vit.appendChild(c.sig); });
      const diag = [0, 1, 2, 3, 4].map((i) => { const c = celdas[i * 5 + i]; return rect(vit, c.x - 7, c.y - 7, pw + 14, ph + 14, "none", { stroke: "#FFFDF4", "stroke-width": 6, rx: 8, opacity: 0 }); });

      // ---- rótulos de los ejes
      const H = pl.hud;
      const fil = [0, 1, 2, 3, 4].map((i) => N.t(H, String(i), { x: 296, y: y0 + lead + i * (ph + lead) + 30, w: 40, size: 38, align: "center", color: "#FFE3A8" }));
      const col = [0, 1, 2, 3, 4].map((i) => N.t(H, String(i), { x: x0 + lead + i * (pw + lead) + pw / 2 - 20, y: 874, w: 40, size: 38, align: "center", color: "#9CC8FF" }));
      const ejeF = N.t(H, "estímulos en el hogar", { x: 96, y: 528, w: 300, size: 28, font: "body", align: "center", color: "#FFE3A8" });
      ejeF.style.transform = "rotate(-90deg)";
      const ejeC = N.t(H, "estímulos en la escuela", { x: 452, y: 924, w: 600, size: 28, font: "body", align: "center", color: "#9CC8FF" });

      // ---- rótulos
      const k1 = W.kicker(pl, "RESULTADO 1 · LO QUE VIMOS EN LA MUESTRA");
      const k2 = W.kicker(pl, "RESULTADO 1 · LO QUE PODEMOS INFERIR · 96% DE CONFIANZA");
      gsap.set(k2, { autoAlpha: 0 });
      const tit = N.t(H, "¿Son independientes los dos índices?", { x: 80, y: 72, w: 1200, size: 52, color: "#FFF4D8" });
      const cuadro = (c) => `<span style="display:inline-block;width:30px;height:30px;border-radius:6px;background:${c};vertical-align:-6px;margin-right:14px"></span>`;
      const ley = h("div", { style: { position: "absolute", left: "1240px", top: "170px", width: "640px", font: "700 30px/1.6 var(--f-body)", color: "#F1E9FF" } }, H,
        `${cuadro(MAS)}más personas de las esperadas<br>${cuadro(MENOS)}menos de las esperadas<div style="font:700 26px/1.3 var(--f-body);color:#B8B0D8;margin-top:6px">si los índices fueran independientes</div>`);

      // ---- paso 4: la prueba ji-cuadrada (escala logarítmica, como en el reporte)
      const svg = s("svg", { width: 1920, height: 1080, style: "position:absolute;left:0;top:0;overflow:visible" }, H);
      const gx0 = 1250, gx1 = 1810, base = 560;
      const X = (v) => gx0 + (Math.log10(v) / Math.log10(5000)) * (gx1 - gx0);
      const pdf = (v) => Math.pow(v, 7) * Math.exp(-v / 2) / 1290240;
      const Y = (v) => base - (pdf(v) / 0.0746) * 190;
      const prueba = g(svg, { opacity: 0 });
      const us = d3.range(0, Math.log10(5000) + 1e-9, 0.01).map((u) => Math.pow(10, u));
      path(prueba, `M${X(1)},${base} ` + us.map((v) => `L${X(v).toFixed(1)},${Y(v).toFixed(1)}`).join(" ") + ` L${X(5000)},${base} Z`, "rgba(156,200,255,.25)", { stroke: "#9CC8FF", "stroke-width": 3 });
      const cola = us.filter((v) => v >= D.chi.frontera);
      path(prueba, `M${X(D.chi.frontera)},${base} ` + cola.map((v) => `L${X(v).toFixed(1)},${Y(v).toFixed(1)}`).join(" ") + ` L${X(5000)},${base} Z`, "rgba(228,103,78,.6)");
      rect(prueba, gx0, base, gx1 - gx0, 3, "#D8D2EE");
      [1, 10, 100, 1000].forEach((v) => {
        rect(prueba, X(v) - 1.5, base, 3, 12, "#D8D2EE");
        s("text", { x: X(v), y: base + 42, "text-anchor": "middle", "font-family": NUN, "font-weight": 700, "font-size": 24, fill: "#D8D2EE" }, prueba, v.toLocaleString("en-US"));
      });
      s("text", { x: (gx0 + gx1) / 2, y: base + 80, "text-anchor": "middle", "font-family": NUN, "font-weight": 700, "font-size": 22, fill: "#B8B0D8" }, prueba, "χ² con 16 grados de libertad · escala logarítmica");
      const fr = g(svg, { opacity: 0 });
      path(fr, `M${X(D.chi.frontera)},${base - 230} V${base}`, "none", { stroke: "#FF8A70", "stroke-width": 4, "stroke-dasharray": "10 8" });
      s("text", { x: X(D.chi.frontera) - 10, y: base - 240, "text-anchor": "middle", "font-family": NUN, "font-weight": 800, "font-size": 24, fill: "#FF9C86" }, fr, "valor frontera 27.14");
      const est = g(svg, { opacity: 0 });
      const estL = path(est, "", "none", { stroke: "#FFFDF4", "stroke-width": 6, "stroke-linecap": "round" });
      const estG = circ(est, 0, base - 200, 26, "#FFC56B", { style: "filter:blur(10px)" });
      const estD = circ(est, 0, base - 200, 12, "#FFFDF4");
      const estT = s("text", { y: base - 286, "text-anchor": "end", "font-family": FRA, "font-weight": 700, "font-size": 40, fill: "#FFFDF4" }, est, "");
      const mueve = { _redraw(rr) {
        const v = Math.pow(10, Math.log10(D.chi.frontera) + rr * (Math.log10(D.chi.x2) - Math.log10(D.chi.frontera)));
        const x = X(v);
        estL.setAttribute("d", `M${x},${base - 200} V${base}`);
        estG.setAttribute("cx", x); estD.setAttribute("cx", x);
        estT.setAttribute("x", Math.max(x + 30, 1560)); estT.textContent = "χ² = " + v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      } };
      mueve._redraw(0);
      const h0 = N.t(H, "H₀: los dos índices son independientes", { x: 1240, y: 668, w: 640, size: 32, font: "body", color: "#F1E9FF" });
      const dec = N.t(H, `χ² = 2,414.77 &gt; 27.14<br><span style="font-size:32px;font-weight:600">se tiene evidencia para rechazar H₀</span>`, { x: 1240, y: 712, w: 640, size: 46, color: "#FFD27A", weight: 700 });
      const mano = N.t(H, "el acceso escolar tiende a acompañar al del hogar", { x: 1240, y: 846, w: 640, size: 42, font: "hand", color: "#FFE3A8" });

      // ---- línea de tiempo
      N.camara(tl, pl, { z: -60 }, { z: 40 }, 0, T, "sine.inOut");
      N.show(tl, [k1, tit], 0.2, { stagger: 0.2, y: 12 });
      tl.to([marco, roseta], { opacity: 1, duration: 0.8, stagger: 0.2 }, 0.5);
      N.show(tl, [...fil, ...col, ejeF, ejeC], 1.0, { stagger: 0.05, y: 8, dur: 0.4 });
      // el vitral se enciende con lo que vimos
      celdas.forEach((c) => {
        const t = 1.2 + c.ri * 0.35 + c.ci * 0.08;
        tl.to(c.p, { attr: { fill: escala(c.o) }, duration: 0.45 }, t);
        tl.to(c.b, { opacity: 0.25 + (c.o / 1400) * 0.7, duration: 0.6 }, t);
        tl.to(c.ref, { opacity: 0.16, duration: 0.4 }, t + 0.2);
      });
      tl.to(haloV, { background: "radial-gradient(closest-side, rgba(255,170,110,.32), rgba(0,0,0,0))", duration: 3 }, 1.2);
      tl.to(rayo, { opacity: 1, duration: 3 }, 1.6);
      // comparado con lo que esperaríamos si fueran independientes
      N.show(tl, ley, 4.0, { x: 30, y: 0 });
      celdas.forEach((c) => {
        tl.to(c.p, { attr: { fill: c.mas ? MAS : MENOS }, duration: 0.6 }, 4.2 + (c.ri + c.ci) * 0.06);
        tl.to(c.b, { attr: { fill: c.mas ? MAS : MENOS }, opacity: 0.55, duration: 0.6 }, 4.2 + (c.ri + c.ci) * 0.06);
        tl.to(c.sig, { opacity: 0.9, duration: 0.4 }, 4.5 + (c.ri + c.ci) * 0.06);
      });
      tl.to(diag, { opacity: 1, duration: 0.4, stagger: 0.15 }, 5.6);
      // la prueba
      W.relevo(tl, k1, k2, 7.9);
      N.hide(tl, ley, 7.8, 0.4);
      tl.to(prueba, { opacity: 1, duration: 0.7 }, 8.1);
      tl.to(fr, { opacity: 1, duration: 0.5 }, 8.7);
      tl.to(est, { opacity: 1, duration: 0.3 }, 9.2);
      tl.to(mueve, { redraw: 1, duration: 1.6, ease: "power2.inOut" }, 9.3);
      N.show(tl, h0, 9.5, { y: 10 });
      N.show(tl, dec, 11.1, { x: 30, y: 0 });
      N.show(tl, mano, 12.9, { y: 10 });
      tl.to(estG, { attr: { r: 40 }, duration: 0.7, yoyo: true, repeat: 2, ease: "sine.inOut" }, 11.1);
    },
  });
})();
