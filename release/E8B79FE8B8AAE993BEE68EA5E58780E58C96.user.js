// ==UserScript==
// @name               跟踪链接净化
// @name:zh-CN         跟踪链接净化
// @name:zh-TW         跟蹤鏈接凈化
// @name:en            Clean Tracking URLs
// @name:ja            トラッカーの浄化
// @name:ko            추적 URL 정리
// @name:ru            Очистить ссылки отслеживания
// @name:de            Tracking-URLs bereinigen
// @name:fr            Nettoyer les URLs de suivi
// @name:es            Limpiar URLs de seguimiento
// @namespace          https://github.com/cilxe/JavaScriptProjects
// @author             cilxe
// @version            0.7.8
// @description        净化所有网站上的跟踪链接和事件
// @description:zh-CN  净化所有网站上的跟踪链接和事件
// @description:zh-TW  凈化網際網路上的所有網站鏈接和事件
// @description:en     Clean all tracking URLs, block tracking events on all websites
// @description:ja     すべてのサイトの追跡リンクとイベントをサニタイズする
// @description:ko     모든 추적 URL 정리, 모든 웹사이트에서 추적 이벤트 차단
// @description:ru     Очистить все ссылки отслеживания, заблокировать события отслеживания на всех веб-сайтах
// @description:de     Alle Tracking-URLs bereinigen, Tracking-Ereignisse auf allen Websites blockieren
// @description:fr     Nettoyer toutes les URLs de suivi, bloquer les événements de suivi sur tous les sites
// @description:es     Limpiar todas las URLs de seguimiento, bloquear eventos de seguimiento en todos los sitios web
// @match              *://*/*
// @exclude            /^https?:\/\/([a-z0-9-.]{0,52})(hdslb.com|csdnimg.cn)\/.*$/
// @run-at             document-start
// @grant              GM_registerMenuCommand
// @grant              GM_getValue
// @grant              GM_setValue
// @icon               data:image/png;base64,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
// @license            MIT
// @downloadURL https://raw.githubusercontent.com/s0uboxxx/Userscripts-GCC/release/release/E8B79FE8B8AAE993BEE68EA5E58780E58C96.user.js
// @updateURL https://raw.githubusercontent.com/s0uboxxx/Userscripts-GCC/release/release/E8B79FE8B8AAE993BEE68EA5E58780E58C96.meta.js
// ==/UserScript==
(()=>{const e=600,t=1e3,s=3e3,n=document,r=window.location.hostname,a=window.location.href,i=window.location.pathname;let o=0,c=!1;const l=/[a-z0-9-]{1,128}\.[a-z]{2,15}$/;let d=new RegExp("^(spm|from_|ref_|track|trk|share_|embeds_|refer_)|_from$|scm|referrer");const m=["spm","mkt","src","from","source","alias","vd_source","brand","curator_clanid","snr","redir","sprefix","utm_id","utm_content","utm_source","utm_medium","utm_sources","utm_term","utm_campaign","utm_referrer","utm_keyword","ref","feature"],u=["vd_source","hotRank","launch_id","popular_rank","session_id","business","sort_field","is_room_feed","visit_id","is_live_full_webview","is_live_webview","vt","theme","noReffer","timestamp","unique_k","hasBack","noTitleBar","plat_id","is_preview","buvid","up_id","is_story_h5","hybrid_set_header","lottery_id","seid","-Abrowser","from","pagefrom","schema","preUrl","jumpLinkType","referfrom","spm_id","plat_id","p2p_type","broadcast_type","event_source_type"],h=/^(utm_|share_|spm|from_)|(From|_from|source)$/,f=["rsv_idx","hisfilter","rsf","rsv_pq","rsv_t","qid","rsv_dl","oq","gpc","usm","tfflag","bs","rqlang","tn","sc_us","wfr","fenlei","platform","rqid","base_query","entry","qbl","for","from","topic_pn","rsp","rs_src","f","rsv_page","dyTabStr","ct","lm","site","sites","fr","cl","bsst","lid","rsv_spt","rsv_bp","src","sfrom","refer","zp_fr","channel","p_from","n_type","eqid","_at_","sa","pd","source","tag_key","uname","uid","fromModule","lemmaFrom","structureId","structureClickId","ie","structureItemId","xzhid","rsv_enter","rsv_btype","prefixsug","client_type","task","locate","page","type","is_new_user","frwh","obj_id","fid","fname","_t","topic_name","frs","share_from","tpl","u","tb_mod","tb_fr","share","sfc","idfrom","client_version","st","qq-pf-to","unique","is_video","_wkts_","ai","ck","shh","utm_source","utm_medium","utm_term","utm_campaign","utm_content","utm_id"],p=["rsv_idx","hisfilter","source","aid","enter_from","focus_method","previous_page","extra_params","gid","enter_method","is_from_webapp","sender_device","web_id"],_=m.concat(["ops_request_misc","request_id","biz_id","ydreferer","usp"]),g=["spm","scm","from","s","playMode","client_id"],b=new RegExp("(alibaba|alibabagroup|aliyun|alimama|aliexpress|taobao|tmall|1688|jiyoujia|fliggy).(com|hk|cn)$|(lazada|trendyol).[a-z.]{2,15}$"),v=["spm","acm","scm","scene","from","pvid","pvid2"],y=new RegExp("^(utm_|spm_|from_|ref|track|wh_|wx_)"),k=["content-id","qid","crid","isAmazonFulfilled","sbo","plattr","sprefix","ld","_encoding","ie","ds"],E=new RegExp("_ref|^(utm_|ref|pd_rd_|pf_rd_|track|sc_)","i"),w=m.concat(["embeds_referring_euri","embeds_euri","source_ve_path","feature","embeds_referring_origin","redir_token","pp","origin","ab_channel","enablejsapi","widgetid"]);function L(e){const t=new URL(window.location.href),s=t.searchParams;e.forEach((e=>{s.has(e)&&s.delete(e)})),Array.from(s.keys()).forEach((e=>{d.test(e)&&s.delete(e)})),t.href!==window.location.href&&window.history.replaceState({},"Restore",t.href)}let x;switch((()=>{const e=window.history.pushState,t=window.history.replaceState;window.history.pushState=function(...t){const s=e.apply(this,t);return window.dispatchEvent(new Event("pushstate")),window.dispatchEvent(new Event("urlchange")),s},window.history.replaceState=function(...e){const s=t.apply(this,e);return window.dispatchEvent(new Event("replacestate")),window.dispatchEvent(new Event("urlchange")),s}})(),!0){case b.test(r):x=e=>{const t=n.getElementsByTagName("a");for(let s=0;s<t.length;s+=1)if(l.test(t[s].hostname)){const n=new URL(t[s].href),r=n.searchParams;r.has("q")&&r.set("q",t[s].innerText),e.forEach((e=>{r.has(e)&&r.delete(e)})),Array.from(r.keys()).forEach((e=>{y.test(e)&&r.delete(e)})),t[s].href!==n.href&&(t[s].href=n.href)}const s=n.getElementsByTagName("area");for(let t=0;t<s.length;t+=1)if(l.test(s[t].hostname)){const n=new URL(s[t].href),r=n.searchParams;r.has("q")&&r.set("q",s[t].innerText),e.forEach((e=>{r.has(e)&&r.delete(e)})),Array.from(r.keys()).forEach((e=>{y.test(e)&&r.delete(e)})),s[t].href!==n.href&&(s[t].href=n.href)}};break;case/baidu.com$/.test(r):x=e=>{const t=n.getElementsByTagName("a");for(let s=0;s<t.length;s+=1)if(l.test(t[s].hostname)){const n=new URL(t[s].href),r=n.searchParams;"passport.baidu.com"===t[s].hostname&&e.includes("u")&&e.splice(e.indexOf("u"),1),"应用中心"===t[s].innerText&&r.set("kw",t[s].innerText),e.forEach((e=>{r.has(e)&&r.delete(e)})),n.href!==t[s].href&&(t[s].href=n.href)}};break;case/(bilibili|biligame)\.com$/.test(r):x=e=>{const t=n.getElementsByTagName("a");for(let s=0;s<t.length;s+=1){if(l.test(t[s].hostname)){t[s].removeAttribute("data-mod"),t[s].removeAttribute("data-spmid"),t[s].removeAttribute("data-idx"),t[s].removeAttribute("data-target-url");const n=new URL(t[s].href),r=n.searchParams;e.forEach((e=>{r.has(e)&&r.delete(e)})),Array.from(r.keys()).forEach((e=>{h.test(e)&&r.delete(e)})),t[s].href!==n.href&&(t[s].href=n.href)}const n=t[s].getAttribute("data-url");if(/^(https?:\/\/|\/\/)[a-zA-Z0-9-.]{1,128}\.[a-z]{2,15}/.test(n)){let r;r=n.startsWith("//")?new URL(`https:${n}`):new URL(n);const a=r.searchParams;if(r.hostname.endsWith("bilibili.com"))Array.from(a.keys()).forEach((e=>{h.test(e)&&a.delete(e)})),e.forEach((e=>{a.has(e)&&a.delete(e)}));else{const e=d;Array.from(a.keys()).forEach((t=>{e.test(t)&&a.delete(t)})),m.forEach((e=>{a.has(e)&&a.delete(e)}))}t[s].href=r.href,t[s].classList.remove("jump-link"),t[s].target="_blank",t[s].innerText.startsWith(r.href)&&(t[s].innerText=r.href)}}};break;case/amazon\.[a-z.]{2,15}$/.test(r):x=e=>{const t=n.getElementsByTagName("a");for(let s=0;s<t.length;s+=1){if(l.test(t[s].hostname)){const n=new URL(t[s].href),r=n.searchParams;e.forEach((e=>{r.has(e)&&r.delete(e)})),Array.from(r.keys()).forEach((e=>{E.test(e)&&r.delete(e)})),t[s].href!==n.href&&(t[s].href=n.href)}/amazon\.[a-z.]{2,15}$/.test(t[s].hostname)&&t[s].pathname.includes("/ref")&&(t[s].pathname=t[s].pathname.substring(t[s].pathname.indexOf("/ref"),1))}};break;case/google\.[a-z.]{2,15}$|about.google$/.test(r):x=e=>{const t=n.getElementsByTagName("a"),s=d;for(let n=0;n<t.length;n+=1)if(l.test(t[n].hostname)){const r=new URL(t[n].href),a=r.searchParams;if(e.forEach((e=>{a.has(e)&&a.delete(e)})),Array.from(a.keys()).forEach((e=>{s.test(e)&&a.delete(e)})),t[n].href!==r.href&&(t[n].href=r.href),/utm_/.test(r.hash)){const e=r.hash.substring(1).split("&");e.forEach(((t,s)=>{/^utm_/.test(t)&&e.splice(s,8)})),t[n].hash=`#${e.toString().replaceAll(",","&")}`}}};break;default:x=e=>{const t=n.getElementsByTagName("a"),s=d;for(let n=0;n<t.length;n+=1)if(l.test(t[n].hostname)){const r=new URL(t[n].href),a=r.searchParams;e.forEach((e=>{a.has(e)&&a.delete(e)})),Array.from(a.keys()).forEach((e=>{s.test(e)&&a.delete(e)})),t[n].href!==r.href&&(t[n].href=r.href)}}}function T(e,t){const s=setTimeout((()=>{L(e),x(e),clearTimeout(s)}),t)}function q(e,t){const s=setTimeout((()=>{const t=()=>{x(e)},r=t=>{t.stopImmediatePropagation(),x(e)},a=()=>{T(e,0)},i=n.getElementsByTagName("div");for(let e=0;e<i.length;e+=1)i[e].className&&(i[e].removeEventListener("click",a),i[e].addEventListener("click",a),i[e].removeEventListener("auxclick",r),i[e].addEventListener("auxclick",r),i[e].removeEventListener("mousedown",t),i[e].addEventListener("mousedown",t),i[e].removeEventListener("keydown",t),i[e].addEventListener("keydown",t));const o=n.getElementsByTagName("button");for(let e=0;e<o.length;e+=1)o[e].className&&(o[e].removeEventListener("click",a),o[e].addEventListener("click",a));const c=n.getElementsByTagName("a");for(let e=0;e<c.length;e+=1)l.test(c[e].hostname)&&(c[e].removeEventListener("keyup",r),c[e].addEventListener("keyup",r),c[e].removeEventListener("click",t),c[e].addEventListener("click",t),c[e].removeEventListener("auxclick",t),c[e].addEventListener("auxclick",t),c[e].removeEventListener("contextmenu",r),void 0===c[e].ontouchstart&&c[e].addEventListener("contextmenu",r));clearTimeout(s)}),t)}function B(e){L(e),x(e);let t=0,s=0;n.addEventListener("pointermove",(n=>{(Math.abs(n.clientX-t)>20||Math.abs(n.clientY-s)>20)&&(x(e),t=n.clientX,s=n.clientY)})),n.addEventListener("DOMContentLoaded",(()=>{q(e,0)}))}function I(e,s,r,a){n.addEventListener("DOMContentLoaded",(()=>{const i=new MutationObserver((t=>{t.forEach((t=>{t.addedNodes.forEach((t=>{document.querySelector(e)&&t.querySelector(s)&&!c&&(console.info("Auto Cloesd!"),t.querySelector(s).click())}))}))}));if(i.observe(n,{childList:!0,subtree:!0}),c){const e=setTimeout((()=>{r.addEventListener("click",(()=>{c=!0,i.disconnect()})),clearTimeout(e)}),2*t)}else{const e=setTimeout((()=>{c=!0,i.disconnect(),clearTimeout(e)}),a)}}))}function N(e){const t=setTimeout((()=>{let e=0;do{const t=n.getElementsByTagName("a");for(let e=0;e<t.length;e+=1)t[e].hostname.endsWith("cm.bilibili.com")&&t[e].parentNode.removeChild(t[e]);e+=1}while(e<2);const s=n.getElementsByClassName("bili-video-card");for(let e=0;e<s.length;e+=1)s[e].getAttribute("data-report").includes("tianma.")&&s[e].setAttribute("data-report","0");const r=n.getElementsByClassName("right-entry-item")||n.getElementsByClassName("item");if(r[0]&&r[0].innerText.includes("登录")){!function(e,t,s,n){const r=setInterval((()=>{e.forEach((e=>{document.querySelector(e)&&(n?document.querySelector(e).remove():document.querySelector(e).style.visibility="hidden")}))}),t);document.addEventListener("DOMContentLoaded",(()=>{const e=setTimeout((()=>{clearInterval(r),clearTimeout(e)}),s)}))}([".lt-row",".bili-login-card",".bili-mini-mask",".is-bottom",".v-popover-content",".unlogin-popover"],30,6e3,!1);const e=r[0].getElementsByTagName("span")[0];/登录/.test(r[0].innerText)&&e&&(e.outerHTML='<a href="https://passport.bilibili.com/login" target="_blank" onmouseup="cleanLinks(bilibiliParams)">登录</a>')}clearTimeout(t),n.getElementById("right-bottom-banner").remove()}),e)}function C(){const t=e=>{e.stopImmediatePropagation()};function s(){const e=n.getElementsByTagName("a");for(let s=0;s<e.length;s+=1)if(null===e[s].getAttribute("data-video-time")&&l.test(e[s].hostname)){const n=e[s].classList.contains("jump-link"),a=e[s].classList.contains("video-time")||e[s].classList.contains("video");n&&a||(r.endsWith("bilibili.com")&&(e[s].removeEventListener("click",t),e[s].addEventListener("click",t)),e[s].removeEventListener("contextmenu",t),void 0===e[s].ontouchstart&&e[s].addEventListener("contextmenu",t),e[s].removeEventListener("pointerdown",t),e[s].addEventListener("pointerdown",t))}}s();const i=()=>{!function(e){const t=setTimeout((()=>{x(u),N(0),s(),clearTimeout(t)}),e)}(e)},o=n.getElementsByTagName("button");for(let e=0;e<o.length;e+=1)o[e].className&&(o[e].removeEventListener("click",i),o[e].addEventListener("click",i));const c=n.getElementsByTagName("li");for(let e=0;e<c.length;e+=1)c[e].className&&!c[e].classList.contains("context-sub-menu-item")&&(c[e].removeEventListener("click",i),c[e].addEventListener("click",i));a.startsWith("https://live.bilibili.com/blackboard/dropdown")&&document.addEventListener("DOMContentLoaded",(()=>{document.addEventListener("click",(e=>{e.stopPropagation()}),!0)}))}function W(e){L(u);const t=setTimeout((()=>{C(),clearTimeout(t)}),e)}function M(){const t=()=>{const t=setTimeout((()=>{!function(){const t=n.getElementsByClassName("suggest-item"),s=()=>{W(e)};if(t)for(let e=0;e<t.length;e+=1)t[e].addEventListener("click",s,!0);const r=n.getElementsByClassName("trending-item");if(r)for(let e=0;e<r.length;e+=1)r[e].addEventListener("click",s,!0);const a=n.getElementsByClassName("history-item");if(a)for(let e=0;e<a.length;e+=1)a[e].addEventListener("click",s,!0)}(),clearTimeout(t)}),e)};n.querySelector(".search-input-el")&&n.querySelector(".search-input-el").addEventListener("click",t,!0),n.querySelector(".clear-icon")&&n.querySelector(".clear-icon").addEventListener("click",t,!0)}(()=>{let c,S,P,$,A,R,z,O,U;switch(navigator.language){case"zh-CN":c="手动清理链接",S="添加自定义参数（半角英文模式）",P="请输入单个指定的参数（仅支持字母，数字，下划线，短破折号(-)与任意类型的括号）",$="无效的参数格式 ",A="移除一个手动添加的参数（页面刷新后生效）",R="无此参数",z="已添加的自定义参数\n\n",O="暂未添加任何的自定义参数";break;case"zh-TW":c="手動清理鏈接",S="添加自定義参数（半角英文模式）",P="請輸入單個指定的參數（僅支持字母，數字，下劃線，短破折號(-)與任意類型的括號）",$="無效的參數格式 ",A="移除一個手動添加的參數（頁面刷新後生效）",R="無此參數",z="已添加的自定義參數\n\n",O="暫未添加任何的自定義參數";break;default:c="Retry link cleaning",S="Add a custom parameter (English Mode)",P="Please enter a single parameter below \n(only support letters, numbers, underscore, en-dash and all types of brackets):",$="Not a valid parameter format ",A="Remove a custom parameter (Effect after refresh)",R="No such parameter.",z="Get all custom added params:\n\n",O="No added custom parameters now!"}function D(e,t){if(/^[a-zA-Z0-9()[\]{}<>_-]*$/.test(e)){let s;s=GM_getValue(r)?GM_getValue(r):[],e&&(s.push(e),GM_setValue(r,s)),s.forEach((e=>{t.includes(e)||t.push(e)}))}else alert($)}function j(){let e;return e=GM_getValue(r)?GM_getValue(r):[],e}switch(!0){case r.endsWith("youtube.com"):U=w,function(){function e(e){setTimeout((()=>{const e=document.getElementsByClassName("yt-core-attributed-string--link-inherit-color");for(let t=0;t<e.length;t+=1)e[t].addEventListener("click",(e=>{e.stopPropagation()}),!0)}),e)}L(w),x(w),n.addEventListener("DOMContentLoaded",(()=>{T(w,s),q(w,0),e(2*t)})),n.addEventListener("contextmenu",(()=>{x(w),"/results"===i&&n.addEventListener("pointerenter",(e=>{e.stopPropagation(),x(w)}),!0),window.onscroll=()=>{const t=n.documentElement.scrollTop;t-o>120&&(x(w),e(0),o=t)};const t=new URL("https://youtube.com/watch");if(new URL(a).searchParams.has("list")&&t.searchParams.set("list",new URL(a).searchParams.get("list")),i.startsWith("/watch")){t.searchParams.set("v",new URL(a).searchParams.get("v"));const e=n.getElementsByClassName("ytp-contextmenu")[0].getElementsByClassName("ytp-menuitem");e[1].addEventListener("click",(()=>{navigator.clipboard.writeText(t.href)})),e[2].addEventListener("click",(()=>{t.searchParams.set("t",n.getElementsByTagName("video")[0].currentTime.toFixed(0)),navigator.clipboard.writeText(t.href)}))}if(i.startsWith("/embed")){t.searchParams.set("v",i.replace("/embed/",""));const e=n.getElementsByClassName("ytp-contextmenu")[0].getElementsByClassName("ytp-menuitem");e[2].addEventListener("click",(()=>{navigator.clipboard.writeText(t.href)})),e[3].addEventListener("click",(()=>{t.searchParams.set("t",n.getElementsByTagName("video")[0].currentTime.toFixed(0)),navigator.clipboard.writeText(t.href)}))}}))}();break;case r.endsWith("baidu.com"):U=f,function(){function e(){const e=document.getElementsByClassName("EC_result");if(e)for(let t=0;t<e.length;t+=1)e[t].remove()}function t(e){x(f);const t=n.getElementsByTagName("a");for(let e=0;e<t.length;e+=1)l.test(t[e].hostname)&&(t[e].hostname.endsWith("zhidao.baidu.com")&&"/q"===t[e].pathname&&(t[e].pathname="/search"),t[e].href=t[e].href.replace("from=",""));if(n.querySelector("area")){const t=new URL(n.querySelector("area").href),s=t.searchParams;e.forEach((e=>{s.has(e)&&s.delete(e)})),n.querySelector("area").href=t.href}}r.endsWith("news.baidu.com")&&f.push("toc_style_id","share_to","track_id"),L(f),r.endsWith("tieba.baidu.com")&&f.includes("ie")&&f.splice(f.indexOf("ie"),1),t(f),n.addEventListener("DOMContentLoaded",(()=>{const e=n.getElementsByTagName("a");for(let s=0;s<e.length;s+=1)""!==e[s].href&&e[s].addEventListener("click",(()=>{t(f)}),!0)})),"/s"===i&&e(),window.onscroll=()=>{const t=n.documentElement.scrollTop;t-o>120&&(x(f),o=t),"/s"===i&&e()};let s=0,a=0;window.onpointermove=e=>{(Math.abs(e.clientX-s)>20||Math.abs(e.clientY-a)>20)&&(x(f),s=e.clientX,a=e.clientY)}}(),x(f);break;case/amazon\.[a-z.]{2,15}$/.test(r):U=k,d=E,B(U);break;case/(bilibili|biligame)\.com$/.test(r):U=u,d=h,L(u),x(u),C(),r.endsWith("www.bilibili.com")&&(x(u),n.addEventListener("DOMContentLoaded",(()=>{let t,s,r,o;n.querySelector(".rec-footer")&&n.querySelector(".rec-footer").addEventListener("click",(()=>{T(u,e),W(u)}),!0),/^\/video\//.test(i)?(t="#arc_toolbar_report",r="share-btn-outer",s="share-btn-inner"):/^\/bangumi\//.test(i)&&(t=".toolbar",r="share-container-id",s="link_copy");const c=new URL(window.location.href),l=()=>{navigator.clipboard.writeText(a)};n.querySelector(t)&&n.querySelector(t).addEventListener("pointermove",(()=>{n.getElementById(r)&&(n.getElementById(r).removeEventListener("click",l),n.getElementById(r).addEventListener("click",l),n.getElementById(s).addEventListener("click",(e=>{e.stopImmediatePropagation(),n.getElementById(s).innerText.includes("精准")?(0===i.indexOf("/video/")?o=n.querySelector("video")||n.querySelector("bwp-video"):0===i.indexOf("/bangumi/")&&(o=n.getElementsByTagName("video")[1]||n.querySelector("bwp-video")),c.searchParams.set("t",o.currentTime.toFixed(2)),navigator.clipboard.writeText(c.toString())):navigator.clipboard.writeText(a)})))}))}))),r.endsWith("search.bilibili.com")&&function(){M();const r=n.getElementsByClassName("vui_pagenation--btn");if(r)for(let t=0;t<r.length;t+=1)r[t].addEventListener("click",(()=>{W(e)}),!0);W(t),T(u,s-600)}(),r.endsWith("live.bilibili.com")&&function(r){const a=setTimeout((()=>{const t=n.getElementsByClassName("tabs__tag-item");if(t)for(let s=0;s<t.length;s+=1)t[s].addEventListener("click",(()=>{T(u,e)}),!0);const s=n.getElementsByClassName("tab-item");if(s)for(let t=0;t<s.length;t+=1)s[t].addEventListener("click",(()=>{C(),T(u,e)}),!0);clearTimeout(a)}),r),i=setInterval((e=>{e&&n.getElementById("anchor-guest-box-id")?n.getElementById("anchor-guest-box-id").style.display="none":e||(n.getElementById("anchor-guest-box-id").style.display="");const t=n.getElementsByTagName("iframe");for(let s=0;s<t.length;s+=1)t[s].src.includes("live-lottery")&&(t[s].style.visibility=e?"hidden":"")})(!0),2*t),o=setTimeout((()=>{clearInterval(i),clearTimeout(o)}),s+9e5)}(t),n.addEventListener("DOMContentLoaded",(()=>{window.onscroll=()=>{const e=n.documentElement.scrollTop;e-o>120&&(x(u),N(0),C(),o=e)},function(){let e=0,t=0;/live.bilibili.com$/.test(r)||/^https?:\/\/(www|m).bilibili\.com\/(video|bangumi)/.test(a)?window.onpointermove=e=>{e.clientY<200&&(x(u),C())}:window.onpointermove=s=>{(Math.abs(s.clientX-e)>20||Math.abs(s.clientY-t)>20)&&(x(u),C(),e=s.clientX,t=s.clientY)}}(),function(){const e=n.getElementsByTagName("meta");for(let t=0;t<e.length;t+=1)"spm_prefix"===e[t].name&&e[t].remove()}(),W(1e3)}));break;case b.test(r):U=v,d=y,function(){switch(!0){case/(taobao|tmall).(com|hk)$/.test(r):v.push("scm2","stats_click","initiative_id","source","suggest","suggest_query","iconType","traceId","relationId","union_lens","ref","ali_trackid","ak","detailSharePosition","topOfferIds","sp_abtk","search_condition","industryCatId","tbSocialPopKey","bxsign","utparam","eurl","itemIds","country","epid","user_number_id","rootPageId","lwfrom","disableNav","es","rand","_lgt_","x5referer","status_bar_transparent","tracelog");break;case r.endsWith("fliggy.com"):v.push("ad_id","am_id","cm_id","pm_id","_k");break;case r.endsWith("1688.com"):v.push("scm2","topOfferIds","__pageId__","resourceId","offerId","offerIds","object_id","udsPoolId","resultType","cms_id","pha_html","__existtitle__","object_type","delivery_pool_id","delivery_pool_type","ilike_session","tracelog","clickid","sessionid","cosite","_p_isad","exp","rootPageId","lwfrom","disableNav","es","hpageId");break;case/(lazada|trendyol).[a-z.]{2-10}/.test(r):v.push("shareUniqueId","clickTrackInfo","data_prefetch","at_iframe","prefetch_replace","wc")}L(v),T(v,s),n.addEventListener("DOMContentLoaded",(()=>{q(v,e)})),window.onscroll=()=>{const e=n.documentElement.scrollTop;e-o>120&&(x(v),q(v,0),o=e)}}();break;case r.endsWith("csdn.net"):U=_,function(){function e(){const e=n.getElementsByTagName("a");for(let t=0;t<e.length;t+=1)e[t].hostname&&e[t].addEventListener("click",(e=>{e.stopImmediatePropagation()}))}L(_),T(_,t),window.onpointermove=t=>{(t.clientY<170||t.clientY>450)&&(x(_),e())},window.onscroll=()=>{const t=n.documentElement.scrollTop;t-o>120&&(x(_),e(),o=t)}}();break;case/(youku|tudou)\.com$/.test(r):U=g,d=y,B(U);break;case/(tiktok|douyin)\.com$/.test(r):U=p,B(U);break;default:U=function(){switch(!0){case/google\.[a-z.]{2,15}$|(about|wellbeing).google/.test(r):m.push("device","pcampaignid","subid","hl","fg","ved","ei","prev","sig","sca_esv","visit_id","dest_src");break;case r.endsWith("facebook.com"):m.push("privacy_mutation_token","ars","helpref","search_session_id","entry_point","campaign_id","nav_source","placement","privacy_source","__cft__[0]","__tn__");break;case/(twitter|x)\.com$/.test(r):m.push("screen_name");break;case r.endsWith("reddit.com"):m.push("embed_host_url","actionSource","shreddit"),d=/^(utm_|spm_|from_|ref|track|trk|experiment_d2x_|experiment_mweb)/;break;case r.endsWith("linkedin.com"):m.push("original_referer","origin","upsellOrderOrigin","lipi","desktopBackground","profileFormEntryPoint","entityUrn","veh","miniCompanyUrn","courseSlug","upsellTrk","upsellTrackingId","contextUrn","ct","pt","refId","position"),document.addEventListener("DOMContentLoaded",(()=>{q(m,8500),T(m,2*t)}));break;case r.endsWith("dzen.ru"):m.push("lang","country_code","rid","clid","stid","issue_tld","parent_rid","persistent_id","story","t","utr","place","secdata","integration","feed_exp","force_common_feed","feed_filter_type","feed_filter_source");break;case r.endsWith("vk.com"):m.push("scheme","initial_stats_info");break;case/(microsoft|bing|xbox|skype|office|microsoft365)\.com$/.test(r):m.push("ocid","OCID","ICID","icid","CLCID","clcid","es","response_mode","exp","form","FORM","xr","cat0","culture","country","WT.mc_id","uiflavor","activetab","fl","client_id","wreply","cobrandid","deeplink","referrer","mode","pos");break;case/msn.(com|cn)$/.test(r):m.push("ocid","cvid","ei",".cn","fullscreen");break;case/bestbuy\.(com|ca)$/.test(r):m.push("id","ar","cmp","loc","irgwc","mpid","irclickid","intlreferer","intl","browsedCategory","qp","type","usc","iht","ks","sc","_dyncharset","icmp"),d=/^(utm_|nrtv_|subId)/;break;case r.endsWith("github.com"):m.push("ref_cta","ref_loc","ref_page");break;case r.endsWith("stackoverflow.com"):d=/^(utm_|spm_|from_|ref|track|trk|so_)/;break;case r.endsWith("pixiv.net"):m.push("provider");break;case r.endsWith("music.apple.com"):m.push("at","ct","itscg","itsct");break;case r.endsWith("zhihu.com"):m.push("search_source","hybrid_search_source","hybrid_search_extra","utm_psn"),I(".Modal-content",".Modal-closeButton",n.querySelector(".AppHeader-profile button"),2e3);break;case/(163|126|yeah)\.(com|net)$/.test(r):m.push("scene","session_id","fromDlpro","dltype");break;case r.endsWith("weibo.com"):m.push("mark_id","entry","_rand","sudaref","refer","band_rank","gid","ua");break;case r.endsWith("qq.com"):m.push("ADTAG","fromSource");break;case/ebay\.[a-z.]{2,15}$/.test(r):m.push("_trkparms","_trksid","ssPageName","amdata","mc","hash","epid","var","_ssn","store_name","requested","itmprp","itmmeta");break;case r.endsWith("jd.com"):m.splice(m.indexOf("utm_campaign"),1),m.push("gx","ad_od","needRecommendFlag","uabt","d","_fd","pvid","jxsid","csid","ss_projid","scan_orig","ss_expid","ss_sexpid","ss_ruleid","ss_sruleid","ss_symbol","ss_mtest","sceneval"),d=/^(track|wxa_|spm_|from_)/;break;case r.endsWith("yangkeduo.com"):m.push("gx","ad_od","needRecommendFlag","uabt","d","pxq_secret_key","cpsSignjb_act","launch_pdd","customParameters","duoduo_type","goods_sign"),d=/^(track|from_|utm_|_oak_|_wv|_x_)/;break;case/(hoyolab|hoyoverse|mihoyo|miyoushe|mihoyogift)\.com$/.test(r):m.push("game_version","visit_device","device_type","plat_type"),d=/^(track|utm|spm_|from_|hyl_|bbs_|mhy_)|_from$/,(()=>{const e=document.createElement("style");e.innerText+="body{overflow: auto !important}",n.addEventListener("DOMContentLoaded",(()=>{document.head.append(e)}))})(),B(m);break;case r.endsWith("douban.com"):m.push("target_user_id","dcs","dcm","dt_time_source","channel","fullscreen","autorotate","hidenav");break;case/(imdb|boxofficemojo)\.com$/.test(r):m.push("rf","imdbPageAction","u","tag"),d=E;break;case r.endsWith("gitee.com"):(()=>{const e=setInterval((()=>{n.querySelector(".menu.transition.visible")&&(n.querySelector(".menu.transition.visible").style="display: none !important;")}),50);document.addEventListener("DOMContentLoaded",(()=>{const t=setTimeout((()=>{clearInterval(e),clearTimeout(t)}),3e3)}))})();break;case r.endsWith("xda-developers.com"):m.push("tag","ascsubtag","asc_refurl","asc_campaign","newsletter_popup");break;case r.endsWith("cctv.com"):m.push("toc_style_id");break;case r.endsWith("fiverr.com"):m.push("pckg_id","funnel","context_type","context_alg","imp_id","pos","seller_online","context");break;case r.endsWith("newegg.com"):m.push("cm_sp","nextpage");break;case r.endsWith("theverge.com"):m.push("u1","tag","ascsubtag","subId1","subId2","subId3");break;case r.endsWith("bluestacks.com"):m.push("platform","client_uuid","app_pkg","platform_cloud","preferred_lang","gaCookie","gclid","clickid","msclkid","affiliateId","offerId","transaction_id","aff_sub","first_landing_page","user_id","incompatible","bluestacks_version","referrer","download_page_referrer"),d=/^device_|(_version|utm_campaign)$/;break;case r.endsWith("xiaohongshu.com"):I(".login-container",".close-button",n.querySelector(".login-btn"),3700);break;case r.endsWith("nicovideo.jp"):m.push("cmnhd_ref","device","site","pos")}const e=m;return L(e),x(e),document.addEventListener("DOMContentLoaded",(()=>{q(e,1200),T(e,1e3),T(e,7e3)})),window.onscroll=()=>{const t=n.documentElement.scrollTop;t-o>120&&(x(e),o=t)},e}()}D("",U),GM_registerMenuCommand(c,(()=>{L(U),x(U),console.log(f)}),"C"),GM_registerMenuCommand(S,(()=>{D(prompt(P,""),U)})),GM_registerMenuCommand(A,(()=>{const e=j();if(e.length>0){!function(e){if(null!=e){let t;t=GM_getValue(r)?GM_getValue(r):[],t.includes(e)?(t=t.filter((t=>t!==e)),GM_setValue(r,t)):alert(R)}}(prompt(`${z+e.join(", ")}`,""))}else alert(O)})),GM_registerMenuCommand(z,(function(){const e=j();e.length>0?alert(z+e.join(", ")):alert(O)})),window.addEventListener("urlchange",(()=>{L(U),x(U),q(U,0)})),window.addEventListener("keydown",(e=>{"X"===e.key&&e.altKey&&e.shiftKey&&(L(U),x(U),r.includes("bilibili.com")&&N(0))}))})()})();