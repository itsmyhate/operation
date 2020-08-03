<template>
    <div id="tttt1">
        <h3>test1</h3>
        <iInput v-model="username" class="m-3" type="text" placeholder="请输入用户名">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
        </iInput>
        <iInput v-model="password" class="m-3" type="password" placeholder="请输入密码">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </iInput>
        <iButton @click="consoleForm">console</iButton>
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
