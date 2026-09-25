---
title: Security & encryption
description: How AES-256-GCM, OPAQUE, and HKDF work together to make Beebeeb zero-knowledge by architecture.
---

This page explains the cryptographic design of Beebeeb for readers who want to understand or verify the security claims.

## What "zero-knowledge" means

Zero-knowledge means the server holds ciphertext but cannot decrypt it. Not because we choose not to, but because we do not possess the keys.

This is a structural property: even if our servers were fully compromised — database leaked, server code replaced, employees coerced — the adversary gets encrypted bytes they cannot decrypt without your master key, which we do not have.

## Key hierarchy

Beebeeb uses a three-level key hierarchy:

```
Master key (256-bit, derived from your 12-word recovery phrase)
    │
    ├── File key = HKDF-SHA256(master_key, file_id)
    │       │
    │       └── Chunk keys = (file_key, per-chunk nonce)
    │
    └── Filename key = derived via the same HKDF path
```

### Master key

A 256-bit key, derived at account creation from your 12-word recovery phrase (128 bits of BIP39 entropy) via Argon2id — deterministically, so the same phrase always reproduces the same key.

Your password does not derive this key independently; it only unlocks access to it. At login, [OPAQUE](#opaque-authentication-without-sending-passwords) proves you know your password without your device ever transmitting it, and the secret produced by that exchange is used to unwrap the master key, which is stored on our servers wrapped, never in the clear. Change your password and the key gets re-wrapped under it — the key itself doesn't change.

We never see the unwrapped master key. It exists only in your browser (WebAssembly) or app after you authenticate.

### File keys

Each file gets a unique encryption key derived from the master key and the file's UUID:

```
file_key = HKDF-SHA256(master_key, file_id, "file-key")
```

HKDF (HMAC-based Key Derivation Function, RFC 5869) is deterministic given the same inputs — you can re-derive the same file key any time you have the master key and file ID. This means we do not need to store file keys anywhere.

### Chunk encryption

Files are split into chunks — chunk size scales with file size rather than being fixed, up to a 256 MiB ceiling per chunk. Each chunk is encrypted independently with AES-256-GCM:

```
ciphertext = AES-256-GCM.encrypt(file_key, nonce, plaintext)
```

Where `nonce` is a random 12-byte value generated fresh for each chunk. The GCM authentication tag (16 bytes) is appended to each ciphertext chunk. If any byte of the ciphertext is modified after encryption, decryption fails — this provides tamper detection.

The on-disk (and in-server) format for each chunk is:

```
[12-byte nonce][ciphertext][16-byte GCM tag]
```

## OPAQUE: authentication without sending passwords

Beebeeb uses [OPAQUE](https://eprint.iacr.org/2018/163.pdf), a Password-Authenticated Key Exchange (PAKE) protocol from the IETF CFRG standardization track, for authentication.

Traditional password authentication: the server receives a hash of your password and compares it to a stored hash. If the server is breached, the hashes are exposed and offline cracking is possible.

OPAQUE works differently:

1. **Registration**: The client computes a blinded password using an OPRF (Oblivious Pseudorandom Function). The server processes the blinded password without learning the password. The result is a "credential file" stored on the server.

2. **Login**: The client and server execute a protocol in which the server verifies the client knows the correct password, without either side sending the password. Both sides derive a shared session key as output.

The server stores a credential file that is useless without the client's password. Even if our database is leaked, your password cannot be recovered from it.

## Password-protected shares

Share passphrases are hashed with Argon2id (memory: 64 MiB, iterations: 3, parallelism: 1) before storage. The passphrase is not used to derive any encryption key — it is only a gate before the file's actual key is served.

## What the server stores

| Data | Form stored | Who can read |
|------|-------------|--------------|
| Files | AES-256-GCM ciphertext | Nobody without the file key |
| Filenames | AES-256-GCM ciphertext | Nobody without the file key |
| Folder names | AES-256-GCM ciphertext | Nobody without the file key |
| Master key | Wrapped via your OPAQUE login (never in the clear) | Nobody without your password or recovery phrase |
| Recovery phrase | **Never stored.** We hold only an HKDF-derived check value, useful for confirming you entered the right phrase — not for deriving your key from it | You only |
| Email addresses | Plaintext | Beebeeb (needed for auth) |
| Session tokens | Random 32-byte tokens, 30-day TTL | Beebeeb |
| Share keys | Wrapped under server key | Beebeeb (nulled on revocation) |

## Where encryption runs

All encryption and decryption runs in your browser (WebAssembly) or natively in the iOS and desktop apps, and in the CLI. (Android ships after the iOS launch — see [Mobile setup](/guides/mobile/).) The underlying Rust cryptography library is open source at [github.com/beebeeb-io/core](https://github.com/beebeeb-io/core), along with the [CLI](https://github.com/beebeeb-io/cli), [web](https://github.com/beebeeb-io/web), [mobile](https://github.com/beebeeb-io/mobile), and [desktop](https://github.com/beebeeb-io/desktop) clients. The server, which never handles plaintext or keys, is not open source.

Beebeeb's own code has not been externally audited yet — the crypto core has been reviewed in house by the founding engineers, and every commit is merged by a human, but no independent third party has evaluated it. If you want to verify the encryption for yourself, the library is open source: read it, or compile it and compare the binary to what we serve.

## Infrastructure

Ciphertext is stored in Falkenstein, Germany. API servers run on infrastructure in the same location. Everything is operated by Initlabs B.V. (Wijchen, Netherlands). No US parent company, and no US infrastructure in the data path.

See [Beebeeb's security page](https://beebeeb.io/security) for more on jurisdiction and infrastructure.

## Reporting a vulnerability

Found a security issue? Email **security@beebeeb.io**. We acknowledge within 48 hours and keep you updated until it's resolved. See [SECURITY.md](https://github.com/beebeeb-io/docs/blob/main/SECURITY.md) for full scope and disclosure guidelines.
