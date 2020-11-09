import {cacheKeyEnum} from '@/constants/enums/cache-key.enum';
import {SysAppInfo} from '@/entity/domain/SysAppInfo';
import {SysMenuInfo} from '@/entity/domain/SysMenuInfo';

function setMenusInfo(apps: SysAppInfo[], rootMenus?: SysMenuInfo[]) {
    localStorage.setItem(cacheKeyEnum.apps, JSON.stringify(apps));
    if (!!rootMenus) {
        localStorage.setItem(cacheKeyEnum.rootMenu, JSON.stringify(rootMenus));
    }
}
function getRootMenusInfo(): SysMenuInfo[] {
    const rootMenuStr = localStorage.getItem(cacheKeyEnum.rootMenu);
    if (!!rootMenuStr) {
        return JSON.parse(rootMenuStr)[0].children;
    }
    return [];
}
function getMenusInfo(appName?: string): SysMenuInfo[] | SysAppInfo[] {
    const appStr = localStorage.getItem(cacheKeyEnum.apps);
    if (!!appStr) {
        const apps: SysAppInfo[] = JSON.parse(appStr);
        if (!appName) {
            return apps;
        } else {
            const app: SysAppInfo | undefined = apps.find((val) => {
                if (val.appId === appName) {
                    return val;
                }
            });
            if ( app ) {
                return app.sysMenuInfoList || [];
            }
        }
    }
    return [];
}
export {setMenusInfo, getRootMenusInfo, getMenusInfo};
