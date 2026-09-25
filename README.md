<p align="center">
  <a href="https://beebeeb.io"><img src="https://beebeeb.io/assets/beebeeb-icon.png" alt="beebeeb" width="72" height="72" /></a>
</p>
<h1 align="center">beebeeb docs</h1>
<p align="center">Documentation for beebeeb.</p>
<p align="center">
  <a href="https://beebeeb.io/docs"><img src="https://img.shields.io/badge/user%20docs-beebeeb.io%2Fdocs-f5b800.svg" alt="User docs" /></a> &nbsp;
  <img src="https://img.shields.io/badge/built%20with-Starlight-555.svg" alt="Built with Starlight" /> &nbsp;
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-CC%20BY--NC--ND%204.0-555.svg" alt="License: CC BY-NC-ND 4.0" /></a> &nbsp;
  <a href="SECURITY.md"><img src="https://img.shields.io/badge/security-policy-555.svg" alt="Security policy" /></a>
</p>
<p align="center"><a href="https://beebeeb.io">Website</a> &nbsp;·&nbsp; <a href="https://beebeeb.io/docs">User docs</a> &nbsp;·&nbsp; <a href="SECURITY.md">Report a vulnerability</a></p>
<p align="center"><sub>End-to-end encrypted cloud storage, built in Europe. Operated by Initlabs B.V., Wijchen, Netherlands.</sub></p>

---

The open, developer-facing documentation for beebeeb — guides, the CLI reference, and how the
encryption actually works, written so the claims can be checked against the code they describe.
It's an [Astro](https://astro.build) + [Starlight](https://starlight.astro.build) site that builds
to static HTML.

**Where this lives.** This repo is not deployed to a public URL today (no `docs.beebeeb.io` —
`astro.config.mjs`'s `site` field names it as the eventual target, not a live one). The
canonical, user-facing docs that real users are pointed to are served directly from the
(private) marketing site at **[beebeeb.io/docs](https://beebeeb.io/docs)** — that page is
not built from this repo's content. Think of this repo as the open reference: it exists so
anyone can read, clone, and verify the technical claims (key derivation, chunking, what the
server does and doesn't store) against the same open-source clients they describe, without
needing access to the private site repo.

## What's here

```
src/content/docs/
├── getting-started/   Quickstart, recovery phrase
├── guides/            Sharing files, devices, mobile setup, desktop app
├── cli/               Install & login
└── reference/         Security & encryption, account & billing basics, FAQ
```

Pages are Markdown with frontmatter. The sidebar and site config live in
`astro.config.mjs`.

## Run it locally

Requires [Bun](https://bun.sh).

```sh
bun install
bun dev        # http://localhost:4321
bun run build  # static output in dist/
```

## Contributing

- Edit or add a `.md` file under `src/content/docs/`, then register it in the
  `sidebar` array in `astro.config.mjs` if it's a new page.
- Keep the voice honest — say what's true, not what reassures: precise claims you
  can back with a source, not marketing superlatives. Name the city, not the
  hosting provider.
- Run `bun run build` before opening a PR to confirm the site still builds.

## Security

Found a vulnerability? Email **security@beebeeb.io** — see [SECURITY.md](SECURITY.md).

## Part of beebeeb

End-to-end encrypted, zero-knowledge cloud storage — made in Europe.
[core](https://github.com/beebeeb-io/core) · [cli](https://github.com/beebeeb-io/cli) · [web](https://github.com/beebeeb-io/web) · [mobile](https://github.com/beebeeb-io/mobile) · [desktop](https://github.com/beebeeb-io/desktop) · [website](https://beebeeb.io)

## License

[CC BY-NC-ND 4.0](LICENSE) — documentation content. © Initlabs B.V. (KvK 95157565), Wijchen, Netherlands.
