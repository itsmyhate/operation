<template>
    <div class="d-flex justify-content-center text-center">
        <a-form :form="loginForm" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
            <a-form-item label="用户名">
                <a-input v-decorator="form.username" placeholder="用户名/手机号"/>
            </a-form-item>
            <a-form-item label="密码">
                <a-input v-decorator="form.password" placeholder="请输入密码"/>
            </a-form-item>
            <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
                <a-button type="primary" html-type="submit">登录</a-button>
            </a-form-item>
        </a-form>
    </div>
</template>

<script lang="ts">
import {EnableTypeEnum} from '@/constants/enums/enable-type.enum';
import {SysMenuInfo} from '@/entity/domain/SysMenuInfo';
import { RestfulResponse } from '@/entity/model/RestfulResponse';
import {startQiankun} from '@/qiankun.start';
import {  setMenusInfo } from '@/services/menus.service';
import {IsLoginService} from '@/services/notice/is-login.service';
import ClientService from '@/services/restful-client/client.service';
import Vue from 'vue';
import {serviceApi} from "@/constants/api/service.api";
import {ResponseCodeEnum} from "@/constants/enums/response-code.enum";
import {LoginTypeEnum} from "@/constants/enums/login-type.enum";
import {Md5} from "ts-md5";

export default Vue.extend({
    name: 'Login',
    data(): any {
        return {
            loginForm: this.$form.createForm(this, {name: 'loginForm'}),
            form: {
                username: ['username', { rules: [{ required: true, message: 'Please input your username!' }] }],
                password: ['password', { rules: [{ required: true, message: 'Please input your password!' }] }]
            }
        };
    },
    created() {
    },
    methods: {
        handleSubmit(e: any) {
            e.preventDefault();
            this.loginForm.validateFields((err: any, values: any) => {
                if (err) {
                    console.log('valid faile:', values);
                } else {
                    this.login(values);
                }
            });
        },
        login(values: any) {
            values.password = Md5.hashStr(values.password);
            ClientService.general(serviceApi.systemApi.sysUserInfo.login ,{}, {
                code: values.username,
                pwd: values.password,
                type: LoginTypeEnum.account_code.code
            }).then((response: RestfulResponse) => {
                if(response.code === ResponseCodeEnum.SUCCESS.code) {
                    this.$COMMON.AuthService.login(response.data.sysUserInfo, response.data);
                    setMenusInfo([], response.data.rootMenus);
                    IsLoginService.update(true);
                    this.$router.push({path: '/root/app-collect'});
                } else {
                    this.$message.error(response.message);
                }
            });
        }
    },
});
</script>

<style scoped>
</style>
