import { app, BrowserWindow } from "electron";
import * as path from "path";
import * as electron from "electron";

let mainWindow: Electron.BrowserWindow;
const globalShortcut = electron.globalShortcut;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    },
    width: 900
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "../index.html"));

  // Open the DevTools.

  mainWindow.setMenu(null);
  // Emitted when the window is closed.
  mainWindow.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an arra should delete the corresponding element.
    mainWindow = null;
  });
  globalShortcut.register("f5", function() {
    // console.log("f5 is pressed");
    mainWindow.reload();
  });
  globalShortcut.register("CommandOrControl+R", function() {
    // console.log("CommandOrControl+R is pressed");
    mainWindow.reload();
  });
  globalShortcut.register("f11", function() {
    // console.log("CommandOrControl+R is pressed");
    mainWindow.webContents.toggleDevTools();
  });
  mainWindow.maximize();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it"s common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
