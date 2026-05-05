#!/usr/bin/env node
/*
 * generate.mjs · Hallmark image-generation recipe (Tier C)
 *
 * Drop this script into a Hallmark project. It generates brand-coherent
 * watercolour / ink-wash / risograph / charcoal / etc. illustrations
 * that all look like the same artist made them — by locking a seed
 * and a reference image across every call.
 *
 * Setup:
 *   1. Add `TOGETHER_API_KEY=…` to .env.local at your project root.
 *   2. Add `.env.local` to .gitignore (don't commit your key).
 *   3. Pick the theme from skill/references/generated-imagery.md.
 *
 * Usage:
 *   node scripts/generate.mjs --theme editorial --slot hero --subject "a hand-bound notebook of recipes"
 *   node scripts/generate.mjs --theme bloom --slot section-anchor --subject "a single pomegranate split open"
 *   node scripts/generate.mjs --list-themes
 *
 * Output:
 *   ./img/generated/_seed-reference.png   (locked anchor, generated on first run)
 *   ./img/generated/_seed-reference.png.url   (cached URL for subsequent calls)
 *   ./img/generated/<slot>.png             (one per call)
 *
 * What it does:
 *   - Reads TOGETHER_API_KEY from .env.local
 *   - Looks up the locked theme prompt prefix
 *   - On first call: generates the reference image, caches its hosted URL
 *   - On every subsequent call: passes the reference URL via reference_images[]
 *     and locks seed=7727 so all images share one visual hand
 *   - Writes ./img/generated/<slot>.png
 *
 * Cost: $0.134 per 2K image, $0.034 per 1K. Set --size 1k for cheaper.
 */

import fs from "node:fs/promises";
import path from "node:path";

const OUT_DIR = path.resolve(process.cwd(), "img/generated");
const ENV_PATH = path.resolve(process.cwd(), ".env.local");
const API_URL = "https://api.together.xyz/v1/images/generations";
const MODEL_ID = "google/gemini-3-pro-image";
const SEED = 7727;

/* — Locked style-prompt prefix per theme ————————————————————
   Mirror of the table in skill/references/generated-imagery.md.
   Lock this once per project. Don't edit it between runs. */
const THEME_PROMPTS = {
  specimen:  "Pen-and-ink plate on warm cream paper. Crosshatched shading, single-line silhouettes, faint sepia wash. Hand-drawn from a 1930s book. No colour beyond ink and warm cream. Subject:",
  newsprint: "Halftone newspaper print on warm pulp paper. Visible dot screen, slightly off-register, restrained sepia + black. Editorial illustration in the manner of a daily broadsheet. Subject:",
  atelier:   "Graphite pencil sketch on soft buff paper. Loose construction lines visible, light cross-hatching, a single coral accent in one detail. Studio sketchbook. Subject:",
  garden:    "Watercolour plate with botanical-illustration discipline. Translucent washes of warm green and faded coral on cream paper. Visible paper grain. Hand-drawn in a 19th-century herbal. Subject:",
  salon:     "Ink-wash illustration on warm cream paper, in the manner of a literary journal frontispiece. Restrained colour, fine ink line, generous breathing room. Subject:",
  linen:     "Sepia-tone charcoal sketch on linen-textured paper. Smudged shading, gestural marks, a single warm copper accent. Subject:",
  almanac:   "Lithograph print on warm cream paper, in the manner of a 19th-century reference plate. Crosshatching, careful captions, restrained palette. Subject:",
  midnight:  "Monochrome neon-line illustration on near-black paper. Single phosphor cyan stroke, soft glow, crisp dark surroundings. Subject:",
  terminal:  "Monochrome ASCII-style print on near-black paper. Single phosphor green tone, no painterly gradients, the look of a printed terminal screen. Subject:",
  brutal:    "High-contrast woodcut print, black ink on warm cream paper. Bold blocks, gouge marks, no halftones. Subject:",
  manifesto: "Cut-paper collage on warm cream paper. Bold geometric shapes torn at the edges, single red ink wash, hand-set rough texture. Subject:",
  sport:     "Bold action-line illustration in a 1970s sports-poster register. Two-colour palette: black and a single warm orange. Crisp diagonals. Subject:",
  studio:    "Clean geometric line illustration on cool grey paper, in the manner of a Swiss design-school plate. Restrained palette: ink + a single sage green accent. Subject:",
  pastel:    "Soft gouache plate on cool cream paper. Translucent pastel washes — pale indigo, mint, faded peach — with crisp pencil lines. Subject:",
  riso:      "Risograph two-colour print on warm cream paper. Visible mis-register between coral red and faded blue, halftone dot texture, flat geometric shapes. Subject:",
  quiet:     "Monochrome ink line on warm white paper. A single gestural stroke, vast negative space, no colour. The minimum that still reads as a drawing. Subject:",
  bloom:     "Deep ink wash on dark paper. Translucent layers of charcoal and faded amber bleeding into each other, a single warm bloom of light. Subject:",
  coral:     "Soft watercolour plate on warm cream paper. Translucent washes of coral, peach, and ivory; visible paper grain; loose ink line. Subject:",
  violet:    "Watercolour plate on cool white paper. Translucent washes of violet, lavender, and dusty rose; ink line in soft charcoal. Subject:",
  aurora:    "Soft gradient line illustration on near-black paper. Translucent washes of cyan, soft green, and faint purple — northern-lights inspired but grounded in line. Subject:",
  halo:      "Hand-drawn glyph plate on warm cream paper. Restrained gold leaf accent, faint ink hatching, a single ornament per plate. The discipline of a medieval illuminator. Subject:",
  plume:     "Calligraphy and brush-stroke illustration on warm cream paper. Translucent rose wash, single ink flourish, soft pencil-line construction. Subject:",
  editorial: "Watercolor and ink wash on warm cream paper. Soft translucent washes of coral, terracotta, and faded olive. Visible paper grain and bleed edges. Loose asymmetric composition. Hand-made plate from a quiet studio. Subject:",
};

/* — Allowed dimensions ———————————————————————————————————— */
const SIZES = {
  "1k-square":  [1024, 1024],
  "1k-wide":    [1264, 848],
  "1k-tall":    [848, 1264],
  "2k-square":  [2048, 2048],
  "2k-wide":    [2528, 1696],
  "2k-tall":    [1696, 2528],
};

async function loadEnv() {
  let raw;
  try { raw = await fs.readFile(ENV_PATH, "utf8"); }
  catch { throw new Error(`.env.local not found at ${ENV_PATH}. Add TOGETHER_API_KEY=… to it.`); }
  for (const line of raw.split("\n")) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)\s*=\s*(.*)$/);
    if (m) process.env[m[1]] = m[2].trim().replace(/^["']|["']$/g, "");
  }
}

function arg(name, fallback) {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 ? process.argv[i + 1] : fallback;
}

async function callTogether({ prompt, width, height, referenceUrl, apiKey }) {
  const body = {
    model: MODEL_ID, prompt, width, height, seed: SEED,
  };
  if (referenceUrl) body.reference_images = [referenceUrl];
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Together AI ${res.status}: ${err.slice(0, 400)}`);
  }
  return res.json();
}

async function downloadOrDecode(json) {
  const url = json?.data?.[0]?.url;
  const b64 = json?.data?.[0]?.b64_json;
  if (!url && !b64) throw new Error(`No image returned: ${JSON.stringify(json).slice(0, 300)}`);
  if (url) {
    const r = await fetch(url);
    if (!r.ok) throw new Error(`Image fetch ${r.status}`);
    return { bytes: Buffer.from(await r.arrayBuffer()), hostedUrl: url };
  }
  return { bytes: Buffer.from(b64, "base64"), hostedUrl: null };
}

async function main() {
  if (process.argv.includes("--list-themes")) {
    console.log("Available themes:");
    for (const t of Object.keys(THEME_PROMPTS)) console.log(`  ${t}`);
    return;
  }

  const theme = arg("theme");
  const slot = arg("slot", "untitled");
  const subject = arg("subject");
  const sizeKey = arg("size", "1k-wide");

  if (!theme || !subject) {
    console.error("Usage: node generate.mjs --theme <theme> --slot <slot> --subject \"…\" [--size 1k-wide|1k-square|2k-wide|2k-tall]");
    console.error("       node generate.mjs --list-themes");
    process.exit(2);
  }

  const prefix = THEME_PROMPTS[theme];
  if (!prefix) {
    console.error(`Unknown theme: ${theme}. Run --list-themes for the catalog.`);
    process.exit(2);
  }

  const [width, height] = SIZES[sizeKey] || SIZES["1k-wide"];

  await loadEnv();
  const apiKey = (process.env.TOGETHER_API_KEY || "").trim();
  if (!apiKey) {
    console.error("TOGETHER_API_KEY missing in .env.local at the project root.");
    process.exit(2);
  }

  await fs.mkdir(OUT_DIR, { recursive: true });
  const refPath = path.join(OUT_DIR, "_seed-reference.png");
  const refUrlPath = refPath + ".url";

  // Get or create the locked reference image
  let referenceUrl = null;
  try {
    referenceUrl = (await fs.readFile(refUrlPath, "utf8")).trim();
  } catch {
    console.log(`→ no reference yet · generating one for theme=${theme}…`);
    const refPrompt = `${prefix} a small abstract still life that captures the spirit of ${theme}. Loose composition. Hand-made.`;
    const json = await callTogether({ prompt: refPrompt, width, height, apiKey });
    const { bytes, hostedUrl } = await downloadOrDecode(json);
    await fs.writeFile(refPath, bytes);
    if (hostedUrl) {
      await fs.writeFile(refUrlPath, hostedUrl);
      referenceUrl = hostedUrl;
    }
    console.log(`  ✓ reference → ${refPath} (${Math.round(bytes.length / 1024)} KB)`);
  }

  // Generate the requested slot
  const fullPrompt = `${prefix} ${subject}.`;
  console.log(`→ generating ${slot} (theme=${theme}, ${width}×${height}, seed=${SEED})…`);
  const json = await callTogether({ prompt: fullPrompt, width, height, referenceUrl, apiKey });
  const { bytes } = await downloadOrDecode(json);
  const outPath = path.join(OUT_DIR, `${slot}.png`);
  await fs.writeFile(outPath, bytes);
  console.log(`  ✓ ${slot} → ${outPath} (${Math.round(bytes.length / 1024)} KB)`);

  console.log("\nNext: post-process. See skill/references/generated-imagery.md § post-processing checklist:");
  console.log("  1. Grain overlay  2. Asymmetric crop  3. Colour-shift toward accent  4. Optional frame");
}

main().catch((e) => {
  console.error("FAIL:", e.message);
  process.exit(1);
});
