import {routes} from '@/router';

export const ALIVE_ROUTE_ROOT = 'root';
export const SET_ALIVE_ROUTE = 'setAliveRoot';
export const GET_ALIVE_ROUTE = 'getAliveRoot';

const routeKeepAlive = {
    namespace: true,
    state: {
        aliveRoute: [],
    },
    getters: {
        [GET_ALIVE_ROUTE]: (state: any) => (routesName?: string) => {
            return routesName ? state.aliveRoute[routesName] : state.aliveRoute[ALIVE_ROUTE_ROOT];
        }
    },
    mutations: {
        [SET_ALIVE_ROUTE]: (state: any) => {
            state.aliveRoute = getRouteKeepAlive(ALIVE_ROUTE_ROOT, {}, routes);
        }
    },
    actions: {
    },
};
function getRouteKeepAlive(routesName: string, aliveRoute: any, routes: any[]) {
    routes.forEach((value) => {
        if (value.meta && value.meta.keepAlive) {
            if (!aliveRoute[routesName]) { aliveRoute[routesName] = []; }
            aliveRoute[routesName].push(value.name);
        }
        if (value.children && !!value.children.length) {
            getRouteKeepAlive(value.name, aliveRoute, value.children);
        }
    });
    return aliveRoute;
}
export default routeKeepAlive;
