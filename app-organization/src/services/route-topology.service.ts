import store from "@/store/index";
import router from "@/router/index";
import { HORIZONTAL_ROUTES, INITED, ROUTE_TOPOLOGY, SET_HORIZONTAL_ROUTES, SET_INITED, SET_TREE_ROUTES } from "@/store/route-topology.module";
import {SysMenuInfo} from "@/entity/domain/SysMenuInfo";

const RouteTopologyService = {
  init(): any {
    const routes: any[] = (router as any).options.routes;
    const treeRoutes: any[] = this.treeRecursion(routes); // 树形结构
    const horizontalRoutes: any[] = this.horizontalRecursion(treeRoutes); // 水平结构
    store.commit(ROUTE_TOPOLOGY + "/" + SET_TREE_ROUTES, treeRoutes);
    store.commit(ROUTE_TOPOLOGY + "/" + SET_HORIZONTAL_ROUTES, horizontalRoutes);
    store.commit(ROUTE_TOPOLOGY + "/" + SET_INITED, true);
  },
  isInit(): boolean {
    return store.getters[ROUTE_TOPOLOGY + "/" + INITED];
  },
  checkAndInit(): void {
    if (!this.isInit()) {
      this.init();
    }
  },
  treeRecursion(routes: any[], parentPath = "", treeRoutes: any[] = []): any[] {
    parentPath = parentPath + (parentPath === "" ? "" : "/");
    routes.forEach(item => {
      let parent = "";
      if (item.meta && item.meta.parent) {
        if (item.meta.parent.indexOf("./") === 0) {
          parent = parentPath + item.meta.parent.replace("./", "");
        } else {
          parent = item.meta.parent;
        }
      }
      const it: any = {
        path: parentPath + item.path,
        meta: item.meta,
        parent: parent
      };
      if (item.children != null && item.children.length > 0) {
        it.children = [];
        this.treeRecursion(item.children, it.path, it.children);
      }
      treeRoutes.push(it);
    });
    return treeRoutes;
  },
  horizontalRecursion(treeRoutes: any[], horizontalRoutes: any[] = []): any {
    treeRoutes.forEach(item => {
      horizontalRoutes.push({
        path: item.path,
        meta: item.meta,
        parent: item.parent
      });
      if (item.children != null && item.children.length > 0) {
        this.horizontalRecursion(item.children, horizontalRoutes);
      }
    });
    return horizontalRoutes;
  },
  fetchNodes(path: any, nodes: any[] = []) {
    const horizontalRoutes: any[] = store.getters[ROUTE_TOPOLOGY + "/" + HORIZONTAL_ROUTES];
    const node = horizontalRoutes.find(it => it.path === path);
    if (node != null) {
      nodes.push(JSON.parse(JSON.stringify(node)));
      if (node.parent) {
        this.fetchNodes(node.parent, nodes);
      }
    }
    return nodes;
  },
  recursionSerarchMenuByPath(menus: SysMenuInfo[], path: string): SysMenuInfo | undefined {
    for (const i in menus) {
      if (menus[i].menuUrl === path) {
        return menus[i];
      } else if (menus[i].children && !!menus[i].children.length) {
        const mu = this.recursionSerarchMenuByPath(menus[i].children, path);
        if (mu != null) {
          return mu;
        }
      }
    }
  },
  recursionSerarchCurrentMenuTreeByPath(menus: SysMenuInfo[], path: string): SysMenuInfo[] | undefined {
    for (const i in menus) {
      if (menus[i].menuUrl === path) {
        return [JSON.parse(JSON.stringify(menus[i]))];
      } else if (menus[i].children && !!menus[i].children.length) {
        const mu = this.recursionSerarchCurrentMenuTreeByPath(menus[i].children, path);
        if (mu != null) {
          const menuCp = [JSON.parse(JSON.stringify(menus[i]))].concat(...mu);
          return menuCp;
        }
      }
    }
  },
};
export default RouteTopologyService;
