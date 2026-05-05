---
title: Sharing files
description: Create share links, add passphrase protection, set expiry limits, and revoke access.
---

Beebeeb share links let anyone open and download a file — no account required. The decryption key is embedded in the link, so the recipient can decrypt the file in their browser.

## Creating a share link

1. Right-click a file and choose **Share**, or click the share icon in the file toolbar.
2. Configure the link options (see below).
3. Click **Create link**. The link is copied to your clipboard.

The generated URL looks like:

```
https://app.beebeeb.io/s/abc123def456#key=7f3a...c9d2
```

The `#key=...` fragment contains the file's decryption key. This fragment is never sent to our servers — browsers strip it before making HTTP requests. Even if our servers were compromised, this part of the URL would not be there.

## Link options

### Passphrase protection

Add a passphrase to require the recipient to enter it before viewing the file. The passphrase is hashed with Argon2id on our server; we never store it in plaintext.

When a passphrase is set, the file can only be opened with both the link and the passphrase. Revoking one (without the other) prevents access.

### Expiry date

Set a date after which the link stops working. Useful for time-sensitive documents.

### Max opens

Limit how many times the file can be opened. After the limit is reached, the link returns an error.

Note: "opens" are counted when the metadata is fetched, not when the file is downloaded. Opening the same link in two browser tabs counts as two opens.

## What recipients see

Recipients see a preview of the file (if supported) with:

- The file name and size (decrypted client-side in their browser)
- Who shared it and when it expires
- A "Download and decrypt" button

The [Glassbox panel](/guides/sharing/#the-glassbox-panel) shows the actual ciphertext from our servers alongside the decrypted file — a visual demonstration that we can't read the content.

## Revoking a link

Go to **Settings → Shares → My links** (or the Shares tab in the sidebar). Click the **Revoke** button next to any active link.

Revocation nulls out the wrapped file key on our server. Even someone who has the URL can no longer decrypt the file — the key doesn't exist anymore. The URL becomes permanently dead.

## Best practices

- For sensitive documents, always set a passphrase and an expiry date.
- Share the link and passphrase through separate channels (e.g. link via email, passphrase via Signal).
- For one-time access, set max-opens to 1.
- Review your active shares periodically and revoke any that are no longer needed.
