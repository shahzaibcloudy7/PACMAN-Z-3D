# PACMAN-Z-3D Desktop Application

The Windows desktop version of PACMAN-Z-3D.

## Download

The executables are published on the **[Releases page](https://github.com/shahzaibcloudy7/PACMAN-Z-3D/releases/latest)** (they are too large to keep in the repository).

### PACMAN-Z-3D-1.1.2-win-x64.exe
- **Type:** Installer (NSIS), ~92 MB
- Creates desktop and Start menu shortcuts
- Lets you choose the installation folder
- Includes an uninstaller

### PACMAN-Z-3D-Portable.exe
- **Type:** Portable executable, ~92 MB
- No installation - run it from anywhere (USB drive, any folder)
- Nothing written to the registry

## How to Use

**Install:** run `PACMAN-Z-3D-1.1.2-win-x64.exe`, follow the wizard, then launch from the desktop or Start menu shortcut. Installing over an older PACMAN-Z / PACMAN-Z-3D install updates it.

**Portable:** double-click `PACMAN-Z-3D-Portable.exe` - the game starts immediately.

## Requirements

- **OS:** Windows 10 or later (64-bit)
- **RAM:** 200 MB minimum
- **Disk Space:** ~180 MB installed, ~92 MB portable
- **Graphics:** WebGL support for the 3D view (any GPU from the last decade)
- No other software needed - no Node.js, npm or browser required

## Features

- Flat, tilted and full 3D views (**V**)
- Resizable window and fullscreen (**F** / **F11**) - the board scales to fit
- Xbox / PlayStation controller support
- Smart ghost AI, power pellets, lives, bonus fruit
- Easy / Normal / Hard difficulty
- 14 maze stages that loop with faster ghosts
- 5 mushroom power-ups and shooting
- Background music (**N**) and sound effects (**M** mutes)
- High score saved between sessions

## Windows SmartScreen Warning

The app is not code-signed, so Windows may show a SmartScreen warning the first time. Click **More info** → **Run anyway**. This is normal for unsigned applications.

## Troubleshooting

**Game won't start:** make sure you're on 64-bit Windows 10 or later and have enough disk space.

**3D view doesn't appear:** update your graphics driver; the game falls back to the 2D views if WebGL is unavailable.

**Controller not detected:** press any button on it once the game window is focused.

---

**Built with:** Electron 39.2.7 · **Game Version:** 1.1.2
