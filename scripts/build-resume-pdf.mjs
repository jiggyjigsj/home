// Renders /resume/print with headless Chrome and saves it as public/resume.pdf.
// Usage: npm run resume:pdf   (set CHROME_PATH if Chrome isn't in the default macOS location)
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";

const root = fileURLToPath(new URL("..", import.meta.url));
const port = 4173;
const chrome = process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const server = spawn("npx", ["vite", "--port", String(port), "--strictPort"], { cwd: root, stdio: "pipe" });
await new Promise((resolve, reject) => {
  server.stdout.on("data", (d) => d.toString().includes("Local") && resolve());
  server.on("exit", (code) => reject(new Error(`vite exited with ${code}`)));
});

try {
  const browser = await puppeteer.launch({ executablePath: chrome, headless: "new" });
  const page = await browser.newPage();
  await page.goto(`http://localhost:${port}/resume/print`, { waitUntil: "networkidle0" });
  await page.evaluateHandle("document.fonts.ready");
  await page.pdf({ path: `${root}/public/resume.pdf`, format: "letter", printBackground: true, preferCSSPageSize: true });
  await browser.close();
  console.log("wrote public/resume.pdf");
} finally {
  server.kill();
}
