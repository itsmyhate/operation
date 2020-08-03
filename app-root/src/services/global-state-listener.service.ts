import {SysAppInfo} from '@/entity/domain/SysAppInfo';
import {GlobalState} from '@/entity/model/GlobalState';
import {getMenusInfo} from '@/services/menus.service';
import {store} from '@/store';
import {GET_APP_HISROUTE, SET_APP_HISROUTE_ACTION} from '@/store/app-his-route.module';
import {initGlobalState} from 'qiankun';

export const globalStateListenerService = {
    init(COMMON: any, apps: SysAppInfo[]): void {
        /*
        * 全局状态
        * */
        const actions = initGlobalState(COMMON.globalStateService.initData(apps));
        COMMON.globalStateService.setAction(actions);
        COMMON.globalStateService.on( COMMON.AppNameEnum.root, (state: GlobalState, prevState: GlobalState) => {
            const action = state.action;
            if (action === COMMON.ActionsKeyEnum.setHisRoute) {
                /*payload={[微应用name: 'url']}
                微应用路由变化时调用，设置最新路由*/
                store.dispatch(SET_APP_HISROUTE_ACTION, state.payload).then((data) => {
                    if (state.callBack) { state.callBack(); }
                });
            } else if (action === COMMON.ActionsKeyEnum.getHisRoute) {
                /*payload=微应用名称
                微应用非快照时，挂载后调用，获取上次卸载时路由*/
                const hisRoute = store.getters[GET_APP_HISROUTE](state.payload);
                if (state.callBack) { state.callBack(hisRoute); }
            } else if (action === COMMON.ActionsKeyEnum.getMenuInfo) {
                /*payload=微应用名称
                获取菜单信息*/
                const menus = getMenusInfo(state.payload);
                if (state.callBack) { state.callBack(menus); }
            }
        });
    }
};
