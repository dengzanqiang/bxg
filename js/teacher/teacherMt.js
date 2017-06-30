//查看教师详细信息模态框;
define(["jquery", "text!tpls/teacherMt.html", "arttemplate","bootstrap"],function ($,teacherMtTpl,art){
    return function(tc_id){

        // $("#modalTeacherInfo").modal("body");
        $.get("api/teacher/view",{tc_id},function (res){
              console.log(teacherMtTpl);
              var resobj=res.result;
             var teacherShowInfo = art.render(teacherMtTpl,resobj);
             console.log(teacherShowInfo);
           var teacherMtShow =  $(teacherShowInfo);
                teacherMtShow.appendTo("body");
                $("#modalTeacherInfo").modal();
        })
    }
})