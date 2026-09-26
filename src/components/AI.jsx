import { useEffect, useRef, useState } from "react";
import { ai } from "../content";
import { CountUp, prefersReducedMotion, Scramble } from "../effects";

function Ramp() {
  const ref = useRef(null);
  const [grown, setGrown] = useState(false);
  const [hover, setHover] = useState(null);
  const max = Math.max(...ai.ramp.map((d) => d.value));
  const fromIdx = ai.ramp.findIndex((d) => d.month === ai.rampFrom);

  useEffect(() => {
    if (prefersReducedMotion()) return setGrown(true);
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setGrown(true), { threshold: 0.4 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <figure className={`ramp glass ${grown ? "is-grown" : ""}`} ref={ref}>
      <figcaption className="ramp-head">
        <span className="ramp-title">Commits per month, 2026</span>
        <span className="ramp-legend">
          <span>
            <i className="sw sw-before" /> Solo
          </span>
          <span>
            <i className="sw sw-after" /> Parallel agents
          </span>
        </span>
      </figcaption>
      <div className="ramp-plot" onMouseLeave={() => setHover(null)}>
        {ai.ramp.map((d, i) => (
          <button
            key={d.month}
            type="button"
            className={`ramp-col ${i >= fromIdx ? "is-after" : ""} ${hover === i ? "is-hover" : ""}`}
            style={{ "--h": `${(d.value / max) * 100}%`, "--i": i }}
            onMouseEnter={() => setHover(i)}
            onFocus={() => setHover(i)}
            onBlur={() => setHover(null)}
            aria-label={`${d.month}: ${d.value} commits`}
          >
            <span className="ramp-bar" />
            {hover === i && (
              <span className="ramp-tip" role="tooltip">
                <strong>{d.value}</strong> in {d.month}
              </span>
            )}
            <span className="ramp-month">{d.month}</span>
          </button>
        ))}
      </div>
      <table className="sr-only">
        <caption>Commits per month, 2026</caption>
        <tbody>
          {ai.ramp.map((d) => (
            <tr key={d.month}>
              <th scope="row">{d.month}</th>
              <td>{d.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}

function Pipeline() {
  const [step, setStep] = useState(0);
  const onKeyDown = (e) => {
    const n = ai.steps.length;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      setStep((s) => (s + 1) % n);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      setStep((s) => (s - 1 + n) % n);
    }
  };
  const s = ai.steps[step];
  return (
    <div className="pipe glass">
      <div className="pipe-track" role="tablist" aria-label="How I ship with agents" onKeyDown={onKeyDown} style={{ "--step": step }}>
        <span className="pipe-line" aria-hidden="true">
          <span className="pipe-fill" />
          <span className="pipe-packet" />
        </span>
        {ai.steps.map((st, i) => (
          <button
            key={st.title}
            type="button"
            role="tab"
            id={`pipe-tab-${i}`}
            aria-selected={step === i}
            aria-controls="pipe-panel"
            tabIndex={step === i ? 0 : -1}
            className={`pipe-node ${i <= step ? "is-done" : ""} ${step === i ? "is-active" : ""}`}
            onClick={() => setStep(i)}
          >
            <span className="pipe-dot">{i + 1}</span>
            <span className="pipe-label">{st.title}</span>
          </button>
        ))}
      </div>
      <div className="pipe-panel" id="pipe-panel" role="tabpanel" aria-labelledby={`pipe-tab-${step}`} key={step}>
        <p>{s.text}</p>
        <pre>
          <code>{s.code}</code>
        </pre>
      </div>
    </div>
  );
}

export default function AI() {
  return (
    <section id="ai" className="section">
      <div className="container">
        <div className="ai-head">
          <Scramble as="h2" className="section-title display reveal" text="One engineer. A team of agents." />
          <p className="section-sub reveal" style={{ "--d": "80ms" }}>
            {ai.intro}
          </p>
        </div>
        <dl className="ai-stats">
          {ai.stats.map((st, i) => (
            <div key={st.label} className="reveal" style={{ "--d": `${i * 80}ms` }}>
              <dd>
                <CountUp value={st.value} suffix={st.suffix} />
              </dd>
              <dt>{st.label}</dt>
            </div>
          ))}
        </dl>
        <div className="ai-grid">
          <div className="reveal">
            <Pipeline />
          </div>
          <div className="reveal" style={{ "--d": "100ms" }}>
            <Ramp />
          </div>
        </div>
        <ul className="built">
          {ai.built.map((b, i) => (
            <li key={b.title} className="built-item reveal" style={{ "--d": `${(i % 3) * 70}ms` }}>
              <h3>{b.title}</h3>
              <p>{b.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
