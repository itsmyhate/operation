import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router, { destoryRouter } from './router';
import store, {destoryStore} from './store';
import 'popper.js';
import './public-path';
import {COMMON} from 'app-constants-js';

import '@/assets/css/bootstrap.min.css';
import 'ant-design-vue/dist/antd.css'
import '@/assets/css/common.css'

import API from 'app-component';
import {GlobalState} from "@/entity/model/GlobalState";
import RouteTopologyService from "@/services/route-topology.service";
import {SET_ALIVE_ROUTE} from "@/store/route-keep-alive.module";
import ApiService from "@/services/restful-api/api.service";
import MockService from "@/mock/mock.service";

Vue.prototype.$COMMON = COMMON;
Vue.config.productionTip = false;

let vue: Vue;
Vue.use(API);

async function initApp(props?: any) {
  if(process.env.NODE_ENV === 'development') {
    const constants = await import('../../app-constants/src/index');
    Vue.prototype.$COMMON = constants.COMMON;
    render();
  } else {
    render();
  }
}
function render() {
  ApiService.init();
  MockService.init();
  RouteTopologyService.checkAndInit();
  /*
  * 设置路由
  * */
  store.commit(SET_ALIVE_ROUTE);
  vue = new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount('#organization');
}

// @ts-ignore
if(!window.__POWERED_BY_QIANKUN__) {
  initApp().then(() => {
  });
}
export async function bootstrap(props: any) {
  console.log('[vue] devplatform app bootstraped' + JSON.stringify(props));
}
export async function mount(props: any) {
  await initApp(props);
  vue.$COMMON.globalStateService.setAction(props);
  /*
  * test观察者
  * */
  vue.$COMMON.globalStateService.on(vue.$COMMON.AppNameEnum.organization, (state: GlobalState, preState: GlobalState) => {
    console.log('organization观察者：', state.action);
  });

  vue.$COMMON.globalStateService.dispatch(vue.$COMMON.AppNameEnum.root, new GlobalState({
    action: vue.$COMMON.ActionsKeyEnum.getHisRoute, payload: vue.$COMMON.AppNameEnum.organization, callBack: (url) => {
      console.log('organization...mount setAppRouteAction.......', url);
      if(!!url) {
        vue.$router.push({path: url});
      }
    }
  }));
}
export async function unmount(props: any) {
  const path = vue.$route.path;
  vue.$COMMON.globalStateService.dispatch(vue.$COMMON.AppNameEnum.root, new GlobalState({
    action: vue.$COMMON.ActionsKeyEnum.setHisRoute, payload: {[vue.$COMMON.AppNameEnum.organization]: path},
    callBack: () => {
      console.log('organization...unmount setAppRouteAction.......', path);
    }
  }));
  destoryRouter();
  destoryStore();
  vue.$destroy();
}
