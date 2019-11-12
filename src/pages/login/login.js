import Vue from "vue"
import App from "./login.vue"
// 引入系统样式表
import "./login.scss"
import "southgisui/lib/sgui-theme/index.css";

import {SgMsg} from 'southgisui'
Vue.use(SgMsg)
console.log(SgMsg);
Vue.prototype.$msg=SgMsg
console.log(Vue.prototype.$msg);
// 设置为 false 以阻止 vue 在启动时生成生产提示。
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount("#login")

