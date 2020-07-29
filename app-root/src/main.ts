import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import {store} from './store';
import {startQiankun} from "@/qiankun.start";
import API from 'app-component';
import {COMMON} from 'app-constants-js';
import VueRouter from "vue-router";
// @ts-ignore
import locale from "app-component/dist/locale/zh-CN";
import '@/assets/css/bootstrap.min.css';
import 'app-constants-css/dist/css/index.css'
import '@/assets/css/common.css'
import ApiService from "@/services/restful-api/api.service";
import MockService from "@/mock/mock.service";
import RouteTopologyService from "@/services/route-topology.service";
import {SET_ALIVE_ROUTE} from "../../app-organization/src/store/route-keep-alive.module";
import {getMenusInfo} from "@/services/menus.service";

Vue.prototype.$COMMON = COMMON;
Vue.config.productionTip = false;



Vue.use(VueRouter);
Vue.use(API, {
  locale,
  size: 'large',
});
if(process.env.NODE_ENV === 'development') {
  import('../../app-constants/src/index').then(constants => {
    Vue.prototype.$COMMON = constants.COMMON;
    initRoot();
  });
} else {
  initRoot();
}

/*
* 启动
* */
function initRoot() {

  ApiService.init();
  MockService.init();
  RouteTopologyService.checkAndInit();
  /*
  * 设置路由快照
  * */
  store.commit(SET_ALIVE_ROUTE);
  const vue = new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount('#root');

  const subApps: any = getMenusInfo();
  if(!!subApps && !!subApps.length) {
    startQiankun(vue.$COMMON, subApps);
  }
}
