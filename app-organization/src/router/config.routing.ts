export const configRouting = [
    {
        path: 'dict',
        name: 'Dict',
        component: () => import(/* webpackChunkName: Config */ '@/views/config/Dict.vue'),
        meta: { keepAlive: true },
    },
];
