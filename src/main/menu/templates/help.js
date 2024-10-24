// import path from 'path'
import { getBuiltInDocumentsPath } from '../config'
import { getFileNameWithoutExt } from '@/main/helper/newhelper'

export default function (keybindings) {
  const viewMenu = {
    label: '帮助',
    submenu: [{
      label: '关于',
      id: 'help.about',
      click (menuItem, browserWindow) {
        browserWindow.webContents.send('ficus::keyboard-event', { id: menuItem.id })
      }
    }]
  }

  const builtInFileMenuItem = {
    label: '内置文档',
    submenu: []
  }

  const pathnames = getBuiltInDocumentsPath()

  pathnames.forEach(pathname => {
    // const label = path.parse(pathname).name
    const label = getFileNameWithoutExt(pathname)
    builtInFileMenuItem.submenu.push({
      label,
      id: 'file.open-file-by-path',
      meta: {
        id: 'file.open-file-by-path',
        filepath: pathname
      },
      click (menuItem, browserWindow) {
        browserWindow.webContents.send('ficus::keyboard-event', menuItem.meta)
      }
    })
  })

  viewMenu.submenu.push(builtInFileMenuItem)

  return viewMenu
}
