import {Route} from "vue-router";

const subAppRouting = [
    {
        path: '/finacc*',
        name: 'FinaccApp',
        component: () => import(/* webpackChunkName: "SubApp" */ '@/components/FinaccApp.vue'),
        meta: {keepAlive: true},
        beforeEnter: (to: Route, from: Route, next: any) => {
            setHisRoute('finacc', to.path);
            next();
        }
    }, {
        path: '/organization*',
        name: 'OrganizationApp',
        component: () => import(/* webpackChunkName: "SubApp" */ '@/components/OrganizationApp.vue'),
        meta: {keepAlive: true},
        beforeEnter: (to: Route, from: Route, next: any) => {
            setHisRoute('organization', to.path);
            next();
        }
    }, {
        path: '/test*',
        name: 'TestApp',
        component: () => import(/* webpackChunkName: "SubApp" */ '@/components/TestApp.vue'),
        // meta: {keepAlive: true},
        beforeEnter: (to: Route, from: Route, next: any) => {
            setHisRoute('test', to.path);
            next();
        }
    },
];
export default subAppRouting;

const setHisRoute = (appName: string, path: string): void => {
    /*Vue.prototype.$COMMON.globalStateService.dispatch(appName, new GlobalState({
        action: Vue.prototype.$COMMON.ActionsKeyEnum.setHisRoute,
        payload: path,
        callBack: () => { console.log('') }
    }))*/
};
