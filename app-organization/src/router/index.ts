import Vue from 'vue';
import VueRouter, {Route, RouteConfig} from 'vue-router';
import {configRouting} from "@/router/config.routing";
import {membersRouting} from "@/router/members.routing";
import {appRouting} from "@/router/app.routing";
import {NavigationGuardNext, RawLocation} from "vue-router/types/router";
import {baseRouting} from "@/router/base.routing";

Vue.use(VueRouter);

export const routes: RouteConfig[] = [
  {
    path: '/',
  },
  {
    path: '/main',
    component: () => import(/* webpackChunkName: "Main" */'@/views/Main.vue'),
    name: 'Main',
    children: [
      ...membersRouting,
      ...configRouting,
      ...appRouting,
      ...baseRouting,
    ]
  },
];

let router: any = new VueRouter({
  mode: 'history',
  // @ts-ignore
  base: window.__POWERED_BY_QIANKUN__ ? '/organization' : '/',
  routes,
});
router.beforeEach((to: Route, from: Route, next: NavigationGuardNext) => {
  /*
  * 会监听到主应用及其它应用路由 需要判断；
  * */
  if (to.path.startsWith('/main')) {
    console.log('organization 触发 root setHisRoute', to.path);
    Vue.prototype.$COMMON.globalStateService.dispatch(
        Vue.prototype.$COMMON.AppNameEnum.root,
        {
          action: Vue.prototype.$COMMON.ActionsKeyEnum.setHisRoute,
          payload: {organization: to.path}, callBack: () => {}
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
  return originalPush.call(this, location).catch((err: any) => { console.log(err); } );
};
