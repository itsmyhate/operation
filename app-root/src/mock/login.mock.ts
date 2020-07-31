// @ts-ignore
import {SysAppInfo} from '@/entity/domain/SysAppInfo';
import Mock from 'mockjs';
import {SysMenuInfo} from '../entity/domain/SysMenuInfo';

const rootMenus: SysMenuInfo[] = [
    new SysMenuInfo({menuId: 'workbench', menuName: '工作台', menuIcon: '', menuUrl: '/root/workbench'}),
    new SysMenuInfo({menuId: 'app-collect', menuName: '应用管理', menuIcon: '', menuUrl: '/root/app-collect', }),
];
const userList = {
    code: '1',
    msg: '操作成功',
    data: {
        user: {
            username: Mock.mock('@cname()'),
            deptId: 'XXX部门',
        },
        token: {
            refreshToken: 'refreshToken',
            accessToken: 'token',
            expiresIn: 100000,
            time: new Date().getTime(),
        },
        rootMenus,
    }
};
export default {
    'post|/login': userList
};
