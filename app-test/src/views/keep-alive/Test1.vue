<template>
    <div id="tttt1">
        <h3>test1</h3>
        <a-input v-model="username" class="m-3" type="text" placeholder="请输入用户名">
            <a-icon type="ios-person-outline" slot="prepend"></a-icon>
        </a-input>
        <a-input v-model="password" class="m-3" type="password" placeholder="请输入密码">
            <a-icon type="ios-lock-outline" slot="prepend"></a-icon>
        </a-input>
        <a-button @click="consoleForm">console</a-button>
    </div>
</template>

<script >

    // import routerSnapshot from '@/constants/mixins/router-snapshot';
    export default {
        name: "Test1",
        // mixins: routerSnapshot,
        data() {
            return {
                routeBindKeys: ['username', 'password',],
                username: '',
                password: '',
            }
        },
        created() {
            console.log('test1 created ..............')
        },
        beforeDestroy() {
            console.log('test1 beforeDestory...........')
        },
        mounted() {
            console.log('test1 mounted...........')
        },
        methods: {
            consoleForm() {
                console.log(this.username, this.password);
            }
        },
    }
</script>

<style scoped>

</style>
