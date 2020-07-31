import {Route} from "vue-router";

export const appRouting = [
    {
        path: 'app',
        name: 'Apps',
        component: () => import(/* webpackChunkName: Apps */ '@/views/app/Apps.vue'),
        // meta: { keepAlive: true },
    }, {
        path: 'add-app',
        name: 'AddApps',
        component: () => import(/* webpackChunkName: Apps */ '@/views/app/AddApps.vue'),
        meta: { keepAlive: true, name:'创建产品' },
    }, {
        path: 'upd-app',
        name: 'UpdApps',
        component: () => import(/* webpackChunkName: Apps */ '@/views/app/UpdApps.vue'),
        meta: { keepAlive: true, name:'修改产品' },
    },
];
