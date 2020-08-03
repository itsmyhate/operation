<template>
    
</template>

<script>
    export default {
        name: "Table",
        created() {
            console.log('Table create.........')
        },
        beforeDestroy() {
            console.log('Table beforeDestroy.........')
        },
        methods: {
            aaa() {
                this.$Modal.newInstance()
            }
        }
    }
</script>

<style scoped>
</style>
