const SERVICECOLUMN = [
    {
        title: '允许接入服务',
        dataIndex: 'serviceName',
        key: 'serviceName',
        align: "center",
    },
    {
        title: '服务启用状态',
        dataIndex: 'serviceType',
        key: 'serviceType',
        align: "center",
        scopedSlots: { customRender: "serviceType" }
    },
    {
        title: '服务激活时间',
        dataIndex: 'activeTime',
        key: 'activeTime',
        align: "center",
    },
    {
        title: '接入人员',
        dataIndex: 'accessName',
        key: 'accessName',
        align: "center",
    },
    {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        scopedSlots: { customRender: 'action' },
    }
]

export { SERVICECOLUMN }
