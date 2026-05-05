---
title: Recovery phrase
description: What your recovery phrase is, why it exists, how to verify it, and what happens if you lose it.
---

Your recovery phrase is the root of your encryption. Understanding it is worth five minutes of your time.

## What is it?

Your recovery phrase is 24 words generated randomly when you create your account. It encodes a 256-bit master key — the cryptographic root from which all your file encryption keys are derived.

When you sign in on a new device, Beebeeb re-derives your master key from the OPAQUE protocol's output and your password. Your recovery phrase provides a path to that key that doesn't require your password — useful when you've forgotten your password or lost access to all your devices.

## Why it matters

Beebeeb is zero-knowledge by architecture. We cannot read your files, and we cannot recover your master key. That property is what makes the encryption meaningful — but it also means there is no back door.

If you lose both your password and your recovery phrase, your data is permanently unrecoverable. Not "we'll look into it" unrecoverable — mathematically unrecoverable. The keys do not exist anywhere except in your possession.

This is not a limitation we're planning to fix. It is the design.

## How to store it safely

- **Write it on paper.** Pen and paper cannot be hacked, phished, or synced to a cloud service you forgot about.
- **Store it somewhere physically secure.** A fireproof safe, a safe-deposit box, or a trusted person's home.
- **Do not screenshot it** and store the screenshot on the same device.
- **Do not store it in your password manager** unless that password manager is itself end-to-end encrypted and you understand the implications.
- **Make a second copy** and store it in a different physical location.

## Testing your phrase

You should verify your phrase before you rely on it.

In the web app: go to **Settings → Security → Test your recovery phrase**. You'll be asked to enter a few specific words. If they match, your backup is valid.

Do this once when you set up your account. Do it again any time you move your paper copy to a new location (to make sure you copied it correctly).

## What happens if you lose it

If you know your password and still have access to an unlocked device, you can **reset your recovery phrase** from Settings. This generates a new phrase and re-wraps your master key. Your existing files are unaffected.

If you have lost your password AND your recovery phrase:

1. Your files are not recoverable.
2. You can create a new account (same email address, different password).
3. Contact support — we can delete the old account data if you verify ownership of the email address.

We are sorry if this happens. It's the consequence of genuine zero-knowledge encryption, and we think it's the right trade-off.

## Technical detail

Your master key is a 256-bit random value generated at account creation. It is stored on our servers wrapped under a key derived from your OPAQUE session key. Your recovery phrase is a BIP39 mnemonic that encodes the same master key in a human-readable form.

When you use the recovery phrase to sign in, the app derives the master key from the phrase, then re-wraps it under the new OPAQUE credential on our server.
