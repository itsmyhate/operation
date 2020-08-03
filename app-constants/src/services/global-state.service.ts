import {ActionsKeyEnum, AppNameEnum} from "../constants/enums";
import {GlobalState} from "../entity/model/GlobalState";

class GlobalStateAction {
    // 默认值为空 Action
    globalStateAction = {
        onGlobalStateChange: emptyAction,
        setGlobalState: emptyAction,
    };
    /**
     * 设置 actions
     */
    setActions(act: any) {
        this.globalStateAction = act;
    }

    getActions() {
        return this.globalStateAction;
    }

    onGlobalStateChange(...args: any[]) {
        return this.globalStateAction.onGlobalStateChange(...args);
    }
    setGlobalState(...args: any[]) {
        return this.globalStateAction.setGlobalState(...args);
    }
}
function emptyAction(...args: any[]) {
    console.warn('GlobalState Do Nothing........');
}
let globalStateAction:any = new GlobalStateAction();
export function destoryActions() {
    globalStateAction = null;
}

export const globalStateService = {

    /*
    * 初始化所有微应用状态
    * 只在主应用加载时调用一次
    * */
    initData(apps: any[]): Record<string, GlobalState | string> {
        apps = apps || [];
        let record: Record<string, GlobalState |string> = {};
        if(!!apps.length) {
            apps.forEach(app => {
                record[app.name] = new GlobalState({});
            });
            record[AppNameEnum.root] = new GlobalState({});
            record[ActionsKeyEnum.activeApp] = '';
        } else {
            console.warn(' subapps is empty .......');
        }
        return record;
    },

    /*
    * 设置全局状态对象 监听/触发方法的映射
    * 每个微应用mount时设置一次
    * */
    setAction(props: any) {
        globalStateAction.setActions(props);
    },
    dispatch(appName:string, data: GlobalState) {
        if(data && !!data.action) {
            const record = { [appName]: data, [ActionsKeyEnum.activeApp]: appName };
            globalStateAction.setGlobalState(record);
        }
    },
    on(appName: string, callBack: (state: GlobalState, prevState: GlobalState) => void) {
        globalStateAction.onGlobalStateChange( (record: Record<string, GlobalState | string>, preRecord: Record<string, GlobalState | string>) => {
            if (record[ActionsKeyEnum.activeApp] === appName && record[appName]) {
                const state: any = record[appName];
                const preState: any = preRecord[appName];
                callBack(state, preState);
            }
        });
    }
}
