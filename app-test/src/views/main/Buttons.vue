<template>
    <div class="d-flex flex-column h-100 justify-content-center">
        <div class="d-flex justify-content-around mr-5">
            <h5>big: </h5>
            <iButton >default</iButton>
            <iButton type="primary" :size="'large'">primary</iButton>
            <iButton type="dashed" :size="'large'">dashed</iButton>
            <iButton type="text" :size="'large'">text</iButton>
            <iButton type="info" :size="'large'">info</iButton>
            <iButton type="success" :size="'large'">success</iButton>
            <iButton type="warning" :size="'large'">warning</iButton>
            <iButton type="error" :size="'large'">error</iButton>
        </div>
        <div class="d-flex justify-content-around mr-5 mt-5">
            <h5>Small: </h5>
            <iButton type="primary" :size="'small'">primary</iButton>
            <iButton type="dashed" :size="'small'">dashed</iButton>
            <iButton type="text" :size="'small'">text</iButton>
            <iButton type="info" :size="'small'">info</iButton>
            <iButton type="success" :size="'small'">success</iButton>
            <iButton type="warning" :size="'small'">warning</iButton>
            <iButton type="error" :size="'small'">error</iButton>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Buttons",
        methods: {
            aaa() {
            }
        }
    }
</script>

<style scoped>
</style>
