import {SysMenuInfo} from '@/entity/domain/SysMenuInfo';

export class SysAppInfo {
    public appId: string;
    public appUrl: string;
    public appActiveRule: string;
    public appType: string;
    public appName: string;
    public appIcon: string;
    public appDesc: string;
    public appState?: string;
    public sysMenuInfoList?: SysMenuInfo[];

    constructor(options: {
        appId: string,
        appUrl: string,
        appActiveRule: string,
        appType: string,
        appIcon: string,
        appName: string,
        appDesc?: string,
        appState?: string,
        sysMenuInfoList?: SysMenuInfo[],
    }) {
        this.appId = options.appId || '',
        this.appUrl = options.appUrl || '',
        this.appActiveRule = options.appActiveRule || '',
        this.appType = options.appType || '',
        this.appIcon = options.appIcon || '',
        this.appName = options.appName || '',
        this.appDesc = options.appDesc || '',
        this.appState = options.appState || '',
        this.sysMenuInfoList = options.sysMenuInfoList || [];
    }
}
