!function(){
"object"!=typeof JSON&&(window.JSON={
stringify:function(){
return"";
},
parse:function(){
return{};
}
});
var n=function(){
!function(){
var n={},o={},e={};
n.COMBO_UNLOAD=0,n.COMBO_LOADING=1,n.COMBO_LOADED=2;
var t=function(n,e,t){
if(!o[n]){
o[n]=t;
for(var r=3;r--;)try{
moon.setItem(moon.prefix+n,t.toString()),moon.setItem(moon.prefix+n+"_ver",moon_map[n]);
break;
}catch(a){
moon.clear();
}
}
},r=function(n){
if(!n||!o[n])return null;
var t=o[n];
return"function"!=typeof t||e[n]||(t=o[n]=t(r),e[n]=!0),t;
};
n.combo_status=n.COMBO_UNLOAD,n.run=function(){
var o=n.run.info,e=o&&o[0],t=o&&o[1];
if(e&&n.combo_status==n.COMBO_LOADED){
var a=r(e);
t&&t(a);
}
},n.use=function(o,e){
n.run.info=[o,e],n.run();
},window.define=t,window.seajs=n;
}(),function(){
function n(n){
var e=n.stack?n.stack:"";
try{
e=e.replace(/http(s)?:\/\/res\.wx\.qq\.com/g,"");
for(var t=/\/([^.]+)\/(\S+?)\.js(\,|:)?/g;t.test(e);)e=e.replace(t,"$2$3");
}catch(n){
e=n.stack?n.stack:"";
}
var r=[];
for(o in a)a.hasOwnProperty(o)&&r.push(o+":"+a[o]);
return r.push("STK:"+e.replace(/\n/g,"")),r.join("|");
}
function e(n){
if(!n){
var o=window.onerror;
window.onerror=function(){},n=setTimeout(function(){
window.onerror=o,n=null;
},50);
}
}
function t(o){
var e=n(o),t=new Image,a="http://mp.weixin.qq.com/mp/jsreport?key="+r+"&content="+encodeURIComponent(e);
t.src=a.slice(0,1024);
}
if(/mp\.weixin\.qq\.com\/s\?/.test(location.href)){
var r,a,i,c=window.define,s=window.$||"",u=s.ajax;
window.__initErrorReport=function(n,o){
r=n,a=o;
},u&&(window.$.ajax=function(n,o){
o||(o=n,n=void 0);
var a,c;
for(a in o)o.hasOwnProperty(a)&&(c=o[a],"function"==typeof c&&(o[a]=function(){
try{
return c.apply(this,arguments);
}catch(n){
throw n.stack&&console&&console.error&&console.error("[TryCatch]"+n.stack),r&&(t(n),
e(i)),n;
}
}));
return n?u.call(s,n,o):u.call(s,o);
}),window.seajs&&c&&(window.define=function(){
for(var n,o=[],a=0,s=arguments.length;s>a;a++){
var u=n=arguments[a];
"function"==typeof n&&(n=function(){
try{
return u.apply(this,arguments);
}catch(n){
throw n.stack&&console&&console.error&&console.error("[TryCatch]"+n.stack),r&&(t(n),
e(i)),n;
}
},n.toString=function(n){
return function(){
return n.toString();
};
}(arguments[a])),o.push(n);
}
return c.apply(this,o);
});
}
}(),function(n){
function o(n,o,t){
if("object"==typeof n){
var r=Object.prototype.toString.call(n).replace(/^\[object (.+)\]$/,"$1");
if(t=t||n,"Array"==r){
for(var a=0,i=n.length;i>a;++a)if(o.call(t,n[a],a,n)===!1)return;
}else{
if("Object"!==r&&e!=n)throw"unsupport type";
if(e==n){
for(var a=n.length-1;a>=0;a--){
var c=e.key(a),s=e.getItem(c);
if(o.call(t,s,c,n)===!1)return;
}
return;
}
for(var a in n)if(n.hasOwnProperty(a)&&o.call(t,n[a],a,n)===!1)return;
}
}
}
var e=n.localStorage,t=document.head||document.getElementsByTagName("head")[0],r={
prefix:"__MOON__",
loaded:[],
unload:[],
hit_num:0,
mod_num:0,
init:function(){
r.loaded=[],r.unload=[];
var t,a,i;
if(-1!=location.search.indexOf("no_moon=1")&&r.clear(),e){
var c=1*e.getItem(r.prefix+"clean_time"),s=+new Date;
if(s-c>=1296e6){
r.clear();
try{
!!e&&e.setItem(r.prefix+"clean_time",+new Date);
}catch(u){}
}
}
o(moon_map,function(o,c){
if(a=r.prefix+c,i=!!o&&o.replace(/^http(s)?:\/\/res.wx.qq.com/,""),t=!!e&&e.getItem(a),
version=!!e&&(e.getItem(a+"_ver")||"").replace(/^http(s)?:\/\/res.wx.qq.com/,""),
r.mod_num++,t&&i==version)try{
var s="//# sourceURL="+c+"\n//@ sourceURL="+c;
n.eval.call(n,'define("'+c+'",[],'+t+")"+s),r.hit_num++;
}catch(u){
r.unload.push(i.replace(/^http(s)?:\/\/res.wx.qq.com/,""));
}else r.unload.push(i.replace(/^http(s)?:\/\/res.wx.qq.com/,""));
}),r.load(r.genUrl());
},
genUrl:function(){
var n=r.unload;
if(!n||n.length<=0)return[];
for(var o,e,t="",a=[],i={},c=-1!=location.search.indexOf("no_moon=2"),s=0,u=n.length;u>s;++s)/^\/(.*?)\//.test(n[s]),
RegExp.$1&&(e=RegExp.$1,t=i[e],t?(o=t+","+n[s],o.length>1024||c?(a.push(t),t=location.protocol+"//res.wx.qq.com"+n[s],
i[e]=t):(t=o,i[e]=t)):(t=location.protocol+"//res.wx.qq.com"+n[s],i[e]=t));
for(var f in i)i.hasOwnProperty(f)&&a.push(i[f]);
return a;
},
load:function(n){
if(!n||n.length<=0)return seajs.combo_status=seajs.COMBO_LOADED,void seajs.run();
seajs.combo_status=seajs.COMBO_LOADING;
var e=0;
o(n,function(o){
var r=document.createElement("script");
r.src=o,r.type="text/javascript",r.async=!0,"undefined"!=typeof moon_crossorigin&&moon_crossorigin&&r.setAttribute("crossorigin",!0),
r.onload=r.onreadystatechange=function(){
!r||r.readyState&&!/loaded|complete/.test(r.readyState)||(e++,r.onload=r.onreadystatechange=null,
e==n.length&&(seajs.combo_status=seajs.COMBO_LOADED,seajs.run()));
},t.appendChild(r);
});
},
setItem:function(n,o){
!!e&&e.setItem(n,o);
},
clear:function(){
e&&o(e,function(n,o){
~o.indexOf(r.prefix)&&e.removeItem(o);
});
}
};
window.moon=r;
}(window),window.moon.init();
};
n(),moon.setItem(moon.prefix+"biz_wap/moon.js",n.toString());
}();