import { useEffect, useRef, useState } from "react";
import { hireMailto } from "../content";
import { CountUp, Scramble, useReveal } from "../effects";
import face from "../assets/jiggy-face.png";
import { resume } from "../resume";
import { Link } from "../router";
import Icon from "./Icon";

const PREVIEW = 3;

function Role({ role, i }) {
  const [open, setOpen] = useState(i === 0);
  const all = [...role.bullets, ...(role.extra || [])];
  const extra = all.length - PREVIEW;
  const bullets = open ? all : all.slice(0, PREVIEW);
  return (
    <li className="tl-item reveal" style={{ "--d": "60ms" }}>
      <span className="tl-node" aria-hidden="true" />
      <article className="tl-card glass">
        <header className="tl-head">
          <div>
            <h3>{role.company}</h3>
            <p className="tl-title">{role.title}</p>
          </div>
          <p className="tl-when">
            {role.start} – {role.end}
            <span>{role.place}</span>
          </p>
        </header>
        <ul className="tl-bullets">
          {bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
        <div className="tl-foot">
          <div className="chips">
            {role.tags.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
          {extra > 0 && (
            <button type="button" className="tl-more" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
              {open ? "Show less" : `${extra} more`}
              <Icon name="plus" size={14} style={{ transform: open ? "rotate(45deg)" : "none" }} />
            </button>
          )}
        </div>
      </article>
    </li>
  );
}

export default function ResumePage() {
  const lineRef = useRef(null);
  useReveal([]);

  useEffect(() => {
    document.title = "Résumé · Jigar Patel";
    // Fill the timeline's glowing spine as you scroll through it.
    const el = lineRef.current;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const p = Math.min(Math.max((window.innerHeight * 0.6 - r.top) / r.height, 0), 1);
        el.style.setProperty("--fill", p.toFixed(3));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.title = "Jigar Patel · Platform engineering at agent speed";
    };
  }, []);

  return (
    <main id="main" className="resume">
      <section className="container resume-hero intro">
        <Link href="/" className="text-link back">
          <Icon name="arrow" size={16} style={{ transform: "rotate(180deg)" }} /> Home
        </Link>
        <div className="resume-id">
          <span className="avatar" aria-hidden="true">
            <img src={face} alt="" width="480" height="480" />
          </span>
          <h1 className="resume-name">
            <span className="grad">{resume.name}</span>
          </h1>
        </div>
        <p className="resume-role">
          {resume.title} · {resume.location}
        </p>
        <p className="resume-summary">{resume.summary}</p>
        <dl className="resume-stats">
          {resume.highlights.map((h) => {
            const m = h.value.match(/^(\D*)(\d+)(.*)$/);
            return (
              <div key={h.label}>
                <dd>{m ? <CountUp prefix={m[1]} value={Number(m[2])} suffix={m[3]} /> : h.value}</dd>
                <dt>{h.label}</dt>
              </div>
            );
          })}
        </dl>
      </section>

      <section className="container resume-body">
        <Scramble as="h2" className="section-title reveal" text="Experience" />
        <ol className="timeline" ref={lineRef}>
          <span className="tl-spine" aria-hidden="true" />
          {resume.roles.map((r, i) => (
            <Role key={`${r.company}-${r.start}`} role={r} i={i} />
          ))}
        </ol>

        <div className="resume-grid">
          <div className="reveal">
            <Scramble as="h2" className="section-title small" text="Skills" />
            <dl className="skills">
              {resume.skills.map((s) => (
                <div key={s.group}>
                  <dt>{s.group}</dt>
                  <dd className="chips">
                    {s.items.map((it) => (
                      <span key={it}>{it}</span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="reveal" style={{ "--d": "100ms" }}>
            <Scramble as="h2" className="section-title small" text="Education" />
            {resume.education.map((e) => (
              <div className="edu glass" key={e.school}>
                <h3>{e.school}</h3>
                <p>{e.degree}</p>
                <p className="muted">{e.years}</p>
              </div>
            ))}
            <a className="btn btn-ghost btn-lg edu-cta" href={hireMailto}>
              <Icon name="mail" size={18} /> Talk to me
            </a>
          </div>
        </div>
      </section>

      <a className="fab" href="/resume.pdf" download="Jigar-Patel-Resume.pdf">
        <span className="fab-ring" aria-hidden="true" />
        <Icon name="download" size={20} />
        <span>Download PDF</span>
      </a>
    </main>
  );
}
