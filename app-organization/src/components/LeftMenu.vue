<template>
    <a-menu class="w-100 h-100" :selectedKeys="selectedKeys" :openKeys="openKeys" mode="inline" @click="menuClick"><!--@on-select="menuClick" -->
        <template v-for="menu in menus" >
            <a-menu-item  :key="menu.menuId" v-if="!menu.children || !menu.children.length">
                {{menu.menuName}}
            </a-menu-item>
            <a-sub-menu :key="menu.menuId" v-else @titleClick="menuClick">
                <template slot="title">
                    {{menu.menuName}}
                </template>
                <template v-for="subM in menu.children">
                    <a-menu-item :key="subM.menuId">
                        {{subM.menuName}}
                    </a-menu-item>
                </template>
            </a-sub-menu>
        </template>
    </a-menu>
</template>

<script lang="ts">
import Vue from 'vue';
import RouteTopologyService from "../services/route-topology.service";

export default Vue.extend({
    name: "LeftMenu",
    props: {
        menus: { type: Array, default: () => [] },
    },
    data(): any {
        return {
            selectedKeys: [],
            openKeys: [],
        };
    },
    created() {
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
            const nodes = RouteTopologyService.fetchNodes(route.path);
            if (nodes != null && nodes.length > 0) {
                for (const node of nodes) {
                    const menus = RouteTopologyService.recursionSerarchCurrentMenuTreeByPath(this.menus, node.path);
                    if (menus != null) {
                        this.selectedKeys = [];
                        this.openKeys = [];
                        menus.forEach(menu => {
                            if (menu.menuUrl !== node.path) {
                                this.openKeys.push(menu.menuId); // 打开所有父节点
                            } else {
                                this.selectedKeys = [menu.menuId]; // 选中当前节点
                            }
                        });
                        break;
                    }
                }
            }
        },
        menuClick(e: any) { /*{ item, key, keyPath, domEvent } || { key, domEvent}*/
            const menu = this.findMenu(e.key, this.menus);
            if(e.item) {
                this.$router.push({path: `${menu.menuUrl}`});
            } else {
                this.openKeys = [e.key];
            }
        },
        findMenu(name: any, menus: any) {
            let item;
            for(let menu of menus) {
                if(!!item) { return item; }
                if(menu.menuId === name) {
                    item = menu;
                    break;
                } else if(!!menu.children && !!menu.children.length) {
                    item = this.findMenu(name, menu.children);
                }
            }
            return item;
        },
    }
});
</script>

<style scoped>

</style>
