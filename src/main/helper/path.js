/**
 * 判断路径类型
 */
import fs from 'fs-extra'
import minimatch from 'minimatch'
import path from 'path'

function slash (path) {
  const isExtendedLengthPath = path.startsWith('\\\\?\\')

  if (isExtendedLengthPath) {
    return path
  }

  return path.replace(/\\/g, '/')
}



/**
 * 判断某个图像文件路径存在
 * @param {string} filePath
 */
function isValidImageFilePath (filePath) {
  return fs.existsSync(filePath) && isImageExtname(filePath) && fs.statSync(filePath).isFile()
}

/**
 * 判断文件路径有效(文件路径存在)
 * @param {string} filePath
 */
function isValidFilePath (filePath) {
  return fs.existsSync(filePath) && fs.statSync(filePath).isFile()
}


function isImageExtname (filePath) {
  const ext = path.extname(filePath)
  return ['.gif', '.png', '.jpg', '.jpeg'].indexOf(ext) !== -1
}

/**
 * 判断文件夹路径有效(文件路径存在)
 * @param {string} filePath
 */
function isValidFolderPath (filePath) {
  return fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()
}

/**
 *
 * @param {string} filePath
 * @param {string} dirPath
 */
function isFileInDirectory (filePath, dirPath) {
  return filePath.startsWith(dirPath + path.sep)
}

/**
 * 判断文件夹路径是否是“叶子目录”
 * @param {string} dirPath
 * @return true | False
 */
function isLeaveDirectory (dirPath) {
  if (isValidFolderPath(dirPath)) {
    const subFileOrFolder = fs.readdirSync(dirPath)
    for (const subItem of subFileOrFolder) {
      const subItemPath = path.resolve(dirPath, subItem)
      if (isValidFolderPath(subItemPath)) {
        return false
      }
    }
    return true
  }
  return false
}

function matchPathPattern (pathname, pathPatterns) {
  if (!pathPatterns) {
    return false
  }
  for (const pattern of pathPatterns) {
    if (minimatch(slash(pathname), slash(pattern))) {
      return true
    }
  }
  return false
}

export {
  isValidFilePath,
  isValidFolderPath,
  isFileInDirectory,
  isLeaveDirectory,
  matchPathPattern,
  isValidImageFilePath
}
