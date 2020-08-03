export const menuRouting = [
    {
        path: 'menu',
        name: 'Menu',
        component: () => import(/* webpackChunkName: Menu */'@/views/main/Menu.vue'),
        meta: { keepAlive: true }
    },
];
