# PACMAN-Z Desktop Application

This folder contains the Windows desktop executables for PACMAN-Z.

## Files

### PACMAN-Z-1.0.0-win-x64.exe
- **Type:** Installer (NSIS)
- **Size:** ~92 MB
- **Installation:** Double-click to install
- **Features:**
  - Creates desktop shortcut
  - Creates start menu shortcut
  - Allows custom installation directory
  - Includes uninstaller

### PACMAN-Z-Portable.exe
- **Type:** Portable executable
- **Size:** ~91 MB
- **Installation:** None required
- **Features:**
  - Run from anywhere (USB drive, folder, etc.)
  - No installation needed
  - No registry entries
  - Perfect for sharing

## How to Use

### Option 1: Install (Recommended for permanent installation)
1. Double-click `PACMAN-Z-1.0.0-win-x64.exe`
2. Follow the installation wizard
3. Launch from desktop or start menu shortcut

### Option 2: Portable (Recommended for USB or temporary use)
1. Double-click `PACMAN-Z-Portable.exe`
2. Game starts immediately - no installation!

## Requirements

- **OS:** Windows 10 or later (64-bit)
- **RAM:** 200 MB minimum
- **Disk Space:** 180 MB (installed), 91 MB (portable)
- **No additional software required**

## Features

- 7 unique maze stages with progressive difficulty
- 5 different mushroom power-ups
- Shooting mechanics with homing missiles
- Score tracking with localStorage persistence
- High score tracking across sessions
- Full keyboard controls (WASD/Arrows, Space, P, R, M)

## Windows SmartScreen Warning

When you first run the .exe, Windows may show a SmartScreen warning because the application is not code-signed.

**To run the application:**
1. Click "More info"
2. Click "Run anyway"

This is normal for unsigned applications and doesn't mean the app is unsafe.

## Troubleshooting

**Game won't start:**
- Make sure you have Windows 10 or later
- Check that you have enough disk space
- Try running as administrator

**Performance issues:**
- Close other applications
- Check system resources (Task Manager)

## Distribution

You can freely distribute these .exe files. Users don't need:
- Node.js
- npm
- A web browser
- Any dependencies

Just share the .exe file!

---

**Built with:** Electron 39.2.7
**Game Version:** 1.0.0
**Build Date:** December 2025
