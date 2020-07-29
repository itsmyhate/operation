const workbenchRouting = [
    {
        path: 'workbench',
        name: 'Workbench',
        component: () => import(/* webpackChunkName: "Workbench" */ '@/views/main/Workbench.vue'),
        meta: {keepAlive: true}
    }, {
        path: 'app-collect',
        name: 'AppCollect',
        component: () => import(/* webpackChunkName: "Workbench" */ '@/views/main/AppCollect.vue'),
        meta: {keepAlive: true}
    }
];
export default workbenchRouting;
