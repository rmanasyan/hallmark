# Generated imagery

When a Hallmark project ships images, the rule is: **every image looks like the same artist made it**. Within one project — one brand — every plate, glyph, backdrop, and ornament shares the same hand. Across themes, the hand changes — Specimen looks like a pen-and-ink plate; Bloom looks like a deep ink wash on dark paper; Terminal looks like a monochrome ASCII print. The discipline that keeps this together is **a locked seed plus a locked reference image**.

This file ships the recipe.

---

## When generated stills earn their place

Generated illustration was Tier C in [`hero-enrichment.md`](hero-enrichment.md) — historically a "last resort, only when characters demand it" tier. **As of Hallmark v0.9.0, that's revised.** With Gemini 3 Pro Image (Nano Banana Pro) hosted by Together AI, character-consistency via reference-images, and rigorous post-processing, Tier C is now a **peer of Tier B (hand-built SVG)** when the discipline below is followed.

What changed: in 2024 you needed Midjourney + heavy retouching. In 2026 a single seed-locked + reference-image-locked Together AI call gives you a coherent set of images for one brand, in one style, that look hand-made.

The discipline did not change. Raw output still reads as AI in milliseconds. Post-processing is what makes it ours.

**When to reach for Tier C:**
- The brand has a story or set of subjects that benefit from being illustrated (a bakery, a podcast, an architecture studio, a journal, an atelier).
- Hand-built SVG (Tier B) can't economically reach the depth — characters, scenes, atmosphere.
- The brief carries a specific visual voice the catalog can name (watercolor, ink wash, woodcut, risograph, charcoal, gouache, illustration, photography).

**When NOT to reach for Tier C:**
- The page is a CLI / dev-tool / docs site where typography carries everything (Tier 0).
- The brand is "modern professional team" generic — illustrating that is the new template.
- A pure-CSS shape (Tier A) would do the job in fewer bytes.
- The image would need post-processing the team can't or won't do — better no image than a raw Nanobanana output.

---

## The seed-and-reference rule

This is the rule that makes "all images on this site look like one artist made them."

**Per project, you pick once and never change:**

1. **A seed.** A 4–5 digit integer. Hallmark default is `7727`. Use it on every call.
2. **A style reference image.** ONE PNG that anchors the visual language for the whole project. Generate this first with the locked theme prompt below + a subject of your choice. Save it at `<project>/img/generated/_seed-reference.png` and commit it.
3. **A locked prompt prefix.** From the per-theme table below — the prefix that names the style (medium, palette, paper, mood). Don't tweak it between calls.

**Per generation call, you only vary the subject.** Always:
- Pass `seed` set to your project's seed
- Pass the locked reference image as `reference_images[0]`
- Use the locked prompt prefix
- Append a one-sentence subject specific to the slot

That's the whole rule. Get those right and every image lands in the same hand.

```ts
// What every call looks like, after step 1 (reference + seed locked):
{
  model: "google/gemini-3-pro-image",
  prompt: `${THEME_PROMPT_PREFIX} ${slot_subject}.`,
  width: 1264, height: 848,    // or 1024×1024 for square; see allowed sizes below
  seed: 7727,
  reference_images: [REFERENCE_URL],
}
```

The reference image's hosted URL (returned by Together AI on the first call) is the one you pass on subsequent calls. Cache it next to the file: `_seed-reference.png.url`.

---

## Per-theme style prompts

Each Hallmark theme has a locked style-prompt prefix. Pick the one that matches the active theme and use it as the prefix for every image in the project. Don't blend prefixes; don't "tweak" them.

| Theme | Style-prompt prefix |
| --- | --- |
| **Specimen** | Pen-and-ink plate on warm cream paper. Crosshatched shading, single-line silhouettes, faint sepia wash. Hand-drawn from a 1930s book. No colour beyond ink and warm cream. Subject: |
| **Newsprint** | Halftone newspaper print on warm pulp paper. Visible dot screen, slightly off-register, restrained sepia + black. Editorial illustration in the manner of a daily broadsheet. Subject: |
| **Atelier** | Graphite pencil sketch on soft buff paper. Loose construction lines visible, light cross-hatching, a single coral accent in one detail. Studio sketchbook. Subject: |
| **Garden** | Watercolour plate with botanical-illustration discipline. Translucent washes of warm green and faded coral on cream paper. Visible paper grain. Hand-drawn in a 19th-century herbal. Subject: |
| **Salon** | Ink-wash illustration on warm cream paper, in the manner of a literary journal frontispiece. Restrained colour, fine ink line, generous breathing room. Subject: |
| **Linen** | Sepia-tone charcoal sketch on linen-textured paper. Smudged shading, gestural marks, a single warm copper accent. Subject: |
| **Almanac** | Lithograph print on warm cream paper, in the manner of a 19th-century reference plate. Crosshatching, careful captions, restrained palette. Subject: |
| **Midnight** | Monochrome neon-line illustration on near-black paper. Single phosphor cyan stroke, soft glow, crisp dark surroundings. Subject: |
| **Terminal** | Monochrome ASCII-style print on near-black paper. Single phosphor green tone, no painterly gradients, the look of a printed terminal screen. Subject: |
| **Brutal** | High-contrast woodcut print, black ink on warm cream paper. Bold blocks, gouge marks, no halftones. Subject: |
| **Manifesto** | Cut-paper collage on warm cream paper. Bold geometric shapes torn at the edges, single red ink wash, hand-set rough texture. Subject: |
| **Sport** | Bold action-line illustration in a 1970s sports-poster register. Two-colour palette: black and a single warm orange. Crisp diagonals. Subject: |
| **Studio** | Clean geometric line illustration on cool grey paper, in the manner of a Swiss design-school plate. Restrained palette: ink + a single sage green accent. Subject: |
| **Pastel** | Soft gouache plate on cool cream paper. Translucent pastel washes — pale indigo, mint, faded peach — with crisp pencil lines. Subject: |
| **Riso** | Risograph two-colour print on warm cream paper. Visible mis-register between coral red and faded blue, halftone dot texture, flat geometric shapes. Subject: |
| **Quiet** | Monochrome ink line on warm white paper. A single gestural stroke, vast negative space, no colour. The minimum that still reads as a drawing. Subject: |
| **Bloom** | Deep ink wash on dark paper. Translucent layers of charcoal and faded amber bleeding into each other, a single warm bloom of light. Subject: |
| **Coral** | Soft watercolour plate on warm cream paper. Translucent washes of coral, peach, and ivory; visible paper grain; loose ink line. Subject: |
| **Violet** | Watercolour plate on cool white paper. Translucent washes of violet, lavender, and dusty rose; ink line in soft charcoal. Subject: |
| **Aurora** | Soft gradient line illustration on near-black paper. Translucent washes of cyan, soft green, and faint purple — northern-lights inspired but grounded in line. Subject: |
| **Halo** | Hand-drawn glyph plate on warm cream paper. Restrained gold leaf accent, faint ink hatching, a single ornament per plate. The discipline of a medieval illuminator. Subject: |
| **Plume** | Calligraphy and brush-stroke illustration on warm cream paper. Translucent rose wash, single ink flourish, soft pencil-line construction. Subject: |
| **Editorial** | Watercolor and ink wash on warm cream paper. Soft translucent washes of coral, terracotta, and faded olive. Visible paper grain and bleed edges. Loose asymmetric composition. Hand-made plate from a quiet studio. Subject: |

Pick one row. Lock it for the project. Don't blend.

---

## Supported dimensions

Gemini 3 Pro Image accepts only these source sizes. The display crop in CSS can be anything (`object-fit: cover`); these are the source dimensions you request:

| Aspect | Sizes |
| --- | --- |
| Square | `1024×1024` · `2048×2048` · `4096×4096` |
| 3:2 wide | `1264×848` · `2528×1696` · `5096×3392` |
| 2:3 tall | `848×1264` · `1696×2528` · `3392×5096` |
| 4:3 wide | `1200×896` · `2400×1792` · `4800×3584` |
| 3:4 tall | `896×1200` |

For most slots, `1264×848` (wide) or `1024×1024` (square) is enough. Reach for 2K only on hero backdrops that go full-bleed.

`steps`, `width`/`height` outside this list, and other FLUX-style parameters are not supported. Don't send them.

---

## Post-processing checklist

Raw output reads as AI even when the prompt is good. The four post-processing moves are non-negotiable:

1. **Grain.** Apply an SVG `<feTurbulence>` overlay at 0.04–0.08 opacity, `mix-blend-mode: multiply`, scoped to the image. Or a faint paper-texture PNG at 0.06 opacity. The grain is what breaks the "smooth" AI surface.
2. **Asymmetric crop.** Crop 8–15% off one edge (usually right or bottom). Centred crops read as AI; an asymmetric crop reads as a human framing.
3. **Colour grade toward the brand accent.** Mix the image 8–12% toward `--color-accent` using `mix-blend-mode: multiply` over an accent-colour layer, or in the post-processor of your choice. The image gets pulled into the project's palette.
4. **Optional: hand-drawn frame.** A 0.5px hairline rule in `--color-rule`, or a corner-bracket utility (see `.fig-corners` in component-cookbook), or four small `+` marks at corners. Optional but lifts a generated still toward "made on a desk."

If a generated image has not been through all four (or three plus a deliberate skip on the fourth), it is not ready to ship.

---

## Provenance stamp

Every project that uses generated imagery records it in the macrostructure stamp:

```css
/* Hallmark · genre: editorial · macrostructure: Long Document
 * theme: editorial · nav: N6 · footer: Ft1
 * imagery: gemini-3-pro · seed: 7727 · reference: tokens/_image-reference.png
 * post-processed: grain + asymmetric-crop + accent-shift
 * slop: pass (51-55) · contrast: pass (46-50)
 */
```

The `imagery:` line tells future Hallmark runs (and any audit) which model + seed + reference produced the images. Reproducible. Honest about provenance.

---

## Two paths for users

### Path A · Pre-generated style packs (no API key needed)

For users who don't have a Together AI key, Hallmark ships pre-generated style packs at [`skill/_assets/image-packs/<theme>/`](../_assets/image-packs/):

```
_assets/image-packs/editorial/
  _seed-reference.png      (the locked anchor)
  01-hero-backdrop.png     (1920×1080 ambient)
  02-section-anchor.png    (1024×1024 corner plate)
  03-glyph.png             (1024×1024 mark)
```

Users copy the pack into their project's `./img/generated/` directory and reference the files. No API key. Limited to fixed images.

### Path B · Power-user recipe (own API key)

For users who want their own brand subjects, ship the recipe at [`skill/_assets/scripts/generate.mjs`](../_assets/scripts/generate.mjs). They copy it into their project, set `TOGETHER_API_KEY` in `.env.local`, and run:

```bash
node scripts/generate.mjs --theme editorial --slot hero --subject "a hand-bound notebook of recipes"
```

The script:
- Reads `TOGETHER_API_KEY` from `.env.local`
- Looks up the locked theme prompt prefix from this file
- Generates the seed reference if none exists, otherwise uses the cached URL
- Calls Together AI with seed=7727 + reference_images=[reference_url]
- Writes `./img/generated/<slot>.png`

Power users get unlimited brand-coherent images on their own dime ($0.134 per call).

### Path C · Free-trial endpoint (planned, post-launch)

For users who want to sample before paying: a Vercel Edge Function at `hallmark-murex.vercel.app/api/generate` accepts `{ subject, theme }` and returns a generated image. Rate-limited to 5 generations per IP per day, daily budget cap of $5. Users cap their own taste; we cap our exposure. (Not shipped at launch — see roadmap.)

---

## Anti-patterns to refuse

- **Raw output.** Shipping any model's first try without grain, crop, colour grade. Slop.
- **Mixing styles in one project.** Two themes' image styles on the same site. Pick one, lock it.
- **Forgetting the seed or reference.** Each call without them returns a different artist. Don't.
- **Aurora-blob backgrounds disguised as Tier C.** A purple-pink mesh blob is still aurora-blob even if Gemini drew it. Refuse.
- **Smiling-at-laptop generic.** "Modern professional team" stock-photo poses, smooth-mesh-blob characters, symmetric stage-lighting. Refuse.

The audit verb checks for these and fails the build.

---

## Cost framing

At $0.134 per 2K image:

- A small project (~5 images): ~$0.70.
- A medium project (~15 images): ~$2.00.
- A pre-generated theme pack (4 images × 23 themes): ~$12.30 one-time for Hallmark to ship the packs.
- A free-trial endpoint cap of $5/day yields ~37 free generations daily, ~1,100/month.

These are rounding-error costs vs the time post-processing the same images by hand.
