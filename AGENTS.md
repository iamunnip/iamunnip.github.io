## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Docs section (/docs)

Powered by Starlight, using its default theme (no custom CSS). Content lives
under `src/content/docs/docs/` (the extra `docs/` nesting is required to get
`/docs/...` URLs instead of colliding with the portfolio homepage at `/` -
see https://starlight.astro.build/manual-setup/). Currently just the default
Starlight scaffold splash page (`docs/index.mdx`) - no other sections yet.

**To add a page**: drop a `.md` or `.mdx` file under `src/content/docs/docs/`
with frontmatter:

```md
---
title: Page Title
description: One-line summary.
---

Content here.
```

**To add a brand-new top-level section**: create a new folder under
`src/content/docs/docs/` (e.g. `src/content/docs/docs/talks/`) and put files
in it. The sidebar in `astro.config.mjs` auto-generates from that directory's
folder structure - no config edit needed. Folder names become the sidebar
labels verbatim, so use lowercase-kebab-case names.

MDX support (`@astrojs/mdx`) is installed site-wide, so `.mdx` files can use
JSX/component imports, e.g. Starlight's built-in `<Card>`/`<CardGrid>`.

## Blog section (/blog)

Separate from the docs section - a plain Astro content collection at
`src/content/blog/` (schema in `src/content.config.ts`: `title`,
`description`, `pubDate`, `updatedDate`, `tags`, `draft`), rendered through
custom pages (`src/pages/blog/index.astro`, `src/pages/blog/[slug].astro`)
that match the portfolio's own theme (Inter font, dark palette) rather than
Starlight's. `draft: true` posts are excluded from production builds.

**To add a post**: drop a `.md` or `.mdx` file into `src/content/blog/` with
the frontmatter above - it's picked up automatically on the listing page,
its own page, and the RSS feed at `/rss.xml` (`src/pages/rss.xml.js`).

## Content cache gotcha

Astro's content layer caches collection data in *two* places:
`.astro/data-store.json` and `node_modules/.astro/data-store.json`. Deleting
a content file doesn't always invalidate both - if a deleted post/doc still
shows up after a rebuild, clear both (`rm -rf .astro node_modules/.astro`)
and rebuild.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
