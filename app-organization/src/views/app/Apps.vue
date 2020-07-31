<template>
    <div  class="d-flex flex-column">
        <div class="org-header-df d-flex flex-column justify-content-start">
            <h5 class="font-weight-bold m-2">产品管理</h5>
            <a-divider class="m-0"/>
        </div>
        <div class="org-body-df d-flex p-3 flex-column">
            <div class="d-flex org-select-df justify-content-around">
                <div class="d-flex root-flex-1">
                    <div class="d-flex align-items-center m-2 root-flex-1">
                        <span>产品业务属性：</span>
                        <a-select class="root-flex-1">
                            <a-select-option value="jack">
                                Jack
                            </a-select-option>
                            <a-select-option value="lucy">
                                Lucy
                            </a-select-option>
                            <a-select-option value="disabled" disabled>
                                Disabled
                            </a-select-option>
                        </a-select>
                    </div>
                    <div class="d-flex align-items-center m-2 root-flex-1">
                        <span>创建时间：</span>
                        <a-select class="root-flex-1">
                            <a-select-option value="jack">
                                Jack
                            </a-select-option>
                            <a-select-option value="lucy">
                                Lucy
                            </a-select-option>
                            <a-select-option value="disabled" disabled>
                                Disabled
                            </a-select-option>
                        </a-select>
                    </div>
                    <div class="d-flex align-items-center m-2 root-flex-1">
                        <span>包含功能：</span>
                        <a-select class="root-flex-1">
                            <a-select-option value="jack">
                                Jack
                            </a-select-option>
                            <a-select-option value="lucy">
                                Lucy
                            </a-select-option>
                            <a-select-option value="disabled" disabled>
                                Disabled
                            </a-select-option>
                        </a-select>
                    </div>
                </div>
                <div class="d-flex align-items-center justify-content-end m-2">
                    <a-button type="primary" shape="round">查询</a-button>
                </div>
            </div>
            <div class="d-flex org-app-button-df justify-content-end mt-3">
                <a-button class=" h-100 mr-2">产品上架</a-button>
                <a-button class="h-100 mr-2">产品下架</a-button>
                <a-button class="h-100 mr-2" @click="createApp">创建产品</a-button>
            </div>
            <div class="mt-2">
                <a-table
                        :row-selection="{ selectedRowKeys: selectedRowKeys,
                        onChange: onSelectChange,
                         onSelectAll: onSelectAll}"
                        :pagination="false"
                        :columns="columns" :data-source="data">
                    <div slot="action" slot-scope="text, record">
                        <a-button type="link" :size="'small'" @click="updAppInfo">修改</a-button>
                        <a-button type="link" :size="'small'">详情</a-button>
                    </div>
                </a-table>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {EnableTypeEnum} from '@/constants/enums/enable-type.enum';
    import Vue from 'vue';
    import {Divider, Table, Button, Select} from "ant-design-vue";
    import ApiService from "@/services/restful-api/api.service";
    import appsApi from "@/constants/api/apps.api";
    import AuthService from "@/services/auth.service";
    import {RestfulResponse} from "@/entity/model/RestfulResponse";
    Vue.use(Divider).use(Table).use(Button).use(Select);

    export default Vue.extend({
        name: "Apps",
        data() {
            const data = {
                columns: [],
                data: [],
                selectedRowKeys: [],
            }
            return data;
        },
        created() {
            this.initCol();
            this.initAppList();
        },
        methods: {
            initAppList(){
                ApiService.general(appsApi.selectAppList, {}, null).then((res: RestfulResponse) => {
                    if(res.code === EnableTypeEnum.YES.code) {
                        this.data = res.data;
                    } else {
                        this.$message.error(res.msg);
                    }
                })
            },
            onSelectChange(record: any, selected: any, selectedRows: any, nativeEvent: any) {},
            onSelectAll(selected: any, selectedRows: any, changeRows: any) {},
            initCol() {
                this.columns = [
                    {
                        title: '应用名称',
                        dataIndex: 'appName',
                        key: 'appName',
                        // scopedSlots: { customRender: 'name' },
                        // width: 80,
                        // ellipsis: true,
                    }, {
                        title: '应用类型',
                        dataIndex: 'appType',
                        key: 'appType',
                    }, {
                        title: '应用地址',
                        dataIndex: 'appUrl',
                        key: 'appUrl',
                    },{
                        title: '创建人',
                        dataIndex: 'intUser',
                        key: 'intUser',
                    }, {
                        title: '创建时间',
                        dataIndex: 'intDate',
                        key: 'intDate',
                    }, {
                        title: '操作',
                        dataIndex: 'action',
                        key: 'action',
                        scopedSlots: { customRender: 'action' },
                    },
                ];
            },
            createApp() {
                this.$router.push({path: '/main/add-app'});
            },
            updAppInfo() {
                this.$router.push({path: '/main/upd-app'});
            }
        }
    })
</script>

<style lang="scss" scoped>
    .#{$prefix} {
        &body-df{
        }
        &header-df{
        }
        &select-df{
            background: #fafafa;
            border: 1px solid #e8e8e8;
        }
        &app-button-df{
            max-height: 20px;
        }
    }
</style>
