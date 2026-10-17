const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

// Keep using the data folder of earlier versions so the saved high score and progress carry over
app.setPath('userData', path.join(app.getPath('appData'), 'pacman3d-z'));

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 820,
    minWidth: 800,
    minHeight: 700,
    resizable: true,
    fullscreenable: true,
    backgroundColor: '#000000',
    title: 'PACMAN-Z-3D',
    icon: path.join(__dirname, 'build', 'icon.ico'), // Optional
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'browser', 'index.html'));
  Menu.setApplicationMenu(null); // Remove menu bar

  // Keep the app name in the title bar instead of the page's <title>
  mainWindow.on('page-title-updated', (e) => e.preventDefault());

  mainWindow.on('closed', function () {
    mainWindow = null;
  });

  // F11 toggles fullscreen at the window level too (the game also handles F / F11 itself)
  mainWindow.webContents.on('before-input-event', (event, input) => {
    if (input.type === 'keyDown' && input.key === 'F11') {
      mainWindow.setFullScreen(!mainWindow.isFullScreen());
      event.preventDefault();
    }
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Security: Prevent navigation to external URLs
app.on('web-contents-created', (event, contents) => {
  contents.on('will-navigate', (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl);
    if (parsedUrl.protocol !== 'file:') {
      event.preventDefault();
    }
  });
});
