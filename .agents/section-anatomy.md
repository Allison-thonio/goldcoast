# Section Anatomy Pattern — Goldcoast Design System

Every content section on the site follows this five-part rhythm.
This is a content template, not a visual style — it maps onto any section
regardless of background colour or layout direction.

## The Pattern

```
1. Eyebrow label    → .eyebrow (font-mono, uppercase, tracking-widest, small)
2. Section heading  → font-serif, font-bold, fontSize: var(--text-section)
3. Supporting copy  → One sentence, fontSize: var(--text-body) or --text-body-lg
4. CTA link/button  → .button-primary or inline link
5. Visual           → Image, stat block, card grid — beside or below
```

## Class Reference

| Role | Class / Token | Example |
|---|---|---|
| Eyebrow | `.eyebrow` + colour modifiers | `<span class="eyebrow text-mangrove bg-mangrove/10">From the Field</span>` |
| Heading | `font-serif font-bold` + `fontSize: var(--text-section)` | `<h2 class="font-serif font-bold" style="fontSize: var(--text-section)">Field Notes</h2>` |
| Hero heading | Same but `fontSize: var(--text-hero)` | Only on the homepage hero |
| Stat numeral | `font-serif font-bold tabular-nums` + `fontSize: var(--text-stat)` | Ledger entries |
| Body copy | Default `font-sans` at `var(--text-body)` or `var(--text-body-lg)` | — |
| CTA | `.button-primary` or `.button-secondary` | — |

## Motion Tokens

| Token | Value | Use |
|---|---|---|
| `--ease-settle` | `cubic-bezier(0.16, 1, 0.3, 1)` | All reveals and transitions |
| `--duration-hover` | `200ms` | Hover states |
| `--duration-reveal` | `550ms` | Scroll-triggered reveals |
| `--duration-counter` | `1500ms` | CountUp animations |

## Scroll Reveal

Wrap any section content in `<ScrollReveal>` for consistent viewport-entry animation.
Use `delay` prop for stagger: `<ScrollReveal delay={80}>`.

## Dark/Light Alternation

Sections should alternate between dark (`bg-teal`, `bg-teal-ink`) and light (`bg-paper`, `bg-sand`) backgrounds. This alternation is what prevents the page from feeling flat.

Current homepage rhythm:
1. Hero — `bg-paper` (light)
2. Marquee — `bg-sand-deep/60` (neutral)
3. Field Ledger — `bg-teal` (dark)
4. Programme Carousel — `bg-teal`/`bg-teal-ink`/`bg-mangrove` (dark)
5. Field Notes — `bg-sand` (light)
6. Donate CTA — `bg-teal` (dark)
