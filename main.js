//main require导入页;
require.config({
    baseUrl: "js",
    paths: {
        jquery: "lib/jquery-2.1.4",
        cookie: "lib/jquery.cookie",
        bootstrap: "../assets/bootstrap/js/bootstrap",
        imgUpload:"../assets/uploadify/jquery.uploadify",
        datetimepicker: "../assets/bootstrap-datetimepicker-master/js/bootstrap-datetimepicker",
        list:"teacher/list",
        cgList:"category/cgList",
        courseList:"course/courseList",
        text:"lib/text",
        tpls:"../tpls",
        arttemplate:"lib/template-web"
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
"cookie", "bootstrap","datetimepicker"],
function ($,teacherlist,cgList,courseList,courseAdd,courseTimeList) {
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
            $(".menu-content-container").html("<h1 style='margin:0'>图表统计</h1>");//图表统计;
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


})