import Vue from "vue"
import App from "./data.vue"
// 引入系统样式表
import "./data.scss"
import "southgisui/lib/sgui-theme/index.css";
import store from '@/store'

import {SgMsg,SgModal,SgInput,SgForm,SgFormItem,SgButton} from 'southgisui'
Vue.use(SgModal)
Vue.use(SgInput)
Vue.use(SgMsg)
Vue.use(SgForm)
Vue.use(SgFormItem)
Vue.use(SgButton)

// 设置为 false 以阻止 vue 在启动时生成生产提示。
Vue.config.productionTip = false
import 'sgui-form/lib/sgui-form.css'
import sf from 'sgui-form'
Vue.use(sf)
new Vue({
  render: h => h(App),
  store
}).$mount("#data")

