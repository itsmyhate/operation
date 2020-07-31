export class SysMenuInfo {
    menuId: string;
    menuUrl: string;
    menuIcon: string;
    menuName: string;
    menuBgImg: string;
    menuBgColor: string;
    menuLevel: number;
    children: SysMenuInfo[];

    constructor(options: {
        menuId: string,
        menuUrl: string,
        menuIcon: string,
        menuName: string,
        menuBgImg?: string,
        menuBgColor?: string,
        menuLevel?: number,
        children?: SysMenuInfo[],
    }) {
        this.menuId = options.menuId || '',
            this.menuUrl = options.menuUrl || '',
            this.menuIcon = options.menuIcon || '',
            this.menuName = options.menuName || '',
            this.menuBgImg = options.menuBgImg || '',
            this.menuBgColor = options.menuBgColor || '',
            this.menuLevel = options.menuLevel || 0,
            this.children = options.children || [];
    }
}
