<template>
    <div class="d-flex flex-column h-100 justify-content-center">
        <div class="d-flex justify-content-around mr-5">
            <h5>big: </h5>
            <a-button >default</a-button>
            <a-button type="primary" :size="'large'">primary</a-button>
            <a-button type="dashed" :size="'large'">dashed</a-button>
            <a-button type="text" :size="'large'">text</a-button>
            <a-button type="info" :size="'large'">info</a-button>
            <a-button type="success" :size="'large'">success</a-button>
            <a-button type="warning" :size="'large'">warning</a-button>
            <a-button type="error" :size="'large'">error</a-button>
        </div>
        <div class="d-flex justify-content-around mr-5 mt-5">
            <h5>Small: </h5>
            <a-button type="primary" :size="'small'">primary</a-button>
            <a-button type="dashed" :size="'small'">dashed</a-button>
            <a-button type="text" :size="'small'">text</a-button>
            <a-button type="info" :size="'small'">info</a-button>
            <a-button type="success" :size="'small'">success</a-button>
            <a-button type="warning" :size="'small'">warning</a-button>
            <a-button type="error" :size="'small'">error</a-button>
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
