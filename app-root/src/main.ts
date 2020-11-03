import '@/assets/css/bootstrap.min.css';
import '@/assets/css/common.scss';
import MockService from '@/mock/mock.service';
import {startQiankun} from '@/qiankun.start';
import {globalStateListenerService} from '@/services/global-state-listener.service';
import {getMenusInfo} from '@/services/menus.service';
import ApiService from '@/services/restful-api/api.service';
import RouteTopologyService from '@/services/route-topology.service';
import {COMMON} from 'app-constants-js';
import Vue from 'vue';
import VueRouter from 'vue-router';
import 'zone.js';
import {SET_ALIVE_ROUTE} from '../../app-organization/src/store/route-keep-alive.module';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import {store} from './store';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

Vue.use(Antd);
Vue.prototype.$COMMON = COMMON;
Vue.config.productionTip = false;
Vue.use(VueRouter);
if (process.env.NODE_ENV === 'development') {
  import('../../app-constants/src/index').then((constants) => {
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
  if (!!subApps && !!subApps.length) {
    globalStateListenerService.init(vue.$COMMON, subApps);
    // startQiankun(vue.$COMMON, subApps);
  }
}
