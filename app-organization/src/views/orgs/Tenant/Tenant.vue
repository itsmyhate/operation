<template>
    <div class="d-flex flex-column">
        <div class="header-df d-flex flex-column justify-content-start">
            <a-menu v-model="current" mode="horizontal" class="org-tenant-header-menu" :default-selected-keys="['tenant']" @click="handleClick">
                <a-menu-item key="tenant" >租用情况统计</a-menu-item>
                <a-menu-item key="overriew" >租户概览</a-menu-item>
            </a-menu>
            <a-divider class="m-0"/>
        </div>
        <!--租用情况统计-->
        <div v-show="showPage === true || showPage === '' || showPage === undefined || showPage === null ">
            <!--title-->
            <div class="d-flex flex-column org-tenant-header">
                <div class="d-flex flex-row org-tenant-herder-font">
                    <span class="ml-2 org-blue-icon">产品使用占比</span>
                </div>
            </div>
            <!--chart-->
            <div class="d-flex flex-column">
                <div class="d-flex flex-row">
                    <div id="ec1" class="ec1 org-echart-left justify-content-between"></div>
                    <div id="ec2" class="ec2 org-echart-right justify-content-between"></div>
                </div>
            </div>
            <div class="d-flex w-100" style="">
                <div class="d-flex flex-column root-flex-1 justify-content-start m-3">
                    <span class="org-blue-icon">信托产品使用时长</span>
                    <div class="d-flex flex-row">
                        <div id="ec3" class="w-100 ec3" style="height:300px;"></div>
                    </div>
                </div>
                <div class="d-flex flex-column root-flex-1 justify-content-start m-3">
                    <span class="org-blue-icon">投后管理平台</span>
                    <a-table class="w-100 ml-2" :columns="columns" :data-source="data" :showHeader="false" :row-key="record => record.time" :pagination="false">
                    </a-table>
                </div>
            </div>
        </div>
        <!--租户概览-->
        <div class="d-flex flex-column" v-if="showPage === false">
            <!--title-->
            <div class="d-flex flex-column org-tenant-header">
                <div class="d-flex flex-row org-tenant-herder-font">
                    <span class="ml-2 org-blue-icon">使用中租户</span>
                    <a-button class="d-flex justify-content-end h-100 mr-2" style="margin-left: auto">+新增租户</a-button>
                </div>
            </div>
            <tenant-show-component></tenant-show-component>
            <div class="d-flex flex-column org-tenant-header">
                <div class="d-flex flex-row org-tenant-herder-font">
                    <span class="ml-2 org-blue-icon">停用租户</span>
                </div>
            </div>

        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Menu, Table, Divider, Select, Button} from "ant-design-vue";
    import TenantShowComponent from "@/components/Tenant/TenantShowComponent.vue";
    import TenantDisabledComponent from "@/components/Tenant/TenantDisabledComponent.vue";
    import {drawEcharts, ceshi, renderTab} from "@/constants/component/Tenant/tenant-echarts";
    import ClientService from "@/services/restful-api/api.service";
    import tenantsApi from "@/constants/api/tenants.api";
    import AuthService from "@/services/auth.service";
    import {RestfulResponse} from "@/entity/model/RestfulResponse";


    Vue.use(Menu);
    Vue.use(Table);
    Vue.use(Divider);
    Vue.use(Select);
    Vue.use(Button);
    export default Vue.extend({
        name: "Tenant",
        components: {
            TenantShowComponent,
            TenantDisabledComponent
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
                        appBusiType: "贷款产品",
                        tenantCount: 16,
                        appList: [
                            {
                                appName: "平台1",
                                appCount: 10,
                                appUseTime: 196,
                                tenantList: [
                                    {
                                        tenName: "张三",
                                        tenUseTime: 1000,
                                        userCount: 36
                                    },
                                    {
                                        tenName: "李四",
                                        tenUseTime: 1000,
                                        userCount: 10
                                    },
                                    {
                                        tenName: "王五",
                                        tenUseTime: 1000,
                                        userCount: 55
                                    },
                                ]
                            },
                            {
                                appName: "平台2",
                                appCount: 36,
                                appUseTime: 271,
                                tenantList: [
                                    {
                                        tenName: "张三",
                                        tenUseTime: 1000,
                                        userCount: 100
                                    }
                                ]
                            },
                            {
                                appName: "平台3",
                                appCount: 27,
                                appUseTime: 77,
                                tenantList: [
                                    {
                                        tenName: "张三",
                                        tenUseTime: 1000,
                                        userCount: 100
                                    }
                                ]
                            },
                            {
                                appName: "平台4",
                                appCount: 60,
                                appUseTime: 1000,
                                tenantList: [
                                    {
                                        tenName: "张三",
                                        tenUseTime: 1000,
                                        userCount: 100
                                    }
                                ]
                            },
                        ]
                    },
                    {
                        appBusiType: "银行产品",
                        tenantCount: 36,
                        appList: [
                            {
                                appName: "平台1",
                                appCount: 47,
                                appUseTime: 96,
                                tenantList: [
                                    {
                                        tenName: "张三",
                                        tenUseTime: 1000,
                                        userCount: 100
                                    }
                                ]
                            },
                            {
                                appName: "平台2",
                                appCount: 28,
                                appUseTime: 335,
                                tenantList: [
                                    {
                                        tenName: "张三",
                                        tenUseTime: 1000,
                                        userCount: 100
                                    }
                                ]
                            },
                            {
                                appName: "平台3",
                                appCount: 55,
                                appUseTime: 471,
                                tenantList: [
                                    {
                                        tenName: "张三",
                                        tenUseTime: 1000,
                                        userCount: 100
                                    }
                                ]
                            },
                            {
                                appName: "平台4",
                                appCount: 71,
                                appUseTime: 150,
                                tenantList: [
                                    {
                                        tenName: "张三",
                                        tenUseTime: 1000,
                                        userCount: 100
                                    }
                                ]
                            },
                        ]
                    },
                    {
                        appBusiType: "信托产品",
                        tenantCount: 22,
                        appList: [
                            {
                                appName: "平台1",
                                appCount: 100,
                                appUseTime: 1000,
                                tenantList: [
                                    {
                                        tenName: "张三",
                                        tenUseTime: 1000,
                                        userCount: 100
                                    }
                                ]
                            },
                            {
                                appName: "平台2",
                                appCount: 100,
                                appUseTime: 1000,
                                tenantList: [
                                    {
                                        tenName: "张三",
                                        tenUseTime: 1000,
                                        userCount: 100
                                    }
                                ]
                            },
                            {
                                appName: "平台3",
                                appCount: 100,
                                appUseTime: 1000,
                                tenantList: [
                                    {
                                        tenName: "张三",
                                        tenUseTime: 1000,
                                        userCount: 100
                                    }
                                ]
                            },
                            {
                                appName: "平台4",
                                appCount: 100,
                                appUseTime: 1000,
                                tenantList: [
                                    {
                                        tenName: "张三",
                                        tenUseTime: 1000,
                                        userCount: 100
                                    }
                                ]
                            },
                        ]
                    },
                ],
                columns: [
                    {
                        title: '祖永明',
                        dataIndex: 'tenName',
                        align: 'center'
                    },
                    {
                        title: '租用时间',
                        dataIndex: 'tenUseTime',
                        align: 'center'
                    },
                    {
                        title: '次数',
                        dataIndex: 'userCount',
                        align: 'center'
                    }
                ],
                data: []
            }
        },
        methods: {
            handleClick(e: any) {
                console.log(e.key);
                if (e.key === 'overriew') {
                    this.showPage = false;
                    console.log(this.showPage)
                }
                if (e.key === 'tenant' || e.key === '') {
                    this.showPage = true;
                    console.log(this.showPage)
                }
            },
            fetch() {
                ApiService.get(tenantsApi.initChart.url, {}, AuthService.createAuthHeaders()).then((response: RestfulResponse) => {
                    this.echartData = response.data;
                    console.log(response);
                });
            },

    },
        mounted() {
            drawEcharts(this.echartData, 'ec1', 'ec2', 'ec3');
        }
    })
</script>

<style scoped lang="scss">
    .#{$prefix} {
        &tenant-header-menu{
            font-size: 16px;
        }

        &tenant-header {
            width: 100%;
            height: auto;
        }

        &tenant-herder-font {
            font-size: 16px;
            align-items: center;
            display: inline-flex;
            position: relative;
            margin-left: 20px;
            margin-top: 10px;
        }
        &tenant-foot-font {
            font-size: 16px;
            align-items: center;
            display: inline-flex;
            position: relative;
            margin-left: 20px;
            margin-top: 10px;
        }
        &echart-left{
            height: 500px;
            width: 50%;
            padding: 15px;
            display: flex;
            margin-top: -50px;
            left: -200px;
        }
        &echart-right{
            height: 500px;
            width: 50%;
            padding: 15px;
            margin-top: -50px;
            display: flex;
        }
    }
</style>
