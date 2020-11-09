import {SysAppInfo} from '@/entity/domain/SysAppInfo';
// @ts-ignore
import Mock from 'mockjs';
import {SysMenuInfo} from '../entity/domain/SysMenuInfo';

const rootMenus: SysMenuInfo[] = [
    new SysMenuInfo({menuId: 'workbench', menuName: '工作台', menuIcon: '', menuUrl: '/root/workbench'}),
    new SysMenuInfo({menuId: 'app-collect', menuName: '应用管理', menuIcon: '', menuUrl: '/root/app-collect', }),
];
const userList = {
    code: 200,
    msg: '操作成功',
    data: {
        sysUserInfo: {
            userName: Mock.mock('@cname()'),
            deptId: 'XXX部门',
        },
        refreshToken: 'refreshToken',
        accessToken: 'token',
        expiresIn: 100000,
        time: new Date().getTime(),
        rootMenus,
    }
};
export default {
    'post|/login': userList
};
