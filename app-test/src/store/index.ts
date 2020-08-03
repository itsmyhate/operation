import Vue from 'vue';
import Vuex from 'vuex';
import routeKeepAlive from "@/store/route-keep-alive.module";
import routeTopology from "@/store/route-topology.module";

Vue.use(Vuex);

let store: any = new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    routeKeepAlive,
    routeTopology,
  },
});
export default store;
export function destoryStore() {
  store = null;
}
