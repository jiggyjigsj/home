# jiggyjigs.me

Personal site for Jigar Patel. React + Vite, a WebGL background, served by nginx in Docker.

## Edit content
- Site copy, hire-me email template, ask-AI prompt: `src/content.js`
- Résumé (drives both `/resume` and the PDF): `src/resume.js`
- AI-readable profile: `public/llms.txt`

## Develop
```sh
npm install
npm run dev          # http://localhost:3000
npm run resume:pdf   # regenerate public/resume.pdf from /resume/print (needs Chrome; set CHROME_PATH if not on macOS)
```

## Docker
```sh
docker build -t jiggyjigs-home:local .
docker run -d --name jiggyjigs-home -p 3000:3000 jiggyjigs-home:local
```
The image runs nginx as a non-root user (uid 101) on port 3000 with SPA fallback and security headers (CSP, frame, referrer, and permissions policies), so the manifests in `k8s/` work unchanged.

## CI/CD
`.github/workflows/docker-publish.yml` audits dependencies, builds the site, and scans the image with Trivy (fails on fixable HIGH/CRITICAL). On pushes to `master` and `v*.*.*` tags it publishes a multi-arch image to `ghcr.io/jiggyjigsj/home` (tags: `master`, `latest`, `sha-<short>`, semver) with SBOM and provenance, then signs it with cosign. A weekly run rebuilds on fresh base images. Dependabot opens weekly PRs for npm, Docker, and Actions updates. Deployment is left to CD.
