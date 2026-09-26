import { useState } from "react";
import { contact, hireMailto, profile, socials } from "../content";
import { magnetic, Scramble } from "../effects";
import { Link } from "../router";
import AskAI from "./AskAI";
import Icon from "./Icon";
import Logo from "./Logo";

export function Footer({ onOpenPalette }) {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <Logo />
        <p className="footer-note">© {new Date().getFullYear()} {profile.name}. Built with a few agents, served from a container.</p>
        <button type="button" className="kbd-btn footer-kbd" onClick={onOpenPalette}>
          <kbd>⌘</kbd>
          <kbd>K</kbd> jump anywhere
        </button>
        <div className="social-row">
          {socials.map((s) => (
            <a key={s.label} className="icon-btn" href={s.url} target="_blank" rel="noreferrer" aria-label={s.label}>
              <Icon name={s.icon} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (e) {
      window.location.href = hireMailto;
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="container contact-inner">
        <Scramble as="h2" className="contact-title reveal" text={contact.heading} />
        <p className="contact-msg reveal" style={{ "--d": "80ms" }}>
          {contact.message}
        </p>
        <a className="contact-email reveal" style={{ "--d": "140ms" }} href={hireMailto}>
          {profile.email}
        </a>
        <div className="contact-actions reveal" style={{ "--d": "200ms" }}>
          <a className="btn btn-primary btn-lg" href={hireMailto} {...magnetic}>
            <Icon name="mail" size={18} /> Hire me
          </a>
          <button type="button" className="btn btn-ghost btn-lg" onClick={copy} aria-live="polite" {...magnetic}>
            <Icon name={copied ? "check" : "copy"} size={18} /> {copied ? "Email copied" : "Copy email"}
          </button>
          <Link className="btn btn-ghost btn-lg" href="/resume" {...magnetic}>
            <Icon name="file" size={18} /> View résumé
          </Link>
        </div>
        <div className="reveal" style={{ "--d": "260ms" }}>
          <AskAI compact />
        </div>
      </div>
    </section>
  );
}
