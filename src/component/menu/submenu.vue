<template>
  <div>
    <sg-submenu :name="item.moduleId" v-if="item.children&&item.children.length>0">
        <template slot="title">
<!--            <sg-icon slot="subIcon" :type="item.icon"/>-->
            <span slot="subTitle">{{ item.name }}</span>
        </template>
        <div v-for="items in item.children" :key="items.moduleId">
            <sub-menu v-if="items.children&&item.children.length>0" :item="items"></sub-menu>
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
    item: {}
  },
  methods: {
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
        vertical-align: middle;
    }

</style>
