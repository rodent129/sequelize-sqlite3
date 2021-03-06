import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import DbManager from './dbmanager';


let mainWindow: Electron.BrowserWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
  });

  console.log('dirname:' + __dirname);
  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

    const userDataPath = app.getPath('userData');
    // console.log('userDataPath:' + userDataPath);
    const storagePath = path.join(userDataPath, 'evox.sqlite');
    // console.log('storagePath:' + storagePath);

    const umzug = require('../db/umzug');
    umzug.up().then((migrations) => {
        console.log('Migration complete');
        console.log(migrations);
        // const { DbManager } = require('./dbmanager');
        const dbManager = new DbManager();
        dbManager.connectDatabase('evox', storagePath);
    }).catch(error => {
        console.log(error);
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it"s common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
