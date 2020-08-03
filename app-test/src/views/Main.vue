<template>
    <Layout class="h-100">
        <Sider class="root-left-menu scroll-content-dhcc" >
            <LeftMenu :menus="menus"></LeftMenu>
        </Sider>
        <iContent class="root-content">
            <div class="bg-white">
                <Breadcrumb>
                    <Breadcrumb-item v-for="crumb in crumbs"
                                     :key="crumb.key"
                                     :to="crumb.path"
                                     :active="crumb.key === activeKey"
                    >{{crumb.title}}</Breadcrumb-item>
                </Breadcrumb>
            </div>
            <keep-alive :include="aliveRoutes">
                <router-view class="m-2 root-main"/>
            </keep-alive>
        </iContent>
    </Layout>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {GET_ALIVE_ROUTE} from "@/store/route-keep-alive.module";
    import RouteTopologyService from "@/services/route-topology.service";
    import LeftMenu from "@/components/LeftMenu.vue";
    import {SysMenuInfo} from "@/entity/domain/SysMenuInfo";
    import { GlobalState } from '@/entity/model/GlobalState';

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
                new GlobalState({
                    action: this.$COMMON.ActionsKeyEnum.getMenuInfo,
                    payload: this.$COMMON.AppNameEnum.test,
                    callBack: (menus: SysMenuInfo[]) => {
                        this.menus = menus;
                        this.navPosition();
                    }
                })
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
