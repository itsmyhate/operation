export const keepAliveRouting  = [{
    path: 'keep-alive',
    name: 'KeepAliveTest',
    component: () => import(/* webpackChunkName: KeepAlive */'@/views/keep-alive/KeepAliveTest.vue'),
    meta: { keepAlive: true },
    children: [
        {
            path: 'test1',
            name: 'Test1',
            component: () => import(/* webpackChunkName: KeepAlive */'@/views/keep-alive/Test1.vue'),
            meta: { keepAlive: true },
        }, {
            path: 'test2',
            name: 'Test2',
            component: () => import(/* webpackChunkName: KeepAlive */'@/views/keep-alive/Test2.vue'),
        },
    ]
}];
