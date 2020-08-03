export const GET_APP_HISROUTE = 'getAppRouteByName';
export const SET_APP_HISROUTE = 'setAppRoute';
export const SET_APP_INFO = 'setAppInfo';
export const GET_APP_INFO = 'getAppInfo';
export const SET_APP_HISROUTE_ACTION = 'setAppRouteAction';

export const appHisRoute = {
    namespace: true,
    state: {
        hisRoute: null,
        appInfo: null,
    },
    getters: {
        [GET_APP_HISROUTE]: (state: any) => (appName: string): string => {
            if (!state.hisRoute) {
                return '';
            }
            return state.hisRoute[appName];
        },
        [GET_APP_INFO]: (state: any) => {
            if (!state.appInfo) {
                return {};
            }
            return state.appInfo;
        }
    },
    mutations: {
        [SET_APP_HISROUTE]: (state: any, payload: any) => {
            const key = Object.keys(payload)[0];
            if (!state.hisRoute) {
                state.hisRoute = {};
            }
            state.hisRoute[key] = payload[key];
        },
        [SET_APP_INFO]: (state: any, payload: any) => {
            state.appInfo = payload;
        },
    },
    actions: {
        [SET_APP_HISROUTE_ACTION]: (injectee: any, payload: any) => {
            injectee.commit(SET_APP_HISROUTE, payload);
        }
    },
};
