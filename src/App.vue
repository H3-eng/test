<template>
    <div id="app">
        <home></home>
    </div>
</template>

<script>
import "normalize.css";
import "@/assets/scss/flex"
import Home from '_p/home/home.vue'
export default {
  name: "App",
  components:{Home}
}
</script>
