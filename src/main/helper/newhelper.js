import bus from 'vue3-eventbus'

/**
 * 判断某个文件是否是 markdown 后缀
 * @param {string} filePath
 * @returns {boolean}
 */
function isMarkdownExtname (filePath) {
  // 获取最后一个点的位置
  const dotIndex = filePath.lastIndexOf('.')

  // 如果没有找到点，说明没有扩展名，返回 false
  if (dotIndex === -1) {
    return false
  }

  // 提取扩展名
  const extname = filePath.slice(dotIndex)

  // 判断扩展名是否为 '.md' 或 '.markdown'
  return extname === '.md' || extname === '.markdown'
}

function resolvePath (...paths) {
  const stack = []

  // 遍历每一个路径片段
  for (let i = 0; i < paths.length; i++) {
    const parts = paths[i].split('/')

    for (const part of parts) {
      if (part === '' && stack.length === 0) {
        // 如果是绝对路径，直接清空stack并放入 '/'
        stack.push('/')
      } else if (part === '.' || part === '') {
        // 忽略当前目录和空字符串
        continue
      } else if (part === '..') {
        // 如果是 '..'，返回上一级目录，移除上一个路径部分
        if (stack.length > 0 && stack[stack.length - 1] !== '/') {
          stack.pop()
        }
      } else {
        // 正常路径片段，加入 stack
        stack.push(part)
      }
    }
  }

  // 处理特殊情况，如果结果为空，则返回根目录 '/'
  if (stack.length === 0) {
    return '/'
  }

  // 将结果连接成路径字符串
  return stack.join('/')
}

function getBasename (dirPath) {
  dirPath = decodeURI(dirPath)
  // 移除路径末尾的斜杠（防止空路径被返回）
  dirPath = dirPath.replace(/\/+$/, '')

  // 分割路径并返回最后一部分
  const parts = dirPath.split('/')
  return parts.pop()
}

function getDirname (filePath) {
  // 移除末尾的斜杠（如果有），除非整个路径是 '/'
  filePath = filePath.replace(/\/+$/, '')

  // 找到最后一个斜杠的位置
  const lastSlashIndex = filePath.lastIndexOf('/')

  // 如果没有斜杠，说明没有目录结构，返回空字符串（或可以返回'.'表示当前目录）
  if (lastSlashIndex === -1) {
    return '.'
  }

  // 如果斜杠是第一个字符且路径长度大于1（即路径为根目录），返回 '/'
  if (lastSlashIndex === 0) {
    return '/'
  }

  // 返回最后一个斜杠之前的部分，即目录名
  return filePath.substring(0, lastSlashIndex)
}

function getFileNameWithoutExt (pathname) {
  // 移除路径末尾的斜杠（如果有）
  pathname = pathname.replace(/\/+$/, '')

  // 提取文件名部分
  const fileName = pathname.split('/').pop()

  // 找到最后一个点的位置
  const dotIndex = fileName.lastIndexOf('.')

  // 如果没有找到点，或者点在第一个字符（隐藏文件），直接返回文件名
  if (dotIndex === -1 || dotIndex === 0) {
    return fileName
  }

  // 返回去掉扩展名的文件名
  return fileName.substring(0, dotIndex)
}

// 自定义函数来检查文件路径是否有效的 Markdown 文件
function isValidMarkdownFilePath (filePath, maxFileSize) {
  // 检查文件是否存在
  // if (!fs.existsSync(filePath)) {
  //   return false;
  // }

  // 检查扩展名是否为 Markdown
  if (!isMarkdownExtname(filePath)) {
    return false
  }
  return true
  // 获取文件状态信息
  // const stats = fs.statSync(filePath)

  // 检查是否为文件，并且文件大小是否小于 maxFileSize
  // return stats.isFile() && stats.size <= maxFileSize
}

function isValidFolderPath (filePath) {
  return !isMarkdownExtname(filePath)
}

async function fetchUserFiles (userId) {
  try {
    const response = await fetch(`http://localhost:8080/file/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data1 = await response.json() // 解析 JSON 响应
    if (response.status === 200) {
      console.log('User files:', data1) // 假设后端返回的文件信息在 data.files 中
    } else {
      console.error('Error fetching user files:', response.status)
    }
    const openDir = [{
      userId: data1[0].userId,
      id: data1[0].id,
      name: data1[0].name,
      path: data1[0].path,
      children: data1[0].children,
      curChild: -1,
      absolutePath: data1[0].absolutePath,
      offset: -1,
      type: 'folder'
    }]
    bus.emit('openDir', openDir[0])
  } catch (error) {
    console.error('Error fetching data:', error)
    // 处理错误，比如显示提示消息给用户
  }
}

function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// class myEventBus {
//   constructor () {
//     this.events = {}
//   }
//
//   // 监听事件
//   on (event, callback) {
//     if (!this.events[event]) {
//       this.events[event] = []
//     }
//     this.events[event].push(callback)
//   }
//
//   // 触发事件，并返回一个 Promise
//   emit (event, ...args) {
//     if (this.events[event]) {
//       const promises = this.events[event].map(callback => callback(...args))
//       // 使用 Promise.all() 来等待所有回调的执行
//       return Promise.all(promises)
//     } else {
//       // 如果没有事件监听器，返回一个 resolved Promise
//       return Promise.resolve([])
//     }
//   }
// }

export { isMarkdownExtname, resolvePath, getBasename, getDirname, getFileNameWithoutExt, isValidMarkdownFilePath, isValidFolderPath, fetchUserFiles, sleep }
