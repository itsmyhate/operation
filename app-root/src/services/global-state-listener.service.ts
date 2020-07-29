import {GlobalState} from "@/entity/model/GlobalState";
import {store} from "@/store";
import {GET_APP_HISROUTE, SET_APP_HISROUTE_ACTION} from "@/store/app-his-route.module";
import {checkToken, getMenusInfo, getToken, getUserInfo, updateToken} from "@/services/auth.service";

export const globalStateListenerService = {
    init(COMMON: any): void {
        COMMON.globalStateService.on( COMMON.AppNameEnum.root, (state: GlobalState, prevState: GlobalState) => {
            const action = state.action;
            if(action === COMMON.ActionsKeyEnum.setHisRoute) {
                //payload={[微应用name: 'url']}  卸载时调用，设置卸载时路由
                store.dispatch(SET_APP_HISROUTE_ACTION, state.payload).then((data) => {
                    if(state.callBack) state.callBack();
                });
            } else if(action === COMMON.ActionsKeyEnum.getHisRoute) {
                // payload=微应用名称 挂载后调用， 获取上次卸载时路由
                const hisRoute = store.getters[GET_APP_HISROUTE](state.payload);
                if(state.callBack) state.callBack(hisRoute);
            } else if(action === COMMON.ActionsKeyEnum.getMenuInfo) {
                // payload=微应用名称， 获取菜单信息
                const menus = getMenusInfo(state.payload);
                if(state.callBack) state.callBack(menus);
            } else if(action === COMMON.ActionsKeyEnum.getUserInfo) {
                // 用户信息获取
                const user = getUserInfo();
                if(state.callBack) state.callBack(user);
            } else if(action === COMMON.ActionsKeyEnum.getToken) {
                // token获取
                const token = getToken();
                if(state.callBack) state.callBack(token);
            } else if(action === COMMON.ActionsKeyEnum.checkToken) {
                // token校验有效
                if(state.callBack) state.callBack(checkToken());
            } else if(action === COMMON.ActionsKeyEnum.updateToken) {
                // payload=XXXXXXXXX ，token刷新
                if(state.payload) {
                    const token = updateToken(state.payload);
                    if(state.callBack) state.callBack(token);
                }
            }
        })
    }
}
