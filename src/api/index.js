import Vue from 'vue'
import axios from 'axios'
import store from '../store'
axios.interceptors.response.use((res) => {
  let code = res.data.code, msg = res.data.message
  if (code) {
    if (code === 200) {
      return Promise.resolve(res)
    } else {
      if (code === 404) {
        Vue.prototype.$msg.error('请求资源未找到')
      } else if (code === 500) {
        Vue.prototype.$msg.error('服务器错误，请联系管理员')
      } else if (10001 <= code <= 79999) {
        Vue.prototype.$msg.error(msg)
      }
      return Promise.reject(res)
    }
  }else{
    return Promise.resolve(res)
  }

}, (error,res) => {
  Vue.prototype.$load.hide();
  let appUrl = store.getters.mpdata.appUrl || null
  let urlArr = []
  if(appUrl){
    urlArr = JSON.parse(appUrl);
    if(urlArr.indexOf(res.config.url)>-1){
      return Promise.resolve(error)
    }
  }
  Vue.prototype.$msg.error('网络异常，请切换网络重试')
  return Promise.reject(error)
}
)
export default axios
