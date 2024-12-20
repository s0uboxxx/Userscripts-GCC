// ==UserScript==
// @name                Instagram Download Button
// @name:zh-TW          Instagram 下載器
// @name:zh-CN          Instagram 下载器
// @name:ja             Instagram ダウンローダー
// @name:ko             Instagram 다운로더
// @name:es             Descargador de Instagram
// @name:fr             Téléchargeur Instagram
// @name:hi             इंस्टाग्राम डाउनलोडर
// @name:ru             Загрузчик Instagram
// @namespace           https://github.com/y252328/Instagram_Download_Button
// @version             1.17.18
// @compatible          chrome
// @description         Add the download button and the open button to download or open profile picture and media in the posts, stories, and highlights in Instagram
// @description:zh-TW   在Instagram頁面加入下載按鈕與開啟按鈕，透過這些按鈕可以下載或開啟大頭貼與貼文、限時動態、Highlight中的照片或影片
// @description:zh-CN   在Instagram页面加入下载按钮与开启按钮，透过这些按钮可以下载或开启大头贴与贴文、限时动态、Highlight中的照片或影片
// @description:ja      メディアをダウンロードまたは開くためのボタンを追加します
// @description:ko      미디어를 다운로드하거나 여는 버튼을 추가합니다
// @description:es      Agregue botones para descargar o abrir medios
// @description:fr      Ajoutez des boutons pour télécharger ou ouvrir des médias
// @description:hi      मीडिया को डाउनलोड या खोलने के लिए बटन जोड़ें।
// @description:ru      Добавьте кнопки для загрузки или открытия медиа
// @author              ZhiYu
// @match               https://www.instagram.com/*
// @icon                https://www.google.com/s2/favicons?sz=64&domain=instagram.com
// @grant               none
// @license             MIT
// @downloadURL https://raw.githubusercontent.com/s0uboxxx/Userscripts-GCC/release/release/Instagram20Download20Button.user.js
// @updateURL https://raw.githubusercontent.com/s0uboxxx/Userscripts-GCC/release/release/Instagram20Download20Button.meta.js
// ==/UserScript==
!function(){"use strict";const e="%id%-%datetime%-%medianame%",t=e,n=/^\/p\/([^/]+)\//,r=/instagram\.com\/p\/[\w-]+\//;var l="";function o(e,t,n){let r=e.querySelectorAll(t);for(let e=0;e<r.length;++e){let t=r[e];if(t.querySelector(n))return t}return null}document.addEventListener("keydown",(function(e){if("https://www.instagram.com/"===window.location.href)return;const t={stopPropagation:function(){},preventDefault:function(){}};if(e.altKey&&("KeyK"===e.code||"k"==e.key)){let e=document.getElementsByClassName("download-btn");if(e.length>0){let n={...t};n.currentTarget=e[e.length-1],g(n),m(n)}}if(e.altKey&&("KeyI"===e.code||"i"==e.key)){let e=document.getElementsByClassName("newtab-btn");if(e.length>0){let n={...t};n.currentTarget=e[e.length-1],g(n),m(n)}}if(e.altKey&&("KeyL"===e.code||"l"==e.key)){let e=document.getElementsByClassName("_9zm2");e.length>0&&e[0].click()}if(e.altKey&&("KeyJ"===e.code||"j"==e.key)){let e=document.getElementsByClassName("_9zm0");e.length>0&&e[0].click()}}));setInterval((function(){const e=window.location.href,t="header section svg circle";let n=getComputedStyle(document.body).backgroundColor.match(/[.?\d]+/g),d=.299*n[0]+.587*n[1]+.114*n[2]<=150?"white":"black";if(l!==e)for(;0!==document.getElementsByClassName("custom-btn").length;)document.getElementsByClassName("custom-btn")[0].remove();let m=document.querySelectorAll("article");for(let e=0;e<m.length;e++){let t=Array.from(m[e].querySelectorAll('article *:not(li)>*>*>*>div:not([class])>div[role="button"]:not([style]):not([tabindex="-1"])')).pop();t&&0===m[e].getElementsByClassName("custom-btn").length&&s(t,d,i)}if(Boolean(window.location.href.match(r))){let e=o(document,'div[role="button"] > div[role="button"]:not([style])','polygon[points="20 21 12 13.44 4 21 4 3 20 3 20 21"]')||o(document,'div[role="button"] > div[role="button"]:not([style])','path[d="M20 22a.999.999 0 0 1-.687-.273L12 14.815l-7.313 6.912A1 1 0 0 1 3 21V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1Z"]');0===document.getElementsByClassName("custom-btn").length&&e.parentNode.querySelector("svg")&&s(e.parentNode.querySelector("svg"),d,c)}if(0!==document.getElementsByClassName("custom-btn").length||e.includes("stor")||document.querySelector(t)&&s(document.querySelector(t),d,a),0===document.getElementsByClassName("custom-btn").length){let e=o(document,"svg",'path[d="M5.888 22.5a3.46 3.46 0 0 1-1.721-.46l-.003-.002a3.451 3.451 0 0 1-1.72-2.982V4.943a3.445 3.445 0 0 1 5.163-2.987l12.226 7.059a3.444 3.444 0 0 1-.001 5.967l-12.22 7.056a3.462 3.462 0 0 1-1.724.462Z"]')||o(document,"svg",'path[d="M15 1c-3.3 0-6 1.3-6 3v40c0 1.7 2.7 3 6 3s6-1.3 6-3V4c0-1.7-2.7-3-6-3zm18 0c-3.3 0-6 1.3-6 3v40c0 1.7 2.7 3 6 3s6-1.3 6-3V4c0-1.7-2.7-3-6-3z"]');if(e){s(e.parentNode,"white",u)}}l=e}),500);function i(e,t){e.append(t)}function c(e,t){e.parentNode.parentNode.append(t)}function a(e,t){e.parentNode.parentNode.parentNode.appendChild(t,e.parentNode.parentNode)}function u(e,t){e.parentNode.parentNode.parentNode.append(t)}function s(e,t,n){let r=d('<svg id="Capa_1" style="fill:%color;" viewBox="0 0 482.239 482.239" xmlns="http://www.w3.org/2000/svg" height="24" width="24">\n    <path d="m465.016 0h-344.456c-9.52 0-17.223 7.703-17.223 17.223v86.114h-86.114c-9.52 0-17.223 7.703-17.223 17.223v344.456c0 9.52 7.703 17.223 17.223 17.223h344.456c9.52 0 17.223-7.703 17.223-17.223v-86.114h86.114c9.52 0 17.223-7.703 17.223-17.223v-344.456c0-9.52-7.703-17.223-17.223-17.223zm-120.56 447.793h-310.01v-310.01h310.011v310.01zm103.337-103.337h-68.891v-223.896c0-9.52-7.703-17.223-17.223-17.223h-223.896v-68.891h310.011v310.01z"/>\n</svg>',t,"newtab-btn","16px");n(e,r);let l=d('<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" height="24" width="24"\n     viewBox="0 0 477.867 477.867" style="fill:%color;" xml:space="preserve">\n    <g>\n        <path d="M443.733,307.2c-9.426,0-17.067,7.641-17.067,17.067v102.4c0,9.426-7.641,17.067-17.067,17.067H68.267\n            c-9.426,0-17.067-7.641-17.067-17.067v-102.4c0-9.426-7.641-17.067-17.067-17.067s-17.067,7.641-17.067,17.067v102.4\n            c0,28.277,22.923,51.2,51.2,51.2H409.6c28.277,0,51.2-22.923,51.2-51.2v-102.4C460.8,314.841,453.159,307.2,443.733,307.2z"/>\n    </g>\n    <g>\n        <path d="M335.947,295.134c-6.614-6.387-17.099-6.387-23.712,0L256,351.334V17.067C256,7.641,248.359,0,238.933,0\n            s-17.067,7.641-17.067,17.067v334.268l-56.201-56.201c-6.78-6.548-17.584-6.36-24.132,0.419c-6.388,6.614-6.388,17.099,0,23.713\n            l85.333,85.333c6.657,6.673,17.463,6.687,24.136,0.031c0.01-0.01,0.02-0.02,0.031-0.031l85.333-85.333\n            C342.915,312.486,342.727,301.682,335.947,295.134z"/>\n    </g>\n</svg>',t,"download-btn","14px");n(e,l)}function d(e,t,n,r){let l=document.createElement("a");return l.innerHTML=e.replace("%color",t),l.setAttribute("class","custom-btn "+n),l.setAttribute("target","_blank"),l.setAttribute("style","cursor: pointer;margin-left: "+r+";margin-top: 8px;z-index: 999;"),l.onclick=m,l.onmouseenter=g,n.includes("newtab")?l.setAttribute("title","Open in new tab"):l.setAttribute("title","Download"),l}function m(n){let r=n.currentTarget;n.stopPropagation(),n.preventDefault(),window.location.pathname.includes("stories")?async function(e){let n=q(e),r=await N(e,n);const l=/\/stories\/(.*)\/.*\//;if(e.getAttribute("class").includes("download-btn")){let e=r.split("?")[0].split("\\").pop().split("/").pop();e=e.substring(0,e.lastIndexOf("."));let o=new Date(n.querySelector("time").getAttribute("datetime")),i="unkown";const c=n.querySelector("header a");if(c&&(i=c.getAttribute("href").replace(/\//g,"")),"unkown"===i){const e=window.location.pathname.match(l);e&&(i=e[1])}I(r,x(t,i,o,e))}else k(r)}(r):document.querySelector("header")&&document.querySelector("header").contains(r)?function(e){let t=h(e);if(t.length>0)if(e.getAttribute("class").includes("download-btn")){I(t,document.querySelector("header h2").textContent)}else k(t)}(r):async function(t){try{let n=p(t),{url:r,mediaIndex:l}=await f(t,n);if(r.length>0)if(t.getAttribute("class").includes("download-btn")){let t=r.split("?")[0].split("\\").pop().split("/").pop();t=t.substring(0,t.lastIndexOf("."));let o=new Date(n.querySelector("time").getAttribute("datetime")),i=n.querySelector("header a")||function(e){let t=e.querySelector('article section + * a[href^="/"][href$="/"]');if(t)return t;let n=e.querySelector("canvas ~ * img");if(!n){return document.querySelector("h2[dir]").innerText}{n=n.getAttribute("alt");let t=e.querySelectorAll("a");for(let e=0;e<t.length;e++){const r=t[e].getAttribute("href").replace(/\//g,"");if(n.includes(r))return t[e]}}}(n);i=i.getAttribute("href").replace(/\//g,"");let c=A(n);I(r,x(e,i,o,t,c,l))}else k(r)}catch(e){return console.log(`Uncatched in postOnClicked(): ${e}\n${e.stack}`),null}}(r)}function g(e){let t=e.currentTarget;window.location.pathname.includes("stories")?async function(e){let t=q(e),n=await N(e,t);e.setAttribute("href",n)}(t):document.querySelector("header")&&document.querySelector("header").contains(t)?function(e){let t=h(e);e.setAttribute("href",t)}(t):async function(e){let t=p(e),{url:n}=await f(e,t);e.setAttribute("href",n)}(t)}function h(e){return document.querySelector("header img").getAttribute("src")}function p(e){let t=e;for(;t&&"ARTICLE"!==t.tagName&&"MAIN"!==t.tagName;)t=t.parentNode;return t}async function f(e,t){let n=null,r=0;if(0===t.querySelectorAll("li[style][class]").length){if(n=await b(t),null===n){let e=t.querySelector("video");e?(n=e.getAttribute("src"),e.hasAttribute("videoURL")?n=e.getAttribute("videoURL"):(null===n||n.includes("blob"))&&(n=await S(t,e))):t.querySelector("article  div[role] div > img")?n=t.querySelector("article  div[role] div > img").getAttribute("src"):console.log("Err: not find media at handle post single")}}else{const e=location.pathname.startsWith("/p/");if(r=[...[...t.querySelectorAll("div._acnb")]].reduce(((e,t,n)=>2===t.classList.length?n:e),null),null===r)throw"Cannot find the media index";if(n=await b(t,r),null===n){const l=[...t.querySelectorAll(`:scope > div > div:nth-child(${e?1:2}) > div > div:nth-child(1) ul li[style*="translateX"]`)],o=Math.max(...l.map((e=>e.clientWidth))),i=l.reduce(((e,t)=>{const n=Math.round(Number(t.style.transform.match(/-?(\d+)/)[1])/o);return{...e,[n]:t}}),{})[r];if(i.querySelector("video")){let e=i.querySelector("video");n=e.getAttribute("src"),e.hasAttribute("videoURL")?n=e.getAttribute("videoURL"):(null===n||n.includes("blob"))&&(n=await S(t,e))}else i.querySelector("img")&&(n=i.querySelector("img").getAttribute("src"))}}return{url:n,mediaIndex:r}}function y(){let e=document.querySelector('div[style^="transform"]').parentElement,t=e.parentElement.children;return Array.from(t).indexOf(e)}let w={},v={};async function b(e,t=0){try{const n=/"X-IG-App-ID":"([\d]+)"/,r=/instagram:\/\/media\?id=(\d+)|["' ]media_id["' ]:["' ](\d+)["' ]/;function l(){let e=document.querySelectorAll("body > script");for(let t=0;t<e.length;++t){let r=e[t].text.match(n);if(r)return r[1]}return console.log("Cannot find app id"),null}async function o(){return function(){let e=window.location.href,t=e.match(/www.instagram.com\/stories\/[^\/]+\/(\d+)/);if(!e.includes("highlights")&&t)return t[1]}()||await async function(){let t=await A(e);if(!t)return null;if(!(t in v)){let e=`https://www.instagram.com/p/${t}/`,n=await fetch(e),l=await n.text(),o=l?l.match(r):[],i=null;for(let e=0;e<o.length;++e)o[e]&&(i=o[e]);if(!i)return null;v[t]=i}return v[t]}()||function(){let e=document.querySelectorAll('script[type="application/json"]');for(let t=0;t<e.length;t++){let n=e[t].text.match(/"pk":"(\d+)","id":"[\d_]+"/);if(n){if(!window.location.href.includes("highlights"))return n[1];let r=Array.from(e[t].text.matchAll(/"pk":"(\d+)","id":"[\d_]+"/g),(e=>e[1]));const l=y();if(r.length>l)return r[l]}}}()}function i(e){return"video_versions"in e?e.video_versions[0].url:e.image_versions2.candidates[0].url}let c=l();if(!c)return null;let a={method:"GET",headers:{Accept:"*/*","X-IG-App-ID":c},credentials:"include",mode:"cors"},u=await o();if(!u)return console.log("Cannot find media id"),null;if(!(u in w)){let d="https://i.instagram.com/api/v1/media/"+u+"/info/",m=await fetch(d,a);if(200!==m.status)return console.log(`Fetch info API failed with status code: ${m.status}`),null;let g=await m.json();w[u]=g}let s=w[u];return"carousel_media"in s.items[0]?i(s.items[0].carousel_media[t]):i(s.items[0])}catch(h){return console.log(`Uncatched in getUrlFromInfoApi(): ${h}\n${h.stack}`),null}}function A(e){let t=e.querySelectorAll("a");for(let e=0;e<t.length;++e){let r=t[e].getAttribute("href");if(r){let e=r.match(n);if(e)return e[1]}}return null}async function S(e,t){let n=t.getAttribute("poster"),r=e.querySelectorAll("time"),l=r[r.length-1].parentNode.parentNode.href;let o=n.match(/\/([^\/?]*)\?/)[1],i=await fetch(l),c=await i.text();const a=new RegExp(`${o}.*?video_versions.*?url":("[^"]*")`,"s");let u=c.match(a),s=JSON.parse(u[1]);return s=s.replace(/^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)/g,"https://scontent.cdninstagram.com"),t.setAttribute("videoURL",s),s}function q(e){let t=e;for(;t&&"SECTION"!==t.tagName;)t=t.parentNode;return t}async function N(e,t){let n=null;if(n=await b(e),!n)if(t.querySelector("video > source"))n=t.querySelector("video > source").getAttribute("src");else if(t.querySelector('img[decoding="sync"]')){if(n=t.querySelector('img[decoding="sync"]').srcset.split(/ \d+w/g)[0].trim(),n.length>0)return n;n=t.querySelector('img[decoding="sync"]').getAttribute("src")}else t.querySelector("video")&&(n=t.querySelector("video").getAttribute("src"));return n}function x(e,t,n,r,l=+new Date,o="0"){let i=e;return i=i.replace(/%id%/g,t),i=i.replace(/%datetime%/g,function(e,t){let n=e;return n=n.replace(/%y%/g,t.getFullYear()),n=n.replace(/%m%/g,C((t.getMonth()+1).toString())),n=n.replace(/%d%/g,C(t.getDate().toString())),n=n.replace(/%H%/g,C(t.getHours().toString())),n=n.replace(/%M%/g,C(t.getMinutes().toString())),n=n.replace(/%S%/g,C(t.getSeconds().toString())),n}("%y%%m%%d%_%H%%M%%S%",n)),i=i.replace(/%medianame%/g,r),i=i.replace(/%postId%/g,l),i=i.replace(/%mediaIndex%/g,o),i}function C(e){return 1===e.length?"0"+e:e}function k(e){var t=document.createElement("a");t.href=e,t.setAttribute("target","_blank"),document.body.appendChild(t),t.click(),t.remove()}function E(e,t,n){var r=document.createElement("a");r.download=t+"."+n,r.href=e,document.body.appendChild(r),r.click(),r.remove()}function I(e,t){e.startsWith("blob:")?E(e,t,"mp4"):(console.log(`Dowloading ${e}`),t||(t=e.split("\\").pop().split("/").pop()),fetch(e,{headers:new Headers({"User-Agent":window.navigator.userAgent,Origin:location.origin}),mode:"cors"}).then((e=>e.blob())).then((e=>{const n=e.type.split("/").pop();E(window.URL.createObjectURL(e),t,n)})).catch((e=>console.error(e))))}}();