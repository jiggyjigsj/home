import { hireMailto, profile, socials } from "../content";
import { magnetic } from "../effects";
import { Link } from "../router";
import AskAI from "./AskAI";
import Icon from "./Icon";
import Terminal from "./Terminal";

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="container hero-inner">
        <div className="hero-copy intro">
          <a href={hireMailto} className="badge">
            <span className="pulse" />
            {profile.availability}
          </a>
          <h1 className="hero-title">
            <span className="line">Platforms that</span>
            <span className="line">stay boring.</span>
            <span className="line grad">Shipped at</span>
            <span className="line grad">agent speed.</span>
          </h1>
          <p className="hero-sub">
            {profile.name}, {profile.role} at {profile.company}.
          </p>
          <div className="hero-ctas">
            <a className="btn btn-primary btn-lg" href={hireMailto} {...magnetic}>
              <Icon name="mail" size={18} /> Hire me
            </a>
            <Link className="btn btn-ghost btn-lg" href="/resume" {...magnetic}>
              <Icon name="file" size={18} /> View résumé
            </Link>
          </div>
          <div className="hero-foot">
            <div className="social-row">
              {socials.map((s) => (
                <a key={s.label} className="icon-btn" href={s.url} target="_blank" rel="noreferrer" aria-label={s.label}>
                  <Icon name={s.icon} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="hero-visual intro">
          <Terminal />
          <AskAI />
        </div>
      </div>
      <a href="#impact" className="scroll-cue" aria-label="Scroll to impact">
        <span />
      </a>
    </section>
  );
}
