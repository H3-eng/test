<template>
    <sg-container direction="vertical" class="home">
        <sg-header class="home-header">
            <sg-row>
                <div class="logo">
                    <img src="http://192.168.10.9:3002/logo.png" alt="">
                    <h1>{{mpdata.sysTitle}}</h1>
                </div>
                <sg-col>
                    <i-menu :data="JSON.parse(mpdata.mTree).children" v-if="direction==='vertical'"></i-menu>
                </sg-col>
                <div class="unit-wrap">
                    <div class="unit">
                        <sg-badge :value="1000" overflow-count="999" :offset="[-2,-7]">
                            <sg-icon type="icon-xiaoxi">Badge</sg-icon>
                        </sg-badge>
                    </div>
                    <div class="unit">
                        <sg-dropdown>
               <span>
                   {{mpdata.realName}}
               </span>
                            <sg-dropdown-menu slot="menu">
                                <sg-dropdown-item @click.native="changeLayout">切换布局</sg-dropdown-item>
                                <sg-dropdown-item @click.native="changeSys('dmc')">数据管理中心</sg-dropdown-item>
                                <sg-dropdown-item @click.native="changeSys('os')">运维管理中心</sg-dropdown-item>
                                <sg-dropdown-item @click.native="changeSys('app')">应用服务中心</sg-dropdown-item>
                                <sg-dropdown-item @click.native="logoutUrl">退出登陆</sg-dropdown-item>
                            </sg-dropdown-menu>
                        </sg-dropdown>
                    </div>

                </div>
            </sg-row>
        </sg-header>
        <sg-container :direction="direction" style="height: calc(100% - 50px);">
            <sg-aside v-if="direction==='horizontal'">
                <sg-scrollbar style="height: 100%">
                <i-menu :data="JSON.parse(mpdata.mTree).children" :horizontal="false" ></i-menu>
                </sg-scrollbar>
            </sg-aside>
            <sg-main>
                <sg-row class="nav-list">
                    <sg-col :column="12">
                        <sg-tab type="card" closable :value="active" @on-tab-remove="tabRemove" @on-click="setActive">
                            <sg-tab-pane v-for="item in tabs" :closable="item.closable" :label="item.label" :name="item.name"
                                         :key="item.moduleId">
                                <keep-alive>
                                    <components :is="item.component"></components>
                                </keep-alive>
                            </sg-tab-pane>
                        </sg-tab>
                    </sg-col>
                </sg-row>
            </sg-main>
        </sg-container>
    </sg-container>
</template>

<script>
import IMenu from '_c/menu/index.vue'
import {mapGetters,mapMutations} from 'vuex'
import axios from 'axios'
export default {
  name: 'Home',
  components:{IMenu},
  computed:{
    ...mapGetters({
      mpdata:'getMpData',
      tabs:'tabs',
      active:'active'
    })
  },
  watch:{
    tabs(n,o){
      console.log(n,o);
    }
  },
  data(){
    return{
      direction:'vertical'
    }
  },
  mounted(){
    this.addTab(JSON.parse(this.mpdata.mTree).children[0])
  },
  methods:{
    ...mapMutations({
      addTab:'SET_ADDTAB',
      tabRemove:'SET_CLOSETAB',
      setActive:'SET_ACTIVE'
    }),
    changeLayout(){
      switch (this.direction) {
      case "vertical":
        this.direction='horizontal'
        break
      case 'horizontal':
        this.direction='vertical'
        break
      default:'vertical'
      }
    },
    changeSys(scode){
      switch (scode) {
      case 'app':
        window.location.href=window.location.pathname +'?scode=app'
        break
      case 'dmc':
        window.location.href=window.location.pathname +'?scode=dmc'
        break
      case 'os':
        window.location.href=window.location.pathname +'?scode=os'
        break
      default:'os'
      }
    },
    logoutUrl(){
      axios.get(this.mpdata.logoutUrl)
        .then(()=>{
          window.location.href='/cas/login'
        })
    }
  }
}
</script>

<style lang="scss" scoped>
    @import "./index.scss";
</style>

