﻿/**
 * jQuery EasyUI 1.4.5.x
 * 
 * Copyright (c) 2009-2016 www.jextjsui.com. All rights reserved.
 *
 * Licensed under the freeware license: http://www.jextjsui.com/license_freeware.php
 * To use it on other terms please contact us: info@jextjsui.com
 *
 */
(function($){
$.extjsui={indexOfArray:function(a,o,id){
for(var i=0,_1=a.length;i<_1;i++){
if(id==undefined){
if(a[i]==o){
return i;
}
}else{
if(a[i][o]==id){
return i;
}
}
}
return -1;
},removeArrayItem:function(a,o,id){
if(typeof o=="string"){
for(var i=0,_2=a.length;i<_2;i++){
if(a[i][o]==id){
a.splice(i,1);
return;
}
}
}else{
var _3=this.indexOfArray(a,o);
if(_3!=-1){
a.splice(_3,1);
}
}
},addArrayItem:function(a,o,r){
var _4=this.indexOfArray(a,o,r?r[o]:undefined);
if(_4==-1){
a.push(r?r:o);
}else{
a[_4]=r?r:o;
}
},getArrayItem:function(a,o,id){
var _5=this.indexOfArray(a,o,id);
return _5==-1?null:a[_5];
},forEach:function(_6,_7,_8){
var _9=[];
for(var i=0;i<_6.length;i++){
_9.push(_6[i]);
}
while(_9.length){
var _a=_9.shift();
if(_8(_a)==false){
return;
}
if(_7&&_a.children){
for(var i=_a.children.length-1;i>=0;i--){
_9.unshift(_a.children[i]);
}
}
}
}};
$.parser={auto:true,onComplete:function(_b){
},plugins:["draggable","droppable","resizable","pagination","tooltip","linkbutton","menu","menubutton","splitbutton","switchbutton","progressbar","tree","textbox","passwordbox","filebox","combo","combobox","combotree","combogrid","combotreegrid","numberbox","validatebox","searchbox","spinner","numberspinner","timespinner","datetimespinner","calendar","datebox","datetimebox","slider","layout","panel","datagrid","propertygrid","treegrid","datalist","tabs","accordion","window","dialog","form"],parse:function(_c){
var aa=[];
for(var i=0;i<$.parser.plugins.length;i++){
var _d=$.parser.plugins[i];
var r=$(".extjsui-"+_d,_c);
if(r.length){
if(r[_d]){
r.each(function(){
$(this)[_d]($.data(this,"options")||{});
});
}else{
aa.push({name:_d,jq:r});
}
}
}
if(aa.length&&window.easyloader){
var _e=[];
for(var i=0;i<aa.length;i++){
_e.push(aa[i].name);
}
easyloader.load(_e,function(){
for(var i=0;i<aa.length;i++){
var _f=aa[i].name;
var jq=aa[i].jq;
jq.each(function(){
$(this)[_f]($.data(this,"options")||{});
});
}
$.parser.onComplete.call($.parser,_c);
});
}else{
$.parser.onComplete.call($.parser,_c);
}
},parseValue:function(_10,_11,_12,_13){
_13=_13||0;
var v=$.trim(String(_11||""));
var _14=v.substr(v.length-1,1);
if(_14=="%"){
v=parseInt(v.substr(0,v.length-1));
if(_10.toLowerCase().indexOf("width")>=0){
v=Math.floor((_12.width()-_13)*v/100);
}else{
v=Math.floor((_12.height()-_13)*v/100);
}
}else{
v=parseInt(v)||undefined;
}
return v;
},parseOptions:function(_15,_16){
var t=$(_15);
var _17={};
var s=$.trim(t.attr("data-options"));
if(s){
if(s.substring(0,1)!="{"){
s="{"+s+"}";
}
_17=(new Function("return "+s))();
}
$.map(["width","height","left","top","minWidth","maxWidth","minHeight","maxHeight"],function(p){
var pv=$.trim(_15.style[p]||"");
if(pv){
if(pv.indexOf("%")==-1){
pv=parseInt(pv);
if(isNaN(pv)){
pv=undefined;
}
}
_17[p]=pv;
}
});
if(_16){
var _18={};
for(var i=0;i<_16.length;i++){
var pp=_16[i];
if(typeof pp=="string"){
_18[pp]=t.attr(pp);
}else{
for(var _19 in pp){
var _1a=pp[_19];
if(_1a=="boolean"){
_18[_19]=t.attr(_19)?(t.attr(_19)=="true"):undefined;
}else{
if(_1a=="number"){
_18[_19]=t.attr(_19)=="0"?0:parseFloat(t.attr(_19))||undefined;
}
}
}
}
}
$.extend(_17,_18);
}
return _17;
}};
$(function(){
var d=$("<div style=\"position:absolute;top:-1000px;width:100px;height:100px;padding:5px\"></div>").appendTo("body");
$._boxModel=d.outerWidth()!=100;
d.remove();
d=$("<div style=\"position:fixed\"></div>").appendTo("body");
$._positionFixed=(d.css("position")=="fixed");
d.remove();
if(!window.easyloader&&$.parser.auto){
$.parser.parse();
}
});
$.fn._outerWidth=function(_1b){
if(_1b==undefined){
if(this[0]==window){
return this.width()||document.body.clientWidth;
}
return this.outerWidth()||0;
}
return this._size("width",_1b);
};
$.fn._outerHeight=function(_1c){
if(_1c==undefined){
if(this[0]==window){
return this.height()||document.body.clientHeight;
}
return this.outerHeight()||0;
}
return this._size("height",_1c);
};
$.fn._scrollLeft=function(_1d){
if(_1d==undefined){
return this.scrollLeft();
}else{
return this.each(function(){
$(this).scrollLeft(_1d);
});
}
};
$.fn._propAttr=$.fn.prop||$.fn.attr;
$.fn._size=function(_1e,_1f){
if(typeof _1e=="string"){
if(_1e=="clear"){
return this.each(function(){
$(this).css({width:"",minWidth:"",maxWidth:"",height:"",minHeight:"",maxHeight:""});
});
}else{
if(_1e=="fit"){
return this.each(function(){
_20(this,this.tagName=="BODY"?$("body"):$(this).parent(),true);
});
}else{
if(_1e=="unfit"){
return this.each(function(){
_20(this,$(this).parent(),false);
});
}else{
if(_1f==undefined){
return _21(this[0],_1e);
}else{
return this.each(function(){
_21(this,_1e,_1f);
});
}
}
}
}
}else{
return this.each(function(){
_1f=_1f||$(this).parent();
$.extend(_1e,_20(this,_1f,_1e.fit)||{});
var r1=_22(this,"width",_1f,_1e);
var r2=_22(this,"height",_1f,_1e);
if(r1||r2){
$(this).addClass("extjsui-fluid");
}else{
$(this).removeClass("extjsui-fluid");
}
});
}
function _20(_23,_24,fit){
if(!_24.length){
return false;
}
var t=$(_23)[0];
var p=_24[0];
var _25=p.fcount||0;
if(fit){
if(!t.fitted){
t.fitted=true;
p.fcount=_25+1;
$(p).addClass("panel-noscroll");
if(p.tagName=="BODY"){
$("html").addClass("panel-fit");
}
}
return {width:($(p).width()||1),height:($(p).height()||1)};
}else{
if(t.fitted){
t.fitted=false;
p.fcount=_25-1;
if(p.fcount==0){
$(p).removeClass("panel-noscroll");
if(p.tagName=="BODY"){
$("html").removeClass("panel-fit");
}
}
}
return false;
}
};
function _22(_26,_27,_28,_29){
var t=$(_26);
var p=_27;
var p1=p.substr(0,1).toUpperCase()+p.substr(1);
var min=$.parser.parseValue("min"+p1,_29["min"+p1],_28);
var max=$.parser.parseValue("max"+p1,_29["max"+p1],_28);
var val=$.parser.parseValue(p,_29[p],_28);
var _2a=(String(_29[p]||"").indexOf("%")>=0?true:false);
if(!isNaN(val)){
var v=Math.min(Math.max(val,min||0),max||99999);
if(!_2a){
_29[p]=v;
}
t._size("min"+p1,"");
t._size("max"+p1,"");
t._size(p,v);
}else{
t._size(p,"");
t._size("min"+p1,min);
t._size("max"+p1,max);
}
return _2a||_29.fit;
};
function _21(_2b,_2c,_2d){
var t=$(_2b);
if(_2d==undefined){
_2d=parseInt(_2b.style[_2c]);
if(isNaN(_2d)){
return undefined;
}
if($._boxModel){
_2d+=_2e();
}
return _2d;
}else{
if(_2d===""){
t.css(_2c,"");
}else{
if($._boxModel){
_2d-=_2e();
if(_2d<0){
_2d=0;
}
}
t.css(_2c,_2d+"px");
}
}
function _2e(){
if(_2c.toLowerCase().indexOf("width")>=0){
return t.outerWidth()-t.width();
}else{
return t.outerHeight()-t.height();
}
};
};
};
})(jQuery);
(function($){
var _2f=null;
var _30=null;
var _31=false;
function _32(e){
if(e.touches.length!=1){
return;
}
if(!_31){
_31=true;
dblClickTimer=setTimeout(function(){
_31=false;
},500);
}else{
clearTimeout(dblClickTimer);
_31=false;
_33(e,"dblclick");
}
_2f=setTimeout(function(){
_33(e,"contextmenu",3);
},1000);
_33(e,"mousedown");
if($.fn.draggable.isDragging||$.fn.resizable.isResizing){
e.preventDefault();
}
};
function _34(e){
if(e.touches.length!=1){
return;
}
if(_2f){
clearTimeout(_2f);
}
_33(e,"mousemove");
if($.fn.draggable.isDragging||$.fn.resizable.isResizing){
e.preventDefault();
}
};
function _35(e){
if(_2f){
clearTimeout(_2f);
}
_33(e,"mouseup");
if($.fn.draggable.isDragging||$.fn.resizable.isResizing){
e.preventDefault();
}
};
function _33(e,_36,_37){
var _38=new $.Event(_36);
_38.pageX=e.changedTouches[0].pageX;
_38.pageY=e.changedTouches[0].pageY;
_38.which=_37||1;
$(e.target).trigger(_38);
};
if(document.addEventListener){
document.addEventListener("touchstart",_32,true);
document.addEventListener("touchmove",_34,true);
document.addEventListener("touchend",_35,true);
}
})(jQuery);
(function($){
function _39(e){
var _3a=$.data(e.data.target,"draggable");
var _3b=_3a.options;
var _3c=_3a.proxy;
var _3d=e.data;
var _3e=_3d.startLeft+e.pageX-_3d.startX;
var top=_3d.startTop+e.pageY-_3d.startY;
if(_3c){
if(_3c.parent()[0]==document.body){
if(_3b.deltaX!=null&&_3b.deltaX!=undefined){
_3e=e.pageX+_3b.deltaX;
}else{
_3e=e.pageX-e.data.offsetWidth;
}
if(_3b.deltaY!=null&&_3b.deltaY!=undefined){
top=e.pageY+_3b.deltaY;
}else{
top=e.pageY-e.data.offsetHeight;
}
}else{
if(_3b.deltaX!=null&&_3b.deltaX!=undefined){
_3e+=e.data.offsetWidth+_3b.deltaX;
}
if(_3b.deltaY!=null&&_3b.deltaY!=undefined){
top+=e.data.offsetHeight+_3b.deltaY;
}
}
}
if(e.data.parent!=document.body){
_3e+=$(e.data.parent).scrollLeft();
top+=$(e.data.parent).scrollTop();
}
if(_3b.axis=="h"){
_3d.left=_3e;
}else{
if(_3b.axis=="v"){
_3d.top=top;
}else{
_3d.left=_3e;
_3d.top=top;
}
}
};
function _3f(e){
var _40=$.data(e.data.target,"draggable");
var _41=_40.options;
var _42=_40.proxy;
if(!_42){
_42=$(e.data.target);
}
_42.css({left:e.data.left,top:e.data.top});
$("body").css("cursor",_41.cursor);
};
function _43(e){
if(!$.fn.draggable.isDragging){
return false;
}
var _44=$.data(e.data.target,"draggable");
var _45=_44.options;
var _46=$(".droppable:visible").filter(function(){
return e.data.target!=this;
}).filter(function(){
var _47=$.data(this,"droppable").options.accept;
if(_47){
return $(_47).filter(function(){
return this==e.data.target;
}).length>0;
}else{
return true;
}
});
_44.droppables=_46;
var _48=_44.proxy;
if(!_48){
if(_45.proxy){
if(_45.proxy=="clone"){
_48=$(e.data.target).clone().insertAfter(e.data.target);
}else{
_48=_45.proxy.call(e.data.target,e.data.target);
}
_44.proxy=_48;
}else{
_48=$(e.data.target);
}
}
_48.css("position","absolute");
_39(e);
_3f(e);
_45.onStartDrag.call(e.data.target,e);
return false;
};
function _49(e){
if(!$.fn.draggable.isDragging){
return false;
}
var _4a=$.data(e.data.target,"draggable");
_39(e);
if(_4a.options.onDrag.call(e.data.target,e)!=false){
_3f(e);
}
var _4b=e.data.target;
_4a.droppables.each(function(){
var _4c=$(this);
if(_4c.droppable("options").disabled){
return;
}
var p2=_4c.offset();
if(e.pageX>p2.left&&e.pageX<p2.left+_4c.outerWidth()&&e.pageY>p2.top&&e.pageY<p2.top+_4c.outerHeight()){
if(!this.entered){
$(this).trigger("_dragenter",[_4b]);
this.entered=true;
}
$(this).trigger("_dragover",[_4b]);
}else{
if(this.entered){
$(this).trigger("_dragleave",[_4b]);
this.entered=false;
}
}
});
return false;
};
function _4d(e){
if(!$.fn.draggable.isDragging){
_4e();
return false;
}
_49(e);
var _4f=$.data(e.data.target,"draggable");
var _50=_4f.proxy;
var _51=_4f.options;
if(_51.revert){
if(_52()==true){
$(e.data.target).css({position:e.data.startPosition,left:e.data.startLeft,top:e.data.startTop});
}else{
if(_50){
var _53,top;
if(_50.parent()[0]==document.body){
_53=e.data.startX-e.data.offsetWidth;
top=e.data.startY-e.data.offsetHeight;
}else{
_53=e.data.startLeft;
top=e.data.startTop;
}
_50.animate({left:_53,top:top},function(){
_54();
});
}else{
$(e.data.target).animate({left:e.data.startLeft,top:e.data.startTop},function(){
$(e.data.target).css("position",e.data.startPosition);
});
}
}
}else{
$(e.data.target).css({position:"absolute",left:e.data.left,top:e.data.top});
_52();
}
_51.onStopDrag.call(e.data.target,e);
_4e();
function _54(){
if(_50){
_50.remove();
}
_4f.proxy=null;
};
function _52(){
var _55=false;
_4f.droppables.each(function(){
var _56=$(this);
if(_56.droppable("options").disabled){
return;
}
var p2=_56.offset();
if(e.pageX>p2.left&&e.pageX<p2.left+_56.outerWidth()&&e.pageY>p2.top&&e.pageY<p2.top+_56.outerHeight()){
if(_51.revert){
$(e.data.target).css({position:e.data.startPosition,left:e.data.startLeft,top:e.data.startTop});
}
$(this).trigger("_drop",[e.data.target]);
_54();
_55=true;
this.entered=false;
return false;
}
});
if(!_55&&!_51.revert){
_54();
}
return _55;
};
return false;
};
function _4e(){
if($.fn.draggable.timer){
clearTimeout($.fn.draggable.timer);
$.fn.draggable.timer=undefined;
}
$(document).unbind(".draggable");
$.fn.draggable.isDragging=false;
setTimeout(function(){
$("body").css("cursor","");
},100);
};
$.fn.draggable=function(_57,_58){
if(typeof _57=="string"){
return $.fn.draggable.methods[_57](this,_58);
}
return this.each(function(){
var _59;
var _5a=$.data(this,"draggable");
if(_5a){
_5a.handle.unbind(".draggable");
_59=$.extend(_5a.options,_57);
}else{
_59=$.extend({},$.fn.draggable.defaults,$.fn.draggable.parseOptions(this),_57||{});
}
var _5b=_59.handle?(typeof _59.handle=="string"?$(_59.handle,this):_59.handle):$(this);
$.data(this,"draggable",{options:_59,handle:_5b});
if(_59.disabled){
$(this).css("cursor","");
return;
}
_5b.unbind(".draggable").bind("mousemove.draggable",{target:this},function(e){
if($.fn.draggable.isDragging){
return;
}
var _5c=$.data(e.data.target,"draggable").options;
if(_5d(e)){
$(this).css("cursor",_5c.cursor);
}else{
$(this).css("cursor","");
}
}).bind("mouseleave.draggable",{target:this},function(e){
$(this).css("cursor","");
}).bind("mousedown.draggable",{target:this},function(e){
if(_5d(e)==false){
return;
}
$(this).css("cursor","");
var _5e=$(e.data.target).position();
var _5f=$(e.data.target).offset();
var _60={startPosition:$(e.data.target).css("position"),startLeft:_5e.left,startTop:_5e.top,left:_5e.left,top:_5e.top,startX:e.pageX,startY:e.pageY,offsetWidth:(e.pageX-_5f.left),offsetHeight:(e.pageY-_5f.top),target:e.data.target,parent:$(e.data.target).parent()[0]};
$.extend(e.data,_60);
var _61=$.data(e.data.target,"draggable").options;
if(_61.onBeforeDrag.call(e.data.target,e)==false){
return;
}
$(document).bind("mousedown.draggable",e.data,_43);
$(document).bind("mousemove.draggable",e.data,_49);
$(document).bind("mouseup.draggable",e.data,_4d);
$.fn.draggable.timer=setTimeout(function(){
$.fn.draggable.isDragging=true;
_43(e);
},_61.delay);
return false;
});
function _5d(e){
var _62=$.data(e.data.target,"draggable");
var _63=_62.handle;
var _64=$(_63).offset();
var _65=$(_63).outerWidth();
var _66=$(_63).outerHeight();
var t=e.pageY-_64.top;
var r=_64.left+_65-e.pageX;
var b=_64.top+_66-e.pageY;
var l=e.pageX-_64.left;
return Math.min(t,r,b,l)>_62.options.edge;
};
});
};
$.fn.draggable.methods={options:function(jq){
return $.data(jq[0],"draggable").options;
},proxy:function(jq){
return $.data(jq[0],"draggable").proxy;
},enable:function(jq){
return jq.each(function(){
$(this).draggable({disabled:false});
});
},disable:function(jq){
return jq.each(function(){
$(this).draggable({disabled:true});
});
}};
$.fn.draggable.parseOptions=function(_67){
var t=$(_67);
return $.extend({},$.parser.parseOptions(_67,["cursor","handle","axis",{"revert":"boolean","deltaX":"number","deltaY":"number","edge":"number","delay":"number"}]),{disabled:(t.attr("disabled")?true:undefined)});
};
$.fn.draggable.defaults={proxy:null,revert:false,cursor:"move",deltaX:null,deltaY:null,handle:null,disabled:false,edge:0,axis:null,delay:100,onBeforeDrag:function(e){
},onStartDrag:function(e){
},onDrag:function(e){
},onStopDrag:function(e){
}};
$.fn.draggable.isDragging=false;
})(jQuery);
(function($){
function _68(_69){
$(_69).addClass("droppable");
$(_69).bind("_dragenter",function(e,_6a){
$.data(_69,"droppable").options.onDragEnter.apply(_69,[e,_6a]);
});
$(_69).bind("_dragleave",function(e,_6b){
$.data(_69,"droppable").options.onDragLeave.apply(_69,[e,_6b]);
});
$(_69).bind("_dragover",function(e,_6c){
$.data(_69,"droppable").options.onDragOver.apply(_69,[e,_6c]);
});
$(_69).bind("_drop",function(e,_6d){
$.data(_69,"droppable").options.onDrop.apply(_69,[e,_6d]);
});
};
$.fn.droppable=function(_6e,_6f){
if(typeof _6e=="string"){
return $.fn.droppable.methods[_6e](this,_6f);
}
_6e=_6e||{};
return this.each(function(){
var _70=$.data(this,"droppable");
if(_70){
$.extend(_70.options,_6e);
}else{
_68(this);
$.data(this,"droppable",{options:$.extend({},$.fn.droppable.defaults,$.fn.droppable.parseOptions(this),_6e)});
}
});
};
$.fn.droppable.methods={options:function(jq){
return $.data(jq[0],"droppable").options;
},enable:function(jq){
return jq.each(function(){
$(this).droppable({disabled:false});
});
},disable:function(jq){
return jq.each(function(){
$(this).droppable({disabled:true});
});
}};
$.fn.droppable.parseOptions=function(_71){
var t=$(_71);
return $.extend({},$.parser.parseOptions(_71,["accept"]),{disabled:(t.attr("disabled")?true:undefined)});
};
$.fn.droppable.defaults={accept:null,disabled:false,onDragEnter:function(e,_72){
},onDragOver:function(e,_73){
},onDragLeave:function(e,_74){
},onDrop:function(e,_75){
}};
})(jQuery);
(function($){
$.fn.resizable=function(_76,_77){
if(typeof _76=="string"){
return $.fn.resizable.methods[_76](this,_77);
}
function _78(e){
var _79=e.data;
var _7a=$.data(_79.target,"resizable").options;
if(_79.dir.indexOf("e")!=-1){
var _7b=_79.startWidth+e.pageX-_79.startX;
_7b=Math.min(Math.max(_7b,_7a.minWidth),_7a.maxWidth);
_79.width=_7b;
}
if(_79.dir.indexOf("s")!=-1){
var _7c=_79.startHeight+e.pageY-_79.startY;
_7c=Math.min(Math.max(_7c,_7a.minHeight),_7a.maxHeight);
_79.height=_7c;
}
if(_79.dir.indexOf("w")!=-1){
var _7b=_79.startWidth-e.pageX+_79.startX;
_7b=Math.min(Math.max(_7b,_7a.minWidth),_7a.maxWidth);
_79.width=_7b;
_79.left=_79.startLeft+_79.startWidth-_79.width;
}
if(_79.dir.indexOf("n")!=-1){
var _7c=_79.startHeight-e.pageY+_79.startY;
_7c=Math.min(Math.max(_7c,_7a.minHeight),_7a.maxHeight);
_79.height=_7c;
_79.top=_79.startTop+_79.startHeight-_79.height;
}
};
function _7d(e){
var _7e=e.data;
var t=$(_7e.target);
t.css({left:_7e.left,top:_7e.top});
if(t.outerWidth()!=_7e.width){
t._outerWidth(_7e.width);
}
if(t.outerHeight()!=_7e.height){
t._outerHeight(_7e.height);
}
};
function _7f(e){
$.fn.resizable.isResizing=true;
$.data(e.data.target,"resizable").options.onStartResize.call(e.data.target,e);
return false;
};
function _80(e){
_78(e);
if($.data(e.data.target,"resizable").options.onResize.call(e.data.target,e)!=false){
_7d(e);
}
return false;
};
function _81(e){
$.fn.resizable.isResizing=false;
_78(e,true);
_7d(e);
$.data(e.data.target,"resizable").options.onStopResize.call(e.data.target,e);
$(document).unbind(".resizable");
$("body").css("cursor","");
return false;
};
return this.each(function(){
var _82=null;
var _83=$.data(this,"resizable");
if(_83){
$(this).unbind(".resizable");
_82=$.extend(_83.options,_76||{});
}else{
_82=$.extend({},$.fn.resizable.defaults,$.fn.resizable.parseOptions(this),_76||{});
$.data(this,"resizable",{options:_82});
}
if(_82.disabled==true){
return;
}
$(this).bind("mousemove.resizable",{target:this},function(e){
if($.fn.resizable.isResizing){
return;
}
var dir=_84(e);
if(dir==""){
$(e.data.target).css("cursor","");
}else{
$(e.data.target).css("cursor",dir+"-resize");
}
}).bind("mouseleave.resizable",{target:this},function(e){
$(e.data.target).css("cursor","");
}).bind("mousedown.resizable",{target:this},function(e){
var dir=_84(e);
if(dir==""){
return;
}
function _85(css){
var val=parseInt($(e.data.target).css(css));
if(isNaN(val)){
return 0;
}else{
return val;
}
};
var _86={target:e.data.target,dir:dir,startLeft:_85("left"),startTop:_85("top"),left:_85("left"),top:_85("top"),startX:e.pageX,startY:e.pageY,startWidth:$(e.data.target).outerWidth(),startHeight:$(e.data.target).outerHeight(),width:$(e.data.target).outerWidth(),height:$(e.data.target).outerHeight(),deltaWidth:$(e.data.target).outerWidth()-$(e.data.target).width(),deltaHeight:$(e.data.target).outerHeight()-$(e.data.target).height()};
$(document).bind("mousedown.resizable",_86,_7f);
$(document).bind("mousemove.resizable",_86,_80);
$(document).bind("mouseup.resizable",_86,_81);
$("body").css("cursor",dir+"-resize");
});
function _84(e){
var tt=$(e.data.target);
var dir="";
var _87=tt.offset();
var _88=tt.outerWidth();
var _89=tt.outerHeight();
var _8a=_82.edge;
if(e.pageY>_87.top&&e.pageY<_87.top+_8a){
dir+="n";
}else{
if(e.pageY<_87.top+_89&&e.pageY>_87.top+_89-_8a){
dir+="s";
}
}
if(e.pageX>_87.left&&e.pageX<_87.left+_8a){
dir+="w";
}else{
if(e.pageX<_87.left+_88&&e.pageX>_87.left+_88-_8a){
dir+="e";
}
}
var _8b=_82.handles.split(",");
for(var i=0;i<_8b.length;i++){
var _8c=_8b[i].replace(/(^\s*)|(\s*$)/g,"");
if(_8c=="all"||_8c==dir){
return dir;
}
}
return "";
};
});
};
$.fn.resizable.methods={options:function(jq){
return $.data(jq[0],"resizable").options;
},enable:function(jq){
return jq.each(function(){
$(this).resizable({disabled:false});
});
},disable:function(jq){
return jq.each(function(){
$(this).resizable({disabled:true});
});
}};
$.fn.resizable.parseOptions=function(_8d){
var t=$(_8d);
return $.extend({},$.parser.parseOptions(_8d,["handles",{minWidth:"number",minHeight:"number",maxWidth:"number",maxHeight:"number",edge:"number"}]),{disabled:(t.attr("disabled")?true:undefined)});
};
$.fn.resizable.defaults={disabled:false,handles:"n, e, s, w, ne, se, sw, nw, all",minWidth:10,minHeight:10,maxWidth:10000,maxHeight:10000,edge:5,onStartResize:function(e){
},onResize:function(e){
},onStopResize:function(e){
}};
$.fn.resizable.isResizing=false;
})(jQuery);
(function($){
function _8e(_8f,_90){
var _91=$.data(_8f,"linkbutton").options;
if(_90){
$.extend(_91,_90);
}
if(_91.width||_91.height||_91.fit){
var btn=$(_8f);
var _92=btn.parent();
var _93=btn.is(":visible");
if(!_93){
var _94=$("<div style=\"display:none\"></div>").insertBefore(_8f);
var _95={position:btn.css("position"),display:btn.css("display"),left:btn.css("left")};
btn.appendTo("body");
btn.css({position:"absolute",display:"inline-block",left:-20000});
}
btn._size(_91,_92);
var _96=btn.find(".l-btn-left");
_96.css("margin-top",0);
_96.css("margin-top",parseInt((btn.height()-_96.height())/2)+"px");
if(!_93){
btn.insertAfter(_94);
btn.css(_95);
_94.remove();
}
}
};
function _97(_98){
var _99=$.data(_98,"linkbutton").options;
var t=$(_98).empty();
t.addClass("l-btn").removeClass("l-btn-plain l-btn-selected l-btn-plain-selected l-btn-outline");
t.removeClass("l-btn-small l-btn-medium l-btn-large").addClass("l-btn-"+_99.size);
if(_99.plain){
t.addClass("l-btn-plain");
}
if(_99.outline){
t.addClass("l-btn-outline");
}
if(_99.selected){
t.addClass(_99.plain?"l-btn-selected l-btn-plain-selected":"l-btn-selected");
}
t.attr("group",_99.group||"");
t.attr("id",_99.id||"");
var _9a=$("<span class=\"l-btn-left\"></span>").appendTo(t);
if(_99.text){
$("<span class=\"l-btn-text\"></span>").html(_99.text).appendTo(_9a);
}else{
$("<span class=\"l-btn-text l-btn-empty\">&nbsp;</span>").appendTo(_9a);
}
if(_99.iconCls){
$("<span class=\"l-btn-icon\">&nbsp;</span>").addClass(_99.iconCls).appendTo(_9a);
_9a.addClass("l-btn-icon-"+_99.iconAlign);
}
t.unbind(".linkbutton").bind("focus.linkbutton",function(){
if(!_99.disabled){
$(this).addClass("l-btn-focus");
}
}).bind("blur.linkbutton",function(){
$(this).removeClass("l-btn-focus");
}).bind("click.linkbutton",function(){
if(!_99.disabled){
if(_99.toggle){
if(_99.selected){
$(this).linkbutton("unselect");
}else{
$(this).linkbutton("select");
}
}
_99.onClick.call(this);
}
});
_9b(_98,_99.selected);
_9c(_98,_99.disabled);
};
function _9b(_9d,_9e){
var _9f=$.data(_9d,"linkbutton").options;
if(_9e){
if(_9f.group){
$("a.l-btn[group=\""+_9f.group+"\"]").each(function(){
var o=$(this).linkbutton("options");
if(o.toggle){
$(this).removeClass("l-btn-selected l-btn-plain-selected");
o.selected=false;
}
});
}
$(_9d).addClass(_9f.plain?"l-btn-selected l-btn-plain-selected":"l-btn-selected");
_9f.selected=true;
}else{
if(!_9f.group){
$(_9d).removeClass("l-btn-selected l-btn-plain-selected");
_9f.selected=false;
}
}
};
function _9c(_a0,_a1){
var _a2=$.data(_a0,"linkbutton");
var _a3=_a2.options;
$(_a0).removeClass("l-btn-disabled l-btn-plain-disabled");
if(_a1){
_a3.disabled=true;
var _a4=$(_a0).attr("href");
if(_a4){
_a2.href=_a4;
$(_a0).attr("href","javascript:void(0)");
}
if(_a0.onclick){
_a2.onclick=_a0.onclick;
_a0.onclick=null;
}
_a3.plain?$(_a0).addClass("l-btn-disabled l-btn-plain-disabled"):$(_a0).addClass("l-btn-disabled");
}else{
_a3.disabled=false;
if(_a2.href){
$(_a0).attr("href",_a2.href);
}
if(_a2.onclick){
_a0.onclick=_a2.onclick;
}
}
};
$.fn.linkbutton=function(_a5,_a6){
if(typeof _a5=="string"){
return $.fn.linkbutton.methods[_a5](this,_a6);
}
_a5=_a5||{};
return this.each(function(){
var _a7=$.data(this,"linkbutton");
if(_a7){
$.extend(_a7.options,_a5);
}else{
$.data(this,"linkbutton",{options:$.extend({},$.fn.linkbutton.defaults,$.fn.linkbutton.parseOptions(this),_a5)});
$(this).removeAttr("disabled");
$(this).bind("_resize",function(e,_a8){
if($(this).hasClass("extjsui-fluid")||_a8){
_8e(this);
}
return false;
});
}
_97(this);
_8e(this);
});
};
$.fn.linkbutton.methods={options:function(jq){
return $.data(jq[0],"linkbutton").options;
},resize:function(jq,_a9){
return jq.each(function(){
_8e(this,_a9);
});
},enable:function(jq){
return jq.each(function(){
_9c(this,false);
});
},disable:function(jq){
return jq.each(function(){
_9c(this,true);
});
},select:function(jq){
return jq.each(function(){
_9b(this,true);
});
},unselect:function(jq){
return jq.each(function(){
_9b(this,false);
});
}};
$.fn.linkbutton.parseOptions=function(_aa){
var t=$(_aa);
return $.extend({},$.parser.parseOptions(_aa,["id","iconCls","iconAlign","group","size","text",{plain:"boolean",toggle:"boolean",selected:"boolean",outline:"boolean"}]),{disabled:(t.attr("disabled")?true:undefined),text:($.trim(t.html())||undefined),iconCls:(t.attr("icon")||t.attr("iconCls"))});
};
$.fn.linkbutton.defaults={id:null,disabled:false,toggle:false,selected:false,outline:false,group:null,plain:false,text:"",iconCls:null,iconAlign:"left",size:"small",onClick:function(){
}};
})(jQuery);
(function($){
function _ab(_ac){
var _ad=$.data(_ac,"pagination");
var _ae=_ad.options;
var bb=_ad.bb={};
var _af=$(_ac).addClass("pagination").html("<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tr></tr></table>");
var tr=_af.find("tr");
var aa=$.extend([],_ae.layout);
if(!_ae.showPageList){
_b0(aa,"list");
}
if(!_ae.showRefresh){
_b0(aa,"refresh");
}
if(aa[0]=="sep"){
aa.shift();
}
if(aa[aa.length-1]=="sep"){
aa.pop();
}
for(var _b1=0;_b1<aa.length;_b1++){
var _b2=aa[_b1];
if(_b2=="list"){
var ps=$("<select class=\"pagination-page-list\"></select>");
ps.bind("change",function(){
_ae.pageSize=parseInt($(this).val());
_ae.onChangePageSize.call(_ac,_ae.pageSize);
_b8(_ac,_ae.pageNumber);
});
for(var i=0;i<_ae.pageList.length;i++){
$("<option></option>").text(_ae.pageList[i]).appendTo(ps);
}
$("<td></td>").append(ps).appendTo(tr);
}else{
if(_b2=="sep"){
$("<td><div class=\"pagination-btn-separator\"></div></td>").appendTo(tr);
}else{
if(_b2=="first"){
bb.first=_b3("first");
}else{
if(_b2=="prev"){
bb.prev=_b3("prev");
}else{
if(_b2=="next"){
bb.next=_b3("next");
}else{
if(_b2=="last"){
bb.last=_b3("last");
}else{
if(_b2=="manual"){
$("<span style=\"padding-left:6px;\"></span>").html(_ae.beforePageText).appendTo(tr).wrap("<td></td>");
bb.num=$("<input class=\"pagination-num\" type=\"text\" value=\"1\" size=\"2\">").appendTo(tr).wrap("<td></td>");
bb.num.unbind(".pagination").bind("keydown.pagination",function(e){
if(e.keyCode==13){
var _b4=parseInt($(this).val())||1;
_b8(_ac,_b4);
return false;
}
});
bb.after=$("<span style=\"padding-right:6px;\"></span>").appendTo(tr).wrap("<td></td>");
}else{
if(_b2=="refresh"){
bb.refresh=_b3("refresh");
}else{
if(_b2=="links"){
$("<td class=\"pagination-links\"></td>").appendTo(tr);
}
}
}
}
}
}
}
}
}
}
if(_ae.buttons){
$("<td><div class=\"pagination-btn-separator\"></div></td>").appendTo(tr);
if($.isArray(_ae.buttons)){
for(var i=0;i<_ae.buttons.length;i++){
var btn=_ae.buttons[i];
if(btn=="-"){
$("<td><div class=\"pagination-btn-separator\"></div></td>").appendTo(tr);
}else{
var td=$("<td></td>").appendTo(tr);
var a=$("<a href=\"javascript:void(0)\"></a>").appendTo(td);
a[0].onclick=eval(btn.handler||function(){
});
a.linkbutton($.extend({},btn,{plain:true}));
}
}
}else{
var td=$("<td></td>").appendTo(tr);
$(_ae.buttons).appendTo(td).show();
}
}
$("<div class=\"pagination-info\"></div>").appendTo(_af);
$("<div style=\"clear:both;\"></div>").appendTo(_af);
function _b3(_b5){
var btn=_ae.nav[_b5];
var a=$("<a href=\"javascript:void(0)\"></a>").appendTo(tr);
a.wrap("<td></td>");
a.linkbutton({iconCls:btn.iconCls,plain:true}).unbind(".pagination").bind("click.pagination",function(){
btn.handler.call(_ac);
});
return a;
};
function _b0(aa,_b6){
var _b7=$.inArray(_b6,aa);
if(_b7>=0){
aa.splice(_b7,1);
}
return aa;
};
};
function _b8(_b9,_ba){
var _bb=$.data(_b9,"pagination").options;
_bc(_b9,{pageNumber:_ba});
_bb.onSelectPage.call(_b9,_bb.pageNumber,_bb.pageSize);
};
function _bc(_bd,_be){
var _bf=$.data(_bd,"pagination");
var _c0=_bf.options;
var bb=_bf.bb;
$.extend(_c0,_be||{});
var ps=$(_bd).find("select.pagination-page-list");
if(ps.length){
ps.val(_c0.pageSize+"");
_c0.pageSize=parseInt(ps.val());
}
var _c1=Math.ceil(_c0.total/_c0.pageSize)||1;
if(_c0.pageNumber<1){
_c0.pageNumber=1;
}
if(_c0.pageNumber>_c1){
_c0.pageNumber=_c1;
}
if(_c0.total==0){
_c0.pageNumber=0;
_c1=0;
}
if(bb.num){
bb.num.val(_c0.pageNumber);
}
if(bb.after){
bb.after.html(_c0.afterPageText.replace(/{pages}/,_c1));
}
var td=$(_bd).find("td.pagination-links");
if(td.length){
td.empty();
var _c2=_c0.pageNumber-Math.floor(_c0.links/2);
if(_c2<1){
_c2=1;
}
var _c3=_c2+_c0.links-1;
if(_c3>_c1){
_c3=_c1;
}
_c2=_c3-_c0.links+1;
if(_c2<1){
_c2=1;
}
for(var i=_c2;i<=_c3;i++){
var a=$("<a class=\"pagination-link\" href=\"javascript:void(0)\"></a>").appendTo(td);
a.linkbutton({plain:true,text:i});
if(i==_c0.pageNumber){
a.linkbutton("select");
}else{
a.unbind(".pagination").bind("click.pagination",{pageNumber:i},function(e){
_b8(_bd,e.data.pageNumber);
});
}
}
}
var _c4=_c0.displayMsg;
_c4=_c4.replace(/{from}/,_c0.total==0?0:_c0.pageSize*(_c0.pageNumber-1)+1);
_c4=_c4.replace(/{to}/,Math.min(_c0.pageSize*(_c0.pageNumber),_c0.total));
_c4=_c4.replace(/{total}/,_c0.total);
$(_bd).find("div.pagination-info").html(_c4);
if(bb.first){
bb.first.linkbutton({disabled:((!_c0.total)||_c0.pageNumber==1)});
}
if(bb.prev){
bb.prev.linkbutton({disabled:((!_c0.total)||_c0.pageNumber==1)});
}
if(bb.next){
bb.next.linkbutton({disabled:(_c0.pageNumber==_c1)});
}
if(bb.last){
bb.last.linkbutton({disabled:(_c0.pageNumber==_c1)});
}
_c5(_bd,_c0.loading);
};
function _c5(_c6,_c7){
var _c8=$.data(_c6,"pagination");
var _c9=_c8.options;
_c9.loading=_c7;
if(_c9.showRefresh&&_c8.bb.refresh){
_c8.bb.refresh.linkbutton({iconCls:(_c9.loading?"pagination-loading":"pagination-load")});
}
};
$.fn.pagination=function(_ca,_cb){
if(typeof _ca=="string"){
return $.fn.pagination.methods[_ca](this,_cb);
}
_ca=_ca||{};
return this.each(function(){
var _cc;
var _cd=$.data(this,"pagination");
if(_cd){
_cc=$.extend(_cd.options,_ca);
}else{
_cc=$.extend({},$.fn.pagination.defaults,$.fn.pagination.parseOptions(this),_ca);
$.data(this,"pagination",{options:_cc});
}
_ab(this);
_bc(this);
});
};
$.fn.pagination.methods={options:function(jq){
return $.data(jq[0],"pagination").options;
},loading:function(jq){
return jq.each(function(){
_c5(this,true);
});
},loaded:function(jq){
return jq.each(function(){
_c5(this,false);
});
},refresh:function(jq,_ce){
return jq.each(function(){
_bc(this,_ce);
});
},select:function(jq,_cf){
return jq.each(function(){
_b8(this,_cf);
});
}};
$.fn.pagination.parseOptions=function(_d0){
var t=$(_d0);
return $.extend({},$.parser.parseOptions(_d0,[{total:"number",pageSize:"number",pageNumber:"number",links:"number"},{loading:"boolean",showPageList:"boolean",showRefresh:"boolean"}]),{pageList:(t.attr("pageList")?eval(t.attr("pageList")):undefined)});
};
$.fn.pagination.defaults={total:1,pageSize:10,pageNumber:1,pageList:[10,20,30,50],loading:false,buttons:null,showPageList:true,showRefresh:true,links:10,layout:["list","sep","first","prev","sep","manual","sep","next","last","sep","refresh"],onSelectPage:function(_d1,_d2){
},onBeforeRefresh:function(_d3,_d4){
},onRefresh:function(_d5,_d6){
},onChangePageSize:function(_d7){
},beforePageText:"Page",afterPageText:"of {pages}",displayMsg:"Displaying {from} to {to} of {total} items",nav:{first:{iconCls:"pagination-first",handler:function(){
var _d8=$(this).pagination("options");
if(_d8.pageNumber>1){
$(this).pagination("select",1);
}
}},prev:{iconCls:"pagination-prev",handler:function(){
var _d9=$(this).pagination("options");
if(_d9.pageNumber>1){
$(this).pagination("select",_d9.pageNumber-1);
}
}},next:{iconCls:"pagination-next",handler:function(){
var _da=$(this).pagination("options");
var _db=Math.ceil(_da.total/_da.pageSize);
if(_da.pageNumber<_db){
$(this).pagination("select",_da.pageNumber+1);
}
}},last:{iconCls:"pagination-last",handler:function(){
var _dc=$(this).pagination("options");
var _dd=Math.ceil(_dc.total/_dc.pageSize);
if(_dc.pageNumber<_dd){
$(this).pagination("select",_dd);
}
}},refresh:{iconCls:"pagination-refresh",handler:function(){
var _de=$(this).pagination("options");
if(_de.onBeforeRefresh.call(this,_de.pageNumber,_de.pageSize)!=false){
$(this).pagination("select",_de.pageNumber);
_de.onRefresh.call(this,_de.pageNumber,_de.pageSize);
}
}}}};
})(jQuery);
(function($){
function _df(_e0){
var _e1=$(_e0);
_e1.addClass("tree");
return _e1;
};
function _e2(_e3){
var _e4=$.data(_e3,"tree").options;
$(_e3).unbind().bind("mouseover",function(e){
var tt=$(e.target);
var _e5=tt.closest("div.tree-node");
if(!_e5.length){
return;
}
_e5.addClass("tree-node-hover");
if(tt.hasClass("tree-hit")){
if(tt.hasClass("tree-expanded")){
tt.addClass("tree-expanded-hover");
}else{
tt.addClass("tree-collapsed-hover");
}
}
e.stopPropagation();
}).bind("mouseout",function(e){
var tt=$(e.target);
var _e6=tt.closest("div.tree-node");
if(!_e6.length){
return;
}
_e6.removeClass("tree-node-hover");
if(tt.hasClass("tree-hit")){
if(tt.hasClass("tree-expanded")){
tt.removeClass("tree-expanded-hover");
}else{
tt.removeClass("tree-collapsed-hover");
}
}
e.stopPropagation();
}).bind("click",function(e){
var tt=$(e.target);
var _e7=tt.closest("div.tree-node");
if(!_e7.length){
return;
}
if(tt.hasClass("tree-hit")){
_145(_e3,_e7[0]);
return false;
}else{
if(tt.hasClass("tree-checkbox")){
_10c(_e3,_e7[0]);
return false;
}else{
_188(_e3,_e7[0]);
_e4.onClick.call(_e3,_ea(_e3,_e7[0]));
}
}
e.stopPropagation();
}).bind("dblclick",function(e){
var _e8=$(e.target).closest("div.tree-node");
if(!_e8.length){
return;
}
_188(_e3,_e8[0]);
_e4.onDblClick.call(_e3,_ea(_e3,_e8[0]));
e.stopPropagation();
}).bind("contextmenu",function(e){
var _e9=$(e.target).closest("div.tree-node");
if(!_e9.length){
return;
}
_e4.onContextMenu.call(_e3,e,_ea(_e3,_e9[0]));
e.stopPropagation();
});
};
function _eb(_ec){
var _ed=$.data(_ec,"tree").options;
_ed.dnd=false;
var _ee=$(_ec).find("div.tree-node");
_ee.draggable("disable");
_ee.css("cursor","pointer");
};
function _ef(_f0){
var _f1=$.data(_f0,"tree");
var _f2=_f1.options;
var _f3=_f1.tree;
_f1.disabledNodes=[];
_f2.dnd=true;
_f3.find("div.tree-node").draggable({disabled:false,revert:true,cursor:"pointer",proxy:function(_f4){
var p=$("<div class=\"tree-node-proxy\"></div>").appendTo("body");
p.html("<span class=\"tree-dnd-icon tree-dnd-no\">&nbsp;</span>"+$(_f4).find(".tree-title").html());
p.hide();
return p;
},deltaX:15,deltaY:15,onBeforeDrag:function(e){
if(_f2.onBeforeDrag.call(_f0,_ea(_f0,this))==false){
return false;
}
if($(e.target).hasClass("tree-hit")||$(e.target).hasClass("tree-checkbox")){
return false;
}
if(e.which!=1){
return false;
}
var _f5=$(this).find("span.tree-indent");
if(_f5.length){
e.data.offsetWidth-=_f5.length*_f5.width();
}
},onStartDrag:function(e){
$(this).next("ul").find("div.tree-node").each(function(){
$(this).droppable("disable");
_f1.disabledNodes.push(this);
});
$(this).draggable("proxy").css({left:-10000,top:-10000});
_f2.onStartDrag.call(_f0,_ea(_f0,this));
var _f6=_ea(_f0,this);
if(_f6.id==undefined){
_f6.id="extjsui_tree_node_id_temp";
_12c(_f0,_f6);
}
_f1.draggingNodeId=_f6.id;
},onDrag:function(e){
var x1=e.pageX,y1=e.pageY,x2=e.data.startX,y2=e.data.startY;
var d=Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
if(d>3){
$(this).draggable("proxy").show();
}
this.pageY=e.pageY;
},onStopDrag:function(){
for(var i=0;i<_f1.disabledNodes.length;i++){
$(_f1.disabledNodes[i]).droppable("enable");
}
_f1.disabledNodes=[];
var _f7=_182(_f0,_f1.draggingNodeId);
if(_f7&&_f7.id=="extjsui_tree_node_id_temp"){
_f7.id="";
_12c(_f0,_f7);
}
_f2.onStopDrag.call(_f0,_f7);
}}).droppable({accept:"div.tree-node",onDragEnter:function(e,_f8){
if(_f2.onDragEnter.call(_f0,this,_f9(_f8))==false){
_fa(_f8,false);
$(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
$(this).droppable("disable");
_f1.disabledNodes.push(this);
}
},onDragOver:function(e,_fb){
if($(this).droppable("options").disabled){
return;
}
var _fc=_fb.pageY;
var top=$(this).offset().top;
var _fd=top+$(this).outerHeight();
_fa(_fb,true);
$(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
if(_fc>top+(_fd-top)/2){
if(_fd-_fc<5){
$(this).addClass("tree-node-bottom");
}else{
$(this).addClass("tree-node-append");
}
}else{
if(_fc-top<5){
$(this).addClass("tree-node-top");
}else{
$(this).addClass("tree-node-append");
}
}
if(_f2.onDragOver.call(_f0,this,_f9(_fb))==false){
_fa(_fb,false);
$(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
$(this).droppable("disable");
_f1.disabledNodes.push(this);
}
},onDragLeave:function(e,_fe){
_fa(_fe,false);
$(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
_f2.onDragLeave.call(_f0,this,_f9(_fe));
},onDrop:function(e,_ff){
var dest=this;
var _100,_101;
if($(this).hasClass("tree-node-append")){
_100=_102;
_101="append";
}else{
_100=_103;
_101=$(this).hasClass("tree-node-top")?"top":"bottom";
}
if(_f2.onBeforeDrop.call(_f0,dest,_f9(_ff),_101)==false){
$(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
return;
}
_100(_ff,dest,_101);
$(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
}});
function _f9(_104,pop){
return $(_104).closest("ul.tree").tree(pop?"pop":"getData",_104);
};
function _fa(_105,_106){
var icon=$(_105).draggable("proxy").find("span.tree-dnd-icon");
icon.removeClass("tree-dnd-yes tree-dnd-no").addClass(_106?"tree-dnd-yes":"tree-dnd-no");
};
function _102(_107,dest){
if(_ea(_f0,dest).state=="closed"){
_13d(_f0,dest,function(){
_108();
});
}else{
_108();
}
function _108(){
var node=_f9(_107,true);
$(_f0).tree("append",{parent:dest,data:[node]});
_f2.onDrop.call(_f0,dest,node,"append");
};
};
function _103(_109,dest,_10a){
var _10b={};
if(_10a=="top"){
_10b.before=dest;
}else{
_10b.after=dest;
}
var node=_f9(_109,true);
_10b.data=node;
$(_f0).tree("insert",_10b);
_f2.onDrop.call(_f0,dest,node,_10a);
};
};
function _10c(_10d,_10e,_10f,_110){
var _111=$.data(_10d,"tree");
var opts=_111.options;
if(!opts.checkbox){
return;
}
var _112=_ea(_10d,_10e);
if(!_112.checkState){
return;
}
var ck=$(_10e).find(".tree-checkbox");
if(_10f==undefined){
if(ck.hasClass("tree-checkbox1")){
_10f=false;
}else{
if(ck.hasClass("tree-checkbox0")){
_10f=true;
}else{
if(_112._checked==undefined){
_112._checked=$(_10e).find(".tree-checkbox").hasClass("tree-checkbox1");
}
_10f=!_112._checked;
}
}
}
_112._checked=_10f;
if(_10f){
if(ck.hasClass("tree-checkbox1")){
return;
}
}else{
if(ck.hasClass("tree-checkbox0")){
return;
}
}
if(!_110){
if(opts.onBeforeCheck.call(_10d,_112,_10f)==false){
return;
}
}
if(opts.cascadeCheck){
_113(_10d,_112,_10f);
_114(_10d,_112);
}else{
_115(_10d,_112,_10f?"1":"0");
}
if(!_110){
opts.onCheck.call(_10d,_112,_10f);
}
};
function _113(_116,_117,_118){
var opts=$.data(_116,"tree").options;
var flag=_118?1:0;
_115(_116,_117,flag);
if(opts.deepCheck){
$.extjsui.forEach(_117.children||[],true,function(n){
_115(_116,n,flag);
});
}else{
var _119=[];
if(_117.children&&_117.children.length){
_119.push(_117);
}
$.extjsui.forEach(_117.children||[],true,function(n){
if(!n.hidden){
_115(_116,n,flag);
if(n.children&&n.children.length){
_119.push(n);
}
}
});
for(var i=_119.length-1;i>=0;i--){
var node=_119[i];
_115(_116,node,_11a(node));
}
}
};
function _115(_11b,_11c,flag){
var opts=$.data(_11b,"tree").options;
if(!_11c.checkState||flag==undefined){
return;
}
if(_11c.hidden&&!opts.deepCheck){
return;
}
var ck=$("#"+_11c.domId).find(".tree-checkbox");
_11c.checkState=["unchecked","checked","indeterminate"][flag];
_11c.checked=(_11c.checkState=="checked");
ck.removeClass("tree-checkbox0 tree-checkbox1 tree-checkbox2");
ck.addClass("tree-checkbox"+flag);
};
function _114(_11d,_11e){
var pd=_11f(_11d,$("#"+_11e.domId)[0]);
if(pd){
_115(_11d,pd,_11a(pd));
_114(_11d,pd);
}
};
function _11a(row){
var c0=0;
var c1=0;
var len=0;
$.extjsui.forEach(row.children||[],false,function(r){
if(r.checkState){
len++;
if(r.checkState=="checked"){
c1++;
}else{
if(r.checkState=="unchecked"){
c0++;
}
}
}
});
if(len==0){
return undefined;
}
var flag=0;
if(c0==len){
flag=0;
}else{
if(c1==len){
flag=1;
}else{
flag=2;
}
}
return flag;
};
function _120(_121,_122){
var opts=$.data(_121,"tree").options;
if(!opts.checkbox){
return;
}
var node=$(_122);
var ck=node.find(".tree-checkbox");
var _123=_ea(_121,_122);
if(opts.view.hasCheckbox(_121,_123)){
if(!ck.length){
_123.checkState=_123.checkState||"unchecked";
$("<span class=\"tree-checkbox\"></span>").insertBefore(node.find(".tree-title"));
}
if(_123.checkState=="checked"){
_10c(_121,_122,true,true);
}else{
if(_123.checkState=="unchecked"){
_10c(_121,_122,false,true);
}else{
var flag=_11a(_123);
if(flag===0){
_10c(_121,_122,false,true);
}else{
if(flag===1){
_10c(_121,_122,true,true);
}
}
}
}
}else{
ck.remove();
_123.checkState=undefined;
_123.checked=undefined;
_114(_121,_123);
}
};
function _124(_125,ul,data,_126,_127){
var _128=$.data(_125,"tree");
var opts=_128.options;
var _129=$(ul).prevAll("div.tree-node:first");
data=opts.loadFilter.call(_125,data,_129[0]);
var _12a=_12b(_125,"domId",_129.attr("id"));
if(!_126){
_12a?_12a.children=data:_128.data=data;
$(ul).empty();
}else{
if(_12a){
_12a.children?_12a.children=_12a.children.concat(data):_12a.children=data;
}else{
_128.data=_128.data.concat(data);
}
}
opts.view.render.call(opts.view,_125,ul,data);
if(opts.dnd){
_ef(_125);
}
if(_12a){
_12c(_125,_12a);
}
for(var i=0;i<_128.tmpIds.length;i++){
_10c(_125,$("#"+_128.tmpIds[i])[0],true,true);
}
_128.tmpIds=[];
setTimeout(function(){
_12d(_125,_125);
},0);
if(!_127){
opts.onLoadSuccess.call(_125,_12a,data);
}
};
function _12d(_12e,ul,_12f){
var opts=$.data(_12e,"tree").options;
if(opts.lines){
$(_12e).addClass("tree-lines");
}else{
$(_12e).removeClass("tree-lines");
return;
}
if(!_12f){
_12f=true;
$(_12e).find("span.tree-indent").removeClass("tree-line tree-join tree-joinbottom");
$(_12e).find("div.tree-node").removeClass("tree-node-last tree-root-first tree-root-one");
var _130=$(_12e).tree("getRoots");
if(_130.length>1){
$(_130[0].target).addClass("tree-root-first");
}else{
if(_130.length==1){
$(_130[0].target).addClass("tree-root-one");
}
}
}
$(ul).children("li").each(function(){
var node=$(this).children("div.tree-node");
var ul=node.next("ul");
if(ul.length){
if($(this).next().length){
_131(node);
}
_12d(_12e,ul,_12f);
}else{
_132(node);
}
});
var _133=$(ul).children("li:last").children("div.tree-node").addClass("tree-node-last");
_133.children("span.tree-join").removeClass("tree-join").addClass("tree-joinbottom");
function _132(node,_134){
var icon=node.find("span.tree-icon");
icon.prev("span.tree-indent").addClass("tree-join");
};
function _131(node){
var _135=node.find("span.tree-indent, span.tree-hit").length;
node.next().find("div.tree-node").each(function(){
$(this).children("span:eq("+(_135-1)+")").addClass("tree-line");
});
};
};
function _136(_137,ul,_138,_139){
var opts=$.data(_137,"tree").options;
_138=$.extend({},opts.queryParams,_138||{});
var _13a=null;
if(_137!=ul){
var node=$(ul).prev();
_13a=_ea(_137,node[0]);
}
if(opts.onBeforeLoad.call(_137,_13a,_138)==false){
return;
}
var _13b=$(ul).prev().children("span.tree-folder");
_13b.addClass("tree-loading");
var _13c=opts.loader.call(_137,_138,function(data){
_13b.removeClass("tree-loading");
_124(_137,ul,data);
if(_139){
_139();
}
},function(){
_13b.removeClass("tree-loading");
opts.onLoadError.apply(_137,arguments);
if(_139){
_139();
}
});
if(_13c==false){
_13b.removeClass("tree-loading");
}
};
function _13d(_13e,_13f,_140){
var opts=$.data(_13e,"tree").options;
var hit=$(_13f).children("span.tree-hit");
if(hit.length==0){
return;
}
if(hit.hasClass("tree-expanded")){
return;
}
var node=_ea(_13e,_13f);
if(opts.onBeforeExpand.call(_13e,node)==false){
return;
}
hit.removeClass("tree-collapsed tree-collapsed-hover").addClass("tree-expanded");
hit.next().addClass("tree-folder-open");
var ul=$(_13f).next();
if(ul.length){
if(opts.animate){
ul.slideDown("normal",function(){
node.state="open";
opts.onExpand.call(_13e,node);
if(_140){
_140();
}
});
}else{
ul.css("display","block");
node.state="open";
opts.onExpand.call(_13e,node);
if(_140){
_140();
}
}
}else{
var _141=$("<ul style=\"display:none\"></ul>").insertAfter(_13f);
_136(_13e,_141[0],{id:node.id},function(){
if(_141.is(":empty")){
_141.remove();
}
if(opts.animate){
_141.slideDown("normal",function(){
node.state="open";
opts.onExpand.call(_13e,node);
if(_140){
_140();
}
});
}else{
_141.css("display","block");
node.state="open";
opts.onExpand.call(_13e,node);
if(_140){
_140();
}
}
});
}
};
function _142(_143,_144){
var opts=$.data(_143,"tree").options;
var hit=$(_144).children("span.tree-hit");
if(hit.length==0){
return;
}
if(hit.hasClass("tree-collapsed")){
return;
}
var node=_ea(_143,_144);
if(opts.onBeforeCollapse.call(_143,node)==false){
return;
}
hit.removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed");
hit.next().removeClass("tree-folder-open");
var ul=$(_144).next();
if(opts.animate){
ul.slideUp("normal",function(){
node.state="closed";
opts.onCollapse.call(_143,node);
});
}else{
ul.css("display","none");
node.state="closed";
opts.onCollapse.call(_143,node);
}
};
function _145(_146,_147){
var hit=$(_147).children("span.tree-hit");
if(hit.length==0){
return;
}
if(hit.hasClass("tree-expanded")){
_142(_146,_147);
}else{
_13d(_146,_147);
}
};
function _148(_149,_14a){
var _14b=_14c(_149,_14a);
if(_14a){
_14b.unshift(_ea(_149,_14a));
}
for(var i=0;i<_14b.length;i++){
_13d(_149,_14b[i].target);
}
};
function _14d(_14e,_14f){
var _150=[];
var p=_11f(_14e,_14f);
while(p){
_150.unshift(p);
p=_11f(_14e,p.target);
}
for(var i=0;i<_150.length;i++){
_13d(_14e,_150[i].target);
}
};
function _151(_152,_153){
var c=$(_152).parent();
while(c[0].tagName!="BODY"&&c.css("overflow-y")!="auto"){
c=c.parent();
}
var n=$(_153);
var ntop=n.offset().top;
if(c[0].tagName!="BODY"){
var ctop=c.offset().top;
if(ntop<ctop){
c.scrollTop(c.scrollTop()+ntop-ctop);
}else{
if(ntop+n.outerHeight()>ctop+c.outerHeight()-18){
c.scrollTop(c.scrollTop()+ntop+n.outerHeight()-ctop-c.outerHeight()+18);
}
}
}else{
c.scrollTop(ntop);
}
};
function _154(_155,_156){
var _157=_14c(_155,_156);
if(_156){
_157.unshift(_ea(_155,_156));
}
for(var i=0;i<_157.length;i++){
_142(_155,_157[i].target);
}
};
function _158(_159,_15a){
var node=$(_15a.parent);
var data=_15a.data;
if(!data){
return;
}
data=$.isArray(data)?data:[data];
if(!data.length){
return;
}
var ul;
if(node.length==0){
ul=$(_159);
}else{
if(_15b(_159,node[0])){
var _15c=node.find("span.tree-icon");
_15c.removeClass("tree-file").addClass("tree-folder tree-folder-open");
var hit=$("<span class=\"tree-hit tree-expanded\"></span>").insertBefore(_15c);
if(hit.prev().length){
hit.prev().remove();
}
}
ul=node.next();
if(!ul.length){
ul=$("<ul></ul>").insertAfter(node);
}
}
_124(_159,ul[0],data,true,true);
};
function _15d(_15e,_15f){
var ref=_15f.before||_15f.after;
var _160=_11f(_15e,ref);
var data=_15f.data;
if(!data){
return;
}
data=$.isArray(data)?data:[data];
if(!data.length){
return;
}
_158(_15e,{parent:(_160?_160.target:null),data:data});
var _161=_160?_160.children:$(_15e).tree("getRoots");
for(var i=0;i<_161.length;i++){
if(_161[i].domId==$(ref).attr("id")){
for(var j=data.length-1;j>=0;j--){
_161.splice((_15f.before?i:(i+1)),0,data[j]);
}
_161.splice(_161.length-data.length,data.length);
break;
}
}
var li=$();
for(var i=0;i<data.length;i++){
li=li.add($("#"+data[i].domId).parent());
}
if(_15f.before){
li.insertBefore($(ref).parent());
}else{
li.insertAfter($(ref).parent());
}
};
function _162(_163,_164){
var _165=del(_164);
$(_164).parent().remove();
if(_165){
if(!_165.children||!_165.children.length){
var node=$(_165.target);
node.find(".tree-icon").removeClass("tree-folder").addClass("tree-file");
node.find(".tree-hit").remove();
$("<span class=\"tree-indent\"></span>").prependTo(node);
node.next().remove();
}
_12c(_163,_165);
}
_12d(_163,_163);
function del(_166){
var id=$(_166).attr("id");
var _167=_11f(_163,_166);
var cc=_167?_167.children:$.data(_163,"tree").data;
for(var i=0;i<cc.length;i++){
if(cc[i].domId==id){
cc.splice(i,1);
break;
}
}
return _167;
};
};
function _12c(_168,_169){
var opts=$.data(_168,"tree").options;
var node=$(_169.target);
var data=_ea(_168,_169.target);
if(data.iconCls){
node.find(".tree-icon").removeClass(data.iconCls);
}
$.extend(data,_169);
node.find(".tree-title").html(opts.formatter.call(_168,data));
if(data.iconCls){
node.find(".tree-icon").addClass(data.iconCls);
}
_120(_168,_169.target);
};
function _16a(_16b,_16c){
if(_16c){
var p=_11f(_16b,_16c);
while(p){
_16c=p.target;
p=_11f(_16b,_16c);
}
return _ea(_16b,_16c);
}else{
var _16d=_16e(_16b);
return _16d.length?_16d[0]:null;
}
};
function _16e(_16f){
var _170=$.data(_16f,"tree").data;
for(var i=0;i<_170.length;i++){
_171(_170[i]);
}
return _170;
};
function _14c(_172,_173){
var _174=[];
var n=_ea(_172,_173);
var data=n?(n.children||[]):$.data(_172,"tree").data;
$.extjsui.forEach(data,true,function(node){
_174.push(_171(node));
});
return _174;
};
function _11f(_175,_176){
var p=$(_176).closest("ul").prevAll("div.tree-node:first");
return _ea(_175,p[0]);
};
function _177(_178,_179){
_179=_179||"checked";
if(!$.isArray(_179)){
_179=[_179];
}
var _17a=[];
$.extjsui.forEach($.data(_178,"tree").data,true,function(n){
if(n.checkState&&$.extjsui.indexOfArray(_179,n.checkState)!=-1){
_17a.push(_171(n));
}
});
return _17a;
};
function _17b(_17c){
var node=$(_17c).find("div.tree-node-selected");
return node.length?_ea(_17c,node[0]):null;
};
function _17d(_17e,_17f){
var data=_ea(_17e,_17f);
if(data&&data.children){
$.extjsui.forEach(data.children,true,function(node){
_171(node);
});
}
return data;
};
function _ea(_180,_181){
return _12b(_180,"domId",$(_181).attr("id"));
};
function _182(_183,id){
return _12b(_183,"id",id);
};
function _12b(_184,_185,_186){
var data=$.data(_184,"tree").data;
var _187=null;
$.extjsui.forEach(data,true,function(node){
if(node[_185]==_186){
_187=_171(node);
return false;
}
});
return _187;
};
function _171(node){
node.target=$("#"+node.domId)[0];
return node;
};
function _188(_189,_18a){
var opts=$.data(_189,"tree").options;
var node=_ea(_189,_18a);
if(opts.onBeforeSelect.call(_189,node)==false){
return;
}
$(_189).find("div.tree-node-selected").removeClass("tree-node-selected");
$(_18a).addClass("tree-node-selected");
opts.onSelect.call(_189,node);
};
function _15b(_18b,_18c){
return $(_18c).children("span.tree-hit").length==0;
};
function _18d(_18e,_18f){
var opts=$.data(_18e,"tree").options;
var node=_ea(_18e,_18f);
if(opts.onBeforeEdit.call(_18e,node)==false){
return;
}
$(_18f).css("position","relative");
var nt=$(_18f).find(".tree-title");
var _190=nt.outerWidth();
nt.empty();
var _191=$("<input class=\"tree-editor\">").appendTo(nt);
_191.val(node.text).focus();
_191.width(_190+20);
_191._outerHeight(18);
_191.bind("click",function(e){
return false;
}).bind("mousedown",function(e){
e.stopPropagation();
}).bind("mousemove",function(e){
e.stopPropagation();
}).bind("keydown",function(e){
if(e.keyCode==13){
_192(_18e,_18f);
return false;
}else{
if(e.keyCode==27){
_196(_18e,_18f);
return false;
}
}
}).bind("blur",function(e){
e.stopPropagation();
_192(_18e,_18f);
});
};
function _192(_193,_194){
var opts=$.data(_193,"tree").options;
$(_194).css("position","");
var _195=$(_194).find("input.tree-editor");
var val=_195.val();
_195.remove();
var node=_ea(_193,_194);
node.text=val;
_12c(_193,node);
opts.onAfterEdit.call(_193,node);
};
function _196(_197,_198){
var opts=$.data(_197,"tree").options;
$(_198).css("position","");
$(_198).find("input.tree-editor").remove();
var node=_ea(_197,_198);
_12c(_197,node);
opts.onCancelEdit.call(_197,node);
};
function _199(_19a,q){
var _19b=$.data(_19a,"tree");
var opts=_19b.options;
var ids={};
$.extjsui.forEach(_19b.data,true,function(node){
if(opts.filter.call(_19a,q,node)){
$("#"+node.domId).removeClass("tree-node-hidden");
ids[node.domId]=1;
node.hidden=false;
}else{
$("#"+node.domId).addClass("tree-node-hidden");
node.hidden=true;
}
});
for(var id in ids){
_19c(id);
}
function _19c(_19d){
var p=$(_19a).tree("getParent",$("#"+_19d)[0]);
while(p){
$(p.target).removeClass("tree-node-hidden");
p.hidden=false;
p=$(_19a).tree("getParent",p.target);
}
};
};
$.fn.tree=function(_19e,_19f){
if(typeof _19e=="string"){
return $.fn.tree.methods[_19e](this,_19f);
}
var _19e=_19e||{};
return this.each(function(){
var _1a0=$.data(this,"tree");
var opts;
if(_1a0){
opts=$.extend(_1a0.options,_19e);
_1a0.options=opts;
}else{
opts=$.extend({},$.fn.tree.defaults,$.fn.tree.parseOptions(this),_19e);
$.data(this,"tree",{options:opts,tree:_df(this),data:[],tmpIds:[]});
var data=$.fn.tree.parseData(this);
if(data.length){
_124(this,this,data);
}
}
_e2(this);
if(opts.data){
_124(this,this,$.extend(true,[],opts.data));
}
_136(this,this);
});
};
$.fn.tree.methods={options:function(jq){
return $.data(jq[0],"tree").options;
},loadData:function(jq,data){
return jq.each(function(){
_124(this,this,data);
});
},getNode:function(jq,_1a1){
return _ea(jq[0],_1a1);
},getData:function(jq,_1a2){
return _17d(jq[0],_1a2);
},reload:function(jq,_1a3){
return jq.each(function(){
if(_1a3){
var node=$(_1a3);
var hit=node.children("span.tree-hit");
hit.removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed");
node.next().remove();
_13d(this,_1a3);
}else{
$(this).empty();
_136(this,this);
}
});
},getRoot:function(jq,_1a4){
return _16a(jq[0],_1a4);
},getRoots:function(jq){
return _16e(jq[0]);
},getParent:function(jq,_1a5){
return _11f(jq[0],_1a5);
},getChildren:function(jq,_1a6){
return _14c(jq[0],_1a6);
},getChecked:function(jq,_1a7){
return _177(jq[0],_1a7);
},getSelected:function(jq){
return _17b(jq[0]);
},isLeaf:function(jq,_1a8){
return _15b(jq[0],_1a8);
},find:function(jq,id){
return _182(jq[0],id);
},select:function(jq,_1a9){
return jq.each(function(){
_188(this,_1a9);
});
},check:function(jq,_1aa){
return jq.each(function(){
_10c(this,_1aa,true);
});
},uncheck:function(jq,_1ab){
return jq.each(function(){
_10c(this,_1ab,false);
});
},collapse:function(jq,_1ac){
return jq.each(function(){
_142(this,_1ac);
});
},expand:function(jq,_1ad){
return jq.each(function(){
_13d(this,_1ad);
});
},collapseAll:function(jq,_1ae){
return jq.each(function(){
_154(this,_1ae);
});
},expandAll:function(jq,_1af){
return jq.each(function(){
_148(this,_1af);
});
},expandTo:function(jq,_1b0){
return jq.each(function(){
_14d(this,_1b0);
});
},scrollTo:function(jq,_1b1){
return jq.each(function(){
_151(this,_1b1);
});
},toggle:function(jq,_1b2){
return jq.each(function(){
_145(this,_1b2);
});
},append:function(jq,_1b3){
return jq.each(function(){
_158(this,_1b3);
});
},insert:function(jq,_1b4){
return jq.each(function(){
_15d(this,_1b4);
});
},remove:function(jq,_1b5){
return jq.each(function(){
_162(this,_1b5);
});
},pop:function(jq,_1b6){
var node=jq.tree("getData",_1b6);
jq.tree("remove",_1b6);
return node;
},update:function(jq,_1b7){
return jq.each(function(){
_12c(this,$.extend({},_1b7,{checkState:_1b7.checked?"checked":(_1b7.checked===false?"unchecked":undefined)}));
});
},enableDnd:function(jq){
return jq.each(function(){
_ef(this);
});
},disableDnd:function(jq){
return jq.each(function(){
_eb(this);
});
},beginEdit:function(jq,_1b8){
return jq.each(function(){
_18d(this,_1b8);
});
},endEdit:function(jq,_1b9){
return jq.each(function(){
_192(this,_1b9);
});
},cancelEdit:function(jq,_1ba){
return jq.each(function(){
_196(this,_1ba);
});
},doFilter:function(jq,q){
return jq.each(function(){
_199(this,q);
});
}};
$.fn.tree.parseOptions=function(_1bb){
var t=$(_1bb);
return $.extend({},$.parser.parseOptions(_1bb,["url","method",{checkbox:"boolean",cascadeCheck:"boolean",onlyLeafCheck:"boolean"},{animate:"boolean",lines:"boolean",dnd:"boolean"}]));
};
$.fn.tree.parseData=function(_1bc){
var data=[];
_1bd(data,$(_1bc));
return data;
function _1bd(aa,tree){
tree.children("li").each(function(){
var node=$(this);
var item=$.extend({},$.parser.parseOptions(this,["id","iconCls","state"]),{checked:(node.attr("checked")?true:undefined)});
item.text=node.children("span").html();
if(!item.text){
item.text=node.html();
}
var _1be=node.children("ul");
if(_1be.length){
item.children=[];
_1bd(item.children,_1be);
}
aa.push(item);
});
};
};
var _1bf=1;
var _1c0={render:function(_1c1,ul,data){
var _1c2=$.data(_1c1,"tree");
var opts=_1c2.options;
var _1c3=$(ul).prev(".tree-node");
var _1c4=_1c3.length?$(_1c1).tree("getNode",_1c3[0]):null;
var _1c5=_1c3.find("span.tree-indent, span.tree-hit").length;
var cc=_1c6.call(this,_1c5,data);
$(ul).append(cc.join(""));
function _1c6(_1c7,_1c8){
var cc=[];
for(var i=0;i<_1c8.length;i++){
var item=_1c8[i];
if(item.state!="open"&&item.state!="closed"){
item.state="open";
}
item.domId="_extjsui_tree_"+_1bf++;
cc.push("<li>");
cc.push("<div id=\""+item.domId+"\" class=\"tree-node\">");
for(var j=0;j<_1c7;j++){
cc.push("<span class=\"tree-indent\"></span>");
}
if(item.state=="closed"){
cc.push("<span class=\"tree-hit tree-collapsed\"></span>");
cc.push("<span class=\"tree-icon tree-folder "+(item.iconCls?item.iconCls:"")+"\"></span>");
}else{
if(item.children&&item.children.length){
cc.push("<span class=\"tree-hit tree-expanded\"></span>");
cc.push("<span class=\"tree-icon tree-folder tree-folder-open "+(item.iconCls?item.iconCls:"")+"\"></span>");
}else{
cc.push("<span class=\"tree-indent\"></span>");
cc.push("<span class=\"tree-icon tree-file "+(item.iconCls?item.iconCls:"")+"\"></span>");
}
}
if(this.hasCheckbox(_1c1,item)){
var flag=0;
if(_1c4&&_1c4.checkState=="checked"&&opts.cascadeCheck){
flag=1;
item.checked=true;
}else{
if(item.checked){
$.extjsui.addArrayItem(_1c2.tmpIds,item.domId);
}
}
item.checkState=flag?"checked":"unchecked";
cc.push("<span class=\"tree-checkbox tree-checkbox"+flag+"\"></span>");
}else{
item.checkState=undefined;
item.checked=undefined;
}
cc.push("<span class=\"tree-title\">"+opts.formatter.call(_1c1,item)+"</span>");
cc.push("</div>");
if(item.children&&item.children.length){
var tmp=_1c6.call(this,_1c7+1,item.children);
cc.push("<ul style=\"display:"+(item.state=="closed"?"none":"block")+"\">");
cc=cc.concat(tmp);
cc.push("</ul>");
}
cc.push("</li>");
}
return cc;
};
},hasCheckbox:function(_1c9,item){
var _1ca=$.data(_1c9,"tree");
var opts=_1ca.options;
if(opts.checkbox){
if($.isFunction(opts.checkbox)){
if(opts.checkbox.call(_1c9,item)){
return true;
}else{
return false;
}
}else{
if(opts.onlyLeafCheck){
if(item.state=="open"&&!(item.children&&item.children.length)){
return true;
}
}else{
return true;
}
}
}
return false;
}};
$.fn.tree.defaults={url:null,method:"post",animate:false,checkbox:false,cascadeCheck:true,onlyLeafCheck:false,lines:false,dnd:false,data:null,queryParams:{},formatter:function(node){
return node.text;
},filter:function(q,node){
var qq=[];
$.map($.isArray(q)?q:[q],function(q){
q=$.trim(q);
if(q){
qq.push(q);
}
});
for(var i=0;i<qq.length;i++){
var _1cb=node.text.toLowerCase().indexOf(qq[i].toLowerCase());
if(_1cb>=0){
return true;
}
}
return !qq.length;
},loader:function(_1cc,_1cd,_1ce){
var opts=$(this).tree("options");
if(!opts.url){
return false;
}
$.ajax({type:opts.method,url:opts.url,data:_1cc,dataType:"json",success:function(data){
_1cd(data);
},error:function(){
_1ce.apply(this,arguments);
}});
},loadFilter:function(data,_1cf){
return data;
},view:_1c0,onBeforeLoad:function(node,_1d0){
},onLoadSuccess:function(node,data){
},onLoadError:function(){
},onClick:function(node){
},onDblClick:function(node){
},onBeforeExpand:function(node){
},onExpand:function(node){
},onBeforeCollapse:function(node){
},onCollapse:function(node){
},onBeforeCheck:function(node,_1d1){
},onCheck:function(node,_1d2){
},onBeforeSelect:function(node){
},onSelect:function(node){
},onContextMenu:function(e,node){
},onBeforeDrag:function(node){
},onStartDrag:function(node){
},onStopDrag:function(node){
},onDragEnter:function(_1d3,_1d4){
},onDragOver:function(_1d5,_1d6){
},onDragLeave:function(_1d7,_1d8){
},onBeforeDrop:function(_1d9,_1da,_1db){
},onDrop:function(_1dc,_1dd,_1de){
},onBeforeEdit:function(node){
},onAfterEdit:function(node){
},onCancelEdit:function(node){
}};
})(jQuery);
(function($){
function init(_1df){
$(_1df).addClass("progressbar");
$(_1df).html("<div class=\"progressbar-text\"></div><div class=\"progressbar-value\"><div class=\"progressbar-text\"></div></div>");
$(_1df).bind("_resize",function(e,_1e0){
if($(this).hasClass("extjsui-fluid")||_1e0){
_1e1(_1df);
}
return false;
});
return $(_1df);
};
function _1e1(_1e2,_1e3){
var opts=$.data(_1e2,"progressbar").options;
var bar=$.data(_1e2,"progressbar").bar;
if(_1e3){
opts.width=_1e3;
}
bar._size(opts);
bar.find("div.progressbar-text").css("width",bar.width());
bar.find("div.progressbar-text,div.progressbar-value").css({height:bar.height()+"px",lineHeight:bar.height()+"px"});
};
$.fn.progressbar=function(_1e4,_1e5){
if(typeof _1e4=="string"){
var _1e6=$.fn.progressbar.methods[_1e4];
if(_1e6){
return _1e6(this,_1e5);
}
}
_1e4=_1e4||{};
return this.each(function(){
var _1e7=$.data(this,"progressbar");
if(_1e7){
$.extend(_1e7.options,_1e4);
}else{
_1e7=$.data(this,"progressbar",{options:$.extend({},$.fn.progressbar.defaults,$.fn.progressbar.parseOptions(this),_1e4),bar:init(this)});
}
$(this).progressbar("setValue",_1e7.options.value);
_1e1(this);
});
};
$.fn.progressbar.methods={options:function(jq){
return $.data(jq[0],"progressbar").options;
},resize:function(jq,_1e8){
return jq.each(function(){
_1e1(this,_1e8);
});
},getValue:function(jq){
return $.data(jq[0],"progressbar").options.value;
},setValue:function(jq,_1e9){
if(_1e9<0){
_1e9=0;
}
if(_1e9>100){
_1e9=100;
}
return jq.each(function(){
var opts=$.data(this,"progressbar").options;
var text=opts.text.replace(/{value}/,_1e9);
var _1ea=opts.value;
opts.value=_1e9;
$(this).find("div.progressbar-value").width(_1e9+"%");
$(this).find("div.progressbar-text").html(text);
if(_1ea!=_1e9){
opts.onChange.call(this,_1e9,_1ea);
}
});
}};
$.fn.progressbar.parseOptions=function(_1eb){
return $.extend({},$.parser.parseOptions(_1eb,["width","height","text",{value:"number"}]));
};
$.fn.progressbar.defaults={width:"auto",height:22,value:0,text:"{value}%",onChange:function(_1ec,_1ed){
}};
})(jQuery);
(function($){
function init(_1ee){
$(_1ee).addClass("tooltip-f");
};
function _1ef(_1f0){
var opts=$.data(_1f0,"tooltip").options;
$(_1f0).unbind(".tooltip").bind(opts.showEvent+".tooltip",function(e){
$(_1f0).tooltip("show",e);
}).bind(opts.hideEvent+".tooltip",function(e){
$(_1f0).tooltip("hide",e);
}).bind("mousemove.tooltip",function(e){
if(opts.trackMouse){
opts.trackMouseX=e.pageX;
opts.trackMouseY=e.pageY;
$(_1f0).tooltip("reposition");
}
});
};
function _1f1(_1f2){
var _1f3=$.data(_1f2,"tooltip");
if(_1f3.showTimer){
clearTimeout(_1f3.showTimer);
_1f3.showTimer=null;
}
if(_1f3.hideTimer){
clearTimeout(_1f3.hideTimer);
_1f3.hideTimer=null;
}
};
function _1f4(_1f5){
var _1f6=$.data(_1f5,"tooltip");
if(!_1f6||!_1f6.tip){
return;
}
var opts=_1f6.options;
var tip=_1f6.tip;
var pos={left:-100000,top:-100000};
if($(_1f5).is(":visible")){
pos=_1f7(opts.position);
if(opts.position=="top"&&pos.top<0){
pos=_1f7("bottom");
}else{
if((opts.position=="bottom")&&(pos.top+tip._outerHeight()>$(window)._outerHeight()+$(document).scrollTop())){
pos=_1f7("top");
}
}
if(pos.left<0){
if(opts.position=="left"){
pos=_1f7("right");
}else{
$(_1f5).tooltip("arrow").css("left",tip._outerWidth()/2+pos.left);
pos.left=0;
}
}else{
if(pos.left+tip._outerWidth()>$(window)._outerWidth()+$(document)._scrollLeft()){
if(opts.position=="right"){
pos=_1f7("left");
}else{
var left=pos.left;
pos.left=$(window)._outerWidth()+$(document)._scrollLeft()-tip._outerWidth();
$(_1f5).tooltip("arrow").css("left",tip._outerWidth()/2-(pos.left-left));
}
}
}
}
tip.css({left:pos.left,top:pos.top,zIndex:(opts.zIndex!=undefined?opts.zIndex:($.fn.window?$.fn.window.defaults.zIndex++:""))});
opts.onPosition.call(_1f5,pos.left,pos.top);
function _1f7(_1f8){
opts.position=_1f8||"bottom";
tip.removeClass("tooltip-top tooltip-bottom tooltip-left tooltip-right").addClass("tooltip-"+opts.position);
var left,top;
var _1f9=$.isFunction(opts.deltaX)?opts.deltaX.call(_1f5,opts.position):opts.deltaX;
var _1fa=$.isFunction(opts.deltaY)?opts.deltaY.call(_1f5,opts.position):opts.deltaY;
if(opts.trackMouse){
t=$();
left=opts.trackMouseX+_1f9;
top=opts.trackMouseY+_1fa;
}else{
var t=$(_1f5);
left=t.offset().left+_1f9;
top=t.offset().top+_1fa;
}
switch(opts.position){
case "right":
left+=t._outerWidth()+12+(opts.trackMouse?12:0);
top-=(tip._outerHeight()-t._outerHeight())/2;
break;
case "left":
left-=tip._outerWidth()+12+(opts.trackMouse?12:0);
top-=(tip._outerHeight()-t._outerHeight())/2;
break;
case "top":
left-=(tip._outerWidth()-t._outerWidth())/2;
top-=tip._outerHeight()+12+(opts.trackMouse?12:0);
break;
case "bottom":
left-=(tip._outerWidth()-t._outerWidth())/2;
top+=t._outerHeight()+12+(opts.trackMouse?12:0);
break;
}
return {left:left,top:top};
};
};
function _1fb(_1fc,e){
var _1fd=$.data(_1fc,"tooltip");
var opts=_1fd.options;
var tip=_1fd.tip;
if(!tip){
tip=$("<div tabindex=\"-1\" class=\"tooltip\">"+"<div class=\"tooltip-content\"></div>"+"<div class=\"tooltip-arrow-outer\"></div>"+"<div class=\"tooltip-arrow\"></div>"+"</div>").appendTo("body");
_1fd.tip=tip;
_1fe(_1fc);
}
_1f1(_1fc);
_1fd.showTimer=setTimeout(function(){
$(_1fc).tooltip("reposition");
tip.show();
opts.onShow.call(_1fc,e);
var _1ff=tip.children(".tooltip-arrow-outer");
var _200=tip.children(".tooltip-arrow");
var bc="border-"+opts.position+"-color";
_1ff.add(_200).css({borderTopColor:"",borderBottomColor:"",borderLeftColor:"",borderRightColor:""});
_1ff.css(bc,tip.css(bc));
_200.css(bc,tip.css("backgroundColor"));
},opts.showDelay);
};
function _201(_202,e){
var _203=$.data(_202,"tooltip");
if(_203&&_203.tip){
_1f1(_202);
_203.hideTimer=setTimeout(function(){
_203.tip.hide();
_203.options.onHide.call(_202,e);
},_203.options.hideDelay);
}
};
function _1fe(_204,_205){
var _206=$.data(_204,"tooltip");
var opts=_206.options;
if(_205){
opts.content=_205;
}
if(!_206.tip){
return;
}
var cc=typeof opts.content=="function"?opts.content.call(_204):opts.content;
_206.tip.children(".tooltip-content").html(cc);
opts.onUpdate.call(_204,cc);
};
function _207(_208){
var _209=$.data(_208,"tooltip");
if(_209){
_1f1(_208);
var opts=_209.options;
if(_209.tip){
_209.tip.remove();
}
if(opts._title){
$(_208).attr("title",opts._title);
}
$.removeData(_208,"tooltip");
$(_208).unbind(".tooltip").removeClass("tooltip-f");
opts.onDestroy.call(_208);
}
};
$.fn.tooltip=function(_20a,_20b){
if(typeof _20a=="string"){
return $.fn.tooltip.methods[_20a](this,_20b);
}
_20a=_20a||{};
return this.each(function(){
var _20c=$.data(this,"tooltip");
if(_20c){
$.extend(_20c.options,_20a);
}else{
$.data(this,"tooltip",{options:$.extend({},$.fn.tooltip.defaults,$.fn.tooltip.parseOptions(this),_20a)});
init(this);
}
_1ef(this);
_1fe(this);
});
};
$.fn.tooltip.methods={options:function(jq){
return $.data(jq[0],"tooltip").options;
},tip:function(jq){
return $.data(jq[0],"tooltip").tip;
},arrow:function(jq){
return jq.tooltip("tip").children(".tooltip-arrow-outer,.tooltip-arrow");
},show:function(jq,e){
return jq.each(function(){
_1fb(this,e);
});
},hide:function(jq,e){
return jq.each(function(){
_201(this,e);
});
},update:function(jq,_20d){
return jq.each(function(){
_1fe(this,_20d);
});
},reposition:function(jq){
return jq.each(function(){
_1f4(this);
});
},destroy:function(jq){
return jq.each(function(){
_207(this);
});
}};
$.fn.tooltip.parseOptions=function(_20e){
var t=$(_20e);
var opts=$.extend({},$.parser.parseOptions(_20e,["position","showEvent","hideEvent","content",{trackMouse:"boolean",deltaX:"number",deltaY:"number",showDelay:"number",hideDelay:"number"}]),{_title:t.attr("title")});
t.attr("title","");
if(!opts.content){
opts.content=opts._title;
}
return opts;
};
$.fn.tooltip.defaults={position:"bottom",content:null,trackMouse:false,deltaX:0,deltaY:0,showEvent:"mouseenter",hideEvent:"mouseleave",showDelay:200,hideDelay:100,onShow:function(e){
},onHide:function(e){
},onUpdate:function(_20f){
},onPosition:function(left,top){
},onDestroy:function(){
}};
})(jQuery);
(function($){
$.fn._remove=function(){
return this.each(function(){
$(this).remove();
try{
this.outerHTML="";
}
catch(err){
}
});
};
function _210(node){
node._remove();
};
function _211(_212,_213){
var _214=$.data(_212,"panel");
var opts=_214.options;
var _215=_214.panel;
var _216=_215.children(".panel-header");
var _217=_215.children(".panel-body");
var _218=_215.children(".panel-footer");
if(_213){
$.extend(opts,{width:_213.width,height:_213.height,minWidth:_213.minWidth,maxWidth:_213.maxWidth,minHeight:_213.minHeight,maxHeight:_213.maxHeight,left:_213.left,top:_213.top});
}
_215._size(opts);
_216.add(_217)._outerWidth(_215.width());
if(!isNaN(parseInt(opts.height))){
_217._outerHeight(_215.height()-_216._outerHeight()-_218._outerHeight());
}else{
_217.css("height","");
var min=$.parser.parseValue("minHeight",opts.minHeight,_215.parent());
var max=$.parser.parseValue("maxHeight",opts.maxHeight,_215.parent());
var _219=_216._outerHeight()+_218._outerHeight()+_215._outerHeight()-_215.height();
_217._size("minHeight",min?(min-_219):"");
_217._size("maxHeight",max?(max-_219):"");
}
_215.css({height:"",minHeight:"",maxHeight:"",left:opts.left,top:opts.top});
opts.onResize.apply(_212,[opts.width,opts.height]);
$(_212).panel("doLayout");
};
function _21a(_21b,_21c){
var _21d=$.data(_21b,"panel");
var opts=_21d.options;
var _21e=_21d.panel;
if(_21c){
if(_21c.left!=null){
opts.left=_21c.left;
}
if(_21c.top!=null){
opts.top=_21c.top;
}
}
_21e.css({left:opts.left,top:opts.top});
_21e.find(".tooltip-f").each(function(){
$(this).tooltip("reposition");
});
opts.onMove.apply(_21b,[opts.left,opts.top]);
};
function _21f(_220){
$(_220).addClass("panel-body")._size("clear");
var _221=$("<div class=\"panel\"></div>").insertBefore(_220);
_221[0].appendChild(_220);
_221.bind("_resize",function(e,_222){
if($(this).hasClass("extjsui-fluid")||_222){
_211(_220);
}
return false;
});
return _221;
};
function _223(_224){
var _225=$.data(_224,"panel");
var opts=_225.options;
var _226=_225.panel;
_226.css(opts.style);
_226.addClass(opts.cls);
_227();
_228();
var _229=$(_224).panel("header");
var body=$(_224).panel("body");
var _22a=$(_224).siblings(".panel-footer");
if(opts.border){
_229.removeClass("panel-header-noborder");
body.removeClass("panel-body-noborder");
_22a.removeClass("panel-footer-noborder");
}else{
_229.addClass("panel-header-noborder");
body.addClass("panel-body-noborder");
_22a.addClass("panel-footer-noborder");
}
_229.addClass(opts.headerCls);
body.addClass(opts.bodyCls);
$(_224).attr("id",opts.id||"");
if(opts.content){
$(_224).panel("clear");
$(_224).html(opts.content);
$.parser.parse($(_224));
}
function _227(){
if(opts.noheader||(!opts.title&&!opts.header)){
_210(_226.children(".panel-header"));
_226.children(".panel-body").addClass("panel-body-noheader");
}else{
if(opts.header){
$(opts.header).addClass("panel-header").prependTo(_226);
}else{
var _22b=_226.children(".panel-header");
if(!_22b.length){
_22b=$("<div class=\"panel-header\"></div>").prependTo(_226);
}
if(!$.isArray(opts.tools)){
_22b.find("div.panel-tool .panel-tool-a").appendTo(opts.tools);
}
_22b.empty();
var _22c=$("<div class=\"panel-title\"></div>").html(opts.title).appendTo(_22b);
if(opts.iconCls){
_22c.addClass("panel-with-icon");
$("<div class=\"panel-icon\"></div>").addClass(opts.iconCls).appendTo(_22b);
}
var tool=$("<div class=\"panel-tool\"></div>").appendTo(_22b);
tool.bind("click",function(e){
e.stopPropagation();
});
if(opts.tools){
if($.isArray(opts.tools)){
$.map(opts.tools,function(t){
_22d(tool,t.iconCls,eval(t.handler));
});
}else{
$(opts.tools).children().each(function(){
$(this).addClass($(this).attr("iconCls")).addClass("panel-tool-a").appendTo(tool);
});
}
}
if(opts.collapsible){
_22d(tool,"panel-tool-collapse",function(){
if(opts.collapsed==true){
_24c(_224,true);
}else{
_23e(_224,true);
}
});
}
if(opts.minimizable){
_22d(tool,"panel-tool-min",function(){
_252(_224);
});
}
if(opts.maximizable){
_22d(tool,"panel-tool-max",function(){
if(opts.maximized==true){
_255(_224);
}else{
_23d(_224);
}
});
}
if(opts.closable){
_22d(tool,"panel-tool-close",function(){
_23f(_224);
});
}
}
_226.children("div.panel-body").removeClass("panel-body-noheader");
}
};
function _22d(c,icon,_22e){
var a=$("<a href=\"javascript:void(0)\"></a>").addClass(icon).appendTo(c);
a.bind("click",_22e);
};
function _228(){
if(opts.footer){
$(opts.footer).addClass("panel-footer").appendTo(_226);
$(_224).addClass("panel-body-nobottom");
}else{
_226.children(".panel-footer").remove();
$(_224).removeClass("panel-body-nobottom");
}
};
};
function _22f(_230,_231){
var _232=$.data(_230,"panel");
var opts=_232.options;
if(_233){
opts.queryParams=_231;
}
if(!opts.href){
return;
}
if(!_232.isLoaded||!opts.cache){
var _233=$.extend({},opts.queryParams);
if(opts.onBeforeLoad.call(_230,_233)==false){
return;
}
_232.isLoaded=false;
$(_230).panel("clear");
if(opts.loadingMessage){
$(_230).html($("<div class=\"panel-loading\"></div>").html(opts.loadingMessage));
}
opts.loader.call(_230,_233,function(data){
var _234=opts.extractor.call(_230,data);
$(_230).html(_234);
$.parser.parse($(_230));
opts.onLoad.apply(_230,arguments);
_232.isLoaded=true;
},function(){
opts.onLoadError.apply(_230,arguments);
});
}
};
function _235(_236){
var t=$(_236);
t.find(".combo-f").each(function(){
$(this).combo("destroy");
});
t.find(".m-btn").each(function(){
$(this).menubutton("destroy");
});
t.find(".s-btn").each(function(){
$(this).splitbutton("destroy");
});
t.find(".tooltip-f").each(function(){
$(this).tooltip("destroy");
});
t.children("div").each(function(){
$(this)._size("unfit");
});
t.empty();
};
function _237(_238){
$(_238).panel("doLayout",true);
};
function _239(_23a,_23b){
var opts=$.data(_23a,"panel").options;
var _23c=$.data(_23a,"panel").panel;
if(_23b!=true){
if(opts.onBeforeOpen.call(_23a)==false){
return;
}
}
_23c.stop(true,true);
if($.isFunction(opts.openAnimation)){
opts.openAnimation.call(_23a,cb);
}else{
switch(opts.openAnimation){
case "slide":
_23c.slideDown(opts.openDuration,cb);
break;
case "fade":
_23c.fadeIn(opts.openDuration,cb);
break;
case "show":
_23c.show(opts.openDuration,cb);
break;
default:
_23c.show();
cb();
}
}
function cb(){
opts.closed=false;
opts.minimized=false;
var tool=_23c.children(".panel-header").find("a.panel-tool-restore");
if(tool.length){
opts.maximized=true;
}
opts.onOpen.call(_23a);
if(opts.maximized==true){
opts.maximized=false;
_23d(_23a);
}
if(opts.collapsed==true){
opts.collapsed=false;
_23e(_23a);
}
if(!opts.collapsed){
_22f(_23a);
_237(_23a);
}
};
};
function _23f(_240,_241){
var _242=$.data(_240,"panel");
var opts=_242.options;
var _243=_242.panel;
if(_241!=true){
if(opts.onBeforeClose.call(_240)==false){
return;
}
}
_243.find(".tooltip-f").each(function(){
$(this).tooltip("hide");
});
_243.stop(true,true);
_243._size("unfit");
if($.isFunction(opts.closeAnimation)){
opts.closeAnimation.call(_240,cb);
}else{
switch(opts.closeAnimation){
case "slide":
_243.slideUp(opts.closeDuration,cb);
break;
case "fade":
_243.fadeOut(opts.closeDuration,cb);
break;
case "hide":
_243.hide(opts.closeDuration,cb);
break;
default:
_243.hide();
cb();
}
}
function cb(){
opts.closed=true;
opts.onClose.call(_240);
};
};
function _244(_245,_246){
var _247=$.data(_245,"panel");
var opts=_247.options;
var _248=_247.panel;
if(_246!=true){
if(opts.onBeforeDestroy.call(_245)==false){
return;
}
}
$(_245).panel("clear").panel("clear","footer");
_210(_248);
opts.onDestroy.call(_245);
};
function _23e(_249,_24a){
var opts=$.data(_249,"panel").options;
var _24b=$.data(_249,"panel").panel;
var body=_24b.children(".panel-body");
var tool=_24b.children(".panel-header").find("a.panel-tool-collapse");
if(opts.collapsed==true){
return;
}
body.stop(true,true);
if(opts.onBeforeCollapse.call(_249)==false){
return;
}
tool.addClass("panel-tool-expand");
if(_24a==true){
body.slideUp("normal",function(){
opts.collapsed=true;
opts.onCollapse.call(_249);
});
}else{
body.hide();
opts.collapsed=true;
opts.onCollapse.call(_249);
}
};
function _24c(_24d,_24e){
var opts=$.data(_24d,"panel").options;
var _24f=$.data(_24d,"panel").panel;
var body=_24f.children(".panel-body");
var tool=_24f.children(".panel-header").find("a.panel-tool-collapse");
if(opts.collapsed==false){
return;
}
body.stop(true,true);
if(opts.onBeforeExpand.call(_24d)==false){
return;
}
tool.removeClass("panel-tool-expand");
if(_24e==true){
body.slideDown("normal",function(){
opts.collapsed=false;
opts.onExpand.call(_24d);
_22f(_24d);
_237(_24d);
});
}else{
body.show();
opts.collapsed=false;
opts.onExpand.call(_24d);
_22f(_24d);
_237(_24d);
}
};
function _23d(_250){
var opts=$.data(_250,"panel").options;
var _251=$.data(_250,"panel").panel;
var tool=_251.children(".panel-header").find("a.panel-tool-max");
if(opts.maximized==true){
return;
}
tool.addClass("panel-tool-restore");
if(!$.data(_250,"panel").original){
$.data(_250,"panel").original={width:opts.width,height:opts.height,left:opts.left,top:opts.top,fit:opts.fit};
}
opts.left=0;
opts.top=0;
opts.fit=true;
_211(_250);
opts.minimized=false;
opts.maximized=true;
opts.onMaximize.call(_250);
};
function _252(_253){
var opts=$.data(_253,"panel").options;
var _254=$.data(_253,"panel").panel;
_254._size("unfit");
_254.hide();
opts.minimized=true;
opts.maximized=false;
opts.onMinimize.call(_253);
};
function _255(_256){
var opts=$.data(_256,"panel").options;
var _257=$.data(_256,"panel").panel;
var tool=_257.children(".panel-header").find("a.panel-tool-max");
if(opts.maximized==false){
return;
}
_257.show();
tool.removeClass("panel-tool-restore");
$.extend(opts,$.data(_256,"panel").original);
_211(_256);
opts.minimized=false;
opts.maximized=false;
$.data(_256,"panel").original=null;
opts.onRestore.call(_256);
};
function _258(_259,_25a){
$.data(_259,"panel").options.title=_25a;
$(_259).panel("header").find("div.panel-title").html(_25a);
};
var _25b=null;
$(window).unbind(".panel").bind("resize.panel",function(){
if(_25b){
clearTimeout(_25b);
}
_25b=setTimeout(function(){
var _25c=$("body.layout");
if(_25c.length){
_25c.layout("resize");
$("body").children(".extjsui-fluid:visible").each(function(){
$(this).triggerHandler("_resize");
});
}else{
$("body").panel("doLayout");
}
_25b=null;
},100);
});
$.fn.panel=function(_25d,_25e){
if(typeof _25d=="string"){
return $.fn.panel.methods[_25d](this,_25e);
}
_25d=_25d||{};
return this.each(function(){
var _25f=$.data(this,"panel");
var opts;
if(_25f){
opts=$.extend(_25f.options,_25d);
_25f.isLoaded=false;
}else{
opts=$.extend({},$.fn.panel.defaults,$.fn.panel.parseOptions(this),_25d);
$(this).attr("title","");
_25f=$.data(this,"panel",{options:opts,panel:_21f(this),isLoaded:false});
}
_223(this);
$(this).show();
if(opts.doSize==true){
_25f.panel.css("display","block");
_211(this);
}
if(opts.closed==true||opts.minimized==true){
_25f.panel.hide();
}else{
_239(this);
}
});
};
$.fn.panel.methods={options:function(jq){
return $.data(jq[0],"panel").options;
},panel:function(jq){
return $.data(jq[0],"panel").panel;
},header:function(jq){
return $.data(jq[0],"panel").panel.children(".panel-header");
},footer:function(jq){
return jq.panel("panel").children(".panel-footer");
},body:function(jq){
return $.data(jq[0],"panel").panel.children(".panel-body");
},setTitle:function(jq,_260){
return jq.each(function(){
_258(this,_260);
});
},open:function(jq,_261){
return jq.each(function(){
_239(this,_261);
});
},close:function(jq,_262){
return jq.each(function(){
_23f(this,_262);
});
},destroy:function(jq,_263){
return jq.each(function(){
_244(this,_263);
});
},clear:function(jq,type){
return jq.each(function(){
_235(type=="footer"?$(this).panel("footer"):this);
});
},refresh:function(jq,href){
return jq.each(function(){
var _264=$.data(this,"panel");
_264.isLoaded=false;
if(href){
if(typeof href=="string"){
_264.options.href=href;
}else{
_264.options.queryParams=href;
}
}
_22f(this);
});
},resize:function(jq,_265){
return jq.each(function(){
_211(this,_265);
});
},doLayout:function(jq,all){
return jq.each(function(){
_266(this,"body");
_266($(this).siblings(".panel-footer")[0],"footer");
function _266(_267,type){
if(!_267){
return;
}
var _268=_267==$("body")[0];
var s=$(_267).find("div.panel:visible,div.accordion:visible,div.tabs-container:visible,div.layout:visible,.extjsui-fluid:visible").filter(function(_269,el){
var p=$(el).parents(".panel-"+type+":first");
return _268?p.length==0:p[0]==_267;
});
s.each(function(){
$(this).triggerHandler("_resize",[all||false]);
});
};
});
},move:function(jq,_26a){
return jq.each(function(){
_21a(this,_26a);
});
},maximize:function(jq){
return jq.each(function(){
_23d(this);
});
},minimize:function(jq){
return jq.each(function(){
_252(this);
});
},restore:function(jq){
return jq.each(function(){
_255(this);
});
},collapse:function(jq,_26b){
return jq.each(function(){
_23e(this,_26b);
});
},expand:function(jq,_26c){
return jq.each(function(){
_24c(this,_26c);
});
}};
$.fn.panel.parseOptions=function(_26d){
var t=$(_26d);
var hh=t.children(".panel-header,header");
var ff=t.children(".panel-footer,footer");
return $.extend({},$.parser.parseOptions(_26d,["id","width","height","left","top","title","iconCls","cls","headerCls","bodyCls","tools","href","method","header","footer",{cache:"boolean",fit:"boolean",border:"boolean",noheader:"boolean"},{collapsible:"boolean",minimizable:"boolean",maximizable:"boolean"},{closable:"boolean",collapsed:"boolean",minimized:"boolean",maximized:"boolean",closed:"boolean"},"openAnimation","closeAnimation",{openDuration:"number",closeDuration:"number"},]),{loadingMessage:(t.attr("loadingMessage")!=undefined?t.attr("loadingMessage"):undefined),header:(hh.length?hh.removeClass("panel-header"):undefined),footer:(ff.length?ff.removeClass("panel-footer"):undefined)});
};
$.fn.panel.defaults={id:null,title:null,iconCls:null,width:"auto",height:"auto",left:null,top:null,cls:null,headerCls:null,bodyCls:null,style:{},href:null,cache:true,fit:false,border:true,doSize:true,noheader:false,content:null,collapsible:false,minimizable:false,maximizable:false,closable:false,collapsed:false,minimized:false,maximized:false,closed:false,openAnimation:false,openDuration:400,closeAnimation:false,closeDuration:400,tools:null,footer:null,header:null,queryParams:{},method:"get",href:null,loadingMessage:"Loading...",loader:function(_26e,_26f,_270){
var opts=$(this).panel("options");
if(!opts.href){
return false;
}
$.ajax({type:opts.method,url:opts.href,cache:false,data:_26e,dataType:"html",success:function(data){
_26f(data);
},error:function(){
_270.apply(this,arguments);
}});
},extractor:function(data){
var _271=/<body[^>]*>((.|[\n\r])*)<\/body>/im;
var _272=_271.exec(data);
if(_272){
return _272[1];
}else{
return data;
}
},onBeforeLoad:function(_273){
},onLoad:function(){
},onLoadError:function(){
},onBeforeOpen:function(){
},onOpen:function(){
},onBeforeClose:function(){
},onClose:function(){
},onBeforeDestroy:function(){
},onDestroy:function(){
},onResize:function(_274,_275){
},onMove:function(left,top){
},onMaximize:function(){
},onRestore:function(){
},onMinimize:function(){
},onBeforeCollapse:function(){
},onBeforeExpand:function(){
},onCollapse:function(){
},onExpand:function(){
}};
})(jQuery);
(function($){
function _276(_277,_278){
var _279=$.data(_277,"window");
if(_278){
if(_278.left!=null){
_279.options.left=_278.left;
}
if(_278.top!=null){
_279.options.top=_278.top;
}
}
$(_277).panel("move",_279.options);
if(_279.shadow){
_279.shadow.css({left:_279.options.left,top:_279.options.top});
}
};
function _27a(_27b,_27c){
var opts=$.data(_27b,"window").options;
var pp=$(_27b).window("panel");
var _27d=pp._outerWidth();
if(opts.inline){
var _27e=pp.parent();
opts.left=Math.ceil((_27e.width()-_27d)/2+_27e.scrollLeft());
}else{
opts.left=Math.ceil(($(window)._outerWidth()-_27d)/2+$(document).scrollLeft());
}
if(_27c){
_276(_27b);
}
};
function _27f(_280,_281){
var opts=$.data(_280,"window").options;
var pp=$(_280).window("panel");
var _282=pp._outerHeight();
if(opts.inline){
var _283=pp.parent();
opts.top=Math.ceil((_283.height()-_282)/2+_283.scrollTop());
}else{
opts.top=Math.ceil(($(window)._outerHeight()-_282)/2+$(document).scrollTop());
}
if(_281){
_276(_280);
}
};
function _284(_285){
var _286=$.data(_285,"window");
var opts=_286.options;
var win=$(_285).panel($.extend({},_286.options,{border:false,doSize:true,closed:true,cls:"window "+(!opts.border?"window-thinborder window-noborder ":(opts.border=="thin"?"window-thinborder ":""))+(opts.cls||""),headerCls:"window-header "+(opts.headerCls||""),bodyCls:"window-body "+(opts.noheader?"window-body-noheader ":" ")+(opts.bodyCls||""),onBeforeDestroy:function(){
if(opts.onBeforeDestroy.call(_285)==false){
return false;
}
if(_286.shadow){
_286.shadow.remove();
}
if(_286.mask){
_286.mask.remove();
}
},onClose:function(){
if(_286.shadow){
_286.shadow.hide();
}
if(_286.mask){
_286.mask.hide();
}
opts.onClose.call(_285);
},onOpen:function(){
if(_286.mask){
_286.mask.css($.extend({display:"block",zIndex:$.fn.window.defaults.zIndex++},$.fn.window.getMaskSize(_285)));
}
if(_286.shadow){
_286.shadow.css({display:"block",zIndex:$.fn.window.defaults.zIndex++,left:opts.left,top:opts.top,width:_286.window._outerWidth(),height:_286.window._outerHeight()});
}
_286.window.css("z-index",$.fn.window.defaults.zIndex++);
opts.onOpen.call(_285);
},onResize:function(_287,_288){
var _289=$(this).panel("options");
$.extend(opts,{width:_289.width,height:_289.height,left:_289.left,top:_289.top});
if(_286.shadow){
_286.shadow.css({left:opts.left,top:opts.top,width:_286.window._outerWidth(),height:_286.window._outerHeight()});
}
opts.onResize.call(_285,_287,_288);
},onMinimize:function(){
if(_286.shadow){
_286.shadow.hide();
}
if(_286.mask){
_286.mask.hide();
}
_286.options.onMinimize.call(_285);
},onBeforeCollapse:function(){
if(opts.onBeforeCollapse.call(_285)==false){
return false;
}
if(_286.shadow){
_286.shadow.hide();
}
},onExpand:function(){
if(_286.shadow){
_286.shadow.show();
}
opts.onExpand.call(_285);
}}));
_286.window=win.panel("panel");
if(_286.mask){
_286.mask.remove();
}
if(opts.modal){
_286.mask=$("<div class=\"window-mask\" style=\"display:none\"></div>").insertAfter(_286.window);
}
if(_286.shadow){
_286.shadow.remove();
}
if(opts.shadow){
_286.shadow=$("<div class=\"window-shadow\" style=\"display:none\"></div>").insertAfter(_286.window);
}
var _28a=opts.closed;
if(opts.left==null){
_27a(_285);
}
if(opts.top==null){
_27f(_285);
}
_276(_285);
if(!_28a){
win.window("open");
}
};
function _28b(_28c){
var _28d=$.data(_28c,"window");
_28d.window.draggable({handle:">div.panel-header>div.panel-title",disabled:_28d.options.draggable==false,onBeforeDrag:function(e){
if(_28d.mask){
_28d.mask.css("z-index",$.fn.window.defaults.zIndex++);
}
if(_28d.shadow){
_28d.shadow.css("z-index",$.fn.window.defaults.zIndex++);
}
_28d.window.css("z-index",$.fn.window.defaults.zIndex++);
},onStartDrag:function(e){
if(!_28d.proxy){
_28d.proxy=$("<div class=\"window-proxy\"></div>").insertAfter(_28d.window);
}
_28d.proxy.css({display:"none",zIndex:$.fn.window.defaults.zIndex++,left:e.data.left,top:e.data.top});
_28d.proxy._outerWidth(_28d.window._outerWidth());
_28d.proxy._outerHeight(_28d.window._outerHeight());
setTimeout(function(){
if(_28d.proxy){
_28d.proxy.show();
}
},500);
},onDrag:function(e){
_28d.proxy.css({display:"block",left:e.data.left,top:e.data.top});
return false;
},onStopDrag:function(e){
_28d.options.left=e.data.left;
_28d.options.top=e.data.top;
$(_28c).window("move");
_28d.proxy.remove();
_28d.proxy=null;
}});
_28d.window.resizable({disabled:_28d.options.resizable==false,onStartResize:function(e){
if(_28d.pmask){
_28d.pmask.remove();
}
_28d.pmask=$("<div class=\"window-proxy-mask\"></div>").insertAfter(_28d.window);
_28d.pmask.css({zIndex:$.fn.window.defaults.zIndex++,left:e.data.left,top:e.data.top,width:_28d.window._outerWidth(),height:_28d.window._outerHeight()});
if(_28d.proxy){
_28d.proxy.remove();
}
_28d.proxy=$("<div class=\"window-proxy\"></div>").insertAfter(_28d.window);
_28d.proxy.css({zIndex:$.fn.window.defaults.zIndex++,left:e.data.left,top:e.data.top});
_28d.proxy._outerWidth(e.data.width)._outerHeight(e.data.height);
},onResize:function(e){
_28d.proxy.css({left:e.data.left,top:e.data.top});
_28d.proxy._outerWidth(e.data.width);
_28d.proxy._outerHeight(e.data.height);
return false;
},onStopResize:function(e){
$(_28c).window("resize",e.data);
_28d.pmask.remove();
_28d.pmask=null;
_28d.proxy.remove();
_28d.proxy=null;
}});
};
$(window).resize(function(){
$("body>div.window-mask").css({width:$(window)._outerWidth(),height:$(window)._outerHeight()});
setTimeout(function(){
$("body>div.window-mask").css($.fn.window.getMaskSize());
},50);
});
$.fn.window=function(_28e,_28f){
if(typeof _28e=="string"){
var _290=$.fn.window.methods[_28e];
if(_290){
return _290(this,_28f);
}else{
return this.panel(_28e,_28f);
}
}
_28e=_28e||{};
return this.each(function(){
var _291=$.data(this,"window");
if(_291){
$.extend(_291.options,_28e);
}else{
_291=$.data(this,"window",{options:$.extend({},$.fn.window.defaults,$.fn.window.parseOptions(this),_28e)});
if(!_291.options.inline){
document.body.appendChild(this);
}
}
_284(this);
_28b(this);
});
};
$.fn.window.methods={options:function(jq){
var _292=jq.panel("options");
var _293=$.data(jq[0],"window").options;
return $.extend(_293,{closed:_292.closed,collapsed:_292.collapsed,minimized:_292.minimized,maximized:_292.maximized});
},window:function(jq){
return $.data(jq[0],"window").window;
},move:function(jq,_294){
return jq.each(function(){
_276(this,_294);
});
},hcenter:function(jq){
return jq.each(function(){
_27a(this,true);
});
},vcenter:function(jq){
return jq.each(function(){
_27f(this,true);
});
},center:function(jq){
return jq.each(function(){
_27a(this);
_27f(this);
_276(this);
});
}};
$.fn.window.getMaskSize=function(_295){
var _296=$(_295).data("window");
var _297=(_296&&_296.options.inline);
return {width:(_297?"100%":$(document).width()),height:(_297?"100%":$(document).height())};
};
$.fn.window.parseOptions=function(_298){
return $.extend({},$.fn.panel.parseOptions(_298),$.parser.parseOptions(_298,[{draggable:"boolean",resizable:"boolean",shadow:"boolean",modal:"boolean",inline:"boolean"}]));
};
$.fn.window.defaults=$.extend({},$.fn.panel.defaults,{zIndex:9000,draggable:true,resizable:true,shadow:true,modal:false,border:true,inline:false,title:"New Window",collapsible:true,minimizable:true,maximizable:true,closable:true,closed:false});
})(jQuery);
(function($){
function _299(_29a){
var opts=$.data(_29a,"dialog").options;
opts.inited=false;
$(_29a).window($.extend({},opts,{onResize:function(w,h){
if(opts.inited){
_29f(this);
opts.onResize.call(this,w,h);
}
}}));
var win=$(_29a).window("window");
if(opts.toolbar){
if($.isArray(opts.toolbar)){
$(_29a).siblings("div.dialog-toolbar").remove();
var _29b=$("<div class=\"dialog-toolbar\"><table cellspacing=\"0\" cellpadding=\"0\"><tr></tr></table></div>").appendTo(win);
var tr=_29b.find("tr");
for(var i=0;i<opts.toolbar.length;i++){
var btn=opts.toolbar[i];
if(btn=="-"){
$("<td><div class=\"dialog-tool-separator\"></div></td>").appendTo(tr);
}else{
var td=$("<td></td>").appendTo(tr);
var tool=$("<a href=\"javascript:void(0)\"></a>").appendTo(td);
tool[0].onclick=eval(btn.handler||function(){
});
tool.linkbutton($.extend({},btn,{plain:true}));
}
}
}else{
$(opts.toolbar).addClass("dialog-toolbar").appendTo(win);
$(opts.toolbar).show();
}
}else{
$(_29a).siblings("div.dialog-toolbar").remove();
}
if(opts.buttons){
if($.isArray(opts.buttons)){
$(_29a).siblings("div.dialog-button").remove();
var _29c=$("<div class=\"dialog-button\"></div>").appendTo(win);
for(var i=0;i<opts.buttons.length;i++){
var p=opts.buttons[i];
var _29d=$("<a href=\"javascript:void(0)\"></a>").appendTo(_29c);
if(p.handler){
_29d[0].onclick=p.handler;
}
_29d.linkbutton(p);
}
}else{
$(opts.buttons).addClass("dialog-button").appendTo(win);
$(opts.buttons).show();
}
}else{
$(_29a).siblings("div.dialog-button").remove();
}
opts.inited=true;
var _29e=opts.closed;
win.show();
$(_29a).window("resize");
if(_29e){
win.hide();
}
};
function _29f(_2a0,_2a1){
var t=$(_2a0);
var opts=t.dialog("options");
var _2a2=opts.noheader;
var tb=t.siblings(".dialog-toolbar");
var bb=t.siblings(".dialog-button");
tb.insertBefore(_2a0).css({borderTopWidth:(_2a2?1:0),top:(_2a2?tb.length:0)});
bb.insertAfter(_2a0);
tb.add(bb)._outerWidth(t._outerWidth()).find(".extjsui-fluid:visible").each(function(){
$(this).triggerHandler("_resize");
});
var _2a3=tb._outerHeight()+bb._outerHeight();
if(!isNaN(parseInt(opts.height))){
t._outerHeight(t._outerHeight()-_2a3);
}else{
var _2a4=t._size("min-height");
if(_2a4){
t._size("min-height",_2a4-_2a3);
}
var _2a5=t._size("max-height");
if(_2a5){
t._size("max-height",_2a5-_2a3);
}
}
var _2a6=$.data(_2a0,"window").shadow;
if(_2a6){
var cc=t.panel("panel");
_2a6.css({width:cc._outerWidth(),height:cc._outerHeight()});
}
};
$.fn.dialog=function(_2a7,_2a8){
if(typeof _2a7=="string"){
var _2a9=$.fn.dialog.methods[_2a7];
if(_2a9){
return _2a9(this,_2a8);
}else{
return this.window(_2a7,_2a8);
}
}
_2a7=_2a7||{};
return this.each(function(){
var _2aa=$.data(this,"dialog");
if(_2aa){
$.extend(_2aa.options,_2a7);
}else{
$.data(this,"dialog",{options:$.extend({},$.fn.dialog.defaults,$.fn.dialog.parseOptions(this),_2a7)});
}
_299(this);
});
};
$.fn.dialog.methods={options:function(jq){
var _2ab=$.data(jq[0],"dialog").options;
var _2ac=jq.panel("options");
$.extend(_2ab,{width:_2ac.width,height:_2ac.height,left:_2ac.left,top:_2ac.top,closed:_2ac.closed,collapsed:_2ac.collapsed,minimized:_2ac.minimized,maximized:_2ac.maximized});
return _2ab;
},dialog:function(jq){
return jq.window("window");
}};
$.fn.dialog.parseOptions=function(_2ad){
var t=$(_2ad);
return $.extend({},$.fn.window.parseOptions(_2ad),$.parser.parseOptions(_2ad,["toolbar","buttons"]),{toolbar:(t.children(".dialog-toolbar").length?t.children(".dialog-toolbar").removeClass("dialog-toolbar"):undefined),buttons:(t.children(".dialog-button").length?t.children(".dialog-button").removeClass("dialog-button"):undefined)});
};
$.fn.dialog.defaults=$.extend({},$.fn.window.defaults,{title:"New Dialog",collapsible:false,minimizable:false,maximizable:false,resizable:false,toolbar:null,buttons:null});
})(jQuery);
(function($){
function _2ae(){
$(document).unbind(".messager").bind("keydown.messager",function(e){
if(e.keyCode==27){
$("body").children("div.messager-window").children("div.messager-body").each(function(){
$(this).dialog("close");
});
}else{
if(e.keyCode==9){
var win=$("body").children("div.messager-window");
if(!win.length){
return;
}
var _2af=win.find(".messager-input,.messager-button .l-btn");
for(var i=0;i<_2af.length;i++){
if($(_2af[i]).is(":focus")){
$(_2af[i>=_2af.length-1?0:i+1]).focus();
return false;
}
}
}else{
if(e.keyCode==13){
var _2b0=$(e.target).closest("input.messager-input");
if(_2b0.length){
var dlg=_2b0.closest(".messager-body");
_2b1(dlg,_2b0.val());
}
}
}
}
});
};
function _2b2(){
$(document).unbind(".messager");
};
function _2b3(_2b4){
var opts=$.extend({},$.messager.defaults,{modal:false,shadow:false,draggable:false,resizable:false,closed:true,style:{left:"",top:"",right:0,zIndex:$.fn.window.defaults.zIndex++,bottom:-document.body.scrollTop-document.documentElement.scrollTop},title:"",width:250,height:100,minHeight:0,showType:"slide",showSpeed:600,content:_2b4.msg,timeout:4000},_2b4);
var dlg=$("<div class=\"messager-body\"></div>").appendTo("body");
dlg.dialog($.extend({},opts,{noheader:(opts.title?false:true),openAnimation:(opts.showType),closeAnimation:(opts.showType=="show"?"hide":opts.showType),openDuration:opts.showSpeed,closeDuration:opts.showSpeed,onOpen:function(){
dlg.dialog("dialog").hover(function(){
if(opts.timer){
clearTimeout(opts.timer);
}
},function(){
_2b5();
});
_2b5();
function _2b5(){
if(opts.timeout>0){
opts.timer=setTimeout(function(){
if(dlg.length&&dlg.data("dialog")){
dlg.dialog("close");
}
},opts.timeout);
}
};
if(_2b4.onOpen){
_2b4.onOpen.call(this);
}else{
opts.onOpen.call(this);
}
},onClose:function(){
if(opts.timer){
clearTimeout(opts.timer);
}
if(_2b4.onClose){
_2b4.onClose.call(this);
}else{
opts.onClose.call(this);
}
dlg.dialog("destroy");
}}));
dlg.dialog("dialog").css(opts.style);
dlg.dialog("open");
return dlg;
};
function _2b6(_2b7){
_2ae();
var dlg=$("<div class=\"messager-body\"></div>").appendTo("body");
dlg.dialog($.extend({},_2b7,{noheader:(_2b7.title?false:true),onClose:function(){
_2b2();
if(_2b7.onClose){
_2b7.onClose.call(this);
}
setTimeout(function(){
dlg.dialog("destroy");
},100);
}}));
var win=dlg.dialog("dialog").addClass("messager-window");
win.find(".dialog-button").addClass("messager-button").find("a:first").focus();
return dlg;
};
function _2b1(dlg,_2b8){
dlg.dialog("close");
dlg.dialog("options").fn(_2b8);
};
$.messager={show:function(_2b9){
return _2b3(_2b9);
},alert:function(_2ba,msg,icon,fn){
var opts=typeof _2ba=="object"?_2ba:{title:_2ba,msg:msg,icon:icon,fn:fn};
var cls=opts.icon?"messager-icon messager-"+opts.icon:"";
opts=$.extend({},$.messager.defaults,{content:"<div class=\""+cls+"\"></div>"+"<div>"+opts.msg+"</div>"+"<div style=\"clear:both;\"/>"},opts);
if(!opts.buttons){
opts.buttons=[{text:opts.ok,onClick:function(){
_2b1(dlg);
}}];
}
var dlg=_2b6(opts);
return dlg;
},confirm:function(_2bb,msg,fn){
var opts=typeof _2bb=="object"?_2bb:{title:_2bb,msg:msg,fn:fn};
opts=$.extend({},$.messager.defaults,{content:"<div class=\"messager-icon messager-question\"></div>"+"<div>"+opts.msg+"</div>"+"<div style=\"clear:both;\"/>"},opts);
if(!opts.buttons){
opts.buttons=[{text:opts.ok,onClick:function(){
_2b1(dlg,true);
}},{text:opts.cancel,onClick:function(){
_2b1(dlg,false);
}}];
}
var dlg=_2b6(opts);
return dlg;
},prompt:function(_2bc,msg,fn){
var opts=typeof _2bc=="object"?_2bc:{title:_2bc,msg:msg,fn:fn};
opts=$.extend({},$.messager.defaults,{content:"<div class=\"messager-icon messager-question\"></div>"+"<div>"+opts.msg+"</div>"+"<br/>"+"<div style=\"clear:both;\"/>"+"<div><input class=\"messager-input\" type=\"text\"/></div>"},opts);
if(!opts.buttons){
opts.buttons=[{text:opts.ok,onClick:function(){
_2b1(dlg,dlg.find(".messager-input").val());
}},{text:opts.cancel,onClick:function(){
_2b1(dlg);
}}];
}
var dlg=_2b6(opts);
dlg.find(".messager-input").focus();
return dlg;
},progress:function(_2bd){
var _2be={bar:function(){
return $("body>div.messager-window").find("div.messager-p-bar");
},close:function(){
var dlg=$("body>div.messager-window>div.messager-body:has(div.messager-progress)");
if(dlg.length){
dlg.dialog("close");
}
}};
if(typeof _2bd=="string"){
var _2bf=_2be[_2bd];
return _2bf();
}
_2bd=_2bd||{};
var opts=$.extend({},{title:"",minHeight:0,content:undefined,msg:"",text:undefined,interval:300},_2bd);
var dlg=_2b6($.extend({},$.messager.defaults,{content:"<div class=\"messager-progress\"><div class=\"messager-p-msg\">"+opts.msg+"</div><div class=\"messager-p-bar\"></div></div>",closable:false,doSize:false},opts,{onClose:function(){
if(this.timer){
clearInterval(this.timer);
}
if(_2bd.onClose){
_2bd.onClose.call(this);
}else{
$.messager.defaults.onClose.call(this);
}
}}));
var bar=dlg.find("div.messager-p-bar");
bar.progressbar({text:opts.text});
dlg.dialog("resize");
if(opts.interval){
dlg[0].timer=setInterval(function(){
var v=bar.progressbar("getValue");
v+=10;
if(v>100){
v=0;
}
bar.progressbar("setValue",v);
},opts.interval);
}
return dlg;
}};
$.messager.defaults=$.extend({},$.fn.dialog.defaults,{ok:"Ok",cancel:"Cancel",width:300,height:"auto",minHeight:150,modal:true,collapsible:false,minimizable:false,maximizable:false,resizable:false,fn:function(){
}});
})(jQuery);
(function($){
function _2c0(_2c1,_2c2){
var _2c3=$.data(_2c1,"accordion");
var opts=_2c3.options;
var _2c4=_2c3.panels;
var cc=$(_2c1);
if(_2c2){
$.extend(opts,{width:_2c2.width,height:_2c2.height});
}
cc._size(opts);
var _2c5=0;
var _2c6="auto";
var _2c7=cc.find(">.panel>.accordion-header");
if(_2c7.length){
_2c5=$(_2c7[0]).css("height","")._outerHeight();
}
if(!isNaN(parseInt(opts.height))){
_2c6=cc.height()-_2c5*_2c7.length;
}
_2c8(true,_2c6-_2c8(false)+1);
function _2c8(_2c9,_2ca){
var _2cb=0;
for(var i=0;i<_2c4.length;i++){
var p=_2c4[i];
var h=p.panel("header")._outerHeight(_2c5);
if(p.panel("options").collapsible==_2c9){
var _2cc=isNaN(_2ca)?undefined:(_2ca+_2c5*h.length);
p.panel("resize",{width:cc.width(),height:(_2c9?_2cc:undefined)});
_2cb+=p.panel("panel").outerHeight()-_2c5*h.length;
}
}
return _2cb;
};
};
function _2cd(_2ce,_2cf,_2d0,all){
var _2d1=$.data(_2ce,"accordion").panels;
var pp=[];
for(var i=0;i<_2d1.length;i++){
var p=_2d1[i];
if(_2cf){
if(p.panel("options")[_2cf]==_2d0){
pp.push(p);
}
}else{
if(p[0]==$(_2d0)[0]){
return i;
}
}
}
if(_2cf){
return all?pp:(pp.length?pp[0]:null);
}else{
return -1;
}
};
function _2d2(_2d3){
return _2cd(_2d3,"collapsed",false,true);
};
function _2d4(_2d5){
var pp=_2d2(_2d5);
return pp.length?pp[0]:null;
};
function _2d6(_2d7,_2d8){
return _2cd(_2d7,null,_2d8);
};
function _2d9(_2da,_2db){
var _2dc=$.data(_2da,"accordion").panels;
if(typeof _2db=="number"){
if(_2db<0||_2db>=_2dc.length){
return null;
}else{
return _2dc[_2db];
}
}
return _2cd(_2da,"title",_2db);
};
function _2dd(_2de){
var opts=$.data(_2de,"accordion").options;
var cc=$(_2de);
if(opts.border){
cc.removeClass("accordion-noborder");
}else{
cc.addClass("accordion-noborder");
}
};
function init(_2df){
var _2e0=$.data(_2df,"accordion");
var cc=$(_2df);
cc.addClass("accordion");
_2e0.panels=[];
cc.children("div").each(function(){
var opts=$.extend({},$.parser.parseOptions(this),{selected:($(this).attr("selected")?true:undefined)});
var pp=$(this);
_2e0.panels.push(pp);
_2e2(_2df,pp,opts);
});
cc.bind("_resize",function(e,_2e1){
if($(this).hasClass("extjsui-fluid")||_2e1){
_2c0(_2df);
}
return false;
});
};
function _2e2(_2e3,pp,_2e4){
var opts=$.data(_2e3,"accordion").options;
pp.panel($.extend({},{collapsible:true,minimizable:false,maximizable:false,closable:false,doSize:false,collapsed:true,headerCls:"accordion-header",bodyCls:"accordion-body"},_2e4,{onBeforeExpand:function(){
if(_2e4.onBeforeExpand){
if(_2e4.onBeforeExpand.call(this)==false){
return false;
}
}
if(!opts.multiple){
var all=$.grep(_2d2(_2e3),function(p){
return p.panel("options").collapsible;
});
for(var i=0;i<all.length;i++){
_2ec(_2e3,_2d6(_2e3,all[i]));
}
}
var _2e5=$(this).panel("header");
_2e5.addClass("accordion-header-selected");
_2e5.find(".accordion-collapse").removeClass("accordion-expand");
},onExpand:function(){
if(_2e4.onExpand){
_2e4.onExpand.call(this);
}
opts.onSelect.call(_2e3,$(this).panel("options").title,_2d6(_2e3,this));
},onBeforeCollapse:function(){
if(_2e4.onBeforeCollapse){
if(_2e4.onBeforeCollapse.call(this)==false){
return false;
}
}
var _2e6=$(this).panel("header");
_2e6.removeClass("accordion-header-selected");
_2e6.find(".accordion-collapse").addClass("accordion-expand");
},onCollapse:function(){
if(_2e4.onCollapse){
_2e4.onCollapse.call(this);
}
opts.onUnselect.call(_2e3,$(this).panel("options").title,_2d6(_2e3,this));
}}));
var _2e7=pp.panel("header");
var tool=_2e7.children("div.panel-tool");
tool.children("a.panel-tool-collapse").hide();
var t=$("<a href=\"javascript:void(0)\"></a>").addClass("accordion-collapse accordion-expand").appendTo(tool);
t.bind("click",function(){
_2e8(pp);
return false;
});
pp.panel("options").collapsible?t.show():t.hide();
_2e7.click(function(){
_2e8(pp);
return false;
});
function _2e8(p){
var _2e9=p.panel("options");
if(_2e9.collapsible){
var _2ea=_2d6(_2e3,p);
if(_2e9.collapsed){
_2eb(_2e3,_2ea);
}else{
_2ec(_2e3,_2ea);
}
}
};
};
function _2eb(_2ed,_2ee){
var p=_2d9(_2ed,_2ee);
if(!p){
return;
}
_2ef(_2ed);
var opts=$.data(_2ed,"accordion").options;
p.panel("expand",opts.animate);
};
function _2ec(_2f0,_2f1){
var p=_2d9(_2f0,_2f1);
if(!p){
return;
}
_2ef(_2f0);
var opts=$.data(_2f0,"accordion").options;
p.panel("collapse",opts.animate);
};
function _2f2(_2f3){
var opts=$.data(_2f3,"accordion").options;
var p=_2cd(_2f3,"selected",true);
if(p){
_2f4(_2d6(_2f3,p));
}else{
_2f4(opts.selected);
}
function _2f4(_2f5){
var _2f6=opts.animate;
opts.animate=false;
_2eb(_2f3,_2f5);
opts.animate=_2f6;
};
};
function _2ef(_2f7){
var _2f8=$.data(_2f7,"accordion").panels;
for(var i=0;i<_2f8.length;i++){
_2f8[i].stop(true,true);
}
};
function add(_2f9,_2fa){
var _2fb=$.data(_2f9,"accordion");
var opts=_2fb.options;
var _2fc=_2fb.panels;
if(_2fa.selected==undefined){
_2fa.selected=true;
}
_2ef(_2f9);
var pp=$("<div></div>").appendTo(_2f9);
_2fc.push(pp);
_2e2(_2f9,pp,_2fa);
_2c0(_2f9);
opts.onAdd.call(_2f9,_2fa.title,_2fc.length-1);
if(_2fa.selected){
_2eb(_2f9,_2fc.length-1);
}
};
function _2fd(_2fe,_2ff){
var _300=$.data(_2fe,"accordion");
var opts=_300.options;
var _301=_300.panels;
_2ef(_2fe);
var _302=_2d9(_2fe,_2ff);
var _303=_302.panel("options").title;
var _304=_2d6(_2fe,_302);
if(!_302){
return;
}
if(opts.onBeforeRemove.call(_2fe,_303,_304)==false){
return;
}
_301.splice(_304,1);
_302.panel("destroy");
if(_301.length){
_2c0(_2fe);
var curr=_2d4(_2fe);
if(!curr){
_2eb(_2fe,0);
}
}
opts.onRemove.call(_2fe,_303,_304);
};
$.fn.accordion=function(_305,_306){
if(typeof _305=="string"){
return $.fn.accordion.methods[_305](this,_306);
}
_305=_305||{};
return this.each(function(){
var _307=$.data(this,"accordion");
if(_307){
$.extend(_307.options,_305);
}else{
$.data(this,"accordion",{options:$.extend({},$.fn.accordion.defaults,$.fn.accordion.parseOptions(this),_305),accordion:$(this).addClass("accordion"),panels:[]});
init(this);
}
_2dd(this);
_2c0(this);
_2f2(this);
});
};
$.fn.accordion.methods={options:function(jq){
return $.data(jq[0],"accordion").options;
},panels:function(jq){
return $.data(jq[0],"accordion").panels;
},resize:function(jq,_308){
return jq.each(function(){
_2c0(this,_308);
});
},getSelections:function(jq){
return _2d2(jq[0]);
},getSelected:function(jq){
return _2d4(jq[0]);
},getPanel:function(jq,_309){
return _2d9(jq[0],_309);
},getPanelIndex:function(jq,_30a){
return _2d6(jq[0],_30a);
},select:function(jq,_30b){
return jq.each(function(){
_2eb(this,_30b);
});
},unselect:function(jq,_30c){
return jq.each(function(){
_2ec(this,_30c);
});
},add:function(jq,_30d){
return jq.each(function(){
add(this,_30d);
});
},remove:function(jq,_30e){
return jq.each(function(){
_2fd(this,_30e);
});
}};
$.fn.accordion.parseOptions=function(_30f){
var t=$(_30f);
return $.extend({},$.parser.parseOptions(_30f,["width","height",{fit:"boolean",border:"boolean",animate:"boolean",multiple:"boolean",selected:"number"}]));
};
$.fn.accordion.defaults={width:"auto",height:"auto",fit:false,border:true,animate:true,multiple:false,selected:0,onSelect:function(_310,_311){
},onUnselect:function(_312,_313){
},onAdd:function(_314,_315){
},onBeforeRemove:function(_316,_317){
},onRemove:function(_318,_319){
}};
})(jQuery);
(function($){
function _31a(c){
var w=0;
$(c).children().each(function(){
w+=$(this).outerWidth(true);
});
return w;
};
function _31b(_31c){
var opts=$.data(_31c,"tabs").options;
if(opts.tabPosition=="left"||opts.tabPosition=="right"||!opts.showHeader){
return;
}
var _31d=$(_31c).children("div.tabs-header");
var tool=_31d.children("div.tabs-tool:not(.tabs-tool-hidden)");
var _31e=_31d.children("div.tabs-scroller-left");
var _31f=_31d.children("div.tabs-scroller-right");
var wrap=_31d.children("div.tabs-wrap");
var _320=_31d.outerHeight();
if(opts.plain){
_320-=_320-_31d.height();
}
tool._outerHeight(_320);
var _321=_31a(_31d.find("ul.tabs"));
var _322=_31d.width()-tool._outerWidth();
if(_321>_322){
_31e.add(_31f).show()._outerHeight(_320);
if(opts.toolPosition=="left"){
tool.css({left:_31e.outerWidth(),right:""});
wrap.css({marginLeft:_31e.outerWidth()+tool._outerWidth(),marginRight:_31f._outerWidth(),width:_322-_31e.outerWidth()-_31f.outerWidth()});
}else{
tool.css({left:"",right:_31f.outerWidth()});
wrap.css({marginLeft:_31e.outerWidth(),marginRight:_31f.outerWidth()+tool._outerWidth(),width:_322-_31e.outerWidth()-_31f.outerWidth()});
}
}else{
_31e.add(_31f).hide();
if(opts.toolPosition=="left"){
tool.css({left:0,right:""});
wrap.css({marginLeft:tool._outerWidth(),marginRight:0,width:_322});
}else{
tool.css({left:"",right:0});
wrap.css({marginLeft:0,marginRight:tool._outerWidth(),width:_322});
}
}
};
function _323(_324){
var opts=$.data(_324,"tabs").options;
var _325=$(_324).children("div.tabs-header");
if(opts.tools){
if(typeof opts.tools=="string"){
$(opts.tools).addClass("tabs-tool").appendTo(_325);
$(opts.tools).show();
}else{
_325.children("div.tabs-tool").remove();
var _326=$("<div class=\"tabs-tool\"><table cellspacing=\"0\" cellpadding=\"0\" style=\"height:100%\"><tr></tr></table></div>").appendTo(_325);
var tr=_326.find("tr");
for(var i=0;i<opts.tools.length;i++){
var td=$("<td></td>").appendTo(tr);
var tool=$("<a href=\"javascript:void(0);\"></a>").appendTo(td);
tool[0].onclick=eval(opts.tools[i].handler||function(){
});
tool.linkbutton($.extend({},opts.tools[i],{plain:true}));
}
}
}else{
_325.children("div.tabs-tool").remove();
}
};
function _327(_328,_329){
var _32a=$.data(_328,"tabs");
var opts=_32a.options;
var cc=$(_328);
if(!opts.doSize){
return;
}
if(_329){
$.extend(opts,{width:_329.width,height:_329.height});
}
cc._size(opts);
var _32b=cc.children("div.tabs-header");
var _32c=cc.children("div.tabs-panels");
var wrap=_32b.find("div.tabs-wrap");
var ul=wrap.find(".tabs");
ul.children("li").removeClass("tabs-first tabs-last");
ul.children("li:first").addClass("tabs-first");
ul.children("li:last").addClass("tabs-last");
if(opts.tabPosition=="left"||opts.tabPosition=="right"){
_32b._outerWidth(opts.showHeader?opts.headerWidth:0);
_32c._outerWidth(cc.width()-_32b.outerWidth());
_32b.add(_32c)._size("height",isNaN(parseInt(opts.height))?"":cc.height());
wrap._outerWidth(_32b.width());
ul._outerWidth(wrap.width()).css("height","");
}else{
_32b.children("div.tabs-scroller-left,div.tabs-scroller-right,div.tabs-tool:not(.tabs-tool-hidden)").css("display",opts.showHeader?"block":"none");
_32b._outerWidth(cc.width()).css("height","");
if(opts.showHeader){
_32b.css("background-color","");
wrap.css("height","");
}else{
_32b.css("background-color","transparent");
_32b._outerHeight(0);
wrap._outerHeight(0);
}
ul._outerHeight(opts.tabHeight).css("width","");
ul._outerHeight(ul.outerHeight()-ul.height()-1+opts.tabHeight).css("width","");
_32c._size("height",isNaN(parseInt(opts.height))?"":(cc.height()-_32b.outerHeight()));
_32c._size("width",cc.width());
}
if(_32a.tabs.length){
var d1=ul.outerWidth(true)-ul.width();
var li=ul.children("li:first");
var d2=li.outerWidth(true)-li.width();
var _32d=_32b.width()-_32b.children(".tabs-tool:not(.tabs-tool-hidden)")._outerWidth();
var _32e=Math.floor((_32d-d1-d2*_32a.tabs.length)/_32a.tabs.length);
$.map(_32a.tabs,function(p){
_32f(p,(opts.justified&&$.inArray(opts.tabPosition,["top","bottom"])>=0)?_32e:undefined);
});
if(opts.justified&&$.inArray(opts.tabPosition,["top","bottom"])>=0){
var _330=_32d-d1-_31a(ul);
_32f(_32a.tabs[_32a.tabs.length-1],_32e+_330);
}
}
_31b(_328);
function _32f(p,_331){
var _332=p.panel("options");
var p_t=_332.tab.find("a.tabs-inner");
var _331=_331?_331:(parseInt(_332.tabWidth||opts.tabWidth||undefined));
if(_331){
p_t._outerWidth(_331);
}else{
p_t.css("width","");
}
p_t._outerHeight(opts.tabHeight);
p_t.css("lineHeight",p_t.height()+"px");
p_t.find(".extjsui-fluid:visible").triggerHandler("_resize");
};
};
function _333(_334){
var opts=$.data(_334,"tabs").options;
var tab=_335(_334);
if(tab){
var _336=$(_334).children("div.tabs-panels");
var _337=opts.width=="auto"?"auto":_336.width();
var _338=opts.height=="auto"?"auto":_336.height();
tab.panel("resize",{width:_337,height:_338});
}
};
function _339(_33a){
var tabs=$.data(_33a,"tabs").tabs;
var cc=$(_33a).addClass("tabs-container");
var _33b=$("<div class=\"tabs-panels\"></div>").insertBefore(cc);
cc.children("div").each(function(){
_33b[0].appendChild(this);
});
cc[0].appendChild(_33b[0]);
$("<div class=\"tabs-header\">"+"<div class=\"tabs-scroller-left\"></div>"+"<div class=\"tabs-scroller-right\"></div>"+"<div class=\"tabs-wrap\">"+"<ul class=\"tabs\"></ul>"+"</div>"+"</div>").prependTo(_33a);
cc.children("div.tabs-panels").children("div").each(function(i){
var opts=$.extend({},$.parser.parseOptions(this),{disabled:($(this).attr("disabled")?true:undefined),selected:($(this).attr("selected")?true:undefined)});
_348(_33a,opts,$(this));
});
cc.children("div.tabs-header").find(".tabs-scroller-left, .tabs-scroller-right").hover(function(){
$(this).addClass("tabs-scroller-over");
},function(){
$(this).removeClass("tabs-scroller-over");
});
cc.bind("_resize",function(e,_33c){
if($(this).hasClass("extjsui-fluid")||_33c){
_327(_33a);
_333(_33a);
}
return false;
});
};
function _33d(_33e){
var _33f=$.data(_33e,"tabs");
var opts=_33f.options;
$(_33e).children("div.tabs-header").unbind().bind("click",function(e){
if($(e.target).hasClass("tabs-scroller-left")){
$(_33e).tabs("scrollBy",-opts.scrollIncrement);
}else{
if($(e.target).hasClass("tabs-scroller-right")){
$(_33e).tabs("scrollBy",opts.scrollIncrement);
}else{
var li=$(e.target).closest("li");
if(li.hasClass("tabs-disabled")){
return false;
}
var a=$(e.target).closest("a.tabs-close");
if(a.length){
_361(_33e,_340(li));
}else{
if(li.length){
var _341=_340(li);
var _342=_33f.tabs[_341].panel("options");
if(_342.collapsible){
_342.closed?_358(_33e,_341):_375(_33e,_341);
}else{
_358(_33e,_341);
}
}
}
return false;
}
}
}).bind("contextmenu",function(e){
var li=$(e.target).closest("li");
if(li.hasClass("tabs-disabled")){
return;
}
if(li.length){
opts.onContextMenu.call(_33e,e,li.find("span.tabs-title").html(),_340(li));
}
});
function _340(li){
var _343=0;
li.parent().children("li").each(function(i){
if(li[0]==this){
_343=i;
return false;
}
});
return _343;
};
};
function _344(_345){
var opts=$.data(_345,"tabs").options;
var _346=$(_345).children("div.tabs-header");
var _347=$(_345).children("div.tabs-panels");
_346.removeClass("tabs-header-top tabs-header-bottom tabs-header-left tabs-header-right");
_347.removeClass("tabs-panels-top tabs-panels-bottom tabs-panels-left tabs-panels-right");
if(opts.tabPosition=="top"){
_346.insertBefore(_347);
}else{
if(opts.tabPosition=="bottom"){
_346.insertAfter(_347);
_346.addClass("tabs-header-bottom");
_347.addClass("tabs-panels-top");
}else{
if(opts.tabPosition=="left"){
_346.addClass("tabs-header-left");
_347.addClass("tabs-panels-right");
}else{
if(opts.tabPosition=="right"){
_346.addClass("tabs-header-right");
_347.addClass("tabs-panels-left");
}
}
}
}
if(opts.plain==true){
_346.addClass("tabs-header-plain");
}else{
_346.removeClass("tabs-header-plain");
}
_346.removeClass("tabs-header-narrow").addClass(opts.narrow?"tabs-header-narrow":"");
var tabs=_346.find(".tabs");
tabs.removeClass("tabs-pill").addClass(opts.pill?"tabs-pill":"");
tabs.removeClass("tabs-narrow").addClass(opts.narrow?"tabs-narrow":"");
tabs.removeClass("tabs-justified").addClass(opts.justified?"tabs-justified":"");
if(opts.border==true){
_346.removeClass("tabs-header-noborder");
_347.removeClass("tabs-panels-noborder");
}else{
_346.addClass("tabs-header-noborder");
_347.addClass("tabs-panels-noborder");
}
opts.doSize=true;
};
function _348(_349,_34a,pp){
_34a=_34a||{};
var _34b=$.data(_349,"tabs");
var tabs=_34b.tabs;
if(_34a.index==undefined||_34a.index>tabs.length){
_34a.index=tabs.length;
}
if(_34a.index<0){
_34a.index=0;
}
var ul=$(_349).children("div.tabs-header").find("ul.tabs");
var _34c=$(_349).children("div.tabs-panels");
var tab=$("<li>"+"<a href=\"javascript:void(0)\" class=\"tabs-inner\">"+"<span class=\"tabs-title\"></span>"+"<span class=\"tabs-icon\"></span>"+"</a>"+"</li>");
if(!pp){
pp=$("<div></div>");
}
if(_34a.index>=tabs.length){
tab.appendTo(ul);
pp.appendTo(_34c);
tabs.push(pp);
}else{
tab.insertBefore(ul.children("li:eq("+_34a.index+")"));
pp.insertBefore(_34c.children("div.panel:eq("+_34a.index+")"));
tabs.splice(_34a.index,0,pp);
}
pp.panel($.extend({},_34a,{tab:tab,border:false,noheader:true,closed:true,doSize:false,iconCls:(_34a.icon?_34a.icon:undefined),onLoad:function(){
if(_34a.onLoad){
_34a.onLoad.call(this,arguments);
}
_34b.options.onLoad.call(_349,$(this));
},onBeforeOpen:function(){
if(_34a.onBeforeOpen){
if(_34a.onBeforeOpen.call(this)==false){
return false;
}
}
var p=$(_349).tabs("getSelected");
if(p){
if(p[0]!=this){
$(_349).tabs("unselect",_353(_349,p));
p=$(_349).tabs("getSelected");
if(p){
return false;
}
}else{
_333(_349);
return false;
}
}
var _34d=$(this).panel("options");
_34d.tab.addClass("tabs-selected");
var wrap=$(_349).find(">div.tabs-header>div.tabs-wrap");
var left=_34d.tab.position().left;
var _34e=left+_34d.tab.outerWidth();
if(left<0||_34e>wrap.width()){
var _34f=left-(wrap.width()-_34d.tab.width())/2;
$(_349).tabs("scrollBy",_34f);
}else{
$(_349).tabs("scrollBy",0);
}
var _350=$(this).panel("panel");
_350.css("display","block");
_333(_349);
_350.css("display","none");
},onOpen:function(){
if(_34a.onOpen){
_34a.onOpen.call(this);
}
var _351=$(this).panel("options");
_34b.selectHis.push(_351.title);
_34b.options.onSelect.call(_349,_351.title,_353(_349,this));
},onBeforeClose:function(){
if(_34a.onBeforeClose){
if(_34a.onBeforeClose.call(this)==false){
return false;
}
}
$(this).panel("options").tab.removeClass("tabs-selected");
},onClose:function(){
if(_34a.onClose){
_34a.onClose.call(this);
}
var _352=$(this).panel("options");
_34b.options.onUnselect.call(_349,_352.title,_353(_349,this));
}}));
$(_349).tabs("update",{tab:pp,options:pp.panel("options"),type:"header"});
};
function _354(_355,_356){
var _357=$.data(_355,"tabs");
var opts=_357.options;
if(_356.selected==undefined){
_356.selected=true;
}
_348(_355,_356);
opts.onAdd.call(_355,_356.title,_356.index);
if(_356.selected){
_358(_355,_356.index);
}
};
function _359(_35a,_35b){
_35b.type=_35b.type||"all";
var _35c=$.data(_35a,"tabs").selectHis;
var pp=_35b.tab;
var opts=pp.panel("options");
var _35d=opts.title;
$.extend(opts,_35b.options,{iconCls:(_35b.options.icon?_35b.options.icon:undefined)});
if(_35b.type=="all"||_35b.type=="body"){
pp.panel();
}
if(_35b.type=="all"||_35b.type=="header"){
var tab=opts.tab;
if(opts.header){
tab.find(".tabs-inner").html($(opts.header));
}else{
var _35e=tab.find("span.tabs-title");
var _35f=tab.find("span.tabs-icon");
_35e.html(opts.title);
_35f.attr("class","tabs-icon");
tab.find("a.tabs-close").remove();
if(opts.closable){
_35e.addClass("tabs-closable");
$("<a href=\"javascript:void(0)\" class=\"tabs-close\"></a>").appendTo(tab);
}else{
_35e.removeClass("tabs-closable");
}
if(opts.iconCls){
_35e.addClass("tabs-with-icon");
_35f.addClass(opts.iconCls);
}else{
_35e.removeClass("tabs-with-icon");
}
if(opts.tools){
var _360=tab.find("span.tabs-p-tool");
if(!_360.length){
var _360=$("<span class=\"tabs-p-tool\"></span>").insertAfter(tab.find("a.tabs-inner"));
}
if($.isArray(opts.tools)){
_360.empty();
for(var i=0;i<opts.tools.length;i++){
var t=$("<a href=\"javascript:void(0)\"></a>").appendTo(_360);
t.addClass(opts.tools[i].iconCls);
if(opts.tools[i].handler){
t.bind("click",{handler:opts.tools[i].handler},function(e){
if($(this).parents("li").hasClass("tabs-disabled")){
return;
}
e.data.handler.call(this);
});
}
}
}else{
$(opts.tools).children().appendTo(_360);
}
var pr=_360.children().length*12;
if(opts.closable){
pr+=8;
}else{
pr-=3;
_360.css("right","5px");
}
_35e.css("padding-right",pr+"px");
}else{
tab.find("span.tabs-p-tool").remove();
_35e.css("padding-right","");
}
}
if(_35d!=opts.title){
for(var i=0;i<_35c.length;i++){
if(_35c[i]==_35d){
_35c[i]=opts.title;
}
}
}
}
if(opts.disabled){
opts.tab.addClass("tabs-disabled");
}else{
opts.tab.removeClass("tabs-disabled");
}
_327(_35a);
$.data(_35a,"tabs").options.onUpdate.call(_35a,opts.title,_353(_35a,pp));
};
function _361(_362,_363){
var opts=$.data(_362,"tabs").options;
var tabs=$.data(_362,"tabs").tabs;
var _364=$.data(_362,"tabs").selectHis;
if(!_365(_362,_363)){
return;
}
var tab=_366(_362,_363);
var _367=tab.panel("options").title;
var _368=_353(_362,tab);
if(opts.onBeforeClose.call(_362,_367,_368)==false){
return;
}
var tab=_366(_362,_363,true);
tab.panel("options").tab.remove();
tab.panel("destroy");
opts.onClose.call(_362,_367,_368);
_327(_362);
for(var i=0;i<_364.length;i++){
if(_364[i]==_367){
_364.splice(i,1);
i--;
}
}
var _369=_364.pop();
if(_369){
_358(_362,_369);
}else{
if(tabs.length){
_358(_362,0);
}
}
};
function _366(_36a,_36b,_36c){
var tabs=$.data(_36a,"tabs").tabs;
if(typeof _36b=="number"){
if(_36b<0||_36b>=tabs.length){
return null;
}else{
var tab=tabs[_36b];
if(_36c){
tabs.splice(_36b,1);
}
return tab;
}
}
for(var i=0;i<tabs.length;i++){
var tab=tabs[i];
if(tab.panel("options").title==_36b){
if(_36c){
tabs.splice(i,1);
}
return tab;
}
}
return null;
};
function _353(_36d,tab){
var tabs=$.data(_36d,"tabs").tabs;
for(var i=0;i<tabs.length;i++){
if(tabs[i][0]==$(tab)[0]){
return i;
}
}
return -1;
};
function _335(_36e){
var tabs=$.data(_36e,"tabs").tabs;
for(var i=0;i<tabs.length;i++){
var tab=tabs[i];
if(tab.panel("options").tab.hasClass("tabs-selected")){
return tab;
}
}
return null;
};
function _36f(_370){
var _371=$.data(_370,"tabs");
var tabs=_371.tabs;
for(var i=0;i<tabs.length;i++){
var opts=tabs[i].panel("options");
if(opts.selected&&!opts.disabled){
_358(_370,i);
return;
}
}
_358(_370,_371.options.selected);
};
function _358(_372,_373){
var p=_366(_372,_373);
if(p&&!p.is(":visible")){
_374(_372);
if(!p.panel("options").disabled){
p.panel("open");
}
}
};
function _375(_376,_377){
var p=_366(_376,_377);
if(p&&p.is(":visible")){
_374(_376);
p.panel("close");
}
};
function _374(_378){
$(_378).children("div.tabs-panels").each(function(){
$(this).stop(true,true);
});
};
function _365(_379,_37a){
return _366(_379,_37a)!=null;
};
function _37b(_37c,_37d){
var opts=$.data(_37c,"tabs").options;
opts.showHeader=_37d;
$(_37c).tabs("resize");
};
function _37e(_37f,_380){
var tool=$(_37f).find(">.tabs-header>.tabs-tool");
if(_380){
tool.removeClass("tabs-tool-hidden").show();
}else{
tool.addClass("tabs-tool-hidden").hide();
}
$(_37f).tabs("resize").tabs("scrollBy",0);
};
$.fn.tabs=function(_381,_382){
if(typeof _381=="string"){
return $.fn.tabs.methods[_381](this,_382);
}
_381=_381||{};
return this.each(function(){
var _383=$.data(this,"tabs");
if(_383){
$.extend(_383.options,_381);
}else{
$.data(this,"tabs",{options:$.extend({},$.fn.tabs.defaults,$.fn.tabs.parseOptions(this),_381),tabs:[],selectHis:[]});
_339(this);
}
_323(this);
_344(this);
_327(this);
_33d(this);
_36f(this);
});
};
$.fn.tabs.methods={options:function(jq){
var cc=jq[0];
var opts=$.data(cc,"tabs").options;
var s=_335(cc);
opts.selected=s?_353(cc,s):-1;
return opts;
},tabs:function(jq){
return $.data(jq[0],"tabs").tabs;
},resize:function(jq,_384){
return jq.each(function(){
_327(this,_384);
_333(this);
});
},add:function(jq,_385){
return jq.each(function(){
_354(this,_385);
});
},close:function(jq,_386){
return jq.each(function(){
_361(this,_386);
});
},getTab:function(jq,_387){
return _366(jq[0],_387);
},getTabIndex:function(jq,tab){
return _353(jq[0],tab);
},getSelected:function(jq){
return _335(jq[0]);
},select:function(jq,_388){
return jq.each(function(){
_358(this,_388);
});
},unselect:function(jq,_389){
return jq.each(function(){
_375(this,_389);
});
},exists:function(jq,_38a){
return _365(jq[0],_38a);
},update:function(jq,_38b){
return jq.each(function(){
_359(this,_38b);
});
},enableTab:function(jq,_38c){
return jq.each(function(){
var opts=$(this).tabs("getTab",_38c).panel("options");
opts.tab.removeClass("tabs-disabled");
opts.disabled=false;
});
},disableTab:function(jq,_38d){
return jq.each(function(){
var opts=$(this).tabs("getTab",_38d).panel("options");
opts.tab.addClass("tabs-disabled");
opts.disabled=true;
});
},showHeader:function(jq){
return jq.each(function(){
_37b(this,true);
});
},hideHeader:function(jq){
return jq.each(function(){
_37b(this,false);
});
},showTool:function(jq){
return jq.each(function(){
_37e(this,true);
});
},hideTool:function(jq){
return jq.each(function(){
_37e(this,false);
});
},scrollBy:function(jq,_38e){
return jq.each(function(){
var opts=$(this).tabs("options");
var wrap=$(this).find(">div.tabs-header>div.tabs-wrap");
var pos=Math.min(wrap._scrollLeft()+_38e,_38f());
wrap.animate({scrollLeft:pos},opts.scrollDuration);
function _38f(){
var w=0;
var ul=wrap.children("ul");
ul.children("li").each(function(){
w+=$(this).outerWidth(true);
});
return w-wrap.width()+(ul.outerWidth()-ul.width());
};
});
}};
$.fn.tabs.parseOptions=function(_390){
return $.extend({},$.parser.parseOptions(_390,["tools","toolPosition","tabPosition",{fit:"boolean",border:"boolean",plain:"boolean"},{headerWidth:"number",tabWidth:"number",tabHeight:"number",selected:"number"},{showHeader:"boolean",justified:"boolean",narrow:"boolean",pill:"boolean"}]));
};
$.fn.tabs.defaults={width:"auto",height:"auto",headerWidth:150,tabWidth:"auto",tabHeight:27,selected:0,showHeader:true,plain:false,fit:false,border:true,justified:false,narrow:false,pill:false,tools:null,toolPosition:"right",tabPosition:"top",scrollIncrement:100,scrollDuration:400,onLoad:function(_391){
},onSelect:function(_392,_393){
},onUnselect:function(_394,_395){
},onBeforeClose:function(_396,_397){
},onClose:function(_398,_399){
},onAdd:function(_39a,_39b){
},onUpdate:function(_39c,_39d){
},onContextMenu:function(e,_39e,_39f){
}};
})(jQuery);
(function($){
var _3a0=false;
function _3a1(_3a2,_3a3){
var _3a4=$.data(_3a2,"layout");
var opts=_3a4.options;
var _3a5=_3a4.panels;
var cc=$(_3a2);
if(_3a3){
$.extend(opts,{width:_3a3.width,height:_3a3.height});
}
if(_3a2.tagName.toLowerCase()=="body"){
cc._size("fit");
}else{
cc._size(opts);
}
var cpos={top:0,left:0,width:cc.width(),height:cc.height()};
_3a6(_3a7(_3a5.expandNorth)?_3a5.expandNorth:_3a5.north,"n");
_3a6(_3a7(_3a5.expandSouth)?_3a5.expandSouth:_3a5.south,"s");
_3a8(_3a7(_3a5.expandEast)?_3a5.expandEast:_3a5.east,"e");
_3a8(_3a7(_3a5.expandWest)?_3a5.expandWest:_3a5.west,"w");
_3a5.center.panel("resize",cpos);
function _3a6(pp,type){
if(!pp.length||!_3a7(pp)){
return;
}
var opts=pp.panel("options");
pp.panel("resize",{width:cc.width(),height:opts.height});
var _3a9=pp.panel("panel").outerHeight();
pp.panel("move",{left:0,top:(type=="n"?0:cc.height()-_3a9)});
cpos.height-=_3a9;
if(type=="n"){
cpos.top+=_3a9;
if(!opts.split&&opts.border){
cpos.top--;
}
}
if(!opts.split&&opts.border){
cpos.height++;
}
};
function _3a8(pp,type){
if(!pp.length||!_3a7(pp)){
return;
}
var opts=pp.panel("options");
pp.panel("resize",{width:opts.width,height:cpos.height});
var _3aa=pp.panel("panel").outerWidth();
pp.panel("move",{left:(type=="e"?cc.width()-_3aa:0),top:cpos.top});
cpos.width-=_3aa;
if(type=="w"){
cpos.left+=_3aa;
if(!opts.split&&opts.border){
cpos.left--;
}
}
if(!opts.split&&opts.border){
cpos.width++;
}
};
};
function init(_3ab){
var cc=$(_3ab);
cc.addClass("layout");
function _3ac(cc){
var opts=cc.layout("options");
var _3ad=opts.onAdd;
opts.onAdd=function(){
};
cc.children("div").each(function(){
var _3ae=$.fn.layout.parsePanelOptions(this);
if("north,south,east,west,center".indexOf(_3ae.region)>=0){
_3b0(_3ab,_3ae,this);
}
});
opts.onAdd=_3ad;
};
cc.children("form").length?_3ac(cc.children("form")):_3ac(cc);
cc.append("<div class=\"layout-split-proxy-h\"></div><div class=\"layout-split-proxy-v\"></div>");
cc.bind("_resize",function(e,_3af){
if($(this).hasClass("extjsui-fluid")||_3af){
_3a1(_3ab);
}
return false;
});
};
function _3b0(_3b1,_3b2,el){
_3b2.region=_3b2.region||"center";
var _3b3=$.data(_3b1,"layout").panels;
var cc=$(_3b1);
var dir=_3b2.region;
if(_3b3[dir].length){
return;
}
var pp=$(el);
if(!pp.length){
pp=$("<div></div>").appendTo(cc);
}
var _3b4=$.extend({},$.fn.layout.paneldefaults,{width:(pp.length?parseInt(pp[0].style.width)||pp.outerWidth():"auto"),height:(pp.length?parseInt(pp[0].style.height)||pp.outerHeight():"auto"),doSize:false,collapsible:true,onOpen:function(){
var tool=$(this).panel("header").children("div.panel-tool");
tool.children("a.panel-tool-collapse").hide();
var _3b5={north:"up",south:"down",east:"right",west:"left"};
if(!_3b5[dir]){
return;
}
var _3b6="layout-button-"+_3b5[dir];
var t=tool.children("a."+_3b6);
if(!t.length){
t=$("<a href=\"javascript:void(0)\"></a>").addClass(_3b6).appendTo(tool);
t.bind("click",{dir:dir},function(e){
_3c2(_3b1,e.data.dir);
return false;
});
}
$(this).panel("options").collapsible?t.show():t.hide();
}},_3b2,{cls:((_3b2.cls||"")+" layout-panel layout-panel-"+dir),bodyCls:((_3b2.bodyCls||"")+" layout-body")});
pp.panel(_3b4);
_3b3[dir]=pp;
var _3b7={north:"s",south:"n",east:"w",west:"e"};
var _3b8=pp.panel("panel");
if(pp.panel("options").split){
_3b8.addClass("layout-split-"+dir);
}
_3b8.resizable($.extend({},{handles:(_3b7[dir]||""),disabled:(!pp.panel("options").split),onStartResize:function(e){
_3a0=true;
if(dir=="north"||dir=="south"){
var _3b9=$(">div.layout-split-proxy-v",_3b1);
}else{
var _3b9=$(">div.layout-split-proxy-h",_3b1);
}
var top=0,left=0,_3ba=0,_3bb=0;
var pos={display:"block"};
if(dir=="north"){
pos.top=parseInt(_3b8.css("top"))+_3b8.outerHeight()-_3b9.height();
pos.left=parseInt(_3b8.css("left"));
pos.width=_3b8.outerWidth();
pos.height=_3b9.height();
}else{
if(dir=="south"){
pos.top=parseInt(_3b8.css("top"));
pos.left=parseInt(_3b8.css("left"));
pos.width=_3b8.outerWidth();
pos.height=_3b9.height();
}else{
if(dir=="east"){
pos.top=parseInt(_3b8.css("top"))||0;
pos.left=parseInt(_3b8.css("left"))||0;
pos.width=_3b9.width();
pos.height=_3b8.outerHeight();
}else{
if(dir=="west"){
pos.top=parseInt(_3b8.css("top"))||0;
pos.left=_3b8.outerWidth()-_3b9.width();
pos.width=_3b9.width();
pos.height=_3b8.outerHeight();
}
}
}
}
_3b9.css(pos);
$("<div class=\"layout-mask\"></div>").css({left:0,top:0,width:cc.width(),height:cc.height()}).appendTo(cc);
},onResize:function(e){
if(dir=="north"||dir=="south"){
var _3bc=$(">div.layout-split-proxy-v",_3b1);
_3bc.css("top",e.pageY-$(_3b1).offset().top-_3bc.height()/2);
}else{
var _3bc=$(">div.layout-split-proxy-h",_3b1);
_3bc.css("left",e.pageX-$(_3b1).offset().left-_3bc.width()/2);
}
return false;
},onStopResize:function(e){
cc.children("div.layout-split-proxy-v,div.layout-split-proxy-h").hide();
pp.panel("resize",e.data);
_3a1(_3b1);
_3a0=false;
cc.find(">div.layout-mask").remove();
}},_3b2));
cc.layout("options").onAdd.call(_3b1,dir);
};
function _3bd(_3be,_3bf){
var _3c0=$.data(_3be,"layout").panels;
if(_3c0[_3bf].length){
_3c0[_3bf].panel("destroy");
_3c0[_3bf]=$();
var _3c1="expand"+_3bf.substring(0,1).toUpperCase()+_3bf.substring(1);
if(_3c0[_3c1]){
_3c0[_3c1].panel("destroy");
_3c0[_3c1]=undefined;
}
$(_3be).layout("options").onRemove.call(_3be,_3bf);
}
};
function _3c2(_3c3,_3c4,_3c5){
if(_3c5==undefined){
_3c5="normal";
}
var _3c6=$.data(_3c3,"layout").panels;
var p=_3c6[_3c4];
var _3c7=p.panel("options");
if(_3c7.onBeforeCollapse.call(p)==false){
return;
}
var _3c8="expand"+_3c4.substring(0,1).toUpperCase()+_3c4.substring(1);
if(!_3c6[_3c8]){
_3c6[_3c8]=_3c9(_3c4);
var ep=_3c6[_3c8].panel("panel");
if(!_3c7.expandMode){
ep.css("cursor","default");
}else{
ep.bind("click",function(){
if(_3c7.expandMode=="dock"){
_3d4(_3c3,_3c4);
}else{
p.panel("expand",false).panel("open");
var _3ca=_3cb();
p.panel("resize",_3ca.collapse);
p.panel("panel").animate(_3ca.expand,function(){
$(this).unbind(".layout").bind("mouseleave.layout",{region:_3c4},function(e){
if(_3a0==true){
return;
}
if($("body>div.combo-p>div.combo-panel:visible").length){
return;
}
_3c2(_3c3,e.data.region);
});
$(_3c3).layout("options").onExpand.call(_3c3,_3c4);
});
}
return false;
});
}
}
var _3cc=_3cb();
if(!_3a7(_3c6[_3c8])){
_3c6.center.panel("resize",_3cc.resizeC);
}
p.panel("panel").animate(_3cc.collapse,_3c5,function(){
p.panel("collapse",false).panel("close");
_3c6[_3c8].panel("open").panel("resize",_3cc.expandP);
$(this).unbind(".layout");
$(_3c3).layout("options").onCollapse.call(_3c3,_3c4);
});
function _3c9(dir){
var _3cd={"east":"left","west":"right","north":"down","south":"up"};
var isns=(_3c7.region=="north"||_3c7.region=="south");
var icon="layout-button-"+_3cd[dir];
var p=$("<div></div>").appendTo(_3c3);
p.panel($.extend({},$.fn.layout.paneldefaults,{cls:("layout-expand layout-expand-"+dir),title:"&nbsp;",iconCls:(_3c7.hideCollapsedContent?null:_3c7.iconCls),closed:true,minWidth:0,minHeight:0,doSize:false,region:_3c7.region,collapsedSize:_3c7.collapsedSize,noheader:(!isns&&_3c7.hideExpandTool),tools:((isns&&_3c7.hideExpandTool)?null:[{iconCls:icon,handler:function(){
_3d4(_3c3,_3c4);
return false;
}}])}));
if(!_3c7.hideCollapsedContent){
var _3ce=typeof _3c7.collapsedContent=="function"?_3c7.collapsedContent.call(p[0],_3c7.title):_3c7.collapsedContent;
isns?p.panel("setTitle",_3ce):p.html(_3ce);
}
p.panel("panel").hover(function(){
$(this).addClass("layout-expand-over");
},function(){
$(this).removeClass("layout-expand-over");
});
return p;
};
function _3cb(){
var cc=$(_3c3);
var _3cf=_3c6.center.panel("options");
var _3d0=_3c7.collapsedSize;
if(_3c4=="east"){
var _3d1=p.panel("panel")._outerWidth();
var _3d2=_3cf.width+_3d1-_3d0;
if(_3c7.split||!_3c7.border){
_3d2++;
}
return {resizeC:{width:_3d2},expand:{left:cc.width()-_3d1},expandP:{top:_3cf.top,left:cc.width()-_3d0,width:_3d0,height:_3cf.height},collapse:{left:cc.width(),top:_3cf.top,height:_3cf.height}};
}else{
if(_3c4=="west"){
var _3d1=p.panel("panel")._outerWidth();
var _3d2=_3cf.width+_3d1-_3d0;
if(_3c7.split||!_3c7.border){
_3d2++;
}
return {resizeC:{width:_3d2,left:_3d0-1},expand:{left:0},expandP:{left:0,top:_3cf.top,width:_3d0,height:_3cf.height},collapse:{left:-_3d1,top:_3cf.top,height:_3cf.height}};
}else{
if(_3c4=="north"){
var _3d3=p.panel("panel")._outerHeight();
var hh=_3cf.height;
if(!_3a7(_3c6.expandNorth)){
hh+=_3d3-_3d0+((_3c7.split||!_3c7.border)?1:0);
}
_3c6.east.add(_3c6.west).add(_3c6.expandEast).add(_3c6.expandWest).panel("resize",{top:_3d0-1,height:hh});
return {resizeC:{top:_3d0-1,height:hh},expand:{top:0},expandP:{top:0,left:0,width:cc.width(),height:_3d0},collapse:{top:-_3d3,width:cc.width()}};
}else{
if(_3c4=="south"){
var _3d3=p.panel("panel")._outerHeight();
var hh=_3cf.height;
if(!_3a7(_3c6.expandSouth)){
hh+=_3d3-_3d0+((_3c7.split||!_3c7.border)?1:0);
}
_3c6.east.add(_3c6.west).add(_3c6.expandEast).add(_3c6.expandWest).panel("resize",{height:hh});
return {resizeC:{height:hh},expand:{top:cc.height()-_3d3},expandP:{top:cc.height()-_3d0,left:0,width:cc.width(),height:_3d0},collapse:{top:cc.height(),width:cc.width()}};
}
}
}
}
};
};
function _3d4(_3d5,_3d6){
var _3d7=$.data(_3d5,"layout").panels;
var p=_3d7[_3d6];
var _3d8=p.panel("options");
if(_3d8.onBeforeExpand.call(p)==false){
return;
}
var _3d9="expand"+_3d6.substring(0,1).toUpperCase()+_3d6.substring(1);
if(_3d7[_3d9]){
_3d7[_3d9].panel("close");
p.panel("panel").stop(true,true);
p.panel("expand",false).panel("open");
var _3da=_3db();
p.panel("resize",_3da.collapse);
p.panel("panel").animate(_3da.expand,function(){
_3a1(_3d5);
$(_3d5).layout("options").onExpand.call(_3d5,_3d6);
});
}
function _3db(){
var cc=$(_3d5);
var _3dc=_3d7.center.panel("options");
if(_3d6=="east"&&_3d7.expandEast){
return {collapse:{left:cc.width(),top:_3dc.top,height:_3dc.height},expand:{left:cc.width()-p.panel("panel")._outerWidth()}};
}else{
if(_3d6=="west"&&_3d7.expandWest){
return {collapse:{left:-p.panel("panel")._outerWidth(),top:_3dc.top,height:_3dc.height},expand:{left:0}};
}else{
if(_3d6=="north"&&_3d7.expandNorth){
return {collapse:{top:-p.panel("panel")._outerHeight(),width:cc.width()},expand:{top:0}};
}else{
if(_3d6=="south"&&_3d7.expandSouth){
return {collapse:{top:cc.height(),width:cc.width()},expand:{top:cc.height()-p.panel("panel")._outerHeight()}};
}
}
}
}
};
};
function _3a7(pp){
if(!pp){
return false;
}
if(pp.length){
return pp.panel("panel").is(":visible");
}else{
return false;
}
};
function _3dd(_3de){
var _3df=$.data(_3de,"layout");
var opts=_3df.options;
var _3e0=_3df.panels;
var _3e1=opts.onCollapse;
opts.onCollapse=function(){
};
_3e2("east");
_3e2("west");
_3e2("north");
_3e2("south");
opts.onCollapse=_3e1;
function _3e2(_3e3){
var p=_3e0[_3e3];
if(p.length&&p.panel("options").collapsed){
_3c2(_3de,_3e3,0);
}
};
};
function _3e4(_3e5,_3e6,_3e7){
var p=$(_3e5).layout("panel",_3e6);
p.panel("options").split=_3e7;
var cls="layout-split-"+_3e6;
var _3e8=p.panel("panel").removeClass(cls);
if(_3e7){
_3e8.addClass(cls);
}
_3e8.resizable({disabled:(!_3e7)});
_3a1(_3e5);
};
$.fn.layout=function(_3e9,_3ea){
if(typeof _3e9=="string"){
return $.fn.layout.methods[_3e9](this,_3ea);
}
_3e9=_3e9||{};
return this.each(function(){
var _3eb=$.data(this,"layout");
if(_3eb){
$.extend(_3eb.options,_3e9);
}else{
var opts=$.extend({},$.fn.layout.defaults,$.fn.layout.parseOptions(this),_3e9);
$.data(this,"layout",{options:opts,panels:{center:$(),north:$(),south:$(),east:$(),west:$()}});
init(this);
}
_3a1(this);
_3dd(this);
});
};
$.fn.layout.methods={options:function(jq){
return $.data(jq[0],"layout").options;
},resize:function(jq,_3ec){
return jq.each(function(){
_3a1(this,_3ec);
});
},panel:function(jq,_3ed){
return $.data(jq[0],"layout").panels[_3ed];
},collapse:function(jq,_3ee){
return jq.each(function(){
_3c2(this,_3ee);
});
},expand:function(jq,_3ef){
return jq.each(function(){
_3d4(this,_3ef);
});
},add:function(jq,_3f0){
return jq.each(function(){
_3b0(this,_3f0);
_3a1(this);
if($(this).layout("panel",_3f0.region).panel("options").collapsed){
_3c2(this,_3f0.region,0);
}
});
},remove:function(jq,_3f1){
return jq.each(function(){
_3bd(this,_3f1);
_3a1(this);
});
},split:function(jq,_3f2){
return jq.each(function(){
_3e4(this,_3f2,true);
});
},unsplit:function(jq,_3f3){
return jq.each(function(){
_3e4(this,_3f3,false);
});
}};
$.fn.layout.parseOptions=function(_3f4){
return $.extend({},$.parser.parseOptions(_3f4,[{fit:"boolean"}]));
};
$.fn.layout.defaults={fit:false,onExpand:function(_3f5){
},onCollapse:function(_3f6){
},onAdd:function(_3f7){
},onRemove:function(_3f8){
}};
$.fn.layout.parsePanelOptions=function(_3f9){
var t=$(_3f9);
return $.extend({},$.fn.panel.parseOptions(_3f9),$.parser.parseOptions(_3f9,["region",{split:"boolean",collpasedSize:"number",minWidth:"number",minHeight:"number",maxWidth:"number",maxHeight:"number"}]));
};
$.fn.layout.paneldefaults=$.extend({},$.fn.panel.defaults,{region:null,split:false,collapsedSize:28,expandMode:"float",hideExpandTool:false,hideCollapsedContent:true,collapsedContent:function(_3fa){
var p=$(this);
var opts=p.panel("options");
if(opts.region=="north"||opts.region=="south"){
return _3fa;
}
var size=opts.collapsedSize-2;
var left=(size-16)/2;
left=size-left;
var cc=[];
if(opts.iconCls){
cc.push("<div class=\"panel-icon "+opts.iconCls+"\"></div>");
}
cc.push("<div class=\"panel-title layout-expand-title");
cc.push(opts.iconCls?" layout-expand-with-icon":"");
cc.push("\" style=\"left:"+left+"px\">");
cc.push(_3fa);
cc.push("</div>");
return cc.join("");
},minWidth:10,minHeight:10,maxWidth:10000,maxHeight:10000});
})(jQuery);
(function($){
$(function(){
$(document).unbind(".menu").bind("mousedown.menu",function(e){
var m=$(e.target).closest("div.menu,div.combo-p");
if(m.length){
return;
}
$("body>div.menu-top:visible").not(".menu-inline").menu("hide");
_3fb($("body>div.menu:visible").not(".menu-inline"));
});
});
function init(_3fc){
var opts=$.data(_3fc,"menu").options;
$(_3fc).addClass("menu-top");
opts.inline?$(_3fc).addClass("menu-inline"):$(_3fc).appendTo("body");
$(_3fc).bind("_resize",function(e,_3fd){
if($(this).hasClass("extjsui-fluid")||_3fd){
$(_3fc).menu("resize",_3fc);
}
return false;
});
var _3fe=_3ff($(_3fc));
for(var i=0;i<_3fe.length;i++){
_402(_3fc,_3fe[i]);
}
function _3ff(menu){
var _400=[];
menu.addClass("menu");
_400.push(menu);
if(!menu.hasClass("menu-content")){
menu.children("div").each(function(){
var _401=$(this).children("div");
if(_401.length){
_401.appendTo("body");
this.submenu=_401;
var mm=_3ff(_401);
_400=_400.concat(mm);
}
});
}
return _400;
};
};
function _402(_403,div){
var menu=$(div).addClass("menu");
if(!menu.data("menu")){
menu.data("menu",{options:$.parser.parseOptions(menu[0],["width","height"])});
}
if(!menu.hasClass("menu-content")){
menu.children("div").each(function(){
_404(_403,this);
});
$("<div class=\"menu-line\"></div>").prependTo(menu);
}
_405(_403,menu);
if(!menu.hasClass("menu-inline")){
menu.hide();
}
_406(_403,menu);
};
function _404(_407,div,_408){
var item=$(div);
var _409=$.extend({},$.parser.parseOptions(item[0],["id","name","iconCls","href",{separator:"boolean"}]),{disabled:(item.attr("disabled")?true:undefined),text:$.trim(item.html()),onclick:item[0].onclick},_408||{});
_409.onclick=_409.onclick||_409.handler||null;
item.data("menuitem",{options:_409});
if(_409.separator){
item.addClass("menu-sep");
}
if(!item.hasClass("menu-sep")){
item.addClass("menu-item");
item.empty().append($("<div class=\"menu-text\"></div>").html(_409.text));
if(_409.iconCls){
$("<div class=\"menu-icon\"></div>").addClass(_409.iconCls).appendTo(item);
}
if(_409.id){
item.attr("id",_409.id);
}
if(_409.onclick){
if(typeof _409.onclick=="string"){
item.attr("onclick",_409.onclick);
}else{
item[0].onclick=eval(_409.onclick);
}
}
if(_409.disabled){
_40a(_407,item[0],true);
}
if(item[0].submenu){
$("<div class=\"menu-rightarrow\"></div>").appendTo(item);
}
}
};
function _405(_40b,menu){
var opts=$.data(_40b,"menu").options;
var _40c=menu.attr("style")||"";
var _40d=menu.is(":visible");
menu.css({display:"block",left:-10000,height:"auto",overflow:"hidden"});
menu.find(".menu-item").each(function(){
$(this)._outerHeight(opts.itemHeight);
$(this).find(".menu-text").css({height:(opts.itemHeight-2)+"px",lineHeight:(opts.itemHeight-2)+"px"});
});
menu.removeClass("menu-noline").addClass(opts.noline?"menu-noline":"");
var _40e=menu.data("menu").options;
var _40f=_40e.width;
var _410=_40e.height;
if(isNaN(parseInt(_40f))){
_40f=0;
menu.find("div.menu-text").each(function(){
if(_40f<$(this).outerWidth()){
_40f=$(this).outerWidth();
}
});
_40f=_40f?_40f+40:"";
}
var _411=menu.outerHeight();
if(isNaN(parseInt(_410))){
_410=_411;
if(menu.hasClass("menu-top")&&opts.alignTo){
var at=$(opts.alignTo);
var h1=at.offset().top-$(document).scrollTop();
var h2=$(window)._outerHeight()+$(document).scrollTop()-at.offset().top-at._outerHeight();
_410=Math.min(_410,Math.max(h1,h2));
}else{
if(_410>$(window)._outerHeight()){
_410=$(window).height();
}
}
}
menu.attr("style",_40c);
menu.show();
menu._size($.extend({},_40e,{width:_40f,height:_410,minWidth:_40e.minWidth||opts.minWidth,maxWidth:_40e.maxWidth||opts.maxWidth}));
menu.find(".extjsui-fluid").triggerHandler("_resize",[true]);
menu.css("overflow",menu.outerHeight()<_411?"auto":"hidden");
menu.children("div.menu-line")._outerHeight(_411-2);
if(!_40d){
menu.hide();
}
};
function _406(_412,menu){
var _413=$.data(_412,"menu");
var opts=_413.options;
menu.unbind(".menu");
for(var _414 in opts.events){
menu.bind(_414+".menu",{target:_412},opts.events[_414]);
}
};
function _415(e){
var _416=e.data.target;
var _417=$.data(_416,"menu");
if(_417.timer){
clearTimeout(_417.timer);
_417.timer=null;
}
};
function _418(e){
var _419=e.data.target;
var _41a=$.data(_419,"menu");
if(_41a.options.hideOnUnhover){
_41a.timer=setTimeout(function(){
_41b(_419,$(_419).hasClass("menu-inline"));
},_41a.options.duration);
}
};
function _41c(e){
var _41d=e.data.target;
var item=$(e.target).closest(".menu-item");
if(item.length){
item.siblings().each(function(){
if(this.submenu){
_3fb(this.submenu);
}
$(this).removeClass("menu-active");
});
item.addClass("menu-active");
if(item.hasClass("menu-item-disabled")){
item.addClass("menu-active-disabled");
return;
}
var _41e=item[0].submenu;
if(_41e){
$(_41d).menu("show",{menu:_41e,parent:item});
}
}
};
function _41f(e){
var item=$(e.target).closest(".menu-item");
if(item.length){
item.removeClass("menu-active menu-active-disabled");
var _420=item[0].submenu;
if(_420){
if(e.pageX>=parseInt(_420.css("left"))){
item.addClass("menu-active");
}else{
_3fb(_420);
}
}else{
item.removeClass("menu-active");
}
}
};
function _421(e){
var _422=e.data.target;
var item=$(e.target).closest(".menu-item");
if(item.length){
var opts=$(_422).data("menu").options;
var _423=item.data("menuitem").options;
if(_423.disabled){
return;
}
if(!item[0].submenu){
_41b(_422,opts.inline);
if(_423.href){
location.href=_423.href;
}
}
item.trigger("mouseenter");
opts.onClick.call(_422,$(_422).menu("getItem",item[0]));
}
};
function _41b(_424,_425){
var _426=$.data(_424,"menu");
if(_426){
if($(_424).is(":visible")){
_3fb($(_424));
if(_425){
$(_424).show();
}else{
_426.options.onHide.call(_424);
}
}
}
return false;
};
function _427(_428,_429){
_429=_429||{};
var left,top;
var opts=$.data(_428,"menu").options;
var menu=$(_429.menu||_428);
$(_428).menu("resize",menu[0]);
if(menu.hasClass("menu-top")){
$.extend(opts,_429);
left=opts.left;
top=opts.top;
if(opts.alignTo){
var at=$(opts.alignTo);
left=at.offset().left;
top=at.offset().top+at._outerHeight();
if(opts.align=="right"){
left+=at.outerWidth()-menu.outerWidth();
}
}
if(left+menu.outerWidth()>$(window)._outerWidth()+$(document)._scrollLeft()){
left=$(window)._outerWidth()+$(document).scrollLeft()-menu.outerWidth()-5;
}
if(left<0){
left=0;
}
top=_42a(top,opts.alignTo);
}else{
var _42b=_429.parent;
left=_42b.offset().left+_42b.outerWidth()-2;
if(left+menu.outerWidth()+5>$(window)._outerWidth()+$(document).scrollLeft()){
left=_42b.offset().left-menu.outerWidth()+2;
}
top=_42a(_42b.offset().top-3);
}
function _42a(top,_42c){
if(top+menu.outerHeight()>$(window)._outerHeight()+$(document).scrollTop()){
if(_42c){
top=$(_42c).offset().top-menu._outerHeight();
}else{
top=$(window)._outerHeight()+$(document).scrollTop()-menu.outerHeight();
}
}
if(top<0){
top=0;
}
return top;
};
menu.css(opts.position.call(_428,menu[0],left,top));
menu.show(0,function(){
if(!menu[0].shadow){
menu[0].shadow=$("<div class=\"menu-shadow\"></div>").insertAfter(menu);
}
menu[0].shadow.css({display:(menu.hasClass("menu-inline")?"none":"block"),zIndex:$.fn.menu.defaults.zIndex++,left:menu.css("left"),top:menu.css("top"),width:menu.outerWidth(),height:menu.outerHeight()});
menu.css("z-index",$.fn.menu.defaults.zIndex++);
if(menu.hasClass("menu-top")){
opts.onShow.call(_428);
}
});
};
function _3fb(menu){
if(menu&&menu.length){
_42d(menu);
menu.find("div.menu-item").each(function(){
if(this.submenu){
_3fb(this.submenu);
}
$(this).removeClass("menu-active");
});
}
function _42d(m){
m.stop(true,true);
if(m[0].shadow){
m[0].shadow.hide();
}
m.hide();
};
};
function _42e(_42f,text){
var _430=null;
var tmp=$("<div></div>");
function find(menu){
menu.children("div.menu-item").each(function(){
var item=$(_42f).menu("getItem",this);
var s=tmp.empty().html(item.text).text();
if(text==$.trim(s)){
_430=item;
}else{
if(this.submenu&&!_430){
find(this.submenu);
}
}
});
};
find($(_42f));
tmp.remove();
return _430;
};
function _40a(_431,_432,_433){
var t=$(_432);
if(t.hasClass("menu-item")){
var opts=t.data("menuitem").options;
opts.disabled=_433;
if(_433){
t.addClass("menu-item-disabled");
t[0].onclick=null;
}else{
t.removeClass("menu-item-disabled");
t[0].onclick=opts.onclick;
}
}
};
function _434(_435,_436){
var opts=$.data(_435,"menu").options;
var menu=$(_435);
if(_436.parent){
if(!_436.parent.submenu){
var _437=$("<div></div>").appendTo("body");
_436.parent.submenu=_437;
$("<div class=\"menu-rightarrow\"></div>").appendTo(_436.parent);
_402(_435,_437);
}
menu=_436.parent.submenu;
}
var div=$("<div></div>").appendTo(menu);
_404(_435,div,_436);
};
function _438(_439,_43a){
function _43b(el){
if(el.submenu){
el.submenu.children("div.menu-item").each(function(){
_43b(this);
});
var _43c=el.submenu[0].shadow;
if(_43c){
_43c.remove();
}
el.submenu.remove();
}
$(el).remove();
};
_43b(_43a);
};
function _43d(_43e,_43f,_440){
var menu=$(_43f).parent();
if(_440){
$(_43f).show();
}else{
$(_43f).hide();
}
_405(_43e,menu);
};
function _441(_442){
$(_442).children("div.menu-item").each(function(){
_438(_442,this);
});
if(_442.shadow){
_442.shadow.remove();
}
$(_442).remove();
};
$.fn.menu=function(_443,_444){
if(typeof _443=="string"){
return $.fn.menu.methods[_443](this,_444);
}
_443=_443||{};
return this.each(function(){
var _445=$.data(this,"menu");
if(_445){
$.extend(_445.options,_443);
}else{
_445=$.data(this,"menu",{options:$.extend({},$.fn.menu.defaults,$.fn.menu.parseOptions(this),_443)});
init(this);
}
$(this).css({left:_445.options.left,top:_445.options.top});
});
};
$.fn.menu.methods={options:function(jq){
return $.data(jq[0],"menu").options;
},show:function(jq,pos){
return jq.each(function(){
_427(this,pos);
});
},hide:function(jq){
return jq.each(function(){
_41b(this);
});
},destroy:function(jq){
return jq.each(function(){
_441(this);
});
},setText:function(jq,_446){
return jq.each(function(){
var item=$(_446.target).data("menuitem").options;
item.text=_446.text;
$(_446.target).children("div.menu-text").html(_446.text);
});
},setIcon:function(jq,_447){
return jq.each(function(){
var item=$(_447.target).data("menuitem").options;
item.iconCls=_447.iconCls;
$(_447.target).children("div.menu-icon").remove();
if(_447.iconCls){
$("<div class=\"menu-icon\"></div>").addClass(_447.iconCls).appendTo(_447.target);
}
});
},getItem:function(jq,_448){
var item=$(_448).data("menuitem").options;
return $.extend({},item,{target:$(_448)[0]});
},findItem:function(jq,text){
return _42e(jq[0],text);
},appendItem:function(jq,_449){
return jq.each(function(){
_434(this,_449);
});
},removeItem:function(jq,_44a){
return jq.each(function(){
_438(this,_44a);
});
},enableItem:function(jq,_44b){
return jq.each(function(){
_40a(this,_44b,false);
});
},disableItem:function(jq,_44c){
return jq.each(function(){
_40a(this,_44c,true);
});
},showItem:function(jq,_44d){
return jq.each(function(){
_43d(this,_44d,true);
});
},hideItem:function(jq,_44e){
return jq.each(function(){
_43d(this,_44e,false);
});
},resize:function(jq,_44f){
return jq.each(function(){
_405(this,_44f?$(_44f):$(this));
});
}};
$.fn.menu.parseOptions=function(_450){
return $.extend({},$.parser.parseOptions(_450,[{minWidth:"number",itemHeight:"number",duration:"number",hideOnUnhover:"boolean"},{fit:"boolean",inline:"boolean",noline:"boolean"}]));
};
$.fn.menu.defaults={zIndex:110000,left:0,top:0,alignTo:null,align:"left",minWidth:120,itemHeight:22,duration:100,hideOnUnhover:true,inline:false,fit:false,noline:false,events:{mouseenter:_415,mouseleave:_418,mouseover:_41c,mouseout:_41f,click:_421},position:function(_451,left,top){
return {left:left,top:top};
},onShow:function(){
},onHide:function(){
},onClick:function(item){
}};
})(jQuery);
(function($){
function init(_452){
var opts=$.data(_452,"menubutton").options;
var btn=$(_452);
btn.linkbutton(opts);
if(opts.hasDownArrow){
btn.removeClass(opts.cls.btn1+" "+opts.cls.btn2).addClass("m-btn");
btn.removeClass("m-btn-small m-btn-medium m-btn-large").addClass("m-btn-"+opts.size);
var _453=btn.find(".l-btn-left");
$("<span></span>").addClass(opts.cls.arrow).appendTo(_453);
$("<span></span>").addClass("m-btn-line").appendTo(_453);
}
$(_452).menubutton("resize");
if(opts.menu){
$(opts.menu).menu({duration:opts.duration});
var _454=$(opts.menu).menu("options");
var _455=_454.onShow;
var _456=_454.onHide;
$.extend(_454,{onShow:function(){
var _457=$(this).menu("options");
var btn=$(_457.alignTo);
var opts=btn.menubutton("options");
btn.addClass((opts.plain==true)?opts.cls.btn2:opts.cls.btn1);
_455.call(this);
},onHide:function(){
var _458=$(this).menu("options");
var btn=$(_458.alignTo);
var opts=btn.menubutton("options");
btn.removeClass((opts.plain==true)?opts.cls.btn2:opts.cls.btn1);
_456.call(this);
}});
}
};
function _459(_45a){
var opts=$.data(_45a,"menubutton").options;
var btn=$(_45a);
var t=btn.find("."+opts.cls.trigger);
if(!t.length){
t=btn;
}
t.unbind(".menubutton");
var _45b=null;
t.bind("click.menubutton",function(){
if(!_45c()){
_45d(_45a);
return false;
}
}).bind("mouseenter.menubutton",function(){
if(!_45c()){
_45b=setTimeout(function(){
_45d(_45a);
},opts.duration);
return false;
}
}).bind("mouseleave.menubutton",function(){
if(_45b){
clearTimeout(_45b);
}
$(opts.menu).triggerHandler("mouseleave");
});
function _45c(){
return $(_45a).linkbutton("options").disabled;
};
};
function _45d(_45e){
var opts=$(_45e).menubutton("options");
if(opts.disabled||!opts.menu){
return;
}
$("body>div.menu-top").menu("hide");
var btn=$(_45e);
var mm=$(opts.menu);
if(mm.length){
mm.menu("options").alignTo=btn;
mm.menu("show",{alignTo:btn,align:opts.menuAlign});
}
btn.blur();
};
$.fn.menubutton=function(_45f,_460){
if(typeof _45f=="string"){
var _461=$.fn.menubutton.methods[_45f];
if(_461){
return _461(this,_460);
}else{
return this.linkbutton(_45f,_460);
}
}
_45f=_45f||{};
return this.each(function(){
var _462=$.data(this,"menubutton");
if(_462){
$.extend(_462.options,_45f);
}else{
$.data(this,"menubutton",{options:$.extend({},$.fn.menubutton.defaults,$.fn.menubutton.parseOptions(this),_45f)});
$(this).removeAttr("disabled");
}
init(this);
_459(this);
});
};
$.fn.menubutton.methods={options:function(jq){
var _463=jq.linkbutton("options");
return $.extend($.data(jq[0],"menubutton").options,{toggle:_463.toggle,selected:_463.selected,disabled:_463.disabled});
},destroy:function(jq){
return jq.each(function(){
var opts=$(this).menubutton("options");
if(opts.menu){
$(opts.menu).menu("destroy");
}
$(this).remove();
});
}};
$.fn.menubutton.parseOptions=function(_464){
var t=$(_464);
return $.extend({},$.fn.linkbutton.parseOptions(_464),$.parser.parseOptions(_464,["menu",{plain:"boolean",hasDownArrow:"boolean",duration:"number"}]));
};
$.fn.menubutton.defaults=$.extend({},$.fn.linkbutton.defaults,{plain:true,hasDownArrow:true,menu:null,menuAlign:"left",duration:100,cls:{btn1:"m-btn-active",btn2:"m-btn-plain-active",arrow:"m-btn-downarrow",trigger:"m-btn"}});
})(jQuery);
(function($){
function init(_465){
var opts=$.data(_465,"splitbutton").options;
$(_465).menubutton(opts);
$(_465).addClass("s-btn");
};
$.fn.splitbutton=function(_466,_467){
if(typeof _466=="string"){
var _468=$.fn.splitbutton.methods[_466];
if(_468){
return _468(this,_467);
}else{
return this.menubutton(_466,_467);
}
}
_466=_466||{};
return this.each(function(){
var _469=$.data(this,"splitbutton");
if(_469){
$.extend(_469.options,_466);
}else{
$.data(this,"splitbutton",{options:$.extend({},$.fn.splitbutton.defaults,$.fn.splitbutton.parseOptions(this),_466)});
$(this).removeAttr("disabled");
}
init(this);
});
};
$.fn.splitbutton.methods={options:function(jq){
var _46a=jq.menubutton("options");
var _46b=$.data(jq[0],"splitbutton").options;
$.extend(_46b,{disabled:_46a.disabled,toggle:_46a.toggle,selected:_46a.selected});
return _46b;
}};
$.fn.splitbutton.parseOptions=function(_46c){
var t=$(_46c);
return $.extend({},$.fn.linkbutton.parseOptions(_46c),$.parser.parseOptions(_46c,["menu",{plain:"boolean",duration:"number"}]));
};
$.fn.splitbutton.defaults=$.extend({},$.fn.linkbutton.defaults,{plain:true,menu:null,duration:100,cls:{btn1:"m-btn-active s-btn-active",btn2:"m-btn-plain-active s-btn-plain-active",arrow:"m-btn-downarrow",trigger:"m-btn-line"}});
})(jQuery);
(function($){
function init(_46d){
var _46e=$("<span class=\"switchbutton\">"+"<span class=\"switchbutton-inner\">"+"<span class=\"switchbutton-on\"></span>"+"<span class=\"switchbutton-handle\"></span>"+"<span class=\"switchbutton-off\"></span>"+"<input class=\"switchbutton-value\" type=\"checkbox\">"+"</span>"+"</span>").insertAfter(_46d);
var t=$(_46d);
t.addClass("switchbutton-f").hide();
var name=t.attr("name");
if(name){
t.removeAttr("name").attr("switchbuttonName",name);
_46e.find(".switchbutton-value").attr("name",name);
}
_46e.bind("_resize",function(e,_46f){
if($(this).hasClass("extjsui-fluid")||_46f){
_470(_46d);
}
return false;
});
return _46e;
};
function _470(_471,_472){
var _473=$.data(_471,"switchbutton");
var opts=_473.options;
var _474=_473.switchbutton;
if(_472){
$.extend(opts,_472);
}
var _475=_474.is(":visible");
if(!_475){
_474.appendTo("body");
}
_474._size(opts);
var w=_474.width();
var h=_474.height();
var w=_474.outerWidth();
var h=_474.outerHeight();
var _476=parseInt(opts.handleWidth)||_474.height();
var _477=w*2-_476;
_474.find(".switchbutton-inner").css({width:_477+"px",height:h+"px",lineHeight:h+"px"});
_474.find(".switchbutton-handle")._outerWidth(_476)._outerHeight(h).css({marginLeft:-_476/2+"px"});
_474.find(".switchbutton-on").css({width:(w-_476/2)+"px",textIndent:(opts.reversed?"":"-")+_476/2+"px"});
_474.find(".switchbutton-off").css({width:(w-_476/2)+"px",textIndent:(opts.reversed?"-":"")+_476/2+"px"});
opts.marginWidth=w-_476;
_478(_471,opts.checked,false);
if(!_475){
_474.insertAfter(_471);
}
};
function _479(_47a){
var _47b=$.data(_47a,"switchbutton");
var opts=_47b.options;
var _47c=_47b.switchbutton;
var _47d=_47c.find(".switchbutton-inner");
var on=_47d.find(".switchbutton-on").html(opts.onText);
var off=_47d.find(".switchbutton-off").html(opts.offText);
var _47e=_47d.find(".switchbutton-handle").html(opts.handleText);
if(opts.reversed){
off.prependTo(_47d);
on.insertAfter(_47e);
}else{
on.prependTo(_47d);
off.insertAfter(_47e);
}
_47c.find(".switchbutton-value")._propAttr("checked",opts.checked);
_47c.removeClass("switchbutton-disabled").addClass(opts.disabled?"switchbutton-disabled":"");
_47c.removeClass("switchbutton-reversed").addClass(opts.reversed?"switchbutton-reversed":"");
_478(_47a,opts.checked);
_47f(_47a,opts.readonly);
$(_47a).switchbutton("setValue",opts.value);
};
function _478(_480,_481,_482){
var _483=$.data(_480,"switchbutton");
var opts=_483.options;
opts.checked=_481;
var _484=_483.switchbutton.find(".switchbutton-inner");
var _485=_484.find(".switchbutton-on");
var _486=opts.reversed?(opts.checked?opts.marginWidth:0):(opts.checked?0:opts.marginWidth);
var dir=_485.css("float").toLowerCase();
var css={};
css["margin-"+dir]=-_486+"px";
_482?_484.animate(css,200):_484.css(css);
var _487=_484.find(".switchbutton-value");
var ck=_487.is(":checked");
$(_480).add(_487)._propAttr("checked",opts.checked);
if(ck!=opts.checked){
opts.onChange.call(_480,opts.checked);
}
};
function _488(_489,_48a){
var _48b=$.data(_489,"switchbutton");
var opts=_48b.options;
var _48c=_48b.switchbutton;
var _48d=_48c.find(".switchbutton-value");
if(_48a){
opts.disabled=true;
$(_489).add(_48d).attr("disabled","disabled");
_48c.addClass("switchbutton-disabled");
}else{
opts.disabled=false;
$(_489).add(_48d).removeAttr("disabled");
_48c.removeClass("switchbutton-disabled");
}
};
function _47f(_48e,mode){
var _48f=$.data(_48e,"switchbutton");
var opts=_48f.options;
opts.readonly=mode==undefined?true:mode;
_48f.switchbutton.removeClass("switchbutton-readonly").addClass(opts.readonly?"switchbutton-readonly":"");
};
function _490(_491){
var _492=$.data(_491,"switchbutton");
var opts=_492.options;
_492.switchbutton.unbind(".switchbutton").bind("click.switchbutton",function(){
if(!opts.disabled&&!opts.readonly){
_478(_491,opts.checked?false:true,true);
}
});
};
$.fn.switchbutton=function(_493,_494){
if(typeof _493=="string"){
return $.fn.switchbutton.methods[_493](this,_494);
}
_493=_493||{};
return this.each(function(){
var _495=$.data(this,"switchbutton");
if(_495){
$.extend(_495.options,_493);
}else{
_495=$.data(this,"switchbutton",{options:$.extend({},$.fn.switchbutton.defaults,$.fn.switchbutton.parseOptions(this),_493),switchbutton:init(this)});
}
_495.options.originalChecked=_495.options.checked;
_479(this);
_470(this);
_490(this);
});
};
$.fn.switchbutton.methods={options:function(jq){
var _496=jq.data("switchbutton");
return $.extend(_496.options,{value:_496.switchbutton.find(".switchbutton-value").val()});
},resize:function(jq,_497){
return jq.each(function(){
_470(this,_497);
});
},enable:function(jq){
return jq.each(function(){
_488(this,false);
});
},disable:function(jq){
return jq.each(function(){
_488(this,true);
});
},readonly:function(jq,mode){
return jq.each(function(){
_47f(this,mode);
});
},check:function(jq){
return jq.each(function(){
_478(this,true);
});
},uncheck:function(jq){
return jq.each(function(){
_478(this,false);
});
},clear:function(jq){
return jq.each(function(){
_478(this,false);
});
},reset:function(jq){
return jq.each(function(){
var opts=$(this).switchbutton("options");
_478(this,opts.originalChecked);
});
},setValue:function(jq,_498){
return jq.each(function(){
$(this).val(_498);
$.data(this,"switchbutton").switchbutton.find(".switchbutton-value").val(_498);
});
}};
$.fn.switchbutton.parseOptions=function(_499){
var t=$(_499);
return $.extend({},$.parser.parseOptions(_499,["onText","offText","handleText",{handleWidth:"number",reversed:"boolean"}]),{value:(t.val()||undefined),checked:(t.attr("checked")?true:undefined),disabled:(t.attr("disabled")?true:undefined),readonly:(t.attr("readonly")?true:undefined)});
};
$.fn.switchbutton.defaults={handleWidth:"auto",width:60,height:26,checked:false,disabled:false,readonly:false,reversed:false,onText:"ON",offText:"OFF",handleText:"",value:"on",onChange:function(_49a){
}};
})(jQuery);
(function($){
function init(_49b){
$(_49b).addClass("validatebox-text");
};
function _49c(_49d){
var _49e=$.data(_49d,"validatebox");
_49e.validating=false;
if(_49e.timer){
clearTimeout(_49e.timer);
}
$(_49d).tooltip("destroy");
$(_49d).unbind();
$(_49d).remove();
};
function _49f(_4a0){
var opts=$.data(_4a0,"validatebox").options;
$(_4a0).unbind(".validatebox");
if(opts.novalidate||opts.disabled){
return;
}
for(var _4a1 in opts.events){
$(_4a0).bind(_4a1+".validatebox",{target:_4a0},opts.events[_4a1]);
}
};
function _4a2(e){
var _4a3=e.data.target;
var _4a4=$.data(_4a3,"validatebox");
var opts=_4a4.options;
if($(_4a3).attr("readonly")){
return;
}
_4a4.validating=true;
_4a4.value=opts.val(_4a3);
(function(){
if(_4a4.validating){
var _4a5=opts.val(_4a3);
if(_4a4.value!=_4a5){
_4a4.value=_4a5;
if(_4a4.timer){
clearTimeout(_4a4.timer);
}
_4a4.timer=setTimeout(function(){
$(_4a3).validatebox("validate");
},opts.delay);
}else{
if(_4a4.message){
opts.err(_4a3,_4a4.message);
}
}
setTimeout(arguments.callee,opts.interval);
}
})();
};
function _4a6(e){
var _4a7=e.data.target;
var _4a8=$.data(_4a7,"validatebox");
var opts=_4a8.options;
_4a8.validating=false;
if(_4a8.timer){
clearTimeout(_4a8.timer);
_4a8.timer=undefined;
}
if(opts.validateOnBlur){
$(_4a7).validatebox("validate");
}
opts.err(_4a7,_4a8.message,"hide");
};
function _4a9(e){
var _4aa=e.data.target;
var _4ab=$.data(_4aa,"validatebox");
_4ab.options.err(_4aa,_4ab.message,"show");
};
function _4ac(e){
var _4ad=e.data.target;
var _4ae=$.data(_4ad,"validatebox");
if(!_4ae.validating){
_4ae.options.err(_4ad,_4ae.message,"hide");
}
};
function _4af(_4b0,_4b1,_4b2){
var _4b3=$.data(_4b0,"validatebox");
var opts=_4b3.options;
var t=$(_4b0);
if(_4b2=="hide"||!_4b1){
t.tooltip("hide");
}else{
if((t.is(":focus")&&_4b3.validating)||_4b2=="show"){
t.tooltip($.extend({},opts.tipOptions,{content:_4b1,position:opts.tipPosition,deltaX:opts.deltaX})).tooltip("show");
}
}
};
function _4b4(_4b5){
var _4b6=$.data(_4b5,"validatebox");
var opts=_4b6.options;
var box=$(_4b5);
opts.onBeforeValidate.call(_4b5);
var _4b7=_4b8();
_4b7?box.removeClass("validatebox-invalid"):box.addClass("validatebox-invalid");
opts.err(_4b5,_4b6.message);
opts.onValidate.call(_4b5,_4b7);
return _4b7;
function _4b9(msg){
_4b6.message=msg;
};
function _4ba(_4bb,_4bc){
var _4bd=opts.val(_4b5);
var _4be=/([a-zA-Z_]+)(.*)/.exec(_4bb);
var rule=opts.rules[_4be[1]];
if(rule&&_4bd){
var _4bf=_4bc||opts.validParams||eval(_4be[2]);
if(!rule["validator"].call(_4b5,_4bd,_4bf)){
var _4c0=rule["message"];
if(_4bf){
for(var i=0;i<_4bf.length;i++){
_4c0=_4c0.replace(new RegExp("\\{"+i+"\\}","g"),_4bf[i]);
}
}
_4b9(opts.invalidMessage||_4c0);
return false;
}
}
return true;
};
function _4b8(){
_4b9("");
if(!opts._validateOnCreate){
setTimeout(function(){
opts._validateOnCreate=true;
},0);
return true;
}
if(opts.novalidate||opts.disabled){
return true;
}
if(opts.required){
if(opts.val(_4b5)==""){
_4b9(opts.missingMessage);
return false;
}
}
if(opts.validType){
if($.isArray(opts.validType)){
for(var i=0;i<opts.validType.length;i++){
if(!_4ba(opts.validType[i])){
return false;
}
}
}else{
if(typeof opts.validType=="string"){
if(!_4ba(opts.validType)){
return false;
}
}else{
for(var _4c1 in opts.validType){
var _4c2=opts.validType[_4c1];
if(!_4ba(_4c1,_4c2)){
return false;
}
}
}
}
}
return true;
};
};
function _4c3(_4c4,_4c5){
var opts=$.data(_4c4,"validatebox").options;
if(_4c5!=undefined){
opts.disabled=_4c5;
}
if(opts.disabled){
$(_4c4).addClass("validatebox-disabled").attr("disabled","disabled");
}else{
$(_4c4).removeClass("validatebox-disabled").removeAttr("disabled");
}
};
function _4c6(_4c7,mode){
var opts=$.data(_4c7,"validatebox").options;
opts.readonly=mode==undefined?true:mode;
if(opts.readonly||!opts.editable){
$(_4c7).triggerHandler("blur.validatebox");
$(_4c7).addClass("validatebox-readonly").attr("readonly","readonly");
}else{
$(_4c7).removeClass("validatebox-readonly").removeAttr("readonly");
}
};
$.fn.validatebox=function(_4c8,_4c9){
if(typeof _4c8=="string"){
return $.fn.validatebox.methods[_4c8](this,_4c9);
}
_4c8=_4c8||{};
return this.each(function(){
var _4ca=$.data(this,"validatebox");
if(_4ca){
$.extend(_4ca.options,_4c8);
}else{
init(this);
_4ca=$.data(this,"validatebox",{options:$.extend({},$.fn.validatebox.defaults,$.fn.validatebox.parseOptions(this),_4c8)});
}
_4ca.options._validateOnCreate=_4ca.options.validateOnCreate;
_4c3(this,_4ca.options.disabled);
_4c6(this,_4ca.options.readonly);
_49f(this);
_4b4(this);
});
};
$.fn.validatebox.methods={options:function(jq){
return $.data(jq[0],"validatebox").options;
},destroy:function(jq){
return jq.each(function(){
_49c(this);
});
},validate:function(jq){
return jq.each(function(){
_4b4(this);
});
},isValid:function(jq){
return _4b4(jq[0]);
},enableValidation:function(jq){
return jq.each(function(){
$(this).validatebox("options").novalidate=false;
_49f(this);
_4b4(this);
});
},disableValidation:function(jq){
return jq.each(function(){
$(this).validatebox("options").novalidate=true;
_49f(this);
_4b4(this);
});
},resetValidation:function(jq){
return jq.each(function(){
var opts=$(this).validatebox("options");
opts._validateOnCreate=opts.validateOnCreate;
_4b4(this);
});
},enable:function(jq){
return jq.each(function(){
_4c3(this,false);
_49f(this);
_4b4(this);
});
},disable:function(jq){
return jq.each(function(){
_4c3(this,true);
_49f(this);
_4b4(this);
});
},readonly:function(jq,mode){
return jq.each(function(){
_4c6(this,mode);
_49f(this);
_4b4(this);
});
}};
$.fn.validatebox.parseOptions=function(_4cb){
var t=$(_4cb);
return $.extend({},$.parser.parseOptions(_4cb,["validType","missingMessage","invalidMessage","tipPosition",{delay:"number",interval:"number",deltaX:"number"},{editable:"boolean",validateOnCreate:"boolean",validateOnBlur:"boolean"}]),{required:(t.attr("required")?true:undefined),disabled:(t.attr("disabled")?true:undefined),readonly:(t.attr("readonly")?true:undefined),novalidate:(t.attr("novalidate")!=undefined?true:undefined)});
};
$.fn.validatebox.defaults={required:false,validType:null,validParams:null,delay:200,interval:200,missingMessage:"This field is required.",invalidMessage:null,tipPosition:"right",deltaX:0,novalidate:false,editable:true,disabled:false,readonly:false,validateOnCreate:true,validateOnBlur:false,events:{focus:_4a2,blur:_4a6,mouseenter:_4a9,mouseleave:_4ac,click:function(e){
var t=$(e.data.target);
if(t.attr("type")=="checkbox"||t.attr("type")=="radio"){
t.focus().validatebox("validate");
}
}},val:function(_4cc){
return $(_4cc).val();
},err:function(_4cd,_4ce,_4cf){
_4af(_4cd,_4ce,_4cf);
},tipOptions:{showEvent:"none",hideEvent:"none",showDelay:0,hideDelay:0,zIndex:"",onShow:function(){
$(this).tooltip("tip").css({color:"#000",borderColor:"#CC9933",backgroundColor:"#FFFFCC"});
},onHide:function(){
$(this).tooltip("destroy");
}},rules:{email:{validator:function(_4d0){
return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(_4d0);
},message:"Please enter a valid email address."},url:{validator:function(_4d1){
return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(_4d1);
},message:"Please enter a valid URL."},length:{validator:function(_4d2,_4d3){
var len=$.trim(_4d2).length;
return len>=_4d3[0]&&len<=_4d3[1];
},message:"Please enter a value between {0} and {1}."},remote:{validator:function(_4d4,_4d5){
var data={};
data[_4d5[1]]=_4d4;
var _4d6=$.ajax({url:_4d5[0],dataType:"json",data:data,async:false,cache:false,type:"post"}).responseText;
return _4d6=="true";
},message:"Please fix this field."}},onBeforeValidate:function(){
},onValidate:function(_4d7){
}};
})(jQuery);
(function($){
var _4d8=0;
function init(_4d9){
$(_4d9).addClass("textbox-f").hide();
var span=$("<span class=\"textbox\">"+"<input class=\"textbox-text\" autocomplete=\"off\">"+"<input type=\"hidden\" class=\"textbox-value\">"+"</span>").insertAfter(_4d9);
var name=$(_4d9).attr("name");
if(name){
span.find("input.textbox-value").attr("name",name);
$(_4d9).removeAttr("name").attr("textboxName",name);
}
return span;
};
function _4da(_4db){
var _4dc=$.data(_4db,"textbox");
var opts=_4dc.options;
var tb=_4dc.textbox;
var _4dd="_extjsui_textbox_input"+(++_4d8);
tb.find(".textbox-text").remove();
if(opts.multiline){
$("<textarea id=\""+_4dd+"\" class=\"textbox-text\" autocomplete=\"off\"></textarea>").prependTo(tb);
}else{
$("<input id=\""+_4dd+"\" type=\""+opts.type+"\" class=\"textbox-text\" autocomplete=\"off\">").prependTo(tb);
}
$("#"+_4dd).attr("tabindex",$(_4db).attr("tabindex")||"");
tb.find(".textbox-addon").remove();
var bb=opts.icons?$.extend(true,[],opts.icons):[];
if(opts.iconCls){
bb.push({iconCls:opts.iconCls,disabled:true});
}
if(bb.length){
var bc=$("<span class=\"textbox-addon\"></span>").prependTo(tb);
bc.addClass("textbox-addon-"+opts.iconAlign);
for(var i=0;i<bb.length;i++){
bc.append("<a href=\"javascript:void(0)\" class=\"textbox-icon "+bb[i].iconCls+"\" icon-index=\""+i+"\" tabindex=\"-1\"></a>");
}
}
tb.find(".textbox-button").remove();
if(opts.buttonText||opts.buttonIcon){
var btn=$("<a href=\"javascript:void(0)\" class=\"textbox-button\"></a>").prependTo(tb);
btn.addClass("textbox-button-"+opts.buttonAlign).linkbutton({text:opts.buttonText,iconCls:opts.buttonIcon});
}
if(opts.label){
if(typeof opts.label=="object"){
_4dc.label=$(opts.label);
_4dc.label.attr("for",_4dd);
}else{
$(_4dc.label).remove();
_4dc.label=$("<label class=\"textbox-label\"></label>").html(opts.label);
_4dc.label.css("textAlign",opts.labelAlign).attr("for",_4dd);
if(opts.labelPosition=="after"){
_4dc.label.insertAfter(tb);
}else{
_4dc.label.insertBefore(_4db);
}
_4dc.label.removeClass("textbox-label-left textbox-label-right textbox-label-top");
_4dc.label.addClass("textbox-label-"+opts.labelPosition);
}
}else{
$(_4dc.label).remove();
}
_4de(_4db);
_4df(_4db,opts.disabled);
_4e0(_4db,opts.readonly);
};
function _4e1(_4e2){
var tb=$.data(_4e2,"textbox").textbox;
tb.find(".textbox-text").validatebox("destroy");
tb.remove();
$(_4e2).remove();
};
function _4e3(_4e4,_4e5){
var _4e6=$.data(_4e4,"textbox");
var opts=_4e6.options;
var tb=_4e6.textbox;
var _4e7=tb.parent();
if(_4e5){
if(typeof _4e5=="object"){
$.extend(opts,_4e5);
}else{
opts.width=_4e5;
}
}
if(isNaN(parseInt(opts.width))){
var c=$(_4e4).clone();
c.css("visibility","hidden");
c.insertAfter(_4e4);
opts.width=c.outerWidth();
c.remove();
}
var _4e8=tb.is(":visible");
if(!_4e8){
tb.appendTo("body");
}
var _4e9=tb.find(".textbox-text");
var btn=tb.find(".textbox-button");
var _4ea=tb.find(".textbox-addon");
var _4eb=_4ea.find(".textbox-icon");
if(opts.height=="auto"){
_4e9.css({paddingTop:"",paddingBottom:"",height:"",lineHeight:""});
}
tb._size(opts,_4e7);
if(opts.label&&opts.labelPosition){
if(opts.labelPosition=="top"){
_4e6.label._size({width:opts.labelWidth=="auto"?tb.outerWidth():opts.labelWidth},tb);
if(opts.height!="auto"){
tb._size("height",tb.outerHeight()-_4e6.label.outerHeight());
}
}else{
_4e6.label._size({width:opts.labelWidth,height:tb.outerHeight()},tb);
if(!opts.multiline){
_4e6.label.css("lineHeight",_4e6.label.height()+"px");
}
tb._size("width",tb.outerWidth()-_4e6.label.outerWidth());
}
}
btn.linkbutton("resize",{height:tb.height()});
btn.css({left:(opts.buttonAlign=="left"?0:""),right:(opts.buttonAlign=="right"?0:"")});
_4ea.css({left:(opts.iconAlign=="left"?(opts.buttonAlign=="left"?btn._outerWidth():0):""),right:(opts.iconAlign=="right"?(opts.buttonAlign=="right"?btn._outerWidth():0):"")});
_4eb.css({width:opts.iconWidth+"px",height:tb.height()+"px"});
_4e9.css({paddingLeft:(_4e4.style.paddingLeft||""),paddingRight:(_4e4.style.paddingRight||""),marginLeft:_4ec("left"),marginRight:_4ec("right")});
if(opts.multiline){
_4e9.css({paddingTop:(_4e4.style.paddingTop||""),paddingBottom:(_4e4.style.paddingBottom||"")});
_4e9._outerHeight(tb.height());
}else{
_4e9.css({paddingTop:0,paddingBottom:0,height:tb.height()+"px",lineHeight:tb.height()+"px"});
}
_4e9._outerWidth(tb.width()-_4eb.length*opts.iconWidth-btn._outerWidth());
if(!_4e8){
tb.insertAfter(_4e4);
}
opts.onResize.call(_4e4,opts.width,opts.height);
function _4ec(_4ed){
return (opts.iconAlign==_4ed?_4ea._outerWidth():0)+(opts.buttonAlign==_4ed?btn._outerWidth():0);
};
};
function _4de(_4ee){
var opts=$(_4ee).textbox("options");
var _4ef=$(_4ee).textbox("textbox");
_4ef.validatebox($.extend({},opts,{deltaX:function(_4f0){
return $(_4ee).textbox("getTipX",_4f0);
},onBeforeValidate:function(){
opts.onBeforeValidate.call(_4ee);
var box=$(this);
if(!box.is(":focus")){
if(box.val()!==opts.value){
opts.oldInputValue=box.val();
box.val(opts.value);
}
}
},onValidate:function(_4f1){
var box=$(this);
if(opts.oldInputValue!=undefined){
box.val(opts.oldInputValue);
opts.oldInputValue=undefined;
}
var tb=box.parent();
if(_4f1){
tb.removeClass("textbox-invalid");
}else{
tb.addClass("textbox-invalid");
}
opts.onValidate.call(_4ee,_4f1);
}}));
};
function _4f2(_4f3){
var _4f4=$.data(_4f3,"textbox");
var opts=_4f4.options;
var tb=_4f4.textbox;
var _4f5=tb.find(".textbox-text");
_4f5.attr("placeholder",opts.prompt);
_4f5.unbind(".textbox");
$(_4f4.label).unbind(".textbox");
if(!opts.disabled&&!opts.readonly){
if(_4f4.label){
$(_4f4.label).bind("click.textbox",function(e){
if(!opts.hasFocusMe){
_4f5.focus();
$(_4f3).textbox("setSelectionRange",{start:0,end:_4f5.val().length});
}
});
}
_4f5.bind("blur.textbox",function(e){
if(!tb.hasClass("textbox-focused")){
return;
}
opts.value=$(this).val();
if(opts.value==""){
$(this).val(opts.prompt).addClass("textbox-prompt");
}else{
$(this).removeClass("textbox-prompt");
}
tb.removeClass("textbox-focused");
}).bind("focus.textbox",function(e){
opts.hasFocusMe=true;
if(tb.hasClass("textbox-focused")){
return;
}
if($(this).val()!=opts.value){
$(this).val(opts.value);
}
$(this).removeClass("textbox-prompt");
tb.addClass("textbox-focused");
});
for(var _4f6 in opts.inputEvents){
_4f5.bind(_4f6+".textbox",{target:_4f3},opts.inputEvents[_4f6]);
}
}
var _4f7=tb.find(".textbox-addon");
_4f7.unbind().bind("click",{target:_4f3},function(e){
var icon=$(e.target).closest("a.textbox-icon:not(.textbox-icon-disabled)");
if(icon.length){
var _4f8=parseInt(icon.attr("icon-index"));
var conf=opts.icons[_4f8];
if(conf&&conf.handler){
conf.handler.call(icon[0],e);
opts.onClickIcon.call(_4f3,_4f8);
}
}
});
_4f7.find(".textbox-icon").each(function(_4f9){
var conf=opts.icons[_4f9];
var icon=$(this);
if(!conf||conf.disabled||opts.disabled||opts.readonly){
icon.addClass("textbox-icon-disabled");
}else{
icon.removeClass("textbox-icon-disabled");
}
});
var btn=tb.find(".textbox-button");
btn.unbind(".textbox").bind("click.textbox",function(){
if(!btn.linkbutton("options").disabled){
opts.onClickButton.call(_4f3);
}
});
btn.linkbutton((opts.disabled||opts.readonly)?"disable":"enable");
tb.unbind(".textbox").bind("_resize.textbox",function(e,_4fa){
if($(this).hasClass("extjsui-fluid")||_4fa){
_4e3(_4f3);
}
return false;
});
};
function _4df(_4fb,_4fc){
var _4fd=$.data(_4fb,"textbox");
var opts=_4fd.options;
var tb=_4fd.textbox;
var _4fe=tb.find(".textbox-text");
var ss=$(_4fb).add(tb.find(".textbox-value"));
opts.disabled=_4fc;
if(opts.disabled){
_4fe.blur();
_4fe.validatebox("disable");
tb.addClass("textbox-disabled");
ss.attr("disabled","disabled");
$(_4fd.label).addClass("textbox-label-disabled");
}else{
_4fe.validatebox("enable");
tb.removeClass("textbox-disabled");
ss.removeAttr("disabled");
$(_4fd.label).removeClass("textbox-label-disabled");
}
};
function _4e0(_4ff,mode){
var _500=$.data(_4ff,"textbox");
var opts=_500.options;
var tb=_500.textbox;
var _501=tb.find(".textbox-text");
opts.readonly=mode==undefined?true:mode;
if(opts.readonly){
_501.triggerHandler("blur.textbox");
}
_501.validatebox("readonly",opts.readonly);
tb.removeClass("textbox-readonly").addClass(opts.readonly?"textbox-readonly":"");
};
$.fn.textbox=function(_502,_503){
if(typeof _502=="string"){
var _504=$.fn.textbox.methods[_502];
if(_504){
return _504(this,_503);
}else{
return this.each(function(){
var _505=$(this).textbox("textbox");
_505.validatebox(_502,_503);
});
}
}
_502=_502||{};
return this.each(function(){
var _506=$.data(this,"textbox");
if(_506){
$.extend(_506.options,_502);
if(_502.value!=undefined){
_506.options.originalValue=_502.value;
}
}else{
_506=$.data(this,"textbox",{options:$.extend({},$.fn.textbox.defaults,$.fn.textbox.parseOptions(this),_502),textbox:init(this)});
_506.options.originalValue=_506.options.value;
}
_4da(this);
_4f2(this);
_4e3(this);
var _507=_506.options.value;
_506.options.value="";
$(this).textbox("initValue",_507);
});
};
$.fn.textbox.methods={options:function(jq){
return $.data(jq[0],"textbox").options;
},cloneFrom:function(jq,from){
return jq.each(function(){
var t=$(this);
if(t.data("textbox")){
return;
}
if(!$(from).data("textbox")){
$(from).textbox();
}
var name=t.attr("name")||"";
t.addClass("textbox-f").hide();
t.removeAttr("name").attr("textboxName",name);
var span=$(from).next().clone().insertAfter(t);
span.find("input.textbox-value").attr("name",name);
$.data(this,"textbox",{options:$.extend(true,{},$(from).textbox("options")),textbox:span});
var _508=$(from).textbox("button");
if(_508.length){
t.textbox("button").linkbutton($.extend(true,{},_508.linkbutton("options")));
}
_4f2(this);
_4de(this);
});
},textbox:function(jq){
return $.data(jq[0],"textbox").textbox.find(".textbox-text");
},button:function(jq){
return $.data(jq[0],"textbox").textbox.find(".textbox-button");
},destroy:function(jq){
return jq.each(function(){
_4e1(this);
});
},resize:function(jq,_509){
return jq.each(function(){
_4e3(this,_509);
});
},disable:function(jq){
return jq.each(function(){
_4df(this,true);
_4f2(this);
});
},enable:function(jq){
return jq.each(function(){
_4df(this,false);
_4f2(this);
});
},readonly:function(jq,mode){
return jq.each(function(){
_4e0(this,mode);
_4f2(this);
});
},isValid:function(jq){
return jq.textbox("textbox").validatebox("isValid");
},clear:function(jq){
return jq.each(function(){
$(this).textbox("setValue","");
});
},setText:function(jq,_50a){
return jq.each(function(){
var opts=$(this).textbox("options");
var _50b=$(this).textbox("textbox");
_50a=_50a==undefined?"":String(_50a);
if($(this).textbox("getText")!=_50a){
_50b.val(_50a);
}
opts.value=_50a;
if(!_50b.is(":focus")){
if(_50a){
_50b.removeClass("textbox-prompt");
}else{
_50b.val(opts.prompt).addClass("textbox-prompt");
}
}
$(this).textbox("validate");
});
},initValue:function(jq,_50c){
return jq.each(function(){
var _50d=$.data(this,"textbox");
$(this).textbox("setText",_50c);
_50d.textbox.find(".textbox-value").val(_50c);
$(this).val(_50c);
});
},setValue:function(jq,_50e){
return jq.each(function(){
var opts=$.data(this,"textbox").options;
var _50f=$(this).textbox("getValue");
$(this).textbox("initValue",_50e);
if(_50f!=_50e){
opts.onChange.call(this,_50e,_50f);
$(this).closest("form").trigger("_change",[this]);
}
});
},getText:function(jq){
var _510=jq.textbox("textbox");
if(_510.is(":focus")){
return _510.val();
}else{
return jq.textbox("options").value;
}
},getValue:function(jq){
return jq.data("textbox").textbox.find(".textbox-value").val();
},reset:function(jq){
return jq.each(function(){
var opts=$(this).textbox("options");
$(this).textbox("setValue",opts.originalValue);
});
},getIcon:function(jq,_511){
return jq.data("textbox").textbox.find(".textbox-icon:eq("+_511+")");
},getTipX:function(jq,_512){
var _513=jq.data("textbox");
var opts=_513.options;
var tb=_513.textbox;
var _514=tb.find(".textbox-text");
var _515=tb.find(".textbox-addon")._outerWidth();
var _516=tb.find(".textbox-button")._outerWidth();
var _512=_512||opts.tipPosition;
if(_512=="right"){
return (opts.iconAlign=="right"?_515:0)+(opts.buttonAlign=="right"?_516:0)+1;
}else{
if(_512=="left"){
return (opts.iconAlign=="left"?-_515:0)+(opts.buttonAlign=="left"?-_516:0)-1;
}else{
return _515/2*(opts.iconAlign=="right"?1:-1)+_516/2*(opts.buttonAlign=="right"?1:-1);
}
}
},getSelectionStart:function(jq){
return jq.textbox("getSelectionRange").start;
},getSelectionRange:function(jq){
var _517=jq.textbox("textbox")[0];
var _518=0;
var end=0;
if(typeof _517.selectionStart=="number"){
_518=_517.selectionStart;
end=_517.selectionEnd;
}else{
if(_517.createTextRange){
var s=document.selection.createRange();
var _519=_517.createTextRange();
_519.setEndPoint("EndToStart",s);
_518=_519.text.length;
end=_518+s.text.length;
}
}
return {start:_518,end:end};
},setSelectionRange:function(jq,_51a){
return jq.each(function(){
var _51b=$(this).textbox("textbox")[0];
var _51c=_51a.start;
var end=_51a.end;
if(_51b.setSelectionRange){
_51b.setSelectionRange(_51c,end);
}else{
if(_51b.createTextRange){
var _51d=_51b.createTextRange();
_51d.collapse();
_51d.moveEnd("character",end);
_51d.moveStart("character",_51c);
_51d.select();
}
}
});
}};
$.fn.textbox.parseOptions=function(_51e){
var t=$(_51e);
return $.extend({},$.fn.validatebox.parseOptions(_51e),$.parser.parseOptions(_51e,["prompt","iconCls","iconAlign","buttonText","buttonIcon","buttonAlign","label","labelPosition","labelAlign",{multiline:"boolean",iconWidth:"number",labelWidth:"number"}]),{value:(t.val()||undefined),type:(t.attr("type")?t.attr("type"):undefined)});
};
$.fn.textbox.defaults=$.extend({},$.fn.validatebox.defaults,{width:"auto",height:"auto",prompt:"",value:"",type:"text",multiline:false,icons:[],iconCls:null,iconAlign:"right",iconWidth:18,buttonText:"",buttonIcon:null,buttonAlign:"right",label:null,labelWidth:"auto",labelPosition:"before",labelAlign:"left",inputEvents:{blur:function(e){
var t=$(e.data.target);
var opts=t.textbox("options");
if(t.textbox("getValue")!=opts.value){
t.textbox("setValue",opts.value);
}
},keydown:function(e){
if(e.keyCode==13){
var t=$(e.data.target);
t.textbox("setValue",t.textbox("getText"));
}
}},onChange:function(_51f,_520){
},onResize:function(_521,_522){
},onClickButton:function(){
},onClickIcon:function(_523){
}});
})(jQuery);
(function($){
function _524(_525){
var _526=$.data(_525,"passwordbox");
var opts=_526.options;
var _527=$.extend(true,[],opts.icons);
if(opts.showEye){
_527.push({iconCls:"passwordbox-open",handler:function(e){
opts.revealed=!opts.revealed;
_528(_525);
}});
}
$(_525).addClass("passwordbox-f").textbox($.extend({},opts,{icons:_527}));
_528(_525);
};
function _529(_52a,_52b,all){
var t=$(_52a);
var opts=t.passwordbox("options");
if(opts.revealed){
t.textbox("setValue",_52b);
return;
}
var _52c=unescape(opts.passwordChar);
var cc=_52b.split("");
var vv=t.passwordbox("getValue").split("");
for(var i=0;i<cc.length;i++){
var c=cc[i];
if(c!=vv[i]){
if(c!=_52c){
vv.splice(i,0,c);
}
}
}
var pos=t.passwordbox("getSelectionStart");
if(cc.length<vv.length){
vv.splice(pos,vv.length-cc.length,"");
}
for(var i=0;i<cc.length;i++){
if(all||i!=pos-1){
cc[i]=_52c;
}
}
t.textbox("setValue",vv.join(""));
t.textbox("setText",cc.join(""));
t.textbox("setSelectionRange",{start:pos,end:pos});
};
function _528(_52d,_52e){
var t=$(_52d);
var opts=t.passwordbox("options");
var icon=t.next().find(".passwordbox-open");
var _52f=unescape(opts.passwordChar);
_52e=_52e==undefined?t.textbox("getValue"):_52e;
t.textbox("setValue",_52e);
t.textbox("setText",opts.revealed?_52e:_52e.replace(/./ig,_52f));
opts.revealed?icon.addClass("passwordbox-close"):icon.removeClass("passwordbox-close");
};
function _530(e){
var _531=e.data.target;
var t=$(e.data.target);
var _532=t.data("passwordbox");
var opts=t.data("passwordbox").options;
_532.checking=true;
_532.value=t.passwordbox("getText");
(function(){
if(_532.checking){
var _533=t.passwordbox("getText");
if(_532.value!=_533){
_532.value=_533;
if(_532.lastTimer){
clearTimeout(_532.lastTimer);
_532.lastTimer=undefined;
}
_529(_531,_533);
_532.lastTimer=setTimeout(function(){
_529(_531,t.passwordbox("getText"),true);
_532.lastTimer=undefined;
},opts.lastDelay);
}
setTimeout(arguments.callee,opts.checkInterval);
}
})();
};
function _534(e){
var _535=e.data.target;
var _536=$(_535).data("passwordbox");
_536.checking=false;
if(_536.lastTimer){
clearTimeout(_536.lastTimer);
_536.lastTimer=undefined;
}
_528(_535);
};
$.fn.passwordbox=function(_537,_538){
if(typeof _537=="string"){
var _539=$.fn.passwordbox.methods[_537];
if(_539){
return _539(this,_538);
}else{
return this.textbox(_537,_538);
}
}
_537=_537||{};
return this.each(function(){
var _53a=$.data(this,"passwordbox");
if(_53a){
$.extend(_53a.options,_537);
}else{
_53a=$.data(this,"passwordbox",{options:$.extend({},$.fn.passwordbox.defaults,$.fn.passwordbox.parseOptions(this),_537)});
}
_524(this);
});
};
$.fn.passwordbox.methods={options:function(jq){
return $.data(jq[0],"passwordbox").options;
},setValue:function(jq,_53b){
return jq.each(function(){
_528(this,_53b);
});
},clear:function(jq){
return jq.each(function(){
_528(this,"");
});
},reset:function(jq){
return jq.each(function(){
$(this).textbox("reset");
_528(this);
});
},showPassword:function(jq){
return jq.each(function(){
var opts=$(this).passwordbox("options");
opts.revealed=true;
_528(this);
});
},hidePassword:function(jq){
return jq.each(function(){
var opts=$(this).passwordbox("options");
opts.revealed=false;
_528(this);
});
}};
$.fn.passwordbox.parseOptions=function(_53c){
return $.extend({},$.fn.textbox.parseOptions(_53c),$.parser.parseOptions(_53c,["passwordChar",{checkInterval:"number",lastDelay:"number",revealed:"boolean",showEye:"boolean"}]));
};
$.fn.passwordbox.defaults=$.extend({},$.fn.textbox.defaults,{passwordChar:"%u25CF",checkInterval:200,lastDelay:500,revealed:false,showEye:true,inputEvents:{focus:_530,blur:_534},val:function(_53d){
return $(_53d).parent().prev().passwordbox("getValue");
}});
})(jQuery);
(function($){
var _53e=0;
function _53f(_540){
var _541=$.data(_540,"filebox");
var opts=_541.options;
opts.fileboxId="filebox_file_id_"+(++_53e);
$(_540).addClass("filebox-f").textbox(opts);
$(_540).textbox("textbox").attr("readonly","readonly");
_541.filebox=$(_540).next().addClass("filebox");
var file=_542(_540);
var btn=$(_540).filebox("button");
if(btn.length){
$("<label class=\"filebox-label\" for=\""+opts.fileboxId+"\"></label>").appendTo(btn);
if(btn.linkbutton("options").disabled){
file.attr("disabled","disabled");
}else{
file.removeAttr("disabled");
}
}
};
function _542(_543){
var _544=$.data(_543,"filebox");
var opts=_544.options;
_544.filebox.find(".textbox-value").remove();
opts.oldValue="";
var file=$("<input type=\"file\" class=\"textbox-value\">").appendTo(_544.filebox);
file.attr("id",opts.fileboxId).attr("name",$(_543).attr("textboxName")||"");
file.attr("accept",opts.accept);
if(opts.multiple){
file.attr("multiple","multiple");
}
file.change(function(){
var _545=this.value;
if(this.files){
_545=$.map(this.files,function(file){
return file.name;
}).join(opts.separator);
}
$(_543).filebox("setText",_545);
opts.onChange.call(_543,_545,opts.oldValue);
opts.oldValue=_545;
});
return file;
};
$.fn.filebox=function(_546,_547){
if(typeof _546=="string"){
var _548=$.fn.filebox.methods[_546];
if(_548){
return _548(this,_547);
}else{
return this.textbox(_546,_547);
}
}
_546=_546||{};
return this.each(function(){
var _549=$.data(this,"filebox");
if(_549){
$.extend(_549.options,_546);
}else{
$.data(this,"filebox",{options:$.extend({},$.fn.filebox.defaults,$.fn.filebox.parseOptions(this),_546)});
}
_53f(this);
});
};
$.fn.filebox.methods={options:function(jq){
var opts=jq.textbox("options");
return $.extend($.data(jq[0],"filebox").options,{width:opts.width,value:opts.value,originalValue:opts.originalValue,disabled:opts.disabled,readonly:opts.readonly});
},clear:function(jq){
return jq.each(function(){
$(this).textbox("clear");
_542(this);
});
},reset:function(jq){
return jq.each(function(){
$(this).filebox("clear");
});
}};
$.fn.filebox.parseOptions=function(_54a){
var t=$(_54a);
return $.extend({},$.fn.textbox.parseOptions(_54a),$.parser.parseOptions(_54a,["accept","separator"]),{multiple:(t.attr("multiple")?true:undefined)});
};
$.fn.filebox.defaults=$.extend({},$.fn.textbox.defaults,{buttonIcon:null,buttonText:"Choose File",buttonAlign:"right",inputEvents:{},accept:"",separator:",",multiple:false});
})(jQuery);
(function($){
function _54b(_54c){
var _54d=$.data(_54c,"searchbox");
var opts=_54d.options;
var _54e=$.extend(true,[],opts.icons);
_54e.push({iconCls:"searchbox-button",handler:function(e){
var t=$(e.data.target);
var opts=t.searchbox("options");
opts.searcher.call(e.data.target,t.searchbox("getValue"),t.searchbox("getName"));
}});
_54f();
var _550=_551();
$(_54c).addClass("searchbox-f").textbox($.extend({},opts,{icons:_54e,buttonText:(_550?_550.text:"")}));
$(_54c).attr("searchboxName",$(_54c).attr("textboxName"));
_54d.searchbox=$(_54c).next();
_54d.searchbox.addClass("searchbox");
_552(_550);
function _54f(){
if(opts.menu){
_54d.menu=$(opts.menu).menu();
var _553=_54d.menu.menu("options");
var _554=_553.onClick;
_553.onClick=function(item){
_552(item);
_554.call(this,item);
};
}else{
if(_54d.menu){
_54d.menu.menu("destroy");
}
_54d.menu=null;
}
};
function _551(){
if(_54d.menu){
var item=_54d.menu.children("div.menu-item:first");
_54d.menu.children("div.menu-item").each(function(){
var _555=$.extend({},$.parser.parseOptions(this),{selected:($(this).attr("selected")?true:undefined)});
if(_555.selected){
item=$(this);
return false;
}
});
return _54d.menu.menu("getItem",item[0]);
}else{
return null;
}
};
function _552(item){
if(!item){
return;
}
$(_54c).textbox("button").menubutton({text:item.text,iconCls:(item.iconCls||null),menu:_54d.menu,menuAlign:opts.buttonAlign,plain:false});
_54d.searchbox.find("input.textbox-value").attr("name",item.name||item.text);
$(_54c).searchbox("resize");
};
};
$.fn.searchbox=function(_556,_557){
if(typeof _556=="string"){
var _558=$.fn.searchbox.methods[_556];
if(_558){
return _558(this,_557);
}else{
return this.textbox(_556,_557);
}
}
_556=_556||{};
return this.each(function(){
var _559=$.data(this,"searchbox");
if(_559){
$.extend(_559.options,_556);
}else{
$.data(this,"searchbox",{options:$.extend({},$.fn.searchbox.defaults,$.fn.searchbox.parseOptions(this),_556)});
}
_54b(this);
});
};
$.fn.searchbox.methods={options:function(jq){
var opts=jq.textbox("options");
return $.extend($.data(jq[0],"searchbox").options,{width:opts.width,value:opts.value,originalValue:opts.originalValue,disabled:opts.disabled,readonly:opts.readonly});
},menu:function(jq){
return $.data(jq[0],"searchbox").menu;
},getName:function(jq){
return $.data(jq[0],"searchbox").searchbox.find("input.textbox-value").attr("name");
},selectName:function(jq,name){
return jq.each(function(){
var menu=$.data(this,"searchbox").menu;
if(menu){
menu.children("div.menu-item").each(function(){
var item=menu.menu("getItem",this);
if(item.name==name){
$(this).triggerHandler("click");
return false;
}
});
}
});
},destroy:function(jq){
return jq.each(function(){
var menu=$(this).searchbox("menu");
if(menu){
menu.menu("destroy");
}
$(this).textbox("destroy");
});
}};
$.fn.searchbox.parseOptions=function(_55a){
var t=$(_55a);
return $.extend({},$.fn.textbox.parseOptions(_55a),$.parser.parseOptions(_55a,["menu"]),{searcher:(t.attr("searcher")?eval(t.attr("searcher")):undefined)});
};
$.fn.searchbox.defaults=$.extend({},$.fn.textbox.defaults,{inputEvents:$.extend({},$.fn.textbox.defaults.inputEvents,{keydown:function(e){
if(e.keyCode==13){
e.preventDefault();
var t=$(e.data.target);
var opts=t.searchbox("options");
t.searchbox("setValue",$(this).val());
opts.searcher.call(e.data.target,t.searchbox("getValue"),t.searchbox("getName"));
return false;
}
}}),buttonAlign:"left",menu:null,searcher:function(_55b,name){
}});
})(jQuery);
(function($){
function _55c(_55d,_55e){
var opts=$.data(_55d,"form").options;
$.extend(opts,_55e||{});
var _55f=$.extend({},opts.queryParams);
if(opts.onSubmit.call(_55d,_55f)==false){
return;
}
var _560=$(_55d).find(".textbox-text:focus");
_560.triggerHandler("blur");
_560.focus();
var _561=null;
if(opts.dirty){
var ff=[];
$.map(opts.dirtyFields,function(f){
if($(f).hasClass("textbox-f")){
$(f).next().find(".textbox-value").each(function(){
ff.push(this);
});
}else{
ff.push(f);
}
});
_561=$(_55d).find("input[name]:enabled,textarea[name]:enabled,select[name]:enabled").filter(function(){
return $.inArray(this,ff)==-1;
});
_561.attr("disabled","disabled");
}
if(opts.ajax){
if(opts.iframe){
_562(_55d,_55f);
}else{
if(window.FormData!==undefined){
_563(_55d,_55f);
}else{
_562(_55d,_55f);
}
}
}else{
$(_55d).submit();
}
if(opts.dirty){
_561.removeAttr("disabled");
}
};
function _562(_564,_565){
var opts=$.data(_564,"form").options;
var _566="extjsui_frame_"+(new Date().getTime());
var _567=$("<iframe id="+_566+" name="+_566+"></iframe>").appendTo("body");
_567.attr("src",window.ActiveXObject?"javascript:false":"about:blank");
_567.css({position:"absolute",top:-1000,left:-1000});
_567.bind("load",cb);
_568(_565);
function _568(_569){
var form=$(_564);
if(opts.url){
form.attr("action",opts.url);
}
var t=form.attr("target"),a=form.attr("action");
form.attr("target",_566);
var _56a=$();
try{
for(var n in _569){
var _56b=$("<input type=\"hidden\" name=\""+n+"\">").val(_569[n]).appendTo(form);
_56a=_56a.add(_56b);
}
_56c();
form[0].submit();
}
finally{
form.attr("action",a);
t?form.attr("target",t):form.removeAttr("target");
_56a.remove();
}
};
function _56c(){
var f=$("#"+_566);
if(!f.length){
return;
}
try{
var s=f.contents()[0].readyState;
if(s&&s.toLowerCase()=="uninitialized"){
setTimeout(_56c,100);
}
}
catch(e){
cb();
}
};
var _56d=10;
function cb(){
var f=$("#"+_566);
if(!f.length){
return;
}
f.unbind();
var data="";
try{
var body=f.contents().find("body");
data=body.html();
if(data==""){
if(--_56d){
setTimeout(cb,100);
return;
}
}
var ta=body.find(">textarea");
if(ta.length){
data=ta.val();
}else{
var pre=body.find(">pre");
if(pre.length){
data=pre.html();
}
}
}
catch(e){
}
opts.success.call(_564,data);
setTimeout(function(){
f.unbind();
f.remove();
},100);
};
};
function _563(_56e,_56f){
var opts=$.data(_56e,"form").options;
var _570=new FormData($(_56e)[0]);
for(var name in _56f){
_570.append(name,_56f[name]);
}
$.ajax({url:opts.url,type:"post",xhr:function(){
var xhr=$.ajaxSettings.xhr();
if(xhr.upload){
xhr.upload.addEventListener("progress",function(e){
if(e.lengthComputable){
var _571=e.total;
var _572=e.loaded||e.position;
var _573=Math.ceil(_572*100/_571);
opts.onProgress.call(_56e,_573);
}
},false);
}
return xhr;
},data:_570,dataType:"html",cache:false,contentType:false,processData:false,complete:function(res){
opts.success.call(_56e,res.responseText);
}});
};
function load(_574,data){
var opts=$.data(_574,"form").options;
if(typeof data=="string"){
var _575={};
if(opts.onBeforeLoad.call(_574,_575)==false){
return;
}
$.ajax({url:data,data:_575,dataType:"json",success:function(data){
_576(data);
},error:function(){
opts.onLoadError.apply(_574,arguments);
}});
}else{
_576(data);
}
function _576(data){
var form=$(_574);
for(var name in data){
var val=data[name];
if(!_577(name,val)){
if(!_578(name,val)){
form.find("input[name=\""+name+"\"]").val(val);
form.find("textarea[name=\""+name+"\"]").val(val);
form.find("select[name=\""+name+"\"]").val(val);
}
}
}
opts.onLoadSuccess.call(_574,data);
form.form("validate");
};
function _577(name,val){
var cc=$(_574).find("[switchbuttonName=\""+name+"\"]");
if(cc.length){
cc.switchbutton("uncheck");
cc.each(function(){
if(_579($(this).switchbutton("options").value,val)){
$(this).switchbutton("check");
}
});
return true;
}
cc=$(_574).find("input[name=\""+name+"\"][type=radio], input[name=\""+name+"\"][type=checkbox]");
if(cc.length){
cc._propAttr("checked",false);
cc.each(function(){
if(_579($(this).val(),val)){
$(this)._propAttr("checked",true);
}
});
return true;
}
return false;
};
function _579(v,val){
if(v==String(val)||$.inArray(v,$.isArray(val)?val:[val])>=0){
return true;
}else{
return false;
}
};
function _578(name,val){
var _57a=$(_574).find("[textboxName=\""+name+"\"],[sliderName=\""+name+"\"]");
if(_57a.length){
for(var i=0;i<opts.fieldTypes.length;i++){
var type=opts.fieldTypes[i];
var _57b=_57a.data(type);
if(_57b){
if(_57b.options.multiple||_57b.options.range){
_57a[type]("setValues",val);
}else{
_57a[type]("setValue",val);
}
return true;
}
}
}
return false;
};
};
function _57c(_57d){
$("input,select,textarea",_57d).each(function(){
var t=this.type,tag=this.tagName.toLowerCase();
if(t=="text"||t=="hidden"||t=="password"||tag=="textarea"){
this.value="";
}else{
if(t=="file"){
var file=$(this);
if(!file.hasClass("textbox-value")){
var _57e=file.clone().val("");
_57e.insertAfter(file);
if(file.data("validatebox")){
file.validatebox("destroy");
_57e.validatebox();
}else{
file.remove();
}
}
}else{
if(t=="checkbox"||t=="radio"){
this.checked=false;
}else{
if(tag=="select"){
this.selectedIndex=-1;
}
}
}
}
});
var form=$(_57d);
var opts=$.data(_57d,"form").options;
for(var i=opts.fieldTypes.length-1;i>=0;i--){
var type=opts.fieldTypes[i];
var _57f=form.find("."+type+"-f");
if(_57f.length&&_57f[type]){
_57f[type]("clear");
}
}
form.form("validate");
};
function _580(_581){
_581.reset();
var form=$(_581);
var opts=$.data(_581,"form").options;
for(var i=opts.fieldTypes.length-1;i>=0;i--){
var type=opts.fieldTypes[i];
var _582=form.find("."+type+"-f");
if(_582.length&&_582[type]){
_582[type]("reset");
}
}
form.form("validate");
};
function _583(_584){
var _585=$.data(_584,"form").options;
$(_584).unbind(".form");
if(_585.ajax){
$(_584).bind("submit.form",function(){
setTimeout(function(){
_55c(_584,_585);
},0);
return false;
});
}
$(_584).bind("_change.form",function(e,t){
if($.inArray(t,_585.dirtyFields)==-1){
_585.dirtyFields.push(t);
}
_585.onChange.call(this,t);
}).bind("change.form",function(e){
var t=e.target;
if(!$(t).hasClass("textbox-text")){
if($.inArray(t,_585.dirtyFields)==-1){
_585.dirtyFields.push(t);
}
_585.onChange.call(this,t);
}
});
_586(_584,_585.novalidate);
};
function _587(_588,_589){
_589=_589||{};
var _58a=$.data(_588,"form");
if(_58a){
$.extend(_58a.options,_589);
}else{
$.data(_588,"form",{options:$.extend({},$.fn.form.defaults,$.fn.form.parseOptions(_588),_589)});
}
};
function _58b(_58c){
if($.fn.validatebox){
var t=$(_58c);
t.find(".validatebox-text:not(:disabled)").validatebox("validate");
var _58d=t.find(".validatebox-invalid");
_58d.filter(":not(:disabled):first").focus();
return _58d.length==0;
}
return true;
};
function _586(_58e,_58f){
var opts=$.data(_58e,"form").options;
opts.novalidate=_58f;
$(_58e).find(".validatebox-text:not(:disabled)").validatebox(_58f?"disableValidation":"enableValidation");
};
$.fn.form=function(_590,_591){
if(typeof _590=="string"){
this.each(function(){
_587(this);
});
return $.fn.form.methods[_590](this,_591);
}
return this.each(function(){
_587(this,_590);
_583(this);
});
};
$.fn.form.methods={options:function(jq){
return $.data(jq[0],"form").options;
},submit:function(jq,_592){
return jq.each(function(){
_55c(this,_592);
});
},load:function(jq,data){
return jq.each(function(){
load(this,data);
});
},clear:function(jq){
return jq.each(function(){
_57c(this);
});
},reset:function(jq){
return jq.each(function(){
_580(this);
});
},validate:function(jq){
return _58b(jq[0]);
},disableValidation:function(jq){
return jq.each(function(){
_586(this,true);
});
},enableValidation:function(jq){
return jq.each(function(){
_586(this,false);
});
},resetValidation:function(jq){
return jq.each(function(){
$(this).find(".validatebox-text:not(:disabled)").validatebox("resetValidation");
});
},resetDirty:function(jq){
return jq.each(function(){
$(this).form("options").dirtyFields=[];
});
}};
$.fn.form.parseOptions=function(_593){
var t=$(_593);
return $.extend({},$.parser.parseOptions(_593,[{ajax:"boolean",dirty:"boolean"}]),{url:(t.attr("action")?t.attr("action"):undefined)});
};
$.fn.form.defaults={fieldTypes:["combobox","combotree","combogrid","datetimebox","datebox","combo","datetimespinner","timespinner","numberspinner","spinner","slider","searchbox","numberbox","passwordbox","textbox","switchbutton"],novalidate:false,ajax:true,iframe:true,dirty:false,dirtyFields:[],url:null,queryParams:{},onSubmit:function(_594){
return $(this).form("validate");
},onProgress:function(_595){
},success:function(data){
},onBeforeLoad:function(_596){
},onLoadSuccess:function(data){
},onLoadError:function(){
},onChange:function(_597){
}};
})(jQuery);
(function($){
function _598(_599){
var _59a=$.data(_599,"numberbox");
var opts=_59a.options;
$(_599).addClass("numberbox-f").textbox(opts);
$(_599).textbox("textbox").css({imeMode:"disabled"});
$(_599).attr("numberboxName",$(_599).attr("textboxName"));
_59a.numberbox=$(_599).next();
_59a.numberbox.addClass("numberbox");
var _59b=opts.parser.call(_599,opts.value);
var _59c=opts.formatter.call(_599,_59b);
$(_599).numberbox("initValue",_59b).numberbox("setText",_59c);
};
function _59d(_59e,_59f){
var _5a0=$.data(_59e,"numberbox");
var opts=_5a0.options;
var _59f=opts.parser.call(_59e,_59f);
var text=opts.formatter.call(_59e,_59f);
opts.value=_59f;
$(_59e).textbox("setText",text).textbox("setValue",_59f);
text=opts.formatter.call(_59e,$(_59e).textbox("getValue"));
$(_59e).textbox("setText",text);
};
$.fn.numberbox=function(_5a1,_5a2){
if(typeof _5a1=="string"){
var _5a3=$.fn.numberbox.methods[_5a1];
if(_5a3){
return _5a3(this,_5a2);
}else{
return this.textbox(_5a1,_5a2);
}
}
_5a1=_5a1||{};
return this.each(function(){
var _5a4=$.data(this,"numberbox");
if(_5a4){
$.extend(_5a4.options,_5a1);
}else{
_5a4=$.data(this,"numberbox",{options:$.extend({},$.fn.numberbox.defaults,$.fn.numberbox.parseOptions(this),_5a1)});
}
_598(this);
});
};
$.fn.numberbox.methods={options:function(jq){
var opts=jq.data("textbox")?jq.textbox("options"):{};
return $.extend($.data(jq[0],"numberbox").options,{width:opts.width,originalValue:opts.originalValue,disabled:opts.disabled,readonly:opts.readonly});
},fix:function(jq){
return jq.each(function(){
$(this).numberbox("setValue",$(this).numberbox("getText"));
});
},setValue:function(jq,_5a5){
return jq.each(function(){
_59d(this,_5a5);
});
},clear:function(jq){
return jq.each(function(){
$(this).textbox("clear");
$(this).numberbox("options").value="";
});
},reset:function(jq){
return jq.each(function(){
$(this).textbox("reset");
$(this).numberbox("setValue",$(this).numberbox("getValue"));
});
}};
$.fn.numberbox.parseOptions=function(_5a6){
var t=$(_5a6);
return $.extend({},$.fn.textbox.parseOptions(_5a6),$.parser.parseOptions(_5a6,["decimalSeparator","groupSeparator","suffix",{min:"number",max:"number",precision:"number"}]),{prefix:(t.attr("prefix")?t.attr("prefix"):undefined)});
};
$.fn.numberbox.defaults=$.extend({},$.fn.textbox.defaults,{inputEvents:{keypress:function(e){
var _5a7=e.data.target;
var opts=$(_5a7).numberbox("options");
return opts.filter.call(_5a7,e);
},blur:function(e){
var _5a8=e.data.target;
$(_5a8).numberbox("setValue",$(_5a8).numberbox("getText"));
},keydown:function(e){
if(e.keyCode==13){
var _5a9=e.data.target;
$(_5a9).numberbox("setValue",$(_5a9).numberbox("getText"));
}
}},min:null,max:null,precision:0,decimalSeparator:".",groupSeparator:"",prefix:"",suffix:"",filter:function(e){
var opts=$(this).numberbox("options");
var s=$(this).numberbox("getText");
if(e.which==13){
return true;
}
if(e.which==45){
return (s.indexOf("-")==-1?true:false);
}
var c=String.fromCharCode(e.which);
if(c==opts.decimalSeparator){
return (s.indexOf(c)==-1?true:false);
}else{
if(c==opts.groupSeparator){
return true;
}else{
if((e.which>=48&&e.which<=57&&e.ctrlKey==false&&e.shiftKey==false)||e.which==0||e.which==8){
return true;
}else{
if(e.ctrlKey==true&&(e.which==99||e.which==118)){
return true;
}else{
return false;
}
}
}
}
},formatter:function(_5aa){
if(!_5aa){
return _5aa;
}
_5aa=_5aa+"";
var opts=$(this).numberbox("options");
var s1=_5aa,s2="";
var dpos=_5aa.indexOf(".");
if(dpos>=0){
s1=_5aa.substring(0,dpos);
s2=_5aa.substring(dpos+1,_5aa.length);
}
if(opts.groupSeparator){
var p=/(\d+)(\d{3})/;
while(p.test(s1)){
s1=s1.replace(p,"$1"+opts.groupSeparator+"$2");
}
}
if(s2){
return opts.prefix+s1+opts.decimalSeparator+s2+opts.suffix;
}else{
return opts.prefix+s1+opts.suffix;
}
},parser:function(s){
s=s+"";
var opts=$(this).numberbox("options");
if(parseFloat(s)!=s){
if(opts.prefix){
s=$.trim(s.replace(new RegExp("\\"+$.trim(opts.prefix),"g"),""));
}
if(opts.suffix){
s=$.trim(s.replace(new RegExp("\\"+$.trim(opts.suffix),"g"),""));
}
if(opts.groupSeparator){
s=$.trim(s.replace(new RegExp("\\"+opts.groupSeparator,"g"),""));
}
if(opts.decimalSeparator){
s=$.trim(s.replace(new RegExp("\\"+opts.decimalSeparator,"g"),"."));
}
s=s.replace(/\s/g,"");
}
var val=parseFloat(s).toFixed(opts.precision);
if(isNaN(val)){
val="";
}else{
if(typeof (opts.min)=="number"&&val<opts.min){
val=opts.min.toFixed(opts.precision);
}else{
if(typeof (opts.max)=="number"&&val>opts.max){
val=opts.max.toFixed(opts.precision);
}
}
}
return val;
}});
})(jQuery);
(function($){
function _5ab(_5ac,_5ad){
var opts=$.data(_5ac,"calendar").options;
var t=$(_5ac);
if(_5ad){
$.extend(opts,{width:_5ad.width,height:_5ad.height});
}
t._size(opts,t.parent());
t.find(".calendar-body")._outerHeight(t.height()-t.find(".calendar-header")._outerHeight());
if(t.find(".calendar-menu").is(":visible")){
_5ae(_5ac);
}
};
function init(_5af){
$(_5af).addClass("calendar").html("<div class=\"calendar-header\">"+"<div class=\"calendar-nav calendar-prevmonth\"></div>"+"<div class=\"calendar-nav calendar-nextmonth\"></div>"+"<div class=\"calendar-nav calendar-prevyear\"></div>"+"<div class=\"calendar-nav calendar-nextyear\"></div>"+"<div class=\"calendar-title\">"+"<span class=\"calendar-text\"></span>"+"</div>"+"</div>"+"<div class=\"calendar-body\">"+"<div class=\"calendar-menu\">"+"<div class=\"calendar-menu-year-inner\">"+"<span class=\"calendar-nav calendar-menu-prev\"></span>"+"<span><input class=\"calendar-menu-year\" type=\"text\"></input></span>"+"<span class=\"calendar-nav calendar-menu-next\"></span>"+"</div>"+"<div class=\"calendar-menu-month-inner\">"+"</div>"+"</div>"+"</div>");
$(_5af).bind("_resize",function(e,_5b0){
if($(this).hasClass("extjsui-fluid")||_5b0){
_5ab(_5af);
}
return false;
});
};
function _5b1(_5b2){
var opts=$.data(_5b2,"calendar").options;
var menu=$(_5b2).find(".calendar-menu");
menu.find(".calendar-menu-year").unbind(".calendar").bind("keypress.calendar",function(e){
if(e.keyCode==13){
_5b3(true);
}
});
$(_5b2).unbind(".calendar").bind("mouseover.calendar",function(e){
var t=_5b4(e.target);
if(t.hasClass("calendar-nav")||t.hasClass("calendar-text")||(t.hasClass("calendar-day")&&!t.hasClass("calendar-disabled"))){
t.addClass("calendar-nav-hover");
}
}).bind("mouseout.calendar",function(e){
var t=_5b4(e.target);
if(t.hasClass("calendar-nav")||t.hasClass("calendar-text")||(t.hasClass("calendar-day")&&!t.hasClass("calendar-disabled"))){
t.removeClass("calendar-nav-hover");
}
}).bind("click.calendar",function(e){
var t=_5b4(e.target);
if(t.hasClass("calendar-menu-next")||t.hasClass("calendar-nextyear")){
_5b5(1);
}else{
if(t.hasClass("calendar-menu-prev")||t.hasClass("calendar-prevyear")){
_5b5(-1);
}else{
if(t.hasClass("calendar-menu-month")){
menu.find(".calendar-selected").removeClass("calendar-selected");
t.addClass("calendar-selected");
_5b3(true);
}else{
if(t.hasClass("calendar-prevmonth")){
_5b6(-1);
}else{
if(t.hasClass("calendar-nextmonth")){
_5b6(1);
}else{
if(t.hasClass("calendar-text")){
if(menu.is(":visible")){
menu.hide();
}else{
_5ae(_5b2);
}
}else{
if(t.hasClass("calendar-day")){
if(t.hasClass("calendar-disabled")){
return;
}
var _5b7=opts.current;
t.closest("div.calendar-body").find(".calendar-selected").removeClass("calendar-selected");
t.addClass("calendar-selected");
var _5b8=t.attr("abbr").split(",");
var y=parseInt(_5b8[0]);
var m=parseInt(_5b8[1]);
var d=parseInt(_5b8[2]);
opts.current=new Date(y,m-1,d);
opts.onSelect.call(_5b2,opts.current);
if(!_5b7||_5b7.getTime()!=opts.current.getTime()){
opts.onChange.call(_5b2,opts.current,_5b7);
}
if(opts.year!=y||opts.month!=m){
opts.year=y;
opts.month=m;
show(_5b2);
}
}
}
}
}
}
}
}
});
function _5b4(t){
var day=$(t).closest(".calendar-day");
if(day.length){
return day;
}else{
return $(t);
}
};
function _5b3(_5b9){
var menu=$(_5b2).find(".calendar-menu");
var year=menu.find(".calendar-menu-year").val();
var _5ba=menu.find(".calendar-selected").attr("abbr");
if(!isNaN(year)){
opts.year=parseInt(year);
opts.month=parseInt(_5ba);
show(_5b2);
}
if(_5b9){
menu.hide();
}
};
function _5b5(_5bb){
opts.year+=_5bb;
show(_5b2);
menu.find(".calendar-menu-year").val(opts.year);
};
function _5b6(_5bc){
opts.month+=_5bc;
if(opts.month>12){
opts.year++;
opts.month=1;
}else{
if(opts.month<1){
opts.year--;
opts.month=12;
}
}
show(_5b2);
menu.find("td.calendar-selected").removeClass("calendar-selected");
menu.find("td:eq("+(opts.month-1)+")").addClass("calendar-selected");
};
};
function _5ae(_5bd){
var opts=$.data(_5bd,"calendar").options;
$(_5bd).find(".calendar-menu").show();
if($(_5bd).find(".calendar-menu-month-inner").is(":empty")){
$(_5bd).find(".calendar-menu-month-inner").empty();
var t=$("<table class=\"calendar-mtable\"></table>").appendTo($(_5bd).find(".calendar-menu-month-inner"));
var idx=0;
for(var i=0;i<3;i++){
var tr=$("<tr></tr>").appendTo(t);
for(var j=0;j<4;j++){
$("<td class=\"calendar-nav calendar-menu-month\"></td>").html(opts.months[idx++]).attr("abbr",idx).appendTo(tr);
}
}
}
var body=$(_5bd).find(".calendar-body");
var sele=$(_5bd).find(".calendar-menu");
var _5be=sele.find(".calendar-menu-year-inner");
var _5bf=sele.find(".calendar-menu-month-inner");
_5be.find("input").val(opts.year).focus();
_5bf.find("td.calendar-selected").removeClass("calendar-selected");
_5bf.find("td:eq("+(opts.month-1)+")").addClass("calendar-selected");
sele._outerWidth(body._outerWidth());
sele._outerHeight(body._outerHeight());
_5bf._outerHeight(sele.height()-_5be._outerHeight());
};
function _5c0(_5c1,year,_5c2){
var opts=$.data(_5c1,"calendar").options;
var _5c3=[];
var _5c4=new Date(year,_5c2,0).getDate();
for(var i=1;i<=_5c4;i++){
_5c3.push([year,_5c2,i]);
}
var _5c5=[],week=[];
var _5c6=-1;
while(_5c3.length>0){
var date=_5c3.shift();
week.push(date);
var day=new Date(date[0],date[1]-1,date[2]).getDay();
if(_5c6==day){
day=0;
}else{
if(day==(opts.firstDay==0?7:opts.firstDay)-1){
_5c5.push(week);
week=[];
}
}
_5c6=day;
}
if(week.length){
_5c5.push(week);
}
var _5c7=_5c5[0];
if(_5c7.length<7){
while(_5c7.length<7){
var _5c8=_5c7[0];
var date=new Date(_5c8[0],_5c8[1]-1,_5c8[2]-1);
_5c7.unshift([date.getFullYear(),date.getMonth()+1,date.getDate()]);
}
}else{
var _5c8=_5c7[0];
var week=[];
for(var i=1;i<=7;i++){
var date=new Date(_5c8[0],_5c8[1]-1,_5c8[2]-i);
week.unshift([date.getFullYear(),date.getMonth()+1,date.getDate()]);
}
_5c5.unshift(week);
}
var _5c9=_5c5[_5c5.length-1];
while(_5c9.length<7){
var _5ca=_5c9[_5c9.length-1];
var date=new Date(_5ca[0],_5ca[1]-1,_5ca[2]+1);
_5c9.push([date.getFullYear(),date.getMonth()+1,date.getDate()]);
}
if(_5c5.length<6){
var _5ca=_5c9[_5c9.length-1];
var week=[];
for(var i=1;i<=7;i++){
var date=new Date(_5ca[0],_5ca[1]-1,_5ca[2]+i);
week.push([date.getFullYear(),date.getMonth()+1,date.getDate()]);
}
_5c5.push(week);
}
return _5c5;
};
function show(_5cb){
var opts=$.data(_5cb,"calendar").options;
if(opts.current&&!opts.validator.call(_5cb,opts.current)){
opts.current=null;
}
var now=new Date();
var _5cc=now.getFullYear()+","+(now.getMonth()+1)+","+now.getDate();
var _5cd=opts.current?(opts.current.getFullYear()+","+(opts.current.getMonth()+1)+","+opts.current.getDate()):"";
var _5ce=6-opts.firstDay;
var _5cf=_5ce+1;
if(_5ce>=7){
_5ce-=7;
}
if(_5cf>=7){
_5cf-=7;
}
$(_5cb).find(".calendar-title span").html(opts.months[opts.month-1]+" "+opts.year);
var body=$(_5cb).find("div.calendar-body");
body.children("table").remove();
var data=["<table class=\"calendar-dtable\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\">"];
data.push("<thead><tr>");
for(var i=opts.firstDay;i<opts.weeks.length;i++){
data.push("<th>"+opts.weeks[i]+"</th>");
}
for(var i=0;i<opts.firstDay;i++){
data.push("<th>"+opts.weeks[i]+"</th>");
}
data.push("</tr></thead>");
data.push("<tbody>");
var _5d0=_5c0(_5cb,opts.year,opts.month);
for(var i=0;i<_5d0.length;i++){
var week=_5d0[i];
var cls="";
if(i==0){
cls="calendar-first";
}else{
if(i==_5d0.length-1){
cls="calendar-last";
}
}
data.push("<tr class=\""+cls+"\">");
for(var j=0;j<week.length;j++){
var day=week[j];
var s=day[0]+","+day[1]+","+day[2];
var _5d1=new Date(day[0],parseInt(day[1])-1,day[2]);
var d=opts.formatter.call(_5cb,_5d1);
var css=opts.styler.call(_5cb,_5d1);
var _5d2="";
var _5d3="";
if(typeof css=="string"){
_5d3=css;
}else{
if(css){
_5d2=css["class"]||"";
_5d3=css["style"]||"";
}
}
var cls="calendar-day";
if(!(opts.year==day[0]&&opts.month==day[1])){
cls+=" calendar-other-month";
}
if(s==_5cc){
cls+=" calendar-today";
}
if(s==_5cd){
cls+=" calendar-selected";
}
if(j==_5ce){
cls+=" calendar-saturday";
}else{
if(j==_5cf){
cls+=" calendar-sunday";
}
}
if(j==0){
cls+=" calendar-first";
}else{
if(j==week.length-1){
cls+=" calendar-last";
}
}
cls+=" "+_5d2;
if(!opts.validator.call(_5cb,_5d1)){
cls+=" calendar-disabled";
}
data.push("<td class=\""+cls+"\" abbr=\""+s+"\" style=\""+_5d3+"\">"+d+"</td>");
}
data.push("</tr>");
}
data.push("</tbody>");
data.push("</table>");
body.append(data.join(""));
body.children("table.calendar-dtable").prependTo(body);
opts.onNavigate.call(_5cb,opts.year,opts.month);
};
$.fn.calendar=function(_5d4,_5d5){
if(typeof _5d4=="string"){
return $.fn.calendar.methods[_5d4](this,_5d5);
}
_5d4=_5d4||{};
return this.each(function(){
var _5d6=$.data(this,"calendar");
if(_5d6){
$.extend(_5d6.options,_5d4);
}else{
_5d6=$.data(this,"calendar",{options:$.extend({},$.fn.calendar.defaults,$.fn.calendar.parseOptions(this),_5d4)});
init(this);
}
if(_5d6.options.border==false){
$(this).addClass("calendar-noborder");
}
_5ab(this);
_5b1(this);
show(this);
$(this).find("div.calendar-menu").hide();
});
};
$.fn.calendar.methods={options:function(jq){
return $.data(jq[0],"calendar").options;
},resize:function(jq,_5d7){
return jq.each(function(){
_5ab(this,_5d7);
});
},moveTo:function(jq,date){
return jq.each(function(){
if(!date){
var now=new Date();
$(this).calendar({year:now.getFullYear(),month:now.getMonth()+1,current:date});
return;
}
var opts=$(this).calendar("options");
if(opts.validator.call(this,date)){
var _5d8=opts.current;
$(this).calendar({year:date.getFullYear(),month:date.getMonth()+1,current:date});
if(!_5d8||_5d8.getTime()!=date.getTime()){
opts.onChange.call(this,opts.current,_5d8);
}
}
});
}};
$.fn.calendar.parseOptions=function(_5d9){
var t=$(_5d9);
return $.extend({},$.parser.parseOptions(_5d9,[{firstDay:"number",fit:"boolean",border:"boolean"}]));
};
$.fn.calendar.defaults={width:180,height:180,fit:false,border:true,firstDay:0,weeks:["S","M","T","W","T","F","S"],months:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],year:new Date().getFullYear(),month:new Date().getMonth()+1,current:(function(){
var d=new Date();
return new Date(d.getFullYear(),d.getMonth(),d.getDate());
})(),formatter:function(date){
return date.getDate();
},styler:function(date){
return "";
},validator:function(date){
return true;
},onSelect:function(date){
},onChange:function(_5da,_5db){
},onNavigate:function(year,_5dc){
}};
})(jQuery);
(function($){
function _5dd(_5de){
var _5df=$.data(_5de,"spinner");
var opts=_5df.options;
var _5e0=$.extend(true,[],opts.icons);
_5e0.push({iconCls:"spinner-arrow",handler:function(e){
_5e1(e);
}});
$(_5de).addClass("spinner-f").textbox($.extend({},opts,{icons:_5e0}));
var _5e2=$(_5de).textbox("getIcon",_5e0.length-1);
_5e2.append("<a href=\"javascript:void(0)\" class=\"spinner-arrow-up\" tabindex=\"-1\"></a>");
_5e2.append("<a href=\"javascript:void(0)\" class=\"spinner-arrow-down\" tabindex=\"-1\"></a>");
$(_5de).attr("spinnerName",$(_5de).attr("textboxName"));
_5df.spinner=$(_5de).next();
_5df.spinner.addClass("spinner");
};
function _5e1(e){
var _5e3=e.data.target;
var opts=$(_5e3).spinner("options");
var up=$(e.target).closest("a.spinner-arrow-up");
if(up.length){
opts.spin.call(_5e3,false);
opts.onSpinUp.call(_5e3);
$(_5e3).spinner("validate");
}
var down=$(e.target).closest("a.spinner-arrow-down");
if(down.length){
opts.spin.call(_5e3,true);
opts.onSpinDown.call(_5e3);
$(_5e3).spinner("validate");
}
};
$.fn.spinner=function(_5e4,_5e5){
if(typeof _5e4=="string"){
var _5e6=$.fn.spinner.methods[_5e4];
if(_5e6){
return _5e6(this,_5e5);
}else{
return this.textbox(_5e4,_5e5);
}
}
_5e4=_5e4||{};
return this.each(function(){
var _5e7=$.data(this,"spinner");
if(_5e7){
$.extend(_5e7.options,_5e4);
}else{
_5e7=$.data(this,"spinner",{options:$.extend({},$.fn.spinner.defaults,$.fn.spinner.parseOptions(this),_5e4)});
}
_5dd(this);
});
};
$.fn.spinner.methods={options:function(jq){
var opts=jq.textbox("options");
return $.extend($.data(jq[0],"spinner").options,{width:opts.width,value:opts.value,originalValue:opts.originalValue,disabled:opts.disabled,readonly:opts.readonly});
}};
$.fn.spinner.parseOptions=function(_5e8){
return $.extend({},$.fn.textbox.parseOptions(_5e8),$.parser.parseOptions(_5e8,["min","max",{increment:"number"}]));
};
$.fn.spinner.defaults=$.extend({},$.fn.textbox.defaults,{min:null,max:null,increment:1,spin:function(down){
},onSpinUp:function(){
},onSpinDown:function(){
}});
})(jQuery);
(function($){
function _5e9(_5ea){
$(_5ea).addClass("numberspinner-f");
var opts=$.data(_5ea,"numberspinner").options;
$(_5ea).numberbox(opts).spinner(opts);
$(_5ea).numberbox("setValue",opts.value);
};
function _5eb(_5ec,down){
var opts=$.data(_5ec,"numberspinner").options;
var v=parseFloat($(_5ec).numberbox("getValue")||opts.value)||0;
if(down){
v-=opts.increment;
}else{
v+=opts.increment;
}
$(_5ec).numberbox("setValue",v);
};
$.fn.numberspinner=function(_5ed,_5ee){
if(typeof _5ed=="string"){
var _5ef=$.fn.numberspinner.methods[_5ed];
if(_5ef){
return _5ef(this,_5ee);
}else{
return this.numberbox(_5ed,_5ee);
}
}
_5ed=_5ed||{};
return this.each(function(){
var _5f0=$.data(this,"numberspinner");
if(_5f0){
$.extend(_5f0.options,_5ed);
}else{
$.data(this,"numberspinner",{options:$.extend({},$.fn.numberspinner.defaults,$.fn.numberspinner.parseOptions(this),_5ed)});
}
_5e9(this);
});
};
$.fn.numberspinner.methods={options:function(jq){
var opts=jq.numberbox("options");
return $.extend($.data(jq[0],"numberspinner").options,{width:opts.width,value:opts.value,originalValue:opts.originalValue,disabled:opts.disabled,readonly:opts.readonly});
}};
$.fn.numberspinner.parseOptions=function(_5f1){
return $.extend({},$.fn.spinner.parseOptions(_5f1),$.fn.numberbox.parseOptions(_5f1),{});
};
$.fn.numberspinner.defaults=$.extend({},$.fn.spinner.defaults,$.fn.numberbox.defaults,{spin:function(down){
_5eb(this,down);
}});
})(jQuery);
(function($){
function _5f2(_5f3){
var opts=$.data(_5f3,"timespinner").options;
$(_5f3).addClass("timespinner-f").spinner(opts);
var _5f4=opts.formatter.call(_5f3,opts.parser.call(_5f3,opts.value));
$(_5f3).timespinner("initValue",_5f4);
};
function _5f5(e){
var _5f6=e.data.target;
var opts=$.data(_5f6,"timespinner").options;
var _5f7=$(_5f6).timespinner("getSelectionStart");
for(var i=0;i<opts.selections.length;i++){
var _5f8=opts.selections[i];
if(_5f7>=_5f8[0]&&_5f7<=_5f8[1]){
_5f9(_5f6,i);
return;
}
}
};
function _5f9(_5fa,_5fb){
var opts=$.data(_5fa,"timespinner").options;
if(_5fb!=undefined){
opts.highlight=_5fb;
}
var _5fc=opts.selections[opts.highlight];
if(_5fc){
var tb=$(_5fa).timespinner("textbox");
$(_5fa).timespinner("setSelectionRange",{start:_5fc[0],end:_5fc[1]});
tb.focus();
}
};
function _5fd(_5fe,_5ff){
var opts=$.data(_5fe,"timespinner").options;
var _5ff=opts.parser.call(_5fe,_5ff);
var text=opts.formatter.call(_5fe,_5ff);
$(_5fe).spinner("setValue",text);
};
function _600(_601,down){
var opts=$.data(_601,"timespinner").options;
var s=$(_601).timespinner("getValue");
var _602=opts.selections[opts.highlight];
var s1=s.substring(0,_602[0]);
var s2=s.substring(_602[0],_602[1]);
var s3=s.substring(_602[1]);
var v=s1+((parseInt(s2,10)||0)+opts.increment*(down?-1:1))+s3;
$(_601).timespinner("setValue",v);
_5f9(_601);
};
$.fn.timespinner=function(_603,_604){
if(typeof _603=="string"){
var _605=$.fn.timespinner.methods[_603];
if(_605){
return _605(this,_604);
}else{
return this.spinner(_603,_604);
}
}
_603=_603||{};
return this.each(function(){
var _606=$.data(this,"timespinner");
if(_606){
$.extend(_606.options,_603);
}else{
$.data(this,"timespinner",{options:$.extend({},$.fn.timespinner.defaults,$.fn.timespinner.parseOptions(this),_603)});
}
_5f2(this);
});
};
$.fn.timespinner.methods={options:function(jq){
var opts=jq.data("spinner")?jq.spinner("options"):{};
return $.extend($.data(jq[0],"timespinner").options,{width:opts.width,value:opts.value,originalValue:opts.originalValue,disabled:opts.disabled,readonly:opts.readonly});
},setValue:function(jq,_607){
return jq.each(function(){
_5fd(this,_607);
});
},getHours:function(jq){
var opts=$.data(jq[0],"timespinner").options;
var vv=jq.timespinner("getValue").split(opts.separator);
return parseInt(vv[0],10);
},getMinutes:function(jq){
var opts=$.data(jq[0],"timespinner").options;
var vv=jq.timespinner("getValue").split(opts.separator);
return parseInt(vv[1],10);
},getSeconds:function(jq){
var opts=$.data(jq[0],"timespinner").options;
var vv=jq.timespinner("getValue").split(opts.separator);
return parseInt(vv[2],10)||0;
}};
$.fn.timespinner.parseOptions=function(_608){
return $.extend({},$.fn.spinner.parseOptions(_608),$.parser.parseOptions(_608,["separator",{showSeconds:"boolean",highlight:"number"}]));
};
$.fn.timespinner.defaults=$.extend({},$.fn.spinner.defaults,{inputEvents:$.extend({},$.fn.spinner.defaults.inputEvents,{click:function(e){
_5f5.call(this,e);
},blur:function(e){
var t=$(e.data.target);
t.timespinner("setValue",t.timespinner("getText"));
},keydown:function(e){
if(e.keyCode==13){
var t=$(e.data.target);
t.timespinner("setValue",t.timespinner("getText"));
}
}}),formatter:function(date){
if(!date){
return "";
}
var opts=$(this).timespinner("options");
var tt=[_609(date.getHours()),_609(date.getMinutes())];
if(opts.showSeconds){
tt.push(_609(date.getSeconds()));
}
return tt.join(opts.separator);
function _609(_60a){
return (_60a<10?"0":"")+_60a;
};
},parser:function(s){
var opts=$(this).timespinner("options");
var date=_60b(s);
if(date){
var min=_60b(opts.min);
var max=_60b(opts.max);
if(min&&min>date){
date=min;
}
if(max&&max<date){
date=max;
}
}
return date;
function _60b(s){
if(!s){
return null;
}
var tt=s.split(opts.separator);
return new Date(1900,0,0,parseInt(tt[0],10)||0,parseInt(tt[1],10)||0,parseInt(tt[2],10)||0);
};
},selections:[[0,2],[3,5],[6,8]],separator:":",showSeconds:false,highlight:0,spin:function(down){
_600(this,down);
}});
})(jQuery);
(function($){
function _60c(_60d){
var opts=$.data(_60d,"datetimespinner").options;
$(_60d).addClass("datetimespinner-f").timespinner(opts);
};
$.fn.datetimespinner=function(_60e,_60f){
if(typeof _60e=="string"){
var _610=$.fn.datetimespinner.methods[_60e];
if(_610){
return _610(this,_60f);
}else{
return this.timespinner(_60e,_60f);
}
}
_60e=_60e||{};
return this.each(function(){
var _611=$.data(this,"datetimespinner");
if(_611){
$.extend(_611.options,_60e);
}else{
$.data(this,"datetimespinner",{options:$.extend({},$.fn.datetimespinner.defaults,$.fn.datetimespinner.parseOptions(this),_60e)});
}
_60c(this);
});
};
$.fn.datetimespinner.methods={options:function(jq){
var opts=jq.timespinner("options");
return $.extend($.data(jq[0],"datetimespinner").options,{width:opts.width,value:opts.value,originalValue:opts.originalValue,disabled:opts.disabled,readonly:opts.readonly});
}};
$.fn.datetimespinner.parseOptions=function(_612){
return $.extend({},$.fn.timespinner.parseOptions(_612),$.parser.parseOptions(_612,[]));
};
$.fn.datetimespinner.defaults=$.extend({},$.fn.timespinner.defaults,{formatter:function(date){
if(!date){
return "";
}
return $.fn.datebox.defaults.formatter.call(this,date)+" "+$.fn.timespinner.defaults.formatter.call(this,date);
},parser:function(s){
s=$.trim(s);
if(!s){
return null;
}
var dt=s.split(" ");
var _613=$.fn.datebox.defaults.parser.call(this,dt[0]);
if(dt.length<2){
return _613;
}
var _614=$.fn.timespinner.defaults.parser.call(this,dt[1]);
return new Date(_613.getFullYear(),_613.getMonth(),_613.getDate(),_614.getHours(),_614.getMinutes(),_614.getSeconds());
},selections:[[0,2],[3,5],[6,10],[11,13],[14,16],[17,19]]});
})(jQuery);
(function($){
var _615=0;
function _616(a,o){
return $.extjsui.indexOfArray(a,o);
};
function _617(a,o,id){
$.extjsui.removeArrayItem(a,o,id);
};
function _618(a,o,r){
$.extjsui.addArrayItem(a,o,r);
};
function _619(_61a,aa){
return $.data(_61a,"treegrid")?aa.slice(1):aa;
};
function _61b(_61c){
var _61d=$.data(_61c,"datagrid");
var opts=_61d.options;
var _61e=_61d.panel;
var dc=_61d.dc;
var ss=null;
if(opts.sharedStyleSheet){
ss=typeof opts.sharedStyleSheet=="boolean"?"head":opts.sharedStyleSheet;
}else{
ss=_61e.closest("div.datagrid-view");
if(!ss.length){
ss=dc.view;
}
}
var cc=$(ss);
var _61f=$.data(cc[0],"ss");
if(!_61f){
_61f=$.data(cc[0],"ss",{cache:{},dirty:[]});
}
return {add:function(_620){
var ss=["<style type=\"text/css\" extjsui=\"true\">"];
for(var i=0;i<_620.length;i++){
_61f.cache[_620[i][0]]={width:_620[i][1]};
}
var _621=0;
for(var s in _61f.cache){
var item=_61f.cache[s];
item.index=_621++;
ss.push(s+"{width:"+item.width+"}");
}
ss.push("</style>");
$(ss.join("\n")).appendTo(cc);
cc.children("style[extjsui]:not(:last)").remove();
},getRule:function(_622){
var _623=cc.children("style[extjsui]:last")[0];
var _624=_623.styleSheet?_623.styleSheet:(_623.sheet||document.styleSheets[document.styleSheets.length-1]);
var _625=_624.cssRules||_624.rules;
return _625[_622];
},set:function(_626,_627){
var item=_61f.cache[_626];
if(item){
item.width=_627;
var rule=this.getRule(item.index);
if(rule){
rule.style["width"]=_627;
}
}
},remove:function(_628){
var tmp=[];
for(var s in _61f.cache){
if(s.indexOf(_628)==-1){
tmp.push([s,_61f.cache[s].width]);
}
}
_61f.cache={};
this.add(tmp);
},dirty:function(_629){
if(_629){
_61f.dirty.push(_629);
}
},clean:function(){
for(var i=0;i<_61f.dirty.length;i++){
this.remove(_61f.dirty[i]);
}
_61f.dirty=[];
}};
};
function _62a(_62b,_62c){
var _62d=$.data(_62b,"datagrid");
var opts=_62d.options;
var _62e=_62d.panel;
if(_62c){
$.extend(opts,_62c);
}
if(opts.fit==true){
var p=_62e.panel("panel").parent();
opts.width=p.width();
opts.height=p.height();
}
_62e.panel("resize",opts);
};
function _62f(_630){
var _631=$.data(_630,"datagrid");
var opts=_631.options;
var dc=_631.dc;
var wrap=_631.panel;
var _632=wrap.width();
var _633=wrap.height();
var view=dc.view;
var _634=dc.view1;
var _635=dc.view2;
var _636=_634.children("div.datagrid-header");
var _637=_635.children("div.datagrid-header");
var _638=_636.find("table");
var _639=_637.find("table");
view.width(_632);
var _63a=_636.children("div.datagrid-header-inner").show();
_634.width(_63a.find("table").width());
if(!opts.showHeader){
_63a.hide();
}
_635.width(_632-_634._outerWidth());
_634.children()._outerWidth(_634.width());
_635.children()._outerWidth(_635.width());
var all=_636.add(_637).add(_638).add(_639);
all.css("height","");
var hh=Math.max(_638.height(),_639.height());
all._outerHeight(hh);
dc.body1.add(dc.body2).children("table.datagrid-btable-frozen").css({position:"absolute",top:dc.header2._outerHeight()});
var _63b=dc.body2.children("table.datagrid-btable-frozen")._outerHeight();
var _63c=_63b+_637._outerHeight()+_635.children(".datagrid-footer")._outerHeight();
wrap.children(":not(.datagrid-view,.datagrid-mask,.datagrid-mask-msg)").each(function(){
_63c+=$(this)._outerHeight();
});
var _63d=wrap.outerHeight()-wrap.height();
var _63e=wrap._size("minHeight")||"";
var _63f=wrap._size("maxHeight")||"";
_634.add(_635).children("div.datagrid-body").css({marginTop:_63b,height:(isNaN(parseInt(opts.height))?"":(_633-_63c)),minHeight:(_63e?_63e-_63d-_63c:""),maxHeight:(_63f?_63f-_63d-_63c:"")});
view.height(_635.height());
};
function _640(_641,_642,_643){
var rows=$.data(_641,"datagrid").data.rows;
var opts=$.data(_641,"datagrid").options;
var dc=$.data(_641,"datagrid").dc;
if(!dc.body1.is(":empty")&&(!opts.nowrap||opts.autoRowHeight||_643)){
if(_642!=undefined){
var tr1=opts.finder.getTr(_641,_642,"body",1);
var tr2=opts.finder.getTr(_641,_642,"body",2);
_644(tr1,tr2);
}else{
var tr1=opts.finder.getTr(_641,0,"allbody",1);
var tr2=opts.finder.getTr(_641,0,"allbody",2);
_644(tr1,tr2);
if(opts.showFooter){
var tr1=opts.finder.getTr(_641,0,"allfooter",1);
var tr2=opts.finder.getTr(_641,0,"allfooter",2);
_644(tr1,tr2);
}
}
}
_62f(_641);
if(opts.height=="auto"){
var _645=dc.body1.parent();
var _646=dc.body2;
var _647=_648(_646);
var _649=_647.height;
if(_647.width>_646.width()){
_649+=18;
}
_649-=parseInt(_646.css("marginTop"))||0;
_645.height(_649);
_646.height(_649);
dc.view.height(dc.view2.height());
}
dc.body2.triggerHandler("scroll");
function _644(trs1,trs2){
for(var i=0;i<trs2.length;i++){
var tr1=$(trs1[i]);
var tr2=$(trs2[i]);
tr1.css("height","");
tr2.css("height","");
var _64a=Math.max(tr1.height(),tr2.height());
tr1.css("height",_64a);
tr2.css("height",_64a);
}
};
function _648(cc){
var _64b=0;
var _64c=0;
$(cc).children().each(function(){
var c=$(this);
if(c.is(":visible")){
_64c+=c._outerHeight();
if(_64b<c._outerWidth()){
_64b=c._outerWidth();
}
}
});
return {width:_64b,height:_64c};
};
};
function _64d(_64e,_64f){
var _650=$.data(_64e,"datagrid");
var opts=_650.options;
var dc=_650.dc;
if(!dc.body2.children("table.datagrid-btable-frozen").length){
dc.body1.add(dc.body2).prepend("<table class=\"datagrid-btable datagrid-btable-frozen\" cellspacing=\"0\" cellpadding=\"0\"></table>");
}
_651(true);
_651(false);
_62f(_64e);
function _651(_652){
var _653=_652?1:2;
var tr=opts.finder.getTr(_64e,_64f,"body",_653);
(_652?dc.body1:dc.body2).children("table.datagrid-btable-frozen").append(tr);
};
};
function _654(_655,_656){
function _657(){
var _658=[];
var _659=[];
$(_655).children("thead").each(function(){
var opt=$.parser.parseOptions(this,[{frozen:"boolean"}]);
$(this).find("tr").each(function(){
var cols=[];
$(this).find("th").each(function(){
var th=$(this);
var col=$.extend({},$.parser.parseOptions(this,["id","field","align","halign","order","width",{sortable:"boolean",checkbox:"boolean",resizable:"boolean",fixed:"boolean"},{rowspan:"number",colspan:"number"}]),{title:(th.html()||undefined),hidden:(th.attr("hidden")?true:undefined),formatter:(th.attr("formatter")?eval(th.attr("formatter")):undefined),styler:(th.attr("styler")?eval(th.attr("styler")):undefined),sorter:(th.attr("sorter")?eval(th.attr("sorter")):undefined)});
if(col.width&&String(col.width).indexOf("%")==-1){
col.width=parseInt(col.width);
}
if(th.attr("editor")){
var s=$.trim(th.attr("editor"));
if(s.substr(0,1)=="{"){
col.editor=eval("("+s+")");
}else{
col.editor=s;
}
}
cols.push(col);
});
opt.frozen?_658.push(cols):_659.push(cols);
});
});
return [_658,_659];
};
var _65a=$("<div class=\"datagrid-wrap\">"+"<div class=\"datagrid-view\">"+"<div class=\"datagrid-view1\">"+"<div class=\"datagrid-header\">"+"<div class=\"datagrid-header-inner\"></div>"+"</div>"+"<div class=\"datagrid-body\">"+"<div class=\"datagrid-body-inner\"></div>"+"</div>"+"<div class=\"datagrid-footer\">"+"<div class=\"datagrid-footer-inner\"></div>"+"</div>"+"</div>"+"<div class=\"datagrid-view2\">"+"<div class=\"datagrid-header\">"+"<div class=\"datagrid-header-inner\"></div>"+"</div>"+"<div class=\"datagrid-body\"></div>"+"<div class=\"datagrid-footer\">"+"<div class=\"datagrid-footer-inner\"></div>"+"</div>"+"</div>"+"</div>"+"</div>").insertAfter(_655);
_65a.panel({doSize:false,cls:"datagrid"});
$(_655).addClass("datagrid-f").hide().appendTo(_65a.children("div.datagrid-view"));
var cc=_657();
var view=_65a.children("div.datagrid-view");
var _65b=view.children("div.datagrid-view1");
var _65c=view.children("div.datagrid-view2");
return {panel:_65a,frozenColumns:cc[0],columns:cc[1],dc:{view:view,view1:_65b,view2:_65c,header1:_65b.children("div.datagrid-header").children("div.datagrid-header-inner"),header2:_65c.children("div.datagrid-header").children("div.datagrid-header-inner"),body1:_65b.children("div.datagrid-body").children("div.datagrid-body-inner"),body2:_65c.children("div.datagrid-body"),footer1:_65b.children("div.datagrid-footer").children("div.datagrid-footer-inner"),footer2:_65c.children("div.datagrid-footer").children("div.datagrid-footer-inner")}};
};
function _65d(_65e){
var _65f=$.data(_65e,"datagrid");
var opts=_65f.options;
var dc=_65f.dc;
var _660=_65f.panel;
_65f.ss=$(_65e).datagrid("createStyleSheet");
_660.panel($.extend({},opts,{id:null,doSize:false,onResize:function(_661,_662){
if($.data(_65e,"datagrid")){
_62f(_65e);
$(_65e).datagrid("fitColumns");
opts.onResize.call(_660,_661,_662);
}
},onExpand:function(){
if($.data(_65e,"datagrid")){
$(_65e).datagrid("fixRowHeight").datagrid("fitColumns");
opts.onExpand.call(_660);
}
}}));
_65f.rowIdPrefix="datagrid-row-r"+(++_615);
_65f.cellClassPrefix="datagrid-cell-c"+_615;
_663(dc.header1,opts.frozenColumns,true);
_663(dc.header2,opts.columns,false);
_664();
dc.header1.add(dc.header2).css("display",opts.showHeader?"block":"none");
dc.footer1.add(dc.footer2).css("display",opts.showFooter?"block":"none");
if(opts.toolbar){
if($.isArray(opts.toolbar)){
$("div.datagrid-toolbar",_660).remove();
var tb=$("<div class=\"datagrid-toolbar\"><table cellspacing=\"0\" cellpadding=\"0\"><tr></tr></table></div>").prependTo(_660);
var tr=tb.find("tr");
for(var i=0;i<opts.toolbar.length;i++){
var btn=opts.toolbar[i];
if(btn=="-"){
$("<td><div class=\"datagrid-btn-separator\"></div></td>").appendTo(tr);
}else{
var td=$("<td></td>").appendTo(tr);
var tool=$("<a href=\"javascript:void(0)\"></a>").appendTo(td);
tool[0].onclick=eval(btn.handler||function(){
});
tool.linkbutton($.extend({},btn,{plain:true}));
}
}
}else{
$(opts.toolbar).addClass("datagrid-toolbar").prependTo(_660);
$(opts.toolbar).show();
}
}else{
$("div.datagrid-toolbar",_660).remove();
}
$("div.datagrid-pager",_660).remove();
if(opts.pagination){
var _665=$("<div class=\"datagrid-pager\"></div>");
if(opts.pagePosition=="bottom"){
_665.appendTo(_660);
}else{
if(opts.pagePosition=="top"){
_665.addClass("datagrid-pager-top").prependTo(_660);
}else{
var ptop=$("<div class=\"datagrid-pager datagrid-pager-top\"></div>").prependTo(_660);
_665.appendTo(_660);
_665=_665.add(ptop);
}
}
_665.pagination({total:(opts.pageNumber*opts.pageSize),pageNumber:opts.pageNumber,pageSize:opts.pageSize,pageList:opts.pageList,onSelectPage:function(_666,_667){
opts.pageNumber=_666||1;
opts.pageSize=_667;
_665.pagination("refresh",{pageNumber:_666,pageSize:_667});
_6ae(_65e);
}});
opts.pageSize=_665.pagination("options").pageSize;
}
function _663(_668,_669,_66a){
if(!_669){
return;
}
$(_668).show();
$(_668).empty();
var _66b=[];
var _66c=[];
var _66d=[];
if(opts.sortName){
_66b=opts.sortName.split(",");
_66c=opts.sortOrder.split(",");
}
var t=$("<table class=\"datagrid-htable\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\"><tbody></tbody></table>").appendTo(_668);
for(var i=0;i<_669.length;i++){
var tr=$("<tr class=\"datagrid-header-row\"></tr>").appendTo($("tbody",t));
var cols=_669[i];
for(var j=0;j<cols.length;j++){
var col=cols[j];
var attr="";
if(col.rowspan){
attr+="rowspan=\""+col.rowspan+"\" ";
}
if(col.colspan){
attr+="colspan=\""+col.colspan+"\" ";
if(!col.id){
col.id=["datagrid-td-group"+_615,i,j].join("-");
}
}
if(col.id){
attr+="id=\""+col.id+"\"";
}
var td=$("<td "+attr+"></td>").appendTo(tr);
if(col.checkbox){
td.attr("field",col.field);
$("<div class=\"datagrid-header-check\"></div>").html("<input type=\"checkbox\"/>").appendTo(td);
}else{
if(col.field){
td.attr("field",col.field);
td.append("<div class=\"datagrid-cell\"><span></span><span class=\"datagrid-sort-icon\"></span></div>");
td.find("span:first").html(col.title);
var cell=td.find("div.datagrid-cell");
var pos=_616(_66b,col.field);
if(pos>=0){
cell.addClass("datagrid-sort-"+_66c[pos]);
}
if(col.sortable){
cell.addClass("datagrid-sort");
}
if(col.resizable==false){
cell.attr("resizable","false");
}
if(col.width){
var _66e=$.parser.parseValue("width",col.width,dc.view,opts.scrollbarSize);
cell._outerWidth(_66e-1);
col.boxWidth=parseInt(cell[0].style.width);
col.deltaWidth=_66e-col.boxWidth;
}else{
col.auto=true;
}
cell.css("text-align",(col.halign||col.align||""));
col.cellClass=_65f.cellClassPrefix+"-"+col.field.replace(/[\.|\s]/g,"-");
cell.addClass(col.cellClass).css("width","");
}else{
$("<div class=\"datagrid-cell-group\"></div>").html(col.title).appendTo(td);
}
}
if(col.hidden){
td.hide();
_66d.push(col.field);
}
}
}
if(_66a&&opts.rownumbers){
var td=$("<td rowspan=\""+opts.frozenColumns.length+"\"><div class=\"datagrid-header-rownumber\"></div></td>");
if($("tr",t).length==0){
td.wrap("<tr class=\"datagrid-header-row\"></tr>").parent().appendTo($("tbody",t));
}else{
td.prependTo($("tr:first",t));
}
}
for(var i=0;i<_66d.length;i++){
_6b0(_65e,_66d[i],-1);
}
};
function _664(){
var _66f=[];
var _670=_671(_65e,true).concat(_671(_65e));
for(var i=0;i<_670.length;i++){
var col=_672(_65e,_670[i]);
if(col&&!col.checkbox){
_66f.push(["."+col.cellClass,col.boxWidth?col.boxWidth+"px":"auto"]);
}
}
_65f.ss.add(_66f);
_65f.ss.dirty(_65f.cellSelectorPrefix);
_65f.cellSelectorPrefix="."+_65f.cellClassPrefix;
};
};
function _673(_674){
var _675=$.data(_674,"datagrid");
var _676=_675.panel;
var opts=_675.options;
var dc=_675.dc;
var _677=dc.header1.add(dc.header2);
_677.unbind(".datagrid");
for(var _678 in opts.headerEvents){
_677.bind(_678+".datagrid",opts.headerEvents[_678]);
}
var _679=_677.find("div.datagrid-cell");
var _67a=opts.resizeHandle=="right"?"e":(opts.resizeHandle=="left"?"w":"e,w");
_679.each(function(){
$(this).resizable({handles:_67a,disabled:($(this).attr("resizable")?$(this).attr("resizable")=="false":false),minWidth:25,onStartResize:function(e){
_675.resizing=true;
_677.css("cursor",$("body").css("cursor"));
if(!_675.proxy){
_675.proxy=$("<div class=\"datagrid-resize-proxy\"></div>").appendTo(dc.view);
}
_675.proxy.css({left:e.pageX-$(_676).offset().left-1,display:"none"});
setTimeout(function(){
if(_675.proxy){
_675.proxy.show();
}
},500);
},onResize:function(e){
_675.proxy.css({left:e.pageX-$(_676).offset().left-1,display:"block"});
return false;
},onStopResize:function(e){
_677.css("cursor","");
$(this).css("height","");
var _67b=$(this).parent().attr("field");
var col=_672(_674,_67b);
col.width=$(this)._outerWidth();
col.boxWidth=col.width-col.deltaWidth;
col.auto=undefined;
$(this).css("width","");
$(_674).datagrid("fixColumnSize",_67b);
_675.proxy.remove();
_675.proxy=null;
if($(this).parents("div:first.datagrid-header").parent().hasClass("datagrid-view1")){
_62f(_674);
}
$(_674).datagrid("fitColumns");
opts.onResizeColumn.call(_674,_67b,col.width);
setTimeout(function(){
_675.resizing=false;
},0);
}});
});
var bb=dc.body1.add(dc.body2);
bb.unbind();
for(var _678 in opts.rowEvents){
bb.bind(_678,opts.rowEvents[_678]);
}
dc.body1.bind("mousewheel DOMMouseScroll",function(e){
e.preventDefault();
var e1=e.originalEvent||window.event;
var _67c=e1.wheelDelta||e1.detail*(-1);
if("deltaY" in e1){
_67c=e1.deltaY*-1;
}
var dg=$(e.target).closest("div.datagrid-view").children(".datagrid-f");
var dc=dg.data("datagrid").dc;
dc.body2.scrollTop(dc.body2.scrollTop()-_67c);
});
dc.body2.bind("scroll",function(){
var b1=dc.view1.children("div.datagrid-body");
b1.scrollTop($(this).scrollTop());
var c1=dc.body1.children(":first");
var c2=dc.body2.children(":first");
if(c1.length&&c2.length){
var top1=c1.offset().top;
var top2=c2.offset().top;
if(top1!=top2){
b1.scrollTop(b1.scrollTop()+top1-top2);
}
}
dc.view2.children("div.datagrid-header,div.datagrid-footer")._scrollLeft($(this)._scrollLeft());
dc.body2.children("table.datagrid-btable-frozen").css("left",-$(this)._scrollLeft());
});
};
function _67d(_67e){
return function(e){
var td=$(e.target).closest("td[field]");
if(td.length){
var _67f=_680(td);
if(!$(_67f).data("datagrid").resizing&&_67e){
td.addClass("datagrid-header-over");
}else{
td.removeClass("datagrid-header-over");
}
}
};
};
function _681(e){
var _682=_680(e.target);
var opts=$(_682).datagrid("options");
var ck=$(e.target).closest("input[type=checkbox]");
if(ck.length){
if(opts.singleSelect&&opts.selectOnCheck){
return false;
}
if(ck.is(":checked")){
_683(_682);
}else{
_684(_682);
}
e.stopPropagation();
}else{
var cell=$(e.target).closest(".datagrid-cell");
if(cell.length){
var p1=cell.offset().left+5;
var p2=cell.offset().left+cell._outerWidth()-5;
if(e.pageX<p2&&e.pageX>p1){
_685(_682,cell.parent().attr("field"));
}
}
}
};
function _686(e){
var _687=_680(e.target);
var opts=$(_687).datagrid("options");
var cell=$(e.target).closest(".datagrid-cell");
if(cell.length){
var p1=cell.offset().left+5;
var p2=cell.offset().left+cell._outerWidth()-5;
var cond=opts.resizeHandle=="right"?(e.pageX>p2):(opts.resizeHandle=="left"?(e.pageX<p1):(e.pageX<p1||e.pageX>p2));
if(cond){
var _688=cell.parent().attr("field");
var col=_672(_687,_688);
if(col.resizable==false){
return;
}
$(_687).datagrid("autoSizeColumn",_688);
col.auto=false;
}
}
};
function _689(e){
var _68a=_680(e.target);
var opts=$(_68a).datagrid("options");
var td=$(e.target).closest("td[field]");
opts.onHeaderContextMenu.call(_68a,e,td.attr("field"));
};
function _68b(_68c){
return function(e){
var tr=_68d(e.target);
if(!tr){
return;
}
var _68e=_680(tr);
if($.data(_68e,"datagrid").resizing){
return;
}
var _68f=_690(tr);
if(_68c){
_691(_68e,_68f);
}else{
var opts=$.data(_68e,"datagrid").options;
opts.finder.getTr(_68e,_68f).removeClass("datagrid-row-over");
}
};
};
function _692(e){
var tr=_68d(e.target);
if(!tr){
return;
}
var _693=_680(tr);
var opts=$.data(_693,"datagrid").options;
var _694=_690(tr);
var tt=$(e.target);
if(tt.parent().hasClass("datagrid-cell-check")){
if(opts.singleSelect&&opts.selectOnCheck){
tt._propAttr("checked",!tt.is(":checked"));
_695(_693,_694);
}else{
if(tt.is(":checked")){
tt._propAttr("checked",false);
_695(_693,_694);
}else{
tt._propAttr("checked",true);
_696(_693,_694);
}
}
}else{
var row=opts.finder.getRow(_693,_694);
var td=tt.closest("td[field]",tr);
if(td.length){
var _697=td.attr("field");
opts.onClickCell.call(_693,_694,_697,row[_697]);
}
if(opts.singleSelect==true){
_698(_693,_694);
}else{
if(opts.ctrlSelect){
if(e.ctrlKey){
if(tr.hasClass("datagrid-row-selected")){
_699(_693,_694);
}else{
_698(_693,_694);
}
}else{
if(e.shiftKey){
$(_693).datagrid("clearSelections");
var _69a=Math.min(opts.lastSelectedIndex||0,_694);
var _69b=Math.max(opts.lastSelectedIndex||0,_694);
for(var i=_69a;i<=_69b;i++){
_698(_693,i);
}
}else{
$(_693).datagrid("clearSelections");
_698(_693,_694);
opts.lastSelectedIndex=_694;
}
}
}else{
if(tr.hasClass("datagrid-row-selected")){
_699(_693,_694);
}else{
_698(_693,_694);
}
}
}
opts.onClickRow.apply(_693,_619(_693,[_694,row]));
}
};
function _69c(e){
var tr=_68d(e.target);
if(!tr){
return;
}
var _69d=_680(tr);
var opts=$.data(_69d,"datagrid").options;
var _69e=_690(tr);
var row=opts.finder.getRow(_69d,_69e);
var td=$(e.target).closest("td[field]",tr);
if(td.length){
var _69f=td.attr("field");
opts.onDblClickCell.call(_69d,_69e,_69f,row[_69f]);
}
opts.onDblClickRow.apply(_69d,_619(_69d,[_69e,row]));
};
function _6a0(e){
var tr=_68d(e.target);
if(tr){
var _6a1=_680(tr);
var opts=$.data(_6a1,"datagrid").options;
var _6a2=_690(tr);
var row=opts.finder.getRow(_6a1,_6a2);
opts.onRowContextMenu.call(_6a1,e,_6a2,row);
}else{
var body=_68d(e.target,".datagrid-body");
if(body){
var _6a1=_680(body);
var opts=$.data(_6a1,"datagrid").options;
opts.onRowContextMenu.call(_6a1,e,-1,null);
}
}
};
function _680(t){
return $(t).closest("div.datagrid-view").children(".datagrid-f")[0];
};
function _68d(t,_6a3){
var tr=$(t).closest(_6a3||"tr.datagrid-row");
if(tr.length&&tr.parent().length){
return tr;
}else{
return undefined;
}
};
function _690(tr){
if(tr.attr("datagrid-row-index")){
return parseInt(tr.attr("datagrid-row-index"));
}else{
return tr.attr("node-id");
}
};
function _685(_6a4,_6a5){
var _6a6=$.data(_6a4,"datagrid");
var opts=_6a6.options;
_6a5=_6a5||{};
var _6a7={sortName:opts.sortName,sortOrder:opts.sortOrder};
if(typeof _6a5=="object"){
$.extend(_6a7,_6a5);
}
var _6a8=[];
var _6a9=[];
if(_6a7.sortName){
_6a8=_6a7.sortName.split(",");
_6a9=_6a7.sortOrder.split(",");
}
if(typeof _6a5=="string"){
var _6aa=_6a5;
var col=_672(_6a4,_6aa);
if(!col.sortable||_6a6.resizing){
return;
}
var _6ab=col.order||"asc";
var pos=_616(_6a8,_6aa);
if(pos>=0){
var _6ac=_6a9[pos]=="asc"?"desc":"asc";
if(opts.multiSort&&_6ac==_6ab){
_6a8.splice(pos,1);
_6a9.splice(pos,1);
}else{
_6a9[pos]=_6ac;
}
}else{
if(opts.multiSort){
_6a8.push(_6aa);
_6a9.push(_6ab);
}else{
_6a8=[_6aa];
_6a9=[_6ab];
}
}
_6a7.sortName=_6a8.join(",");
_6a7.sortOrder=_6a9.join(",");
}
if(opts.onBeforeSortColumn.call(_6a4,_6a7.sortName,_6a7.sortOrder)==false){
return;
}
$.extend(opts,_6a7);
var dc=_6a6.dc;
var _6ad=dc.header1.add(dc.header2);
_6ad.find("div.datagrid-cell").removeClass("datagrid-sort-asc datagrid-sort-desc");
for(var i=0;i<_6a8.length;i++){
var col=_672(_6a4,_6a8[i]);
_6ad.find("div."+col.cellClass).addClass("datagrid-sort-"+_6a9[i]);
}
if(opts.remoteSort){
_6ae(_6a4);
}else{
_6af(_6a4,$(_6a4).datagrid("getData"));
}
opts.onSortColumn.call(_6a4,opts.sortName,opts.sortOrder);
};
function _6b0(_6b1,_6b2,_6b3){
_6b4(true);
_6b4(false);
function _6b4(_6b5){
var aa=_6b6(_6b1,_6b5);
if(aa.length){
var _6b7=aa[aa.length-1];
var _6b8=_616(_6b7,_6b2);
if(_6b8>=0){
for(var _6b9=0;_6b9<aa.length-1;_6b9++){
var td=$("#"+aa[_6b9][_6b8]);
var _6ba=parseInt(td.attr("colspan")||1)+(_6b3||0);
td.attr("colspan",_6ba);
if(_6ba){
td.show();
}else{
td.hide();
}
}
}
}
};
};
function _6bb(_6bc){
var _6bd=$.data(_6bc,"datagrid");
var opts=_6bd.options;
var dc=_6bd.dc;
var _6be=dc.view2.children("div.datagrid-header");
dc.body2.css("overflow-x","");
_6bf();
_6c0();
_6c1();
_6bf(true);
if(_6be.width()>=_6be.find("table").width()){
dc.body2.css("overflow-x","hidden");
}
function _6c1(){
if(!opts.fitColumns){
return;
}
if(!_6bd.leftWidth){
_6bd.leftWidth=0;
}
var _6c2=0;
var cc=[];
var _6c3=_671(_6bc,false);
for(var i=0;i<_6c3.length;i++){
var col=_672(_6bc,_6c3[i]);
if(_6c4(col)){
_6c2+=col.width;
cc.push({field:col.field,col:col,addingWidth:0});
}
}
if(!_6c2){
return;
}
cc[cc.length-1].addingWidth-=_6bd.leftWidth;
var _6c5=_6be.children("div.datagrid-header-inner").show();
var _6c6=_6be.width()-_6be.find("table").width()-opts.scrollbarSize+_6bd.leftWidth;
var rate=_6c6/_6c2;
if(!opts.showHeader){
_6c5.hide();
}
for(var i=0;i<cc.length;i++){
var c=cc[i];
var _6c7=parseInt(c.col.width*rate);
c.addingWidth+=_6c7;
_6c6-=_6c7;
}
cc[cc.length-1].addingWidth+=_6c6;
for(var i=0;i<cc.length;i++){
var c=cc[i];
if(c.col.boxWidth+c.addingWidth>0){
c.col.boxWidth+=c.addingWidth;
c.col.width+=c.addingWidth;
}
}
_6bd.leftWidth=_6c6;
$(_6bc).datagrid("fixColumnSize");
};
function _6c0(){
var _6c8=false;
var _6c9=_671(_6bc,true).concat(_671(_6bc,false));
$.map(_6c9,function(_6ca){
var col=_672(_6bc,_6ca);
if(String(col.width||"").indexOf("%")>=0){
var _6cb=$.parser.parseValue("width",col.width,dc.view,opts.scrollbarSize)-col.deltaWidth;
if(_6cb>0){
col.boxWidth=_6cb;
_6c8=true;
}
}
});
if(_6c8){
$(_6bc).datagrid("fixColumnSize");
}
};
function _6bf(fit){
var _6cc=dc.header1.add(dc.header2).find(".datagrid-cell-group");
if(_6cc.length){
_6cc.each(function(){
$(this)._outerWidth(fit?$(this).parent().width():10);
});
if(fit){
_62f(_6bc);
}
}
};
function _6c4(col){
if(String(col.width||"").indexOf("%")>=0){
return false;
}
if(!col.hidden&&!col.checkbox&&!col.auto&&!col.fixed){
return true;
}
};
};
function _6cd(_6ce,_6cf){
var _6d0=$.data(_6ce,"datagrid");
var opts=_6d0.options;
var dc=_6d0.dc;
var tmp=$("<div class=\"datagrid-cell\" style=\"position:absolute;left:-9999px\"></div>").appendTo("body");
if(_6cf){
_62a(_6cf);
$(_6ce).datagrid("fitColumns");
}else{
var _6d1=false;
var _6d2=_671(_6ce,true).concat(_671(_6ce,false));
for(var i=0;i<_6d2.length;i++){
var _6cf=_6d2[i];
var col=_672(_6ce,_6cf);
if(col.auto){
_62a(_6cf);
_6d1=true;
}
}
if(_6d1){
$(_6ce).datagrid("fitColumns");
}
}
tmp.remove();
function _62a(_6d3){
var _6d4=dc.view.find("div.datagrid-header td[field=\""+_6d3+"\"] div.datagrid-cell");
_6d4.css("width","");
var col=$(_6ce).datagrid("getColumnOption",_6d3);
col.width=undefined;
col.boxWidth=undefined;
col.auto=true;
$(_6ce).datagrid("fixColumnSize",_6d3);
var _6d5=Math.max(_6d6("header"),_6d6("allbody"),_6d6("allfooter"))+1;
_6d4._outerWidth(_6d5-1);
col.width=_6d5;
col.boxWidth=parseInt(_6d4[0].style.width);
col.deltaWidth=_6d5-col.boxWidth;
_6d4.css("width","");
$(_6ce).datagrid("fixColumnSize",_6d3);
opts.onResizeColumn.call(_6ce,_6d3,col.width);
function _6d6(type){
var _6d7=0;
if(type=="header"){
_6d7=_6d8(_6d4);
}else{
opts.finder.getTr(_6ce,0,type).find("td[field=\""+_6d3+"\"] div.datagrid-cell").each(function(){
var w=_6d8($(this));
if(_6d7<w){
_6d7=w;
}
});
}
return _6d7;
function _6d8(cell){
return cell.is(":visible")?cell._outerWidth():tmp.html(cell.html())._outerWidth();
};
};
};
};
function _6d9(_6da,_6db){
var _6dc=$.data(_6da,"datagrid");
var opts=_6dc.options;
var dc=_6dc.dc;
var _6dd=dc.view.find("table.datagrid-btable,table.datagrid-ftable");
_6dd.css("table-layout","fixed");
if(_6db){
fix(_6db);
}else{
var ff=_671(_6da,true).concat(_671(_6da,false));
for(var i=0;i<ff.length;i++){
fix(ff[i]);
}
}
_6dd.css("table-layout","");
_6de(_6da);
_640(_6da);
_6df(_6da);
function fix(_6e0){
var col=_672(_6da,_6e0);
if(col.cellClass){
_6dc.ss.set("."+col.cellClass,col.boxWidth?col.boxWidth+"px":"auto");
}
};
};
function _6de(_6e1,tds){
var dc=$.data(_6e1,"datagrid").dc;
tds=tds||dc.view.find("td.datagrid-td-merged");
tds.each(function(){
var td=$(this);
var _6e2=td.attr("colspan")||1;
if(_6e2>1){
var col=_672(_6e1,td.attr("field"));
var _6e3=col.boxWidth+col.deltaWidth-1;
for(var i=1;i<_6e2;i++){
td=td.next();
col=_672(_6e1,td.attr("field"));
_6e3+=col.boxWidth+col.deltaWidth;
}
$(this).children("div.datagrid-cell")._outerWidth(_6e3);
}
});
};
function _6df(_6e4){
var dc=$.data(_6e4,"datagrid").dc;
dc.view.find("div.datagrid-editable").each(function(){
var cell=$(this);
var _6e5=cell.parent().attr("field");
var col=$(_6e4).datagrid("getColumnOption",_6e5);
cell._outerWidth(col.boxWidth+col.deltaWidth-1);
var ed=$.data(this,"datagrid.editor");
if(ed.actions.resize){
ed.actions.resize(ed.target,cell.width());
}
});
};
function _672(_6e6,_6e7){
function find(_6e8){
if(_6e8){
for(var i=0;i<_6e8.length;i++){
var cc=_6e8[i];
for(var j=0;j<cc.length;j++){
var c=cc[j];
if(c.field==_6e7){
return c;
}
}
}
}
return null;
};
var opts=$.data(_6e6,"datagrid").options;
var col=find(opts.columns);
if(!col){
col=find(opts.frozenColumns);
}
return col;
};
function _6b6(_6e9,_6ea){
var opts=$.data(_6e9,"datagrid").options;
var _6eb=_6ea?opts.frozenColumns:opts.columns;
var aa=[];
var _6ec=_6ed();
for(var i=0;i<_6eb.length;i++){
aa[i]=new Array(_6ec);
}
for(var _6ee=0;_6ee<_6eb.length;_6ee++){
$.map(_6eb[_6ee],function(col){
var _6ef=_6f0(aa[_6ee]);
if(_6ef>=0){
var _6f1=col.field||col.id||"";
for(var c=0;c<(col.colspan||1);c++){
for(var r=0;r<(col.rowspan||1);r++){
aa[_6ee+r][_6ef]=_6f1;
}
_6ef++;
}
}
});
}
return aa;
function _6ed(){
var _6f2=0;
$.map(_6eb[0]||[],function(col){
_6f2+=col.colspan||1;
});
return _6f2;
};
function _6f0(a){
for(var i=0;i<a.length;i++){
if(a[i]==undefined){
return i;
}
}
return -1;
};
};
function _671(_6f3,_6f4){
var aa=_6b6(_6f3,_6f4);
return aa.length?aa[aa.length-1]:aa;
};
function _6af(_6f5,data){
var _6f6=$.data(_6f5,"datagrid");
var opts=_6f6.options;
var dc=_6f6.dc;
data=opts.loadFilter.call(_6f5,data);
if($.isArray(data)){
data={total:data.length,rows:data};
}
data.total=parseInt(data.total);
_6f6.data=data;
if(data.footer){
_6f6.footer=data.footer;
}
if(!opts.remoteSort&&opts.sortName){
var _6f7=opts.sortName.split(",");
var _6f8=opts.sortOrder.split(",");
data.rows.sort(function(r1,r2){
var r=0;
for(var i=0;i<_6f7.length;i++){
var sn=_6f7[i];
var so=_6f8[i];
var col=_672(_6f5,sn);
var _6f9=col.sorter||function(a,b){
return a==b?0:(a>b?1:-1);
};
r=_6f9(r1[sn],r2[sn])*(so=="asc"?1:-1);
if(r!=0){
return r;
}
}
return r;
});
}
if(opts.view.onBeforeRender){
opts.view.onBeforeRender.call(opts.view,_6f5,data.rows);
}
opts.view.render.call(opts.view,_6f5,dc.body2,false);
opts.view.render.call(opts.view,_6f5,dc.body1,true);
if(opts.showFooter){
opts.view.renderFooter.call(opts.view,_6f5,dc.footer2,false);
opts.view.renderFooter.call(opts.view,_6f5,dc.footer1,true);
}
if(opts.view.onAfterRender){
opts.view.onAfterRender.call(opts.view,_6f5);
}
_6f6.ss.clean();
var _6fa=$(_6f5).datagrid("getPager");
if(_6fa.length){
var _6fb=_6fa.pagination("options");
if(_6fb.total!=data.total){
_6fa.pagination("refresh",{total:data.total});
if(opts.pageNumber!=_6fb.pageNumber&&_6fb.pageNumber>0){
opts.pageNumber=_6fb.pageNumber;
_6ae(_6f5);
}
}
}
_640(_6f5);
dc.body2.triggerHandler("scroll");
$(_6f5).datagrid("setSelectionState");
$(_6f5).datagrid("autoSizeColumn");
opts.onLoadSuccess.call(_6f5,data);
};
function _6fc(_6fd){
var _6fe=$.data(_6fd,"datagrid");
var opts=_6fe.options;
var dc=_6fe.dc;
dc.header1.add(dc.header2).find("input[type=checkbox]")._propAttr("checked",false);
if(opts.idField){
var _6ff=$.data(_6fd,"treegrid")?true:false;
var _700=opts.onSelect;
var _701=opts.onCheck;
opts.onSelect=opts.onCheck=function(){
};
var rows=opts.finder.getRows(_6fd);
for(var i=0;i<rows.length;i++){
var row=rows[i];
var _702=_6ff?row[opts.idField]:i;
if(_703(_6fe.selectedRows,row)){
_698(_6fd,_702,true);
}
if(_703(_6fe.checkedRows,row)){
_695(_6fd,_702,true);
}
}
opts.onSelect=_700;
opts.onCheck=_701;
}
function _703(a,r){
for(var i=0;i<a.length;i++){
if(a[i][opts.idField]==r[opts.idField]){
a[i]=r;
return true;
}
}
return false;
};
};
function _704(_705,row){
var _706=$.data(_705,"datagrid");
var opts=_706.options;
var rows=_706.data.rows;
if(typeof row=="object"){
return _616(rows,row);
}else{
for(var i=0;i<rows.length;i++){
if(rows[i][opts.idField]==row){
return i;
}
}
return -1;
}
};
function _707(_708){
var _709=$.data(_708,"datagrid");
var opts=_709.options;
var data=_709.data;
if(opts.idField){
return _709.selectedRows;
}else{
var rows=[];
opts.finder.getTr(_708,"","selected",2).each(function(){
rows.push(opts.finder.getRow(_708,$(this)));
});
return rows;
}
};
function _70a(_70b){
var _70c=$.data(_70b,"datagrid");
var opts=_70c.options;
if(opts.idField){
return _70c.checkedRows;
}else{
var rows=[];
opts.finder.getTr(_70b,"","checked",2).each(function(){
rows.push(opts.finder.getRow(_70b,$(this)));
});
return rows;
}
};
function _70d(_70e,_70f){
var _710=$.data(_70e,"datagrid");
var dc=_710.dc;
var opts=_710.options;
var tr=opts.finder.getTr(_70e,_70f);
if(tr.length){
if(tr.closest("table").hasClass("datagrid-btable-frozen")){
return;
}
var _711=dc.view2.children("div.datagrid-header")._outerHeight();
var _712=dc.body2;
var _713=_712.outerHeight(true)-_712.outerHeight();
var top=tr.position().top-_711-_713;
if(top<0){
_712.scrollTop(_712.scrollTop()+top);
}else{
if(top+tr._outerHeight()>_712.height()-18){
_712.scrollTop(_712.scrollTop()+top+tr._outerHeight()-_712.height()+18);
}
}
}
};
function _691(_714,_715){
var _716=$.data(_714,"datagrid");
var opts=_716.options;
opts.finder.getTr(_714,_716.highlightIndex).removeClass("datagrid-row-over");
opts.finder.getTr(_714,_715).addClass("datagrid-row-over");
_716.highlightIndex=_715;
};
function _698(_717,_718,_719){
var _71a=$.data(_717,"datagrid");
var opts=_71a.options;
var row=opts.finder.getRow(_717,_718);
if(opts.onBeforeSelect.apply(_717,_619(_717,[_718,row]))==false){
return;
}
if(opts.singleSelect){
_71b(_717,true);
_71a.selectedRows=[];
}
if(!_719&&opts.checkOnSelect){
_695(_717,_718,true);
}
if(opts.idField){
_618(_71a.selectedRows,opts.idField,row);
}
opts.finder.getTr(_717,_718).addClass("datagrid-row-selected");
opts.onSelect.apply(_717,_619(_717,[_718,row]));
_70d(_717,_718);
};
function _699(_71c,_71d,_71e){
var _71f=$.data(_71c,"datagrid");
var dc=_71f.dc;
var opts=_71f.options;
var row=opts.finder.getRow(_71c,_71d);
if(opts.onBeforeUnselect.apply(_71c,_619(_71c,[_71d,row]))==false){
return;
}
if(!_71e&&opts.checkOnSelect){
_696(_71c,_71d,true);
}
opts.finder.getTr(_71c,_71d).removeClass("datagrid-row-selected");
if(opts.idField){
_617(_71f.selectedRows,opts.idField,row[opts.idField]);
}
opts.onUnselect.apply(_71c,_619(_71c,[_71d,row]));
};
function _720(_721,_722){
var _723=$.data(_721,"datagrid");
var opts=_723.options;
var rows=opts.finder.getRows(_721);
var _724=$.data(_721,"datagrid").selectedRows;
if(!_722&&opts.checkOnSelect){
_683(_721,true);
}
opts.finder.getTr(_721,"","allbody").addClass("datagrid-row-selected");
if(opts.idField){
for(var _725=0;_725<rows.length;_725++){
_618(_724,opts.idField,rows[_725]);
}
}
opts.onSelectAll.call(_721,rows);
};
function _71b(_726,_727){
var _728=$.data(_726,"datagrid");
var opts=_728.options;
var rows=opts.finder.getRows(_726);
var _729=$.data(_726,"datagrid").selectedRows;
if(!_727&&opts.checkOnSelect){
_684(_726,true);
}
opts.finder.getTr(_726,"","selected").removeClass("datagrid-row-selected");
if(opts.idField){
for(var _72a=0;_72a<rows.length;_72a++){
_617(_729,opts.idField,rows[_72a][opts.idField]);
}
}
opts.onUnselectAll.call(_726,rows);
};
function _695(_72b,_72c,_72d){
var _72e=$.data(_72b,"datagrid");
var opts=_72e.options;
var row=opts.finder.getRow(_72b,_72c);
if(opts.onBeforeCheck.apply(_72b,_619(_72b,[_72c,row]))==false){
return;
}
if(opts.singleSelect&&opts.selectOnCheck){
_684(_72b,true);
_72e.checkedRows=[];
}
if(!_72d&&opts.selectOnCheck){
_698(_72b,_72c,true);
}
var tr=opts.finder.getTr(_72b,_72c).addClass("datagrid-row-checked");
tr.find("div.datagrid-cell-check input[type=checkbox]")._propAttr("checked",true);
tr=opts.finder.getTr(_72b,"","checked",2);
if(tr.length==opts.finder.getRows(_72b).length){
var dc=_72e.dc;
dc.header1.add(dc.header2).find("input[type=checkbox]")._propAttr("checked",true);
}
if(opts.idField){
_618(_72e.checkedRows,opts.idField,row);
}
opts.onCheck.apply(_72b,_619(_72b,[_72c,row]));
};
function _696(_72f,_730,_731){
var _732=$.data(_72f,"datagrid");
var opts=_732.options;
var row=opts.finder.getRow(_72f,_730);
if(opts.onBeforeUncheck.apply(_72f,_619(_72f,[_730,row]))==false){
return;
}
if(!_731&&opts.selectOnCheck){
_699(_72f,_730,true);
}
var tr=opts.finder.getTr(_72f,_730).removeClass("datagrid-row-checked");
tr.find("div.datagrid-cell-check input[type=checkbox]")._propAttr("checked",false);
var dc=_732.dc;
var _733=dc.header1.add(dc.header2);
_733.find("input[type=checkbox]")._propAttr("checked",false);
if(opts.idField){
_617(_732.checkedRows,opts.idField,row[opts.idField]);
}
opts.onUncheck.apply(_72f,_619(_72f,[_730,row]));
};
function _683(_734,_735){
var _736=$.data(_734,"datagrid");
var opts=_736.options;
var rows=opts.finder.getRows(_734);
if(!_735&&opts.selectOnCheck){
_720(_734,true);
}
var dc=_736.dc;
var hck=dc.header1.add(dc.header2).find("input[type=checkbox]");
var bck=opts.finder.getTr(_734,"","allbody").addClass("datagrid-row-checked").find("div.datagrid-cell-check input[type=checkbox]");
hck.add(bck)._propAttr("checked",true);
if(opts.idField){
for(var i=0;i<rows.length;i++){
_618(_736.checkedRows,opts.idField,rows[i]);
}
}
opts.onCheckAll.call(_734,rows);
};
function _684(_737,_738){
var _739=$.data(_737,"datagrid");
var opts=_739.options;
var rows=opts.finder.getRows(_737);
if(!_738&&opts.selectOnCheck){
_71b(_737,true);
}
var dc=_739.dc;
var hck=dc.header1.add(dc.header2).find("input[type=checkbox]");
var bck=opts.finder.getTr(_737,"","checked").removeClass("datagrid-row-checked").find("div.datagrid-cell-check input[type=checkbox]");
hck.add(bck)._propAttr("checked",false);
if(opts.idField){
for(var i=0;i<rows.length;i++){
_617(_739.checkedRows,opts.idField,rows[i][opts.idField]);
}
}
opts.onUncheckAll.call(_737,rows);
};
function _73a(_73b,_73c){
var opts=$.data(_73b,"datagrid").options;
var tr=opts.finder.getTr(_73b,_73c);
var row=opts.finder.getRow(_73b,_73c);
if(tr.hasClass("datagrid-row-editing")){
return;
}
if(opts.onBeforeEdit.apply(_73b,_619(_73b,[_73c,row]))==false){
return;
}
tr.addClass("datagrid-row-editing");
_73d(_73b,_73c);
_6df(_73b);
tr.find("div.datagrid-editable").each(function(){
var _73e=$(this).parent().attr("field");
var ed=$.data(this,"datagrid.editor");
ed.actions.setValue(ed.target,row[_73e]);
});
_73f(_73b,_73c);
opts.onBeginEdit.apply(_73b,_619(_73b,[_73c,row]));
};
function _740(_741,_742,_743){
var _744=$.data(_741,"datagrid");
var opts=_744.options;
var _745=_744.updatedRows;
var _746=_744.insertedRows;
var tr=opts.finder.getTr(_741,_742);
var row=opts.finder.getRow(_741,_742);
if(!tr.hasClass("datagrid-row-editing")){
return;
}
if(!_743){
if(!_73f(_741,_742)){
return;
}
var _747=false;
var _748={};
tr.find("div.datagrid-editable").each(function(){
var _749=$(this).parent().attr("field");
var ed=$.data(this,"datagrid.editor");
var t=$(ed.target);
var _74a=t.data("textbox")?t.textbox("textbox"):t;
if(_74a.is(":focus")){
_74a.triggerHandler("blur");
}
var _74b=ed.actions.getValue(ed.target);
if(row[_749]!==_74b){
row[_749]=_74b;
_747=true;
_748[_749]=_74b;
}
});
if(_747){
if(_616(_746,row)==-1){
if(_616(_745,row)==-1){
_745.push(row);
}
}
}
opts.onEndEdit.apply(_741,_619(_741,[_742,row,_748]));
}
tr.removeClass("datagrid-row-editing");
_74c(_741,_742);
$(_741).datagrid("refreshRow",_742);
if(!_743){
opts.onAfterEdit.apply(_741,_619(_741,[_742,row,_748]));
}else{
opts.onCancelEdit.apply(_741,_619(_741,[_742,row]));
}
};
function _74d(_74e,_74f){
var opts=$.data(_74e,"datagrid").options;
var tr=opts.finder.getTr(_74e,_74f);
var _750=[];
tr.children("td").each(function(){
var cell=$(this).find("div.datagrid-editable");
if(cell.length){
var ed=$.data(cell[0],"datagrid.editor");
_750.push(ed);
}
});
return _750;
};
function _751(_752,_753){
var _754=_74d(_752,_753.index!=undefined?_753.index:_753.id);
for(var i=0;i<_754.length;i++){
if(_754[i].field==_753.field){
return _754[i];
}
}
return null;
};
function _73d(_755,_756){
var opts=$.data(_755,"datagrid").options;
var tr=opts.finder.getTr(_755,_756);
tr.children("td").each(function(){
var cell=$(this).find("div.datagrid-cell");
var _757=$(this).attr("field");
var col=_672(_755,_757);
if(col&&col.editor){
var _758,_759;
if(typeof col.editor=="string"){
_758=col.editor;
}else{
_758=col.editor.type;
_759=col.editor.options;
}
var _75a=opts.editors[_758];
if(_75a){
var _75b=cell.html();
var _75c=cell._outerWidth();
cell.addClass("datagrid-editable");
cell._outerWidth(_75c);
cell.html("<table border=\"0\" cellspacing=\"0\" cellpadding=\"1\"><tr><td></td></tr></table>");
cell.children("table").bind("click dblclick contextmenu",function(e){
e.stopPropagation();
});
$.data(cell[0],"datagrid.editor",{actions:_75a,target:_75a.init(cell.find("td"),$.extend({height:opts.editorHeight},_759)),field:_757,type:_758,oldHtml:_75b});
}
}
});
_640(_755,_756,true);
};
function _74c(_75d,_75e){
var opts=$.data(_75d,"datagrid").options;
var tr=opts.finder.getTr(_75d,_75e);
tr.children("td").each(function(){
var cell=$(this).find("div.datagrid-editable");
if(cell.length){
var ed=$.data(cell[0],"datagrid.editor");
if(ed.actions.destroy){
ed.actions.destroy(ed.target);
}
cell.html(ed.oldHtml);
$.removeData(cell[0],"datagrid.editor");
cell.removeClass("datagrid-editable");
cell.css("width","");
}
});
};
function _73f(_75f,_760){
var tr=$.data(_75f,"datagrid").options.finder.getTr(_75f,_760);
if(!tr.hasClass("datagrid-row-editing")){
return true;
}
var vbox=tr.find(".validatebox-text");
vbox.validatebox("validate");
vbox.trigger("mouseleave");
var _761=tr.find(".validatebox-invalid");
return _761.length==0;
};
function _762(_763,_764){
var _765=$.data(_763,"datagrid").insertedRows;
var _766=$.data(_763,"datagrid").deletedRows;
var _767=$.data(_763,"datagrid").updatedRows;
if(!_764){
var rows=[];
rows=rows.concat(_765);
rows=rows.concat(_766);
rows=rows.concat(_767);
return rows;
}else{
if(_764=="inserted"){
return _765;
}else{
if(_764=="deleted"){
return _766;
}else{
if(_764=="updated"){
return _767;
}
}
}
}
return [];
};
function _768(_769,_76a){
var _76b=$.data(_769,"datagrid");
var opts=_76b.options;
var data=_76b.data;
var _76c=_76b.insertedRows;
var _76d=_76b.deletedRows;
$(_769).datagrid("cancelEdit",_76a);
var row=opts.finder.getRow(_769,_76a);
if(_616(_76c,row)>=0){
_617(_76c,row);
}else{
_76d.push(row);
}
_617(_76b.selectedRows,opts.idField,row[opts.idField]);
_617(_76b.checkedRows,opts.idField,row[opts.idField]);
opts.view.deleteRow.call(opts.view,_769,_76a);
if(opts.height=="auto"){
_640(_769);
}
$(_769).datagrid("getPager").pagination("refresh",{total:data.total});
};
function _76e(_76f,_770){
var data=$.data(_76f,"datagrid").data;
var view=$.data(_76f,"datagrid").options.view;
var _771=$.data(_76f,"datagrid").insertedRows;
view.insertRow.call(view,_76f,_770.index,_770.row);
_771.push(_770.row);
$(_76f).datagrid("getPager").pagination("refresh",{total:data.total});
};
function _772(_773,row){
var data=$.data(_773,"datagrid").data;
var view=$.data(_773,"datagrid").options.view;
var _774=$.data(_773,"datagrid").insertedRows;
view.insertRow.call(view,_773,null,row);
_774.push(row);
$(_773).datagrid("getPager").pagination("refresh",{total:data.total});
};
function _775(_776,_777){
var _778=$.data(_776,"datagrid");
var opts=_778.options;
var row=opts.finder.getRow(_776,_777.index);
var _779=false;
_777.row=_777.row||{};
for(var _77a in _777.row){
if(row[_77a]!==_777.row[_77a]){
_779=true;
break;
}
}
if(_779){
if(_616(_778.insertedRows,row)==-1){
if(_616(_778.updatedRows,row)==-1){
_778.updatedRows.push(row);
}
}
opts.view.updateRow.call(opts.view,_776,_777.index,_777.row);
}
};
function _77b(_77c){
var _77d=$.data(_77c,"datagrid");
var data=_77d.data;
var rows=data.rows;
var _77e=[];
for(var i=0;i<rows.length;i++){
_77e.push($.extend({},rows[i]));
}
_77d.originalRows=_77e;
_77d.updatedRows=[];
_77d.insertedRows=[];
_77d.deletedRows=[];
};
function _77f(_780){
var data=$.data(_780,"datagrid").data;
var ok=true;
for(var i=0,len=data.rows.length;i<len;i++){
if(_73f(_780,i)){
$(_780).datagrid("endEdit",i);
}else{
ok=false;
}
}
if(ok){
_77b(_780);
}
};
function _781(_782){
var _783=$.data(_782,"datagrid");
var opts=_783.options;
var _784=_783.originalRows;
var _785=_783.insertedRows;
var _786=_783.deletedRows;
var _787=_783.selectedRows;
var _788=_783.checkedRows;
var data=_783.data;
function _789(a){
var ids=[];
for(var i=0;i<a.length;i++){
ids.push(a[i][opts.idField]);
}
return ids;
};
function _78a(ids,_78b){
for(var i=0;i<ids.length;i++){
var _78c=_704(_782,ids[i]);
if(_78c>=0){
(_78b=="s"?_698:_695)(_782,_78c,true);
}
}
};
for(var i=0;i<data.rows.length;i++){
$(_782).datagrid("cancelEdit",i);
}
var _78d=_789(_787);
var _78e=_789(_788);
_787.splice(0,_787.length);
_788.splice(0,_788.length);
data.total+=_786.length-_785.length;
data.rows=_784;
_6af(_782,data);
_78a(_78d,"s");
_78a(_78e,"c");
_77b(_782);
};
function _6ae(_78f,_790,cb){
var opts=$.data(_78f,"datagrid").options;
if(_790){
opts.queryParams=_790;
}
var _791=$.extend({},opts.queryParams);
if(opts.pagination){
$.extend(_791,{page:opts.pageNumber||1,rows:opts.pageSize});
}
if(opts.sortName){
$.extend(_791,{sort:opts.sortName,order:opts.sortOrder});
}
if(opts.onBeforeLoad.call(_78f,_791)==false){
return;
}
$(_78f).datagrid("loading");
var _792=opts.loader.call(_78f,_791,function(data){
$(_78f).datagrid("loaded");
$(_78f).datagrid("loadData",data);
if(cb){
cb();
}
},function(){
$(_78f).datagrid("loaded");
opts.onLoadError.apply(_78f,arguments);
});
if(_792==false){
$(_78f).datagrid("loaded");
}
};
function _793(_794,_795){
var opts=$.data(_794,"datagrid").options;
_795.type=_795.type||"body";
_795.rowspan=_795.rowspan||1;
_795.colspan=_795.colspan||1;
if(_795.rowspan==1&&_795.colspan==1){
return;
}
var tr=opts.finder.getTr(_794,(_795.index!=undefined?_795.index:_795.id),_795.type);
if(!tr.length){
return;
}
var td=tr.find("td[field=\""+_795.field+"\"]");
td.attr("rowspan",_795.rowspan).attr("colspan",_795.colspan);
td.addClass("datagrid-td-merged");
_796(td.next(),_795.colspan-1);
for(var i=1;i<_795.rowspan;i++){
tr=tr.next();
if(!tr.length){
break;
}
_796(tr.find("td[field=\""+_795.field+"\"]"),_795.colspan);
}
_6de(_794,td);
function _796(td,_797){
for(var i=0;i<_797;i++){
td.hide();
td=td.next();
}
};
};
$.fn.datagrid=function(_798,_799){
if(typeof _798=="string"){
return $.fn.datagrid.methods[_798](this,_799);
}
_798=_798||{};
return this.each(function(){
var _79a=$.data(this,"datagrid");
var opts;
if(_79a){
opts=$.extend(_79a.options,_798);
_79a.options=opts;
}else{
opts=$.extend({},$.extend({},$.fn.datagrid.defaults,{queryParams:{}}),$.fn.datagrid.parseOptions(this),_798);
$(this).css("width","").css("height","");
var _79b=_654(this,opts.rownumbers);
if(!opts.columns){
opts.columns=_79b.columns;
}
if(!opts.frozenColumns){
opts.frozenColumns=_79b.frozenColumns;
}
opts.columns=$.extend(true,[],opts.columns);
opts.frozenColumns=$.extend(true,[],opts.frozenColumns);
opts.view=$.extend({},opts.view);
$.data(this,"datagrid",{options:opts,panel:_79b.panel,dc:_79b.dc,ss:null,selectedRows:[],checkedRows:[],data:{total:0,rows:[]},originalRows:[],updatedRows:[],insertedRows:[],deletedRows:[]});
}
_65d(this);
_673(this);
_62a(this);
if(opts.data){
$(this).datagrid("loadData",opts.data);
}else{
var data=$.fn.datagrid.parseData(this);
if(data.total>0){
$(this).datagrid("loadData",data);
}else{
opts.view.renderEmptyRow(this);
$(this).datagrid("autoSizeColumn");
}
}
_6ae(this);
});
};
function _79c(_79d){
var _79e={};
$.map(_79d,function(name){
_79e[name]=_79f(name);
});
return _79e;
function _79f(name){
function isA(_7a0){
return $.data($(_7a0)[0],name)!=undefined;
};
return {init:function(_7a1,_7a2){
var _7a3=$("<input type=\"text\" class=\"datagrid-editable-input\">").appendTo(_7a1);
if(_7a3[name]&&name!="text"){
return _7a3[name](_7a2);
}else{
return _7a3;
}
},destroy:function(_7a4){
if(isA(_7a4,name)){
$(_7a4)[name]("destroy");
}
},getValue:function(_7a5){
if(isA(_7a5,name)){
var opts=$(_7a5)[name]("options");
if(opts.multiple){
return $(_7a5)[name]("getValues").join(opts.separator);
}else{
return $(_7a5)[name]("getValue");
}
}else{
return $(_7a5).val();
}
},setValue:function(_7a6,_7a7){
if(isA(_7a6,name)){
var opts=$(_7a6)[name]("options");
if(opts.multiple){
if(_7a7){
$(_7a6)[name]("setValues",_7a7.split(opts.separator));
}else{
$(_7a6)[name]("clear");
}
}else{
$(_7a6)[name]("setValue",_7a7);
}
}else{
$(_7a6).val(_7a7);
}
},resize:function(_7a8,_7a9){
if(isA(_7a8,name)){
$(_7a8)[name]("resize",_7a9);
}else{
$(_7a8)._outerWidth(_7a9)._outerHeight(24);
}
}};
};
};
var _7aa=$.extend({},_79c(["text","textbox","numberbox","numberspinner","combobox","combotree","combogrid","datebox","datetimebox","timespinner","datetimespinner"]),{textarea:{init:function(_7ab,_7ac){
var _7ad=$("<textarea class=\"datagrid-editable-input\"></textarea>").appendTo(_7ab);
_7ad.css("vertical-align","middle")._outerHeight(_7ac.height);
return _7ad;
},getValue:function(_7ae){
return $(_7ae).val();
},setValue:function(_7af,_7b0){
$(_7af).val(_7b0);
},resize:function(_7b1,_7b2){
$(_7b1)._outerWidth(_7b2);
}},checkbox:{init:function(_7b3,_7b4){
var _7b5=$("<input type=\"checkbox\">").appendTo(_7b3);
_7b5.val(_7b4.on);
_7b5.attr("offval",_7b4.off);
return _7b5;
},getValue:function(_7b6){
if($(_7b6).is(":checked")){
return $(_7b6).val();
}else{
return $(_7b6).attr("offval");
}
},setValue:function(_7b7,_7b8){
var _7b9=false;
if($(_7b7).val()==_7b8){
_7b9=true;
}
$(_7b7)._propAttr("checked",_7b9);
}},validatebox:{init:function(_7ba,_7bb){
var _7bc=$("<input type=\"text\" class=\"datagrid-editable-input\">").appendTo(_7ba);
_7bc.validatebox(_7bb);
return _7bc;
},destroy:function(_7bd){
$(_7bd).validatebox("destroy");
},getValue:function(_7be){
return $(_7be).val();
},setValue:function(_7bf,_7c0){
$(_7bf).val(_7c0);
},resize:function(_7c1,_7c2){
$(_7c1)._outerWidth(_7c2)._outerHeight(22);
}}});
$.fn.datagrid.methods={options:function(jq){
var _7c3=$.data(jq[0],"datagrid").options;
var _7c4=$.data(jq[0],"datagrid").panel.panel("options");
var opts=$.extend(_7c3,{width:_7c4.width,height:_7c4.height,closed:_7c4.closed,collapsed:_7c4.collapsed,minimized:_7c4.minimized,maximized:_7c4.maximized});
return opts;
},setSelectionState:function(jq){
return jq.each(function(){
_6fc(this);
});
},createStyleSheet:function(jq){
return _61b(jq[0]);
},getPanel:function(jq){
return $.data(jq[0],"datagrid").panel;
},getPager:function(jq){
return $.data(jq[0],"datagrid").panel.children("div.datagrid-pager");
},getColumnFields:function(jq,_7c5){
return _671(jq[0],_7c5);
},getColumnOption:function(jq,_7c6){
return _672(jq[0],_7c6);
},resize:function(jq,_7c7){
return jq.each(function(){
_62a(this,_7c7);
});
},load:function(jq,_7c8){
return jq.each(function(){
var opts=$(this).datagrid("options");
if(typeof _7c8=="string"){
opts.url=_7c8;
_7c8=null;
}
opts.pageNumber=1;
var _7c9=$(this).datagrid("getPager");
_7c9.pagination("refresh",{pageNumber:1});
_6ae(this,_7c8);
});
},reload:function(jq,_7ca){
return jq.each(function(){
var opts=$(this).datagrid("options");
if(typeof _7ca=="string"){
opts.url=_7ca;
_7ca=null;
}
_6ae(this,_7ca);
});
},reloadFooter:function(jq,_7cb){
return jq.each(function(){
var opts=$.data(this,"datagrid").options;
var dc=$.data(this,"datagrid").dc;
if(_7cb){
$.data(this,"datagrid").footer=_7cb;
}
if(opts.showFooter){
opts.view.renderFooter.call(opts.view,this,dc.footer2,false);
opts.view.renderFooter.call(opts.view,this,dc.footer1,true);
if(opts.view.onAfterRender){
opts.view.onAfterRender.call(opts.view,this);
}
$(this).datagrid("fixRowHeight");
}
});
},loading:function(jq){
return jq.each(function(){
var opts=$.data(this,"datagrid").options;
$(this).datagrid("getPager").pagination("loading");
if(opts.loadMsg){
var _7cc=$(this).datagrid("getPanel");
if(!_7cc.children("div.datagrid-mask").length){
$("<div class=\"datagrid-mask\" style=\"display:block\"></div>").appendTo(_7cc);
var msg=$("<div class=\"datagrid-mask-msg\" style=\"display:block;left:50%\"></div>").html(opts.loadMsg).appendTo(_7cc);
msg._outerHeight(40);
msg.css({marginLeft:(-msg.outerWidth()/2),lineHeight:(msg.height()+"px")});
}
}
});
},loaded:function(jq){
return jq.each(function(){
$(this).datagrid("getPager").pagination("loaded");
var _7cd=$(this).datagrid("getPanel");
_7cd.children("div.datagrid-mask-msg").remove();
_7cd.children("div.datagrid-mask").remove();
});
},fitColumns:function(jq){
return jq.each(function(){
_6bb(this);
});
},fixColumnSize:function(jq,_7ce){
return jq.each(function(){
_6d9(this,_7ce);
});
},fixRowHeight:function(jq,_7cf){
return jq.each(function(){
_640(this,_7cf);
});
},freezeRow:function(jq,_7d0){
return jq.each(function(){
_64d(this,_7d0);
});
},autoSizeColumn:function(jq,_7d1){
return jq.each(function(){
_6cd(this,_7d1);
});
},loadData:function(jq,data){
return jq.each(function(){
_6af(this,data);
_77b(this);
});
},getData:function(jq){
return $.data(jq[0],"datagrid").data;
},getRows:function(jq){
return $.data(jq[0],"datagrid").data.rows;
},getFooterRows:function(jq){
return $.data(jq[0],"datagrid").footer;
},getRowIndex:function(jq,id){
return _704(jq[0],id);
},getChecked:function(jq){
return _70a(jq[0]);
},getSelected:function(jq){
var rows=_707(jq[0]);
return rows.length>0?rows[0]:null;
},getSelections:function(jq){
return _707(jq[0]);
},clearSelections:function(jq){
return jq.each(function(){
var _7d2=$.data(this,"datagrid");
var _7d3=_7d2.selectedRows;
var _7d4=_7d2.checkedRows;
_7d3.splice(0,_7d3.length);
_71b(this);
if(_7d2.options.checkOnSelect){
_7d4.splice(0,_7d4.length);
}
});
},clearChecked:function(jq){
return jq.each(function(){
var _7d5=$.data(this,"datagrid");
var _7d6=_7d5.selectedRows;
var _7d7=_7d5.checkedRows;
_7d7.splice(0,_7d7.length);
_684(this);
if(_7d5.options.selectOnCheck){
_7d6.splice(0,_7d6.length);
}
});
},scrollTo:function(jq,_7d8){
return jq.each(function(){
_70d(this,_7d8);
});
},highlightRow:function(jq,_7d9){
return jq.each(function(){
_691(this,_7d9);
_70d(this,_7d9);
});
},selectAll:function(jq){
return jq.each(function(){
_720(this);
});
},unselectAll:function(jq){
return jq.each(function(){
_71b(this);
});
},selectRow:function(jq,_7da){
return jq.each(function(){
_698(this,_7da);
});
},selectRecord:function(jq,id){
return jq.each(function(){
var opts=$.data(this,"datagrid").options;
if(opts.idField){
var _7db=_704(this,id);
if(_7db>=0){
$(this).datagrid("selectRow",_7db);
}
}
});
},unselectRow:function(jq,_7dc){
return jq.each(function(){
_699(this,_7dc);
});
},checkRow:function(jq,_7dd){
return jq.each(function(){
_695(this,_7dd);
});
},uncheckRow:function(jq,_7de){
return jq.each(function(){
_696(this,_7de);
});
},checkAll:function(jq){
return jq.each(function(){
_683(this);
});
},uncheckAll:function(jq){
return jq.each(function(){
_684(this);
});
},beginEdit:function(jq,_7df){
return jq.each(function(){
_73a(this,_7df);
});
},endEdit:function(jq,_7e0){
return jq.each(function(){
_740(this,_7e0,false);
});
},cancelEdit:function(jq,_7e1){
return jq.each(function(){
_740(this,_7e1,true);
});
},getEditors:function(jq,_7e2){
return _74d(jq[0],_7e2);
},getEditor:function(jq,_7e3){
return _751(jq[0],_7e3);
},refreshRow:function(jq,_7e4){
return jq.each(function(){
var opts=$.data(this,"datagrid").options;
opts.view.refreshRow.call(opts.view,this,_7e4);
});
},validateRow:function(jq,_7e5){
return _73f(jq[0],_7e5);
},updateRow:function(jq,_7e6){
return jq.each(function(){
_775(this,_7e6);
});
},appendRow:function(jq,row){
return jq.each(function(){
_772(this,row);
});
},insertRow:function(jq,_7e7){
return jq.each(function(){
_76e(this,_7e7);
});
},deleteRow:function(jq,_7e8){
return jq.each(function(){
_768(this,_7e8);
});
},getChanges:function(jq,_7e9){
return _762(jq[0],_7e9);
},acceptChanges:function(jq){
return jq.each(function(){
_77f(this);
});
},rejectChanges:function(jq){
return jq.each(function(){
_781(this);
});
},mergeCells:function(jq,_7ea){
return jq.each(function(){
_793(this,_7ea);
});
},showColumn:function(jq,_7eb){
return jq.each(function(){
var col=$(this).datagrid("getColumnOption",_7eb);
if(col.hidden){
col.hidden=false;
$(this).datagrid("getPanel").find("td[field=\""+_7eb+"\"]").show();
_6b0(this,_7eb,1);
$(this).datagrid("fitColumns");
}
});
},hideColumn:function(jq,_7ec){
return jq.each(function(){
var col=$(this).datagrid("getColumnOption",_7ec);
if(!col.hidden){
col.hidden=true;
$(this).datagrid("getPanel").find("td[field=\""+_7ec+"\"]").hide();
_6b0(this,_7ec,-1);
$(this).datagrid("fitColumns");
}
});
},sort:function(jq,_7ed){
return jq.each(function(){
_685(this,_7ed);
});
},gotoPage:function(jq,_7ee){
return jq.each(function(){
var _7ef=this;
var page,cb;
if(typeof _7ee=="object"){
page=_7ee.page;
cb=_7ee.callback;
}else{
page=_7ee;
}
$(_7ef).datagrid("options").pageNumber=page;
$(_7ef).datagrid("getPager").pagination("refresh",{pageNumber:page});
_6ae(_7ef,null,function(){
if(cb){
cb.call(_7ef,page);
}
});
});
}};
$.fn.datagrid.parseOptions=function(_7f0){
var t=$(_7f0);
return $.extend({},$.fn.panel.parseOptions(_7f0),$.parser.parseOptions(_7f0,["url","toolbar","idField","sortName","sortOrder","pagePosition","resizeHandle",{sharedStyleSheet:"boolean",fitColumns:"boolean",autoRowHeight:"boolean",striped:"boolean",nowrap:"boolean"},{rownumbers:"boolean",singleSelect:"boolean",ctrlSelect:"boolean",checkOnSelect:"boolean",selectOnCheck:"boolean"},{pagination:"boolean",pageSize:"number",pageNumber:"number"},{multiSort:"boolean",remoteSort:"boolean",showHeader:"boolean",showFooter:"boolean"},{scrollbarSize:"number"}]),{pageList:(t.attr("pageList")?eval(t.attr("pageList")):undefined),loadMsg:(t.attr("loadMsg")!=undefined?t.attr("loadMsg"):undefined),rowStyler:(t.attr("rowStyler")?eval(t.attr("rowStyler")):undefined)});
};
$.fn.datagrid.parseData=function(_7f1){
var t=$(_7f1);
var data={total:0,rows:[]};
var _7f2=t.datagrid("getColumnFields",true).concat(t.datagrid("getColumnFields",false));
t.find("tbody tr").each(function(){
data.total++;
var row={};
$.extend(row,$.parser.parseOptions(this,["iconCls","state"]));
for(var i=0;i<_7f2.length;i++){
row[_7f2[i]]=$(this).find("td:eq("+i+")").html();
}
data.rows.push(row);
});
return data;
};
var _7f3={render:function(_7f4,_7f5,_7f6){
var rows=$(_7f4).datagrid("getRows");
$(_7f5).html(this.renderTable(_7f4,0,rows,_7f6));
},renderFooter:function(_7f7,_7f8,_7f9){
var opts=$.data(_7f7,"datagrid").options;
var rows=$.data(_7f7,"datagrid").footer||[];
var _7fa=$(_7f7).datagrid("getColumnFields",_7f9);
var _7fb=["<table class=\"datagrid-ftable\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>"];
for(var i=0;i<rows.length;i++){
_7fb.push("<tr class=\"datagrid-row\" datagrid-row-index=\""+i+"\">");
_7fb.push(this.renderRow.call(this,_7f7,_7fa,_7f9,i,rows[i]));
_7fb.push("</tr>");
}
_7fb.push("</tbody></table>");
$(_7f8).html(_7fb.join(""));
},renderTable:function(_7fc,_7fd,rows,_7fe){
var _7ff=$.data(_7fc,"datagrid");
var opts=_7ff.options;
if(_7fe){
if(!(opts.rownumbers||(opts.frozenColumns&&opts.frozenColumns.length))){
return "";
}
}
var _800=$(_7fc).datagrid("getColumnFields",_7fe);
var _801=["<table class=\"datagrid-btable\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>"];
for(var i=0;i<rows.length;i++){
var row=rows[i];
var css=opts.rowStyler?opts.rowStyler.call(_7fc,_7fd,row):"";
var cs=this.getStyleValue(css);
var cls="class=\"datagrid-row "+(_7fd%2&&opts.striped?"datagrid-row-alt ":" ")+cs.c+"\"";
var _802=cs.s?"style=\""+cs.s+"\"":"";
var _803=_7ff.rowIdPrefix+"-"+(_7fe?1:2)+"-"+_7fd;
_801.push("<tr id=\""+_803+"\" datagrid-row-index=\""+_7fd+"\" "+cls+" "+_802+">");
_801.push(this.renderRow.call(this,_7fc,_800,_7fe,_7fd,row));
_801.push("</tr>");
_7fd++;
}
_801.push("</tbody></table>");
return _801.join("");
},renderRow:function(_804,_805,_806,_807,_808){
var opts=$.data(_804,"datagrid").options;
var cc=[];
if(_806&&opts.rownumbers){
var _809=_807+1;
if(opts.pagination){
_809+=(opts.pageNumber-1)*opts.pageSize;
}
cc.push("<td class=\"datagrid-td-rownumber\"><div class=\"datagrid-cell-rownumber\">"+_809+"</div></td>");
}
for(var i=0;i<_805.length;i++){
var _80a=_805[i];
var col=$(_804).datagrid("getColumnOption",_80a);
if(col){
var _80b=_808[_80a];
var css=col.styler?(col.styler(_80b,_808,_807)||""):"";
var cs=this.getStyleValue(css);
var cls=cs.c?"class=\""+cs.c+"\"":"";
var _80c=col.hidden?"style=\"display:none;"+cs.s+"\"":(cs.s?"style=\""+cs.s+"\"":"");
cc.push("<td field=\""+_80a+"\" "+cls+" "+_80c+">");
var _80c="";
if(!col.checkbox){
if(col.align){
_80c+="text-align:"+col.align+";";
}
if(!opts.nowrap){
_80c+="white-space:normal;height:auto;";
}else{
if(opts.autoRowHeight){
_80c+="height:auto;";
}
}
}
cc.push("<div style=\""+_80c+"\" ");
cc.push(col.checkbox?"class=\"datagrid-cell-check\"":"class=\"datagrid-cell "+col.cellClass+"\"");
cc.push(">");
if(col.checkbox){
cc.push("<input type=\"checkbox\" "+(_808.checked?"checked=\"checked\"":""));
cc.push(" name=\""+_80a+"\" value=\""+(_80b!=undefined?_80b:"")+"\">");
}else{
if(col.formatter){
cc.push(col.formatter(_80b,_808,_807));
}else{
cc.push(_80b);
}
}
cc.push("</div>");
cc.push("</td>");
}
}
return cc.join("");
},getStyleValue:function(css){
var _80d="";
var _80e="";
if(typeof css=="string"){
_80e=css;
}else{
if(css){
_80d=css["class"]||"";
_80e=css["style"]||"";
}
}
return {c:_80d,s:_80e};
},refreshRow:function(_80f,_810){
this.updateRow.call(this,_80f,_810,{});
},updateRow:function(_811,_812,row){
var opts=$.data(_811,"datagrid").options;
var _813=opts.finder.getRow(_811,_812);
var _814=_815.call(this,_812);
$.extend(_813,row);
var _816=_815.call(this,_812);
var _817=_814.c;
var _818=_816.s;
var _819="datagrid-row "+(_812%2&&opts.striped?"datagrid-row-alt ":" ")+_816.c;
function _815(_81a){
var css=opts.rowStyler?opts.rowStyler.call(_811,_81a,_813):"";
return this.getStyleValue(css);
};
function _81b(_81c){
var _81d=$(_811).datagrid("getColumnFields",_81c);
var tr=opts.finder.getTr(_811,_812,"body",(_81c?1:2));
var _81e=tr.find("div.datagrid-cell-check input[type=checkbox]").is(":checked");
tr.html(this.renderRow.call(this,_811,_81d,_81c,_812,_813));
tr.attr("style",_818).removeClass(_817).addClass(_819);
if(_81e){
tr.find("div.datagrid-cell-check input[type=checkbox]")._propAttr("checked",true);
}
};
_81b.call(this,true);
_81b.call(this,false);
$(_811).datagrid("fixRowHeight",_812);
},insertRow:function(_81f,_820,row){
var _821=$.data(_81f,"datagrid");
var opts=_821.options;
var dc=_821.dc;
var data=_821.data;
if(_820==undefined||_820==null){
_820=data.rows.length;
}
if(_820>data.rows.length){
_820=data.rows.length;
}
function _822(_823){
var _824=_823?1:2;
for(var i=data.rows.length-1;i>=_820;i--){
var tr=opts.finder.getTr(_81f,i,"body",_824);
tr.attr("datagrid-row-index",i+1);
tr.attr("id",_821.rowIdPrefix+"-"+_824+"-"+(i+1));
if(_823&&opts.rownumbers){
var _825=i+2;
if(opts.pagination){
_825+=(opts.pageNumber-1)*opts.pageSize;
}
tr.find("div.datagrid-cell-rownumber").html(_825);
}
if(opts.striped){
tr.removeClass("datagrid-row-alt").addClass((i+1)%2?"datagrid-row-alt":"");
}
}
};
function _826(_827){
var _828=_827?1:2;
var _829=$(_81f).datagrid("getColumnFields",_827);
var _82a=_821.rowIdPrefix+"-"+_828+"-"+_820;
var tr="<tr id=\""+_82a+"\" class=\"datagrid-row\" datagrid-row-index=\""+_820+"\"></tr>";
if(_820>=data.rows.length){
if(data.rows.length){
opts.finder.getTr(_81f,"","last",_828).after(tr);
}else{
var cc=_827?dc.body1:dc.body2;
cc.html("<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>"+tr+"</tbody></table>");
}
}else{
opts.finder.getTr(_81f,_820+1,"body",_828).before(tr);
}
};
_822.call(this,true);
_822.call(this,false);
_826.call(this,true);
_826.call(this,false);
data.total+=1;
data.rows.splice(_820,0,row);
this.refreshRow.call(this,_81f,_820);
},deleteRow:function(_82b,_82c){
var _82d=$.data(_82b,"datagrid");
var opts=_82d.options;
var data=_82d.data;
function _82e(_82f){
var _830=_82f?1:2;
for(var i=_82c+1;i<data.rows.length;i++){
var tr=opts.finder.getTr(_82b,i,"body",_830);
tr.attr("datagrid-row-index",i-1);
tr.attr("id",_82d.rowIdPrefix+"-"+_830+"-"+(i-1));
if(_82f&&opts.rownumbers){
var _831=i;
if(opts.pagination){
_831+=(opts.pageNumber-1)*opts.pageSize;
}
tr.find("div.datagrid-cell-rownumber").html(_831);
}
if(opts.striped){
tr.removeClass("datagrid-row-alt").addClass((i-1)%2?"datagrid-row-alt":"");
}
}
};
opts.finder.getTr(_82b,_82c).remove();
_82e.call(this,true);
_82e.call(this,false);
data.total-=1;
data.rows.splice(_82c,1);
},onBeforeRender:function(_832,rows){
},onAfterRender:function(_833){
var _834=$.data(_833,"datagrid");
var opts=_834.options;
if(opts.showFooter){
var _835=$(_833).datagrid("getPanel").find("div.datagrid-footer");
_835.find("div.datagrid-cell-rownumber,div.datagrid-cell-check").css("visibility","hidden");
}
if(opts.finder.getRows(_833).length==0){
this.renderEmptyRow(_833);
}
},renderEmptyRow:function(_836){
var cols=$.map($(_836).datagrid("getColumnFields"),function(_837){
return $(_836).datagrid("getColumnOption",_837);
});
$.map(cols,function(col){
col.formatter1=col.formatter;
col.styler1=col.styler;
col.formatter=col.styler=undefined;
});
var _838=$.data(_836,"datagrid").dc.body2;
_838.html(this.renderTable(_836,0,[{}],false));
_838.find("tbody *").css({height:1,borderColor:"transparent",background:"transparent"});
var tr=_838.find(".datagrid-row");
tr.removeClass("datagrid-row").removeAttr("datagrid-row-index");
tr.find(".datagrid-cell,.datagrid-cell-check").empty();
$.map(cols,function(col){
col.formatter=col.formatter1;
col.styler=col.styler1;
col.formatter1=col.styler1=undefined;
});
}};
$.fn.datagrid.defaults=$.extend({},$.fn.panel.defaults,{sharedStyleSheet:false,frozenColumns:undefined,columns:undefined,fitColumns:false,resizeHandle:"right",autoRowHeight:true,toolbar:null,striped:false,method:"post",nowrap:true,idField:null,url:null,data:null,loadMsg:"Processing, please wait ...",rownumbers:false,singleSelect:false,ctrlSelect:false,selectOnCheck:true,checkOnSelect:true,pagination:false,pagePosition:"bottom",pageNumber:1,pageSize:10,pageList:[10,20,30,40,50],queryParams:{},sortName:null,sortOrder:"asc",multiSort:false,remoteSort:true,showHeader:true,showFooter:false,scrollbarSize:18,editorHeight:24,headerEvents:{mouseover:_67d(true),mouseout:_67d(false),click:_681,dblclick:_686,contextmenu:_689},rowEvents:{mouseover:_68b(true),mouseout:_68b(false),click:_692,dblclick:_69c,contextmenu:_6a0},rowStyler:function(_839,_83a){
},loader:function(_83b,_83c,_83d){
var opts=$(this).datagrid("options");
if(!opts.url){
return false;
}
$.ajax({type:opts.method,url:opts.url,data:_83b,dataType:"json",success:function(data){
_83c(data);
},error:function(){
_83d.apply(this,arguments);
}});
},loadFilter:function(data){
return data;
},editors:_7aa,finder:{getTr:function(_83e,_83f,type,_840){
type=type||"body";
_840=_840||0;
var _841=$.data(_83e,"datagrid");
var dc=_841.dc;
var opts=_841.options;
if(_840==0){
var tr1=opts.finder.getTr(_83e,_83f,type,1);
var tr2=opts.finder.getTr(_83e,_83f,type,2);
return tr1.add(tr2);
}else{
if(type=="body"){
var tr=$("#"+_841.rowIdPrefix+"-"+_840+"-"+_83f);
if(!tr.length){
tr=(_840==1?dc.body1:dc.body2).find(">table>tbody>tr[datagrid-row-index="+_83f+"]");
}
return tr;
}else{
if(type=="footer"){
return (_840==1?dc.footer1:dc.footer2).find(">table>tbody>tr[datagrid-row-index="+_83f+"]");
}else{
if(type=="selected"){
return (_840==1?dc.body1:dc.body2).find(">table>tbody>tr.datagrid-row-selected");
}else{
if(type=="highlight"){
return (_840==1?dc.body1:dc.body2).find(">table>tbody>tr.datagrid-row-over");
}else{
if(type=="checked"){
return (_840==1?dc.body1:dc.body2).find(">table>tbody>tr.datagrid-row-checked");
}else{
if(type=="editing"){
return (_840==1?dc.body1:dc.body2).find(">table>tbody>tr.datagrid-row-editing");
}else{
if(type=="last"){
return (_840==1?dc.body1:dc.body2).find(">table>tbody>tr[datagrid-row-index]:last");
}else{
if(type=="allbody"){
return (_840==1?dc.body1:dc.body2).find(">table>tbody>tr[datagrid-row-index]");
}else{
if(type=="allfooter"){
return (_840==1?dc.footer1:dc.footer2).find(">table>tbody>tr[datagrid-row-index]");
}
}
}
}
}
}
}
}
}
}
},getRow:function(_842,p){
var _843=(typeof p=="object")?p.attr("datagrid-row-index"):p;
return $.data(_842,"datagrid").data.rows[parseInt(_843)];
},getRows:function(_844){
return $(_844).datagrid("getRows");
}},view:_7f3,onBeforeLoad:function(_845){
},onLoadSuccess:function(){
},onLoadError:function(){
},onClickRow:function(_846,_847){
},onDblClickRow:function(_848,_849){
},onClickCell:function(_84a,_84b,_84c){
},onDblClickCell:function(_84d,_84e,_84f){
},onBeforeSortColumn:function(sort,_850){
},onSortColumn:function(sort,_851){
},onResizeColumn:function(_852,_853){
},onBeforeSelect:function(_854,_855){
},onSelect:function(_856,_857){
},onBeforeUnselect:function(_858,_859){
},onUnselect:function(_85a,_85b){
},onSelectAll:function(rows){
},onUnselectAll:function(rows){
},onBeforeCheck:function(_85c,_85d){
},onCheck:function(_85e,_85f){
},onBeforeUncheck:function(_860,_861){
},onUncheck:function(_862,_863){
},onCheckAll:function(rows){
},onUncheckAll:function(rows){
},onBeforeEdit:function(_864,_865){
},onBeginEdit:function(_866,_867){
},onEndEdit:function(_868,_869,_86a){
},onAfterEdit:function(_86b,_86c,_86d){
},onCancelEdit:function(_86e,_86f){
},onHeaderContextMenu:function(e,_870){
},onRowContextMenu:function(e,_871,_872){
}});
})(jQuery);
(function($){
var _873;
$(document).unbind(".propertygrid").bind("mousedown.propertygrid",function(e){
var p=$(e.target).closest("div.datagrid-view,div.combo-panel");
if(p.length){
return;
}
_874(_873);
_873=undefined;
});
function _875(_876){
var _877=$.data(_876,"propertygrid");
var opts=$.data(_876,"propertygrid").options;
$(_876).datagrid($.extend({},opts,{cls:"propertygrid",view:(opts.showGroup?opts.groupView:opts.view),onBeforeEdit:function(_878,row){
if(opts.onBeforeEdit.call(_876,_878,row)==false){
return false;
}
var dg=$(this);
var row=dg.datagrid("getRows")[_878];
var col=dg.datagrid("getColumnOption","value");
col.editor=row.editor;
},onClickCell:function(_879,_87a,_87b){
if(_873!=this){
_874(_873);
_873=this;
}
if(opts.editIndex!=_879){
_874(_873);
$(this).datagrid("beginEdit",_879);
var ed=$(this).datagrid("getEditor",{index:_879,field:_87a});
if(!ed){
ed=$(this).datagrid("getEditor",{index:_879,field:"value"});
}
if(ed){
var t=$(ed.target);
var _87c=t.data("textbox")?t.textbox("textbox"):t;
_87c.focus();
opts.editIndex=_879;
}
}
opts.onClickCell.call(_876,_879,_87a,_87b);
},loadFilter:function(data){
_874(this);
return opts.loadFilter.call(this,data);
}}));
};
function _874(_87d){
var t=$(_87d);
if(!t.length){
return;
}
var opts=$.data(_87d,"propertygrid").options;
opts.finder.getTr(_87d,null,"editing").each(function(){
var _87e=parseInt($(this).attr("datagrid-row-index"));
if(t.datagrid("validateRow",_87e)){
t.datagrid("endEdit",_87e);
}else{
t.datagrid("cancelEdit",_87e);
}
});
opts.editIndex=undefined;
};
$.fn.propertygrid=function(_87f,_880){
if(typeof _87f=="string"){
var _881=$.fn.propertygrid.methods[_87f];
if(_881){
return _881(this,_880);
}else{
return this.datagrid(_87f,_880);
}
}
_87f=_87f||{};
return this.each(function(){
var _882=$.data(this,"propertygrid");
if(_882){
$.extend(_882.options,_87f);
}else{
var opts=$.extend({},$.fn.propertygrid.defaults,$.fn.propertygrid.parseOptions(this),_87f);
opts.frozenColumns=$.extend(true,[],opts.frozenColumns);
opts.columns=$.extend(true,[],opts.columns);
$.data(this,"propertygrid",{options:opts});
}
_875(this);
});
};
$.fn.propertygrid.methods={options:function(jq){
return $.data(jq[0],"propertygrid").options;
}};
$.fn.propertygrid.parseOptions=function(_883){
return $.extend({},$.fn.datagrid.parseOptions(_883),$.parser.parseOptions(_883,[{showGroup:"boolean"}]));
};
var _884=$.extend({},$.fn.datagrid.defaults.view,{render:function(_885,_886,_887){
var _888=[];
var _889=this.groups;
for(var i=0;i<_889.length;i++){
_888.push(this.renderGroup.call(this,_885,i,_889[i],_887));
}
$(_886).html(_888.join(""));
},renderGroup:function(_88a,_88b,_88c,_88d){
var _88e=$.data(_88a,"datagrid");
var opts=_88e.options;
var _88f=$(_88a).datagrid("getColumnFields",_88d);
var _890=[];
_890.push("<div class=\"datagrid-group\" group-index="+_88b+">");
if((_88d&&(opts.rownumbers||opts.frozenColumns.length))||(!_88d&&!(opts.rownumbers||opts.frozenColumns.length))){
_890.push("<span class=\"datagrid-group-expander\">");
_890.push("<span class=\"datagrid-row-expander datagrid-row-collapse\">&nbsp;</span>");
_890.push("</span>");
}
if(!_88d){
_890.push("<span class=\"datagrid-group-title\">");
_890.push(opts.groupFormatter.call(_88a,_88c.value,_88c.rows));
_890.push("</span>");
}
_890.push("</div>");
_890.push("<table class=\"datagrid-btable\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>");
var _891=_88c.startIndex;
for(var j=0;j<_88c.rows.length;j++){
var css=opts.rowStyler?opts.rowStyler.call(_88a,_891,_88c.rows[j]):"";
var _892="";
var _893="";
if(typeof css=="string"){
_893=css;
}else{
if(css){
_892=css["class"]||"";
_893=css["style"]||"";
}
}
var cls="class=\"datagrid-row "+(_891%2&&opts.striped?"datagrid-row-alt ":" ")+_892+"\"";
var _894=_893?"style=\""+_893+"\"":"";
var _895=_88e.rowIdPrefix+"-"+(_88d?1:2)+"-"+_891;
_890.push("<tr id=\""+_895+"\" datagrid-row-index=\""+_891+"\" "+cls+" "+_894+">");
_890.push(this.renderRow.call(this,_88a,_88f,_88d,_891,_88c.rows[j]));
_890.push("</tr>");
_891++;
}
_890.push("</tbody></table>");
return _890.join("");
},bindEvents:function(_896){
var _897=$.data(_896,"datagrid");
var dc=_897.dc;
var body=dc.body1.add(dc.body2);
var _898=($.data(body[0],"events")||$._data(body[0],"events")).click[0].handler;
body.unbind("click").bind("click",function(e){
var tt=$(e.target);
var _899=tt.closest("span.datagrid-row-expander");
if(_899.length){
var _89a=_899.closest("div.datagrid-group").attr("group-index");
if(_899.hasClass("datagrid-row-collapse")){
$(_896).datagrid("collapseGroup",_89a);
}else{
$(_896).datagrid("expandGroup",_89a);
}
}else{
_898(e);
}
e.stopPropagation();
});
},onBeforeRender:function(_89b,rows){
var _89c=$.data(_89b,"datagrid");
var opts=_89c.options;
_89d();
var _89e=[];
for(var i=0;i<rows.length;i++){
var row=rows[i];
var _89f=_8a0(row[opts.groupField]);
if(!_89f){
_89f={value:row[opts.groupField],rows:[row]};
_89e.push(_89f);
}else{
_89f.rows.push(row);
}
}
var _8a1=0;
var _8a2=[];
for(var i=0;i<_89e.length;i++){
var _89f=_89e[i];
_89f.startIndex=_8a1;
_8a1+=_89f.rows.length;
_8a2=_8a2.concat(_89f.rows);
}
_89c.data.rows=_8a2;
this.groups=_89e;
var that=this;
setTimeout(function(){
that.bindEvents(_89b);
},0);
function _8a0(_8a3){
for(var i=0;i<_89e.length;i++){
var _8a4=_89e[i];
if(_8a4.value==_8a3){
return _8a4;
}
}
return null;
};
function _89d(){
if(!$("#datagrid-group-style").length){
$("head").append("<style id=\"datagrid-group-style\">"+".datagrid-group{height:"+opts.groupHeight+"px;overflow:hidden;font-weight:bold;border-bottom:1px solid #ccc;}"+".datagrid-group-title,.datagrid-group-expander{display:inline-block;vertical-align:bottom;height:100%;line-height:"+opts.groupHeight+"px;padding:0 4px;}"+".datagrid-group-expander{width:"+opts.expanderWidth+"px;text-align:center;padding:0}"+".datagrid-row-expander{margin:"+Math.floor((opts.groupHeight-16)/2)+"px 0;display:inline-block;width:16px;height:16px;cursor:pointer}"+"</style>");
}
};
}});
$.extend($.fn.datagrid.methods,{groups:function(jq){
return jq.datagrid("options").view.groups;
},expandGroup:function(jq,_8a5){
return jq.each(function(){
var view=$.data(this,"datagrid").dc.view;
var _8a6=view.find(_8a5!=undefined?"div.datagrid-group[group-index=\""+_8a5+"\"]":"div.datagrid-group");
var _8a7=_8a6.find("span.datagrid-row-expander");
if(_8a7.hasClass("datagrid-row-expand")){
_8a7.removeClass("datagrid-row-expand").addClass("datagrid-row-collapse");
_8a6.next("table").show();
}
$(this).datagrid("fixRowHeight");
});
},collapseGroup:function(jq,_8a8){
return jq.each(function(){
var view=$.data(this,"datagrid").dc.view;
var _8a9=view.find(_8a8!=undefined?"div.datagrid-group[group-index=\""+_8a8+"\"]":"div.datagrid-group");
var _8aa=_8a9.find("span.datagrid-row-expander");
if(_8aa.hasClass("datagrid-row-collapse")){
_8aa.removeClass("datagrid-row-collapse").addClass("datagrid-row-expand");
_8a9.next("table").hide();
}
$(this).datagrid("fixRowHeight");
});
}});
$.extend(_884,{refreshGroupTitle:function(_8ab,_8ac){
var _8ad=$.data(_8ab,"datagrid");
var opts=_8ad.options;
var dc=_8ad.dc;
var _8ae=this.groups[_8ac];
var span=dc.body2.children("div.datagrid-group[group-index="+_8ac+"]").find("span.datagrid-group-title");
span.html(opts.groupFormatter.call(_8ab,_8ae.value,_8ae.rows));
},insertRow:function(_8af,_8b0,row){
var _8b1=$.data(_8af,"datagrid");
var opts=_8b1.options;
var dc=_8b1.dc;
var _8b2=null;
var _8b3;
if(!_8b1.data.rows.length){
$(_8af).datagrid("loadData",[row]);
return;
}
for(var i=0;i<this.groups.length;i++){
if(this.groups[i].value==row[opts.groupField]){
_8b2=this.groups[i];
_8b3=i;
break;
}
}
if(_8b2){
if(_8b0==undefined||_8b0==null){
_8b0=_8b1.data.rows.length;
}
if(_8b0<_8b2.startIndex){
_8b0=_8b2.startIndex;
}else{
if(_8b0>_8b2.startIndex+_8b2.rows.length){
_8b0=_8b2.startIndex+_8b2.rows.length;
}
}
$.fn.datagrid.defaults.view.insertRow.call(this,_8af,_8b0,row);
if(_8b0>=_8b2.startIndex+_8b2.rows.length){
_8b4(_8b0,true);
_8b4(_8b0,false);
}
_8b2.rows.splice(_8b0-_8b2.startIndex,0,row);
}else{
_8b2={value:row[opts.groupField],rows:[row],startIndex:_8b1.data.rows.length};
_8b3=this.groups.length;
dc.body1.append(this.renderGroup.call(this,_8af,_8b3,_8b2,true));
dc.body2.append(this.renderGroup.call(this,_8af,_8b3,_8b2,false));
this.groups.push(_8b2);
_8b1.data.rows.push(row);
}
this.refreshGroupTitle(_8af,_8b3);
function _8b4(_8b5,_8b6){
var _8b7=_8b6?1:2;
var _8b8=opts.finder.getTr(_8af,_8b5-1,"body",_8b7);
var tr=opts.finder.getTr(_8af,_8b5,"body",_8b7);
tr.insertAfter(_8b8);
};
},updateRow:function(_8b9,_8ba,row){
var opts=$.data(_8b9,"datagrid").options;
$.fn.datagrid.defaults.view.updateRow.call(this,_8b9,_8ba,row);
var tb=opts.finder.getTr(_8b9,_8ba,"body",2).closest("table.datagrid-btable");
var _8bb=parseInt(tb.prev().attr("group-index"));
this.refreshGroupTitle(_8b9,_8bb);
},deleteRow:function(_8bc,_8bd){
var _8be=$.data(_8bc,"datagrid");
var opts=_8be.options;
var dc=_8be.dc;
var body=dc.body1.add(dc.body2);
var tb=opts.finder.getTr(_8bc,_8bd,"body",2).closest("table.datagrid-btable");
var _8bf=parseInt(tb.prev().attr("group-index"));
$.fn.datagrid.defaults.view.deleteRow.call(this,_8bc,_8bd);
var _8c0=this.groups[_8bf];
if(_8c0.rows.length>1){
_8c0.rows.splice(_8bd-_8c0.startIndex,1);
this.refreshGroupTitle(_8bc,_8bf);
}else{
body.children("div.datagrid-group[group-index="+_8bf+"]").remove();
for(var i=_8bf+1;i<this.groups.length;i++){
body.children("div.datagrid-group[group-index="+i+"]").attr("group-index",i-1);
}
this.groups.splice(_8bf,1);
}
var _8bd=0;
for(var i=0;i<this.groups.length;i++){
var _8c0=this.groups[i];
_8c0.startIndex=_8bd;
_8bd+=_8c0.rows.length;
}
}});
$.fn.propertygrid.defaults=$.extend({},$.fn.datagrid.defaults,{groupHeight:21,expanderWidth:16,singleSelect:true,remoteSort:false,fitColumns:true,loadMsg:"",frozenColumns:[[{field:"f",width:16,resizable:false}]],columns:[[{field:"name",title:"Name",width:100,sortable:true},{field:"value",title:"Value",width:100,resizable:false}]],showGroup:false,groupView:_884,groupField:"group",groupFormatter:function(_8c1,rows){
return _8c1;
}});
})(jQuery);
(function($){
function _8c2(_8c3){
var _8c4=$.data(_8c3,"treegrid");
var opts=_8c4.options;
$(_8c3).datagrid($.extend({},opts,{url:null,data:null,loader:function(){
return false;
},onBeforeLoad:function(){
return false;
},onLoadSuccess:function(){
},onResizeColumn:function(_8c5,_8c6){
_8d3(_8c3);
opts.onResizeColumn.call(_8c3,_8c5,_8c6);
},onBeforeSortColumn:function(sort,_8c7){
if(opts.onBeforeSortColumn.call(_8c3,sort,_8c7)==false){
return false;
}
},onSortColumn:function(sort,_8c8){
opts.sortName=sort;
opts.sortOrder=_8c8;
if(opts.remoteSort){
_8d2(_8c3);
}else{
var data=$(_8c3).treegrid("getData");
_8ff(_8c3,null,data);
}
opts.onSortColumn.call(_8c3,sort,_8c8);
},onClickCell:function(_8c9,_8ca){
opts.onClickCell.call(_8c3,_8ca,find(_8c3,_8c9));
},onDblClickCell:function(_8cb,_8cc){
opts.onDblClickCell.call(_8c3,_8cc,find(_8c3,_8cb));
},onRowContextMenu:function(e,_8cd){
opts.onContextMenu.call(_8c3,e,find(_8c3,_8cd));
}}));
var _8ce=$.data(_8c3,"datagrid").options;
opts.columns=_8ce.columns;
opts.frozenColumns=_8ce.frozenColumns;
_8c4.dc=$.data(_8c3,"datagrid").dc;
if(opts.pagination){
var _8cf=$(_8c3).datagrid("getPager");
_8cf.pagination({pageNumber:opts.pageNumber,pageSize:opts.pageSize,pageList:opts.pageList,onSelectPage:function(_8d0,_8d1){
opts.pageNumber=_8d0;
opts.pageSize=_8d1;
_8d2(_8c3);
}});
opts.pageSize=_8cf.pagination("options").pageSize;
}
};
function _8d3(_8d4,_8d5){
var opts=$.data(_8d4,"datagrid").options;
var dc=$.data(_8d4,"datagrid").dc;
if(!dc.body1.is(":empty")&&(!opts.nowrap||opts.autoRowHeight)){
if(_8d5!=undefined){
var _8d6=_8d7(_8d4,_8d5);
for(var i=0;i<_8d6.length;i++){
_8d8(_8d6[i][opts.idField]);
}
}
}
$(_8d4).datagrid("fixRowHeight",_8d5);
function _8d8(_8d9){
var tr1=opts.finder.getTr(_8d4,_8d9,"body",1);
var tr2=opts.finder.getTr(_8d4,_8d9,"body",2);
tr1.css("height","");
tr2.css("height","");
var _8da=Math.max(tr1.height(),tr2.height());
tr1.css("height",_8da);
tr2.css("height",_8da);
};
};
function _8db(_8dc){
var dc=$.data(_8dc,"datagrid").dc;
var opts=$.data(_8dc,"treegrid").options;
if(!opts.rownumbers){
return;
}
dc.body1.find("div.datagrid-cell-rownumber").each(function(i){
$(this).html(i+1);
});
};
function _8dd(_8de){
return function(e){
$.fn.datagrid.defaults.rowEvents[_8de?"mouseover":"mouseout"](e);
var tt=$(e.target);
var fn=_8de?"addClass":"removeClass";
if(tt.hasClass("tree-hit")){
tt.hasClass("tree-expanded")?tt[fn]("tree-expanded-hover"):tt[fn]("tree-collapsed-hover");
}
};
};
function _8df(e){
var tt=$(e.target);
if(tt.hasClass("tree-hit")){
_8e0(_8e1);
}else{
if(tt.hasClass("tree-checkbox")){
_8e0(_8e2);
}else{
$.fn.datagrid.defaults.rowEvents.click(e);
}
}
function _8e0(fn){
var tr=tt.closest("tr.datagrid-row");
var _8e3=tr.closest("div.datagrid-view").children(".datagrid-f")[0];
fn(_8e3,tr.attr("node-id"));
};
};
function _8e2(_8e4,_8e5,_8e6,_8e7){
var _8e8=$.data(_8e4,"treegrid");
var _8e9=_8e8.checkedRows;
var opts=_8e8.options;
if(!opts.checkbox){
return;
}
var row=find(_8e4,_8e5);
if(!row.checkState){
return;
}
var tr=opts.finder.getTr(_8e4,_8e5);
var ck=tr.find(".tree-checkbox");
if(_8e6==undefined){
if(ck.hasClass("tree-checkbox1")){
_8e6=false;
}else{
if(ck.hasClass("tree-checkbox0")){
_8e6=true;
}else{
if(row._checked==undefined){
row._checked=ck.hasClass("tree-checkbox1");
}
_8e6=!row._checked;
}
}
}
row._checked=_8e6;
if(_8e6){
if(ck.hasClass("tree-checkbox1")){
return;
}
}else{
if(ck.hasClass("tree-checkbox0")){
return;
}
}
if(!_8e7){
if(opts.onBeforeCheckNode.call(_8e4,row,_8e6)==false){
return;
}
}
if(opts.cascadeCheck){
_8ea(_8e4,row,_8e6);
_8eb(_8e4,row);
}else{
_8ec(_8e4,row,_8e6?"1":"0");
}
if(!_8e7){
opts.onCheckNode.call(_8e4,row,_8e6);
}
};
function _8ec(_8ed,row,flag){
var _8ee=$.data(_8ed,"treegrid");
var _8ef=_8ee.checkedRows;
var opts=_8ee.options;
if(!row.checkState||flag==undefined){
return;
}
var tr=opts.finder.getTr(_8ed,row[opts.idField]);
var ck=tr.find(".tree-checkbox");
if(!ck.length){
return;
}
row.checkState=["unchecked","checked","indeterminate"][flag];
row.checked=(row.checkState=="checked");
ck.removeClass("tree-checkbox0 tree-checkbox1 tree-checkbox2");
ck.addClass("tree-checkbox"+flag);
if(flag==0){
$.extjsui.removeArrayItem(_8ef,opts.idField,row[opts.idField]);
}else{
$.extjsui.addArrayItem(_8ef,opts.idField,row);
}
};
function _8ea(_8f0,row,_8f1){
var flag=_8f1?1:0;
_8ec(_8f0,row,flag);
$.extjsui.forEach(row.children||[],true,function(r){
_8ec(_8f0,r,flag);
});
};
function _8eb(_8f2,row){
var opts=$.data(_8f2,"treegrid").options;
var prow=_8f3(_8f2,row[opts.idField]);
if(prow){
_8ec(_8f2,prow,_8f4(prow));
_8eb(_8f2,prow);
}
};
function _8f4(row){
var len=0;
var c0=0;
var c1=0;
$.extjsui.forEach(row.children||[],false,function(r){
if(r.checkState){
len++;
if(r.checkState=="checked"){
c1++;
}else{
if(r.checkState=="unchecked"){
c0++;
}
}
}
});
if(len==0){
return undefined;
}
var flag=0;
if(c0==len){
flag=0;
}else{
if(c1==len){
flag=1;
}else{
flag=2;
}
}
return flag;
};
function _8f5(_8f6,_8f7){
var opts=$.data(_8f6,"treegrid").options;
if(!opts.checkbox){
return;
}
var row=find(_8f6,_8f7);
var tr=opts.finder.getTr(_8f6,_8f7);
var ck=tr.find(".tree-checkbox");
if(opts.view.hasCheckbox(_8f6,row)){
if(!ck.length){
row.checkState=row.checkState||"unchecked";
$("<span class=\"tree-checkbox\"></span>").insertBefore(tr.find(".tree-title"));
}
if(row.checkState=="checked"){
_8e2(_8f6,_8f7,true,true);
}else{
if(row.checkState=="unchecked"){
_8e2(_8f6,_8f7,false,true);
}else{
var flag=_8f4(row);
if(flag===0){
_8e2(_8f6,_8f7,false,true);
}else{
if(flag===1){
_8e2(_8f6,_8f7,true,true);
}
}
}
}
}else{
ck.remove();
row.checkState=undefined;
row.checked=undefined;
_8eb(_8f6,row);
}
};
function _8f8(_8f9,_8fa){
var opts=$.data(_8f9,"treegrid").options;
var tr1=opts.finder.getTr(_8f9,_8fa,"body",1);
var tr2=opts.finder.getTr(_8f9,_8fa,"body",2);
var _8fb=$(_8f9).datagrid("getColumnFields",true).length+(opts.rownumbers?1:0);
var _8fc=$(_8f9).datagrid("getColumnFields",false).length;
_8fd(tr1,_8fb);
_8fd(tr2,_8fc);
function _8fd(tr,_8fe){
$("<tr class=\"treegrid-tr-tree\">"+"<td style=\"border:0px\" colspan=\""+_8fe+"\">"+"<div></div>"+"</td>"+"</tr>").insertAfter(tr);
};
};
function _8ff(_900,_901,data,_902,_903){
var _904=$.data(_900,"treegrid");
var opts=_904.options;
var dc=_904.dc;
data=opts.loadFilter.call(_900,data,_901);
var node=find(_900,_901);
if(node){
var _905=opts.finder.getTr(_900,_901,"body",1);
var _906=opts.finder.getTr(_900,_901,"body",2);
var cc1=_905.next("tr.treegrid-tr-tree").children("td").children("div");
var cc2=_906.next("tr.treegrid-tr-tree").children("td").children("div");
if(!_902){
node.children=[];
}
}else{
var cc1=dc.body1;
var cc2=dc.body2;
if(!_902){
_904.data=[];
}
}
if(!_902){
cc1.empty();
cc2.empty();
}
if(opts.view.onBeforeRender){
opts.view.onBeforeRender.call(opts.view,_900,_901,data);
}
opts.view.render.call(opts.view,_900,cc1,true);
opts.view.render.call(opts.view,_900,cc2,false);
if(opts.showFooter){
opts.view.renderFooter.call(opts.view,_900,dc.footer1,true);
opts.view.renderFooter.call(opts.view,_900,dc.footer2,false);
}
if(opts.view.onAfterRender){
opts.view.onAfterRender.call(opts.view,_900);
}
if(!_901&&opts.pagination){
var _907=$.data(_900,"treegrid").total;
var _908=$(_900).datagrid("getPager");
if(_908.pagination("options").total!=_907){
_908.pagination({total:_907});
}
}
_8d3(_900);
_8db(_900);
$(_900).treegrid("showLines");
$(_900).treegrid("setSelectionState");
$(_900).treegrid("autoSizeColumn");
if(!_903){
opts.onLoadSuccess.call(_900,node,data);
}
};
function _8d2(_909,_90a,_90b,_90c,_90d){
var opts=$.data(_909,"treegrid").options;
var body=$(_909).datagrid("getPanel").find("div.datagrid-body");
if(_90a==undefined&&opts.queryParams){
opts.queryParams.id=undefined;
}
if(_90b){
opts.queryParams=_90b;
}
var _90e=$.extend({},opts.queryParams);
if(opts.pagination){
$.extend(_90e,{page:opts.pageNumber,rows:opts.pageSize});
}
if(opts.sortName){
$.extend(_90e,{sort:opts.sortName,order:opts.sortOrder});
}
var row=find(_909,_90a);
if(opts.onBeforeLoad.call(_909,row,_90e)==false){
return;
}
var _90f=body.find("tr[node-id=\""+_90a+"\"] span.tree-folder");
_90f.addClass("tree-loading");
$(_909).treegrid("loading");
var _910=opts.loader.call(_909,_90e,function(data){
_90f.removeClass("tree-loading");
$(_909).treegrid("loaded");
_8ff(_909,_90a,data,_90c);
if(_90d){
_90d();
}
},function(){
_90f.removeClass("tree-loading");
$(_909).treegrid("loaded");
opts.onLoadError.apply(_909,arguments);
if(_90d){
_90d();
}
});
if(_910==false){
_90f.removeClass("tree-loading");
$(_909).treegrid("loaded");
}
};
function _911(_912){
var _913=_914(_912);
return _913.length?_913[0]:null;
};
function _914(_915){
return $.data(_915,"treegrid").data;
};
function _8f3(_916,_917){
var row=find(_916,_917);
if(row._parentId){
return find(_916,row._parentId);
}else{
return null;
}
};
function _8d7(_918,_919){
var data=$.data(_918,"treegrid").data;
if(_919){
var _91a=find(_918,_919);
data=_91a?(_91a.children||[]):[];
}
var _91b=[];
$.extjsui.forEach(data,true,function(node){
_91b.push(node);
});
return _91b;
};
function _91c(_91d,_91e){
var opts=$.data(_91d,"treegrid").options;
var tr=opts.finder.getTr(_91d,_91e);
var node=tr.children("td[field=\""+opts.treeField+"\"]");
return node.find("span.tree-indent,span.tree-hit").length;
};
function find(_91f,_920){
var _921=$.data(_91f,"treegrid");
var opts=_921.options;
var _922=null;
$.extjsui.forEach(_921.data,true,function(node){
if(node[opts.idField]==_920){
_922=node;
return false;
}
});
return _922;
};
function _923(_924,_925){
var opts=$.data(_924,"treegrid").options;
var row=find(_924,_925);
var tr=opts.finder.getTr(_924,_925);
var hit=tr.find("span.tree-hit");
if(hit.length==0){
return;
}
if(hit.hasClass("tree-collapsed")){
return;
}
if(opts.onBeforeCollapse.call(_924,row)==false){
return;
}
hit.removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed");
hit.next().removeClass("tree-folder-open");
row.state="closed";
tr=tr.next("tr.treegrid-tr-tree");
var cc=tr.children("td").children("div");
if(opts.animate){
cc.slideUp("normal",function(){
$(_924).treegrid("autoSizeColumn");
_8d3(_924,_925);
opts.onCollapse.call(_924,row);
});
}else{
cc.hide();
$(_924).treegrid("autoSizeColumn");
_8d3(_924,_925);
opts.onCollapse.call(_924,row);
}
};
function _926(_927,_928){
var opts=$.data(_927,"treegrid").options;
var tr=opts.finder.getTr(_927,_928);
var hit=tr.find("span.tree-hit");
var row=find(_927,_928);
if(hit.length==0){
return;
}
if(hit.hasClass("tree-expanded")){
return;
}
if(opts.onBeforeExpand.call(_927,row)==false){
return;
}
hit.removeClass("tree-collapsed tree-collapsed-hover").addClass("tree-expanded");
hit.next().addClass("tree-folder-open");
var _929=tr.next("tr.treegrid-tr-tree");
if(_929.length){
var cc=_929.children("td").children("div");
_92a(cc);
}else{
_8f8(_927,row[opts.idField]);
var _929=tr.next("tr.treegrid-tr-tree");
var cc=_929.children("td").children("div");
cc.hide();
var _92b=$.extend({},opts.queryParams||{});
_92b.id=row[opts.idField];
_8d2(_927,row[opts.idField],_92b,true,function(){
if(cc.is(":empty")){
_929.remove();
}else{
_92a(cc);
}
});
}
function _92a(cc){
row.state="open";
if(opts.animate){
cc.slideDown("normal",function(){
$(_927).treegrid("autoSizeColumn");
_8d3(_927,_928);
opts.onExpand.call(_927,row);
});
}else{
cc.show();
$(_927).treegrid("autoSizeColumn");
_8d3(_927,_928);
opts.onExpand.call(_927,row);
}
};
};
function _8e1(_92c,_92d){
var opts=$.data(_92c,"treegrid").options;
var tr=opts.finder.getTr(_92c,_92d);
var hit=tr.find("span.tree-hit");
if(hit.hasClass("tree-expanded")){
_923(_92c,_92d);
}else{
_926(_92c,_92d);
}
};
function _92e(_92f,_930){
var opts=$.data(_92f,"treegrid").options;
var _931=_8d7(_92f,_930);
if(_930){
_931.unshift(find(_92f,_930));
}
for(var i=0;i<_931.length;i++){
_923(_92f,_931[i][opts.idField]);
}
};
function _932(_933,_934){
var opts=$.data(_933,"treegrid").options;
var _935=_8d7(_933,_934);
if(_934){
_935.unshift(find(_933,_934));
}
for(var i=0;i<_935.length;i++){
_926(_933,_935[i][opts.idField]);
}
};
function _936(_937,_938){
var opts=$.data(_937,"treegrid").options;
var ids=[];
var p=_8f3(_937,_938);
while(p){
var id=p[opts.idField];
ids.unshift(id);
p=_8f3(_937,id);
}
for(var i=0;i<ids.length;i++){
_926(_937,ids[i]);
}
};
function _939(_93a,_93b){
var _93c=$.data(_93a,"treegrid");
var opts=_93c.options;
if(_93b.parent){
var tr=opts.finder.getTr(_93a,_93b.parent);
if(tr.next("tr.treegrid-tr-tree").length==0){
_8f8(_93a,_93b.parent);
}
var cell=tr.children("td[field=\""+opts.treeField+"\"]").children("div.datagrid-cell");
var _93d=cell.children("span.tree-icon");
if(_93d.hasClass("tree-file")){
_93d.removeClass("tree-file").addClass("tree-folder tree-folder-open");
var hit=$("<span class=\"tree-hit tree-expanded\"></span>").insertBefore(_93d);
if(hit.prev().length){
hit.prev().remove();
}
}
}
_8ff(_93a,_93b.parent,_93b.data,_93c.data.length>0,true);
};
function _93e(_93f,_940){
var ref=_940.before||_940.after;
var opts=$.data(_93f,"treegrid").options;
var _941=_8f3(_93f,ref);
_939(_93f,{parent:(_941?_941[opts.idField]:null),data:[_940.data]});
var _942=_941?_941.children:$(_93f).treegrid("getRoots");
for(var i=0;i<_942.length;i++){
if(_942[i][opts.idField]==ref){
var _943=_942[_942.length-1];
_942.splice(_940.before?i:(i+1),0,_943);
_942.splice(_942.length-1,1);
break;
}
}
_944(true);
_944(false);
_8db(_93f);
$(_93f).treegrid("showLines");
function _944(_945){
var _946=_945?1:2;
var tr=opts.finder.getTr(_93f,_940.data[opts.idField],"body",_946);
var _947=tr.closest("table.datagrid-btable");
tr=tr.parent().children();
var dest=opts.finder.getTr(_93f,ref,"body",_946);
if(_940.before){
tr.insertBefore(dest);
}else{
var sub=dest.next("tr.treegrid-tr-tree");
tr.insertAfter(sub.length?sub:dest);
}
_947.remove();
};
};
function _948(_949,_94a){
var _94b=$.data(_949,"treegrid");
var opts=_94b.options;
var prow=_8f3(_949,_94a);
$(_949).datagrid("deleteRow",_94a);
$.extjsui.removeArrayItem(_94b.checkedRows,opts.idField,_94a);
_8db(_949);
if(prow){
_8f5(_949,prow[opts.idField]);
}
_94b.total-=1;
$(_949).datagrid("getPager").pagination("refresh",{total:_94b.total});
$(_949).treegrid("showLines");
};
function _94c(_94d){
var t=$(_94d);
var opts=t.treegrid("options");
if(opts.lines){
t.treegrid("getPanel").addClass("tree-lines");
}else{
t.treegrid("getPanel").removeClass("tree-lines");
return;
}
t.treegrid("getPanel").find("span.tree-indent").removeClass("tree-line tree-join tree-joinbottom");
t.treegrid("getPanel").find("div.datagrid-cell").removeClass("tree-node-last tree-root-first tree-root-one");
var _94e=t.treegrid("getRoots");
if(_94e.length>1){
_94f(_94e[0]).addClass("tree-root-first");
}else{
if(_94e.length==1){
_94f(_94e[0]).addClass("tree-root-one");
}
}
_950(_94e);
_951(_94e);
function _950(_952){
$.map(_952,function(node){
if(node.children&&node.children.length){
_950(node.children);
}else{
var cell=_94f(node);
cell.find(".tree-icon").prev().addClass("tree-join");
}
});
if(_952.length){
var cell=_94f(_952[_952.length-1]);
cell.addClass("tree-node-last");
cell.find(".tree-join").removeClass("tree-join").addClass("tree-joinbottom");
}
};
function _951(_953){
$.map(_953,function(node){
if(node.children&&node.children.length){
_951(node.children);
}
});
for(var i=0;i<_953.length-1;i++){
var node=_953[i];
var _954=t.treegrid("getLevel",node[opts.idField]);
var tr=opts.finder.getTr(_94d,node[opts.idField]);
var cc=tr.next().find("tr.datagrid-row td[field=\""+opts.treeField+"\"] div.datagrid-cell");
cc.find("span:eq("+(_954-1)+")").addClass("tree-line");
}
};
function _94f(node){
var tr=opts.finder.getTr(_94d,node[opts.idField]);
var cell=tr.find("td[field=\""+opts.treeField+"\"] div.datagrid-cell");
return cell;
};
};
$.fn.treegrid=function(_955,_956){
if(typeof _955=="string"){
var _957=$.fn.treegrid.methods[_955];
if(_957){
return _957(this,_956);
}else{
return this.datagrid(_955,_956);
}
}
_955=_955||{};
return this.each(function(){
var _958=$.data(this,"treegrid");
if(_958){
$.extend(_958.options,_955);
}else{
_958=$.data(this,"treegrid",{options:$.extend({},$.fn.treegrid.defaults,$.fn.treegrid.parseOptions(this),_955),data:[],checkedRows:[],tmpIds:[]});
}
_8c2(this);
if(_958.options.data){
$(this).treegrid("loadData",_958.options.data);
}
_8d2(this);
});
};
$.fn.treegrid.methods={options:function(jq){
return $.data(jq[0],"treegrid").options;
},resize:function(jq,_959){
return jq.each(function(){
$(this).datagrid("resize",_959);
});
},fixRowHeight:function(jq,_95a){
return jq.each(function(){
_8d3(this,_95a);
});
},loadData:function(jq,data){
return jq.each(function(){
_8ff(this,data.parent,data);
});
},load:function(jq,_95b){
return jq.each(function(){
$(this).treegrid("options").pageNumber=1;
$(this).treegrid("getPager").pagination({pageNumber:1});
$(this).treegrid("reload",_95b);
});
},reload:function(jq,id){
return jq.each(function(){
var opts=$(this).treegrid("options");
var _95c={};
if(typeof id=="object"){
_95c=id;
}else{
_95c=$.extend({},opts.queryParams);
_95c.id=id;
}
if(_95c.id){
var node=$(this).treegrid("find",_95c.id);
if(node.children){
node.children.splice(0,node.children.length);
}
opts.queryParams=_95c;
var tr=opts.finder.getTr(this,_95c.id);
tr.next("tr.treegrid-tr-tree").remove();
tr.find("span.tree-hit").removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed");
_926(this,_95c.id);
}else{
_8d2(this,null,_95c);
}
});
},reloadFooter:function(jq,_95d){
return jq.each(function(){
var opts=$.data(this,"treegrid").options;
var dc=$.data(this,"datagrid").dc;
if(_95d){
$.data(this,"treegrid").footer=_95d;
}
if(opts.showFooter){
opts.view.renderFooter.call(opts.view,this,dc.footer1,true);
opts.view.renderFooter.call(opts.view,this,dc.footer2,false);
if(opts.view.onAfterRender){
opts.view.onAfterRender.call(opts.view,this);
}
$(this).treegrid("fixRowHeight");
}
});
},getData:function(jq){
return $.data(jq[0],"treegrid").data;
},getFooterRows:function(jq){
return $.data(jq[0],"treegrid").footer;
},getRoot:function(jq){
return _911(jq[0]);
},getRoots:function(jq){
return _914(jq[0]);
},getParent:function(jq,id){
return _8f3(jq[0],id);
},getChildren:function(jq,id){
return _8d7(jq[0],id);
},getLevel:function(jq,id){
return _91c(jq[0],id);
},find:function(jq,id){
return find(jq[0],id);
},isLeaf:function(jq,id){
var opts=$.data(jq[0],"treegrid").options;
var tr=opts.finder.getTr(jq[0],id);
var hit=tr.find("span.tree-hit");
return hit.length==0;
},select:function(jq,id){
return jq.each(function(){
$(this).datagrid("selectRow",id);
});
},unselect:function(jq,id){
return jq.each(function(){
$(this).datagrid("unselectRow",id);
});
},collapse:function(jq,id){
return jq.each(function(){
_923(this,id);
});
},expand:function(jq,id){
return jq.each(function(){
_926(this,id);
});
},toggle:function(jq,id){
return jq.each(function(){
_8e1(this,id);
});
},collapseAll:function(jq,id){
return jq.each(function(){
_92e(this,id);
});
},expandAll:function(jq,id){
return jq.each(function(){
_932(this,id);
});
},expandTo:function(jq,id){
return jq.each(function(){
_936(this,id);
});
},append:function(jq,_95e){
return jq.each(function(){
_939(this,_95e);
});
},insert:function(jq,_95f){
return jq.each(function(){
_93e(this,_95f);
});
},remove:function(jq,id){
return jq.each(function(){
_948(this,id);
});
},pop:function(jq,id){
var row=jq.treegrid("find",id);
jq.treegrid("remove",id);
return row;
},refresh:function(jq,id){
return jq.each(function(){
var opts=$.data(this,"treegrid").options;
opts.view.refreshRow.call(opts.view,this,id);
});
},update:function(jq,_960){
return jq.each(function(){
var opts=$.data(this,"treegrid").options;
var row=_960.row;
opts.view.updateRow.call(opts.view,this,_960.id,row);
if(row.checked!=undefined){
row=find(this,_960.id);
$.extend(row,{checkState:row.checked?"checked":(row.checked===false?"unchecked":undefined)});
_8f5(this,_960.id);
}
});
},beginEdit:function(jq,id){
return jq.each(function(){
$(this).datagrid("beginEdit",id);
$(this).treegrid("fixRowHeight",id);
});
},endEdit:function(jq,id){
return jq.each(function(){
$(this).datagrid("endEdit",id);
});
},cancelEdit:function(jq,id){
return jq.each(function(){
$(this).datagrid("cancelEdit",id);
});
},showLines:function(jq){
return jq.each(function(){
_94c(this);
});
},setSelectionState:function(jq){
return jq.each(function(){
$(this).datagrid("setSelectionState");
var _961=$(this).data("treegrid");
for(var i=0;i<_961.tmpIds.length;i++){
_8e2(this,_961.tmpIds[i],true,true);
}
_961.tmpIds=[];
});
},getCheckedNodes:function(jq,_962){
_962=_962||"checked";
var rows=[];
$.extjsui.forEach(jq.data("treegrid").checkedRows,false,function(row){
if(row.checkState==_962){
rows.push(row);
}
});
return rows;
},checkNode:function(jq,id){
return jq.each(function(){
_8e2(this,id,true);
});
},uncheckNode:function(jq,id){
return jq.each(function(){
_8e2(this,id,false);
});
},clearChecked:function(jq){
return jq.each(function(){
var _963=this;
var opts=$(_963).treegrid("options");
$(_963).datagrid("clearChecked");
$.map($(_963).treegrid("getCheckedNodes"),function(row){
_8e2(_963,row[opts.idField],false,true);
});
});
}};
$.fn.treegrid.parseOptions=function(_964){
return $.extend({},$.fn.datagrid.parseOptions(_964),$.parser.parseOptions(_964,["treeField",{checkbox:"boolean",cascadeCheck:"boolean",onlyLeafCheck:"boolean"},{animate:"boolean"}]));
};
var _965=$.extend({},$.fn.datagrid.defaults.view,{render:function(_966,_967,_968){
var opts=$.data(_966,"treegrid").options;
var _969=$(_966).datagrid("getColumnFields",_968);
var _96a=$.data(_966,"datagrid").rowIdPrefix;
if(_968){
if(!(opts.rownumbers||(opts.frozenColumns&&opts.frozenColumns.length))){
return;
}
}
var view=this;
if(this.treeNodes&&this.treeNodes.length){
var _96b=_96c.call(this,_968,this.treeLevel,this.treeNodes);
$(_967).append(_96b.join(""));
}
function _96c(_96d,_96e,_96f){
var _970=$(_966).treegrid("getParent",_96f[0][opts.idField]);
var _971=(_970?_970.children.length:$(_966).treegrid("getRoots").length)-_96f.length;
var _972=["<table class=\"datagrid-btable\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>"];
for(var i=0;i<_96f.length;i++){
var row=_96f[i];
if(row.state!="open"&&row.state!="closed"){
row.state="open";
}
var css=opts.rowStyler?opts.rowStyler.call(_966,row):"";
var cs=this.getStyleValue(css);
var cls="class=\"datagrid-row "+(_971++%2&&opts.striped?"datagrid-row-alt ":" ")+cs.c+"\"";
var _973=cs.s?"style=\""+cs.s+"\"":"";
var _974=_96a+"-"+(_96d?1:2)+"-"+row[opts.idField];
_972.push("<tr id=\""+_974+"\" node-id=\""+row[opts.idField]+"\" "+cls+" "+_973+">");
_972=_972.concat(view.renderRow.call(view,_966,_969,_96d,_96e,row));
_972.push("</tr>");
if(row.children&&row.children.length){
var tt=_96c.call(this,_96d,_96e+1,row.children);
var v=row.state=="closed"?"none":"block";
_972.push("<tr class=\"treegrid-tr-tree\"><td style=\"border:0px\" colspan="+(_969.length+(opts.rownumbers?1:0))+"><div style=\"display:"+v+"\">");
_972=_972.concat(tt);
_972.push("</div></td></tr>");
}
}
_972.push("</tbody></table>");
return _972;
};
},renderFooter:function(_975,_976,_977){
var opts=$.data(_975,"treegrid").options;
var rows=$.data(_975,"treegrid").footer||[];
var _978=$(_975).datagrid("getColumnFields",_977);
var _979=["<table class=\"datagrid-ftable\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>"];
for(var i=0;i<rows.length;i++){
var row=rows[i];
row[opts.idField]=row[opts.idField]||("foot-row-id"+i);
_979.push("<tr class=\"datagrid-row\" node-id=\""+row[opts.idField]+"\">");
_979.push(this.renderRow.call(this,_975,_978,_977,0,row));
_979.push("</tr>");
}
_979.push("</tbody></table>");
$(_976).html(_979.join(""));
},renderRow:function(_97a,_97b,_97c,_97d,row){
var _97e=$.data(_97a,"treegrid");
var opts=_97e.options;
var cc=[];
if(_97c&&opts.rownumbers){
cc.push("<td class=\"datagrid-td-rownumber\"><div class=\"datagrid-cell-rownumber\">0</div></td>");
}
for(var i=0;i<_97b.length;i++){
var _97f=_97b[i];
var col=$(_97a).datagrid("getColumnOption",_97f);
if(col){
var css=col.styler?(col.styler(row[_97f],row)||""):"";
var cs=this.getStyleValue(css);
var cls=cs.c?"class=\""+cs.c+"\"":"";
var _980=col.hidden?"style=\"display:none;"+cs.s+"\"":(cs.s?"style=\""+cs.s+"\"":"");
cc.push("<td field=\""+_97f+"\" "+cls+" "+_980+">");
var _980="";
if(!col.checkbox){
if(col.align){
_980+="text-align:"+col.align+";";
}
if(!opts.nowrap){
_980+="white-space:normal;height:auto;";
}else{
if(opts.autoRowHeight){
_980+="height:auto;";
}
}
}
cc.push("<div style=\""+_980+"\" ");
if(col.checkbox){
cc.push("class=\"datagrid-cell-check ");
}else{
cc.push("class=\"datagrid-cell "+col.cellClass);
}
cc.push("\">");
if(col.checkbox){
if(row.checked){
cc.push("<input type=\"checkbox\" checked=\"checked\"");
}else{
cc.push("<input type=\"checkbox\"");
}
cc.push(" name=\""+_97f+"\" value=\""+(row[_97f]!=undefined?row[_97f]:"")+"\">");
}else{
var val=null;
if(col.formatter){
val=col.formatter(row[_97f],row);
}else{
val=row[_97f];
}
if(_97f==opts.treeField){
for(var j=0;j<_97d;j++){
cc.push("<span class=\"tree-indent\"></span>");
}
if(row.state=="closed"){
cc.push("<span class=\"tree-hit tree-collapsed\"></span>");
cc.push("<span class=\"tree-icon tree-folder "+(row.iconCls?row.iconCls:"")+"\"></span>");
}else{
if(row.children&&row.children.length){
cc.push("<span class=\"tree-hit tree-expanded\"></span>");
cc.push("<span class=\"tree-icon tree-folder tree-folder-open "+(row.iconCls?row.iconCls:"")+"\"></span>");
}else{
cc.push("<span class=\"tree-indent\"></span>");
cc.push("<span class=\"tree-icon tree-file "+(row.iconCls?row.iconCls:"")+"\"></span>");
}
}
if(this.hasCheckbox(_97a,row)){
var flag=0;
var crow=$.extjsui.getArrayItem(_97e.checkedRows,opts.idField,row[opts.idField]);
if(crow){
flag=crow.checkState=="checked"?1:2;
}else{
var prow=$.extjsui.getArrayItem(_97e.checkedRows,opts.idField,row._parentId);
if(prow&&prow.checkState=="checked"&&opts.cascadeCheck){
flag=1;
row.checked=true;
$.extjsui.addArrayItem(_97e.checkedRows,opts.idField,row);
}else{
if(row.checked){
$.extjsui.addArrayItem(_97e.tmpIds,row[opts.idField]);
}
}
row.checkState=flag?"checked":"unchecked";
}
cc.push("<span class=\"tree-checkbox tree-checkbox"+flag+"\"></span>");
}else{
row.checkState=undefined;
row.checked=undefined;
}
cc.push("<span class=\"tree-title\">"+val+"</span>");
}else{
cc.push(val);
}
}
cc.push("</div>");
cc.push("</td>");
}
}
return cc.join("");
},hasCheckbox:function(_981,row){
var opts=$.data(_981,"treegrid").options;
if(opts.checkbox){
if($.isFunction(opts.checkbox)){
if(opts.checkbox.call(_981,row)){
return true;
}else{
return false;
}
}else{
if(opts.onlyLeafCheck){
if(row.state=="open"&&!(row.children&&row.children.length)){
return true;
}
}else{
return true;
}
}
}
return false;
},refreshRow:function(_982,id){
this.updateRow.call(this,_982,id,{});
},updateRow:function(_983,id,row){
var opts=$.data(_983,"treegrid").options;
var _984=$(_983).treegrid("find",id);
$.extend(_984,row);
var _985=$(_983).treegrid("getLevel",id)-1;
var _986=opts.rowStyler?opts.rowStyler.call(_983,_984):"";
var _987=$.data(_983,"datagrid").rowIdPrefix;
var _988=_984[opts.idField];
function _989(_98a){
var _98b=$(_983).treegrid("getColumnFields",_98a);
var tr=opts.finder.getTr(_983,id,"body",(_98a?1:2));
var _98c=tr.find("div.datagrid-cell-rownumber").html();
var _98d=tr.find("div.datagrid-cell-check input[type=checkbox]").is(":checked");
tr.html(this.renderRow(_983,_98b,_98a,_985,_984));
tr.attr("style",_986||"");
tr.find("div.datagrid-cell-rownumber").html(_98c);
if(_98d){
tr.find("div.datagrid-cell-check input[type=checkbox]")._propAttr("checked",true);
}
if(_988!=id){
tr.attr("id",_987+"-"+(_98a?1:2)+"-"+_988);
tr.attr("node-id",_988);
}
};
_989.call(this,true);
_989.call(this,false);
$(_983).treegrid("fixRowHeight",id);
},deleteRow:function(_98e,id){
var opts=$.data(_98e,"treegrid").options;
var tr=opts.finder.getTr(_98e,id);
tr.next("tr.treegrid-tr-tree").remove();
tr.remove();
var _98f=del(id);
if(_98f){
if(_98f.children.length==0){
tr=opts.finder.getTr(_98e,_98f[opts.idField]);
tr.next("tr.treegrid-tr-tree").remove();
var cell=tr.children("td[field=\""+opts.treeField+"\"]").children("div.datagrid-cell");
cell.find(".tree-icon").removeClass("tree-folder").addClass("tree-file");
cell.find(".tree-hit").remove();
$("<span class=\"tree-indent\"></span>").prependTo(cell);
}
}
function del(id){
var cc;
var _990=$(_98e).treegrid("getParent",id);
if(_990){
cc=_990.children;
}else{
cc=$(_98e).treegrid("getData");
}
for(var i=0;i<cc.length;i++){
if(cc[i][opts.idField]==id){
cc.splice(i,1);
break;
}
}
return _990;
};
},onBeforeRender:function(_991,_992,data){
if($.isArray(_992)){
data={total:_992.length,rows:_992};
_992=null;
}
if(!data){
return false;
}
var _993=$.data(_991,"treegrid");
var opts=_993.options;
if(data.length==undefined){
if(data.footer){
_993.footer=data.footer;
}
if(data.total){
_993.total=data.total;
}
data=this.transfer(_991,_992,data.rows);
}else{
function _994(_995,_996){
for(var i=0;i<_995.length;i++){
var row=_995[i];
row._parentId=_996;
if(row.children&&row.children.length){
_994(row.children,row[opts.idField]);
}
}
};
_994(data,_992);
}
var node=find(_991,_992);
if(node){
if(node.children){
node.children=node.children.concat(data);
}else{
node.children=data;
}
}else{
_993.data=_993.data.concat(data);
}
this.sort(_991,data);
this.treeNodes=data;
this.treeLevel=$(_991).treegrid("getLevel",_992);
},sort:function(_997,data){
var opts=$.data(_997,"treegrid").options;
if(!opts.remoteSort&&opts.sortName){
var _998=opts.sortName.split(",");
var _999=opts.sortOrder.split(",");
_99a(data);
}
function _99a(rows){
rows.sort(function(r1,r2){
var r=0;
for(var i=0;i<_998.length;i++){
var sn=_998[i];
var so=_999[i];
var col=$(_997).treegrid("getColumnOption",sn);
var _99b=col.sorter||function(a,b){
return a==b?0:(a>b?1:-1);
};
r=_99b(r1[sn],r2[sn])*(so=="asc"?1:-1);
if(r!=0){
return r;
}
}
return r;
});
for(var i=0;i<rows.length;i++){
var _99c=rows[i].children;
if(_99c&&_99c.length){
_99a(_99c);
}
}
};
},transfer:function(_99d,_99e,data){
var opts=$.data(_99d,"treegrid").options;
var rows=$.extend([],data);
var _99f=_9a0(_99e,rows);
var toDo=$.extend([],_99f);
while(toDo.length){
var node=toDo.shift();
var _9a1=_9a0(node[opts.idField],rows);
if(_9a1.length){
if(node.children){
node.children=node.children.concat(_9a1);
}else{
node.children=_9a1;
}
toDo=toDo.concat(_9a1);
}
}
return _99f;
function _9a0(_9a2,rows){
var rr=[];
for(var i=0;i<rows.length;i++){
var row=rows[i];
if(row._parentId==_9a2){
rr.push(row);
rows.splice(i,1);
i--;
}
}
return rr;
};
}});
$.fn.treegrid.defaults=$.extend({},$.fn.datagrid.defaults,{treeField:null,checkbox:false,cascadeCheck:true,onlyLeafCheck:false,lines:false,animate:false,singleSelect:true,view:_965,rowEvents:$.extend({},$.fn.datagrid.defaults.rowEvents,{mouseover:_8dd(true),mouseout:_8dd(false),click:_8df}),loader:function(_9a3,_9a4,_9a5){
var opts=$(this).treegrid("options");
if(!opts.url){
return false;
}
$.ajax({type:opts.method,url:opts.url,data:_9a3,dataType:"json",success:function(data){
_9a4(data);
},error:function(){
_9a5.apply(this,arguments);
}});
},loadFilter:function(data,_9a6){
return data;
},finder:{getTr:function(_9a7,id,type,_9a8){
type=type||"body";
_9a8=_9a8||0;
var dc=$.data(_9a7,"datagrid").dc;
if(_9a8==0){
var opts=$.data(_9a7,"treegrid").options;
var tr1=opts.finder.getTr(_9a7,id,type,1);
var tr2=opts.finder.getTr(_9a7,id,type,2);
return tr1.add(tr2);
}else{
if(type=="body"){
var tr=$("#"+$.data(_9a7,"datagrid").rowIdPrefix+"-"+_9a8+"-"+id);
if(!tr.length){
tr=(_9a8==1?dc.body1:dc.body2).find("tr[node-id=\""+id+"\"]");
}
return tr;
}else{
if(type=="footer"){
return (_9a8==1?dc.footer1:dc.footer2).find("tr[node-id=\""+id+"\"]");
}else{
if(type=="selected"){
return (_9a8==1?dc.body1:dc.body2).find("tr.datagrid-row-selected");
}else{
if(type=="highlight"){
return (_9a8==1?dc.body1:dc.body2).find("tr.datagrid-row-over");
}else{
if(type=="checked"){
return (_9a8==1?dc.body1:dc.body2).find("tr.datagrid-row-checked");
}else{
if(type=="last"){
return (_9a8==1?dc.body1:dc.body2).find("tr:last[node-id]");
}else{
if(type=="allbody"){
return (_9a8==1?dc.body1:dc.body2).find("tr[node-id]");
}else{
if(type=="allfooter"){
return (_9a8==1?dc.footer1:dc.footer2).find("tr[node-id]");
}
}
}
}
}
}
}
}
}
},getRow:function(_9a9,p){
var id=(typeof p=="object")?p.attr("node-id"):p;
return $(_9a9).treegrid("find",id);
},getRows:function(_9aa){
return $(_9aa).treegrid("getChildren");
}},onBeforeLoad:function(row,_9ab){
},onLoadSuccess:function(row,data){
},onLoadError:function(){
},onBeforeCollapse:function(row){
},onCollapse:function(row){
},onBeforeExpand:function(row){
},onExpand:function(row){
},onClickRow:function(row){
},onDblClickRow:function(row){
},onClickCell:function(_9ac,row){
},onDblClickCell:function(_9ad,row){
},onContextMenu:function(e,row){
},onBeforeEdit:function(row){
},onAfterEdit:function(row,_9ae){
},onCancelEdit:function(row){
},onBeforeCheckNode:function(row,_9af){
},onCheckNode:function(row,_9b0){
}});
})(jQuery);
(function($){
function _9b1(_9b2){
var opts=$.data(_9b2,"datalist").options;
$(_9b2).datagrid($.extend({},opts,{cls:"datalist"+(opts.lines?" datalist-lines":""),frozenColumns:(opts.frozenColumns&&opts.frozenColumns.length)?opts.frozenColumns:(opts.checkbox?[[{field:"_ck",checkbox:true}]]:undefined),columns:(opts.columns&&opts.columns.length)?opts.columns:[[{field:opts.textField,width:"100%",formatter:function(_9b3,row,_9b4){
return opts.textFormatter?opts.textFormatter(_9b3,row,_9b4):_9b3;
}}]]}));
};
var _9b5=$.extend({},$.fn.datagrid.defaults.view,{render:function(_9b6,_9b7,_9b8){
var _9b9=$.data(_9b6,"datagrid");
var opts=_9b9.options;
if(opts.groupField){
var g=this.groupRows(_9b6,_9b9.data.rows);
this.groups=g.groups;
_9b9.data.rows=g.rows;
var _9ba=[];
for(var i=0;i<g.groups.length;i++){
_9ba.push(this.renderGroup.call(this,_9b6,i,g.groups[i],_9b8));
}
$(_9b7).html(_9ba.join(""));
}else{
$(_9b7).html(this.renderTable(_9b6,0,_9b9.data.rows,_9b8));
}
},renderGroup:function(_9bb,_9bc,_9bd,_9be){
var _9bf=$.data(_9bb,"datagrid");
var opts=_9bf.options;
var _9c0=$(_9bb).datagrid("getColumnFields",_9be);
var _9c1=[];
_9c1.push("<div class=\"datagrid-group\" group-index="+_9bc+">");
if(!_9be){
_9c1.push("<span class=\"datagrid-group-title\">");
_9c1.push(opts.groupFormatter.call(_9bb,_9bd.value,_9bd.rows));
_9c1.push("</span>");
}
_9c1.push("</div>");
_9c1.push(this.renderTable(_9bb,_9bd.startIndex,_9bd.rows,_9be));
return _9c1.join("");
},groupRows:function(_9c2,rows){
var _9c3=$.data(_9c2,"datagrid");
var opts=_9c3.options;
var _9c4=[];
for(var i=0;i<rows.length;i++){
var row=rows[i];
var _9c5=_9c6(row[opts.groupField]);
if(!_9c5){
_9c5={value:row[opts.groupField],rows:[row]};
_9c4.push(_9c5);
}else{
_9c5.rows.push(row);
}
}
var _9c7=0;
var rows=[];
for(var i=0;i<_9c4.length;i++){
var _9c5=_9c4[i];
_9c5.startIndex=_9c7;
_9c7+=_9c5.rows.length;
rows=rows.concat(_9c5.rows);
}
return {groups:_9c4,rows:rows};
function _9c6(_9c8){
for(var i=0;i<_9c4.length;i++){
var _9c9=_9c4[i];
if(_9c9.value==_9c8){
return _9c9;
}
}
return null;
};
}});
$.fn.datalist=function(_9ca,_9cb){
if(typeof _9ca=="string"){
var _9cc=$.fn.datalist.methods[_9ca];
if(_9cc){
return _9cc(this,_9cb);
}else{
return this.datagrid(_9ca,_9cb);
}
}
_9ca=_9ca||{};
return this.each(function(){
var _9cd=$.data(this,"datalist");
if(_9cd){
$.extend(_9cd.options,_9ca);
}else{
var opts=$.extend({},$.fn.datalist.defaults,$.fn.datalist.parseOptions(this),_9ca);
opts.columns=$.extend(true,[],opts.columns);
_9cd=$.data(this,"datalist",{options:opts});
}
_9b1(this);
if(!_9cd.options.data){
var data=$.fn.datalist.parseData(this);
if(data.total){
$(this).datalist("loadData",data);
}
}
});
};
$.fn.datalist.methods={options:function(jq){
return $.data(jq[0],"datalist").options;
}};
$.fn.datalist.parseOptions=function(_9ce){
return $.extend({},$.fn.datagrid.parseOptions(_9ce),$.parser.parseOptions(_9ce,["valueField","textField","groupField",{checkbox:"boolean",lines:"boolean"}]));
};
$.fn.datalist.parseData=function(_9cf){
var opts=$.data(_9cf,"datalist").options;
var data={total:0,rows:[]};
$(_9cf).children().each(function(){
var _9d0=$.parser.parseOptions(this,["value","group"]);
var row={};
var html=$(this).html();
row[opts.valueField]=_9d0.value!=undefined?_9d0.value:html;
row[opts.textField]=html;
if(opts.groupField){
row[opts.groupField]=_9d0.group;
}
data.total++;
data.rows.push(row);
});
return data;
};
$.fn.datalist.defaults=$.extend({},$.fn.datagrid.defaults,{fitColumns:true,singleSelect:true,showHeader:false,checkbox:false,lines:false,valueField:"value",textField:"text",groupField:"",view:_9b5,textFormatter:function(_9d1,row){
return _9d1;
},groupFormatter:function(_9d2,rows){
return _9d2;
}});
})(jQuery);
(function($){
$(function(){
$(document).unbind(".combo").bind("mousedown.combo mousewheel.combo",function(e){
var p=$(e.target).closest("span.combo,div.combo-p,div.menu");
if(p.length){
_9d3(p);
return;
}
$("body>div.combo-p>div.combo-panel:visible").panel("close");
});
});
function _9d4(_9d5){
var _9d6=$.data(_9d5,"combo");
var opts=_9d6.options;
if(!_9d6.panel){
_9d6.panel=$("<div class=\"combo-panel\"></div>").appendTo("body");
_9d6.panel.panel({minWidth:opts.panelMinWidth,maxWidth:opts.panelMaxWidth,minHeight:opts.panelMinHeight,maxHeight:opts.panelMaxHeight,doSize:false,closed:true,cls:"combo-p",style:{position:"absolute",zIndex:10},onOpen:function(){
var _9d7=$(this).panel("options").comboTarget;
var _9d8=$.data(_9d7,"combo");
if(_9d8){
_9d8.options.onShowPanel.call(_9d7);
}
},onBeforeClose:function(){
_9d3(this);
},onClose:function(){
var _9d9=$(this).panel("options").comboTarget;
var _9da=$(_9d9).data("combo");
if(_9da){
_9da.options.onHidePanel.call(_9d9);
}
}});
}
var _9db=$.extend(true,[],opts.icons);
if(opts.hasDownArrow){
_9db.push({iconCls:"combo-arrow",handler:function(e){
_9df(e.data.target);
}});
}
$(_9d5).addClass("combo-f").textbox($.extend({},opts,{icons:_9db,onChange:function(){
}}));
$(_9d5).attr("comboName",$(_9d5).attr("textboxName"));
_9d6.combo=$(_9d5).next();
_9d6.combo.addClass("combo");
};
function _9dc(_9dd){
var _9de=$.data(_9dd,"combo");
var opts=_9de.options;
var p=_9de.panel;
if(p.is(":visible")){
p.panel("close");
}
if(!opts.cloned){
p.panel("destroy");
}
$(_9dd).textbox("destroy");
};
function _9df(_9e0){
var _9e1=$.data(_9e0,"combo").panel;
if(_9e1.is(":visible")){
_9e2(_9e0);
}else{
var p=$(_9e0).closest("div.combo-panel");
$("div.combo-panel:visible").not(_9e1).not(p).panel("close");
$(_9e0).combo("showPanel");
}
$(_9e0).combo("textbox").focus();
};
function _9d3(_9e3){
$(_9e3).find(".combo-f").each(function(){
var p=$(this).combo("panel");
if(p.is(":visible")){
p.panel("close");
}
});
};
function _9e4(e){
var _9e5=e.data.target;
var _9e6=$.data(_9e5,"combo");
var opts=_9e6.options;
var _9e7=_9e6.panel;
if(!opts.editable){
_9df(_9e5);
}else{
var p=$(_9e5).closest("div.combo-panel");
$("div.combo-panel:visible").not(_9e7).not(p).panel("close");
}
};
function _9e8(e){
var _9e9=e.data.target;
var t=$(_9e9);
var _9ea=t.data("combo");
var opts=t.combo("options");
switch(e.keyCode){
case 38:
opts.keyHandler.up.call(_9e9,e);
break;
case 40:
opts.keyHandler.down.call(_9e9,e);
break;
case 37:
opts.keyHandler.left.call(_9e9,e);
break;
case 39:
opts.keyHandler.right.call(_9e9,e);
break;
case 13:
e.preventDefault();
opts.keyHandler.enter.call(_9e9,e);
return false;
case 9:
case 27:
_9e2(_9e9);
break;
default:
if(opts.editable){
if(_9ea.timer){
clearTimeout(_9ea.timer);
}
_9ea.timer=setTimeout(function(){
var q=t.combo("getText");
if(_9ea.previousText!=q){
_9ea.previousText=q;
t.combo("showPanel");
opts.keyHandler.query.call(_9e9,q,e);
t.combo("validate");
}
},opts.delay);
}
}
};
function _9eb(_9ec){
var _9ed=$.data(_9ec,"combo");
var _9ee=_9ed.combo;
var _9ef=_9ed.panel;
var opts=$(_9ec).combo("options");
var _9f0=_9ef.panel("options");
_9f0.comboTarget=_9ec;
if(_9f0.closed){
_9ef.panel("panel").show().css({zIndex:($.fn.menu?$.fn.menu.defaults.zIndex++:($.fn.window?$.fn.window.defaults.zIndex++:99)),left:-999999});
_9ef.panel("resize",{width:(opts.panelWidth?opts.panelWidth:_9ee._outerWidth()),height:opts.panelHeight});
_9ef.panel("panel").hide();
_9ef.panel("open");
}
(function(){
if(_9ef.is(":visible")){
_9ef.panel("move",{left:_9f1(),top:_9f2()});
setTimeout(arguments.callee,200);
}
})();
function _9f1(){
var left=_9ee.offset().left;
if(opts.panelAlign=="right"){
left+=_9ee._outerWidth()-_9ef._outerWidth();
}
if(left+_9ef._outerWidth()>$(window)._outerWidth()+$(document).scrollLeft()){
left=$(window)._outerWidth()+$(document).scrollLeft()-_9ef._outerWidth();
}
if(left<0){
left=0;
}
return left;
};
function _9f2(){
var top=_9ee.offset().top+_9ee._outerHeight();
if(top+_9ef._outerHeight()>$(window)._outerHeight()+$(document).scrollTop()){
top=_9ee.offset().top-_9ef._outerHeight();
}
if(top<$(document).scrollTop()){
top=_9ee.offset().top+_9ee._outerHeight();
}
return top;
};
};
function _9e2(_9f3){
var _9f4=$.data(_9f3,"combo").panel;
_9f4.panel("close");
};
function _9f5(_9f6,text){
var _9f7=$.data(_9f6,"combo");
var _9f8=$(_9f6).textbox("getText");
if(_9f8!=text){
$(_9f6).textbox("setText",text);
_9f7.previousText=text;
}
};
function _9f9(_9fa){
var _9fb=[];
var _9fc=$.data(_9fa,"combo").combo;
_9fc.find(".textbox-value").each(function(){
_9fb.push($(this).val());
});
return _9fb;
};
function _9fd(_9fe,_9ff){
var _a00=$.data(_9fe,"combo");
var opts=_a00.options;
var _a01=_a00.combo;
if(!$.isArray(_9ff)){
_9ff=_9ff.split(opts.separator);
}
var _a02=_9f9(_9fe);
_a01.find(".textbox-value").remove();
var name=$(_9fe).attr("textboxName")||"";
for(var i=0;i<_9ff.length;i++){
var _a03=$("<input type=\"hidden\" class=\"textbox-value\">").appendTo(_a01);
_a03.attr("name",name);
if(opts.disabled){
_a03.attr("disabled","disabled");
}
_a03.val(_9ff[i]);
}
var _a04=(function(){
if(_a02.length!=_9ff.length){
return true;
}
var a1=$.extend(true,[],_a02);
var a2=$.extend(true,[],_9ff);
a1.sort();
a2.sort();
for(var i=0;i<a1.length;i++){
if(a1[i]!=a2[i]){
return true;
}
}
return false;
})();
if(_a04){
if(opts.multiple){
opts.onChange.call(_9fe,_9ff,_a02);
}else{
opts.onChange.call(_9fe,_9ff[0],_a02[0]);
}
$(_9fe).closest("form").trigger("_change",[_9fe]);
}
};
function _a05(_a06){
var _a07=_9f9(_a06);
return _a07[0];
};
function _a08(_a09,_a0a){
_9fd(_a09,[_a0a]);
};
function _a0b(_a0c){
var opts=$.data(_a0c,"combo").options;
var _a0d=opts.onChange;
opts.onChange=function(){
};
if(opts.multiple){
_9fd(_a0c,opts.value?opts.value:[]);
}else{
_a08(_a0c,opts.value);
}
opts.onChange=_a0d;
};
$.fn.combo=function(_a0e,_a0f){
if(typeof _a0e=="string"){
var _a10=$.fn.combo.methods[_a0e];
if(_a10){
return _a10(this,_a0f);
}else{
return this.textbox(_a0e,_a0f);
}
}
_a0e=_a0e||{};
return this.each(function(){
var _a11=$.data(this,"combo");
if(_a11){
$.extend(_a11.options,_a0e);
if(_a0e.value!=undefined){
_a11.options.originalValue=_a0e.value;
}
}else{
_a11=$.data(this,"combo",{options:$.extend({},$.fn.combo.defaults,$.fn.combo.parseOptions(this),_a0e),previousText:""});
_a11.options.originalValue=_a11.options.value;
}
_9d4(this);
_a0b(this);
});
};
$.fn.combo.methods={options:function(jq){
var opts=jq.textbox("options");
return $.extend($.data(jq[0],"combo").options,{width:opts.width,height:opts.height,disabled:opts.disabled,readonly:opts.readonly});
},cloneFrom:function(jq,from){
return jq.each(function(){
$(this).textbox("cloneFrom",from);
$.data(this,"combo",{options:$.extend(true,{cloned:true},$(from).combo("options")),combo:$(this).next(),panel:$(from).combo("panel")});
$(this).addClass("combo-f").attr("comboName",$(this).attr("textboxName"));
});
},panel:function(jq){
return $.data(jq[0],"combo").panel;
},destroy:function(jq){
return jq.each(function(){
_9dc(this);
});
},showPanel:function(jq){
return jq.each(function(){
_9eb(this);
});
},hidePanel:function(jq){
return jq.each(function(){
_9e2(this);
});
},clear:function(jq){
return jq.each(function(){
$(this).textbox("setText","");
var opts=$.data(this,"combo").options;
if(opts.multiple){
$(this).combo("setValues",[]);
}else{
$(this).combo("setValue","");
}
});
},reset:function(jq){
return jq.each(function(){
var opts=$.data(this,"combo").options;
if(opts.multiple){
$(this).combo("setValues",opts.originalValue);
}else{
$(this).combo("setValue",opts.originalValue);
}
});
},setText:function(jq,text){
return jq.each(function(){
_9f5(this,text);
});
},getValues:function(jq){
return _9f9(jq[0]);
},setValues:function(jq,_a12){
return jq.each(function(){
_9fd(this,_a12);
});
},getValue:function(jq){
return _a05(jq[0]);
},setValue:function(jq,_a13){
return jq.each(function(){
_a08(this,_a13);
});
}};
$.fn.combo.parseOptions=function(_a14){
var t=$(_a14);
return $.extend({},$.fn.textbox.parseOptions(_a14),$.parser.parseOptions(_a14,["separator","panelAlign",{panelWidth:"number",hasDownArrow:"boolean",delay:"number",selectOnNavigation:"boolean"},{panelMinWidth:"number",panelMaxWidth:"number",panelMinHeight:"number",panelMaxHeight:"number"}]),{panelHeight:(t.attr("panelHeight")=="auto"?"auto":parseInt(t.attr("panelHeight"))||undefined),multiple:(t.attr("multiple")?true:undefined)});
};
$.fn.combo.defaults=$.extend({},$.fn.textbox.defaults,{inputEvents:{click:_9e4,keydown:_9e8,paste:_9e8,drop:_9e8},panelWidth:null,panelHeight:200,panelMinWidth:null,panelMaxWidth:null,panelMinHeight:null,panelMaxHeight:null,panelAlign:"left",multiple:false,selectOnNavigation:true,separator:",",hasDownArrow:true,delay:200,keyHandler:{up:function(e){
},down:function(e){
},left:function(e){
},right:function(e){
},enter:function(e){
},query:function(q,e){
}},onShowPanel:function(){
},onHidePanel:function(){
},onChange:function(_a15,_a16){
}});
})(jQuery);
(function($){
function _a17(_a18,_a19){
var _a1a=$.data(_a18,"combobox");
return $.extjsui.indexOfArray(_a1a.data,_a1a.options.valueField,_a19);
};
function _a1b(_a1c,_a1d){
var opts=$.data(_a1c,"combobox").options;
var _a1e=$(_a1c).combo("panel");
var item=opts.finder.getEl(_a1c,_a1d);
if(item.length){
if(item.position().top<=0){
var h=_a1e.scrollTop()+item.position().top;
_a1e.scrollTop(h);
}else{
if(item.position().top+item.outerHeight()>_a1e.height()){
var h=_a1e.scrollTop()+item.position().top+item.outerHeight()-_a1e.height();
_a1e.scrollTop(h);
}
}
}
_a1e.triggerHandler("scroll");
};
function nav(_a1f,dir){
var opts=$.data(_a1f,"combobox").options;
var _a20=$(_a1f).combobox("panel");
var item=_a20.children("div.combobox-item-hover");
if(!item.length){
item=_a20.children("div.combobox-item-selected");
}
item.removeClass("combobox-item-hover");
var _a21="div.combobox-item:visible:not(.combobox-item-disabled):first";
var _a22="div.combobox-item:visible:not(.combobox-item-disabled):last";
if(!item.length){
item=_a20.children(dir=="next"?_a21:_a22);
}else{
if(dir=="next"){
item=item.nextAll(_a21);
if(!item.length){
item=_a20.children(_a21);
}
}else{
item=item.prevAll(_a21);
if(!item.length){
item=_a20.children(_a22);
}
}
}
if(item.length){
item.addClass("combobox-item-hover");
var row=opts.finder.getRow(_a1f,item);
if(row){
$(_a1f).combobox("scrollTo",row[opts.valueField]);
if(opts.selectOnNavigation){
_a23(_a1f,row[opts.valueField]);
}
}
}
};
function _a23(_a24,_a25,_a26){
var opts=$.data(_a24,"combobox").options;
var _a27=$(_a24).combo("getValues");
if($.inArray(_a25+"",_a27)==-1){
if(opts.multiple){
_a27.push(_a25);
}else{
_a27=[_a25];
}
_a28(_a24,_a27,_a26);
}
};
function _a29(_a2a,_a2b){
var opts=$.data(_a2a,"combobox").options;
var _a2c=$(_a2a).combo("getValues");
var _a2d=$.inArray(_a2b+"",_a2c);
if(_a2d>=0){
_a2c.splice(_a2d,1);
_a28(_a2a,_a2c);
}
};
function _a28(_a2e,_a2f,_a30){
var opts=$.data(_a2e,"combobox").options;
var _a31=$(_a2e).combo("panel");
if(!$.isArray(_a2f)){
_a2f=_a2f.split(opts.separator);
}
if(!opts.multiple){
_a2f=_a2f.length?[_a2f[0]]:[""];
}
$.map($(_a2e).combo("getValues"),function(v){
if($.extjsui.indexOfArray(_a2f,v)==-1){
var el=opts.finder.getEl(_a2e,v);
if(el.hasClass("combobox-item-selected")){
el.removeClass("combobox-item-selected");
opts.onUnselect.call(_a2e,opts.finder.getRow(_a2e,v));
}
}
});
var _a32=null;
var vv=[],ss=[];
for(var i=0;i<_a2f.length;i++){
var v=_a2f[i];
var s=v;
var row=opts.finder.getRow(_a2e,v);
if(row){
s=row[opts.textField];
_a32=row;
var el=opts.finder.getEl(_a2e,v);
if(!el.hasClass("combobox-item-selected")){
el.addClass("combobox-item-selected");
opts.onSelect.call(_a2e,row);
}
}
vv.push(v);
ss.push(s);
}
if(!_a30){
$(_a2e).combo("setText",ss.join(opts.separator));
}
if(opts.showItemIcon){
var tb=$(_a2e).combobox("textbox");
tb.removeClass("textbox-bgicon "+opts.textboxIconCls);
if(_a32&&_a32.iconCls){
tb.addClass("textbox-bgicon "+_a32.iconCls);
opts.textboxIconCls=_a32.iconCls;
}
}
$(_a2e).combo("setValues",vv);
_a31.triggerHandler("scroll");
};
function _a33(_a34,data,_a35){
var _a36=$.data(_a34,"combobox");
var opts=_a36.options;
_a36.data=opts.loadFilter.call(_a34,data);
opts.view.render.call(opts.view,_a34,$(_a34).combo("panel"),_a36.data);
var vv=$(_a34).combobox("getValues");
$.extjsui.forEach(_a36.data,false,function(row){
if(row["selected"]){
$.extjsui.addArrayItem(vv,row[opts.valueField]+"");
}
});
if(opts.multiple){
_a28(_a34,vv,_a35);
}else{
_a28(_a34,vv.length?[vv[vv.length-1]]:[],_a35);
}
opts.onLoadSuccess.call(_a34,data);
};
function _a37(_a38,url,_a39,_a3a){
var opts=$.data(_a38,"combobox").options;
if(url){
opts.url=url;
}
_a39=$.extend({},opts.queryParams,_a39||{});
if(opts.onBeforeLoad.call(_a38,_a39)==false){
return;
}
opts.loader.call(_a38,_a39,function(data){
_a33(_a38,data,_a3a);
},function(){
opts.onLoadError.apply(this,arguments);
});
};
function _a3b(_a3c,q){
var _a3d=$.data(_a3c,"combobox");
var opts=_a3d.options;
var qq=opts.multiple?q.split(opts.separator):[q];
if(opts.mode=="remote"){
_a3e(qq);
_a37(_a3c,null,{q:q},true);
}else{
var _a3f=$(_a3c).combo("panel");
_a3f.find(".combobox-item-hover").removeClass("combobox-item-hover");
_a3f.find(".combobox-item,.combobox-group").hide();
var data=_a3d.data;
var vv=[];
$.map(qq,function(q){
q=$.trim(q);
var _a40=q;
var _a41=undefined;
for(var i=0;i<data.length;i++){
var row=data[i];
if(opts.filter.call(_a3c,q,row)){
var v=row[opts.valueField];
var s=row[opts.textField];
var g=row[opts.groupField];
var item=opts.finder.getEl(_a3c,v).show();
if(s.toLowerCase()==q.toLowerCase()){
_a40=v;
_a23(_a3c,v,true);
}
if(opts.groupField&&_a41!=g){
opts.finder.getGroupEl(_a3c,g).show();
_a41=g;
}
}
}
vv.push(_a40);
});
_a3e(vv);
}
function _a3e(vv){
_a28(_a3c,opts.multiple?(q?vv:[]):vv,true);
};
};
function _a42(_a43){
var t=$(_a43);
var opts=t.combobox("options");
var _a44=t.combobox("panel");
var item=_a44.children("div.combobox-item-hover");
if(item.length){
var row=opts.finder.getRow(_a43,item);
var _a45=row[opts.valueField];
if(opts.multiple){
if(item.hasClass("combobox-item-selected")){
t.combobox("unselect",_a45);
}else{
t.combobox("select",_a45);
}
}else{
t.combobox("select",_a45);
}
}
var vv=[];
$.map(t.combobox("getValues"),function(v){
if(_a17(_a43,v)>=0){
vv.push(v);
}
});
t.combobox("setValues",vv);
if(!opts.multiple){
t.combobox("hidePanel");
}
};
function _a46(_a47){
var _a48=$.data(_a47,"combobox");
var opts=_a48.options;
$(_a47).addClass("combobox-f");
$(_a47).combo($.extend({},opts,{onShowPanel:function(){
$(this).combo("panel").find("div.combobox-item:hidden,div.combobox-group:hidden").show();
_a28(this,$(this).combobox("getValues"),true);
$(this).combobox("scrollTo",$(this).combobox("getValue"));
opts.onShowPanel.call(this);
}}));
var p=$(_a47).combo("panel");
p.unbind(".combobox");
for(var _a49 in opts.panelEvents){
p.bind(_a49+".combobox",{target:_a47},opts.panelEvents[_a49]);
}
};
function _a4a(e){
$(this).children("div.combobox-item-hover").removeClass("combobox-item-hover");
var item=$(e.target).closest("div.combobox-item");
if(!item.hasClass("combobox-item-disabled")){
item.addClass("combobox-item-hover");
}
e.stopPropagation();
};
function _a4b(e){
$(e.target).closest("div.combobox-item").removeClass("combobox-item-hover");
e.stopPropagation();
};
function _a4c(e){
var _a4d=$(this).panel("options").comboTarget;
if(!_a4d){
return;
}
var opts=$(_a4d).combobox("options");
var item=$(e.target).closest("div.combobox-item");
if(!item.length||item.hasClass("combobox-item-disabled")){
return;
}
var row=opts.finder.getRow(_a4d,item);
if(!row){
return;
}
var _a4e=row[opts.valueField];
if(opts.multiple){
if(item.hasClass("combobox-item-selected")){
_a29(_a4d,_a4e);
}else{
_a23(_a4d,_a4e);
}
}else{
$(_a4d).combobox("setValue",_a4e).combobox("hidePanel");
}
e.stopPropagation();
};
function _a4f(e){
var _a50=$(this).panel("options").comboTarget;
if(!_a50){
return;
}
var opts=$(_a50).combobox("options");
if(opts.groupPosition=="sticky"){
var _a51=$(this).children(".combobox-stick");
if(!_a51.length){
_a51=$("<div class=\"combobox-stick\"></div>").appendTo(this);
}
_a51.hide();
var _a52=$(_a50).data("combobox");
$(this).children(".combobox-group:visible").each(function(){
var g=$(this);
var _a53=opts.finder.getGroup(_a50,g);
var _a54=_a52.data[_a53.startIndex+_a53.count-1];
var last=opts.finder.getEl(_a50,_a54[opts.valueField]);
if(g.position().top<0&&last.position().top>0){
_a51.show().html(g.html());
return false;
}
});
}
};
$.fn.combobox=function(_a55,_a56){
if(typeof _a55=="string"){
var _a57=$.fn.combobox.methods[_a55];
if(_a57){
return _a57(this,_a56);
}else{
return this.combo(_a55,_a56);
}
}
_a55=_a55||{};
return this.each(function(){
var _a58=$.data(this,"combobox");
if(_a58){
$.extend(_a58.options,_a55);
}else{
_a58=$.data(this,"combobox",{options:$.extend({},$.fn.combobox.defaults,$.fn.combobox.parseOptions(this),_a55),data:[]});
}
_a46(this);
if(_a58.options.data){
_a33(this,_a58.options.data);
}else{
var data=$.fn.combobox.parseData(this);
if(data.length){
_a33(this,data);
}
}
_a37(this);
});
};
$.fn.combobox.methods={options:function(jq){
var _a59=jq.combo("options");
return $.extend($.data(jq[0],"combobox").options,{width:_a59.width,height:_a59.height,originalValue:_a59.originalValue,disabled:_a59.disabled,readonly:_a59.readonly});
},cloneFrom:function(jq,from){
return jq.each(function(){
$(this).combo("cloneFrom",from);
$.data(this,"combobox",$(from).data("combobox"));
$(this).addClass("combobox-f").attr("comboboxName",$(this).attr("textboxName"));
});
},getData:function(jq){
return $.data(jq[0],"combobox").data;
},setValues:function(jq,_a5a){
return jq.each(function(){
_a28(this,_a5a);
});
},setValue:function(jq,_a5b){
return jq.each(function(){
_a28(this,$.isArray(_a5b)?_a5b:[_a5b]);
});
},clear:function(jq){
return jq.each(function(){
_a28(this,[]);
});
},reset:function(jq){
return jq.each(function(){
var opts=$(this).combobox("options");
if(opts.multiple){
$(this).combobox("setValues",opts.originalValue);
}else{
$(this).combobox("setValue",opts.originalValue);
}
});
},loadData:function(jq,data){
return jq.each(function(){
_a33(this,data);
});
},reload:function(jq,url){
return jq.each(function(){
if(typeof url=="string"){
_a37(this,url);
}else{
if(url){
var opts=$(this).combobox("options");
opts.queryParams=url;
}
_a37(this);
}
});
},select:function(jq,_a5c){
return jq.each(function(){
_a23(this,_a5c);
});
},unselect:function(jq,_a5d){
return jq.each(function(){
_a29(this,_a5d);
});
},scrollTo:function(jq,_a5e){
return jq.each(function(){
_a1b(this,_a5e);
});
}};
$.fn.combobox.parseOptions=function(_a5f){
var t=$(_a5f);
return $.extend({},$.fn.combo.parseOptions(_a5f),$.parser.parseOptions(_a5f,["valueField","textField","groupField","groupPosition","mode","method","url",{showItemIcon:"boolean",limitToList:"boolean"}]));
};
$.fn.combobox.parseData=function(_a60){
var data=[];
var opts=$(_a60).combobox("options");
$(_a60).children().each(function(){
if(this.tagName.toLowerCase()=="optgroup"){
var _a61=$(this).attr("label");
$(this).children().each(function(){
_a62(this,_a61);
});
}else{
_a62(this);
}
});
return data;
function _a62(el,_a63){
var t=$(el);
var row={};
row[opts.valueField]=t.attr("value")!=undefined?t.attr("value"):t.text();
row[opts.textField]=t.text();
row["selected"]=t.is(":selected");
row["disabled"]=t.is(":disabled");
if(_a63){
opts.groupField=opts.groupField||"group";
row[opts.groupField]=_a63;
}
data.push(row);
};
};
var _a64=0;
var _a65={render:function(_a66,_a67,data){
var _a68=$.data(_a66,"combobox");
var opts=_a68.options;
_a64++;
_a68.itemIdPrefix="_extjsui_combobox_i"+_a64;
_a68.groupIdPrefix="_extjsui_combobox_g"+_a64;
_a68.groups=[];
var dd=[];
var _a69=undefined;
for(var i=0;i<data.length;i++){
var row=data[i];
var v=row[opts.valueField]+"";
var s=row[opts.textField];
var g=row[opts.groupField];
if(g){
if(_a69!=g){
_a69=g;
_a68.groups.push({value:g,startIndex:i,count:1});
dd.push("<div id=\""+(_a68.groupIdPrefix+"_"+(_a68.groups.length-1))+"\" class=\"combobox-group\">");
dd.push(opts.groupFormatter?opts.groupFormatter.call(_a66,g):g);
dd.push("</div>");
}else{
_a68.groups[_a68.groups.length-1].count++;
}
}else{
_a69=undefined;
}
var cls="combobox-item"+(row.disabled?" combobox-item-disabled":"")+(g?" combobox-gitem":"");
dd.push("<div id=\""+(_a68.itemIdPrefix+"_"+i)+"\" class=\""+cls+"\">");
if(opts.showItemIcon&&row.iconCls){
dd.push("<span class=\"combobox-icon "+row.iconCls+"\"></span>");
}
dd.push(opts.formatter?opts.formatter.call(_a66,row):s);
dd.push("</div>");
}
$(_a67).html(dd.join(""));
}};
$.fn.combobox.defaults=$.extend({},$.fn.combo.defaults,{valueField:"value",textField:"text",groupPosition:"static",groupField:null,groupFormatter:function(_a6a){
return _a6a;
},mode:"local",method:"post",url:null,data:null,queryParams:{},showItemIcon:false,limitToList:false,view:_a65,keyHandler:{up:function(e){
nav(this,"prev");
e.preventDefault();
},down:function(e){
nav(this,"next");
e.preventDefault();
},left:function(e){
},right:function(e){
},enter:function(e){
_a42(this);
},query:function(q,e){
_a3b(this,q);
}},inputEvents:$.extend({},$.fn.combo.defaults.inputEvents,{blur:function(e){
var _a6b=e.data.target;
var opts=$(_a6b).combobox("options");
if(opts.limitToList){
_a42(_a6b);
}
}}),panelEvents:{mouseover:_a4a,mouseout:_a4b,click:_a4c,scroll:_a4f},filter:function(q,row){
var opts=$(this).combobox("options");
return row[opts.textField].toLowerCase().indexOf(q.toLowerCase())>=0;
},formatter:function(row){
var opts=$(this).combobox("options");
return row[opts.textField];
},loader:function(_a6c,_a6d,_a6e){
var opts=$(this).combobox("options");
if(!opts.url){
return false;
}
$.ajax({type:opts.method,url:opts.url,data:_a6c,dataType:"json",success:function(data){
_a6d(data);
},error:function(){
_a6e.apply(this,arguments);
}});
},loadFilter:function(data){
return data;
},finder:{getEl:function(_a6f,_a70){
var _a71=_a17(_a6f,_a70);
var id=$.data(_a6f,"combobox").itemIdPrefix+"_"+_a71;
return $("#"+id);
},getGroupEl:function(_a72,_a73){
var _a74=$.data(_a72,"combobox");
var _a75=$.extjsui.indexOfArray(_a74.groups,"value",_a73);
var id=_a74.groupIdPrefix+"_"+_a75;
return $("#"+id);
},getGroup:function(_a76,p){
var _a77=$.data(_a76,"combobox");
var _a78=p.attr("id").substr(_a77.groupIdPrefix.length+1);
return _a77.groups[parseInt(_a78)];
},getRow:function(_a79,p){
var _a7a=$.data(_a79,"combobox");
var _a7b=(p instanceof $)?p.attr("id").substr(_a7a.itemIdPrefix.length+1):_a17(_a79,p);
return _a7a.data[parseInt(_a7b)];
}},onBeforeLoad:function(_a7c){
},onLoadSuccess:function(){
},onLoadError:function(){
},onSelect:function(_a7d){
},onUnselect:function(_a7e){
}});
})(jQuery);
(function($){
function _a7f(_a80){
var _a81=$.data(_a80,"combotree");
var opts=_a81.options;
var tree=_a81.tree;
$(_a80).addClass("combotree-f");
$(_a80).combo($.extend({},opts,{onShowPanel:function(){
if(opts.editable){
tree.tree("doFilter","");
}
opts.onShowPanel.call(this);
}}));
var _a82=$(_a80).combo("panel");
if(!tree){
tree=$("<ul></ul>").appendTo(_a82);
_a81.tree=tree;
}
tree.tree($.extend({},opts,{checkbox:opts.multiple,onLoadSuccess:function(node,data){
var _a83=$(_a80).combotree("getValues");
if(opts.multiple){
$.map(tree.tree("getChecked"),function(node){
$.extjsui.addArrayItem(_a83,node.id);
});
}
_a88(_a80,_a83,_a81.remainText);
opts.onLoadSuccess.call(this,node,data);
},onClick:function(node){
if(opts.multiple){
$(this).tree(node.checked?"uncheck":"check",node.target);
}else{
$(_a80).combo("hidePanel");
}
_a81.remainText=false;
_a85(_a80);
opts.onClick.call(this,node);
},onCheck:function(node,_a84){
_a81.remainText=false;
_a85(_a80);
opts.onCheck.call(this,node,_a84);
}}));
};
function _a85(_a86){
var _a87=$.data(_a86,"combotree");
var opts=_a87.options;
var tree=_a87.tree;
var vv=[];
if(opts.multiple){
vv=$.map(tree.tree("getChecked"),function(node){
return node.id;
});
}else{
var node=tree.tree("getSelected");
if(node){
vv.push(node.id);
}
}
vv=vv.concat(opts.unselectedValues);
_a88(_a86,vv,_a87.remainText);
};
function _a88(_a89,_a8a,_a8b){
var _a8c=$.data(_a89,"combotree");
var opts=_a8c.options;
var tree=_a8c.tree;
var _a8d=tree.tree("options");
var _a8e=_a8d.onBeforeCheck;
var _a8f=_a8d.onCheck;
var _a90=_a8d.onSelect;
_a8d.onBeforeCheck=_a8d.onCheck=_a8d.onSelect=function(){
};
if(!$.isArray(_a8a)){
_a8a=_a8a.split(opts.separator);
}
if(!opts.multiple){
_a8a=_a8a.length?[_a8a[0]]:[""];
}
var vv=$.map(_a8a,function(_a91){
return String(_a91);
});
tree.find("div.tree-node-selected").removeClass("tree-node-selected");
$.map(tree.tree("getChecked"),function(node){
if($.inArray(String(node.id),vv)==-1){
tree.tree("uncheck",node.target);
}
});
var ss=[];
opts.unselectedValues=[];
$.map(vv,function(v){
var node=tree.tree("find",v);
if(node){
tree.tree("check",node.target).tree("select",node.target);
ss.push(node.text);
}else{
ss.push(_a92(v,opts.mappingRows)||v);
opts.unselectedValues.push(v);
}
});
if(opts.multiple){
$.map(tree.tree("getChecked"),function(node){
var id=String(node.id);
if($.inArray(id,vv)==-1){
vv.push(id);
ss.push(node.text);
}
});
}
_a8d.onBeforeCheck=_a8e;
_a8d.onCheck=_a8f;
_a8d.onSelect=_a90;
if(!_a8b){
var s=ss.join(opts.separator);
if($(_a89).combo("getText")!=s){
$(_a89).combo("setText",s);
}
}
$(_a89).combo("setValues",vv);
function _a92(_a93,a){
var item=$.extjsui.getArrayItem(a,"id",_a93);
return item?item.text:undefined;
};
};
function _a94(_a95,q){
var _a96=$.data(_a95,"combotree");
var opts=_a96.options;
var tree=_a96.tree;
_a96.remainText=true;
tree.tree("doFilter",opts.multiple?q.split(opts.separator):q);
};
function _a97(_a98){
var _a99=$.data(_a98,"combotree");
_a99.remainText=false;
$(_a98).combotree("setValues",$(_a98).combotree("getValues"));
$(_a98).combotree("hidePanel");
};
$.fn.combotree=function(_a9a,_a9b){
if(typeof _a9a=="string"){
var _a9c=$.fn.combotree.methods[_a9a];
if(_a9c){
return _a9c(this,_a9b);
}else{
return this.combo(_a9a,_a9b);
}
}
_a9a=_a9a||{};
return this.each(function(){
var _a9d=$.data(this,"combotree");
if(_a9d){
$.extend(_a9d.options,_a9a);
}else{
$.data(this,"combotree",{options:$.extend({},$.fn.combotree.defaults,$.fn.combotree.parseOptions(this),_a9a)});
}
_a7f(this);
});
};
$.fn.combotree.methods={options:function(jq){
var _a9e=jq.combo("options");
return $.extend($.data(jq[0],"combotree").options,{width:_a9e.width,height:_a9e.height,originalValue:_a9e.originalValue,disabled:_a9e.disabled,readonly:_a9e.readonly});
},clone:function(jq,_a9f){
var t=jq.combo("clone",_a9f);
t.data("combotree",{options:$.extend(true,{},jq.combotree("options")),tree:jq.combotree("tree")});
return t;
},tree:function(jq){
return $.data(jq[0],"combotree").tree;
},loadData:function(jq,data){
return jq.each(function(){
var opts=$.data(this,"combotree").options;
opts.data=data;
var tree=$.data(this,"combotree").tree;
tree.tree("loadData",data);
});
},reload:function(jq,url){
return jq.each(function(){
var opts=$.data(this,"combotree").options;
var tree=$.data(this,"combotree").tree;
if(url){
opts.url=url;
}
tree.tree({url:opts.url});
});
},setValues:function(jq,_aa0){
return jq.each(function(){
var opts=$(this).combotree("options");
if($.isArray(_aa0)){
_aa0=$.map(_aa0,function(_aa1){
if(_aa1&&typeof _aa1=="object"){
$.extjsui.addArrayItem(opts.mappingRows,"id",_aa1);
return _aa1.id;
}else{
return _aa1;
}
});
}
_a88(this,_aa0);
});
},setValue:function(jq,_aa2){
return jq.each(function(){
$(this).combotree("setValues",$.isArray(_aa2)?_aa2:[_aa2]);
});
},clear:function(jq){
return jq.each(function(){
$(this).combotree("setValues",[]);
});
},reset:function(jq){
return jq.each(function(){
var opts=$(this).combotree("options");
if(opts.multiple){
$(this).combotree("setValues",opts.originalValue);
}else{
$(this).combotree("setValue",opts.originalValue);
}
});
}};
$.fn.combotree.parseOptions=function(_aa3){
return $.extend({},$.fn.combo.parseOptions(_aa3),$.fn.tree.parseOptions(_aa3));
};
$.fn.combotree.defaults=$.extend({},$.fn.combo.defaults,$.fn.tree.defaults,{editable:false,unselectedValues:[],mappingRows:[],keyHandler:{up:function(e){
},down:function(e){
},left:function(e){
},right:function(e){
},enter:function(e){
_a97(this);
},query:function(q,e){
_a94(this,q);
}}});
})(jQuery);
(function($){
function _aa4(_aa5){
var _aa6=$.data(_aa5,"combogrid");
var opts=_aa6.options;
var grid=_aa6.grid;
$(_aa5).addClass("combogrid-f").combo($.extend({},opts,{onShowPanel:function(){
var p=$(this).combogrid("panel");
var _aa7=p.outerHeight()-p.height();
var _aa8=p._size("minHeight");
var _aa9=p._size("maxHeight");
var dg=$(this).combogrid("grid");
dg.datagrid("resize",{width:"100%",height:(isNaN(parseInt(opts.panelHeight))?"auto":"100%"),minHeight:(_aa8?_aa8-_aa7:""),maxHeight:(_aa9?_aa9-_aa7:"")});
var row=dg.datagrid("getSelected");
if(row){
dg.datagrid("scrollTo",dg.datagrid("getRowIndex",row));
}
opts.onShowPanel.call(this);
}}));
var _aaa=$(_aa5).combo("panel");
if(!grid){
grid=$("<table></table>").appendTo(_aaa);
_aa6.grid=grid;
}
grid.datagrid($.extend({},opts,{border:false,singleSelect:(!opts.multiple),onLoadSuccess:function(data){
var _aab=$(_aa5).combo("getValues");
var _aac=opts.onSelect;
opts.onSelect=function(){
};
_ab2(_aa5,_aab,_aa6.remainText);
opts.onSelect=_aac;
opts.onLoadSuccess.apply(_aa5,arguments);
},onClickRow:_aad,onSelect:function(_aae,row){
_aaf();
opts.onSelect.call(this,_aae,row);
},onUnselect:function(_ab0,row){
_aaf();
opts.onUnselect.call(this,_ab0,row);
},onSelectAll:function(rows){
_aaf();
opts.onSelectAll.call(this,rows);
},onUnselectAll:function(rows){
if(opts.multiple){
_aaf();
}
opts.onUnselectAll.call(this,rows);
}}));
function _aad(_ab1,row){
_aa6.remainText=false;
_aaf();
if(!opts.multiple){
$(_aa5).combo("hidePanel");
}
opts.onClickRow.call(this,_ab1,row);
};
function _aaf(){
var vv=$.map(grid.datagrid("getSelections"),function(row){
return row[opts.idField];
});
vv=vv.concat(opts.unselectedValues);
_ab2(_aa5,vv,_aa6.remainText);
};
};
function nav(_ab3,dir){
var _ab4=$.data(_ab3,"combogrid");
var opts=_ab4.options;
var grid=_ab4.grid;
var _ab5=grid.datagrid("getRows").length;
if(!_ab5){
return;
}
var tr=opts.finder.getTr(grid[0],null,"highlight");
if(!tr.length){
tr=opts.finder.getTr(grid[0],null,"selected");
}
var _ab6;
if(!tr.length){
_ab6=(dir=="next"?0:_ab5-1);
}else{
var _ab6=parseInt(tr.attr("datagrid-row-index"));
_ab6+=(dir=="next"?1:-1);
if(_ab6<0){
_ab6=_ab5-1;
}
if(_ab6>=_ab5){
_ab6=0;
}
}
grid.datagrid("highlightRow",_ab6);
if(opts.selectOnNavigation){
_ab4.remainText=false;
grid.datagrid("selectRow",_ab6);
}
};
function _ab2(_ab7,_ab8,_ab9){
var _aba=$.data(_ab7,"combogrid");
var opts=_aba.options;
var grid=_aba.grid;
var _abb=$(_ab7).combo("getValues");
var _abc=$(_ab7).combo("options");
var _abd=_abc.onChange;
_abc.onChange=function(){
};
var _abe=grid.datagrid("options");
var _abf=_abe.onSelect;
var _ac0=_abe.onUnselectAll;
_abe.onSelect=_abe.onUnselectAll=function(){
};
if(!$.isArray(_ab8)){
_ab8=_ab8.split(opts.separator);
}
if(!opts.multiple){
_ab8=_ab8.length?[_ab8[0]]:[""];
}
var vv=$.map(_ab8,function(_ac1){
return String(_ac1);
});
vv=$.grep(vv,function(v,_ac2){
return _ac2===$.inArray(v,vv);
});
var _ac3=$.grep(grid.datagrid("getSelections"),function(row,_ac4){
return $.inArray(String(row[opts.idField]),vv)>=0;
});
grid.datagrid("clearSelections");
grid.data("datagrid").selectedRows=_ac3;
var ss=[];
opts.unselectedValues=[];
$.map(vv,function(v){
var _ac5=grid.datagrid("getRowIndex",v);
if(_ac5>=0){
grid.datagrid("selectRow",_ac5);
}else{
opts.unselectedValues.push(v);
}
ss.push(_ac6(v,grid.datagrid("getRows"))||_ac6(v,_ac3)||_ac6(v,opts.mappingRows)||v);
});
$(_ab7).combo("setValues",_abb);
_abc.onChange=_abd;
_abe.onSelect=_abf;
_abe.onUnselectAll=_ac0;
if(!_ab9){
var s=ss.join(opts.separator);
if($(_ab7).combo("getText")!=s){
$(_ab7).combo("setText",s);
}
}
$(_ab7).combo("setValues",_ab8);
function _ac6(_ac7,a){
var item=$.extjsui.getArrayItem(a,opts.idField,_ac7);
return item?item[opts.textField]:undefined;
};
};
function _ac8(_ac9,q){
var _aca=$.data(_ac9,"combogrid");
var opts=_aca.options;
var grid=_aca.grid;
_aca.remainText=true;
if(opts.multiple&&!q){
_ab2(_ac9,[],true);
}else{
_ab2(_ac9,[q],true);
}
if(opts.mode=="remote"){
grid.datagrid("clearSelections");
grid.datagrid("load",$.extend({},opts.queryParams,{q:q}));
}else{
if(!q){
return;
}
grid.datagrid("clearSelections").datagrid("highlightRow",-1);
var rows=grid.datagrid("getRows");
var qq=opts.multiple?q.split(opts.separator):[q];
$.map(qq,function(q){
q=$.trim(q);
if(q){
$.map(rows,function(row,i){
if(q==row[opts.textField]){
grid.datagrid("selectRow",i);
}else{
if(opts.filter.call(_ac9,q,row)){
grid.datagrid("highlightRow",i);
}
}
});
}
});
}
};
function _acb(_acc){
var _acd=$.data(_acc,"combogrid");
var opts=_acd.options;
var grid=_acd.grid;
var tr=opts.finder.getTr(grid[0],null,"highlight");
_acd.remainText=false;
if(tr.length){
var _ace=parseInt(tr.attr("datagrid-row-index"));
if(opts.multiple){
if(tr.hasClass("datagrid-row-selected")){
grid.datagrid("unselectRow",_ace);
}else{
grid.datagrid("selectRow",_ace);
}
}else{
grid.datagrid("selectRow",_ace);
}
}
var vv=[];
$.map(grid.datagrid("getSelections"),function(row){
vv.push(row[opts.idField]);
});
$(_acc).combogrid("setValues",vv);
if(!opts.multiple){
$(_acc).combogrid("hidePanel");
}
};
$.fn.combogrid=function(_acf,_ad0){
if(typeof _acf=="string"){
var _ad1=$.fn.combogrid.methods[_acf];
if(_ad1){
return _ad1(this,_ad0);
}else{
return this.combo(_acf,_ad0);
}
}
_acf=_acf||{};
return this.each(function(){
var _ad2=$.data(this,"combogrid");
if(_ad2){
$.extend(_ad2.options,_acf);
}else{
_ad2=$.data(this,"combogrid",{options:$.extend({},$.fn.combogrid.defaults,$.fn.combogrid.parseOptions(this),_acf)});
}
_aa4(this);
});
};
$.fn.combogrid.methods={options:function(jq){
var _ad3=jq.combo("options");
return $.extend($.data(jq[0],"combogrid").options,{width:_ad3.width,height:_ad3.height,originalValue:_ad3.originalValue,disabled:_ad3.disabled,readonly:_ad3.readonly});
},grid:function(jq){
return $.data(jq[0],"combogrid").grid;
},setValues:function(jq,_ad4){
return jq.each(function(){
var opts=$(this).combogrid("options");
if($.isArray(_ad4)){
_ad4=$.map(_ad4,function(_ad5){
if(_ad5&&typeof _ad5=="object"){
$.extjsui.addArrayItem(opts.mappingRows,opts.idField,_ad5);
return _ad5[opts.idField];
}else{
return _ad5;
}
});
}
_ab2(this,_ad4);
});
},setValue:function(jq,_ad6){
return jq.each(function(){
$(this).combogrid("setValues",$.isArray(_ad6)?_ad6:[_ad6]);
});
},clear:function(jq){
return jq.each(function(){
$(this).combogrid("setValues",[]);
});
},reset:function(jq){
return jq.each(function(){
var opts=$(this).combogrid("options");
if(opts.multiple){
$(this).combogrid("setValues",opts.originalValue);
}else{
$(this).combogrid("setValue",opts.originalValue);
}
});
}};
$.fn.combogrid.parseOptions=function(_ad7){
var t=$(_ad7);
return $.extend({},$.fn.combo.parseOptions(_ad7),$.fn.datagrid.parseOptions(_ad7),$.parser.parseOptions(_ad7,["idField","textField","mode"]));
};
$.fn.combogrid.defaults=$.extend({},$.fn.combo.defaults,$.fn.datagrid.defaults,{loadMsg:null,idField:null,textField:null,unselectedValues:[],mappingRows:[],mode:"local",keyHandler:{up:function(e){
nav(this,"prev");
e.preventDefault();
},down:function(e){
nav(this,"next");
e.preventDefault();
},left:function(e){
},right:function(e){
},enter:function(e){
_acb(this);
},query:function(q,e){
_ac8(this,q);
}},filter:function(q,row){
var opts=$(this).combogrid("options");
return (row[opts.textField]||"").toLowerCase().indexOf(q.toLowerCase())>=0;
}});
})(jQuery);
(function($){
function _ad8(_ad9){
var _ada=$.data(_ad9,"combotreegrid");
var opts=_ada.options;
$(_ad9).addClass("combotreegrid-f").combo($.extend({},opts,{onShowPanel:function(){
var p=$(this).combotreegrid("panel");
var _adb=p.outerHeight()-p.height();
var _adc=p._size("minHeight");
var _add=p._size("maxHeight");
var dg=$(this).combotreegrid("grid");
dg.treegrid("resize",{width:"100%",height:(isNaN(parseInt(opts.panelHeight))?"auto":"100%"),minHeight:(_adc?_adc-_adb:""),maxHeight:(_add?_add-_adb:"")});
var row=dg.treegrid("getSelected");
if(row){
dg.treegrid("scrollTo",row[opts.idField]);
}
opts.onShowPanel.call(this);
}}));
if(!_ada.grid){
var _ade=$(_ad9).combo("panel");
_ada.grid=$("<table></table>").appendTo(_ade);
}
_ada.grid.treegrid($.extend({},opts,{border:false,checkbox:opts.multiple,onLoadSuccess:function(row,data){
var _adf=$(_ad9).combotreegrid("getValues");
if(opts.multiple){
$.map($(this).treegrid("getCheckedNodes"),function(row){
$.extjsui.addArrayItem(_adf,row[opts.idField]);
});
}
_ae4(_ad9,_adf);
opts.onLoadSuccess.call(this,row,data);
_ada.remainText=false;
},onClickRow:function(row){
if(opts.multiple){
$(this).treegrid(row.checked?"uncheckNode":"checkNode",row[opts.idField]);
$(this).treegrid("unselect",row[opts.idField]);
}else{
$(_ad9).combo("hidePanel");
}
_ae1(_ad9);
opts.onClickRow.call(this,row);
},onCheckNode:function(row,_ae0){
_ae1(_ad9);
opts.onCheckNode.call(this,row,_ae0);
}}));
};
function _ae1(_ae2){
var _ae3=$.data(_ae2,"combotreegrid");
var opts=_ae3.options;
var grid=_ae3.grid;
var vv=[];
if(opts.multiple){
vv=$.map(grid.treegrid("getCheckedNodes"),function(row){
return row[opts.idField];
});
}else{
var row=grid.treegrid("getSelected");
if(row){
vv.push(row[opts.idField]);
}
}
vv=vv.concat(opts.unselectedValues);
_ae4(_ae2,vv);
};
function _ae4(_ae5,_ae6){
var _ae7=$.data(_ae5,"combotreegrid");
var opts=_ae7.options;
var grid=_ae7.grid;
if(!$.isArray(_ae6)){
_ae6=_ae6.split(opts.separator);
}
if(!opts.multiple){
_ae6=_ae6.length?[_ae6[0]]:[""];
}
var vv=$.map(_ae6,function(_ae8){
return String(_ae8);
});
vv=$.grep(vv,function(v,_ae9){
return _ae9===$.inArray(v,vv);
});
var _aea=grid.treegrid("getSelected");
if(_aea){
grid.treegrid("unselect",_aea[opts.idField]);
}
$.map(grid.treegrid("getCheckedNodes"),function(row){
if($.inArray(String(row[opts.idField]),vv)==-1){
grid.treegrid("uncheckNode",row[opts.idField]);
}
});
var ss=[];
opts.unselectedValues=[];
$.map(vv,function(v){
var row=grid.treegrid("find",v);
if(row){
if(opts.multiple){
grid.treegrid("checkNode",v);
}else{
grid.treegrid("select",v);
}
ss.push(row[opts.treeField]);
}else{
ss.push(_aeb(v,opts.mappingRows)||v);
opts.unselectedValues.push(v);
}
});
if(opts.multiple){
$.map(grid.treegrid("getCheckedNodes"),function(row){
var id=String(row[opts.idField]);
if($.inArray(id,vv)==-1){
vv.push(id);
ss.push(row[opts.treeField]);
}
});
}
if(!_ae7.remainText){
var s=ss.join(opts.separator);
if($(_ae5).combo("getText")!=s){
$(_ae5).combo("setText",s);
}
}
$(_ae5).combo("setValues",vv);
function _aeb(_aec,a){
var item=$.extjsui.getArrayItem(a,opts.idField,_aec);
return item?item[opts.treeField]:undefined;
};
};
function _aed(_aee,q){
var _aef=$.data(_aee,"combotreegrid");
var opts=_aef.options;
var grid=_aef.grid;
_aef.remainText=true;
grid.treegrid("clearSelections").treegrid("clearChecked").treegrid("highlightRow",-1);
if(opts.mode=="remote"){
$(_aee).combotreegrid("clear");
grid.treegrid("load",$.extend({},opts.queryParams,{q:q}));
}else{
if(q){
var data=grid.treegrid("getData");
var vv=[];
var qq=opts.multiple?q.split(opts.separator):[q];
$.map(qq,function(q){
q=$.trim(q);
if(q){
var v=undefined;
$.extjsui.forEach(data,true,function(row){
if(q.toLowerCase()==String(row[opts.treeField]).toLowerCase()){
v=row[opts.idField];
return false;
}else{
if(opts.filter.call(_aee,q,row)){
grid.treegrid("expandTo",row[opts.idField]);
grid.treegrid("highlightRow",row[opts.idField]);
return false;
}
}
});
if(v==undefined){
$.extjsui.forEach(opts.mappingRows,false,function(row){
if(q.toLowerCase()==String(row[opts.treeField])){
v=row[opts.idField];
return false;
}
});
}
if(v!=undefined){
vv.push(v);
}
}
});
_ae4(_aee,vv);
_aef.remainText=false;
}
}
};
function _af0(_af1){
_ae1(_af1);
};
$.fn.combotreegrid=function(_af2,_af3){
if(typeof _af2=="string"){
var _af4=$.fn.combotreegrid.methods[_af2];
if(_af4){
return _af4(this,_af3);
}else{
return this.combo(_af2,_af3);
}
}
_af2=_af2||{};
return this.each(function(){
var _af5=$.data(this,"combotreegrid");
if(_af5){
$.extend(_af5.options,_af2);
}else{
_af5=$.data(this,"combotreegrid",{options:$.extend({},$.fn.combotreegrid.defaults,$.fn.combotreegrid.parseOptions(this),_af2)});
}
_ad8(this);
});
};
$.fn.combotreegrid.methods={options:function(jq){
var _af6=jq.combo("options");
return $.extend($.data(jq[0],"combotreegrid").options,{width:_af6.width,height:_af6.height,originalValue:_af6.originalValue,disabled:_af6.disabled,readonly:_af6.readonly});
},grid:function(jq){
return $.data(jq[0],"combotreegrid").grid;
},setValues:function(jq,_af7){
return jq.each(function(){
var opts=$(this).combotreegrid("options");
if($.isArray(_af7)){
_af7=$.map(_af7,function(_af8){
if(_af8&&typeof _af8=="object"){
$.extjsui.addArrayItem(opts.mappingRows,opts.idField,_af8);
return _af8[opts.idField];
}else{
return _af8;
}
});
}
_ae4(this,_af7);
});
},setValue:function(jq,_af9){
return jq.each(function(){
$(this).combotreegrid("setValues",$.isArray(_af9)?_af9:[_af9]);
});
},clear:function(jq){
return jq.each(function(){
$(this).combotreegrid("setValues",[]);
});
},reset:function(jq){
return jq.each(function(){
var opts=$(this).combotreegrid("options");
if(opts.multiple){
$(this).combotreegrid("setValues",opts.originalValue);
}else{
$(this).combotreegrid("setValue",opts.originalValue);
}
});
}};
$.fn.combotreegrid.parseOptions=function(_afa){
var t=$(_afa);
return $.extend({},$.fn.combo.parseOptions(_afa),$.fn.treegrid.parseOptions(_afa),$.parser.parseOptions(_afa,["mode",{limitToGrid:"boolean"}]));
};
$.fn.combotreegrid.defaults=$.extend({},$.fn.combo.defaults,$.fn.treegrid.defaults,{editable:false,singleSelect:true,limitToGrid:false,unselectedValues:[],mappingRows:[],mode:"local",keyHandler:{up:function(e){
},down:function(e){
},left:function(e){
},right:function(e){
},enter:function(e){
_af0(this);
},query:function(q,e){
_aed(this,q);
}},inputEvents:$.extend({},$.fn.combo.defaults.inputEvents,{blur:function(e){
var _afb=e.data.target;
var opts=$(_afb).combotreegrid("options");
if(opts.limitToGrid){
_af0(_afb);
}
}}),filter:function(q,row){
var opts=$(this).combotreegrid("options");
return (row[opts.treeField]||"").toLowerCase().indexOf(q.toLowerCase())>=0;
}});
})(jQuery);
(function($){
function _afc(_afd){
var _afe=$.data(_afd,"datebox");
var opts=_afe.options;
$(_afd).addClass("datebox-f").combo($.extend({},opts,{onShowPanel:function(){
_aff(this);
_b00(this);
_b01(this);
_b0f(this,$(this).datebox("getText"),true);
opts.onShowPanel.call(this);
}}));
if(!_afe.calendar){
var _b02=$(_afd).combo("panel").css("overflow","hidden");
_b02.panel("options").onBeforeDestroy=function(){
var c=$(this).find(".calendar-shared");
if(c.length){
c.insertBefore(c[0].pholder);
}
};
var cc=$("<div class=\"datebox-calendar-inner\"></div>").prependTo(_b02);
if(opts.sharedCalendar){
var c=$(opts.sharedCalendar);
if(!c[0].pholder){
c[0].pholder=$("<div class=\"calendar-pholder\" style=\"display:none\"></div>").insertAfter(c);
}
c.addClass("calendar-shared").appendTo(cc);
if(!c.hasClass("calendar")){
c.calendar();
}
_afe.calendar=c;
}else{
_afe.calendar=$("<div></div>").appendTo(cc).calendar();
}
$.extend(_afe.calendar.calendar("options"),{fit:true,border:false,onSelect:function(date){
var _b03=this.target;
var opts=$(_b03).datebox("options");
_b0f(_b03,opts.formatter.call(_b03,date));
$(_b03).combo("hidePanel");
opts.onSelect.call(_b03,date);
}});
}
$(_afd).combo("textbox").parent().addClass("datebox");
$(_afd).datebox("initValue",opts.value);
function _aff(_b04){
var opts=$(_b04).datebox("options");
var _b05=$(_b04).combo("panel");
_b05.unbind(".datebox").bind("click.datebox",function(e){
if($(e.target).hasClass("datebox-button-a")){
var _b06=parseInt($(e.target).attr("datebox-button-index"));
opts.buttons[_b06].handler.call(e.target,_b04);
}
});
};
function _b00(_b07){
var _b08=$(_b07).combo("panel");
if(_b08.children("div.datebox-button").length){
return;
}
var _b09=$("<div class=\"datebox-button\"><table cellspacing=\"0\" cellpadding=\"0\" style=\"width:100%\"><tr></tr></table></div>").appendTo(_b08);
var tr=_b09.find("tr");
for(var i=0;i<opts.buttons.length;i++){
var td=$("<td></td>").appendTo(tr);
var btn=opts.buttons[i];
var t=$("<a class=\"datebox-button-a\" href=\"javascript:void(0)\"></a>").html($.isFunction(btn.text)?btn.text(_b07):btn.text).appendTo(td);
t.attr("datebox-button-index",i);
}
tr.find("td").css("width",(100/opts.buttons.length)+"%");
};
function _b01(_b0a){
var _b0b=$(_b0a).combo("panel");
var cc=_b0b.children("div.datebox-calendar-inner");
_b0b.children()._outerWidth(_b0b.width());
_afe.calendar.appendTo(cc);
_afe.calendar[0].target=_b0a;
if(opts.panelHeight!="auto"){
var _b0c=_b0b.height();
_b0b.children().not(cc).each(function(){
_b0c-=$(this).outerHeight();
});
cc._outerHeight(_b0c);
}
_afe.calendar.calendar("resize");
};
};
function _b0d(_b0e,q){
_b0f(_b0e,q,true);
};
function _b10(_b11){
var _b12=$.data(_b11,"datebox");
var opts=_b12.options;
var _b13=_b12.calendar.calendar("options").current;
if(_b13){
_b0f(_b11,opts.formatter.call(_b11,_b13));
$(_b11).combo("hidePanel");
}
};
function _b0f(_b14,_b15,_b16){
var _b17=$.data(_b14,"datebox");
var opts=_b17.options;
var _b18=_b17.calendar;
_b18.calendar("moveTo",opts.parser.call(_b14,_b15));
if(_b16){
$(_b14).combo("setValue",_b15);
}else{
if(_b15){
_b15=opts.formatter.call(_b14,_b18.calendar("options").current);
}
$(_b14).combo("setText",_b15).combo("setValue",_b15);
}
};
$.fn.datebox=function(_b19,_b1a){
if(typeof _b19=="string"){
var _b1b=$.fn.datebox.methods[_b19];
if(_b1b){
return _b1b(this,_b1a);
}else{
return this.combo(_b19,_b1a);
}
}
_b19=_b19||{};
return this.each(function(){
var _b1c=$.data(this,"datebox");
if(_b1c){
$.extend(_b1c.options,_b19);
}else{
$.data(this,"datebox",{options:$.extend({},$.fn.datebox.defaults,$.fn.datebox.parseOptions(this),_b19)});
}
_afc(this);
});
};
$.fn.datebox.methods={options:function(jq){
var _b1d=jq.combo("options");
return $.extend($.data(jq[0],"datebox").options,{width:_b1d.width,height:_b1d.height,originalValue:_b1d.originalValue,disabled:_b1d.disabled,readonly:_b1d.readonly});
},cloneFrom:function(jq,from){
return jq.each(function(){
$(this).combo("cloneFrom",from);
$.data(this,"datebox",{options:$.extend(true,{},$(from).datebox("options")),calendar:$(from).datebox("calendar")});
$(this).addClass("datebox-f");
});
},calendar:function(jq){
return $.data(jq[0],"datebox").calendar;
},initValue:function(jq,_b1e){
return jq.each(function(){
var opts=$(this).datebox("options");
var _b1f=opts.value;
if(_b1f){
_b1f=opts.formatter.call(this,opts.parser.call(this,_b1f));
}
$(this).combo("initValue",_b1f).combo("setText",_b1f);
});
},setValue:function(jq,_b20){
return jq.each(function(){
_b0f(this,_b20);
});
},reset:function(jq){
return jq.each(function(){
var opts=$(this).datebox("options");
$(this).datebox("setValue",opts.originalValue);
});
}};
$.fn.datebox.parseOptions=function(_b21){
return $.extend({},$.fn.combo.parseOptions(_b21),$.parser.parseOptions(_b21,["sharedCalendar"]));
};
$.fn.datebox.defaults=$.extend({},$.fn.combo.defaults,{panelWidth:180,panelHeight:"auto",sharedCalendar:null,keyHandler:{up:function(e){
},down:function(e){
},left:function(e){
},right:function(e){
},enter:function(e){
_b10(this);
},query:function(q,e){
_b0d(this,q);
}},currentText:"Today",closeText:"Close",okText:"Ok",buttons:[{text:function(_b22){
return $(_b22).datebox("options").currentText;
},handler:function(_b23){
var now=new Date();
$(_b23).datebox("calendar").calendar({year:now.getFullYear(),month:now.getMonth()+1,current:new Date(now.getFullYear(),now.getMonth(),now.getDate())});
_b10(_b23);
}},{text:function(_b24){
return $(_b24).datebox("options").closeText;
},handler:function(_b25){
$(this).closest("div.combo-panel").panel("close");
}}],formatter:function(date){
var y=date.getFullYear();
var m=date.getMonth()+1;
var d=date.getDate();
return (m<10?("0"+m):m)+"/"+(d<10?("0"+d):d)+"/"+y;
},parser:function(s){
if(!s){
return new Date();
}
var ss=s.split("/");
var m=parseInt(ss[0],10);
var d=parseInt(ss[1],10);
var y=parseInt(ss[2],10);
if(!isNaN(y)&&!isNaN(m)&&!isNaN(d)){
return new Date(y,m-1,d);
}else{
return new Date();
}
},onSelect:function(date){
}});
})(jQuery);
(function($){
function _b26(_b27){
var _b28=$.data(_b27,"datetimebox");
var opts=_b28.options;
$(_b27).datebox($.extend({},opts,{onShowPanel:function(){
var _b29=$(this).datetimebox("getValue");
_b2f(this,_b29,true);
opts.onShowPanel.call(this);
},formatter:$.fn.datebox.defaults.formatter,parser:$.fn.datebox.defaults.parser}));
$(_b27).removeClass("datebox-f").addClass("datetimebox-f");
$(_b27).datebox("calendar").calendar({onSelect:function(date){
opts.onSelect.call(this.target,date);
}});
if(!_b28.spinner){
var _b2a=$(_b27).datebox("panel");
var p=$("<div style=\"padding:2px\"><input></div>").insertAfter(_b2a.children("div.datebox-calendar-inner"));
_b28.spinner=p.children("input");
}
_b28.spinner.timespinner({width:opts.spinnerWidth,showSeconds:opts.showSeconds,separator:opts.timeSeparator});
$(_b27).datetimebox("initValue",opts.value);
};
function _b2b(_b2c){
var c=$(_b2c).datetimebox("calendar");
var t=$(_b2c).datetimebox("spinner");
var date=c.calendar("options").current;
return new Date(date.getFullYear(),date.getMonth(),date.getDate(),t.timespinner("getHours"),t.timespinner("getMinutes"),t.timespinner("getSeconds"));
};
function _b2d(_b2e,q){
_b2f(_b2e,q,true);
};
function _b30(_b31){
var opts=$.data(_b31,"datetimebox").options;
var date=_b2b(_b31);
_b2f(_b31,opts.formatter.call(_b31,date));
$(_b31).combo("hidePanel");
};
function _b2f(_b32,_b33,_b34){
var opts=$.data(_b32,"datetimebox").options;
$(_b32).combo("setValue",_b33);
if(!_b34){
if(_b33){
var date=opts.parser.call(_b32,_b33);
$(_b32).combo("setText",opts.formatter.call(_b32,date));
$(_b32).combo("setValue",opts.formatter.call(_b32,date));
}else{
$(_b32).combo("setText",_b33);
}
}
var date=opts.parser.call(_b32,_b33);
$(_b32).datetimebox("calendar").calendar("moveTo",date);
$(_b32).datetimebox("spinner").timespinner("setValue",_b35(date));
function _b35(date){
function _b36(_b37){
return (_b37<10?"0":"")+_b37;
};
var tt=[_b36(date.getHours()),_b36(date.getMinutes())];
if(opts.showSeconds){
tt.push(_b36(date.getSeconds()));
}
return tt.join($(_b32).datetimebox("spinner").timespinner("options").separator);
};
};
$.fn.datetimebox=function(_b38,_b39){
if(typeof _b38=="string"){
var _b3a=$.fn.datetimebox.methods[_b38];
if(_b3a){
return _b3a(this,_b39);
}else{
return this.datebox(_b38,_b39);
}
}
_b38=_b38||{};
return this.each(function(){
var _b3b=$.data(this,"datetimebox");
if(_b3b){
$.extend(_b3b.options,_b38);
}else{
$.data(this,"datetimebox",{options:$.extend({},$.fn.datetimebox.defaults,$.fn.datetimebox.parseOptions(this),_b38)});
}
_b26(this);
});
};
$.fn.datetimebox.methods={options:function(jq){
var _b3c=jq.datebox("options");
return $.extend($.data(jq[0],"datetimebox").options,{originalValue:_b3c.originalValue,disabled:_b3c.disabled,readonly:_b3c.readonly});
},cloneFrom:function(jq,from){
return jq.each(function(){
$(this).datebox("cloneFrom",from);
$.data(this,"datetimebox",{options:$.extend(true,{},$(from).datetimebox("options")),spinner:$(from).datetimebox("spinner")});
$(this).removeClass("datebox-f").addClass("datetimebox-f");
});
},spinner:function(jq){
return $.data(jq[0],"datetimebox").spinner;
},initValue:function(jq,_b3d){
return jq.each(function(){
var opts=$(this).datetimebox("options");
var _b3e=opts.value;
if(_b3e){
_b3e=opts.formatter.call(this,opts.parser.call(this,_b3e));
}
$(this).combo("initValue",_b3e).combo("setText",_b3e);
});
},setValue:function(jq,_b3f){
return jq.each(function(){
_b2f(this,_b3f);
});
},reset:function(jq){
return jq.each(function(){
var opts=$(this).datetimebox("options");
$(this).datetimebox("setValue",opts.originalValue);
});
}};
$.fn.datetimebox.parseOptions=function(_b40){
var t=$(_b40);
return $.extend({},$.fn.datebox.parseOptions(_b40),$.parser.parseOptions(_b40,["timeSeparator","spinnerWidth",{showSeconds:"boolean"}]));
};
$.fn.datetimebox.defaults=$.extend({},$.fn.datebox.defaults,{spinnerWidth:"100%",showSeconds:true,timeSeparator:":",keyHandler:{up:function(e){
},down:function(e){
},left:function(e){
},right:function(e){
},enter:function(e){
_b30(this);
},query:function(q,e){
_b2d(this,q);
}},buttons:[{text:function(_b41){
return $(_b41).datetimebox("options").currentText;
},handler:function(_b42){
var opts=$(_b42).datetimebox("options");
_b2f(_b42,opts.formatter.call(_b42,new Date()));
$(_b42).datetimebox("hidePanel");
}},{text:function(_b43){
return $(_b43).datetimebox("options").okText;
},handler:function(_b44){
_b30(_b44);
}},{text:function(_b45){
return $(_b45).datetimebox("options").closeText;
},handler:function(_b46){
$(_b46).datetimebox("hidePanel");
}}],formatter:function(date){
var h=date.getHours();
var M=date.getMinutes();
var s=date.getSeconds();
function _b47(_b48){
return (_b48<10?"0":"")+_b48;
};
var _b49=$(this).datetimebox("spinner").timespinner("options").separator;
var r=$.fn.datebox.defaults.formatter(date)+" "+_b47(h)+_b49+_b47(M);
if($(this).datetimebox("options").showSeconds){
r+=_b49+_b47(s);
}
return r;
},parser:function(s){
if($.trim(s)==""){
return new Date();
}
var dt=s.split(" ");
var d=$.fn.datebox.defaults.parser(dt[0]);
if(dt.length<2){
return d;
}
var _b4a=$(this).datetimebox("spinner").timespinner("options").separator;
var tt=dt[1].split(_b4a);
var hour=parseInt(tt[0],10)||0;
var _b4b=parseInt(tt[1],10)||0;
var _b4c=parseInt(tt[2],10)||0;
return new Date(d.getFullYear(),d.getMonth(),d.getDate(),hour,_b4b,_b4c);
}});
})(jQuery);
(function($){
function init(_b4d){
var _b4e=$("<div class=\"slider\">"+"<div class=\"slider-inner\">"+"<a href=\"javascript:void(0)\" class=\"slider-handle\"></a>"+"<span class=\"slider-tip\"></span>"+"</div>"+"<div class=\"slider-rule\"></div>"+"<div class=\"slider-rulelabel\"></div>"+"<div style=\"clear:both\"></div>"+"<input type=\"hidden\" class=\"slider-value\">"+"</div>").insertAfter(_b4d);
var t=$(_b4d);
t.addClass("slider-f").hide();
var name=t.attr("name");
if(name){
_b4e.find("input.slider-value").attr("name",name);
t.removeAttr("name").attr("sliderName",name);
}
_b4e.bind("_resize",function(e,_b4f){
if($(this).hasClass("extjsui-fluid")||_b4f){
_b50(_b4d);
}
return false;
});
return _b4e;
};
function _b50(_b51,_b52){
var _b53=$.data(_b51,"slider");
var opts=_b53.options;
var _b54=_b53.slider;
if(_b52){
if(_b52.width){
opts.width=_b52.width;
}
if(_b52.height){
opts.height=_b52.height;
}
}
_b54._size(opts);
if(opts.mode=="h"){
_b54.css("height","");
_b54.children("div").css("height","");
}else{
_b54.css("width","");
_b54.children("div").css("width","");
_b54.children("div.slider-rule,div.slider-rulelabel,div.slider-inner")._outerHeight(_b54._outerHeight());
}
_b55(_b51);
};
function _b56(_b57){
var _b58=$.data(_b57,"slider");
var opts=_b58.options;
var _b59=_b58.slider;
var aa=opts.mode=="h"?opts.rule:opts.rule.slice(0).reverse();
if(opts.reversed){
aa=aa.slice(0).reverse();
}
_b5a(aa);
function _b5a(aa){
var rule=_b59.find("div.slider-rule");
var _b5b=_b59.find("div.slider-rulelabel");
rule.empty();
_b5b.empty();
for(var i=0;i<aa.length;i++){
var _b5c=i*100/(aa.length-1)+"%";
var span=$("<span></span>").appendTo(rule);
span.css((opts.mode=="h"?"left":"top"),_b5c);
if(aa[i]!="|"){
span=$("<span></span>").appendTo(_b5b);
span.html(aa[i]);
if(opts.mode=="h"){
span.css({left:_b5c,marginLeft:-Math.round(span.outerWidth()/2)});
}else{
span.css({top:_b5c,marginTop:-Math.round(span.outerHeight()/2)});
}
}
}
};
};
function _b5d(_b5e){
var _b5f=$.data(_b5e,"slider");
var opts=_b5f.options;
var _b60=_b5f.slider;
_b60.removeClass("slider-h slider-v slider-disabled");
_b60.addClass(opts.mode=="h"?"slider-h":"slider-v");
_b60.addClass(opts.disabled?"slider-disabled":"");
var _b61=_b60.find(".slider-inner");
_b61.html("<a href=\"javascript:void(0)\" class=\"slider-handle\"></a>"+"<span class=\"slider-tip\"></span>");
if(opts.range){
_b61.append("<a href=\"javascript:void(0)\" class=\"slider-handle\"></a>"+"<span class=\"slider-tip\"></span>");
}
_b60.find("a.slider-handle").draggable({axis:opts.mode,cursor:"pointer",disabled:opts.disabled,onDrag:function(e){
var left=e.data.left;
var _b62=_b60.width();
if(opts.mode!="h"){
left=e.data.top;
_b62=_b60.height();
}
if(left<0||left>_b62){
return false;
}else{
_b63(left,this);
return false;
}
},onStartDrag:function(){
_b5f.isDragging=true;
opts.onSlideStart.call(_b5e,opts.value);
},onStopDrag:function(e){
_b63(opts.mode=="h"?e.data.left:e.data.top,this);
opts.onSlideEnd.call(_b5e,opts.value);
opts.onComplete.call(_b5e,opts.value);
_b5f.isDragging=false;
}});
_b60.find("div.slider-inner").unbind(".slider").bind("mousedown.slider",function(e){
if(_b5f.isDragging||opts.disabled){
return;
}
var pos=$(this).offset();
_b63(opts.mode=="h"?(e.pageX-pos.left):(e.pageY-pos.top));
opts.onComplete.call(_b5e,opts.value);
});
function _b63(pos,_b64){
var _b65=_b66(_b5e,pos);
var s=Math.abs(_b65%opts.step);
if(s<opts.step/2){
_b65-=s;
}else{
_b65=_b65-s+opts.step;
}
if(opts.range){
var v1=opts.value[0];
var v2=opts.value[1];
var m=parseFloat((v1+v2)/2);
if(_b64){
var _b67=$(_b64).nextAll(".slider-handle").length>0;
if(_b65<=v2&&_b67){
v1=_b65;
}else{
if(_b65>=v1&&(!_b67)){
v2=_b65;
}
}
}else{
if(_b65<v1){
v1=_b65;
}else{
if(_b65>v2){
v2=_b65;
}else{
_b65<m?v1=_b65:v2=_b65;
}
}
}
$(_b5e).slider("setValues",[v1,v2]);
}else{
$(_b5e).slider("setValue",_b65);
}
};
};
function _b68(_b69,_b6a){
var _b6b=$.data(_b69,"slider");
var opts=_b6b.options;
var _b6c=_b6b.slider;
var _b6d=$.isArray(opts.value)?opts.value:[opts.value];
var _b6e=[];
if(!$.isArray(_b6a)){
_b6a=$.map(String(_b6a).split(opts.separator),function(v){
return parseFloat(v);
});
}
_b6c.find(".slider-value").remove();
var name=$(_b69).attr("sliderName")||"";
for(var i=0;i<_b6a.length;i++){
var _b6f=_b6a[i];
if(_b6f<opts.min){
_b6f=opts.min;
}
if(_b6f>opts.max){
_b6f=opts.max;
}
var _b70=$("<input type=\"hidden\" class=\"slider-value\">").appendTo(_b6c);
_b70.attr("name",name);
_b70.val(_b6f);
_b6e.push(_b6f);
var _b71=_b6c.find(".slider-handle:eq("+i+")");
var tip=_b71.next();
var pos=_b72(_b69,_b6f);
if(opts.showTip){
tip.show();
tip.html(opts.tipFormatter.call(_b69,_b6f));
}else{
tip.hide();
}
if(opts.mode=="h"){
var _b73="left:"+pos+"px;";
_b71.attr("style",_b73);
tip.attr("style",_b73+"margin-left:"+(-Math.round(tip.outerWidth()/2))+"px");
}else{
var _b73="top:"+pos+"px;";
_b71.attr("style",_b73);
tip.attr("style",_b73+"margin-left:"+(-Math.round(tip.outerWidth()))+"px");
}
}
opts.value=opts.range?_b6e:_b6e[0];
$(_b69).val(opts.range?_b6e.join(opts.separator):_b6e[0]);
if(_b6d.join(",")!=_b6e.join(",")){
opts.onChange.call(_b69,opts.value,(opts.range?_b6d:_b6d[0]));
}
};
function _b55(_b74){
var opts=$.data(_b74,"slider").options;
var fn=opts.onChange;
opts.onChange=function(){
};
_b68(_b74,opts.value);
opts.onChange=fn;
};
function _b72(_b75,_b76){
var _b77=$.data(_b75,"slider");
var opts=_b77.options;
var _b78=_b77.slider;
var size=opts.mode=="h"?_b78.width():_b78.height();
var pos=opts.converter.toPosition.call(_b75,_b76,size);
if(opts.mode=="v"){
pos=_b78.height()-pos;
}
if(opts.reversed){
pos=size-pos;
}
return pos.toFixed(0);
};
function _b66(_b79,pos){
var _b7a=$.data(_b79,"slider");
var opts=_b7a.options;
var _b7b=_b7a.slider;
var size=opts.mode=="h"?_b7b.width():_b7b.height();
var pos=opts.mode=="h"?(opts.reversed?(size-pos):pos):(opts.reversed?pos:(size-pos));
var _b7c=opts.converter.toValue.call(_b79,pos,size);
return _b7c.toFixed(0);
};
$.fn.slider=function(_b7d,_b7e){
if(typeof _b7d=="string"){
return $.fn.slider.methods[_b7d](this,_b7e);
}
_b7d=_b7d||{};
return this.each(function(){
var _b7f=$.data(this,"slider");
if(_b7f){
$.extend(_b7f.options,_b7d);
}else{
_b7f=$.data(this,"slider",{options:$.extend({},$.fn.slider.defaults,$.fn.slider.parseOptions(this),_b7d),slider:init(this)});
$(this).removeAttr("disabled");
}
var opts=_b7f.options;
opts.min=parseFloat(opts.min);
opts.max=parseFloat(opts.max);
if(opts.range){
if(!$.isArray(opts.value)){
opts.value=$.map(String(opts.value).split(opts.separator),function(v){
return parseFloat(v);
});
}
if(opts.value.length<2){
opts.value.push(opts.max);
}
}else{
opts.value=parseFloat(opts.value);
}
opts.step=parseFloat(opts.step);
opts.originalValue=opts.value;
_b5d(this);
_b56(this);
_b50(this);
});
};
$.fn.slider.methods={options:function(jq){
return $.data(jq[0],"slider").options;
},destroy:function(jq){
return jq.each(function(){
$.data(this,"slider").slider.remove();
$(this).remove();
});
},resize:function(jq,_b80){
return jq.each(function(){
_b50(this,_b80);
});
},getValue:function(jq){
return jq.slider("options").value;
},getValues:function(jq){
return jq.slider("options").value;
},setValue:function(jq,_b81){
return jq.each(function(){
_b68(this,[_b81]);
});
},setValues:function(jq,_b82){
return jq.each(function(){
_b68(this,_b82);
});
},clear:function(jq){
return jq.each(function(){
var opts=$(this).slider("options");
_b68(this,opts.range?[opts.min,opts.max]:[opts.min]);
});
},reset:function(jq){
return jq.each(function(){
var opts=$(this).slider("options");
$(this).slider(opts.range?"setValues":"setValue",opts.originalValue);
});
},enable:function(jq){
return jq.each(function(){
$.data(this,"slider").options.disabled=false;
_b5d(this);
});
},disable:function(jq){
return jq.each(function(){
$.data(this,"slider").options.disabled=true;
_b5d(this);
});
}};
$.fn.slider.parseOptions=function(_b83){
var t=$(_b83);
return $.extend({},$.parser.parseOptions(_b83,["width","height","mode",{reversed:"boolean",showTip:"boolean",range:"boolean",min:"number",max:"number",step:"number"}]),{value:(t.val()||undefined),disabled:(t.attr("disabled")?true:undefined),rule:(t.attr("rule")?eval(t.attr("rule")):undefined)});
};
$.fn.slider.defaults={width:"auto",height:"auto",mode:"h",reversed:false,showTip:false,disabled:false,range:false,value:0,separator:",",min:0,max:100,step:1,rule:[],tipFormatter:function(_b84){
return _b84;
},converter:{toPosition:function(_b85,size){
var opts=$(this).slider("options");
return (_b85-opts.min)/(opts.max-opts.min)*size;
},toValue:function(pos,size){
var opts=$(this).slider("options");
return opts.min+(opts.max-opts.min)*(pos/size);
}},onChange:function(_b86,_b87){
},onSlideStart:function(_b88){
},onSlideEnd:function(_b89){
},onComplete:function(_b8a){
}};
})(jQuery);
