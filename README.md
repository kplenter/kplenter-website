# k-plenter.de

Personal website of Kevin Plenter — a bilingual (DE/EN) one-page landing site / interactive CV. Refined, restrained dark-mode aesthetic (navy + gold, Playfair Display + DM Sans), statically generated with Astro 6.

Live: <https://k-plenter.de>

## Stack

- **Astro 6** — static site generator with built-in i18n and content collections.
- **Tailwind CSS v4** via `@tailwindcss/vite` — no separate Astro integration needed.
- **@fontsource/playfair-display** + **@fontsource/dm-sans** — self-hosted fonts (GDPR-friendly, no Google Fonts CDN).
- **@astrojs/sitemap** — automatic sitemap generation.
- No animation or UI library — fade-ins via Intersection Observer + CSS, everything hand-rolled.

## Commands

```sh
pnpm install        # Install dependencies
pnpm dev            # Dev server on localhost:4321
pnpm build          # Static build into ./dist/
pnpm preview        # Preview the build locally
```

Requires Node 26 LTS (see [.nvmrc](.nvmrc) and `engines` in [package.json](package.json)).

## Routing & i18n

Astro's built-in i18n with `prefixDefaultLocale: false`:

- `/` → German (default)
- `/en/` → English
- `/impressum`, `/datenschutz` — DE legal pages
- `/en/imprint`, `/en/privacy` — EN legal pages

UI strings live in [src/i18n/de.json](src/i18n/de.json) and [src/i18n/en.json](src/i18n/en.json), read via the helper in [src/i18n/ui.ts](src/i18n/ui.ts).

## Content collections

All editorial content is maintained in [src/content/](src/content/) — no code changes are needed to update content.

| Collection | Path | Format | Description |
|---|---|---|---|
| `cv` | [src/content/cv/](src/content/cv/) | Markdown | CV stations, one file per station per language (e.g. `eq_3.de.md` / `eq_3.en.md`). |
| `projects` | [src/content/projects/](src/content/projects/) | Markdown | Anonymised projects, one file per project per language. |
| `skills` | [src/content/skills.json](src/content/skills.json) | JSON | Categorised tech skills (language-neutral, with DE/EN category labels). |
| `legal` | [src/content/legal/](src/content/legal/) | Markdown | Imprint + privacy policy, in DE and EN. |

Schemas are defined in [src/content.config.ts](src/content.config.ts). Language filtering happens via the `lang` frontmatter field.

### Editing content

- **Add a CV station:** create two files (`<slug>.de.md`, `<slug>.en.md`) in `src/content/cv/`. Required frontmatter: `lang`, `company`, `role`, `start`, `summary`, `order`. Higher `order` = newer (top of the timeline).
- **Add a project:** create two files in `src/content/projects/`. Required frontmatter: `lang`, `title`, `industry`, `summary`, `start`, `order`.
- **Add a skill:** add the item to the matching category in `skills.json`.
- **Legal text:** edit the four Markdown files under `src/content/legal/` directly.

## Directory layout

```
src/
├── components/
│   ├── layout/        # Nav, Footer
│   ├── sections/      # Hero, About, CvTimeline, Projects, Skills, Contact
│   └── ui/            # Button, Tag, ProjectCard, TimelineEntry, SocialIcons, ...
├── content/           # Content collections (see above)
├── i18n/              # de.json, en.json, ui.ts
├── layouts/
│   └── BaseLayout.astro   # HTML shell, meta/OG, reveal observer
├── pages/
│   ├── index.astro                # / (DE)
│   ├── impressum.astro
│   ├── datenschutz.astro
│   └── en/
│       ├── index.astro            # /en/
│       ├── imprint.astro
│       └── privacy.astro
└── styles/
    └── global.css     # Tailwind import, theme tokens, reveal animation, legal-prose
```

## Design system

Theme tokens are defined in [src/styles/global.css](src/styles/global.css) as CSS variables and exposed to Tailwind via `@theme`:

```css
--color-primary:      #1a2540;   /* background */
--color-primary-soft: #1f2c4b;
--color-primary-deep: #131b30;
--color-secondary:    #c8a96e;   /* accent (gold) */
--color-fg:           #e8e6e1;
--color-muted:        #8a8d96;
--font-display:       "Playfair Display";
--font-body:          "DM Sans";
```

The hero uses a typographic layout (layered name with a gold outline echo) on a subtle aurora gradient background — no hero photo.

## Animations

Reveal-on-scroll via Intersection Observer (see the inline script in [BaseLayout.astro](src/layouts/BaseLayout.astro)). Components opt in by setting `data-reveal`; add `style="--reveal-delay: 200ms"` for staggered entries. `prefers-reduced-motion` is respected (animations turn off entirely).

## SEO

`BaseLayout` automatically emits:

- `<html lang>` matching the active language
- canonical link plus `hreflang` (de, en, x-default)
- OpenGraph + Twitter Card meta tags (OG image from `/public/og-image.jpg` — TODO)
- Sitemap generated automatically via `@astrojs/sitemap`

## Deployment

Static hosting on a self-managed server. `pnpm build` produces `./dist/` (including `sitemap-index.xml`), ready to be deployed as-is.

## Open items

- `public/cv-kevin-plenter.pdf` — CV download asset
- `public/og-image.jpg` (1200×630) — OG image for social previews
