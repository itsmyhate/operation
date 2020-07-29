<template>
  <div id="organization" class="root-container">
    <router-view/>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  export default Vue.extend({
    name: "App",
    data() {
      return { }
    },
    created() { },
    methods: { }
  })
</script>
<style lang="less">
#organization {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
