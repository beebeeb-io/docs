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

You can reset your password using your recovery phrase. Go to [app.beebeeb.io/recover](https://app.beebeeb.io/recover) and enter your recovery phrase.

If you have forgotten both your password and your recovery phrase, your data is unrecoverable. We are sorry — this is the consequence of genuine zero-knowledge encryption.

## What if I lose my recovery phrase?

If you still know your password and have an active session, go to **Settings → Security → Recovery phrase** and generate a new one. This replaces the old phrase; your files are unaffected.

If you have lost both your password and your recovery phrase, see above.

## Is Beebeeb open source?

The cryptography library ([beebeeb-io/core](https://github.com/beebeeb-io/core)) and CLI ([beebeeb-io/cli](https://github.com/beebeeb-io/cli)) are open source. The web client ([beebeeb-io/web](https://github.com/beebeeb-io/web)) is also open source.

The server is private — it contains operational code that does not need to be public to provide security guarantees. The security comes from the open-source crypto, not from hiding server code.

## Where is my data stored?

Encrypted files are stored in Hetzner Object Storage in Falkenstein, Germany. API servers are also on Hetzner infrastructure. We do not use AWS, Azure, or Google Cloud. All infrastructure is within the EU.

See [What "Made in Europe" means](https://beebeeb.io/blog/what-made-in-europe-means) for details on jurisdiction and the Cloud Act.

## Can I self-host Beebeeb?

Not yet, but it's on the roadmap. The server code is structurally designed to support this. When self-hosting is available, you'll be able to point the clients at your own API server.

## How large can my files be?

There is no hard file size limit in the client or server. Very large files (>10 GB) will take significant time to encrypt and upload depending on your connection. We recommend the CLI or desktop app for large files rather than the browser.

The default plan includes 20 GB of storage. Higher limits are available on paid plans.

## Does Beebeeb work offline?

Partially. The web app requires a network connection to load and to upload/download files. The mobile app shows cached file listings when offline. The CLI and desktop app can access recently synced files from local cache.

Full offline support (two-way sync with conflict resolution) is on the roadmap.

## Can I use Beebeeb for HIPAA / GDPR regulated data?

Beebeeb's architecture — zero-knowledge encryption, EU infrastructure, Dutch jurisdiction — is well-suited for GDPR compliance. The encryption means we are not a "data processor" in the usual sense: we hold ciphertext that is meaningless without your keys.

For HIPAA, Beebeeb can serve as encrypted storage, but HIPAA compliance requires more than encrypted storage (audit logging, access controls, BAA agreement). We offer a Data Processing Agreement (DPA) for EU customers. Contact support to discuss enterprise requirements.

## How does the share link work cryptographically?

The decryption key is encoded in the URL fragment (`#key=...`). Browsers never send the fragment to the server — it is processed client-side only.

When someone opens a share link, their browser fetches the encrypted file from our server and the decryption key from the URL fragment. Decryption runs in their browser. We serve ciphertext; we never see plaintext.

## How do I delete my account?

Go to **Settings → Account → Delete account**. This requires step-up authentication (you'll be asked to confirm your password).

Deletion permanently removes your account, all files (both the database records and the storage objects), and all active sessions. This action cannot be undone.
