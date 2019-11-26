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
/**
* @Description:判断是否登陆，若未登陆，跳转登录页，登陆完将系统信息存入vuex中
* @author huangjianhui
* @date 2019/10/25
*/
console.time('执行')
for (let i = 0; i < 1000000; i++) {
  const div=document.createElement('div')
  document.querySelector('body').appendChild(div)
}
console.timeEnd('执行')
isLogin(fpa.parseUrl())
  .then(res=>{
    store.commit('saveMpData',res.data)
    new Vue({
      store,
      render: h => h(App)
    }).$mount("#mainProject")
  })



