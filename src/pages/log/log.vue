<template>
    <div v-html="logText" class="logtext"></div>
</template>

<script>
import home from '@/api/home'
export default {
  name: "login",
  data(){
    return{
      logText:''
    }
  },
  mounted(){
    home.getLog()
      .then(res=>{
        this.logText=res[0].logText
      })
  }
}
</script>

<style scoped lang="scss">
.logtext{
    padding:20px;
    text-align: left;
}
</style>
