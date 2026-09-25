---
title: FAQ
description: Twelve common questions about Beebeeb, answered honestly.
---

## Can Beebeeb read my files?

No. Your files are encrypted on your device before they leave it. We hold encrypted bytes. Without your master key — which we do not have — the ciphertext is indistinguishable from random noise.

Even if we wanted to read your files, we cannot. Even under a court order, we cannot produce anything useful.

## What happens if Beebeeb is hacked?

An attacker who gains access to our servers would find: encrypted file chunks, encrypted filenames, OPAQUE credential files (which are useless without your password), hashed share passphrases, and session tokens.

None of that is your actual data. Your files remain secure unless the attacker also has your password and recovery phrase.

## What if I forget my password?

You can reset your password using your recovery phrase. Go to [app.beebeeb.io/recover-with-phrase](https://app.beebeeb.io/recover-with-phrase) and enter your recovery phrase.

If you have forgotten both your password and your recovery phrase, your data is unrecoverable. We are sorry — this is the consequence of genuine zero-knowledge encryption.

## What if I lose my recovery phrase?

There's no way to regenerate it — we cannot retrieve, reset, or generate a new recovery phrase for your account. The one you were shown at signup is the only one it will ever have.

As long as you still know your password and can sign in, this isn't urgent: your recovery phrase only matters as a fallback for the day you *also* lose your password. But if you've lost the paper copy, that fallback is gone, and there's no way to restore it — see above for what happens if you lose both.

## Is Beebeeb open source?

Every product client is: the cryptography library ([core](https://github.com/beebeeb-io/core)), the [CLI](https://github.com/beebeeb-io/cli), the [web app](https://github.com/beebeeb-io/web), the [mobile app](https://github.com/beebeeb-io/mobile), and the [desktop app](https://github.com/beebeeb-io/desktop) — every line of code that touches your keys or your files, on every platform, is public.

The server, the marketing site, and internal marketing tooling are private. The server contains operational code that does not need to be public to provide security guarantees — the security comes from the open-source crypto and the zero-knowledge architecture, not from hiding server code. None of that code has been externally audited yet; see [Security & encryption](/reference/security/).

## Where is my data stored?

Falkenstein, Germany — that's where both the object storage holding your encrypted files and the API servers run today. We do not use AWS, Azure, or Google Cloud. All infrastructure is within the EU, and the company (Initlabs B.V.) is Dutch, with no US parent.

See [Beebeeb's security page](https://beebeeb.io/security) for more on jurisdiction.

## Can I self-host Beebeeb?

Not yet, but it's on the roadmap. The server code is structurally designed to support this. When self-hosting is available, you'll be able to point the clients at your own API server.

## How large can my files be?

There is no hard file size limit in the client or server. Very large files (>10 GB) will take significant time to encrypt and upload depending on your connection. We recommend the CLI or desktop app for large files rather than the browser.

Plans start at 100 GB (Starter) and scale to 200 GB (Basic) and 1 TB base with paid add-ons up to 99 TB self-serve (Pro) — see [beebeeb.io/pricing](https://beebeeb.io/pricing) for current plans and prices. Beyond 99 TB, contact support for a custom quote; we never promise "unlimited" storage.

## Does Beebeeb work offline?

Partially. The web app requires a network connection to load and to upload/download files. The mobile app shows cached file listings when offline. The CLI and desktop app can access recently synced files from local cache.

Full offline support (two-way sync with conflict resolution) is on the roadmap.

## Can I use Beebeeb for HIPAA / GDPR regulated data?

Initlabs B.V. is established in the Netherlands and processes personal data under the GDPR and Dutch implementing law. Beebeeb's zero-knowledge architecture means we hold only ciphertext that is meaningless without your keys — but that's an architectural property, not a compliance certificate on its own. Current status on specific frameworks (certifications, assessments) is tracked on [Beebeeb's security page](https://beebeeb.io/security), not here — check there rather than trusting this doc to stay current on it. We offer a Data Processing Agreement (DPA) for EU customers — contact support to request one.

HIPAA is a US regulatory framework that Beebeeb does not claim to satisfy. Encrypted storage alone is not HIPAA compliance — that also requires audit logging, access controls, and a signed BAA, none of which we currently provide. Contact support if you have specific regulated-data requirements to discuss.

## How does the share link work cryptographically?

The decryption key is encoded in the URL fragment (`#key=...`). Browsers never send the fragment to the server — it is processed client-side only.

When someone opens a share link, their browser fetches the encrypted file from our server and the decryption key from the URL fragment. Decryption runs in their browser. We serve ciphertext; we never see plaintext.

## How do I delete my account?

Go to **Settings → Profile → Delete account** (or Settings → Privacy → Delete account — it's linked from both). This requires step-up authentication (you'll be asked to confirm your password).

Deletion permanently removes your account, all files (both the database records and the storage objects), and all active sessions. This action cannot be undone.
