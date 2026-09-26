import { impact, tools } from "../content";
import { CountUp } from "../effects";

export default function Impact() {
  const row = [...tools, ...tools];
  return (
    <section id="impact" className="impact">
      <div className="container">
        <dl className="impact-grid">
          {impact.map((s, i) => (
            <div key={s.label} className="impact-item reveal" style={{ "--d": `${i * 90}ms` }}>
              <dd>
                <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} />
              </dd>
              <dt>{s.label}</dt>
            </div>
          ))}
        </dl>
      </div>
      <div className="marquee" aria-label="Tools I use">
        <ul className="marquee-track">
          {row.map((t, i) => (
            <li key={i} aria-hidden={i >= tools.length ? "true" : undefined}>
              {t}
            </li>
          ))}
        </ul>
        <ul className="marquee-track marquee-rev" aria-hidden="true">
          {[...row].reverse().map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
