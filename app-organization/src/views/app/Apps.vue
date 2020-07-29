<template>
    <div  class="d-flex flex-column">
        <div class="header-df d-flex flex-column justify-content-start">
            <h5 class="font-weight-bold m-2">产品管理</h5>
            <a-divider class="m-0"/>
        </div>
        <div class="body-df d-flex flex-column">
            <div class="">

            </div>
            <div class=""></div>
            <div class=""></div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Divider from "ant-design-vue";
    Vue.use(Divider);

    export default Vue.extend({
        name: "Apps",
        data() {
            return {
            }
        }
    })
</script>

<style scoped>
    .body-df{

    }
    .header-df{
        flex: 1;
    }
</style>
