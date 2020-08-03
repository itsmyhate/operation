<template>
    <div id="tttt2">
        <h3>test2</h3>
        <iInput class="m-3" type="text" placeholder="请输入用户名">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
        </iInput>
        <iInput class="m-3" type="password" placeholder="请输入密码">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </iInput>
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
