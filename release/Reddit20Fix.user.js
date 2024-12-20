// ==UserScript==
// @name         Reddit Fix
// @namespace    http://tampermonkey.net/
// @version      1.9.7
// @description  Fix of the infinite scroll, Hide subreddits, see full image actually shows the full image, html5 video player, remove background effects, copy video adress
// @author       Bum
// @require      http://code.jquery.com/jquery-3.4.1.min.js
// @match        https://www.reddit.com/*
// @match        https://new.reddit.com/*
// @grant        GM_addStyle
// @downloadURL https://raw.githubusercontent.com/s0uboxxx/Userscripts-GCC/release/release/Reddit20Fix.user.js
// @updateURL https://raw.githubusercontent.com/s0uboxxx/Userscripts-GCC/release/release/Reddit20Fix.meta.js
// ==/UserScript==
var holdTopicsInMemory="false",commentEffects="false",originalBehavior="false",topicLimitInDom=70,lastScrollTop=0,scrollTopWhenREmoved=-1,menuButtonWasAdded=!1,subsToHide="",removeBorderRadius=!0,hideRecentSection=!1,customFeedState="open",lastTopicRemovedTime=(new Date).getTime();null!=localStorage.getItem("removeBorderRadius")&&(removeBorderRadius=localStorage.getItem("removeBorderRadius")),null!=localStorage.getItem("holdTopicsInMemory")&&(holdTopicsInMemory=localStorage.getItem("holdTopicsInMemory")),null!=localStorage.getItem("commentEffects")&&(commentEffects=localStorage.getItem("commentEffects")),null!=localStorage.getItem("originalBehavior")&&(originalBehavior=localStorage.getItem("originalBehavior")),null!=localStorage.getItem("subsToHide")&&(subsToHide=localStorage.getItem("subsToHide")),null!=localStorage.getItem("hideRecentSection")&&(hideRecentSection=localStorage.getItem("hideRecentSection")),null!=localStorage.getItem("customFeedState")&&(customFeedState=localStorage.getItem("customFeedState"));var topicsInMemory=[],isAPop=!1,maxOffset=0;!function(){"use strict";function t(e){const t=(document.getElementById("GM_addStyle")||function(){const e=document.createElement("style");return e.type="text/css",e.id="GM_addStyle",document.head.appendChild(e),e}()).sheet;t.insertRule(e,(t.rules||t.cssRules||[]).length)}function n(e){const t=(document.getElementById("GM_addStyle")||function(){const e=document.createElement("style");return e.type="text/css",e.id="GM_addStyle",document.head.appendChild(e),e}()).sheet;for(var n=0;n<t.cssRules.length;n++)t.cssRules[n].selectorText==e&&t.deleteRule(n)}x(removeBorderRadius),b(hideRecentSection),y(),"false"==commentEffects&&(t('img[src*="flame"]{display:none;}'),t('div[aria-role="presentation"]{box-shadow:none !important;background : transparent !important;}')),t(".wwHbgRV0ZXGp5CHHlpo5u{display:block !important;}"),t("._1Q2mF3u7v9hBVu_4bkC7R4{display:block !important;}"),t("._3hUbl08LBz2mbXjy0iYhOS,._3b8u2OJXaSDdBWoRB7zUoK {height: 50px !important;width: 100% !important; bottom: 0 !important;}"),t("._3UEq__yL-82zX4EyuluREz,.gUpEQXQu8G8UvISmBIPsj,._1RZSSlyqzokrcxh0ESwE2e{display:none !important;}"),t(".vLH0XV-l8Y4mNGUvw4HHy{display:none !important;}"),t(".eI6Ep6BNFA5DZjPWNVb4,._2XQ3ZY6qCbEm9_WtvLLFru{display:none !important;}"),t(".fixmodal {position:fixed;background-color:rgba(0, 0, 0, 0.5);height:100%;width:100%;top:0;left:0;display:none; z-index: 1000;}"),t("#fixPopup {padding:5px;text-align:center;}"),t(".fixmodalWrap {margin: 50px auto; position:relative;width: fit-content;} ");var o,i,a,r=window.screen.height-200;function d(e,t){return'<a class="M2Hk_S2yvXpsNPfZMBMur customRedditFixMenu" id = "'+e+'" ><div class="_1lwNBHmCQJObvqs1fXKSYR" style="margin-right: 0px;">'+t+"</div></a>"}function c(e,t,n){return"true"==e?'  <span style="width: 100%;"><input type="checkbox" checked id="'+t+'" name="'+n+'" /> '+n+"</span>":'<span style="width: 100%;"><input type="checkbox" id="'+t+'" name="'+n+'" /> '+n+"</span>"}function s(){var e=$("._2pUO1Sfe7WlIHvq6goN3Pz");e.find(".customRedditFixMenu").length>0||(e.append(d("redditFixReloadAll","Reload All")),$("#redditFixReloadAll").click((function(){for(var e=topicsInMemory.length-1;e>=0;--e){var t=topicsInMemory.pop(e);$(".rpBJOHq2PR60pnwJlUyP0").prepend(t)}maxOffset=$(document).height()})),e.append(d("redditFixReload25","Reload 25")),$("#redditFixReload25").click((function(){var e=topicsInMemory.length;e>25&&(e=25);for(var t=0;t<25;++t){var n=topicsInMemory.pop(t);$(".rpBJOHq2PR60pnwJlUyP0").prepend(n)}maxOffset=$(document).height()})))}function l(){if($(".subgrid-container").length>0&&1!=$(".observerIsAttached").length){y(),$(".subgrid-container").addClass("observerIsAttached");var e=$(".subgrid-container").first().get(0);new MutationObserver((function(e,t){for(var n of e)n.addedNodes.forEach((function(e){$(e).find("article.w-full")&&y()}))})).observe(e,{attributes:!1,childList:!0,subtree:!0})}else setTimeout(l,300)}function p(){$(".fixmodal").fadeOut("fast"),document.removeEventListener("click",p)}t("#fixPopup img {max-height:"+r+"px;}"),t("._2f5uYHvlfzs2DngQsiCdvB {height: 50px !important;width: 100% !important; position: relative !important; bottom: 50px !important;}"),t('.videoFixIcon {margin: 50px auto; background: url("https://www.pngall.com/white-play-png")} '),t(".expandDivCaption {padding: 5px!important; white-space: pre-wrap !important;max-height: max-content !important; display: inline-block !important; overflow-wrap: break-word !important;} "),t(".expandSpanCaption{height: auto !important; position: absolute !important; bottom: 0;} "),t(".expandDisableClick{pointer-events: none; } "),t(".expandEnableClick{pointer-events: auto; !important; } "),t(".expandGarbageRedditCaptions{position:relative !important; } "),window.addEventListener("scroll",(o=function(){if("true"!=originalBehavior){"true"==holdTopicsInMemory&&s();var e=$(document).scrollTop();e>maxOffset&&(lastScrollTop=e,maxOffset=0)}},i=300,a=Date.now(),function(){a+i-Date.now()<0&&(o(),a=Date.now())}));let m=location.href;setInterval((()=>{location.href!==m&&(m=location.href,l())}),500),$(document).on("mousedown","._15nNdGlBIgryHV04IfAfpA",(function(e){return $(this).parent().toggleClass("expandSpanCaption"),$(this).toggleClass("expandDivCaption"),$(".DraftEditor-root").length>0&&$(this).parent().toggleClass("expandGarbageRedditCaptions"),e.stopPropagation(),e.preventDefault(),e.cancelBubble=!0,e.stopImmediatePropagation(),!1}));var u=!1;$("img").on("keyup keydown",(function(e){u=e.ctrlKey})),$("img").on("click",(function(){if(u)return e.stopPropagation(),e.preventDefault(),e.cancelBubble=!0,e.stopImmediatePropagation(),!1})),$(document).on("mousedown","._3b8u2OJXaSDdBWoRB7zUoK,._3hUbl08LBz2mbXjy0iYhOS,._2f5uYHvlfzs2DngQsiCdvB",(function(e){$(".fixmodal").fadeIn("fast"),$("#fixPopup img").remove(),$("#fixPopup iframe").remove();var t=$(this).parent().find("iframe");if(t.length>0){var n=t.clone();n.appendTo("#fixPopup"),n.css({width:"800px","max-height":r+"px"})}else{var o=$(this).parent().find("img").attr("src");$('<img src="'+o+'" alt="image3" />').appendTo("#fixPopup")}return setTimeout((()=>{document.addEventListener("click",p)}),100),e.stopPropagation(),e.preventDefault(),e.cancelBubble=!0,e.stopImmediatePropagation(),!1})),l(),function e(){if(!($('[aria-controls="multireddits_section"]').length>0))return void setTimeout(e,300);let t=$('[aria-controls="multireddits_section"]').closest("faceplate-expandable-section-helper");t.bind("click",(function(){$(this).is("[open]")?(customFeedState="open",localStorage.setItem("customFeedState","open")):(localStorage.setItem("customFeedState",""),customFeedState="")})),""==customFeedState&&t.removeAttr("open")}(),$("body").append('<div class="fixmodal"> <div class="fixmodalWrap"><div id="fixPopup"></div> </div></div>'),t("\n.container__menu {\n                /* Absolute position */\n                position: absolute;\n\n                /* Reset */\n                list-style: none;\n                margin: 0;\n                padding: 0;\n                display: none;\n\n                /* Misc */\n                border: 1px solid #cbd5e0;\n                border-radius: 0.25rem;\n                background-color: #f7fafc;\n            }\n"),t("\n    .open {\n    display: block;\n    z-index: 9999;\n}\n"),t("\n.container__item {\n                padding: 0.5rem 1rem;\n                white-space: nowrap;\n                cursor: pointer;\n    color: black;\n            }\n"),t("\n .container__item:hover {\n                background-color: #bee3f8;\n            }\n"),t("\n.container__divider {\n                border-bottom: 1px solid #cbd5e0;\n                height: 1px;\n            }\n"),$("body").append('\n    <ul id="redditfixShowImage" class="container__menu">\n                    <li class="container__item">Show Image</li>\n                </ul>\n                ');var h,f,g=$("#redditfixShowImage"),v=null;function b(e){"true"==e||1==e?t("reddit-recent-pages{display: none !important;}"):n("reddit-recent-pages")}function x(e){"true"==e||1==e?t("*:not(.shreddit-subreddit-icon__icon){border-radius: 0 !important;}"):n(":not(.shreddit-subreddit-icon__icon)")}function y(){var e=subsToHide.split(";");let t=0;for(;t<e.length;){let n=$("a[href*='"+e[t]+"']").closest("article");$(n).closest("hr").remove(),$(n).remove(),t++}}$(document).mousemove((function(e){h=e.pageX,f=e.pageY})),$(document).on("mousedown",(function(e){if($(event.target).is("img")){function t(e){if(g.hasClass("open")&&g.removeClass("open"),$(e.target).attr("src").toUpperCase().indexOf("BLUR=")>=0)return g.css({top:f,left:h}).addClass("open"),e.preventDefault(),void(v=e.target)}$(this).on("contextmenu",t),g.click((function(e){e.stopPropagation()})),$(document).click((function(){g.hasClass("open")&&g.removeClass("open")})),$(".container__item").click((function(){var e=$(v).attr("src"),t=/^.*\/(.*)\.?(.*)?\?/g.exec(e);if(e.toUpperCase().indexOf("EXTERNAL")>=0){var n=$(v).parents(".STit0dLageRsa2yR4te_b").parent().find(".styled-outbound-link");$(v).attr("src",n.attr("href"))}else $(v).attr("src","https://i.redd.it/"+t[1]);$(v).attr("style","filter:none; width: auto; height: 100%;"),g.removeClass("open")}))}})),$("body").append('\n    <div class="enhancecontainer" style="display:none;">\n\n    </div>\n    '),$(".enhancecontainer").append('<div class="tw-border-t tw-mg-t-1 tw-mg-x-05 tw-pd-b-1 customEnhanceMenu"" ></div><div class="tw-mg-y-05 tw-pd-x-05" style="width: 100%;"><p class="tw-c-text-alt-2 tw-font-size-6 tw-strong tw-upcase" style="color: var(--color-text-alt-2)!important;    font-size: var(--font-size-6)!important;    font-weight: 600!important;    text-transform: uppercase!important;">Reddit enhance</p></div>'),$(".enhancecontainer").append(c(commentEffects,"redditFixCheckBoxBackground","Remove comment effects")),$("#redditFixCheckBoxBackground").click((function(){var e=$(this);e.prop("checked")?(e.removeClass("_1L5kUnhRYhUJ4TkMbOTKkI"),localStorage.setItem("commentEffects",!1),commentEffects="false"):(e.addClass("_1L5kUnhRYhUJ4TkMbOTKkI"),localStorage.setItem("commentEffects",!0),commentEffects="true")})),$(".enhancecontainer").append(c(holdTopicsInMemory,"fixRedditKeepTopicsInMemory","Save topics in ram")),$("#fixRedditKeepTopicsInMemory").click((function(){$(this).prop("checked")?(localStorage.setItem("holdTopicsInMemory",!0),holdTopicsInMemory="true",s()):(localStorage.setItem("holdTopicsInMemory",!1),holdTopicsInMemory="false",$("#redditFixReloadAll").remove(),$("#redditFixReload25").remove())})),$(".enhancecontainer").append(c(originalBehavior,"fixRedditoriginalBehavior","Original behavior")),$("#fixRedditoriginalBehavior").click((function(){var e=$(this);e.prop("checked")?(localStorage.setItem("originalBehavior",!0),originalBehavior="true"):(e.addClass("_1L5kUnhRYhUJ4TkMbOTKkI"),localStorage.setItem("originalBehavior",!1),originalBehavior="false")})),$(".enhancecontainer").append(c(removeBorderRadius,"fixremoveBorderRadius","Remove border radius")),$("#fixremoveBorderRadius").click((function(){var e=$(this);e.prop("checked")?(localStorage.setItem("removeBorderRadius",!0),x(!0),removeBorderRadius="true"):(e.addClass("_1L5kUnhRYhUJ4TkMbOTKkI"),localStorage.setItem("removeBorderRadius",!1),x(!1),removeBorderRadius="false")})),$(".enhancecontainer").append(c(hideRecentSection,"fixHideRecentSection","Hide recent section")),$("#fixHideRecentSection").click((function(){$(this).prop("checked")?(localStorage.setItem("hideRecentSection",!0),b(!0)):(localStorage.setItem("hideRecentSection",!1),b(!1))})),$(".enhancecontainer").append('<span style="margin-top: 10px;">Hide subreddit from appearing in feed. If you remove subs you have to restart. If you add just click save, no need to restart.</span>'),$(".enhancecontainer").append('\n        <textarea id="fixHideSubreddits" name="fixHideSubreddits" rows="3" cols="40" style = "flex:1">'+subsToHide+"</textarea>\n        "),$(".enhancecontainer").append(" <button type='button' id='fixSaveSubredditsHidden' style = 'background:darkgreen; flex: 2'>Save</button> "),$(".enhancecontainer").append('<div class="tw-border-t tw-mg-t-1 tw-mg-x-05 tw-pd-b-1 customEnhanceMenu"" ></div><div class="tw-mg-y-05 tw-pd-x-05" style="width: 100%;"><p class="tw-c-text-alt-2 tw-font-size-6 tw-strong tw-upcase"\n\nstyle="color: var(--color-text-alt-2)!important;\n    font-size: smaller;line-height: 1.4;\n    margin-top: 6px;">Any subreddit containing this word will be hidden from your feed. This is Case Sensitive. Write the exact subreddit name if you only target that subreddit. Use ; to separate keywords. Example: funny;tiktok;celebrity</p></div>'),$("body").append('\n    <div class="Layout-sc-nxg1ff-0 jA-dUUY"><div class="Layout-sc-nxg1ff-0 dDnLci">\n    <div class="Layout-sc-nxg1ff-0 bYXYej">\n    <div class="InjectLayout-sc-588ddc-0 iETGeJ">\n    <button class="ScCoreButton-sc-1qn4ixc-0 enhanceButton jGqsfG ScButtonIcon-sc-o7ndmn-0 fNzXyu"  style="\n    background: url(https://i.imgur.com/kWu713g.png);\n    background-size: 22px;\n    z-index:999;\n    background-repeat: no-repeat;\n    background-position: center; width: 25px;\n    height: 25px; top: 60px; right: 60px; position:fixed;" ></button>\n  </div>\n  </div>\n  <div aria-label="Whispers" role="button" data-click-out-id="threads-box" data-a-target="threads-box-closed" class="Layout-sc-nxg1ff-0 emWtQg InjectLayout-sc-588ddc-0 kgrtoC whispers-threads-box__container"></div></div></div>\n\n    '),$(".enhanceButton").click((function(){$(".enhancecontainer").toggle()})),$("#fixSaveSubredditsHidden").click((function(){subsToHide=$("#fixHideSubreddits").val(),localStorage.setItem("subsToHide",subsToHide),y()})),t(".enhanceButton:hover{    background-color:var(--color-background-button-text-hover) !important;}"),t("\n    .enhancecontainer {\ndisplay: flex;\n    flex-wrap: wrap;\n    justify-content: center;\n    background: #393939;\n    padding: 10px;\n    width: 200px;\n    position: fixed;\n    right: 100px;\n    z-index: 100;\n    margin-top: 66px;\n    width: 500px;\n    height: auto;\n    top: 0;\n}\n    "),t("\n    input.enhancCheck[type=checkbox] + label {\n  display: block;\n    cursor: pointer;\n    height: fit-content;\n    flex: 1 0 35%;\n    margin-top: 5px;\n}\n"),t("\n    input.enhancCheck[type=checkbox] {\n  display: none;\n}"),t("\n    ._1L5kUnhRYhUJ4TkMbOTKkI{\n    background: green !important;\n    }\n\n    "),t("\n    #redditFixCheckBoxBackground,#fixRedditKeepTopicsInMemory,#fixRedditoriginalBehavior{\n    background: red;\n    }\n\n    "),t(' input.enhancCheck[type=checkbox] + label:before {\n  content: "\\2714";\n  border: 0.1em solid #fff;\n  border-radius: 0.2em;\n  display: inline-block;\n  width: 1em;\n  height: 1em;\n  padding-left: 0.2em;\n  padding-bottom: 0.3em;\n  margin-right: 0.2em;\n  vertical-align: bottom;\n  color: transparent;\n}'),t("input.enhancCheck[type=checkbox]:checked + label:before {\n  background-color: #ED820A;\n  border-color:white;\n  color: #fff;\n}")}();