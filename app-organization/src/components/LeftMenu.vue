<template>
    <iMenu class="w-100 h-100" @on-select="menuClick"  :activeName="selectedKeys" :openNames="openKeys" accordion>
        <template v-for="menu in menus" >
            <iMenuItem  :name="menu.menuId" v-if="!menu.children || !menu.children.length">
                {{menu.menuName}}
            </iMenuItem>
            <Submenu :name="menu.menuId" v-else >
                <template slot="title">
                    {{menu.menuName}}
                </template>
                <template v-for="subM in menu.children">
                    <iMenuItem :name="subM.menuId" >
                        {{subM.menuName}}
                    </iMenuItem>
                </template>
            </Submenu>
        </template>
    </iMenu>
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
            selectedKeys: '',
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
                                this.selectedKeys = menu.menuId; // 选中当前节点
                            }
                        });
                        break;
                    }
                }
            }
        },
        menuClick(name: any) {
            const menu = this.findMenu(name, this.menus);
            this.$router.push({path: `${menu.menuUrl}`});
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
