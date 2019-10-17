<template>
    <div id="mainProject">
        <home v-if="islogin"></home>
    </div>
</template>

<script>
import "normalize.css";
import "@/assets/scss/flex"
import Home from '_p/home/home.vue'
// import api from '@/api'
// import sha1 from 'sha1'
export default {
  name: "App",
  components:{Home},
  data(){
    return{
      islogin:true
    }
  },
  mounted(){
    // api.mpdata()
    //   .then(res=>{
    //     if(Object.prototype.toString.call(res)=="[object String]"){
    //       if(res.indexOf('mainWeb登录页')){
    //         const url=`/cas/login?service=http://localhost:8081&client_name=iboa2&code=A0admina0z9${sha1('sinfo').toUpperCase()}`
    //         window.location.href=url
    //       }
    //     }
    //     // this.islogin=true
    //   })
  }
}
</script>
