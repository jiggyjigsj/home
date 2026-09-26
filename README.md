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
The image serves the static build on port 3000 with SPA fallback, so the manifests in `k8s/` work unchanged.
