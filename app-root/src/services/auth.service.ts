import {cacheKeyEnum} from '@/constants/enums/cache-key.enum';
import {SysMenuInfo} from '@/entity/domain/SysMenuInfo';
import {UserToken} from "@/entity/domain/UserToken";
import {SysUserInfo} from "@/entity/domain/SysUserInfo";
import {SysAppInfo} from "@/entity/domain/SysAppInfo";

function login(userInfo: SysUserInfo, token: UserToken) {
    localStorage.setItem(cacheKeyEnum.user, JSON.stringify(userInfo));
    localStorage.setItem(cacheKeyEnum.token, JSON.stringify(token));
}
function logout() {
    // localStorage.removeItem(AUTH_KEY.USER_KEY);
    // localStorage.removeItem(AUTH_KEY.TOKEN_KEY);
    localStorage.clear();
    sessionStorage.clear();
}

function getUserInfo(): SysUserInfo {
    const userStr = localStorage.getItem(cacheKeyEnum.user);
    if(!!userStr) {
        return JSON.parse(userStr);
    }
    return null;
}
function getToken(): UserToken {
    const tokenStr = localStorage.getItem(cacheKeyEnum.token);
    if(!!tokenStr) {
        return JSON.parse(tokenStr);
    }
    return null;
}
function checkLogin(): boolean {
    const tokenStr = localStorage.getItem(cacheKeyEnum.token);
    if(!!tokenStr) {
        const token = JSON.parse(tokenStr);
        return !!token.accessToken;
    }
    return false;
}
function checkToken(): boolean {
    const token: UserToken = getToken();
    if (token != null) {
        const currentTimeStamp = new Date().getTime();
        const expiratTimeStamp = token.time + (token.expiresIn - 300) * 1000;
        if (currentTimeStamp > expiratTimeStamp) {
            return false;
        }
    }
    return true;
}
function updateToken(accessToken: string) {
    const token:  UserToken = getToken();
    if (token != null) {
        token.accessToken = accessToken;
        localStorage.setItem(cacheKeyEnum.token, JSON.stringify(token));
    }
}

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
export {login, logout, getToken, getUserInfo, checkLogin, checkToken, updateToken, setMenusInfo, getRootMenusInfo, getMenusInfo}
