import VueRouter, {RawLocation, RouteConfig} from 'vue-router';
import loginRouting from "@/router/login/login.routing";
import workbenchRouting from "@/router/workbench/workbench.routing";
import subAppRouting from "@/router/workbench/sub-app.routing";
import {checkLogin} from "@/services/auth.service";

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
            // ...subAppRouting,
            ...workbenchRouting,
        ]
    },
    ...loginRouting,
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach((to, from, next) => {
    if (to.path.indexOf('login') > -1 || checkLogin()) {
        next();
    } else {
        next('/login');
    }
});
export default router;

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location: RawLocation) {
    // @ts-ignore
    return originalPush.call(this, location).catch(err => {console.log(err)})
}
