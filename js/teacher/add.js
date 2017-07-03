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
                    $teacherAdd.modal("hide");
                    $(".aside .list-group button.btn-teacher").trigger("click");
                })

                return false;
            })
            .appendTo("body").modal();

        $teacherAdd.find('.datetimepicker').datetimepicker({
                weekStart:1,//一周从哪一天开始。0（星期日）到6（星期六）
                format: 'yyyy-mm-dd',
                //daysOfWeekDisabled:[0,1,2]  //指定周几不能使用
                autoclose:true,
                minView:"month",
                todayBtn:true,
                todayHighlight:true,
                language:"zh-CN"
        });

    }
})