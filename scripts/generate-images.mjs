// Generates the social-share card and the home-screen / PWA icon set from the
// brand mark (public/favicon.png). Run with: bun run scripts/generate-images.mjs
//
// Outputs (committed to public/):
//   og-default.png       1200x630  default Open Graph / Twitter card
//   apple-touch-icon.png 180x180   iOS home-screen icon (opaque, red field)
//   icon-192.png         192x192   web-manifest icon
//   icon-512.png         512x512   web-manifest icon
//
// The wordmark uses DejaVu Sans (bundled on most Linux/CI images). On macOS the
// generated PNGs are what ships — the font only matters when regenerating.
import sharp from 'sharp';

const RED = '#ed1c24';
const BG = '#0d1117';
const SURFACE = '#161b22';
const TEXT = '#e6edf3';
const MUTED = '#9da7b3';
const SRC = 'public/favicon.png';

// --- Social card (1200x630) -------------------------------------------------
const MARK = 220;
const markBuf = await sharp(SRC).resize(MARK, MARK).toBuffer();

const card = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${BG}"/>
      <stop offset="1" stop-color="${SURFACE}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="0" y="618" width="1200" height="12" fill="${RED}"/>
  <text x="370" y="305" font-family="DejaVu Sans" font-weight="bold" font-size="88" fill="${TEXT}">Josh English</text>
  <rect x="372" y="335" width="132" height="8" rx="4" fill="${RED}"/>
  <text x="372" y="398" font-family="DejaVu Sans" font-size="40" fill="${MUTED}">Full-stack engineer at AWS</text>
  <text x="372" y="458" font-family="DejaVu Sans" font-weight="bold" font-size="34" fill="${RED}">joshenglish.com</text>
</svg>`;

await sharp(Buffer.from(card))
  .composite([{ input: markBuf, left: 90, top: 205 }])
  .png()
  .toFile('public/og-default.png');

// --- Icons (white JE on a full-bleed red field) -----------------------------
// The mark is a red disc on transparency; compositing onto red fills the
// corners so each icon reads as a solid red tile with the white monogram —
// the look iOS/Android expect (no transparent edges, no letterboxing).
async function icon(size, out) {
  const je = await sharp(SRC).resize(size, size).toBuffer();
  await sharp({
    create: { width: size, height: size, channels: 4, background: RED },
  })
    .composite([{ input: je }])
    .png()
    .toFile(out);
}

await icon(180, 'public/apple-touch-icon.png');
await icon(192, 'public/icon-192.png');
await icon(512, 'public/icon-512.png');

console.log('Generated og-default.png, apple-touch-icon.png, icon-192.png, icon-512.png');
