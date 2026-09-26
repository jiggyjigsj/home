import { useEffect, useRef, useState } from "react";

export const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Adds .is-in to every .reveal element as it scrolls into view. Re-scans when deps change.
export function useReveal(deps = []) {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal:not(.is-in)");
    if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

function useInView(ref, once = true) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setInView(true);
        if (once) io.disconnect();
      }
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, once]);
  return inView;
}

export function CountUp({ value, prefix = "", suffix = "", duration = 1400 }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  const [n, setN] = useState(prefersReducedMotion() ? value : 0);
  useEffect(() => {
    if (!inView || prefersReducedMotion()) return;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);
  return (
    <span ref={ref} className="countup">
      {prefix}
      {n}
      {suffix}
    </span>
  );
}

const GLYPHS = "!<>-_\\/[]{}=+*^?#01";

// Decodes text from random glyphs when it scrolls into view (and again on hover).
export function Scramble({ text, as: Tag = "span", className = "", ...rest }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  const [out, setOut] = useState(text);
  const run = () => {
    if (prefersReducedMotion()) return;
    let frame = 0;
    const total = 22;
    const id = setInterval(() => {
      frame++;
      const reveal = Math.floor((frame / total) * text.length);
      setOut(
        text
          .split("")
          .map((ch, i) => (i < reveal || ch === " " ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
          .join("")
      );
      if (frame >= total) {
        clearInterval(id);
        setOut(text);
      }
    }, 28);
  };
  useEffect(() => {
    if (inView) run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, text]);
  return (
    <Tag ref={ref} className={className} onMouseEnter={run} aria-label={text} {...rest}>
      <span aria-hidden="true">{out}</span>
    </Tag>
  );
}

// Pointer-driven 3D tilt + spotlight for cards.
export const tilt = {
  onPointerMove(e) {
    if (e.pointerType !== "mouse") return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--rx", `${(0.5 - y) * 8}deg`);
    el.style.setProperty("--ry", `${(x - 0.5) * 10}deg`);
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
  },
  onPointerLeave(e) {
    e.currentTarget.style.setProperty("--rx", "0deg");
    e.currentTarget.style.setProperty("--ry", "0deg");
  },
};

// Buttons that lean toward the cursor.
export const magnetic = {
  onPointerMove(e) {
    if (e.pointerType !== "mouse") return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.18}px, ${(e.clientY - r.top - r.height / 2) * 0.28}px)`;
  },
  onPointerLeave(e) {
    e.currentTarget.style.transform = "";
  },
};
