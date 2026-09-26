// Renders /resume/print with headless Chrome and saves it as public/resume.pdf.
// Usage: npm run resume:pdf   (set CHROME_PATH if Chrome isn't in the default macOS location)
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";
import { createServer } from "vite";

const root = fileURLToPath(new URL("..", import.meta.url));
const chrome = process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

// Run Vite in-process so closing it leaves nothing behind (a spawned npx child can outlive kill()).
const server = await createServer({ root, logLevel: "error", server: { port: 4173, strictPort: false } });
await server.listen();
const url = server.resolvedUrls.local[0];

let browser;
try {
  browser = await puppeteer.launch({ executablePath: chrome, headless: "new", args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.goto(new URL("resume/print", url).href, { waitUntil: "networkidle0", timeout: 60_000 });
  await page.evaluateHandle("document.fonts.ready");
  await page.pdf({ path: `${root}/public/resume.pdf`, format: "letter", printBackground: true, preferCSSPageSize: true });
  console.log("wrote public/resume.pdf");
} finally {
  await browser?.close();
  await server.close();
}
