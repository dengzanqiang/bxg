define([
  'jquery',
  'text!tpls/courseBasinEdit.html',
  'arttemplate',
  'common/api'
], function ($, courseBasinEditTPL, art, api) {
  return function (cs_id) {
    // alert(courseBasinEditTPL);
    api.get("course/basic", {cs_id: cs_id}, function (res) {
      var courseBasinEdit = art.render(courseBasinEditTPL, res.result);
      var $courseBasinEdit = $(courseBasinEdit)
        .on("submit", "form", function () {
          var formdata = $(this).serialize();
          api.post("course/update/basic",formdata, function (res) {
            $(".aside .list-group button.btn-course").trigger("click");
          });
          return false;
        })
        .on("change", ".category-top", function () {
          // alert("绑定change事件");
          var topId = $(this).val();
          api.get("category/child", {cg_id: topId}, function (res) {
            var result = res.result;
            var str = "";
            result.forEach(function(v,i) {
              str+="<option value="+v.cg_id+" >"+v.cg_name+"</option>"
            });
              $courseBasinEdit.find(".category-child").html(str);
        })

        })
      $(".menu-content-container").html($courseBasinEdit);

    })


  }
});