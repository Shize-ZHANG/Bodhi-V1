import { bus } from 'vue3-eventbus'
import store from '../store'
import FileSystem from '@/main/filesystem'

const state = {
  openDev: false
}

const commands = [
  /** 编辑 */
  {
    id: 'edit.undo',
    execute: async () => {
      bus.emit('undoCurTab')
    }
  },
  {
    id: 'fetch-files',
    execute: async () => {
      bus.emit('fetch-files')
    }
  },
  {
    id: 'edit.redo',
    execute: async () => {
      bus.emit('redoCurTab')
    }
  },
  {
    id: 'edit.cut',
    execute: async () => {
      bus.emit('cutSelectedText')
    }
  },
  {
    id: 'edit.copy',
    execute: async () => {
      bus.emit('copySelectedText', { type: 'text' })
    }
  },
  {
    id: 'edit.copy-as-markdown',
    execute: async () => {
      bus.emit('copySelectedText', { type: 'md' })
    }
  },
  {
    id: 'edit.copy-as-html',
    execute: async () => {
      bus.emit('copySelectedText', { type: 'html' })
    }
  },
  {
    id: 'edit.paste',
    execute: async () => {
      bus.emit('pasteSelectedText', { type: 'origin' })
    }
  },
  {
    id: 'edit.paste-as-plaintext',
    execute: async () => {
      bus.emit('pasteSelectedText', { type: 'plain' })
    }
  },
  {
    id: 'edit.find',
    execute: async () => {
      bus.emit('openSearchEngine')
    }
  },
  {
    id: 'edit.delete',
    execute: async () => {
      bus.emit('deleteSelectedText')
    }
  },
  /** 文件 */
  {
    id: 'file.new-file',
    execute: async () => {
      const files = await window.electronAPI.newFileFromDialog()
      for (const file of files) {
        bus.emit('openNewTab', file)
      }
    }
  },
  {
    id: 'file.new-window',
    execute: () => {
      window.electronAPI.newWindow()
    }
  },
  {
    id: 'file.open-file',
    execute: async () => {
      // const files = await window.electronAPI.openFile()
      // for (const file of files) {
      //   bus.emit('openNewTab', file)
      // }

      // ajax请求文件内容
      async function fetchReadUserFiles (userId) {
        try {
          const response = await fetch(`http://localhost:8080/file/${userId}`, { // fetch的URL需要换
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          })

          const data1 = await response.json() // 解析 JSON 响应

          if (response.status === 200) {
            console.log('User files:', data1.files) // 假设后端返回的文件信息在 data.files 中
          } else {
            console.error('Error fetching user files:', response.status)
          }
          const file = {
            name: data1.name,
            // path: path.join(father.value.path, fileName.value),
            path: data1.path,
            children: [],
            curChild: -1,
            content: '',
            absolutePath: data1.absolutePath,
            offset: -1,
            type: data1.type
          }

          bus.emit('openNewTab', file)
        } catch (error) {
          console.error('Error fetching data:', error)
          // 处理错误，比如显示提示消息给用户
        }
      }

      // 调用函数，并传递 userId
      fetchReadUserFiles(1) // uid暂时写死为1，实际应是 const uid = store.getters.getuid
    }
  },
  {
    id: 'file.open-file-by-path',
    execute: async ({ filepath }) => {
      store.commit('OPEN_FILE_TAB', filepath)
    }
  },
  {
    id: 'file.open-folder-by-path',
    execute: async ({ pathname }) => {
      window.electronAPI.openFolderByPath(pathname)
      store.commit('beginLoading')
    }
  },
  {
    id: 'file.clear-recently-used-files',
    execute: async () => {
      window.electronAPI.clearRecentlyUsedFiles()
    }
  },
  {
    id: 'file.open-folder',
    execute: async () => {
      // console.log('execute: file.open-folder')
      // window.electronAPI.openFolder()
      // const folderPath = pathname || await this.filesystem.selectFolderPathFromDialog()
      const folderPath = '/'
      const userId = store.getters.getuid
      console.log(userId)
      if (folderPath) {
        // await this.resetWatcher()
        // const projectStat = await makeFolderStat(folderPath,
        //   this.preferences.getIgnoredPaths(folderPath))
        FileSystem.getInstance().root = folderPath
        FileSystem.getInstance().userID = userId
        // this.watcher.watch(this.win, projectStat.path, 'dir')
        // this.win.webContents.send('ficus::passive-refresh', projectStat)
      }
      return folderPath
    }
  },
  {
    id: 'file.save',
    execute: async () => {
      bus.emit('writeBackForMenu')
    }
  },
  {
    id: 'file.save-as',
    execute: async () => {
      bus.emit('saveToAnotherFile')
    }
  },
  {
    id: 'file.rename-file',
    execute: async () => {
      bus.emit('renameCurTabForMenu')
    }
  },
  {
    id: 'file.close-tab',
    execute: async () => {
      bus.emit('closeCurTab')
    }
  },
  {
    id: 'file.export-as-html',
    execute: async () => {
      const mode = store.getters.getMode
      if (mode === 0 || mode === 1) {
        bus.emit('exportHTML')
      } else {
        bus.emit('showMyAlert', { message: '当前不在文本模式或源码模式，不能导出HTML' })
      }
    }
  },
  {
    id: 'file.export-as-pdf',
    execute: async () => {
      const mode = store.getters.getMode
      if (mode === 0 || mode === 1) {
        bus.emit('exportPDF')
      } else {
        bus.emit('showMyAlert', { message: '当前不在文本模式或源码模式，不能导出PDF' })
      }
    }
  },
  {
    id: 'file.export-as-png',
    execute: async () => {
      const mode = store.getters.getMode
      // 只支持树模式和图模式
      if (mode === 2) {
        bus.emit('exportTreePNG')
      } else if (mode === 3) {
        bus.emit('exportGraphPNG')
      } else {
        bus.emit('showMyAlert', { message: '当前不在树视图或图视图，不能导出PNG' })
      }
    }
  },
  {
    id: 'file.quit',
    execute: async () => {
      await window.electronAPI.closeWindow()
    }
  },
  /** 段落 */
  {
    id: 'paragraph.heading-1',
    execute: async () => {
      bus.emit('addBlock', { type: 'heading-1' })
    }
  },
  {
    id: 'paragraph.heading-2',
    execute: async () => {
      bus.emit('addBlock', { type: 'heading-2' })
    }
  },
  {
    id: 'paragraph.heading-3',
    execute: async () => {
      bus.emit('addBlock', { type: 'heading-3' })
    }
  },
  {
    id: 'paragraph.heading-4',
    execute: async () => {
      bus.emit('addBlock', { type: 'heading-4' })
    }
  },
  {
    id: 'paragraph.heading-5',
    execute: async () => {
      bus.emit('addBlock', { type: 'heading-5' })
    }
  },
  {
    id: 'paragraph.heading-6',
    execute: async () => {
      bus.emit('addBlock', { type: 'heading-6' })
    }
  },
  {
    id: 'paragraph.table',
    execute: async () => {
      bus.emit('addBlock', { type: 'table' })
    }
  },
  {
    id: 'paragraph.math-formula',
    execute: async () => {
      bus.emit('addBlock', { type: 'math-block' })
    }
  },
  {
    id: 'paragraph.code-fence',
    execute: async () => {
      bus.emit('addBlock', { type: 'code-block' })
    }
  },
  {
    id: 'paragraph.quote-block',
    execute: async () => {
      bus.emit('addBlock', { type: 'quote' })
    }
  },
  {
    id: 'paragraph.order-list',
    execute: async () => {
      bus.emit('addBlock', { type: 'ordered-list' })
    }
  },
  {
    id: 'paragraph.bullet-list',
    execute: async () => {
      bus.emit('addBlock', { type: 'unordered-list' })
    }
  },
  {
    id: 'paragraph.task-list',
    execute: async () => {
      bus.emit('addBlock', { type: 'task-list' })
    }
  },
  {
    id: 'paragraph.horizontal-line',
    execute: async () => {
      bus.emit('addBlock', { type: 'horizontal-line' })
    }
  },
  {
    id: 'format.strong',
    execute: async () => {
      bus.emit('addFormat', { type: 'bold' })
    }
  },
  {
    id: 'format.emphasis',
    execute: async () => {
      bus.emit('addFormat', { type: 'italic' })
    }
  },
  {
    id: 'format.strike',
    execute: async () => {
      bus.emit('addFormat', { type: 'strike' })
    }
  },
  {
    id: 'format.inline-code',
    execute: async () => {
      bus.emit('addFormat', { type: 'inline-code' })
    }
  },
  {
    id: 'format.inline-math',
    execute: async () => {
      bus.emit('addFormat', { type: 'inline-math' })
    }
  },
  {
    id: 'format.highlight',
    execute: async () => {
      bus.emit('addFormat', { type: 'highlight' })
    }
  },
  {
    id: 'format.hyperlink',
    execute: async () => {
      bus.emit('addFormat', { type: 'link' })
    }
  },
  {
    id: 'format.image',
    execute: async () => {
      bus.emit('addFormat', { type: 'img-link' })
    }
  },
  {
    id: 'format.filelink',
    execute: async () => {
      bus.emit('addFormat', { type: 'file-link' })
    }
  },
  {
    id: 'format.clear-format',
    execute: async () => {
      bus.emit('removeFormat')
    }
  },
  /** 视图 */
  {
    id: 'view.text-mode',
    execute: async () => {
      bus.emit('changeModeChoose', 0)
    }
  },
  {
    id: 'view.source-code-mode',
    execute: async () => {
      bus.emit('changeModeChoose', 1)
    }
  },
  {
    id: 'view.ficus-mode',
    execute: async () => {
      bus.emit('changeModeChoose', 2)
    }
  },
  {
    id: 'view.toggle-dev-tools',
    execute: async () => {
      if (state.openDev) {
        await window.electronAPI.closeDev()
      } else {
        await window.electronAPI.openDev()
      }
      state.openDev = !state.openDev
    }
  },
  {
    id: 'view.typewriter-mode',
    execute: async () => {
      bus.emit('toggleTypewriterMode')
    }
  },
  /** 帮助 */
  {
    id: 'help.about',
    execute: async () => {
      window.electronAPI.aboutUs()
    }
  }
]

export default commands
