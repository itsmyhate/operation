export var ceshi =  [];

export function drawEcharts(body: any[], element1: string, element2: string, element3: string) {
    var defaultPlatform = body[0].appList;
    var defaultUseTime = body[0].appList;
    console.log(1)
    console.log(body[0].appList[0].tenantList)
    console.log(2)
    ceshi = body[0].appList[0].tenantList;
    var chooseName = '';
    console.log(body[0].appList)

    /**
     * 绘制产品饼图
     * @param info
     * @param element
     */
    function drawEchart1(info: any[], element: string) {
        var echarts = require('echarts');
        var dom = document.getElementById(element);
        var myChart = echarts.init(dom);
        var sum = 0;
        var pdname = new Array();
        var productInfo = new Array();
        for (let i = 0; i < info.length; i++) {
            sum += info[i].tenantCount;
            productInfo[i]= {
                value: info[i].tenantCount,
                name: info[i].appBusiType
            };
            pdname[i] = info[i].appBusiType
        }
        myChart.setOption({
            tooltip: {
                trigger: 'item',
                formatter: " {b}：{c}家 "
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
            },
            //环形颜色
            color: ['#FFC48A', '#7DD3E1', '#F67A7A', '#4690FF', '#D0A5FA', '#FFDB5C'],
            //图形中间文字
            graphic: {
                type: "text",
                left: "center",
                top: "center",
                style: {
                    text: sum + "家\r\n租户",
                    textAlign: "center",
                    fill: "#000000",
                    fontSize: 18
                }
            },
            series: [
                {
                    name: '',
                    type: 'pie',
                    //饼图大小
                    radius: ['30%', '50%'],
                    //图形外文字线
                    labelLine: {
                        normal: {
                            length: 0,
                            length2: 0
                        }
                    },
                    label: {
                        normal: {
                            //图形外文字上下显示
                            formatter: '',
                            //文字和图的边距
                            padding: [-20, -120, 0, -140],
                            rich: {
                                a: {
                                    color: '#333',
                                    fontSize: 33,
                                    lineHeight: 20
                                },
                                b: { //name 文字样式
                                    fontSize: 14,
                                    lineHeight: 30,
                                    color: '#000000'
                                },
                                c: { //value 文字样式
                                    fontSize: 20,
                                    lineHeight: 30,
                                    align: "center"
                                }
                            }
                        }
                    },
                    data: productInfo
                }
            ],
            legend: {
                orient: 'vertical',
                // x: 'right',
                y: 'center',
                left: 600,
                data: pdname,
                icon: "circle",
                fontSize: 16,
                formatter: function (name: string) {
                    let target;
                    for (let i = 0; i < productInfo.length; i++) {
                        if (productInfo[i].name === name) {
                            target = productInfo[i].value;
                        }
                    }
                    ;
                    let arr = ["{a|" + name + "}  |  {b|" + Number((target / sum).toFixed(2)) * 100 + "}%    {b|" + target + "} 家"]
                    return arr.join("\n")
                },
                textStyle: {
                    rich: {
                        a: {
                            fontSize: 14,
                            padding: 10
                        },
                        b: {
                            fontSize: 14,
                        }
                    }
                }
            }
        });
        myChart.on('legendselectchanged', function (params: any) {
            // 获取点击图例的选中状态
            var isSelected = params.selected[params.name];

            chooseName = params.name;
            var choseData = [];
            for(let i=0;i<info.length;i++){
                if(info[i].appBusiType === params.name){
                    choseData = info[i].appList;
                    ceshi = choseData[i].tenantList;
                }
            }
            console.log('如下是表格的数据：');
            renderTab();
            drawEchart2(choseData, 'ec2');
            drawLineChart(choseData, 'ec3');
            if (isSelected === false){
                myChart.dispatchAction({
                    type: 'legendToggleSelect',
                    name: params.name
                });
            }
            myChart.dispatchAction({
                type: 'pieToggleSelect',
                name: params.name
            });
            return ceshi;
        });
    }

    /**
     * 绘制产品下平台的饼图
     * @param info
     * @param element
     */
    function drawEchart2(info: any[], element: string) {
        var echarts = require('echarts');
        var dom = document.getElementById(element);
        var myChart = echarts.init(dom);
        var sum = 0;
        var pdname = new Array();
        var productInfo = new Array();
        for (let i = 0; i < info.length; i++) {
            sum += info[i].appCount;
            productInfo[i]= {
                value: info[i].appCount,
                name: info[i].appName
            };
            pdname[i] = info[i].appName
        }
        myChart.setOption({
            tooltip: {
                trigger: 'item',
                formatter: " {b}：{c} "
            },
            //环形颜色
            color: ['#F67A7A', '#FFAE9E', '#90BCFF', '#FA9BBB', '#D0A5FA', '#FFDB5C'],
            //图形中间文字
            graphic: {
                type: "text",
                left: "center",
                top: "center",
                style: {
                    text: sum + "家\r\n租户",
                    textAlign: "center",
                    fill: "#000000",
                    fontSize: 18
                }
            },
            series: [
                {
                    name: '',
                    type: 'pie',
                    //饼图大小
                    radius: ['30%', '50%'],
                    //图形外文字线
                    labelLine: {
                        normal: {
                            length: 15,
                            length2: 130
                        }
                    },
                    label: {
                        normal: {
                            //图形外文字上下显示
                            formatter: ' {c|{c}%} {b|{b}}',
                            borderWidth: 20,
                            borderRadius: 4,
                            //文字和图的边距
                            padding: [-20, -120, 0, -140],
                            rich: {
                                a: {
                                    color: '#333',
                                    fontSize: 33,
                                    lineHeight: 20
                                },
                                b: { //name 文字样式
                                    fontSize: 14,
                                    lineHeight: 30,
                                    color: '#000000'
                                },
                                c: { //value 文字样式
                                    fontSize: 20,
                                    lineHeight: 30,
                                    align: "center"
                                }
                            }
                        }
                    },
                    data: productInfo
                }
            ]
        });
    }

    /**
     * 线图
     * @param userInfo
     * @param element
     */
    function drawLineChart(info: any[], element: string) {
        var echarts = require('echarts');
        var dom = document.getElementById(element);
        var myChart = echarts.init(dom);
        var value = [];
        var name = [];
        var userInfo = [];
        for (let i = 0; i < info.length; i++) {
            userInfo[i] = {
                value: info[i].appUseTime,
                name: info[i].appName
            }
            value[i] = info[i].appUseTime;
            name[i] = info[i].appName
        }
        var option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                top: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0],
            },
            yAxis: {
                type: 'category',
                data: name,//['巴西', '印尼', '美国', '印度', '(业务类型)\r\n中国'],
                splitLine: {
                    show: false
                },
            },
            series: [
                {
                    name: '2011年',
                    type: 'bar',
                    barWidth: 20,
                    color: '#80D4FF',
                    data: value//[183, 239, 4, 1070, 1744]
                }
            ]
        };
        myChart.setOption(option);
    }

    drawEchart1(body, element1);
    drawEchart2(defaultPlatform, element2);
    drawLineChart(defaultUseTime, element3);
}

export function renderTab() {
    console.log(ceshi);
    return ceshi;
}










/**
 * echary 绘制产品下各平台的饼图
 * @param productInfo 产品信息，包括value和name
 * @param element 选中div，即在何处画
 * @author fanke
 */
export function drawEchart(productInfo:  any[], element: string) {
    var echarts = require('echarts');
    var dom = document.getElementById(element);
    //var dom = document.getElementsByName(element)
    var myChart = echarts.init(dom);
    var sum = 0;
    for(let i=0;i<productInfo.length;i++) {
        sum += productInfo[i].value;
    }
    if(element === 'ec1') {
        myChart.setOption( {
            tooltip: {
                trigger: 'item',
                formatter: " {b}：{c}家 "
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
            },
            //环形颜色
            color: ['#FFC48A', '#7DD3E1', '#F67A7A', '#4690FF', '#D0A5FA', '#FFDB5C'],
            //图形中间文字
            graphic: {
                type: "text",
                left: "center",
                top: "center",
                style: {
                    text: sum + "家\r\n租户",
                    textAlign: "center",
                    fill: "#000000",
                    fontSize: 18,
                }
            },
            series: [
                {
                    name: '',
                    type: 'pie',
                    //饼图大小
                    radius: ['30%', '50%'],
                    //图形外文字线
                    labelLine: {
                        normal: {
                            length: 0,
                            length2: 0
                        }
                    },
                    label: {
                        normal: {
                            //图形外文字上下显示
                            formatter: '',
                            //文字和图的边距
                            padding: [-20, -120, 0, -140],
                            rich: {
                                a: {
                                    color: '#333',
                                    fontSize: 33,
                                    lineHeight: 20
                                },
                                b: { //name 文字样式
                                    fontSize: 14,
                                    lineHeight: 30,
                                    color: '#000000'
                                },
                                c: { //value 文字样式
                                    fontSize: 20,
                                    lineHeight: 30,
                                    align: "center"
                                }
                            }
                        }
                    },
                    data: productInfo
                }
            ],
            legend: {
                orient: 'vertical',
                // x: 'left',
                y: 'center',
                right: 10,
                data: ['银行产品', '信托产品', '租赁产品', '其他产品'],
                icon:"circle",
                fontSize: 16,
                formatter:function(name: string){
                    let target;
                    for(let i=0;i<productInfo.length;i++){
                        if(productInfo[i].name===name){
                            target=productInfo[i].value;
                        }
                    };
                    //let arr=["{a|"+target+"}","{b|"+name+"}"];

                    let arr = ["{a|" + name + "}  |  {b|" + Number((target/sum).toFixed(2))*100 + "}%    {b|" + target + "} 家"]
                    return arr.join("\n")
                },
                textStyle:{
                    rich:{
                        a:{
                            fontSize:14,
                            padding:10
                        },
                        b:{
                            fontSize:14,
                        }
                    }
                }
            }
        });
    }
    if(element === 'ec2') {
        myChart.setOption({
            tooltip: {
                trigger: 'item',
                formatter: " {b}：{c} "
            },
            //环形颜色
            color: ['#F67A7A', '#FFAE9E', '#90BCFF', '#FA9BBB', '#D0A5FA', '#FFDB5C'],
            //图形中间文字
            graphic: {
                type: "text",
                left: "center",
                top: "center",
                style: {
                    text: sum + "家\r\n租户",
                    textAlign: "center",
                    fill: "#000000",
                    fontSize: 18
                }
            },
            series: [
                {
                    name: '',
                    type: 'pie',
                    //饼图大小
                    radius: ['30%', '50%'],
                    //图形外文字线
                    labelLine: {
                        normal: {
                            length: 15,
                            length2: 130
                        }
                    },
                    label: {
                        normal: {
                            //图形外文字上下显示
                            formatter: ' {c|{c}%} {b|{b}}',
                            borderWidth: 20,
                            borderRadius: 4,
                            //文字和图的边距
                            padding: [-20, -120, 0, -140],
                            rich: {
                                a: {
                                    color: '#333',
                                    fontSize: 33,
                                    lineHeight: 20
                                },
                                b: { //name 文字样式
                                    fontSize: 14,
                                    lineHeight: 30,
                                    color: '#000000'
                                },
                                c: { //value 文字样式
                                    fontSize: 20,
                                    lineHeight: 30,
                                    align: "center"
                                }
                            }
                        }
                    },
                    data: productInfo
                }
            ]
        });
    }
    var triggerAction = function(action: any, selected: any) {
        let legend;
        legend = [];

        for (let name in selected) {
            if (selected.hasOwnProperty(name)) {
                legend.push({name: name});
            }
        }
        myChart.dispatchAction({
            type: action,
            batch: legend
        });
    };

    var isFirstUnSelect = function(selected: any) {

        var unSelectedCount = 0;
        for (let name in selected) {
            if (!selected.hasOwnProperty(name)) {
                continue;
            }

            if (selected[name] == false) {
                ++unSelectedCount;
            }
        }
        return unSelectedCount==1;
    };

    var isAllUnSelected = function(selected: any) {
        var selectedCount = 0;
        for (let name in selected) {
            if (!selected.hasOwnProperty(name)) {
                continue;
            }

            // 所有 selected Object 里面 true 代表 selected， false 代表 unselected
            if (selected[name] == true) {
                ++selectedCount;
            }
        }
        return selectedCount==0;
    };
    myChart.on('legendselectchanged', function(obj: any) {
        var selected = obj.selected;
        var legend = obj.name;
        // 使用 legendToggleSelect Action 会重新触发 legendselectchanged Event，导致本函数重复运行
        // 使得 无 selected 对象
        if (selected != undefined) {
            if (isFirstUnSelect(selected)) {
                triggerAction('legendToggleSelect', selected);
            } else if (isAllUnSelected(selected)) {
                triggerAction('legendSelect', selected);
            }
        }
    });

}

/**
 * 绘制产品饼图
 * @param userInfo
 * @param element
 */
export function drawLineChart(userInfo: any[],element: string) {
    var echarts = require('echarts');
    var dom = document.getElementById(element);
    var myChart = echarts.init(dom);
    var value = [];
    var name = [];
    for(let i=0;i<userInfo.length;i++) {
        value[i] = userInfo[i].value;
        name[i] = userInfo[i].name;
    }
    var option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            top: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0],
        },
        yAxis: {
            type: 'category',
            data: name,//['巴西', '印尼', '美国', '印度', '(业务类型)\r\n中国'],
            splitLine: {
                show: false
            },
        },
        series: [
            {
                name: '2011年',
                type: 'bar',
                barWidth: 20,
                color: '#80D4FF',
                data: value//[183, 239, 4, 1070, 1744]
            }
        ]
    };
    myChart.setOption(option);
}
