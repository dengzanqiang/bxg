/**
 * 个人中心模块
 * Author:Wilbert
 *   Date:2017/7/4
 */
define(["jquery","text!tpls/personal.html","common/api","arttemplate","bootstrap","ueditorConfig","ueditorAll","ueditorlang"],function ($,personalTpl,api,art) {
    return function () {

       api.get("teacher/profile",{},function(res){
           $("#modalPersonal").remove();

           var personal=art.render(personalTpl,res.result);
           $.getJSON("/js/city.json",function (cityjson){
                 //获取省的数据
         var $personal= $(personal)
           .on("submit","form",function(){
               var formData=$(this).serialize();
               api.post("teacher/modify",formData,function(){
                   //刷新页面
                   location.href="index.html";
                   
               })
               return false;
           })
           .on("change",".province",function (){
               var $province=$(this).val();
                // 每次追加前清空当前的option标签;
                  $(".city").empty();
                //2然后通过省的值设置市的值;
                 for(var city in cityjson[$province].data){
                 $personal.find(".city").append("<option>"+city+"</option>")
                //  console.log(city);
                };
             $("#modalPersonal .city").trigger("change");
           })
            .on("change",".city",function (){
                var province= $personal.find(".province").val();
                var $city=$(this).val();
                // alert($(this).val());
                //每次追加前清空当前的option标签;
                  $(".area").empty();
                //3再通过市的值设置区县的值;
                   for(var area in cityjson[province].data[$city].data){
                 $personal.find(".area").append("<option>"+area+"</option>")
                };
           })
           .appendTo("body").modal();

                // 1通过json数据获取省的值,
                 for(var province in cityjson){
                 $personal.find(".province").append("<option>"+province+"</option>"
                 )
             };
             $("#modalPersonal .province").trigger("change");

             $personal.on("hidden.bs.modal",function (){
                 ue.destroy()
             })

            //初始化富文本编辑器
               UE.delEditor('introduce');
               var ue = UE.getEditor('introduce');
               ue.ready(function(){
                   ue.setContent(res.result.tc_introduce);
               })          
          });
       })
    };
});