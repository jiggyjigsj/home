import { useEffect, useRef, useState } from "react";
import { hireMailto, nav, socials } from "../content";
import { Link, usePath } from "../router";
import { currentTheme, onThemeChange, toggleTheme } from "../theme";
import Icon from "./Icon";
import Logo from "./Logo";

function ThemeToggle() {
  const [theme, setTheme] = useState(currentTheme);
  useEffect(() => onThemeChange(setTheme), []);
  return (
    <button type="button" className="icon-btn" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}>
      <Icon name={theme === "dark" ? "sun" : "moon"} />
    </button>
  );
}

function useActive(path) {
  const [active, setActive] = useState("");
  useEffect(() => {
    if (path !== "/") {
      setActive(path);
      return;
    }
    // Sections without a nav item (hero, impact, projects) clear the highlight.
    const ids = [...nav.map((n) => n.href.split("#")[1]).filter(Boolean), "top", "impact", "projects"];
    const linked = new Set(nav.map((n) => n.href));
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const href = `/#${e.target.id}`;
          setActive(linked.has(href) ? href : "");
        }),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [path]);
  return active;
}

export default function Navbar({ onOpenPalette }) {
  const path = usePath();
  const active = useActive(path);
  const [open, setOpen] = useState(false);
  const progressRef = useRef(null);
  const drawerRef = useRef(null);
  const burgerRef = useRef(null);
  const isMac = /Mac|iPhone|iPad/.test(navigator.platform);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        if (progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [path]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const focusables = drawerRef.current.querySelectorAll("a, button");
    focusables[0]?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key !== "Tab") return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const burger = burgerRef.current;
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      burger?.focus();
    };
  }, [open]);

  return (
    <>
      <header className="dock-wrap">
        <div className="dock">
          <Logo />
          <nav aria-label="Primary" className="dock-links">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={active === item.href ? "is-active" : ""}
                aria-current={active === item.href ? "location" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="dock-actions">
            <button type="button" className="kbd-btn" onClick={onOpenPalette} aria-label="Open command menu">
              <Icon name="search" size={15} />
              <kbd>{isMac ? "⌘" : "Ctrl"}</kbd>
              <kbd>K</kbd>
            </button>
            <ThemeToggle />
            <button
              ref={burgerRef}
              type="button"
              className="icon-btn dock-burger"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-drawer"
              onClick={() => setOpen(true)}
            >
              <Icon name="menu" />
            </button>
          </div>
          <div className="dock-progress" ref={progressRef} aria-hidden="true" />
        </div>
      </header>

      <div className={`scrim ${open ? "is-open" : ""}`} onClick={() => setOpen(false)} aria-hidden="true" />
      <aside
        id="mobile-drawer"
        ref={drawerRef}
        className={`drawer ${open ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!open}
      >
        <div className="drawer-head">
          <Logo />
          <button type="button" className="icon-btn" aria-label="Close menu" onClick={() => setOpen(false)}>
            <Icon name="close" />
          </button>
        </div>
        <nav aria-label="Mobile" className="drawer-links">
          {nav.map((item, i) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)} style={{ "--i": i }} className={active === item.href ? "is-active" : ""}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="drawer-foot">
          <a className="btn btn-primary btn-block" href={hireMailto}>
            <Icon name="mail" size={18} /> Hire me
          </a>
          <div className="social-row">
            {socials.map((s) => (
              <a key={s.label} className="icon-btn" href={s.url} target="_blank" rel="noreferrer" aria-label={s.label}>
                <Icon name={s.icon} />
              </a>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
