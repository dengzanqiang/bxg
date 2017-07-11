/**
 *
 * Author:Wilbert
 *   Date:2017/7/3
 */
define(["jquery","text!courseTime/courseTimeList.html","common/api","courseTime/timeedit","arttemplate"],function ($,courseTimeListTpl,api,edit,art) {
    return function (cs_id) {
        api.get("course/lesson",{cs_id:cs_id},function(res){
            var courseTimeList=art.render(courseTimeListTpl,res.result);

            var $courseTimeList =$(courseTimeList).on("click",".btn-edit",function (){
                //编辑课时模块
                var ct_id =$(this).parent().attr("ct_id");
                edit(ct_id);
                
            })

            $(".menu-content-container").html($courseTimeList);
        });


    };
});