import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import QRCode from "qrcode";

const root = process.cwd();
const assetsDir = path.join(root, "src", "assets");
const siteUrl = "https://techtrend.silvatech.bz/";
const logoPath = path.join(assetsDir, "tech-trend-logo.jpg");
const featurePath = path.join(assetsDir, "facebook-feature.jpg");

await mkdir(assetsDir, { recursive: true });

const logoBase64 = (await readFile(logoPath)).toString("base64");
const featureBase64 = (await readFile(featurePath)).toString("base64");

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function buildQrSvg() {
  const qr = QRCode.create(siteUrl, { errorCorrectionLevel: "H" });
  const margin = 4;
  const moduleCount = qr.modules.size;
  const total = moduleCount + margin * 2;
  const cells = [];

  for (let row = 0; row < moduleCount; row += 1) {
    for (let col = 0; col < moduleCount; col += 1) {
      if (qr.modules.get(row, col)) {
        cells.push(`M${col + margin} ${row + margin}h1v1h-1z`);
      }
    }
  }

  const badgeSize = Math.round(total * 0.24);
  const badgeX = (total - badgeSize) / 2;
  const logoInset = badgeSize * 0.13;
  const logoX = badgeX + logoInset;
  const logoSize = badgeSize - logoInset * 2;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${total} ${total}" width="1200" height="1200" role="img" aria-labelledby="qrTitle qrDesc">
  <title id="qrTitle">Tech Trend Mobile BZ website QR code</title>
  <desc id="qrDesc">Scan to open ${escapeXml(siteUrl)}</desc>
  <rect width="${total}" height="${total}" fill="#ffffff"/>
  <path d="${cells.join("")}" fill="#15161a" shape-rendering="crispEdges"/>
  <rect x="${badgeX}" y="${badgeX}" width="${badgeSize}" height="${badgeSize}" rx="${total * 0.035}" fill="#ffffff"/>
  <rect x="${badgeX + total * 0.01}" y="${badgeX + total * 0.01}" width="${badgeSize - total * 0.02}" height="${badgeSize - total * 0.02}" rx="${total * 0.028}" fill="#f7f8f6" stroke="#d7dde2" stroke-width="0.45"/>
  <image href="data:image/jpeg;base64,${logoBase64}" x="${logoX}" y="${logoX}" width="${logoSize}" height="${logoSize}" preserveAspectRatio="xMidYMid slice"/>
</svg>
`;
}

function buildSocialCardSvg() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-labelledby="cardTitle cardDesc">
  <title id="cardTitle">Tech Trend Mobile BZ social preview</title>
  <desc id="cardDesc">Pre-loved iPhones and Samsung Galaxy phones in Belize City with warranty and countrywide shipping.</desc>
  <defs>
    <clipPath id="logoClip"><rect x="78" y="76" width="92" height="92" rx="18"/></clipPath>
    <clipPath id="photoClip"><rect x="760" y="0" width="440" height="630"/></clipPath>
  </defs>
  <rect width="1200" height="630" fill="#f7f8f6"/>
  <image href="data:image/jpeg;base64,${featureBase64}" x="760" y="0" width="440" height="630" preserveAspectRatio="xMidYMid slice" clip-path="url(#photoClip)"/>
  <rect x="720" y="0" width="80" height="630" fill="#f7f8f6"/>
  <rect x="760" y="0" width="440" height="630" fill="#111820" opacity="0.08"/>
  <rect x="64" y="62" width="120" height="120" rx="24" fill="#ffffff" stroke="#d7dde2"/>
  <image href="data:image/jpeg;base64,${logoBase64}" x="78" y="76" width="92" height="92" preserveAspectRatio="xMidYMid slice" clip-path="url(#logoClip)"/>
  <text x="214" y="116" fill="#15161a" font-family="Open Sans, Arial, sans-serif" font-size="38" font-weight="800">Tech Trend Mobile BZ</text>
  <text x="214" y="158" fill="#4f5c68" font-family="Open Sans, Arial, sans-serif" font-size="25" font-weight="700">Belize City mobile phone shop</text>
  <text x="64" y="282" fill="#15161a" font-family="Open Sans, Arial, sans-serif" font-size="60" font-weight="900">Tested iPhones and</text>
  <text x="64" y="350" fill="#15161a" font-family="Open Sans, Arial, sans-serif" font-size="60" font-weight="900">Samsung phones</text>
  <text x="64" y="414" fill="#2f3a42" font-family="Open Sans, Arial, sans-serif" font-size="28" font-weight="700">Warranty included. Pickup and delivery.</text>
  <text x="64" y="452" fill="#2f3a42" font-family="Open Sans, Arial, sans-serif" font-size="28" font-weight="700">Countrywide shipping available.</text>
  <rect x="64" y="500" width="376" height="58" rx="8" fill="#1d7b46"/>
  <text x="94" y="538" fill="#ffffff" font-family="Open Sans, Arial, sans-serif" font-size="25" font-weight="900">WhatsApp +501 656-9915</text>
  <text x="470" y="538" fill="#15161a" font-family="Open Sans, Arial, sans-serif" font-size="25" font-weight="800">techtrend.silvatech.bz</text>
</svg>
`;
}

await writeFile(path.join(assetsDir, "techtrend-site-qr.svg"), buildQrSvg(), "utf8");
await writeFile(path.join(assetsDir, "social-card.svg"), buildSocialCardSvg(), "utf8");

console.log("Generated QR and social card assets.");
