import { useState } from "react";
import face from "../assets/jiggy-face.png";
import photo from "../assets/jigar.jpg";
import { about, profile } from "../content";
import { Scramble } from "../effects";
import { Link } from "../router";
import Icon from "./Icon";

export default function About() {
  const [cartoon, setCartoon] = useState(false);
  return (
    <section id="about" className="section">
      <div className="container about">
        <div className="about-photo reveal">
          <button
            type="button"
            className={`photo-flip ${cartoon ? "is-flipped" : ""}`}
            onClick={() => setCartoon((c) => !c)}
            aria-pressed={cartoon}
            aria-label={cartoon ? "Show photo" : "Show cartoon version"}
          >
            <span className="photo-ring">
              <span className="photo-faces">
                <img className="face-photo" src={photo} alt={`Portrait of ${profile.name}`} loading="lazy" width="933" height="1400" />
                <span className="face-cartoon">
                  <img src={face} alt="" loading="lazy" width="480" height="480" />
                </span>
              </span>
            </span>
          </button>
          <span className="photo-tag">
            <span className="pulse" /> Hi, I&apos;m {profile.nickname}
            <span className="photo-hint">{cartoon ? "tap for the real me" : "tap me"}</span>
          </span>
        </div>
        <div className="about-copy">
          <Scramble as="h2" className="section-title reveal" text={about.lead} />
          <p className="about-body reveal" style={{ "--d": "80ms" }}>
            {about.body}
          </p>
          <ol className="path reveal" style={{ "--d": "160ms" }} aria-label="Career path">
            {about.timeline.map((t) => (
              <li key={t.company}>
                <span className="path-dot" />
                <span className="path-name">{t.company}</span>
                <span className="path-year">{t.years}</span>
              </li>
            ))}
          </ol>
          <Link href="/resume" className="text-link reveal" style={{ "--d": "220ms" }}>
            Full résumé <Icon name="arrow" size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
