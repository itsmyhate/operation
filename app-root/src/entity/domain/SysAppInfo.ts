import {SysMenuInfo} from "@/entity/domain/SysMenuInfo";

export class SysAppInfo {
    appId: string;
    appUrl: string;
    appType: string;
    appName: string;
    appIcon: string;
    activeRule: string;
    appDesc: string;
    appState?: string;
    menus?: SysMenuInfo[];

    constructor(options: {
        appId: string,
        appUrl: string,
        appType: string,
        appIcon: string,
        appName: string,
        activeRule: string,
        appDesc?: string,
        appState?: string,
        menus?: SysMenuInfo[],
    }) {
        this.appId = options.appId || '',
        this.appUrl = options.appUrl || '',
        this.appType = options.appType || '',
        this.appIcon = options.appIcon || '',
        this.appName = options.appName || '',
        this.appDesc = options.appDesc || '',
        this.activeRule = options.activeRule || '',
        this.appState = options.appState || '',
        this.menus = options.menus || []
    }
}
