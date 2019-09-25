import Vue from "vue"
import App from "./App.vue"
import store from "@/store"
import '@/assets/scss/common.scss'
// 引入sgui组件库
import "southgisui/lib/sgui-theme/index.css"
import sgui from "southgisui"
import SgScrollbar from 'southgis-scrollbar'
import 'southgis-scrollbar/scrollbar.css'
import api from "@/api"
// 引入系统样式表
Vue.use(sgui)
Vue.component('SgScrollbar',SgScrollbar)
// 设置为 false 以阻止 vue 在启动时生成生产提示。
Vue.config.productionTip = false
function parseQueryString(url){
  url = url == null ? window.location.href : url
  var search = url.substring(url.lastIndexOf('?') + 1)
  if (!search) {
    return {}
  }
  return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
}

api.mpdata({params:parseQueryString()})
  .then(res=>{
    store.commit('saveMpData',res)
    // console.log(fpa.getSysInfo());
    new Vue({
      store,
      render: h => h(App)
    }).$mount("#mainProject")
  })

window.addEventListener('message',(e)=>{
  console.log('接受信息');
  console.log(e);
  switch (e.data.type){
  case 'addTab':
    store.commit('SET_ADDTAB',tab)
    break
  case 'getInfo':
    document.getElementById(e.data.id).contentWindow.postMessage(store.getters.getMpData)
    break
  default :'getInfo'
  }
})


