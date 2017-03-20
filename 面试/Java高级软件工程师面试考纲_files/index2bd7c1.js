define("biz_wap/jsapi/a8key.js",["biz_wap/jsapi/core.js"],function(n){
"use strict";
var e,i=n("biz_wap/jsapi/core.js"),o=!1,t={},a=function(){
"undefined"!=typeof window.pass_ticket&&window.pass_ticket?(t.onAlreadyHasA8Key&&t.onAlreadyHasA8Key.call(A),
u()):0==window.isInWeixinApp()?(t.onOutOfWeixinApp&&t.onOutOfWeixinApp.call(A),u()):(o=1,
i.ready(c));
},c=function(){
window.isWeixinCached?w(u):(t.onNoCacheFuncWeixin&&t.onNoCacheFuncWeixin.call(A),
u());
},w=function(n){
if(t.onJSAPIGetA8KeyStart&&t.onJSAPIGetA8KeyStart.call(A),window.getA8KeyUrl)t.onJSAPIGetA8KeyEnd&&t.onJSAPIGetA8KeyEnd.call(A),
n(window.getA8KeyUrl);else{
var e=!1,o=setTimeout(function(){
e=!0,t.onJSAPIGetA8KeyTimeout&&t.onJSAPIGetA8KeyTimeout.call(A),n("");
},1500);
i.on("onGetA8KeyUrl",function(i){
o&&clearTimeout(o),e||(t.onJSAPIGetA8KeyEnd&&t.onJSAPIGetA8KeyEnd.call(A,i),n(i.url));
});
}
},u=function(n){
var i=!1;
if(n){
var o=getQueryFromURL(n);
window.uin=o.uin||window.uin,window.key=o.key||window.key,window.pass_ticket=o.pass_ticket||window.pass_ticket,
i=!0;
}
e&&e(i);
},A={
isPageCached:o
};
return A.config=function(n){
return t=n||{},A;
},A.onReady=function(n){
e=n,a();
},A;
});define("appmsg/index.js",["biz_wap/jsapi/a8key.js","biz_wap/utils/device.js","biz_common/utils/url/parse.js","appmsg/cdn_img_lib.js","biz_wap/utils/mmversion.js","appmsg/share.js","biz_common/log/jserr.js","biz_wap/ui/lazyload_img.js","appmsg/async.js","appmsg/pay_for_reading.js","appmsg/cache.js","appmsg/copyright_report.js","biz_common/dom/event.js","biz_wap/jsapi/core.js","appmsg/outer_link.js","appmsg/review_image.js","appmsg/iframe.js","appmsg/qqmusic.js","appmsg/voice.js","appmsg/cdn_speed_report.js","appmsg/page_pos.js","appmsg/report_and_source.js","biz_common/dom/class.js","appmsg/report.js"],function(e){
"use strict";
function o(){
function o(e,o){
var t={
lossy:"UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",
lossless:"UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==",
alpha:"UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==",
animation:"UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA"
},n=new Image;
n.onload=function(){
var t=n.width>0&&n.height>0;
o(e,t);
},n.onerror=function(){
o(e,!1);
},n.src="data:image/webp;base64,"+t[e];
}
var t=document.getElementsByTagName("body");
if(!t||!t[0])return!1;
t=t[0],function(){
var e=(new Date).getHours(),o=function(e,o){
o=o||"",o=["uin:"+top.window.user_uin,"resp:"+o].join("|"),(new Image).src="/mp/jsreport?key="+e+"&content="+o+"&r="+Math.random();
},t=function(e,o,t){
var n=e+"_"+o;
t=t||1,window.logs.idkeys[n]||(window.logs.idkeys[n]={
val:0
}),window.logs.idkeys[n].val+=t;
},n=e>=11&&17>=e&&Math.random()<1,i=function(e,t){
n&&o(e,t);
};
window.__report=o,window.__commonVideoReport=i,window.__addIdKeyReport=t;
}();
var i=/^http(s)?:\/\/mp\.weixin\.qq\.com\//g;
try{
if(top!=window&&(!top||top&&top.location.href&&i.test(top.location.href)))throw new Error("in iframe");
}catch(r){
var a="",s=new Image;
s.src=("http://mp.weixin.qq.com/mp/jsreport?key=4&content=biz:"+biz+",mid:"+mid+",uin:"+uin+"[key4]"+a+"&r="+Math.random()).substr(0,1024);
}
window.isInWeixinApp()&&/#rd$/.test(location.href)&&!window.isWeixinCached&&location.replace(location.href.replace(/#rd$/,"#wechat_redirect"));
var c=e("biz_common/utils/url/parse.js");
e("appmsg/cdn_img_lib.js"),window.page_endtime=+new Date;
{
var p=e("biz_wap/utils/mmversion.js"),d=!p.isWp&&-1==navigator.userAgent.indexOf("MicroMessenger");
-1!=navigator.userAgent.indexOf("WindowsWechat");
}
if(e("appmsg/share.js"),"mp.weixin.qq.com"==location.host){
var m=e("biz_common/log/jserr.js");
m({
key:0,
reporturl:"http://mp.weixin.qq.com/mp/jsreport?1=1",
replaceStr:/http(s)?:(.*?)js\//g
});
}
window.logs.webplog={
lossy:0,
lossless:0,
alpha:0,
animation:0,
total:0
};
var l=-1!=navigator.userAgent.indexOf("TBS/"),w=function(e,t){
o(e,function(e,o){
if(window.logs.webplog[e]=o?1:0,window.logs.webplog.total++,4==window.logs.webplog.total){
var n=window.logs.webplog,i=Math.random();
l&&1>=i&&(n.lossy=n.lossless=n.alpha=1,window.logs.webplog=n);
var r=n.lossy&n.lossless&n.alpha;
t(!!r);
}
});
},g=function(e){
w("lossy",e),w("lossless",e),w("alpha",e),w("animation",e);
};
window.webp=!1,g(function(o){
window.webp=o,o&&window.localStorage&&window.localStorage.setItem&&window.localStorage.setItem("webp","1"),
window.logs.img={
download:{},
read:{},
load:{}
};
var t=document.getElementById("js_cover");
if(t){
var n=t.getAttribute("data-src");
if(n){
if(n.isCDN()){
var i=new Date;
for(i.setFullYear(2014,9,1);-1!=n.indexOf("?tp=webp");)n=n.replace("?tp=webp","");
for(;-1!=n.indexOf("&tp=webp");)n=n.replace("&tp=webp","");
1e3*ct>=i.getTime()&&""!=img_format&&"gif"!=img_format&&(n=n.replace(/\/0$/,"/640"),
n=n.replace(/\/0\?/,"/640?"),t.dataset&&(t.dataset.s="300,640")),o&&(n=c.addParam(n,"tp","webp",!0)),
n=c.addParam(n,"wxfrom","5",!0),is_https_res&&(n=n.http2https());
}
t.setAttribute("src",n),window.logs.img.read[n]=!0,window.logs.img.load[n]=!0,t.removeAttribute("data-src");
}
}
var r=e("biz_wap/ui/lazyload_img.js"),a=1;
new r({
attrKey:"data-src",
lazyloadHeightWhenWifi:function(){
var e,o=1,t=1;
e=window.svr_time?new Date(1e3*window.svr_time):new Date;
var n=e.getHours();
return n>=20&&23>n&&(o=.5,t=0),{
bottom:o,
top:t
};
},
inImgRead:function(e){
e&&(window.logs.img.read[e]=!0);
},
changeSrc:function(e,o){
if(!o)return"";
for(var t=o;-1!=t.indexOf("?tp=webp");)t=t.replace("?tp=webp","");
for(;-1!=t.indexOf("&tp=webp");)t=t.replace("&tp=webp","");
o.isCDN()&&((e.dataset&&e.dataset.s||-1!=o.indexOf("wx_fmt=")&&-1==o.indexOf("wx_fmt=gif"))&&(t=t.replace(/\/0$/,"/640"),
t=t.replace(/\/0\?/,"/640?")),window.webp&&(t=c.addParam(t,"tp","webp",!0)),t=c.addParam(t,"wxfrom","5",!0),
is_https_res&&(t=t.http2https()));
var n=/^http\:\/\/(a|b)(\d)+\.photo\.store\.qq\.com/g;
return t=t.replace(n,"http://m.qpic.cn"),t=c.addParam(t,"wx_lazy","1",!0),window.logs.img.load[t]=!0,
t;
},
onerror:function(e,o){
var t=o?o.__retryload||0:0;
if(e&&!(t>a)&&(window.__addIdKeyReport("28307",4),window.__addIdKeyReport("28307",6+2*t),
a>t&&(t++,o.__retryload=t,o.src=c.addParam(e,"retryload",t,!0)),e.isCDN())){
var n=10;
/tp\=webp/.test(e)&&(n=11);
var i=new Image;
i.src="http://mp.weixin.qq.com/mp/jsreport?key="+n+"&content="+(encodeURIComponent(e)+"["+uin+"]")+"&r="+Math.random();
}
},
onload:function(e,o){
var t=o?o.__retryload||0:0;
t>a||(window.__addIdKeyReport("28307",3),window.__addIdKeyReport("28307",5+2*t));
},
detect:function(e){
if(e&&e.time&&e.loadList){
var o=e.time,t=e.loadList;
window.logs.img.download[o]=t;
}
},
container:document.getElementById("page-content")
});
}),e("appmsg/async.js"),e("appmsg/pay_for_reading.js"),e("appmsg/cache.js");
var u=e("appmsg/copyright_report.js"),A=e("biz_common/dom/event.js"),f=e("biz_wap/jsapi/core.js");
!function(){
var e=document.getElementById("post-user"),o=document.getElementById("copyright_info"),t=[];
if(e){
var n="57";
"26"==window.source&&(n="95"),"28"==window.source&&(n="96"),t.push({
dom:e,
username:user_name_new||user_name,
scene:n
});
}
o&&source_username&&t.push({
dom:o,
username:source_username,
profile_ext_signature:profile_ext_signature,
scene:"84"
});
for(var i=0,r=t.length;r>i;i++)!function(e){
A.on(e.dom,"click",function(){
return"copyright_info"==e.dom.id&&source_username?(u.card_click_report({
scene:"0"
}),location.href="https://mp.weixin.qq.com/mp/profile_ext?action=home&username="+e.username+"&sn="+e.profile_ext_signature+"&scene=1#wechat_redirect"):f.invoke("profile",{
username:e.username,
scene:e.scene
},function(){
window.__addIdKeyReport("28307","1");
}),!1;
}),p.isWp&&e.dom.setAttribute("href","weixin://profile/"+e.username);
}(t[i]);
}(),function(){
location.href.match(/fontScale=\d+/)&&p.isIOS&&f.on("menu:setfont",function(e){
e.fontScale<=0&&(e.fontScale=100),document.getElementsByTagName("html").item(0).style.webkitTextSizeAdjust=e.fontScale+"%",
document.getElementsByTagName("html").item(0).style.lineHeight=160/e.fontScale;
});
}();
var _=e("appmsg/outer_link.js");
if(new _({
container:document.getElementById("js_content"),
changeHref:function(e,o){
if(e&&0==e.indexOf("http://mp.weixin.qq.com/s"))e=e.replace(/#rd\s*$/,""),e=e.replace(/#wechat_redirect\s*$/,""),
e=e.replace(/[\?&]scene=21/,""),e+="&scene=21#wechat_redirect";else if(0!=e.indexOf("http://mp.weixinbridge.com/mp/wapredirect"))return"http://mp.weixinbridge.com/mp/wapredirect?url="+encodeURIComponent(e)+"&action=appmsg_redirect&uin="+uin+"&biz="+biz+"&mid="+mid+"&idx="+idx+"&type="+o+"&scene=0";
return e;
}
}),!d){
var h=e("appmsg/review_image.js"),y=document.getElementById("js_cover"),v=[];
y&&v.push(y),new h({
container:document.getElementById("js_content"),
is_https_res:is_https_res,
imgs:v
});
}
window.fromWeixinCached||e("appmsg/iframe.js"),e("appmsg/qqmusic.js"),e("appmsg/voice.js"),
e("appmsg/cdn_speed_report.js"),e("appmsg/page_pos.js"),setTimeout(function(){
A.tap(document.getElementById("copyright_logo"),function(){
location.href="http://kf.qq.com/touch/sappfaq/150211YfyMVj150326iquI3e.html";
}),e("appmsg/report_and_source.js"),function(){
if(d){
var o=e("biz_common/dom/class.js");
o.addClass(t,"not_in_mm");
var n=document.createElement("link");
n.rel="stylesheet",n.type="text/css",n.async=!0,n.href=not_in_mm_css;
var i=document.getElementsByTagName("head")[0];
i.appendChild(n);
var r=document.getElementById("js_pc_qr_code_img");
if(r){
var a=10000004,s=document.referrer;
0==s.indexOf("http://weixin.sogou.com")?a=10000001:0==s.indexOf("https://wx.qq.com")&&(a=10000003),
r.setAttribute("src","/mp/qrcode?scene="+a+"&size=102&__biz="+biz),document.getElementById("js_pc_qr_code").style.display="block";
var c=new Image;
c.src="/mp/report?action=pcclick&__biz="+biz+"&uin="+uin+"&scene="+a+"&r="+Math.random();
}
var p=document.getElementById("js_profile_qrcode"),m=document.getElementById("js_profile_arrow_wrp"),l=document.getElementById("post-user");
if(p&&l&&m){
var w=function(){
var e=10000005,o=document.referrer;
0==o.indexOf("http://weixin.sogou.com")?e=10000006:0==o.indexOf("https://wx.qq.com")&&(e=10000007);
var t=document.getElementById("js_profile_qrcode_img");
t&&t.setAttribute("src","/mp/qrcode?scene="+e+"&size=102&__biz="+biz),p.style.display="block";
var n=new Image;
return n.src="/mp/report?action=pcclick&__biz="+biz+"&uin="+uin+"&scene="+e+"&r="+Math.random(),
m.style.left=l.offsetLeft-p.offsetLeft+l.offsetWidth/2-8+"px",!1;
};
A.on(l,"click",w),A.on(p,"click",w),A.on(document,"click",function(e){
var o=e.target||e.srcElement;
o!=l&&o!=p&&(p.style.display="none");
});
}
}else{
var g=document.getElementById("js_report_article3");
!!g&&(g.style.display="");
}
}(),function(){
var e=location.href.indexOf("scrolltodown")>-1?!0:!1,o=document.getElementById("img-content");
if(e&&o&&o.getBoundingClientRect){
var t=o.getBoundingClientRect().height;
window.scrollTo(0,t);
}
}(),e("appmsg/report.js");
for(var o=document.getElementsByTagName("map"),n=0,i=o.length;i>n;++n)o[n].parentNode.removeChild(o[n]);
if(u.card_pv_report(),Math.random()<.01)try{
var r="https://js.aq.qq.com/js/aq_common.js",a=document.createElement("script");
a.src=r;
var s=document.getElementsByTagName("head")[0];
s.appendChild(a);
}catch(c){}
},1e3),function(){
if(n.os.ios&&"onorientationchange"in window){
var e=[],o="onorientationchange"in window?"orientationchange":"resize",t=function(){
return 90===Math.abs(window.orientation)?1:2;
};
e.push({
ori:t(),
scroll:window.pageYOffset||document.documentElement.scrollTop,
istouchmove:!1
});
var i=(new Date).getHours();
A.on(window,o,function(){
var o=e.length-2,n=t();
if(o>=0){
var r=e[o],a=r.ori;
a!==n||e[e.length-1].istouchmove||(i>=11&&17>=i&&window.__report(63),window.scrollTo(0,r.scroll));
}
e.push({
ori:n,
scroll:window.pageYOffset||document.documentElement.scrollTop,
istouchmove:!1
});
}),A.on(window,"scroll",function(){
var o=e.length-1;
e[o].ori==t()&&(e[o].scroll=window.pageYOffset||document.documentElement.scrollTop,
e[o].istouchmove=!0);
});
}
}();
}
var t=e("biz_wap/jsapi/a8key.js"),n=e("biz_wap/utils/device.js");
t.config({
onOutOfWeixinApp:function(){
console.log("onOutOfWeixinApp");
},
onNoCacheFuncWeixin:function(){
console.log("isWeixinCached == false");
},
onAlreadyHasA8Key:function(){
console.log("URL已有A8Key");
},
onJSAPIGetA8KeyStart:function(){
console.log("onJSAPIGetA8KeyStart");
},
onJSAPIGetA8KeyEnd:function(){
console.log("onJSAPIGetA8KeyEnd");
},
onJSAPIGetA8KeyTimeout:function(){
console.log("onJSAPIGetA8KeyTimeout");
}
}),t.onReady(function(){
window.logs.pagetime.jsapi_ready_time=+new Date,window.logs.idkeys={},console.log("进入index.js init"),
o();
});
});