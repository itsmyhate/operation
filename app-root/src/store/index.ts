import {appHisRoute} from '@/store/app-his-route.module';
import routeKeepAlive from '@/store/route-keep-alive.module';
import routeTopology from '@/store/route-topology.module';
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    test: null
  },
  getters: {
    getTest: (state) => {
      return state.test;
    }
  },
  mutations: {
    setTest: (state, payload) => {
      state.test = payload.test;
    },
  },
  actions: {
    setTest: (injectee, payload) => {
      injectee.commit('setTest', payload);
    }
  },
  modules: {
    appHisRoute,
    routeTopology,
    routeKeepAlive
  },
});
