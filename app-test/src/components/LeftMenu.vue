<template>
    <iMenu class="h-100" @on-select="menuClick" :openNames="openKeys" :activeName="selectedKeys" accordion>
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
    import RouteTopologyService from "@/services/route-topology.service";
    import {SysMenuInfo} from "@/entity/domain/SysMenuInfo";

    export default Vue.extend({
        name: "LeftMenu",
        props: {
            menus: {type: Array, default: () => []}
        },
        data(): any {
            return {
                selectedKeys: '',
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
            menuClick(name: any) {
                const menu = this.findMenu(name, this.menus);
                this.$router.push({path: `${menu.menuUrl}`});
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
                                    this.selectedKeys = menu.menuId; // 选中当前节点
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
