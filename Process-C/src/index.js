const AutoLaunch = require('auto-launch');

const { app, BrowserWindow, globalShortcut, Notification, ipcMain, webContents } = require('electron');
const path = require('path');
const { shutdown } = require('electron-shutdown-command');

var fs = require('fs'); // Load the File System to execute our common tasks (CRUD)
const { clearTimeout } = require('timers');

const PARENT_PASS = '1234'
const CHILDREN_PASS = '5678'
const SHORTCUT = ['alt+tab', 'alt+f4', 'CommandOrControl+tab']
const APP_NAME = ''

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = function(type) {
  
  // Create the browser window.
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  if (type == 'index' || type == 'block') {
    mainWindow.setMenu(null);
    mainWindow.setAlwaysOnTop(true, "screen-saver");
    mainWindow.setVisibleOnAllWorkspaces(true);
    mainWindow.maximize();
    mainWindow.setMenuBarVisibility(false)

  }
  mainWindow.loadFile(path.join(__dirname, type + '.html'));
  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.


app.on('ready', () => {
  createWindow('index')
})


// auto start
app.on('ready', () => {
  let autoLaunch = new AutoLaunch({
    name: APP_NAME,
    path: app.getPath('exe'),
  });
  autoLaunch.isEnabled().then((isEnabled) => {
    if (!isEnabled) autoLaunch.enable();
  });
})

//disable keyboard shortcut
app.on('ready', () => {
  globalShortcut.registerAll(SHORTCUT, () => {
    new Notification({ title: 'Warning', body: 'Your shortcut is disabled!!!' }).show()
    return false;
  });
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
let count = 0;
ipcMain.on('password', (event, arg) => {

  let timer;
  if (count == 3) {
    app.quit();
    createWindow('block');
    setTimeout(() => {
      // shutdown()
    }, 600000)
  }
  if (arg == PARENT_PASS) {
    event.sender.send('password-reply'); 
    setTimeout(() => {
      app.quit()
      createWindow('index');
    }, 3600000)
  }
  if (arg == CHILDREN_PASS) {
    
    let fileContent = fs.readFileSync((path.join(__dirname, 'sync/sync.txt'))).toString();
    let info = fileContent.split(' ');
    
    from = info[0].match(/\d./g).map( e => parseInt(e) );
    beginMinutes = from[0]*60 + from[1];
    to = info[1].match(/\d./g).map( e => parseInt(e) );
    endMinutes = to[0]*60 + to[1];
    
    let date = new Date();
    now = date.getHours() * 60 + date.getMinutes();

    if (now < endMinutes && now > beginMinutes) {
      app.quit()
      createWindow('panel');
    }
    else {
      new Notification({ title: 'Notification', body: "Use computer from " + info[0].slice(1) + " to " + info[1].slice(1) }).show()
      timer = setTimeout(() => {
        // shutdown()
      }, 15000);

      ipcMain.on('password', (event, arg) => {
        clearTimeout(timer)
      })
    }
  }
  count++;
});

ipcMain.on('render-new-window', (event, arg) => {
  app.quit()
  createWindow(arg);
})

ipcMain.on('ping-data', (event, arg) => {
  let fileContent = fs.readFileSync((path.join(__dirname, '/sync/sync.txt'))).toString();
  let info = fileContent.split(' ');
  event.sender.send('send-data', info)
})