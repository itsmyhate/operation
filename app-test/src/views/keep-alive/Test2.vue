<template>
    <div id="tttt2">
        <h3>test2</h3>
        <a-input class="m-3" type="text" placeholder="请输入用户名">
            <a-icon type="ios-person-outline" slot="prepend"></a-icon>
        </a-input>
        <a-input class="m-3" type="password" placeholder="请输入密码">
            <a-icon type="ios-lock-outline" slot="prepend"></a-icon>
        </a-input>
    </div>
</template>

<script>
    export default {
        name: "Test2",
        data() {
            return {}
        } ,
        created() {
            console.log('test2 created ..............')
        },
        beforeDestroy() {
            console.log('test2 beforeDestory...........')
        },
        mounted() {
            console.log('test2 mounted...........')
        },
        methods: {
        }
    }
</script>

<style scoped>

</style>
