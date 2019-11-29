import Vue from 'vue'
import Vuex from 'vuex'
import app from './module/addTab'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    mpdata: {}
  },
  mutations: {
    saveMpData(state, res) {
      state.mpdata = res
    }
  },
  getters: {
    getMpData: (state) => state.mpdata
  },
  modules: {app}
})























