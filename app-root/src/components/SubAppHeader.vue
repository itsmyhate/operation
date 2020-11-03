<template>
    <a-row class="w-100 d-flex justify-content-between align-items-center" type="flex" justify="center" >
        <div class="d-flex justify-content-start align-items-center w-25">
            <a-icon class="ivu-fs-large" type="logo-codepen"  :size="30" />
            <span class="ml-2 text-nowrap font-weight-bold">综合运营平台{{isRoot ? '' : appText}}</span>
        </div>
        <div class="h-100 w-50" style="text-align: -webkit-center">
            <!--<iMenu v-if="isRoot" @on-select="menuClick" class="h-100 w-25" :mode="'horizontal'">
                <iMenuItem :name="'/workbench'">
                    工作台
                </iMenuItem>
                <iMenuItem :name="'/app-collect'">
                    应用管理
                </iMenuItem>
            </iMenu>-->
            <!--<iMenu v-else @on-select="menuClick" class="h-100" :mode="'horizontal'" >
                <iMenuItem v-for="item in data" :name="item.routerLink">
                    {{item.text}}
                </iMenuItem>
            </iMenu>-->
        </div>
        <div class="h-25 d-flex justify-content-end align-items-center w-25">
            <div v-if="!isRoot" type="text" class=" mr-3 root-cursor-pointer " @click="() => isCollapse = !isCollapse">
                更多
                <a-icon type="ios-arrow-down"></a-icon>
            </div>
            <a-icon v-if="!isRoot" class="mr-2 root-home-icon-df " @click="goBack()" type="md-home" />
            <div v-else class="mr-3 user-select-none">
                {{userInfo.deptId}}
            </div>
            <a-dropdown-button  class="mr-3">
                <div type="text" class="root-cursor-pointer">{{userInfo.username}}
                    <a-icon type="ios-arrow-down"></a-icon>
                </div>
                <a-menu slot="overlay"  @click="dropdownClick">
                    <a-menu-item :key="dropdown.updatePwd">修改密码</a-menu-item>
                    <a-menu-item :key="dropdown.logout" >退出登录</a-menu-item>
                </a-menu>
            </a-dropdown-button>
        </div>
        <transition :name="'move-up'">
            <div class="root-collapse-df" v-show="isCollapse">
                <a-row class="w-100" type="flex" justify="center" >
                    <!-- not more than 6 -->
                    <template v-for="app in data">
                        <a-col :span="4">
                            <div >
                                {{app.appName}}
                            </div>
                            <template v-if="app.menus && !!app.menus.length">
                                <div v-for="menu in app.menus">
                                    <a-button type="text" @click="() => {}">{{menu.menuName}}</a-button>
                                </div>
                            </template >
                        </a-col>
                    </template>
                </a-row>
            </div>
        </transition>
    </a-row>
</template>

<script lang="ts">
import { getMenusInfo} from '@/services/menus.service';
import {IsLoginService} from '@/services/notice/is-login.service';
import {SubAppService} from '@/services/notice/sub-app.service';
import Vue from 'vue';

export default Vue.extend({
    name: 'SubAppHeader',
    data(): any {
        return {
            data: [],
            userInfo: null,
            isRoot: true,
            isCollapse: false,
            appName: '',
            dropdown: {
                logout: 'logout',
                updatePwd: 'updatePwd',
            }
        };
    },
    computed: {
        appText() {
            return  ' | '.concat(this.appName);
        }
    },
    created() {
        this.data = getMenusInfo() || [];
        this.userInfo = this.$COMMON.AuthService.getUserInfo() || {};
        this.listenAppName();
        this.listenOnLoad();
    },
    beforeDestroy() {
        SubAppService.appNames.unsubscribe();
    },
    methods: {
        goBack() {
            this.isRoot = true;
            this.isCollapse = false;
            this.$router.push({path: '/'});
        },
        /*menuClick(name) {
            this.$router.push({path: `${name}`});
        },*/
        dropdownClick(e: any) {
            if (e.key === this.dropdown.logout) {
                IsLoginService.update(false);
                this.$COMMON.AuthService.logout(); // 清楚缓存信息
                this.appName = undefined;
                location.reload();
                // this.$router.push({path: '/login'});
            }
        },
        listenAppName() {
            const appName = SubAppService.appName.subscribe((value) => {
                if (!!value) {
                    this.isRoot = false;
                    this.appName = value;
                }
            });
            SubAppService.appNames.add(appName);
        },
        listenOnLoad() {
            if (!!sessionStorage.getItem('app-name')) {
                const name: any = sessionStorage.getItem('app-name');
                sessionStorage.removeItem('app-name');
                SubAppService.update(name);
            }
            window.addEventListener('beforeunload', () => {
                if (!!this.appName) {
                    sessionStorage.setItem('app-name', this.appName);
                }
            });
        }
    }
});
</script>
<style scoped lang="scss">
    .#{$prefix} {
        &collapse-df{
            position: absolute;
            top: 64px;
            z-index: 9999;
            width: 100%;
            background-color: white;
        }
        &home-icon-df {
            border-radius: 15px;
            background-color: white;
            color: #007bff;
            cursor: pointer;
            font-size: 25px;
        }
    }
</style>
