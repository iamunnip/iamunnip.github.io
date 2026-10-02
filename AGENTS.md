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

## Branches and deploys

- Work on `develop` (pull first). The site deploys only from `main`, which the
  owner merges. Never push to `main`, and don't commit or push unless asked.
- Commits are made as the owner: no `Co-Authored-By` trailer, no "Generated
  with" line, nothing identifying an AI, in commits or PRs.
- Before pushing: `npm run build` must pass, and check the rendered pages
  (headless Chrome screenshots) for lists, tables, code blocks and images.

## Shared Markdown/MDX rendering

Blog posts and project pages render their body through one component,
`src/components/Prose.astro`, which holds all the typography styles (headings,
lists, tables, code blocks, blockquotes). Change styles there, not per page.
Both collections accept `.md` and `.mdx`.

## Blog section (/blog)

Separate from the docs section - a plain Astro content collection at
`src/content/blog/` (schema in `src/content.config.ts`), rendered through
custom pages (`src/pages/blog/index.astro`, `src/pages/blog/[slug].astro`)
that match the portfolio's own theme (Inter font, dark palette) rather than
Starlight's. `draft: true` posts are excluded from production builds.

- **URL:** `/blog/<slug>/` - `blog` is singular (the section), unlike
  `/projects/`. The slug is the file name.
- **Post file:** `src/content/blog/<slug>.md` or `.mdx`. It's picked up
  automatically on the listing page, its own page and the RSS feed at
  `/rss.xml` (`src/pages/rss.xml.js`).
- **Slug:** flat, lowercase-kebab-case and descriptive, e.g.
  `gitea-on-kubernetes-from-scratch`. No nested paths and no part numbers.
  Renaming a post is a plain rename (file and image folder): no redirects.
- **Front matter:** `title`, `description`, `pubDate`, optional
  `updatedDate`, `tags`, `draft`. No H1 in the body; the layout renders the
  title.
- **Images:** in `src/content/blog/<slug>/`, linked as
  `./<slug>/<file>.png`. Only keep images the post actually uses.

## Projects section (home page + /projects)

A content collection at `src/content/projects/` (schema in
`src/content.config.ts`). The home page's Featured Projects cards
(`src/components/Projects.astro`) are built from it, sorted by `order`;
drafts are hidden in production.

- **Project file:** `src/content/projects/<slug>.md` or `.mdx`.
- **Front matter:** `title`, `description`, `metrics` (map of label to value,
  three entries fit the card), `tags`, `order` (card position, low first),
  optional `repo` and `link` URLs, `draft`.
- **Project page:** `/projects/<slug>/` (`src/pages/projects/[slug].astro`)
  is generated **only when the file has a body**. The card title links to it
  only then, so cards without a write-up stay unlinked. There's no
  `/projects/` index page.
- **Images:** in `src/content/projects/<slug>/`, linked as
  `./<slug>/<file>.png`.

## Writing style (blog posts and project write-ups)

- Written for the portfolio only (not Medium or dev.to).
- Must read as written by a human: simple plain English, contractions, first
  person, varied sentences. Never invent personal experiences.
- No em dashes and no en dashes.
- Explain things in bullet points, each two or three sentences. Use tables
  for glossaries, versions and side-by-side comparisons.
- Explain every command, flag and config line. Go step by step and use ASCII
  diagrams in code blocks.
- Commands go in `console` blocks with a `$ ` prompt; continuation lines and
  output have no prompt. Files use their own language (`yaml`, `dockerfile`,
  `python`, ...) with no prompt.
- Use long flags when they exist (`--namespace`, not `-n`), Docker management
  commands (`docker image build`, `docker container run`), and CLIs rather
  than raw API calls.
- Show real command output from an actual run, not invented output.
  Screenshots only for UI screens. Replace real hostnames with
  `git.example.com`-style placeholders.
- Posts stand alone: never "Part 1/2/3" or "series" in text, titles or slugs.
  Mention related posts by title; only link posts that already exist.

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
