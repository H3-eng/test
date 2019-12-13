<template>
    <sg-container direction="vertical" class="home">
        <sg-header>
            <div class="header inner clearfix">
                <div class="logo fl">
                    <h1>追书神器</h1>
                </div>
                <div class="searchgroup fr">
                    <sg-input placeholder="默认输入框">
                        <sg-button slot="append" type="primary">搜索</sg-button>
                    </sg-input>
                </div>
            </div>
           <div class="nav clearfix">
               <ul class="inner">
                   <li><a href="#">首页</a></li>
                   <li><a href="#">首页</a></li>
                   <li><a href="#">首页</a></li>
                   <li><a href="#">首页</a></li>
               </ul>
           </div>
        </sg-header>
        <sg-container>
            <sg-aside>
                <div class="card" v-for="(item,index) in statistics" :key="index">
                    <div class="c-head">
                        <h2>{{index}}</h2>
                    </div>
                    <div class="c-con clearfix">
                        <ul>
                            <li v-for="(res,i) in item" :key="i">{{res.name}}</li>
                        </ul>
                    </div>
                </div>
            </sg-aside>
            <sg-main>
                <rank></rank>
            </sg-main>
        </sg-container>
    </sg-container>
</template>
<script>
import home from '@/api/home.js'
import rank from '@/component/rank/rank.vue'
export default {
  component:{
    rank
  },
  data(){
    return{
      statistics:[]
    }       
  },
  methods:{
    getdata(){
      home.statistics().then(res=>{
        const result=res.data
        this.statistics=result
        console.log(res)
      })
    }
  },
  mounted() {
    this.getdata();
  }
}
</script>
<style lang="scss" scoped>
    @import "index.scss"
</style>
