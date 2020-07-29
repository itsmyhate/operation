<template>
  <a-locale-provider :locale="locale">
    <div id="organization" class="root-container">
      <router-view/>
    </div>
  </a-locale-provider>
</template>
<script lang="ts">
  import Vue from 'vue';
  import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
  import LocaleProvider from "ant-design-vue";
  Vue.use(LocaleProvider);
  export default Vue.extend({
    name: "App",
    data() {
      return {
        locale: zhCN,
      }
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
