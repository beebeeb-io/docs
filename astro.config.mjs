import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'

export default defineConfig({
  site: 'https://docs.beebeeb.io',
  output: 'static',
  integrations: [
    starlight({
      title: 'Beebeeb Docs',
      description:
        'Documentation for Beebeeb — end-to-end encrypted, zero-knowledge cloud storage. Made in Europe.',
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/beebeeb-io' },
      ],
      editLink: {
        baseUrl: 'https://github.com/beebeeb-io/docs/edit/main/',
      },
      customCss: ['./src/styles/custom.css'],
      head: [
        {
          tag: 'meta',
          attrs: { property: 'og:site_name', content: 'Beebeeb Docs' },
        },
        // Default to dark color scheme on first visit
        {
          tag: 'script',
          content:
            'if(!localStorage.getItem("starlight-theme"))localStorage.setItem("starlight-theme","dark")',
        },
      ],
      sidebar: [
        {
          label: 'Getting Started',
          items: [
            { label: 'Quickstart', slug: 'getting-started/quickstart' },
            { label: 'Recovery phrase', slug: 'getting-started/recovery-phrase' },
          ],
        },
        {
          label: 'Features',
          items: [
            { label: 'Sharing files', slug: 'guides/sharing' },
            { label: 'Mobile setup', slug: 'guides/mobile' },
            { label: 'Desktop app', slug: 'guides/desktop' },
          ],
        },
        {
          label: 'CLI',
          items: [
            { label: 'Install & login', slug: 'cli/install' },
          ],
        },
        {
          label: 'Reference',
          items: [
            { label: 'Security & encryption', slug: 'reference/security' },
            { label: 'FAQ', slug: 'reference/faq' },
          ],
        },
      ],
    }),
  ],
})
