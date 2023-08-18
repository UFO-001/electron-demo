const { app, BrowserWindow, Menu } = require('electron')

// app.on('ready', () => {
//     const mainWindow = new BrowserWindow({
//         width: 800,
//         height: 600
//     })
//     mainWindow.loadFile('index.html')
//     app.focus()
// })

app.whenReady().then(() => {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600
    })
    mainWindow.loadFile('index.html')

    // setTimeout(() => {
    //     mainWindow.hide()
    // },2000)
})

//当前应用程序目录。
const appPath = app.getAppPath()
console.log( 'appPath:', appPath )

const dataPath = app.getPath('appData')
console.log('dataPath:', dataPath)

//设置单实例
const rsil = app.requestSingleInstanceLock()
if (!rsil) {
    app.quit()
} else {
    app.on('second-instance', () => {
        console.log('second-instance')
    })
}

//失去焦点
app.on('browser-window-blur', () => {
    console.log('blur')
})

//获取焦点
app.on('browser-window-focus', () => {
    console.log('focus')
})

//鼠标右键菜单
app.on('web-contents-created', (e, contents) => {
    contents.on('dom-ready', () => {
        //新建菜单
        const contextMenu = Menu.buildFromTemplate([
            {
                label: '打开控制台',
                click: () => {
                    contents.openDevTools()
                }
            },
            {
                label: '刷新',
            },
            {
                label: '复制',
            }
        ])
        //把菜单设置到鼠标上
        contents.on('context-menu', (_, params) => {
            contextMenu.popup({
                window: contents,
                x: params.x,
                y: params.y
            })
        })
    })
})