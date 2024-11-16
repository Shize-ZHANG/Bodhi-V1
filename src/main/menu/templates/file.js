import { isOsx } from '@/main/config'
// import { app } from 'electron'
export default function (keybindings, recentlyUsedDocuments) {
  const fileMenu = {
    label: 'File',
    submenu: [{
      label: 'Create New File',
      id: 'file.new-file',
      accelerator: keybindings.getAccelerator('file.new-file'),
      click (menuItem, browserWindow) {
        browserWindow.webContents.send('ficus::keyboard-event', { id: menuItem.id })
      }
    }, {
      type: 'separator'
    }, {
      label: 'Open File',
      id: 'file.open-file',
      accelerator: keybindings.getAccelerator('file.open-file'),
      click (menuItem, browserWindow) {
        browserWindow.webContents.send('ficus::keyboard-event', { id: menuItem.id })
      }
    }, {
      label: 'Open Folder',
      id: 'file.open-folder',
      accelerator: keybindings.getAccelerator('file.open-folder'),
      click (menuItem, browserWindow) {
        browserWindow.webContents.send('ficus::keyboard-event', { id: menuItem.id })
      }
    }]
  }
  const recentlyUsedMenu = {
    label: 'Open Recent...',
    submenu: []
  }
  for (const item of recentlyUsedDocuments) {
    recentlyUsedMenu.submenu.push({
      label: item,
      id: 'file.open-folder-by-path',
      meta: {
        id: 'file.open-folder-by-path',
        pathname: item
      },
      click (menuItem, browserWindow) {
        browserWindow.webContents.send('ficus::keyboard-event', menuItem.meta)
      }
    })
  }
  recentlyUsedMenu.submenu.push({
    type: 'separator',
    visible: recentlyUsedDocuments.length > 0
  }, {
    label: 'Clear recently used files',
    id: 'file.clear-recently-used-files',
    enabled: recentlyUsedDocuments.length > 0,
    click (menuItem, browserWindow) {
      browserWindow.webContents.send('ficus::keyboard-event', { id: menuItem.id })
    }
  })
  fileMenu.submenu.push(recentlyUsedMenu)
  fileMenu.submenu.push({
    type: 'separator'
  }, {
    label: 'Save',
    id: 'file.save',
    accelerator: keybindings.getAccelerator('file.save'),
    click (menuItem, browserWindow) {
      browserWindow.webContents.send('ficus::keyboard-event', { id: menuItem.id })
    }
  }, {
    label: 'Save-as',
    id: 'file.save-as',
    accelerator: keybindings.getAccelerator('file.save-as'),
    click (menuItem, browserWindow) {
      browserWindow.webContents.send('ficus::keyboard-event', { id: menuItem.id })
    }
  }, {
    label: 'Rename',
    id: 'file.rename-file',
    accelerator: keybindings.getAccelerator('file.rename-file'),
    click (menuItem, browserWindow) {
      browserWindow.webContents.send('ficus::keyboard-event', { id: menuItem.id })
    }
  }, {
    label: 'Close tab',
    id: 'file.close-tab',
    accelerator: keybindings.getAccelerator('file.close-tab'),
    click (menuItem, browserWindow) {
      browserWindow.webContents.send('ficus::keyboard-event', { id: menuItem.id })
    }
  }, {
    label: 'Export File',
    submenu: [{
      label: 'Export as HTML',
      id: 'file.export-as-html',
      accelerator: keybindings.getAccelerator('file.export-as-html'),
      click (menuItem, browserWindow) {
        browserWindow.webContents.send('ficus::keyboard-event', { id: menuItem.id })
      }
    }, {
      label: 'Export as PDF',
      id: 'file.export-as-pdf',
      accelerator: keybindings.getAccelerator('file.export-as-pdf'),
      click (menuItem, browserWindow) {
        browserWindow.webContents.send('ficus::keyboard-event', { id: menuItem.id })
      }
    }, {
      label: 'Export as PNG',
      id: 'file.export-as-png',
      accelerator: keybindings.getAccelerator('file.export-as-png'),
      click (menuItem, browserWindow) {
        browserWindow.webContents.send('ficus::keyboard-event', { id: menuItem.id })
      }
    }]
  }, {
    label: 'Quit',
    id: 'file.quit',
    accelerator: keybindings.getAccelerator('file.quit'),
    visible: !isOsx,
    click (menuItem, browserWindow) {
      // if (isOsx) {
      //   app.quit()
      // } else {
      //   browserWindow.webContents.send('ficus::keyboard-event', { id: menuItem.id })
      // }
    }
  })

  return fileMenu
}
