// ==UserScript==
// @name                    Play-With-MPV
// @name:zh                 使用 MPV 播放
// @namespace               https://github.com/LuckyPuppy514
// @version                 4.0.9
// @author                  LuckyPuppy514
// @copyright               2023, Grant LuckyPuppy514 (https://github.com/LuckyPuppy514)
// @license                 MIT
// @description             使用 mpv 播放网页中的视频，并支持 potplayer 及自定义播放器
// @homepage                https://github.com/LuckyPuppy514/Play-With-MPV
// @icon                    https://www.lckp.top/gh/LuckyPuppy514/pic-bed/common/mpv.png
// @match                   https://www.bilibili.com/bangumi/play/*
// @match                   https://www.bilibili.com/video/*
// @match                   https://www.bilibili.com/festival/*
// @match                   https://www.bilibili.com/list/*
// @match                   https://live.bilibili.com/*
// @match                   https://www.ixigua.com/*
// @match                   https://yun.nxflv.com/?url=*
// @match                   https://ddys.art/*
// @match                   https://ddys.pro/*
// @include                 *://*.libvio.*
// @include                 https://*.chinaeast2.cloudapp.chinacloudapi.cn*/*
// @match                   https://*.cfnode1.xyz/*?url=*
// @include                 https://www.nivod*.tv/*
// @match                   https://www.pkmkv.com/py/*
// @match                   https://www.pkmkv.com/addons/dplayer/?url=*
// @match                   https://www.btnull.org/py/*
// @match                   https://www.btnull.to/py/*
// @match                   https://www.btnull.nu/py/*
// @match                   https://www.btnull.in/py/*
// @include                 *://www.*dm.com/play/*
// @match                   *://www.ntdm8.com/play/*
// @include                 *://www.mxdm.tv/*
// @include                 *://www.mxdm*.com/*
// @match                   https://danmu.yhdmjx.com/*?url=*
// @match                   https://dick.xfani.com/watch/*
// @match                   https://dick.xfani.com/addons/dp/player/*
// @match                   https://player.moedot.net/player/*
// @match                   https://m3.moedot.net/muiplayer/?url=*
// @match                   https://www.mgnacg.com/bangumi/*
// @match                   https://play.mknacg.top:8585/*
// @match                   https://www.omofun.top/index.php/vod/play/id/*
// @match                   https://*.omofun.top/?url=*
// @match                   https://spdcat.net/vodplay/*
// @match                   https://spdcat.net/addons/dp/player/*
// @match                   http://www.dm88.me/player/*
// @match                   https://jianghu.live2008.com/*?url=*
// @match                   https://www.kk151.com/play/*
// @match                   https://jx.m3u8.tv/jiexi/?url=*
// @match                   https://jx.wolongzywcdn.com:65/m3u8.php?url=*
// @match                   https://www.m3u8.tv.cdn.8old.cn/jx.php?url=*
// @match                   https://jx.wujinkk.com/dplayer/?url=*
// @match                   https://www.ikdmjx.com/?url=*
// @match                   https://hls.kuaibofang.com/?url=*
// @match                   https://jx.jxbdzyw.com/m3u8/?url=*
// @match                   https://hdzyk.com/?m=*
// @match                   https://1080zyk1.com/?m=*
// @match                   https://1080zyk2.com/?m=*
// @match                   https://1080zyk3.com/?m=*
// @match                   https://1080zyk4.com/?m=*
// @match                   https://1080zyk5.com/?m=*
// @match                   https://vip.zykbf.com/?url=*
// @match                   https://*.yzzy-tv1.com/*
// @match                   https://*.yzzy-tv-cdn.com/*
// @match                   https://www.bdys10.com/*
// @match                   https://www.haitu.tv/*
// @include                 *://*alist*
// @include                 *://*:5244*
// @match                   *://*/*.mp4
// @match                   *://*/*.mkv
// @match                   *://*/*.flv
// @match                   https://www.dora-family.com/Resource:TV
// @match                   https://www.olehdtv.com/*
// @match                   *://tkznp.com/vodplay/*
// @match                   *://www.tkznp.com/vodplay/*
// @match                   *://www.tkznp1.com/vodplay/*
// @match                   *://www.tkznp2.com/vodplay/*
// @match                   *://www.tkznp3.com/vodplay/*
// @match                   *://www.tkznp4.com/vodplay/*
// @match                   *://www.tkznp5.com/vodplay/*
// @match                   *://www.tkznp6.com/vodplay/*
// @match                   https://vip.ckllk.com/?url=*
// @match                   https://www.anfuns.cc/play/*
// @match                   https://www.anfuns.cc/vapi/*
// @match                   https://www.youtube.com/*
// @match                   https://odysee.com/*
// @match                   https://rumble.com/*
// @match                   https://www.bitchute.com/*
// @match                   https://ani.gamer.com.tw/animeVideo.php?sn=*
// @match                   https://ok.ru/*
// @match                   https://tver.jp/*
// @match                   https://www.lckp.top/play-with-mpv/index.html
// @match                   https://www.douyin.com/
// @match                   https://www.douyin.com/video/*
// @match                   https://www.douyin.com/discover?modal_id=*
// @match                   https://www.mitang.tv/m/*
// @match                   https://www.mfan.tv/play/*
// @match                   https://video1.beijcloud.com/player/?url=*
// @match                   https://www.tucao.cam/play/*
// @match                   https://mypikpak.com/drive/*
// @match                   https://www.icourse163.org/learn/*
// @match                   https://www.iole.tv/*
// @match                   https://www.zhihu.com/zvideo/*
// @match                   *://www.susudm8.com/*
// @match                   *://susudyy.com/*
// @match                   *://buding3.com/*
// @match                   *://buding6.com/*
// @match                   *://v2.shenjw.com:*/wap.php?url=*
// @match                   *://u88.xigua88ok.com:*/wap.php?url=*
// @match                   *://test3.gqyy8.com:*/f/aliplayer.php?url=*
// @match                   *://v.mksec.cn/*
// @match                   https://tgbook.coolkv.com/*play*
// @include                 *://*dsh*.com/*
// @match                   https://www.twitch.tv/*
// @match                   https://jiohub.top/watch/*
// @match                   https://www.agemys.org/play/*
// @include                 https://vip.sp-flv.com:*?url=*
// @match                   https://anime.girigirilove.com/*
// @match                   https://play.girigirilove.top/love?url=*
// @match                   https://www.cycdm01.top/*
// @match                   https://player.cycdm01.top/?url=*
// @match                   https://www.xgcartoon.com/video/*
// @match                   https://pframe.xgcartoon.com/player.htm?vid=*
// @match                   https://iframe.mediadelivery.net/*
// @connect                 api.bilibili.com
// @connect                 api.live.bilibili.com
// @require                 https://lf26-cdn-tos.bytecdntp.com/cdn/expire-1-y/jquery/3.2.1/jquery.min.js
// @require                 https://lf6-cdn-tos.bytecdntp.com/cdn/expire-1-y/spark-md5/3.0.2/spark-md5.min.js
// @grant                   GM_setValue
// @grant                   GM_getValue
// @run-at                  document-body
// @downloadURL https://raw.githubusercontent.com/s0uboxxx/Userscripts-GCC/release/release/PlayWithMPV.user.js
// @updateURL https://raw.githubusercontent.com/s0uboxxx/Userscripts-GCC/release/release/PlayWithMPV.meta.js
// ==/UserScript==