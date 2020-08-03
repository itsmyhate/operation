/* module */
export const ROUTE_TOPOLOGY = "routeTopology";
/* state */
export const INITED = "inited";
export const TREE_ROUTES = "treeRoutes";
export const HORIZONTAL_ROUTES = "horizontalRoutes";
/* mutation */
export const SET_INITED = "setInited";
export const SET_TREE_ROUTES = "setTreeRoutes";
export const SET_HORIZONTAL_ROUTES = "setHorizontalRoutes";
/* actions */


export const state = {
  inited: false,
  treeRoutes: [],
  horizontalRoutes: []
};

const getters = {
  inited: (state: any) => state.inited,
  treeRoutes: (state: any) => state.treeRoutes,
  horizontalRoutes: (state: any) => state.horizontalRoutes
};

export const mutations = {
  [SET_INITED](state: any, inited: boolean) {
    state.inited = inited;
  },
  [SET_TREE_ROUTES](state: any, treeRoutes: any[]) {
    state.treeRoutes = treeRoutes;
  },
  [SET_HORIZONTAL_ROUTES](state: any, horizontalRoutes: any[]) {
    state.horizontalRoutes = horizontalRoutes;
  }
};

export const actions = {};

const routeTopology = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
export default routeTopology;
