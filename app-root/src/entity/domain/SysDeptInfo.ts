export class SysDeptInfo {
    public deptId: string;
    public deptType: string;
    public comId: string;
    public tenId: string;
    public deptName: string;
    public deptLevel: number;
    public children: SysDeptInfo[];

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
        this.children = options.children || [];
    }
}
