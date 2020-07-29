export const baseRouting = [
    {
        path: 'menu',
        name: 'Menu',
        component: () => import(/* webpackChunkName: Base */ '@/views/base/Menu.vue'),
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
