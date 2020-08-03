// @ts-ignore
import Mock from "mockjs";

const tenantschartdata = {
    code: "1",
    msg: "操作成功",
    data: [
        {
            appBusiType: "贷款产品",
            tenantCount: 16,
            appList: [
                {
                    appName: "平台1",
                    appCount: 100,
                    appUseTime: 1000,
                    tenantList: [
                        {
                            tenName: "张三",
                            tenUseTime: 1000,
                            userCount: 100
                        },
                        {
                            tenName: "李四",
                            tenUseTime: 1000,
                            userCount: 100
                        },
                        {
                            tenName: "王五",
                            tenUseTime: 1000,
                            userCount: 100
                        },
                    ]
                },
                {
                    appName: "平台2",
                    appCount: 100,
                    appUseTime: 1000,
                    tenantList: [
                        {
                            tenName: "张三",
                            tenUseTime: 1000,
                            userCount: 100
                        }
                    ]
                },
                {
                    appName: "平台3",
                    appCount: 100,
                    appUseTime: 1000,
                    tenantList: [
                        {
                            tenName: "张三",
                            tenUseTime: 1000,
                            userCount: 100
                        }
                    ]
                },
                {
                    appName: "平台4",
                    appCount: 100,
                    appUseTime: 1000,
                    tenantList: [
                        {
                            tenName: "张三",
                            tenUseTime: 1000,
                            userCount: 100
                        }
                    ]
                },
            ]
        },
        {
            appBusiType: "银行产品",
            tenantCount: 36,
            appList: [
                {
                    appName: "平台1",
                    appCount: 100,
                    appUseTime: 1000,
                    tenantList: [
                        {
                            tenName: "张三",
                            tenUseTime: 1000,
                            userCount: 100
                        }
                    ]
                },
                {
                    appName: "平台2",
                    appCount: 100,
                    appUseTime: 1000,
                    tenantList: [
                        {
                            tenName: "张三",
                            tenUseTime: 1000,
                            userCount: 100
                        }
                    ]
                },
                {
                    appName: "平台3",
                    appCount: 100,
                    appUseTime: 1000,
                    tenantList: [
                        {
                            tenName: "张三",
                            tenUseTime: 1000,
                            userCount: 100
                        }
                    ]
                },
                {
                    appName: "平台4",
                    appCount: 100,
                    appUseTime: 1000,
                    tenantList: [
                        {
                            tenName: "张三",
                            tenUseTime: 1000,
                            userCount: 100
                        }
                    ]
                },
            ]
        },
        {
            appBusiType: "信托产品",
            tenantCount: 22,
            appList: [
                {
                    appName: "平台1",
                    appCount: 100,
                    appUseTime: 1000,
                    tenantList: [
                        {
                            tenName: "张三",
                            tenUseTime: 1000,
                            userCount: 100
                        }
                    ]
                },
                {
                    appName: "平台2",
                    appCount: 100,
                    appUseTime: 1000,
                    tenantList: [
                        {
                            tenName: "张三",
                            tenUseTime: 1000,
                            userCount: 100
                        }
                    ]
                },
                {
                    appName: "平台3",
                    appCount: 100,
                    appUseTime: 1000,
                    tenantList: [
                        {
                            tenName: "张三",
                            tenUseTime: 1000,
                            userCount: 100
                        }
                    ]
                },
                {
                    appName: "平台4",
                    appCount: 100,
                    appUseTime: 1000,
                    tenantList: [
                        {
                            tenName: "张三",
                            tenUseTime: 1000,
                            userCount: 100
                        }
                    ]
                },
            ]
        },
    ]
}

export default {
    "get|/initCharts": tenantschartdata
}
