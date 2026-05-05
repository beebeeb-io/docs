---
title: Install & login
description: Install the Beebeeb CLI, authenticate with your browser, and start pushing files.
---

The `bb` CLI lets you upload files, download backups, and mount a WebDAV volume — all from the terminal.

## Installation

### macOS / Linux (Homebrew)

```bash
brew install beebeeb-io/tap/bb
```

### Linux (direct)

```bash
curl -fsSL https://beebeeb.io/install.sh | sh
```

This installs `bb` to `~/.local/bin`. Add it to your `PATH` if it isn't already:

```bash
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

### Windows (winget)

```powershell
winget install Beebeeb.bb
```

### From source

```bash
cargo install beebeeb-cli
```

Requires Rust 1.75+.

## Authentication

```bash
bb login
```

This opens your default browser at `https://app.beebeeb.io/cli-auth`. Sign in if you're not already, then click **Authorize CLI access**. The browser sends your session token back to a local HTTP server that `bb login` started — you'll see "Authenticated as you@example.com" in the terminal.

Your credentials are stored in `~/.config/bb/credentials.json` (or the OS equivalent). They remain valid until you run `bb logout` or revoke the session from the web app.

## Basic usage

### Push a file

```bash
bb push report.pdf
```

Encrypts and uploads `report.pdf` to the root of your drive.

```bash
bb push ./docs/ --remote /Documentation
```

Recursively uploads the `docs/` directory to `/Documentation` on your drive.

### Pull a file

```bash
bb pull /report.pdf ./local-copy.pdf
```

Downloads and decrypts `/report.pdf` from your drive.

### List files

```bash
bb ls
bb ls /Documents
```

### Create a share link

```bash
bb share /report.pdf
# Outputs: https://app.beebeeb.io/s/abc123#key=...

bb share /report.pdf --expires 7d --passphrase "correct-horse"
```

### Sync a directory

```bash
bb sync ./local-folder /remote-folder
```

Uploads new and modified files. Deleted local files are not deleted remotely unless `--delete` is passed.

## WebDAV mount

Mount your Beebeeb drive as a WebDAV volume for use with any app that supports WebDAV (Finder, File Explorer, VS Code, etc.):

```bash
bb webdav
# Listening on http://localhost:6543/webdav
```

On macOS, mount in Finder: **Go → Connect to Server → http://localhost:6543/webdav**

The WebDAV server decrypts files on the fly as they're accessed. It does not cache plaintext to disk.

## Configuration

`bb` reads from `~/.config/bb/config.toml`:

```toml
[defaults]
remote_root = "/Backups"     # default remote directory for bb push
parallel_uploads = 4          # concurrent upload threads (default: 4)

[server]
api_url = "https://api.beebeeb.io"  # override for self-hosted
```

## Shell completion

```bash
bb completion bash >> ~/.bashrc
bb completion zsh  >> ~/.zshrc
bb completion fish > ~/.config/fish/completions/bb.fish
```

## Logout

```bash
bb logout
```

Deletes the local credentials. The session token remains valid server-side until it expires (30 days) — to invalidate it immediately, go to **Settings → Security → Active sessions** in the web app.
