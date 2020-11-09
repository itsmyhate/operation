<template>
    <a-layout class="h-100">
        <a-layout-sider class="root-left-menu root-scroll-content" >
            <LeftMenu :menus="menus"></LeftMenu>
        </a-layout-sider>
        <a-layout-content class="root-content">
            <div class="bg-white">
                <a-breadcrumb>
                    <a-breadcrumb-item v-for="crumb in crumbs"
                                     :key="crumb.key"
                                     :to="crumb.path"
                                     :active="crumb.key === activeKey"
                    >{{crumb.title}}</a-breadcrumb-item>
                </a-breadcrumb>
            </div>
            <keep-alive :include="aliveRoutes">
                <router-view class="m-2 root-main"/>
            </keep-alive>
        </a-layout-content>
    </a-layout>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {GET_ALIVE_ROUTE} from "@/store/route-keep-alive.module";
    import RouteTopologyService from "@/services/route-topology.service";
    import LeftMenu from "@/components/LeftMenu.vue";
    import {SysMenuInfo} from "@/entity/domain/SysMenuInfo";

    export default Vue.extend({
        name: "Main",
        components: {LeftMenu},
        data(): any {
            return {
                menus: [],
                aliveRoutes: [],
                crumbs: [],
                activeKey: '',
            }
        },
        watch: {
            $route() {
                this.navPosition();
            }
        },
        created() {
            this.aliveRoutes = this.$store.getters[GET_ALIVE_ROUTE]();
            this.$COMMON.globalStateService.dispatch(this.$COMMON.AppNameEnum.root,
                {
                    action: this.$COMMON.ActionsKeyEnum.getMenuInfo,
                    payload: this.$COMMON.AppNameEnum.test,
                    callBack: (menus: SysMenuInfo[]) => {
                        this.menus = menus;
                        this.navPosition();
                    }
                }
            )
        },
        methods: {
            navPosition() {
                const route = this.$route;
                const key = route.path;
                let crumb = this.crumbs.find((item: any) => item.key === key);
                if (crumb == null) {
                    let title = "尚未设置";
                    const currentMenu: any = RouteTopologyService.recursionSerarchMenuByPath(this.menus, route.path);
                    if (currentMenu == null) {
                        title = route.meta && route.meta.name ? route.meta.name : title;
                    } else {
                        title = currentMenu.text;
                    }
                    crumb = { key: key, title: title, path: route.path, params: route.params.params };
                    this.crumbs.push(crumb);
                } else {
                    crumb.params = route.params.params;
                }
                this.activeKey = crumb.key;
            },

        }
    });
</script>

<style scoped>

</style>
