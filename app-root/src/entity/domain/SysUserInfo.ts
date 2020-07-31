export class SysUserInfo {
    public userId: string;
    public tenId: string;
    public deptId: string;
    public comId: string;
    public userName: string;
    public userPasswd: string;
    public userCardId: string;
    public userSex: string;
    public userBirthday: string;
    public userHeadImg: string;
    public userCode: string;
    public userPhone: string;
    public userWxOpenId: string;
    public userEamil: string;
    public userQqOpenId: string;
    public userDataSource: string;

    constructor(options: {
        userId: string,
        tenId: string,
        deptId: string,
        comId: string,
        userName: string,
        userPasswd: string,
        userCardId: string,
        userSex: string,
        userBirthday: string,
        userHeadImg: string,
        userCode: string,
        userPhone: string,
        userWxOpenId: string,
        userEamil: string,
        userQqOpenId: string,
        userDataSource: string,
    }) {
        this.userId = options.userId || '',
        this.tenId = options.tenId || '',
        this.deptId = options.deptId || '',
        this.comId = options.comId || '',
        this.userName = options.userName || '',
        this.userPasswd = options.userPasswd || '',
        this.userCardId = options.userCardId || '',
        this.userSex = options.userSex || '',
        this.userBirthday = options.userBirthday || '',
        this.userHeadImg = options.userHeadImg || '',
        this.userCode = options.userCode || '',
        this.userPhone = options.userPhone || '',
        this.userWxOpenId = options.userWxOpenId || '',
        this.userEamil = options.userEamil || '',
        this.userQqOpenId = options.userQqOpenId || '',
        this.userDataSource = options.userDataSource || '';
    }
}
