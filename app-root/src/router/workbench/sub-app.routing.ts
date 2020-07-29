const subAppRouting = [
    {
        path: '/organization',
        name: 'Organization',
        component: () => import(/* webpackChunkName: "SubApp" */ '@/components/OrganizationApp.vue'),
        children: [
            {
                path: 'members',
                name: 'Members',
                children: [
                    {
                        path: 'user',
                        name: 'User'
                    }, {
                        path: 'post',
                        name: 'Post'
                    }
                ]
            }
        ]
    }, {
        path: '/test',
        name: 'Test',
        component: () => import(/* webpackChunkName: "SubApp" */ '@/components/TestApp.vue'),
        children: [
            {
                path: 'button',
                name: 'Button'
            }, {
                path: 'keep-alive',
                name: 'KeepAlive',
                children: [
                    {path: 'test1'},
                    {path: 'test2'},
                ]
            }
        ]
    },
];
export default subAppRouting;
