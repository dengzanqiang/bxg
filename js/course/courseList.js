define([
  'jquery',
  'text!tpls/courseList.html',
  'arttemplate',
  'common/api',
  'course/BasinEdit',
  'course/imgUpload'
], function ($, courseListTpl, art, api,BasinEdit,imgUpload) {
  return function () {
    api.get("course", {}, function (res) {
      var courseList = art.render(courseListTpl, res);
      var $courseList = $(courseList)
        .on("click", ".btn-edit-time", function () {
          var cs_id = $(this).parent().attr("cs_id");
          //进入课时管理模块
          $(".aside .list-group button.btn-course-time").attr("cs_id", cs_id).trigger("click");
        })
        .on("click", ".btn-edit-info", function(){
                 //触发基本课程基本信息按钮
              var cs_id = $(this).parent().attr("cs_id");
              BasinEdit(cs_id);
        })
        .on("click",".imgupload",function (){
          //图片上传模块
          var cs_id = $(this).parent().attr("cs_id");
            imgUpload(cs_id);
        })



      $(".menu-content-container").html($courseList);
    });

  }
});