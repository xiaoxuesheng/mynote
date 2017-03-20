define("biz_common/utils/respTypes.js",[],function(require,exports,module){
"use strict";
var logList=[],log=function(r){
logList.push(r);
},printLog=function(){
for(var r=0,e=logList.length;e>r;++r)console.log("[RespType]"+logList[r]);
},isArray=function(r){
return Array.isArray(r);
},getValueType=function(r){
return isArray(r)?"array":typeof r;
},parseRtDesc=function(r,e){
var t="mix",c=!1,o=e;
if(e){
var s="_R",n=e.indexOf(s),i=e.length-s.length;
c=-1!=n&&n==i,o=c?e.substring(0,i):e;
}
return"string"==typeof r?t=r:isArray(r)?t="array":"object"==typeof r&&(t="object"),
{
key:o,
type:t,
isRequired:c
};
},checkForArrayRtDesc=function(r,e){
if(!isArray(r))return!1;
for(var t=0,c=r.length;c>t;++t){
for(var o,s=r[t],n=0,i=!1;o=e[n++];)if(checkForRtDesc(s,o)){
i=!0;
break;
}
if(!i)return!1;
}
return!0;
},checkForStringRtDesc=function(r,e){
var t=getValueType(r),c=parseRtDesc(e),o=c.type==t;
return o||log("miss match type : "+t+" !== "+c.type),o;
},checkForObjectRtDesc=function(r,e){
if("object"!=typeof r||isArray(r))return log("must be object"),!1;
var t=r,c=r;
for(var o in e)if(e.hasOwnProperty(o)){
var s=e[o],n=parseRtDesc(s,o),i=n.key;
c=t[i];
var u=getValueType(c);
if(n.isRequired&&void 0===c)return log("is required @key="+i),!1;
if(void 0!==c){
if(u!=n.type&&"mix"!=n.type)return log("miss match type : "+u+" !== "+n.type+" @key="+i),
!1;
if(("array"==u||"object"==u)&&"mix"!=n.type&&!checkForRtDesc(c,s))return!1;
}
}
return!0;
},checkForRtDesc=function(r,e){
return isArray(e)?checkForArrayRtDesc(r,e):"object"==typeof e?checkForObjectRtDesc(r,e):"string"==typeof e?checkForStringRtDesc(r,e):!1;
},check=function(json,rtDescs){
if("string"==typeof json)try{
json=eval("("+json+")");
}catch(e){
return log("parse json error"),!1;
}
if("object"!=typeof json)return log("must be object"),!1;
isArray(rtDesc)||(rtDescs=[rtDescs]);
for(var rtDesc,i=0;rtDesc=rtDescs[i++];)if(checkForRtDesc(json,rtDesc))return!0;
return!1;
};
return{
check:function(r,e){
try{
var t=check(r,e);
return t||printLog(),t;
}catch(c){
return!1;
}
}
};
});define("rt/appmsg/getappmsgext.rt.js",[],function(){
"use strict";
return{
base_resp:{
ret:"number",
errmsg:"string",
wxtoken:"number"
},
advertisement_num:"number",
advertisement_info:[{
hint_txt_R:"string",
url_R:"string",
type_R:"string",
rl_R:"string",
apurl_R:"string",
traceid_R:"string",
group_id_R:"string",
ticket:"string",
aid:"string",
pt:"number",
image_url:"string",
ad_desc:"string",
biz_appid:"string",
pos_type:"number",
watermark_type:"number",
logo:"string",
app_info:{},
biz_info:{},
card_info:{}
}],
comment_enabled:"number",
appmsgticket:{
ticket:"string"
},
self_head_imgs:"string",
appmsgstat:{
ret:"number",
show:"boolean",
is_login:"boolean",
like_num:"number",
liked:"boolean",
read_num:"number",
real_read_num:"number"
},
timestamp:"number",
reward_total_count:"number",
reward_head_imgs:["string"]
};
});define("biz_wap/utils/ajax.js",["biz_common/utils/url/parse.js","biz_common/utils/respTypes.js"],function(require,exports,module){
"use strict";
function joinUrl(e){
var t={};
return"undefined"!=typeof uin&&(t.uin=uin),"undefined"!=typeof key&&(t.key=key),
"undefined"!=typeof pass_ticket&&(t.pass_ticket=pass_ticket),"undefined"!=typeof wxtoken&&(t.wxtoken=wxtoken),
"undefined"!=typeof top.window.devicetype&&(t.devicetype=top.window.devicetype),
"undefined"!=typeof top.window.clientversion&&(t.clientversion=top.window.clientversion),
t.x5=isx5?"1":"0",Url.join(e,t);
}
function reportRt(e,t,o){
var r="";
o&&(r="&lc=1&log0="+encodeURIComponent(o)),(new Image).src="/mp/jsmonitor?idkey="+e+"_"+t+"_1"+r+"&r="+Math.random();
}
function debuglog(e,t,o,r){
console.debug("[ajax] status->"+t+", time->"+o+"ms, msg->"+r+", url->"+e);
}
function Ajax(obj){
var type=(obj.type||"GET").toUpperCase(),url=joinUrl(obj.url),mayAbort=!!obj.mayAbort,async="undefined"==typeof obj.async?!0:obj.async,xhr=new XMLHttpRequest,timer=null,data=null;
if("object"==typeof obj.data){
var d=obj.data;
data=[];
for(var k in d)d.hasOwnProperty(k)&&data.push(k+"="+encodeURIComponent(d[k]));
data=data.join("&");
}else data="string"==typeof obj.data?obj.data:null;
var startTime=+new Date;
xhr.open(type,url,async),xhr.onreadystatechange=function(){
if(3==xhr.readyState&&obj.received&&obj.received(xhr),4==xhr.readyState){
var costTime=+new Date-startTime;
xhr.onreadystatechange=null;
var status=xhr.status;
if(status>=200&&400>status)try{
var resp=xhr.responseText;
if("json"==obj.dataType)try{
resp=eval("("+resp+")");
var rtId=obj.rtId,rtKey=obj.rtKey||0,rtDesc=obj.rtDesc,checkRet=!0;
rtId&&rtDesc&&RespTypes&&!RespTypes.check(resp,rtDesc)&&(debuglog(obj.url,status,costTime,"rt check error"),
reportRt(rtId,rtKey,"[rtCheckError]"+obj.url));
}catch(e){
return obj.error&&obj.error(xhr),void debuglog(obj.url,status,costTime,"parse error");
}
obj.success&&obj.success(resp),debuglog(obj.url,status,costTime,"success");
}catch(e){
throw debuglog(obj.url,status,costTime,"success callback error"),__moon_report({
offset:MOON_AJAX_SUCCESS_OFFSET,
e:e
}),e;
}else{
try{
obj.error&&obj.error(xhr),debuglog(obj.url,status,costTime,"network error");
}catch(e){
throw debuglog(obj.url,status,costTime,"error callback error"),__moon_report({
offset:MOON_AJAX_ERROR_OFFSET,
e:e
}),e;
}
if(status||!mayAbort){
var __ajaxtest=window.__ajaxtest||"0";
__moon_report({
offset:MOON_AJAX_NETWORK_OFFSET,
log:"ajax_network_error["+status+"]["+__ajaxtest+"]: "+url+";host:"+top.location.host,
e:""
});
}
}
clearTimeout(timer);
try{
obj.complete&&obj.complete();
}catch(e){
throw __moon_report({
offset:MOON_AJAX_COMPLETE_OFFSET,
e:e
}),e;
}
obj.complete=null;
}
},"POST"==type&&xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),
xhr.setRequestHeader("X-Requested-With","XMLHttpRequest"),"undefined"!=typeof obj.timeout&&(timer=setTimeout(function(){
xhr.abort("timeout");
try{
obj.complete&&obj.complete();
}catch(e){
throw __moon_report({
offset:MOON_AJAX_COMPLETE_OFFSET,
e:e
}),e;
}
obj.complete=null,debuglog(obj.url,-1,obj.timeout,"timeout error"),__moon_report({
offset:MOON_AJAX_TIMEOUT_OFFSET,
log:"ajax_timeout_error: "+url,
e:""
});
},obj.timeout));
try{
xhr.send(data);
}catch(e){
obj.error&&obj.error();
}
}
var Url=require("biz_common/utils/url/parse.js"),RespTypes=require("biz_common/utils/respTypes.js"),isx5=-1!=navigator.userAgent.indexOf("TBS/"),__moon_report=window.__moon_report||function(){},MOON_AJAX_SUCCESS_OFFSET=3,MOON_AJAX_NETWORK_OFFSET=4,MOON_AJAX_ERROR_OFFSET=5,MOON_AJAX_TIMEOUT_OFFSET=6,MOON_AJAX_COMPLETE_OFFSET=7;
return Ajax;
});define("appmsg/report_and_source.js",["biz_common/utils/string/html.js","biz_common/dom/event.js","biz_common/utils/url/parse.js","biz_wap/utils/ajax.js","biz_wap/jsapi/core.js"],function(e,t,o){
"use strict";
function i(){
var e=s.indexOf("://")<0?"http://"+s:s;
if(-1!=e.indexOf("mp.weixin.qq.com/s")||-1!=e.indexOf("mp.weixin.qq.com/mp/appmsg/show")){
var t=e.split("#");
e=r.addParam(t[0],"scene",25,!0)+(t[1]?"#"+t[1]:""),e=e.replace(/#rd$/g,"#wechat_redirect");
}else e="http://mp.weixinbridge.com/mp/wapredirect?url="+encodeURIComponent(s);
var o={
url:"/mp/advertisement_report"+location.search+"&report_type=3&action_type=0&url="+encodeURIComponent(s)+"&__biz="+biz+"&r="+Math.random(),
type:"GET",
mayAbort:!0,
async:!1
};
return o.timeout=2e3,o.complete=function(){
location.href=e;
},m(o),!1;
}
e("biz_common/utils/string/html.js");
var n=e("biz_common/dom/event.js"),r=e("biz_common/utils/url/parse.js"),m=e("biz_wap/utils/ajax.js"),c=msg_title.htmlDecode(),s=msg_source_url.htmlDecode(),a=document.getElementById("js_report_article3"),p=e("biz_wap/jsapi/core.js");
n.tap(a,function(){
var e=["/mp/infringement?url=",encodeURIComponent(location.href),"&title=",encodeURIComponent(c),"&__biz=",biz].join("");
return location.href=e+"#wechat_redirect",!1;
});
var l=document.getElementById("js_view_source");
n.on(l,"click",function(){
return i(),!1;
});
});define("appmsg/async.js",["biz_common/utils/string/html.js","appmsg/a_tpl.html.js","appmsg/img_copyright_tpl.html.js","biz_common/dom/event.js","biz_wap/utils/ajax.js","biz_common/dom/class.js","biz_common/tmpl.js","biz_wap/utils/storage.js","rt/appmsg/getappmsgext.rt.js","pages/version4video.js","appmsg/cdn_img_lib.js","biz_common/utils/url/parse.js","appmsg/a.js","appmsg/like.js","appmsg/comment.js","appmsg/reward_entry.js","appmsg/iframe.js"],function(require,exports,module){
"use strict";
function saveCopy(e){
var t={};
for(var i in e)if(e.hasOwnProperty(i)){
var a=e[i],r=typeof a;
a="string"==r?a.htmlDecode():a,"object"==r&&(a=saveCopy(a)),t[i]=a;
}
return t;
}
function img_copyright(e){
if(e&&e.img_copy_info&&e.img_copy_info.list){
for(var t={},i=e.img_copy_info.list,a=window.__appmsgCgiData.copyright_stat,r=window.__appmsgCgiData.source_biz,n=0,o=i.length;o>n;n++){
var s=i[n];
if(2==s.type){
if(2==a&&r==s.source_uin)continue;
t[s.img_url]={
source_nickname:s.source_nickname,
source_uin:s.source_uin
};
}
}
for(var p=document.getElementsByTagName("img"),n=0,o=p.length;o>n;n++){
var s=p[n],d=s.getAttribute("data-backsrc")||s.getAttribute("data-src")||"";
if(t[d]){
var m=document.createElement("div");
m.innerHTML=TMPL.tmpl(img_copyright_tpl,t[d]);
var c=m.children[0],l=s.parentNode,_=l.insertBefore(c,s),f=_.childNodes[0];
_.insertBefore(s,f);
}
}
}
}
function fillVedio(e){
if(vedio_iframes&&vedio_iframes.length>0)for(var t,i,a,r=0,n=vedio_iframes.length;n>r;++r)t=vedio_iframes[r],
i=t.iframe,a=t.src,e&&(a=a.replace(/\&encryptVer=[^\&]*/gi,""),a=a.replace(/\&platform=[^\&]*/gi,""),
a=a.replace(/\&cKey=[^\&]*/gi,""),a=a+"&encryptVer=6.0&platform=61001&cKey="+e),
i.setAttribute("src",a);
}
function fillData(e){
var t=e.adRenderData||{
advertisement_num:0
};
if(!t.flag&&t.advertisement_num>0){
var i=t.advertisement_num,a=t.advertisement_info;
window.adDatas.num=i;
for(var r=0;i>r;++r){
var n=null,o=a[r];
if(o.biz_info=o.biz_info||{},o.app_info=o.app_info||{},o.pos_type=o.pos_type||0,
o.logo=o.logo||"",100==o.pt)n={
usename:o.biz_info.user_name,
pt:o.pt,
url:o.url,
traceid:o.traceid,
adid:o.aid,
ticket:o.ticket,
is_appmsg:!0
};else if(102==o.pt)n={
appname:o.app_info.app_name,
versioncode:o.app_info.version_code,
pkgname:o.app_info.apk_name,
androiddownurl:o.app_info.apk_url,
md5sum:o.app_info.app_md5,
signature:o.app_info.version_code,
rl:o.rl,
traceid:o.traceid,
pt:o.pt,
ticket:o.ticket,
type:o.type,
adid:o.aid,
is_appmsg:!0
};else if(101==o.pt)n={
appname:o.app_info.app_name,
app_id:o.app_info.app_id,
icon_url:o.app_info.icon_url,
appinfo_url:o.app_info.appinfo_url,
rl:o.rl,
traceid:o.traceid,
pt:o.pt,
ticket:o.ticket,
type:o.type,
adid:o.aid,
is_appmsg:!0
};else if(103==o.pt||104==o.pt||2==o.pt&&o.app_info){
var s=o.app_info.down_count||0,p=o.app_info.app_size||0,d=o.app_info.app_name||"",m=o.app_info.category,c=["万","百万","亿"];
if(s>=1e4){
s/=1e4;
for(var l=0;s>=10&&2>l;)s/=100,l++;
s=s.toFixed(1)+c[l]+"次";
}else s=s.toFixed(1)+"次";
p>=1024?(p/=1024,p=p>=1024?(p/1024).toFixed(2)+"MB":p.toFixed(2)+"KB"):p=p.toFixed(2)+"B",
m=m?m[0]||"其他":"其他";
for(var _=["-","(",":",'"',"'","：","（","—","“","‘"],f=-1,u=0,g=_.length;g>u;++u){
var w=_[u],v=d.indexOf(w);
-1!=v&&(-1==f||f>v)&&(f=v);
}
-1!=f&&(d=d.substring(0,f)),o.app_info._down_count=s,o.app_info._app_size=p,o.app_info._category=m,
o.app_info.app_name=d,n={
appname:o.app_info.app_name,
app_rating:o.app_info.app_rating||0,
app_id:o.app_info.app_id,
channel_id:o.app_info.channel_id,
md5sum:o.app_info.app_md5,
rl:o.rl,
pkgname:o.app_info.apk_name,
androiddownurl:o.app_info.apk_url,
versioncode:o.app_info.version_code,
appinfo_url:o.app_info.appinfo_url,
traceid:o.traceid,
pt:o.pt,
url:o.url,
ticket:o.ticket,
type:o.type,
adid:o.aid,
is_appmsg:!0
};
}else if(105==o.pt){
var h=o.card_info.card_id||"",y=o.card_info.card_ext||"";
y=y.htmlDecode();
try{
y=JSON.parse(y),y.outer_str=o.card_info.card_outer_id||"",y=JSON.stringify(y);
}catch(j){
y="{}";
}
n={
card_id:h,
card_ext:y,
pt:o.pt,
ticket:o.ticket||"",
url:o.url,
rl:o.rl,
tid:o.traceid,
type:o.type,
adid:o.aid,
is_appmsg:!0
};
}
var b=o.image_url;
require("appmsg/cdn_img_lib.js");
var x=require("biz_common/utils/url/parse.js");
b&&b.isCDN()&&(b=b.replace(/\/0$/,"/640"),b=b.replace(/\/0\?/,"/640?"),o.image_url=x.addParam(b,"wxfrom","50",!0)),
adDatas.ads["pos_"+o.pos_type]={
a_info:o,
adData:n
};
}
var k=function(e){
var t=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;
"undefined"!=typeof e&&(t=e);
10>=t&&(z.style.display="block",DomEvent.off(window,"scroll",k));
},q=document.getElementById("js_bottom_ad_area"),z=document.getElementById("js_top_ad_area"),E=adDatas.ads;
for(var I in E)if(0==I.indexOf("pos_")){
var n=E[I],o=!!n&&n.a_info;
if(n&&o)if(0==o.pos_type)q.innerHTML=TMPL.tmpl(a_tpl,o);else if(1==o.pos_type){
z.style.display="none",z.innerHTML=TMPL.tmpl(a_tpl,o),DomEvent.on(window,"scroll",k);
var D=0;
window.localStorage&&(D=1*localStorage.getItem(I)||0),window.scrollTo(0,D),k(D);
}
}
require("appmsg/a.js");
}
var O=e.appmsgstat||{};
window.appmsgstat||(window.appmsgstat=O),O.show&&(!function(){
var e=document.getElementById("js_read_area3"),t=document.getElementById("like3");
e.style.display="block",t.style.display="inline",O.liked&&Class.addClass(t,"praised"),
t.setAttribute("like",O.liked?"1":"0");
var i=document.getElementById("likeNum3"),a=document.getElementById("readNum3"),r=O.read_num,n=O.like_num;
r||(r=1),n||(n="赞"),parseInt(r)>1e5?r="100000+":"",parseInt(n)>1e5?n="100000+":"",
a&&(a.innerHTML=r),i&&(i.innerHTML=n);
}(),require("appmsg/like.js")),1==e.comment_enabled&&require("appmsg/comment.js"),
-1==ua.indexOf("WindowsWechat")&&-1!=ua.indexOf("MicroMessenger")&&e.reward&&(rewardEntry=require("appmsg/reward_entry.js"),
rewardEntry.handle(e.reward,getCountPerLine()));
}
function getAsyncData(){
var is_need_ticket="";
vedio_iframes&&vedio_iframes.length>0&&(is_need_ticket="&is_need_ticket=1");
var is_need_ad=1,_adInfo=null;
if(window.localStorage)try{
var key=[biz,sn,mid,idx].join("_"),_ad=adLS.get(key);
_adInfo=_ad.info;
try{
_adInfo=eval("("+_adInfo+")");
}catch(e){
_adInfo=null;
}
var _adInfoSaveTime=_ad.time,_now=+new Date;
_adInfo&&18e4>_now-1*_adInfoSaveTime&&1*_adInfo.advertisement_num>0?is_need_ad=0:adLS.remove(key);
}catch(e){
is_need_ad=1,_adInfo=null;
}
(!document.getElementsByClassName||-1==navigator.userAgent.indexOf("MicroMessenger")||inwindowwx)&&(is_need_ad=0);
var screen_num=Math.ceil(document.body.scrollHeight/(document.documentElement.clientHeight||window.innerHeight)),both_ad=screen_num>=2?1:0;
ajax({
url:"/mp/getappmsgext?__biz="+biz+"&appmsg_type="+appmsg_type+"&mid="+mid+"&sn="+sn+"&idx="+idx+"&scene="+source+"&title="+encodeURIComponent(msg_title.htmlDecode())+"&ct="+ct+"&devicetype="+devicetype.htmlDecode()+"&version="+version.htmlDecode()+"&f=json&r="+Math.random()+is_need_ticket+"&is_need_ad="+is_need_ad+"&comment_id="+comment_id+"&is_need_reward="+is_need_reward+"&both_ad="+both_ad+"&reward_uin_count="+(is_need_reward?3*getCountPerLine():0),
type:"POST",
dataType:"json",
rtId:"27613",
rtKey:"50",
rtDesc:rtGetAppmsgExt,
async:!0,
success:function(e){
if(e)try{
if(e&&e.base_resp&&e.base_resp.wxtoken&&(window.wxtoken=e.base_resp.wxtoken),window.fromWeixinCached&&require("appmsg/iframe.js"),
fillVedio(e.appmsgticket?e.appmsgticket.ticket:""),img_copyright(e),e.ret)return;
var t={};
if(0==is_need_ad)t=_adInfo,t||(t={
advertisement_num:0
});else{
if(e.advertisement_num>0&&e.advertisement_info){
var i=e.advertisement_info;
t.advertisement_info=saveCopy(i);
}
t.advertisement_num=e.advertisement_num;
}
1==is_need_ad&&(window._adRenderData=t),fillData({
adRenderData:t,
appmsgstat:e.appmsgstat,
comment_enabled:e.comment_enabled,
reward:{
reward_total:e.reward_total_count,
reward_head_imgs:e.reward_head_imgs||[],
can_reward:e.can_reward,
timestamp:e.timestamp
}
});
}catch(a){
var r=new Image;
return r.src=("http://mp.weixin.qq.com/mp/jsreport?1=1&key=1&content=biz:"+biz+",mid:"+mid+",uin:"+uin+"[key1]"+encodeURIComponent(a.toString())+"&r="+Math.random()).substr(0,1024),
void(console&&console.error(a));
}
},
error:function(){
var e=new Image;
e.src="http://mp.weixin.qq.com/mp/jsreport?1=1&key=2&content=biz:"+biz+",mid:"+mid+",uin:"+uin+"[key2]ajax_err&r="+Math.random();
}
});
}
function getCountPerLine(){
return DomEvent.on(window,"resize",function(){
onResize(),rewardEntry&&rewardEntry.render(getCountPerLine());
}),onResize();
}
function onResize(){
var e=window.innerWidth||document.documentElement.clientWidth;
try{
e=document.getElementById("page-content").getBoundingClientRect().width;
}catch(t){}
var i=30,a=34,r=Math.floor(.9*(e-i)/a);
return document.getElementById("js_reward_inner")&&(document.getElementById("js_reward_inner").style.width=r*a+"px"),
getCountPerLine=function(){
return r;
},r;
}
require("biz_common/utils/string/html.js");
var a_tpl=require("appmsg/a_tpl.html.js"),img_copyright_tpl=require("appmsg/img_copyright_tpl.html.js"),iswifi=!1,ua=navigator.userAgent,in_mm=-1!=ua.indexOf("MicroMessenger"),inwindowwx=-1!=navigator.userAgent.indexOf("WindowsWechat"),DomEvent=require("biz_common/dom/event.js"),offset=200,ajax=require("biz_wap/utils/ajax.js"),Class=require("biz_common/dom/class.js"),TMPL=require("biz_common/tmpl.js"),LS=require("biz_wap/utils/storage.js"),rtGetAppmsgExt=require("rt/appmsg/getappmsgext.rt.js"),rewardEntry,adLS=new LS("ad"),iframes=document.getElementsByTagName("iframe"),iframe,js_content=document.getElementById("js_content"),vedio_iframes=[],w=js_content.offsetWidth,h=3*w/4;
window.logs.video_cnt=0;
for(var i=0,len=iframes.length;len>i;++i){
iframe=iframes[i];
var src=iframe.getAttribute("data-src")||"",realsrc=iframe.getAttribute("src")||src;
if(realsrc){
var Version4video=require("pages/version4video.js");
if(!Version4video.isShowMpVideo()&&(0==realsrc.indexOf("http://v.qq.com/iframe/player.html")||0==realsrc.indexOf("https://v.qq.com/iframe/player.html")||0==realsrc.indexOf("http://v.qq.com/iframe/preview.html")||0==realsrc.indexOf("https://v.qq.com/iframe/preview.html"))||0==realsrc.indexOf("http://z.weishi.com/weixin/player.html")){
-1==realsrc.indexOf("http://z.weishi.com/weixin/player.html")&&-1==src.indexOf("http://z.weixin.com/weixin/player.html")&&(src=src.replace(/^https:/,location.protocol),
src=src.replace(/^http:/,location.protocol),src=src.replace(/preview.html/,"player.html"),
realsrc=realsrc.replace(/^https:/,location.protocol),realsrc=realsrc.replace(/^http:/,location.protocol),
realsrc=realsrc.replace(/preview.html/,"player.html")),realsrc=realsrc.replace(/width=\d+/g,"width="+w),
realsrc=realsrc.replace(/height=\d+/g,"height="+h),in_mm&&(0==realsrc.indexOf("http://v.qq.com/iframe/player.html")||0==realsrc.indexOf("https://v.qq.com/iframe/player.html"))||in_mm&&(0==realsrc.indexOf("http://v.qq.com/iframe/preview.html")||0==realsrc.indexOf("https://v.qq.com/iframe/preview.html"))?vedio_iframes.push({
iframe:iframe,
src:realsrc
}):iframe.setAttribute("src",realsrc),iframe.width=w,iframe.height=h,iframe.style.setProperty&&(iframe.style.setProperty("width",w+"px","important"),
iframe.style.setProperty("height",h+"px","important")),window.logs.video_cnt++;
continue;
}
}
}
window.adDatas={
ads:{},
num:0
};
var js_toobar=document.getElementById("js_toobar3"),innerHeight=window.innerHeight||document.documentElement.clientHeight,onScroll=function(){
var e=window.pageYOffset||document.documentElement.scrollTop,t=js_toobar.offsetTop;
e+innerHeight+offset>=t&&(getAsyncData(),DomEvent.off(window,"scroll",onScroll));
};
iswifi?(DomEvent.on(window,"scroll",onScroll),onScroll()):getAsyncData();
});define("appmsg/index.js",["biz_wap/jsapi/a8key.js","biz_wap/utils/device.js","biz_common/utils/url/parse.js","appmsg/cdn_img_lib.js","biz_wap/utils/mmversion.js","appmsg/share.js","biz_wap/ui/lazyload_img.js","appmsg/async.js","appmsg/pay_for_reading.js","appmsg/cache.js","appmsg/copyright_report.js","biz_common/dom/event.js","biz_wap/jsapi/core.js","appmsg/outer_link.js","appmsg/review_image.js","appmsg/iframe.js","appmsg/qqmusic.js","appmsg/voice.js","appmsg/cdn_speed_report.js","appmsg/page_pos.js","appmsg/report_and_source.js","biz_common/dom/class.js","appmsg/report.js"],function(e){
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
}catch(a){
var r="",s=new Image;
s.src=("http://mp.weixin.qq.com/mp/jsreport?key=4&content=biz:"+biz+",mid:"+mid+",uin:"+uin+"[key4]"+r+"&r="+Math.random()).substr(0,1024);
}
window.isInWeixinApp()&&/#rd$/.test(location.href)&&!window.isWeixinCached&&location.replace(location.href.replace(/#rd$/,"#wechat_redirect"));
var c=e("biz_common/utils/url/parse.js");
e("appmsg/cdn_img_lib.js"),window.page_endtime=+new Date;
{
var p=e("biz_wap/utils/mmversion.js"),d=!p.isWp&&-1==navigator.userAgent.indexOf("MicroMessenger");
-1!=navigator.userAgent.indexOf("WindowsWechat");
}
e("appmsg/share.js"),window.logs.webplog={
lossy:0,
lossless:0,
alpha:0,
animation:0,
total:0
};
var m=-1!=navigator.userAgent.indexOf("TBS/"),l=function(e,t){
o(e,function(e,o){
if(window.logs.webplog[e]=o?1:0,window.logs.webplog.total++,4==window.logs.webplog.total){
var n=window.logs.webplog,i=Math.random();
m&&1>=i&&(n.lossy=n.lossless=n.alpha=1,window.logs.webplog=n);
var a=n.lossy&n.lossless&n.alpha;
t(!!a);
}
});
},w=function(e){
l("lossy",e),l("lossless",e),l("alpha",e),l("animation",e);
};
window.webp=!1,w(function(o){
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
var a=e("biz_wap/ui/lazyload_img.js"),r=1;
new a({
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
if(e&&!(t>r)&&(window.__addIdKeyReport("28307",4),window.__addIdKeyReport("28307",6+2*t),
r>t&&(t++,o.__retryload=t,o.src=c.addParam(e,"retryload",t,!0)),e.isCDN())){
var n=10;
/tp\=webp/.test(e)&&(n=11);
var i=new Image;
i.src="http://mp.weixin.qq.com/mp/jsreport?key="+n+"&content="+(encodeURIComponent(e)+"["+uin+"]")+"&r="+Math.random();
}
},
onload:function(e,o){
var t=o?o.__retryload||0:0;
t>r||(window.__addIdKeyReport("28307",3),window.__addIdKeyReport("28307",5+2*t));
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
var g=e("appmsg/copyright_report.js"),u=e("biz_common/dom/event.js"),A=e("biz_wap/jsapi/core.js");
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
for(var i=0,a=t.length;a>i;i++)!function(e){
u.on(e.dom,"click",function(){
return"copyright_info"==e.dom.id&&source_username?(g.card_click_report({
scene:"0"
}),location.href="https://mp.weixin.qq.com/mp/profile_ext?action=home&username="+e.username+"&sn="+e.profile_ext_signature+"&scene=1#wechat_redirect"):A.invoke("profile",{
username:e.username,
scene:e.scene
},function(){
window.__addIdKeyReport("28307","1");
}),!1;
}),p.isWp&&e.dom.setAttribute("href","weixin://profile/"+e.username);
}(t[i]);
}(),function(){
location.href.match(/fontScale=\d+/)&&p.isIOS&&A.on("menu:setfont",function(e){
e.fontScale<=0&&(e.fontScale=100),document.getElementsByTagName("html").item(0).style.webkitTextSizeAdjust=e.fontScale+"%",
document.getElementsByTagName("html").item(0).style.lineHeight=160/e.fontScale;
});
}();
var f=e("appmsg/outer_link.js");
if(new f({
container:document.getElementById("js_content"),
changeHref:function(e,o){
if(e&&0==e.indexOf("http://mp.weixin.qq.com/s"))e=e.replace(/#rd\s*$/,""),e=e.replace(/#wechat_redirect\s*$/,""),
e=e.replace(/[\?&]scene=21/,""),e+="&scene=21#wechat_redirect";else if(0!=e.indexOf("http://mp.weixinbridge.com/mp/wapredirect"))return"http://mp.weixinbridge.com/mp/wapredirect?url="+encodeURIComponent(e)+"&action=appmsg_redirect&uin="+uin+"&biz="+biz+"&mid="+mid+"&idx="+idx+"&type="+o+"&scene=0";
return e;
}
}),!d){
var _=e("appmsg/review_image.js"),h=document.getElementById("js_cover"),y=[];
h&&y.push(h),new _({
container:document.getElementById("js_content"),
is_https_res:is_https_res,
imgs:y
});
}
window.fromWeixinCached||e("appmsg/iframe.js"),e("appmsg/qqmusic.js"),e("appmsg/voice.js"),
e("appmsg/cdn_speed_report.js"),e("appmsg/page_pos.js"),setTimeout(function(){
u.tap(document.getElementById("copyright_logo"),function(){
location.href="http://kf.qq.com/touch/sappfaq/150211YfyMVj150326iquI3e.html";
}),e("appmsg/report_and_source.js"),function(){
if(d){
var o=e("biz_common/dom/class.js");
o.addClass(t,"not_in_mm");
var n=document.createElement("link");
n.rel="stylesheet",n.type="text/css",n.async=!0,n.href=not_in_mm_css;
var i=document.getElementsByTagName("head")[0];
i.appendChild(n);
var a=document.getElementById("js_pc_qr_code_img");
if(a){
var r=10000004,s=document.referrer;
0==s.indexOf("http://weixin.sogou.com")?r=10000001:0==s.indexOf("https://wx.qq.com")&&(r=10000003),
a.setAttribute("src","/mp/qrcode?scene="+r+"&size=102&__biz="+biz),document.getElementById("js_pc_qr_code").style.display="block";
var c=new Image;
c.src="/mp/report?action=pcclick&__biz="+biz+"&uin="+uin+"&scene="+r+"&r="+Math.random();
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
u.on(l,"click",w),u.on(p,"click",w),u.on(document,"click",function(e){
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
if(g.card_pv_report(),Math.random()<.01)try{
var a="https://js.aq.qq.com/js/aq_common.js",r=document.createElement("script");
r.src=a;
var s=document.getElementsByTagName("head")[0];
s.appendChild(r);
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
u.on(window,o,function(){
var o=e.length-2,n=t();
if(o>=0){
var a=e[o],r=a.ori;
r!==n||e[e.length-1].istouchmove||(i>=11&&17>=i&&window.__report(63),window.scrollTo(0,a.scroll));
}
e.push({
ori:n,
scroll:window.pageYOffset||document.documentElement.scrollTop,
istouchmove:!1
});
}),u.on(window,"scroll",function(){
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