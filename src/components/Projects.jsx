import { projects } from "../content";
import { Scramble, tilt } from "../effects";
import Icon from "./Icon";

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="section-head">
          <Scramble as="h2" className="section-title reveal" text="After hours" />
        </div>
        <div className="projects">
          {projects.map((p, i) => {
            const Tag = p.url ? "a" : "div";
            return (
              <Tag
                key={p.title}
                className={`project glass reveal ${p.url ? "is-link" : ""}`}
                style={{ "--d": `${i * 70}ms` }}
                {...(p.url ? { href: p.url, target: "_blank", rel: "noreferrer" } : {})}
                {...tilt}
              >
                <div className="project-head">
                  <h3>{p.title}</h3>
                  {p.url ? (
                    <span className="project-arrow" aria-label="Open on GitHub">
                      <Icon name="arrowUpRight" size={16} />
                    </span>
                  ) : (
                    <span className="project-private">Private</span>
                  )}
                </div>
                <p>{p.text}</p>
                <div className="chips">
                  {p.stack.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
              </Tag>
            );
          })}
        </div>
      </div>
    </section>
  );
}
