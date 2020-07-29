export class SysDeptInfo {
    deptId: string;
    deptType: string;
    comId: string;
    tenId: string;
    deptName: string;
    deptLevel: number;
    children: SysDeptInfo[];

    constructor(options: {
        deptId: string,
        deptType: string,
        comId: string,
        tenId: string,
        deptName: string,
        deptLevel: number,
        children?: SysDeptInfo[],
    }) {
        this.deptId = options.deptId || '',
        this.deptType = options.deptType || '',
        this.comId = options.comId || '',
        this.tenId = options.tenId || '',
        this.deptName = options.deptName || '',
        this.deptLevel = options.deptLevel || 0,
        this.children = options.children || []
    }
}
