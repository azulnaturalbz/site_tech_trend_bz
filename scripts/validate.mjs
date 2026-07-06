import { readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const index = await readFile(path.join(root, "src", "index.html"), "utf8");
const css = await readFile(path.join(root, "src", "styles.css"), "utf8");

const required = [
  "Tech Trend Mobile BZ",
  "+501 656-9915",
  "1224 Blue Marlin Drive",
  "iPhone 14 128GB",
  "iPhone 12 128GB",
  "iPhone X",
  "Countrywide shipping",
  "60 days warranty",
  "wa.me/5016569915"
];

const missing = required.filter((term) => !index.includes(term));
if (missing.length) {
  throw new Error(`Missing required content: ${missing.join(", ")}`);
}

if (/font-size:\s*calc\([^;]*vw/i.test(css)) {
  throw new Error("Viewport-scaled font sizes are not allowed.");
}

for (const asset of [
  "tech-trend-logo.jpg",
  "facebook-feature.jpg",
  "facebook-product-1.jpg",
  "facebook-product-2.jpg"
]) {
  const info = await stat(path.join(root, "src", "assets", asset));
  if (!info.size) throw new Error(`Asset is empty: ${asset}`);
}

console.log("Validation passed.");
