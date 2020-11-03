import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router, { destoryRouter } from './router';
import store, {destoryStore} from './store';
import 'popper.js';
import './public-path';
import {COMMON} from 'app-constants-js';

import '@/assets/css/bootstrap.min.css';
import 'ant-design-vue/dist/antd.css';
import '@/assets/css/common.scss';

import {GlobalState} from "@/entity/model/GlobalState";
import RouteTopologyService from "@/services/route-topology.service";
import {SET_ALIVE_ROUTE} from "@/store/route-keep-alive.module";
import ApiService from "@/services/restful-api/api.service";
import MockService from "@/mock/mock.service";

Vue.prototype.$COMMON = COMMON;
Vue.config.productionTip = false;

let vue: Vue;
// Vue.use(Antd);

async function initApp(props?: any) {
  if (process.env.NODE_ENV === 'development') {
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
if (!window.__POWERED_BY_QIANKUN__) {
  initApp().then(() => {
  });
}
export async function bootstrap(props: any) {
  console.log('[vue] devplatform app bootstraped' + JSON.stringify(props));
}
export async function mount(props: any) {
  await initApp(props);
  const actionsKeyEnum = vue.$COMMON.ActionsKeyEnum;
  const globalStateService = vue.$COMMON.globalStateService;
  globalStateService.setAction(props);

  globalStateService.on(vue.$COMMON.AppNameEnum.organization, (state: GlobalState, preState: GlobalState) => {
    console.log('organization观察者：', state.action, state.payload);
    /*
    * 快照时，添加监听
    * 失活又重新激活后，需要进入上次失活的路由地址
    * */
    if (state.action === actionsKeyEnum.setHisRoute) {
      vue.$router.push({path: state.payload});
      if (state.callBack) { state.callBack(); }
    }
  });
  /*
  * 快照时，添加下面跳转；
  * --mount后便不会再unmount
  * */
  await vue.$router.push({path: '/main/members'});
  /*
  * 非快照时，需要触发获取上次路由
  * */
  /*globalStateService.dispatch(vue.$COMMON.AppNameEnum.root, new GlobalState({
    action: actionsKeyEnum.getHisRoute,
    payload: vue.$COMMON.AppNameEnum.organization,
    callBack: (url) => {
      url = !!url ? url : '/main/members';
      vue.$router.push({path: url});
    }
  }));*/
}
export async function unmount(props: any) {
  destoryRouter();
  destoryStore();
  vue.$destroy();
}
