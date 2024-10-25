// import path from 'path'
// import fs from 'fs-extra'
// import { isValidFolderPath, isValidMarkdownFilePath } from '../helper/path'
import { isMarkdownExtname, isValidFolderPath, isValidMarkdownFilePath, resolvePath } from '@/main/helper/newhelper'
// import bus from 'vue3-eventbus'
import { readFile } from '@/renderer/store/files'

export class SearchEngine {
  constructor (dirPath, uid) {
    this.files = []
    this.results = []
    this.root1 = {
      name: '',
      path: '',
      children: [],
      curChild: -1,
      absolutePath: [],
      offset: -1,
      type: ''
    }
    // this._getFilePaths(dirPath)
    // this._getFiles(uid)
    this.init(dirPath, uid) // 调用初始化方法
  }

  async init (dirPath, uid) {
    await this._getFilePaths(dirPath)
    await this._getFiles(uid)
    console.log('construct finish')
  }

  async search (token) {
    // console.log('this.files are: ', this.files)
    // for (const filepath of this.files) {
    //   // const content = await fs.promises.readFile(filepath)
    //   const content = '1234'
    //   if (content.toString().indexOf(token) !== -1) {
    //     this.results.push(filepath)
    //   }
    // }
    console.log('this.root[] is: ', this.root1)
    for (const f of this.root1.children) {
      if (f.type === 'folder' || !isMarkdownExtname(f.url)) continue
      const content = (await readFile(f.url)).content
      if (content.toString().indexOf(token) !== -1) {
        console.log('push', f.name)
        this.results.push(f.name)
      }
    }
  }

  _getFilePaths (dirPath) {
    // const subFileOrFolder = fs.readdirSync(dirPath)
    const subFileOrFolder = []
    for (const subItem of subFileOrFolder) {
      const subItemPath = resolvePath(dirPath, subItem)
      if (isValidFolderPath(subItemPath)) {
        this._getFilePaths(subItemPath)
      } else if (isValidMarkdownFilePath(subItemPath)) {
        this.files.push(subItemPath)
      }
    }
  }

  async _getFiles (uid) {
    try {
      console.log('_getFile-uid', uid)
      uid = 1 // 暂时将uid 写死为1
      const response = await fetch(`http://localhost:8080/file/${uid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data1 = await response.json() // 解析 JSON 响应
      if (response.status === 200) {
        console.log('User files:', data1[0]) // 假设后端返回的文件信息在 data.files 中
      } else {
        console.error('Error fetching user files:', response.status)
      }
      this.root1 = {
        name: data1[0].name,
        path: data1[0].path,
        children: data1[0].children,
        curChild: -1,
        absolutePath: data1[0].absolutePath,
        offset: -1,
        type: 'folder'
      }
      // console.log('this.root is : ', this.root1)
    } catch (error) {
      console.error('Error fetching data:', error)
      // 处理错误，比如显示提示消息给用户
    }
  }
}
