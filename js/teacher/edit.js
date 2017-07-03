//添加讲师

define(["jquery","text!tpls/teacherEdit.html","arttemplate","bootstrap"],function ($,teacherEditTpl,art){
    return function(tc_id){
   $("#modalEditTeacher").remove();//删除,防止创建多个;
      // console.log(teacherAddTpl);
       $.get("api/teacher/edit",{tc_id},function (res){
           if(res.code!=200) throw new Error(res.msg);
            var teacherEdit = art.render(teacherEditTpl,res.result);

        var $teacherEdit= $(teacherEdit)
          .on("submit","form",function (){
          var formData = $(this).serialize();
        //   console.log(formData);
          $.post("api/teacher/update",formData,function (res){
            if(res.code !==200) throw new Error(res.msg);
            $teacherEdit.modal("hide");
            $(".aside .list-group button.btn-teacher").trigger("click");
          })

          return false;
      })

        .appendTo("body").modal();
       })
     
         
         
         
      

    }
})