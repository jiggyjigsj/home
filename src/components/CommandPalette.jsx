import { useEffect, useMemo, useRef, useState } from "react";
import { askAI, hireMailto, nav, profile, socials } from "../content";
import { navigate } from "../router";
import { toggleTheme } from "../theme";
import Icon from "./Icon";

function buildActions(close, toast) {
  const go = (href) => () => {
    close();
    navigate(href);
  };
  const open = (url) => () => {
    close();
    window.open(url, "_blank", "noopener");
  };
  return [
    ...nav.map((n) => ({ group: "Go to", label: n.label, icon: "arrow", run: go(n.href) })),
    { group: "Go to", label: "Top of page", icon: "arrow", run: go("/#top") },
    {
      group: "Actions",
      label: "Copy email address",
      hint: profile.email,
      icon: "copy",
      run: async () => {
        close();
        try {
          await navigator.clipboard.writeText(profile.email);
          toast("Email copied");
        } catch (e) {
          window.location.href = `mailto:${profile.email}`;
        }
      },
    },
    { group: "Actions", label: "Hire me (pre-filled email)", hint: profile.email, icon: "mail", run: () => (window.location.href = hireMailto) },
    { group: "Actions", label: "Download résumé PDF", icon: "download", run: () => { close(); window.location.href = "/resume.pdf"; } },
    {
      group: "Actions",
      label: "Toggle light / dark theme",
      icon: "sun",
      run: () => {
        toggleTheme();
        close();
      },
    },
    {
      group: "Actions",
      label: "Focus the terminal",
      hint: "try typing help",
      icon: "terminal",
      run: () => {
        close();
        navigate("/#top");
        setTimeout(() => document.querySelector(".term-input")?.focus({ preventScroll: true }), 400);
      },
    },
    ...askAI.map((a) => ({ group: "Ask AI about me", label: `Ask ${a.label}`, icon: "spark", run: open(a.url) })),
    ...socials.map((s) => ({ group: "Elsewhere", label: s.label, icon: s.icon, run: open(s.url) })),
  ];
}

export default function CommandPalette({ open, setOpen }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [toastMsg, setToastMsg] = useState("");
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const close = () => setOpen(false);
  const toast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 1800);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const actions = useMemo(() => buildActions(close, toast), []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter((a) => `${a.group} ${a.label} ${a.hint || ""}`.toLowerCase().includes(q));
  }, [query, actions]);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setOpen]);

  useEffect(() => {
    if (!open) return;
    setQuery("");
    setActive(0);
    const prev = document.activeElement;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => inputRef.current?.focus());
    return () => {
      document.body.style.overflow = "";
      if (prev && prev.focus && !prev.classList?.contains("term-input")) prev.focus({ preventScroll: true });
    };
  }, [open]);

  useEffect(() => setActive(0), [query]);

  useEffect(() => {
    listRef.current?.querySelector(`[data-idx="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const onKeyDown = (e) => {
    if (e.key === "Escape") close();
    else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      results[active]?.run();
    }
  };

  let lastGroup = null;

  return (
    <>
      <div className={`palette-scrim ${open ? "is-open" : ""}`} onClick={close} aria-hidden="true" />
      <div
        className={`palette ${open ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Command menu"
        inert={!open}
      >
        <div className="palette-search">
          <Icon name="search" size={18} />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Where to? Type a section or an action…"
            aria-label="Search commands"
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-activedescendant={results[active] ? `pal-${active}` : undefined}
          />
          <kbd>esc</kbd>
        </div>
        <ul className="palette-list" id="palette-list" role="listbox" ref={listRef}>
          {results.length === 0 && <li className="palette-empty">No matches. Try “about”, “email”, or “theme”.</li>}
          {results.map((a, i) => {
            const header = a.group !== lastGroup ? a.group : null;
            lastGroup = a.group;
            return (
              <li key={`${a.group}-${a.label}`} role="presentation">
                {header && <div className="palette-group">{header}</div>}
                <div
                  id={`pal-${i}`}
                  data-idx={i}
                  role="option"
                  aria-selected={i === active}
                  className={`palette-item ${i === active ? "is-active" : ""}`}
                  onMouseMove={() => setActive(i)}
                  onClick={() => a.run()}
                >
                  <Icon name={a.icon} size={17} />
                  <span>{a.label}</span>
                  {a.hint && <span className="palette-hint">{a.hint}</span>}
                </div>
              </li>
            );
          })}
        </ul>
        <div className="palette-foot">
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd> move
          </span>
          <span>
            <kbd>↵</kbd> select
          </span>
          <span>
            <kbd>⌘</kbd>
            <kbd>K</kbd> toggle
          </span>
        </div>
      </div>
      <div className={`toast ${toastMsg ? "is-on" : ""}`} role="status">
        <Icon name="check" size={16} /> {toastMsg}
      </div>
    </>
  );
}
