//课程编辑

define(["jquery", "text!tpls/categoryEdit.html", "arttemplate", "bootstrap"], function ($, categoryEditTpl, art) {
  return function (cg_id) {

    $("#modalEditCategory").remove(); //删除,防止创建多个;
    // console.log(teacherAddTpl);
    $.get("api/category/edit", {
      cg_id:cg_id
    }, function (res) {
      if (res.code != 200) throw new Error(res.msg);
      console.log(res);
      var result =res.result;
      console.log(result);
      var categoryEdit = art.render(categoryEditTpl,{result:result});
      var $categoryEdit = $(categoryEdit)
        .on("submit", "form", function () {
          var formData = $(this).serialize();
            console.log(formData);
          $.post("api/category/modify", formData, function (res) {
            if (res.code !== 200) throw new Error(res.msg);
            $categoryEdit.modal("hide");
            $(".aside .list-group button.btn-cours-category").trigger("click");
          })

          return false;
        })
        .appendTo("body").modal();
    })
  }
})