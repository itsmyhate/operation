<template>
    <a-menu class="h-100" @click="menuClick" :openKeys="openKeys" :selectedKeys="selectedKeys">
        <template v-for="menu in menus" >
            <a-menu-item  :key="menu.menuId" v-if="!menu.children || !menu.children.length">
                {{menu.menuName}}
            </a-menu-item>
            <a-sub-menu :key="menu.menuId" v-else  @titleClick="menuClick">
                <template slot="title">
                    {{menu.menuName}}
                </template>
                <template v-for="subM in menu.children">
                    <a-menu-item :key="subM.menuId" >
                        {{subM.menuName}}
                    </a-menu-item>
                </template>
            </a-sub-menu>
        </template>
    </a-menu>
</template>

<script lang="ts">
    import Vue from 'vue';
    import RouteTopologyService from "@/services/route-topology.service";
    import {SysMenuInfo} from "@/entity/domain/SysMenuInfo";

    export default Vue.extend({
        name: "LeftMenu",
        props: {
            menus: {type: Array, default: () => []}
        },
        data(): any {
            return {
                selectedKeys: [],
                openKeys: [],
            }
        },
        watch: {
            $route() {
                this.navPosition();
            }
        },
        created() {
        },
        methods: {
            menuClick(e: any) {
                const menu = this.findMenu(e.key, this.menus);
                if(e.item) {
                    this.$router.push({path: `${menu.menuUrl}`});
                } else {
                    this.openKeys = [e.key];
                }
            },
            findMenu(name: string, menus: SysMenuInfo[]): SysMenuInfo {
                let item;
                for(let menu of menus) {
                    if(!!item) return item;
                    if(menu.menuId === name) {
                        item = menu;
                        break;
                    } else if(!!menu.children && !!menu.children.length) {
                        item = this.findMenu(name, menu.children);
                    }
                }
                return item;
            },
            navPosition() {
                const route = this.$route;
                const nodes = RouteTopologyService.fetchNodes(route.path);
                if (!!nodes && nodes.length > 0) {
                    for (const node of nodes) {
                        let menus: SysMenuInfo[] | undefined = RouteTopologyService.recursionSerarchCurrentMenuTreeByPath(this.menus, node.path);
                        if (!!menus) {
                            this.selectedKeys = [];
                            this.openKeys = [];
                            menus.forEach((menu: SysMenuInfo) => {
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
        }
    })
</script>

<style scoped>

</style>
