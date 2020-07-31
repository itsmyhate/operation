<template>
    <a-row :gutter="48">
        <a-col v-for="num in 10" :span="7" class="d-flex flex-column ml-5">
            <div class="d-flex flex-row box-df"
                 style="height: 240px;border: 1px solid #D1E3FF;border-radius: 15px;margin: 10px;">
                <div class="mt-4" style="font-size: 16px;text-align: left;width: 100%;height: 30px">
                    <span style="margin-left: 15%">xx信托</span>
                    <a-button class="mr-2" style="margin-left: 40%;font-size: 12px;height: 18px">+添加产品</a-button>
                    <a-divider :dashed="true" class="mt-2"/>
                    <div style="font-size: 12px;">
                        <div>
                            <span style="margin-left: 3rem">营销管理平台</span>
                            <span @click="clickIt" style="margin-right: auto;color: #1972FF">产品授权</span>
                        </div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                    </div>

                </div>
                <div style="margin-top: 5rem;position: relative;text-align: left">

                </div>
            </div>
        </a-col>
    </a-row>
</template>
<script lang="ts">
    /**
     * 租户概览展示块
     */
    import Vue from 'vue';
    import {Divider} from 'ant-design-vue';

    Vue.use(Divider);

    export default Vue.extend({
        name: "TenantShowComponent",
        methods: {
            clickIt() {
                this.$router.push('/main/tenantsauthorization');
            }
        },
    })
</script>

<style scoped>
    .box-df {

    }

    .box-df:hover {
        box-sizing: border-box;
        -moz-box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.349019607843137);
        -webkit-box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.349019607843137);
        box-shadow: 0px 0px 8px rgba(0, 191, 255, 0.349019607843137);
    }
</style>
