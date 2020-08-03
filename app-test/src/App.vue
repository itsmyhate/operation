<template>
  <div id="test" class="root-container">
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: "App",
})
</script>
<style lang="less">

#test {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
