---
title: Mobile setup
description: What the Beebeeb iOS app does — sign in, camera roll upload, photo backup, and Share Extension support. Coming to the App Store; not yet available.
---

The Beebeeb iOS app gives you encrypted access to your files from your phone, with background photo backup and Share Extension support.

## Installation

**The iOS app is not on the App Store yet.** It's in active development and review, and this page describes what it does once it's available — see [beebeeb.io/download](https://beebeeb.io/download) for current status. Android is planned to follow after the iOS launch; until then, use the [web app](https://app.beebeeb.io) or the [CLI](/cli/install/) on Android.

The app requires iOS 16.0 or later. An Apple Silicon Mac with macOS 13+ can run the iOS version natively.

## Signing in

Open the app and enter your email and password. The app uses the same OPAQUE authentication as the web — your password never leaves your device.

After signing in, you'll be asked to enter or verify your recovery phrase. This is required before you can upload files — it confirms you've saved the phrase that protects your master key.

## Uploading from the camera roll

Tap the **+** button (bottom right) and choose **Upload photo**. Grant photo library access when prompted.

Photos are encrypted before they leave your device, chunk by chunk — each chunk independently with AES-256-GCM. The encrypted chunks are uploaded to object storage in Falkenstein, Germany.

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
