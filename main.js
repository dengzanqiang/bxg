//main require导入页;
require.config({
    baseUrl: "js",
    paths: {
        jquery: "lib/jquery-2.1.4",
        cookie: "lib/jquery.cookie",
        bootstrap: "../assets/bootstrap/js/bootstrap",
        imgUpload:"../assets/uploadify/jquery.uploadify",
        ueditorConfig:"../assets/ueditor/ueditor.config",
        ueditorAll:"../assets/ueditor/ueditor.all",
        ueditorlang:"../assets/ueditor/lang/zh-cn/zh-cn",
        zeroClipboard:"../assets/ueditor/third-party/zeroclipboard/ZeroClipboard",
        datetimepicker: "../assets/bootstrap-datetimepicker-master/js/bootstrap-datetimepicker",
        list:"teacher/list",
        cgList:"category/cgList",
        courseList:"course/courseList",
        text:"lib/text",
        tpls:"../tpls",
        arttemplate:"lib/template-web",
        chart:"chart",
        echarts:'lib/echarts.min'
    },
    shim: {
        bootstrap: {
            deps: ["jquery"]
        },
        imgUpload:{
            deps: ["jquery"]
        }
    }
})

require(["jquery",
"list",
"cgList",
"courseList",
"course/add",
"courseTime/list",
"common/personal",
"common/api",
"chart",
"ueditorlang",
"echarts",
"cookie", "bootstrap","datetimepicker"],
function ($,teacherlist,cgList,courseList,courseAdd,courseTimeList,personal,api,chart) {
    //设置AJAX的全局默认选项
$.ajaxSetup( {
    url: "/index.html" , // 默认URL
    aysnc: false , // 默认同步加载
    type: "POST" , // 默认使用POST方式
    headers: { // 默认添加请求头
        "Author": "CodePlayer" ,
        "Powered-By": "CodePlayer"
    } ,
    error: function(jqXHR, textStatus, errorMsg){ // 出错时默认的处理函数
        // jqXHR 是经过jQuery封装的XMLHttpRequest对象
        // textStatus 可能为： null、"timeout"、"error"、"abort"或"parsererror"
        // errorMsg 可能为： "Not Found"、"Internal Server Error"等

        // 提示形如：发送AJAX请求到"/index.html"时出错[404]：Not Found
        alert( '发送AJAX请求到"' + this.url + '"时出错[' + jqXHR.status + ']：' + errorMsg );        
    },
    beforeSend:function (){
        $(".zombie-panel").addClass("cover")
    }
    ,
    complete:function (jqXHR,code){
        console.log(jqXHR);
        $(".zombie-panel").removeClass("cover")
    }
} );




    //0.退出登陆页面
    
        $(".link-out").on('click', function () {
            //1服务器退出
            api.post("logout",{},function (){
                //2删除cookie
                $.removeCookie('userInfo');
                //3退出页面进入login页面
                 location.href = "login.html";
            })
    });

    //1登录页面
    var userInfoStr = $.cookie("userInfo");
    // console.log(userInfoStr);
    if (!userInfoStr) {
        location.href = "login.html";
    }
    var userInfo = JSON.parse(userInfoStr);
    // console.log(userInfo);
    // console.log(userInfo.tc_avatar);
    //2.更新页面头像
    $(".profile-container .img-circle").attr("src", userInfo.tc_avatar);
    $(".profile-container .text-center").text(userInfo.tc_name);
    //3.实现菜单栏的切换
    $(".aside .list-group").on("click","button", function () {
                    //通过事件委托,给每个按钮注册点击事件;
          $(this).addClass("active").siblings().removeClass("active");
        if ($(this).hasClass("btn-teacher")) {
            teacherlist();//教师管理
        } else if ($(this).hasClass("btn-course")) {
            courseList();//课程管理
        } else if ($(this).hasClass("btn-cours-category")) {
            cgList();//课程分类
        } else if ($(this).hasClass("btn-chart")) {
            chart();//图表统计;
        }
    });
    
    //4.触发讲师管理的点击事件,属性页面默认来点击;
    $(".aside .list-group button.btn-teacher").trigger("click");
    //5课程管理
    //5.1:创建课程
    $(".btn-add-course").on('click', function () {
        courseAdd();
    });
    //6:编辑课程管理
    $(".btn-course-time").on("click",function(){
        
        var cs_id=$(this).attr("cs_id");
        //课时管理
        courseTimeList(cs_id);
    })
    //7://个人中心
    $(".link-personal").on("click",function(){
        personal();
    })
})