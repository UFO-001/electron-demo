const { app, BrowserWindow } = require('electron')

app.on('ready',()=>{
    const mainWindow = new BrowserWindow(
        {
            width:800,
            height:600
        }
    )
    mainWindow.loadFile('index.html')
})

app.on('will-quit',(e) => {
    //保存数据、关闭一些链接、清理一些资源
    console.log( 'app will quit' )
    // e.preventDefault()
})

// const fs = require('fs')
app.on('quit',(e) => {
    //保存数据、关闭一些链接、清理一些资源
    // const userData = { /* 用户的数据 */ }
    // fs.writeFileSync('userData.json',JSON.stringify(userData))
    console.log( 'app quit' )
})

app.on('browser-window-blur',() => {
    console.log('window blur')
})

app.on('browser-window-focus',() => {
    console.log('window focus')
})