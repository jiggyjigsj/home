import { useEffect, useRef, useState } from "react";
import { ai, askAI, features, hireMailto, profile, socials, toolkit } from "../content";
import { navigate } from "../router";
import { toggleTheme } from "../theme";

const PROMPT = "jiggy@home ~ %";

const intro = [
  { kind: "cmd", text: "whoami" },
  { kind: "out", text: `${profile.name}, ${profile.role}` },
  { kind: "out", text: profile.tagline },
  { kind: "hint", text: "This terminal is live. Type help and press enter." },
];


// Each command returns lines to print. Keep outputs short — it's a teaser, not a résumé.
const commands = {
  help: () => [
    { kind: "out", text: "Commands:" },
    ...[
      ["whoami", "the one-liner"],
      ["work", "things I've shipped"],
      ["ai", "how I build with agents"],
      ["stack", "tools I reach for"],
      ["contact", "ways to reach me"],
      ["resume", "open my résumé"],
      ["ask", "ask an AI about me"],
      ["hire", "draft an email to me"],
      ["theme", "flip light / dark"],
      ["goto", "about, work, ai, projects, contact, resume"],
      ["clear", "wipe the screen"],
    ].map(([c, d]) => ({ kind: "row", k: c, v: d })),
    { kind: "hint", text: "Tip: ⌘K opens the command menu from anywhere." },
  ],
  whoami: () => [
    { kind: "out", text: `${profile.name}, ${profile.role}` },
    { kind: "out", text: profile.tagline },
  ],
  work: () => [
    ...features.slice(0, 5).map((f) => ({ kind: "row", k: f.tag.toLowerCase(), v: f.title })),
    { kind: "hint", text: "Run goto work for the full list." },
  ],
  ai: () => [
    ...ai.terminal.map((t) => ({ kind: "out", text: t })),
    { kind: "hint", text: "Run goto ai for the whole story." },
  ],
  stack: () => toolkit.map((g) => ({ kind: "row", k: g.title.toLowerCase().split(" ")[0], v: g.items.join(", ") })),
  contact: () => [
    { kind: "row", k: "email", v: profile.email },
    ...socials.map((s) => ({ kind: "row", k: s.label.toLowerCase(), v: s.url.replace(/^https?:\/\/(www\.)?/, "") })),
  ],
  resume: () => {
    setTimeout(() => navigate("/resume"), 400);
    return [{ kind: "ok", text: "Loading résumé…" }];
  },
  ask: (arg) => {
    const pick = askAI.find((a) => a.label.toLowerCase() === arg) || askAI[0];
    window.open(pick.url, "_blank", "noopener");
    return [
      { kind: "ok", text: `Asking ${pick.label} about me in a new tab…` },
      { kind: "hint", text: `Also try: ${askAI.map((a) => `ask ${a.label.toLowerCase()}`).join(", ")}` },
    ];
  },
  hire: () => [
    { kind: "ok", text: "Drafting an email with the details I'll need…" },
    { kind: "_effect", run: () => (window.location.href = hireMailto) },
  ],
  theme: () => {
    toggleTheme();
    return [{ kind: "ok", text: "Theme switched." }];
  },
  goto: (arg) => {
    const map = { about: "/#about", work: "/#work", ai: "/#ai", projects: "/#projects", contact: "/#contact", top: "/#top", resume: "/resume" };
    const target = map[arg];
    if (!target) return [{ kind: "err", text: `goto: pick one of ${Object.keys(map).join(", ")}` }];
    setTimeout(() => navigate(target), 250);
    return [{ kind: "ok", text: `Heading to ${arg}…` }];
  },
  ls: () => [{ kind: "out", text: "about/  work/  ai/  projects/  contact/  secrets.txt" }],
  cat: (arg) =>
    arg === "secrets.txt"
      ? [{ kind: "out", text: "The secret is: terraform plan before terraform apply. Always." }]
      : [{ kind: "err", text: `cat: ${arg || "?"}: try cat secrets.txt` }],
  sudo: (arg) =>
    arg && arg.startsWith("hire")
      ? [
          { kind: "ok", text: "Permission granted. Excellent choice." },
          { kind: "out", text: `Opening a pre-filled draft to ${profile.email}…` },
          { kind: "_effect", run: () => (window.location.href = hireMailto) },
        ]
      : [{ kind: "err", text: "jiggy is not in the sudoers file. This incident will be reported. (try sudo hire-jigar)" }],
  "rm": () => [{ kind: "err", text: "Nice try. Production is protected by policy." }],
  kubectl: () => [
    { kind: "out", text: "NAME            STATUS   AGE" },
    { kind: "out", text: "jiggy-platform  Ready    since day one" },
  ],
  exit: () => [{ kind: "out", text: "There is no exit. Only more infrastructure." }],
};

export default function Terminal() {
  const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [lines, setLines] = useState(reduced ? intro : []);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState([]);
  const [hIdx, setHIdx] = useState(-1);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);

  // Type the intro once, line by line.
  useEffect(() => {
    if (lines.length >= intro.length || reduced) return;
    const id = setTimeout(() => setLines(intro.slice(0, lines.length + 1)), lines.length === 0 ? 600 : 380);
    return () => clearTimeout(id);
  }, [lines, reduced]);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const run = (raw) => {
    const input = raw.trim();
    if (!input) return;
    const [name, ...rest] = input.split(/\s+/);
    const arg = rest.join(" ").toLowerCase();
    setHistory((h) => [input, ...h].slice(0, 30));
    setHIdx(-1);
    if (name.toLowerCase() === "clear") {
      setLines([]);
      return;
    }
    const fn = commands[name.toLowerCase()];
    const out = fn ? fn(arg) : [{ kind: "err", text: `command not found: ${name}. Type help.` }];
    out.filter((l) => l.kind === "_effect").forEach((l) => setTimeout(l.run, 600));
    setLines((prev) => [...prev, { kind: "cmd", text: input }, ...out.filter((l) => l.kind !== "_effect")]);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      run(value);
      setValue("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(hIdx + 1, history.length - 1);
      if (history[next] !== undefined) {
        setHIdx(next);
        setValue(history[next]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = hIdx - 1;
      setHIdx(Math.max(next, -1));
      setValue(next < 0 ? "" : history[next]);
    } else if (e.key === "Tab") {
      const match = Object.keys(commands).find((c) => value && c.startsWith(value.toLowerCase()));
      if (match) {
        e.preventDefault();
        setValue(match);
      }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  const chips = ["help", "ai", "ask", "sudo hire-jigar"];

  return (
    <div className="term" onClick={() => inputRef.current?.focus({ preventScroll: true })}>
      <div className="term-bar">
        <span className="term-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="term-title">jiggy: interactive shell</span>
      </div>
      <div className="term-body" ref={bodyRef} aria-live="polite">
        {lines.map((l, i) => (
          <div key={i} className={`term-line term-${l.kind}`}>
            {l.kind === "cmd" && <span className="term-prompt">{PROMPT} </span>}
            {l.kind === "row" ? (
              <>
                <span className="term-k">{l.k}</span>
                <span>{l.v}</span>
              </>
            ) : (
              l.text
            )}
          </div>
        ))}
        <label className="term-line term-inputline">
          <span className="term-prompt">{PROMPT} </span>
          <input
            ref={inputRef}
            className="term-input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            spellCheck="false"
            autoCapitalize="off"
            autoComplete="off"
            aria-label="Terminal input. Type help for commands."
          />
        </label>
      </div>
      <div className="term-chips">
        {chips.map((c) => (
          <button
            key={c}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              run(c);
            }}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
