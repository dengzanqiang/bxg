define([
  'jquery',
  'arttemplate',
  "text!tpls/categoryAdd.html"
], function ($, art,categoryAddTpl) {
  return function (){
    // categoryAddbtn
    $(categoryAddTpl).appendTo("body").modal();
  }

});