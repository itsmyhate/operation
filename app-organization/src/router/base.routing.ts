export const baseRouting = [
    {
        path: 'menu-config',
        name: 'MenuConfig',
        component: () => import(/* webpackChunkName: Base */ '@/views/base/MenuConfig.vue'),
        meta: { keepAlive: true },
    },{
        path: 'trade',
        name: 'Trade',
        component: () => import(/* webpackChunkName: Base */ '@/views/base/Trade.vue'),
        meta: { keepAlive: true },
    },{
        path: 'interface',
        name: 'Interface',
        component: () => import(/* webpackChunkName: Base */ '@/views/base/Interface.vue'),
        meta: { keepAlive: true },
    },
];
