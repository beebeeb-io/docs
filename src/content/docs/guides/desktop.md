---
title: Desktop app
description: Download the Beebeeb desktop app, use the system tray, and configure startup behaviour.
---

The Beebeeb desktop app wraps the web client in a native shell built with Tauri. It adds a system tray icon, native menus, and window state persistence.

## Download

Download the latest release from [beebeeb.io/download](https://beebeeb.io/download):

| Platform | Format |
|----------|--------|
| macOS (Apple Silicon) | `.dmg` |
| macOS (Intel) | `.dmg` |
| Windows | `.msi` |
| Linux | `.AppImage` / `.deb` |

### macOS

Open the `.dmg`, drag Beebeeb to Applications. On first launch, macOS may show a security warning — go to **System Settings → Privacy & Security** and click **Open Anyway**.

### Windows

Run the `.msi` installer. Windows SmartScreen may warn about an unknown publisher — click **More info → Run anyway**. We're working on code signing certification.

### Linux

For AppImage: `chmod +x Beebeeb-*.AppImage && ./Beebeeb-*.AppImage`

For Debian/Ubuntu: `sudo dpkg -i beebeeb_*.deb`

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

- **macOS**: `~/Library/Application Support/io.beebeeb.desktop/`
- **Windows**: `%APPDATA%\io.beebeeb.desktop\`
- **Linux**: `~/.config/io.beebeeb.desktop/`

## Auto-start at login

To launch Beebeeb automatically when you log in, go to **Settings → Desktop → Start at login** and toggle it on.

On macOS, this adds a Login Item in System Settings. On Windows, it adds a registry entry. On Linux, it adds a `.desktop` file to `~/.config/autostart/`.

## Updates

The app checks for updates on launch. When an update is available, you'll see a notification in the tray menu. Click **Install update** to download and restart. Updates are signed and verified before installation.
