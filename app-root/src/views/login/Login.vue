<template>
    <div class="d-flex justify-content-center text-center">
        <div class="w-25">
            <iInput class="m-3" type="text" placeholder="请输入用户名">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
            </iInput>
            <iInput class="m-3" type="password" placeholder="请输入密码">
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </iInput>
            <iButton class="m-3" type="primary" @click="login">登录</iButton>
        </div>
    </div>
</template>

<script lang="ts">
import authorizationApi from '@/constants/api/core/authorization.api';
import {EnableTypeEnum} from '@/constants/enums/enable-type.enum';
import {SysMenuInfo} from '@/entity/domain/SysMenuInfo';
import { RestfulResponse } from '@/entity/model/RestfulResponse';
import {startQiankun} from '@/qiankun.start';
import {  setMenusInfo } from '@/services/menus.service';
import {IsLoginService} from '@/services/notice/is-login.service';
import ApiService from '@/services/restful-api/api.service';
import AuthService from '@/services/restful-api/auth.service';
import Vue from 'vue';

export default Vue.extend({
    name: 'Login',
    data(): any {
        return {
            form: {},
        };
    },
    created() {
    },
    methods: {
        handleSubmit(e: any) {
            e.preventDefault();
            this.form.validateFields((err: any, values: any) => {
                if (err) {
                    console.log('valid faile:', values);
                } else {
                    this.login();
                }
            });

        },
        login() {
            const data = {
                user: {
                    username: 'username',
                    deptId: 'XXX部门',
                },
                token: {
                    refreshToken: 'refreshToken',
                    accessToken: 'token',
                    expiresIn: 100000,
                    time: new Date().getTime(),
                },
                rootMenus: [
                    new SysMenuInfo({menuId: 'workbench', menuName: '工作台', menuIcon: '', menuUrl: '/root/workbench'}),
                    new SysMenuInfo({menuId: 'app-collect', menuName: '应用管理', menuIcon: '', menuUrl: '/root/app-collect', }),
                ],
            };
            this.$COMMON.AuthService.login(data.user, data.token);
            setMenusInfo([], data.rootMenus);
            IsLoginService.update(true);
            this.$router.push({path: '/root/app-collect'});
            /*ApiService.post(authorizationApi.login.url ,{
                username: 'username',
                password: 'password'
            }, {}, AuthService.createBasicHeaders()).then((response: RestfulResponse) => {
                if(response.code === EnableTypeEnum.YES.code) {
                    this.$COMMON.AuthService.login(response.data.user, response.data.token);
                    setMenusInfo([], response.data.rootMenus);
                    IsLoginService.update(true);
                    this.$router.push({path: '/root/app-collect'});
                } else {
                    this.$Message.error(response.msg);
                }
            });*/
        }
    },
});
</script>

<style scoped>
</style>
