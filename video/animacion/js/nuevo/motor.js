/* Motor del video v3: línea de tiempo maestra, escenas, transiciones entre planos, texto, subtítulos y controles.
   Teclas: Espacio = pausa, ← → = ±2 s (Shift ±10 s), 1–9 = escena, G = guía, F = pantalla completa. */
(function () {
  const G = window.GUION;
  const { C, h } = A;
  const qs = new URLSearchParams(location.search);
  const stage = document.getElementById("stage");
  const mundo = document.getElementById("mundo");
  const sub = document.getElementById("sub");
  const reloj = document.getElementById("reloj");

  const N = {
    guia: qs.get("guia") === "1",
    subs: qs.get("subs") !== "0",
    render: qs.get("render") === "1",
    limpio: qs.get("limpio") === "1", // sin rótulos dentro de los marcos (para montar las tomas reales)
    scenes: [],
    cameos: [],
    _cur: null,
    M: gsap.timeline({ paused: true }),
    add(def) { this.scenes.push(def); },

    /* ---------- texto ---------- */
    /* Texto HTML. o: x, y, w, size, font ('head'|'body'|'hand'), color, align, weight, lh, italic, sombra */
    t(parent, html, o = {}) {
      const st = { left: (o.x || 0) + "px", top: (o.y || 0) + "px", fontSize: (o.size || 32) + "px", color: o.color || C.crema };
      if (o.w) st.width = o.w + "px";
      if (o.align) st.textAlign = o.align;
      if (o.weight) st.fontWeight = o.weight;
      if (o.lh) st.lineHeight = o.lh;
      if (o.italic) st.fontStyle = "italic";
      if (o.sombra !== false) st.textShadow = "0 3px 14px rgba(4,6,24,.55)";
      return h("div", { class: "abs t-" + (o.font || "head"), style: st }, parent, html);
    },
    splitChars(el) {
      const chars = [];
      const walk = (node) => {
        [...node.childNodes].forEach((n) => {
          if (n.nodeType === 3) {
            const frag = document.createDocumentFragment();
            n.textContent.split(/(\s+)/).forEach((w) => {
              if (!w) return;
              if (/^\s+$/.test(w)) { frag.appendChild(document.createTextNode(w)); return; }
              const word = h("span", { class: "word" });
              [...w].forEach((c) => { const sp = h("span", { class: "ch" }, word); sp.textContent = c; chars.push(sp); });
              frag.appendChild(word);
            });
            n.replaceWith(frag);
          } else if (n.nodeType === 1 && !n.classList.contains("num")) walk(n);
          else if (n.nodeType === 1) chars.push(n);
        });
      };
      walk(el);
      return chars;
    },
    /* El texto se escribe solo, letra por letra */
    write(tl, el, at, dur = 1.4) {
      const chars = el._chars || (el._chars = N.splitChars(el));
      tl.fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01 }, at);
      tl.fromTo(chars, { opacity: 0, y: 14, filter: "blur(6px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.45, ease: "power2.out", stagger: dur / chars.length }, at);
      return tl;
    },
    show(tl, els, at, o = {}) {
      return tl.fromTo(els, { autoAlpha: 0, y: o.y != null ? o.y : 24, x: o.x || 0, scale: o.scale != null ? o.scale : 1 },
        { autoAlpha: 1, y: 0, x: 0, scale: 1, duration: o.dur || 0.6, ease: o.ease || "power2.out", stagger: o.stagger || 0 }, at);
    },
    hide(tl, els, at, dur = 0.45) { return tl.to(els, { autoAlpha: 0, duration: dur, ease: "power1.inOut" }, at); },
    /* Contador: tl.to(el, { count }) con formato */
    count(tl, el, from, to, at, dur = 1.4, dec = 1, suf = "%") {
      const o = { _redraw(r) { el.textContent = (from + (to - from) * r).toFixed(dec) + suf; } };
      o._redraw(0);
      return tl.to(o, { redraw: 1, duration: dur, ease: "power2.out" }, at);
    },

    /* Trazo que se dibuja (gis, tinta) */
    draw(tl, paths, at, dur = 0.8, ease = "power1.inOut") {
      const arr = paths.length != null && !(paths instanceof Element) ? [...paths] : [paths];
      arr.forEach((p) => { const len = Math.ceil(p.getTotalLength ? p.getTotalLength() : 600) + 2; p.style.strokeDasharray = len + " " + len; p._len = len; });
      return tl.fromTo(arr, { strokeDashoffset: (i, t) => t._len, opacity: 1 }, { strokeDashoffset: 0, duration: dur, ease }, at);
    },

    /* ---------- marcos para las tomas reales ---------- */
    /* o: id, x, y, w, h (rectángulo 16:9 en pantalla), t0, t1 (locales), tipo, quien, linea, out (false = no se va), inn (false = ya está) */
    cameo(parent, tl, o) {
      const pad = 14;
      const box = h("div", { class: "marco", style: { left: o.x - pad + "px", top: o.y - pad + "px", width: o.w + pad * 2 + "px", height: o.h + pad * 2 + "px" } }, parent);
      const hueco = h("div", { class: "hueco", style: { left: pad + "px", top: pad + "px", width: o.w + "px", height: o.h + "px" } }, box);
      const f = { box, hueco, rect: { x: o.x, y: o.y, w: o.w, h: o.h } };
      if (o.inn !== false) tl.fromTo(box, { autoAlpha: 0, scale: 0.9, y: 30, rotation: -2 }, { autoAlpha: 1, scale: 1, y: 0, rotation: 0, duration: 0.6, ease: "back.out(1.5)" }, Math.max(0, o.t0 - 0.5));
      N.slot(f, tl, o);
      return f;
    },
    slot(f, tl, o) {
      // ¿hay grabación real para este marco? (G.medios, cam = id del marco)
      const cur = N._cur;
      const clips = (G.medios || []).filter((m) => m.video && m.cam === o.id && cur && m.escena === cur.id);
      if (clips.length) {
        const grupo = clips.map((m) => {
          const v = h("video", { preload: "auto", playsinline: "", src: `media/${m.src}.mp4`, style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", visibility: "hidden" } }, f.hueco);
          v.muted = true;
          return { v, m };
        });
        N.videos.push({ grupo, desde: cur.t0 - 1, hastaT: cur.t1 + 1 });
      } else {
        const rot = h("div", { class: "rot" }, f.hueco, `<div class="tipo">${o.tipo || "Cameo"} · ${o.id}</div><div class="quien">${o.quien || ""}</div>` + (o.linea ? `<div class="linea">${o.linea}</div>` : ""));
        gsap.set(rot, { autoAlpha: 0 });
        tl.set(rot, { autoAlpha: 1 }, o.t0);
        tl.set(rot, { autoAlpha: 0 }, o.t1);
      }
      const base = N._cur ? N._cur.t0 : 0;
      N.cameos.push({ id: o.id, tipo: o.tipo || "Cameo", quien: o.quien || "", linea: o.linea || "", t0: +(base + o.t0).toFixed(2), t1: +(base + o.t1).toFixed(2), x: f.rect.x, y: f.rect.y, w: f.rect.w, h: f.rect.h });
      if (o.out !== false) tl.to(f.box, { autoAlpha: 0, scale: 0.94, duration: 0.4 }, o.t1);
      return f;
    },

    /* ---------- grabaciones reales dentro de los marcos ---------- */
    videos: [],
    /* Pone cada video en el cuadro que toca en el segundo t. exacto = espera a que el video termine de buscar (render). */
    syncVideos(t, exacto) {
      const esperas = [];
      N.videos.forEach((V) => {
        if (t < V.desde || t > V.hastaT) { V.grupo.forEach(({ v }) => { if (!v.paused) v.pause(); }); return; }
        let act = V.grupo[0];
        V.grupo.forEach((c) => { if (c.m.abs <= t) act = c; });
        const m = act.m, local = Math.min(Math.max(m.ss + (t - m.abs), m.ss), m.hasta - 0.04);
        V.grupo.forEach((c) => { const vis = c === act ? "visible" : "hidden"; if (c.v.style.visibility !== vis) c.v.style.visibility = vis; if (c !== act && !c.v.paused) c.v.pause(); });
        const v = act.v;
        const corriendo = !exacto && t >= m.abs && t < m.abs + (m.hasta - m.ss);
        if (corriendo) {
          if (v.paused) { v.currentTime = local; v.play().catch(() => {}); }
          else if (Math.abs(v.currentTime - local) > 0.25) v.currentTime = local;
        } else {
          if (!v.paused) v.pause();
          if (Math.abs(v.currentTime - local) > 0.001) {
            esperas.push(new Promise((r) => { const fin = () => { v.removeEventListener("seeked", fin); r(); }; v.addEventListener("seeked", fin); setTimeout(fin, 4000); }));
            v.currentTime = local;
          }
        }
      });
      return Promise.all(esperas);
    },

    /* ---------- cámara y transiciones entre planos ---------- */
    /* Movimiento de cámara de un plano: de a → b (x, y, z, rotY) entre t0 y t1 */
    camara(tl, pl, a, b, t0, t1, ease = "sine.inOut") {
      gsap.set(pl.cam, { x: a.x || 0, y: a.y || 0, z: a.z || 0, rotationY: a.ry || 0, rotationX: a.rx || 0 });
      tl.fromTo(pl.cam, { x: a.x || 0, y: a.y || 0, z: a.z || 0, rotationY: a.ry || 0, rotationX: a.rx || 0 },
        { x: b.x || 0, y: b.y || 0, z: b.z || 0, rotationY: b.ry || 0, rotationX: b.rx || 0, duration: t1 - t0, ease, immediateRender: false }, t0);
    },
    entra(tl, pl, at) { if (at === 0) gsap.set(pl.el, { autoAlpha: 1 }); else tl.set(pl.el, { autoAlpha: 1 }, at); },
    sale(tl, pl, at) { tl.set(pl.el, { autoAlpha: 0 }, at); },
    /* Fundido cruzado */
    fundido(tl, a, b, at, dur = 0.6) {
      tl.set(b.el, { autoAlpha: 1, zIndex: 2 }, at);
      tl.fromTo(b.el, { opacity: 0 }, { opacity: 1, duration: dur, ease: "power1.inOut", immediateRender: false }, at);
      tl.set(a.el, { autoAlpha: 0 }, at + dur);
      tl.set(b.el, { zIndex: 1 }, at + dur);
    },
    /* La hoja se pasa: el plano a gira sobre su borde izquierdo y deja ver el b */
    hoja(tl, a, b, at, dur = 0.9) {
      const sh = h("div", { style: { position: "absolute", inset: 0, zIndex: 80, pointerEvents: "none", opacity: 0, background: "linear-gradient(90deg, rgba(0,0,0,.05), rgba(0,0,0,.6) 75%, rgba(255,255,255,.18))" } }, a.el);
      const cast = h("div", { style: { position: "absolute", inset: 0, zIndex: 80, pointerEvents: "none", opacity: 0, background: "linear-gradient(90deg, rgba(0,0,0,.6), rgba(0,0,0,0) 55%)" } }, b.el);
      tl.set(b.el, { autoAlpha: 1, zIndex: 1 }, at);
      tl.set(a.el, { zIndex: 5, transformOrigin: "0% 50%" }, at);
      tl.fromTo(a.el, { rotationY: 0 }, { rotationY: -100, duration: dur, ease: "power2.in", immediateRender: false }, at);
      tl.fromTo(sh, { opacity: 0 }, { opacity: 1, duration: dur, ease: "power1.in" }, at);
      tl.set(cast, { opacity: 0.95 }, at);
      tl.to(cast, { opacity: 0, duration: dur + 0.3, ease: "power1.out" }, at + 0.1);
      tl.set(a.el, { autoAlpha: 0, rotationY: 0, zIndex: 1 }, at + dur);
    },
    /* Iris: el plano b se abre en círculo desde un punto de luz */
    iris(tl, a, b, at, x, y, dur = 0.9) {
      tl.set(b.el, { autoAlpha: 1, zIndex: 3 }, at);
      tl.fromTo(b.el, { clipPath: `circle(0px at ${x}px ${y}px)` }, { clipPath: `circle(2300px at ${x}px ${y}px)`, duration: dur, ease: "power2.in", immediateRender: false }, at);
      tl.set(a.el, { autoAlpha: 0 }, at + dur);
      tl.set(b.el, { zIndex: 1, clipPath: "none" }, at + dur);
    },
    /* Zoom a través: la cámara de a se lanza hacia un punto y aparece b */
    atraves(tl, a, b, at, dur = 0.7) {
      tl.set(b.el, { autoAlpha: 1, zIndex: 3 }, at + dur * 0.45);
      tl.fromTo(b.el, { opacity: 0, scale: 1.25 }, { opacity: 1, scale: 1, duration: dur * 0.55, ease: "power2.out", immediateRender: false }, at + dur * 0.45);
      tl.to(a.el, { filter: "blur(10px)", duration: dur * 0.6, ease: "power2.in" }, at);
      tl.set(a.el, { autoAlpha: 0, filter: "none" }, at + dur);
      tl.set(b.el, { zIndex: 1 }, at + dur);
    },
  };

  function fit() {
    const sc = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
    stage.style.transform = `translate(${(window.innerWidth - 1920 * sc) / 2}px, ${(window.innerHeight - 1080 * sc) / 2}px) scale(${sc})`;
  }
  function grano() {
    const c = document.createElement("canvas");
    c.width = c.height = 256;
    const x = c.getContext("2d"), img = x.createImageData(256, 256), r = A.rng(42);
    for (let i = 0; i < img.data.length; i += 4) { const v = 96 + r() * 64; img.data[i] = img.data[i + 1] = img.data[i + 2] = v; img.data[i + 3] = 255; }
    x.putImageData(img, 0, 0);
    document.getElementById("grano").style.backgroundImage = `url(${c.toDataURL()})`;
  }

  let lastLine = null;
  function guide(t) {
    const line = G.voz.find((v) => t >= v.t0 && t < v.t1 + 0.25) || null;
    if (line !== lastLine) {
      lastLine = line;
      sub.classList.toggle("on", !!line && N.subs);
      if (line) {
        sub.querySelector(".txt").textContent = line.x;
        const w = sub.querySelector(".who");
        w.textContent = line.q === "voz" ? "Voz en off" : "A cámara · " + line.q;
      }
    }
    if (N.guia) {
      const e = G.escenas.find((s) => t >= s.t0 && t < s.t1) || G.escenas[G.escenas.length - 1];
      reloj.textContent = `${Math.floor(t / 60)}:${(t % 60).toFixed(1).padStart(4, "0")} · ${e.n} ${e.nombre}`;
    }
    const fill = document.querySelector("#barra .fill");
    if (fill) fill.style.width = (t / G.dur) * 100 + "%";
  }

  N.start = async function () {
    const M = N.M;
    document.body.classList.toggle("guia", N.guia);
    document.body.classList.toggle("render", N.render);
    document.body.classList.toggle("limpio", N.limpio);
    window.addEventListener("resize", fit);
    fit();
    grano();
    const faces = ["600 50px Fraunces", "700 50px Fraunces", "italic 400 40px Fraunces", "400 30px Nunito", "700 30px Nunito", "800 30px Nunito", "700 30px Caveat"];
    try { await Promise.race([Promise.all(faces.map((f) => document.fonts.load(f, "Aáñ¿"))), new Promise((r) => setTimeout(r, 4000))]); } catch (e) { /* fuentes del sistema */ }

    const byId = Object.fromEntries(G.escenas.map((e) => [e.id, e]));
    const lista = G.escenas.map((g) => N.scenes.find((d) => d.id === g.id)).filter(Boolean);
    lista.forEach((def) => {
      const g = byId[def.id];
      def.t0 = g.t0; def.t1 = g.t1; def.T = g.Tin || g.dur;
      N._cur = def;
      def.el = h("div", { class: "escena", id: "e-" + def.id }, mundo);
      def.tl = gsap.timeline({ paused: true });
      def.build(def.el, def.tl, def.T);
      // la escena corre con su mapa de tiempo (voz a 1×, silencios comprimidos; ver guion.js)
      const mp = g.mapa || [[0, 0], [g.dur, def.T]], outD = g.dur, inD = def.T;
      const curva = (p) => { const x = p * outD; for (let k = 1; k < mp.length; k++) if (x <= mp[k][0] || k === mp.length - 1) { const [o0, i0] = mp[k - 1], [o1, i1] = mp[k]; return (o1 === o0 ? i1 : i0 + ((x - o0) * (i1 - i0)) / (o1 - o0)) / inD; } return 1; };
      M.fromTo(def.tl, { time: 0 }, { time: inD, duration: outD, ease: curva, immediateRender: false }, def.t0);
    });
    N._cur = null;
    /* Transiciones entre escenas: 'fundido' (por defecto), 'hoja' o 'iris' (con def.irisEn = [x, y]) */
    lista.forEach((def, i) => {
      const prev = lista[i - 1], t = def.t0;
      if (!prev) { gsap.set(def.el, { autoAlpha: 1 }); return; }
      const tipo = def.entrada || "fundido";
      if (tipo === "hoja") {
        const D = 0.9;
        const sh = h("div", { style: { position: "absolute", inset: 0, zIndex: 80, pointerEvents: "none", opacity: 0, background: "linear-gradient(90deg, rgba(0,0,0,.05), rgba(0,0,0,.6) 75%, rgba(255,255,255,.18))" } }, prev.el);
        M.set(def.el, { autoAlpha: 1, zIndex: 1 }, t - D);
        M.set(prev.el, { zIndex: 5, transformOrigin: "0% 50%" }, t - D);
        M.fromTo(prev.el, { rotationY: 0 }, { rotationY: -100, duration: D, ease: "power2.in", immediateRender: false }, t - D);
        M.fromTo(sh, { opacity: 0 }, { opacity: 1, duration: D, ease: "power1.in" }, t - D);
        M.set(prev.el, { autoAlpha: 0, rotationY: 0, zIndex: 1 }, t);
      } else if (tipo === "pan") {
        const D = 1.3;
        M.set(def.el, { autoAlpha: 1, zIndex: 6 }, t - D / 2);
        M.fromTo(def.el, { x: 1920 }, { x: 0, duration: D, ease: "power2.inOut", immediateRender: false }, t - D / 2);
        M.fromTo(prev.el, { x: 0 }, { x: -1920, duration: D, ease: "power2.inOut", immediateRender: false }, t - D / 2);
        M.set(prev.el, { autoAlpha: 0, x: 0 }, t + D / 2);
        M.set(def.el, { zIndex: 1 }, t + D / 2);
      } else if (tipo === "iris") {
        const [x, y] = def.irisEn || [960, 540], D = 1.0;
        M.set(def.el, { autoAlpha: 1, zIndex: 6 }, t - D * 0.6);
        M.fromTo(def.el, { clipPath: `circle(0px at ${x}px ${y}px)` }, { clipPath: `circle(2300px at ${x}px ${y}px)`, duration: D, ease: "power2.in", immediateRender: false }, t - D * 0.6);
        M.set(prev.el, { autoAlpha: 0 }, t + D * 0.4);
        M.set(def.el, { zIndex: 1, clipPath: "none" }, t + D * 0.4);
      } else {
        const D = 0.7;
        M.set(def.el, { autoAlpha: 1, zIndex: 6 }, t - D / 2);
        M.fromTo(def.el, { opacity: 0 }, { opacity: 1, duration: D, ease: "power1.inOut", immediateRender: false }, t - D / 2);
        M.set(prev.el, { autoAlpha: 0 }, t + D / 2);
        M.set(def.el, { zIndex: 1 }, t + D / 2);
      }
    });
    M.to({}, { duration: 0.001 }, G.dur);
    document.getElementById("loading").remove();
    M.eventCallback("onUpdate", () => { guide(M.time()); if (!N.render) N.syncVideos(M.time(), M.paused()); });
    // esperar a que carguen los videos de los marcos
    const todos = N.videos.flatMap((V) => V.grupo.map((c) => c.v));
    await Promise.race([Promise.all(todos.map((v) => (v.readyState >= 2 ? 1 : new Promise((r) => { v.addEventListener("loadeddata", r, { once: true }); v.addEventListener("error", r, { once: true }); })))), new Promise((r) => setTimeout(r, 15000))]);

    const marks = document.querySelector("#barra .marks");
    G.escenas.slice(1).forEach((e) => h("i", { style: { left: (e.t0 / G.dur) * 100 + "%" } }, marks));
    document.getElementById("barra").addEventListener("click", (ev) => M.seek((ev.clientX / window.innerWidth) * G.dur, false));
    document.addEventListener("keydown", (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key;
      if (k === " ") { e.preventDefault(); M.paused() ? M.play() : M.pause(); }
      else if (k === "ArrowRight") M.seek(Math.min(G.dur, M.time() + (e.shiftKey ? 10 : 2)), false);
      else if (k === "ArrowLeft") M.seek(Math.max(0, M.time() - (e.shiftKey ? 10 : 2)), false);
      else if (/^[1-9]$/.test(k)) { const sc = G.escenas[+k - 1]; if (sc) M.seek(sc.t0 + 0.01, false); }
      else if (k === "g" || k === "G") { N.guia = !N.guia; document.body.classList.toggle("guia", N.guia); }
      else if (k === "f" || k === "F") { document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen(); }
    });

    window.__M = M; window.__dur = G.dur; window.__fps = G.fps;
    window.__cameos = () => JSON.stringify(N.cameos);
    window.__seek = async (t) => { M.seek(Math.min(t, G.dur), false); guide(t); await N.syncVideos(Math.min(t, G.dur), true); return new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => r(true)))); };
    const m = /[#&]t=([\d.]+)/.exec(location.hash);
    M.seek(m ? +m[1] : 0, false);
    guide(M.time());
    await N.syncVideos(M.time(), true);
    window.__ready = true;
    if (!N.render && !m) M.play();
  };

  window.N = N;
})();
