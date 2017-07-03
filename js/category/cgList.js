//课程分类列表
define(["jquery",
 "text!tpls/categoryList.html", 
 "arttemplate",
 "category/cg-edit",
 "category/cg-add"
 ], function ($, categoryListTpl, art,edit,add) {
  return function () {
    // categoryListTpl
    $.get("api/category", {}, function (res) {
      // console.log(res.result);
      if(res.code!=200) throw new Error(res.msg);
      var categoryList = art.render(categoryListTpl, res);
      var $categoryList = $(categoryList)
        .on("click", ".btn-edit", function () {
          //编辑分类
         var cg_id=$(this).parent().attr("cg_id");
          edit(cg_id);
        })
        .on("click",".categoryAdd",function (){
           add();
      })
      $(".menu-content-container").empty().append($categoryList);
    })
  }
})