//添加讲师

define(["jquery", "text!tpls/teacherAdd.html", "bootstrap"], function ($, teacherAddTpl) {
    return function () {
        $("#modalAddTeacher").remove(); //删除,防止创建多个;
        // console.log(teacherAddTpl);
        //思路:绑定模板中,由form触发
        var $teacherAdd = $(teacherAddTpl).on("submit", "form", function () {
                var formData = $(this).serialize();

                console.log(formData);
                $.post("api/teacher/add", formData, function (res) {
                    if (res.code !== 200) throw new Error(res.msg);
                       alert("提交了")
                    // $teacherAdd.modal("hide");
                    // $(".aside .list-group button.btn-teacher").trigger("click");
                })

                return false;
            })
            .appendTo("body").modal();

        $('.datetimepicker').datetimepicker({
            format: 'yyyy-mm-dd',
            autoclose: true
        });

    }
})