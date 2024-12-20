// ==UserScript==
// @name         YouTube: Hide Watched Videos
// @namespace    https://www.haus.gg/
// @version      6.6
// @license      MIT
// @description  Hides watched videos (and shorts) from your YouTube subscriptions page.
// @author       Ev Haus
// @author       netjeff
// @author       actionless
// @match        http://*.youtube.com/*
// @match        http://youtube.com/*
// @match        https://*.youtube.com/*
// @match        https://youtube.com/*
// @noframes
// @require      https://openuserjs.org/src/libs/sizzle/GM_config.js
// @grant        GM_getValue
// @grant        GM_setValue
// @downloadURL https://raw.githubusercontent.com/s0uboxxx/Userscripts-GCC/release/release/YouTube3A20Hide20Watched20Videos.user.js
// @updateURL https://raw.githubusercontent.com/s0uboxxx/Userscripts-GCC/release/release/YouTube3A20Hide20Watched20Videos.meta.js
// ==/UserScript==
(()=>{window.trustedTypes?.createPolicy&&window.trustedTypes.createPolicy("default",{createHTML:(e,t)=>e});const e=document.createElement("a");e.textContent="YouTube: Hide Watched Videos Settings",e.href="https://github.com/EvHaus/youtube-hide-watched",e.target="_blank";const t=new GM_config({events:{save(){this.close()}},fields:{HIDDEN_THRESHOLD_PERCENT:{default:10,label:"Hide/Dim Videos Above Percent",max:100,min:0,type:"int"}},id:"YouTubeHideWatchedVideos",title:e});localStorage.YTHWV_WATCHED=localStorage.YTHWV_WATCHED||"false";const n=(...e)=>{false};(e=>{const t=document.getElementsByTagName("head")[0];if(t){const n=document.createElement("style");return n.setAttribute("type","text/css"),n.textContent=e,t.appendChild(n),n}})("\n.YT-HWV-WATCHED-HIDDEN { display: none !important }\n\n.YT-HWV-WATCHED-DIMMED { opacity: 0.3 }\n\n.YT-HWV-SHORTS-HIDDEN { display: none !important }\n\n.YT-HWV-SHORTS-DIMMED { opacity: 0.3 }\n\n.YT-HWV-HIDDEN-ROW-PARENT { padding-bottom: 10px }\n\n.YT-HWV-BUTTONS {\n\tbackground: transparent;\n\tborder: 1px solid var(--ytd-searchbox-legacy-border-color);\n    border-radius: 40px;\n    display: flex;\n    gap: 5px;\n\tmargin: 0 20px;\n}\n\n.YT-HWV-BUTTON {\n\talign-items: center;\n\tbackground: transparent;\n\tborder: 0;\n    border-radius: 40px;\n\tcolor: var(--yt-spec-icon-inactive);\n\tcursor: pointer;\n    display: flex;\n\theight: 40px;\n    justify-content: center;\n\toutline: 0;\n\twidth: 40px;\n}\n\n.YT-HWV-BUTTON:focus,\n.YT-HWV-BUTTON:hover {\n\tbackground: var(--yt-spec-badge-chip-background);\n}\n\n.YT-HWV-BUTTON-DISABLED { color: var(--yt-spec-icon-disabled) }\n\n.YT-HWV-MENU {\n\tbackground: #F8F8F8;\n\tborder: 1px solid #D3D3D3;\n\tbox-shadow: 0 1px 0 rgba(0, 0, 0, 0.05);\n\tdisplay: none;\n\tfont-size: 12px;\n\tmargin-top: -1px;\n\tpadding: 10px;\n\tposition: absolute;\n\tright: 0;\n\ttext-align: center;\n\ttop: 100%;\n\twhite-space: normal;\n\tz-index: 9999;\n}\n\n.YT-HWV-MENU-ON { display: block; }\n.YT-HWV-MENUBUTTON-ON span { transform: rotate(180deg) }\n");const r=[{icon:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48"><path fill="currentColor" d="M24 9C14 9 5.46 15.22 2 24c3.46 8.78 12 15 22 15 10.01 0 18.54-6.22 22-15-3.46-8.78-11.99-15-22-15zm0 25c-5.52 0-10-4.48-10-10s4.48-10 10-10 10 4.48 10 10-4.48 10-10 10zm0-16c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z"/></svg>',iconHidden:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48"><path fill="currentColor" d="M24 14c5.52 0 10 4.48 10 10 0 1.29-.26 2.52-.71 3.65l5.85 5.85c3.02-2.52 5.4-5.78 6.87-9.5-3.47-8.78-12-15-22.01-15-2.8 0-5.48.5-7.97 1.4l4.32 4.31c1.13-.44 2.36-.71 3.65-.71zM4 8.55l4.56 4.56.91.91C6.17 16.6 3.56 20.03 2 24c3.46 8.78 12 15 22 15 3.1 0 6.06-.6 8.77-1.69l.85.85L39.45 44 42 41.46 6.55 6 4 8.55zM15.06 19.6l3.09 3.09c-.09.43-.15.86-.15 1.31 0 3.31 2.69 6 6 6 .45 0 .88-.06 1.3-.15l3.09 3.09C27.06 33.6 25.58 34 24 34c-5.52 0-10-4.48-10-10 0-1.58.4-3.06 1.06-4.4zm8.61-1.57 6.3 6.3L30 24c0-3.31-2.69-6-6-6l-.33.03z"/></svg>',name:"Toggle Watched Videos",stateKey:"YTHWV_STATE",type:"toggle"},{icon:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48"><path fill="currentColor" d="M31.95 3c-1.11 0-2.25.3-3.27.93l-15.93 9.45C10.32 14.79 8.88 17.67 9 20.7c.15 3 1.74 5.61 4.17 6.84.06.03 2.25 1.05 2.25 1.05l-2.7 1.59c-3.42 2.04-4.74 6.81-2.94 10.65C11.07 43.47 13.5 45 16.05 45c1.11 0 2.22-.3 3.27-.93l15.93-9.45c2.4-1.44 3.87-4.29 3.72-7.35-.12-2.97-1.74-5.61-4.17-6.81-.06-.03-2.25-1.05-2.25-1.05l2.7-1.59c3.42-2.04 4.74-6.81 2.91-10.65C36.93 4.53 34.47 3 31.95 3z"/></svg>',iconHidden:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48"><g fill="currentColor"><g clip-path="url(#slashGap)"><path d="M31.97 3c-1.11 0-2.25.3-3.27.93l-15.93 9.45c-2.43 1.41-3.87 4.29-3.75 7.32.15 3 1.74 5.61 4.17 6.84.06.03 2.25 1.05 2.25 1.05l-2.7 1.59C9.32 32.22 8 36.99 9.8 40.83c1.29 2.64 3.72 4.17 6.27 4.17 1.11 0 2.22-.3 3.27-.93l15.93-9.45c2.4-1.44 3.87-4.29 3.72-7.35-.12-2.97-1.74-5.61-4.17-6.81-.06-.03-2.25-1.05-2.25-1.05l2.7-1.59c3.42-2.04 4.74-6.81 2.91-10.65C36.95 4.53 34.49 3 31.97 3z"/></g><path d="m7.501 5.55 4.066-2.42 24.26 40.78-4.065 2.418z"/></g></svg>',name:"Toggle Shorts",stateKey:"YTHWV_STATE_SHORTS",type:"toggle"},{icon:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path fill="currentColor" d="M12 9.5a2.5 2.5 0 0 1 0 5 2.5 2.5 0 0 1 0-5m0-1c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5zM13.22 3l.55 2.2.13.51.5.18c.61.23 1.19.56 1.72.98l.4.32.5-.14 2.17-.62 1.22 2.11-1.63 1.59-.37.36.08.51c.05.32.08.64.08.98s-.03.66-.08.98l-.08.51.37.36 1.63 1.59-1.22 2.11-2.17-.62-.5-.14-.4.32c-.53.43-1.11.76-1.72.98l-.5.18-.13.51-.55 2.24h-2.44l-.55-2.2-.13-.51-.5-.18c-.6-.23-1.18-.56-1.72-.99l-.4-.32-.5.14-2.17.62-1.21-2.12 1.63-1.59.37-.36-.08-.51c-.05-.32-.08-.65-.08-.98s.03-.66.08-.98l.08-.51-.37-.36L3.6 8.56l1.22-2.11 2.17.62.5.14.4-.32c.53-.44 1.11-.77 1.72-.99l.5-.18.13-.51.54-2.21h2.44M14 2h-4l-.74 2.96c-.73.27-1.4.66-2 1.14l-2.92-.83-2 3.46 2.19 2.13c-.06.37-.09.75-.09 1.14s.03.77.09 1.14l-2.19 2.13 2 3.46 2.92-.83c.6.48 1.27.87 2 1.14L10 22h4l.74-2.96c.73-.27 1.4-.66 2-1.14l2.92.83 2-3.46-2.19-2.13c.06-.37.09-.75.09-1.14s-.03-.77-.09-1.14l2.19-2.13-2-3.46-2.92.83c-.6-.48-1.27-.87-2-1.14L14 2z"/></svg>',name:"Settings",type:"settings"}],s=()=>{const{href:e}=window.location;let t="misc";return e.includes("/watch?")?t="watch":e.match(/.*\/(user|channel|c)\/.+\/videos/u)||e.match(/.*\/@.*/u)?t="channel":e.includes("/feed/subscriptions")?t="subscriptions":e.includes("/feed/trending")?t="trending":e.includes("/playlist?")&&(t="playlist"),t},o=()=>{if(document.querySelectorAll(".YT-HWV-WATCHED-DIMMED").forEach((e=>e.classList.remove("YT-HWV-WATCHED-DIMMED"))),document.querySelectorAll(".YT-HWV-WATCHED-HIDDEN").forEach((e=>e.classList.remove("YT-HWV-WATCHED-HIDDEN"))),window.location.href.indexOf("/feed/history")>=0)return;const e=s(),r=localStorage[`YTHWV_STATE_${e}`];(()=>{const e=document.querySelectorAll(".ytd-thumbnail-overlay-resume-playback-renderer"),r=Array.from(e).filter((e=>e.style.width&&Number.parseInt(e.style.width,10)>=t.get("HIDDEN_THRESHOLD_PERCENT")));return n((e.length,r.length)),r})().forEach(((t,n)=>{let s,o;if("subscriptions"===e)s=t.closest(".ytd-grid-renderer")||t.closest(".ytd-item-section-renderer")||t.closest(".ytd-rich-grid-row")||t.closest(".ytd-rich-grid-renderer")||t.closest("#grid-container"),s?.classList.contains("ytd-item-section-renderer")&&s.closest("ytd-item-section-renderer").classList.add("YT-HWV-HIDDEN-ROW-PARENT");else if("playlist"===e)s=t.closest("ytd-playlist-video-renderer");else if("watch"===e){s=t.closest("ytd-compact-video-renderer"),s?.closest("ytd-compact-autoplay-renderer")&&(s=null);const e=t.closest("ytd-playlist-panel-video-renderer");!s&&e&&(o=e)}else s=t.closest("ytd-rich-item-renderer")||t.closest("ytd-video-renderer")||t.closest("ytd-grid-video-renderer");s&&("dimmed"===r?s.classList.add("YT-HWV-WATCHED-DIMMED"):"hidden"===r&&s.classList.add("YT-HWV-WATCHED-HIDDEN")),!o||"dimmed"!==r&&"hidden"!==r||o.classList.add("YT-HWV-WATCHED-DIMMED")}))},l=()=>{const e=s();document.querySelectorAll(".YT-HWV-SHORTS-DIMMED").forEach((e=>e.classList.remove("YT-HWV-SHORTS-DIMMED"))),document.querySelectorAll(".YT-HWV-SHORTS-HIDDEN").forEach((e=>e.classList.remove("YT-HWV-SHORTS-HIDDEN")));const t=localStorage[`YTHWV_STATE_SHORTS_${e}`];(()=>{const e=[document.querySelectorAll("[is-shorts]"),document.querySelectorAll("ytd-reel-shelf-renderer ytd-reel-item-renderer"),document.querySelectorAll("ytd-rich-shelf-renderer ytd-rich-grid-slim-media"),document.querySelectorAll("ytd-reel-shelf-renderer ytd-thumbnail"),document.querySelectorAll("ytd-reel-shelf-renderer .ytd-reel-shelf-renderer")].reduce(((e,t)=>(t?.forEach((t=>{const n=t.closest("ytd-reel-shelf-renderer")||t.closest("ytd-rich-shelf-renderer");n&&!e.includes(n)&&e.push(n)})),e)),[]);return document.querySelectorAll('.ytd-thumbnail-overlay-time-status-renderer[aria-label="Shorts"]').forEach((t=>{const n=t.closest("ytd-video-renderer");e.push(n)})),n(e.length),e})().forEach((e=>{"dimmed"===t?e.classList.add("YT-HWV-SHORTS-DIMMED"):"hidden"===t&&e.classList.add("YT-HWV-SHORTS-HIDDEN")}))},c=()=>{const e=document.querySelector("#container #end #buttons");if(!e)return;const d=document.querySelector(".YT-HWV-BUTTONS"),i=document.createElement("div");i.classList.add("YT-HWV-BUTTONS"),r.forEach((({icon:e,iconHidden:r,name:d,stateKey:a,type:h})=>{const T=s(),u=[a,T].join("_"),p=localStorage.getItem(u)||"normal",m=document.createElement("button");switch(m.title="toggle"===h?`${d} : currently "${p}" for section "${T}"`:`${d}`,m.classList.add("YT-HWV-BUTTON"),"normal"!==p&&m.classList.add("YT-HWV-BUTTON-DISABLED"),m.innerHTML="hidden"===p?r:e,i.appendChild(m),h){case"toggle":m.addEventListener("click",(()=>{n();let e="dimmed";"dimmed"===p?e="hidden":"hidden"===p&&(e="normal"),localStorage.setItem(u,e),o(),l(),c()}));break;case"settings":m.addEventListener("click",(()=>{t.open(),c()}))}})),d?(e.parentNode.replaceChild(i,d),n()):(e.parentNode.insertBefore(i,e),n())},d=function(e,t,n){let r;return(...s)=>{const o=n&&!r;clearTimeout(r),r=setTimeout((()=>{r=null,n||e.apply(this,s)}),t),o&&e.apply(this,s)}}((e=>{e&&1===e.length||e[0].target.classList.contains("YT-HWV-BUTTON")||e[0].target.classList.contains("YT-HWV-BUTTON-SHORTS")||(n(),o(),l(),c())}),250),i=XMLHttpRequest.prototype.send;XMLHttpRequest.prototype.send=function(e){this.addEventListener("readystatechange",(function(){this.responseURL.indexOf("browse_ajax?action_continuation")>0&&setTimeout((()=>{d()}),0)}),!1),i.call(this,e)};const a=(()=>{const e=window.MutationObserver||window.WebKitMutationObserver,t=window.addEventListener;return(r,s)=>{if(n(),r)if(e){new e(((e,t)=>{(e[0].addedNodes.length||e[0].removedNodes.length)&&s(e)})).observe(r,{childList:!0,subtree:!0})}else t&&(r.addEventListener("DOMNodeInserted",s,!1),r.addEventListener("DOMNodeRemoved",s,!1))}})();n(),a(document.body,d),d()})();