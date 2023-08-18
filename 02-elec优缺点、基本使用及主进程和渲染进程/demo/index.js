const { app, BrowserWindow, Menu, ipcMain } = require('electron')

let win = null
app.on('ready', () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })
  win.loadFile('index.html')
  //定义菜单
  const mainmenu = Menu.buildFromTemplate(menuTemplate)
  //设置菜单
  Menu.setApplicationMenu(mainmenu)
})

//自定义菜单
const menuTemplate = [
  {
    label: '文件',
    submenu: [
      {
        label: '创建新文本',
        click: () => {
          openNewWindow()
        }
      },
      { label: '创建新文件' }
    ]
  },
  {
    label: '编辑',
    submenu: [
      { label: '复制' },
      { label: '粘贴' },
      {
        label: '打开控制台',
        //设置快捷键
        accelerator: 'ctrl + y',
        // accelerator:process.plateform == 'darwin' ? 'command + y':'ctrl + y',
        click: (i, focusewindow) => {
          // alert('创建新文本')
          focusewindow.toggleDevTools()
        }
      }
    ]
  },
  {
    label: '帮助',
    submenu: [
      {
        label: '页面刷新',
        //设置快捷键
        accelerator: 'ctrl + f',
        //页面刷新
        role: 'reload'
      },
      { label: '关于我' }
    ]
  }
]

const openNewWindow = () => {
  let newWin = new BrowserWindow({
    width: 400,
    height: 300,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })
  newWin.loadFile('new.html')
}

//监听传递的新消息
const ipcEvent = () => {
  //在主进程中接受自定义传递的参数
  ipcMain.on('sendVal', (e, val) => {
    win.webContents.send('sendVal', val)
    console.log(val)
  })
}
ipcEvent()
