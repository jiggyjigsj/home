// All the editable copy for the site lives here. Résumé data lives in resume.js.

export const profile = {
  name: "Jigar Patel",
  nickname: "Jiggy",
  role: "Lead Platform Engineer",
  company: "Cooklist",
  email: "jobs@jiggyjigs.me",
  availability: "Open to Senior, Staff & Lead roles",
  tagline: "I run the Kubernetes platform behind an AI grocery product, and ship it with a team of agents.",
};

const hireBody = `Hi Jigar,

I found jiggyjigs.me and would love to talk about a role on our team.

Company:
Role:
Team size:
What we're trying to solve:

Are you free for a quick call this week?

Thanks,
`;

export const hireMailto = `mailto:${profile.email}?subject=${encodeURIComponent(
  "Let's talk about a platform role"
)}&body=${encodeURIComponent(hireBody)}`;

// "Ask an AI about me", the same pattern cooklist.com uses, pointed at /llms.txt.
export const askPrompt =
  "Based on what you know about my team, how could Jigar Patel's platform engineering and AI agent experience help us? Check jiggyjigs.me/llms.txt for reference";

const q = encodeURIComponent(askPrompt);
export const askAI = [
  { label: "ChatGPT", url: `https://chat.openai.com/?q=${q}` },
  { label: "Claude", url: `https://claude.ai/new?q=${q}` },
  { label: "Gemini", url: `https://www.google.com/search?udm=50&q=${q}` },
  { label: "Grok", url: `https://grok.com/?q=${q}` },
];

export const socials = [
  { label: "GitHub", icon: "github", url: "https://github.com/jiggyjigsj" },
  { label: "LinkedIn", icon: "linkedin", url: "https://www.linkedin.com/in/jiggyjigsj/" },
  { label: "Instagram", icon: "instagram", url: "https://www.instagram.com/jiggyjigsj/" },
];

export const nav = [
  { label: "About", href: "/#about" },
  { label: "Work", href: "/#work" },
  { label: "AI", href: "/#ai" },
  { label: "Résumé", href: "/resume" },
  { label: "Contact", href: "/#contact" },
];

export const impact = [
  { value: 90, suffix: "%", label: "shorter deploy lead time" },
  { value: 216, prefix: "$", suffix: "K", label: "saved a year in eng hours" },
  { value: 200, suffix: "+", label: "Kubernetes clusters patched weekly" },
  { value: 2, suffix: "×", label: "merged PRs a month with agents" },
];

export const about = {
  lead: "I make the platform the least interesting part of your day.",
  body: "Nine years of keeping infrastructure boring: 1,000-server fleets, 200+ Kubernetes clusters for DoD and VA, a platform team at Pager, and now the GKE platform behind Cooklist's agentic AI for grocery.",
  timeline: [
    { company: "Cerner", years: "2017" },
    { company: "Zebra", years: "2021" },
    { company: "Pager", years: "2022" },
    { company: "Cooklist", years: "2025" },
  ],
};

// Things I've shipped. tag drives the filter chips.
export const features = [
  {
    tag: "AI",
    title: "LLM-reviewed migrations",
    summary: "Know if a migration will lock prod before you merge.",
    detail: "Lock detection and live table sizes, then a Gemini verdict on deploy timing, posted on every PR. Idea to CI in six days.",
    stack: ["Python", "Postgres", "Gemini"],
  },
  {
    tag: "Platform",
    title: "An environment per PR",
    summary: "Every pull request gets its own namespace, database, and workers.",
    detail: "Helm release per PR with pre-seeded Postgres images promoted by digest. Review the real thing, then tear it down.",
    stack: ["Helm", "GKE", "Actions"],
  },
  {
    tag: "Platform",
    title: "Queue-aware autoscaling",
    summary: "Scale on real backlog, not CPU guesses.",
    detail: "KEDA on Redis streams and Pub/Sub, HPA on custom Prometheus metrics, and split health probes so one bad worker can't take the API down.",
    stack: ["KEDA", "HPA", "Prometheus"],
  },
  {
    tag: "AI",
    title: "Agentic search on ASGI",
    summary: "Re-platformed AI search onto FastAPI and load-proved it.",
    detail: "Concurrency gates, worker recycling, and a documented capacity envelope before enterprise launches.",
    stack: ["FastAPI", "Uvicorn", "k6"],
  },
  {
    tag: "Platform",
    title: "Zero-downtime cutover",
    summary: "Moved prod to a Traefik Gateway behind Cloud Armor. Nobody noticed.",
    detail: "Weighted DNS, Cloud Armor policies in Terraform, request logging, and a redirect service that kept legacy domains alive.",
    stack: ["Traefik", "Cloud Armor", "DNS"],
  },
  {
    tag: "Delivery",
    title: "90% faster deploys",
    summary: "60 services onto modern CD at Pager. 1,800 hours saved a year.",
    detail: "Spinnaker to Harness with canary and blue/green releases, worth about $216K a year in engineering time.",
    stack: ["Harness", "GCP", "Canary"],
  },
  {
    tag: "Delivery",
    title: "Self-hosted CI on spot",
    summary: "Faster, cheaper CI with scanning and release guardrails built in.",
    detail: "ARC runners on GKE spot nodes, weekly-baked images, 8-way parallel tests, Trivy, Renovate, and guarded hotfixes.",
    stack: ["ARC", "Trivy", "Renovate"],
  },
  {
    tag: "Security",
    title: "Enterprise SSO",
    summary: "Customer groups mapped straight into app permissions.",
    detail: "Auth0 and Entra group sync, permission audits, Cloud Armor rate limits, and keyless CI with Workload Identity.",
    stack: ["Auth0", "Entra ID", "GCP"],
  },
  {
    tag: "Delivery",
    title: "Half the p95",
    summary: "PostgreSQL to CloudSQL: p95 down 50%, $80K saved.",
    detail: "Planned and executed the data store migration at Pager, with p75 latency down 73%.",
    stack: ["CloudSQL", "Postgres"],
  },
];

export const ai = {
  intro: "Paved roads and guardrails for agents, then run them in parallel.",
  stats: [
    { value: 2, suffix: "×", label: "merged PRs a month" },
    { value: 63, suffix: "%", label: "PRs co-authored with AI" },
    { value: 45, label: "parallel worktrees" },
    { value: 15, label: "custom agent skills" },
  ],
  // My commits per month in 2026, across work repos. Agents went parallel in June.
  ramp: [
    { month: "Jan", value: 136 },
    { month: "Feb", value: 24 },
    { month: "Mar", value: 55 },
    { month: "Apr", value: 89 },
    { month: "May", value: 61 },
    { month: "Jun", value: 227 },
    { month: "Jul", value: 294 },
    { month: "Aug", value: 243 },
    { month: "Sep", value: 345 },
  ],
  rampFrom: "Jun",
  steps: [
    {
      title: "Brief",
      text: "Every repo ships an AGENTS.md, so agents start with a new hire's context.",
      code: "$ make install-skills\nlinked 15 skills → claude, codex",
    },
    {
      title: "Fan out",
      text: "One ticket, one worktree, one agent. Sub-agents research, test, and review in parallel.",
      code: "~/github/wt/\n├─ hpa-custom-metric/\n├─ arc-runner-recovery/\n└─ sso-permission-audit/",
    },
    {
      title: "Verify",
      text: "Read-only first. AI reviewers on every PR, resolved with evidence.",
      code: "ci passed       ✓\ndeployed        ✓\nlive-validated  ✓",
    },
    {
      title: "Ship",
      text: "Staging before prod. Nothing merges without a human yes.",
      code: "# AGENTS.md\nNEVER MERGE WITHOUT ASKING FIRST.",
    },
  ],
  built: [
    { title: "Incident copilot", text: "Read-only triage across k8s, Datadog, Sentry, and deploys." },
    { title: "Migration judge", text: "Facts plus an LLM verdict on how to ship each migration." },
    { title: "Postmortem drafter", text: "Slack threads and alerts into a finished postmortem." },
    { title: "Hermes", text: "Ops agent for alert triage and weekly docs curation." },
    { title: "Chat harness", text: "Proves AI chat streams end to end after every release." },
    { title: "Park & pickup", text: "Hand work between sessions and agents without losing context." },
  ],
  terminal: [
    "2× merged PRs a month since agents went parallel",
    "63% of merged PRs co-authored with AI",
    "rule #1: never merge without asking first",
  ],
};

export const tools = [
  "Kubernetes", "GKE", "Terraform", "Helm", "KEDA", "Prometheus", "Datadog", "Sentry", "GitHub Actions",
  "Cloud Run", "AlloyDB", "Pub/Sub", "AWS", "Claude Code", "Codex", "MCP", "Gemini", "FastAPI", "Python", "Bash",
];

export const toolkit = [
  { title: "Cloud", items: ["GKE", "Cloud Run", "AlloyDB", "AWS"] },
  { title: "Delivery", items: ["Terraform", "Helm", "GitHub Actions", "ARC"] },
  { title: "Scaling", items: ["KEDA", "Prometheus", "Datadog", "k6"] },
  { title: "AI", items: ["Claude Code", "Codex", "MCP", "Gemini"] },
];

export const projects = [
  {
    title: "Homelab",
    text: "~40 self-hosted services behind SSO, with backups that fail closed.",
    stack: ["Docker", "Helm", "pfSense"],
    url: "https://github.com/jiggyjigsj/deployer",
  },
  {
    title: "InfraScope",
    text: "Maps a GCP project, load-tests it, and answers questions via an AI agent.",
    stack: ["Next.js", "FastAPI", "Gemini"],
  },
  {
    title: "playpen",
    text: "File encryption CLI with keys in GCP Secret Manager.",
    stack: ["Python", "GPG"],
  },
  {
    title: "containers",
    text: "The custom images I reach for every day.",
    stack: ["Docker", "Actions"],
    url: "https://github.com/jiggyjigsj/containers",
  },
];

export const contact = {
  heading: "Let's build something that never pages you.",
  message: "Senior, Staff, and Lead roles in platform, SRE, and AI infrastructure.",
};
