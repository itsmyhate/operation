export const membersRouting = [
    {
        path: 'members',
        name: 'Members',
        component: () => import(/* webpackChunkName: Members */ '@/views/orgs/Members.vue'),
        meta: { keepAlive: true },
    }, {
        path: 'tenants',
        name: 'Tenant',
        component: () => import(/* webpackChunkName: Members */ '@/views/orgs/Tenant/Tenant.vue'),
        meta: { keepAlive: true },
    }, {
        path: 'tenantsauthorization',
        name: 'TenantsAuthorization',
        component: () => import(/* webpackChunkName: Members */  '@/views/orgs/Tenant/TenantsAuthorization.vue'),
        meta: { keepAlive: true },
    },{
        path: 'post',
        name: 'Post',
        component: () => import(/* webpackChunkName: Members */ '@/views/orgs/Post.vue'),
        meta: { keepAlive: true },
    }, {
        path: 'role',
        name: 'Role',
        component: () => import(/* webpackChunkName: Members */ '@/views/orgs/Role.vue'),
        meta: { keepAlive: true },
    },
];
