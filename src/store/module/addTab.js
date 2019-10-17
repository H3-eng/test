import * as types from '../type'
import Vue from 'vue'

function checkURL(URL) {
  let str = URL;
  //判断URL地址的正则表达式为:http(s)?://([\w-]+\.)+[\w-]+(/[\w- ./?%&=]*)?
  //下面的代码中应用了转义字符"\"输出一个字符"/"
  // eslint-disable-next-line no-useless-escape
  let Expression = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
  let objExp = new RegExp(Expression);
  if (objExp.test(str) == true) {
    return true;
  } else {
    return false;
  }
}
const state = {
  active: "", //当前选中菜单
  tabList:[]
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
    let title = value.name;
    let component = null;
    if (state.tabList.filter(f => f.name == value.moduleId) == 0) {
      if (checkURL(index)) {
        let templ = '<div style="height: 100%">' +
          '<iframe style="display: block;width:100%;height: 100%;border:0" src=' + index + '></iframe></div>'
        component = Vue.component('sg-iframe', {
          template: templ
        })
      } else {
        if(index===''){
          // alert('功能尚未发布')
          return false
        }
        component = resolve => require([`@/pages/${index}`], resolve)
      }
      state.tabList.push({
        label: title,
        name: value.moduleId,
        disabled: false,
        closable: true,
        component: component
      })
    }
    console.log(state.tabList);
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
