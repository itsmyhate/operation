<template>
    <div class="d-flex flex-column">
        <div class="header-df d-flex flex-column justify-content-start">
            <a-menu v-model="current" mode="horizontal" class="tenant-header-menu" :default-selected-keys="['tenant']" @click="handleClick">
                <a-menu-item key="tenant" >租用情况统计</a-menu-item>
                <a-menu-item key="overriew" >租户概览</a-menu-item>
            </a-menu>
            <a-divider class="m-0"/>
        </div>
        <!--租用情况统计-->
        <div v-show="showPage === true || showPage === '' || showPage === undefined || showPage === null ">
            <!--title-->
            <div class="d-flex flex-column tenant-header">
                <div class="d-flex flex-row tenant-herder-font">
                    <div class="tenant-herder-lump"></div>
                    <span class="ml-2">产品使用占比</span>
                </div>
            </div>
            <!--chart-->
            <div class="d-flex flex-column">
                <div class="d-flex flex-row">
                    <div id="ec1" class="ec1 echart-left justify-content-between"></div>
                    <div id="ec2" class="ec2 echart-right justify-content-between"></div>
                </div>
            </div>
            <div style="">
                <!--信托产品使用时长-->
                <div class="d-flex flex-column tenant-header">
                    <div class="d-flex flex-row tenant-foot-font">
                        <div class="tenant-herder-lump"></div>
                        <span class="ml-2">信托产品使用时长</span>
                    </div>
                </div>
                <div class="d-flex flex-column justify-content-between" style="display: flex">
                    <div class="d-flex flex-row">
                        <div id="ec3" class="ec3" style="width: 40%;height:300px;"></div>
                    </div>
                </div>
            </div>
            <div style="">
                <!--投后管理平台-->
                <div class="d-flex flex-row tenant-foot-font">
                    <div class="tenant-herder-lump"></div>
                    <span class="ml-2">投后管理平台</span>
                </div>
                <div class="d-flex flex-column">
                    <div class="d-flex flex-row">
                        <a-table :columns="columns" :data-source="data" :showHeader="false" :row-key="record => record.time"
                                 style="width: 40%;margin-left: 20px" :pagination="false">
                        </a-table>
                    </div>
                </div>
            </div>
        </div>
        <!--租户概览-->
        <div class="d-flex flex-column" v-if="showPage === false">
            <!--title-->
            <div class="d-flex flex-column tenant-header">
                <div class="d-flex flex-row tenant-herder-font">
                    <div class="tenant-herder-lump"></div>
                    <span class="ml-2">使用中租户</span>
                    <a-button class="d-flex justify-content-end h-100 mr-2" style="margin-left: auto">+新增租户</a-button>
                </div>
            </div>
            <tenant-show-component></tenant-show-component>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Menu, Table, Divider, Select, Button} from "ant-design-vue";
    import TenantShowComponent from "@/components/Tenant/TenantShowComponent.vue";
    import {drawEchart, drawEcharts, drawLineChart} from "@/constants/component/Tenant/tenant-echarts";

    Vue.use(Menu);
    Vue.use(Table);
    Vue.use(Divider);
    Vue.use(Select);
    Vue.use(Button);
    export default Vue.extend({
        name: "Tenant",
        components: {
          TenantShowComponent
        },
        data() {
            return {
                showPage: true,
                current: ['tenant'],
                platformInfo: [
                    {value: 5, name: '营销管理平台'},
                    {value: 9, name: '财务管理平台'},
                    {value: 16, name: '投后管理平台'},
                    {value: 22, name: '估值平台'},
                    {value: 3, name: '项目管理中心'},
                    {value: 10, name: '风控平台'}
                ],
                productInfo: [
                    {value: 5, name: '银行产品'},
                    {value: 9, name: '信托产品'},
                    {value: 16, name: '租赁产品'},
                    {value: 22, name: '其他产品'}
                ],
                userTimeInfo: [
                    {value: 5, name: '营销管理平台'},
                    {value: 9, name: '财务管理平台'},
                    {value: 16, name: '投后管理平台'},
                    {value: 22, name: '估值平台'},
                    {value: 3, name: '项目管理中心'},
                    {value: 10, name: '风控平台'}
                ],
                echartData: [
                    {
                        "appBusiType": "贷款产品",
                        "tenantCount": 16,
                        "appList": [
                            {
                                "appName": "平台1",
                                "appCount": 100,
                                "appUseTime": 1000,
                                "tenantList": [
                                    {
                                        "tenName": "张三",
                                        "tenUseTime": 1000,
                                        "userCount": 100
                                    }
                                ]
                            },
                            {
                                "appName": "平台2",
                                "appCount": 100,
                                "appUseTime": 1000,
                                "tenantList": [
                                    {
                                        "tenName": "张三",
                                        "tenUseTime": 1000,
                                        "userCount": 100
                                    }
                                ]
                            },
                            {
                                "appName": "平台3",
                                "appCount": 100,
                                "appUseTime": 1000,
                                "tenantList": [
                                    {
                                        "tenName": "张三",
                                        "tenUseTime": 1000,
                                        "userCount": 100
                                    }
                                ]
                            },
                            {
                                "appName": "平台4",
                                "appCount": 100,
                                "appUseTime": 1000,
                                "tenantList": [
                                    {
                                        "tenName": "张三",
                                        "tenUseTime": 1000,
                                        "userCount": 100
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "appBusiType": "银行产品",
                        "tenantCount": 17,
                        "appList": [
                            {
                                "appName": "平台1",
                                "appCount": 100,
                                "appUseTime": 1000,
                                "tenantList": [
                                    {
                                        "tenName": "张三",
                                        "tenUseTime": 1000,
                                        "userCount": 100
                                    }
                                ]
                            },
                            {
                                "appName": "平台2",
                                "appCount": 100,
                                "appUseTime": 1000,
                                "tenantList": [
                                    {
                                        "tenName": "张三",
                                        "tenUseTime": 1000,
                                        "userCount": 100
                                    }
                                ]
                            },
                            {
                                "appName": "平台3",
                                "appCount": 100,
                                "appUseTime": 1000,
                                "tenantList": [
                                    {
                                        "tenName": "张三",
                                        "tenUseTime": 1000,
                                        "userCount": 100
                                    }
                                ]
                            },
                            {
                                "appName": "平台4",
                                "appCount": 100,
                                "appUseTime": 1000,
                                "tenantList": [
                                    {
                                        "tenName": "张三",
                                        "tenUseTime": 1000,
                                        "userCount": 100
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "appBusiType": "信托产品",
                        "tenantCount": 10,
                        "appList": [
                            {
                                "appName": "平台1",
                                "appCount": 100,
                                "appUseTime": 1000,
                                "tenantList": [
                                    {
                                        "tenName": "张三",
                                        "tenUseTime": 1000,
                                        "userCount": 100
                                    }
                                ]
                            },
                            {
                                "appName": "平台2",
                                "appCount": 100,
                                "appUseTime": 1000,
                                "tenantList": [
                                    {
                                        "tenName": "张三",
                                        "tenUseTime": 1000,
                                        "userCount": 100
                                    }
                                ]
                            },
                            {
                                "appName": "平台3",
                                "appCount": 100,
                                "appUseTime": 1000,
                                "tenantList": [
                                    {
                                        "tenName": "张三",
                                        "tenUseTime": 1000,
                                        "userCount": 100
                                    }
                                ]
                            },
                            {
                                "appName": "平台4",
                                "appCount": 100,
                                "appUseTime": 1000,
                                "tenantList": [
                                    {
                                        "tenName": "张三",
                                        "tenUseTime": 1000,
                                        "userCount": 100
                                    }
                                ]
                            }
                        ]
                    }
                ],
                columns: [
                    {
                        title: 'name',
                        dataIndex: 'name',
                        align: 'center'
                    },
                    {
                        title: 'time',
                        dataIndex: 'time',
                        align: 'center'
                    },
                    {
                        title: 'people',
                        dataIndex: 'people',
                        align: 'center'
                    }
                ],
                data: [
                    {name:'张三', time: '24', people: '26'},
                    {name:'赵四', time: '36', people: '26'},
                    {name:'王五', time: '128', people: '26'},
                ]
            }
        },
        methods: {
            handleClick(e: any) {
                console.log(e.key);
                if(e.key === 'overriew') {
                    this.showPage = false;
                    console.log(this.showPage)
                }
                if(e.key === 'tenant' || e.key === '') {
                    this.showPage = true;
                    console.log(this.showPage)
                }
            },
        },
        mounted() {
            drawEchart(this.productInfo, 'ec1');
            drawEchart(this.platformInfo, 'ec2');
            drawLineChart(this.userTimeInfo, 'ec3');
            // drawEcharts(this.productInfo, 'ec1', 'ec2', 'ec3');
            // drawEcharts(this.echartData, 'ec1', 'ec2', 'ec3');
        },

    })
</script>

<style scoped>
    .tenant-header-menu{
        font-size: 16px;
    }

    .tenant-header {
        width: 100%;
        height: auto;
    }

    .tenant-herder-lump {
        width: 5px;
        height: 16px;
        background-color: #1972FF;
        display: inline-flex;
        align-items: center;
    }

    .tenant-herder-font {
        font-size: 16px;
        align-items: center;
        display: inline-flex;
        position: relative;
        margin-left: 20px;
        margin-top: 10px;
    }
    .tenant-foot-font {
        font-size: 16px;
        align-items: center;
        display: inline-flex;
        position: relative;
        margin-left: 20px;
        margin-top: 10px;
    }
    .echart-left{
        height: 500px;
        width: 50%;
        padding: 15px;
        display: flex;
        margin-top: -50px;
        left: -200px;
    }
    .echart-right{
        height: 500px;
        width: 50%;
        padding: 15px;
        margin-top: -50px;
        display: flex;
    }
</style>
