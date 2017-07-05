define([
  'jquery',
  'text!tpls/courseTimeEdit.html',
  'common/api',
  'arttemplate'
], function ($,courseTimeEditTpl, api, art) {
  return function (ct_id) {
    // console.log("编辑课时模块");
    api.get("course/chapter/edit", {ct_id:ct_id}, function (res) {
      console.log("编辑课时模块数据成功");
      var courseTimeEdit = art.render(courseTimeEditTpl,res.result);
     var $courseTimeEdit=$(courseTimeEdit).on("submit","form",function (){
        var formdata =$(this).serialize();
        api.post("course/chapter/modify",formdata,function (){
           alert("修改课时成功");
        var courseTimeList = require("courseTime/list");
                   //课时管理  相当于点击课程管理页面下的编辑课时;
           var cs_id = res.result.ct_cs_id 
                  //  alert(cs_id);
                  courseTimeList(cs_id);
            $courseTimeEdit.modal("hide");
        });
        return false;
      })
      .appendTo("body").modal();
    });
  }
});