import { readFileSync } from "node:fs";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { yearsOfExperience } from "./src/experience.js";

// Renders src/llms.txt with the current years of experience. Built into /llms.txt and served live in dev.
function llmsTxt() {
  const render = () => readFileSync("src/llms.txt", "utf8").replaceAll("{{YEARS}}", String(yearsOfExperience()));
  return {
    name: "llms-txt",
    configureServer(server) {
      server.middlewares.use("/llms.txt", (_req, res) => {
        res.setHeader("Content-Type", "text/plain; charset=utf-8");
        res.end(render());
      });
    },
    generateBundle() {
      this.emitFile({ type: "asset", fileName: "llms.txt", source: render() });
    },
  };
}

export default defineConfig({
  plugins: [react(), llmsTxt()],
  server: { port: 3000 },
});
