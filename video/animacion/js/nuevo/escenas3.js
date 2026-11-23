/* Escenas 6b a 10: casa o escuela, cuántos libros, límites, alcance, impacto y cierre. */
(function () {
  const { C, s, g, rect, path, circ, h, U, figura, posar, rng } = A;
  const G = window.GUION;
  const D = window.DATA;
  const FRA = "Fraunces, serif", NUN = "Nunito, sans-serif";
  const PIEL = ["#E0A77E", "#C98B62", "#A9714D", "#EDBE98"];

  /* ================= 6b · Solo en casa o solo en la escuela: los frascos de luz ================= */
  N.add({
    id: "solo",
    build(el, tl, T) {
      const pl = A.plano(el, { fondo: "#081A22" });
      N.entra(tl, pl, 0);
      const cielo = pl.capa(-1100, { sombra: false });
      rect(cielo, -480, -270, 2880, 1620, W.grad(cielo, "s6cielo", [[0, "#040C1C"], [0.6, "#0D2C38"], [1, "#1B4A4C"]]));
      U.estrellas(cielo, 170, 61, { x0: -480, x1: 2400, y0: -270, y1: 620 });
      const lejos = pl.capa(-520);
      path(lejos, "M-480,770 Q0,640 520,720 T1420,690 T2400,720 V1500 H-480 Z", "#0C2A30");
      const r = rng(31);
      for (let i = 0; i < 26; i++) { const x = -400 + i * 110 + r() * 40, y = 720 + r() * 30; circ(lejos, x, y - 60, 50 + r() * 40, "#0A2328"); rect(lejos, x - 6, y - 40, 12, 60, "#0A2328"); }
      const cerca = pl.capa(-220);
      path(cerca, "M-480,880 Q600,820 1300,860 T2400,850 V1500 H-480 Z", "#091E24");

      const fr = pl.capa(-60);
      const piso = 930;
      const frasco = (cx, col, colB, id) => {
        const gg = g(fr);
        rect(gg, cx - 176, 860, 352, 70, "#24343C", { rx: 8 });
        rect(gg, cx - 190, 852, 380, 18, "#33464F", { rx: 6 });
        const y0 = 412, y1 = 850, H = y1 - y0;
        const cp = s("clipPath", { id }, gg.ownerSVGElement.querySelector("defs") || s("defs", {}, gg.ownerSVGElement));
        rect(cp, cx - 140, y0, 280, H, "#000", { rx: 38 });
        const liq = g(gg, { "clip-path": `url(#${id})` });
        const grad = W.grad(gg.ownerSVGElement, id + "g", [[0, colB], [1, col]]);
        const cuerpo = rect(liq, cx - 160, y1, 320, 40, grad);
        const ola = path(liq, "", colB);
        const resplandor = rect(gg, cx - 150, y1, 300, 10, col, { opacity: 0, style: "filter:blur(24px)" });
        rect(gg, cx - 152, 400, 304, 460, "rgba(255,255,255,.06)", { rx: 48, stroke: "rgba(220,240,255,.55)", "stroke-width": 4 });
        rect(gg, cx - 100, 344, 200, 64, "rgba(255,255,255,.05)", { stroke: "rgba(220,240,255,.5)", "stroke-width": 4, rx: 12 });
        rect(gg, cx - 116, 334, 232, 18, "rgba(220,240,255,.35)", { rx: 9 });
        rect(gg, cx - 80, 296, 160, 44, "#B98052", { rx: 10 });
        path(gg, `M${cx - 128},440 Q${cx - 140},620 ${cx - 126},820`, "none", { stroke: "rgba(255,255,255,.28)", "stroke-width": 10, "stroke-linecap": "round" });
        [25, 50].forEach((p) => {
          const yy = y1 - (p / 100) * H;
          rect(gg, cx + 106, yy - 1.5, 30, 3, "rgba(220,240,255,.5)");
          s("text", { x: cx + 100, y: yy + 8, "text-anchor": "end", "font-family": NUN, "font-weight": 700, "font-size": 20, fill: "rgba(220,240,255,.6)" }, gg, p + "%");
        });
        const fn = {
          y0, y1, H,
          nivel: { _p: 0, _redraw(rr) {} },
          set(p, fase) {
            const yy = y1 - (p / 100) * H;
            cuerpo.setAttribute("y", yy); cuerpo.setAttribute("height", y1 - yy + 30);
            let d = `M${cx - 160},${yy}`;
            for (let k = 0; k <= 16; k++) { const xx = cx - 160 + k * 20; d += ` L${xx},${(yy + Math.sin(k * 0.9 + fase) * 5).toFixed(1)}`; }
            ola.setAttribute("d", d + ` L${cx + 160},${yy + 12} L${cx - 160},${yy + 12} Z`);
            resplandor.setAttribute("y", yy - 6);
            resplandor.setAttribute("opacity", p > 0 ? 0.6 : 0);
          },
        };
        fn.set(0, 0);
        return fn;
      };
      const casos = [
        { cx: 680, col: "#3C6FB4", colB: "#9CCBFF", p: 27.0, t0: 9.9, t1: 11.0, nombre: "Solo en la escuela", como: "como Héctor", n: "1,977 personas", def: "al menos un estímulo en la escuela y <b>ninguno</b> en casa", tc: "#9CCBFF", id: "s6a" },
        { cx: 1240, col: "#E28A2E", colB: "#FFD27A", p: 46.4, t0: 12.0, t1: 13.2, nombre: "Solo en casa", como: "como Eduardo", n: "500 personas", def: "al menos un estímulo en casa y <b>ninguno</b> en la escuela", tc: "#FFD27A", id: "s6b" },
      ];
      const H = pl.hud;
      const vuelo = pl.capa(0, { sombra: false });
      W.luciernagas(tl, vuelo, { n: 34, seed: 11, y0: 150, y1: 880, t0: 0, dur: T });
      casos.forEach((cs, ci) => {
        const jar = frasco(cs.cx, cs.col, cs.colB, cs.id);
        cs.jar = jar;
        // luciérnagas que entran al frasco
        const rr = rng(cs.cx);
        for (let i = 0; i < 26; i++) {
          const gg = g(vuelo, { opacity: 0 });
          circ(gg, 0, 0, 10, cs.colB, { opacity: 0.5, style: "filter:blur(5px)" });
          circ(gg, 0, 0, 3, "#FFFDF0");
          const sx = cs.cx + (rr() - 0.5) * 900, sy = 160 + rr() * 520, t = cs.t0 + rr() * 1.4;
          tl.set(gg, { opacity: 1, x: sx, y: sy }, t);
          tl.to(gg, { motionPath: { path: [{ x: sx, y: sy }, { x: (sx + cs.cx) / 2 + (rr() - 0.5) * 200, y: 220 }, { x: cs.cx + (rr() - 0.5) * 60, y: 330 }], curviness: 1.4 }, duration: 1.1, ease: "power1.in" }, t);
          tl.to(gg, { opacity: 0, duration: 0.15 }, t + 1.05);
        }
        const fase = { _redraw(rr2) { jar.set(cs.p * Math.min(1, rr2 * 1.25), rr2 * 18); } };
        tl.to(fase, { redraw: 1, duration: cs.t1 - cs.t0 + 1.6, ease: "power1.inOut" }, cs.t0 + 0.6);
        tl.to({ _redraw(rr2) { jar.set(cs.p, 18 + rr2 * 40); } }, { redraw: 1, duration: T - cs.t1 - 2.2, ease: "none" }, cs.t1 + 2.2);
        // cómo se definió cada grupo
        const tarj = h("div", { style: { position: "absolute", left: cs.cx - 260 + "px", top: "96px", width: "520px", padding: "20px 26px 22px", background: "rgba(8,26,34,.88)", border: `3px solid ${cs.tc}`, borderRadius: "16px", textAlign: "center", color: "#EAF3F6" } }, H,
          `<div style="font:700 44px/1.1 var(--f-head);color:${cs.tc}">${cs.nombre}</div><div style="font:700 29px/1.3 var(--f-body);margin-top:10px">${cs.def}</div>`);
        N.show(tl, tarj, 1.2 + ci * 3.8, { y: 16 });
        N.hide(tl, tarj, 9.8, 0.4);
        const num = W.neon(H, "0.0%", { x: cs.cx - 220, y: 160, w: 440, size: 96, align: "center", color: "#FFFDF4", glow: cs.colB });
        num.style.transformOrigin = "50% 0";
        tl.fromTo(num, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, cs.t0 + 0.6);
        W.cuenta(tl, num, 0, cs.p, cs.t0 + 0.6, cs.t1 - cs.t0 + 1.0, W.pct);
        tl.to(num, { y: 376, scale: 0.62, duration: 0.8, ease: "power2.inOut" }, 18.2);
        const n1 = N.t(H, cs.nombre, { x: cs.cx - 160, y: 420, w: 320, size: 34, align: "center", color: cs.tc });
        const n2 = N.t(H, cs.como, { x: cs.cx - 160, y: 462, w: 320, size: 32, font: "hand", align: "center", color: "#DDE9EE" });
        const n3 = N.t(H, cs.n, { x: cs.cx - 160, y: 504, w: 320, size: 26, font: "body", align: "center", color: "#B9CDD4" });
        N.show(tl, [n1, n2, n3], 2.0 + ci * 3.4, { stagger: 0.15, y: 12 });
      });
      // Héctor y Eduardo, de adultos
      const fig = pl.capa(-30);
      const sc = 1.3, cad = piso - 178 * sc;
      const hec = figura(fig, { x: 330, y: cad, s: sc, piel: PIEL[0], pelo: "#241A1A", ropa: "#3F78C4", pantalon: "#27325E", pose: { cabeza: 0 } });
      const edu = figura(fig, { x: 1590, y: cad, s: sc, flip: true, piel: PIEL[2], pelo: "#5A3418", ropa: "#F2A03C", pantalon: "#4A3A2E", peinado: "rizado" });
      tl.fromTo([hec.root, edu.root], { opacity: 0 }, { opacity: 1, duration: 0.6 }, 0.2);
      posar(tl, hec, { cabeza: -22, lean: -4 }, 1.6, 1.2);
      posar(tl, edu, { cabeza: -26, lean: -4 }, 5.0, 1.2);
      posar(tl, hec, { cabeza: 0, lean: 0 }, 24.6, 1.0);
      posar(tl, edu, { cabeza: 6, lean: 2, bF: [30, 40] }, 24.8, 1.0);

      // rótulos
      const k1 = W.kicker(pl, "RESULTADO 3 · LO QUE VIMOS EN LA MUESTRA", "#FFE3A8", { y: 26 });
      const k2 = W.kicker(pl, "RESULTADO 3 · LO QUE PODEMOS INFERIR · 96% DE CONFIANZA", "#FFE3A8", { y: 26 });
      gsap.set(k2, { autoAlpha: 0 });
      N.show(tl, k1, 0.3, { y: 12 });
      W.relevo(tl, k1, k2, 18.4);
      // prueba z de diferencia de proporciones (Prueba 2 del reporte), en una franja arriba
      const ZF = D.general.zFrontera, ZV = 8.41;
      const svg = s("svg", { width: 1920, height: 1080, style: "position:absolute;left:0;top:0;overflow:visible" }, H);
      const zb = 268, X = (z) => 1000 + z * 58, Y = (z) => zb - Math.exp(-z * z / 2) * 140;
      const zg = g(svg, { opacity: 0 });
      const zs = d3.range(-3.6, 3.61, 0.1);
      const cola = (a, b) => { const q = d3.range(a, b + 0.001, 0.1); return `M${X(a).toFixed(1)},${zb} ` + q.map((z) => `L${X(z).toFixed(1)},${Y(z).toFixed(1)}`).join(" ") + ` L${X(b).toFixed(1)},${zb} Z`; };
      path(zg, `M${X(-3.6)},${zb} ` + zs.map((z) => `L${X(z).toFixed(1)},${Y(z).toFixed(1)}`).join(" ") + ` L${X(3.6)},${zb} Z`, "rgba(156,203,255,.22)", { stroke: "#9CCBFF", "stroke-width": 3 });
      path(zg, cola(ZF, 3.6) + " " + cola(-3.6, -ZF), "rgba(228,103,78,.6)");
      rect(zg, X(-3.8), zb, X(10.2) - X(-3.8), 3, "#DDE9EE");
      [0].forEach((z) => { rect(zg, X(z) - 1.5, zb, 3, 10, "#DDE9EE"); s("text", { x: X(z), y: zb + 30, "text-anchor": "middle", "font-family": NUN, "font-weight": 700, "font-size": 22, fill: "#DDE9EE" }, zg, z); });
      [-ZF, ZF].forEach((z) => path(zg, `M${X(z)},${zb - 160} V${zb}`, "none", { stroke: "#FF8A70", "stroke-width": 3, "stroke-dasharray": "8 7" }));
      s("text", { x: X(-ZF) - 12, y: zb - 120, "text-anchor": "end", "font-family": NUN, "font-weight": 800, "font-size": 24, fill: "#FF9C86" }, zg, "valor frontera ±2.054");
      const ztit = N.t(H, "Prueba z de diferencia de proporciones", { x: 80, y: 74, w: 900, size: 40, color: "#FFF4D8" });
      const est = g(svg, { opacity: 0 });
      const eL = path(est, "", "none", { stroke: "#FFFDF4", "stroke-width": 5, "stroke-linecap": "round" });
      const eG = circ(est, 0, zb - 110, 26, "#FFD27A", { style: "filter:blur(10px)" });
      const eD = circ(est, 0, zb - 110, 11, "#FFFDF4");
      const eT = s("text", { y: zb - 140, "text-anchor": "middle", "font-family": FRA, "font-weight": 700, "font-size": 40, fill: "#FFFDF4" }, est, "");
      const mueve = { _redraw(rr) { const z = 2.4 + (ZV - 2.4) * rr, x = X(z); eL.setAttribute("d", `M${x},${zb - 110} V${zb}`); eG.setAttribute("cx", x); eD.setAttribute("cx", x); eT.setAttribute("x", x); eT.textContent = "z = " + z.toFixed(2); } };
      mueve._redraw(0);
      const dec = N.t(H, "H₀: p<sub>casa</sub> = p<sub>escuela</sub> · z = 8.41 &gt; 2.054 → se tiene evidencia para rechazar H₀", { x: 360, y: 952, w: 1200, size: 32, font: "body", align: "center", color: "#FFE38A", weight: 800 });
      N.show(tl, ztit, 18.8, { y: 12 });
      tl.to(zg, { opacity: 1, duration: 0.7 }, 19.2);
      tl.to(est, { opacity: 1, duration: 0.3 }, 20.2);
      tl.to(mueve, { redraw: 1, duration: 1.8, ease: "power2.inOut" }, 20.3);
      N.show(tl, dec, 22.6, { y: 12 });
      tl.to(eG, { attr: { r: 40 }, duration: 0.7, yoyo: true, repeat: 2, ease: "sine.inOut" }, 22.2);
      N.camara(tl, pl, { z: -60 }, { z: 40 }, 0, 19, "sine.inOut");
      tl.to(pl.cam, { z: -30, duration: T - 19, ease: "sine.inOut" }, 19);
    },
  });

  /* ================= 6c · Cuántos libros: el escritorio bajo la lluvia ================= */
  N.add({
    id: "libros", entrada: "hoja",
    build(el, tl, T) {
      const pl = A.plano(el, { fondo: "#2A1424" });
      N.entra(tl, pl, 0);
      const muro = pl.capa(-600, { sombra: false });
      rect(muro, -480, -270, 2880, 1620, "#3A1A2C");
      for (let y = -270; y < 700; y += 70) for (let x = -480 + ((y / 70) % 2) * 35; x < 2400; x += 70) path(muro, `M${x},${y - 10} L${x + 8},${y} L${x},${y + 10} L${x - 8},${y} Z`, "#452238");
      U.ventana(muro, 1460, 110, 360, 420, { noche: true, marco: "#E9D8B8", luna: false, cortina: "#6E2440" });
      const defs = muro.querySelector("defs") || s("defs", {}, muro);
      const cp = s("clipPath", { id: "l6vent" }, defs);
      rect(cp, 1460, 110, 360, 420, "#000");
      const lluviaC = g(muro, { "clip-path": "url(#l6vent)" });
      const lluvia = g(lluviaC);
      const rr = rng(14);
      for (let i = 0; i < 60; i++) { const x = 1460 + rr() * 360, y = -300 + rr() * 900; path(lluvia, `M${x},${y} l-10,46`, "none", { stroke: "#BFD6F2", "stroke-width": 2, opacity: 0.35 + rr() * 0.3 }); }
      tl.fromTo(lluvia, { y: -300 }, { y: 0, duration: 0.7, ease: "none", repeat: Math.ceil(T / 0.7) }, 0);
      for (let i = 0; i < 8; i++) circ(lluviaC, 1480 + rr() * 320, 380 + rr() * 140, 10 + rr() * 16, rr() > 0.5 ? "#FFC56B" : "#8FB7E6", { opacity: 0.25, style: "filter:blur(4px)" });

      const mesa = pl.capa(-80);
      rect(mesa, -480, 700, 2880, 720, "#4A2A1C");
      rect(mesa, -480, 686, 2880, 22, "#7A4A30");
      const lamp = U.lampara(mesa, 300, 700, { pantalla: "#2F6B55", base: "#C9A25A", s: 1.7 });
      const luz = pl.capaLuz(-80);
      const hl = A.halo(luz, 300, 540, 700, "rgba(255,200,120,.5)");
      U.planta(mesa, 1700, 700, 0.9, "#2F6B55", "#B5504A");

      const pil = pl.capa(0);
      const base = 700, u = 78;
      const pilas = [
        { cx: 720, v: D.mediasHogar.bajo, cols: ["#F6D3A8", "#E9C08A", "#F2B98A", "#FFE3C0"], nombre: "Acceso bajo en el hogar", tc: "#F6D3A8" },
        { cx: 1240, v: D.mediasHogar.alto, cols: ["#B5651D", "#E59A4F", "#C9463D", "#E2B04A"], nombre: "Acceso alto en el hogar", tc: "#FFB36B" },
      ];
      const H = pl.hud;
      pilas.forEach((P, pi) => {
        let y = base;
        const r2 = rng(50 + pi);
        for (let i = 0; i < Math.ceil(P.v); i++) {
          const th = Math.max(6, u * Math.min(1, P.v - i)), off = (r2() - 0.5) * 22;
          const b = W.libroH(pil, P.cx - 160 + off, y - th, 320, th, P.cols[i % P.cols.length]);
          tl.fromTo(b, { opacity: 0, y: -380 }, { opacity: 1, y: 0, duration: 0.55, ease: "power2.in" }, 0.7 + i * 0.36 + pi * 0.18);
          y -= th;
        }
        P.top = y;
        const num = W.neon(H, "0.00", { x: P.cx - 220, y: y - 160, w: 440, size: 92, align: "center", color: "#FFF4D8", glow: "#E59A4F" });
        const lab = N.t(H, "libros al año (media)", { x: P.cx - 220, y: y - 56, w: 440, size: 26, font: "body", align: "center", color: "#F1DCC4" });
        tl.fromTo([num, lab], { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4, stagger: 0.15 }, 3.4);
        W.cuenta(tl, num, 0, P.v, 3.4, 1.4, W.d2);
        const nm = N.t(H, P.nombre, { x: P.cx - 240, y: 716, w: 480, size: 30, align: "center", color: P.tc });
        N.show(tl, nm, 0.6 + pi * 0.2, { y: 10 });
      });
      // la regla: intervalo de la diferencia de medias
      const regla = g(pil, { opacity: 0 });
      const X = (v) => 600 + v * 480;
      rect(regla, 560, 790, 840, 70, "#E2B97A", { rx: 6 });
      rect(regla, 560, 850, 840, 10, "#B98B4E", { rx: 3 });
      for (let i = 0; i <= 15; i++) {
        const v = i / 10, big = i % 5 === 0;
        rect(regla, X(v) - 1.5, 790, 3, big ? 30 : 16, "#5A3A22");
        if (big) s("text", { x: X(v), y: 846, "text-anchor": "middle", "font-family": NUN, "font-weight": 800, "font-size": 22, fill: "#5A3A22" }, regla, v === 0 ? "0" : String(v));
      }
      rect(regla, X(0) - 2.5, 772, 5, 104, "#E4674E");
      const banda = g(pil, { opacity: 0 });
      rect(banda, X(0.43), 784, X(1.13) - X(0.43), 82, "#FFC56B", { opacity: 0.5, style: "filter:blur(10px)" });
      rect(banda, X(0.43), 790, X(1.13) - X(0.43), 70, "rgba(255,197,107,.55)", { stroke: "#FFE38A", "stroke-width": 4, rx: 4 });
      const sin = N.t(H, "0 = sin diferencia", { x: 300, y: 806, w: 248, size: 26, font: "body", align: "right", color: "#FF9C86" });
      const bl = N.t(H, `Diferencia de medias: <b style="color:#FFD27A">0.43 a 1.13 libros al año</b> (t de Welch)`, { x: 0, y: 884, w: 1920, size: 30, font: "body", align: "center", color: "#FFF4D8" });
      tl.fromTo(regla, { opacity: 0, x: -900 }, { opacity: 1, x: 0, duration: 0.9, ease: "power3.out" }, 6.2);
      N.show(tl, sin, 7.0, { x: -16, y: 0 });
      tl.fromTo(banda, { opacity: 0, scaleX: 0, transformOrigin: "50% 50%" }, { opacity: 1, scaleX: 1, duration: 0.8, ease: "power2.out" }, 8.4);
      N.show(tl, bl, 8.8, { y: 10 });

      const k1 = W.kicker(pl, "RESULTADO 4 · LO QUE VIMOS EN LA MUESTRA · SOLO LECTORES", "#FFE3A8");
      const k2 = W.kicker(pl, "RESULTADO 4 · LO QUE PODEMOS INFERIR · 96% DE CONFIANZA", "#FFE3A8");
      gsap.set(k2, { autoAlpha: 0 });
      const t1 = N.t(H, "¿Cuántos libros leen quienes sí leen?", { x: 80, y: 74, w: 1500, size: 50, color: "#FFF4D8" });
      const t2 = N.t(H, "H₀: μ<sub>alto</sub> = μ<sub>bajo</sub> · t = 4.56 &gt; 1.751 → se tiene evidencia para rechazar H₀", { x: 80, y: 80, w: 1760, size: 38, color: "#FFF4D8" });
      gsap.set(t2, { autoAlpha: 0 });
      N.show(tl, [k1, t1], 0.3, { stagger: 0.2, y: 12 });
      W.relevo(tl, k1, k2, 6.0);
      W.relevo(tl, t1, t2, 11.2);
      N.camara(tl, pl, { z: -50, x: 30 }, { z: 60, x: -20 }, 0, T, "sine.inOut");
      tl.fromTo(hl, { opacity: 0.85 }, { opacity: 1, duration: 1.4, yoyo: true, repeat: 5, ease: "sine.inOut" }, 0);
    },
  });

  /* ================= 7 · Límites y conclusiones: la letra chica ================= */
  N.add({
    id: "limites", entrada: "iris", irisEn: [1400, 540],
    build(el, tl, T) {
      const pl = A.plano(el, { fondo: "#C9DCE8" });
      N.entra(tl, pl, 0);
      const mesa = pl.capa(-300, { sombra: false });
      rect(mesa, -480, -270, 2880, 1620, W.grad(mesa, "l7mesa", [[0, "#DDEAF2"], [1, "#B7CEDF"]], { x1: 0, y1: 0, x2: 1, y2: 1 }));
      for (let y = -270; y < 1400; y += 90) rect(mesa, -480, y, 2880, 2, "rgba(255,255,255,.35)");
      const obj = pl.capa(260, { blur: 7, sombra: false });
      circ(obj, 2060, 1180, 230, "#E4674E"); circ(obj, 2060, 1180, 170, "#7A3B2E");
      rect(obj, -420, -120, 520, 46, "#F2B24C", { rx: 20, transform: "rotate(28 -160 -100)" });
      N.camara(tl, pl, { z: -40 }, { z: 50 }, 0, T, "sine.inOut");

      const H = pl.hud;
      N.cameo(H, tl, { id: "D", quien: G.cameos[3], linea: "«Son asociaciones, no causalidad… Concluimos que…»", x: 70, y: 200, w: 880, h: 495, t0: 0.6, t1: T - 0.4, out: false });
      const k1 = W.kicker(pl, "LIMITACIONES", "#2E4A66");
      const k2 = W.kicker(pl, "CONCLUSIONES", "#2E4A66");
      gsap.set(k2, { autoAlpha: 0 });
      N.show(tl, k1, 0.3, { y: 10 });
      W.relevo(tl, k1, k2, 8.4);

      const caja = h("div", { style: { position: "absolute", left: "1010px", top: "110px", width: "800px", height: "840px", perspective: "2400px" } }, H);
      const carta = h("div", { style: { position: "absolute", inset: 0, transformStyle: "preserve-3d", transform: "rotate(1.5deg)" } }, caja);
      const cara = (extra) => h("div", { style: Object.assign({ position: "absolute", inset: 0, background: "#FFFDF6", borderRadius: "8px", boxShadow: "0 22px 50px rgba(30,50,80,.28)", backfaceVisibility: "hidden", overflow: "hidden" }, extra) }, carta);
      const fr = cara({});
      const re = cara({ transform: "rotateY(180deg)" });
      h("div", { style: { position: "absolute", left: "60px", top: "64px", font: "800 22px/1 var(--f-body)", letterSpacing: ".22em", color: "#5B7690" } }, fr, "LIMITACIONES");
      h("div", { style: { position: "absolute", left: "60px", right: "60px", top: "120px", bottom: "60px", background: "repeating-linear-gradient(#FFFDF6 0 22px, #C9D4DE 22px 26px, #FFFDF6 26px 34px)", opacity: 0.8 } }, fr);
      const frases = ["Asociación, no causalidad", "32 áreas urbanas", "Respuestas de memoria", "Sin factor de expansión"];
      const ys = [180, 340, 500, 660];
      const marcas = frases.map((t, i) => {
        const d = h("div", { style: { position: "absolute", left: "70px", top: ys[i] + "px", padding: "6px 16px", font: "700 46px/1.1 var(--f-head)", color: "#1F3550", background: "linear-gradient(transparent 55%, rgba(255,214,90,.75) 55%)", backgroundSize: "0% 100%", backgroundRepeat: "no-repeat", backgroundColor: "#FFFDF6" } }, fr, t);
        gsap.set(d, { autoAlpha: 0 });
        return d;
      });
      // la lupa
      const lupa = h("div", { style: { position: "absolute", left: 0, top: 0, width: "300px", height: "300px", marginLeft: "-150px", marginTop: "-150px" } }, H);
      h("div", { style: { position: "absolute", left: "240px", top: "236px", width: "150px", height: "44px", background: "#2E3A4A", borderRadius: "22px", transform: "rotate(42deg)", transformOrigin: "0 50%" } }, lupa);
      const vidrio = h("div", { style: { position: "absolute", inset: 0, borderRadius: "50%", border: "16px solid #2E3A4A", background: "radial-gradient(circle at 35% 30%, rgba(255,255,255,.75), rgba(230,240,248,.55) 60%, rgba(200,220,235,.5))", boxShadow: "0 16px 30px rgba(30,50,80,.3)", overflow: "hidden" } }, lupa);
      const dentro = frases.map((t) => { const d = h("div", { style: { position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 30px", font: "700 40px/1.1 var(--f-head)", color: "#1F3550" } }, vidrio, t); gsap.set(d, { autoAlpha: 0 }); return d; });
      const stops = ys.map((y, i) => [1400 + (i % 2 ? 90 : -60), 110 + y + 30]);
      const tStop = [1.3, 3.9, 5.4, 6.5];
      tl.fromTo(lupa, { x: 2100, y: 1000, autoAlpha: 0 }, { x: stops[0][0], y: stops[0][1], autoAlpha: 1, duration: 0.8, ease: "power2.out" }, 0.5);
      tStop.forEach((t, i) => {
        if (i) tl.to(lupa, { x: stops[i][0], y: stops[i][1], duration: 0.6, ease: "power2.inOut" }, t - 0.6);
        tl.to(dentro[i], { autoAlpha: 1, duration: 0.2 }, t - 0.05);
        tl.to(dentro[i], { autoAlpha: 0, duration: 0.2 }, t + 0.95);
        tl.to(marcas[i], { autoAlpha: 1, duration: 0.3 }, t + 0.9);
        tl.to(marcas[i], { backgroundSize: "100% 100%", duration: 0.45, ease: "power2.out" }, t + 1.0);
      });
      tl.to(lupa, { x: 2200, y: 1100, autoAlpha: 0, duration: 0.7, ease: "power2.in" }, 7.8);

      // las conclusiones, al reverso
      h("div", { style: { position: "absolute", left: "70px", top: "64px", font: "800 22px/1 var(--f-body)", letterSpacing: ".22em", color: "#5B7690" } }, re, "CONCLUSIONES");
      const conc = [
        [`El acceso en la infancia se relaciona sobre todo con <span style="color:#C2452F;font-weight:700">volverse lector</span>, y poco con cuántos libros se leen.`, 9.0],
        [`El índice del <span style="color:#C2452F;font-weight:700">hogar</span> se asocia más con leer que el de la escuela.`, 14.3],
        [`Los dos índices <span style="color:#C2452F;font-weight:700">no son independientes</span>: el acceso escolar tiende a acompañar al del hogar.`, 18.3],
      ];
      const tops = [130, 380, 580];
      conc.forEach(([html, t], i) => {
        const row = h("div", { style: { position: "absolute", left: "60px", right: "50px", top: tops[i] + "px", display: "flex", gap: "22px", alignItems: "flex-start" } }, re,
          `<div style="flex:none;width:58px;height:58px;border-radius:50%;background:#2E4A66;color:#FFFDF6;display:flex;align-items:center;justify-content:center;font:700 32px var(--f-head);margin-top:4px">${i + 1}</div><div style="font:600 40px/1.24 var(--f-head);color:#1F3550">${html}</div>`);
        tl.fromTo(row, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.6 }, t);
      });
      tl.to(carta, { rotationY: 180, duration: 1.0, ease: "power2.inOut" }, 8.2);
    },
  });

  /* ================= 4 · Innovación: dos preguntas, y el hogar frente a la escuela ================= */
  N.add({
    id: "innovacion", entrada: "hoja",
    build(el, tl, T) {
      const pergamino = (pl, seed) => {
        const p = pl.capa(-400, { sombra: false });
        rect(p, -480, -270, 2880, 1620, W.grad(p, "a8p" + seed, [[0, "#EFDDB8"], [1, "#DCC394"]], { x1: 0, y1: 0, x2: 1, y2: 1 }));
        const r = rng(seed);
        for (let i = 0; i < 16; i++) s("ellipse", { cx: -400 + r() * 2700, cy: -200 + r() * 1400, rx: 80 + r() * 260, ry: 60 + r() * 180, fill: "#8A5A2A", opacity: 0.04 + r() * 0.05 }, p);
        const rosa = g(p, { transform: "translate(1760,880)", opacity: 0.25 });
        for (let i = 0; i < 8; i++) path(rosa, "M0,-110 L14,0 L0,110 L-14,0 Z", "#5A3A22", { transform: `rotate(${i * 45})`, opacity: i % 2 ? 0.5 : 1 });
        circ(rosa, 0, 0, 120, "none", { stroke: "#5A3A22", "stroke-width": 3 });
        return p;
      };
      const tinta = "#3A2416", tinta2 = "#6B4A2E";

      // ---- A · dos preguntas
      const pa = A.plano(el, { fondo: "#E8D5B0" });
      N.entra(tl, pa, 0);
      pergamino(pa, 3);
      N.camara(tl, pa, { z: -40 }, { z: 30 }, 0, 8, "sine.inOut");
      const HA = pa.hud;
      N.cameo(HA, tl, { id: "E", quien: G.cameos[4], linea: "«¿Qué tiene de nuevo? Separamos dos preguntas: leer o no leer, y cuántos libros.»", x: 110, y: 230, w: 800, h: 450, t0: 0.6, t1: 7.8, out: false });
      const kA = W.kicker(pa, "INNOVACIÓN", "#7B2D43");
      N.show(tl, kA, 0.3, { y: 10 });
      const tarjeta = (y) => h("div", { style: { position: "absolute", left: "1000px", top: y + "px", width: "820px", height: "290px", border: `3px solid ${tinta2}`, borderRadius: "16px", background: "rgba(255,248,232,.55)" } }, HA);
      const c1 = tarjeta(200), c2 = tarjeta(530);
      N.t(c1, "¿Leyó o no leyó?", { x: 260, y: 78, w: 540, size: 54, color: tinta, sombra: false });
      N.t(c1, "la decisión de leer libros", { x: 262, y: 156, w: 540, size: 30, font: "body", color: tinta2, sombra: false });
      N.t(c2, "¿Cuántos libros?", { x: 260, y: 78, w: 540, size: 54, color: tinta, sombra: false });
      N.t(c2, "la cantidad de libros leídos", { x: 262, y: 156, w: 540, size: 30, font: "body", color: tinta2, sombra: false });
      const sv1 = s("svg", { width: 220, height: 260, style: "position:absolute;left:24px;top:14px;overflow:visible" }, c1);
      rect(sv1, 40, 40, 120, 180, "#F4E6C8", { rx: 14, stroke: tinta, "stroke-width": 4 });
      const palanca = g(sv1);
      rect(palanca, 86, 60, 28, 70, tinta, { rx: 12 });
      const foco = circ(sv1, 190, 60, 26, "#D9C9A8", { stroke: tinta, "stroke-width": 4 });
      const sv2 = s("svg", { width: 220, height: 260, style: "position:absolute;left:24px;top:14px;overflow:visible" }, c2);
      const libs = ["#7B2D43", "#2F6B66", "#C98A3A", "#3B4E86"].map((c, i) => W.libroH(sv2, 30 + (i % 2) * 10, 214 - (i + 1) * 40, 160, 36, c));
      tl.fromTo([c1, c2], { autoAlpha: 0, x: 60 }, { autoAlpha: 1, x: 0, duration: 0.6, stagger: 0.5 }, 3.4);
      tl.to(palanca, { y: 52, duration: 0.25, ease: "back.out(2)" }, 4.6);
      tl.to(foco, { attr: { fill: "#FFD27A" }, duration: 0.2 }, 4.7);
      tl.fromTo(libs, { opacity: 0, y: -120 }, { opacity: 1, y: 0, duration: 0.35, stagger: 0.18, ease: "power2.in" }, 5.4);
      const dos = N.t(HA, "dos preguntas, dos análisis", { x: 1000, y: 852, w: 820, size: 54, font: "hand", align: "center", color: "#7B2D43", sombra: false });
      N.show(tl, dos, 6.6, { y: 10 });

      // ---- B · el hogar frente a la escuela
      const pb = A.plano(el, { fondo: "#E8D5B0" });
      pergamino(pb, 7);
      N.hoja(tl, pa, pb, 7.6, 0.9);
      N.camara(tl, pb, { z: -60 }, { z: 20 }, 7.6, T, "sine.inOut");
      const svB = pb.capa(0, { sombra: false });
      const lavado = (cx, cy, col) => s("ellipse", { cx, cy, rx: 300, ry: 230, fill: col, opacity: 0.35, style: "filter:blur(18px)" }, svB);
      lavado(560, 560, "#E59A4F"); lavado(1360, 560, "#6FA3CF");
      const trazo = { fill: "none", stroke: tinta, "stroke-width": 6, "stroke-linejoin": "round", "stroke-linecap": "round" };
      const casa = [path(svB, "M400,720 V520 L560,400 L720,520 V720 Z", "none", trazo), path(svB, "M520,720 V620 H600 V720", "none", trazo), path(svB, "M430,560 H500 V610 H430 Z M620,560 H690 V610 H620 Z", "none", trazo)];
      const escuela = [path(svB, "M1180,720 V540 H1540 V720 Z", "none", trazo), path(svB, "M1300,540 V460 L1360,410 L1420,460 V540", "none", trazo), path(svB, "M1360,410 V350 L1410,365 L1360,380", "none", trazo), path(svB, "M1335,720 V650 H1385 V720 M1210,580 H1270 V620 H1210 Z M1450,580 H1510 V620 H1450 Z", "none", trazo)];
      const flechas = [path(svB, "M780,600 H900 M880,580 L900,600 L880,620", "none", Object.assign({}, trazo, { stroke: "#7B2D43" })), path(svB, "M1140,600 H1020 M1040,580 L1020,600 L1040,620", "none", Object.assign({}, trazo, { stroke: "#7B2D43" }))];
      [...casa, ...escuela, ...flechas].forEach((p) => tl.set(p, { opacity: 1 }, 8.0));
      N.draw(tl, casa, 8.0, 1.0);
      N.draw(tl, escuela, 8.4, 1.0);
      N.draw(tl, flechas, 9.4, 0.5);
      const HB = pb.hud;
      const tB = N.t(HB, "El hogar frente a la escuela", { x: 0, y: 120, w: 1920, size: 64, align: "center", color: tinta, sombra: false });
      const eh = N.t(HB, "hogar", { x: 410, y: 744, w: 300, size: 40, font: "hand", align: "center", color: "#B5651D", sombra: false });
      const ee = N.t(HB, "escuela", { x: 1210, y: 744, w: 300, size: 40, font: "hand", align: "center", color: "#2F5D8A", sombra: false });
      N.write(tl, tB, 8.0, 1.0);
      N.show(tl, [eh, ee], 9.2, { stagger: 0.2, y: 10 });
      const chip = (x, txt) => h("div", { class: "chip", style: { left: x + "px", top: "850px", background: "#FFF8E8", border: `3px solid ${tinta2}`, color: tinta } }, HB, txt);
      const ch1 = chip(520, "Datos públicos del INEGI"), ch2 = chip(1010, "Código en R reproducible");
      N.show(tl, ch1, 11.6, { y: 16 });
      N.show(tl, ch2, 12.8, { y: 16 });
    },
  });

  /* ================= 9 · Impacto: la calle al amanecer ================= */
  N.add({
    id: "impacto",
    build(el, tl, T) {
      const pl = A.plano(el, { fondo: "#F6C9A8" });
      N.entra(tl, pl, 0);
      const cielo = pl.capa(-1100, { sombra: false });
      rect(cielo, -480, -270, 2880, 1620, W.grad(cielo, "i9cielo", [[0, "#7FA4DA"], [0.42, "#C9A6CF"], [0.68, "#F4A99A"], [1, "#FFD49A"]]));
      const sol = g(cielo);
      circ(sol, 1480, 0, 260, "rgba(255,241,201,.35)"); circ(sol, 1480, 0, 130, "#FFF1C9");
      sol.setAttribute("transform", "translate(0,900)");
      const nubes = g(cielo);
      [[200, 140, 1], [900, 80, 0.8], [1700, 180, 1.1]].forEach(([x, y, k]) => { const n = g(nubes, { transform: `translate(${x},${y}) scale(${k})`, opacity: 0.75 }); circ(n, 0, 0, 60, "#FFF4EA"); circ(n, 70, 10, 46, "#FFF4EA"); circ(n, -70, 14, 42, "#FFF4EA"); rect(n, -110, 10, 220, 46, "#FFF4EA", { rx: 23 }); });
      tl.to(nubes, { x: 120, duration: T, ease: "none" }, 0);
      const lomas = pl.capa(-600);
      path(lomas, "M-480,760 Q100,600 700,690 T1700,650 T2400,700 V1500 H-480 Z", "#D9939A");
      path(lomas, "M-480,820 Q500,720 1100,790 T2400,770 V1500 H-480 Z", "#BE7E96");

      const calle = pl.capa(-120);
      rect(calle, -480, 820, 2880, 700, "#8C9A7A");
      // escuela
      const esc = g(calle);
      rect(esc, 90, 520, 480, 300, "#7FA0C8");
      rect(esc, 250, 410, 160, 410, "#5E84B4");
      path(esc, "M236,410 L330,340 L424,410 Z", "#3C5F92");
      rect(esc, 328, 250, 5, 90, "#3C5F92"); path(esc, "M333,252 L380,266 L333,280 Z", "#E4674E");
      rect(esc, 300, 700, 60, 120, "#5A3A2A", { rx: 6 });
      circ(esc, 330, 470, 26, "#FFF8E8");
      [120, 190, 450, 520].forEach((x) => [580, 650].forEach((y) => rect(esc, x, y, 44, 44, "#FFF1C9", { rx: 3 })));
      s("text", { x: 330, y: 560, "text-anchor": "middle", "font-family": NUN, "font-weight": 800, "font-size": 26, fill: "#FFF8E8", "letter-spacing": 3 }, esc, "ESCUELA");
      // casas con la ventana apagada
      const casas = [[880, "#E8B4A0", "#B5504A"], [1160, "#B8C9A8", "#5B7A4E"], [1440, "#A8BCD8", "#3C5F92"], [1720, "#E3C38A", "#B5651D"]].map(([cx, muro, techo]) => {
        const gg = g(calle);
        rect(gg, cx - 110, 610, 220, 210, muro);
        path(gg, `M${cx - 130},614 L${cx},520 L${cx + 130},614 Z`, techo);
        rect(gg, cx + 30, 730, 50, 90, "#6B4A3A", { rx: 5 });
        rect(gg, cx - 86, 632, 96, 76, "#FFF8E8", { rx: 4 });
        const v = rect(gg, cx - 80, 638, 84, 64, "#3A3550");
        rect(gg, cx - 40, 638, 4, 64, "#FFF8E8"); rect(gg, cx - 80, 668, 84, 4, "#FFF8E8");
        return { cx, v };
      });
      const luces = pl.capaLuz(-120);
      const halos = casas.map((c) => { const d = A.halo(luces, c.cx - 38, 670, 160, "rgba(255,200,110,.85)"); d.style.opacity = 0; return d; });

      const fr = pl.capa(0);
      path(fr, "M-480,900 C300,880 900,900 1500,890 S2200,900 2400,895 V960 H-480 Z", "#C9A58A");
      path(fr, "M-480,928 C300,908 900,928 1500,918 S2200,928 2400,923", "none", { stroke: "#FFF8E8", "stroke-width": 5, "stroke-dasharray": "34 26" });
      rect(fr, -480, 960, 2880, 500, "#7E8C6C");
      const fases = [["1", "Diagnóstico", 470, 10.3], ["2", "Focalización", 830, 12.0], ["3", "Bibliotecas de aula", 1190, 14.8], ["4", "Familias", 1550, 16.6]];
      fases.forEach(([n, txt, x, t]) => {
        const gg = g(fr, { opacity: 0 });
        rect(gg, x - 4, 760, 8, 150, "#6B4428");
        rect(gg, x - 160, 728, 320, 74, "#FFF8E8", { rx: 10, stroke: "#6B4428", "stroke-width": 4 });
        circ(gg, x - 124, 765, 22, "#7B2D43");
        s("text", { x: x - 124, y: 774, "text-anchor": "middle", "font-family": FRA, "font-weight": 700, "font-size": 26, fill: "#FFF8E8" }, gg, n);
        s("text", { x: x + 22, y: 774, "text-anchor": "middle", "font-family": NUN, "font-weight": 800, "font-size": txt.length > 14 ? 21 : 27, fill: "#3A2416" }, gg, txt);
        tl.fromTo(gg, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.8)" }, t);
      });
      // los libros viajan de la escuela a las casas
      const cols = ["#E4674E", "#2FA39A", "#8E5BA8", "#F2B24C"];
      casas.forEach((c, i) => {
        const b = g(fr, { opacity: 0 });
        rect(b, -24, -32, 48, 64, cols[i], { rx: 4 }); rect(b, -24, -32, 10, 64, "rgba(0,0,0,.2)");
        const t = [10.4, 12.1, 14.9, 16.7][i];
        W.arco(tl, b, [330, 520], [c.cx - 38, 670], 260, t, 1.3, 540);
        tl.to(b, { opacity: 0, duration: 0.2 }, t + 1.3);
        tl.to(c.v, { attr: { fill: "#FFD27A" }, duration: 0.3 }, t + 1.3);
        tl.to(halos[i], { opacity: 1, duration: 0.5 }, t + 1.3);
      });
      tl.to(sol, { y: -380, duration: T, ease: "power1.out" }, 0);
      N.camara(tl, pl, { x: 120, z: -40 }, { x: -60, z: 30 }, 0, T, "sine.inOut");

      const H = pl.hud;
      const k = W.kicker(pl, "IMPACTO SOCIAL", "#5B2A3E");
      N.show(tl, k, 0.3, { y: 10 });
      const prop = N.t(H, "Propuesta", { x: 0, y: 84, w: 1920, size: 118, align: "center", color: "#3A2416", sombra: false, weight: 700 });
      prop.style.textShadow = "0 4px 0 rgba(255,241,201,.6)";
      N.write(tl, prop, 1.0, 1.0);
      N.hide(tl, prop, 18.6, 0.4);
      const ods = [["4", "Educación<br>de calidad", "#C5192D", 520, 360, 19.6], ["10", "Reducción de las<br>desigualdades", "#DD1367", 920, 480, 20.6]];
      ods.forEach(([n, t, col, x, w, at]) => {
        const d = h("div", { style: { position: "absolute", left: x + "px", top: "120px", width: w + "px", height: "170px", background: col, borderRadius: "14px", boxShadow: "0 14px 28px rgba(80,30,40,.3)", color: "#fff", padding: "14px 24px", display: "flex", alignItems: "center", gap: "20px" } }, H,
          `<div style="font:700 104px/1 var(--f-head)">${n}</div><div style="font:800 25px/1.15 var(--f-body);text-transform:uppercase;letter-spacing:.03em"><span style="font-size:17px;opacity:.85;letter-spacing:.14em">ODS</span><br>${t}</div>`);
        tl.fromTo(d, { autoAlpha: 0, scale: 0.5, rotation: -8 }, { autoAlpha: 1, scale: 1, rotation: 0, duration: 0.6, ease: "back.out(1.8)" }, at);
      });
    },
  });

  /* ================= 10 · Cierre: el libro se cierra y vuelve al librero ================= */
  N.add({
    id: "cierre", entrada: "iris", irisEn: [960, 450],
    build(el, tl, T) {
      const pl = A.plano(el, { fondo: "#2A1A18" });
      N.entra(tl, pl, 0);
      const fondo = pl.capa(-800, { sombra: false });
      rect(fondo, -480, -270, 2880, 1620, "#3A2420");
      U.estante(fondo, -470, -240, 1000, 1280, { filas: 7, lleno: 0.96, seed: 23, madera: "#6B4028", fondo: "#24140F" });
      U.estante(fondo, 1390, -240, 1000, 1280, { filas: 7, lleno: 0.96, seed: 29, madera: "#6B4028", fondo: "#24140F" });
      path(fondo, "M600,1000 V120 A360,360 0 0,1 1320,120 V1000 Z", "#4A2E24");
      path(fondo, "M640,1000 V130 A320,320 0 0,1 1280,130 V1000 Z", W.grad(fondo, "c10vent", [[0, "#F9C79A"], [1, "#F4A99A"]]));
      rect(fondo, 955, -200, 10, 1200, "#4A2E24"); rect(fondo, 640, 380, 640, 10, "#4A2E24");
      const rayos = pl.capa(-500, { sombra: false });
      path(rayos, "M700,140 L1220,140 L1600,1100 L380,1100 Z", W.grad(rayos, "c10rayo", [[0, "#FFE3A8", 0.35], [1, "#FFE3A8", 0]]));
      A.polvo(tl, rayos, { x: 560, y: 200, w: 800, hh: 760, n: 34, seed: 3, t0: 0, dur: T });
      const suelo = pl.capa(-60);
      rect(suelo, -480, 880, 2880, 600, "#2A1712");

      // ---- el libro vuelve al librero del fondo (derecha). Fila 4: base = -228 + 179.43 × 4
      const fBase = -228 + (1256 / 7) * 4 - 10, fTop = -228 + (1256 / 7) * 3 + 2;
      const hx = 1560, hw = 70, lh = 148;
      rect(fondo, hx, fTop, hw, fBase - fTop, "#24140F");
      const lomo = g(fondo, { opacity: 0 });
      const lomoG = rect(lomo, hx - 4, fBase - lh - 6, hw + 8, lh + 8, "#FFC56B", { opacity: 0, style: "filter:blur(12px)" });
      rect(lomo, hx + 4, fBase - lh, hw - 8, lh, "#7B2D43", { rx: 3 });
      rect(lomo, hx + 4, fBase - lh + 14, hw - 8, 5, "#E9C98A"); rect(lomo, hx + 4, fBase - 24, hw - 8, 5, "#E9C98A");
      s("text", { transform: `translate(${hx + hw / 2 + 9},${fBase - lh / 2}) rotate(-90)`, "text-anchor": "middle", "font-family": FRA, "font-weight": 700, "font-size": 24, fill: "#EBCB8C" }, lomo, "Lectura");

      N.camara(tl, pl, { z: -70 }, { z: 0 }, 0, 9.6, "sine.inOut");
      tl.to(pl.cam, { z: -220, duration: T - 16.6, ease: "power2.inOut" }, 16.6);

      const H = pl.hud;
      const l1 = N.t(H, "La desigualdad en el acceso empieza en casa…", { x: 0, y: 790, w: 1920, size: 50, align: "center", color: "#FFF4D8" });
      const l2 = W.neon(H, "…y ahí también puede empezar la solución.", { x: 0, y: 860, w: 1920, size: 60, align: "center", color: "#FFF4D8", glow: "#FFB75E" });
      N.write(tl, l1, 1.0, 2.0);
      N.write(tl, l2, 5.2, 2.0);
      N.hide(tl, [l1, l2], 9.4, 0.4);

      // ---- el libro con los créditos
      const libro = h("div", { style: { position: "absolute", left: "150px", top: "170px", width: "1620px", height: "600px", perspective: "2600px", transformOrigin: "1215px 300px" } }, H);
      libro.style.top = "130px";
      const sombraL = "0 34px 60px rgba(0,0,0,.55)";
      const baseI = h("div", { style: { position: "absolute", left: "-14px", top: "-14px", width: "824px", height: "628px", background: "#5E1E36", borderRadius: "14px 0 0 14px", boxShadow: sombraL } }, libro);
      h("div", { style: { position: "absolute", left: "810px", top: "-14px", width: "824px", height: "628px", background: "#5E1E36", borderRadius: "0 14px 14px 0", boxShadow: sombraL } }, libro);
      const papel = (deg) => `linear-gradient(${deg}deg, #F4E7CC 0%, #FBF4E4 70%, #E5D1AC 95%, #C9B088 100%)`;
      const pagD = h("div", { style: { position: "absolute", left: "810px", top: 0, width: "810px", height: "600px", background: papel(270), borderRadius: "0 6px 6px 0", overflow: "hidden" } }, libro);
      const pagI = h("div", { style: { position: "absolute", left: 0, top: 0, width: "810px", height: "600px", transformOrigin: "100% 50%", transformStyle: "preserve-3d" } }, libro);
      const caraI = h("div", { style: { position: "absolute", inset: 0, background: papel(90), borderRadius: "6px 0 0 6px", backfaceVisibility: "hidden" } }, pagI);
      const tapa = h("div", { style: { position: "absolute", inset: 0, background: "radial-gradient(ellipse at 40% 35%, #9A3858, #5E1E36 75%)", borderRadius: "14px", transform: "rotateY(180deg)", backfaceVisibility: "hidden", overflow: "hidden" } }, pagI);
      h("div", { style: { position: "absolute", inset: "28px", border: "3px solid #D9B26A", borderRadius: "8px", boxShadow: "inset 0 0 0 9px rgba(217,178,106,.16)" } }, tapa);
      h("div", { style: { position: "absolute", left: "80px", right: "80px", top: "150px", textAlign: "center", color: "#EBCB8C", font: "700 58px/1.12 var(--f-head)", textShadow: "0 2px 0 rgba(0,0,0,.35)" } }, tapa, "Desigualdad en el acceso a la lectura");
      h("div", { style: { position: "absolute", left: 0, right: 0, top: "440px", textAlign: "center", color: "#EBCB8C", font: "800 26px/1 var(--f-body)", letterSpacing: ".32em" } }, tapa, "MOLEC · INEGI · 2019–2024");
      const et = (t) => `<div style="font:800 20px/1 var(--f-body);letter-spacing:.22em;color:#7B2D43;margin-bottom:8px">${t}</div>`;
      const filasI = [
        [`<div style="font:700 44px/1.1 var(--f-head);color:#2B2340">Desigualdad en el acceso a la lectura</div>`, 56],
        [`${et("INTEGRANTES")}<div style="font:700 26px/1.45 var(--f-body);color:#2B2340">Fernando Isaac Martínez García<br>Mateo Rodolfo Flores Torres<br>Eliel Silva Morales<br>César Julián Leal Salazar</div>`, 196],
        [`${et("TUTORAS")}<div style="font:700 26px/1.45 var(--f-body);color:#2B2340">Dra. Blanca Rosa Ruiz Hernández<br>Dra. María Guadalupe Tobías Lara</div>`, 396],
        [`<div style="font:700 20px/1.4 var(--f-body);color:#6B5E54">MA1001B · Modelación estadística para la toma de decisiones<br>Profesional · Tecnológico de Monterrey, Campus Monterrey</div>`, 516],
      ].map(([html, y]) => h("div", { style: { position: "absolute", left: "80px", width: "660px", top: y + "px" } }, caraI, html));
      const logo = h("img", { src: "assets/tec_logo.png", alt: "", style: { position: "absolute", left: "80px", top: "54px", height: "62px" } }, pagD);
      const tarjeta = h("div", { style: { position: "absolute", left: "96px", top: "150px", width: "620px", height: "380px", padding: "22px 28px", background: "repeating-linear-gradient(#FFF8E8 0 34px, #E9DCC2 34px 36px)", borderRadius: "6px", boxShadow: "0 6px 14px rgba(0,0,0,.18)", color: "#2B2340" } }, pagD,
        `${et("FICHA DE PRÉSTAMO")}
         <div style="font:700 23px/1.45 var(--f-body)">Datos: Módulo sobre Lectura (MOLEC), INEGI, 2019–2024</div>
         <div style="font:italic 600 24px/1.4 var(--f-head);margin-top:8px">Resultados de asociación con 96% de confianza; no implican causalidad.</div>
         <div style="font:600 17px/1.4 var(--f-body);color:#6B5E54;margin-top:10px">Se usó IA (Claude, de Anthropic) como apoyo en el código, la redacción y la animación. El equipo verificó todos los resultados.</div>`);
      const bolsillo = h("div", { style: { position: "absolute", left: "70px", top: "420px", width: "670px", height: "150px", background: "linear-gradient(#E3CFA6, #D6BE90)", borderRadius: "4px 4px 10px 10px", boxShadow: "0 -4px 10px rgba(0,0,0,.12)" } }, pagD);
      const sello = W.sello(bolsillo, "Tec de Monterrey<br><span style='font-size:20px'>2026</span>", { x: 360, y: 30, size: 34, rot: -8 });
      gsap.set(sello, { autoAlpha: 0 });
      gsap.set(libro, { autoAlpha: 0 });

      // ---- primero, las cuatro despedidas dentro del libro
      gsap.set([logo, tarjeta, bolsillo], { autoAlpha: 0 });
      gsap.set(filasI, { autoAlpha: 0 });
      tl.fromTo(libro, { autoAlpha: 0, y: 160, scale: 0.8 }, { autoAlpha: 1, y: 0, scale: 1, duration: 1.0, ease: "power3.out" }, 0.3);
      const FW = 360, FH = 270, FY = 236;
      [190, 580, 1000, 1390].forEach((x, i) => {
        const f = N.cameo(H, tl, { id: "F" + (i + 1), tipo: "Foto o clip despidiéndose", quien: G.equipo[i], linea: "(se despide)", x, y: FY, w: FW, h: FH, t0: 1.0 + i * 0.5, t1: 9.2 });
        const nm = N.t(H, G.equipo[i], { x, y: FY + FH + 24, w: FW, size: 40, font: "hand", align: "center", color: "#2B2340", sombra: false });
        N.write(tl, nm, 1.2 + i * 0.5, 0.6);
        N.hide(tl, nm, 9.2, 0.4);
      });
      tl.to([logo, bolsillo], { autoAlpha: 1, duration: 0.5 }, 9.6);
      tl.set(tarjeta, { autoAlpha: 1 }, 10.3);
      tl.fromTo(filasI, { autoAlpha: 0, x: -16 }, { autoAlpha: 1, x: 0, duration: 0.45, stagger: 0.3 }, 9.9);
      tl.fromTo(tarjeta, { y: 260 }, { y: 0, duration: 0.8, ease: "power2.out" }, 10.4);
      W.selloIn(tl, sello, 11.8);
      // se cierra…
      tl.to(pagI, { rotationY: -180, duration: 1.1, ease: "power2.inOut" }, 13.2);
      tl.to(baseI, { autoAlpha: 0, duration: 0.4 }, 13.8);
      // …y vuelve a su lugar en el librero
      const lomoC = [hx + hw / 2, fBase - lh / 2];
      tl.to(libro, { x: lomoC[0] - 1365, y: lomoC[1] - 430, scale: lh / 600, rotationY: 86, transformPerspective: 1800, duration: 1.5, ease: "power2.inOut" }, 14.4);
      tl.to(lomo, { opacity: 1, duration: 0.3 }, 15.6);
      tl.set(libro, { autoAlpha: 0 }, 15.9);
      tl.fromTo(lomo, { scale: 1.05, transformOrigin: "50% 100%" }, { scale: 1, duration: 0.5, ease: "power2.out", immediateRender: false }, 15.6);
      tl.to(lomoG, { opacity: 0.85, duration: 0.6, yoyo: true, repeat: 1, ease: "sine.inOut" }, 16.2);
      const negro = h("div", { style: { position: "absolute", inset: 0, background: "#000", zIndex: 99 } }, pl.el);
      tl.fromTo(negro, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.9, ease: "power1.in" }, T - 0.9);
    },
  });
})();
