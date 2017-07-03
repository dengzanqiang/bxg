//main require导入页;
require.config({
    baseUrl: "js",
    paths: {
        jquery: "lib/jquery-2.1.4",
        cookie: "lib/jquery.cookie",
        bootstrap: "../assets/bootstrap/js/bootstrap",
        datetimepicker: "../assets/bootstrap-datetimepicker-master/js/bootstrap-datetimepicker",
        list:"teacher/list",
        cgList:"category/cgList",
        text:"lib/text",
        tpls:"../tpls",
        arttemplate:"lib/template-web"
    },
    shim: {
        bootstrap: {
            deps: ["jquery"]
        }
    }
})

require(["jquery","list","cgList","cookie", "bootstrap","datetimepicker"], function ($,teacherlist,cgList) {
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
            teacherlist();
        } else if ($(this).hasClass("btn-course")) {
            $(".menu-content-container").html("<h1 style='margin:0'>课程管理</h1>")
        } else if ($(this).hasClass("btn-cours-category")) {
            cgList();
        } else if ($(this).hasClass("btn-chart")) {
            $(".menu-content-container").html("<h1 style='margin:0'>图表统计</h1>")
        }
    });
    //4.触发讲师管理的点击事件,属性页面默认来点击;
    $(".aside .list-group button.btn-teacher").trigger("click");

})