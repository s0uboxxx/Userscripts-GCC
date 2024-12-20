// ==UserScript==
// @name         TwitchAdSolutions (vaft)
// @namespace    https://github.com/pixeltris/TwitchAdSolutions
// @version      15.0.0
// @description  Multiple solutions for blocking Twitch ads (vaft)
// @updateURL https://raw.githubusercontent.com/s0uboxxx/Userscripts-GCC/release/release/vaft.meta.js
// @downloadURL https://raw.githubusercontent.com/s0uboxxx/Userscripts-GCC/release/release/vaft.user.js
// @author       https://github.com/cleanlock/VideoAdBlockForTwitch#credits
// @match        *://*.twitch.tv/*
// @run-at       document-start
// @inject-into  page
// @grant        none
// ==/UserScript==
!function(){"use strict";if(window.twitchAdSolutionsVersion&&window.twitchAdSolutionsVersion>=1)return console.log("skipping vaft as there's another script active. ourVersion:1 activeVersion:"+window.twitchAdSolutionsVersion),void(window.twitchAdSolutionsVersion=1);function e(e){e.AdSignifier="stitched",e.ClientID="kimne78kx3ncx6brgo4mv6wki5h1ko",e.ClientVersion="null",e.ClientSession="null",e.PlayerType2="embed",e.PlayerType3="site",e.PlayerType4="autoplay",e.CurrentChannelName=null,e.UsherParams=null,e.WasShowingAd=!1,e.GQLDeviceID=null,e.IsSquadStream=!1,e.StreamInfos=[],e.StreamInfosByUrl=[],e.MainUrlByUrl=[],e.EncodingCacheTimeout=6e4,e.ClientIntegrityHeader=null,e.AuthorizationHeader=null}window.twitchAdSolutionsVersion=1;var t=[],n=null,i=["twitch","isVariantA"],a=[],r=["isVariantA"];function o(e){var t=new XMLHttpRequest;return t.open("GET",e,!1),t.overrideMimeType("text/javascript"),t.send(),t.responseText}function s(){console.log("hookWorkerFetch (vaft)");var e=fetch;fetch=async function(t,n){if("string"==typeof t){if(t.endsWith("m3u8"))return new Promise((function(i,a){e(t,n).then((function(n){!async function(n){if(200===n.status){var a=await n.text(),r=null;(r=await u(t,a,e,PlayerType2)).includes(AdSignifier)&&(r=await u(t,a,e,PlayerType3)),r.includes(AdSignifier)&&(r=await u(t,a,e,PlayerType4)),i(new Response(r))}else i(n)}(n)})).catch((function(e){a(e)}))}));if(t.includes("/api/channel/hls/")){var i=new URL(t).pathname.match(/([^\/]+)(?=\.\w+$)/)[0];return UsherParams=new URL(t).search,CurrentChannelName=i,t.includes("picture-by-picture")&&(t=""),new Promise((function(a,r){e(t,n).then((function(e){!async function(e){if(200==e.status){encodingsM3u8=await e.text();var n=StreamInfos[i];null==n&&(StreamInfos[i]=n={}),n.ChannelName=i,n.RequestedAds=new Set,n.Urls=[],n.EncodingsM3U8Cache=[],n.EncodingsM3U8=encodingsM3u8;for(var r=encodingsM3u8.replace("\r","").split("\n"),o=0;o<r.length;o++)if(!r[o].startsWith("#")&&r[o].includes(".m3u8")){if(n.Urls[r[o]]=-1,o>0&&r[o-1].startsWith("#EXT-X-STREAM-INF")){var s=y(r[o-1]),l=s.RESOLUTION,c=s["FRAME-RATE"];l&&(n.Urls[r[o]]={Resolution:l,FrameRate:c})}StreamInfosByUrl[r[o]]=n,MainUrlByUrl[r[o]]=t}a(new Response(encodingsM3u8))}else a(e)}(e)})).catch((function(e){r(e)}))}))}}return e.apply(this,arguments)}}function l(e,t,n){var i=0;n&&n.endsWith("p")&&(i=0|n.substr(0,n.length-1));for(var a=e.replace("\r","").split("\n"),r=null,o=null,s=null,l=!1,c=0;c<a.length;c++)if(!a[c].startsWith("#")&&a[c].includes(".m3u8")&&c>0&&a[c-1].startsWith("#EXT-X-STREAM-INF")){var d=y(a[c-1]),u=d.RESOLUTION,p=d["FRAME-RATE"];if(u)if(i){var f=u.toLowerCase().split("x")[1];if(f==i){if(s=a[c],p<40)return s}else if(f<i)return s||a[c]}else if(!(t&&u!=t.Resolution||s&&(l||p!=t.FrameRate))&&(s=a[c],l=p==t.FrameRate))return s;null==r&&(r=a[c]),o=a[c]}return i?o:s||r}async function c(e,t,n,i,a,r){(e.EncodingsM3U8Cache[a].Resolution!=t.Resolution||e.EncodingsM3U8Cache[a].RequestTime<Date.now()-EncodingCacheTimeout)&&console.log(`Blocking ads (type:${a}, resolution:${t.Resolution}, frameRate:${t.FrameRate}, qualityOverride:null)`),e.EncodingsM3U8Cache[a].RequestTime=Date.now(),e.EncodingsM3U8Cache[a].Value=n,e.EncodingsM3U8Cache[a].Resolution=t.Resolution;var o=l(n,t,null),s=await r(o);if(200==s.status){var c=await s.text();return WasShowingAd=!0,postMessage({key:"ShowAdBlockBanner"}),postMessage({key:"ForceChangeQuality"}),c&&!c.includes(AdSignifier)||(e.EncodingsM3U8Cache[a].Value=null),c}return e.EncodingsM3U8Cache[a].Value=null,i}function d(e,t){t||(t=["token","sig"]);for(var n=new URL("https://localhost/"+e),i=0;i<t.length;i++)n.searchParams.delete(t[i]);return n.pathname.substring(1)+n.search}async function u(e,t,n,i){var a=StreamInfosByUrl[e];if(1==IsSquadStream)return t;if(!t)return t;if(!t.includes(".ts")&&!t.includes(".mp4"))return t;if(t.includes(AdSignifier)){if(!(t.includes('"MIDROLL"')||t.includes('"midroll"'))&&i===PlayerType2)for(var r=t.replace("\r","").split("\n"),o=0;o<r.length;o++){var s=r[o];if(s.startsWith("#EXTINF")&&r.length>o+1&&!s.includes(",live")&&!a.RequestedAds.has(r[o+1])){a.RequestedAds.add(r[o+1]),fetch(r[o+1]).then((e=>{e.blob()}));break}}var l=null;if(a&&a.Urls)for(const[t,n]of Object.entries(a.Urls))if(t==e){l=n;break}var d=a.EncodingsM3U8Cache[i];if(d){if(d.Value&&d.RequestTime>=Date.now()-EncodingCacheTimeout)try{var u=c(a,l,d.Value,null,i,n);if(u)return u}catch(e){d.Value=null}}else a.EncodingsM3U8Cache[i]={RequestTime:Date.now(),Value:null,Resolution:null};var y=await h(CurrentChannelName,i);if(200===y.status){var p=await y.json();try{var f=new URL("https://usher.ttvnw.net/api/channel/hls/"+CurrentChannelName+".m3u8"+UsherParams);f.searchParams.set("sig",p.data.streamPlaybackAccessToken.signature),f.searchParams.set("token",p.data.streamPlaybackAccessToken.value);var v=await n(f.href);return 200===v.status?c(a,l,await v.text(),t,i,n):t}catch(e){}return t}return t}return WasShowingAd&&(console.log("Finished blocking ads"),WasShowingAd=!1,postMessage({key:"ForceChangeQuality",value:"original"}),postMessage({key:"PauseResumePlayer"}),postMessage({key:"HideAdBlockBanner"})),t}function y(e){return Object.fromEntries(e.split(/(?:^|,)((?:[^=]*)=(?:"[^"]*"|[^,]*))/).filter(Boolean).map((e=>{const t=e.indexOf("="),n=e.substring(0,t),i=e.substring(t+1),a=Number(i);return[n,Number.isNaN(a)?i.startsWith('"')?JSON.parse(i):i:a]})))}async function p(e){var t=e.match(/#EXT-X-DATERANGE:(ID="stitched-ad-[^\n]+)\n/);if(t.length>1){const e=y(t[1]);var n=parseInt(e["X-TV-TWITCH-AD-POD-LENGTH"]?e["X-TV-TWITCH-AD-POD-LENGTH"]:"1"),i=(parseInt(e["X-TV-TWITCH-AD-POD-POSITION"]?e["X-TV-TWITCH-AD-POD-POSITION"]:"0"),e["X-TV-TWITCH-AD-RADS-TOKEN"]),a=e["X-TV-TWITCH-AD-LINE-ITEM-ID"],r=e["X-TV-TWITCH-AD-ORDER-ID"],o=e["X-TV-TWITCH-AD-CREATIVE-ID"],s=e["X-TV-TWITCH-AD-ADVERTISER-ID"];const l={stitched:!0,roll_type:e["X-TV-TWITCH-AD-ROLL-TYPE"].toLowerCase(),player_mute:!0,player_volume:0,visible:!1};for(let e=0;e<n;e++){const t={...l,ad_id:s,ad_position:e,duration:0,creative_id:o,total_ads:n,order_id:r,line_item_id:a};await v(f("video_ad_impression",i,t));for(let e=0;e<4;e++)await v(f("video_ad_quartile_complete",i,{...t,quartile:e+1}));await v(f("video_ad_pod_complete",i,l))}}}function f(e,t,n){return[{operationName:"ClientSideAdEventHandling_RecordAdEvent",variables:{input:{eventName:e,eventPayload:JSON.stringify(n),radToken:t}},extensions:{persistedQuery:{version:1,sha256Hash:"7e6c69e6eb59f8ccb97ab73686f3d8b7d85a72a0298745ccd8bfc68e4054ca5b"}}}]}function h(e,t,n){return v({operationName:"PlaybackAccessToken_Template",query:'query PlaybackAccessToken_Template($login: String!, $isLive: Boolean!, $vodID: ID!, $isVod: Boolean!, $playerType: String!) {  streamPlaybackAccessToken(channelName: $login, params: {platform: "ios", playerBackend: "mediaplayer", playerType: $playerType}) @include(if: $isLive) {    value    signature    __typename  }  videoPlaybackAccessToken(id: $vodID, params: {platform: "ios", playerBackend: "mediaplayer", playerType: $playerType}) @include(if: $isVod) {    value    signature    __typename  }}',variables:{isLive:!0,login:e,isVod:!1,vodID:"",playerType:t}},n)}function v(e,t){ClientIntegrityHeader;var n=t||fetch;if(!GQLDeviceID)for(var i="abcdefghijklmnopqrstuvwxyz0123456789",a=0;a<32;a++)GQLDeviceID+=i.charAt(Math.floor(36*Math.random()));return n("https://gql.twitch.tv/gql",{method:"POST",body:JSON.stringify(e),headers:{"Client-ID":ClientID,"Client-Integrity":ClientIntegrityHeader,"Device-ID":GQLDeviceID,"X-Device-Id":GQLDeviceID,"Client-Version":ClientVersion,"Client-Session-Id":ClientSession,Authorization:AuthorizationHeader}})}function g(e,t,n,i,a){try{var r=null;function u(e,t){if(e.stateNode&&t(e.stateNode))return e.stateNode;let n=e.child;for(;n;){const e=u(n,t);if(e)return e;n=n.sibling}return null}function y(){var e=null,t=document.querySelector("#root");if(t&&t._reactRootContainer&&t._reactRootContainer._internalRoot&&t._reactRootContainer._internalRoot.current&&(e=t._reactRootContainer._internalRoot.current),null==e){var n=Object.keys(t).find((e=>e.startsWith("__reactContainer")));null!=n&&(e=t[n])}return e}var o=y();if(!o)return void console.log("Could not find react root");if(r=(r=u(o,(e=>e.setPlayerActive&&e.props&&e.props.mediaPlayerInstance)))&&r.props&&r.props.mediaPlayerInstance?r.props.mediaPlayerInstance:null,e)return r.pause(),void r.play();if(t){if(void 0===r.getQuality())return;var s=JSON.stringify(r.getQuality());return s||void 0}if(i){if(void 0===r.isAutoQualityMode())return!1;var l=r.isAutoQualityMode();return!!l&&(r.setAutoQualityMode(!1),l)}if(a)return void r.setAutoQualityMode(!0);try{var c=document.URL,d=!0;(c.includes("videos/")||c.includes("clip/"))&&(d=!1),n&&d&&setTimeout((function(){(r.isLiveLowLatency()&&r.getLiveLatency()>5||r.getLiveLatency()>15)&&(r.pause(),r.play())}),3e3)}catch(p){}}catch(f){}}window.reloadTwitchPlayer=g;var m,I,w,C=null;function T(e,n){t.forEach((t=>{t.postMessage({key:e,value:n})}))}function S(){try{Object.defineProperty(document,"visibilityState",{get:()=>"visible"})}catch{}try{Object.defineProperty(document,"hidden",{get:()=>!1})}catch{}var e=e=>{e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation()};document.addEventListener("visibilitychange",e,!0),document.addEventListener("webkitvisibilitychange",e,!0),document.addEventListener("mozvisibilitychange",e,!0),document.addEventListener("hasFocus",e,!0);try{/Firefox/.test(navigator.userAgent)?Object.defineProperty(document,"mozHidden",{get:()=>!1}):Object.defineProperty(document,"webkitHidden",{get:()=>!1})}catch{}}C=window.localStorage.getItem("local_copy_unique_id"),e(window),m=function(e){for(var t=[],n=e;n;){var i=n.toString();r.some((e=>i.includes(e)))&&t.push(n),n=Object.getPrototypeOf(n)}return t}(window.Worker),I=function(e,t){for(var n=e,i=0;i<t.length;i++)Object.setPrototypeOf(t[i],n),n=t[i];return n}(class extends(function(e){for(var t=null,n=null,r=e;r;){var o=r.toString();i.some((e=>o.includes(e)))&&!a.some((e=>o.includes(e)))?null!==n&&Object.setPrototypeOf(n,Object.getPrototypeOf(r)):(null===t&&(t=r),n=r),r=Object.getPrototypeOf(r)}return t}(window.Worker)){constructor(i,a){var r=!1;try{r=new URL(i).origin.endsWith(".twitch.tv")}catch{}if(r){var m=`\n                    ${l.toString()}\n                    ${c.toString()}\n                    ${d.toString()}\n                    ${u.toString()}\n                    ${s.toString()}\n                    ${e.toString()}\n                    ${h.toString()}\n                    ${v.toString()}\n                    ${f.toString()}\n                    ${p.toString()}\n                    ${y.toString()}\n                    ${o.toString()}\n                    var workerString = getWasmWorkerJs('${i.replaceAll("'","%27")}');\n                    declareOptions(self);\n                    self.addEventListener('message', function(e) {\n                        if (e.data.key == 'UpdateIsSquadStream') {\n                            IsSquadStream = e.data.value;\n                        } else if (e.data.key == 'UpdateClientVersion') {\n                            ClientVersion = e.data.value;\n                        } else if (e.data.key == 'UpdateClientSession') {\n                            ClientSession = e.data.value;\n                        } else if (e.data.key == 'UpdateClientId') {\n                            ClientID = e.data.value;\n                        } else if (e.data.key == 'UpdateDeviceId') {\n                            GQLDeviceID = e.data.value;\n                        } else if (e.data.key == 'UpdateClientIntegrityHeader') {\n                            ClientIntegrityHeader = e.data.value;\n                        } else if (e.data.key == 'UpdateAuthorizationHeader') {\n                            AuthorizationHeader = e.data.value;\n                        }\n                    });\n                    hookWorkerFetch();\n                    eval(workerString);\n                `;super(URL.createObjectURL(new Blob([m])),a),t.push(this),this.addEventListener("message",(e=>{if("ShowAdBlockBanner"==e.data.key)null==n&&(n=I()),n.P.textContent="Blocking ads",n.style.display="block";else if("HideAdBlockBanner"==e.data.key)null==n&&(n=I()),n.style.display="none";else if("PauseResumePlayer"==e.data.key)g(!0,!1,!1,!1,!1);else if("ForceChangeQuality"==e.data.key)try{return}catch(e){0}}))}else super(i,a);function I(){var e=document.querySelector(".video-player"),t=null;return null!=e&&null==(t=e.querySelector(".adblock-overlay"))&&((t=document.createElement("div")).className="adblock-overlay",t.innerHTML='<div class="player-adblock-notice" style="color: white; background-color: rgba(0, 0, 0, 0.8); position: absolute; top: 0px; left: 0px; padding: 5px;"><p></p></div>',t.style.display="none",t.P=t.querySelector("p"),e.appendChild(t)),t}}},m),Object.defineProperty(window,"Worker",{get:function(){return I},set:function(e){var t;t=e.toString(),!i.some((e=>t.includes(e)))||a.some((e=>t.includes(e)))||r.some((e=>t.includes(e)))?I=e:console.log("Attempt to set twitch worker denied")}}),w=window.fetch,window.fetch=function(e,t,...n){if("string"==typeof e&&(window.location.pathname.includes("/squad")?T("UpdateIsSquadStream",!0):T("UpdateIsSquadStream",!1),e.includes("/access_token")||e.includes("gql"))){var i=t.headers["X-Device-Id"];"string"!=typeof i&&(i=t.headers["Device-ID"]),"string"!=typeof i||i.includes("twitch-web-wall-mason")?C&&(GQLDeviceID=C.replace('"',""),GQLDeviceID=GQLDeviceID.replace('"',"")):GQLDeviceID=i,GQLDeviceID&&("string"==typeof t.headers["X-Device-Id"]&&(t.headers["X-Device-Id"]=GQLDeviceID),"string"==typeof t.headers["Device-ID"]&&(t.headers["Device-ID"]=GQLDeviceID),T("UpdateDeviceId",GQLDeviceID));var a=t.headers["Client-Version"];a&&"string"==typeof a&&(ClientVersion=a),ClientVersion&&T("UpdateClientVersion",ClientVersion);var r=t.headers["Client-Session-Id"];if(r&&"string"==typeof r&&(ClientSession=r),ClientSession&&T("UpdateClientSession",ClientSession),e.includes("gql")&&t&&"string"==typeof t.body&&t.body.includes("PlaybackAccessToken")){var o=t.headers["Client-ID"];(o&&"string"==typeof o||(o=t.headers["Client-Id"])&&"string"==typeof o)&&(ClientID=o),ClientID&&T("UpdateClientId",ClientID),ClientIntegrityHeader=t.headers["Client-Integrity"],ClientIntegrityHeader&&T("UpdateClientIntegrityHeader",ClientIntegrityHeader),AuthorizationHeader=t.headers.Authorization,AuthorizationHeader&&T("UpdateAuthorizationHeader",AuthorizationHeader)}e.includes("gql")&&t&&"string"==typeof t.body&&t.body.includes("PlaybackAccessToken")&&t.body.includes("picture-by-picture")&&(t.body=""),e.includes("picture-by-picture")&&(e="")}return w.apply(this,arguments)},"complete"===document.readyState||"loaded"===document.readyState||"interactive"===document.readyState?S():window.addEventListener("DOMContentLoaded",(function(){S()}))}();