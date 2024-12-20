// ==UserScript==
// @name        4chan Archive Image Downloader
// @namespace   Violentmonkey Scripts
// @match       https://archive.4plebs.org/*/thread/*
// @match       https://desuarchive.org/*/thread/*
// @match       https://boards.fireden.net/*/thread/*
// @match       https://archived.moe/*/thread/*
// @match       https://thebarchive.com/*/thread/*
// @match       https://archiveofsins.com/*/thread/*
// @match       https://archive.alice.al/*/thread/*
// @match       https://arch.b4k.co/*/thread/*
// @match       https://archive.palanq.win/*/thread/*
// @grant       GM_download
// @grant       GM_registerMenuCommand
// @version     1.4.2
// @license     The Unlicense
// @author      ImpatientImport
// @description 4chan archive thread image downloader for general use across many foolfuuka based imageboards. Downloads all images individually in a thread with original filenames (by default). Optional thread API button, for development purposes.
// @downloadURL https://raw.githubusercontent.com/s0uboxxx/Userscripts-GCC/release/release/4chan20Archive20Image20Downloader.user.js
// @updateURL https://raw.githubusercontent.com/s0uboxxx/Userscripts-GCC/release/release/4chan20Archive20Image20Downloader.meta.js
// ==/UserScript==
var indiv_button_enabled=!0,api_button_enabled=!1,keep_original_filenames=!0,archive_filenames=!0,confirm_download=!0,download_limit=3e3,named_poster_media_download_only=!1,named_poster_tag_in_filename=!1;!function(){"use strict";const e=document.getElementsByClassName("post_controls")[0],n=document.URL,o=n.toString().split("/")[2],i=new URL(n).pathname.toString().split("/"),a=i[1],t=i[3],d="https://"+o+"/_/api/chan/thread/?board="+a+"&num="+t;var r,l,_,m,s;function c(e){console.log(e);var n,o=window.getComputedStyle(e).backgroundColor;const i={indiv_btn:"Indiv DL"},a={indiv_btn:m},t={backgroundColor:"rgb(255, 64, 64)",color:"white"},d={backgroundColor:"rgb(238, 210, 2)",color:"black"},r={backgroundColor:"rgb(46, 139, 87)",color:"white"},l={backgroundColor:a[e.id].backgroundColor,color:a[e.id].color};switch(o){case"rgba(0, 0, 0, 0)":n=t,e.innerText="Confirm?";break;case"rgb(255, 64, 64)":n=d,e.innerText="Processing";break;case"rgb(238, 210, 2)":n=r,e.innerText="Done";break;case"rgb(46, 139, 87)":n=l,e.innerText=i[e.id]}Object.assign(e.style,n)}async function u(){const e=await fetch(d),n=await e.json();console.log(n),function(e){var n=[],o=[],i=[];const a=e[t].op.media;var d=keep_original_filenames?a.media_filename:a.media_orig;d=!keep_original_filenames&&archive_filenames?a.media:d,d=named_poster_tag_in_filename&&named_poster_media_download_only?String(e[t].op.name+"_-_"+d):d;var r=null==a.media_link?a.remote_media_link:a.media_link;if((!named_poster_media_download_only||named_poster_media_download_only&&"Anonymous"!=e[t].op.name)&&(n.push(r),o.push(d)),null!=e[t].posts){const i=e[t].posts,a=Object.keys(i),d=a.length;for(var _=0;_<d;_++){var m=i[a[_]].media;if(null!==m&&(!named_poster_media_download_only||named_poster_media_download_only&&"Anonymous"!=i[a[_]].name)){var s=null==m.media_link?m.remote_media_link:m.media_link,u=keep_original_filenames?m.media_filename:m.media_orig;u=!keep_original_filenames&&archive_filenames?m.media:u,u=named_poster_tag_in_filename&&named_poster_media_download_only?String(i[a[_]].name+"_-_"+u):u,n.push(s),o.push(u)}}}function g(e){return new Promise((n=>setTimeout(n,e)))}i[0]=n,i[1]=o,async function(){for(var e=0;e<n.length;e++)await g(download_limit),GM_download(n[e],o[e])}(),confirm_download&&(c(l),setTimeout(c(l),3e3))}(n)}indiv_button_enabled&&((r=document.createElement("a")).id="indiv_btn",r.classList.add("btnr","parent"),r.innerText="Indiv DL",e.append(r),l=document.getElementById("indiv_btn"),_=window.getComputedStyle(r),m={backgroundColor:_.backgroundColor,color:_.color}),api_button_enabled&&((s=document.createElement("a")).id="api_btn",s.href=d,s.target="new",s.classList.add("btnr","parent"),s.innerText="Thread API",e.append(s),document.getElementById("api_btn")),GM_registerMenuCommand("Download all thread images individually",u),confirm_download?(l.addEventListener("click",(function(){c(l),setTimeout((function(){"rgb(255, 64, 64)"==window.getComputedStyle(r).backgroundColor&&(r.removeEventListener("click",c),r.addEventListener("click",u),setTimeout((function(){r.removeEventListener("click",u),r.addEventListener("click",c),Object.assign(l.style,m),r.innerText="Indiv DL"}),5e3))}),501)})),l.addEventListener("dblclick",u)):l.addEventListener("click",u)}();