---
title: Install & login
description: Install the Beebeeb CLI, authenticate with your browser, and start pushing files.
---

The `bb` CLI lets you upload files, download backups, and mount a WebDAV volume — all from the terminal.

## Installation

### macOS / Linux (Homebrew)

Recommended — updates come through `brew upgrade bb`.

```bash
brew install beebeeb-io/tap/bb
```

### macOS / Linux (one-line installer)

```bash
curl -fsSL https://get.beebeeb.io | sh
```

Downloads the latest release, verifies its SHA-256 checksum, and installs `bb` into `~/.cargo/bin`. Re-run the same command to upgrade.

### Windows (Scoop)

```powershell
scoop install https://raw.githubusercontent.com/beebeeb-io/cli/main/scoop/bb.json
```

### Release binary (all platforms)

Grab the archive for your platform from the [latest GitHub release](https://github.com/beebeeb-io/cli/releases/latest) — or the stable redirect at [beebeeb.io/download/cli](https://beebeeb.io/download/cli), which always points at the current installer — and put `bb` (or `bb.exe`) on your `PATH`. Prebuilt targets: macOS (Apple Silicon, Intel), Linux x86_64/aarch64 (musl), and Windows x64.

### From source

```bash
git clone https://github.com/beebeeb-io/cli
cd cli
cargo build --release   # bb at target/release/bb
```

Requires a recent stable Rust toolchain (edition 2024). `bb` isn't published on crates.io — building from a clone is the only source route.

## Authentication

```bash
bb login
```

This opens your default browser at `https://app.beebeeb.io/cli-auth`. Sign in if you're not already, then click **Authorize CLI access**. The browser sends your session token back to a local HTTP server that `bb login` started — you'll see "Authenticated as you@example.com" in the terminal.

After login, your session lives in `~/Library/Application Support/beebeeb/config.json` (macOS) or `~/.config/beebeeb/config.json` (Linux/Windows equivalent) — `api_url`, `session_token`, your base64-encoded master key, and your email. Guard this file like an SSH identity: anyone who reads it can decrypt your vault. It remains valid until you run `bb logout` or revoke the session from the web app.

## Basic usage

### Push a file

```bash
bb push report.pdf
```

Encrypts and uploads `report.pdf` to the root of your drive. Use `--folder <name-or-id>` or `--parent <folder-id>` to upload elsewhere, and `--replace` or `--keep-both` to control what happens when a file with the same name already exists.

### Pull a file

```bash
bb pull report.pdf
bb pull report.pdf -o ./local-copy.pdf
```

Downloads and decrypts a file by vault path, UUID, or short ID prefix. `bb pull --zip <folder>` downloads an entire folder as a zip archive.

### List files

```bash
bb ls
bb ls /Documents -l          # long format
bb ls /Documents -R          # recurse into subfolders
```

### Create a share link

```bash
bb share <file-id>
# Outputs: https://app.beebeeb.io/s/abc123#key=...

bb share <file-id> --expires 7d --passphrase
```

`--passphrase` prompts you to enter one interactively rather than taking it as an argument, so it never ends up in your shell history. Get a file's ID from `bb ls -l`.

### Sync a directory

```bash
bb sync ~/local-folder /remote-folder
```

Bidirectional sync, continuous by default — it keeps watching after the first pass. Pass `--once` for a single sync-and-exit, `--daemon` to run in the background, or `--delete` to also remove remote files that no longer exist locally.

## WebDAV mount

Serve your vault as a local WebDAV volume for use with any app that supports WebDAV (Finder, File Explorer, rclone, Cyberduck):

```bash
bb webdav
# Listening on http://localhost:7878
```

On macOS, mount in Finder: **Go → Connect to Server → http://localhost:7878**

Pass `--port <n>` to use a different port, or `--read-only` to block writes. The WebDAV server decrypts files on the fly as they're accessed — it does not cache plaintext to disk.

## Configuration

`bb` stores its session (not user-editable defaults) in `~/Library/Application Support/beebeeb/config.json` / `~/.config/beebeeb/config.json`. Run `bb config` to print the current configuration with secrets masked, and `bb status` for connection/session/storage health. To point the CLI at a different API server (for local development or a future self-hosted deployment), pass `--api <url>` on the command you're running.

## Shell completion

```bash
bb completions bash > ~/.local/share/bash-completion/completions/bb
bb completions zsh  > ~/.zfunc/_bb
bb completions fish > ~/.config/fish/completions/bb.fish
bb completions powershell > ~/Documents/PowerShell/completions/bb.ps1
```

## Logout

```bash
bb logout
```

Deletes the local session. The session token remains valid server-side until it expires (30 days) — to invalidate it immediately, go to **Settings → Security** in the web app and end the session from there.

## Full command reference

This page covers the common flows. `bb` also has commands for search, trash/restore, billing, 2FA, passkeys, and session management across devices — run `bb --help` (or `bb <command> --help`) for the complete, current list; it's generated from the same source as this page and never goes stale.
