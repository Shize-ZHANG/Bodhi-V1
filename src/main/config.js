// const isOsx = process.platform === 'darwin'
// const isWindows = process.platform === 'win32'
// const isLinux = process.platform === 'linux'
// const isDevelopment = process.env.NODE_ENV !== 'production'

const isOsx = (typeof process !== 'undefined' && process.platform === 'darwin')
const isWindows = (typeof process !== 'undefined' && process.platform === 'win32')
const isLinux = (typeof process !== 'undefined' && process.platform === 'linux')
const isDevelopment = (typeof process !== 'undefined' && process.env.NODE_ENV !== 'production')

export {
  isOsx,
  isWindows,
  isLinux,
  isDevelopment
}
