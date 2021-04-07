// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");

// Achieve hot loading
try {
  require("electron-reloader")(module, {});
} catch (_) {}

function createWindow() {
  // Remove the menu bar
  Menu.setApplicationMenu(null);

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    // fullscreen: true,
    show: false,
    minWidth: 414,
    minHeight: 736,
    icon: path.join(__dirname, "favicon.ico"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile("index.html");

  // Nested web address
  mainWindow.loadURL("https://lyt-top.gitee.io/vue-next-admin-preview/#/login");

  // Default maximization
  mainWindow.maximize();
  mainWindow.show();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
