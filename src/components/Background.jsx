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

  vec3 lime = vec3(0.776, 0.957, 0.196);
  vec3 teal = vec3(0.10, 0.90, 0.76);
  vec3 violet = vec3(0.56, 0.42, 1.0);
  float phase = 0.5 + 0.5 * sin(uScroll * 1.3 + t * 2.0);
  vec3 col = mix(teal, lime, smoothstep(0.25, 0.85, r.x * 0.8 + phase * 0.4));
  col = mix(col, violet, smoothstep(0.45, 0.95, q.y + 0.15 * sin(uScroll)) * 0.75);

  float glow = smoothstep(0.36, 0.98, f + near * 0.16);
  glow = glow * glow * 1.25;

  // faint perspective grid, brightest near the pointer
  vec2 g = abs(fract(gl_FragCoord.xy / 56.0) - 0.5);
  float grid = (1.0 - smoothstep(0.0, 0.025, min(g.x, g.y))) * (0.03 + near * 0.08);

  vec3 dark = vec3(0.012, 0.016, 0.02) + col * (glow * 0.85 + grid);
  dark *= 1.0 - 0.35 * length(uv - 0.5);

  vec3 paper = vec3(0.965, 0.972, 0.96);
  vec3 light = mix(paper, col * 0.85 + 0.12, glow * 0.55) - grid * 0.4;

  gl_FragColor = vec4(mix(dark, light, uLight), 1.0);
}
`;

const VERT = `attribute vec2 p; void main() { gl_Position = vec4(p, 0.0, 1.0); }`;

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
      mq.removeEventListener("change", onScheme);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <>
      <canvas ref={ref} className="bg-canvas" aria-hidden="true" />
      <div className="bg-grain" aria-hidden="true" />
    </>
  );
}
