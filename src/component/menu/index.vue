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
    data:{},
    horizontal:{
      type:Boolean,
      default:true
    }
  },
  components:{SubMenu},
  computed:{
    ...mapGetters({
      active:'active'
    })
  }
}
</script>

<style scoped>

</style>
