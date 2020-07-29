export const GET_APP_HISROUTE = 'getAppRouteByName';
export const SET_APP_HISROUTE = 'setAppRoute';
export const SET_APP_HISROUTE_ACTION = 'setAppRouteAction';

export const appHisRoute = {
    namespace: true,
    state: {
        hisRoute: {}
    },
    getters: {
        [GET_APP_HISROUTE]: (state: any) => (appName: string) => {
            return state.hisRoute[appName];
        }
    },
    mutations: {
        [SET_APP_HISROUTE]: (state: any, payload: any) => {
            const key = Object.keys(payload)[0];
            state.hisRoute[key] = payload[key];
        },
    },
    actions: {
        [SET_APP_HISROUTE_ACTION]: (injectee:any, payload: any) => {
            injectee.commit(SET_APP_HISROUTE, payload);
        }
    },
}
