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
    import Vue from 'vue';
    import {startQiankun} from "@/qiankun.start";
    import {IsLoginService} from "@/services/notice/is-login.service";
    import ApiService from "@/services/restful-api/api.service";
    import authorizationApi from "@/constants/api/authorization.api";
    import AuthService from "@/services/restful-api/auth.service";
    import { ResponseTypeEnum } from '@/constants/enums/response-type.enum';
    import {  setMenusInfo } from '@/services/menus.service';

    export default Vue.extend({
        name: "Login",
        data(): any {
            return {
                form: {},
            }
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
                ApiService.post(authorizationApi.login.url ,{
                    username: 'username',
                    password: 'password'
                }, {}, AuthService.createBasicHeaders()).then((response: any) => {
                    if(response.code === ResponseTypeEnum.success) {
                        this.$COMMON.AuthService.login(response.data.user, response.data.token);
                        setMenusInfo(response.data.menus, response.data.rootMenus);
                        IsLoginService.update(true);
                        startQiankun(this.$COMMON, response.data.menus);
                        this.$router.push({path: '/root/app-collect'});
                    } else {
                        this.$Message.error(response.msg);
                    }
                });
            }
        },
    })
</script>

<style scoped>
</style>
