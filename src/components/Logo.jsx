import { Link } from "../router";

export default function Logo() {
  return (
    <Link href="/#top" className="logo" aria-label="Jigar Patel, home">
      <svg viewBox="0 0 64 64" width="32" height="32" aria-hidden="true">
        <defs>
          <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#c6f432" />
            <stop offset="1" stopColor="#19e6c1" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="18" fill="url(#lg)" />
        <path d="M36 16v22a10 10 0 0 1-17.3 6.8" fill="none" stroke="#050607" strokeWidth="7" strokeLinecap="round" />
        <circle cx="46" cy="44" r="4.5" fill="#050607" />
      </svg>
      <span className="logo-word">jiggy</span>
    </Link>
  );
}
