// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';
import starlight from '@astrojs/starlight';
import mdx from '@astrojs/mdx';

// Starlight ships its own is:inline scripts (theme toggle, sidebar state, search),
// so its CSP needs 'unsafe-inline' on script-src, unlike the main site's pages.
const docsCsp =
  "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'; base-uri 'self'; form-action 'self'; frame-ancestors 'none';";

// https://astro.build/config
export default defineConfig({
  site: 'https://iamunnip.github.io',
  output: 'static',

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    sitemap(),
    starlight({
      title: 'Unni P - Docs',
      description: 'Technical writeups, runbooks, and project documentation from Unni P, Site Reliability Engineer.',
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/iamunnip' },
        { icon: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com/in/unni-p' },
      ],
      // Auto-builds sidebar groups from the folders inside src/content/docs/docs/.
      // Add a new section by creating a new folder there - nothing to edit here.
      sidebar: [
        { label: 'Back to Portfolio', link: '/' },
        { label: 'Overview', link: '/docs' },
        { autogenerate: { directory: 'docs' } },
      ],
      head: [
        { tag: 'meta', attrs: { 'http-equiv': 'Content-Security-Policy', content: docsCsp } },
        { tag: 'meta', attrs: { name: 'referrer', content: 'strict-origin-when-cross-origin' } },
      ],
    }),
    // Must come after starlight() - Starlight sets up its own markdown/MDX
    // processing that @astrojs/mdx needs to layer on top of.
    mdx(),
  ],
});