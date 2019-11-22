<template>
    <sg-menu :horizontal="horizontal" :active-name="active">
        <div v-for="(item,index) in data" :key="index" style="flex-shrink: 0">
            <sub-menu :item="item"></sub-menu>
        </div>
    </sg-menu>
</template>


<script>
import SubMenu from './submenu'
import {mapGetters} from 'vuex'
export default {
  name: "IMenu",
  props:{
    //外部数据
    data:{},
    //组件使用方向
    horizontal:{
      type:Boolean,
      default:true
    }
  },
  components:{SubMenu},
  computed:{
    //高亮选项，菜单与tab同步，通过moduleid关联
    ...mapGetters({
      active:'active'
    })
  }
}
</script>

<style>
    .sg-menu{
        text-align: left;
    }
</style>
