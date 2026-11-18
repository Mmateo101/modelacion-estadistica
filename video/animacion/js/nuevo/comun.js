/* Utilidades compartidas por las escenas 2 a 10 */
(function () {
  const { C, s, g, rect, path, circ, h } = A;
  gsap.registerPlugin(MotionPathPlugin);

  const W = {
    grad(svg, id, stops, attrs = { x1: 0, y1: 0, x2: 0, y2: 1 }, tipo = "linearGradient") {
      const d = svg.querySelector("defs") || s("defs", {}, svg);
      const lg = s(tipo, Object.assign({ id }, attrs), d);
      stops.forEach(([o, c, op]) => s("stop", { offset: o, "stop-color": c, "stop-opacity": op == null ? 1 : op }, lg));
      return `url(#${id})`;
    },
    /* Rótulo pequeño en mayúsculas, arriba a la izquierda */
    kicker(pl, txt, color = C.luzC, o = {}) {
      const k = N.t(pl.hud, txt, Object.assign({ x: 80, y: 40, size: 24, font: "body", color, weight: 800 }, o));
      k.style.letterSpacing = ".2em";
      return k;
    },
    /* Un rótulo sale y otro entra en su lugar */
    relevo(tl, a, b, at) {
      tl.to(a, { autoAlpha: 0, y: -12, duration: 0.3 }, at);
      tl.fromTo(b, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.45 }, at + 0.25);
    },
    /* Texto que brilla (neón) */
    neon(parent, html, o) {
      const el = N.t(parent, html, Object.assign({ sombra: false, weight: 700 }, o));
      const c = o.glow || o.color || C.luzC;
      el.style.textShadow = `0 0 14px ${c}, 0 0 36px ${c}`;
      return el;
    },
    /* Contador con formato */
    cuenta(tl, el, from, to, at, dur, fmt) {
      const o = { _redraw(r) { el.textContent = fmt(from + (to - from) * r); } };
      o._redraw(0);
      tl.to(o, { redraw: 1, duration: dur, ease: "power2.out" }, at);
    },
    pct: (v) => v.toFixed(1) + "%",
    mil: (v) => Math.round(v).toLocaleString("en-US"),
    d2: (v) => v.toFixed(2),
    /* Desplaza una figura (con salto opcional) */
    mover(tl, f, o) {
      const sx = (o.flip ? -1 : 1) * o.s;
      tl.to({ _redraw(r) {
        const x = o.x0 + (o.x1 - o.x0) * r, y = o.y0 + (o.y1 - o.y0) * r - (o.arco || 0) * 4 * r * (1 - r);
        f.root.setAttribute("transform", `translate(${x.toFixed(1)},${y.toFixed(1)}) scale(${sx},${o.s})`);
      } }, { redraw: 1, duration: o.dur, ease: o.ease || "power1.inOut" }, o.t0);
    },
    /* Camina de x0 a x1 balanceando piernas y brazos */
    caminar(tl, f, o) {
      const n = Math.max(2, Math.round(o.dur / (o.paso || 0.45)));
      const sx = (o.flip ? -1 : 1) * o.s;
      const b = f._last.slice();
      tl.to({ _redraw(r) {
        const x = o.x0 + (o.x1 - o.x0) * r, fase = Math.sin(r * n * Math.PI);
        const bob = -Math.abs(fase) * 5;
        f.root.setAttribute("transform", `translate(${x.toFixed(1)},${(o.y + bob).toFixed(1)}) scale(${sx},${o.s})`);
        f.draw({ lean: b[0] + 4, cabeza: b[1], bF: [-fase * 22, 14], bT: [fase * 22, 14], pF: [fase * 26, Math.max(0, -fase) * 34], pT: [-fase * 26, Math.max(0, fase) * 34], y: 0 });
      } }, { redraw: 1, duration: o.dur, ease: "none" }, o.t0);
      f._last = [b[0] + 4, b[1], 0, 14, 0, 14, 0, 0, 0, 0, 0];
    },
    /* Vuela un elemento SVG en arco de un punto a otro (con giro) */
    arco(tl, el, a, b, alto, at, dur, giro = 360) {
      tl.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.2 }, at);
      tl.to({ _redraw(r) {
        const x = a[0] + (b[0] - a[0]) * r, y = a[1] + (b[1] - a[1]) * r - alto * 4 * r * (1 - r);
        el.setAttribute("transform", `translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${(giro * r).toFixed(1)})`);
      } }, { redraw: 1, duration: dur, ease: "power1.inOut" }, at);
    },
    /* Sello de tinta (div). modo: 'multiply' sobre papel claro, 'normal' sobre fondo oscuro */
    sello(parent, html, { x, y, size = 40, color = "#C23B3B", rot = -8, modo = "multiply" } = {}) {
      const el = h("div", { style: { position: "absolute", left: x + "px", top: y + "px", padding: "10px 24px 12px", border: `5px double ${color}`, borderRadius: "14px", color, font: `800 ${size}px/1.05 var(--f-head)`, textAlign: "center", transform: `rotate(${rot}deg)`, mixBlendMode: modo, letterSpacing: ".02em", whiteSpace: "nowrap" } }, parent, html);
      el._rot = rot;
      return el;
    },
    selloIn(tl, el, at) {
      tl.fromTo(el, { autoAlpha: 0, scale: 2.3, rotation: el._rot - 14 }, { autoAlpha: 0.92, scale: 1, rotation: el._rot, duration: 0.35, ease: "power3.in" }, at);
    },
    /* Palomita dibujada */
    palomita(p, x, y, k = 1, color = "#9AD4C4", w = 7) {
      return path(p, `M${x},${y} l${12 * k},${14 * k} l${26 * k},${-32 * k}`, "none", { stroke: color, "stroke-width": w, "stroke-linecap": "round", "stroke-linejoin": "round", opacity: 0 });
    },
    /* Luciérnagas que deambulan (movimiento determinista) */
    luciernagas(tl, svg, { n = 30, seed = 3, x0 = 0, x1 = 1920, y0 = 200, y1 = 900, color = "#FFE38A", t0 = 0, dur = 20 } = {}) {
      const r = A.rng(seed), out = [];
      for (let i = 0; i < n; i++) {
        const gg = g(svg);
        const cx = x0 + r() * (x1 - x0), cy = y0 + r() * (y1 - y0);
        circ(gg, 0, 0, 9, color, { opacity: 0.35, style: "filter:blur(5px)" });
        circ(gg, 0, 0, 2.6, "#FFFDF0");
        gg.setAttribute("transform", `translate(${cx},${cy})`);
        const d = 2.5 + r() * 3;
        tl.to(gg, { x: (r() - 0.5) * 120, y: (r() - 0.5) * 90, duration: d, yoyo: true, repeat: Math.ceil(dur / d), ease: "sine.inOut" }, t0);
        tl.fromTo(gg, { opacity: 0.2 }, { opacity: 1, duration: 0.6 + r(), yoyo: true, repeat: Math.ceil(dur / 1.2), ease: "sine.inOut" }, t0 + r());
        out.push(gg);
      }
      return out;
    },
    /* Libro horizontal (para pilas): devuelve el grupo */
    libroH(p, x, y, w, hh, color) {
      const gg = g(p);
      rect(gg, x, y, w, hh, color, { rx: 4 });
      if (hh > 14) {
        rect(gg, x + w - 18, y + 3, 12, hh - 6, "#FFF8E8", { rx: 2, opacity: 0.85 });
        rect(gg, x + 14, y + hh * 0.35, w * 0.5, Math.max(2, hh * 0.12), "rgba(255,255,255,.35)", { rx: 1 });
      }
      return gg;
    },
  };
  window.W = W;
})();
