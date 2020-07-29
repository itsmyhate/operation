<template>
    <Row class="w-100 d-flex justify-content-between align-items-center" type="flex" justify="center" >
        <div class="d-flex justify-content-start align-items-center w-25">
            <Icon class="ivu-fs-large" type="logo-codepen"  :size="30" />
            <h5 class="ml-2 text-nowrap">综合运营平台{{isRoot ? '' : appText}}</h5>
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
                <Icon type="ios-arrow-down"></Icon>
            </div>
            <Icon v-if="!isRoot" class="mr-2 home-icon-df " @click="goBack()" type="md-home" />
            <div v-else class="mr-3 user-select-none">
                {{userInfo.deptId}}
            </div>
            <Dropdown class="mr-3" @on-click="dropdownClick" trigger="click">
                <div type="text" class="root-cursor-pointer">{{userInfo.username}}
                    <Icon type="ios-arrow-down"></Icon>
                </div>
                <DropdownMenu slot="list">
                    <DropdownItem :name="dropdown.updatePwd">修改密码</DropdownItem>
                    <DropdownItem :name="dropdown.logout" >退出登录</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
        <transition :name="'move-up'">
            <div class="collapse-df" v-show="isCollapse">
                <Row class="w-100" type="flex" justify="center" >
                    <!-- not more than 6 -->
                    <template v-for="app in data">
                        <iCol :span="4">
                            <div >
                                {{app.appName}}
                            </div>
                            <template v-if="app.menus && !!app.menus.length">
                                <div v-for="menu in app.menus">
                                    <iButton type="text" @click="() => {}">{{menu.menuName}}</iButton>
                                </div>
                            </template >
                        </iCol>
                    </template>
                </Row>
            </div>
        </transition>
    </Row>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {SubAppService} from "@/services/notice/sub-app.service";
    import {IsLoginService} from "@/services/notice/is-login.service";
    import { getMenusInfo} from '@/services/menus.service';

    export default Vue.extend({
        name: "SubAppHeader",
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
            }
        },
        computed: {
            appText () {
                return  ' | '.concat('this.appName');
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
            dropdownClick(name: string) {
                if(name === this.dropdown.logout) {
                    IsLoginService.update(false);
                    this.$COMMON.AuthService.logout(); // 清楚缓存信息
                    this.appName = undefined;
                    location.reload();
                    // this.$router.push({path: '/login'});
                }
            },
            listenAppName() {
                const appName = SubAppService.appName.subscribe((value) => {
                    if(!!value) {
                        this.isRoot = false;
                        this.appName = value;
                    }
                });
                SubAppService.appNames.add(appName);
            },
            listenOnLoad () {
                if(!!sessionStorage.getItem('app-name')) {
                    const name: any = sessionStorage.getItem('app-name');
                    sessionStorage.removeItem('app-name');
                    SubAppService.update(name);
                }
                window.addEventListener("beforeunload", () => {
                    if(!!this.appName){
                        sessionStorage.setItem('app-name', this.appName);
                    }
                })
            }
        }
    })
</script>
<style scoped>
    .collapse-df{
        position: absolute;
        top: 64px;
        z-index: 9999;
        width: 100%;
        background-color: white;
    }
    .home-icon-df {
        border-radius: 15px;
        background-color: white;
        color: #007bff;
        cursor: pointer;
        font-size: 25px;
    }
</style>
