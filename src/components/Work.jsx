import { useMemo, useRef, useState } from "react";
import { features } from "../content";
import { Scramble, tilt } from "../effects";
import Icon from "./Icon";

function Card({ f, i }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <li className="rail-item" style={{ "--i": i }}>
      <button
        type="button"
        className={`fcard tag-${f.tag.toLowerCase()} ${flipped ? "is-flipped" : ""}`}
        onClick={() => setFlipped((v) => !v)}
        aria-pressed={flipped}
        aria-label={`${f.title}. ${flipped ? f.detail : f.summary} Press to ${flipped ? "hide" : "show"} details.`}
        {...tilt}
      >
        <span className="fcard-inner" aria-hidden="true">
          <span className="fcard-face fcard-front">
            <span className="fcard-tag">{f.tag}</span>
            <span className="fcard-title">{f.title}</span>
            <span className="fcard-summary">{f.summary}</span>
            <span className="fcard-more">
              How <Icon name="plus" size={14} />
            </span>
          </span>
          <span className="fcard-face fcard-back">
            <span className="fcard-detail">{f.detail}</span>
            <span className="fcard-stack">
              {f.stack.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </span>
          </span>
        </span>
      </button>
    </li>
  );
}

export default function Work() {
  const tags = useMemo(() => ["All", ...new Set(features.map((f) => f.tag))], []);
  const [filter, setFilter] = useState("All");
  const railRef = useRef(null);
  const shown = features.filter((f) => filter === "All" || f.tag === filter);

  const scrollBy = (dir) => {
    const rail = railRef.current;
    rail.scrollBy({ left: dir * Math.min(rail.clientWidth * 0.8, 720), behavior: "smooth" });
  };

  // Drag to scroll with a mouse; touch and trackpads already scroll natively.
  const drag = useRef(null);
  const onPointerDown = (e) => {
    if (e.pointerType !== "mouse") return;
    drag.current = { x: e.clientX, left: railRef.current.scrollLeft, moved: false };
  };
  const onPointerMove = (e) => {
    if (!drag.current) return;
    const dx = e.clientX - drag.current.x;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    railRef.current.scrollLeft = drag.current.left - dx;
  };
  const endDrag = () => setTimeout(() => (drag.current = null), 0);
  const onClickCapture = (e) => {
    if (drag.current?.moved) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  return (
    <section id="work" className="section">
      <div className="container">
        <div className="section-head row">
          <Scramble as="h2" className="section-title reveal" text="Things I've shipped" />
          <div className="rail-nav reveal">
            <button type="button" className="icon-btn icon-btn-line" onClick={() => scrollBy(-1)} aria-label="Scroll left">
              <Icon name="arrow" size={18} style={{ transform: "rotate(180deg)" }} />
            </button>
            <button type="button" className="icon-btn icon-btn-line" onClick={() => scrollBy(1)} aria-label="Scroll right">
              <Icon name="arrow" size={18} />
            </button>
          </div>
        </div>
        <div className="filters reveal" role="group" aria-label="Filter by area">
          {tags.map((t) => (
            <button
              key={t}
              type="button"
              className={`filter ${filter === t ? "is-active" : ""}`}
              aria-pressed={filter === t}
              onClick={() => {
                setFilter(t);
                railRef.current.scrollTo({ left: 0 });
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      <ul
        className="rail"
        ref={railRef}
        key={filter}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onClickCapture={onClickCapture}
      >
        {shown.map((f, i) => (
          <Card key={f.title} f={f} i={i} />
        ))}
      </ul>
    </section>
  );
}
