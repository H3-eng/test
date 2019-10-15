<template>
    <div v-html="logText" class="logtext"></div>
</template>

<script>
import api from '@/api'
export default {
  name: "login",
  data(){
    return{
      logText:''
    }
  },
  mounted(){
    api.getLog()
      .then(res=>{
        this.logText=res[0].logText
      })
  }
}
</script>

<style scoped lang="scss">
.logtext{
    padding:20px;
}
</style>
