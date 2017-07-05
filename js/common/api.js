//ajax
//api.ajax("gie","url",{},function(res){})
define([
  'jquery',
], function($) {
  var obj = {
    ajax:function(type,url,data,callback){
      $[type]("api/"+url,data,function(res){
        if(res.code!=200) throw new Error(res.msg);
        callback && callback(res);
      });
    }
    // ,
    // get:function(url,data,callback){
    //   this.ajax("get",url,data,callback);
    // },
    // post:function (url,data,callback){
    //   this.ajax("post",url,data,callback);
    // }
  };
  var arr=["get","post"];
  arr.forEach(function (v,i){
    obj[v] = function (url,data,callback){
          this.ajax(v,url,data,callback);
    }
  })
  return obj;
});