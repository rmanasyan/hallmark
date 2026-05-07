# Macrostructures

Twenty-one named landing-page shapes. **Pick one before you write code.** Each is a complete fingerprint — heading placement, body composition, divider language, button voice, image treatment, reveal pattern — bundled as a single named choice. Picking a macrostructure is faster, less error-prone, and *categorically more varied* than choosing six independent axes from `structure.md`.

The Specimen macrostructure (left-margin numbered labels + huge serif + asymmetric spans + typographic CTA) is one of these twenty-one. **It is no longer a default.** Reach for it only when the brief is explicitly editorial, foundry-adjacent, or the user has named it.

## Diversification rule (mandatory)

Before picking, check the target codebase for a `/* Hallmark · macrostructure: <name> · ... */` comment in any existing CSS file. If you find one, **your pick must be a different macrostructure.** No two consecutive Hallmark outputs in the same project share a macrostructure.

When the brief is vague (no theme, no tone), pick from the *first ten* below before reaching for anything in 11–21. The first ten are deliberately the strongest non-Specimen shapes; they cover ~80% of briefs.

## Hero polish patterns

The hero macrostructures (Marquee Hero · Stat-Led · Quote-Led · Letter · Photographic · Clipped) admit one optional **polish pattern** on top of their base shape — HP1 Vertical-rail · HP2 Marquee-overflow · HP3 Cursor-spotlight · HP4 Decorative-numeral. Polish patterns are *structural* (layout / type / motion), not decorative; they live alongside the hero macrostructure rather than replacing it. See [`hero-enrichment.md`](hero-enrichment.md) § Hero shape polish for the catalogue + when each one fits.

A hero may carry one enrichment archetype (E1–E8) AND one polish pattern (HP1–HP4) — but never two polish patterns at once. The decision sequence is: macrostructure → enrichment? → polish? → space discipline.

## Nav and footer voice

Each macrostructure also implies a **nav archetype** (N1–N9) and a **footer archetype** (Ft1–Ft8). The defaults sit in the routing tables in [`component-cookbook.md`](component-cookbook.md) § Navigation and § Footers. Don't ship a hero macrostructure without picking nav + footer alongside — they are part of the page shape, not optional chrome.

---

## 01 · Bento Grid

Modular blocks of varying sizes laid out as an irregular grid. Each block is a feature, a quote, an image, a stat. Visual rhythm comes from size variation, not card uniformity.

- **Heading:** centered display in a fixed-height hero (not full viewport).
- **Body:** asymmetric grid — 8–15 blocks of mixed spans (1×1, 2×1, 1×2, 2×2).
- **Divider:** consistent 12–24 px gap; no rules; the grid itself is the rhythm.
- **Button:** outlined chip on the hero; tile-internal CTAs as typographic links.
- **Image:** tightly cropped inside individual blocks; never full-bleed.
- **Reveal:** none, or a subtle one-shot fade on grid-tile entry.

Reach for it when the brief is "many small things to show", a feature page, a SaaS landing, or anywhere users have multiple equally-valid entry points.

Avoid when the message is a single hero idea — Bento spreads attention; one-idea pages need Marquee or Stat-Led.

Reference: Apple in-page sections, Framer feature pages, Tailwind UI templates.

**Sample opening lines** (imitate the *specificity*, not the wording):
> *"Tracejam · v0.4 · for SREs. Distributed tracing that explains itself."* — paraphrased from real observability tools
> *"Resend is the email API for developers. Send transactional and marketing emails at scale."* — resend.com
> *"The product development system for teams and agents."* — linear.app

```html
<header class="hero-fixed">…</header>
<section class="bento">
  <article class="cell span-2x2">…</article>  <!-- hero feature -->
  <article class="cell span-1x1">…</article>
  <article class="cell span-2x1">…</article>  <!-- wide stat -->
  <article class="cell span-1x2">…</article>  <!-- tall image -->
  <article class="cell span-1x1">…</article>
  <article class="cell span-1x1">…</article>
</section>
```

---

## 02 · Long Document

Reads like a memo, a letter, or a journal entry. No marketing structure. Continuous prose with inline section heads. The page is *literature* about the product.

- **Heading:** inline with body — section heads emerge from the paragraph flow as small caps or bold short phrases.
- **Body:** single column, generous line-height (1.65+), measure 60–65ch.
- **Divider:** negative space; the gap is the divider; occasionally a centered ornament for emphasis.
- **Button:** typographic link inside a paragraph, not a separate block.
- **Image:** inline, sized to text measure; never full-bleed.
- **Reveal:** none. The page is just *there*.

Reach for it for case studies, founder posts, mission pages, products whose sale is *philosophical*. The brief is "tell a story", not "list features".

Avoid when there's a single decisive action to take — Long Document hides CTAs, which is wrong for transactional pages.

Reference: Frank Chimero's site, destroytoday.com, long-form Substack essays in product disguise.

**Sample opening lines** (imitate the *specificity*, not the wording):
> *"Saturday, 6:14 a.m. The dough went in at midnight."* — opens with a time-stamp; the brand introduces itself as a moment in the day
> *"A monthly art publication featuring contributions by some of the most engaged thinkers working today."* — e-flux.com/journal
> *"We design everything for everyone."* — pentagram.com — refusal of the verb, treats design as universal practice

```html
<article class="prose">
  <p class="lede">…</p>
  <p>…</p>
  <h2 class="inline">A small heading.</h2>
  <p>…</p>
  <blockquote>…</blockquote>
  <p>… <a href="">read more →</a> …</p>
</article>
```

---

## 03 · Marquee Hero

The hero IS the page above the fold. A single bold statement or visual fills the viewport. No subhead, no CTA in fold. Below the fold the page becomes something else (a list, a grid, prose).

- **Heading:** display fills the fold — 8–14 vw type, hugging the viewport edges.
- **Body:** below-fold becomes a list of work or a single content block; the hero doesn't continue.
- **Divider:** a thick rule between hero and below-fold, OR a hard colour change.
- **Button:** none in fold; first CTA arrives below.
- **Image:** none in fold (typography is the visual), OR a single full-bleed photograph as the fold *background*.
- **Reveal:** the fold is static; below-fold may sweep in horizontally.

Reach for it when the brand or person *is* the message — designer/director portfolios, indie products with a single declarative voice, any "this is who we are" page.

Avoid for products whose value requires explanation in seconds. Marquee makes the user scroll before they understand.

Reference: 14islands.com, destroytoday.com, many design studio homepages.

**Sample opening lines** (imitate the *specificity*, not the wording):
> *"Type, set with care."* — Hallmark Specimen — refusal of the verb, treats type as material
> *"A studio for what's next."* — italic editorial display, names the practice without explaining it
> *"Design like print: warm, off-register, intentional."* — Hallmark Riso — declarative, three modifiers, full stop

```html
<section class="marquee">
  <h1 class="display-xxl">A statement.</h1>
</section>
<hr class="rule-thick" />
<section class="below-fold">…</section>
```

---

## 04 · Stat-Led

The hero is a giant number — a metric, a count, a percentage. Everything that follows supports or qualifies it. Data is the narrative.

- **Heading:** numeric display (8–12 rem), tabular figures, small qualifier line below.
- **Body:** sections each anchored by a supporting stat or chart.
- **Divider:** hairline rules between stat blocks; tabular-nums everywhere.
- **Button:** outlined chip aligned beneath the qualifier.
- **Image:** charts and small data-viz; no photography.
- **Reveal:** number-tick on the hero figure — counter from 0 to target over ~500 ms.

Reach for it when the brief is "we have proof in numbers" — enterprise/B2B, fundraising platforms, climate or impact pages.

Avoid for products without a defensible single metric. A fake big number is worse than no number.

Reference: Ahrefs, Stripe Sessions stat blocks, climate-impact dashboards, venture firm portfolio pages.

**Sample opening lines** (imitate the *specificity*, not the wording — the number does the work):
> *"+47% · faster · decide late."* — italicised number, three-word qualifier
> *"4 seconds. From the alert link to the slow span."* — pairs the number with what it bought
> *"434 total posts. New CSS you feel like you could use today."* — adam argyle, nerdy.dev — the count grounds the page in real volume

```html
<section class="stat-hero">
  <div class="figure tnum">99.97<span class="unit">%</span></div>
  <p class="qualifier">uptime across 2026, measured externally.</p>
  <a class="cta-outline">Read the report →</a>
</section>
<section class="supporting-stats">…</section>
```

---

## 05 · Workbench

Product screenshots in frames are the primary content. The page is a guided tour of the app in use. Less marketing copy, more "here's what you do with it."

- **Heading:** small, functional — workbench pages don't shout.
- **Body:** sequence of screenshot blocks, each with a short caption and an inline annotation arrow.
- **Divider:** the screenshot frame *is* the divider; sections separate by gap and frame.
- **Button:** sticky-bottom CTA bar after the third screenshot ("Try it →"), once context is built.
- **Image:** central — browser/device frames around real product captures, with annotation arrows.
- **Reveal:** type-unmask on captions; screenshots load instantly.

Reach for it for SaaS, developer tools, IDE extensions — anywhere seeing the product in motion is the sale.

Avoid when the product is conceptual or services-led. Workbench needs a UI to show.

Reference: Linear.app, Vercel, Raycast, Arc Browser.

**Sample opening lines** (imitate the *specificity*, not the wording — the page walks the user through):
> *"$ streampipe parse access.log --filter status=5xx | jq"* — open on a real command, not a marketing claim
> *"Read anything that emits lines. Files, pipes, sockets, kubectl logs."* — names the inputs, refuses abstraction
> *"Open the trace, find the span, fix the regression. No glossary required."* — three concrete verbs, then a refusal

```html
<header class="lite">…</header>
<section class="screenshot-frame">
  <figure><img src="step-1.png" /><figcaption>Open a project.</figcaption></figure>
</section>
<section class="screenshot-frame">…</section>
<aside class="sticky-cta">Try it free →</aside>
```

---

## 06 · Conversational FAQ

Bold questions, brief answers. The page reads like an honest interview with the product. Often each Q/A is a collapsible accordion.

- **Heading:** each section *is* a question — a short, direct phrase ending in `?`.
- **Body:** answer in 2–4 short paragraphs immediately below the question.
- **Divider:** thin rule between Q/A pairs, or zero rule and a paper-colour swap.
- **Button:** typographic link inside answers ("Read the full policy →"); one outlined CTA at the foot.
- **Image:** sparse — maybe one diagram per long answer; mostly text.
- **Reveal:** none on load; accordion expand uses 200 ms `--ease-out` on `grid-template-rows: 0fr → 1fr`.

Reach for it near pricing, for products that meet skepticism, for educational/regulated industries.

Avoid as the *primary* page. FAQ usually pairs with another macrostructure that opens the page.

Reference: many SaaS pricing pages, Casper, Substack help pages.

**Sample opening lines** (imitate the *specificity* — questions are real questions, answers are short and concrete):
> *"What is this for? — A single-binary CLI for parsing log streams from stdin."* — names the form factor, names the input
> *"How is this different from X? — It's about time."* — cron.com — answers obliquely, with a phrase that has weight
> *"Who built this? — Three of us, in Lisbon, since 2014."* — date + place + count, no marketing

```html
<section class="faq">
  <details>
    <summary><h2>How long does setup take?</h2></summary>
    <div class="answer">…</div>
  </details>
  <details>…</details>
</section>
```

---

## 07 · Manifesto

Polemical large type. Declaration energy. The page tells the reader what to believe before it tells them what to buy. Often political-poster aesthetic.

- **Heading:** all-caps display tilted slightly (`-2°` to `-4°`), or stacked colour-block highlights on the verb.
- **Body:** short paragraphs each holding one assertion, large enough to read across the room.
- **Divider:** bleed-colour blocks between sections; no hairlines.
- **Button:** oversized solid block, accent colour, set far below the fold.
- **Image:** none, or a single high-contrast B&W photograph used as a section bleed.
- **Reveal:** horizontal sweep on section entry.

Reach for it for brand repositioning announcements, mission-led indie products, design-studio beliefs pages.

Avoid for transactional pages. Manifesto sells *agreement*, not action.

Reference: Linear's positioning pages, agency rebrand sites, political campaign landing pages.

**Sample opening lines** (imitate the *specificity* — manifestos commit, they don't hedge):
> *"WE ARE A STUDIO. WE ARE NOT A PLATFORM."* — Meridian (test 04) — defines by refusal, all caps, a single accent word
> *"We design products that last twelve years. We do not design products that need replacing every two."* — concrete number, paired declaration
> *"Lightness above weightiness, elevate everyone you encounter."* — craigmod.com — one-line principle, no explanation needed

```html
<section class="manifesto bleed-ink">
  <h1 class="caps display-xxl">WE BELIEVE <em class="block-accent">DESIGN</em> IS SLOW.</h1>
</section>
<section class="bleed-paper">
  <p class="claim">It costs less than the rework you'll do without it.</p>
</section>
```

---

## 08 · Photographic

A single huge image dominates each fold. Text is small annotation, not headline. The design says *look* before it says *read*.

- **Heading:** small caption near a corner of the image; never centered display.
- **Body:** full-bleed image bands alternating with narrow text bands.
- **Divider:** the image edge IS the divider; no rules.
- **Button:** typographic link tucked under the caption.
- **Image:** the whole point — full-bleed, edge to edge, often a single photo per fold.
- **Reveal:** no spatial motion; let the photographs do the work.

Reach for it for fashion, hospitality, photography portfolios, lifestyle e-commerce, any brand whose product is a *feeling*.

Avoid without real photography. AI-generated stock undoes the macrostructure.

Reference: Aimé Leon Dore, Mr Porter editorial, Stüssy lookbooks.

**Sample opening lines** (imitate the *specificity* — captions for photographs are dates, places, plate numbers — not marketing):
> *"Plate 47 · scored before the proof."* — Maple Street Bread (test 03) — a number, a moment in the process
> *"Spring, 2026."* — Atelier-style — two words, full stop
> *"From the working archive."* — gives the photograph provenance without explaining it

```html
<section class="photo-fold">
  <img class="bleed" src="hero.jpg" />
  <p class="caption">Spring, 2026.</p>
</section>
<section class="text-fold">
  <p class="lede">…</p>
</section>
<section class="photo-fold">…</section>
```

---

## 09 · Quote-Led

The hero is a pull-quote with attribution. The headline is borrowed credibility, not the brand's voice. The page leads with social proof.

- **Heading:** italic display setting a customer's quote (36–60 px), with attribution below in small caps.
- **Body:** continues with additional testimonials, case studies, or a quiet feature list.
- **Divider:** centered quote-mark glyph or an em-rule between testimonials.
- **Button:** typographic link beneath the attribution ("Read the full case study →").
- **Image:** small avatar or company logo by the attribution; otherwise none.
- **Reveal:** none in fold; below-fold may stagger.

Reach for it for B2B products with strong customer voices, agency case-study pages, fundraising sites, anywhere "people like me use this" is the unlock.

Avoid for new products without real testimonials. Fake quotes destroy trust on inspection.

Reference: many B2B SaaS landings, agency homepages, university development pages.

**Sample opening lines** (imitate the *specificity* — quote-led pages let someone else say it, then attribute):
> *"I started listening on a long bus ride. By the third episode I'd missed my stop, and I didn't mind."* — Tide (test 01) — story-shaped, attributed to a listener
> *"Restraint, repeated, becomes a signature."* — Hallmark Atelier — short, philosophical, signed by the studio
> *"It told me the span that regressed, the deploy that caused it, and the engineer to ask. We rolled back in eight minutes."* — Tracejam-style — names the outcome with a number

```html
<section class="quote-hero">
  <blockquote class="display-italic">"…"</blockquote>
  <p class="attribution">— Name, Title, Company</p>
  <a class="link">Read the case →</a>
</section>
<section class="more-quotes">…</section>
```

---

## 10 · Specimen *(no longer the default)*

Numbered left-margin labels, huge serif display, asymmetric column spans, hairline rules, typographic-only CTA, generous whitespace. Editorial / type-foundry energy.

- **Heading:** left-margin number + label (`01 — HELLO.`) beside a large serif phrase.
- **Body:** asymmetric spans — narrow label column / wide content column.
- **Divider:** hairline rules between sections.
- **Button:** typographic link with arrow ("Open your studio →"); no box, no fill.
- **Image:** none, or a hand-drawn SVG accent in the wide left margin.
- **Reveal:** fade-up stagger on first load.

Reach for it ONLY when the brief is explicitly editorial, type-foundry, journal, or "specimen sheet". Otherwise pick something else.

**Banned as a default.** If the brief is vague and you've defaulted here, restart.

Reference: type foundry homepages (Klim, Pangram Pangram, Production Type), some editorial portfolios.

**Sample opening lines** (imitate the *specificity* — Specimen openings are foundry-voice, treating type as material culture):
> *"A thing well made."* — klim.co.nz — refusal of the verb, treats design as material
> *"Type, set with care."* — Hallmark Specimen — three words, a colon implied
> *"Creative direction, design and type for culture since 2003."* — apracticeforeverydaylife.com — date-anchored, names verticals

```html
<header class="specimen">
  <p class="num-label">01 — HELLO.</p>
  <h1 class="serif-xxl">A quiet <em>instrument.</em></h1>
  <p class="lede narrow">…</p>
  <a class="link">Open your studio →</a>
</header>
```

---

## 11 · Catalogue

Uniform grid of variations of the same thing — typefaces, colour palettes, product SKUs. The page is a visual index of inventory.

- **Heading:** brand mark + tagline only; no big display.
- **Body:** grid of identical-sized cards (3–5 per row), each one variant of the core product.
- **Divider:** hairline rules between rows; sometimes a category label band.
- **Button:** card-internal link to detail page; no global CTA.
- **Image:** specimen thumbnail per card, or a swatch.
- **Reveal:** none.

Reach for it for foundries, palette generators, font shops, colour systems, capsule collections.

Avoid for narrative brands. Catalogue treats every item as equal — wrong for products with hierarchy.

Reference: Klim Type Foundry, Pangram Pangram, Coolors palettes.

**Sample opening lines** (imitate the *specificity* — Catalogue openings are inventory headers, dated, with a count):
> *"Today's loaves."* — Maple Street Bread (test 03) — two words, ownership of the day
> *"Five collections, in store now."* — names the count and the where
> *"Thirty-eight items · Spring 2026 · all hand-stitched."* — count, date, qualifier; no adjectives

---

## 12 · Letter

First-person, written, intimate. Opens with a greeting ("Dear friend,"). No buttons in the fold. Reads as a personal note from the founder.

- **Heading:** salutation in serif italic ("Dear reader,"), 1.5–2× body size.
- **Body:** prose, single column, narrow measure (50ch), as if typed.
- **Divider:** paragraph spacing only, occasional `* * *` separator.
- **Button:** sign-off link at the foot ("p.s. join us if you'd like →").
- **Image:** maybe one signature scan, or a quiet inline photograph.
- **Reveal:** none.

Reach for it for personal brands, indie founder announcements, sabbatical or pivot pages, donation appeals.

Avoid for transactional commerce. Letter is intimate; commerce is functional.

Reference: Frank Chimero's site, founder farewell posts, indie newsletter front pages.

**Sample opening lines** (imitate the *specificity* — Letter openings are first-person greetings, dated, with a place if relevant):
> *"Hello, I'm Anya."* — Anya (test 06) — single line, name, full stop
> *"Saturday, 6:14 a.m. The dough went in at midnight."* — opens on a moment, then explains it
> *"Hey there. This page is soft because the surface should be soft."* — Hallmark Plume — colloquial open + a principle

---

## 13 · Index-First

The page IS a list of links. No hero image, no narrative flow. Pure navigation as design.

- **Heading:** one short paragraph at the top introducing the index, no display type.
- **Body:** vertical list of categorised links; sometimes a sidebar of filters.
- **Divider:** hairline rules between rows; or zero rules with paper-colour bands.
- **Button:** the links themselves are the buttons.
- **Image:** none, or tiny favicons by each entry.
- **Reveal:** none.

Reach for it for documentation hubs, knowledge bases, archive front pages, design system entries, link-in-bio pages with substance.

Avoid for marketing pages. Index-First is for browsing audiences; selling needs structure.

Reference: Are.na's homepage feel, archive sites, documentation indices.

**Sample opening lines** (imitate the *specificity* — Index-First openings are headers for what's below, sometimes nothing more than a label):
> *"Selected work · 2018 — 2026."* — date range, no preamble
> *"Things Become Other Things · Lightness above weightiness."* — craigmod.com — two phrases joined by a divider
> *"Writer + Photographer."* — craigmod.com — three words, summarises the whole site

---

## 14 · Narrative Workflow

Numbered stages tell the story of how the user uses the product over time. Each section is a phase (1.0 → 2.0 → 3.0 → 4.0). The page is a process timeline.

- **Heading:** large numbered stage labels (`1.0 INTAKE`, `2.0 PLAN`).
- **Body:** each stage has a short explanation and a small product visual.
- **Divider:** thick numbered rule between stages.
- **Button:** stage-internal links; one global "Start at stage 1 →" at the foot.
- **Image:** small product capture per stage, often annotated.
- **Reveal:** sweep horizontal as stages enter the viewport.

Reach for it for products with explicit workflows — project management, design-to-dev pipelines, writing tools.

Avoid for tools that work in *one* moment. Narrative Workflow needs a real sequence.

Reference: Linear's how-it-works pages, some Figma marketing pages.

**Sample opening lines** (imitate the *specificity* — Narrative Workflow openings are stage labels: numbered, declarative, in process language):
> *"01 · sourdough overnight · 02 · score at dawn · 03 · pull at seven."* — three numbered stages, no marketing
> *"1.0 · parse · 2.0 · filter · 3.0 · route."* — Streampipe (test 02) — versioned numbers, three concrete verbs
> *"I. We design products that last twelve years. II. A material is sustainable when someone, somewhere, can repair it."* — Meridian — Roman numerals + declarative

---

## 15 · Split Studio

Diptych. Every major content block divides the screen — text on one side, proof on the other. The pairing alternates direction down the page.

- **Heading:** half-screen wide; the other half holds a screenshot or a quote.
- **Body:** alternating left-text/right-image and right-text/left-image modules.
- **Divider:** a clear gutter between halves; no rules.
- **Button:** outlined chip below the text half.
- **Image:** anchored to the opposite half from the text in each row.
- **Reveal:** opposite halves cross-fade in slightly staggered.

Reach for it for SaaS feature pages, dev tools that pair explanation with code, anything where every claim wants a visual proof.

Avoid for narrative or photographic brands. Split halves the attention; some pages need single focus.

Reference: Vercel feature pages, Stripe Sessions program pages, many dev-tool homepages.

**Sample opening lines** (imitate the *specificity* — Split Studio openings pair a positioning statement with a proof column):
> *"A studio for what's next."* — italic display + selected-work column on the right
> *"Print discipline, on screen."* — Hallmark Newsprint — two-phrase headline, masthead-style
> *"We design and build distinctive products for ambitious teams."* — names the verb (design and build), names the audience

---

## 16 · Feature Stack

Sticky left pane (label / description) + scroll-synced right pane (screenshots cycling through related details). Cinematic pacing.

- **Heading:** held inside the sticky pane; persists while content cycles beside it.
- **Body:** two columns — left sticky, right scrolling; the right pane plays through 3–6 detail screens per section.
- **Divider:** section bands; the sticky pane re-anchors per section.
- **Button:** in the sticky pane, set when the user reaches the section's detail count.
- **Image:** the scrolling-right column is mostly imagery.
- **Reveal:** none of the spatial-fade kind; the sticky/scroll IS the motion.

Reach for it for premium products, complex feature stories, anything where you want to control pacing as the user scrolls.

Avoid on mobile-first audiences without strong fallback. Sticky+scroll-sync is rough on small screens.

Reference: Apple product pages, some Stripe Sessions pages, Read.cv onboarding.

**Sample opening lines** (imitate the *specificity* — Feature Stack openings pin a single statement and then walk the user through):
> *"Plan, build, ship."* — three verbs, three sticky panes
> *"Read anything that emits lines."* — Streampipe (test 02) — names what's possible, then walks through it
> *"From stdin, through the pipe, into your dashboard."* — names the data path, then explains each step

---

## 17 · Type Specimen

The typeface IS the design. Foundry homepage or design-system marketing where a custom typeface is the brand's proof.

- **Heading:** the typeface set at multiple sizes, demonstrating what it does.
- **Body:** progressive demonstration — display size, body size, italic, language coverage, OpenType features.
- **Divider:** centred caption labels between specimens.
- **Button:** outlined "Buy" or "Use it" at the foot.
- **Image:** none — typography is the imagery.
- **Reveal:** type-unmask on first paint of each specimen block.

Reach for it for type foundries, design systems where a custom face is the differentiator, font product pages.

Avoid when the brand uses an off-the-shelf face. Type Specimen needs something distinctive to celebrate.

Reference: Klim Type Foundry, Pangram Pangram, Geist Pixel announcement pages.

**Sample opening lines** (imitate the *specificity* — Type Specimen openings are foundry-voice: name the typeface, the weights, the use):
> *"Reckless Display, set in 96 pt."* — names the face and the size, nothing else
> *"Eight weights. Three optical sizes. One good italic."* — counts the system in three short phrases
> *"A type system for editorial."* — refusal of the verb, single noun phrase

---

## 18 · Portfolio Grid

Filterable cards of projects. Studio or designer homepages where the work is the product.

- **Heading:** short tagline above the grid; no display.
- **Body:** responsive grid of project cards, all same size or with subtle size variation.
- **Divider:** filter bar above the grid; no internal rules.
- **Button:** card-internal "View case study"; no global CTA.
- **Image:** thumbnail per card.
- **Reveal:** card-fade on filter change.

Reach for it for design studios, agencies, photographer portfolios, any creative business where work is the pitch.

Avoid for products. Portfolio Grid is service-business shape.

Reference: Pentagram, 14islands, Locomotive, Bureau Borsche.

**Sample opening lines** (imitate the *specificity* — Portfolio Grid openings name the volume and the era):
> *"Selected work · 2018 — 2026."* — date range, two characters of meta
> *"Twelve projects, six clients, two countries."* — three counts, no adjective
> *"Work, indexed by year."* — five-word labels, the index is the whole site

---

## 19 · Map / Diagram

A single large spatial diagram organises the page — flowchart, floor plan, network graph, system map. Information is laid out *spatially*, not linearly.

- **Heading:** a small orientation phrase above or beside the map.
- **Body:** the map itself; nodes and edges; a legend somewhere.
- **Divider:** the diagram has no internal sections — it's one composition.
- **Button:** node-internal links; one outlined CTA below the map.
- **Image:** the map IS the image; SVG with interactive hovers.
- **Reveal:** node-by-node ink-on as the user enters viewport (cap to 5 nodes).

Reach for it for system overviews, ecosystem maps, process diagrams, organisation charts.

Avoid as a substitute for narrative. Some stories shouldn't be read spatially.

Reference: process visualisation sites, ecosystem maps, knowledge-graph products.

**Sample opening lines** (imitate the *specificity* — Map / Diagram openings name the path or the territory):
> *"Browser → API → Database. Where Tracejam fits."* — names the layers, names the position
> *"From stdin, through the pipe, into your dashboard."* — labels the spatial flow on the page below
> *"Three tiers · two regions · one ledger."* — counts the system, geographic + structural

---

## 20 · Ecosystem Index

Multiple discovery surfaces — featured / latest / by category / by people. The platform's value is emergence and browsing, not declaration.

- **Heading:** brief positioning paragraph; no display.
- **Body:** several horizontal rails or grids — each surfacing a different cut of the platform's content.
- **Divider:** rail-titled bands.
- **Button:** "See more →" at each rail's edge; rarely a global CTA.
- **Image:** thumbnails everywhere; the page is dense imagery.
- **Reveal:** none.

Reach for it for community platforms, content marketplaces, design-asset stores, any UGC/curated catalogue front page.

Avoid for single-product pages. Ecosystem needs multiple things to surface.

Reference: Are.na, Figma Community, Behance.

**Sample opening lines** (imitate the *specificity* — Ecosystem Index openings are surface labels, dated, with a count):
> *"Featured · Latest · By category."* — three discovery surfaces named, divided
> *"What's on this week · Editor's pick · The whole catalogue."* — names cadence, curation, breadth
> *"A toolkit for assembling new worlds from the scraps of the old."* — are.na — second-position copy that breaks template

---

## 21 · Component Playground

Interactive code-and-preview blocks are the page's primary content. Each block previews a thing and shows how to copy-paste it.

- **Heading:** category labels (`Buttons`, `Forms`, `Cards`, `Layouts`).
- **Body:** alternating preview-and-code blocks, often with a tab to switch frameworks.
- **Divider:** category bands; horizontal rules between examples.
- **Button:** "Copy" button on every code block (silent success).
- **Image:** none — the previews ARE the imagery.
- **Reveal:** none.

Reach for it for design systems, component libraries, code-snippet sites, framework documentation.

Avoid for marketing pages. Playground is utility, not pitch.

Reference: shadcn/ui, Tailwind UI, Once UI, MUI demos, Framer Motion examples.

**Sample opening lines** (imitate the *specificity* — Component Playground openings are tangible: open on a real example, not a claim):
> *"Try it inline. Then take it home."* — two short imperatives
> *"Every example is editable. Every output is real."* — pairs claim with proof
> *"From `npm install` to your first chart in eight lines."* — names the step count, makes a concrete promise

---

## SaaS page sequence

When the macrostructure is **Bento Grid · Stat-Led · Workbench · Marquee Hero** and the brief is a B2B SaaS marketing page, ship these sections in roughly this order. None are mandatory — but skipping more than two reads as "the page is incomplete":

1. **Hero** — macrostructure-specific (Bento, Stat, Workbench, Marquee). Two CTAs (primary action + secondary "Talk to sales").
2. **Social proof / logo wall** — 6–8 customer logos in monochrome. (See [`assets.md` § Logo walls](assets.md).)
3. **Features** — 3–6 feature cards, varies by macrostructure (Bento has them inline; Stat-Led usually puts them after the supporting-stats grid).
4. **Testimonials** — 2–4 quote cards. Pull-quote + name + role + company. Photo optional. Avoid "We use [product] every day" language; the quote should be specific to a use case ("Foundry got us SOC2 in five weeks. We wrote zero policies ourselves.").
5. **Pricing** — 2–3 tiers in a comparison table. Feature checklist per tier. Recommended-tier badge on the middle tier. Show the actual price; "Contact sales for pricing" on every tier is a tell that the brand doesn't trust the buyer.
6. **FAQ** — 5–10 questions. Conversational FAQ archetype works here (see Macrostructure 9).
7. **Final CTA strip** — single button + one-sentence prompt.
8. **Footer** — index-style or tabular, theme-appropriate.

Each section transition uses theme-appropriate vertical spacing — `--space-3xl` minimum between major sections. Don't subdivide sections into "rows" with sub-rules — the section break is the visual rhythm.

**Voice rules for SaaS sections:**

- **Pricing:** show the actual price. Sales-led pricing on every tier ("Contact us") signals the brand doesn't trust the buyer.
- **Testimonials:** include the quoted person's role *and* company. Abstract "Engineering Manager" testimonials are slop. If the brief is a real product, use real names. If the brief is a placeholder, use plausible names — never "Jane Doe" / "John Smith" (gate 20).
- **FAQ:** answer like a person, not a sales doc. "Yes — Stripe and Adyen are both supported out of the box" beats "Our platform integrates with leading payment providers."
- **CTA strip:** one button. Not two. The repetition is the call to action.

This sequence is **not** a template you stamp out — it's a recipe of *what should be present*. The macrostructure determines *how* each section looks. A Bento Grid page interleaves features and proof inside the grid; a Stat-Led page sequences them top-to-bottom; a Marquee Hero page lets the marquee do the social-proof work.

For non-SaaS work (Editorial, Manifesto, Letter, Long Document, Quote-Led), this sequence does **not** apply. A bakery does not need a pricing tier comparison.

---

## How to pick

1. **Read the brief.** Note any words that strongly signal one macrostructure ("data heavy", "tell a story", "a list of links", "many small features", "personal note").
2. **Check the codebase** for an existing `/* Hallmark · macrostructure: <name> · ... */` stamp. If found, exclude that name from your choices.
3. **Match brief energy to a macrostructure** using the "Reach for it" lines. Most briefs match 2–4 of these patterns; pick the one that's most categorically distant from any past output for this user.
4. **State your pick** in plain text *before* writing code: "Macrostructure: Bento Grid." Then write the code, opening the CSS with the required stamp.
5. If genuinely torn, offer the user three choices from *different categories* (e.g. Bento + Long Document + Manifesto) and let them pick.

The goal is not novelty for its own sake. The goal is that two pages Hallmark builds for two different briefs *look like different sites, not different colour-swaps of the same template*.
