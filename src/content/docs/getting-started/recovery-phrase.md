---
title: Recovery phrase
description: What your recovery phrase is, why it exists, how to verify it, and what happens if you lose it.
---

Your recovery phrase is the root of your encryption. Understanding it is worth five minutes of your time.

## What is it?

Your recovery phrase is 12 words, generated randomly when you create your account (a standard BIP39 mnemonic with 128 bits of entropy). Your device runs that phrase through Argon2id to derive your 256-bit master key — the cryptographic root from which all your file encryption keys are derived.

Your password does not derive this key. It only unlocks access to it: at login, [OPAQUE](/reference/security/#opaque-authentication-without-sending-passwords) proves you know your password without ever sending it anywhere, and the secret that comes out of that exchange is used to unwrap your master key. Your recovery phrase is the other, independent path to the same key — it's what you fall back to if you've forgotten your password or lost access to all your signed-in devices.

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

Confirming you copied the phrase down correctly happens once, at signup: during onboarding you're asked to re-enter a few of the words before you can continue. That checkpoint exists precisely so you don't discover a transcription mistake later, when it would matter.

## What happens if you lose it

**We cannot retrieve, reset, or regenerate your recovery phrase for you.** There's no self-service "generate a new phrase" flow in Settings — the phrase you were shown once at signup is the only one your account will ever have. If you didn't save it and you're not sure it's still legible on paper, that's a real gap in your account's safety net, but it isn't urgent on its own: as long as you still have your password and access to a signed-in device, everything keeps working. The recovery phrase only matters the day you also lose your password.

If that day comes and you have lost your password AND your recovery phrase:

1. Your files are not recoverable. Not by us, not by anyone.
2. You can create a new account (same email address, different password) and start fresh.
3. Contact support — we can help delete the old account's data once you verify ownership of the email address.

We are sorry if this happens. It's the direct consequence of genuine zero-knowledge encryption: the same design that keeps us out of your files also keeps us out of any recovery path that doesn't run through something only you hold.

## Technical detail

Your master key is 256 bits (32 bytes). It is derived, deterministically, from your recovery phrase's 128 bits of entropy via Argon2id (256 MiB memory, 4 iterations, 2-way parallelism) — the same phrase always derives the same key, which is what makes it a valid recovery path.

Your password does not derive an independent key. During [OPAQUE](/reference/security/#opaque-authentication-without-sending-passwords) login, the client and server run a password-authenticated key exchange that never transmits your password in any form; the client-only secret that comes out of it is used to unwrap the master key, which is stored — wrapped, never in the clear — on our servers. Change your password and the same master key gets re-wrapped under the new one; the key itself, and everything encrypted under it, never changes.

The recovery phrase itself is never sent to our servers or stored anywhere but with you. What we do hold is a short check value derived from your master key (via HKDF-SHA256, not the phrase itself) — enough to confirm you entered the right phrase during a recovery flow, not enough to derive your key from it.

Source: [`repos/core/beebeeb-core/src/recovery.rs`](https://github.com/beebeeb-io/core/blob/main/beebeeb-core/src/recovery.rs) and [`repos/core/beebeeb-core/src/opaque_protocol.rs`](https://github.com/beebeeb-io/core/blob/main/beebeeb-core/src/opaque_protocol.rs) in the open-source crypto core.
