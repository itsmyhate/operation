<template>
    <div class="d-flex flex-column">
        <div class="header-df d-flex flex-column justify-content-start">
            <h5 class="m-2">营销管理平台</h5>
            <a-divider class="m-0"/>
        </div>
        <div class="d-flex flex-column tenant-header">
            <div class="d-flex flex-row tenant-herder-font">
                <div class="tenant-herder-lump"></div>
                <span class="ml-2">管理员信息</span>
            </div>
            <div class="tenant-herder-imput">
                <!--style="margin-left: 12px"-->
                <a-form-model ref="ruleForm" :model="searchForm" :layout="'inline'" :label-col="{ span: 60 }">
                    <a-form-model-item ref="dictNo" label="管理员姓名" prop="dictNo" class="d-flex flex-row">
                        <a-input v-model="searchForm.dictNo" :wrapper-col="{ span: 6 }" style="width: 30rem" placeholder="请输入"></a-input>
                    </a-form-model-item>
                    <a-form-model-item ref="dictName" label="身份证号码" prop="dictName">
                        <a-input v-model="searchForm.dictName" :wrapper-col="{ span: 6 }" style="width: 30rem" placeholder="请输入"></a-input>
                    </a-form-model-item>
                    <br>
                </a-form-model>
            </div>
        </div>

    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Form, Divider, FormModel } from "ant-design-vue";

    Vue.use(Form).use(Divider).use(FormModel);


    export default {
        data() {
            return {
                searchForm: {

                }
            };
        },
    };
</script>

<style lang="scss" scoped>

    .tenant-header {
        width: 100%;
        height: auto;
    }
    .tenant-herder-imput {
        flex-grow: 1;
        display: flex;
        align-items: center;
        margin-left: 6rem;
        width: 100%;
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

    .echart-left {
        height: 500px;
        width: 50%;
        padding: 15px;
        display: flex;
        margin-top: -50px;
        left: -200px;
    }

    .echart-right {
        height: 500px;
        width: 50%;
        padding: 15px;
        margin-top: -50px;
        display: flex;
    }
</style>
