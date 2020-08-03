<template>
  <div id="root">
    <Layout>
      <Header v-if="isLogin" class="bg-primary ivu-color-white d-flex justify-content-center p-0" >
        <SubAppHeader></SubAppHeader>
      </Header>
      <Divider class="m-0"/>
      <iContent class="root-container">
        <keep-alive :include="aliveRoutes"> <!-- -->
          <router-view/>
        </keep-alive>
<!--        <SubApp></SubApp>-->
      </iContent>
    </Layout>
  </div>
</template>
<script lang="ts">
import SubApp from '@/components/SubApp.vue';
import SubAppHeader from '@/components/SubAppHeader.vue';
import {IsLoginService} from '@/services/notice/is-login.service';
import {GET_ALIVE_ROUTE} from '@/store/route-keep-alive.module';
import Vue from 'vue';

export default Vue.extend({
  name: 'App',
  components: {SubApp, SubAppHeader},
  data() {
    return {
      isLogin: false,
      aliveRoutes: [],
    };
  },
  created() {
    this.isLogin = this.$COMMON.AuthService.checkLogin();
    this.aliveRoutes = this.$store.getters[GET_ALIVE_ROUTE]();
    console.log(this.aliveRoutes);
    const isLogin = IsLoginService.login$.subscribe((value: boolean) => {
      this.isLogin = value;
    });
    IsLoginService.add(isLogin);
  },
  beforeDestroy(): void {
    IsLoginService.logins.unsubscribe();
  },
  methods: {
  },
  // 生命周期钩子 (按照它们被调用的顺序)
  // beforeCreate: undefined,
  // created: undefined,
  // beforeMount: undefined,
  // mounted: undefined,
  // beforeUpdate: undefined,
  // updated: undefined,
  // activated: undefined,
  // deactivated: undefined,
  // beforeDestroy: undefined,
  // destroyed: undefined,
  // // 非响应式的属性 (不依赖响应系统的实例属性)
  // methods: undefined,
  // // 渲染 (组件输出的声明式描述)
  // template: undefined,
  // render: undefined,
  // renderError: undefined
});
</script>
<style lang="scss">
  #root {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    justify-content: center;
    align-items: center;
  }
</style>
