// ==UserScript==
// @name              InstantPage Super Lite
// @namespace         Need4Speed
// @version           1.4.6
// @author            -
// @match             *://*/*
// @noframes
// @run-at            document-idle
// @grant             none
// @description Preload/Prefetch page on hovering.
// @downloadURL https://raw.githubusercontent.com/s0uboxxx/Userscripts-GCC/release/release/InstantPage20Super20Lite.user.js
// @updateURL https://raw.githubusercontent.com/s0uboxxx/Userscripts-GCC/release/release/InstantPage20Super20Lite.meta.js
// ==/UserScript==
var EXCLUDE=new RegExp(/login|logout|register|signin|signup|signout|pay|create|edit|download|del|reset|submit|doubleclick|googleads|exit|unread/);let t,e,n,o,i,a=null,s=65,c=new Set;const r=1111;function d(t){o=performance.now();const e=t.target.closest("a");m(e)&&p(e.href,"high")}function u(t){if(performance.now()-o<r)return;if(!("closest"in t.target))return;const e=t.target.closest("a");m(e)&&(e.addEventListener("mouseout",f,{passive:!0}),i=setTimeout((()=>{p(e.href,"high"),i=void 0}),s))}function l(t){const e=t.target.closest("a");m(e)&&p(e.href,"high")}function f(t){t.relatedTarget&&t.target.closest("a")==t.relatedTarget.closest("a")||i&&(clearTimeout(i),i=void 0)}function h(t){if(performance.now()-o<r)return;const e=t.target.closest("a");if(t.which>1||t.metaKey||t.ctrlKey)return;if(!e)return;e.addEventListener("click",(function(t){1337!=t.detail&&t.preventDefault()}),{capture:!0,passive:!1,once:!0});const n=new MouseEvent("click",{view:window,bubbles:!0,cancelable:!1,detail:1337});e.dispatchEvent(n)}function m(o){if(!o.href.match(EXCLUDE)&&o&&o.href&&(!n||"instant"in o.dataset)){if(o.origin!=location.origin&&(!e&&!("instant"in o.dataset)||!a))return;if(["http:","https:"].includes(o.protocol)&&("http:"!=o.protocol||"https:"!=location.protocol)&&(t||!o.search||"instant"in o.dataset)&&!(o.hash&&o.pathname+o.search==location.pathname+location.search||"noInstant"in o.dataset))return!0}}function p(t,e="auto"){if(c.has(t))return;const n=document.createElement("link");n.rel="prefetch",n.href=t,n.fetchPriority=e,n.as="document",document.head.appendChild(n),c.add(t)}!function(){if(!document.createElement("link").relList.supports("prefetch"))return;const o="instantVaryAccept"in document.body.dataset||"Shopify"in window,i=navigator.userAgent.indexOf("Chrome/");if(i>-1&&(a=parseInt(navigator.userAgent.substring(i+7))),o&&a&&a<110)return;const r="instantMousedownShortcut"in document.body.dataset;t="instantAllowQueryString"in document.body.dataset,e="instantAllowExternalLinks"in document.body.dataset,n="instantWhitelist"in document.body.dataset;const c={capture:!0,passive:!0};let f=!1,g=!1,v=!1;if("instantIntensity"in document.body.dataset){const t=document.body.dataset.instantIntensity;if(t.startsWith("mousedown"))f=!0,"mousedown-only"==t&&(g=!0);else if(t.startsWith("viewport")){const e=navigator.connection&&navigator.connection.saveData,n=navigator.connection&&navigator.connection.effectiveType&&navigator.connection.effectiveType.includes("2g");e||n||("viewport"==t?document.documentElement.clientWidth*document.documentElement.clientHeight<45e4&&(v=!0):"viewport-all"==t&&(v=!0))}else{const e=parseInt(t);isNaN(e)||(s=e)}}if(g||document.addEventListener("touchstart",d,c),f?r||document.addEventListener("mousedown",l,c):document.addEventListener("mouseover",u,c),r&&document.addEventListener("mousedown",h,c),v){let t=window.requestIdleCallback;t||(t=t=>{t()}),t((function(){const t=new IntersectionObserver((e=>{e.forEach((e=>{if(e.isIntersecting){const n=e.target;t.unobserve(n),p(n.href)}}))}));document.querySelectorAll("a").forEach((e=>{m(e)&&t.observe(e)}))}),{timeout:1500})}}();