import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import store, {destoryStore} from './store';
import router, {destoryRouter} from './router';
import 'popper.js';
import './public-path';
import {COMMON} from 'app-constants-js';
import {SET_ALIVE_ROUTE} from "@/store/route-keep-alive.module";
import RouteTopologyService from "@/services/route-topology.service";
import 'ant-design-vue/dist/antd.css';
import Antd from 'ant-design-vue';

Vue.config.productionTip = false;
let vue: any = null;
Vue.prototype.$COMMON = COMMON;
Vue.use(Antd);
// @ts-ignore
if (!window.__POWERED_BY_QIANKUN__) {
  initApp().then(() => {
  });
}

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
  RouteTopologyService.checkAndInit();
  /*
  * 设置路由
  * */
  store.commit(SET_ALIVE_ROUTE);
  vue = new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount('#test');
}

export async function bootstrap(props: any) {
  console.log('[vue] devplatform app bootstraped' + JSON.stringify(props));
}
export async function mount(props: any) {
  await initApp(props);
  const actionsKeyEnum = vue.$COMMON.ActionsKeyEnum;
  const globalStateService = vue.$COMMON.globalStateService;
  globalStateService.setAction(props);
  globalStateService.on(vue.$COMMON.AppNameEnum.test, (state: any, preState: any) => {
    console.log('test观察者：', state);
    /*
    * 快照时，添加监听
    * 失活又重新激活后，需要进入上次失活的路由地址
    * */
    /*if (state.action === actionsKeyEnum.setHisRoute) {
      vue.$router.push({path: state.payload});
      if (state.callBack) { state.callBack(); }
    }*/
  });
  /*
  * 快照时，添加下面跳转；
  * --mount后便不会再unmount
  * */
  // await vue.$router.push({path: '/main/button'});
  /*
  * 非快照时，需要触发获取上次路由
  * */
  globalStateService.dispatch(vue.$COMMON.AppNameEnum.root, {
    action: actionsKeyEnum.getHisRoute,
    payload: vue.$COMMON.AppNameEnum.test,
    callBack: (url: any) => {
      url = !!url ? url : '/main/button';
      vue.$router.push({path: url});
    }
  });
}

export async function unmount(props: any) {
  destoryRouter();
  destoryStore();
  vue.$destroy();
}
