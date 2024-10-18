// ==UserScript==
// @name               AdBlock Script for WebView
// @name:zh-CN         套壳油猴的广告拦截脚本
// @author             Lemon399
// @version            2.8.5
// @description        Parse ABP Cosmetic rules to CSS and apply it.
// @description:zh-CN  将 ABP 中的元素隐藏规则转换为 CSS 使用
// @resource           jiekouAD https://slink.ltd/https://raw.githubusercontent.com/damengzhu/banad/main/jiekouAD.txt
// @resource           CSSRule https://slink.ltd/https://raw.githubusercontent.com/damengzhu/abpmerge/main/CSSRule.txt
// @match              http://*/*
// @match              https://*/*
// @run-at             document-start
// @grant              unsafeWindow
// @grant              GM_registerMenuCommand
// @grant              GM.registerMenuCommand
// @grant              GM_unregisterMenuCommand
// @grant              GM.unregisterMenuCommand
// @grant              GM_getValue
// @grant              GM.getValue
// @grant              GM_deleteValue
// @grant              GM.deleteValue
// @grant              GM_setValue
// @grant              GM.setValue
// @grant              GM_addStyle
// @grant              GM.addStyle
// @grant              GM_xmlhttpRequest
// @grant              GM.xmlHttpRequest
// @grant              GM_getResourceText
// @grant              GM.getResourceText
// @grant              GM_download
// @grant              GM.download
// @grant              GM_listValues
// @grant              GM.listValues
// @namespace          https://lemon399-bitbucket-io.vercel.app/
// @source             https://gitee.com/lemon399/tampermonkey-cli/tree/master/projects/abp_parse
// @source             https://bitbucket.org/lemon399/tampermonkey-cli/src/master/projects/abp_parse/
// @connect            slink.ltd
// @copyright          GPL-3.0
// @license            GPL-3.0
// @downloadURL https://raw.githubusercontent.com/s0uboxxx/Userscripts-GCC/release/release/AdBlock20Script20for20WebView.user.js
// @updateURL https://raw.githubusercontent.com/s0uboxxx/Userscripts-GCC/release/release/AdBlock20Script20for20WebView.meta.js
// ==/UserScript==
