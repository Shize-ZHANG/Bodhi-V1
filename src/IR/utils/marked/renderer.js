import defaultOptions from './options'
// import { cleanUrl, escape } from './utils'
/**
 * @ author jojo
 * @ date 2024/10/13
 * @ description: 渲染文本为HTML工具类
 */
function Renderer(options={}){
    this.options = options || defaultOptions;
}
// 渲染头部信息
Renderer.prototype.frontmatter = function (text) {
    return `<pre class="front-matter">\n${text}</pre>\n`
}

// 渲染块级数学公式
Renderer.prototype.multiplemath = function (text) {
    let output = ''
    if (this.options.mathRenderer) {
        const displayMode = true
        output = this.options.mathRenderer(text, displayMode)
    }

    return output || `<pre class="multiple-math">\n${text}</pre>\n`
}
