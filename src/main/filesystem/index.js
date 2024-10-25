// import { app, dialog } from 'electron'
// import { makeFileStat } from './statistic'
// import fs from 'fs-extra'
import { SearchEngine } from './search'
// import path from 'path'
// import { makeValidFilePath } from './fileManipulate'
// import { isValidFolderPath, isValidMarkdownFilePath } from '../helper/path'
import { getBasename, isValidFolderPath, isValidMarkdownFilePath, resolvePath, sleep } from '@/main/helper/newhelper'
// import dateFormat from 'dateformat'

/**
 * 用于 showOpenDialog
 * 指定应用程序应该能够打开那些类型的文件
 */
// const markdownFilters = [
//   { name: 'Markdown Files', extensions: ['md', 'markdown'] }
// ]

class FileSystem {
  static instance = null
  constructor (preferences, uid = 1) {
    // 如果已经有实例，抛出错误，防止直接用 new 创建多个实例
    if (FileSystem.instance) {
      throw new Error('Cannot instantiate FileSystem directly. Use FileSystem.getInstance(preferences) instead.')
    }

    this.root = undefined
    this.preferences = preferences
    this.userID = uid
  }

  // 静态方法，用于获取 FileSystem 的单例实例
  static getInstance (preferences) {
    if (!FileSystem.instance) {
      FileSystem.instance = new FileSystem(preferences)
    }
    return FileSystem.instance
  }

  /**
   * 打开
   * @returns 文件夹路径
   */
  async selectFolderPathFromDialog () {
    // return await dialog.showOpenDialog({
    //   buttonLabel: '选择',
    //   defaultPath: app.getPath('desktop'),
    //   properties: ['createDirectory', 'openDirectory']
    // }).then(async ({ canceled, filePaths }) => {
    //   if (canceled === true) {
    //     return undefined
    //   }
    //   return filePaths[0]
    // })
  }

  async newFileFromDialog () {
    // return await dialog.showSaveDialog({
    //   buttonLabel: '新建',
    //   defaultPath: this.root || app.getPath('desktop'),
    //   properties: ['showHiddenFiles'],
    //   filters: markdownFilters
    // }).then(async (result) => {
    //   if (result.canceled === true) {
    //     return []
    //   }
    //
    //   // fs.createFileSync(result.filePath)
    //   const file = makeFileStat(result.filePath)
    //   return [file]
    // })
  }

  async searchToken (token) {
    if (!this.root) {
      return []
    }
    const searchEngine = new SearchEngine(this.root, this.userID)
    await sleep(1000)
    await searchEngine.search(token)
    return searchEngine.results
  }

  async exportForest (files, pathname) {
    // if (!this.root) {
    //   return
    // }
    // const dateDirname = dateFormat(new Date(), 'yyyy_mm_dd_HH_MM_ss')
    // const exportPath = path.resolve(this.root, pathname, dateDirname)
    // fs.ensureDirSync(exportPath)
    // for (const file of files) {
    //   const filepath = makeValidFilePath(path.resolve(exportPath, file.name))
    //   await fs.createFile(filepath)
    //   await fs.writeFile(filepath, file.content)
    // }
  }

  /**
   * 给榕图的文件夹信息
   * @param {string} dirPath
   * @returns {object?} 文件夹信息对象
   */
  async makeFolderStatInGraph (dirPath) {
    const folderName = getBasename(dirPath)
    // const ignored = this.preferences.getIgnoredPaths(this.root)
    if (isValidFolderPath(dirPath)) {
      // 文件数组
      // const subFileOrFolder = await fs.promises.readdir(dirPath)
      const subFileOrFolder = []
      const fileChildren = []
      for (const subItem of subFileOrFolder) {
        const subItemPath = resolvePath(dirPath, subItem)
        // if (isValidMarkdownFilePath(subItemPath) && !matchPathPattern(subItemPath, ignored)) {
        //   fileChildren.push(subItemPath)
        // }
        if (isValidMarkdownFilePath(subItemPath)) {
          fileChildren.push(subItemPath)
        }
      }
      return {
        name: folderName,
        path: dirPath,
        children: [{
          children: fileChildren,
          handle: '转变为tag'
        }]
      }
    } else {
      return {
        name: folderName,
        path: dirPath,
        children: []
      }
    }
  }
}

export default FileSystem
