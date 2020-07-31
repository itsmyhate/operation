<template>
    <Layout class="h-100">
        <!--<Sider class="root-left-menu scroll-content-dhcc">
            <LeftMenu :menus="menus"></LeftMenu>
        </Sider>-->
        <iContent class="root-content">
            <!--<div class="bg-white">
                <Breadcrumb>
                    <Breadcrumb-item v-for="crumb in crumbs"
                                     :key="crumb.key"
                                     :to="crumb.path"
                                     :active="crumb.key === activeKey"
                    >{{crumb.title}}</Breadcrumb-item>
                </Breadcrumb>
            </div>-->
            <keep-alive :include="aliveRoutes">
                <router-view class="root-main m-2"/>
            </keep-alive>
        </iContent>
    </Layout>
</template>

<script lang="ts">
import LeftMenu from '@/components/LeftMenu.vue';
import { getRootMenusInfo } from '@/services/menus.service';
import RouteTopologyService from '@/services/route-topology.service';
import {GET_ALIVE_ROUTE} from '@/store/route-keep-alive.module';
import Vue from 'vue';
export default Vue.extend({
    name: 'Main',
    components: {LeftMenu},
    data() {
        return {
            menus: [],
            crumbs: [],
            aliveRoutes: [],
            activeKey: '',
        };
    },
    created() {
        this.menus = getRootMenusInfo();
        this.aliveRoutes = this.$store.getters[GET_ALIVE_ROUTE]('Main');
        this.navPosition();
    },
    watch: {
        $route() {
            this.navPosition();
        }
    },
    methods: {
        navPosition() {
            const route = this.$route;
            if (route.path.indexOf('/root') < 0) {
                return;
            }
            const key = route.path;
            let crumb: any = this.crumbs.find((item: any) => item.key === key);
            if (!crumb) {
                let title = '尚未设置';
                const currentMenu = RouteTopologyService.recursionSerarchMenuByPath(this.menus, route.path);
                if (!currentMenu) {
                    title = route.meta && route.meta.name ? route.meta.name : title;
                } else {
                    title = currentMenu.menuName;
                }
                crumb = { key, title, path: route.path, params: route.params.params };
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
