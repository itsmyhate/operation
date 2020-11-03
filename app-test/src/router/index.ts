import Vue from 'vue';
import VueRouter, {RawLocation, RouteConfig} from 'vue-router';
import {keepAliveRouting} from "@/router/keep-alive.routing";
import {menuRouting} from "@/router/menu.routing";
import {tableRouting} from "@/router/table.routing";

Vue.use(VueRouter);

export const routes: RouteConfig[] = [
  {
    path: '/',
  },
  {
    path: '/main',
    component: () => import(/* webpackChunkName: Main */ '@/views/Main.vue'),
    children: [
      {
        path: 'render',
        name: 'Render',
        component: () => import(/* webpackChunkName: Render */'@/views/main/Render.vue'),
        meta: { keepAlive: true }
      }, {
        path: 'modal',
        name: 'Modal',
        component: () => import(/* webpackChunkName: Modal */'@/views/main/ModalTest.vue'),
        meta: { keepAlive: true }
      }, {
        path: 'button',
        name: 'Button',
        component: () => import(/* webpackChunkName: Button */'@/views/main/Buttons.vue'),
        meta: { keepAlive: true }
      },
      ...tableRouting,
      ...menuRouting,
      ...keepAliveRouting,
    ]
  }
];

let router: VueRouter = new VueRouter({
  mode: 'history',
  // @ts-ignore
  base: window.__POWERED_BY_QIANKUN__ ? '/test' : '/',
  routes,
});
router.beforeEach((to, from, next) => {
  /*
  * 会触发到主应用及其它应用路由的监听 需要判断；
  * */
  if (to.path.startsWith('/main')) {
    console.log('test 触发 root setHisRoute', to.path);
    Vue.prototype.$COMMON.globalStateService.dispatch(
        Vue.prototype.$COMMON.AppNameEnum.root,
        {
          action: Vue.prototype.$COMMON.ActionsKeyEnum.setHisRoute,
          payload: {test: to.path}, callBack: () => {}
        }
    );
  }
  next();
});
export default router;
export function destoryRouter() {
  router = null;
}

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location: RawLocation) {
  // @ts-ignore
  return originalPush.call(this, location).catch((err) => { console.log(err); } );
};
