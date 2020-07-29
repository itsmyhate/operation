export const appRouting = [
    {
        path: 'app',
        name: 'Apps',
        component: () => import(/* webpackChunkName: Apps */ '@/views/app/Apps.vue'),
        meta: { keepAlive: true },
    },
];
