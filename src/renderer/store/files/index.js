import IRForest from '@/IR/component/forest'
import GraphManager from '@/IR/manager/graphManager'
import TreeManager from '@/IR/manager/treeManager'
import bus from 'vue3-eventbus'
import { toRaw } from 'vue'

const state = {
  trees: new TreeManager(),
  forest: new IRForest(),
  graph: new GraphManager()
}

const mutations = {
  buildByMarkdownContent (state, { filepath, content }) {
    state.trees.build(filepath, { content })
  },
  updateByMarkdown (state, { filepath, content }) {
    if (filepath) {
      state.trees.update(filepath, { content })
    } else {
      state.trees.updateCurrent({ content })
    }
  },
  updateByMind (state, { filepath, mindJson }) {
    if (filepath) {
      state.trees.update(filepath, { mindJson })
    } else {
      state.trees.updateCurrent({ mindJson })
    }
  },
  closeCurrentFile (state) {
    state.trees.closeCurrentTree()
  },

  // 设置为当前
  setCurrentFile (state, filepath) {
    state.trees.setTreeFromCached(filepath)
  },
  addTag (state, tagname) {
    state.trees.addTag(tagname)
  },
  removeTag (state, tagname) {
    state.trees.removeTag(tagname)
  },
  undo (state) {
    state.trees.undo()
  },
  redo (state) {
    state.trees.redo()
  },

  move (state, pathInfo) {
    state.trees.move(pathInfo.oldPath, pathInfo.newPath)
    bus.emit('renameOpenFiles', pathInfo)
  },

  /** forest */
  updateForest (state, files) {
    state.forest.update(files)
    bus.emit('sendToFicTree', toRaw(state.forest.mind))
  },

  updateForestByMind (state, mind) {
    state.forest.updateByMind(mind)
  },

  addBaseToForest (state, filename) {
    state.forest.addBase(filename)
    bus.emit('sendToFicTree', toRaw(state.forest.mind))
  },

  clearForest (state) {
    state.forest.clear()
    bus.emit('sendToFicTree', toRaw(state.forest.mind))
  },

  exportAll (state) {
    const files = state.forest.exportAll()
    window.electronAPI.exportForest(files, 'out')
    bus.emit('sendToFicTree', toRaw(state.forest.mind))
  },

  /** graph */
  buildGraph (state, info) {
    state.graph.buildGraph(info)
  },

  /**
   * @param {string} name 绝对路径名/tag名
   */
  queryNodeId (state, { name, hidden, timeout }) {
    const id = state.graph.queryNodeId(name)
    if (hidden === undefined) {
      bus.emit('focusById', { id, timeout })
    } else {
      if (hidden !== true) {
        bus.emit('showNode', id)
      } else {
        bus.emit('hideNode', id)
      }
    }
  },

  queryNodesByToken (state, token) {
    const nodes = state.graph.queryNodesByToken(token)
    bus.emit('sendNodesResult', { nodes })
  }
}

/**
 * 判断某个文件是markdown后缀
 * @param {string} filePath
 */
function isMarkdownExtname (filePath) {
  // 检查filePath是否为有效字符串
  if (typeof filePath !== 'string' || filePath.trim() === '') {
    console.error('Invalid filePath:', filePath) // 打印错误信息
    return false // 返回false表示无效
  }
  // 获取文件名的最后一个部分
  const extension = filePath.split('.').pop().toLowerCase() // 将扩展名转换为小写
  return extension === 'md' || extension === 'markdown'
}

/**
 * 判断某个markdown文件可以进行读取(路径存在，为md文件，且大小不超过100KB)
 * @param {string} filePath
 */
async function isValidMarkdownFilePath (filePath) {
  // 检查文件扩展名是否为 Markdown
  if (!isMarkdownExtname(filePath)) {
    return false
  }

  try {
    const response = await fetch(filePath, { method: 'HEAD' }) // 使用 HEAD 请求以获取文件大小

    if (!response.ok) {
      return false // 文件不存在或无法访问
    }

    const fileSize = Number(response.headers.get('Content-Length')) // 获取文件大小
    const maxFileSize = 100 * 1024
    return fileSize <= maxFileSize // 验证文件大小
  } catch (error) {
    console.error('Error validating file path:', error)
    return false // 发生错误，返回 false
  }
}

export const readFile = async (filePath) => {
  if (await isValidMarkdownFilePath(filePath)) {
    try {
      const response = await fetch(filePath)

      if (!response.ok) {
        throw new Error('网络错误或文件无法访问')
      }
      console.log('zkk3', response)
      const content = await response.text() // 将响应内容读取为文本
      console.log('zkk3', content)
      return { error: 0, content }
    } catch (error) {
      console.error(error.message)
      alert('读取文件失败: ' + error.message)
      return { error: -1, content: '' }
    }
  } else {
    alert('不合法的Markdown文件路径或者文件大小>100kb')
    return { error: -1, content: '' }
  }
}

const actions = {
  async setCurrentFile (context, { url, type }) {
    try {
      if (type === 'setting') {
        bus.emit('changeMode', -1)
      } else {
        if (!context.state.trees.containsCached(url)) {
          console.log('zkk2', url)
          // const res = await window.electronAPI.readFile(url)
          const res = readFile(url)
          console.log('zkk4', res)
          if (res.error !== -1) {
            context.commit('buildByMarkdownContent', { filepath: url, content: (await res).content })
          } else {
            console.error(`读取${url}失败`)
          }
        }
        context.commit('setCurrentFile', url)
      }
    } catch (error) {
      console.error('Error fetching markdown file', error)
    }
  },

  async updateFilesOfForest (context, filepaths) {
    const files = []
    const validFilepaths = context.state.forest.filterPaths(filepaths)
    for (const filepath of filepaths) {
      if (validFilepaths.indexOf(filepath) !== -1) {
        const file = {
          path: filepath,
          content: (await readFile(filepath)).content
        }
        console.log('zkk5', file.content)
        files.push(file)
      } else {
        files.push({ path: filepath })
      }
    }
    context.commit('updateForest', files)
  }

  // LISTEN_FILE_MOVE ({ commit }) {
  //   window.electronAPI.setFilePathByMove((e, pathInfo) => {
  //     commit('move', pathInfo)
  //   })
  // },

  // LISTEN_SET_FOCUS_ID_BY_NAME ({ commit }) {
  //   window.electronAPI.setFocusIdByName((e, name) => {
  //     setTimeout(() => commit('queryNodeId', { name }), 300)
  //   })
  // },

  // LISTEN_FILE_CHANGED ({ state, commit }) {
  //   window.electronAPI.listenFileChanged(async (e, filepath) => {
  //     if (state.trees.containsCached(filepath)) {
  //       const res = await window.electronAPI.readFile(filepath)
  //       if (res.error !== -1) {
  //         commit('updateByMarkdown', { filepath, content: res.content })
  //       } else {
  //         console.error(`读取${filepath}失败`)
  //       }
  //     }
  //   })
  // }
}

const getters = {
  markdown: (state) => state.trees.markdown,
  mind: (state) => state.trees.mind,
  outline: (state) => state.trees.outline,
  tags: (state) => state.trees.tags,

  forestMind: (state) => state.forest.mind,
  forestMarkdown: (state) => state.forest.markdown,

  graphNodes: (state) => state.graph.nodes,
  graphLinks: (state) => state.graph.links
}

const files = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

export default files
