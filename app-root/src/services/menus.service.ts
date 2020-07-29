import {cacheKeyEnum} from '@/constants/enums/cache-key.enum';
import {SysMenuInfo} from '@/entity/domain/SysMenuInfo';
import {SysAppInfo} from "@/entity/domain/SysAppInfo";


function setMenusInfo(menus: SysAppInfo[], rootMenus: SysMenuInfo[]) {
    localStorage.setItem(cacheKeyEnum.menu, JSON.stringify(menus));
    localStorage.setItem(cacheKeyEnum.rootMenu, JSON.stringify(rootMenus));
}
function getRootMenusInfo(): SysMenuInfo[] {
    const rootMenuStr = localStorage.getItem(cacheKeyEnum.rootMenu);
    if(!!rootMenuStr) {
        return JSON.parse(rootMenuStr)[0].children;
    }
    return [];
}
function getMenusInfo(appName?: string): SysMenuInfo[] | SysAppInfo[] {
    const appStr = localStorage.getItem(cacheKeyEnum.menu);
    if(!!appStr) {
        const apps: SysAppInfo[] = JSON.parse(appStr);
        if(!appName) {
            return apps;
        } else {
            const app: SysAppInfo = apps.find(val => {
                if(val.appId === appName) {
                    return val;
                }
            });
            return app.menus;
        }
    }
    return [];
}
export {setMenusInfo, getRootMenusInfo, getMenusInfo}
