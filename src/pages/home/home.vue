<template>
    <div id="mainProject">
    <sg-container direction="vertical" class="home">
<!--        系统头部 start-->
        <sg-header class="home-header">
            <sg-row>
                <div class="logo">
                    <img src="/bootstrap/logo.png" alt="">
                    <h1>{{mpdata.sysTitle}}</h1>
                </div>
                <sg-scroll style="flex:1;">
                    <i-menu :data="JSON.parse(mpdata.mTree).children" v-if="direction==='vertical'"></i-menu>
                </sg-scroll>
                <div class="unit-wrap">
                    <div class="unit">
                        <sg-dropdown placement="bottom-end" offset="15px,0">
                   <div class="letter">{{mpdata.loginName[0]}}</div>
                            <sg-icon type="icon-sort-desc"></sg-icon>
                            <div slot="menu" class="user-info">
                                <div class="info">
                                    <div class="letter">{{mpdata.loginName[0]}}</div>
                                    <div class="person">
                                        <p>{{mpdata.loginName}}</p>
                                        <p>{{mpdata.realName}}</p>
                                    </div>
                                    <span class="logout" @click="logoutUrl">
                                        <sg-icon type="icon-tuichu2"></sg-icon>
                                    </span>
                                </div>
<!--                                预留接口，切换布局-->
<!--                                <sg-dropdown-item @click.native="changeLayout">切换布局</sg-dropdown-item>-->
                                <sg-dropdown-item @click.native="changeSys('dmc')">
                                    <i class="icon shuju"></i>
                                    数据管理中心
                                </sg-dropdown-item>
                                <sg-dropdown-item @click.native="changeSys('os')">
                                    <i class="icon yunwei"></i>
                                    运维管理中心
                                </sg-dropdown-item>
                                <sg-dropdown-item @click.native="changeSys('app')">
                                    <i class="icon yingyong"></i>
                                    应用服务中心
                                </sg-dropdown-item>
                                <sg-dropdown-item @click.native="changeSys('rmg')">
                                    <i class="icon shenzhen"></i>
                                    深圳成果管理
                                </sg-dropdown-item>
                            </div>
                        </sg-dropdown>
                    </div>
                </div>
            </sg-row>
        </sg-header>
<!--        系统头部  end-->

<!--        内容区  start-->
        <sg-container :direction="direction" style="height: calc(100% - 50px);">
<!--            侧边栏 放置纵向菜单-->
            <sg-aside v-if="direction==='horizontal'" style="width: 200px;">
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
<!--        内容去 end-->

<!--        每天日志更新  不需要可删除-->
        <sg-button style="position: fixed;top: 150px;right: 15px;"
                   v-if="show"
                   type="primary">更新日志（临时）</sg-button>
        <sg-modal v-model="show" modal-type="alert" ok-text="知道了" @on-ok="show=false">
            <div style="width:800px;height: 550px;overflow: auto">
                <iframe src="../log.html" style="display: block;width: 100%;height: 100%"
                ></iframe>
            </div>
        </sg-modal>
    </sg-container>
    </div>
</template>

<script>
import IMenu from '_c/menu/index.vue'
import {mapGetters,mapMutations} from 'vuex'
// import axios from 'axios'
export default {
  name: 'mainProject',
  components:{IMenu},
  computed:{
    /**
    * @Description:
    * @author huangjianhui
    * @date 2019/10/25
     * @param mpdata 系统信息
     * @param tabs  tab列表
     * @param active 菜单和tab选中高亮
    */
    ...mapGetters({
      mpdata:'getMpData',
      tabs:'tabs',
      active:'active'
    })
  },
  data(){
    return{
      //菜单默认横向
      direction:'vertical',
      //日志默认不显示
      show:false
    }
  },
  mounted(){
    //进页面,默认选中第一个模块展示,如果第一个没有页面，就继续往下找
    // const defaultTab=param=>{
    //   if(param.pageUrl===''&&param.children[0]){
    //     defaultTab(param.children[0])
    //   }else{
    //     this.addTab(param)
    //   }
    // }
    // defaultTab(JSON.parse(this.mpdata.mTree).children[0])
    //将addTab挂载到window上，还有更好的方法？
    window.addTab=this.addTab
    //为了兼容jsp
    window.addTap=this.addTab
    window.closeTab=this.tabRemove
    window.jumpTab=this.setActive
  },
  methods:{
    /**
    * @Description:vuex方法
    * @author huangjianhui
    * @date 2019/10/25
     * @addtab 打开tab，需要传参。具体见store-module-addTab.js
     * @tabRemove 关闭tab
     * @setActive 设置菜单和tab高亮选中
    */
    ...mapMutations({
      addTab:'SET_ADDTAB',
      tabRemove:'SET_CLOSETAB',
      setActive:'SET_ACTIVE'
    }),
    /**
    * @Description:切换布局，横向和纵向布局
    * @author huangjianhui
    * @date 2019/10/26
    */
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
    /**
    * @Description:切换系统。需要传子系统代码
     * app（应用服务中心）
     * dmc（数据中心）
     * os（运维中心）
     * rmg（深圳成果管理系统）
    * @author huangjianhui
    * @date 2019/10/26
    */
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
      case 'rmg':
        window.location.href=window.location.pathname +'?scode=rmg'
        break
      default:'os'
      }
    },
    /**
    * @Description:退出登陆，注销系统并返回登录页
    * @author huangjianhui
    * @date 2019/10/26
    */
    logoutUrl(){
      this.$modal.confirm({
        title: '提示',
        content:'确定退出系统?',
        closable: true,
        onOk: () => {
          //新的方式请求什么？
          // axios.get(this.mpdata.logoutUrl)
          //   .then(()=>{
          //
          //   })
          window.location.href=process.env.NODE_ENV==='production'?
            '/mainProject/login.html':'/login.html'
        }
      })

    }
  }
}
</script>

<style lang="scss" scoped>
    @import "./index.scss";
</style>

