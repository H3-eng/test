<template>
  <div>
    <sg-submenu :name="item.moduleId" v-if="item.children&&item.children.length>0"
                :placement="placement" :transfer="transfer">
        <template slot="title">
            <img :src="item.imageUrl" class="icon" v-if="showImg">
            <span slot="subTitle">{{ item.name }}</span>
        </template>
        <div v-for="items in item.children" :key="items.moduleId">
            <sub-menu v-if="items.children&&item.children.length>0"
                      :item="items" placement="right-start"
                      :transfer="false"
                      :showImg="false"
            ></sub-menu>
            <sg-menu-item
                    v-else
                    :name="items.name"
                    :key="items.name"
                    @click.native="addTab(items)"
            >
<!--                <sg-icon :type="item.icon"/>-->
                <span slot="title">{{ items.name }}</span>
            </sg-menu-item>
        </div>
    </sg-submenu>
    <sg-menu-item :name="item.moduleId" v-else @click.native="addTab(item)">
        <img :src="item.imageUrl" class="icon">
        <span>{{item.name}}</span>
    </sg-menu-item>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'

export default {
  name: "subMenu",
  props: {
    //菜单子项
    item: {
      type:Object,
      default: ()=>{
        return {}
      }
    },
    //菜单悬浮展示方向
    placement:{
      type:String,
      default:'bottom'
    },
    transfer:{
      type:Boolean,
      default:true
    },
    //是否展示功能图标，二级以上不展示
    showImg:{
      type:Boolean,
      default:true
    }
  },
  methods: {
    /**
    * @Description:通过SET_ADDTAB调用新开tab
    * @author huangjianhui
    * @date 2019/10/25
    */
    ...mapMutations({
      addTab: 'SET_ADDTAB'
    })
  }
}
</script>

<style scoped lang="scss">
    .icon {
        display: inline-block;
        width: 20px;
        height: 20px;
        vertical-align: -4px;
        margin-right: 10px;
    }

    .sg-menu-item * {
        white-space: nowrap;
    }

</style>
