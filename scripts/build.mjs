import { cp, mkdir, rm, copyFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const src = path.join(root, "src");
const dist = path.join(root, "dist");

await import("./generate-assets.mjs");

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
await cp(src, dist, { recursive: true });

const indexPath = path.join(dist, "index.html");
if (!existsSync(indexPath)) {
  throw new Error("Build failed: dist/index.html was not created.");
}

if (existsSync(path.join(root, "src", "assets", "tech-trend-logo.jpg"))) {
  await copyFile(
    path.join(root, "src", "assets", "tech-trend-logo.jpg"),
    path.join(dist, "favicon.jpg")
  );
}

console.log("Built static site into dist/");
