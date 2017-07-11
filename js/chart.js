/**
 *
 * Author:Wilbert
 *   Date:2017/7/6
 */
define(["jquery","text!tpls/chart.html","echarts"],function ($,chartTpl,echarts) {
    return function () {

        var $chart=$(chartTpl);
        $(".menu-content-container").html($chart);

        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init($chart.find(".chart").get(0));

        $.get("/api/teacher",function(res){

            var data=res.result;

            //初始化一个存放数据的容器
            var genderArray=[
                {name:"男",value:0},
                {name:"女",value:0},
            ];
            //存放男女数据
            data.forEach(function(v){
                if(v.tc_gender=="0"){
                    genderArray[0].value++;
                }else{
                    genderArray[1].value++;
                }

            });

            console.log(genderArray);

            var option = {

                //标题
                title:{
                    text:"讲师中男女比例",
                    subtext:"副标题"
                },
                //悬浮框
                tooltip: {
                    trigger: 'item',
                    //指定了悬浮框的内容
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                //图例
                legend: {
                    //show:false,       //图例是否可见
                    //指定对齐方式
                    orient: 'horizontal',
//            x: 'left',
                    right:50,        //右对齐
                    data:["男","女"],
                    textStyle:{
//                fontFamily:"宋体",
//                fontSize:30
                    }
                },
                //数据
                series: [
                    {
                        name:'访问来源',
                        type:'pie',         //type指定了图形的类型-->pie：饼图
                        radius: ['0', '70%'],     //分别制定了内外圆的半径
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '30',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        //数据
                        data:genderArray
                    }
                ]
            };



            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        })

    };
});