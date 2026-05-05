#!/usr/bin/env node
/*
 * generate-marketing.mjs
 *
 * Generates the watercolor + ink-wash sprinkle for the Hallmark marketing site.
 * One seeded reference + ~19 sprinkles, all visibly from the same hand.
 *
 * Usage:
 *   node scripts/generate-marketing.mjs --slot reference         # generate the locked anchor
 *   node scripts/generate-marketing.mjs --slot all               # generate every slot defined below
 *   node scripts/generate-marketing.mjs --slot hero-bg           # one named slot
 *   node scripts/generate-marketing.mjs --list                   # print the slot map
 *
 * Reads TOGETHER_API_KEY from .env.local at the project root.
 * Writes PNGs to site/img/generated/<slot-id>.png.
 *
 * Style lock:
 *   - seed=7727 on every call
 *   - reference image (_seed-reference.png) passed via reference_images[0]
 *     on every call after the reference itself is generated
 *   - prompt prefix is a constant — only the SUBJECT sentence varies per slot
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..");
const OUT_DIR = path.join(ROOT, "site/img/generated");
const ENV_PATH = path.join(ROOT, ".env.local");

const API_URL = "https://api.together.xyz/v1/images/generations";
const MODEL_ID = "google/gemini-3-pro-image";
const SEED = 7727;

const STYLE_PREFIX =
  "Watercolor and ink wash on warm cream paper. Soft translucent washes of " +
  "coral, terracotta, and faded olive green. Visible paper grain and bleed " +
  "edges where pigment pools. Loose asymmetric composition. Hand-made plate " +
  "from a quiet studio. Soft, muted, never glossy, never digital-looking. " +
  "No text. No logos. No people. Subject:";

/* — Slot map ——————————————————————————————————————————— */

// Gemini 3 Pro Image only accepts these dimensions:
//   Square:    1024×1024  · 2048×2048  · 4096×4096
//   3:2 wide:  1264×848   · 2528×1696  · 5096×3392
//   2:3 tall:  848×1264   · 1696×2528  · 3392×5096
//   4:3 wide:  1200×896   · 2400×1792  · 4800×3584
//   3:4 tall:  896×1200
// The slot's *display* dimensions can still be anything the CSS wants
// (object-fit: cover handles the crop). These are just the source sizes.

const SLOTS = [
  {
    id: "_seed-reference",
    role: "locked style anchor (reference for all subsequent calls)",
    subject:
      "a single coffee bean resting on a piece of folded raw linen, ink line " +
      "around its silhouette, soft coral wash bleeding from one edge",
    width: 1264,
    height: 848,
    isReference: true,
  },
  // — Section 01 · HERO ——————————————————————————————————
  // Hallmark = the rulebook. The image is the rulebook itself.
  {
    id: "hero-bg",
    role: "hero ambient backdrop · 0.22 opacity",
    subject:
      "a worn leather rulebook lying open on warm linen, hand-written margin " +
      "notes in faded ink, a coral-tipped pen resting in the gutter, soft " +
      "daylight from the upper left. the kind of book a quiet master keeps",
    width: 2528,
    height: 1696,
  },

  // — Transition 02 → 03 ———————————————————————————————————
  // Bridge: 02 is "Eight briefs, eight different shapes" → 03 is Study.
  // Image evokes the eight briefs as eight folded papers.
  {
    id: "transition-02-03",
    role: "between Examples (eight briefs) and Study sections",
    subject:
      "eight folded sheets of paper laid out in a loose asymmetric row on " +
      "warm cream, each a slightly different size and corner-fold. faint " +
      "ink hatching on a few; a single coral mark on one. lit from one side",
    width: 1264,
    height: 848,
  },

  // — Section 03 · STUDY ————————————————————————————————————
  // What Hallmark sees when it reads a design — diagnostic overlay.
  {
    id: "study-bg",
    role: "Section 03 (Study) ambient backdrop · 0.18 opacity",
    subject:
      "a printed page beneath a sheet of tracing paper, the tracing paper " +
      "covered in red ink and pencil annotations identifying type, grid, " +
      "accent placement. an architect's diagnostic overlay. soft daylight",
    width: 1264,
    height: 848,
  },

  // — Transition 04 → 05 ———————————————————————————————————
  // Bridge: 04 is Without/With (parity comparison) → 05 is Foundations.
  // Image evokes correction → confidence: a draft and a final side by side.
  {
    id: "transition-04-05",
    role: "between Without/With and Foundations sections",
    subject:
      "two index cards laid side by side on warm cream paper. the left " +
      "card is cluttered with crossed-out ink corrections; the right card " +
      "is clean with three confident pencil lines and a single coral mark",
    width: 1264,
    height: 848,
  },

  // — Section 05 · FOUNDATIONS ——————————————————————————————
  // Five things Hallmark holds the line on: Type · Colour · Space · Motion · Voice.
  // Each image is a literal study of that foundation.

  {
    id: "found-type",
    role: "Section 05 panel anchor · Type",
    subject:
      "a hand drawing the letter G in serif italic on warm cream paper, " +
      "pencil construction grid visible underneath, faint coral guide-lines " +
      "marking the x-height and cap-height. a type-specimen study",
    width: 1024,
    height: 1024,
  },
  {
    id: "found-colour",
    role: "Section 05 panel anchor · Colour",
    subject:
      "a folded paper colour-study: one bold coral wash occupying about " +
      "three percent of the field, set against a generous warm-cream ground. " +
      "two faint olive accents in opposite corners. a pencil note in the margin",
    width: 1024,
    height: 1024,
  },
  {
    id: "found-space",
    role: "Section 05 panel anchor · Space",
    subject:
      "an architect's freehand floor-plan on cream paper showing five " +
      "rooms of asymmetric size, generous white space between them, pencil " +
      "measurement annotations along one edge, a single coral arrow",
    width: 1024,
    height: 1024,
  },
  {
    id: "found-motion",
    role: "Section 05 panel anchor · Motion",
    subject:
      "a Muybridge-style four-frame strip on a single sheet of cream paper: " +
      "the same brushstroke arcing across four progressive moments, faint " +
      "pencil arrows between frames showing easing curve",
    width: 1024,
    height: 1024,
  },
  {
    id: "found-voice",
    role: "Section 05 panel anchor · Voice",
    subject:
      "a hand-written marginalia in an open book on cream paper, three " +
      "honest words pencilled tightly together, one word underlined in coral, " +
      "the faint thumb-smudge of someone who held the page open",
    width: 1024,
    height: 1024,
  },

  // — Section 07 · INSTALL ——————————————————————————————————
  // Three harnesses: Claude Code · Cursor · Codex.
  // Each image is a metaphor that fits the harness's NAME.

  {
    id: "harness-claude",
    role: "Section 07 install · Claude Code glyph",
    subject:
      "a small folded letter on warm cream paper, sealed with a coral wax " +
      "seal stamped with the letter C, faint ink hatching around the rim. " +
      "nothing else on the page. a missive ready to be sent",
    width: 1024,
    height: 1024,
  },
  {
    id: "harness-cursor",
    role: "Section 07 install · Cursor glyph",
    subject:
      "an antique brass drafting compass laid on cream paper, one foot " +
      "tipped in coral graphite, a faint pencil arc traced beneath it. " +
      "a 19th-century instrument of precision",
    width: 1024,
    height: 1024,
  },
  {
    id: "harness-codex",
    role: "Section 07 install · Codex glyph",
    subject:
      "a half-open medieval codex book on warm linen, ink-illuminated edges, " +
      "a coral ribbon bookmark trailing across one page. simple, hand-bound. " +
      "a codex in the literal sense",
    width: 1024,
    height: 1024,
  },

  // — FOOTER MARK ————————————————————————————————————————————
  // A signing-off mark, like a colophon at the end of a book.
  {
    id: "footer-mark",
    role: "footer colophon glyph",
    subject:
      "a single hand-stamped wax seal pressed into warm cream paper, the " +
      "stamp abstract — a vertical ink stroke crossing a horizontal coral " +
      "wash, faint bleed. an unsigned signature. nothing else",
    width: 1024,
    height: 1024,
  },

  // — EXAMPLES PLATES ————————————————————————————————————————
  // Each plate evokes ONE of Hallmark's worked example briefs.
  // (See site/_tests/01-tide-podcast etc. — these images can pair with rail cards.)

  {
    id: "plate-podcast",
    role: "examples rail · indie podcast (Tide)",
    subject:
      "a vintage condenser microphone on a folded warm-cream linen, a " +
      "handwritten letter half-open beside it, a single coral pencil resting " +
      "across the page. the quiet of a recording studio at dawn",
    width: 1264,
    height: 848,
  },
  {
    id: "plate-bakery",
    role: "examples rail · bakery (Maple)",
    subject:
      "a baker's hand-bound notebook open to a sourdough recipe page, ink " +
      "notes and a small flour smudge in the margin, a single coral length " +
      "of kitchen string coiled beside the spine. early-morning daylight",
    width: 1264,
    height: 848,
  },
  {
    id: "plate-architecture",
    role: "examples rail · architecture / studio",
    subject:
      "an architect's sketch of a window detail on cream tracing paper, " +
      "pencil dimensions and arrows, a coral measuring tape partly coiled " +
      "alongside, a brass scale-rule below. a studio bench mid-thought",
    width: 1264,
    height: 848,
  },
  {
    id: "plate-manifesto",
    role: "examples rail · manifesto",
    subject:
      "a single sheet of warm cream paper pinned to a cork board with a " +
      "coral pushpin, three short declarative sentences hand-written in " +
      "ink, one word underlined twice. edges curling. a manifesto",
    width: 1264,
    height: 848,
  },
];

/* — Helpers ——————————————————————————————————————————— */

async function loadEnv() {
  let raw;
  try {
    raw = await fs.readFile(ENV_PATH, "utf8");
  } catch (e) {
    throw new Error(`.env.local not found at ${ENV_PATH}`);
  }
  for (const line of raw.split("\n")) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)\s*=\s*(.*)$/);
    if (m) process.env[m[1]] = m[2].trim().replace(/^["']|["']$/g, "");
  }
}

function buildPrompt(subject) {
  return `${STYLE_PREFIX} ${subject}.`;
}

async function callOnce(slot, { referenceUrl, apiKey }) {
  const body = {
    model: MODEL_ID,
    prompt: buildPrompt(slot.subject),
    width: slot.width,
    height: slot.height,
    seed: SEED,
  };
  if (!slot.isReference && referenceUrl) {
    body.reference_images = [referenceUrl];
  }
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return res;
}

async function generateOne(slot, { referenceUrl } = {}) {
  const apiKey = (process.env.TOGETHER_API_KEY || "").trim();
  if (!apiKey) throw new Error("TOGETHER_API_KEY missing in .env.local");

  const t0 = Date.now();

  // Retry up to 3 times on 5xx server errors with backoff
  let res;
  let lastErr;
  for (let attempt = 1; attempt <= 3; attempt++) {
    res = await callOnce(slot, { referenceUrl, apiKey });
    if (res.ok) break;
    if (res.status >= 500 && res.status < 600) {
      lastErr = await res.text();
      if (attempt < 3) {
        const wait = attempt * 8000;
        console.log(`  ! ${slot.id} got ${res.status}; retrying in ${wait / 1000}s (attempt ${attempt + 1}/3)`);
        await new Promise((r) => setTimeout(r, wait));
        continue;
      }
    } else {
      break;
    }
  }

  if (!res.ok) {
    const err = lastErr || (await res.text());
    throw new Error(`Together AI ${res.status}: ${err.slice(0, 400)}`);
  }
  const json = await res.json();
  const url = json?.data?.[0]?.url;
  const b64 = json?.data?.[0]?.b64_json;
  if (!url && !b64) {
    throw new Error(`No image returned: ${JSON.stringify(json).slice(0, 300)}`);
  }

  let bytes;
  if (url) {
    const r = await fetch(url);
    if (!r.ok) throw new Error(`Image fetch ${r.status} from ${url}`);
    bytes = Buffer.from(await r.arrayBuffer());
  } else {
    bytes = Buffer.from(b64, "base64");
  }

  await fs.mkdir(OUT_DIR, { recursive: true });
  const outPath = path.join(OUT_DIR, `${slot.id}.png`);
  await fs.writeFile(outPath, bytes);

  const ms = Date.now() - t0;
  return { outPath, hostedUrl: url, sizeKb: Math.round(bytes.length / 1024), ms };
}

async function main() {
  const args = process.argv.slice(2);
  const slotArg = args.find((a) => a.startsWith("--slot"))?.split("=")[1] || args[args.indexOf("--slot") + 1];
  const list = args.includes("--list");

  if (list) {
    console.log("Slots:");
    for (const s of SLOTS) {
      console.log(`  ${s.id.padEnd(22)} ${s.width}×${s.height}  ${s.role}`);
    }
    return;
  }

  await loadEnv();

  let targets;
  if (!slotArg || slotArg === "all") targets = SLOTS;
  else if (slotArg === "reference") targets = SLOTS.filter((s) => s.isReference);
  else targets = SLOTS.filter((s) => s.id === slotArg);

  if (targets.length === 0) {
    console.error(`No slot matches: ${slotArg}`);
    console.error("Try --list");
    process.exit(2);
  }

  // Ensure reference exists before any non-reference generation
  let referenceUrl = null;
  const refPath = path.join(OUT_DIR, "_seed-reference.png");
  const needsRef = targets.some((s) => !s.isReference);
  if (needsRef) {
    try {
      await fs.access(refPath);
      // We need a *URL* for reference_images[]. Re-upload via Together AI's signed pattern,
      // or use a publicly hosted version. For now, on first run we generate the reference
      // via this script and use the hosted URL Together AI returns for it.
      // If the local file exists but we don't have a URL cached, fall back to regenerating.
      const cacheUrl = await fs.readFile(refPath + ".url", "utf8").catch(() => null);
      if (cacheUrl) referenceUrl = cacheUrl.trim();
    } catch {}
    if (!referenceUrl) {
      console.log("→ generating reference (no cached URL)…");
      const refSlot = SLOTS.find((s) => s.isReference);
      const result = await generateOne(refSlot);
      referenceUrl = result.hostedUrl;
      if (referenceUrl) {
        await fs.writeFile(refPath + ".url", referenceUrl);
      }
      console.log(`  ✓ ${refSlot.id} → ${result.outPath} (${result.sizeKb} KB, ${result.ms}ms)`);
    }
  }

  const skipExisting = !args.includes("--force");

  for (const slot of targets) {
    const slotPath = path.join(OUT_DIR, `${slot.id}.png`);
    if (skipExisting) {
      try {
        const stat = await fs.stat(slotPath);
        if (stat.size > 0) {
          console.log(`  · ${slot.id} → exists (${Math.round(stat.size / 1024)} KB) — skipping`);
          continue;
        }
      } catch {}
    }
    if (slot.isReference && needsRef === false) {
      const result = await generateOne(slot);
      if (result.hostedUrl) await fs.writeFile(refPath + ".url", result.hostedUrl);
      console.log(`  ✓ ${slot.id} → ${result.outPath} (${result.sizeKb} KB, ${result.ms}ms)`);
      continue;
    }
    if (slot.isReference) continue; // already handled above
    try {
      const result = await generateOne(slot, { referenceUrl });
      console.log(`  ✓ ${slot.id} → ${result.outPath} (${result.sizeKb} KB, ${result.ms}ms)`);
    } catch (e) {
      console.log(`  ✗ ${slot.id} FAILED: ${e.message}`);
      // continue with the next slot rather than aborting the whole batch
    }
  }

  console.log("\nDone.");
}

main().catch((e) => {
  console.error("FAIL:", e.message);
  process.exit(1);
});
