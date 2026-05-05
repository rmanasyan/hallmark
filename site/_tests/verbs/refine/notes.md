# `refine` verb · what changed and why

## Input

`input.html` — a 95-line single-file changelog page for a fictional dev-tools shop called Codeline. **The structure is correct** — a Long Document macrostructure with three release entries, a header, and a footer. The user is happy with the shape; they want it polished.

## What `refine` does

> *"Apply the ruleset to polish the target in place. Preserve layout structure. Smallest possible diff. No redesign."*

The DOM is **identical**. The CSS rules are rewritten to use OKLCH tokens, named easings, the project's font stack, and the eight-states discipline. No element moved. No element added or removed. No `class` renamed (except where necessary).

## Diff list — what changed and which reference file prompted it

| Change | From | To | Reference |
| --- | --- | --- | --- |
| **1.** Replaced all hex / rgb colours with OKLCH tokens at `:root` | `#222`, `#777`, `#999`, `#444`, `#aaa`, `#eaeaea`, `#1aab30`, `#b08017`, `#b53d3d`, `#2050b8` | `--color-ink`, `--color-ink-soft`, `--color-rule`, `--color-accent`, etc. | [`color.md`](../../../skill/references/color.md) — palette in OKLCH, named tokens by role |
| **2.** Switched paper from pure `#fff` to a tinted near-white (`oklch(98% 0.005 240)`) | `background: #ffffff` | `background: var(--color-paper)` | [`color.md`](../../../skill/references/color.md) — never pure-white as a base |
| **3.** Replaced system font stack with a paired Geist + Geist Mono | `-apple-system, BlinkMacSystemFont, sans-serif` | Geist (display + body), Geist Mono (code) | [`typography.md`](../../../skill/references/typography.md) — display + body pairing, mono for code |
| **4.** Replaced `transition: all 250ms cubic-bezier(0.4, 0.0, 0.2, 1)` on links with explicit-property + named easing | `transition: all 250ms cubic-bezier(0.4, 0.0, 0.2, 1)` | `transition: text-decoration-color var(--dur-micro) var(--ease-out)` | [`microinteractions.md`](../../../skill/references/microinteractions.md) — never `all`; specify the property |
| **5.** Added a 4-pt spacing scale at `:root` (`--space-2xs` through `--space-2xl`) and replaced raw px values | `60px`, `30px`, `8px`, `50px`, `18px`, `17px` | `var(--space-2xl)`, `var(--space-md)`, `var(--space-2xs)`, etc. | [`layout-and-space.md`](../../../skill/references/layout-and-space.md) — 4-pt scale, semantic tokens |
| **6.** Added `:focus-visible` ring to all `<a>` elements with `outline: 2px solid var(--color-accent); outline-offset: 3px;` | (missing) | added | [`interaction-and-states.md`](../../../skill/references/interaction-and-states.md) — eight states; gate 28 |
| **7.** Added `@media (prefers-reduced-motion: reduce)` block to disable transitions | (missing) | added | [`motion.md`](../../../skill/references/motion.md) — gate 29 |
| **8.** Switched typography on the `time` element to monospaced for tabular numerics | sans default | `font-family: var(--font-mono); font-variant-numeric: tabular-nums;` | [`typography.md`](../../../skill/references/typography.md) — mono for dates / data |
| **9.** Switched units to `rem`, fluid type via `clamp()` where appropriate | px throughout | rem + clamp | [`responsive.md`](../../../skill/references/responsive.md) — accessibility-first sizing |
| **10.** Added `html, body { overflow-x: clip; }` for layout-safety | (missing) | added | [`layout-and-space.md`](../../../skill/references/layout-and-space.md) § page-edge clipping; gate 36 |
| **11.** Stamped the file at the top of `<style>` | (no stamp) | `/* Hallmark · refined · macrostructure: Long Document (preserved) · theme: Plain · accent: cool-ink-blue ~2% */` | [`SKILL.md`](../../../skill/SKILL.md) Step 6 — stamp the output |
| **12.** Tinted the link underline to use `text-decoration-color` so the underline can fade on hover without animating layout | underline + colour change in 250 ms | static underline + colour-mix transition only | [`microinteractions.md`](../../../skill/references/microinteractions.md) — animate paint, not layout |

## Slop test

| Before | After |
| --- | --- |
| 12 / 38 ✓ (failed gates 1, 4 (no token system), 9 (acceptable), 11, 16, 24, 26, 28, 29, 36) | 38 / 38 ✓ |

## Durable artifact

The `output.html` is what the user keeps. The DOM is unchanged so any JS / framework wrapper around the page still works. Total LOC delta: input had 95 lines, output has 138 lines (mostly tokens at `:root`).

## What `refine` *did not* do

- Did not add a hero
- Did not add a CTA
- Did not change the section order
- Did not insert any `<svg>`, illustration, or marketing copy
- Did not change the brand voice
- Did not remove the colour-coded list bullets (the user clearly wants them; the change is to use proper OKLCH tokens, not abandon the pattern)

That's the discipline. `refine` is a polish-in-place verb. Use `redesign` when the structure itself needs work — see [`../redesign/`](../redesign/) for that case.
