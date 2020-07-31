<template>
    <div class="d-flex flex-column">
        <div class="org-header-df d-flex flex-column justify-content-start">
            <h5 class="font-weight-bold m-2">产品修改</h5>
            <a-divider class="m-0"/>
        </div>
        <div class="org-body-df d-flex p-3 flex-column">
            <div class="d-flex flex-column justify-content-start">
                <span class="org-blue-icon">基本信息</span>
                <a-form-model ref="appForm" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
                    <a-form-model-item label="产品名称"  prop="appName">
                        <a-input v-model="form.appName"/>
                    </a-form-model-item><a-form-model-item label="产品业务属性"  prop="appBusiType">
                        <a-radio-group  v-model="form.appBusiType">
                            <a-radio v-for="bt in busiTypes" :value="bt.code">
                                {{bt.name}}
                            </a-radio>
                        </a-radio-group>
                    </a-form-model-item><a-form-model-item label="产品类型"  prop="appType">
                        <a-radio-group  v-model="form.appType">
                            <a-radio v-for="bt in appTypes" :value="bt.code">
                                {{bt.name}}
                            </a-radio>
                        </a-radio-group>
                    </a-form-model-item><a-form-model-item label="产品描述"  prop="appDesc">
                        <a-input v-model="form.appDesc" type="textarea" />
                    </a-form-model-item>
                </a-form-model>
            </div>
            <div class="d-flex flex-column justify-content-start mt-3">
                <span class="org-blue-icon">产品功能简介</span>
                <div style="min-height: 300px"></div>
            </div>
            <div class="mt-2 d-flex justify-content-end org-foot-df">
                <a-button class=" mr-2" type="primary" @click="createApp">确认创建</a-button>
                <a-button class="mr-2" @click="cancle">取消</a-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {AppBusiTypeEnum} from '@/constants/enums/app-busi-type.enum'
    import {Divider, Input, Radio, FormModel} from "ant-design-vue";
    import {AppTypeEnum} from "@/constants/enums/app-type.enum";
    Vue.use(Divider).use(Input).use(Radio).use(FormModel)

    export default Vue.extend({
        name: "UpdApps",
        data() {
            return {
                form: {
                    appName: '',
                    appBusiType: '',
                    appType: '',
                    appDesc: '',
                },
                rules: {
                    appName: [
                        { required: true, message: '请输入产品名称', trigger: 'blur' },
                        // { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
                    ],
                    appBusiType: [{ required: true, message: '请输入业务类型', trigger: 'change' }],
                    appType: [{ required: true, message: '请输入产品类型', trigger: 'change' }],
                },
                labelCol: { span: 4 },
                wrapperCol: { span: 14 },
            };
        },
        computed: {
            busiTypes() {
                return Object.keys(AppBusiTypeEnum).map((val) => {
                    return AppBusiTypeEnum[val];
                })
            },
            appTypes() {
                return Object.keys(AppTypeEnum).map(val => {
                    return AppTypeEnum[val];
                })
            }
        },
        created() {
            this.selectAppInfo();
        },
        methods: {
            createApp() {
                this.$refs.appForm.validate((valid: boolean) => {
                    if(valid) {
                        this.$router.push({path: '/main/app'});
                    } else {
                        this.$message.error('请完善信息后提交');
                    }
                })
            },
            cancle( ) {
                this.$router.push({path: '/main/app'});
            },
            selectAppInfo() {
                this.$message.info('查询产品信息。。。。。。。。。。。')
            }
        }
    })
</script>

<style scoped>
    .org-body-df{

    }
    .org-header-df{
    }
    /*.org-base-info-df{
        background: #fafafa;
        border: 1px solid #e8e8e8;
    }*/
    /*.org-foot-df{
        max-height: 30px;
    }*/
</style>
