<template>
    <a-layout class="h-100">
        <a-layout-sider class="root-left-menu scroll-content-dhcc">
            <LeftMenu :menus="menus"></LeftMenu>
        </a-layout-sider>
        <a-layout-content class="root-content">
            <div class="bg-white">
                <a-breadcrumb class="ivu-row-flex p-2">
<!--                    :to="crumb.path"-->
                    <a-breadcrumb-item class="ivu-row-flex" v-for="crumb in crumbs"
                                     :key="crumb.key"
                                     :active="crumb.key === activeKey">
                        <span slot="separator"></span>
                        <span class="root-cursor-pointer" @click="clickCrumb(crumb)">{{crumb.title}}</span>
                        <a-icon @click="closeCrumb($event, crumb)" type="ios-close" class="ivu-fs-large root-cursor-pointer"/>
                    </a-breadcrumb-item>
                </a-breadcrumb>
            </div>
            <keep-alive :include="aliveRoutes">
                <router-view  class="m-2 root-main" />
            </keep-alive>
        </a-layout-content>
    </a-layout>
</template>

<script lang="ts">
    import Vue from 'vue';
    import LeftMenu from "@/components/LeftMenu.vue";
    import {GET_ALL_ALIVE_ROUTE, GET_ALIVE_ROUTE} from "@/store/route-keep-alive.module";
    import RouteTopologyService from "@/services/route-topology.service";
    import {SysMenuInfo} from "@/entity/domain/SysMenuInfo";

    export default Vue.extend({
        name: "Main",
        components: {LeftMenu},
        data(): any {
            return {
                aliveRoutes: [],
                crumbs: [],
                activeKey: '',
                menus: [],
            }
        },
        watch: {
            $route() {
                if(this.$route.path.startsWith('/main')) {
                    this.navPosition();
                }
            }
        },
        created() {
            this.aliveRoutes = this.$store.getters[GET_ALIVE_ROUTE]('Main');
            this.$COMMON.globalStateService.dispatch( this.$COMMON.AppNameEnum.root,
                {
                    action: this.$COMMON.ActionsKeyEnum.getMenuInfo,
                    payload: this.$COMMON.AppNameEnum.organization,
                    callBack: (menus: SysMenuInfo[]) => {
                        this.menus = menus;
                        this.navPosition();
                    }
                }
            );
        },
        methods: {
            navPosition() {
                const route = this.$route;
                const key = route.path;
                let crumb: any = this.crumbs.find((item: any) => item.key === key);
                if (!crumb) {
                    let title = "尚未设置";
                    const currentMenu = RouteTopologyService.recursionSerarchMenuByPath(this.menus, route.path);
                    if (!currentMenu) {
                        title = route.meta && route.meta.name ? route.meta.name : title;
                    } else {
                        title = currentMenu.menuName;
                    }
                    crumb = { key: key, title: title, path: route.path, params: route.params.params, component: route.name };
                    this.crumbs.push(crumb);
                } else {
                    crumb.params = route.params.params;
                }
                this.activeKey = crumb.key;
            },
            closeCrumb(event: any, crumb: any) {
                const idx = this.crumbs.findIndex((val: any) => val.key === crumb.key);
                if(idx < 0) return;
                const routeFlag = this.crumbs[idx].key === this.activeKey; // 是否当前路由
                this.crumbs.splice(idx, 1);
                if(!!crumb.component) {
                    const aliveRoutes = this.$store.getters[GET_ALL_ALIVE_ROUTE];
                    for (let key in aliveRoutes) {
                        const ar = aliveRoutes[key];
                        const bool = !!ar.find((val: any) => val === crumb.component);
                        if(bool) {
                            this.destoryComponent(this.$children, crumb.component);
                            break;
                        }
                    }
                }
                if(routeFlag) {
                    const newCrumb: any = this.crumbs[this.crumbs.length-1];
                    this.$router.push({path: newCrumb.path});
                }
            },
            destoryComponent(components: any[], name: string) {
                for(let cp of components) {
                    if(cp.$options.name === name) {
                        const tempArr = cp.$vnode.tag.split('-');
                        const delKey = tempArr[2];

                        let keys: any[] = cp.$vnode.parent.componentInstance.keys;
                        keys = keys.filter(val => val !== delKey);

                        cp.$vnode.parent.componentInstance.keys = keys;
                        cp.$vnode.parent.componentInstance.cache[delKey] = undefined;
                        break;
                    } else if(cp.$children && !!cp.$children.length) {
                        this.destoryComponent(cp.$children, name);
                    }
                }
            },
            clickCrumb(crumb: any) {
                if(crumb) {
                    this.$router.push({path: crumb.path});
                }
            }
        }
    })
</script>

<style scoped lang="scss">

</style>
