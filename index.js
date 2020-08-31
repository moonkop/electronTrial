const { app, BrowserWindow } = require('electron')

app.commandLine.appendSwitch('ignore-certificate-errors', 'true');
function createWindow () {   
    // 创建浏览器窗口
    let win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true,
        plugins: true,
        webSecurity: false,
        allowDisplayingInsecureContent: true,
        allowRunningInsecureContent: true
      }
    })
  
    // 加载index.html文件
    win.loadFile('index.html');
    win.webContents.openDevTools();

  }
  
  app.whenReady().then(createWindow)