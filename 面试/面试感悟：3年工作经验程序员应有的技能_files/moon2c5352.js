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
},r=window.alert;
window.__alertList=[],window.alert=function(e){
r(e),window.__alertList.push(e);
};
var i=function(e){
if(!e||!o[e])return null;
var n=o[e];
return"function"!=typeof n||t[e]||(n=o[e]=n(i,{},{},r),t[e]=!0),n;
};
e.combo_status=e.COMBO_UNLOAD,e.run=function(){
var o=e.run.info,t=o&&o[0],n=o&&o[1];
if(t&&e.combo_status==e.COMBO_LOADED){
var r=i(t);
n&&n(r);
}
},e.use=function(o,t){
e.run.info=[o,t],e.run();
},window.define=n,window.seajs=e;
}(),function(){
window.addEventListener&&window.__DEBUGINFO&&Math.random()<.01&&window.addEventListener("load",function(){
var e=document.createElement("script");
e.src=__DEBUGINFO.safe_js,e.type="text/javascript",e.async=!0;
var o=document.head||document.getElementsByTagName("head")[0];
o.appendChild(e);
});
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
});
try{
o&&o[e]&&o[e].apply(o,t);
}catch(n){}
};
},n=["log","info","error","warn","debug"],r={},i=0,a=n.length;a>i;++i){
var c=n[i];
r[c]=t(c);
}
if(window.console=r,window._console=o,window.localStorage&&window.__DEBUGINFO){
var s=e("DEBUG_SWITCH"),u=window.__DEBUGINFO;
if(("1"==s||-1!=location.href.indexOf("moon_debug1=1"))&&u.debug_js){
window.__moondebug=!0;
var l=document.createElement("script");
l.src=u.debug_js,l.type="text/javascript",l.async=!0;
var d=document.head||document.getElementsByTagName("head")[0];
d.appendChild(l);
}
}
-1!=location.href.indexOf("moon_debug2=1")&&(window.onerror=function(e,o,t,n){
var r=window.console;
"undefined"!=typeof e&&r.error("error : "+e),"undefined"!=typeof o&&r.error("file : "+o);
var i=[];
"undefined"!=typeof t&&i.push("line : "+t),"undefined"!=typeof n&&i.push("col : "+n),
i.length>0&&r.error(i.join(", "));
});
}(),function(){
function e(e){
return"[object Array]"===Object.prototype.toString.call(e);
}
function t(e){
return"[object Object]"===Object.prototype.toString.call(e);
}
function n(e){
var t=e.stack||e.toString()||"";
try{
t=t.replace(/http(s)?:\/\/res\.wx\.qq\.com/g,"");
for(var n=/\/([^.]+)\/js\/(\S+?)\.js(\,|:)?/g;n.test(t);)t=t.replace(n,"$2$3");
}catch(e){
t=e.stack?e.stack:"";
}
var r=[];
for(o in f)f.hasOwnProperty(o)&&r.push(o+":"+f[o]);
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
throw e.stack&&console&&console.error&&console.error("[TryCatch]"+e.stack),u&&window.__moon_report&&(window.__moon_report([{
offset:y,
log:"timeout_error;host:"+top.location.host,
e:e
}]),r(w)),e;
}
},e(o,t);
};
}
function c(e){
return function(o,t,n){
if("undefined"==typeof n)var n=!1;
var i=this,a=t;
return t=function(){
try{
return a.apply(i,arguments);
}catch(e){
throw e.stack&&console&&console.error&&console.error("[TryCatch]"+e.stack),u&&window.__moon_report&&(window.__moon_report([{
offset:v,
log:"listener_error;type:"+o+";host:"+top.location.host,
e:e
}]),r(w)),e;
}
},a.moon_lid=L,j[L]=t,L++,e.call(i,o,t,n);
};
}
function s(e){
return function(o,t,n){
if("undefined"==typeof n)var n=!1;
var r=this;
return t=j[t.moon_lid],e.call(r,o,t,n);
};
}
var u,l,d,f,m,w,p=/MicroMessenger/i.test(navigator.userAgent),_=window.define,h=0,v=2,g=4,y=9,O=10;
if(window.__initCatch=function(e){
u=e.idkey,l=e.startKey||0,d=e.limit,f=e.reportOpt||"",m=e.extInfo||"";
},window.__moon_report=function(o){
if(/mp\.weixin\.qq\.com/.test(location.href)&&!(Math.random()>.5)&&p&&top==window&&(t(o)&&(o=[o]),
e(o)&&""!=u)){
var r="",a=[],c=[],s=[],f=[];
"number"!=typeof d&&(d=1/0);
for(var w=0;w<o.length;w++){
var _=o[w]||{};
if(!(_.offset>d||"number"!=typeof _.offset||_.offset==g&&m&&m.network_rate&&Math.random()>=m.network_rate)){
var h=1/0==d?l:l+_.offset;
a[w]="[moon]"+u+"_"+h+";"+_.log+";"+n(_.e||{})||"",c[w]=h,s[w]=1;
}
}
for(var v=0;v<c.length;v++)f[v]=u+"_"+c[v]+"_"+s[v],r=r+"&log"+v+"="+a[v];
f.length>0&&i("idkey="+f.join(";")+"&lc="+a.length+r);
}
},window.setTimeout=a(window.setTimeout),window.setInterval=a(window.setInterval),
Math.random()<.01&&window.Document&&window.HTMLElement){
var j={},L=0;
Document.prototype.addEventListener=c(Document.prototype.addEventListener),Document.prototype.removeEventListener=s(Document.prototype.removeEventListener),
HTMLElement.prototype.addEventListener=c(HTMLElement.prototype.addEventListener),
HTMLElement.prototype.removeEventListener=s(HTMLElement.prototype.removeEventListener);
}
var E=window.navigator.userAgent;
if((/ip(hone|ad|od)/i.test(E)||/android/i.test(E))&&!/windows phone/i.test(E)&&window.localStorage&&window.localStorage.setItem){
var b=window.localStorage.setItem,x=0;
window.localStorage.setItem=function(e,o){
if(!(x>=10))try{
b.call(window.localStorage,e,o);
}catch(t){
t.stack&&console&&console.error&&console.error("[TryCatch]"+t.stack),window.__moon_report([{
offset:O,
log:"localstorage_error;"+t.toString(),
e:t
}]),x++,x>=3&&window.moon&&window.moon.clear&&moon.clear();
}
};
}
window.seajs&&_&&(window.define=function(){
for(var e,o=[],t=0,n=arguments.length;n>t;t++){
var i=e=arguments[t];
"function"==typeof e&&(e=function(){
try{
return i.apply(this,arguments);
}catch(e){
throw e.stack&&console&&console.error&&console.error("[TryCatch]"+e.stack),u&&window.__moon_report&&(window.__moon_report([{
offset:h,
log:"define_error",
e:e
}]),r(w)),e;
}
},e.toString=function(e){
return function(){
return e.toString();
};
}(arguments[t])),o.push(e);
}
return _.apply(this,o);
});
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
if(-1!=location.search.indexOf("no_moon1=1")&&i.clear(),t){
var u=1*t.getItem(i.prefix+"clean_time"),l=+new Date;
if(l-u>=1296e6){
i.clear();
try{
!!t&&t.setItem(i.prefix+"clean_time",+new Date);
}catch(d){}
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
var o,t,n="",r=[],a={},c=-1!=location.search.indexOf("no_moon2=1"),s="//res.wx.qq.com";
-1!=location.href.indexOf("moon_debug2=1")&&(s="//mp.weixin.qq.com");
for(var u=0,l=e.length;l>u;++u)/^\/(.*?)\//.test(e[u]),RegExp.$1&&(t=RegExp.$1,n=a[t],
n?(o=n+","+e[u],o.length>1e3||c?(r.push(n+"?v="+i.version),n=location.protocol+s+e[u],
a[t]=n):(n=o,a[t]=n)):(n=location.protocol+s+e[u],a[t]=n));
for(var d in a)a.hasOwnProperty(d)&&r.push(a[d]);
return r;
},
load:function(e){
if(!e||e.length<=0)return seajs.combo_status=seajs.COMBO_LOADED,seajs.run(),void console.debug("[moon] load js complete, all in cache, cost time : 0ms, total count : "+i.mod_num+", hit num: "+i.hit_num);
seajs.combo_status=seajs.COMBO_LOADING;
var t=0,n=+new Date;
o(e,function(o){
i.request(o,1,function(){
if(t++,t==e.length){
var o=+new Date-n;
seajs.combo_status=seajs.COMBO_LOADED,seajs.run(),console.debug("[moon] load js complete, url num : "+e.length+", total mod count : "+i.mod_num+", hit num: "+i.hit_num+", use time : "+o+"ms");
}
});
});
},
request:function(e,o,t){
if(e){
o=o||0;
var a=document.createElement("script");
a.src=e,a.type="text/javascript",a.async=!0,a.onerror=function(t){
if(o>=0)i.request(e,o);else if(window.__moon_report){
var n=new Error(t);
console.error("moon load js error : "+e+", error -> "+n.toString()),window.__moon_report([{
offset:r,
log:"load_script_error: "+e,
e:n
}]);
}
},"undefined"!=typeof moon_crossorigin&&moon_crossorigin&&a.setAttribute("crossorigin",!0),
a.onload=a.onreadystatechange=function(){
!a||a.readyState&&!/loaded|complete/.test(a.readyState)||(a.onload=a.onreadystatechange=null,
"function"==typeof t&&t());
},o--,n.appendChild(a);
}
},
setItem:function(e,o){
!!t&&t.setItem(e,o);
},
clear:function(){
t&&(o(t,function(e,o){
~o.indexOf(i.prefix)&&t.removeItem(o);
}),console.debug("[moon] clear"));
}
};
window.moon=i;
}(window),window.moon.init();
};
e();
}();