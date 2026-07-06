import { readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
await import("./generate-assets.mjs");

const index = await readFile(path.join(root, "src", "index.html"), "utf8");
const css = await readFile(path.join(root, "src", "styles.css"), "utf8");
const llms = await readFile(path.join(root, "src", "llms.txt"), "utf8");

const required = [
  "Tech Trend Mobile BZ",
  "+501 656-9915",
  "1224 Blue Marlin Drive",
  "iPhone 14 128GB",
  "iPhone 12 128GB",
  "iPhone X",
  "Countrywide shipping",
  "60 days warranty",
  "wa.me/5016569915",
  "rel=\"canonical\" href=\"https://techtrend.silvatech.bz/\"",
  "application/ld+json",
  "twitter:card",
  "og:image:alt",
  "facebook.com/sharer/sharer.php",
  "https://instagram.com/techtrend100",
  "techtrend-site-qr.svg",
  "download=\"techtrend-mobile-bz-qr.svg\""
];

const missing = required.filter((term) => !index.includes(term));
if (missing.length) {
  throw new Error(`Missing required content: ${missing.join(", ")}`);
}

if (/font-size:\s*calc\([^;]*vw/i.test(css)) {
  throw new Error("Viewport-scaled font sizes are not allowed.");
}

if (/radial-gradient/i.test(css)) {
  throw new Error("Decorative radial gradients are not allowed.");
}

if (!llms.includes("Current public catalog snapshot")) {
  throw new Error("llms.txt is missing the catalog summary.");
}

const jsonLdBlocks = [...index.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
if (!jsonLdBlocks.length) {
  throw new Error("Missing JSON-LD block.");
}

for (const [, block] of jsonLdBlocks) {
  JSON.parse(block);
}

for (const asset of [
  "tech-trend-logo.jpg",
  "facebook-feature.jpg",
  "facebook-product-1.jpg",
  "facebook-product-2.jpg",
  "techtrend-site-qr.svg",
  "social-card.svg",
  "social-card.png"
]) {
  const info = await stat(path.join(root, "src", "assets", asset));
  if (!info.size) throw new Error(`Asset is empty: ${asset}`);
}

console.log("Validation passed.");
