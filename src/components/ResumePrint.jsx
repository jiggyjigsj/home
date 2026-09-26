import { resume } from "../resume";

// Print layout rendered at /resume/print and saved to public/resume.pdf by `npm run resume:pdf`.
export default function ResumePrint() {
  return (
    <div className="rp">
      <header className="rp-head">
        <div>
          <h1>
            {resume.name.split(" ")[0]} <b>{resume.name.split(" ").slice(1).join(" ")}</b>
          </h1>
          <p className="rp-title">{resume.title}</p>
        </div>
        <ul className="rp-contact">
          <li>{resume.email}</li>
          <li>{resume.site}</li>
          <li>{resume.github}</li>
          <li>{resume.linkedin}</li>
          <li>{resume.location}</li>
        </ul>
      </header>
      <div className="rp-bar" />
      <p className="rp-summary">{resume.summary}</p>
      <ul className="rp-highlights">
        {resume.highlights.map((h) => (
          <li key={h.label}>
            <b>{h.value}</b>
            <span>{h.label}</span>
          </li>
        ))}
      </ul>

      <h2>Experience</h2>
      {resume.roles.filter((r) => !r.web).map((r) => (
        <section key={`${r.company}-${r.start}`} className="rp-role">
          <div className="rp-role-head">
            <h3>
              {r.company} <span>· {r.title}</span>
            </h3>
            <p>
              {r.start} – {r.end} · {r.place}
            </p>
          </div>
          <ul>
            {r.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </section>
      ))}

      <div className="rp-cols">
        <section>
          <h2>Skills</h2>
          <dl className="rp-skills">
            {resume.skills.map((s) => (
              <div key={s.group}>
                <dt>{s.group}</dt>
                <dd>{s.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </section>
        <section>
          <h2>Education</h2>
          {resume.education.map((e) => (
            <p className="rp-edu" key={e.school}>
              <b>{e.school}</b>
              <br />
              {e.degree} <span>· {e.years}</span>
            </p>
          ))}
        </section>
      </div>
    </div>
  );
}
