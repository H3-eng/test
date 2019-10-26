<template>
  <div>
    <sg-submenu :name="item.moduleId" v-if="item.children&&item.children.length>0" :placement="placement">
        <template slot="title">
<!--            <sg-icon slot="subIcon" :type="item.icon"/>-->
            <span slot="subTitle">{{ item.name }}</span>
        </template>
        <div v-for="items in item.children" :key="items.moduleId">
            <sub-menu v-if="items.children&&item.children.length>0" :item="items" placement="right-start"></sub-menu>
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
<!--        <img :src="item.imageUrl" class="icon">-->
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
      default:'bottom-start'
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
        width: 29px;
        height: 28px;
    }

    .sg-menu-item * {
        white-space: nowrap;
    }

</style>
