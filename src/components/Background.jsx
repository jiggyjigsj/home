import { useEffect, useRef } from "react";
import { currentTheme, onThemeChange } from "../theme";

// Full-screen WebGL "aurora": flowing domain-warped noise in lime, teal and violet.
// Reacts to the pointer and drifts with scroll so the whole page reads as one flow.
const FRAG = `
precision mediump float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uScroll;
uniform float uLight;
uniform vec3 uColA;
uniform vec3 uColB;
uniform vec3 uColC;
uniform vec3 uPulse; // xy = click position (0-1), z = seconds since click

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) { v += a * noise(p); p = p * 2.03 + 11.7; a *= 0.5; }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  float t = uTime * 0.035;
  vec2 m = (uMouse - 0.5) * vec2(uRes.x / uRes.y, 1.0);
  float near = exp(-2.6 * length(p - m));

  p.y += uScroll * 0.35;
  vec2 q = vec2(fbm(p * 1.4 + vec2(t, -t)), fbm(p * 1.4 + vec2(5.2 - t, 1.3 + t)));
  vec2 r = vec2(fbm(p * 1.1 + 2.4 * q + vec2(1.7, 9.2) + near * 0.35), fbm(p * 1.1 + 2.4 * q + vec2(8.3, 2.8) - t));
  float f = fbm(p * 1.2 + 2.2 * r);

  vec3 lime = uColA;
  vec3 teal = uColB;
  vec3 violet = uColC;
  float phase = 0.5 + 0.5 * sin(uScroll * 1.3 + t * 2.0);
  vec3 col = mix(teal, lime, smoothstep(0.25, 0.85, r.x * 0.8 + phase * 0.4));
  col = mix(col, violet, smoothstep(0.45, 0.95, q.y + 0.15 * sin(uScroll)) * 0.75);

  // expanding ring from the last background click
  vec2 pc = (uPulse.xy - 0.5) * vec2(uRes.x / uRes.y, 1.0);
  float ring = exp(-pow((length(p - vec2(0.0, uScroll * 0.35) - pc) - uPulse.z * 0.9) * 9.0, 2.0)) * exp(-uPulse.z * 1.6);

  float glow = smoothstep(0.32, 0.95, f + near * 0.18 + ring * 0.35);
  glow = glow * glow * 0.95;
  // soft wisps so the smoke has body between the bright plumes
  float wisp = smoothstep(0.25, 0.75, f) * 0.06;

  // Each theme sets its own smoke strength from the shared glow/wisp values.
  vec3 dark = vec3(0.012, 0.016, 0.02) + col * (glow * 0.38 + wisp * 0.6); // ~40% peak
  dark *= 1.0 - 0.3 * length(uv - 0.5);

  vec3 paper = vec3(0.972, 0.98, 0.968);
  vec3 tint = mix(col, vec3(1.0), 0.35);
  vec3 light = mix(paper, tint, clamp(glow * 0.53 + wisp * 0.7, 0.0, 0.6)); // ~55% peak

  gl_FragColor = vec4(mix(dark, light, uLight), 1.0);
}
`;

const VERT = `attribute vec2 p; void main() { gl_Position = vec4(p, 0.0, 1.0); }`;

// Curated blends: [a, b, c] feed the three smoke hues. The first is the site default.
const PALETTES = [
  [[0.776, 0.957, 0.196], [0.1, 0.9, 0.76], [0.56, 0.42, 1.0]], // lime / teal / violet
  [[0.22, 0.74, 0.97], [0.0, 0.95, 0.85], [0.93, 0.28, 0.85]], // cyan / aqua / magenta
  [[1.0, 0.55, 0.15], [1.0, 0.3, 0.55], [0.55, 0.3, 1.0]], // sunset
  [[1.0, 0.8, 0.2], [0.15, 0.85, 0.45], [0.1, 0.6, 1.0]], // gold / emerald / azure
  [[1.0, 0.36, 0.82], [0.62, 0.4, 1.0], [0.25, 0.55, 1.0]], // neon pink / violet / blue
  [[1.0, 0.3, 0.2], [1.0, 0.62, 0.1], [1.0, 0.9, 0.35]], // ember
  [[0.55, 0.95, 1.0], [0.35, 0.6, 1.0], [0.6, 0.45, 1.0]], // ice
  [[0.6, 1.0, 0.35], [0.95, 0.95, 0.3], [0.1, 0.85, 0.6]], // acid
];

// Clicks on anything interactive or on a content surface shouldn't recolor the sky.
const INTERACTIVE = "a, button, input, textarea, select, label, summary, [role='dialog'], .glass, .term, .fcard, .dock, .drawer, .palette, .photo-flip, .marquee";

export function shuffleBackground(x = 0.5, y = 0.5) {
  window.dispatchEvent(new CustomEvent("bg:shuffle", { detail: { x, y } }));
}

export default function Background() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const gl = canvas.getContext("webgl", { antialias: false, premultipliedAlpha: false });
    if (!gl) {
      canvas.classList.add("bg-fallback");
      return;
    }
    const compile = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram();
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      canvas.classList.add("bg-fallback");
      return;
    }
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const u = (n) => gl.getUniformLocation(prog, n);
    const uRes = u("uRes"), uTime = u("uTime"), uMouse = u("uMouse"), uScroll = u("uScroll"), uLight = u("uLight");
    const uCols = [u("uColA"), u("uColB"), u("uColC")];
    const uPulse = u("uPulse");

    // Current colors ease toward the target palette so a shuffle blends instead of snapping.
    let paletteIdx = 0;
    const cols = PALETTES[0].map((c) => [...c]);
    let target = PALETTES[0];
    const pulse = { x: 0.5, y: 0.5, at: -100 };
    const shuffle = (x, y) => {
      let next = paletteIdx;
      while (next === paletteIdx) next = Math.floor(Math.random() * PALETTES.length);
      paletteIdx = next;
      target = PALETTES[next];
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      pulse.x = x;
      pulse.y = y;
      pulse.at = performance.now();
    };
    const onShuffle = (e) => shuffle(e.detail?.x ?? 0.5, e.detail?.y ?? 0.5);
    const onClick = (e) => {
      if (e.button !== 0 || e.target.closest(INTERACTIVE)) return;
      if (String(window.getSelection?.() || "").length) return;
      shuffle(e.clientX / window.innerWidth, 1 - e.clientY / window.innerHeight);
    };
    window.addEventListener("bg:shuffle", onShuffle);
    window.addEventListener("click", onClick);

    // Render at reduced resolution — the image is soft anyway, and it keeps laptops cool.
    const scale = window.innerWidth < 700 ? 0.35 : 0.5;
    const resize = () => {
      canvas.width = Math.ceil(window.innerWidth * scale);
      canvas.height = Math.ceil(window.innerHeight * scale);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const mouse = { x: 0.7, y: 0.6, tx: 0.7, ty: 0.6 };
    const onMove = (e) => {
      mouse.tx = e.clientX / window.innerWidth;
      mouse.ty = 1 - e.clientY / window.innerHeight;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let light = currentTheme() === "light" ? 1 : 0;
    let lightTarget = light;
    const off = onThemeChange((t) => (lightTarget = t === "light" ? 1 : 0));
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const onScheme = () => (lightTarget = currentTheme() === "light" ? 1 : 0);
    mq.addEventListener("change", onScheme);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let scroll = window.scrollY / window.innerHeight;
    let raf = 0;
    const start = performance.now();
    const frame = (now) => {
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      scroll += (window.scrollY / window.innerHeight - scroll) * 0.08;
      light += (lightTarget - light) * 0.08;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, reduced ? 12 : (now - start) / 1000);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform1f(uScroll, scroll);
      gl.uniform1f(uLight, light);
      for (let i = 0; i < 3; i++) {
        for (let k = 0; k < 3; k++) cols[i][k] += (target[i][k] - cols[i][k]) * 0.04;
        gl.uniform3f(uCols[i], cols[i][0], cols[i][1], cols[i][2]);
      }
      gl.uniform3f(uPulse, pulse.x, pulse.y, (now - pulse.at) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const onVis = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) raf = requestAnimationFrame(frame);
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(raf);
      off();
      window.removeEventListener("bg:shuffle", onShuffle);
      window.removeEventListener("click", onClick);
      mq.removeEventListener("change", onScheme);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <>
      <canvas ref={ref} className="bg-canvas" aria-hidden="true" />
      <div className="bg-dots" aria-hidden="true" />
      <div className="bg-grain" aria-hidden="true" />
    </>
  );
}
