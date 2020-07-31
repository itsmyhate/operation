import {SysAppInfo} from '@/entity/domain/SysAppInfo';
import {globalStateListenerService} from '@/services/global-state-listener.service';
import {initGlobalState, registerMicroApps, runAfterFirstMounted, setDefaultMountApp, start} from 'qiankun';
import Vue from 'vue';

const lifecycle: any = {
    beforeLoad: [
        (app: any) => {
            if (!Vue.prototype.$COMMON.AuthService.checkLogin()) {
                console.warn(`${app.name}未登录，重定向-->auth`);
                history.replaceState(null, 'login', '/login');
            }
            console.log('[LifeCycle] before load %c%s', 'color: green;', app.name);
        },
    ],
    beforeMount: [
        (app: any) => {
            console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name);
        },
    ],
    afterUnmount: [
        (app: any) => {
            console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name);
        },
    ],
};
function activeRule(path: string) {
    return (location: any) => {
        const res = location.pathname.startsWith(`${path}`);
        return res;
    };
}
function dealMenuInfo(subApps: SysAppInfo[]) {
    const subApps_ = subApps.map((val) => {
        return {
            name: val.appId,
            entry: val.appUrl,
            container: `#subApp`,  // `#${val.name}App`,
            activeRule: activeRule(val.appActiveRule),
        };
    });
    return subApps_;
}
export function startQiankun(COMMON: any, apps: SysAppInfo[], path?: string) {
    if (!apps || !apps.length) {
        return;
    }
    const subApps = dealMenuInfo(apps);
    /*
    * 注册微应用
    * */
    registerMicroApps(subApps, lifecycle);
    /*
    * 全局状态
    * */
    const actions = initGlobalState(COMMON.globalStateService.initData(apps));
    COMMON.globalStateService.setAction(actions);
    /*
    * 注册root观察者
    * */
    globalStateListenerService.init(COMMON);
    // actions.setGlobalState({app: "auth", path: "/auth"});
    // actions.offGlobalStateChange();

    if (!!path) {
        setDefaultMountApp(path);
    }
    start({
        prefetch: []
    });
    runAfterFirstMounted(() => {
        console.log('[MainApp] first app mounted');
    });
}
