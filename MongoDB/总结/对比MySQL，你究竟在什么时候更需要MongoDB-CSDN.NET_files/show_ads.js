(function(){var n=this,aa=function(a,b,c){return a.call.apply(a.bind,arguments)},ba=function(a,b,c){if(!a)throw Error();if(2<arguments.length){var e=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,e);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}},r=function(a,b,c){r=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?aa:ba;return r.apply(null,arguments)},ca=function(a,
b){var c=Array.prototype.slice.call(arguments,1);return function(){var b=c.slice();b.push.apply(b,arguments);return a.apply(this,b)}},da=Date.now||function(){return+new Date};var u=(new Date).getTime();var x=function(a){a=parseFloat(a);return isNaN(a)||1<a||0>a?0:a},ea=/^([\w-]+\.)*([\w-]{2,})(\:[0-9]+)?$/,fa=function(a,b){if(!a)return b;var c=a.match(ea);return c?c[0]:b};var ga=x("0.15"),ha=x("0.001"),ia=x("1.0"),ja=x("0.01"),ka=x("0.001"),la=x("0.0"),ma=x("0.001"),na=x("0.001"),oa=x("0.2"),pa=x("0.001");var qa=/^true$/.test("false")?!0:!1,ra=/^true$/.test("false")?!0:!1;var sa=function(){return fa("","pagead2.googlesyndication.com")};var ta=/&/g,ua=/</g,va=/>/g,wa=/"/g,xa=/'/g,y={"\x00":"\\0","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\x0B",'"':'\\"',"\\":"\\\\"},z={"'":"\\'"};var B=document,C=window,D,ya=null,E=B.getElementsByTagName("script");E&&E.length&&(ya=E[E.length-1]);D=ya;var G=function(a,b){for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&b.call(null,a[c],c,a)},H=function(a){return!!a&&"function"==typeof a&&!!a.call},za=function(a,b){if(!(2>arguments.length))for(var c=1,e=arguments.length;c<e;++c)a.push(arguments[c])};function Aa(a,b){I(a,"load",b)}
var I=function(a,b,c,e){return a.addEventListener?(a.addEventListener(b,c,e||!1),!0):a.attachEvent?(a.attachEvent("on"+b,c),!0):!1},J=function(a,b,c,e){c=r(e,c);return I(a,b,c,void 0)?c:null},K=function(a,b,c){a.removeEventListener?a.removeEventListener(b,c,!1):a.detachEvent&&a.detachEvent("on"+b,c)},Ba=function(a){"google_onload_fired"in a||(a.google_onload_fired=!1,Aa(a,function(){a.google_onload_fired=!0}))},L=function(a,b){if(!(1E-4>Math.random())){var c=Math.random();if(c<b){try{var e=new Uint16Array(1);
window.crypto.getRandomValues(e);c=e[0]/65536}catch(d){c=Math.random()}return a[Math.floor(c*a.length)]}}return null},M=function(a){a=a.google_unique_id;return"number"==typeof a?a:0},Ca=function(a){var b=a.length;if(0==b)return 0;for(var c=305419896,e=0;e<b;e++)c^=(c<<5)+(c>>2)+a.charCodeAt(e)&4294967295;return 0<c?c:4294967296+c},Da=function(a){for(var b=[],c=0;a&&25>c;++c){var e=9!=a.nodeType&&a.id,e=e?"/"+e:"",d;o:{var f=a.parentElement;d=a.nodeName.toLowerCase();if(f)for(var f=f.childNodes,g=
0,q=0;q<f.length;++q){var k=f[q];if(k.nodeName&&k.nodeName.toLowerCase()==d){if(a==k){d="."+g;break o}++g}}d=""}b.push((a.nodeName&&a.nodeName.toLowerCase())+e+d);a=a.parentElement}return b.join()},Ea=function(){var a=C,b=[];if(a)try{for(var c=a.parent,e=0;c&&c!=a&&25>e;++e){for(var d=c.frames,f=0;f<d.length;++f)if(a==d[f]){b.push(f);break}a=c;c=a.parent}}catch(g){}return b.join()},Fa=function(a,b,c){b=[b.google_ad_slot,b.google_ad_format,b.google_ad_type,b.google_ad_width,b.google_ad_height];if(c){c=
[];for(var e=0;a&&25>e;a=a.parentNode,++e)c.push(9!=a.nodeType&&a.id||"");(a=c.join())&&b.push(a)}else b.push(Da(a)),b.push(Ea());return Ca(b.join(":")).toString()},N=function(a){try{return!!a.location.href||""===a.location.href}catch(b){return!1}};var Ga=!!window.google_async_iframe_id,Ha=/MSIE [2-7]|PlayStation|Gecko\/20090226|Android 2\.|Opera/i,Ia=/Android/;var O=null,Ja=function(){if(!O){for(var a=window,b=a,c=0;a!=a.parent;)if(a=a.parent,c++,N(a))b=a;else break;O=b}return O};var P=function(a,b,c){c||(c=ra?"https":"http");return[c,"://",a,b].join("")};var Ka=function(){},Ma=function(a,b,c){switch(typeof b){case "string":La(b,c);break;case "number":c.push(isFinite(b)&&!isNaN(b)?b:"null");break;case "boolean":c.push(b);break;case "undefined":c.push("null");break;case "object":if(null==b){c.push("null");break}if(b instanceof Array){var e=b.length;c.push("[");for(var d="",f=0;f<e;f++)c.push(d),Ma(a,b[f],c),d=",";c.push("]");break}c.push("{");e="";for(d in b)b.hasOwnProperty(d)&&(f=b[d],"function"!=typeof f&&(c.push(e),La(d,c),c.push(":"),Ma(a,f,c),
e=","));c.push("}");break;case "function":break;default:throw Error("Unknown type: "+typeof b);}},Na={'"':'\\"',"\\":"\\\\","/":"\\/","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\u000b"},Oa=/\uffff/.test("\uffff")?/[\\\"\x00-\x1f\x7f-\uffff]/g:/[\\\"\x00-\x1f\x7f-\xff]/g,La=function(a,b){b.push('"');b.push(a.replace(Oa,function(a){if(a in Na)return Na[a];var b=a.charCodeAt(0),d="\\u";16>b?d+="000":256>b?d+="00":4096>b&&(d+="0");return Na[a]=d+b.toString(16)}));b.push('"')};var Q="google_ad_block google_ad_channel google_ad_client google_ad_format google_ad_height google_ad_host google_ad_host_channel google_ad_host_tier_id google_ad_output google_ad_override google_ad_region google_ad_section google_ad_slot google_ad_type google_ad_unit_key google_ad_unit_key_2 google_ad_width google_adtest google_allow_expandable_ads google_alternate_ad_url google_alternate_color google_analytics_domain_name google_analytics_uacct google_bid google_captcha_token google_city google_color_bg google_color_border google_color_line google_color_link google_color_text google_color_url google_container_id google_contents google_country google_cpm google_ctr_threshold google_cust_age google_cust_ch google_cust_criteria google_cust_gender google_cust_id google_cust_interests google_cust_job google_cust_l google_cust_lh google_cust_u_url google_disable_video_autoplay google_ed google_eids google_enable_ose google_enable_ose_periscope google_encoding google_floating_ad_position google_font_face google_font_size google_frame_id google_gl google_hints google_image_size google_kw google_kw_type google_lact google_language google_loeid google_max_num_ads google_max_radlink_len google_mtl google_num_content_recommendations google_num_radlinks google_num_radlinks_per_unit google_only_ads_with_video google_only_pyv_ads google_only_userchoice_ads google_override_format google_page_url google_previous_watch google_previous_searches google_referrer_url google_region google_reuse_colors google_rl_dest_url google_rl_filtering google_rl_mode google_rt google_safe google_sc_id google_scs google_sui google_skip google_tag_for_child_directed_treatment google_tag_info google_targeting google_tdsma google_tfs google_tl google_ui_features google_ui_version google_video_doc_id google_video_product_type google_video_url_to_fetch google_with_pyv_ads google_yt_pt google_yt_up".split(" "),
Pa={google_analytics_domain_name:!0,google_analytics_uacct:!0},Qa=function(a){a.google_page_url&&(a.google_page_url=String(a.google_page_url));var b=[];G(a,function(a,e){if(null!=a){var d;try{var f=[];Ma(new Ka,a,f);d=f.join("")}catch(g){}d&&za(b,e,"=",d,";")}});return b.join("")};var Ra=/\.((google(|groups|mail|images|print))|gmail)\./,Sa=function(a){try{var b=Ra.test(a.location.host);return!(!a.postMessage||!a.localStorage||!a.JSON||b)}catch(c){return!1}};var R=function(a){this.b=a;a.google_iframe_oncopy||(a.google_iframe_oncopy={handlers:{},upd:r(this.o,this)});this.m=a.google_iframe_oncopy},Ta;var S="var i=this.id,s=window.google_iframe_oncopy,H=s&&s.handlers,h=H&&H[i],w=this.contentWindow,d;try{d=w.document}catch(e){}if(h&&d&&(!d.body||!d.body.firstChild)){if(h.call){setTimeout(h,0)}else if(h.match){try{h=s.upd(h,i)}catch(e){}w.location.replace(h)}}";
/[&<>"']/.test(S)&&(-1!=S.indexOf("&")&&(S=S.replace(ta,"&amp;")),-1!=S.indexOf("<")&&(S=S.replace(ua,"&lt;")),-1!=S.indexOf(">")&&(S=S.replace(va,"&gt;")),-1!=S.indexOf('"')&&(S=S.replace(wa,"&quot;")),-1!=S.indexOf("'")&&(S=S.replace(xa,"&#39;")));Ta=S;R.prototype.set=function(a,b){this.m.handlers[a]=b;this.b.addEventListener&&this.b.addEventListener("load",r(this.n,this,a),!1)};
R.prototype.n=function(a){a=this.b.document.getElementById(a);try{var b=a.contentWindow.document;if(a.onload&&b&&(!b.body||!b.body.firstChild))a.onload()}catch(c){}};R.prototype.o=function(a,b){var c=Ua("rx",a),e;o:{if(a&&(e=a.match("dt=([^&]+)"))&&2==e.length){e=e[1];break o}e=""}e=(new Date).getTime()-e;c=c.replace(/&dtd=(\d+|M)/,"&dtd="+(1E4>e?e+"":"M"));this.set(b,c);return c};var Ua=function(a,b){var c=RegExp("\\b"+a+"=(\\d+)"),e=c.exec(b);e&&(b=b.replace(c,a+"="+(+e[1]+1||1)));return b};var T,U,V,Va,Wa=function(){return n.navigator?n.navigator.userAgent:null};Va=V=U=T=!1;var W;if(W=Wa()){var Xa=n.navigator;T=0==W.lastIndexOf("Opera",0);U=!T&&(-1!=W.indexOf("MSIE")||-1!=W.indexOf("Trident"));V=!T&&-1!=W.indexOf("WebKit");Va=!T&&!V&&!U&&"Gecko"==Xa.product}var Ya=U,Za=Va,$a=V;var X;if(T&&n.opera){var ab=n.opera.version;"function"==typeof ab&&ab()}else Za?X=/rv\:([^\);]+)(\)|;)/:Ya?X=/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/:$a&&(X=/WebKit\/(\S+)/),X&&X.exec(Wa());var bb=!0,cb={},eb=function(a,b,c,e){var d,f=bb;try{d=c()}catch(g){try{var q,k=g.toString();g.name&&-1==k.indexOf(g.name)&&(k+=": "+g.name);g.message&&-1==k.indexOf(g.message)&&(k+=": "+g.message);if(g.stack){var h=g.stack;c=k;try{-1==h.indexOf(c)&&(h=c+"\n"+h);for(var l;h!=l;)l=h,h=h.replace(/((https?:\/..*\/)[^\/:]*:\d+(?:.|\n)*)\2/,"$1");k=h.replace(/\n */g,"\n")}catch(m){k=c}}q=k;k="";g.fileName&&(k=g.fileName);h=-1;g.lineNumber&&(h=g.lineNumber);var p;o:{try{p=e?e():"";break o}catch(F){}p=""}f=
b(a,q,k,h,p)}catch(t){db({context:"protectAndRun",msg:t.toString()+"\n"+(t.stack||"")})}if(!f)throw g;}return d},gb=function(a,b,c,e,d){a={context:a,msg:b.substring(0,512),eid:d&&d.substring(0,40),file:c,line:e.toString(),url:B.URL.substring(0,512),ref:B.referrer.substring(0,512)};fb(a);db(a);return bb},db=function(a){if(0.01>Math.random()){a="/pagead/gen_204?id=jserror"+hb(a);a="http"+("https:"==C.location.protocol?"s":"")+"://pagead2.googlesyndication.com"+a;a=a.substring(0,2E3);C.google_image_requests||
(C.google_image_requests=[]);var b=C.document.createElement("img");b.src=a;C.google_image_requests.push(b)}},fb=function(a){var b=a||{};G(cb,function(a,e){b[e]=C[a]})},ib=function(a,b){return ca(eb,a,gb,b,void 0)},hb=function(a){var b="";G(a,function(a,e){if(0===a||a)b+="&"+e+"="+("function"==typeof encodeURIComponent?encodeURIComponent(a):escape(a))});return b};var Y,Z=function(a){this.c=[];this.b=a||window;this.a=0;this.d=null;this.e=0},jb=function(a,b){this.l=a;this.win=b};Z.prototype.q=function(a,b){0!=this.a||0!=this.c.length||b&&b!=window?this.h(a,b):(this.a=2,this.g(new jb(a,window)))};Z.prototype.h=function(a,b){this.c.push(new jb(a,b||this.b));kb(this)};Z.prototype.r=function(a){this.a=1;if(a){var b=ib("sjr::timeout",r(this.f,this,!0));this.d=this.b.setTimeout(b,a)}};
Z.prototype.f=function(a){a&&++this.e;1==this.a&&(null!=this.d&&(this.b.clearTimeout(this.d),this.d=null),this.a=0);kb(this)};Z.prototype.s=function(){return!(!window||!Array)};Z.prototype.t=function(){return this.e};Z.prototype.nq=Z.prototype.q;Z.prototype.nqa=Z.prototype.h;Z.prototype.al=Z.prototype.r;Z.prototype.rl=Z.prototype.f;Z.prototype.sz=Z.prototype.s;Z.prototype.tc=Z.prototype.t;var kb=function(a){var b=ib("sjr::tryrun",r(a.p,a));a.b.setTimeout(b,0)};
Z.prototype.p=function(){if(0==this.a&&this.c.length){var a=this.c.shift();this.a=2;var b=ib("sjr::run",r(this.g,this,a));a.win.setTimeout(b,0);kb(this)}};Z.prototype.g=function(a){this.a=0;a.l()};
var lb=function(a){try{return a.sz()}catch(b){return!1}},mb=function(a){return!!a&&("object"==typeof a||"function"==typeof a)&&lb(a)&&H(a.nq)&&H(a.nqa)&&H(a.al)&&H(a.rl)},nb=function(){if(Y&&lb(Y))return Y;var a=Ja(),b=a.google_jobrunner;return mb(b)?Y=b:a.google_jobrunner=Y=new Z(a)},ob=function(a,b){nb().nq(a,b)},pb=function(a,b){nb().nqa(a,b)};var qb={"120x90":!0,"160x90":!0,"180x90":!0,"200x90":!0,"468x15":!0,"728x15":!0},rb=function(){var a="script";return["<",a,' src="',P(sa(),"/pagead/js/r20140304/r20140226/show_ads_impl.js",""),'"></',a,">"].join("")},sb=function(a,b,c,e){return function(){var d=!1;e&&nb().al(3E4);var f=a.document.getElementById(b);f&&!N(f.contentWindow)&&3==a.google_top_js_status&&
(a.google_top_js_status=6);try{if(N(a.document.getElementById(b).contentWindow)){var g=a.document.getElementById(b).contentWindow,q=g.document;q.body&&q.body.firstChild||(q.open(),g.google_async_iframe_close=!0,q.write(c))}else{var k=a.document.getElementById(b).contentWindow,h;f=c;f=String(f);if(f.quote)h=f.quote();else{g=['"'];for(q=0;q<f.length;q++){var l=f.charAt(q),m=l.charCodeAt(0),p=g,F=q+1,t;if(!(t=y[l])){var v;if(31<m&&127>m)v=l;else{var s=l;if(s in z)v=z[s];else if(s in y)v=z[s]=y[s];else{var w=
s,A=s.charCodeAt(0);if(31<A&&127>A)w=s;else{if(256>A){if(w="\\x",16>A||256<A)w+="0"}else w="\\u",4096>A&&(w+="0");w+=A.toString(16).toUpperCase()}v=z[s]=w}}t=v}p[F]=t}g.push('"');h=g.join("")}k.location.replace("javascript:"+h)}d=!0}catch(Cb){k=Ja().google_jobrunner,mb(k)&&k.rl()}d&&(d=Ua("google_async_rrc",c),(new R(a)).set(b,sb(a,b,d,!1)))}},tb=function(a){var b=["<iframe"];G(a,function(a,e){null!=a&&b.push(" "+e+'="'+a+'"')});b.push("></iframe>");return b.join("")},ub=function(a,b,c,e){e=e?'"':
"";var d=e+"0"+e;a.width=e+b+e;a.height=e+c+e;a.frameborder=d;a.marginwidth=d;a.marginheight=d;a.vspace=d;a.hspace=d;a.allowtransparency=e+"true"+e;a.scrolling=e+"no"+e},vb=function(a,b,c){var e=b.google_ad_output,d=b.google_ad_format;d||"html"!=e&&null!=e||(d=b.google_ad_width+"x"+b.google_ad_height,c&&(d+="_as"));c=!b.google_ad_slot||b.google_override_format||!qb[b.google_ad_width+"x"+b.google_ad_height]&&"aa"==b.google_loader_used;d=d&&c?d.toLowerCase():"";b.google_ad_format=d;b.google_ad_unit_key=
Fa(D.parentElement,b,!0);a=a.google_adk2_experiment=a.google_adk2_experiment||L(["C","E"],ma)||"N";"E"==a?b.google_ad_unit_key_2=Fa(D,b):"C"==a&&(b.google_ad_unit_key_2="ctrl")},wb=Math.floor(1E6*Math.random()),xb=function(a){for(var b=a.data.split("\n"),c={},e=0;e<b.length;e++){var d=b[e].indexOf("=");-1!=d&&(c[b[e].substr(0,d)]=b[e].substr(d+1))}b=c[3];if(c[1]==wb&&(window.google_top_js_status=4,a.source==top&&0==b.indexOf(a.origin)&&(window.google_top_values=c,window.google_top_js_status=5),window.google_top_js_callbacks)){for(a=
0;a<window.google_top_js_callbacks.length;a++)window.google_top_js_callbacks[a]();window.google_top_js_callbacks.length=0}};var yb=function(a,b,c){this.x=a;this.y=b;this.z=c},zb=function(a,b,c){this.beta=a;this.gamma=b;this.alpha=c},Ab=function(a,b){this.deviceAccelerationWithGravity=this.deviceAccelerationWithoutGravity=null;this.deviceMotionEventCallbacks=[];this.deviceOrientation=null;this.deviceOrientationEventCallbacks=[];this.isDeviceOrientationEventListenerRegistered=this.isDeviceMotionEventListenerRegistered=this.didDeviceOrientationCallbacksTimeoutExpire=this.didDeviceMotionCallbacksTimeoutExpire=!1;this.registeredMozOrientationEventListener=
this.registeredDeviceOrientationEventListener=this.registeredDeviceMotionEventListener=null;this.sensorsExperiment=b;this.stopTimeStamp=this.startTimeStamp=null;this.win=a},$=function(a){this.a=a;this.a.win.DeviceOrientationEvent?(this.a.registeredDeviceOrientationEventListener=J(this.a.win,"deviceorientation",this,this.j),this.a.isDeviceOrientationEventListenerRegistered=!0):this.a.win.OrientationEvent&&(this.a.registeredMozOrientationEventListener=J(this.a.win,"MozOrientation",this,this.k),this.a.isDeviceOrientationEventListenerRegistered=
!0);this.a.win.DeviceMotionEvent&&(this.a.registeredDeviceMotionEventListener=J(this.a.win,"devicemotion",this,this.i),this.a.isDeviceMotionEventListenerRegistered=!0)};
$.prototype.i=function(a){a.acceleration&&(this.a.deviceAccelerationWithoutGravity=new yb(a.acceleration.x,a.acceleration.y,a.acceleration.z));a.accelerationIncludingGravity&&(this.a.deviceAccelerationWithGravity=new yb(a.accelerationIncludingGravity.x,a.accelerationIncludingGravity.y,a.accelerationIncludingGravity.z));Bb(this.a.deviceMotionEventCallbacks);K(this.a.win,"devicemotion",this.a.registeredDeviceMotionEventListener)};
$.prototype.j=function(a){this.a.deviceOrientation=new zb(a.beta,a.gamma,a.alpha);Bb(this.a.deviceOrientationEventCallbacks);K(this.a.win,"deviceorientation",this.a.registeredDeviceOrientationEventListener)};$.prototype.k=function(a){this.a.deviceOrientation=new zb(-90*a.y,90*a.x,null);Bb(this.a.deviceOrientationEventCallbacks);K(this.a.win,"MozOrientation",this.a.registeredMozOrientationEventListener)};var Bb=function(a){for(var b=0;b<a.length;++b)a[b]();a.length=0};bb=!qa;cb={client:"google_ad_client",format:"google_ad_format",slotname:"google_ad_slot",output:"google_ad_output",ad_type:"google_ad_type",async_oa:"google_async_for_oa_experiment",zrtm:"google_ad_handling_mode",dimpr:"google_always_use_delayed_impressions_experiment",peri:"google_top_experiment"};eb("sa::main",gb,function(){var a=window;Ba(a);if(!window.google_top_experiment&&!window.google_top_js_status){var b=window;if(2!==(b.top==b?0:N(b.top)?1:2))window.google_top_js_status=0;else if(top.postMessage){var c;try{c=C.top.frames.google_top_static_frame?!0:!1}catch(e){c=!1}if(c){if(window.google_top_experiment=L(["jp_c","jp_zl","jp_wfpmr","jp_zlt","jp_wnt"],ga),"jp_c"!==window.google_top_experiment){I(window,"message",xb);window.google_top_js_status=3;b={0:"google_loc_request",1:wb};c=[];for(var d in b)c.push(d+
"="+b[d]);top.postMessage(c.join("\n"),"*")}}else window.google_top_js_status=2}else window.google_top_js_status=1}var f;f=f||window;d=!1;f&&f.navigator&&f.navigator.userAgent&&(f=f.navigator.userAgent,d=0!=f.indexOf("Opera")&&-1!=f.indexOf("WebKit")&&-1!=f.indexOf("Mobile"));!d||/Android/.test(a.navigator.userAgent)||0!=M(a)||a.google_sensors||(f=null,a.google_top_experiment&&"jp_c"!=a.google_top_experiment||(f=L(["ds_c","ds_zl","ds_wfea"],la)),f&&(a.google_sensors=new Ab(a,f),"ds_c"!=f&&new $(a.google_sensors)));
f=window.google_ad_output;void 0!==window.google_always_use_delayed_impressions_experiment||f&&"html"!=f||(window.google_always_use_delayed_impressions_experiment=L(["C","E"],ka));if(Ga?1==M(a):!M(a)){o:if(f=a.google_ad_client,d=navigator,a&&f&&d){try{var g=Ca([f,d.plugins&&d.plugins.length,a.screen&&a.screen.height,(new Date).getTimezoneOffset(),d.userAgent].join())}catch(q){break o}g/=4294967296;g<pa&&(d=["1h","12h","24h"],d=d[Math.floor(g/pa*d.length)],a.google_per_pub_requested=da(),a.google_per_pub_branch=
d,b=a.document,g=b.createElement("script"),g.src=P(sa(),"/pagead/js/per_pub_"+d+".js?client="+f),f=b.getElementsByTagName("script")[0],f.parentNode.insertBefore(g,f))}if(g=L(["C","1","5"],na))a.google_sra_delay_branch=g}(g=!1===window.google_enable_async)||(g=navigator.userAgent,Ha.test(g)?g=!1:(void 0!==window.google_async_for_oa_experiment||!Ia.test(navigator.userAgent)||Ha.test(navigator.userAgent)||(window.google_async_for_oa_experiment=L(["E","C"],ja)),g=Ia.test(g)?"E"===window.google_async_for_oa_experiment:
!0),g=!g||window.google_container_id||window.google_ad_output&&"html"!=window.google_ad_output);if(g)a.google_loader_used="sb",a.google_start_time=u,vb(a,a),document.write(rb());else{a.google_unique_id?++a.google_unique_id:a.google_unique_id=1;g={};f=0;for(d=Q.length;f<d;f++)b=Q[f],null!=a[b]&&(g[b]=a[b]);g.google_loader_used="sa";f=0;for(d=Q.length;f<d;f++)b=Q[f],Pa[b]||(a[b]=null);f=g.google_ad_width;d=g.google_ad_height;b={};ub(b,f,d,!0);b.onload='"'+Ta+'"';var k;c=a.document;for(var h=b.id,l=
0;!h||c.getElementById(h);)h="aswift_"+l++;b.id=h;b.name=h;var l=g.google_ad_width,m=g.google_ad_height,h=["<iframe"];for(k in b)b.hasOwnProperty(k)&&za(h,k+"="+b[k]);h.push('style="left:0;position:absolute;top:0;"');h.push("></iframe>");k="border:none;height:"+m+"px;margin:0;padding:0;position:relative;visibility:visible;width:"+l+"px;background-color:transparent";c.write(['<ins style="display:inline-table;',k,'"><ins id="',b.id+"_anchor",'" style="display:block;',k,'">',h.join(" "),"</ins></ins>"].join(""));
k=b.id;b=g.google_override_format||!qb[g.google_ad_width+"x"+g.google_ad_height]&&"aa"==g.google_loader_used?L(["c","e"],oa):null;vb(a,g,"e"==b);c=Qa(g);h=Sa(a);l=a.document;l=3==({visible:1,hidden:2,prerender:3,preview:4}[l.webkitVisibilityState||l.mozVisibilityState||l.visibilityState||""]||0);!h||l||void 0!==a.google_ad_handling_mode||a.google_async_for_oa_experiment||(a.google_ad_handling_mode=L(["XN","AZ","S"],ha)||L(["EI"],ia));h=a.google_ad_handling_mode?String(a.google_ad_handling_mode):null;
if(Sa(a)&&1==a.google_unique_id&&"XN"!=h&&"S"!=h){l="zrt_ads_frame"+a.google_unique_id;m=g.google_page_url;if(!m){e:{var m=a.document,p=f||a.google_ad_width,F=d||a.google_ad_height;if(a.top==a)m=!1;else{var t=m.documentElement;if(p&&F){var v=1,s=1;a.innerHeight?(v=a.innerWidth,s=a.innerHeight):t&&t.clientHeight?(v=t.clientWidth,s=t.clientHeight):m.body&&(v=m.body.clientWidth,s=m.body.clientHeight);if(s>2*F||v>2*p){m=!1;break e}}m=!0}}m=m?a.document.referrer:a.document.URL}m=encodeURIComponent(m);
p=null;if("PC"==h||"EI"==h||"AZ"==h){switch(h){case "EI":p="I";break;case "AZ":p="Z";break;default:p="K"}p=p+"-"+(m+"/"+g.google_ad_unit_key+"/"+a.google_unique_id)}g={};ub(g,f,d,!1);g.style="display:none";f=p;g.id=l;g.name=l;f=P(fa("","googleads.g.doubleclick.net"),["/pagead/html/r20140304/r20140226/zrt_lookup.html",f?"#"+encodeURIComponent(f):""].join(""));g.src=f;g=tb(g)}else g=null;f=(new Date).getTime();
d=a.google_top_experiment;l=a.google_async_for_oa_experiment;m=a.google_always_use_delayed_impressions_experiment;p=a.google_sra_delay_branch;g=["<!doctype html><html><body>",g,"<script>",c,"google_show_ads_impl=true;google_unique_id=",a.google_unique_id,';google_async_iframe_id="',k,'";google_start_time=',u,";",d?'google_top_experiment="'+d+'";':"",h?'google_ad_handling_mode="'+h+'";':"",l?'google_async_for_oa_experiment="'+l+'";':"",m?'google_always_use_delayed_impressions_experiment="'+m+'";':
"",p?'google_sra_delay_branch="'+p+'";':"",b?'google_append_as_for_format_override="'+b+'";':"","google_bpp=",f>u?f-u:1,";google_async_rrc=0;\x3c/script>",rb(),"</body></html>"].join("");(a.document.getElementById(k)?ob:pb)(sb(a,k,g,!0))}});})();
