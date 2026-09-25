---
title: Desktop app
description: Download the Beebeeb desktop app, use the system tray, and configure startup behaviour.
---

The Beebeeb desktop app wraps the web client in a native shell built with Tauri. It adds a system tray icon, native menus, and window state persistence.

Windows and Linux builds are released today; macOS is still dev-signed-only (see Download below). The macOS-specific details on this page (menu bar, Login Items, `Cmd` shortcuts) describe the same shell running on macOS once a signed release ships — they aren't testable against a public build yet.

## Download

**Status: Windows and Linux are released; macOS is not yet.** Grab the latest release from [github.com/beebeeb-io/desktop/releases/latest](https://github.com/beebeeb-io/desktop/releases/latest) (the [beebeeb.io/download](https://beebeeb.io/download) page links here once desktop is announced there):

| Platform | Format | Status |
|----------|--------|--------|
| Windows | `.msi` / `.exe` (NSIS) | Released, not yet code-signed |
| Linux | `.AppImage` / `.deb` / `.rpm` | Released |
| macOS | — | Not yet released — dev-signed builds run on real hardware, but there's no public download until Developer ID notarization is wired up |

### Windows

Run the `.msi` or `.exe` installer. Windows SmartScreen will warn "unknown publisher" — click **More info → Run anyway**. This is expected: the installer isn't code-signed yet, not a sign of tampering.

### Linux

For AppImage: `chmod +x Beebeeb-*.AppImage && ./Beebeeb-*.AppImage`

For Debian/Ubuntu: `sudo dpkg -i beebeeb_*.deb`

For Fedora/RHEL: `sudo rpm -i beebeeb_*.rpm`

### macOS

Not available yet. Development-signed builds already run on real Mac hardware, including the Finder File Provider integration — but a signed, notarized release isn't in CI yet. This page will be updated the day one ships.

## System tray

After launch, Beebeeb appears in the menu bar (macOS) or system tray (Windows/Linux):

- **Left-click** the icon to show or hide the main window.
- **Right-click** to open the tray menu: Show / Hide / Quit.

Closing the window (red dot on macOS, × on Windows) hides it to the tray — it does not quit the app. To quit, use **Beebeeb → Quit Beebeeb** (macOS) or the tray menu.

## Keyboard shortcuts

| Shortcut | Action |
|----------|--------|
| `Cmd/Ctrl+W` | Hide window to tray |
| `Cmd/Ctrl+Q` | Quit Beebeeb |
| `Cmd/Ctrl+K` | Open command palette |
| `Cmd/Ctrl+U` | Upload files |
| `Cmd/Ctrl+Shift+N` | New folder |

Standard text shortcuts (Cut, Copy, Paste, Select All, Undo) work normally in the webview.

## Window state

The app remembers your window position and size between sessions. To reset to defaults, hold `Option/Alt` when launching, or delete the window state file:

- **macOS**: `~/Library/Application Support/io.beebeeb.app/`
- **Windows**: `%APPDATA%\io.beebeeb.app\`
- **Linux**: `~/.config/io.beebeeb.app/`

## Auto-start at login

To launch Beebeeb automatically when you log in, go to **Settings → Desktop → Start at login** and toggle it on.

On macOS, this adds a Login Item in System Settings. On Windows, it adds a registry entry. On Linux, it adds a `.desktop` file to `~/.config/autostart/`.

## Updates

The app checks for updates on launch. When an update is available, you'll see a notification in the tray menu. Click **Install update** to download and restart. Updates are signed and verified before installation.
