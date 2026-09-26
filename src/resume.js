import { years } from "./experience";

// Single source of truth for the /resume page and the generated PDF (npm run resume:pdf).

export const resume = {
  name: "Jigar Patel",
  title: "Head of Platform Engineering",
  location: "Austin, TX",
  email: "jobs@jiggyjigs.me",
  site: "jiggyjigs.me",
  github: "github.com/jiggyjigsj",
  linkedin: "linkedin.com/in/jiggyjigsj",
  summary:
    `Platform engineer with ${years}+ years building and running cloud infrastructure, from 1,000-server Chef fleets to multi-cloud Kubernetes. Today I lead platform engineering at Cooklist, running the infrastructure behind agentic AI for grocery, and ship it with a team of coding agents.`,
  highlights: [
    { value: "90%", label: "shorter deploy lead time" },
    { value: "$216K", label: "saved per year in eng hours" },
    { value: "200+", label: "Kubernetes clusters patched weekly" },
    { value: "2×", label: "merged PRs/month with AI agents" },
  ],
  roles: [
    {
      company: "Cooklist",
      title: "Head of Platform Engineering",
      place: "Austin, TX",
      start: "Dec 2025",
      end: "Present",
      tags: ["GKE", "Terraform", "Helm", "KEDA", "AI agents"],
      bullets: [
        "Own the GKE platform behind agentic search and AI chat for enterprise grocery retailers across production, staging, and DR.",
        "Roughly doubled merged PRs per month by running coding agents in parallel worktrees behind strict merge and staging guardrails; authored 15 reusable agent skills.",
        "Built Chef, a hosted Hermes agent in Slack with intake, engineering, review, and knowledge roles, plus a knowledge skill that turns Slack threads and merged PRs into docs updates with decision markers.",
        "Built per-PR ephemeral environments with pre-seeded Postgres images, and a trunk-based release pipeline with migration gates and a guarded hotfix lane.",
        "Shipped an LLM-reviewed migration check that flags locking risk and recommends deploy timing on every pull request.",
        "Scaled AI workloads on queue backlog and custom metrics with KEDA and HPA, moved agentic search to FastAPI, and cut traffic over to a Traefik Gateway behind Cloud Armor with zero downtime.",
        "Lead SOC 2 readiness and enterprise security reviews: SSO with group-synced permissions, keyless CI via Workload Identity Federation, and customer security questionnaires.",
      ],
    },
    {
      company: "Pager",
      title: "Lead Platform Engineer",
      place: "Chicago, IL",
      start: "May 2022",
      end: "Nov 2025",
      tags: ["GCP", "Harness", "Terraform", "CloudSQL", "Team lead"],
      bullets: [
        "Led a team of five platform engineers, owning SLAs, mentoring, and performance growth.",
        "Migrated 60 services to a modern continuous deployment platform, cutting deploy lead time 90% and saving 1,800 hours ($216K) a year.",
        "Led the move from Spinnaker to Harness with canary and blue/green releases, and drove on-prem to GCP migration including containerized .NET workloads.",
        "Moved PostgreSQL to CloudSQL, saving $80K+ in compute and cutting p95 latency 50% and p75 73%.",
        "Delivered $113K/year in cloud savings through disk cleanup and storage right-sizing; migrated MongoDB to Atlas for 7% lower cost.",
        "Kept the platform HIPAA and SOC 2 compliant, and added production alerting on 14 criteria to shorten incident response.",
      ],
      // Web-only: shown on /resume, left off the one-page PDF.
      extra: [
        "Upgraded 19 NodeJS services and libraries for a major MongoDB Atlas version, rewriting connectivity and removing deprecated code through production.",
        "Streamlined database version management and backup/restore, saving $9,600 a year in lower environments.",
      ],
    },
    {
      company: "Cerner",
      title: "Senior Site Reliability Engineer",
      place: "Chicago, IL",
      start: "Oct 2021",
      end: "Jun 2022",
      tags: ["Kubernetes", "OpenStack", "vSphere", "EKS"],
      bullets: [
        "Ran weekly patching for 200+ Kubernetes clusters across Department of Defense, Veterans Affairs, and on-prem environments.",
        "Wrote infrastructure as code to deploy Kubernetes on vSphere, OpenStack, AWS EC2, and EKS.",
      ],
    },
    {
      company: "Zebra Technologies",
      title: "Senior DevOps Engineer",
      place: "Chicago, IL",
      start: "Jul 2021",
      end: "Oct 2021",
      tags: ["Dynatrace", "Observability", "CI/CD"],
      bullets: [
        "Rolled out Dynatrace observability across Kubernetes, compute, and a large microservices estate, wired into CI/CD for deploy tracking.",
      ],
    },
    {
      company: "Cerner",
      title: "Senior System Engineer",
      place: "Kansas City, MO",
      start: "Oct 2019",
      end: "Jul 2021",
      tags: ["Kubernetes", "Helm", "Terraform"],
      bullets: [
        "Built Kubernetes on vSphere, OpenStack, EC2, and EKS; maintained the base Helm charts and a caching proxy for client-hosted appliances.",
        "Provided 24/7 production support for DoD, VA, and on-prem clusters.",
      ],
    },
    {
      company: "Cerner",
      title: "System Engineer",
      place: "Kansas City, MO",
      start: "May 2017",
      end: "Oct 2019",
      tags: ["Chef", "Linux", "Jenkins"],
      bullets: [
        "Configured and maintained 1,000+ production RHEL and Oracle Linux servers with Chef and Jenkins, and ran vulnerability patching.",
      ],
    },
    {
      company: "AT&T",
      title: "Queue Manager & PHP / SQL Developer",
      place: "Arlington Heights, IL",
      start: "May 2015",
      end: "Jun 2016",
      tags: ["PHP", "SQL", "Support"],
      web: true,
      bullets: [
        "Built and ran a database-driven site for managers handling ticket data from work centers worldwide, while leading onboarding and high-priority escalations.",
      ],
    },
  ],
  skills: [
    { group: "Cloud", items: ["GCP", "AWS", "Azure", "OCI", "OpenStack", "vSphere"] },
    { group: "Platform", items: ["Kubernetes", "Helm", "KEDA", "Terraform", "Ansible", "Chef"] },
    { group: "Delivery", items: ["GitHub Actions", "Argo CD", "ARC", "Harness", "Spinnaker"] },
    { group: "Observability", items: ["Prometheus", "Datadog", "Sentry", "Dynatrace", "k6"] },
    { group: "AI", items: ["Claude Code", "Codex", "MCP", "Agent skills", "Gemini"] },
    { group: "Languages", items: ["Python", "Bash", "TypeScript", "Ruby", "SQL"] },
  ],
  education: [
    { school: "Illinois Institute of Technology", degree: "B.S. Information Technology & Management", years: "2014 – 2016" },
    { school: "Harper College", degree: "A.S. Information Technology", years: "2012 – 2014" },
  ],
};
