import EventRoute from "./EventRoute"

const routers = new Array();

/**
 *  关闭窗口
 */
routers.push(
  new EventRoute('close-window', 'event', (api, data = {}) => {
    api.app.quit()
  })
)

/**
 *  打开一个文件
 */
routers.push(
  new EventRoute('open-window', 'event', (api, data = {}) => {
    api.dialog.showOpenDialog()
  })
)


export default routers
