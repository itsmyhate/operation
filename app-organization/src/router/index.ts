import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import {configRouting} from "@/router/config.routing";
import {membersRouting} from "@/router/members.routing";
import {appRouting} from "@/router/app.routing";
import {RawLocation} from "vue-router/types/router";
import {baseRouting} from "@/router/base.routing";

Vue.use(VueRouter);

export const routes: RouteConfig[] = [
  {
    path: '/',
    redirect: '/main/members'
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

export default router;
export function destoryRouter() {
  router = null;
}

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location: RawLocation) {
  // @ts-ignore
  return originalPush.call(this, location).catch(err => {console.log(err);});
};
