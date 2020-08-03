<template>
    <div class="d-flex flex-column">
        <div class="org-header-df d-flex flex-column justify-content-start">
            <h5 class="font-weight-bold m-2">营销管理平台</h5>
            <a-divider class="m-0"/>
        </div>
        <div class="org-body-df d-flex p-3 flex-column">
            <div class="d-flex flex-column justify-content-start">
                <span class="org-blue-icon">管理员信息</span>
                <a-form-model ref="appForm" :model="form" :rules="rules" :label-col="labelCol"
                              :wrapper-col="wrapperCol">
                    <a-form-model-item label="管理员姓名" prop="adminName">
                        <a-input v-model="form.adminName" placeholder="请输入"/>
                    </a-form-model-item>
                    <a-form-model-item label="身份证号码" prop="idNo">
                        <a-input v-model="form.idNo" placeholder="请输入"/>
                    </a-form-model-item>
                    <a-form-model-item label="备注" prop="adminDesc">
                        <a-input v-model="form.adminDesc" type="textarea"/>
                    </a-form-model-item>
                </a-form-model>
            </div>
            <div class="d-flex flex-column justify-content-start mt-3">
                <span class="org-blue-icon">服务授权</span>
                <div class="d-flex org-app-button-df justify-content-end mt-3">
                    <a-button class=" h-100 mr-4">+添加服务</a-button>
                </div>
                <div class="ml-4 mr-4 mt-2" style="min-height: 300px">
                    <a-table :columns="columns" :row-key="record => record.serviceName" :data-source="serviceData"
                             size="middle" :pagination="false"
                             :row-selection="{ selections: true,  }">
                        <template slot="serviceType" slot-scope="serviceType"> {{ serviceType}}</template>
                        <div slot="action" slot-scope="text, record">
                            <a-button type="link" :size="'small'" @click="">{{record.serviceType === 1? "停用":"启用"}}
                            </a-button>
                        </div>
                    </a-table>
                </div>
            </div>
            <div class="d-flex flex-column justify-content-start mt-3">
                <span class="org-blue-icon">产品功能授权</span>
                <div class="ml-4 mr-4 mt-3 org-efp-context" style="min-height: 300px">
                    <a-tree v-model="checkedKeys" checkable :replace-fields="replaceFields" :default-expand-all="true"
                            :auto-expand-parent="true" :selected-keys="selectedKeys" :tree-data="treeData"
                            @select="onSelect"/>
                </div>
            </div>
            <div class="d-flex flex-column justify-content-start mt-3">
                <span class="org-blue-icon">个性化定制功能</span>
                <a-button type="dashed" style="width: 6rem" @click="addDomain">
                    +新增一行
                </a-button>
                <div class="ml-4 mr-4 mt-3 org-efp-context" style="min-height: 300px">
                    <a-form-model ref="dynamicValidateForm" :model="dynamicValidateForm" v-bind="formItemLayoutWithOutLabel" >
                        <a-form-model-item
                                v-for="(domain, index) in dynamicValidateForm.domains"
                                :key="domain.key"
                                v-bind="index === 0 ? formItemLayout : {}"
                                :label="index === 0 ? 'Domains' : ''"
                                :prop="'domains.' + index + '.value'"
                                :rules="{required: true,message: 'domain can not be null',trigger: 'blur',}"
                        >
                            <a-input v-model="domain.value" placeholder="请输入" style="width: 60%; margin-right: 8px" />
                            <a-icon v-if="dynamicValidateForm.domains.length >= 1" class="dynamic-delete-button" type="minus-circle-o"
                                    :disabled="dynamicValidateForm.domains.length === 1" @click="removeDomain(domain)" />
                        </a-form-model-item>
                    </a-form-model>
                </div>
            </div>
            <div class="mt-2 d-flex justify-content-end org-foot-df">
                <a-button class=" mr-2" type="primary" @click="createApp">保存</a-button>
                <a-button class="mr-2" @click="cancle">取消</a-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Form, Divider, FormModel, Tree, TreeSelect} from "ant-design-vue";
    import {SERVICECOLUMN} from "@/constants/component/Tenant/tenant-authorization.config";

    Vue.use(Form).use(Divider).use(FormModel).use(TreeSelect).use(Tree);

    export default {
        data() {
            return {
                replaceFields: {
                    key: "id",
                    title: "name"
                },
                selectedKeys: [],
                form: {
                    adminName: '',
                    idNo: '',
                    adminDesc: '',
                },
                rules: {
                    adminName: [
                        {required: true, message: '请输入管理员姓名', trigger: 'blur'},
                    ],
                    idNo: [
                        {required: true, message: '请输入身份证号码', trigger: 'blur'},
                    ],
                },
                labelCol: {span: 4},
                wrapperCol: {span: 14},
                serviceData: [
                    {
                        serviceName: '测试服务1',
                        serviceType: 1,
                        activeTime: '1998',
                        accessName: '你看看',
                    },
                    {
                        serviceName: '测试服务2',
                        serviceType: 0,
                        activeTime: '2020',
                        accessName: '你看看',
                    }
                ],
                columns: SERVICECOLUMN,
                treeData: [
                    {
                        "id": 110000,
                        "name": "北京市",
                        "children": [
                            {
                                "id": 110100,
                                "name": "北京市"
                            }
                        ]
                    },
                    {
                        "id": 120000,
                        "name": "天津市",
                        "children": [
                            {
                                "id": 120100,
                                "name": "天津市"
                            }
                        ]
                    },
                    {
                        "id": 130000,
                        "name": "河北省",
                        "children": [
                            {
                                "id": 130100,
                                "name": "石家庄市"
                            },
                            {
                                "id": 130200,
                                "name": "唐山市"
                            },
                            {
                                "id": 130300,
                                "name": "秦皇岛市"
                            },
                            {
                                "id": 130400,
                                "name": "邯郸市"
                            },
                            {
                                "id": 130500,
                                "name": "邢台市"
                            },
                            {
                                "id": 130600,
                                "name": "保定市"
                            },
                            {
                                "id": 130700,
                                "name": "张家口市"
                            },
                            {
                                "id": 130800,
                                "name": "承德市"
                            },
                            {
                                "id": 130900,
                                "name": "沧州市"
                            },
                            {
                                "id": 131000,
                                "name": "廊坊市"
                            },
                            {
                                "id": 131100,
                                "name": "衡水市"
                            }
                        ]
                    },
                    {
                        "id": 820000,
                        "name": "澳门特别行政区",
                        "children": [
                            {
                                "id": 820100,
                                "name": "澳门特别行政区"
                            }
                        ]
                    }
                ],
                formItemLayout: {
                    labelCol: {
                        xs: { span: 24 },
                        sm: { span: 4 },
                    },
                    wrapperCol: {
                        xs: { span: 24 },
                        sm: { span: 20 },
                    },
                },
                formItemLayoutWithOutLabel: {
                    wrapperCol: {
                        xs: { span: 24, offset: 0 },
                        sm: { span: 20, offset: 4 },
                    },
                },
                dynamicValidateForm: {
                    domains: [],
                },

            };
        },
        methods: {
            onSelectChange(record: any, selected: any, selectedRows: any, nativeEvent: any) {
            },
            onSelectAll(selected: any, selectedRows: any, changeRows: any) {
            },
            onSelect(selectedKeys: any, info: any) {
                console.log("onSelect", info);
            },
            resetForm(formName: string | number) {
                this.$refs[formName].resetFields();
            },
            removeDomain(item: any) {
                let index = this.dynamicValidateForm.domains.indexOf(item);
                if (index !== -1) {
                    this.dynamicValidateForm.domains.splice(index, 1);
                }
            },
            addDomain() {
                this.dynamicValidateForm.domains.push({
                    value: '',
                    key: Date.now(),
                });
            },
        },
        computed: {
            checkedKeys() {

            }
        }
    };
</script>

<style lang="scss" scoped>
    .#{$prefix} {
        &body-df {
        }

        &header-df {
        }

        &efp-context {
            ::v-deep .ant-tree {
                display: flex;
                flex-direction: column;

                > li {
                    &:first-child {
                        border: 1px solid #f2f2f2;
                    }

                    &:not(:first-child) {
                        border-left: 1px solid #f2f2f2;
                        border-bottom: 1px solid #f2f2f2;
                        border-right: 1px solid #f2f2f2;
                    }

                    padding-bottom: 7px;
                    display: flex;
                    flex-direction: row;

                    > span {
                        margin-top: 5px;
                        display: block;

                        &.ant-tree-node-content-wrapper {
                            width: 120px;
                            min-width: 120px;
                        }
                    }

                    > .ant-tree-switcher {
                        visibility: hidden;
                    }

                    > ul {
                        position: relative;
                        display: flex;
                        flex-wrap: wrap;
                        width: 100%;
                        padding-left: 0 !important;
                        max-width: calc(100% - 250px);

                        > li {
                            &:first-child {
                                padding-top: 4px !important;
                            }

                            display: block;
                        }

                        &:after {
                            content: "";
                            position: absolute;
                            left: 0;
                            top: -5px;
                            bottom: 0;
                            right: auto;
                            height: calc(100% + 12px);
                            width: 1px;
                            background-color: #f2f2f2;
                        }
                    }
                }
            }
        }
    }
</style>
