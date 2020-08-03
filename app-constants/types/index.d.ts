import {GlobalState} from "../src/entity/model/GlobalState";
import {SysDictInfo} from "../src/entity/domain/SysDictInfo";
import {SysUserInfo} from "../src/entity/domain/SysUserInfo";
import {UserToken} from "../src/entity/domain/UserToken";

export class COMMON {
    /*
   * 公共方法
   * */
    numberFormat(value: any, unit: string, fix?: number, unitName?: string): string;
    thousandSymbol(value: string | number) : string;
    /*
    * 公共枚举
    * */
    ActionsKeyEnum: any;
    AppNameEnum: {
        root: string;
        test: string;
        organization : string;
        finAcc : string;
    };
    DictionaryEnum: any;
    /*
   * 公共服务
   * */
    DictionaryService: {
        initDictionary(appName: string, dictionarys: any[]): void ,
        getDictionary(key: string | undefined, appName: string): SysDictInfo[],
        getNameByCode(name: string, code: string, appName: string): string,

    };
    globalStateService: {
        initData(apps: any[]): Record<string, GlobalState | string>,
        setAction(props: any): void,
        dispatch(appName:string, data: GlobalState): void,
        on(appName: string, callBack: (state: GlobalState, prevState: GlobalState) => void) : void
    };
    AuthService: {
        login(userInfo: SysUserInfo, token: UserToken): void,
        logout(): void,
        getToken(): UserToken | null,
        getUserInfo(): SysUserInfo | null,
        checkLogin(): boolean ,
        checkToken(): boolean,
        updateToken(accessToken: string): boolean
    }
}
declare module "vue/types/vue" {
    interface Vue {
        /**
         * 全局提示
         */
        $COMMON: COMMON;
    }
}
