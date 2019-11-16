import Vue from "vue"
import App from "./home.vue"
import store from "@/store"
import '@/assets/scss/base.scss'
// 引入sgui组件库
import "southgisui/lib/sgui-theme/index.css"
// import "southgisui/lib/sgui-theme/fpa.css"

import {SgContainer,
  SgModal,
  SgDropdown,
  SgDropdownItem,
  SgHeader,SgRow,SgCol,SgMenu,SgSubmenu,SgScroll,
  SgAside,
  SgMenuItem,SgIcon,SgMain,SgTab,SgTabPane,SgButton} from 'southgisui'
Vue.use(SgContainer)
Vue.use(SgHeader)
Vue.use(SgRow)
Vue.use(SgCol)
Vue.use(SgMenu)
Vue.use(SgSubmenu)
Vue.use(SgMenuItem)
Vue.use(SgIcon)
Vue.use(SgDropdown)
Vue.use(SgMain)
Vue.use(SgTab)
Vue.use(SgTabPane)
Vue.use(SgButton)
Vue.use(SgModal)
Vue.use(SgDropdown)
Vue.use(SgDropdownItem)
Vue.use(SgScroll)
Vue.use(SgAside)
import {isLogin} from "@/assets";
import SgScrollbar from 'southgis-scrollbar'
Vue.component('sg-scrollbar',SgScrollbar)
import 'southgis-scrollbar/scrollbar.css'
// 引入系统样式表
// 设置为 false 以阻止 vue 在启动时生成生产提示。
Vue.config.productionTip = false
function parseQueryString(url){
  url = url == null ? window.location.href : url
  var search = url.substring(url.lastIndexOf('?') + 1)
  if (!search) {
    return {}
  }
  console.log(JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '')
    .replace(/&/g, '","').replace(/=/g, '":"') + '"}').scode);
  return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '')
    .replace(/&/g, '","').replace(/=/g, '":"') + '"}')
}
/**
* @Description:判断是否登陆，若未登陆，跳转登录页，登陆完将系统信息存入vuex中
* @author huangjianhui
* @date 2019/10/25
*/
isLogin(parseQueryString())
  .then(res=>{
    store.commit('saveMpData',res.data)
    new Vue({
      store,
      render: h => h(App)
    }).$mount("#mainProject")
  })



