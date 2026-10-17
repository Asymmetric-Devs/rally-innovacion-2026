/* PolliNode kit de ilustración (estilo cómic).
   Todo es función pura del tiempo (sin Math.random ni relojes) para que cada frame sea reproducible. */
(function () {
  const NS = "http://www.w3.org/2000/svg";
  const PN = (window.PN = {});
  const C = (PN.C = {
    ink: "#17132b",
    paper: "#fff1d6",
    paper2: "#f3dba9",
    magenta: "#ff3d8b",
    pink: "#ff9ec7",
    cyan: "#19c3e6",
    cyanL: "#7fe3f5",
    yellow: "#ffd23f",
    orange: "#ff7a2f",
    violet: "#6c3df4",
    deep: "#2b1d5e",
    teal: "#0e8f8a",
    tealD: "#0a5c66",
    lilac: "#b79ad6",
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
  /* "A doses": el movimiento de los personajes cambia 12 veces por segundo, como en una animación dibujada. */
  PN.q = (t) => Math.floor(t * 12 + 1e-6) / 12;

  /* Un reloj: llama fn(t) en cada frame del timeline, con t en segundos de la escena. */
  PN.clock = function (tl, dur, fn) {
    const o = { t: 0 };
    tl.to(o, { t: dur, duration: dur, ease: "none", onUpdate: () => fn(o.t) }, 0);
    fn(0);
  };

  /* Abeja de cómic (mira a la derecha). Devuelve { g, flap(t, phase), place(x, y, angDeg, flip) }. */
  PN.bee = function (parent, opts) {
    opts = opts || {};
    const s = opts.scale || 1;
    const g = PN.mk(parent, "g", {});
    const inner = PN.mk(g, "g", { transform: "scale(" + s + ")", "stroke-linejoin": "round", "stroke-linecap": "round" });
    const ink = C.ink;
    [[-4, 9], [6, 10], [16, 9]].forEach(function (p) {
      PN.mk(inner, "line", { x1: p[0], y1: p[1] - 3, x2: p[0] - 3, y2: p[1] + 8, stroke: ink, "stroke-width": 3 });
    });
    const cid = PN.uid("bee-clip");
    const defs = PN.mk(inner, "defs", {});
    const cp = PN.mk(defs, "clipPath", { id: cid });
    PN.mk(cp, "ellipse", { cx: -16, cy: 0, rx: 24, ry: 14 });
    const wingBack = PN.mk(inner, "g", {});
    PN.mk(wingBack, "ellipse", { cx: 0, cy: -17, rx: 8.5, ry: 19, fill: C.cyanL, stroke: ink, "stroke-width": 3 });
    PN.mk(inner, "path", { d: "M -39 0 L -49 -4 L -49 4 Z", fill: ink, stroke: ink, "stroke-width": 2 });
    PN.mk(inner, "ellipse", { cx: -16, cy: 0, rx: 24, ry: 14, fill: C.yellow, stroke: ink, "stroke-width": 3.4 });
    const st = PN.mk(inner, "g", { "clip-path": "url(#" + cid + ")" });
    [-33, -21, -9].forEach(function (x) {
      PN.mk(st, "rect", { x: x, y: -16, width: 7, height: 32, fill: ink });
    });
    PN.mk(inner, "circle", { cx: 12, cy: -1, r: 13, fill: C.orange, stroke: ink, "stroke-width": 3.4 });
    PN.mk(inner, "circle", { cx: 31, cy: 0, r: 11, fill: ink });
    PN.mk(inner, "circle", { cx: 34, cy: -3, r: 5, fill: "#fff" });
    PN.mk(inner, "circle", { cx: 35.5, cy: -3, r: 2.2, fill: ink });
    PN.mk(inner, "path", { d: "M 36 -9 Q 40 -20 50 -22", fill: "none", stroke: ink, "stroke-width": 2.8 });
    PN.mk(inner, "path", { d: "M 40 -5 Q 50 -12 58 -8", fill: "none", stroke: ink, "stroke-width": 2.8 });
    PN.mk(inner, "circle", { cx: 51, cy: -22, r: 4, fill: C.yellow, stroke: ink, "stroke-width": 2.6 });
    PN.mk(inner, "circle", { cx: 59, cy: -8, r: 4, fill: C.cyan, stroke: ink, "stroke-width": 2.6 });
    const wingFront = PN.mk(inner, "g", {});
    PN.mk(wingFront, "ellipse", { cx: 0, cy: -17, rx: 9.5, ry: 20, fill: "#b9f1fa", stroke: ink, "stroke-width": 3 });
    PN.mk(wingFront, "path", { d: "M 3 -30 L 0 -22 M 5 -22 L 2 -14", stroke: ink, "stroke-width": 2, opacity: 0.45 });
    const bee = {
      g: g,
      flap: function (t, phase) {
        const p = PN.q(t) * Math.PI * 2 * 7 + (phase || 0);
        wingBack.setAttribute("transform", "translate(4 -9) rotate(" + (-34 + 34 * Math.sin(p)) + ")");
        wingFront.setAttribute("transform", "translate(12 -9) rotate(" + (8 + 34 * Math.sin(p + 0.9)) + ")");
      },
      place: function (x, y, ang, flip) {
        g.setAttribute("transform", "translate(" + x.toFixed(1) + " " + y.toFixed(1) + ") rotate(" + ang.toFixed(1) + ")" + (flip ? " scale(1 -1)" : ""));
      },
    };
    bee.flap(0, 0);
    return bee;
  };

  /* Copa de árbol de cómic vista desde arriba. Devuelve { g, sway(t, amp) }. */
  PN.tree = function (parent, cx, cy, r, seed) {
    const rnd = PN.rng(seed);
    const g = PN.mk(parent, "g", {});
    PN.mk(g, "ellipse", { cx: cx + r * 0.28, cy: cy + r * 0.34, rx: r * 1.08, ry: r * 0.92, fill: "url(#ht-ink)", opacity: 0.55 });
    const blobs = [];
    const add = function (x, y, rr, fill) {
      const el = PN.mk(g, "circle", { cx: x, cy: y, r: rr, fill: fill, stroke: C.ink, "stroke-width": 6 });
      blobs.push({ el: el, k: rnd() * 6.28 });
    };
    add(cx, cy, r, C.tealD);
    const tones = [C.teal, "#13a39b", C.teal];
    for (let i = 0; i < 7; i++) {
      const a = (i / 7) * Math.PI * 2 + rnd() * 0.6;
      const d = r * (0.38 + rnd() * 0.22);
      add(cx + Math.cos(a) * d, cy + Math.sin(a) * d, r * (0.36 + rnd() * 0.16), tones[i % 3]);
    }
    for (let i = 0; i < 3; i++) {
      const hx = cx - r * (0.15 + rnd() * 0.3);
      const hy = cy - r * (0.15 + rnd() * 0.3);
      blobs.push({ el: PN.mk(g, "ellipse", { cx: hx, cy: hy, rx: r * 0.2, ry: r * 0.1, fill: "#7fe8d9", transform: "rotate(-30 " + hx + " " + hy + ")" }), k: rnd() * 6.28 });
    }
    for (let i = 0; i < 4; i++) {
      const a = rnd() * 6.28;
      const d = r * (0.2 + rnd() * 0.5);
      blobs.push({ el: PN.mk(g, "circle", { cx: cx + Math.cos(a) * d, cy: cy + Math.sin(a) * d, r: r * 0.09, fill: C.pink, stroke: C.ink, "stroke-width": 3 }), k: rnd() * 6.28 });
    }
    return {
      g: g,
      sway: function (t, amp) {
        const q = PN.q(t);
        for (let i = 0; i < blobs.length; i++) {
          const b = blobs[i];
          const k = b.k;
          b.el.setAttribute("transform", "translate(" + (Math.sin(q * 1.1 + k) * amp).toFixed(2) + " " + (Math.cos(q * 0.8 + k * 1.7) * amp * 0.6).toFixed(2) + ")");
        }
      },
    };
  };

  /* Flor de cómic de 5 pétalos. Devuelve { g, inner }: animar `inner` (local), no `g`. */
  PN.flower = function (parent, cx, cy, r, petal, center) {
    const g = PN.mk(parent, "g", { transform: "translate(" + cx + " " + cy + ")" });
    const inner = PN.mk(g, "g", {});
    const sw = Math.max(2.6, r * 0.15);
    for (let k = 0; k < 5; k++) {
      PN.mk(inner, "ellipse", { cx: 0, cy: -r * 0.62, rx: r * 0.42, ry: r * 0.62, fill: petal, stroke: C.ink, "stroke-width": sw, transform: "rotate(" + k * 72 + ")" });
    }
    PN.mk(inner, "circle", { cx: 0, cy: 0, r: r * 0.36, fill: center || C.yellow, stroke: C.ink, "stroke-width": sw });
    return { g: g, inner: inner };
  };

  /* Polen / chispas flotando. Devuelve { update(t) }. */
  PN.pollen = function (parent, n, W, H, seed, color) {
    const rnd = PN.rng(seed);
    const ps = [];
    for (let i = 0; i < n; i++) {
      const rr = 3 + rnd() * 4;
      ps.push({
        el: PN.mk(parent, "circle", { r: rr, fill: color || C.yellow, stroke: C.ink, "stroke-width": 2, opacity: (0.7 + rnd() * 0.3).toFixed(2) }),
        x0: rnd() * W, y0: rnd() * H,
        ax: 20 + rnd() * 60, ay: 20 + rnd() * 50,
        wx: 0.3 + rnd() * 0.6, wy: 0.3 + rnd() * 0.6,
        px: rnd() * 6.28, py: rnd() * 6.28,
        vx: 8 + rnd() * 16, vy: -(2 + rnd() * 9),
      });
    }
    const upd = function (t) {
      const q = PN.q(t);
      for (let i = 0; i < ps.length; i++) {
        const p = ps[i];
        const x = (((p.x0 + p.vx * q + p.ax * Math.sin(p.wx * q + p.px)) % W) + W) % W;
        const y = (((p.y0 + p.vy * q + p.ay * Math.sin(p.wy * q + p.py)) % H) + H) % H;
        p.el.setAttribute("cx", x.toFixed(1));
        p.el.setAttribute("cy", y.toFixed(1));
      }
    };
    upd(0);
    return { update: upd };
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

  /* Filas de plantas: puntos con contorno de tinta. */
  PN.rows = function (parent, x0, y0, x1, y1, step, gap, color, hi, w) {
    const ww = w || 22;
    let i = 0;
    const off = [];
    for (let y = y0; y <= y1; y += step) {
      const da = "0 " + gap, doff = i % 2 ? gap / 2 : 0;
      PN.mk(parent, "line", { x1: x0, y1: y, x2: x1, y2: y, stroke: C.ink, "stroke-width": ww + 8, "stroke-linecap": "round", "stroke-dasharray": da, "stroke-dashoffset": doff });
      off.push([y, da, doff]);
      i++;
    }
    off.forEach(function (o) {
      PN.mk(parent, "line", { x1: x0, y1: o[0], x2: x1, y2: o[0], stroke: color, "stroke-width": ww, "stroke-linecap": "round", "stroke-dasharray": o[1], "stroke-dashoffset": o[2] });
      PN.mk(parent, "line", { x1: x0 - 4, y1: o[0] - 5, x2: x1 - 4, y2: o[0] - 5, stroke: hi, "stroke-width": ww * 0.38, "stroke-linecap": "round", "stroke-dasharray": o[1], "stroke-dashoffset": o[2] });
    });
  };

  /* Orienta una abeja según su dirección de avance (dx, dy); si va hacia la izquierda la voltea para que no quede de cabeza. */
  PN.fly = function (bee, x, y, dx, dy, k) {
    const a = (Math.atan2(dy, dx) * 180) / Math.PI;
    const kk = k === undefined ? 0.5 : k;
    if (dx >= 0) bee.place(x, y, a * kk, false);
    else bee.place(x, y, 180 + (a > 0 ? a - 180 : a + 180) * kk, true);
  };

  /* Parte un texto (con spans internos) en palabras animables. Devuelve el array de spans. */
  PN.words = function (el) {
    const out = [];
    const walk = function (node) {
      Array.from(node.childNodes).forEach(function (ch) {
        if (ch.nodeType === 3) {
          const frag = document.createDocumentFragment();
          ch.textContent.split(/(\s+)/).forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) {
              frag.appendChild(document.createTextNode(" "));
            } else {
              const s = document.createElement("span");
              s.className = "w";
              s.style.display = "inline-block";
              s.textContent = part;
              frag.appendChild(s);
              out.push(s);
            }
          });
          node.replaceChild(frag, ch);
        } else if (ch.nodeType === 1) {
          walk(ch);
        }
      });
    };
    walk(el);
    return out;
  };

  /* Estrella de 4 puntas (brillo). */
  PN.sparkle = function (parent, cx, cy, r, color) {
    const g = PN.mk(parent, "g", { transform: "translate(" + cx + " " + cy + ")" });
    const inner = PN.mk(g, "path", { d: "M 0 " + -r + " Q 0 0 " + r + " 0 Q 0 0 0 " + r + " Q 0 0 " + -r + " 0 Q 0 0 0 " + -r + " Z", fill: color || C.yellow, stroke: C.ink, "stroke-width": 3.5, "stroke-linejoin": "round" });
    return { g: g, el: inner };
  };

  /* Estallido de cómic (starburst) con contorno de tinta. Devuelve el grupo. */
  PN.burst = function (parent, cx, cy, r1, r2, n, fill, seed) {
    const rnd = PN.rng(seed || 3);
    let d = "";
    for (let i = 0; i < n * 2; i++) {
      const a = (i / (n * 2)) * Math.PI * 2;
      const r = i % 2 ? r1 : r2 * (0.88 + rnd() * 0.24);
      d += (i ? "L" : "M") + (cx + Math.cos(a) * r).toFixed(1) + " " + (cy + Math.sin(a) * r).toFixed(1) + " ";
    }
    const g = PN.mk(parent, "g", {});
    PN.mk(g, "path", { d: d + "Z", fill: C.ink, transform: "translate(8 8)" });
    PN.mk(g, "path", { d: d + "Z", fill: fill || C.yellow, stroke: C.ink, "stroke-width": 6, "stroke-linejoin": "miter" });
    return g;
  };

  /* Efecto de sonido: estallido + texto grande (ej. "BZZZ!"). Devuelve { g, text }. */
  PN.sfx = function (parent, label, cx, cy, size, fill, seed) {
    const g = PN.mk(parent, "g", { transform: "translate(" + cx + " " + cy + ")" });
    const inner = PN.mk(g, "g", {});
    PN.burst(inner, 0, 0, size * 0.62, size * 0.9, 11, fill || C.yellow, seed);
    const t = PN.mk(inner, "text", { x: 0, y: size * 0.2, "text-anchor": "middle", "font-family": "Bangers", "font-size": size * 0.62, fill: C.ink, stroke: "#fff", "stroke-width": 0, "letter-spacing": 1 });
    t.textContent = label;
    return { g: g, inner: inner, text: t };
  };
})();
