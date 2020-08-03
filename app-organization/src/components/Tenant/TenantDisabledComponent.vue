<template>
    <div>
        <a-row :gutter="48">
            <a-col v-for="num in 3" :span="7" class="d-flex flex-column ml-5 org-tenant-col">
                <a-card id="card1" title="xx信托" :hoverable="true" class="org-card-df" :gutter="6">
                    <span slot="extra">
                        <a-button class="mr-2 org-btn-add">删除</a-button>
                    </span>
                    <div v-for="num in 3">
                        <p>card content</p>
                    </div>
                    <span>启动设置</span>
                </a-card>
            </a-col>
        </a-row>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Divider, Card} from 'ant-design-vue';

    Vue.use(Divider).use(Card);

    export default Vue.extend({
        name: "TenantDisabledComponent"
    })
</script>

<style scoped lang="scss">
    .#{$prefix} {
        &card-df {
            width: 25rem;
            margin-left: 5%;
            height: 15rem;
            overflow: auto;
            overflow-x: hidden;
        }
        &card-df:hover {
            box-sizing: border-box;
            -moz-box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.349019607843137);
            -webkit-box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.349019607843137);
            box-shadow: 0px 0px 8px rgba(0, 191, 255, 0.349019607843137);
            cursor: auto;
        }
        &btn-add {
            margin-left: 30%;
            font-size: 12px;
            height: 18px;
        }
        &tenant-col {
            margin-top: 2rem;
        }
        &pd-auth {
            position: absolute;
            right: 10px;
            color: #1972FF;

        }
    }
</style>
