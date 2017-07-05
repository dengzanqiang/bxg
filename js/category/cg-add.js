define([
  'jquery',
  "arttemplate",
  "text!tpls/categoryAdd.html",
  "common/api"
], function ($,art, categoryAddTpl,api) {
  return function () {
    
    $("#categoryAddbtn").remove();
    api.get("category/top",{},function (res) {
      console.log(res);
      var categoryAdd = art.render(categoryAddTpl,res);
     var $categoryAdd= $(categoryAdd)
      .on("submit","form",function () {
          var formdata = $(this).serialize();
          console.log(formdata);
          api.post("category/add",formdata, function () {
             $categoryAdd.modal("hide")
                    //刷新课程分类页面
             $(".aside .list-group button.btn-cours-category").trigger("click");
          })
          return false;
        }).appendTo("body").modal();
    })
  }
});