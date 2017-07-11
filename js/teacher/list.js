//讲师列表
define(["jquery", "text!tpls/teacherList.html", "arttemplate","teacher/look","teacher/add","teacher/edit"], function ($, teacherListTpl, art,look,add,edit) {
  // console.log(teacherListTpl)导入的字符串;
  //art art接受了arttemplate的返回值;
  return function () {
    //3个参数: url  data    success
    $.get("/api/teacher", {}, function (res) {
      
      // console.log(res);
      //数据
      //  if(res.code ==200){
      //    //数据加载表格中;

      //  }else{
      //    //异常
      //    throw new Error(res.msg);
      //  }
      if (res.code !== 200) throw new Error(res.msg);
      //到这里说明数据返回了.优化后少了if语句;
      var teacherList = art.render(teacherListTpl, res);
      //将字符串转换为dom,把该dom放到body中之前给该对象注册事件,$(字符串)把该字符串变成一个jquery对象,用变量接收它,因为每写一次$(字符串)都创造了新的对象;
      var newteacher = $(teacherList);
      newteacher
      .on("click", ".btn-status", function () {
        //  alert("修改用户状态");       
        var $btn = $(this);
        var data = {
          tc_id: $(this).parent().attr("tc_id"),
          tc_status: $(this).parent().attr("tc_status")
        };
        $.post("api/teacher/handle", data, function (res) {
          if (res.code != 200) throw new Error(res.msg);
          //获取更新后的状态值;
          var tc_status = res.result.tc_status;
          //1修改页面文本
          $btn.text(tc_status == 0 ? "注销" : "启用");
          //2.修改传入的数据,
          $btn.parent().attr("tc_status", tc_status);
          //3.修改状态页面文本
          $btn.parent().siblings(".td-status").text(tc_status == 0 ? "启用" : "禁用")
          //刷新列表
          $(".aside .list-group button.btn-teacher").trigger("click");
        });
          //查看用户信息
      })
      .on("click",".btn-look",function (){
          var tc_id= $(this).parent().attr("tc_id");
           look(tc_id);
          $(".aside .list-group button.btn-teacher").trigger("click");            

      })
      .on("click",".teacherAdd",function (){
           add();
      })
      .on("click",".btn-edit",function (){
          var tc_id= $(this).parent().attr("tc_id");
          edit(tc_id);
      })
      //传入字符串,通过模板引擎的方法将对象信息填上去;
      $(".menu-content-container").empty().append(newteacher);
      //清空内容,再追加.不能用html的原因是:html(字符串)是创建了新的对象替换到内容里去.此对象就不是原来绑定了事件的那个对象了.
    });
  }
})