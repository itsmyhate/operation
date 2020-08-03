<template>
    <div class="w-100">
        <!--            <keep-alive>-->
        <router-view/>
        <!--            </keep-alive>-->
    </div>
</template>

<script>
    export default {
        name: "KeepAliveTest",
        created() {
            console.log('keep-alive-test create.........')
        },
        beforeDestroy() {
            console.log('keep-alive-test destory.........')
        },
        methods: {
            menuClick(name) {
                this.$router.push({path: `/keep-alive${name}`});
                // history.replaceState(null, name, `/test/keep-alive${name}`);
            }
        }
    }
</script>

<style scoped>

</style>
