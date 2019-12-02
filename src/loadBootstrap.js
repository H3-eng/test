/**
 * 动态加载js
 * @param url js资源地址
 * @returns {Promise<unknown>}
 */
const loadJs = (url) => {
  return new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = url
    script.type = 'text/javascript'
    document.head.appendChild(script)
    script.onload = () => {
      resolve()
    }
  })
}

/**
 * 动态加载css
 * @param url css资源地址
 * @returns {Promise<unknown>}
 */
const loadCss = (url) => {
  return new Promise((resolve) => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = url
    document.head.appendChild(link)
    link.onload = () => {
      resolve()
    }
  })
}

//开发环境（dev）需要前缀，生产环境需要去掉（master）
const baseurl='http://192.168.10.126'
//加载axios库
loadJs(baseurl+'/bootstrap/axios.min.js')
//加载加密库
loadJs(baseurl+'/bootstrap/sha1.js')
// 加载qs库
loadJs(baseurl+"/bootstrap/qs.js")
// 加载公用样式库
loadCss(baseurl+"/bootstrap/common.css")
//加载api管理
loadJs(baseurl+"/bootstrap/apiMgr.js")
//加载单元函数
loadJs(baseurl+"/bootstrap/unit.js")

