import store from '@/store'
window.fpa=(function () {
  return {
    addTab:(tab)=>{
      store.commit('SET_ADDTAB',tab)
      console.log(tab);
    }
  }
})();
