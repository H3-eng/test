import * as types from '../type'
import Vue from 'vue'
const state = {
  active: "", //当前选中菜单
  tabList:[{
    pageUrl: `/taskmanagement-web/dagDesinger.html`,
    name:'方案编辑',
    moduleId:785926256595959599949595
  }]
}

const getters = {
  tabs: state => state.tabList,
  active: state => state.active
}


const mutations = {
  [types.SET_TAB](state, val) {
    if (val) {
      for (let i = state.tabList.length - 1; i >= 0; i--) {
        if (state.tabList[i].name !== val) {
          state.tabList.splice(i, 1);
        }
      }
    }
  },
  // tab 选中
  [types.SET_ACTIVE](state, name) {
    state.active = name;
  },


  //tab 增加
  [types.SET_ADDTAB](state, value) {
    let index = value.pageUrl;
    if(index===''){
      alert('暂无页面')
      return false
    }
    let title = value.name;
    let component = null;
    if (state.tabList.filter(f => f.name == value.moduleId) == 0) {
      let templ = `<div style="height: 100%"><iframe style="display: block;
width:100%;height: 100%;border:0" src='${index}'></iframe></div>`
      component = Vue.component('sg-iframe', {
        template: templ
      })
      state.tabList.push({
        label: title,
        name: value.moduleId,
        disabled: false,
        closable: true,
        component: component
      })
    }
    state.active = value.moduleId;
  },

  //tab 关闭
  [types.SET_CLOSETAB](state, name) {
    console.log(name);
    let tab = state.tabList.filter(f => f.name == name)[0];
    let index = state.tabList.indexOf(tab);
    if (index == 0) {
      if (index != state.tabList.length - 1) {
        state.active = state.tabList[index + 1].name;
      } else {
        state.active = '';
      }
    } else {
      if (index != state.tabList.length - 1) {
        state.active = state.tabList[index + 1].name;
      } else {
        state.active = state.tabList[index - 1].name;
      }
    }
    state.tabList = state.tabList.filter(f => f.name != name);
  }
}

export default {
  state,
  getters,
  mutations
}
