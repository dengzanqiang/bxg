define([
  'jquery',
  'text!tpls/courseAdd.html',
  'arttemplate',
  "common/api"
], function($,courseAddTpl,art,api) {
   return function(){
      $("#modalCourseAdd").remove();
    //链式编程,导入模态框字符串,创建一个jquery的Dom对象,添加到body,调用模态框方法.
    //添加到body之前链式编程给对象的子元素form注册submit事件,在事件内部发送ajax请求,将表单数据发送
    //post请求,实现添加的效果,在回调函数中,也就是请求成功后关闭模态框,并用tigger方法刷新该子页面.
    var courseAdd = $(courseAddTpl)
      .on("submit","form",function (){
      var formdata =$(this).serialize();
      console.log(formdata);
       api.post("course/create",formdata,function (res){
          courseAdd.modal("hide");
          $(".aside .list-group button.btn-course").trigger("click");
       })
       return false;
    }).appendTo("body").modal();
      
   }
});