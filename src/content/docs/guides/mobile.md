---
title: Mobile setup
description: Install the Beebeeb iOS app, sign in, and upload files from your camera roll.
---

The Beebeeb iOS app gives you encrypted access to your files from your phone, with background photo backup and Share Extension support.

## Installation

Download **Beebeeb** from the [App Store](https://apps.apple.com/app/beebeeb/id123456789).

The app requires iOS 16.0 or later. An Apple Silicon Mac with macOS 13+ can run the iOS version natively.

## Signing in

Open the app and enter your email and password. The app uses the same OPAQUE authentication as the web — your password never leaves your device.

After signing in, you'll be asked to enter or verify your recovery phrase. This is required before you can upload files — it confirms you've saved the phrase that protects your master key.

## Uploading from the camera roll

Tap the **+** button (bottom right) and choose **Upload photo**. Grant photo library access when prompted.

Photos are encrypted before they leave your device, chunk by chunk. Large photos are split into 4 MB chunks, each encrypted independently with AES-256-GCM. The encrypted chunks are uploaded to Hetzner Object Storage in Falkenstein, Germany.

## Photo backup

Beebeeb can back up your camera roll automatically:

1. Go to **Settings → Backup**.
2. Enable **Photo backup**.
3. Choose whether to back up on Wi-Fi only (recommended) or any connection.

Background backup runs when the system allocates background time (iOS Background App Refresh). For reliable backups, keep the app open occasionally or enable background app refresh in iOS Settings.

## Share Extension

You can share files to Beebeeb from any app that supports iOS sharing:

1. Open a file in any app (Files, Photos, Safari, etc.).
2. Tap the share icon.
3. Tap **Beebeeb** in the share sheet.

The file is queued and uploaded the next time you open the Beebeeb app (or immediately if the app is already in the foreground). Files shared this way are encrypted before upload — the Share Extension never sends plaintext to our servers.

## Biometric lock

Enable Face ID or Touch ID for the app in **Settings → Security → Biometric lock**. The app will prompt for biometric authentication when it returns from the background after a configurable delay (default: immediately).

## Troubleshooting

**"Vault locked" after phone restart**: This is expected on first unlock after restart. iOS clears secure enclave keys on reboot as a security measure. Enter your password to unlock.

**Upload stuck**: Check your network connection. If stuck indefinitely, force-quit the app and reopen it — uploads resume from where they left off.

**Photos not backing up**: Verify that iOS has granted background app refresh to Beebeeb in Settings → General → Background App Refresh.
