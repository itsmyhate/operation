export function drawEcharts(body: any[], element1: string, element2: string, element3: string) {
    var defaultPlatform = body[0];
    var chooseName = '';
    /**
     * echary 绘制产品下各平台的饼图
     * @param productInfo 产品信息，包括value和name
     * @param element 选中div，即在何处画
     * @author fanke
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
                left: 650,
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
                    //let arr=["{a|"+target+"}","{b|"+name+"}"];

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
            // 在控制台中打印
            console.log((isSelected ? '选中了' : '取消选中了') + '图例' + params.name);
            chooseName = params;
            console.log('params' + JSON.stringify(params))
            // 打印所有图例的状态
            console.log(params.selected);
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
        });
    }

    function drawEchart2(info: any[], element: string) {
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
    }

    /**
     * 线图
     * @param userInfo
     * @param element
     */
    function drawLineChart(userInfo: any[], element: string) {
        var echarts = require('echarts');
        var dom = document.getElementById(element);
        var myChart = echarts.init(dom);
        var value = [];
        var name = [];
        for (let i = 0; i < userInfo.length; i++) {
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

    drawEchart1(body, element1);
    drawEchart2(defaultPlatform, element2);
    drawLineChart(body, element3);
}

