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
Master key (256-bit random)
    │
    ├── File key = HKDF-SHA256(master_key, file_id)
    │       │
    │       └── Chunk keys = (file_key, per-chunk nonce)
    │
    └── Filename key = derived via the same HKDF path
```

### Master key

A 256-bit random value generated at account creation. It is derived from your password via OPAQUE and stored on our servers wrapped under the OPAQUE session key. Your recovery phrase encodes this key as a BIP39 mnemonic.

We never see the master key. It exists only in your browser (or app) after you authenticate.

### File keys

Each file gets a unique encryption key derived from the master key and the file's UUID:

```
file_key = HKDF-SHA256(master_key, file_id, "file-key")
```

HKDF (HMAC-based Key Derivation Function, RFC 5869) is deterministic given the same inputs — you can re-derive the same file key any time you have the master key and file ID. This means we do not need to store file keys anywhere.

### Chunk encryption

Files are split into 4 MB chunks. Each chunk is encrypted with AES-256-GCM:

```
ciphertext = AES-256-GCM.encrypt(file_key, nonce, plaintext)
```

Where `nonce` is a random 12-byte value generated fresh for each chunk. The GCM authentication tag (16 bytes) is appended to each ciphertext chunk. If any byte of the ciphertext is modified after encryption, decryption fails — this provides tamper detection.

The on-disk (and in-server) format for each chunk is:

```
[12-byte nonce][ciphertext][16-byte GCM tag]
```

## OPAQUE: authentication without sending passwords

Beebeeb uses [OPAQUE](https://eprint.iacr.org/2018/163.pdf) (RFC draft, IETF 2023) for authentication.

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
| Master key | OPAQUE-wrapped | Nobody without the password |
| Recovery phrase | Encoded as BIP39 mnemonic | User only (stored offline) |
| Email addresses | Plaintext | Beebeeb (needed for auth) |
| Session tokens | Random 32-byte tokens, 30-day TTL | Beebeeb |
| Share keys | Wrapped under server key | Beebeeb (nulled on revocation) |

## Where encryption runs

All encryption and decryption runs in your browser (WebAssembly) or natively in the iOS/Android/desktop app. The underlying Rust cryptography library is open source at [github.com/beebeeb-io/core](https://github.com/beebeeb-io/core).

If you want to verify that we're not lying about this, you can compile the library yourself and compare the binary to what we serve.

## Infrastructure

Ciphertext is stored in Hetzner Object Storage (Falkenstein, Germany). API servers run on Hetzner VMs. Everything is operated by Initlabs B.V. (Netherlands). No US parent company.

See [What "Made in Europe" means](https://beebeeb.io/blog/what-made-in-europe-means) for more on jurisdiction and the Cloud Act.
