const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // configureWebpack: {
  //   resolve: {
  //     fallback: {
  //       fs: false, // 对 'fs' 使用空模块，防止浏览器端尝试加载它
  //       stream: false,
  //       constants: false
  //     }
  //   }
  // }
})
