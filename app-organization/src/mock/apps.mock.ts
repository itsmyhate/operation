// @ts-ignore
import Mock from "mockjs";

const appList = {
    code: "1",
    msg: "操作成功",
    data: [
        {appName: 'appName', appType: 'appType', appUrl: 'appUrl', intUser:''},
        {appName: 'appName', appType: 'appType', appUrl: 'appUrl', intUser:''},
        {appName: 'appName', appType: 'appType', appUrl: 'appUrl', intUser:''},
        {appName: 'appName', appType: 'appType', appUrl: 'appUrl', intUser:''},
        {appName: 'appName', appType: 'appType', appUrl: 'appUrl', intUser:''},
    ]
};
export default {
    "get|/selectAppList": appList
};
