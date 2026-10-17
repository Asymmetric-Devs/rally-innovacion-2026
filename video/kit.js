/* PolliNode: kit de ilustración (identidad inspirada en Dosel: bosque oscuro, lima y menta).
   Todo es función pura del tiempo (sin Math.random ni relojes) para que cada frame sea reproducible. */
(function () {
  const NS = "http://www.w3.org/2000/svg";
  const PN = (window.PN = {});
  const C = (PN.C = {
    canopy: "#0a1a13",
    surface: "#112419",
    surface2: "#163021",
    line: "#223c2d",
    ink: "#eef3e4",
    sage: "#9db3a4",
    lime: "#c8f25c",
    mint: "#6ee7b7",
    honey: "#f5b83d",
    coral: "#ff7a5c",
    f1: "#123524",
    f2: "#1d5c3e",
    f3: "#2f7d4f",
    f4: "#54a36a",
  });

  PN.mk = function (parent, name, attrs) {
    const el = document.createElementNS(NS, name);
    if (attrs) for (const k in attrs) el.setAttribute(k, attrs[k]);
    parent.appendChild(el);
    return el;
  };

  PN.rng = function (seed) {
    let s = seed % 2147483647;
    if (s <= 0) s += 2147483646;
    return function () {
      s = (s * 16807) % 2147483647;
      return (s - 1) / 2147483646;
    };
  };

  let uid = 0;
  PN.uid = function (p) {
    uid += 1;
    return (p || "pn") + "-" + uid;
  };

  PN.clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  PN.ease = (u) => (u < 0.5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2);
  PN.out = (u) => 1 - Math.pow(1 - PN.clamp(u, 0, 1), 3);

  /* Un reloj: llama fn(t) en cada frame del timeline, con t en segundos de la escena. */
  PN.clock = function (tl, dur, fn) {
    const o = { t: 0 };
    tl.to(o, { t: dur, duration: dur, ease: "none", onUpdate: () => fn(o.t) }, 0);
    fn(0);
  };

  /* Abeja (mira a la derecha), con sombra suave. Devuelve { g, flap(t, phase), place(x, y, angDeg, flip) }. */
  PN.bee = function (parent, opts) {
    opts = opts || {};
    const s = opts.scale || 1;
    const g = PN.mk(parent, "g", {});
    const inner = PN.mk(g, "g", { transform: "scale(" + s + ")" });
    if (opts.shadow !== false) PN.mk(inner, "ellipse", { cx: 0, cy: 30, rx: 22, ry: 6, fill: "#000", opacity: 0.28 });
    const cid = PN.uid("bee-clip");
    const defs = PN.mk(inner, "defs", {});
    const cp = PN.mk(defs, "clipPath", { id: cid });
    PN.mk(cp, "ellipse", { cx: -6, cy: 3, rx: 22, ry: 12 });
    const wingBack = PN.mk(inner, "g", {});
    PN.mk(wingBack, "ellipse", { cx: 0, cy: -15, rx: 7, ry: 15, fill: C.ink, "fill-opacity": 0.38 });
    PN.mk(inner, "ellipse", { cx: -6, cy: 3, rx: 22, ry: 12, fill: C.honey });
    const st = PN.mk(inner, "g", { "clip-path": "url(#" + cid + ")", fill: C.canopy });
    PN.mk(st, "rect", { x: -14, y: -12, width: 6, height: 30 });
    PN.mk(st, "rect", { x: -2, y: -12, width: 6, height: 30 });
    PN.mk(inner, "ellipse", { cx: -6, cy: -3, rx: 16, ry: 4, fill: "#fff", opacity: 0.18 });
    PN.mk(inner, "circle", { cx: 19, cy: 1, r: 8.5, fill: C.canopy });
    PN.mk(inner, "circle", { cx: 22, cy: -1, r: 2.2, fill: C.lime });
    PN.mk(inner, "path", { d: "M 23 -6 Q 27 -13 34 -14 M 25 -1 Q 33 -5 38 -2", fill: "none", stroke: C.canopy, "stroke-width": 2, "stroke-linecap": "round" });
    const wingFront = PN.mk(inner, "g", {});
    PN.mk(wingFront, "ellipse", { cx: 0, cy: -15, rx: 8, ry: 16, fill: C.ink, "fill-opacity": 0.62 });
    const bee = {
      g: g,
      flap: function (t, phase) {
        const p = t * Math.PI * 2 * 9 + (phase || 0);
        wingBack.setAttribute("transform", "translate(0 -6) rotate(" + (-28 + 24 * Math.sin(p)) + ")");
        wingFront.setAttribute("transform", "translate(8 -6) rotate(" + (10 + 24 * Math.sin(p + 1)) + ")");
      },
      place: function (x, y, ang, flip) {
        g.setAttribute("transform", "translate(" + x.toFixed(1) + " " + y.toFixed(1) + ") rotate(" + ang.toFixed(1) + ")" + (flip ? " scale(1 -1)" : ""));
      },
    };
    bee.flap(0, 0);
    return bee;
  };

  /* Copa de árbol vista desde arriba, en tonos de verde con sombra. Devuelve { g, sway(t, amp) }. */
  PN.tree = function (parent, cx, cy, r, seed) {
    const rnd = PN.rng(seed);
    const g = PN.mk(parent, "g", {});
    PN.mk(g, "ellipse", { cx: cx + r * 0.22, cy: cy + r * 0.3, rx: r * 1.05, ry: r * 0.9, fill: "#000", opacity: 0.32 });
    const blobs = [];
    const add = function (x, y, rr, fill, o) {
      blobs.push({ el: PN.mk(g, "circle", { cx: x, cy: y, r: rr, fill: fill, opacity: o === undefined ? 1 : o }), k: rnd() * 6.28 });
    };
    add(cx, cy, r, C.f2);
    const tones = [C.f3, C.f2, C.f3, C.f4];
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2 + rnd() * 0.7;
      const d = r * (0.3 + rnd() * 0.28);
      add(cx + Math.cos(a) * d, cy + Math.sin(a) * d, r * (0.3 + rnd() * 0.18), tones[i % 4]);
    }
    for (let i = 0; i < 3; i++) add(cx - r * (0.12 + rnd() * 0.28), cy - r * (0.12 + rnd() * 0.28), r * (0.14 + rnd() * 0.08), C.f4, 0.75);
    return {
      g: g,
      sway: function (t, amp) {
        for (let i = 0; i < blobs.length; i++) {
          const b = blobs[i];
          b.el.setAttribute("transform", "translate(" + (Math.sin(t * 0.9 + b.k) * amp).toFixed(2) + " " + (Math.cos(t * 0.7 + b.k * 1.7) * amp * 0.6).toFixed(2) + ")");
        }
      },
    };
  };

  /* Flor simple: pétalos redondos. Devuelve { g, inner }: animar `inner` (local), no `g`. */
  PN.flower = function (parent, cx, cy, r, petal, center) {
    const g = PN.mk(parent, "g", { transform: "translate(" + cx + " " + cy + ")" });
    const inner = PN.mk(g, "g", {});
    for (let k = 0; k < 5; k++) {
      const a = (k / 5) * Math.PI * 2 - Math.PI / 2;
      PN.mk(inner, "circle", { cx: Math.cos(a) * r * 0.55, cy: Math.sin(a) * r * 0.55, r: r * 0.5, fill: petal });
    }
    PN.mk(inner, "circle", { cx: 0, cy: 0, r: r * 0.3, fill: center || C.canopy });
    return { g: g, inner: inner };
  };

  /* Muestrea un path SVG en n+1 puntos con su ángulo de avance. */
  PN.samplePath = function (parent, d, n) {
    const p = PN.mk(parent, "path", { d: d, fill: "none", stroke: "none" });
    const len = p.getTotalLength();
    const pts = [];
    for (let i = 0; i <= n; i++) {
      const a = p.getPointAtLength((len * i) / n);
      const b = p.getPointAtLength(Math.min(len, (len * (i + 0.5)) / n + 1));
      pts.push({ x: a.x, y: a.y, ang: (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI });
    }
    return pts;
  };
  PN.at = function (pts, u) {
    const f = PN.clamp(u, 0, 1) * (pts.length - 1);
    const i = Math.min(pts.length - 2, Math.floor(f));
    const k = f - i;
    const a = pts[i], b = pts[i + 1];
    return { x: a.x + (b.x - a.x) * k, y: a.y + (b.y - a.y) * k, ang: a.ang + (b.ang - a.ang) * k };
  };

  /* Orienta una abeja según su dirección de avance (dx, dy); si va hacia la izquierda la voltea para que no quede de cabeza. */
  PN.fly = function (bee, x, y, dx, dy, k) {
    const a = (Math.atan2(dy, dx) * 180) / Math.PI;
    const kk = k === undefined ? 0.5 : k;
    if (dx >= 0) bee.place(x, y, a * kk, false);
    else bee.place(x, y, 180 + (a > 0 ? a - 180 : a + 180) * kk, true);
  };

  /* Filas de plantas: puntos pequeños alineados. */
  PN.rows = function (parent, x0, y0, x1, y1, step, gap, color, w, opacity) {
    let i = 0;
    for (let y = y0; y <= y1; y += step) {
      PN.mk(parent, "line", { x1: x0, y1: y, x2: x1, y2: y, stroke: color, "stroke-width": w || 7, "stroke-linecap": "round", "stroke-dasharray": "0 " + gap, "stroke-dashoffset": i % 2 ? gap / 2 : 0, opacity: opacity === undefined ? 1 : opacity });
      i++;
    }
  };

  /* Blob orgánico suave. */
  PN.blob = function (cx, cy, rx, ry, ph) {
    let d = "";
    const N = 56;
    for (let i = 0; i < N; i++) {
      const a = (i / N) * Math.PI * 2;
      const k = 1 + 0.08 * Math.sin(3 * a + ph) + 0.05 * Math.sin(5 * a + ph * 1.7);
      d += (i ? "L" : "M") + (cx + rx * k * Math.cos(a)).toFixed(1) + " " + (cy + ry * k * Math.sin(a)).toFixed(1) + " ";
    }
    return d + "Z";
  };
})();
