const loginRouting = [
    {
        path: '/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "Login" */ '@/views/login/Login.vue'),
    },
];
export default loginRouting;
