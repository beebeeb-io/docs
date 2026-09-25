---
title: Quickstart
description: Create your account, save your recovery phrase, upload your first file, and share a link — in about five minutes.
---

This guide takes you from zero to a working encrypted drive in five minutes.

## 1. Create your account

Go to [app.beebeeb.io/signup](https://app.beebeeb.io/signup). Enter your email and a strong password.

Beebeeb uses OPAQUE — a Password-Authenticated Key Exchange protocol — which means your password is never sent to our servers, not even as a hash. You can read more about this in [Security & encryption](/reference/security/).

## 2. Save your recovery phrase

After signup, you'll see a 12-word recovery phrase. **Write it down on paper and store it somewhere safe.**

This phrase is the only way to recover your account if you lose access to your device. We cannot recover it for you. There is no "forgot recovery phrase" button — by design.

- Do not screenshot it.
- Do not store it in the cloud (that defeats the purpose).
- Do not store it in the same place as your device.

Once you've written it down, tick the confirmation checkbox and click **Verify my phrase** to confirm you've saved it correctly.

## 3. Upload your first file

From the drive view, click **Upload** (or drag and drop files into the window).

Your files are encrypted on your device before they leave it. Each file's encryption key is derived from your master key, and your master key is derived from your recovery phrase — your password only unlocks access to it, it doesn't derive it. We never see your files, filenames, or keys.

You can also create folders to organise your files.

## 4. Share a file

Right-click any file and choose **Share**. A share link is generated with the decryption key embedded in the URL fragment (`#key=...`).

The key fragment is never sent to our servers — browsers strip it before making HTTP requests. Share the link with anyone; they can open and download the file without a Beebeeb account.

For sensitive shares, you can add a passphrase (the recipient will be prompted to enter it before viewing) and set an expiry date or max-opens limit.

## What's next?

- Read about the [recovery phrase](/getting-started/recovery-phrase/) and what happens if you lose it
- Learn about [sharing files](/guides/sharing/) in detail
- See and manage your [connected devices](/guides/devices/)
- Install the [mobile app](/guides/mobile/) or [desktop app](/guides/desktop/)
- Set up the [CLI](/cli/install/) for scripted workflows
- Check [plans and billing basics](/reference/billing/) if you're deciding on a plan
