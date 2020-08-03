// @ts-ignore
import Mock from 'mockjs';
import {SysAppInfo} from '@/entity/domain/SysAppInfo';
import {SysMenuInfo} from '../entity/domain/SysMenuInfo';
const apps: any[] = [] ;
const userList = {
    code: '1',
    msg: '操作成功',
    data: apps,
};
export default {
    'get|/selectAppList': userList
};
