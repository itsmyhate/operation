export const tableRouting = [
    {
        path: 'table',
        name: 'Table',
        component: () => import(/* webpackChunkName: Table */'@/views/main/Table.vue'),
        meta: { keepAlive: false }
    },
];
