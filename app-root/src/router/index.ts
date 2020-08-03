import loginRouting from '@/router/login/login.routing';
import subAppRouting from '@/router/workbench/sub-app.routing';
import workbenchRouting from '@/router/workbench/workbench.routing';
import Vue from 'vue';
import VueRouter, {RawLocation, RouteConfig} from 'vue-router';

export const routes: RouteConfig[] = [
    {
        path: '/',
        redirect: '/root/app-collect'
    },
    {
        path: '/root',
        name: 'Main',
        component: () => import(/* webpackChunkName: "Root" */ '@/views/main/Main.vue'),
        // meta: {keepAlive: true},
        children: [
            ...workbenchRouting,
        ]
    },
    ...subAppRouting,
    ...loginRouting,
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach((to, from, next) => {
    if (to.path.indexOf('login') > -1 || Vue.prototype.$COMMON.AuthService.checkLogin()) {
        next();
    } else {
        next('/login');
    }
});
export default router;

const originalPush = VueRouter.prototype.push;
// tslint:disable-next-line:typedef
VueRouter.prototype.push = function push(location: RawLocation) {
    // @ts-ignore
    return originalPush.call(this, location).catch((err) => {console.log(err); });
};
