!function(){
"object"!=typeof JSON&&(window.JSON={
stringify:function(){
return"";
},
parse:function(){
return{};
}
});
var e=function(){
!function(){
var e={},o={},t={};
e.COMBO_UNLOAD=0,e.COMBO_LOADING=1,e.COMBO_LOADED=2;
var n=function(e,t,n){
if(!o[e]){
o[e]=n;
for(var r=3;r--;)try{
moon.setItem(moon.prefix+e,n.toString()),moon.setItem(moon.prefix+e+"_ver",moon_map[e]);
break;
}catch(i){
moon.clear();
}
}
},r=function(e){
if(!e||!o[e])return null;
var n=o[e];
return"function"!=typeof n||t[e]||(n=o[e]=n(r),t[e]=!0),n;
};
e.combo_status=e.COMBO_UNLOAD,e.run=function(){
var o=e.run.info,t=o&&o[0],n=o&&o[1];
if(t&&e.combo_status==e.COMBO_LOADED){
var i=r(t);
n&&n(i);
}
},e.use=function(o,t){
e.run.info=[o,t],e.run();
},window.define=n,window.seajs=e;
}(),function(){
function e(e){
var o="; "+document.cookie,t=o.split("; "+e+"=");
return 2==t.length?t.pop().split(";").shift():void 0;
}
window.__consoleList=[];
for(var o=window.console,t=function(e){
return function(){
var t=arguments;
window.__consoleList.push({
type:e,
msg:t,
time:+new Date
}),o&&o[e]&&o[e].apply(o,t);
};
},n=["log","info","error","warn","debug"],r={},i=0,a=n.length;a>i;++i){
var c=n[i];
r[c]=t(c);
}
if(window.console=r,window._console=o,window.localStorage&&window.__DEBUGINFO){
var s=e("DEBUG_SWITCH"),u=window.__DEBUGINFO;
if("1"==s&&u.js){
window.__moondebug=!0;
var f=document.createElement("script");
f.src=u.js,f.type="text/javascript",f.async=!0;
var l=document.head||document.getElementsByTagName("head")[0];
l.appendChild(f);
}
}
}(),function(){
function e(e){
return"[object Array]"===Object.prototype.toString.call(e);
}
function t(e){
return"[object Object]"===Object.prototype.toString.call(e);
}
function n(e){
var t=e.stack?e.stack:"";
try{
t=t.replace(/http(s)?:\/\/res\.wx\.qq\.com/g,"");
for(var n=/\/([^.]+)\/(\S+?)\.js(\,|:)?/g;n.test(t);)t=t.replace(n,"$2$3");
}catch(e){
t=e.stack?e.stack:"";
}
var r=[];
for(o in _reportOpt)_reportOpt.hasOwnProperty(o)&&r.push(o+":"+_reportOpt[o]);
return r.push("STK:"+t.replace(/\n/g,"")),r.join("|");
}
function r(e){
if(!e){
var o=window.onerror;
window.onerror=function(){},e=setTimeout(function(){
window.onerror=o,e=null;
},50);
}
}
function i(e){
var o;
if(window.ActiveXObject)try{
o=new ActiveXObject("Msxml2.XMLHTTP");
}catch(t){
try{
o=new ActiveXObject("Microsoft.XMLHTTP");
}catch(n){
o=!1;
}
}else window.XMLHttpRequest&&(o=new XMLHttpRequest);
o&&(o.open("POST",location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?",!0),o.setRequestHeader("cache-control","no-cache"),
o.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),
o.setRequestHeader("X-Requested-With","XMLHttpRequest"),o.send(e));
}
function a(e){
return function(o,t){
if("string"==typeof o)try{
o=new Function(o);
}catch(n){
throw n;
}
var i=[].slice.call(arguments,2),a=o;
return o=function(){
try{
return a.apply(this,i.length&&i||arguments);
}catch(e){
throw e.stack&&console&&console.error&&console.error("[TryCatch]"+e.stack),s&&window.__moon_report&&(window.__moon_report([{
offset:m,
log:"timeout_error;host:"+top.location.host,
e:e
}]),r(l)),e;
}
},e(o,t);
};
}
var c=/MicroMessenger/i.test(navigator.userAgent);
if(/mp\.weixin\.qq\.com\/s\?/.test(location.href)&&!(Math.random()>.5)&&c&&top==window){
var s,u,f,l,p=window.define,w=0,m=9;
window.__initCatch=function(e){
s=e.idkey,u=e.startKey||0,f=e.limit||1,_reportOpt=e.reportOpt||"",_extInfo=e.extinfo||"";
},window.__moon_report=function(o){
if(t(o)&&(o=[o]),e(o)&&""!=s){
for(var r="",a=[],c=[],l=[],p=[],w=0;w<o.length;w++){
var m=o[w]||{};
if(!(m.offset>f)&&"number"==typeof m.offset){
var d=u+m.offset;
a[w]="[moon]"+s+"_"+d+";"+m.log+";"+n(m.e||{})||"",c[w]=d,l[w]=1;
}
}
for(var _=0;_<c.length;_++)p[_]=s+"_"+c[_]+"_"+l[_],r=r+"&log"+_+"="+a[_];
p.length>0&&i("idkey="+p.join(";")+"&lc="+a.length+r);
}
},window.setTimeout=a(window.setTimeout),window.setInterval=a(window.setInterval),
window.seajs&&p&&(window.define=function(){
for(var e,o=[],t=0,n=arguments.length;n>t;t++){
var i=e=arguments[t];
"function"==typeof e&&(e=function(){
try{
return i.apply(this,arguments);
}catch(e){
throw e.stack&&console&&console.error&&console.error("[TryCatch]"+e.stack),s&&window.__moon_report&&(window.__moon_report([{
offset:w,
log:"define_error",
e:e
}]),r(l)),e;
}
},e.toString=function(e){
return function(){
return e.toString();
};
}(arguments[t])),o.push(e);
}
return p.apply(this,o);
});
}
}(),function(e){
function o(e,o,n){
if("object"==typeof e){
var r=Object.prototype.toString.call(e).replace(/^\[object (.+)\]$/,"$1");
if(n=n||e,"Array"==r){
for(var i=0,a=e.length;a>i;++i)if(o.call(n,e[i],i,e)===!1)return;
}else{
if("Object"!==r&&t!=e)throw"unsupport type";
if(t==e){
for(var i=e.length-1;i>=0;i--){
var c=t.key(i),s=t.getItem(c);
if(o.call(n,s,c,e)===!1)return;
}
return;
}
for(var i in e)if(e.hasOwnProperty(i)&&o.call(n,e[i],i,e)===!1)return;
}
}
}
var t=e.localStorage,n=document.head||document.getElementsByTagName("head")[0],r=1,i={
prefix:"__MOON__",
loaded:[],
unload:[],
hit_num:0,
mod_num:0,
version:1003,
init:function(){
i.loaded=[],i.unload=[];
var n,r,a;
if(t){
var c="_moon_ver_key_",s=t.getItem(c);
s!=i.version&&(i.clear(),t.setItem(c,i.version));
}
if(-1!=location.search.indexOf("no_moon=1")&&i.clear(),t){
var u=1*t.getItem(i.prefix+"clean_time"),f=+new Date;
if(f-u>=1296e6){
i.clear();
try{
!!t&&t.setItem(i.prefix+"clean_time",+new Date);
}catch(l){}
}
}
o(moon_map,function(o,c){
if(r=i.prefix+c,a=!!o&&o.replace(/^http(s)?:\/\/res.wx.qq.com/,""),n=!!t&&t.getItem(r),
version=!!t&&(t.getItem(r+"_ver")||"").replace(/^http(s)?:\/\/res.wx.qq.com/,""),
i.mod_num++,n&&a==version)try{
var s="//# sourceURL="+c+"\n//@ sourceURL="+c;
e.eval.call(e,'define("'+c+'",[],'+n+")"+s),i.hit_num++;
}catch(u){
i.unload.push(a.replace(/^http(s)?:\/\/res.wx.qq.com/,""));
}else i.unload.push(a.replace(/^http(s)?:\/\/res.wx.qq.com/,""));
}),i.load(i.genUrl());
},
genUrl:function(){
var e=i.unload;
if(!e||e.length<=0)return[];
for(var o,t,n="",r=[],a={},c=-1!=location.search.indexOf("no_moon=2"),s=0,u=e.length;u>s;++s)/^\/(.*?)\//.test(e[s]),
RegExp.$1&&(t=RegExp.$1,n=a[t],n?(o=n+","+e[s],o.length>1e3||c?(r.push(n+"?v="+i.version),
n=location.protocol+"//res.wx.qq.com"+e[s],a[t]=n):(n=o,a[t]=n)):(n=location.protocol+"//res.wx.qq.com"+e[s],
a[t]=n));
for(var f in a)a.hasOwnProperty(f)&&r.push(a[f]);
return r;
},
load:function(e){
if(!e||e.length<=0)return seajs.combo_status=seajs.COMBO_LOADED,void seajs.run();
seajs.combo_status=seajs.COMBO_LOADING;
var t=0;
o(e,function(o){
var i=document.createElement("script");
i.src=o,i.type="text/javascript",i.async=!0,i.onerror=function(e){
if(window.__moon_report){
var t=new Error(e);
window.__moon_report([{
offset:r,
log:"load_script_error: "+o,
e:t
}]);
}
},"undefined"!=typeof moon_crossorigin&&moon_crossorigin&&i.setAttribute("crossorigin",!0),
i.onload=i.onreadystatechange=function(){
!i||i.readyState&&!/loaded|complete/.test(i.readyState)||(t++,i.onload=i.onreadystatechange=null,
t==e.length&&(seajs.combo_status=seajs.COMBO_LOADED,seajs.run()));
},n.appendChild(i);
});
},
setItem:function(e,o){
!!t&&t.setItem(e,o);
},
clear:function(){
t&&o(t,function(e,o){
~o.indexOf(i.prefix)&&t.removeItem(o);
});
}
};
window.moon=i;
}(window),window.moon.init();
};
e(),moon.setItem(moon.prefix+"biz_wap/moon.js",e.toString());
}();