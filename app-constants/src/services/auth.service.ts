import {SysUserInfo} from "../../src/entity/domain/SysUserInfo";
import {UserToken} from "../../src/entity/domain/UserToken";
import {cacheKeyEnum} from "../../src/constants/enums/cache-key.enum";
export const AuthService = {
    login(userInfo: SysUserInfo, token: UserToken): void {
        localStorage.setItem(cacheKeyEnum.user, JSON.stringify(userInfo));
        localStorage.setItem(cacheKeyEnum.token, JSON.stringify(token));
    },
    logout(): void {
        // localStorage.removeItem(AUTH_KEY.USER_KEY);
        // localStorage.removeItem(AUTH_KEY.TOKEN_KEY);
        localStorage.clear();
        sessionStorage.clear();
    },
    getUserInfo(): SysUserInfo | null {
        const userStr = localStorage.getItem(cacheKeyEnum.user);
        if(!!userStr) {
            return JSON.parse(userStr);
        }
        return null;
    },
    getToken(): UserToken | null {
        const tokenStr = localStorage.getItem(cacheKeyEnum.token);
        if(!!tokenStr) {
            return JSON.parse(tokenStr);
        }
        return null;
    },
    checkLogin(): boolean {
        const tokenStr = localStorage.getItem(cacheKeyEnum.token);
        if(!!tokenStr) {
            const token = JSON.parse(tokenStr);
            return !!token.accessToken;
        }
        return false;
    },
    checkToken(): boolean {
        const token: any = this.getToken();
        if (token != null) {
            const currentTimeStamp = new Date().getTime();
            const expiratTimeStamp = token.time + (token.expiresIn - 300) * 1000;
            if (currentTimeStamp > expiratTimeStamp) {
                return false;
            }
        }
        return true;
    },
    updateToken(accessToken: string): boolean {
        const token:  any = this.getToken();
        if (token != null) {
            token.accessToken = accessToken;
            localStorage.setItem(cacheKeyEnum.token, JSON.stringify(token));
            return  true;
        }
        return false;
    }
}
