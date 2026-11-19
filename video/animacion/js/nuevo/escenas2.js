/* Escenas 2 a 5: quiénes somos, el problema, datos e índices, técnicas y supuestos. */
(function () {
  const { C, s, g, rect, path, circ, h, U, figura, posar, rng } = A;
  const G = window.GUION;
  const D = window.DATA;
  const FRA = "Fraunces, serif", NUN = "Nunito, sans-serif";

  /* ================= 2 · Quiénes somos: el álbum del equipo ================= */
  N.add({
    id: "equipo", entrada: "iris", irisEn: [960, 470],
    build(el, tl, T) {
      const pl = A.plano(el, { fondo: "#26101E" });
      N.entra(tl, pl, 0);
      const pal = ["#7B2D43", "#A4473A", "#C98A3A", "#2F6B66", "#3B4E86", "#6A3E7A", "#E0C08A", "#8C3A2E", "#4E7A4A"];

      const fondo = pl.capa(-800, { sombra: false });
      rect(fondo, -480, -270, 2880, 1620, "#341626");
      U.estante(fondo, -470, -240, 1060, 1280, { filas: 7, lleno: 0.96, seed: 13, madera: "#5C2E24", fondo: "#1E0C16", paleta: pal });
      U.estante(fondo, 1330, -240, 1060, 1280, { filas: 7, lleno: 0.96, seed: 17, madera: "#5C2E24", fondo: "#1E0C16", paleta: pal });
      path(fondo, "M620,1000 V140 A340,340 0 0,1 1300,140 V1000 Z", "#4A2236");
      path(fondo, "M664,1000 V150 A296,296 0 0,1 1256,150 V1000 Z", W.grad(fondo, "e2cielo", [[0, "#151A55"], [1, "#4B3A86"]]));
      circ(fondo, 1110, 40, 44, C.luna);
      rect(fondo, 955, -150, 10, 1150, "#4A2236"); rect(fondo, 664, 380, 592, 10, "#4A2236");
      const lamps = pl.capa(-420);
      [330, 1590].forEach((x) => {
        rect(lamps, x - 2, -320, 4, 350, "#14060C");
        path(lamps, `M${x - 74},70 Q${x},-24 ${x + 74},70 Z`, "#C98A3A");
        rect(lamps, x - 74, 66, 148, 9, "#8A5A2A", { rx: 4 });
        circ(lamps, x, 82, 18, "#FFE3A8");
      });
      const luz = pl.capaLuz(-420);
      A.halo(luz, 330, 200, 460, "rgba(255,197,107,.42)");
      A.halo(luz, 1590, 200, 460, "rgba(255,197,107,.42)");
      A.polvo(tl, lamps, { x: 170, y: 140, w: 320, hh: 620, n: 18, seed: 4, t0: 0, dur: T });
      A.polvo(tl, lamps, { x: 1430, y: 140, w: 320, hh: 620, n: 18, seed: 9, t0: 0, dur: T });
      const mesa = pl.capa(-60);
      rect(mesa, -480, 830, 2880, 620, "#3A1C18");
      rect(mesa, -480, 816, 2880, 26, "#6B4028");
      const fr = pl.capa(300, { blur: 6, sombra: false });
      circ(fr, -200, 1200, 340, "#12060C"); circ(fr, 2120, 1220, 360, "#12060C");
      N.camara(tl, pl, { z: -220, y: -40 }, { z: 0, y: 0 }, 0, 2.2, "power2.out");
      tl.to(pl.cam, { z: 50, duration: T - 2.2, ease: "none" }, 2.2);

      // ---- el libro, más ancho (en pantalla: no se mueve con la cámara, como los marcos de las fotos)
      const H = pl.hud;
      const LX = 60, LY = 150, PW = 900, PH = 660;
      const libro = h("div", { style: { position: "absolute", left: LX + "px", top: LY + "px", width: PW * 2 + "px", height: PH + "px", perspective: "2800px", transformOrigin: `${PW * 1.5}px ${PH / 2}px` } }, H);
      const sombraL = "0 34px 60px rgba(0,0,0,.55)";
      const baseI = h("div", { style: { position: "absolute", left: "-14px", top: "-14px", width: PW + 14 + "px", height: PH + 28 + "px", background: "#5E1E36", borderRadius: "14px 0 0 14px", boxShadow: sombraL } }, libro);
      h("div", { style: { position: "absolute", left: PW + "px", top: "-14px", width: PW + 14 + "px", height: PH + 28 + "px", background: "#5E1E36", borderRadius: "0 14px 14px 0", boxShadow: sombraL } }, libro);
      const papel = (deg) => `linear-gradient(${deg}deg, #F4E7CC 0%, #FBF4E4 70%, #E5D1AC 95%, #C9B088 100%)`;
      const caraD = h("div", { style: { position: "absolute", left: PW + "px", top: 0, width: PW + "px", height: PH + "px", background: papel(270), borderRadius: "0 6px 6px 0" } }, libro);
      const pagI = h("div", { style: { position: "absolute", left: 0, top: 0, width: PW + "px", height: PH + "px", transformOrigin: "100% 50%", transformStyle: "preserve-3d" } }, libro);
      const caraI = h("div", { style: { position: "absolute", inset: 0, background: papel(90), borderRadius: "6px 0 0 6px", backfaceVisibility: "hidden" } }, pagI);
      const tapa = h("div", { style: { position: "absolute", inset: 0, background: "radial-gradient(ellipse at 40% 35%, #9A3858, #5E1E36 75%)", borderRadius: "14px", transform: "rotateY(180deg)", backfaceVisibility: "hidden", overflow: "hidden" } }, pagI);
      h("div", { style: { position: "absolute", inset: "30px", border: "3px solid #D9B26A", borderRadius: "8px", boxShadow: "inset 0 0 0 9px rgba(217,178,106,.16)" } }, tapa);
      h("div", { style: { position: "absolute", left: "90px", right: "90px", top: "170px", textAlign: "center", color: "#EBCB8C", font: "700 66px/1.12 var(--f-head)", textShadow: "0 2px 0 rgba(0,0,0,.35)" } }, tapa, "Desigualdad en el acceso a la lectura");
      h("div", { style: { position: "absolute", left: 0, right: 0, top: "500px", textAlign: "center", color: "#EBCB8C", font: "800 28px/1 var(--f-body)", letterSpacing: ".32em" } }, tapa, "MOLEC · INEGI · 2019–2024");
      const brillo = h("div", { style: { position: "absolute", top: "-40px", left: "-320px", width: "200px", height: "760px", background: "linear-gradient(90deg, rgba(255,240,200,0), rgba(255,240,200,.45), rgba(255,240,200,0))", transform: "rotate(18deg)" } }, tapa);
      const inte = N.t(caraI, "INTEGRANTES", { x: 70, y: 56, size: 24, font: "body", color: "#7B2D43", weight: 800, sombra: false });
      inte.style.letterSpacing = ".24em";
      tl.fromTo(libro, { autoAlpha: 0, scale: 0.6, y: 90 }, { autoAlpha: 1, scale: 1, y: 0, duration: 1.7, ease: "power3.out" }, 0.2);
      N.show(tl, inte, 1.4, { y: 8 });

      // ---- cuatro fotos: cada integrante saludando, con su nombre abajo
      const gente = [
        { n: "Fernando Isaac Martínez García", m: "A00837933", q: G.equipo[0], x: 100, t: 2.4 },
        { n: "Mateo Rodolfo Flores Torres", m: "A01783438", q: G.equipo[1], x: 516, t: 3.6 },
        { n: "Eliel Silva Morales", m: "A00844569", q: G.equipo[2], x: 1020, t: 4.8 },
        { n: "César Julián Leal Salazar", m: "A00842112", q: G.equipo[3], x: 1436, t: 6.0 },
      ];
      const FW = 384, FH = 288, FY = 262;
      const marcos = gente.map((p, i) => {
        const f = N.cameo(H, tl, { id: "A" + (i + 1), tipo: "Foto o clip saludando", quien: p.q, linea: "(saluda a cámara)", x: p.x, y: FY, w: FW, h: FH, t0: p.t, t1: 13.4, out: false });
        const nm = N.t(H, p.n, { x: p.x - 10, y: FY + FH + 26, w: FW + 20, size: 36, font: "hand", align: "center", color: "#2B2340", sombra: false, lh: 1.05 });
        const mt = N.t(H, p.m, { x: p.x, y: FY + FH + 110, w: FW, size: 22, font: "body", align: "center", color: "#8A7A6A", sombra: false });
        N.write(tl, nm, p.t + 0.15, 0.8);
        N.show(tl, mt, p.t + 0.7, { y: 8, dur: 0.4 });
        return { f, nm, mt };
      });
      tl.to(marcos.flatMap((o) => [o.f.box, o.nm, o.mt]), { autoAlpha: 0, duration: 0.35 }, 13.4);

      // ---- el libro se cierra y muestra el título del proyecto
      tl.to(pagI, { rotationY: -180, duration: 1.2, ease: "power2.inOut" }, 13.7);
      tl.to(baseI, { autoAlpha: 0, duration: 0.4 }, 14.3);
      tl.to(libro, { x: -800, scale: 0.86, duration: 1.3, ease: "power2.inOut" }, 15.2);
      tl.fromTo(brillo, { x: 0 }, { x: 1400, duration: 1.4, ease: "power1.inOut" }, 16.6);

      // ---- fichas de la biblioteca: clase y tutoras
      const ficha = (y, rot, html) => {
        const d = h("div", { style: { position: "absolute", left: "1110px", top: y + "px", width: "720px", padding: "28px 36px 32px 66px", background: "repeating-linear-gradient(#FFF8E8 0 38px, #E9DCC2 38px 40px)", boxShadow: "0 24px 44px rgba(0,0,0,.5)", borderRadius: "6px", transform: `rotate(${rot}deg)`, color: "#2B2340" } }, H, html);
        h("div", { style: { position: "absolute", left: "40px", top: 0, bottom: 0, width: "3px", background: "#D9534F", opacity: 0.8 } }, d);
        d._rot = rot;
        return d;
      };
      const etq = (t) => `<div style="font:800 22px/1 var(--f-body);letter-spacing:.2em;color:#7B2D43;margin-bottom:10px">${t}</div>`;
      const f1 = ficha(196, -1.5, `<img src="assets/tec_logo.png" alt="" style="height:62px;display:block;margin-bottom:16px">${etq("CLASE")}<div style="font:700 40px/1.15 var(--f-head)">MA1001B · Modelación estadística para la toma de decisiones</div><div style="font:700 28px/1.4 var(--f-body);margin-top:8px">Profesional · Campus Monterrey</div>`);
      const f2 = ficha(590, 1.2, `${etq("TUTORAS")}<div style="font:700 33px/1.45 var(--f-head);white-space:nowrap">Dra. Blanca Rosa Ruiz Hernández<br>Dra. María Guadalupe Tobías Lara</div>`);
      [[f1, 18.2], [f2, 21.4]].forEach(([d, t]) => tl.fromTo(d, { autoAlpha: 0, x: 760, rotation: d._rot + 12 }, { autoAlpha: 1, x: 0, rotation: d._rot, duration: 0.9, ease: "power3.out" }, t));
    },
  });

  /* ================= 3 · El problema: la ciudad al anochecer ================= */
  N.add({
    id: "problema",
    build(el, tl, T) {
      const pl = A.plano(el, { fondo: "#0A0E2C" });
      N.entra(tl, pl, 0);
      const cielo = pl.capa(-1100, { sombra: false });
      rect(cielo, -480, -1300, 2880, 2900, W.grad(cielo, "p3noche", [[0, "#04061A"], [0.6, "#121A52"], [1, "#2B2F78"]]));
      const est = U.estrellas(cielo, 230, 29, { x0: -480, x1: 2400, y0: -1200, y1: 640 });
      circ(cielo, 1800, -60, 120, "rgba(255,241,201,.10)");
      circ(cielo, 1800, -60, 54, C.luna);
      const fugaz = g(cielo);
      path(fugaz, "M0,0 L-260,-90 L-260,-84 Z", W.grad(cielo, "p3fug", [[0, "#FFF8E0", 1], [1, "#FFF8E0", 0]], { x1: 0, y1: 0, x2: 1, y2: 0 }));
      circ(fugaz, 0, 0, 4, "#FFFDF0");
      fugaz.setAttribute("opacity", 0);

      const ocaso = pl.capa(-1050, { sombra: false });
      rect(ocaso, -480, -1300, 2880, 2900, W.grad(ocaso, "p3ocaso", [[0, "#2E2466"], [0.5, "#7A3E7E"], [0.66, "#D2607A"], [0.8, "#F49A5E"], [1, "#FFD089"]]));
      const sol = circ(ocaso, 560, 700, 120, "#FFE6A8");

      const lejos = pl.capa(-640);
      path(lejos, "M-480,860 Q-60,720 420,800 T1300,760 T2400,790 V1500 H-480 Z", "#2A2358");
      const r = rng(5);
      for (let x = -480; x < 960;) {
        const w = 70 + r() * 90, hh = 90 + r() * 170;
        rect(lejos, x, 900 - hh, w, hh + 200, "#1F1E50");
        x += w + 10;
      }
      const ed = pl.capa(-140);
      const ventanas = [], brillo = g(ed, { style: "filter:blur(6px)" });
      const edificios = [[970, 4, 11, "#2B2F6E"], [1146, 3, 14, "#33367A"], [1286, 5, 9, "#262A66"], [1498, 4, 13, "#30347A"], [1674, 5, 11, "#282C6A"]];
      const piso = 960;
      edificios.forEach(([x, c, f, col]) => {
        const w = c * 36 + 20, hh = f * 44 + 50;
        rect(ed, x, piso - hh, w, hh, col);
        rect(ed, x - 6, piso - hh - 12, w + 12, 14, d3.color(col).darker(0.6).formatHex(), { rx: 3 });
        for (let i = 0; i < f; i++) for (let j = 0; j < c; j++) {
          const vx = x + 14 + j * 36, vy = piso - hh + 30 + i * 44;
          const b = rect(brillo, vx - 5, vy - 5, 32, 38, "#FFC56B", { rx: 4, opacity: 0 });
          const v = rect(ed, vx, vy, 22, 28, "#1A1E44", { rx: 2 });
          ventanas.push({ v, b });
        }
      });
      ed.appendChild(brillo);
      ventanas.forEach((o) => ed.appendChild(o.v));
      const total = ventanas.length, nLuz = Math.round(total * 0.417);
      const rr = rng(77);
      const encendidas = ventanas.map((o, i) => i).sort(() => rr() - 0.5).slice(0, nLuz);

      const suelo = pl.capa(0);
      rect(suelo, -480, piso, 2880, 700, "#0A0D28");
      rect(suelo, -480, piso, 2880, 8, "#1C2258");
      const faroles = [];
      for (let x = 60; x < 1900; x += 300) { rect(suelo, x, piso - 120, 6, 120, "#1C2258"); faroles.push(circ(suelo, x + 3, piso - 126, 10, "#FFE3A8", { opacity: 0.2 })); }
      const frente = pl.capa(320, { blur: 5, sombra: false });
      circ(frente, -160, 1220, 320, "#03040F"); circ(frente, 2090, 1240, 330, "#03040F");

      // ---- cameo y datos
      const H = pl.hud;
      N.cameo(H, tl, { id: "B", quien: G.cameos[1], linea: "«El problema: … solo 41.7% de los adultos alfabetos de la muestra leyó al menos un libro en el último año.»", x: 100, y: 250, w: 800, h: 450, t0: 0.6, t1: 12.5 });
      const kP = W.kicker(pl, "EL PROBLEMA");
      const kM = W.kicker(pl, "POR QUÉ IMPORTA");
      const kQ = W.kicker(pl, "PREGUNTA DE INVESTIGACIÓN");
      gsap.set([kM, kQ], { autoAlpha: 0 });
      N.show(tl, kP, 0.3, { y: 10 });
      W.relevo(tl, kP, kM, 12.6);
      W.relevo(tl, kM, kQ, 22.6);
      const big = W.neon(H, "0.0%", { x: 1000, y: 70, w: 860, size: 130, align: "center", color: "#FFF4D8", glow: "#FFB75E" });
      const lab = N.t(H, "leyó al menos un libro en el último año", { x: 1000, y: 214, w: 860, size: 32, font: "body", align: "center", color: "#FFF4D8" });
      const src = N.t(H, "MOLEC, INEGI, 2019–2024 · muestra analítica", { x: 1000, y: 254, w: 860, size: 22, font: "body", align: "center", color: "#C9C3E6" });

      N.camara(tl, pl, { z: -90 }, { z: 30 }, 0, 10.2, "sine.inOut");
      tl.to(ocaso, { opacity: 0, duration: 8.5, ease: "power1.inOut" }, 1.4);
      tl.to(sol, { attr: { cy: 980 }, duration: 7, ease: "power1.in" }, 1.0);
      tl.fromTo(est, { opacity: 0 }, { opacity: (i) => 0.4 + ((i * 37) % 60) / 100, duration: 3, stagger: { amount: 4 } }, 5.0);
      faroles.forEach((f, i) => tl.to(f, { opacity: 1, duration: 0.4 }, 3.0 + i * 0.25));
      tl.fromTo([big, lab, src], { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.15 }, 6.0);
      W.cuenta(tl, big, 0, 41.7, 6.1, 2.6, W.pct);
      encendidas.forEach((idx, k) => {
        const t = 6.1 + (k / nLuz) * 2.6, o = ventanas[idx];
        tl.to(o.v, { fill: "#FFD27A", duration: 0.1, ease: "none" }, t);
        tl.to(o.b, { opacity: 0.8, duration: 0.35 }, t);
      });
      N.hide(tl, [big, lab, src], 12.4, 0.5);

      // ---- la cámara sube al cielo: la pregunta
      tl.to(pl.cam, { y: 520, z: 60, duration: 2.0, ease: "power2.inOut" }, 12.4);
      tl.to(pl.cam, { y: 680, z: 100, duration: 2.0, ease: "power2.inOut" }, 22.2);
      const imp = N.t(H, 'El hábito lector se forma en la <span class="hl">infancia</span>…', { x: 160, y: 330, w: 1600, size: 78, align: "center", color: "#FFF8E8" });
      const imp2 = N.t(H, '…y el acceso a la lectura no es igual para todos.', { x: 160, y: 470, w: 1600, size: 62, font: "hand", align: "center", color: "#FFE3A8" });
      const ih = imp.querySelector(".hl");
      ih.style.color = "#FFC56B";
      ih.style.textShadow = "0 0 18px #FFB75E, 0 0 40px #FF9E3D";
      N.write(tl, imp, 13.0, 1.8);
      N.write(tl, imp2, 16.2, 1.6);
      N.hide(tl, [imp, imp2], 22.3, 0.5);
      const q = N.t(H, '¿Cómo se relaciona el <span class="hl">acceso</span> a la lectura en la infancia con leer libros de adulto?', { x: 160, y: 340, w: 1600, size: 76, align: "center", color: "#FFF8E8" });
      const hl = q.querySelector(".hl");
      hl.style.color = "#FFC56B";
      hl.style.textShadow = "0 0 18px #FFB75E, 0 0 40px #FF9E3D";
      N.write(tl, q, 22.9, 2.4);
      const sub = (x, txt) => h("div", { class: "chip", style: { left: x + "px", top: "600px", background: "rgba(255,248,232,.10)", border: "3px solid #FFC56B", color: "#FFF8E8", fontSize: "34px", padding: "16px 28px" } }, H, txt);
      const ca = sub(470, "a) ¿Leyó o no leyó libros?"), cb = sub(1010, "b) ¿Cuántos libros leyó?");
      N.show(tl, ca, 27.4, { y: 16 });
      N.show(tl, cb, 29.2, { y: 16 });
      tl.to(fugaz, { opacity: 1, duration: 0.1 }, 25.2);
      tl.fromTo(fugaz, { x: 1500, y: 140 }, { x: 600, y: 440, duration: 1.0, ease: "power1.in" }, 25.2);
      tl.to(fugaz, { opacity: 0, duration: 0.3 }, 26.0);
    },
  });

  /* ================= 4 · Alcance e innovación: el fichero y los índices ================= */
  N.add({
    id: "datos",
    build(el, tl, T) {
      const muroVerde = (pl) => {
        const m = pl.capa(-600, { sombra: false });
        rect(m, -480, -270, 2880, 1620, "#1B3A31");
        for (let x = -480; x < 2400; x += 160) rect(m, x, -270, 5, 980, "#163029");
        rect(m, -480, 700, 2880, 720, "#4A2E1E");
        rect(m, -480, 690, 2880, 16, "#6B4428");
        for (let x = -480; x < 2400; x += 240) rect(m, x + 20, 740, 200, 220, "none", { stroke: "#3E2618", "stroke-width": 5, rx: 6 });
        return m;
      };

      // ---------- plano A · el alcance: el fichero
      const pa = A.plano(el, { fondo: "#14271F" });
      N.entra(tl, pa, 0);
      muroVerde(pa);
      const luzA = pa.capaLuz(-300);
      A.halo(luzA, 680, 260, 700, "rgba(255,214,140,.30)");
      const mueble = pa.capa(-200);
      const fx = 250, fy = 300, fw = 860, fh = 600;
      rect(mueble, fx - 22, fy - 34, fw + 44, 36, "#6B4028", { rx: 6 });
      rect(mueble, fx, fy, fw, fh, "#7A4A30", { rx: 6 });
      rect(mueble, fx + 30, fy + fh, 40, 70, "#5A3420"); rect(mueble, fx + fw - 70, fy + fh, 40, 70, "#5A3420");
      U.lampara(mueble, fx + fw - 120, fy - 32, { pantalla: "#2F6B55", base: "#C9A25A", s: 1.2 });
      const cajones = D.general.anios.map((y, i) => {
        const cx = fx + 30 + (i % 3) * 270, cy = fy + 30 + Math.floor(i / 3) * 280;
        rect(mueble, cx, cy, 250, 250, "#3E2416", { rx: 4 });
        const frente = g(mueble);
        rect(frente, cx, cy, 250, 250, "#A8724A", { rx: 4 });
        rect(frente, cx + 14, cy + 14, 222, 222, "none", { stroke: "#8A5A3C", "stroke-width": 4, rx: 3 });
        rect(frente, cx + 70, cy + 64, 110, 54, "#D9B26A", { rx: 4 });
        rect(frente, cx + 77, cy + 71, 96, 40, "#FFF8E8", { rx: 2 });
        s("text", { x: cx + 125, y: cy + 101, "text-anchor": "middle", "font-family": FRA, "font-weight": 700, "font-size": 30, fill: "#3E2416" }, frente, y);
        path(frente, `M${cx + 93},${cy + 158} a32,32 0 0,0 64,0 Z`, "#D9B26A");
        return { frente, cx: cx + 125, cy: cy + 125 };
      });
      const vuelo = pa.capa(0);
      const gF = g(vuelo);
      const pila = [1520, 930];
      const fichas = [];
      cajones.forEach((c, i) => {
        tl.to(c.frente, { scale: 1.07, y: 20, transformOrigin: "50% 50%", duration: 0.35, ease: "power2.out" }, 0.6 + i * 0.32);
        for (let k = 0; k < 5; k++) {
          const gg = g(gF, { opacity: 0 });
          rect(gg, -60, -40, 120, 80, "#FFF8E8", { rx: 4 });
          rect(gg, -60, -40, 120, 12, i % 2 ? "#F2B24C" : "#8FC4FF", { rx: 3 });
          rect(gg, -44, -12, 80, 5, "#C9B79A"); rect(gg, -44, 4, 60, 5, "#C9B79A");
          const t = 0.9 + i * 0.32 + k * 0.09, rot = (rng(i * 7 + k)() - 0.5) * 26;
          const dest = [pila[0] + (rng(i * 13 + k)() - 0.5) * 70, pila[1] - (i * 5 + k) * 6];
          W.arco(tl, gg, [c.cx, c.cy], dest, 240, t, 1.1, rot);
          fichas.push(gg);
        }
      });
      const HA = pa.hud;
      const tA = N.t(HA, "Alcance", { x: 1180, y: 70, w: 660, size: 120, align: "center", color: "#FFE3A8", weight: 700 });
      tA.style.textShadow = "0 0 20px rgba(255,197,107,.45)";
      const cnt = h("div", { style: { position: "absolute", left: "1180px", top: "250px", width: "660px", textAlign: "center" } }, HA);
      const anios = N.t(cnt, "seis levantamientos · 2019–2024", { x: 0, y: 0, w: 660, size: 36, font: "body", align: "center", color: "#CFE3D6" });
      const num = W.neon(cnt, "0", { x: 0, y: 60, w: 660, size: 150, align: "center", color: "#FFF4D8", glow: "#E0B25E" });
      const adul = N.t(cnt, "adultos alfabetos", { x: 0, y: 236, w: 660, size: 44, align: "center", color: "#FFF4D8" });
      const areas = N.t(cnt, "32 áreas urbanas", { x: 0, y: 300, w: 660, size: 40, font: "body", align: "center", color: "#CFE3D6" });
      const src = N.t(cnt, "Módulo sobre Lectura (MOLEC) · INEGI", { x: 0, y: 358, w: 660, size: 24, font: "body", align: "center", color: "#CFE3D6" });
      N.write(tl, tA, 0.3, 0.9);
      N.show(tl, anios, 1.4, { y: 10 });
      N.show(tl, [num, adul, src], 7.0, { y: 10, stagger: 0.15 });
      W.cuenta(tl, num, 0, D.general.alfabetos, 7.0, 3.0, W.mil);
      N.show(tl, areas, 10.4, { y: 10 });
      N.camara(tl, pa, { z: -70 }, { z: 30 }, 0, 12.6, "sine.inOut");
      // transición: las fichas vuelan hacia la cámara y atravesamos el fichero
      cajones.forEach((c, i) => tl.to(c.frente, { scale: 1, y: 0, duration: 0.3 }, 12.4 + i * 0.04));
      N.hide(tl, [tA, cnt], 12.6, 0.4);
      tl.to(gF, { scale: 7, svgOrigin: `${pila[0]} ${pila[1] - 90}`, duration: 1.1, ease: "power2.in" }, 12.8);
      fichas.forEach((f, i) => tl.to(f, { opacity: 0, duration: 0.35 }, 13.35 + (i % 6) * 0.04));
      tl.to(pa.cam, { z: 520, x: -260, y: -120, duration: 1.1, ease: "power2.in" }, 12.8);
      const destello = h("div", { style: { position: "absolute", inset: 0, background: "radial-gradient(circle at 70% 75%, rgba(255,240,200,.95), rgba(255,214,140,.5) 40%, rgba(255,214,140,0) 75%)", zIndex: 40, opacity: 0, pointerEvents: "none" } }, el);
      tl.to(destello, { opacity: 1, duration: 0.35, ease: "power2.in" }, 13.4);
      tl.to(destello, { opacity: 0, duration: 0.7, ease: "power2.out" }, 13.85);

      // ---------- plano B · la innovación: los índices de acceso
      const pb = A.plano(el, { fondo: "#14271F" });
      muroVerde(pb);
      const luzB = pb.capaLuz(-300);
      A.halo(luzB, 960, 300, 900, "rgba(255,214,140,.26)");
      N.atraves(tl, pa, pb, 13.3, 0.8);
      N.camara(tl, pb, { z: 160 }, { z: 0 }, 13.5, 15.2, "power2.out");
      tl.to(pb.cam, { z: 40, duration: T - 15.2, ease: "none" }, 15.2);
      const H = pb.hud;
      const tI = N.t(H, "Innovación", { x: 110, y: 40, size: 120, color: "#FFE3A8", weight: 700 });
      tI.style.textShadow = "0 0 22px rgba(255,197,107,.5)";
      tI.style.transformOrigin = "0 0";
      const sI = N.t(H, "los índices de acceso", { x: 116, y: 176, size: 58, font: "hand", color: "#FFF4D8" });
      N.write(tl, tI, 14.0, 0.9);
      N.show(tl, sI, 14.7, { y: 10 });
      N.cameo(H, tl, { id: "E", quien: G.cameos[4], linea: "«La innovación: con ocho preguntas sueltas de la encuesta construimos dos índices de acceso a la lectura.»", x: 110, y: 290, w: 760, h: 428, t0: 14.4, t1: 22.0 });
      const idx = h("div", { style: { position: "absolute", left: "980px", top: "300px", width: "860px" } }, H,
        `<div style="font:700 60px/1.1 var(--f-head);color:#FFF4D8">Dos índices de acceso</div>
         <div style="margin-top:30px;font:800 36px/1.55 var(--f-body);color:#F2B24C">Hogar · 4 preguntas · de 0 a 4</div>
         <div style="font:800 36px/1.55 var(--f-body);color:#8FC4FF">Primaria · 4 preguntas · de 0 a 4</div>
         <div style="margin-top:26px;font:700 28px/1.35 var(--f-body);color:#CFE3D6">Los construimos nosotros a partir de ocho preguntas sueltas del MOLEC.</div>`);
      N.show(tl, idx, 15.4, { x: 30, y: 0 });
      N.hide(tl, idx, 21.6, 0.4);
      tl.to(tI, { scale: 0.42, duration: 0.7, ease: "power2.inOut" }, 21.7);
      N.hide(tl, sI, 21.7, 0.3);

      // ---------- las ocho preguntas, en dos índices
      const t2 = gsap.timeline();
      tl.add(t2, 15.2);
      const paneles = [
        { x: 120, color: "#F2B24C", titulo: "Índice del hogar", items: ["Había libros en casa", "Sus padres leían", "Le leían", "Lo llevaban a bibliotecas o librerías"] },
        { x: 990, color: "#8FC4FF", titulo: "Índice de la primaria", items: ["Le pedían otras lecturas", "Comentaba lo leído", "Lo motivaban a leer", "Lo animaban a ir a bibliotecas"] },
      ];
      paneles.forEach((P, pi) => {
        const box = h("div", { style: { position: "absolute", left: P.x + "px", top: "200px", width: "810px", height: "590px", border: `3px solid ${P.color}`, borderRadius: "20px", background: "#183429" } }, H);
        const tt = N.t(H, P.titulo, { x: P.x + 34, y: 222, size: 52, color: P.color });
        const contador = N.t(H, `estímulos: <span class="num" style="font:700 64px var(--f-head);color:${P.color};vertical-align:-8px">0</span> <span style="opacity:.7">de 4</span>`, { x: P.x + 34, y: 690, w: 740, size: 32, font: "body", color: "#FFF4D8" });
        t2.fromTo(box, { autoAlpha: 0, scale: 0.96 }, { autoAlpha: 1, scale: 1, duration: 0.5 }, 7.0 + pi * 0.2);
        N.show(t2, tt, 7.2 + pi * 0.2, { y: 10 });
        P.items.forEach((txt, i) => {
          const x = P.x + 30 + (i % 2) * 390, y = 310 + Math.floor(i / 2) * 186;
          const card = h("div", { style: { position: "absolute", left: x + "px", top: y + "px", width: "360px", height: "164px", background: "#FFF8E8", borderRadius: "12px", borderTop: `14px solid ${P.color}`, padding: "18px 64px 0 22px", font: "800 29px/1.2 var(--f-body)", color: "#2B2340", boxShadow: "0 10px 24px rgba(0,0,0,.35)" } }, H, txt);
          const cs = s("svg", { width: 50, height: 50, style: "position:absolute;right:10px;top:34px;overflow:visible" }, card);
          const ck = W.palomita(cs, 6, 26, 1, "#2F8F6B", 7);
          const sx = 960 - (x + 180), sy = 1200 - (y + 82);
          t2.fromTo(card, { autoAlpha: 0, x: sx, y: sy, scale: 0.3, rotation: (i % 2 ? 1 : -1) * 24 }, { autoAlpha: 1, x: 0, y: 0, scale: 1, rotation: 0, duration: 0.8, ease: "back.out(1.3)" }, 7.6 + pi * 0.3 + i * 0.28);
          t2.set(ck, { opacity: 1 }, 10.6 + pi * 1.6 + i * 0.32);
          N.draw(t2, ck, 10.6 + pi * 1.6 + i * 0.32, 0.25);
        });
        const n = contador.querySelector(".num");
        t2.to({ _redraw(r) { n.textContent = Math.min(4, Math.floor(r * 4.999)); } }, { redraw: 1, duration: 1.4, ease: "none" }, 10.6 + pi * 1.6);
        N.show(t2, contador, 10.2 + pi * 0.2, { y: 10 });
      });
      const niveles = N.t(H, "Acceso bajo = 0 o 1 estímulos · medio = 2 · alto = 3 o 4", { x: 0, y: 830, w: 1920, size: 32, font: "body", align: "center", color: "#FFF4D8" });
      N.show(t2, niveles, 13.0, { y: 10 });
    },
  });

  /* ================= 5 · Técnicas y supuestos: el pizarrón ================= */
  N.add({
    id: "tecnicas", entrada: "pan",
    build(el, tl, T) {
      const pl = A.plano(el, { fondo: "#2E2A22" });
      N.entra(tl, pl, 0);
      const pared = pl.capa(-500, { sombra: false });
      rect(pared, -480, -270, 2880, 1620, "#3A3428");
      const pz = pl.capa(-120);
      rect(pz, -60, 40, 2040, 960, "#7A5232", { rx: 10 });
      rect(pz, -40, 60, 2000, 920, W.grad(pz, "t5pz", [[0, "#2A5246"], [1, "#1E4038"]]), { rx: 4 });
      const r = rng(8);
      for (let i = 0; i < 14; i++) s("ellipse", { cx: r() * 1920, cy: 120 + r() * 800, rx: 120 + r() * 220, ry: 40 + r() * 70, fill: "#FFFFFF", opacity: 0.035 + r() * 0.03, transform: `rotate(${(r() - 0.5) * 30})` }, pz);
      rect(pz, -60, 980, 2040, 26, "#6B4428", { rx: 4 });
      [[300, "#F3F1E4"], [360, "#F2A69A"], [1500, "#F6E7A0"]].forEach(([x, c]) => rect(pz, x, 968, 46, 14, c, { rx: 6 }));
      const tiza = pl.capa(-120, { sombra: false });
      const chalk = { fill: "none", stroke: "#F3F1E4", "stroke-width": 5, "stroke-linecap": "round", "stroke-linejoin": "round", opacity: 0, style: "filter:drop-shadow(0 0 2px rgba(255,255,255,.35))" };
      N.camara(tl, pl, { z: -60 }, { z: 70 }, 0, T, "sine.inOut");

      const H = pl.hud;
      const fcam = N.cameo(H, tl, { id: "C", quien: G.cameos[2], linea: "«Hicimos pruebas de hipótesis e intervalos de confianza en R, con significancia de 0.04.»", x: 110, y: 220, w: 720, h: 405, t0: 0.6, t1: 8.8 });
      const kT = W.kicker(pl, "TÉCNICAS Y SUPUESTOS", "#F3F1E4");
      N.show(tl, kT, 0.3, { y: 10 });
      // salidas originales de R, grandes, en lugar de la grabación de pantalla
      [["r_intervalos", -2, 120, 200], ["r_pruebas", 1.5, 150, 470], ["r_diferencias", -1, 110, 720]].forEach(([n, rot, x, y], i) => {
        const p = h("div", { style: { position: "absolute", left: x + "px", top: y + "px", width: "660px", padding: "12px 12px 40px", background: "#FFFFFF", boxShadow: "0 12px 24px rgba(0,0,0,.4)", transform: `rotate(${rot}deg)` } }, H,
          `<img src="assets/reporte/${n}.png" alt="" style="display:block;width:100%"><span style="position:absolute;left:0;right:0;bottom:6px;text-align:center;font:700 24px var(--f-hand);color:#6B6875">Salida original de R</span>`);
        tl.fromTo(p, { autoAlpha: 0, y: -60, rotation: rot - 10 }, { autoAlpha: 1, y: 0, rotation: rot, duration: 0.6, ease: "back.out(1.4)" }, 9.6 + i * 0.6);
      });
      [[160, 196, -8], [740, 196, 7]].forEach(([x, y, rot]) => tl.to(h("div", { style: { position: "absolute", left: x + "px", top: y + "px", width: "120px", height: "38px", background: "rgba(235,222,190,.82)", transform: `rotate(${rot}deg)`, boxShadow: "0 2px 4px rgba(0,0,0,.2)" } }, H), { autoAlpha: 0, duration: 0.4 }, 8.8));
      const gis = (html, o) => {
        const e = N.t(H, html, Object.assign({ font: "hand", color: "#F3F1E4", sombra: false }, o));
        e.style.textShadow = "0 0 3px rgba(255,255,255,.35)";
        return e;
      };
      const encab = gis("Nivel de significancia: α = 0.04 · 96% de confianza", { x: 900, y: 92, w: 980, size: 54 });
      const subr = path(tiza, "M905,166 C1100,158 1500,170 1830,160", "none", Object.assign({}, chalk, { "stroke-width": 4 }));
      N.write(tl, encab, 1.6, 1.6);
      N.draw(tl, subr, 3.0, 0.6);
      const filas = [
        { y: 230, titulo: "Proporciones: intervalos y prueba z", sup: "n·p ≥ 5 y n·(1−p) ≥ 5 en cada grupo", t: 8.4, curva: (x) => Math.exp(-x * x / 2), dom: [-3.2, 3.2] },
        { y: 460, titulo: "Ji-cuadrada de independencia", sup: "frecuencias esperadas ≥ 5", t: 11.8, curva: (x) => (x * Math.exp(-x / 2)) / 0.7358, dom: [0, 12] },
        { y: 690, titulo: "Medias: t de Welch", sup: "los libros leídos no son normales → Teorema del Límite Central (más de 1,400 lectores por grupo)", t: 15.0, curva: (x) => Math.pow(1 + (x * x) / 3, -2), dom: [-4.5, 4.5] },
      ];
      filas.forEach((F) => {
        const bx = 910, bw = 170, by = F.y + 140;
        const pts = d3.range(0, 1.0001, 1 / 60).map((u) => { const xv = F.dom[0] + u * (F.dom[1] - F.dom[0]); return [bx + u * bw, by - F.curva(xv) * 104]; });
        const ejeC = path(tiza, `M${bx - 8},${by} H${bx + bw + 8}`, "none", Object.assign({}, chalk, { "stroke-width": 3 }));
        const cur = path(tiza, d3.line()(pts), "none", chalk);
        const tt = gis(F.titulo, { x: 1120, y: F.y + 8, w: 760, size: 48 });
        const sp = gis(F.sup, { x: 1124, y: F.y + 70, w: 650, size: 34, color: "#F6E7A0" });
        const ck = W.palomita(tiza, 1806, F.y + 52, 1.25, "#9AE6B4", 7);
        tl.set([ejeC, cur], { opacity: 1 }, F.t);
        N.draw(tl, ejeC, F.t, 0.3);
        N.draw(tl, cur, F.t + 0.2, 0.9);
        N.write(tl, tt, F.t + 0.4, 1.0);
        N.write(tl, sp, F.t + 1.3, 1.1);
        tl.set(ck, { opacity: 1 }, F.t + 2.5);
        N.draw(tl, ck, F.t + 2.5, 0.3);
        A.polvo(tl, tiza, { x: 1120, y: F.y, w: 520, hh: 120, n: 10, seed: F.y, color: "#F3F1E4", t0: F.t + 0.4, dur: 3 });
      });
    },
  });
})();
