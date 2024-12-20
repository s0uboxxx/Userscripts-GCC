// ==UserScript==
// @version         19.11.11
// @name            Smart Scroll
// @description     Provides buttons to scroll web pages up and down
// @license         MIT
// @author          S-Marty
// @compatible      firefox
// @compatible      chrome
// @namespace       https://github.com/s-marty/SmartScroll
// @homepageURL     https://github.com/s-marty/SmartScroll
// @supportURL      https://github.com/s-marty/SmartScroll/wiki
// @icon            https://raw.githubusercontent.com/s-marty/SmartScroll/master/images/smartScroll.png
// @contributionURL https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=QHFFSLZ7ENUQN&source=url
// @include         /^https?://.*$/
// @exclude         /[^\s]+\.(jpe?g|png|gif|bmp|svg)(\?[^\s]+)?$/
// @run-at          document-end
// @grant           GM.getValue
// @grant           GM.setValue
// @grant           GM_getValue
// @grant           GM_setValue
// @noframes
// @downloadURL https://raw.githubusercontent.com/s0uboxxx/Userscripts-GCC/release/release/Smart20Scroll.user.js
// @updateURL https://raw.githubusercontent.com/s0uboxxx/Userscripts-GCC/release/release/Smart20Scroll.meta.js
// ==/UserScript==
!function(){"use strict";var e={monkey:function(){let t;-1==this.user.settings.ignore.indexOf(s)&&this.body&&this.is_userscript&&(t=document.createElement("style"),t.setAttribute("id","smartscrollstyle"),t.type="text/css",t.innerHTML=this.buttonCss(),this.head.appendChild(t),this.up_ctn=document.createElement("span"),this.dn_ctn=document.createElement("span"),this.up_ctn.setAttribute("id","up_btn"),this.dn_ctn.setAttribute("id","dn_btn"),this.up_ctn.className="updn_btn",this.dn_ctn.className="updn_btn",this.body.appendChild(this.up_ctn),this.body.appendChild(this.dn_ctn),"middleclick"==this.user.settings.crawl_trigger?(this.up_ctn.addEventListener("mousedown",(function(t){2==t.which&&e.creepUp(1)}),!1),this.up_ctn.addEventListener("mouseup",(function(t){2==t.which&&(e.creep=!1)}),!1),this.dn_ctn.addEventListener("mousedown",(function(t){2==t.which&&e.creepDn(1)}),!1),this.dn_ctn.addEventListener("mouseup",(function(t){2==t.which&&(e.creep=!1)}),!1)):(this.up_ctn.addEventListener("mouseover",(function(t){e.creepUp(1)}),!1),this.up_ctn.addEventListener("mouseout",(function(t){e.creep=!1}),!1),this.dn_ctn.addEventListener("mouseover",(function(t){e.creepDn(1)}),!1),this.dn_ctn.addEventListener("mouseout",(function(t){e.creep=!1}),!1)),this.up_ctn.addEventListener("dblclick",(function(t){1===t.which&&e.smartScroll_Settings(t)}),!1),this.dn_ctn.addEventListener("dblclick",(function(t){1===t.which&&e.smartScroll_Settings(t)}),!1),this.up_ctn.addEventListener("click",(function(t){1===t.which&&e.scrollToTop()}),!1),this.dn_ctn.addEventListener("click",(function(t){1===t.which&&e.scrollToBottom()}),!1),null!==o&&this.user.settings.bottomless_pages&&(this.resize=document.createElement("iframe"),this.resize.setAttribute("name","resize_frame"),this.resize.setAttribute("tabindex","-1"),this.resize.className="resize_frame",o.appendChild(this.resize),this.resize.contentWindow.addEventListener("resize",(function(t){e.getDocumentHeight(t)}),!1)),window.addEventListener("scroll",e.onScroll,{passive:!0}),window.addEventListener("resize",e.onResize,!1),this.body.addEventListener("mouseleave",e.saveAccrued,!1),window.addEventListener("beforeunload",(function(t){e.settings_close("unload")}),!1),document.addEventListener("readystatechange",(function(t){"complete"===document.readyState&&e.getDocumentHeight(t)}),!1),this.user.settings.dimButtons&&setTimeout(e.fadeOut,3e3))},areOverVid:function(t){var n="object"==typeof t&&"VIDEO"==t.target.tagName&&t.target;if(n){var i,o=!1,s=n.getBoundingClientRect(),r=e.up_ctn.getBoundingClientRect();return o=s.right-s.left>window.innerWidth/2||s.left<window.innerWidth-33&&s.right>window.innerWidth-33,i=s.top<r.top&&s.bottom>r.top,o&&i}return!1},fadeOut:function(t){var n=e.up_ctn,i=e.dn_ctn;e.fading||(e.areOverVid(t)?(e.opacity_timer&&clearInterval(e.opacity_timer),n.style.visibility="visible",i.style.visibility="visible",n.style.opacity=.65,i.style.opacity=.65,e.fading=setTimeout((function(t){e.fading=null}),3e3),setTimeout((function(t){e.opacity_timer=setInterval((function(){n.style.opacity<=0?(clearInterval(e.opacity_timer),e.opacity_timer=null,n.style.visibility="hidden",i.style.visibility="hidden"):(n.style.opacity-=.025,i.style.opacity-=.025)}),100)}),3e3)):(e.opacity_timer&&(clearInterval(e.opacity_timer),e.opacity_timer=null),n.style.visibility="visible",i.style.visibility="visible",n.style.opacity=.65,i.style.opacity=.65))},reLoadStart:function(t){setTimeout((function(){e.getDocumentHeight(),e.getVideo(),setTimeout(e.fadeOut,3e3)}),500)},hideOnFullScreen:function(){document.addEventListener("fullscreenchange",(()=>{e.onFullScreen()})),document.addEventListener("mozfullscreenchange",(()=>{e.onFullScreen()})),document.addEventListener("webkitfullscreenchange",(()=>{e.onFullScreen()}))},onFullScreen:function(t){document.fullscreenElement||document.mozFullScreenElement||document.webkitFullscreenElement?e.body.className=e.body.className+" isfullscreen":(e.body.className=e.body.className.replace(/\sisfullscreen/g,""),window.setTimeout(e.resetButtons,100))},hasScrollbar:function(){let e,t,n,i,o,s,r;return"number"==typeof window.innerHeight?(e=window.innerHeight-document.documentElement.clientHeight,[window.innerHeight>document.documentElement.clientHeight,e+1]):(t=document.documentElement||document.body,void 0!==t.currentStyle&&(i=t.currentStyle.overflow),i=i||window.getComputedStyle(t,"").overflow,void 0!==t.currentStyle&&(o=t.currentStyle.overflowY),o=o||window.getComputedStyle(t,"").overflowY,s=t.scrollHeight>t.clientHeight,n=/^(visible|auto)$/.test(i)||/^(visible|auto)$/.test(o),r="scroll"===i||"scroll"===o,!!(s&&n||r))},getScrollTop:function(){if("undefined"!=typeof pageYOffset)return e._x=pageXOffset,pageYOffset},getDocumentHeight:function(t){let n=Math.max(document.documentElement.clientHeight,document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight)-(e.hasScrollbar()?e.scrollbar:0);if(n>window.innerHeight){if(n-window.innerHeight-e.scrollable<6)return;e.getVideo(),e.scrollable=n-window.innerHeight,e.onScroll()}},scrollToTop:function(t){var n,i=e.scrolled;i>0&&e.animate({duration:1e3,timing:function(e){return Math.pow(e,5)},draw:function(t){(n=i-t*i)<0&&(n=0),t<1?window.scrollTo(e._x,n):(window.scrollTo(e._x,0),e.count_accru+=i,e.getVideo())}})},scrollToBottom:function(t){var n,i=e.scrolled,o=e.scrollable;o>i&&e.animate({duration:1e3,timing:function(e){return Math.pow(e,5)},draw:function(t){(n=t*o+(1-t)*i)>o&&(n=o),t<1?window.scrollTo(e._x,n):(window.scrollTo(e._x,o+2),e.count_accru+=o-i,e.getVideo())}})},creepUp:function(t){1===t&&(e.creep=1,e.killCreeper(),e.creeper=setInterval(e.creepUp,e.crawl_speed_ms)),e.scrolled=e.getScrollTop(),e.creep&&e.scrolled>0?(window.scrollTo(e._x,e.scrolled-e.step),e.count_accru+=e.step):e.killCreeper()},creepDn:function(t){1===t&&(e.creep=1,e.killCreeper(),e.creeper=setInterval(e.creepDn,e.crawl_speed_ms)),e.scrolled=e.getScrollTop(),e.creep&&e.scrollable>e.scrolled?(window.scrollTo(e._x,e.scrolled+e.step),e.count_accru+=e.step):e.killCreeper()},onResize:function(t){e.getDocumentHeight(t),window.setTimeout(e.resetButtons,500)},onScroll:function(t){e.scrolled=e.getScrollTop(),e.scrollable||e.getDocumentHeight(t),e.scrolled>0?e.toggle_up_btn("show"):e.toggle_up_btn("hide"),e.scrollable>e.scrolled?e.toggle_dn_btn("show"):e.toggle_dn_btn("hide")},toggle_up_btn:function(t){"show"==t&&"show"!=e.up_btn_show?(e.up_btn_show="show",e.animate({duration:400,timing:function(e){return Math.pow(e,2)},draw:function(t){e.up_ctn.style.right=33*t-33+"px"}})):"hide"==t&&"hide"!=e.up_btn_show&&(e.up_btn_show="hide",e.animate({duration:500,timing:function(e,t){return Math.pow(t,2)*((e+1)*t-e)}.bind(null,2.8),draw:function(t){e.up_ctn.style.right=0-33*t+"px"}}))},toggle_dn_btn:function(t){"show"==t&&"show"!=e.dn_btn_show?(e.dn_btn_show="show",e.animate({duration:400,timing:function(e){return Math.pow(e,2)},draw:function(t){e.dn_ctn.style.right=33*t-33+"px"}})):"hide"==t&&"hide"!=e.dn_btn_show&&(e.dn_btn_show="hide",e.animate({duration:500,timing:function(e,t){return Math.pow(t,2)*((e+1)*t-e)}.bind(null,2.8),draw:function(t){e.dn_ctn.style.right=0-33*t+"px"}}))},killCreeper:function(){null!==this.creeper&&(clearInterval(this.creeper),this.creeper=null)},getVideo:function(){if(e.user.settings.dimButtons){var t=document.querySelectorAll("video");if(t.length){for(let n=0;n<t.length;n++)t[n].scrollWidth>100&&t[n].scrollHeight>50&&t[n].addEventListener("mousemove",e.fadeOut,!1);document.addEventListener("keydown",(function(t){(38==t.which||40==t.which)&&["INPUT","TEXTAREA"].indexOf(document.activeElement.tagName)<0&&e.fadeOut()}),!1)}}},animate:function({timing:t,draw:n,duration:i}){let o=performance.now();requestAnimationFrame((function s(r){let l=(r-o)/i;l>1&&(l=1);let a=t(l);n(a),l<1&&e.allowScroll&&requestAnimationFrame(s)}))},smartScroll_Settings:function(t){let n,i=document.querySelector(".smartScroll_Settings");if(e.settings_id||null!==i)e.settings_close();else{var o,s,r;e.allowScroll=!1,e.killCreeper();var l="",a="",d="",c="";let i=window.location.hostname,p=i.match(/^([\w\-]*\.)?([\w\-]+\.((\w{3,4}$)|(\w{2}\.\w{2}$)))/i);null!==p&&p.length>2&&(void 0===p[1]&&(p[1]=""),i=p[1]+p[2]);let g=["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"],h=document.createElement("div"),m=h,b="",f="a",x=document.createElement("br").outerHTML.indexOf("/")>0?"XHTML":"HTML";for(r=0;r<16;r++)f+=g[Math.floor(16*Math.random())];var u="HTML"==x?"selected":'selected="selected"';let w=document.createElement("input");if(w.setAttribute("type","range"),w="text"!=w.type,!w){c='<select name="crawl_speed">',[1,2,3,4,5,6,7,8,9,10,11,12,13,14,16,17,19,21,23,26,30,36,44,57,80,100].forEach((function(t){l=t==e.user.settings.crawl_speed?u:"",c+='<option value="'+t+'" '+l+">"+t+"</option>"})),c+="</select>"}a='<select name="top_plus" style="width: 52px;height: 20px;font-size: 12px;">',d='<select name="bot_minus" style="width: 52px;height: 20px;font-size: 12px;margin-left:36px;">',[0,5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,99].forEach((function(t){l=t==e.user.settings.top_plus?u:"",a+='<option value="'+t+'" '+l+">"+t+"</option>",l=t==e.user.settings.bot_minus?u:"",d+='<option value="'+t+'" '+l+">"+t+"</option>"})),a+="</select>",d+="</select>";let y="HTML"==x?"checked":'checked="checked"',v="HTML"==x?"":"</input>",_="'",A=" ",S="·",E="HTML"==x?"":"/*<![CDATA[*/",k="HTML"==x?"":"/*]]>*/",C="",T=this.user.settings.ignore.split(","),H=[60,40,65],L="That"+_+"s ";switch(!0){case this.user.count>32602522:H=[0,160,5],L+=(1==(o=Math.round(8825569e-12*this.user.count)/1e4)?"The ":o+" ")+"Light Second"+(1==o?"":"s")+".";break;case this.user.count>2676326:H=[20,120,25],L+=(1==(o=Math.round(6134495e-12*this.user.count)/100)?"The ":o+" Times the ")+"Width of the U.S.";break;case this.user.count>669082:H=[30,100,35],L+=(1==(o=Math.round(7747293e-11*this.user.count)/100)?"":o+" times ")+"the Altitude of the ISS.";break;case this.user.count>3041:H=[40,80,45],L+=(o=Math.round(.01644*this.user.count)/100)+" Mile"+(1==o?"":"s")+".";break;default:L+=(o=Math.round(8.68*this.user.count)/10)+" F"+(1==o?"oo":"ee")+"t"}let M=this.user.count.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")+",000 Pixels Smart Scrolled.",I=!1;for(r=0;r<T.length;r++)T[r].length<5||(I=I||i==T[r],C+='<span class="ignores"><button style="padding:0px 3px 1px;margin-right:6px;background-color:#ff3333;color:#fff;border-radius:3px;-webkit-border-radius:3px;-moz-border-radius:3px" onclick="document.forms[\'sssettings\'].remove.value+=\''+T[r]+",';this.disabled='disabled'\" title=\"Mark "+T[r]+' for deletion from this list">x</button><span>'+T[r]+"</span></span><br />");I=I?"":'<span class="addable"><button style="padding:0px 3px 1px;margin-right:6px;background-color:#33ff33;color:#000;font-weight:bold;border-radius:3px;-webkit-border-radius:3px;-moz-border-radius:3px" onclick="document.forms[\'sssettings\'].add.value+=\''+i+"';this.disabled='disabled'\" title=\"Mark "+i+' for addition to this list">+</button><span>'+i+"</span></span><br />",b='<div id="'+f+'" style="width:500px;height:400px;margin:auto auto;border-radius:12px 54px 12px 100px;-webkit-border-radius:12px 54px 12px 100px;-moz-border-radius:12px 54px 12px 100px;border:3px solid #CCC;">  <div style="width:500px;height:50px;background-color:#000;border-radius:12px 50px 0px 0px;-webkit-border-radius:12px 50px 0px 0px;-moz-border-radius:12px 50px 0px 0px;">    <div style="width: 380px;height:40px;padding:12px 0 0 65px;color:#eee;font-size: 1.5em;font-weight: bold;background:transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAQAAABLCVATAAAAAmJLR0QA/vCI/CkAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfiDBwSIh99fynEAAAD9klEQVRIx6XWzW9UVRjH8c+dzjBtAfsCUlIsKbSU8hZpijGRRAzhTY0Y4sqgiYQENVEXJiTEVUPQjSgr3Rhd+i+wKAYJSMJb5U2YAkljpSVAUlqgZZjOzHXR28tMKSSkZzKbc879nuc+z+/53RNsCc1oBEKPZCWftWFcTighQBj909NsD5GaDhQIjcups0aHf50yqtZ6dS7rMywlJRCWPZFgKmgC0q5TuwWuOewUeGiv9e7I6JGRknoqsimgx2ptstJ8Tc44oCeaPyrQZa0aba44YkT6eaCsNts1W6jeCV3Ol6wdlfOjVUbVa3JY7xRURUvXE0yHbZZoVeOyPc4pL2i/GzZoUmNcg5wBFXFWH0tM5iarzUYtWlX50y6XJk9SqQIBjtnlikrtmm3Q7nHJMYkJZl6t7ZZYoso/9jofRRN41Q6rozIXnfSpXmmtmm1VI18OCuVs0qxVtR479ShGy20O+F2Xpriqf/ncoCrLNNpsvBw0rt0qDWbhtgsxptX3Nil6x3eaY9RZD1Gp0QrtcUwJyOlUb7YQuSgftPjNuxKKknY6aEFclAJCNWp1yEW7E4yr064xKudanwgltTpovUARRaH3/GSxpCp7LBQKVVukVb2ccEJHOWvUmQ0KXrHfGwKLvSlUiM4rSNqh2oDANrXRS85RZ6mz0pOCXKlRZVSXQKPdRHEEcT8VBLZFgFBREOVpuTNPlL0o7p0g2jidXYiLID4gZVFpsueUbHmxEXqpFJSagbElS0H5GYDKdPRgsuVeeCQ8KAX1y5YYZxD9nrbUJythNPfIf6WvmHHLXJVRNcbcFag0vwyWELotK/CyymjlkVuuPVF2Wp9hDyPTGPGzDut86IKKEh0FLvrAOq/7xVg0/8CIPmnBBChpWK9BWQTO2Oe+ISd8rT+2rgrn7HbKPXftNyAQGHPLDUNR3aLy97hnVIBCFEPBSR+7IIkKJ3wZe1RWEYFhw/6OpROBMq64JYs6DTHquH3OSzrtG6fjbC1VjVGDMjKxjpIToacc0aSoXadffeZmtHxEymtOOl6COaTRmGsGdZdIOTL/CqPuaVBUb7l5etyPGrffOdflo/Qu84MtxmUM6DYgFZt//DlK642spM1HkvYZiDKSjXW0wgHvG5Ux4JirZk3/OUoaMGyeRyp0anDRvTJJtvnWZnfccFO3SzFmSkQwy1WDNrtvnrcNORTrluW+8pZeIzK63S+LZkpEE1FlXXJbQd5qc92IctXqCxtdd9kfjimU+cVERMF096O8nHotVuhx1EO1tmlxTZ8hqacuMIGCYcHW8Hn3o6CsZdPPuE7lPZAsPNXjk+ekn+M+QdkzedWSIzO7+QklVJvlf7qjThcu+vTfAAAAAElFTkSuQmCC) no-repeat 10px center;">    Smart Scroll Settings</div>  </div>  <form id="'+f+'_settings_form" name="sssettings" class="sssettings" action="javascript:void(0)" onsubmit="return false" style="padding:10px;height:330px;border-radius:0px 0px 10px 96px;-webkit-border-radius:0px 0px 10px 96px;-moz-border-radius:0px 0px 10px 96px;">    <div style="width:100%;height:240px;padding-bottom:0px;">      <div style="width:50%;height:100%;padding:0px;float:left;border-radius:0px 0px 0px 96px;-webkit-border-radius:0px 0px 0px 96px;-moz-border-radius:0px 0px 0px 96px;">        <span style="margin-left:30px;">Slow scrolling speed:</span><br />'+(w?'        <input name ="crawl_speed" type="range" min="1" max="100" step="1" value="'+this.user.settings.crawl_speed+'" onchange="document.getElementById(\'crawl_speed_now\').innerHTML=this.value" style="width: 180px;">'+v+' <span id="crawl_speed_now">'+this.user.settings.crawl_speed+'</span><br />        <span style="font-size:11px;">'+A+"Slow "+S+A+S+A+S+A+S+" Fast "+S+A+S+A+S+A+S+" Faster</span><br /><br />":"        "+c+'<br />        <span style="font-size:11px;">1 = Slow thru 100 = Fast</span><br /><br />')+'        <input type="checkbox" name="bottomless_pages" id="bottomless1" '+(this.user.settings.bottomless_pages?y:"")+" >"+v+' <label for="bottomless1" title="Recalculates when pages add content to bottom">Bottomless pages</label><br />        <input type="checkbox" name="refresh" id="refresh1" '+(this.user.settings.refresh?y:"")+" >"+v+' <label for="refresh1" title="Refresh current page upon critical settings changes made here">Auto page refresh</label><br />        <input type="checkbox" name="dimButtons" id="dimButtons1" '+(this.user.settings.dimButtons?y:"")+" >"+v+' <label for="dimButtons1" title="Buttons will disappear when over videos after 3 seconds">Fade out over video</label><br />        <div style="margin: 6px 0 2px 30px;">Slow scroll trigger</div>        <span><input type="radio" name="crawl_trigger" id="trigger1" value="middleclick"'+("middleclick"==this.user.settings.crawl_trigger?y:"")+" >"+v+' <label for="trigger1" title="Middle mouse button held down">Middleclick</label>               <input type="radio" name="crawl_trigger" id="trigger2" value="hover" '+("hover"==this.user.settings.crawl_trigger?y:"")+' style="margin-left:10px;">'+v+' <label for="trigger2" title="Mouse pointer held over">Hover</label></span><br />        <div style="margin: 6px 0 2px 30px;">Button Position</div>        <span><input type="radio" name="position" id="position1" value="top" onmouseout="this.blur()" '+("top"==this.user.settings.position?y:"")+">"+v+' <label for="position1" title="Always at top right">Top</label>              <input type="radio" name="position" id="position2" value="middle" onmouseout="this.blur()" '+("middle"==this.user.settings.position?y:"")+' style="margin-left:6px;">'+v+' <label for="position2" title="Always at middle right">Middle</label>              <input type="radio" name="position" id="position3" value="bottom" onmouseout="this.blur()" '+("bottom"==this.user.settings.position?y:"")+' style="margin-left:6px;">'+v+' <label for="position3" title="Always at bottom right">Bottom</label></span><br />        <span>'+a+'<span title="Pixels down from top">:Plus</span>'+d+'<span title="Pixels up from bottom">:Less</span></span><br />      </div>      <div style="width:50%;height:100%;float:left;">        <div style="width:100%;height:20px;text-align:center;" title="(Scroll buttons will not be used)">Ignored Sites</div>        <div id="ssignored" style="width:224px;height:180px;overflow-y: auto;overflow-x: hidden;border: 1px solid #000;padding: 6px;line-height:1.3;border-radius:5px;-webkit-border-radius:5px;-moz-border-radius:5px;">        '+I+C+'</div>        <div style="width:100%;height:12px;text-align:center;font-style: italic;color:blue;font-size: 12px;padding-top: 4px;cursor:help" title="'+L+'">'+M+'</div>      </div>    </div>    <div style="width:100%;height:90px;border-radius:0px 0px 10px 96px;-webkit-border-radius:0px 0px 10px 96px;-moz-border-radius:0px 0px 10px 96px;">      <div style="width:fit-content;width: -moz-fit-content;height:80px;margin:10px auto 0px;background-color:transparent">        <button id="'+f+'_settings_close" style="background-color:#ff3333;padding:30px '+H[0]+'px;border-radius:0px 0px 0px 74px;-webkit-border-radius:0px 0px 0px 74px;-moz-border-radius:0px 0px 0px 74px;">Cancel</button>         <button id="'+f+'_settings_donate" style="background-color:#ffff33;padding:30px '+H[1]+'px;">Donate</button>        <button id="'+f+'_settings_save" style="background-color:#33ff33;padding:30px '+H[2]+'px;">Save</button>      </div>    </div>    <input name ="remove" type="hidden" value="">'+v+'<input name ="add" type="hidden" value="">'+v+'<input name ="'+f+'" type="hidden" value="">'+v+'    <input name ="submit" type="submit" value="" style="width:0px;height:0px;opacity:0;">'+v+'  </form></div><style type="text/css">'+E+"  #pdus div, #pdus span, #pdus label, #pdus form, #pdus input, #pdus button {margin:0px;padding:0px;border:0px;color:#333;box-sizing:content-box;background-color:#EEE; font: 14px 'Titillium Web', 'Helvetica Neue', Helvetica, Arial, sans-serif; box-shadow: none;min-height:0px;line-height: 1;text-align:left; text-decoration:none;outline:none; }  #pdus div, #pdus form  {display:block;} #pdus span, #pdus label {display:inline;} #pdus input, #pdus button {display:inline-block;}"+k+"</style>",h.setAttribute("id","pdus"),h.className="smartScroll_Settings",h.style="width:100%;height:100%;margin:0;padding:0;position:fixed;top:0px;left:0px;background-color: rgba(0, 0, 0, 0.7);z-index:84000;",h.innerHTML=b,e.body.removeChild=function(){return m},e.body.replaceChild=function(){return m},t&&"removed"==t?e.body.innerHTML+=h.outerHTML:(e.body.appendChild(h),setTimeout((function(){null===document.querySelector(".smartScroll_Settings")&&(e.settings_id="",e.smartScroll_Settings("removed"))}),300)),e.settings_id=f,n=document.querySelector("form#"+f+"_settings_form"),n.querySelector("#"+f+"_settings_close").addEventListener("click",(function(t){e.settings_close()}),!1),n.querySelector("#"+f+"_settings_donate").addEventListener("click",(function(t){e.settings_donate()}),!1),n.querySelector("#"+f+"_settings_save").addEventListener("click",(function(t){e.onSettingsSave()}),!1),n.querySelector("#"+f+"_settings_save").addEventListener("change",(function(t){e.onSettingsSave()}),!1),n.querySelector("#position1").addEventListener("change",(function(t){e.updateButtonCss()}),!1),n.querySelector("#position2").addEventListener("change",(function(t){e.updateButtonCss()}),!1),n.querySelector("#position3").addEventListener("change",(function(t){e.updateButtonCss()}),!1);let O=n.top_plus.options,B=n.bot_minus.options;for(s=0;s<O.length;s++)O[s].addEventListener("mouseup",(function(t){e.updateButtonCss(t)}),!1),B[s].addEventListener("mouseup",(function(t){e.updateButtonCss(t)}),!1)}},onSettingsSave:function(){var t,n,i,o,s=document.querySelector("form#"+e.settings_id+"_settings_form"),r=s.querySelectorAll("input, select"),l={ignore:this.user.settings.ignore},a=!1,d=!1;if(null!==s.querySelector('input[name="'+e.settings_id+'"]')){for(i=0;i<r.length;i++){switch(n=null,(t=r[i]).type){case"checkbox":n=t.checked,this.user.settings[t.name]!=n&&"refresh"!=t.name&&(d=!0);break;case"select":case"select-one":n=parseInt(t[t.selectedIndex].value);break;case"radio":if(!t.checked)continue;n=t.value,this.user.settings[t.name]!=n&&(d=!0);break;case"range":n=parseInt(t.value);break;case"hidden":if(t.name==e.settings_id)continue;if("remove"==t.name&&""!=t.value){let e=!1,n=t.value.split(",");for(o=0;o<n.length;o++)if(!(n[o].length<5)){-1!=n[o].indexOf(window.location.hostname)&&(e=!0);var c=new RegExp(n[o]+",","gi");l.ignore=l.ignore.replace(c,"")}d=d||e;continue}if("add"==t.name&&""!=t.value){l.ignore+=t.value.trim()+",",d=a=!0;continue}continue;default:continue}null!==n&&(l[t.name]=n)}if(a){let e=l.ignore.split(",");e.pop(),e.length>1&&(e.sort(),l.ignore=e.join()+",")}e.saveSettings({name:"user_settings",value:l}),d&&l.refresh?window.location=window.location:this.resetButtons()}e.settings_close()},settings_close:function(t){let n=document.querySelector(".smartScroll_Settings");null!==n&&n.remove(),e.settings_id="",void 0!==t&&"unload"==t?(e.toggle_up_btn("hide"),e.toggle_dn_btn("hide")):e.resetButtons()},saveAccrued:function(t){e.count_accru>1e3&&e.initSettings({name:"count"})},saveSettings:function(e){if(void 0!==e&&void 0!==e.name&&""!=e.name)switch(e.name){case"user_settings":this.GM.setValue("settings",JSON.stringify(e.value));break;case"count":if(this.count_accru>999){let t=Math.round(this.count_accru/1e3)+e.value;this.GM.setValue("count",t),this.user.count=t,this.count_accru=0}else this.user.count=e.value}else console.error("saveSettings() input error")},settings_donate:function(){window.open("https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=QHFFSLZ7ENUQN&source=url","_blank")},updateButtonCss:function(t){let n=document.querySelector("#smartscrollstyle"),i=document.querySelector("form#"+e.settings_id+"_settings_form"),o=i.position2.checked,s=i.position3.checked,r="top";o?r="middle":s&&(r="bottom");let l={position:r,top_plus:parseInt(i.top_plus[i.top_plus.selectedIndex].value),bot_minus:parseInt(i.bot_minus[i.bot_minus.selectedIndex].value),bottomless_pages:e.user.settings.bottomless_pages};n.innerHTML=e.buttonCss(l)},buttonCss:function(e){let t="",o="",s="";return"top"==(e="object"==typeof e?e:this.user.settings).position?(s="top:"+e.top_plus+"px;",o="margin-top:33px;"):"bottom"==e.position?(s="bottom:"+(e.bot_minus+33)+"px;",o="margin-bottom:-33px;"):"middle"==e.position&&(s="bottom:50%;",o="margin-bottom:-33px;"),t+="#up_btn { position:fixed; right:-33px; z-index:54000; height:36px; width:33px; display:inline; cursor:pointer; background:url("+n+") no-repeat scroll 50% 50% rgba(0, 0, 0, 0.7); }",t+="#dn_btn { position:fixed; right:-33px; z-index:54000; height:36px; width:33px; display:inline; cursor:pointer; "+o+"background:url("+i+") no-repeat scroll 50% 50% rgba(0, 0, 0, 0.7); }",t+=".updn_btn { "+s+"opacity:0.65; } .isfullscreen > .updn_btn { display:none;}",t+=".sssettings button:hover {opacity:0.85;} .updn_btn:hover { opacity:1; } .sssettings button[disabled], .sssettings button[disabled]:hover { opacity:0.35;} ",t+=".sssettings span button:hover:enabled {line-height: 1.4 !important; width: 10px !important;} .sssettings .ignores button[disabled] + span { opacity:0.5;} .sssettings .addable button + span { opacity:0.5;} .sssettings .addable button[disabled] + span { opacity:1;}",e.bottomless_pages&&(t+="iframe.resize_frame {position: absolute; display: block ;top: 0; bottom: 0; left: 0; height: 100%; opacity: 0; z-index: 0; width: 0; border: 0; background-color: transparent;}","contentType"in document?-1==document.contentType.indexOf("image")&&(t+="body {position:relative !important;} body.isfullscreen {position:initial !important;}"):t+="body {position:relative !important;} body.isfullscreen {position:initial !important;}"),t},scrolledUpdate:function(t){(e.count_accru>1e3||!0===t)&&e.initSettings({name:"count"}),window.setTimeout(e.scrolledUpdate,12e4)},resetButtons:function(t){e.allowScroll=!0,e.up_btn_show="",e.dn_btn_show="",e.getDocumentHeight(t),e.crawl_speed_ms=Math.round(200/e.user.settings.crawl_speed)},syncGM_getValue:function(t){"settings"==t.detail.setting?e.initSettings(t.detail):"count"==t.detail.setting&&t.detail.value&&"{}"!=t.detail.value&&e.saveSettings({name:"count",value:JSON.parse(t.detail.value)})},initSettings:function(t){if(void 0!==t.name)this.GM.getValue(t.name,"{}").then((function(n){var i={detail:{setting:t.name,value:n||"{}"}};try{e.syncGM_getValue(i)}catch(e){console.warn("Smart Scroll: UPDATE Your Browser ",e.name)}}));else{t.setting;var n,i=t.value;if(i&&"{}"!=i?n=JSON.parse(i):(n=!1,console.warn("Smart Scroll: NO storage database")),!n){n=this.user,console.log("Smart Scroll: Installing storage database...");for(let e in n){let t=JSON.stringify(n[e]);this.GM.setValue(e,t),console.log("Smart Scroll: Inserting "+e+": "+t)}n=this.user.settings,console.log("Smart Scroll: dONE")}this.user.settings=n,this.scrolledUpdate(!0),this.monkey(),this.monkey=null}},init:function(){if("object"==typeof GM_info||"object"==typeof GM){this.is_userscript=!0,"undefined"==typeof GM?(console.log("Smart Scroll: Legacy GM_setValue enabled"),this.GM={info:GM_info,setValue:GM_setValue,getValue:function(){return new Promise(((e,t)=>{try{e(GM_getValue.apply(this,arguments))}catch(e){t(e)}}))}}):this.GM=GM;var e=document.createElement("div"),t=document.createElement("div");e.style="position:absolute;top:0px;background-color:transparent;",t.style="height:"+(window.innerHeight-100)+"px;width:100px;overflow:scroll;background-color:transparent;",this.body.appendChild(e),e.appendChild(t);let n=t.scrollHeight;t.style.overflow="hidden";let i=t.scrollHeight;this.scrollbar=i-n,t.remove(),e.remove(),this.initSettings({name:"settings"})}},head:document.head||document.getElementsByTagName("head")[0],body:document.body||document.documentElement,user:{settings:{bottomless_pages:!0,crawl_trigger:"hover",position:"bottom",dimButtons:!0,crawl_speed:21,refresh:!0,bot_minus:30,top_plus:0,ignore:""},count:0},crawl_speed_ms:10,opacity_timer:null,allowScroll:!0,settings_id:"",up_btn_show:"",dn_btn_show:"",count_accru:0,scrollable:0,scrollbar:0,scrolled:0,creeper:null,up_ctn:null,dn_ctn:null,creep:!1,step:5,GM:null,_x:0},t=0,n="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAkCAQAAACtIJtXAAAAAmJLR0QA/vCI/CkAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfiDBkQOCqvuzNgAAABWElEQVRIx6XWO7aDIBCA4V+OWYOaVbiDFGlccopkD/Sp0qiswcJb+ODhgNwjXXh8DpFhLKa558uVVvxmuF8iyi8PcWBkCHoaapmILTdA5fQZDJXIlPHl/vSlX2LKENDCcoCaemdab7Q8Am1kzxuj0d4clQ9sTAtoxiORB0jITgyZgEUGnxgxVJnAglSYNQ5lY2iEqR03bnTCSLPHoVIxdHwA+AiIjUPFY9iAGLLFsW7kGIMLyEi9JoCS/64QiEUSJVzgyfMEUWfAi9cJIhA+AARI1kZ8IEQihHHS5n0AXOTtpKWxyd5gGPbX+mASn/YKfm+nSYUnPrfZE63CE5/b7IlWx8z7XwzOG2mCuygNaCerVPxCSwP2elKpWzEHCG7wmhaNjpQcW2MSRWBB5JITK1FCNXNLjl8QyS2ILuO2KlWWe/HjoM6+z4vffO0DBco7V1sB09xfIv4A9ICG7qoP1KkAAAAASUVORK5CYII=",i="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAkCAQAAACtIJtXAAAAAmJLR0QA/vCI/CkAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfiDBkRAC0ngnAPAAABV0lEQVRIx6XWO5KDMAyA4R8PnAHIKbjBFtkiR06TIjdwnyoN4DOkYAsClm2Z8Q4q/fhGgGxRfZaRF2eiei9wOUXUL37UiZkpGunpdCK33QGtGHM4WpWp89vD5eu4xtQxYJXtAB3dzgzBbJ0CQ+aZN8ZigzWmHNiYAbDMKVEGaMhOTIWAR6aQmHG0hcCKtLhvHsbn0P+rJvs9D5Pm8KSh4ZZsutHQ8EzyMGkOvwA8IuTGQ8zKPL4Por0HiWxA/D6iutjimiASuCbrFeIeISFwLyFi5BjIECFyDGSJFMkBO+HEsdEQDZhxnuhFxWuInsFWTbWstE5BcuEr2sQVXxq+ok168kpCniojK94WIuv11McfNb3QjgF/PZmjW7EEiG7wjgGLzbQc32MOmsCK6C0n16KUbiZbTtgQKW2IkpHRHrXlUf056Irv8+q9nPtBgfrC2ajgs4yniD+XioU/GQ3iSgAAAABJRU5ErkJggg==",o=e.body,s=window.location.hostname;if(window.self==window.top)if(!0==(-1!=s.indexOf("youtube")))e.hideOnFullScreen(),window.addEventListener("yt-navigate-finish",(function(t){e.reLoadStart(t)}),!1),(o=document.querySelector("ytd-app #content"))?e.init():e.body.addEventListener("yt-page-data-updated",(function(n){(o=document.querySelector("ytd-app #content"))&&t++<1&&e.init()}),!1);else e.init()}();