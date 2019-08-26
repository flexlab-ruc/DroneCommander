
const { app, BrowserWindow, Menu } = require('electron')


function createWindow () {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 350,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadFile('index.htm')
  
  
}

var menu = Menu.buildFromTemplate([
  {
      label: 'Menu',
          submenu: [
          {
              label:'Exit', 
              click() { 
                  app.quit() 
              },
              accelerator: 'CmdOrCtrl+Shift+Q'
          }
      ]
  }
])

Menu.setApplicationMenu(menu);

app.on('ready', createWindow)