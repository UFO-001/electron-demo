const { app, BrowserWindow, ipcMain, clipboard } = require('electron')

let win;
const createWindow = () => {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        // show:false, //隐藏窗口
        // frame:true,
        // titleBarStyle:'hidden',
        // transparent:true,
        //右上角三个功能键的样式
        // titleBarOverlay: {
        //     color: 'red', //背景色
        //     symbolColor: 'white', //内部符号的颜色
        //     height: 50
        // }
        // backgroundColor:'red'
        webPreferences:{
            nodeIntegration:true,
            contextIsolation:false
        },
        x:100,
        y:100,
        center:true, //并不会把有xy值的窗口居中
        // resizable:false
    })

    win.loadFile('index.html')

    //读取剪切板的内容
    const text = clipboard.readText()
    console.log( 'clipboard',text )
    //写入剪切板
    const newtext = 'hello word'
    clipboard.writeText(newtext)
}
app.whenReady().then(() => {
    createWindow()
    // win.on( 'ready-to-show',() => {
    //     win.show() //显示窗口
    // } )
    // win.on('resize',() => {
    //     const size = win.getSize()
    //     console.log( `win size:${size[0]},${size[1]}`)
    // })

    // win.on('move',() => {
    //     const xy = win.getPosition()
    //     console.log( 'xy :',xy)
    // })

    
})



ipcMain.on('open-modal',() => {
    win.webContents.send('toggle',true)

    modal = new BrowserWindow({
        width:400,
        height:300,
        parent:win,
        modal:true,
        show:false
    })
    modal.loadFile('modal.html')
    modal.once('ready-to-show',()=>{
        modal.show()
    })
    modal.on('closed',()=>{
        win.webContents.send('toggle',false)
        modal = null
    })
})