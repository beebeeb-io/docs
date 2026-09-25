---
title: Devices
description: See every device and session connected to your account, watch live sync status, and revoke access.
---

Every app, CLI session, sync client, or WebDAV/FUSE mount that has ever authenticated against your account shows up in **Devices** — the sidebar item in the web app (`app.beebeeb.io/devices`).

## What you see

Each row is a session, with a live status dot driven by that client's heartbeat:

| Status | Meaning |
|--------|---------|
| Watching | Connected and idle, watching for changes |
| Syncing | Actively uploading or downloading |
| Idle | Connected, nothing to do right now |
| Paused | Sync paused on that device |
| Error | The client reported a problem |
| Stopped / Offline | No recent heartbeat |

Sessions are labeled by type — **Sync**, **Backup**, **FUSE mount**, or **WebDAV** — so you can tell a `bb sync` daemon apart from a desktop app or a WebDAV mount in Finder. The list updates live over a server-sent-events stream; you don't need to refresh the page to see a device go from Syncing to Idle.

## Revoking a session or removing a device

From the Devices page you can:

- **End a single session** — signs that one client out immediately. It has to re-authenticate (browser login, `bb login`, or the app's sign-in flow) to reconnect.
- **Remove a device entirely** — revokes every session tied to it.
- **Toggle notifications per device** — control whether that specific client's activity generates notifications.

Revoking a session doesn't touch your master key or your files — it only ends that client's authenticated access. Your recovery phrase and password are unaffected either way.

## Why this matters

Because Beebeeb is zero-knowledge, a stolen device with an active session is a more realistic threat than a server breach: the device already holds a decrypted view of your vault while the session is live. If a laptop or phone is lost or stolen, revoking its session here — or from **Settings → Security** — is the first thing to do, before you worry about changing your password.

See also [Recovery phrase](/getting-started/recovery-phrase/) for what a revoked session does *not* protect against (someone who already copied files while the session was live), and [FAQ](/reference/faq/#what-happens-if-beebeeb-is-hacked) for what an attacker with server access — as opposed to device access — can and can't do.
