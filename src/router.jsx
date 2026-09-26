import { useEffect, useState } from "react";

// Tiny pushState router: "/" and "/resume" are the only pages.
const listeners = new Set();

export function navigate(href) {
  const url = new URL(href, window.location.origin);
  const samePage = url.pathname === window.location.pathname;
  if (!samePage) {
    window.history.pushState({}, "", url.pathname + url.hash);
    listeners.forEach((fn) => fn(url.pathname));
  } else if (url.hash) {
    window.history.replaceState({}, "", url.hash);
  }
  requestAnimationFrame(() => {
    const target = url.hash && document.querySelector(url.hash);
    if (target) target.scrollIntoView({ behavior: samePage ? "smooth" : "auto" });
    else if (!samePage) window.scrollTo(0, 0);
  });
}

export function usePath() {
  const [path, setPath] = useState(window.location.pathname);
  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    listeners.add(setPath);
    window.addEventListener("popstate", onPop);
    return () => {
      listeners.delete(setPath);
      window.removeEventListener("popstate", onPop);
    };
  }, []);
  return path.replace(/\/+$/, "") || "/";
}

export function Link({ href, onClick, ...rest }) {
  const internal = href.startsWith("/");
  return (
    <a
      href={href}
      onClick={(e) => {
        onClick?.(e);
        if (!internal || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        navigate(href);
      }}
      {...rest}
    />
  );
}
