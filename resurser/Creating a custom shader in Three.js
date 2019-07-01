<!DOCTYPE html>
<html class="js-focus-visible" lang="en"><head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <meta charset="utf-8">
    <title>Creating a custom shader in Three.js - DEV Community 👩‍💻👨‍💻</title>
      <meta name="last-updated" content="2019-06-30 14:41:04 UTC">
      <meta name="user-signed-in" content="false">
      <meta name="algolia-public-id" content="YE5Y9R600C">
      <meta name="algolia-public-key" content="YWVlZGM3YWI4NDg3Mjk1MzJmMjcwNDVjMjIwN2ZmZTQ4YTkxOGE0YTkwMzhiZTQzNmM0ZGFmYTE3ZTI1ZDFhNXJlc3RyaWN0SW5kaWNlcz1zZWFyY2hhYmxlc19wcm9kdWN0aW9uJTJDVGFnX3Byb2R1Y3Rpb24lMkNvcmRlcmVkX2FydGljbGVzX3Byb2R1Y3Rpb24lMkNDbGFzc2lmaWVkTGlzdGluZ19wcm9kdWN0aW9uJTJDb3JkZXJlZF9hcnRpY2xlc19ieV9wdWJsaXNoZWRfYXRfcHJvZHVjdGlvbiUyQ29yZGVyZWRfYXJ0aWNsZXNfYnlfcG9zaXRpdmVfcmVhY3Rpb25zX2NvdW50X3Byb2R1Y3Rpb24lMkNvcmRlcmVkX2NvbW1lbnRzX3Byb2R1Y3Rpb24=">
      <meta name="environment" content="production">
          <style>
      body.night-theme .on-page-nav-butt img,body.night-theme .icon-img,body.night-theme .dropdown-icon,body.night-theme .reaction-button:not(.reacted) img,body.night-theme .image-upload-button button,body.night-theme .icon-image,body.night-theme .dev-badge,body.night-theme .chatchannels__config img,body.night-theme .external-link-img,body.night-theme .group-img{-webkit-filter:invert(95%);filter:invert(95%)}body.night-theme .ltag__tag{border-color:white !important;box-shadow:3px 3px 0px #fff !important}body.night-theme .partner-image-dark-mode{display:block !important}body.night-theme .partner-image-light-mode{display:none !important}body.sans-serif-article-body .body{font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"}body.sans-serif-article-body .body p{font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";font-size:0.98em}body.comic-sans-article-body .body{font-family:"Comic Sans MS", cursive, sans-serif}body.comic-sans-article-body .body p{font-family:"Comic Sans MS", cursive, sans-serif;font-size:0.98em}body{background:#f9f9fa;background:var(--theme-background, #f9f9fa);color:#0a0a0a;color:var(--theme-color, #0a0a0a);font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";font-size:18px;padding:0 !important;margin:0 !important;margin-top:-20px !important;overflow-y:scroll}*:focus:active{outline:0}*:focus:not(.focus-visible){outline:none}.ptr--ptr{margin-top:70px;margin-bottom:-70px}.modal-open{margin:0;overflow:hidden;overflow-y:hidden;height:90vh}.zen-mode .top-bar,.zen-mode .primary-sticky-nav,.zen-mode .article-actions{display:none !important}.config_minimize_newest_listings #sidebar-listings-widget .widget-body{display:none !important}.universal-page-content-wrapper{overflow:hidden;min-height:88vh;visibility:visible}.universal-page-content-wrapper.stories-index,.universal-page-content-wrapper.notifications-index,.universal-page-content-wrapper.stories-search,.universal-page-content-wrapper.podcast_episodes-index,.universal-page-content-wrapper.reading_list_items-index,.universal-page-content-wrapper.history-index,.universal-page-content-wrapper .tags-index,.universal-page-content-wrapper.twitch_live_streams-show{margin-top:68px}pre{background-color:#2b2b32;padding:10px;font-size:15px}a{color:#557de8;color:var(--theme-anchor-color, #557de8);text-decoration:none}a:hover{opacity:0.9}div.field,div.actions{margin-bottom:5px}#instantclick{display:none}pre{background:#29292e;border-radius:2px;overflow-x:scroll;font-size:11px;color:#eff0f9;line-height:1.42em;font-size:13px;width:calc(100% - 25px)}@media screen and (min-width: 380px){pre{font-size:15px}}pre code{background:#29292e;color:#eff0f9;white-space:pre}.cta{color:#0a0a0a;background:#66e2d5;font-family:"HelveticaNeue-CondensedBold", "HelveticaNeueBoldCondensed", "HelveticaNeue-Bold-Condensed", "Helvetica Neue Bold Condensed", "HelveticaNeueBold", "HelveticaNeue-Bold", "Helvetica Neue Bold", "HelveticaNeue", "Helvetica Neue", "TeXGyreHerosCnBold", "Helvetica", "Tahoma", "Geneva", "Arial Narrow", "Arial", sans-serif;-webkit-appearance:none;font-stretch:condensed;font-weight:bold}button{cursor:pointer}input[type='submit']{cursor:pointer}input[type='text'],textarea,input[type='url'],input[type='email']{outline:0}.snackbar{position:fixed;bottom:20px;left:20px;right:20px;background:#f3f5ff;background:var(--theme-container-accent-background, #f3f5ff);border:2px solid #cfd7ff;border:var(--container-border, 2px solid #cfd7ff);padding:12px 30px;z-index:20;border-radius:3px;font-weight:bold}@media screen and (min-width: 430px){.snackbar{right:auto;display:inline-block;-webkit-animation:ease-out;-webkit-animation-name:slide-in-from-left;-webkit-animation-duration:0.25s}}@-webkit-keyframes slide-in-from-left{0%{left:-300px}50%{left:0px}90%{left:24px}100%{left:20px}}

      body.night-theme .on-page-nav-butt img,body.night-theme .icon-img,body.night-theme .dropdown-icon,body.night-theme .reaction-button:not(.reacted) img,body.night-theme .image-upload-button button,body.night-theme .icon-image,body.night-theme .dev-badge,body.night-theme .chatchannels__config img,body.night-theme .external-link-img,body.night-theme .group-img{-webkit-filter:invert(95%);filter:invert(95%)}body.night-theme .ltag__tag{border-color:white !important;box-shadow:3px 3px 0px #fff !important}body.night-theme .partner-image-dark-mode{display:block !important}body.night-theme .partner-image-light-mode{display:none !important}body.sans-serif-article-body .body{font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"}body.sans-serif-article-body .body p{font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";font-size:0.98em}body.comic-sans-article-body .body{font-family:"Comic Sans MS", cursive, sans-serif}body.comic-sans-article-body .body p{font-family:"Comic Sans MS", cursive, sans-serif;font-size:0.98em}@media screen and (min-width: 820px){.stories-index .top-bar,.comments-index .top-bar,.users-index .top-bar,.notifications-index .top-bar{border-bottom:1.5px solid #eeeef1;box-shadow:0px 0px 2px 0px rgba(97,95,95,0.18)}}.top-bar{font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";position:absolute;top:0px;left:0px;right:0px;-webkit-backface-visibility:hidden;z-index:1000;font-size:17px;height:46px;background:#fdf9f3;background:var(--theme-top-bar-background, #fdf9f3);position:fixed;border-bottom:1px solid rgba(0,0,0,0.2)}.top-bar.hidden{display:none}.top-bar nav{max-width:100%;width:1250px;margin:auto;position:relative}.top-bar nav .pwa-nav-buttons{position:absolute;top:17px;left:-200px;display:none}.top-bar nav .pwa-nav-buttons button{background:transparent;border:0px;width:28px;text-align:center;opacity:0.75;-webkit-filter:invert(0);filter:invert(0);-webkit-filter:var(--theme-social-icon-invert, invert(0));filter:var(--theme-social-icon-invert, invert(0))}.top-bar nav .pwa-nav-buttons button img{width:15px;height:15px}.top-bar nav .pwa-nav-buttons button:hover{opacity:1}@media screen and (min-width: 950px){.top-bar nav .pwa-nav-buttons{left:88px}.top-bar nav .pwa-nav-buttons.pwa-nav-buttons--showing{display:block}}@media screen and (min-width: 1439px){.top-bar nav .pwa-nav-buttons{left:-88px}}.top-bar nav a:active{opacity:0.8}.top-bar nav .nav-link{position:absolute;top:17px;width:120px;height:30px;border-radius:2px;padding-right:10px;font-size:14px;font-weight:400;display:none}.top-bar nav .write{width:118px;padding:3px 0px;height:auto;top:11px;text-align:center;font-weight:bold;border-radius:3px;border:2px solid #0a0a0a;border:2px solid var(--theme-top-bar-write-color, #0a0a0a);color:#0a0a0a;color:var(--theme-top-bar-write-color, #0a0a0a);background:#66e2d5;background:var(--theme-top-bar-write-background, #66e2d5)}@media screen and (min-width: 560px){.top-bar nav .write{display:block;right:140px}}@media screen and (min-width: 700px){.top-bar nav .write{display:block;right:165px}}.top-bar nav .connect-icon{width:29px;height:48px;display:block;text-align:center;z-index:10;top:0px;right:90px;fill:#0a0a0a;fill:var(--theme-top-bar-color, #0a0a0a)}@media screen and (min-width: 700px){.top-bar nav .connect-icon{right:110px}}.top-bar nav .connect-icon img{margin-top:6px;height:33px}.top-bar nav .connect-icon .connect-number{position:absolute;top:5px;left:17px;background:#66e2d5;padding:2px 7px;border-radius:8px;color:white;display:none;font-size:1.05em}.top-bar nav .connect-icon .connect-number.showing{display:block}.top-bar nav .connect-icon:hover img{opacity:0.9}.top-bar nav .connect-icon:hover .connect-number{background:#66e2d5}.top-bar nav .notifications-icon{right:50px;top:4px;width:22px;height:41px;display:block;text-align:center;z-index:10;fill:#0a0a0a;fill:var(--theme-top-bar-color, #0a0a0a)}@media screen and (min-width: 700px){.top-bar nav .notifications-icon{right:73px}}.top-bar nav .notifications-icon img{margin-top:10px;height:23px}.top-bar nav .notifications-icon .notifications-number{position:absolute;top:1px;left:11px;background:#4e57ef;padding:2px 7px;border-radius:8px;color:white;display:none;font-size:1.05em}.top-bar nav .notifications-icon .notifications-number.showing{display:block}.top-bar nav .notifications-icon:hover img{opacity:0.9}.top-bar nav .notifications-icon:hover .notifications-number{background:#4e57ef}.top-bar nav .nav-profile-image-wrapper{height:33px;width:33px;background:#333333;margin-top:-6px;border-radius:100%;border:0;overflow:hidden}.top-bar nav .nav-profile-image-wrapper img{height:35px;width:35px;border-radius:100%;margin-top:-1px;margin-left:-1px;-ms-user-select:none;-moz-user-select:none;-webkit-user-select:none;user-select:none}.top-bar nav .bars{height:22px;width:22px;background:transparent}.top-bar nav .navbar-menu-wrapper{position:absolute;right:0px;top:0px}.top-bar nav .navbar-menu-wrapper.showing .menu,.top-bar nav .navbar-menu-wrapper.showing .menubg{display:block}.top-bar nav .navbar-menu-wrapper.desktop:hover .menu,.top-bar nav .navbar-menu-wrapper.desktop:active .menu,.top-bar nav .navbar-menu-wrapper.desktop:focus .menu{display:block}.top-bar nav .navigation-butt{all:unset;position:absolute;right:0px;top:7px;padding-top:6px;padding-bottom:6px;padding-left:28px;padding-right:6px;border-bottom-left-radius:8px;background:transparent;border:0;cursor:pointer}@media screen and (min-width: 700px){.top-bar nav .navigation-butt{padding-right:33px}}.top-bar nav .menubg{position:fixed;left:0;right:0;bottom:0;background:rgba(17,17,17,0.88);z-index:-5;top:48px;display:none}.top-bar nav .menu{position:absolute;right:-3px;padding:5px 10px;text-align:left;background:#fdf9f3;background:var(--theme-top-bar-background, #fdf9f3);border:1px solid #dbdee1;border-top:0px;display:none;width:calc(100vw - 18px);top:45px}@media screen and (min-width: 380px){.top-bar nav .menu{position:fixed;width:230px;border-right:none;padding:15px 10px;border-bottom-left-radius:5px;box-shadow:0px 4px 5px 1px rgba(97,95,95,0.18)}}@media screen and (min-width: 1250px){.top-bar nav .menu{position:absolute;right:4px}}.top-bar nav .menu .header{padding:3px 10px;border-bottom:3px solid #f1f4f6;margin-bottom:5px;color:#b2c0cb}.top-bar nav .menu .option{padding:15px 10px}@media screen and (min-width: 380px){.top-bar nav .menu .option{padding:6px 10px}}.top-bar nav .menu .option.prime-option{border-bottom:3px solid;border-color:#7a7e81;border-color:var(--theme-prime-option-border-color, #7a7e81);margin-bottom:5px;font-size:1.22em;font-weight:500;overflow:hidden;text-overflow:ellipsis}.top-bar nav .menu .option:hover{background:#fcf5ea;background:var(--theme-top-bar-background-hover, #fcf5ea)}.top-bar nav .menu a{color:#0a0a0a;color:var(--theme-color, #0a0a0a)}.top-bar .skip-content-link{position:absolute;top:0;left:50%;-webkit-transform:translate(-50%, -100px);transform:translate(-50%, -100px);background:black;color:white;z-index:9999;padding:13px;cursor:default;pointer-events:none;opacity:0;transition:opacity 0.3s cubic-bezier(0.55, 0.055, 0.675, 0.19),-webkit-transform 0.3s cubic-bezier(0.55, 0.055, 0.675, 0.19);transition:opacity 0.3s cubic-bezier(0.55, 0.055, 0.675, 0.19),transform 0.3s cubic-bezier(0.55, 0.055, 0.675, 0.19);transition:opacity 0.3s cubic-bezier(0.55, 0.055, 0.675, 0.19),transform 0.3s cubic-bezier(0.55, 0.055, 0.675, 0.19),-webkit-transform 0.3s cubic-bezier(0.55, 0.055, 0.675, 0.19)}.top-bar .skip-content-link:focus{pointer-events:auto;opacity:1;-webkit-transform:translate(-50%, 22px);transform:translate(-50%, 22px);transition:opacity 0.3s cubic-bezier(0.215, 0.61, 0.355, 1),-webkit-transform 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);transition:opacity 0.3s cubic-bezier(0.215, 0.61, 0.355, 1),transform 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);transition:opacity 0.3s cubic-bezier(0.215, 0.61, 0.355, 1),transform 0.3s cubic-bezier(0.215, 0.61, 0.355, 1),-webkit-transform 0.3s cubic-bezier(0.215, 0.61, 0.355, 1)}.top-bar .logo-link{display:inline-block;margin-left:2%}.top-bar .logo{width:33px;height:21px;padding:7px 8px 6px 10px;margin-top:6px;fill:white;fill:var(--theme-logo-color, #fff);border-radius:3px;background:#0a0a0a;background:var(--theme-logo-background, #0a0a0a)}.nav-search-form{position:absolute;top:8px;left:calc(50px + 5vw);bottom:0px;width:calc(55vw - 63px)}@media screen and (min-width: 350px){.nav-search-form{width:calc(61vw - 75px)}}@media screen and (min-width: 450px){.nav-search-form{width:calc(61vw - 45px)}}@media screen and (min-width: 560px){.nav-search-form{width:calc(46vw - 52px)}}@media screen and (min-width: 950px){.nav-search-form{left:0;right:0;margin:auto;width:300px}}@media screen and (min-width: 1120px){.nav-search-form{width:calc(100% - 760px)}}.nav-search-form__input{margin:0;width:calc(100% - 12px);border-radius:3px;border:0px;padding:6px 9px;font-size:0.9em;background:#e8e7e7;background:var(--theme-top-bar-search-background, #e8e7e7);color:#0a0a0a;color:var(--theme-top-bar-search-color, #0a0a0a);-webkit-appearance:none}.nav-search-form__input::-webkit-input-placeholder{opacity:0.5;color:#0a0a0a;color:var(--theme-top-bar-search-color, #0a0a0a)}.nav-search-form__input::-moz-placeholder{opacity:0.5;color:#0a0a0a;color:var(--theme-top-bar-search-color, #0a0a0a)}.nav-search-form__input:-ms-input-placeholder{opacity:0.5;color:#0a0a0a;color:var(--theme-top-bar-search-color, #0a0a0a)}.nav-search-form__input::-ms-input-placeholder{opacity:0.5;color:#0a0a0a;color:var(--theme-top-bar-search-color, #0a0a0a)}.nav-search-form__input::placeholder{opacity:0.5;color:#0a0a0a;color:var(--theme-top-bar-search-color, #0a0a0a)}

      body.night-theme .on-page-nav-butt img,body.night-theme .icon-img,body.night-theme .dropdown-icon,body.night-theme .reaction-button:not(.reacted) img,body.night-theme .image-upload-button button,body.night-theme .icon-image,body.night-theme .dev-badge,body.night-theme .chatchannels__config img,body.night-theme .external-link-img,body.night-theme .group-img{-webkit-filter:invert(95%);filter:invert(95%)}body.night-theme .ltag__tag{border-color:white !important;box-shadow:3px 3px 0px #fff !important}body.night-theme .partner-image-dark-mode{display:block !important}body.night-theme .partner-image-light-mode{display:none !important}body.sans-serif-article-body .body{font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"}body.sans-serif-article-body .body p{font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";font-size:0.98em}body.comic-sans-article-body .body{font-family:"Comic Sans MS", cursive, sans-serif}body.comic-sans-article-body .body p{font-family:"Comic Sans MS", cursive, sans-serif;font-size:0.98em}body.night-theme .on-page-nav-butt img,body.night-theme .icon-img,body.night-theme .dropdown-icon,body.night-theme .reaction-button:not(.reacted) img,body.night-theme .image-upload-button button,body.night-theme .icon-image,body.night-theme .dev-badge,body.night-theme .chatchannels__config img,body.night-theme .external-link-img,body.night-theme .group-img{-webkit-filter:invert(95%);filter:invert(95%)}body.night-theme .ltag__tag{border-color:white !important;box-shadow:3px 3px 0px #fff !important}body.night-theme .partner-image-dark-mode{display:block !important}body.night-theme .partner-image-light-mode{display:none !important}body.sans-serif-article-body .body{font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"}body.sans-serif-article-body .body p{font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";font-size:0.98em}body.comic-sans-article-body .body{font-family:"Comic Sans MS", cursive, sans-serif}body.comic-sans-article-body .body p{font-family:"Comic Sans MS", cursive, sans-serif;font-size:0.98em}#audiocontent{position:fixed;bottom:0px;left:0px;right:0px;z-index:15;font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"}#audiocontent #progressBar{color:#fff;width:100%;height:48px;margin-top:100px;position:fixed;left:0;bottom:0;right:0;text-align:left;background:#ececec;z-index:19;display:none}#audiocontent #progressBar.playing{display:block}#audiocontent #progressBar #episode-profile-image{height:48px;width:48px}#audiocontent #progressBar #animated-bars{position:absolute;bottom:-12px;left:-15px;width:80px;opacity:0.3;display:none}#audiocontent #progressBar #animated-bars.playing{display:block}#audiocontent #progressBar #barPlayPause{height:48px;width:48px;background:#202020;position:absolute;left:48px;bottom:0px;cursor:pointer}#audiocontent #progressBar #barPlayPause .butt{width:30px;margin:10px 9px}#audiocontent #progressBar #barPlayPause .pause-butt{display:none}#audiocontent #progressBar #barPlayPause.playing .play-butt{display:none}#audiocontent #progressBar #barPlayPause.playing .pause-butt{display:block}#audiocontent #progressBar .showing{display:block}#audiocontent #progressBar .hidden{display:none}#audiocontent #progressBar #volume{height:48px;width:32px;background:#202020;position:absolute;left:96px;bottom:0px;cursor:pointer}#audiocontent #progressBar #volume img{padding:3px;margin-top:4px;margin-left:4px;margin-bottom:-11px}#audiocontent #progressBar #volume #speed{font-weight:300;font-size:12px;padding:3px 0px;width:28px;margin-left:-0.5px;text-align:center;margin-top:2px;display:block;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;background:transparent;color:#c9c9c9}#audiocontent #progressBar #volume .volume-icon-wrapper{padding:1px 0px}#audiocontent #progressBar #volume #volumeindicator .range-wrapper{position:absolute;top:0px;left:22px;background:#202020;z-index:30;width:0;overflow:hidden;transition:width 200ms ease-out 95ms;padding:8px 0px 5px;text-align:center}#audiocontent #progressBar #volume #volumeindicator .range-wrapper input{width:80%;cursor:pointer}@media screen and (min-width: 430px){#audiocontent #progressBar #volume #volumeindicator:hover .range-wrapper{width:170px}}#audiocontent #progressBar .buffer-wrapper{height:48px;position:absolute;left:128px;right:0;bottom:0;cursor:pointer}#audiocontent #progressBar .buffer-wrapper #progress{background-color:#00ffa3;height:48px;display:inline-block;position:relative;z-index:23;transition:width 0.25s ease-in-out}#audiocontent #progressBar .buffer-wrapper #buffer{background-color:#96ffd9;height:48px;display:inline-block;position:absolute;bottom:0;z-index:22;transition:width 0.15s ease-in-out}#audiocontent #progressBar .buffer-wrapper #time{position:absolute;right:30px;top:16px;z-index:23;color:#a1a1a1;font-size:13px;background:rgba(236,236,236,0.74);padding:2px}#audiocontent #progressBar .buffer-wrapper #closebutt{position:absolute;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;right:3px;margin:0px;padding:0px;color:#535353;font-size:13.5px;z-index:25;height:22px;width:22px;transition:all 0.3s ease 0s;white-space:nowrap}#audiocontent #progressBar .buffer-wrapper #closebutt:hover{color:#ff4343}.navigation-progress{position:fixed;top:0;left:-20%;background:#66e2d5;z-index:100;height:43px;width:0%}.navigation-progress.showing{display:block;width:140%;-webkit-animation:grow-width 3200ms ease-out, pulsate 1.4s infinite ease-in-out;animation:grow-width 3200ms ease-out, pulsate 1.4s infinite ease-in-out}.live-link{color:#0a0a0a}.live-article-indicator{position:fixed;bottom:20px;right:20px;z-index:100}.live-article-indicator-inner{padding:10px 20px;background:white;border:2px solid #4e57ef;box-shadow:5px 5px 0px #4e57ef;border-radius:3px;max-width:calc(22vw + 96px);min-width:200px;display:none}@media screen and (min-width: 1410px){.live-article-indicator-inner{display:block}}.live-article-indicator-inner:hover{background:darkend(#e7faf8, 3%)}.live-article-indicator-inner .live-pre-header{font-size:1em;margin-top:2px;margin-left:25px;margin-bottom:15px;font-weight:800;font-family:"HelveticaNeue-CondensedBold", "HelveticaNeueBoldCondensed", "HelveticaNeue-Bold-Condensed", "Helvetica Neue Bold Condensed", "HelveticaNeueBold", "HelveticaNeue-Bold", "Helvetica Neue Bold", "HelveticaNeue", "Helvetica Neue", "TeXGyreHerosCnBold", "Helvetica", "Tahoma", "Geneva", "Arial Narrow", "Arial", sans-serif;font-stretch:condensed}.live-article-indicator-inner .live-article-title{font-size:1.4em;font-weight:600;margin:5px 0px}.live-article-indicator-inner .live-user{font-weight:bold;color:#444444}.live-article-indicator-inner .live-user img{height:27px;width:27px;border-radius:100px;margin-right:6px;vertical-align:-6px}.live-article-indicator-inner .live-tags{margin:8px 0px;color:#666666;font-size:0.8em}.live-article-indicator-inner .live-tags .live-tag{margin-right:6px}.live-exit-button{border:0px;background:transparent;position:absolute;top:12px;right:8px;padding:5px 10px 1px;border-radius:3px}.live-exit-button:hover{background:#ff8f8f}.live-exit-button img{height:15px;width:15px}.container .body kbd{display:inline-block;padding:3px 5px;font-size:11px;line-height:10px;color:#444d56;vertical-align:middle;background-color:#fafbfc;border:solid 1px #c6cbd1;border-bottom-color:#959da5;border-radius:3px;box-shadow:inset 0 -1px 0 #959da5}@-webkit-keyframes grow-width{0%{width:0%}100%{width:140%}}@keyframes grow-width{0%{width:0%}100%{width:140%}}@-webkit-keyframes pulsate{0%{opacity:0.25}50%{opacity:1}100%{opacity:0.25}}@keyframes pulsate{0%{opacity:0.25}50%{opacity:1}100%{opacity:0.25}}.pulsating-circle{position:absolute;left:24px;top:25px;-webkit-transform:translateX(-50%) translateY(-50%);transform:translateX(-50%) translateY(-50%);width:22px;height:22px}.pulsating-circle:before{content:'';position:relative;display:block;width:150%;height:150%;box-sizing:border-box;margin-left:-25%;margin-top:-25%;border-radius:45px;background-color:#4e57ef;-webkit-animation:pulse-ring 1.25s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;animation:pulse-ring 1.25s cubic-bezier(0.215, 0.61, 0.355, 1) infinite}.pulsating-circle:after{content:'';position:absolute;left:0;top:0;display:block;width:100%;height:100%;background-color:#4e57ef;border-radius:15px;box-shadow:0 0 8px rgba(0,0,0,0.3);-webkit-animation:pulse-dot 1.25s cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite;animation:pulse-dot 1.25s cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite}@-webkit-keyframes pulse-ring{0%{-webkit-transform:scale(0.33);transform:scale(0.33)}80%,
  100%{opacity:0}}@keyframes pulse-ring{0%{-webkit-transform:scale(0.33);transform:scale(0.33)}80%,
  100%{opacity:0}}@-webkit-keyframes pulse-dot{0%{-webkit-transform:scale(0.8);transform:scale(0.8)}50%{-webkit-transform:scale(1);transform:scale(1)}100%{-webkit-transform:scale(0.8);transform:scale(0.8)}}@keyframes pulse-dot{0%{-webkit-transform:scale(0.8);transform:scale(0.8)}50%{-webkit-transform:scale(1);transform:scale(1)}100%{-webkit-transform:scale(0.8);transform:scale(0.8)}}.stories-show{background:#f9f9fa;background:var(--theme-background, #f9f9fa)}.unpublished{background:#ff0000;display:block;text-align:center;position:relative;padding:calc(10px + 1.3vw) 10px;color:white;font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"}@media screen and (min-width: 380px){.unpublished{font-size:1.2em;line-height:1.5em}}.unpublished:hover{opacity:0.92;color:white}.unpublished em{display:inline-block;font-weight:bold}.blank-space{height:10px}.video-player-header{background:#0a0a0a;margin-top:0;max-width:1050px;margin:auto;margin-bottom:15px;height:56.25vw;overflow:hidden}@media screen and (min-width: 880px){.video-player-header{height:492px}}@media screen and (min-width: 950px){.video-player-header{border-top-left-radius:2px;border-top-right-radius:2px}}article{padding:0 0;position:relative}article .image{position:relative;width:100%;margin:auto;max-width:1024px;background:transparent no-repeat center center;background-size:cover;z-index:2;padding-top:42%}@media screen and (min-width: 950px){article .image{border-top-left-radius:2px;border-top-right-radius:2px}}article .category-banner{height:250px;background:#45525c}@media screen and (min-width: 1250px){.home .container{margin-left:25px}}.container{width:880px;max-width:100%;background:white;background:var(--theme-container-background, #fff);margin:66px auto 20px;text-align:left;box-shadow:1px 1px 0px #c2c2c2;box-shadow:var(--theme-container-box-shadow, 1px 1px 0px #c2c2c2)}@media screen and (min-width: 880px){.container{border:1px solid #d6d6d6;border:var(--theme-container-border, 1px solid #d6d6d6)}}@media screen and (min-width: 950px){.container{border-radius:3px}}@media screen and (min-width: 1250px){.container{margin-top:72px}}.container.article{position:relative;z-index:5}.container .title{z-index:6;position:relative;width:81%;font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";max-width:710px;margin:auto}@media screen and (max-width: 550px){.container .title{width:88%}}@media screen and (max-width: 430px){.container .title{width:93%}}.container .title .org-branded-title-link{color:#141414;color:var(--theme-color, #141414)}.container .title .org-branded-title-link .org-branded-title{font-size:calc(0.9em + 0.3vw);padding:8px 0 6px;margin-bottom:-8px}@media screen and (min-width: 1600px){.container .title .org-branded-title-link .org-branded-title{font-size:20px}}.container .title .org-branded-title-link .org-branded-title .org-pic{height:calc(27px + 0.5vw);width:calc(27px + 0.5vw);display:inline;vertical-align:calc(-8px - 0.1vw);border-radius:100px;margin-right:0.2vw;background:#f5f6f7}.container .title h1{margin:0 auto;padding:14px 0 7px;font-weight:500;min-height:40px;font-size:calc(2vw + 26px)}@media screen and (min-width: 1600px){.container .title h1{font-size:57px}}.container .title h1 .title-block{display:inline-block}.container .title h1.medium{font-size:calc(1.85vw + 25px)}@media screen and (min-width: 1600px){.container .title h1.medium{font-size:47px}}.container .title h1.long{font-size:calc(1.52vw + 23px)}@media screen and (min-width: 1600px){.container .title h1.long{font-size:46px}}.container .title h1.longer{font-size:calc(1.48vw + 22px)}@media screen and (min-width: 1600px){.container .title h1.longer{font-size:45px}}.container .title h1.longest{font-size:calc(1.42vw + 22px)}@media screen and (min-width: 1600px){.container .title h1.longest{font-size:42px}}.container .title h3{margin:4px auto;padding:0;padding:0 3px 16px;font-weight:500;color:#666666;color:var(--theme-secondary-color, #666);font-size:13.5px;line-height:1.5em}@media screen and (min-width: 430px){.container .title h3{font-size:15px}}.container .title h3 .profile-pic{width:28px;height:28px;border-radius:50px;display:inline-block;vertical-align:-9px;margin-right:2px;background:#f5f6f7}.container .title h3 a{color:#666666;color:var(--theme-secondary-color, #666);text-decoration:none}.container .title h3 .icon-img,.container .title h3 .reader-image-tiny{opacity:0.5;width:18px;height:18px;vertical-align:-4px;margin:0 1px}.container .title h3 .icon-img:hover,.container .title h3 .reader-image-tiny:hover{opacity:0.6}.container .title h3 .published-at{margin-right:0;display:inline-block}.container .title h3 .posted-date-inline{display:inline-block}.container .title h3 .action-space{padding:5px 0 0 0;display:inline-flex}.container .title h3 .action-space a{display:inline-block;background:#66e2d5;color:#0a0a0a;padding:2px 12px 3px;border-radius:3px;line-height:1.1em;font-family:"HelveticaNeue-CondensedBold", "HelveticaNeueBoldCondensed", "HelveticaNeue-Bold-Condensed", "Helvetica Neue Bold Condensed", "HelveticaNeueBold", "HelveticaNeue-Bold", "Helvetica Neue Bold", "HelveticaNeue", "Helvetica Neue", "TeXGyreHerosCnBold", "Helvetica", "Tahoma", "Geneva", "Arial Narrow", "Arial", sans-serif;font-stretch:condensed;margin-right:4px}@media screen and (max-width: 376px){.container .title h3 .action-space a{padding:2px 3px 3px;margin-left:3px;margin-left:5px}.container .title h3 .action-space a .post-word{display:none}}.container .title .tags .tag{display:inline-block;border-radius:3px;font-size:13px;font-weight:bold;padding:2px 5px 3px;border-radius:2px;background:#d6d9e0;color:#606570}.container .title .tags .tag:hover{opacity:0.9}.container .article-collection-wrapper{text-align:center;font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";font-size:16px}.container .article-collection-wrapper p{max-width:90%;margin:35px auto 15px;padding:2px 0;font-weight:bold;font-style:oblique}.container .article-collection-wrapper .article-collection{display:inline-block;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;font-size:16px;overflow:hidden;width:92%;max-width:718px;margin-bottom:1.1vw;position:relative;z-index:8}.container .article-collection-wrapper .article-collection a{color:#0a0a0a;padding:calc(0.3vw + 14px);background:#d8d8de;display:inline-block;position:relative;z-index:4;max-width:260px;margin:0.2vw;border-radius:100px}.container .article-collection-wrapper .article-collection a:hover{background:#c7c7d0}.container .article-collection-wrapper .article-collection a.current-article{background:#0a0a0a;color:white}.container .article-collection-wrapper .article-collection a.coming-soon{pointer-events:none;color:#d1d1d1}.container .article-collection-wrapper.article-collection-wrapper-bottom{margin-bottom:3vw}.container .article-collection-wrapper.article-collection-wrapper-bottom p{margin-top:5px}.container .body{margin:auto;width:82%;font-family:Palatino, 'Palatino Linotype', 'Palatino LT STD', 'Book Antiqua', Georgia, serif;font-size:21px;line-height:32px;background:#fff;background:var(--theme-container-background, #fff);position:relative;z-index:5;padding-bottom:5px;overflow-wrap:break-word}.container .body a code{color:#557de8}.container .body a.anchor{padding-top:0;margin-top:0;top:-50px;display:block;visibility:hidden;position:relative}.container .body h1,.container .body h2,.container .body h3,.container .body h4,.container .body h5,.container .body h6{font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"}.container .body h1{font-size:1.85em;line-height:1.14em;padding-left:4px;padding-right:4px;font-weight:400}.container .body h2{font-size:1.7em;font-weight:400;line-height:1.14em;padding-left:6px;padding-right:6px;padding-bottom:0;margin-bottom:0.5em}.container .body h3{font-size:1.32em;font-weight:400;padding-left:6px;padding-right:6px}.container .body h4{padding-left:6px;padding-right:6px}.container .body h5{padding-left:6px;padding-right:6px}.container .body h6{padding-left:6px;padding-right:6px}.container .body hr{width:calc(25% + 12px);opacity:0.1;border-width:1px;border-style:solid;border-color:#0a0a0a;border-color:var(--theme-color, #0a0a0a);margin:1.3em auto 1.5em}.container .body p{margin:0.95em 0 1.2em;padding:0.2em}.container .body ul,.container .body ol{padding-left:6px;margin:0.8em 0.7em 0.8em 1.9em}.container .body ol br{line-height:0;margin:0;padding:0}.container .body ul{list-style-type:square}.container .body ul br{line-height:0;margin:0;padding:0}.container .body ul p{margin:0;padding:0}.container .body ul ul{margin:0 0.7em 0 1.9em;list-style-type:circle}.container .body li{margin:0.3em auto}.container .body figcaption{font-style:italic;text-align:center;font-size:0.8em;line-height:1.4em;color:#525252;color:var(--theme-color, #525252);display:block}.container .body p ~ figcaption{margin-top:-0.8em}@media screen and (max-width: 550px){.container .body{width:90%}}@media screen and (max-width: 430px){.container .body{font-size:17.5px;line-height:26px;width:94%;margin-left:3%}.container .body ul,.container .body ol{margin:0.8em 0.7em 0.8em 1.4em}.container .body h1{font-size:1.6em}.container .body h2{font-size:1.4em}.container .body h3{font-size:1.16em}}.container .body blockquote{border-left:calc(0.2vw + 2px) solid #333;padding:0.1% 6% 0.1% 4%;margin:1.6em 1vw;font-size:0.92em;line-height:1.4em}.container .body blockquote p{padding:0;margin:0.95em 0 0.95em}.container .body blockquote.twitter-tweet{font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";background:white;max-width:456px;border:1px solid #e9eef2;font-size:0.75em;line-height:1.35em;border-radius:5px;margin:1.6em auto;padding:60px 10px 18px;color:white;min-height:60px;padding:33px 15px 8px}.container .body blockquote.twitter-tweet a{color:white}@media screen and (min-width: 360px){.container .body blockquote.twitter-tweet{padding:60px 22px 18px;min-height:105px}}.container .body code{margin:auto;background:#f9f9fa;background:var(--theme-code-background, #f9f9fa);padding:0.1em 0.3em 0;border-radius:2px;color:#333842;color:var(--theme-code-color, #333842);font-size:0.84em;vertical-align:0;max-width:100%;line-height:1.6em}.container .body pre{background:#29292e;border-radius:2px;overflow-x:auto;color:#eff0f9;line-height:1.42em;padding-left:4%;padding-right:7%;font-size:0.7em;width:97%;margin-left:-3%;padding-top:6%;padding-bottom:6%;border-radius:0;overflow-wrap:normal}@media screen and (min-width: 430px){.container .body pre{width:111%;margin-left:-11%;padding-left:9%;padding-right:2%}}.container .body pre code{background:#29292e;color:#eff0f9;white-space:pre}.container .body img{height:auto;position:relative;display:block;margin:auto;left:-4%;max-width:108%}@media screen and (min-width: 430px){.container .body img{left:-6px;max-width:calc(100% + 12px)}}.container .body a.article-body-image-wrapper{cursor:zoom-in}.container .body iframe{width:100%;border:0;margin:1.2em 0}.container .body .fluidvids{margin:1em 0}.container .body .fluidvids iframe{margin:0}.container .body .table-wrapper-paragraph{width:100%;margin-left:0%;overflow-x:auto}@media screen and (min-width: 430px){.container .body .table-wrapper-paragraph{width:108%;margin-left:-4%}}@media screen and (min-width: 800px){.container .body .table-wrapper-paragraph{width:110%;margin-left:-5%}}.container .body table{font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";border-collapse:collapse;font-size:0.78em;margin:0.8em auto 1.2em;table-layout:fixed}@media screen and (min-width: 500px){.container .body table{font-size:0.9em}}.container .body table th{border:1px solid #dbdbdb;padding:5px 1vw;background:#f9f9fa;background:var(--theme-background, #f9f9fa);text-align:left}.container .body table td{border:1px solid #dbdbdb;padding:5px 1vw;box-sizing:border-box}.container .body .twitter-tweet{margin:auto}.container .about-the-author{margin:auto;width:calc(100% - 5px);position:relative;overflow:hidden;padding:0px 0px 5px;background:white;background:var(--theme-container-background, #fff);font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"}.container .about-the-author a{color:#0a0a0a;color:var(--theme-color, #0a0a0a)}@media screen and (min-width: 520px){.container .about-the-author{width:82%}}.container .about-the-author .left-column{text-align:center;float:left;width:90px;padding-top:8px}.container .about-the-author .left-column .profile-pic{width:70px;height:70px;border-radius:100px;display:inline-block;background:no-repeat center center;background-size:cover;margin-right:2px;margin-bottom:12px}.container .about-the-author .main-content{margin:auto;width:calc(100% - 92px);float:left}.container .about-the-author .main-content h4{margin:13px 0 0;font-size:28px;text-align:left;font-weight:400}.container .about-the-author .main-content h4 button{background:#66e2d5;color:#0a0a0a;font-family:"HelveticaNeue-CondensedBold", "HelveticaNeueBoldCondensed", "HelveticaNeue-Bold-Condensed", "Helvetica Neue Bold Condensed", "HelveticaNeueBold", "HelveticaNeue-Bold", "Helvetica Neue Bold", "HelveticaNeue", "Helvetica Neue", "TeXGyreHerosCnBold", "Helvetica", "Tahoma", "Geneva", "Arial Narrow", "Arial", sans-serif;font-stretch:condensed;border:0;font-size:15px;border-radius:5px;vertical-align:2px;padding:4px 7px;display:none;margin-left:6px}.container .about-the-author .main-content h4 button.showing{display:inline-block}.container .about-the-author .main-content p{margin:2px 0;padding-left:0;line-height:22px;font-size:0.88em}.container .about-the-author .main-content .social{font-size:0.85em}.container .about-the-author .main-content .social a{color:#666666;color:var(--theme-secondary-color, #666);margin-right:6px;display:inline-block}.container .about-the-author .main-content .social a .icon-img{width:15px;height:15px;border-radius:3px;vertical-align:-2px;margin:0;opacity:0.7;background:transparent;background:transparent;background:var(--theme-secondary-color, transparent)}.container .article-actions{text-align:center;padding:5px 0 12px;position:fixed;bottom:0;z-index:22;background:white;border:1px solid #d6d6d6;border:1px solid #d6d6d6;border:var(--theme-container-border, 1px solid #d6d6d6);box-shadow:1px 1px 0px #c2c2c2;box-shadow:var(--theme-container-box-shadow, 1px 1px 0px #c2c2c2);width:100%;background:#fdf9f3;background:var(--theme-background, #fdf9f3)}.container .article-actions .dropdown-content clipboard-copy{display:flex;flex-flow:row wrap;position:relative;width:calc(100% - 24px);margin-left:12px;cursor:pointer}.container .article-actions .dropdown-content clipboard-copy #article-copy-link-input{border-radius:3px;border:1px dashed black;flex:1 1 auto;font-size:1em;margin:10px auto;padding:4px 6px;width:auto}.container .article-actions .dropdown-content clipboard-copy img{flex:1 0 24px;max-width:24px;margin-left:5px;-webkit-filter:invert(0);filter:invert(0);-webkit-filter:var(--theme-social-icon-invert, invert(0));filter:var(--theme-social-icon-invert, invert(0))}.container .article-actions .dropdown-content clipboard-copy input{cursor:pointer}.container .article-actions .dropdown-content clipboard-copy #article-copy-link-announcer{flex:1 0 100%;color:#0045ff;position:absolute;bottom:-8px;padding-left:0px;font-size:12px;text-align:left}.container .article-actions .dropdown-content clipboard-copy #article-copy-link-announcer[hidden]{display:none}@media screen and (min-width: 880px){.container .article-actions{margin-left:-1px;margin-right:-1px;width:880px;padding:calc(0 + 0.7vh) 0}}@media screen and (min-width: 1365px){.container .article-actions{margin-left:-1px;margin-right:-1px;width:calc(55px + 1.1vw);top:0%;padding:calc(11px + 6%) 0px;bottom:5%;left:calc(50% - 672px);background:transparent;border:0;box-shadow:none;transition:opacity 0.25s;padding-right:2px}.container .article-actions .article-share-action-block{width:100% !important}.container .article-actions button,.container .article-actions a{display:block !important;width:100% !important;padding:7px 0px !important;margin-left:0px !important;margin-right:0px !important;border:0px !important;transition-delay:0.1s}.container .article-actions button.user-animated img,.container .article-actions a.user-animated img{-webkit-animation:image-reaction-animation 0.3s !important;animation:image-reaction-animation 0.3s !important}.container .article-actions button:focus-visible,.container .article-actions a:focus-visible{outline:0;box-shadow:0px 0px 4px #666666 !important}.container .article-actions a{margin-top:5px !important;font-size:0.67em !important;padding:10px 0px 9px !important}.container .article-actions a.article-actions-comments-count{padding:12px 0 !important}.container .article-actions .dropdown-content{left:80px !important;bottom:0px !important}}@media screen and (min-width: 1365px) and (min-width: 1365px){.container .article-actions .dropdown-content{bottom:-155px !important}}@media screen and (min-width: 1365px){.container .article-actions .dropdown-content a{background:transparent !important;padding-left:10px !important}}@media screen and (min-width: 1439px){.container .article-actions{width:calc(90px + 1.1vw);left:calc(50% - 711px)}.container .article-actions a{font-size:0.70em !important}.container .article-actions button{padding:9px 0px !important}.container .article-actions .dropdown-content{left:100px !important}}@media screen and (min-width: 1530px){.container .article-actions{width:156px;left:calc(50% - 750px)}.container .article-actions button,.container .article-actions a{width:140px !important}.container .article-actions a{font-size:0.79em !important}.container .article-actions .dropdown-content{left:150px !important}.container .article-actions button{padding:12px 0px !important}}.container .article-actions button{background:transparent;margin:0px calc(0.22vw + 2px);padding:2px calc(0.88vw + 6px);padding-right:calc(0.88vw + 10px);border:0px;font-weight:bold;font-stretch:condensed}.container .article-actions button img{height:23px;width:23px;transition:-webkit-filter 0.2s, opacity 0.2s;padding:4px;border-radius:100px;transition:box-shadow 0.18s;background:#edeef0;background:var(--theme-reaction-background, #edeef0)}@media screen and (min-width: 500px){.container .article-actions button img{height:26px;width:26px}}@media screen and (min-width: 1365px){.container .article-actions button img{height:19px;width:19px}}@media screen and (min-width: 1439px){.container .article-actions button img{height:23px;width:23px}}@media screen and (min-width: 1530px){.container .article-actions button img{height:28px;width:28px;padding:7px}}.container .article-actions button:hover img{box-shadow:0px 0px 0px 2px var(--theme-container-accent-background, #cfd7ff)}.container .article-actions button .reaction-number{display:inline-block;vertical-align:6px;margin-left:5px;vertical-align:10px;color:#666666;color:var(--theme-secondary-color, #666);font-size:13px;width:27px}@media screen and (min-width: 500px){.container .article-actions button .reaction-number{width:37px;font-size:16px;vertical-align:9px}}@media screen and (min-width: 1365px){.container .article-actions button .reaction-number{font-size:12px;vertical-align:9px;margin-left:1px;width:28px}}@media screen and (min-width: 1439px){.container .article-actions button .reaction-number{font-size:15px;vertical-align:9px;width:37px;margin-left:7px}}@media screen and (min-width: 1530px){.container .article-actions button .reaction-number{font-size:16px;vertical-align:15px}}.container .article-actions button.activated img{-webkit-filter:none;filter:none;opacity:1}.container .article-actions button.user-activated img{-webkit-filter:none;filter:none;opacity:1;box-shadow:0px 0px 0px 2px #ffc0d3;background:linear-gradient(111deg, #ffb4cb, #ff80a8)}.container .article-actions button.user-activated.unicorn-reaction-button img{box-shadow:0px 0px 0px 2px #d0e3ff;background:linear-gradient(111deg, #c5d9f8, #90bbff)}.container .article-actions button.user-activated.readinglist-reaction-button img{box-shadow:0px 0px 0px 2px #cfc9f3;background:linear-gradient(111deg, #cac3f3, #958aee)}.container .article-actions button.user-activated.user-animated img{-webkit-animation:image-reaction-animation 0.3s !important;animation:image-reaction-animation 0.3s !important}.container .article-actions .article-share-action-block{display:inline-block;position:relative;width:40px}.container .article-actions .article-share-action-block button{min-width:38px;opacity:0.7}.container .article-actions .article-share-action-block button:hover{opacity:1}.container .article-actions .article-share-action-block button .dropdown-icon{vertical-align:-2px}.container .article-actions .article-share-action-block img{background:transparent !important}.container .article-actions .article-share-action-block:hover img{box-shadow:none !important}.container .article-actions .article-share-action-block .dropdown-content{display:none;position:fixed;bottom:55px;right:0;left:0;z-index:100;background:#fdf9f3;background:var(--theme-top-bar-background, #fdf9f3);font-size:1em;text-align:left;min-width:300px;padding-bottom:15px;padding-top:15px}@media screen and (min-width: 500px){.container .article-actions .article-share-action-block .dropdown-content{position:absolute;right:-20px;border-radius:3px;font-size:0.92em;border:1px solid #dbdbdb;box-shadow:1px 2px 4px 0 rgba(0,0,0,0.18);left:auto;bottom:48px;padding-bottom:6px;padding-top:6px}}.container .article-actions .article-share-action-block .dropdown-content.showing{display:block}.container .article-actions .article-share-action-block .dropdown-content .dropdown-link-row input[type="text"]{border:1px dashed black;padding:4px 6px;font-size:1em;width:calc(100% - 50px);border-radius:3px;margin:10px auto 5px;margin-left:15px}.container .article-actions .article-share-action-block .dropdown-content .dropdown-link-row input[type="checkbox"]{float:right;cursor:pointer}@media screen and (min-width: 400px){.container .article-actions .article-share-action-block .dropdown-content .dropdown-link-row input[type="checkbox"]{margin:5px}}@media screen and (min-width: 500px){.container .article-actions .article-share-action-block .dropdown-content .dropdown-link-row input[type="checkbox"]{margin:3px}}@media screen and (min-width: 1365px){.container .article-actions .article-share-action-block .dropdown-content .dropdown-link-row input[type="checkbox"]{margin:1px}}.container .article-actions .article-share-action-block .dropdown-content .dropdown-link-row a{font-weight:bold;color:#0a0a0a;color:var(--theme-color, #0a0a0a);padding:12px 18px;width:calc(100% - 36px);display:block;font-size:0.8em}.container .article-actions .article-share-action-block .dropdown-content .dropdown-link-row a:hover{background:#f5f6f7;background:var(--theme-top-bar-background-hover, #f5f6f7)}.container .article-actions .article-share-action-block .dropdown-content .dropdown-link-row.notification-subscriptions-area-row{padding:0px;border-bottom:1px solid #666666;border-bottom:var(--theme-container-border, 1px solid #666)}.container .article-actions .article-share-action-block .dropdown-content .dropdown-link-row .notification-subscriptions-area-header{padding:12px 6px;padding-left:12px;font-size:0.7em;font-weight:bold;margin-top:-5px;background:#fbf2e6 !important;background:var(--theme-container-background, #fbf2e6) !important;border-bottom:1px solid #dbdbdb !important;border-bottom:var(--theme-subtle-border, 1px solid #dbdbdb) !important}@media screen and (min-width: 500px){.container .article-actions .article-share-action-block .dropdown-content .dropdown-link-row .notification-subscriptions-area-header{border-top-right-radius:3px;border-top-left-radius:3px}}.container .article-actions .article-share-action-block .dropdown-content .dropdown-link-row .notification-subscriptions-area-header button.notification-subscription-label{display:inline-block;width:90px !important;margin-left:5px !important;text-align:center !important;float:right !important;padding:4px 0px !important;border:1px solid #dbdbdb !important;border:var(--theme-border, 1px solid #dbdbdb) !important;border-radius:100px}.container .article-actions .article-share-action-block .dropdown-content .dropdown-link-row .notification-subscriptions-area-header button.notification-subscription-label.selected{visibility:hidden !important}.container .article-actions .article-share-action-block .dropdown-content .dropdown-link-row button.notification-subscription-label{width:100% !important;opacity:1.0 !important;text-align:left;font-size:0.8em;box-sizing:border-box !important;padding:13px 4px !important;padding-left:13px !important;margin:auto !important;cursor:pointer !important;color:#0a0a0a !important;color:var(--theme-color, #0a0a0a) !important}.container .article-actions .article-share-action-block .dropdown-content .dropdown-link-row button.notification-subscription-label:hover{background:#f5f6f7 !important;background:var(--theme-top-bar-background-hover, #f5f6f7) !important}.container .article-actions .article-share-action-block .dropdown-content .dropdown-link-row button.notification-subscription-label .selected-emoji{visibility:hidden;margin-left:4px;font-size:1.2em;vertical-align:-0.1em}.container .article-actions .article-share-action-block .dropdown-content .dropdown-link-row button.notification-subscription-label.selected{color:#0a0a0a !important;color:var(--theme-color, #0a0a0a) !important}.container .article-actions .article-share-action-block .dropdown-content .dropdown-link-row button.notification-subscription-label.selected .selected-emoji{display:inline-block;visibility:visible}.container .article-actions .article-actions-comments-count{display:none;position:relative;color:#666666;color:var(--theme-secondary-color, #666);font-weight:bold;font-size:calc(0.8em + 0.1vw);vertical-align:calc(7px - 0.07vw);font-family:"HelveticaNeue-CondensedBold", "HelveticaNeueBoldCondensed", "HelveticaNeue-Bold-Condensed", "Helvetica Neue Bold Condensed", "HelveticaNeueBold", "HelveticaNeue-Bold", "Helvetica Neue Bold", "HelveticaNeue", "Helvetica Neue", "TeXGyreHerosCnBold", "Helvetica", "Tahoma", "Geneva", "Arial Narrow", "Arial", sans-serif;font-stretch:condensed;padding:4px 0.88vw;border-radius:3px}.container .article-actions .article-actions-comments-count .article-actions-comments-count-number{display:none}@media screen and (min-width: 620px){.container .article-actions .article-actions-comments-count{display:inline-block}}@media screen and (min-width: 1250px){.container .article-actions .article-actions-comments-count{font-size:0.92em;vertical-align:6px}}@media screen and (min-width: 1439px){.container .article-actions .article-actions-comments-count .article-actions-comments-count-number{display:inline-block}}.container .article-actions .article-actions-tweet-button{padding:2px 0 2px !important;border-radius:3px;margin-right:0.15vw;margin-left:calc(0.2vw + 11px);vertical-align:calc(3px - 0.07vw);text-align:center;width:50px;display:none}.container .article-actions .article-actions-tweet-button img{height:23px;width:23px;vertical-align:-4px}@media screen and (min-width: 500px){.container .article-actions .article-actions-tweet-button{display:inline-block;vertical-align:calc(6px - 0.07vw)}}@media screen and (min-width: 1365px){.container .article-actions .article-actions-tweet-button{padding:7px 0px !important}.container .article-actions .article-actions-tweet-button img{height:17px;width:17px}}@media screen and (min-width: 1439px){.container .article-actions .article-actions-tweet-button{padding:8px 0px !important}.container .article-actions .article-actions-tweet-button img{height:20px;width:20px}}@media screen and (min-width: 1530px){.container .article-actions .article-actions-tweet-button{padding:20px 0px 12px !important}.container .article-actions .article-actions-tweet-button img{height:23px;width:23px}}.container .html-variant-wrapper{width:88%;margin:0 auto 25px}@media screen and (min-width: 500px){.container .html-variant-wrapper{width:82%}}.dev-ios-native-body .container .article-actions{padding:4px 0 0;border-bottom:1px solid #fdf9f3;border-bottom:1px solid var(--theme-background, #fdf9f3);border-top:1px solid rgba(0,0,0,0.33);transition:padding 0.33s}.dev-ios-native-body .container .article-actions .article-share-action-block .dropdown-content{bottom:43px}.showpage-reaction-cta{width:390px;max-width:78%;margin:30px auto;padding:20px 10px;position:relative;box-shadow:3px 4px 0 #20a99a;display:none}.showpage-reaction-cta .down-arrow{position:absolute;bottom:-20px;left:30px;width:0;height:0;border-left:20px solid transparent;border-right:20px solid transparent;border-top:27px solid #66e2d5}.show-comments-header{width:800px;max-width:90%;margin:auto;margin-bottom:-50px;text-align:center;font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"}.show-comments-footer{width:800px;max-width:98%;margin:auto;margin-top:-80px;text-align:center}.show-comments-footer .full-discussion-button{padding:calc(0.6vw + 6px) 0;border-radius:3px;display:block;width:100%;margin:7.5vw auto calc(1vw + 5px);max-width:450px;background:#66e2d5;color:#0a0a0a;font-family:"HelveticaNeue-CondensedBold", "HelveticaNeueBoldCondensed", "HelveticaNeue-Bold-Condensed", "Helvetica Neue Bold Condensed", "HelveticaNeueBold", "HelveticaNeue-Bold", "Helvetica Neue Bold", "HelveticaNeue", "Helvetica Neue", "TeXGyreHerosCnBold", "Helvetica", "Tahoma", "Geneva", "Arial Narrow", "Arial", sans-serif;font-stretch:condensed}@media screen and (min-width: 500px){.show-comments-footer .full-discussion-button{font-size:1.1em}}.show-comments-footer .full-discussion-button:hover{opacity:0.96}.org-branding{font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";text-align:center;margin-top:20px;margin-bottom:0;padding-bottom:20px}.org-branding a{color:#0a0a0a;color:var(--theme-color, #0a0a0a)}.org-branding .inner{width:800px;max-width:calc(100% - 40px);overflow:hidden;padding:24px 20px 0;margin:auto}.org-branding .content{font-size:calc(0.45vw + 16px)}@media screen and (min-width: 520px){.org-branding .content{float:left;width:calc(100% - 150px);text-align:left}}.org-branding .content .name{font-size:2.2em;font-weight:500}.org-branding .content .summary{padding-top:5px;padding-right:10px;padding-bottom:8px;font-weight:400;font-size:0.9em}@media screen and (min-width: 520px){.org-branding .content .summary{font-size:17px}}.org-branding .content .social{font-size:0.9em;margin:4px 0}@media screen and (min-width: 520px){.org-branding .content .social{font-size:18px}}.org-branding .content .social a{margin-right:10px;opacity:0.85}.org-branding .content .social a:hover{opacity:1}.org-branding .profile-image{text-align:center;width:100%;float:left;padding-top:6px}@media screen and (min-width: 520px){.org-branding .profile-image{width:150px}}.org-branding .profile-image img{height:100px;width:100px;border-radius:5px;border-radius:140px;border:3px solid #f5f6f7;background:#f5f6f7}.comments-container-container{padding-bottom:20px;border-bottom-left-radius:3px;border-bottom-right-radius:3px}@-webkit-keyframes fade-in{0%{opacity:0}100%{opacity:1}}@keyframes fade-in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes SHW{from{bottom:-80px}to{bottom:0}}@keyframes SHW{from{bottom:-80px}to{bottom:0}}@-webkit-keyframes image-reaction-animation{30%{-webkit-transform:rotate(-15deg);transform:rotate(-15deg)}}@keyframes image-reaction-animation{30%{-webkit-transform:rotate(-15deg);transform:rotate(-15deg)}}

      body.night-theme .on-page-nav-butt img,body.night-theme .icon-img,body.night-theme .dropdown-icon,body.night-theme .reaction-button:not(.reacted) img,body.night-theme .image-upload-button button,body.night-theme .icon-image,body.night-theme .dev-badge,body.night-theme .chatchannels__config img,body.night-theme .external-link-img,body.night-theme .group-img{-webkit-filter:invert(95%);filter:invert(95%)}body.night-theme .ltag__tag{border-color:white !important;box-shadow:3px 3px 0px #fff !important}body.night-theme .partner-image-dark-mode{display:block !important}body.night-theme .partner-image-light-mode{display:none !important}body.sans-serif-article-body .body{font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"}body.sans-serif-article-body .body p{font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";font-size:0.98em}body.comic-sans-article-body .body{font-family:"Comic Sans MS", cursive, sans-serif}body.comic-sans-article-body .body p{font-family:"Comic Sans MS", cursive, sans-serif;font-size:0.98em}body.night-theme .on-page-nav-butt img,body.night-theme .icon-img,body.night-theme .dropdown-icon,body.night-theme .reaction-button:not(.reacted) img,body.night-theme .image-upload-button button,body.night-theme .icon-image,body.night-theme .dev-badge,body.night-theme .chatchannels__config img,body.night-theme .external-link-img,body.night-theme .group-img{-webkit-filter:invert(95%);filter:invert(95%)}body.night-theme .ltag__tag{border-color:white !important;box-shadow:3px 3px 0px #fff !important}body.night-theme .partner-image-dark-mode{display:block !important}body.night-theme .partner-image-light-mode{display:none !important}body.sans-serif-article-body .body{font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"}body.sans-serif-article-body .body p{font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";font-size:0.98em}body.comic-sans-article-body .body{font-family:"Comic Sans MS", cursive, sans-serif}body.comic-sans-article-body .body p{font-family:"Comic Sans MS", cursive, sans-serif;font-size:0.98em}#audiocontent{position:fixed;bottom:0px;left:0px;right:0px;z-index:15;font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"}#audiocontent #progressBar{color:#fff;width:100%;height:48px;margin-top:100px;position:fixed;left:0;bottom:0;right:0;text-align:left;background:#ececec;z-index:19;display:none}#audiocontent #progressBar.playing{display:block}#audiocontent #progressBar #episode-profile-image{height:48px;width:48px}#audiocontent #progressBar #animated-bars{position:absolute;bottom:-12px;left:-15px;width:80px;opacity:0.3;display:none}#audiocontent #progressBar #animated-bars.playing{display:block}#audiocontent #progressBar #barPlayPause{height:48px;width:48px;background:#202020;position:absolute;left:48px;bottom:0px;cursor:pointer}#audiocontent #progressBar #barPlayPause .butt{width:30px;margin:10px 9px}#audiocontent #progressBar #barPlayPause .pause-butt{display:none}#audiocontent #progressBar #barPlayPause.playing .play-butt{display:none}#audiocontent #progressBar #barPlayPause.playing .pause-butt{display:block}#audiocontent #progressBar .showing{display:block}#audiocontent #progressBar .hidden{display:none}#audiocontent #progressBar #volume{height:48px;width:32px;background:#202020;position:absolute;left:96px;bottom:0px;cursor:pointer}#audiocontent #progressBar #volume img{padding:3px;margin-top:4px;margin-left:4px;margin-bottom:-11px}#audiocontent #progressBar #volume #speed{font-weight:300;font-size:12px;padding:3px 0px;width:28px;margin-left:-0.5px;text-align:center;margin-top:2px;display:block;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;background:transparent;color:#c9c9c9}#audiocontent #progressBar #volume .volume-icon-wrapper{padding:1px 0px}#audiocontent #progressBar #volume #volumeindicator .range-wrapper{position:absolute;top:0px;left:22px;background:#202020;z-index:30;width:0;overflow:hidden;transition:width 200ms ease-out 95ms;padding:8px 0px 5px;text-align:center}#audiocontent #progressBar #volume #volumeindicator .range-wrapper input{width:80%;cursor:pointer}@media screen and (min-width: 430px){#audiocontent #progressBar #volume #volumeindicator:hover .range-wrapper{width:170px}}#audiocontent #progressBar .buffer-wrapper{height:48px;position:absolute;left:128px;right:0;bottom:0;cursor:pointer}#audiocontent #progressBar .buffer-wrapper #progress{background-color:#00ffa3;height:48px;display:inline-block;position:relative;z-index:23;transition:width 0.25s ease-in-out}#audiocontent #progressBar .buffer-wrapper #buffer{background-color:#96ffd9;height:48px;display:inline-block;position:absolute;bottom:0;z-index:22;transition:width 0.15s ease-in-out}#audiocontent #progressBar .buffer-wrapper #time{position:absolute;right:30px;top:16px;z-index:23;color:#a1a1a1;font-size:13px;background:rgba(236,236,236,0.74);padding:2px}#audiocontent #progressBar .buffer-wrapper #closebutt{position:absolute;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;right:3px;margin:0px;padding:0px;color:#535353;font-size:13.5px;z-index:25;height:22px;width:22px;transition:all 0.3s ease 0s;white-space:nowrap}#audiocontent #progressBar .buffer-wrapper #closebutt:hover{color:#ff4343}.navigation-progress{position:fixed;top:0;left:-20%;background:#66e2d5;z-index:100;height:43px;width:0%}.navigation-progress.showing{display:block;width:140%;-webkit-animation:grow-width 3200ms ease-out, pulsate 1.4s infinite ease-in-out;animation:grow-width 3200ms ease-out, pulsate 1.4s infinite ease-in-out}.live-link{color:#0a0a0a}.live-article-indicator{position:fixed;bottom:20px;right:20px;z-index:100}.live-article-indicator-inner{padding:10px 20px;background:white;border:2px solid #4e57ef;box-shadow:5px 5px 0px #4e57ef;border-radius:3px;max-width:calc(22vw + 96px);min-width:200px;display:none}@media screen and (min-width: 1410px){.live-article-indicator-inner{display:block}}.live-article-indicator-inner:hover{background:darkend(#e7faf8, 3%)}.live-article-indicator-inner .live-pre-header{font-size:1em;margin-top:2px;margin-left:25px;margin-bottom:15px;font-weight:800;font-family:"HelveticaNeue-CondensedBold", "HelveticaNeueBoldCondensed", "HelveticaNeue-Bold-Condensed", "Helvetica Neue Bold Condensed", "HelveticaNeueBold", "HelveticaNeue-Bold", "Helvetica Neue Bold", "HelveticaNeue", "Helvetica Neue", "TeXGyreHerosCnBold", "Helvetica", "Tahoma", "Geneva", "Arial Narrow", "Arial", sans-serif;font-stretch:condensed}.live-article-indicator-inner .live-article-title{font-size:1.4em;font-weight:600;margin:5px 0px}.live-article-indicator-inner .live-user{font-weight:bold;color:#444444}.live-article-indicator-inner .live-user img{height:27px;width:27px;border-radius:100px;margin-right:6px;vertical-align:-6px}.live-article-indicator-inner .live-tags{margin:8px 0px;color:#666666;font-size:0.8em}.live-article-indicator-inner .live-tags .live-tag{margin-right:6px}.live-exit-button{border:0px;background:transparent;position:absolute;top:12px;right:8px;padding:5px 10px 1px;border-radius:3px}.live-exit-button:hover{background:#ff8f8f}.live-exit-button img{height:15px;width:15px}.comments .article-header .body kbd,.comments-container form .comment-preview-div kbd,.single-comment-node .body kbd{display:inline-block;padding:3px 5px;font-size:11px;line-height:10px;color:#444d56;vertical-align:middle;background-color:#fafbfc;border:solid 1px #c6cbd1;border-bottom-color:#959da5;border-radius:3px;box-shadow:inset 0 -1px 0 #959da5}@-webkit-keyframes grow-width{0%{width:0%}100%{width:140%}}@keyframes grow-width{0%{width:0%}100%{width:140%}}@-webkit-keyframes pulsate{0%{opacity:0.25}50%{opacity:1}100%{opacity:0.25}}@keyframes pulsate{0%{opacity:0.25}50%{opacity:1}100%{opacity:0.25}}.pulsating-circle{position:absolute;left:24px;top:25px;-webkit-transform:translateX(-50%) translateY(-50%);transform:translateX(-50%) translateY(-50%);width:22px;height:22px}.pulsating-circle:before{content:'';position:relative;display:block;width:150%;height:150%;box-sizing:border-box;margin-left:-25%;margin-top:-25%;border-radius:45px;background-color:#4e57ef;-webkit-animation:pulse-ring 1.25s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;animation:pulse-ring 1.25s cubic-bezier(0.215, 0.61, 0.355, 1) infinite}.pulsating-circle:after{content:'';position:absolute;left:0;top:0;display:block;width:100%;height:100%;background-color:#4e57ef;border-radius:15px;box-shadow:0 0 8px rgba(0,0,0,0.3);-webkit-animation:pulse-dot 1.25s cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite;animation:pulse-dot 1.25s cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite}@-webkit-keyframes pulse-ring{0%{-webkit-transform:scale(0.33);transform:scale(0.33)}80%,
  100%{opacity:0}}@keyframes pulse-ring{0%{-webkit-transform:scale(0.33);transform:scale(0.33)}80%,
  100%{opacity:0}}@-webkit-keyframes pulse-dot{0%{-webkit-transform:scale(0.8);transform:scale(0.8)}50%{-webkit-transform:scale(1);transform:scale(1)}100%{-webkit-transform:scale(0.8);transform:scale(0.8)}}@keyframes pulse-dot{0%{-webkit-transform:scale(0.8);transform:scale(0.8)}50%{-webkit-transform:scale(1);transform:scale(1)}100%{-webkit-transform:scale(0.8);transform:scale(0.8)}}@-webkit-keyframes fade-out{0%{background-color:#d0ffeb}100%{background-color:white}}@keyframes fade-out{0%{background-color:#d0ffeb}100%{background-color:white}}a.header-link{color:#0a0a0a;color:var(--theme-color, #0a0a0a);display:block}a.header-link:hover{color:#0a0a0a;color:var(--theme-color, #0a0a0a)}.comments{background:#f5f6f7;background:var(--theme-background, #f5f6f7)}.comments .picture{height:180px;max-width:900px;margin:auto;border-top-right-radius:5px;border-top-left-radius:5px;background-color:#ecf0f2;background:#ecf0f2 no-repeat top center;background-size:cover;position:relative;z-index:1}@media screen and (min-width: 390px){.comments .picture{height:240px}}@media screen and (min-width: 820px){.comments .picture{height:280px}}.comments .blank-comment-space{height:3px}@media screen and (min-width: 820px){.comments .blank-comment-space{height:0px}}.comments .article-header{width:820px;max-width:100%;margin:50px auto 10px;padding:0px 0px 90px;background:#fff;background:var(--theme-container-background, #fff);z-index:3;position:relative}@media screen and (min-width: 820px){.comments .article-header{margin:72px auto 10px;border-radius:5px;border:1px solid #eeeef1;border:var(--theme-container-border, 1px solid #eeeef1)}}.comments .article-header h3{width:94%;margin:12px 0 5px;margin-left:1.8%;font-weight:500;font-size:calc(1.5vw + 22px)}.comments .article-header h4{margin:0;font-weight:300;color:#c3c3c3;font-size:17px;width:96%;margin:auto;margin-bottom:-40px}.comments .article-header h4 a{color:#696767}.comments .article-header .body{padding:60px 0px 0px;width:96%;margin:auto;margin-bottom:-35px}.comments .article-header .body .read-more{color:#557de8;color:var(--theme-anchor-color, #557de8);display:inline-block}.comments .article-header .body .read-more:hover{opacity:0.96}.comments .article-header .body img{max-width:100%;max-height:350px}.comments .single-comment-header{height:60px}.comments-container{width:800px;max-width:98%;padding-top:10px;margin:auto;margin-bottom:100px;text-align:left}.comments-container.comments-dedicated-page-container{min-height:calc(97vh - 200px)}.comments-container img.icon-image{height:21px;opacity:0.7}.comments-container img.icon-image:hover{opacity:1}.comments-container .markdown-guide{position:absolute;left:22px;bottom:3px}.comments-container .editor-image-upload{font-size:0.8em;position:absolute;left:calc(0.2vw + 43px);bottom:0px;width:initial;text-align:left}.comments-container .editor-image-upload .uploaded-image{vertical-align:11px;border:1px dashed #888;position:relative;padding:0.2vw 0.4vw;font-size:1em;width:calc(94% - 36px);top:5px;display:none}.comments-container .editor-image-upload .uploaded-image.showing{display:inline-block}.comments-container .editor-image-upload .image-upload-file-label{font-size:0.9em;color:#888;display:none;vertical-align:4px}@media screen and (min-width: 500px){.comments-container .editor-image-upload .image-upload-file-label{display:inline-block}}.comments-container .editor-image-upload .image-upload-button{padding:2px 4px;text-align:left;font-size:0.8em;margin:4px 0px;border-radius:3px;border:0;cursor:pointer;display:inline-block;background:transparent;max-width:29px}@media screen and (max-width: 900px){.comments-container .editor-image-upload .image-upload-button{padding:5px 6px 1px}}.comments-container .top-level-actions{margin:0px 0px 85px;padding:3px 0px;z-index:4;position:relative;border-radius:3px;font-size:calc(0.35vw + 16px)}.comments-container .top-level-actions h3{margin:5px 0px}.comments-container .top-level-actions h3 a{font-size:0.62em;background:#0a0a0a;color:white;margin:2px 0px 2px;margin-right:5px;vertical-align:2px}.comments-container .top-level-actions .comment-action-buttons,.comments-container .top-level-actions .comment-action-text{display:inline-block;color:#666666;font-weight:300}.comments-container .top-level-actions a{display:inline-block;background:#cfd7ff;border-radius:3px;color:#0a0a0a;font-family:"HelveticaNeue-CondensedBold", "HelveticaNeueBoldCondensed", "HelveticaNeue-Bold-Condensed", "Helvetica Neue Bold Condensed", "HelveticaNeueBold", "HelveticaNeue-Bold", "Helvetica Neue Bold", "HelveticaNeue", "Helvetica Neue", "TeXGyreHerosCnBold", "Helvetica", "Tahoma", "Geneva", "Arial Narrow", "Arial", sans-serif;font-stretch:condensed;padding:4px 8px;font-size:0.77em;vertical-align:1px;margin:8px 0px 2px}.comments-container .top-level-actions .commentable-title{font-size:calc(0.3vw + 16px);color:#666666}.comments-container form{width:104%;background:#f5f6f7;background:var(--theme-container-accent-background, #f5f6f7);overflow:auto;position:relative;margin-bottom:4px;z-index:4;margin-left:-2%;border-top:1px solid #dbdbdb;border-top:var(--theme-container-border, 1px solid #dbdbdb)}@media screen and (min-width: 820px){.comments-container form{width:calc(100% - 2px);margin-left:0%;border:1px solid #dbdbdb;border:var(--theme-container-border, 1px solid #dbdbdb)}}.comments-container form .field{margin-bottom:0px}.comments-container form .article-comment-form-preamble{font-size:0.7em;margin-left:20px;margin-top:8px;margin-bottom:-5px}.comments-container form textarea{width:calc(100% - 52px);margin:15px auto 2px;display:block;resize:vertical;border-radius:3px;border:1px solid #e8e5e5;border:var(--theme-container-background, 1px solid #e8e5e5);height:125px;font-size:16px;padding:6px;cursor:text;background:#fff;background:var(--theme-container-background, #fff);color:#0a0a0a;color:var(--theme-color, #0a0a0a)}.comments-container form textarea::-webkit-input-placeholder{color:#8f949c}.comments-container form textarea::-moz-placeholder{color:#8f949c}.comments-container form textarea:-ms-input-placeholder{color:#8f949c}.comments-container form textarea::-ms-input-placeholder{color:#8f949c}.comments-container form textarea::placeholder{color:#8f949c}.comments-container form textarea.embiggened{height:calc(2vw + 115px)}.comments-container form textarea.embiggened-more{height:calc(5vw + 118px)}.comments-container form textarea.embiggened-max{height:calc(10vw + 118px)}.comments-container form textarea.preview-loading{background:#fff url("https://practicaldev-herokuapp-com.freetls.fastly.net/assets/loading-ellipsis-0339306544150384d710ea2b5f0a78be68b6389fe728a7ded105fa8a53067ac5.svg") no-repeat center center;background-color:white;background-color:var(--theme-container-background, #fff);color:white;color:var(--theme-container-background, #fff);background-size:50px}.comments-container form .preview-toggle{display:none}.comments-container form .comment-preview-div{padding:10px 20px 2px;min-height:calc(13vw + 6px);text-align:left;font-size:19px;font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";background:#fffee7;background:var(--theme-container-accent-background, #fffee7);box-shadow:1px 2px 4px 0 rgba(0,0,0,0.18);width:calc(100% - 80px);margin:19px auto 8px;border:1px solid #dbdbdb}.comments-container form .comment-preview-div p.loading-message{opacity:0.6}.comments-container form .comment-preview-div pre{overflow-x:auto}.comments-container form .actions{text-align:right}.comments-container form .actions .comment-action-button{font-family:"HelveticaNeue-CondensedBold", "HelveticaNeueBoldCondensed", "HelveticaNeue-Bold-Condensed", "Helvetica Neue Bold Condensed", "HelveticaNeueBold", "HelveticaNeue-Bold", "Helvetica Neue Bold", "HelveticaNeue", "Helvetica Neue", "TeXGyreHerosCnBold", "Helvetica", "Tahoma", "Geneva", "Arial Narrow", "Arial", sans-serif;font-stretch:condensed;color:white;border:0px;font-size:13px;font-weight:500;margin-top:3px;padding:5px 12px;border-radius:3px;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none}.comments-container form .actions .comment-action-cancel{background:#ff0000;display:none}.comments-container form .actions .comment-action-preview{background:#333333;z-index:10}.comments-container form .reply-actions{margin-bottom:0;padding-bottom:0}.comments-container form .code-of-conduct{display:block;margin-right:19px;margin-top:5px;text-align:right;font-size:0.9em;font-weight:500;color:#333333;color:var(--theme-secondary-color, #333)}.comments-container form .code-of-conduct.sub-comment-code-of-conduct{font-size:1em}.comments-container form .code-of-conduct .checkbox{vertical-align:1px;font-size:1.2em;margin:5px 0px}.comments-container form .code-of-conduct a{color:#557de8;color:var(--theme-anchor-color, #557de8)}.comments-container form input[type='submit']{margin-right:19px;background:#0045ff}.comments-container form.submitting input[type='submit']{background:#00bbff}.comments-container form.submitting textarea{color:#737373;border:1px solid #e7faf8;background:#fff url("https://practicaldev-herokuapp-com.freetls.fastly.net/assets/loading-ellipsis-0339306544150384d710ea2b5f0a78be68b6389fe728a7ded105fa8a53067ac5.svg") no-repeat center center;background-size:50px}.comments-container details details .comment-deep-1,.comments-container details details .comment-deep-2{margin-top:-123px}.comments-container details details summary{z-index:15;position:relative}.comments-container details details[open]>summary{width:calc(1.1vw + 12px);padding-bottom:100px}.comments-container details summary{cursor:pointer;color:#7a7a7a;font-size:14.5px;font-style:oblique;padding:4px 0px;padding-left:4px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.comments-container details summary:active{outline:0;box-shadow:0px 0px 0px #dbdbdb !important}.comments-container details summary:focus-visible{outline:0}.comments-container details summary:focus-visible:not(:active){box-shadow:0px 0px 6px #dbdbdb !important}.comments-container details summary span{display:inline-block;width:calc(100% - 50px);line-height:20px}.comments-container .comment-trees .comment-hash-marker{margin-top:-45px;margin-bottom:45px;border:1px solid transparent;z-index:-10;position:relative}.comments-container .comment-trees .comment-hash-marker:target+.single-comment-node{-webkit-animation-name:fade-out;animation-name:fade-out;-webkit-animation-duration:5s;animation-duration:5s;-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}.comments-container .comment-trees .root-comment{margin-top:-80px}.comments-container .comment-trees .root-comment .comment-parent-link{background:white;background:var(--theme-container-background, #fff);border:1px solid #666666;border:var(--theme-container-border, 1px solid #666);display:block;padding:9px 12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:0.8em;background:#fcfcfc;background:var(--theme-container-accent-background, #fcfcfc)}.comments-container .comment-view-parent{margin-bottom:7px;text-align:left;font-family:"HelveticaNeue-CondensedBold", "HelveticaNeueBoldCondensed", "HelveticaNeue-Bold-Condensed", "Helvetica Neue Bold Condensed", "HelveticaNeueBold", "HelveticaNeue-Bold", "Helvetica Neue Bold", "HelveticaNeue", "Helvetica Neue", "TeXGyreHerosCnBold", "Helvetica", "Tahoma", "Geneva", "Arial Narrow", "Arial", sans-serif;font-size:0.8em;background:#cfd7ff;display:inline-block;padding:2px 4px;border-radius:3px;margin-right:5px;vertical-align:top}.comments-container .comment-view-parent.comment-view-commentable{background:transparent;max-width:calc(100% - 100px);white-space:nowrap;overflow-x:hidden;text-overflow:ellipsis}.single-comment-node{padding:2px 0px 0px calc(1.1vw + 13px);text-align:left;margin-top:15px;font-size:17px;position:relative}.single-comment-node.root{padding:0px 0px 2px 0}@media screen and (min-width: 390px){.single-comment-node{font-size:20px}}.single-comment-node.flat-node{padding:0px;margin-top:-3px;margin-bottom:-3px}.single-comment-node.flat-node.root{padding:2px 0px;margin-top:0px}.single-comment-node.flat-node .inner-comment{border-top-left-radius:0px;border-top-right-radius:0px}.single-comment-node.flat-node button{margin-bottom:3px;z-index:7;position:relative}.single-comment-node .comment-deep-3{margin-top:-5px;padding:2px 0px 2px calc(0.9vw + 7px)}.single-comment-node .comment-deep-3 button{margin-bottom:3px;z-index:8;position:relative}.single-comment-node .permalink{width:40px;position:absolute;right:2px;margin-top:calc(0.4vw + 12px);text-align:center;opacity:0.9}.single-comment-node .permalink img{width:14px}.single-comment-node .permalink:hover{opacity:1}.single-comment-node .low-quality-comment-marker{font-size:0.66em;padding:6px 13px;background:#f5f6f7;background:var(--theme-container-accent-background, #f5f6f7);font-weight:bold;border-bottom:1px solid #dbdbdb}.single-comment-node .low-quality-comment-marker a{background:#a2ede5;color:#0a0a0a;padding:1px 5px 3px;border-radius:3px;vertical-align:-1px;margin-left:3px}.single-comment-node .low-quality-comment-marker img{height:22px;width:22px;border-radius:100px;border:2px solid #666666;vertical-align:-0.6em;margin-right:2px}.single-comment-node .low-quality-comment{opacity:0.5}.single-comment-node .body{padding:1px;padding-left:1.5%;padding-right:1.5%;padding-bottom:5px;margin:0;width:96%;font-size:0.95em;line-height:1.35em;overflow:hidden;margin-bottom:-28px;word-wrap:break-word;font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";position:relative;margin-left:1px}.single-comment-node .body h1,.single-comment-node .body h2,.single-comment-node .body h3,.single-comment-node .body h4,.single-comment-node .body h5,.single-comment-node .body h6{padding:0px;margin:4px 0px calc(1.1vw + 10px);font-size:1em;font-weight:600}.single-comment-node .body h1{font-size:1.3em}.single-comment-node .body p{padding:0px;margin:4px 0px calc(1.1vw + 10px)}.single-comment-node .body ul,.single-comment-node .body ol{padding-left:6px;margin:0.8em 0.7em 0.8em 1em}.single-comment-node .body ul{list-style-type:square}.single-comment-node .body li{margin:3px 0px calc(0.5vw + 5px)}.single-comment-node .body blockquote{border-left:calc(0.2vw + 2px) solid #333;padding:0.1% 3% 0.1% 2%;margin:1.6em 1vw;font-size:0.92em;line-height:1.4em}.single-comment-node .body blockquote p{padding:0;margin:0.95em 0 0.95em}.single-comment-node .body blockquote.twitter-tweet{background:white;max-width:480px;min-height:135px;border:1px solid #e9eef2;font-size:17px;line-height:20px;border-radius:5px;margin-top:10px;padding:10px}.single-comment-node .body .edited-notification{color:#999999;font-size:0.7em;padding:3px 0px 0px;position:relative;z-index:1}.single-comment-node .body code{margin:auto;white-space:nowrap;padding:1px 5px 0px;border-radius:2px;font-size:0.8em;display:inline-block;vertical-align:0.1em;max-width:100%;line-height:1.4em}.single-comment-node .body pre{width:88%;margin-left:-3%;margin-left:0px;padding-left:4%;padding-right:7%;padding-top:6%;padding-bottom:6%;overflow-wrap:normal}.single-comment-node .body pre code{background:#29292e;color:#eff0f9;white-space:pre;font-size:1em}.single-comment-node .body img{max-width:100%}.single-comment-node .body .table-wrapper-paragraph{width:100%;margin-left:0%;overflow-x:auto}.single-comment-node .body a.anchor{padding-top:50px;margin-top:-50px;-webkit-background-clip:content-box;background-clip:content-box}.single-comment-node .icon-img{height:16px;width:16px;margin-right:0px;opacity:0.7}.single-comment-node .details{padding:0px;border-top-left-radius:3px;border-top-left-radius:3px;color:#333333;color:var(--theme-secondary-color, #333);position:relative}.single-comment-node .details .comment-date{border:none;position:absolute;top:calc(14px - 0.25vw);right:calc(35px + 0.2vw);font-size:12px;text-align:right}.single-comment-node .details .comment-date a{color:#666666;color:var(--theme-secondary-color, #666)}.single-comment-node .details .dropbtn{border:none;cursor:pointer;position:absolute;top:calc(0.3vw + 13px);right:10px}.single-comment-node .details .dropdown{position:absolute;top:40px;right:10px;display:inline-block}.single-comment-node .details .dropdown .dropdown-content{display:none;position:absolute;right:0;border:1px solid #dbdbdb;border-radius:3px;background:white;z-index:20;width:130px;box-shadow:1px 2px 4px 0 rgba(0,0,0,0.18)}.single-comment-node .details .dropdown .dropdown-content.showing{display:block}.single-comment-node .details .dropdown .dropdown-content a{color:black;padding:12px 16px;width:98px;height:14px;font-weight:bold;display:block;font-size:14px;white-space:nowrap}.single-comment-node .details .dropdown .dropdown-content a:hover{background-color:#f1f1f1}.single-comment-node .details .dropdown .dropdown-icon{position:absolute;left:10px;top:7px;padding:4px;max-width:15px;max-height:15px}.single-comment-node .details img.profile-pic{height:33px;width:33px;border-radius:50px;margin:1.5% 0.2% 1.5% 1.5%}.single-comment-node .details .comment-username{vertical-align:calc(0.62vw + 13px)}.single-comment-node .details .comment-username-inner{vertical-align:middle;display:inline-block;white-space:nowrap;overflow-x:hidden;text-overflow:ellipsis;max-width:calc(60% - 20px)}.single-comment-node .details .icon-img{vertical-align:calc(0.7vw + 9px);margin-left:2px}.single-comment-node .details .op-marker{display:none}@media screen and (min-width: 580px){.single-comment-node .details .op-marker{display:inline-block;vertical-align:calc(0.7vw + 12px);background:#cfd7ff;color:#0a0a0a;padding:2px 6px 2px;margin-left:0.3vw;font-family:"HelveticaNeue-CondensedBold", "HelveticaNeueBoldCondensed", "HelveticaNeue-Bold-Condensed", "Helvetica Neue Bold Condensed", "HelveticaNeueBold", "HelveticaNeue-Bold", "Helvetica Neue Bold", "HelveticaNeue", "Helvetica Neue", "TeXGyreHerosCnBold", "Helvetica", "Tahoma", "Geneva", "Arial Narrow", "Arial", sans-serif;font-stretch:condensed;font-size:0.78em;border-radius:3px}}.single-comment-node .details a{color:#3b3b3b;color:var(--theme-secondary-color, #3b3b3b)}.single-comment-node .reaction-button,.single-comment-node .dropbtn{border:0px;background:transparent;cursor:pointer;border-radius:3px;height:32px;display:block;padding:0px;margin-left:2px;position:relative;margin-top:calc(-0.6vw - 4px);z-index:8;position:relative}.single-comment-node .reaction-button.reaction-button,.single-comment-node .dropbtn.reaction-button{padding-right:25px;padding-top:4px;margin-top:0px;height:25px}.single-comment-node .reaction-button .reactions-count,.single-comment-node .dropbtn .reactions-count{font-size:calc(0.9em + 0.1vw);background:#f5f6f7;padding:1px 5px;border-radius:3px;border:1px solid #d9dde0;margin-left:1px;position:absolute;top:8px;left:24px}.single-comment-node .reaction-button img,.single-comment-node .dropbtn img{height:21px;width:21px;opacity:0.62;left:0px}.single-comment-node .reaction-button img.dropdown-icon,.single-comment-node .dropbtn img.dropdown-icon{height:18px;width:18px}.single-comment-node .reaction-button:hover img,.single-comment-node .dropbtn:hover img{opacity:1}.single-comment-node .reaction-button .voted-heart,.single-comment-node .dropbtn .voted-heart{display:none;vertical-align:0px;margin-left:0px;height:22px;width:22px;opacity:0.9}.single-comment-node .reaction-button .voted-heart:hover,.single-comment-node .dropbtn .voted-heart:hover{opacity:1}@media screen and (min-width: 390px){.single-comment-node .reaction-button,.single-comment-node .dropbtn{vertical-align:-7px}}.single-comment-node .reaction-button.reacted,.single-comment-node .dropbtn.reacted{color:#66e2d5}.single-comment-node .reaction-button.reacted img,.single-comment-node .dropbtn.reacted img{display:none}.single-comment-node .reaction-button.reacted .voted-heart,.single-comment-node .dropbtn.reacted .voted-heart{display:inline-block}.single-comment-node .reaction-button.reacted .reactions-count,.single-comment-node .dropbtn.reacted .reactions-count{color:#0a0a0a;font-weight:500}.single-comment-node img.icon-image{height:20px}.single-comment-node .editor-image-upload{width:initial;text-align:left}.single-comment-node .editor-image-upload .uploaded-image{width:calc(93% - 54px)}.single-comment-node .editor-image-upload .image-upload-button{padding:5px 2px 0px;margin-left:3px}@media screen and (min-width: 500px){.single-comment-node .editor-image-upload .uploaded-image{width:calc(94% - 62px)}}.single-comment-node .actions{font-size:0.8em;padding:0.3em 0.6em 0.3em 0.4em;text-align:right;position:relative;min-height:1.2em;z-index:5;font-family:"HelveticaNeue-CondensedBold", "HelveticaNeueBoldCondensed", "HelveticaNeue-Bold-Condensed", "Helvetica Neue Bold Condensed", "HelveticaNeueBold", "HelveticaNeue-Bold", "Helvetica Neue Bold", "HelveticaNeue", "Helvetica Neue", "TeXGyreHerosCnBold", "Helvetica", "Tahoma", "Geneva", "Arial Narrow", "Arial", sans-serif;font-stretch:condensed;width:calc(100% - 74px);margin-left:58px}.single-comment-node .actions a.thread-indication{color:#9e9e9e;font-size:0.8em;cursor:default}.single-comment-node .actions a.thread-indication:hover{opacity:1}.single-comment-node .actions a.register-now-cta{font-size:1.4em;background:#fffdc4;border:1px solid #fdf73b;box-shadow:5px 6px 0px #fdf73b;color:#0a0a0a;padding:5px 10px;margin-right:8px;vertical-align:20px;line-height:1.8em}.single-comment-node .actions .current-user-actions .hidden{display:none}.single-comment-node .actions .current-user-actions a{margin-right:10px;display:inline-block;color:#666666}.single-comment-node .actions form{margin-bottom:-5px;margin-top:-7px;z-index:29;position:relative;width:calc(100% + 60px);margin-left:-58px}.single-comment-node .actions form.submitting input[type='submit']{background:#0045ff}.single-comment-node .actions form.submitting textarea{color:#737373}.single-comment-node .actions form input[type='submit']{padding:5px 8px;margin-bottom:5px;margin-right:7px}.single-comment-node .actions form .cancel{margin-right:5px;color:#ff0000;opacity:0.5;vertical-align:-1px;font-size:0.9em}.single-comment-node .actions form .cancel:hover{opacity:0.8}.single-comment-node .inner-comment{padding:0px;border:1px solid #dbdbdb;background:#fff;background:var(--theme-container-background, #fff)}.single-comment-node .inner-comment.comment-created-via-fetch{-webkit-animation:comment-create 1.2s;animation:comment-create 1.2s}.single-comment-node .inner-comment.comment-created-via-fetch .body{background-color:transparent}.single-comment-node .comment-read-more{background:#66e2d5 !important;padding:3px 6px;display:block;width:250px;text-align:center;margin:auto;border-radius:3px;margin-bottom:20px;font-weight:bold}.single-comment-node .comment-read-more:hover{opacity:1;background:#7be6db !important}@-webkit-keyframes fadein{0%{opacity:0.5;height:21px;width:18px}100%{opacity:1;height:25px;width:22px}}@keyframes fadein{0%{opacity:0.5;height:21px;width:18px}100%{opacity:1;height:25px;width:22px}}@-webkit-keyframes comment-create{from{background-color:#e7faf8}to{background-color:#fff;background-color:var(--theme-container-background, #fff)}}@keyframes comment-create{from{background-color:#e7faf8}to{background-color:#fff;background-color:var(--theme-container-background, #fff)}}

      body.night-theme .on-page-nav-butt img,body.night-theme .icon-img,body.night-theme .dropdown-icon,body.night-theme .reaction-button:not(.reacted) img,body.night-theme .image-upload-button button,body.night-theme .icon-image,body.night-theme .dev-badge,body.night-theme .chatchannels__config img,body.night-theme .external-link-img,body.night-theme .group-img{-webkit-filter:invert(95%);filter:invert(95%)}body.night-theme .ltag__tag{border-color:white !important;box-shadow:3px 3px 0px #fff !important}body.night-theme .partner-image-dark-mode{display:block !important}body.night-theme .partner-image-light-mode{display:none !important}body.sans-serif-article-body .body{font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"}body.sans-serif-article-body .body p{font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";font-size:0.98em}body.comic-sans-article-body .body{font-family:"Comic Sans MS", cursive, sans-serif}body.comic-sans-article-body .body p{font-family:"Comic Sans MS", cursive, sans-serif;font-size:0.98em}.more-articles{padding:20px 0px;vertical-align:top;text-align:center;font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";margin:40px auto}@media screen and (min-width: 1250px){.more-articles{margin-left:25px}}.more-articles a{color:#0a0a0a;color:var(--theme-color, #0a0a0a)}.more-articles .single-other-article{width:94%;display:inline-block;max-width:94%;margin:auto;padding:10px;vertical-align:top;text-align:left}@media screen and (min-width: 680px){.more-articles .single-other-article{width:calc(50% - 40px);margin-bottom:25px}}.more-articles .single-other-article:hover{background:#f5f6f7;background:var(--theme-container-background-hover, #f5f6f7)}.more-articles .single-other-article .picture{height:60px;width:60px;background-size:cover;display:inline-block}.more-articles .single-other-article .picture img,.more-articles .single-other-article .picture .color{width:100%;height:100%;border-radius:100px}.more-articles .single-other-article .content{display:inline-block;width:calc(100% - 70px);padding-left:4px;min-height:60px;vertical-align:top;font-size:0.8em}@media screen and (min-width: 480px){.more-articles .single-other-article .content{font-size:1em}}.more-articles .single-other-article h3{margin:0px 0px 5px;padding:0px;font-size:1.4em;font-weight:500}.more-articles .single-other-article h4{margin:0;font-weight:500;color:#707070;color:var(--theme-secondary-color, #707070);font-size:1em}@media screen and (min-width: 480px){.more-articles .single-other-article h4{font-size:0.88em}}.more-articles .single-other-article h4 a{color:#696767}.more-articles .single-other-article hr{width:100%;border:0;height:0;border-top:1px solid rgba(0,0,0,0.1);border-bottom:1px solid rgba(255,255,255,0.5);margin-bottom:8px}.more-articles .single-other-article p{margin:7px 0px;line-height:24px}.show-page-content-display{vertical-align:top;font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";margin:20px auto;position:relative;overflow:hidden}@media screen and (min-width: 1250px){.show-page-content-display{margin-left:25px}}.show-page-content-display a{color:#0a0a0a;color:var(--theme-container-color, #0a0a0a)}.show-page-content-display .content-classification{margin:15px 20px -8px;text-align:left;font-size:0.8em}@media screen and (min-width: 680px){.show-page-content-display .content-classification{margin:15px 20px 0px}}.show-page-content-display .content-classification .content-classification-text{display:inline-block;padding:3px 25px;border-radius:3px;background:#f5f6f7;background:var(--theme-container-accent-background, #f5f6f7);color:#0a0a0a;color:var(--theme-color, #0a0a0a)}.show-page-content-display .main-content-display{padding:20px 0px;width:calc(98% - 60px);padding:30px;margin-bottom:10px}@media screen and (min-width: 680px){.show-page-content-display .main-content-display{float:left;width:calc(97% - 345px);border-right:2px solid #dbdbdb;margin-left:3%;padding:15px 25px 35px 15px;margin-bottom:35px}}.show-page-content-display .main-content-display h2{margin:0px auto 10px;font-size:1.55em}@media screen and (min-width: 680px){.show-page-content-display .main-content-display h2{font-size:2.2em}}.show-page-content-display .main-content-display .content-author img{border-radius:100%;width:28px;vertical-align:-7px;margin-right:3px}.show-page-content-display .main-content-display .content-author a{color:#666666}.show-page-content-display .main-content-display p{margin-bottom:30px}.show-page-content-display .main-content-display .cta{width:100px;padding:7px 9px;padding:3px 3px;margin-top:10px;margin-right:3px;display:inline-block;font-size:0.95em}@media screen and (min-width: 680px){.show-page-content-display .main-content-display .cta{font-size:1.2em;padding:7px 20px}}.show-page-content-display .main-content-display .engagement-count{font-family:"HelveticaNeue-CondensedBold", "HelveticaNeueBoldCondensed", "HelveticaNeue-Bold-Condensed", "Helvetica Neue Bold Condensed", "HelveticaNeueBold", "HelveticaNeue-Bold", "Helvetica Neue Bold", "HelveticaNeue", "Helvetica Neue", "TeXGyreHerosCnBold", "Helvetica", "Tahoma", "Geneva", "Arial Narrow", "Arial", sans-serif;color:#666666;margin-top:-18px;margin-bottom:-25px}.show-page-content-display .main-content-display .engagement-count img{height:20px;min-width:27px;vertical-align:-3px;margin-right:3px}.show-page-content-display .main-content-display .engagement-count img.comments-bubble{margin-left:10px}.show-page-content-display .main-content-display .bookmark-engage{font-family:"HelveticaNeue-CondensedBold", "HelveticaNeueBoldCondensed", "HelveticaNeue-Bold-Condensed", "Helvetica Neue Bold Condensed", "HelveticaNeueBold", "HelveticaNeue-Bold", "Helvetica Neue Bold", "HelveticaNeue", "Helvetica Neue", "TeXGyreHerosCnBold", "Helvetica", "Tahoma", "Geneva", "Arial Narrow", "Arial", sans-serif;background:#4a69ff;color:white;letter-spacing:1px;border:0px;padding:7px 8px;margin-top:10px;font-size:0.95em}@media screen and (min-width: 680px){.show-page-content-display .main-content-display .bookmark-engage{font-size:1.2em;padding:7px 16px}}.show-page-content-display .main-content-display .bookmark-engage .bm-success{display:none}.show-page-content-display .main-content-display .bookmark-engage.selected{background:white;color:#4a69ff}.show-page-content-display .main-content-display .bookmark-engage.selected .bm-success{display:inline-block}.show-page-content-display .main-content-display .bookmark-engage.selected .bm-success img{width:18px;vertical-align:-2px}.show-page-content-display .main-content-display .bookmark-engage.selected .bm-initial{display:none}.show-page-content-display .secondary-content-display{display:none;float:left;width:280px;text-align:center;padding:10px 0px 30px}@media screen and (min-width: 680px){.show-page-content-display .secondary-content-display{display:block}}.show-page-content-display .secondary-content-display .profile-pic-wrapper{width:110px;height:110px;border-radius:100%;margin:auto}.show-page-content-display .secondary-content-display .profile-pic-wrapper.wide-profile-image-wrapper{height:50px;width:150px;margin-top:50px;margin-bottom:10px}.show-page-content-display .secondary-content-display .profile-pic-wrapper img{vertical-align:middle}.show-page-content-display .secondary-content-display .profile-pic-wrapper img.profile-image{width:calc(100% - 8px);height:calc(100% - 8px);border-radius:100%}.show-page-content-display .secondary-content-display .profile-pic-wrapper img.wide-image{width:calc(100% - 8px)}.show-page-content-display .secondary-content-display .org-name{font-weight:bold;margin:10px auto;font-size:1.1em}.show-page-content-display .secondary-content-display .follow-action-button{background:#66e2d5;color:#0a0a0a;border:0;font-size:1.05em;border:0;padding:8px 6px;border-radius:3px;width:170px}

      div.highlight pre.highlight code{font-size:inherit;padding:0px}div.inner-comment div.body div.highlight pre.highlight{background:#29292e}div.inner-comment div.body div.highlight pre.highlight code{font-size:inherit;white-space:inherit;background:inherit;color:inherit}.highlight .hll{background-color:#49483e}.highlight{background:#29292e;color:#f8f8f2}.highlight .c{color:#75715e}.highlight .err{color:#960050;background-color:#1e0010}.highlight .k{color:#66d9ef}.highlight .l{color:#ae81ff}.highlight .n{color:#f8f8f2}.highlight .o{color:#f92672}.highlight .p{color:#f8f8f2}.highlight .ch{color:#75715e}.highlight .cm{color:#75715e}.highlight .cp{color:#75715e}.highlight .cpf{color:#75715e}.highlight .c1{color:#75715e}.highlight .cs{color:#75715e}.highlight .gd{color:#f92672}.highlight .ge{font-style:italic}.highlight .gi{color:#a6e22e}.highlight .gs{font-weight:bold}.highlight .gu{color:#75715e}.highlight .kc{color:#66d9ef}.highlight .kd{color:#66d9ef}.highlight .kn{color:#f92672}.highlight .kp{color:#66d9ef}.highlight .kr{color:#66d9ef}.highlight .kt{color:#66d9ef}.highlight .ld{color:#e6db74}.highlight .m{color:#ae81ff}.highlight .s{color:#e6db74}.highlight .na{color:#a6e22e}.highlight .nb{color:#f8f8f2}.highlight .nc{color:#a6e22e}.highlight .no{color:#66d9ef}.highlight .nd{color:#a6e22e}.highlight .ni{color:#f8f8f2}.highlight .ne{color:#a6e22e}.highlight .nf{color:#a6e22e}.highlight .nl{color:#f8f8f2}.highlight .nn{color:#f8f8f2}.highlight .nx{color:#a6e22e}.highlight .py{color:#f8f8f2}.highlight .nt{color:#f92672}.highlight .nv{color:#f8f8f2}.highlight .ow{color:#f92672}.highlight .w{color:#f8f8f2}.highlight .mb{color:#ae81ff}.highlight .mf{color:#ae81ff}.highlight .mh{color:#ae81ff}.highlight .mi{color:#ae81ff}.highlight .mo{color:#ae81ff}.highlight .sa{color:#e6db74}.highlight .sb{color:#e6db74}.highlight .sc{color:#e6db74}.highlight .dl{color:#e6db74}.highlight .sd{color:#e6db74}.highlight .s2{color:#e6db74}.highlight .se{color:#ae81ff}.highlight .sh{color:#e6db74}.highlight .si{color:#e6db74}.highlight .sx{color:#e6db74}.highlight .sr{color:#e6db74}.highlight .s1{color:#e6db74}.highlight .ss{color:#e6db74}.highlight .bp{color:#f8f8f2}.highlight .fm{color:#a6e22e}.highlight .vc{color:#f8f8f2}.highlight .vg{color:#f8f8f2}.highlight .vi{color:#f8f8f2}.highlight .vm{color:#f8f8f2}.highlight .il{color:#ae81ff}

      .ltag__replit br{line-height:0 !important;display:none !important}.ltag__replit iframe{margin:0 !important}body.night-theme .on-page-nav-butt img,body.night-theme .icon-img,body.night-theme .dropdown-icon,body.night-theme .reaction-button:not(.reacted) img,body.night-theme .image-upload-button button,body.night-theme .icon-image,body.night-theme .dev-badge,body.night-theme .chatchannels__config img,body.night-theme .external-link-img,body.night-theme .group-img{-webkit-filter:invert(95%);filter:invert(95%)}body.night-theme .ltag__tag{border-color:white !important;box-shadow:3px 3px 0px #fff !important}body.night-theme .partner-image-dark-mode{display:block !important}body.night-theme .partner-image-light-mode{display:none !important}body.sans-serif-article-body .body{font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"}body.sans-serif-article-body .body p{font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";font-size:0.98em}body.comic-sans-article-body .body{font-family:"Comic Sans MS", cursive, sans-serif}body.comic-sans-article-body .body p{font-family:"Comic Sans MS", cursive, sans-serif;font-size:0.98em}blockquote.ltag__twitter-tweet{font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";background:white;max-width:500px;font-size:0.75em;line-height:1.35em;border-radius:3px;margin:1.6em auto !important;min-height:60px;cursor:pointer;padding:0px !important;border:1px solid #dbdbdb !important;box-shadow:1px 2px 4px 0 rgba(0,0,0,0.18)}blockquote.ltag__twitter-tweet:hover{border:1px solid lightgray !important}blockquote.ltag__twitter-tweet a{color:#55acee}@media screen and (min-width: 360px){blockquote.ltag__twitter-tweet{min-height:105px}}blockquote.ltag__twitter-tweet .ltag__twitter-tweet__media{position:relative;overflow:hidden}blockquote.ltag__twitter-tweet .ltag__twitter-tweet__media img{width:100%;left:0;right:0;margin:auto;border-top-left-radius:3px;border-top-right-radius:3px}blockquote.ltag__twitter-tweet .ltag__twitter-tweet__media img.ltag__twitter-tweet__play-butt{width:70px;height:70px;margin:auto;position:absolute;top:0;left:0;bottom:0;right:0}blockquote.ltag__twitter-tweet .ltag__twitter-tweet__video{display:none}blockquote.ltag__twitter-tweet .ltag__twitter-tweet__video video{width:100%}blockquote.ltag__twitter-tweet .ltag__twitter-tweet__header{position:relative;height:45px}@media screen and (min-width: 360px){blockquote.ltag__twitter-tweet .ltag__twitter-tweet__header{height:52px}}blockquote.ltag__twitter-tweet .ltag__twitter-tweet__header .ltag__twitter-tweet__profile-image{height:36px;min-height:36px;width:36px;border-radius:50px;position:absolute;left:calc(0.3vw + 13px);top:calc(0.3vw + 13px);background-color:#ececec}blockquote.ltag__twitter-tweet .ltag__twitter-tweet__header .ltag__twitter-tweet__twitter-logo{position:absolute;right:calc(0.3vw + 8px);top:20px;left:auto}blockquote.ltag__twitter-tweet .ltag__twitter-tweet__header .ltag__twitter-tweet__twitter-logo img{height:24px;min-height:24px;max-width:24px;display:inline-block;width:36px;margin:auto}blockquote.ltag__twitter-tweet .ltag__twitter-tweet__header .ltag__twitter-tweet__full-name{color:#1c2022;position:absolute;left:calc(0.3vw + 57px);top:calc(0.3vw + 13px);font-weight:bold;font-size:16px}blockquote.ltag__twitter-tweet .ltag__twitter-tweet__header .ltag__twitter-tweet__username{position:absolute;left:calc(0.3vw + 57px);top:calc(0.3vw + 33px);color:#697882;font-size:14px}blockquote.ltag__twitter-tweet .ltag__twitter-tweet__body{color:#1c2022;font-size:16px;line-height:22px;padding:calc(0.3vw + 13px) calc(0.3vw + 13px) 0px}blockquote.ltag__twitter-tweet .ltag__twitter-tweet__body br{line-height:0 !important}blockquote.ltag__twitter-tweet .ltag__twitter-tweet__date{font-size:14px;color:#697882;margin-top:3px;padding:0px calc(0.3vw + 13px)}blockquote.ltag__twitter-tweet .ltag__twitter-tweet__quote{color:#1c2022;margin:calc(0.3vw + 13px) calc(0.3vw + 13px) 0px;padding:calc(0.2vw + 8px) calc(0.2vw + 8px);border:1px solid #dce3e8;border-radius:4px;font-size:15px;line-height:1.1em}blockquote.ltag__twitter-tweet .ltag__twitter-tweet__quote:hover{border:1px solid #a09dad}blockquote.ltag__twitter-tweet .ltag__twitter-tweet__quote .ltag__twitter-tweet__quote__header{padding:0 0 calc(0.05vw + 3px);font-size:0.9em}blockquote.ltag__twitter-tweet .ltag__twitter-tweet__quote .ltag__twitter-tweet__quote__header .ltag__twitter-tweet__quote__header__name{font-weight:bold;font-size:1.1em}blockquote.ltag__twitter-tweet .ltag__twitter-tweet__actions{margin:6px auto 0px;padding:0px calc(0.3vw + 13px) 5px;color:#aab8c2;font-size:14px}blockquote.ltag__twitter-tweet .ltag__twitter-tweet__actions .ltag__twitter-tweet__actions__button{width:18px;height:22px;display:inline-block;margin-left:20px;margin-right:2px;vertical-align:-7px}blockquote.ltag__twitter-tweet .ltag__twitter-tweet__actions .ltag__twitter-tweet__actions__button:first-child{margin-left:8px}blockquote.ltag__twitter-tweet .ltag__twitter-tweet__actions img{height:20px;min-height:20px}body.night-theme .on-page-nav-butt img,body.night-theme .icon-img,body.night-theme .dropdown-icon,body.night-theme .reaction-button:not(.reacted) img,body.night-theme .image-upload-button button,body.night-theme .icon-image,body.night-theme .dev-badge,body.night-theme .chatchannels__config img,body.night-theme .external-link-img,body.night-theme .group-img{-webkit-filter:invert(95%);filter:invert(95%)}body.night-theme .ltag__tag{border-color:white !important;box-shadow:3px 3px 0px #fff !important}body.night-theme .partner-image-dark-mode{display:block !important}body.night-theme .partner-image-light-mode{display:none !important}body.sans-serif-article-body .body{font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"}body.sans-serif-article-body .body p{font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";font-size:0.98em}body.comic-sans-article-body .body{font-family:"Comic Sans MS", cursive, sans-serif}body.comic-sans-article-body .body p{font-family:"Comic Sans MS", cursive, sans-serif;font-size:0.98em}.ltag_github-liquid-tag{margin:1.1em auto 1.30em;max-width:580px}.ltag_github-liquid-tag h1{font-size:1.05em !important;line-height:1.2em !important;margin:0 0 0.7em}@media screen and (min-width: 500px){.ltag_github-liquid-tag h1{word-wrap:break-word;margin-left:-20px;margin-bottom:10px}}.ltag_github-liquid-tag h1 a{color:#0a0a0a;color:var(--theme-color, #0a0a0a)}.ltag_github-liquid-tag h1 .issue-title{font-weight:normal}.ltag_github-liquid-tag h1 .issue-number{font-weight:300;color:#a3aab1;letter-spacing:-1px}.ltag_github-liquid-tag h1 img.github-logo{width:1.15em !important;max-width:1.1em !important;display:inline-block;left:0px;margin-right:0.3em;vertical-align:-0.18em;display:inline-block !important;margin-left:0 !important;left:0 !important;-webkit-filter:invert(0);filter:invert(0);-webkit-filter:var(--theme-social-icon-invert, invert(0));filter:var(--theme-social-icon-invert, invert(0))}.github-thread{font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";background-color:#fff;background-color:var(--theme-container-background, #fff);border:1px solid #d1d5da;box-shadow:1px 2px 4px 0 rgba(0,0,0,0.18);border-radius:3px;font-size:0.77em;line-height:1.15em;margin:0;width:98%;overflow:hidden}.github-thread .arrow-left-outer{display:none}@media screen and (min-width: 500px){.github-thread .arrow-left-outer{display:block;width:0;height:0;border-width:8px;border-color:transparent;border-style:solid solid outset;border-right-color:#d1d5da;content:" ";float:left;margin-left:-31px;margin-top:13px}}.github-thread .arrow-left-inner{display:none}@media screen and (min-width: 500px){.github-thread .arrow-left-inner{display:block;width:0;height:0;border-width:8px;border-color:transparent;border-style:solid solid outset;border-right-color:#f6f8fa;content:" ";float:left;margin-left:-30px;margin-top:13px}}.github-thread .timeline-comment-header{display:flex;background:#f6f8fa;background:var(--theme-container-background, #f6f8fa);border-bottom:1px solid #d1d5da;padding:0px 15px}@media screen and (min-width: 500px){.github-thread .timeline-comment-header{display:block}}.github-thread .timeline-comment-header img.github-liquid-tag-img{min-height:inherit;width:44px;height:44px;border-radius:3px;float:none;padding:10px 0 10px 12px;margin:inherit}@media screen and (min-width: 500px){.github-thread .timeline-comment-header img.github-liquid-tag-img{float:left;padding:0;margin-left:-75px}}.github-thread .timeline-comment-header-text{padding:10px 0px}.github-thread .timeline-comment-header-text a{color:#586069}.github-thread .timeline-comment-header-text a:hover{color:#586069;text-decoration:underline}.ltag-github-body{padding:1em 0.5em;font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";max-height:calc(21vw + 165px);overflow:hidden}@media screen and (min-width: 430px){.ltag-github-body{max-height:calc(20vw + 153px)}}@media screen and (min-width: 800px){.ltag-github-body{max-height:310px}}.ltag-github-body h1,.ltag-github-body h2,.ltag-github-body h3,.ltag-github-body h4,.ltag-github-body h5,.ltag-github-body h6{font-weight:500 !important}.ltag-github-body h1{margin-left:0;font-size:1.9em;padding-bottom:0.3em;border-bottom:1px solid #eaecef;margin-top:1em !important;margin-bottom:0.9em !important}.ltag-github-body h3{margin-top:1em !important;margin-bottom:0.9em !important;padding:0;font-size:1.2em;font-weight:600;line-height:1.25}.ltag-github-body h4{padding:0}.ltag-github-body *:first-child{margin-top:0 !important}.ltag-github-body *:last-child{margin-bottom:0 !important}.ltag-github-body img{left:inherit}.ltag-github-body blockquote{color:#6a737d;padding:0px 1em;border-left:0.25em solid #dfe2e5;margin:16px 0px}.ltag-github-body kbd{display:inline-block;padding:3px 5px;font-size:11px;line-height:10px;color:#444d56;vertical-align:middle;background-color:#fafbfc;background-color:var(--theme-container-background, #fafbfc);border:solid 1px #c6cbd1;border-bottom-color:#959da5;border-radius:3px;box-shadow:inset 0 -1px 0 #959da5}.ltag-github-body p{margin-top:0px;padding:0px;margin-bottom:15px}.ltag-github-body p a.github-user-link{color:#24292e;color:var(--theme-secondary-color, #24292e);font-weight:600;white-space:nowrap}.ltag-github-body p a.github-user-link:hover{color:#24292e;text-decoration:underline}.ltag-github-body code{border-radius:3px;padding:0.2em 5px 0px;margin:0px;font-family:"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace}.ltag-github-body pre{width:100% !important;margin:0px;color:black;background-color:#F6F8FA;padding:0}.ltag-github-body pre code{background-color:#F6F8FA;color:black;padding:0em 0px 0px !important;line-height:2em !important}.ltag-github-body .highlight pre,.ltag-github-body pre,.ltag-github-body pre code{padding:16px !important;overflow:auto !important;font-size:14px !important;margin-bottom:16px !important;background-color:#f7f7f7 !important;border-radius:3px !important;box-sizing:border-box !important;color:black !important;border-radius:3px !important;margin:0.95em 0 1.20em !important}.ltag-github-body .highlight{font-size:14px !important;margin-bottom:16px !important;border-radius:3px !important}.ltag-github-body b,.ltag-github-body strong{font-weight:600}.ltag-github-body .pl-c{color:#969896}.ltag-github-body .pl-c1,.ltag-github-body .pl-s .pl-v{color:#0086b3}.ltag-github-body .pl-e,.ltag-github-body .pl-en{color:#795da3}.ltag-github-body .pl-s .pl-s1,.ltag-github-body .pl-smi{color:#333}.ltag-github-body .pl-ent{color:#63a35c}.ltag-github-body .pl-k{color:#a71d5d}.ltag-github-body .pl-pds,.ltag-github-body .pl-s,.ltag-github-body .pl-s .pl-pse .pl-s1,.ltag-github-body .pl-sr,.ltag-github-body .pl-sr .pl-cce,.ltag-github-body .pl-sr .pl-sra,.ltag-github-body .pl-sr .pl-sre{color:#183691}.ltag-github-body .pl-v{color:#ed6a43}.ltag-github-body .pl-id{color:#b52a1d}.ltag-github-body .pl-ii{background-color:#b52a1d;color:#f8f8f8}.ltag-github-body .pl-sr .pl-cce{color:#63a35c;font-weight:bold}.ltag-github-body .pl-ml{color:#693a17}.ltag-github-body .pl-mh,.ltag-github-body .pl-mh .pl-en,.ltag-github-body .pl-ms{color:#1d3e81;font-weight:bold}.ltag-github-body .pl-mq{color:#008080}.ltag-github-body .pl-mi{color:#333;font-style:italic}.ltag-github-body .pl-mb{color:#333;font-weight:bold}.ltag-github-body .pl-md{background-color:#ffecec;color:#bd2c00}.ltag-github-body .pl-mi1{background-color:#eaffea;color:#55a532}.ltag-github-body .pl-mdr{color:#795da3;font-weight:bold}.ltag-github-body .pl-mo{color:#1d3e81}.gh-btn-container{text-align:center;padding:0.35em 0 1.35em;box-shadow:-0px -0px 60px 42px #fff;box-shadow:0px 0px 60px 42px var(--theme-container-background, #fff);position:relative;z-index:100}.gh-btn{color:#0366d6;background-color:#f1f8ff;border-radius:3px;line-height:20px;padding:0.25em 1.2em;opacity:.9;font-size:0.94em;font-weight:bold;border:1px solid #0366d6}.gh-btn:hover{opacity:1}body.night-theme .on-page-nav-butt img,body.night-theme .icon-img,body.night-theme .dropdown-icon,body.night-theme .reaction-button:not(.reacted) img,body.night-theme .image-upload-button button,body.night-theme .icon-image,body.night-theme .dev-badge,body.night-theme .chatchannels__config img,body.night-theme .external-link-img,body.night-theme .group-img{-webkit-filter:invert(95%);filter:invert(95%)}body.night-theme .ltag__tag{border-color:white !important;box-shadow:3px 3px 0px #fff !important}body.night-theme .partner-image-dark-mode{display:block !important}body.night-theme .partner-image-light-mode{display:none !important}body.sans-serif-article-body .body{font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"}body.sans-serif-article-body .body p{font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";font-size:0.98em}body.comic-sans-article-body .body{font-family:"Comic Sans MS", cursive, sans-serif}body.comic-sans-article-body .body p{font-family:"Comic Sans MS", cursive, sans-serif;font-size:0.98em}.liquid-comment{padding:0px;background:inherit;font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";margin:0.95em 0 1.20em;position:relative;border:1px solid #dbdbdb;border:1px solid var(--theme-color, #dbdbdb);box-shadow:1px 2px 4px 0 rgba(0,0,0,0.18);border-radius:3px}@media screen and (min-width: 760px){.liquid-comment{margin:0.95em auto;width:620px}}.liquid-comment .details{padding:0px;margin:13px;height:33px;border-top-left-radius:3px;border-top-left-radius:3px;color:#333333;display:flex}.liquid-comment .details img{left:inherit}.liquid-comment .details img.profile-pic{min-height:inherit;height:33px;width:33px;border-radius:100px;margin:0}.liquid-comment .details .icon-img{min-height:inherit;height:16px;width:16px;margin-right:0px;opacity:0.7}.liquid-comment .details .comment-date{border:none;position:absolute;top:calc(28px - 0.25vw);right:calc(5px + 0.1vw) !important;font-size:12px;text-align:right;display:block;width:100px}.liquid-comment .details .comment-date a{color:#666666;color:var(--theme-secondary-color, #666)}.liquid-comment .details a{color:#3b3b3b;color:var(--theme-secondary-color, #3b3b3b);line-height:initial;align-self:center;margin-right:6px}.liquid-comment .details a:last-child{align-self:baseline;position:absolute;right:5px}.liquid-comment .body{font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";color:#0a0a0a;color:var(--theme-color, #0a0a0a);font-size:0.95em;line-height:1.35em;overflow:hidden;margin:13px;word-wrap:break-word;width:auto;padding:0;margin-bottom:10px !important}.liquid-comment .body pre{width:auto;margin-left:0;padding:10px}.liquid-comment .body h1,.liquid-comment .body h2,.liquid-comment .body h3,.liquid-comment .body h4,.liquid-comment .body h5,.liquid-comment .body h6{padding:0px;margin:4px 0px calc(1.1vw + 10px);font-size:1em;font-weight:600}.liquid-comment .body h1{font-size:1.3em}.liquid-comment .body p{padding:0px;font-size:0.95em;margin:0 0 15px 0}.liquid-comment .body br{line-height:220%}.liquid-comment .body ul,.liquid-comment .body ol{padding-left:6px;margin:0.8em 0.7em 0.8em 1em}.liquid-comment .body ul{list-style-type:square}.liquid-comment .body li{margin:3px 0px calc(0.5vw + 5px)}.liquid-comment .body blockquote{border-left:calc(0.2vw + 2px) solid #333;padding:0.1% 3% 0.1% 2%;margin:1.6em 1vw;font-size:0.92em;line-height:1.4em}.liquid-comment .body blockquote p{padding:0;margin:0.95em 0 0.95em}.liquid-comment .body blockquote.twitter-tweet{font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";background:white;max-width:480px;min-height:135px;border:1px solid #e9eef2;font-size:17px;line-height:20px;border-radius:5px;margin-top:10px;padding:10px}.liquid-comment .body .edited-notification{color:#999999;font-size:0.7em;padding:3px 0px 0px;position:relative;z-index:1}.liquid-comment .body code{margin:auto;white-space:nowrap;background:#f9f9fa;background:var(--theme-background, #f9f9fa);padding:1px 5px 0px;border-radius:2px;color:#333842;font-size:0.8em;display:inline-block;vertical-align:0.1em;max-width:100%;line-height:1.4em}.liquid-comment .body img{max-width:100%}.liquid-comment .body button{border:0px;background:transparent;vertical-align:2px;cursor:pointer;border-radius:3px;display:block;padding:0px;position:relative;z-index:6}.liquid-comment .body button img{left:inherit;min-height:0px;height:16px;opacity:0.62}.liquid-comment .body button:hover img{opacity:1}.liquid-comment .body button .voted-heart{display:none;font-size:22px;line-height:21px;vertical-align:-2px}@media screen and (min-width: 390px){.liquid-comment .body button{vertical-align:-7px}}.liquid-comment .body button.reacted{color:#66e2d5}.liquid-comment .body button.reacted img{display:none}.liquid-comment .body button.reacted .voted-heart{display:inline-block}body.night-theme .on-page-nav-butt img,body.night-theme .icon-img,body.night-theme .dropdown-icon,body.night-theme .reaction-button:not(.reacted) img,body.night-theme .image-upload-button button,body.night-theme .icon-image,body.night-theme .dev-badge,body.night-theme .chatchannels__config img,body.night-theme .external-link-img,body.night-theme .group-img{-webkit-filter:invert(95%);filter:invert(95%)}body.night-theme .ltag__tag{border-color:white !important;box-shadow:3px 3px 0px #fff !important}body.night-theme .partner-image-dark-mode{display:block !important}body.night-theme .partner-image-light-mode{display:none !important}body.sans-serif-article-body .body{font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"}body.sans-serif-article-body .body p{font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";font-size:0.98em}body.comic-sans-article-body .body{font-family:"Comic Sans MS", cursive, sans-serif}body.comic-sans-article-body .body p{font-family:"Comic Sans MS", cursive, sans-serif;font-size:0.98em}.ltag__link__link{color:#0a0a0a !important;color:var(--theme-color, #0a0a0a) !important}.ltag__link__link:active{opacity:0.7}.ltag__link{font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";border:1px solid #dbdbdb;box-shadow:1px 2px 4px 0 rgba(0,0,0,0.18);border-radius:3px;display:block;margin:0.95em 0 1.20em;max-width:100%}@media screen and (min-width: 760px){.ltag__link{margin:0.95em auto;width:620px}}.ltag__link .video-image{position:relative;padding-top:56%;border-top-left-radius:3px;border-top-right-radius:3px;background:#0a0a0a no-repeat center center;background-size:cover;display:block}.ltag__link .video-timestamp{position:absolute;font-size:12px;bottom:6px;right:5px;background-color:rgba(0,0,0,0.8);color:#ffffff;padding:0px 5px 0px;font-weight:500;border-radius:3px;display:block;line-height:20px}.ltag__link .video-timestamp img{height:14px;width:14px;display:inline-block;vertical-align:-2px;padding-left:5px}.ltag__link .ltag__link__pic{display:inline-block;padding:calc(0.4vw + 8px) calc(0.8vw + 8px);padding-right:8px}.ltag__link .ltag__link__pic img{width:calc(2.2vw + 45px);height:calc(2.2vw + 45px);margin:auto auto !important;border-radius:150px}.ltag__link .ltag__link__content{display:inline-block;vertical-align:top;padding:calc(0.5vw + 6px);padding-left:0;width:calc(100% - 5vw - 70px)}.ltag__link .ltag__link__content h2{margin:0;padding:0;font-weight:500;font-size:1.5em}.ltag__link .ltag__link__content h3{margin:0.1vw 0;padding:0;font-size:0.7em;margin-bottom:0;font-weight:bold;color:#666666;color:var(--theme-secondary-color, #666)}.ltag__link .ltag__link__content h3 a{color:#666666;color:var(--theme-secondary-color, #0a0a0a)}.ltag__link .ltag__link__content .ltag__link__taglist{margin:0;padding:0;line-height:1;font-size:0.88em;margin-bottom:5px}.ltag__link .ltag__link__content .ltag__link__tag{margin-right:calc(0.4vw + 4px);font-size:0.8em;margin-left:1px}.ltag__link .ltag__link__content .ltag__link__servicename{color:#666666;color:var(--theme-secondary-color, #666);font-size:0.7em}.ltag__link .ltag__link__content .ltag__link__servicename img{vertical-align:-5px;height:1.5em;width:1.5em;display:inline-block;margin-left:2px}.single-comment-node .ltag__link{width:100%;margin:0.95em 0 1.20em}.single-comment-node .ltag__link .ltag__link__pic{padding-top:calc(0.5vw + 12px)}.single-comment-node .ltag__link .ltag__link__pic img{width:calc(2.5vw + 40px)}.single-comment-node .ltag__link .ltag__link__content h2{font-size:calc(1.05em + 0.7vw) !important;margin-top:0em !important;margin-bottom:0.4em !important;font-weight:400 !important;line-height:1.22em !important}.single-comment-node .ltag__link .ltag__link__content h3{margin-bottom:0.4em !important;font-size:calc(0.8em + 0.5vw) !important;font-weight:400 !important}body.night-theme .on-page-nav-butt img,body.night-theme .icon-img,body.night-theme .dropdown-icon,body.night-theme .reaction-button:not(.reacted) img,body.night-theme .image-upload-button button,body.night-theme .icon-image,body.night-theme .dev-badge,body.night-theme .chatchannels__config img,body.night-theme .external-link-img,body.night-theme .group-img{-webkit-filter:invert(95%);filter:invert(95%)}body.night-theme .ltag__tag{border-color:white !important;box-shadow:3px 3px 0px #fff !important}body.night-theme .partner-image-dark-mode{display:block !important}body.night-theme .partner-image-light-mode{display:none !important}body.sans-serif-article-body .body{font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"}body.sans-serif-article-body .body p{font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";font-size:0.98em}body.comic-sans-article-body .body{font-family:"Comic Sans MS", cursive, sans-serif}body.comic-sans-article-body .body p{font-family:"Comic Sans MS", cursive, sans-serif;font-size:0.98em}.podcastliquidtag{padding:0px;margin-bottom:20px;margin-top:90px;border-radius:3px;font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";position:relative;display:flex;flex-direction:column-reverse;justify-content:flex-end;box-shadow:0px 0px 6px rgba(0,0,0,0.5)}@media screen and (min-width: 830px){.podcastliquidtag{flex-direction:row-reverse;margin:20px 0}}.podcastliquidtag .podcastliquidtag__info{color:white;font-weight:300;margin:-5px 15px}@media screen and (min-width: 830px){.podcastliquidtag .podcastliquidtag__info{margin:20px 15px;width:77%}}.podcastliquidtag .podcastliquidtag__info a{color:white}.podcastliquidtag .podcastliquidtag__info a .tinyimage{width:22px;height:22px;border-radius:100%;margin-right:10px;left:0;float:left}.podcastliquidtag .podcastliquidtag__info a:hover{color:white}.podcastliquidtag .podcastliquidtag__info h1{margin:0px 0px 15px 0px;font-weight:inherit;padding:0}.podcastliquidtag .podcastliquidtag__info .podcastliquidtag__info__episodetitle{font-size:calc(1.8vw + 19px)}.podcastliquidtag .podcastliquidtag__info .podcastliquidtag__info__podcasttitle{font-size:calc(1vw + 14px)}.podcastliquidtag .podcastliquidtag__info .podcastliquidtag__links{display:flex;flex-direction:row;font-size:14px}.podcastliquidtag .podcastliquidtag__info .podcastliquidtag__links a{margin-right:10px;background-color:#292e34;color:white;border-radius:3px;font-size:13px;font-weight:400;width:100px;border:1px solid #3c5163;box-shadow:inset 1px 1px 0 #485f74;transition:background-color 250ms ease;text-align:center}.podcastliquidtag .podcastliquidtag__info .podcastliquidtag__links a:hover{background-color:#202429}.podcastliquidtag .podcastliquidtag__info .podcastliquidtag__links a img{display:inline;width:16px;height:16px;left:0;margin-right:5px;vertical-align:middle}.podcastliquidtag .podcastliquidtag__info .podcastliquidtag__links a .service-name{display:none}@media screen and (min-width: 630px){.podcastliquidtag .podcastliquidtag__info .podcastliquidtag__links a .service-name{display:inline-block}}.podcastliquidtag .podcastliquidtag__record{position:relative;margin:20px 20px;height:70px;-webkit-transform:translateY(-33px);transform:translateY(-33px)}@media screen and (min-width: 830px){.podcastliquidtag .podcastliquidtag__record{width:15%;height:inherit;-webkit-transform:none;transform:none}}.podcastliquidtag .podcastliquidtag__record:hover{cursor:pointer}.podcastliquidtag .podcastliquidtag__record img{max-width:100%}.podcastliquidtag .podcastliquidtag__record .pause-butt{display:none}.podcastliquidtag .podcastliquidtag__record .podcastliquidtag__podcastimage{border-radius:100%;position:absolute;z-index:1;top:0;bottom:0;left:0;right:0;box-shadow:0px 0px 40px rgba(0,0,0,0.5);height:130px}@media screen and (min-width: 830px){.podcastliquidtag .podcastliquidtag__record .podcastliquidtag__podcastimage{height:inherit}}.podcastliquidtag .podcastliquidtag__record .button{position:absolute;height:115px;z-index:2;top:0;bottom:0;left:0;right:0}@media screen and (min-width: 830px){.podcastliquidtag .podcastliquidtag__record .button{height:75px}}.podcastliquidtag .playing .play-butt{display:none}.podcastliquidtag .playing .pause-butt{display:block}.podcastliquidtag .playing .podcastliquidtag__podcastimage{-webkit-animation:spin 20s linear infinite;animation:spin 20s linear infinite;-webkit-backface-visibility:hidden}@-webkit-keyframes spin{100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes spin{100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}body.night-theme .on-page-nav-butt img,body.night-theme .icon-img,body.night-theme .dropdown-icon,body.night-theme .reaction-button:not(.reacted) img,body.night-theme .image-upload-button button,body.night-theme .icon-image,body.night-theme .dev-badge,body.night-theme .chatchannels__config img,body.night-theme .external-link-img,body.night-theme .group-img{-webkit-filter:invert(95%);filter:invert(95%)}body.night-theme .ltag__tag{border-color:white !important;box-shadow:3px 3px 0px #fff !important}body.night-theme .partner-image-dark-mode{display:block !important}body.night-theme .partner-image-light-mode{display:none !important}body.sans-serif-article-body .body{font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"}body.sans-serif-article-body .body p{font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";font-size:0.98em}body.comic-sans-article-body .body{font-family:"Comic Sans MS", cursive, sans-serif}body.comic-sans-article-body .body p{font-family:"Comic Sans MS", cursive, sans-serif;font-size:0.98em}.ltag__user__link{color:#0a0a0a;color:var(--theme-color, #0a0a0a)}.ltag__user__link:active{opacity:0.7}.ltag__user__link.profile-image-link:hover{opacity:1}.ltag__user__link.profile-image-link:active{opacity:1}.ltag__user{font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";border:1px solid #dbdbdb;box-shadow:1px 1px 0px #c2c2c2;box-shadow:var(--theme-container-box-shadow, 1px 1px 0px #c2c2c2);border-radius:3px;display:block;margin:0.95em 0 1.2em;position:relative;overflow:hidden}@media screen and (min-width: 760px){.ltag__user{margin:0.95em auto;width:620px}}.ltag__user .ltag__user__pic{display:inline-block;padding:calc(0.6vw + 8px);padding-right:8px}.ltag__user .ltag__user__pic img{width:calc(5vw + 30px);height:calc(5vw + 30px);margin:auto auto !important;border-radius:50%}.ltag__user .ltag__user__content{display:inline-block;vertical-align:top;padding:calc(0.5vw + 6px);padding-left:0;width:calc(100% - 8vw - 60px)}.ltag__user .ltag__user__content h2{margin:0;padding:0;font-weight:500}.ltag__user .ltag__user__content h2 .follow-action-button{visibility:hidden;min-height:25px;display:inline-block;color:white;background:#66e2d5;border-radius:5px;font-size:0.6em;vertical-align:0.3em;padding:2px 20px;border:1px solid #66e2d5;margin:0.2em 0.5em;cursor:pointer}.ltag__user .ltag__user__content h2 .follow-action-button.following-butt{background:#66e2d5;color:white}.ltag__user .ltag__user__content h2 .follow-action-button.showing{visibility:visible}.ltag__user .ltag__user__content .ltag__user__social{margin:2px 0px;padding-left:0px;line-height:22px;font-size:0.75em}.ltag__user .ltag__user__content .ltag__user__social a{color:#666666;color:var(--theme-secondary-color, #666);margin-right:10px;display:inline-block}.ltag__user .ltag__user__content .ltag__user__social a .icon-img{float:left;width:15px;height:15px;border-radius:3px;vertical-align:-2px;margin:3px 0;opacity:0.7;background:transparent;background:var(--theme-secondary-color, transparent)}.ltag__user .ltag__user__content .ltag__user__summary{margin:0.3em 0;padding:0;font-size:0.889em;margin-bottom:0;line-height:1.2em;opacity:0.85}.ltag__user .ltag__user__content .ltag__user__taglist{margin:1em 0px;padding:0px;line-height:1;font-size:0.8em;opacity:0.7}.ltag__user .ltag__user__content .ltag__user__taglist a{color:#0a0a0a;margin-right:1em;display:inline-block;height:30px}.ltag__user .ltag__user__content .ltag__user__taglist img{display:inline-block !important;width:1em !important;height:1em !important;margin-right:2px;vertical-align:-0.1em;left:0px}body.night-theme .on-page-nav-butt img,body.night-theme .icon-img,body.night-theme .dropdown-icon,body.night-theme .reaction-button:not(.reacted) img,body.night-theme .image-upload-button button,body.night-theme .icon-image,body.night-theme .dev-badge,body.night-theme .chatchannels__config img,body.night-theme .external-link-img,body.night-theme .group-img{-webkit-filter:invert(95%);filter:invert(95%)}body.night-theme .ltag__tag{border-color:white !important;box-shadow:3px 3px 0px #fff !important}body.night-theme .partner-image-dark-mode{display:block !important}body.night-theme .partner-image-light-mode{display:none !important}body.sans-serif-article-body .body{font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"}body.sans-serif-article-body .body p{font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";font-size:0.98em}body.comic-sans-article-body .body{font-family:"Comic Sans MS", cursive, sans-serif}body.comic-sans-article-body .body p{font-family:"Comic Sans MS", cursive, sans-serif;font-size:0.98em}.ltag__tag{border:1px solid #0a0a0a;font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";border:1px solid #dbdbdb;box-shadow:1px 1px 0px #c2c2c2;box-shadow:var(--theme-container-box-shadow, 1px 1px 0px #c2c2c2);border-radius:3px;display:block;margin:0.95em 0 1.2em;position:relative;overflow:hidden}@media screen and (min-width: 760px){.ltag__tag{margin:0.95em auto;width:620px}}.ltag__tag .ltag__tag__content{width:90%;width:calc(100% - 36px);padding:calc(0.5vw + 6px) 0px;padding-left:24px}.ltag__tag .ltag__tag__content a{color:#0a0a0a !important;color:var(--theme-container-color, #0a0a0a) !important}.ltag__tag .ltag__tag__content h2{margin:0;padding:0;font-weight:500}.ltag__tag .ltag__tag__content h2 .follow-action-button{visibility:hidden;min-height:25px;display:inline-block;color:white;background:#66e2d5;border-radius:5px;font-size:0.6em;vertical-align:0.1em;padding:2px 20px;border:1px solid #66e2d5;cursor:pointer}.ltag__tag .ltag__tag__content h2 .follow-action-button.following-butt{background:#66e2d5;color:white}.ltag__tag .ltag__tag__content h2 .follow-action-button.showing{visibility:visible}.ltag__tag .ltag__tag__content .ltag__tag__summary{padding-top:calc(0.5vw + 6px);font-size:0.77em;line-height:1.1em}#instagram-liquid-tag{background:white;border:1px solid #dbdbdb;margin:1px 1px 12px;max-width:450px;width:calc(100% - 2px);box-shadow:none;display:block;padding:0px}.instagram-position{position:relative;max-width:460px;margin:0 auto}.ltag_gist-liquid-tag table{margin:0 !important}.ltag_gist-liquid-tag td{border:0 !important;width:0 !important}.ltag_gist-liquid-tag .gist .markdown-body pre{margin-left:0;width:100%;box-sizing:border-box;color:#29292e}.ltag_gist-liquid-tag .gist .markdown-body pre code{color:#29292e}.ltag_gist-liquid-tag .gist .blob-wrapper table{-webkit-text-size-adjust:none;-moz-text-size-adjust:none;-ms-text-size-adjust:none;text-size-adjust:none;-moz-tab-size:2;-o-tab-size:2;tab-size:2}body.night-theme .on-page-nav-butt img,body.night-theme .icon-img,body.night-theme .dropdown-icon,body.night-theme .reaction-button:not(.reacted) img,body.night-theme .image-upload-button button,body.night-theme .icon-image,body.night-theme .dev-badge,body.night-theme .chatchannels__config img,body.night-theme .external-link-img,body.night-theme .group-img{-webkit-filter:invert(95%);filter:invert(95%)}body.night-theme .ltag__tag{border-color:white !important;box-shadow:3px 3px 0px #fff !important}body.night-theme .partner-image-dark-mode{display:block !important}body.night-theme .partner-image-light-mode{display:none !important}body.sans-serif-article-body .body{font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"}body.sans-serif-article-body .body p{font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";font-size:0.98em}body.comic-sans-article-body .body{font-family:"Comic Sans MS", cursive, sans-serif}body.comic-sans-article-body .body p{font-family:"Comic Sans MS", cursive, sans-serif;font-size:0.98em}.ltag-github-readme-tag{border:1px solid #dbdbdb;border-radius:3px;box-shadow:1px 2px 4px 0 rgba(0,0,0,0.18);margin:1.1em auto 1.30em;font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol" !important;overflow:hidden;max-width:620px}.ltag-github-readme-tag a{color:#0366d6 !important;color:var(--theme-anchor-color, #0366d6) !important}.ltag-github-readme-tag .readme-overview{padding:0.8em 0.5em;border-bottom:1px solid #dbdbdb}.ltag-github-readme-tag .readme-overview h2{font-weight:400 !important;font-size:1.2em !important;line-height:1.3em !important;margin:0em 0px 0.5em !important}.ltag-github-readme-tag .readme-overview h2 img{width:1.15em !important;max-width:1.1em !important;display:inline-block;left:0px;margin-right:0.3em;vertical-align:-0.18em;-webkit-filter:invert(0);filter:invert(0);-webkit-filter:var(--theme-social-icon-invert, invert(0));filter:var(--theme-social-icon-invert, invert(0))}.ltag-github-readme-tag .readme-overview h3{font-weight:400 !important;margin:0;margin-left:0.15em;font-size:0.75em !important;line-height:1.05em !important}.ltag-github-readme-tag .ltag-github-body{font-size:0.72em;line-height:1.12em;text-align:left;min-height:100px}.ltag-github-readme-tag .gh-btn-container{padding:0.1em 0 1.15em}.ltag-github-readme-tag .gh-btn{padding:0.28em 1.2em;font-size:0.75em}.ltag-github-readme-tag .markdown-body{padding:0em 0.2em}.ltag-github-readme-tag .markdown-body table{max-width:80%;margin-left:10%}.ltag-github-readme-tag .markdown-body img{display:inline-block;left:0px}.ltag-github-readme-tag .markdown-body .highlight{background:white}.ltag-github-readme-tag .markdown-body pre{max-width:100%;margin-left:10%}.ltag-github-readme-tag .markdown-body .anchor{display:none}body.night-theme .on-page-nav-butt img,body.night-theme .icon-img,body.night-theme .dropdown-icon,body.night-theme .reaction-button:not(.reacted) img,body.night-theme .image-upload-button button,body.night-theme .icon-image,body.night-theme .dev-badge,body.night-theme .chatchannels__config img,body.night-theme .external-link-img,body.night-theme .group-img{-webkit-filter:invert(95%);filter:invert(95%)}body.night-theme .ltag__tag{border-color:white !important;box-shadow:3px 3px 0px #fff !important}body.night-theme .partner-image-dark-mode{display:block !important}body.night-theme .partner-image-light-mode{display:none !important}body.sans-serif-article-body .body{font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"}body.sans-serif-article-body .body p{font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";font-size:0.98em}body.comic-sans-article-body .body{font-family:"Comic Sans MS", cursive, sans-serif}body.comic-sans-article-body .body p{font-family:"Comic Sans MS", cursive, sans-serif;font-size:0.98em}.ltag-poll{width:600px;max-width:96%;margin:auto;border-radius:3px;border:1px solid #dbdbdb !important;box-shadow:1px 2px 4px 0 rgba(0,0,0,0.18);box-sizing:border-box;padding:2px 15px 18px;font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";margin:1.6em auto !important}.ltag-poll h3{margin:15px 0px}.ltag-poll .ltag-pollanswers{list-style-type:none !important;margin:0 !important;padding:0 !important;padding-bottom:8px !important;font-size:0.9em !important}.ltag-poll .ltag-pollanswers li{padding-left:8px;border-radius:3px;width:95%;position:relative}.ltag-poll .ltag-pollanswers li:hover{background:#f5f6f7}.ltag-poll .ltag-pollanswers li.ltag-polloption-justshowmetheresults:hover{background:transparent}.ltag-poll .ltag-pollanswers li.already-voted{background:transparent}.ltag-poll .ltag-pollanswers input{vertical-align:top;margin-top:1.05em}.ltag-poll .ltag-pollanswers label{width:calc(100% - 40px);padding:2px 6px;cursor:pointer;vertical-align:-3px;display:inline-block;line-height:1.25em}.ltag-poll .ltag-pollanswers .ltag-voting-results-count{font-size:0.7em;color:#666666;text-align:left}.ltag-poll .ltag-pollanswers button{width:100%;background:transparent;border:0px;font-size:0.7em;color:#666666;text-align:left;padding-left:20px}.ltag-poll .ltag-pollanswers .ltag-votepercent{display:inline-block;position:absolute;top:0;left:0;bottom:0;z-index:3;border-radius:3px}.ltag-poll .ltag-pollanswers .ltag-votepercent.ltag-optionvotedfor{background:#66e2d5;font-weight:bold}.ltag-poll .ltag-pollanswers .ltag-votepercent.ltag-optionnotvotedfor{background:#dbdbdb;background:var(--theme-container-accent-background, #dbdbdb)}.ltag-poll .ltag-pollanswers .ltag-votepercenttext{position:relative;z-index:5}

      body.night-theme .on-page-nav-butt img,body.night-theme .icon-img,body.night-theme .dropdown-icon,body.night-theme .reaction-button:not(.reacted) img,body.night-theme .image-upload-button button,body.night-theme .icon-image,body.night-theme .dev-badge,body.night-theme .chatchannels__config img,body.night-theme .external-link-img,body.night-theme .group-img{-webkit-filter:invert(95%);filter:invert(95%)}body.night-theme .ltag__tag{border-color:white !important;box-shadow:3px 3px 0px #fff !important}body.night-theme .partner-image-dark-mode{display:block !important}body.night-theme .partner-image-light-mode{display:none !important}body.sans-serif-article-body .body{font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"}body.sans-serif-article-body .body p{font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";font-size:0.98em}body.comic-sans-article-body .body{font-family:"Comic Sans MS", cursive, sans-serif}body.comic-sans-article-body .body p{font-family:"Comic Sans MS", cursive, sans-serif;font-size:0.98em}.primary-sticky-nav{display:none}@media screen and (min-width: 1250px){.primary-sticky-nav{display:block;position:fixed;left:calc(50% + 298px);top:80px;bottom:20px;width:310px;display:flex;flex-flow:column wrap;overflow:hidden;z-index:100}}.primary-sticky-nav.hidden{display:none}.primary-sticky-nav .primary-sticky-nav-author a{color:#0a0a0a;color:var(--theme-container-color, #0a0a0a)}.primary-sticky-nav .primary-sticky-nav-author .primary-sticky-nav-author-top-profile-image{width:35px;height:35px;border-radius:360px;margin-right:5px;vertical-align:-2px}.primary-sticky-nav .primary-sticky-nav-author .primary-sticky-nav-author-name{font-size:1.3em;font-weight:bold}.primary-sticky-nav .primary-sticky-nav-author .primary-sticky-nav-author-username{font-size:0.8em;font-weight:bold}.primary-sticky-nav .primary-sticky-nav-author .primary-sticky-nav-author-summary{font-weight:400;color:#666666;color:var(--theme-secondary-color, #666);padding:10px 0px 5px;font-style:italic;font-size:0.88em;overflow:hidden;text-overflow:ellipsis;overflow-wrap:break-word}.primary-sticky-nav .primary-sticky-nav-author .primary-sticky-nav-author-follow{padding-top:8px}.primary-sticky-nav .primary-sticky-nav-author .primary-sticky-nav-author-follow button{width:100%;font-size:1.25em;border:0px;border-radius:3px;padding:3px;height:44px}.primary-sticky-nav .primary-sticky-nav-profile-image{height:23px;width:23px;border-radius:100px;vertical-align:-5px}.primary-sticky-nav .primary-sticky-nav-title{padding:8px 0px 9px;margin-left:15px;font-weight:bold}.primary-sticky-nav .primary-sticky-nav-title img{width:19px;height:19px;vertical-align:-1px}.primary-sticky-nav .primary-sticky-nav-title a{color:#0a0a0a;color:var(--theme-container-color, #0a0a0a);display:inline-block}.primary-sticky-nav .primary-sticky-nav-element{display:block;padding:10px 13px;font-size:0.9em;font-weight:bold;background:#fff;background:var(--theme-container-background, #fff);margin-bottom:10px;margin-left:10px;border:1px solid #d6d6d6;border:var(--theme-container-border, 1px solid #d6d6d6);box-shadow:1px 1px 0px #c2c2c2;box-shadow:var(--theme-container-box-shadow, 1px 1px 0px #c2c2c2);color:#0a0a0a;color:var(--theme-container-color, #0a0a0a);width:262px;border-radius:3px}.primary-sticky-nav .primary-sticky-nav-element .primary-sticky-nav-element-details{margin-top:9px;font-size:0.8em;color:#666666;color:var(--theme-secondary-color, #666)}.primary-sticky-nav .user-metadata-details{margin-top:10px;margin-left:2px;font-family:"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace}.primary-sticky-nav .user-metadata-details .row{padding:calc(3px + 0.1vw) 0px;display:inline-block;width:96%}.primary-sticky-nav .user-metadata-details .key{font-size:0.8em;font-weight:800;margin-bottom:2px;color:#666666;color:var(--theme-secondary-color, #666)}.primary-sticky-nav .user-metadata-details .value{display:inline-block;font-size:0.92em;margin-bottom:4px}.primary-sticky-nav .html-variant-wrapper{margin:10px}.primary-sticky-nav-org-summary{font-weight:400;color:#0a0a0a;color:var(--theme-container-color, #0a0a0a);padding:4px 0px;font-size:0.95em;margin-top:20px;border-top:1px solid #dbdbdb}.primary-sticky-nav-org-summary p{margin:12px 0px}.primary-sticky-nav-org-summary code{background:#f5f6f7;border-radius:3px;padding:3px 4px;color:#333842;font-family:"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace}.primary-sticky-nav-org-summary .primary-sticky-nav-org-cta-link-wrapper{text-align:center}.primary-sticky-nav-org-summary a.primary-sticky-nav-org-cta-link{display:inline-block;font-size:1.25em;border:0px;border-radius:100px;padding:6px 38px;margin-top:20px;background:white;color:#0a0a0a;font-family:"HelveticaNeue-CondensedBold", "HelveticaNeueBoldCondensed", "HelveticaNeue-Bold-Condensed", "Helvetica Neue Bold Condensed", "HelveticaNeueBold", "HelveticaNeue-Bold", "Helvetica Neue Bold", "HelveticaNeue", "Helvetica Neue", "TeXGyreHerosCnBold", "Helvetica", "Tahoma", "Geneva", "Arial Narrow", "Arial", sans-serif;font-weight:bold;text-align:center;font-stretch:condensed;box-shadow:1px 2px 4px 0 rgba(0,0,0,0.1);margin-bottom:5px}.primary-sticky-nav-org-summary a.primary-sticky-nav-org-cta-link:hover{box-shadow:1px 2px 4px 0 rgba(0,0,0,0.25);padding:7px 39px;margin-bottom:4px;margin-top:19px;transition:all 0.3s}

      body.night-theme .on-page-nav-butt img,body.night-theme .icon-img,body.night-theme .dropdown-icon,body.night-theme .reaction-button:not(.reacted) img,body.night-theme .image-upload-button button,body.night-theme .icon-image,body.night-theme .dev-badge,body.night-theme .chatchannels__config img,body.night-theme .external-link-img,body.night-theme .group-img{-webkit-filter:invert(95%);filter:invert(95%)}body.night-theme .ltag__tag{border-color:white !important;box-shadow:3px 3px 0px #fff !important}body.night-theme .partner-image-dark-mode{display:block !important}body.night-theme .partner-image-light-mode{display:none !important}body.sans-serif-article-body .body{font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"}body.sans-serif-article-body .body p{font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";font-size:0.98em}body.comic-sans-article-body .body{font-family:"Comic Sans MS", cursive, sans-serif}body.comic-sans-article-body .body p{font-family:"Comic Sans MS", cursive, sans-serif;font-size:0.98em}footer{z-index:10;position:relative}footer .container{width:100%;margin:auto;max-width:1200px;box-shadow:none;border:none;font-weight:500;background:transparent}footer .container.centered-footer{width:97%;max-width:722px}@media screen and (min-width: 950px) and (max-width: 1119px){footer .container.centered-footer{margin-left:310px;max-width:calc(100% - 377px)}}@media screen and (min-width: 1120px){footer .container.centered-footer{max-width:calc(100% - 642px)}}@media screen and (min-width: 1240px){footer .container.centered-footer{max-width:606px}}footer .container a{color:#0a0a0a;color:var(--theme-color, #0a0a0a);display:inline-block;margin-right:12px}footer .container a:hover{text-decoration:underline}footer .container .inner-footer-container{max-width:820px;background:#fdf9f3;background:var(--theme-container-background, #fdf9f3);border:1px solid #d6d6d6;border:var(--theme-container-border, 1px solid #d6d6d6);box-shadow:1px 1px 0px #c2c2c2;box-shadow:var(--theme-container-box-shadow, 1px 1px 0px #c2c2c2);padding:50px 30px;line-height:3em;margin:auto}@media screen and (min-width: 1250px){footer .container .inner-footer-container{margin-left:0px}}

    </style>

      <style>
        .home {
          overflow: hidden;
          position: relative;
          text-align: center;
          min-height: 440px;
          margin: auto;
          max-width: 1250px;
        }

        @media screen and (min-width: 950px) {
          .home {
            margin-top: 26px;
          }
        }
      </style>
      <script async="" src="Creating%20a%20custom%20shader%20in%20Three_files/analytics.js"></script><script src="Creating%20a%20custom%20shader%20in%20Three_files/manifest-2423a417778305295081.js" defer="defer"></script>
      <script src="Creating%20a%20custom%20shader%20in%20Three_files/vendor-c0e242d0adae394c52b7.js" defer="defer"></script>
      <script src="Creating%20a%20custom%20shader%20in%20Three_files/Search-ccb0f4a1ea555623da46.js" defer="defer"></script>
        <script src="Creating%20a%20custom%20shader%20in%20Three_files/base-34d28fab5e3bbb453fdc94964ed34cb7f0e6005c983af0965fdd0887.js" defer="defer"></script>
      
      <link rel="canonical" href="https://dev.to/maniflames/creating-a-custom-shader-in-threejs-3bhi">
    <meta name="description" content="Something I have wanted to do for a while now. ">
    <meta name="keywords" content="software development, inclusive, community,engineering,threejs, webgl, javascript, 3d">

    <meta property="og:type" content="article">
    <meta property="og:url" content="https://dev.to/maniflames/creating-a-custom-shader-in-threejs-3bhi">
    <meta property="og:title" content="Creating a custom shader in Three.js">
    <meta property="og:description" content="Something I have wanted to do for a while now. ">
    <meta property="og:site_name" content="The DEV Community">
    <meta name="twitter:site" content="@ThePracticalDev">
    <meta name="twitter:creator" content="@maniflames">
    <meta name="twitter:title" content="Creating a custom shader in Three.js">
    <meta name="twitter:description" content="Something I have wanted to do for a while now. ">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:widgets:new-embed-design" content="on">
      <meta property="og:image" content="https://res.cloudinary.com/practicaldev/image/fetch/s--oqzbJfLR--/c_imagga_scale,f_auto,fl_progressive,h_500,q_auto,w_1000/https://cl.ly/8f1c4ffab501/download/Image%25202019-01-21%2520at%25205.27.43%2520PM.png">
      <meta name="twitter:image:src" content="https://res.cloudinary.com/practicaldev/image/fetch/s--oqzbJfLR--/c_imagga_scale,f_auto,fl_progressive,h_500,q_auto,w_1000/https://cl.ly/8f1c4ffab501/download/Image%25202019-01-21%2520at%25205.27.43%2520PM.png">

      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
      <link rel="shortcut icon" type="image/x-icon" href="https://practicaldev-herokuapp-com.freetls.fastly.net/assets/favicon-bca01e42dfbe772972ebe01e7150cdb8b75555c612b20b7e3059a10e0ca6f759.ico">
      <link rel="apple-touch-icon" href="https://practicaldev-herokuapp-com.freetls.fastly.net/assets/apple-icon-e9a036e0385d6e1e4ddef50be5e583800c0b5ca325d4998a640c38602d23b26c.png">
      <link rel="apple-touch-icon" sizes="152x152" href="https://practicaldev-herokuapp-com.freetls.fastly.net/assets/apple-icon-152x152-175277237bd0d14dde52c97502b64dee6566354ad487ddd47f6df7ad88f5fa14.png">
      <link rel="apple-touch-icon" sizes="180x180" href="https://practicaldev-herokuapp-com.freetls.fastly.net/assets/apple-icon-180x180-7fe998b248bfcfd634283d27fcfe4adae7fb21cd6a87b509f7a00e575bb3b8df.png">
      <link rel="apple-touch-icon" sizes="167x167" href="https://practicaldev-herokuapp-com.freetls.fastly.net/assets/apple-icon-167x167-ce945dd0463cecb6a56190a8476b7ddb72f0236c6d88cc5f681eea934ce92b9b.png">
      <link href="https://practicaldev-herokuapp-com.freetls.fastly.net/assets/android-icon-192x192-0409854849dca4043b26f85039b8c3d42cbac2bd8793fec1004eb389fa153877.png" rel="icon" sizes="192x192">
      <link href="https://practicaldev-herokuapp-com.freetls.fastly.net/assets/android-icon-128x128-ac6d217579b9ef3362ffec87f96de83148f80c5b5b06e06df6506b7606e7e2b6.png" rel="icon" sizes="128x128">
      <meta name="apple-mobile-web-app-title" content="dev.to">
      <meta name="application-name" content="dev.to">
      <meta property="fb:pages" content="568966383279687">
      <meta name="theme-color" content="#000000">
      <link rel="manifest" href="https://dev.to/manifest.json">
      <link rel="search" href="https://dev.to/search.xml" type="application/opensearchdescription+xml" title="The DEV Community">
  <style>.fluidvids-elem{position:absolute;top:0px;left:0px;width:100%;height:100%;}.fluidvids{width:100%;position:relative;}</style><link type="text/css" id="main-head-stylesheet" rel="stylesheet" href="Creating%20a%20custom%20shader%20in%20Three_files/minimal-c1fb82f26e9e3f802be468ecac61ccac03e97c07a6784b0d77af.css"><script type="text/javascript" charset="utf-8" async="" src="Creating%20a%20custom%20shader%20in%20Three_files/4-b0c16ce8982e45b2beef.js"></script><meta name="csrf-param" content="authenticity_token"><meta name="csrf-token" content="jy6xIR65N0Lpa/w2CjB9MhjDvuRAIXb2cBxKtG6uLtCwepaNXWJSm2Swp0+DWyEj8w70URIPbHJ+WAELBu609Q=="></head>
  <body data-user-status="logged-out" data-pusher-key="ef46a9ae106e4241008c" data-loaded="true">
    <div id="body-styles"></div>
      <div id="audiocontent">
        
      </div>
      <div class="navigation-progress" id="navigation-progress">
</div>
<div class="top-bar" id="top-bar">
  <nav>
    <div id="pwa-nav-buttons" class="pwa-nav-buttons">
      <button id="app-back-button"><img src="Creating%20a%20custom%20shader%20in%20Three_files/keyboard-left-arrow-button-6a89d07165e7629f4742e0583fce267d9.svg" alt="back icon"></button>
      <button id="app-forward-button"><img src="Creating%20a%20custom%20shader%20in%20Three_files/keyboard-right-arrow-button-344b5b41f21798a671d21895a8df9e87.svg" alt="forward icon"></button>
      <button id="app-refresh-button"><img src="Creating%20a%20custom%20shader%20in%20Three_files/refresh-button-71f92167d751fd28da5c7b386d5bf86c6dfcda3a9e79a.svg" alt="refresh icon"></button>
    </div>
    <a href="#articles-list" class="skip-content-link">Skip to content</a>
    <a href="https://dev.to/" class="logo-link" id="logo-link" aria-label="DEV Home"><svg xmlns="http://www.w3.org/2000/svg" version="1" width="20%" height="20%" viewBox="0 0 132.000000 65.000000" role="img" aria-labelledby="a3s9t4ler1g76udybf2pi7y2v4vkyeih" class="logo"><title id="a3s9t4ler1g76udybf2pi7y2v4vkyeih">App logo</title><path d="M0 33v32h11.3c12.5 0 17.7-1.6 21.5-6.5 3.8-4.8 4.4-9 4-28-.3-16.8-.5-18.2-2.7-21.8C30.3 2.5 26.1 1 12 1H0v32zm23.1-19.1c2.3 1.9 2.4 2.3 2.4 18.5 0 15.7-.1 16.7-2.2 18.8-1.7 1.6-3.5 2.2-7 2.2l-4.8.1-.3-20.8L11 12h4.9c3.3 0 5.6.6 7.2 1.9zM46.1 3.6c-2 2.6-2.1 3.9-2.1 29.6v26.9l2.5 2.4c2.3 2.4 2.9 2.5 16 2.5H76V54.1l-10.2-.3-10.3-.3v-15l6.3-.3 6.2-.3V27H55V12h21V1H62.1c-13.9 0-14 0-16 2.6zM87 15.2c2.1 7.9 5.5 20.8 7.6 28.8 3.2 12.3 4.3 15 7 17.7 1.9 2 4.2 3.3 5.7 3.3 3.1 0 7.1-3.1 8.5-6.7 1-2.6 15.2-55.6 15.2-56.8 0-.3-2.8-.5-6.2-.3l-6.3.3-5.6 21.5c-3.5 13.6-5.8 20.8-6.2 19.5C105.9 40 96 1.9 96 1.4c0-.2-2.9-.4-6.4-.4h-6.4L87 15.2z"></path></svg>
</a>
    <div id="nav-search-form-root">
      <div class="nav-search-form"><form method="get" action="/search" accept-charset="UTF-8"><input class="" type="hidden" name="utf8" value="✓"><input class="nav-search-form__input" type="text" name="q" id="nav-search" placeholder="search" autocomplete="off" aria-label="search">
        </form>
      </div>
    </div>
    <a href="https://dev.to/new" id="write-link" class="cta nav-link write">WRITE A POST</a>
    <a href="https://dev.to/connect" id="connect-link" class="nav-link connect-icon" aria-label="Connect">
      <!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --><svg xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 60.064 60.064" style="enable-background:new 0 0 60.064 60.064;" xml:space="preserve" role="img" aria-labelledby="asft8ng57ztv5eiv60aaxoil2xnmfy6l" width="100%" height="100%"><title id="asft8ng57ztv5eiv60aaxoil2xnmfy6l">Connect</title>
<path d="M59.84,7.897c-0.218-0.268-0.556-0.393-0.893-0.353c-0.077,0.004-0.149,0.017-0.224,0.039L0.738,23.354  C0.312,23.47,0.012,23.852,0,24.293c-0.011,0.441,0.269,0.838,0.688,0.976l21.217,6.952l-1.898,15.182  c-0.05,0.4,0.145,0.791,0.494,0.991c0.155,0.089,0.327,0.133,0.498,0.133c0.215,0,0.43-0.069,0.608-0.206l7.765-5.946l6.807,9.725  c0.188,0.269,0.494,0.427,0.819,0.427c0.022,0,0.045-0.001,0.068-0.002c0.35-0.024,0.661-0.229,0.821-0.542l22.063-43  C60.134,8.631,60.09,8.205,59.84,7.897z M52.895,11.241L22.861,30.429L4.484,24.408L52.895,11.241z M22.288,45.281l1.382-11.053  l4.555,6.507L22.288,45.281z M36.868,49.594L24.418,31.808l32.1-20.508L36.868,49.594z"></path>
</svg>

      <div class="connect-number" id="connect-number"></div>
    </a>
    <a href="https://dev.to/notifications" id="notifications-link" class="nav-link notifications-icon" aria-label="Notifications">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.834 47.834" role="img" aria-labelledby="amuij8ql8xl7975jk8r94vp837nwtcbn" width="100%" height="100%"><title id="amuij8ql8xl7975jk8r94vp837nwtcbn">Notifications</title><path d="M46.878 41.834H.956L.96 40.83c.022-4.066 2.87-7.55 6.76-8.438V20.697c0-8.93 7.265-16.197 16.196-16.197 8.932 0 16.198 7.266 16.198 16.197v11.695c3.89.89 6.737 4.372 6.76 8.437l.004 1zm-43.836-2h41.75c-.458-2.908-2.804-5.24-5.8-5.61l-.878-.107v-13.42c0-7.828-6.37-14.197-14.198-14.197S9.72 12.87 9.72 20.697v13.42l-.878.106c-2.997.37-5.342 2.702-5.8 5.61z"></path><path d="M21.125 5.988h-2V4.792C19.125 2.15 21.275 0 23.917 0s4.79 2.15 4.79 4.792v1.176h-2V4.792c0-1.54-1.25-2.792-2.79-2.792s-2.792 1.253-2.792 2.792v1.196zm2.778 41.846c-3.94 0-7.375-2.8-8.164-6.656l1.954-.4c.6 2.93 3.21 5.057 6.205 5.057 3.06 0 5.677-2.18 6.23-5.18l1.966.36c-.725 3.952-4.17 6.82-8.195 6.82zM8.72 32.23h3.682v2H8.72zm9.447 0h20.947v2H18.167z"></path></svg>

      <div class="notifications-number" id="notifications-number"></div>
    </a>
    <div class="navbar-menu-wrapper desktop" id="navbar-menu-wrapper">
      <button class="navigation-butt" id="navigation-butt" aria-label="Navigation menu">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 486.8 486.8" width="20%" height="20%" role="img" aria-labelledby="a18bc9ssvkwel3poahzzpr8jmv9js6eo" class="bars"><title id="a18bc9ssvkwel3poahzzpr8jmv9js6eo">Navigation menu</title><g fill="#4f5458"><path d="M140.35 32c0-17.6-14.4-32-32-32h-76.3c-17.6 0-32 14.4-32 32v76.2c0 17.6 14.4 32 32 32h76.2c17.6 0 32-14.4 32-32V32h.1zm-24.5 76.3c0 4.1-3.4 7.5-7.5 7.5h-76.3c-4.1 0-7.5-3.4-7.5-7.5V32c0-4.1 3.4-7.5 7.5-7.5h76.2c4.1 0 7.5 3.4 7.5 7.5v76.3h.1zM140.35 205.3c0-17.6-14.4-32-32-32h-76.3c-17.6 0-32 14.4-32 32v76.2c0 17.6 14.4 32 32 32h76.2c17.6 0 32-14.4 32-32v-76.2h.1zm-24.5 76.2c0 4.1-3.4 7.5-7.5 7.5h-76.3c-4.1 0-7.5-3.4-7.5-7.5v-76.2c0-4.1 3.4-7.5 7.5-7.5h76.2c4.1 0 7.5 3.4 7.5 7.5v76.2h.1zM108.35 346.5h-76.3c-17.6 0-32 14.4-32 32v76.2c0 17.6 14.4 32 32 32h76.2c17.6 0 32-14.4 32-32v-76.2c.1-17.6-14.3-32-31.9-32zm7.5 108.3c0 4.1-3.4 7.5-7.5 7.5h-76.3c-4.1 0-7.5-3.4-7.5-7.5v-76.2c0-4.1 3.4-7.5 7.5-7.5h76.2c4.1 0 7.5 3.4 7.5 7.5v76.2h.1zM173.35 281.5c0 17.6 14.4 32 32 32h76.2c17.6 0 32-14.4 32-32v-76.2c0-17.6-14.4-32-32-32h-76.2c-17.6 0-32 14.4-32 32v76.2zm24.5-76.2c0-4.1 3.4-7.5 7.5-7.5h76.2c4.1 0 7.5 3.4 7.5 7.5v76.2c0 4.1-3.4 7.5-7.5 7.5h-76.2c-4.1 0-7.5-3.4-7.5-7.5v-76.2zM173.35 454.8c0 17.6 14.4 32 32 32h76.2c17.6 0 32-14.4 32-32v-76.2c0-17.6-14.4-32-32-32h-76.2c-17.6 0-32 14.4-32 32v76.2zm24.5-76.3c0-4.1 3.4-7.5 7.5-7.5h76.2c4.1 0 7.5 3.4 7.5 7.5v76.2c0 4.1-3.4 7.5-7.5 7.5h-76.2c-4.1 0-7.5-3.4-7.5-7.5v-76.2zM346.55 281.5c0 17.6 14.4 32 32 32h76.2c17.6 0 32-14.4 32-32v-76.2c0-17.6-14.4-32-32-32h-76.2c-17.6 0-32 14.4-32 32v76.2zm24.5-76.2c0-4.1 3.4-7.5 7.5-7.5h76.2c4.1 0 7.5 3.4 7.5 7.5v76.2c0 4.1-3.4 7.5-7.5 7.5h-76.2c-4.1 0-7.5-3.4-7.5-7.5v-76.2zM346.55 454.8c0 17.6 14.4 32 32 32h76.2c17.6 0 32-14.4 32-32v-76.2c0-17.6-14.4-32-32-32h-76.2c-17.6 0-32 14.4-32 32v76.2zm24.5-76.3c0-4.1 3.4-7.5 7.5-7.5h76.2c4.1 0 7.5 3.4 7.5 7.5v76.2c0 4.1-3.4 7.5-7.5 7.5h-76.2c-4.1 0-7.5-3.4-7.5-7.5v-76.2zM173.35 32v76.2c0 17.6 14.4 32 32 32h76.2c17.6 0 32-14.4 32-32V32c0-17.6-14.4-32-32-32h-76.2c-17.7 0-32 14.4-32 32zm24.5 0c0-4.1 3.4-7.5 7.5-7.5h76.2c4.1 0 7.5 3.4 7.5 7.5v76.2c0 4.1-3.4 7.5-7.5 7.5h-76.2c-4.1 0-7.5-3.4-7.5-7.5V32zM378.55 140.3h76.2c17.6 0 32-14.4 32-32V32c0-17.6-14.4-32-32-32h-76.2c-17.6 0-32 14.4-32 32v76.2c0 17.7 14.4 32.1 32 32.1zM371.05 32c0-4.1 3.4-7.5 7.5-7.5h76.2c4.1 0 7.5 3.4 7.5 7.5v76.2c0 4.1-3.4 7.5-7.5 7.5h-76.2c-4.1 0-7.5-3.4-7.5-7.5V32z"></path></g></svg>

      </button>
      <div class="menubg" id="menubg"></div>
        <div class="menu logged-out" id="loggedoutmenu">
    <a href="https://dev.to/enter" data-no-instant="" id="first-nav-link">
      <div class="header">
        Sign In/Up
      </div>
    </a>
    <a href="https://dev.to/users/auth/twitter?callback_url=https://dev.to/users/auth/twitter/callback" data-no-instant="">
      <div class="option">
        Via Twitter
      </div>
    </a>
    <a href="https://dev.to/users/auth/github?state=navbar_basic" data-no-instant="" id="second-last-nav-link">
      <div class="option">
        Via GitHub
      </div>
    </a>
    <a href="https://dev.to/p/information" id="last-nav-link">
      <div class="option">
        All about dev.to
      </div>
    </a>
  </div>

    </div>
  </nav>
</div>

    <div id="message-notice"></div>
    <div id="page-content" class="universal-page-content-wrapper stories stories-show" data-current-page="stories-show">
      <div id="page-content-inner">
        
<script src="Creating%20a%20custom%20shader%20in%20Three_files/webcomponents-loader.js" defer="defer"></script>
<script src="Creating%20a%20custom%20shader%20in%20Three_files/clipboardCopy-d0c4494f29d2368c99ea.js" defer="defer"></script>



  
<div class="home">
  <div class="container article" id="article-show-container" data-author-id="72293" data-live="false" data-path="/maniflames/creating-a-custom-shader-in-threejs-3bhi" data-published="true">
    <article itemscope="" itemtype="http://schema.org/Article" itemprop="mainEntityOfPage">
      <meta itemprop="url" content="https://dev.to/maniflames/creating-a-custom-shader-in-threejs-3bhi">
      <meta itemprop="image" content="https://res.cloudinary.com/practicaldev/image/fetch/s--oqzbJfLR--/c_imagga_scale,f_auto,fl_progressive,h_500,q_auto,w_1000/https://cl.ly/8f1c4ffab501/download/Image%25202019-01-21%2520at%25205.27.43%2520PM.png">
      <div itemprop="publisher" itemscope="" itemtype="https://schema.org/Organization">
        <div itemprop="logo" itemscope="" itemtype="https://schema.org/ImageObject">
          <meta itemprop="url" content="https://practicaldev-herokuapp-com.freetls.fastly.net/assets/android-icon-192x192-0409854849dca4043b26f85039b8c3d42cbac2bd8793fec1004eb389fa153877.png">
          <meta itemprop="width" content="192">
          <meta itemprop="height" content="192">
        </div>
        <meta itemprop="name" content="DEV Community">
      </div>
      <section>
          <div class="blank-space"></div>
      </section>
      <header class="title" id="main-title">
        <h1 class="medium" itemprop="name headline">
          Creating a custom shader in Three.js
        </h1>
        <h3>
          <span itemprop="author" itemscope="" itemtype="http://schema.org/Person">
            <meta itemprop="url" content="https://dev.to/maniflames">
            <a href="https://dev.to/maniflames" class="author">
              <img class="profile-pic" src="Creating%20a%20custom%20shader%20in%20Three_files/20086490-0693-47a3-9fe4-f289e548897d.jpg" alt="maniflames profile image">
              <span itemprop="name">Maniflames</span>
            </a>
          </span>
            <a href="http://twitter.com/maniflames"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 612 612" role="img" aria-labelledby="ap3vghlzn0isjekwmpkzo5gdp0738viw" class="icon-img"><title id="ap3vghlzn0isjekwmpkzo5gdp0738viw">twitter logo</title><path d="M612 116.258c-22.525 9.98-46.694 16.75-72.088 19.772 25.93-15.527 45.777-40.155 55.184-69.41-24.322 14.378-51.17 24.82-79.775 30.48-22.906-24.438-55.49-39.66-91.63-39.66-69.333 0-125.55 56.218-125.55 125.514 0 9.828 1.11 19.427 3.25 28.606-104.325-5.24-196.834-55.223-258.75-131.174-10.822 18.51-16.98 40.078-16.98 63.1 0 43.56 22.182 81.994 55.836 104.48-20.575-.688-39.926-6.348-56.867-15.756v1.568c0 60.806 43.29 111.554 100.692 123.104-10.517 2.83-21.607 4.398-33.08 4.398-8.107 0-15.947-.803-23.634-2.333 15.985 49.907 62.336 86.2 117.253 87.194-42.946 33.655-97.098 53.656-155.915 53.656-10.134 0-20.116-.612-29.944-1.72 55.568 35.68 121.537 56.484 192.44 56.484 230.947 0 357.187-191.29 357.187-357.188l-.42-16.253C573.87 163.525 595.21 141.42 612 116.257z"></path></svg>
</a>
            <a href="http://github.com/maniflames"><svg xmlns="http://www.w3.org/2000/svg" width="438.549" height="438.549" viewBox="0 0 438.549 438.549" role="img" aria-labelledby="adrevktznpxy74e10fpys2icyc2b4hb9" class="icon-img"><title id="adrevktznpxy74e10fpys2icyc2b4hb9">github logo</title><path d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8C295.736 15.166 259.057 5.365 219.27 5.365c-39.78 0-76.47 9.804-110.062 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.853 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.42-1.996 2.474-2.282 3.71-5.14 3.71-8.562 0-.57-.05-5.708-.144-15.417-.098-9.71-.144-18.18-.144-25.406l-6.567 1.136c-4.187.767-9.47 1.092-15.846 1-6.375-.09-12.992-.757-19.843-2-6.854-1.23-13.23-4.085-19.13-8.558-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.9-9.233-8.992-14.56-4.093-5.33-8.232-8.944-12.42-10.847l-1.998-1.43c-1.332-.952-2.568-2.1-3.71-3.43-1.143-1.33-1.998-2.663-2.57-3.997-.57-1.335-.097-2.43 1.428-3.29 1.525-.858 4.28-1.275 8.28-1.275l5.708.853c3.807.763 8.516 3.042 14.133 6.85 5.615 3.807 10.23 8.755 13.847 14.843 4.38 7.807 9.657 13.755 15.846 17.848 6.184 4.093 12.42 6.136 18.7 6.136 6.28 0 11.703-.476 16.273-1.423 4.565-.95 8.848-2.382 12.847-4.284 1.713-12.758 6.377-22.56 13.988-29.41-10.847-1.14-20.6-2.857-29.263-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.98-3.9-12.373-5.852-26.647-5.852-42.825 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.38-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.284 18.794 7.953 23.84 10.995 5.046 3.04 9.09 5.618 12.135 7.708 17.706-4.947 35.977-7.42 54.82-7.42s37.116 2.473 54.822 7.42l10.85-6.85c7.418-4.57 16.18-8.757 26.26-12.564 10.09-3.806 17.803-4.854 23.135-3.14 8.562 21.51 9.325 40.923 2.28 58.24 15.035 16.18 22.558 35.788 22.558 58.818 0 16.178-1.958 30.497-5.853 42.966-3.9 12.47-8.94 22.457-15.125 29.98-6.19 7.52-13.9 13.85-23.13 18.985-9.233 5.14-18.183 8.85-26.84 11.135-8.663 2.286-18.416 4.004-29.264 5.146 9.894 8.563 14.842 22.078 14.842 40.54v60.237c0 3.422 1.19 6.28 3.572 8.562 2.38 2.278 6.136 2.95 11.276 1.994 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.16 41.826-81.126 41.826-128.906-.01-39.77-9.818-76.454-29.414-110.05z"></path></svg>
</a>
            <time itemprop="datePublished" datetime="2019-01-21T00:03:29Z" title="Monday, January 21, 2019, 1:03:29 AM">Jan 21</time>
          <span class="published-at">・6 min read</span>
          <span class="action-space" id="action-space"></span>
        </h3>
          <div class="tags">
              <a class="tag" href="https://dev.to/t/threejs" style="background-color:;color:">#threejs</a>
              <a class="tag" href="https://dev.to/t/webgl" style="background-color:;color:">#webgl</a>
              <a class="tag" href="https://dev.to/t/javascript" style="background-color:#F7DF1E;color:#000000">#javascript</a>
              <a class="tag" href="https://dev.to/t/3d" style="background-color:;color:">#3d</a>
          </div>
      </header>
      <div class="body" data-article-id="76870" id="article-body" itemprop="articleBody">
        <p>3D stuff in the browser is awesome. After playing around with threejs for some time and making a <a href="https://dodge.imanidap.nl/">mini-game</a>
 at school I started to like it a lot. A classmate that is really into 
graphics programming told me a little bit about WebGL and shaders. It 
seemed really cool and I promised myself I would make my own shader. Of 
course some other shiny thing caught my attention and I forgot about it 
but, from today on I can finally say that I have created a shader and 
used it within threejs. </p>

<h1>
  <a name="three-js" href="#three-js" class="anchor">
  </a>
  Three JS
</h1>

<p>Before going all in on shaders it is probably a good idea to explain what <a href="https://threejs.org/">three js</a> is. Threejs is a javascript library to ease the process of creating 3D scenes on a canvas. Other popular solutions like <a href="https://aframe.io/">a-frame</a> and <a href="https://whs.io/">whitestorm js</a>
 are build on top of it. If you have ever played around with those but 
want even more control definitely try it out! (If you are a TypeScript 
lover, three js has <a href="https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/three">type definitions</a> 😉).   </p>

<p>The most popular intro to this library is creating a cube and making it spin. There is a written tutorial in the <a href="https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene">threejs documentation</a> and  a brilliant youtube tutorial by CJ Gammon that is part of his 'diving in: three js' series.</p>

<p><div class=" fluidvids" style="padding-top: 56.1972%;"><iframe src="https://www.youtube.com/embed/biZgx45Mzqo" allowfullscreen="" class=" fluidvids-elem" width="710" height="399">
</iframe></div>
</p>

<p>Creating this cube is a basically preparing a film set and placing it
 inside of that set. You create a scene and a camera and pass these to a
 renderer to say: "hey this is my movie set". Then you can place mesh, 
which is basically an object, within the scene. This mesh consists of a 
geometry (the shape of the object) and a material (the color, behavior 
towards light and more). Based on the material you have chosen, you 
might want to add different kinds of lights to the scene. In order to 
animate the object and actually display everything you create a loop. 
Within this loop you tell the renderer to show the scene. Your code 
might look like this: </p>



<div class="highlight"><pre class="highlight javascript"><code>
<span class="nb">window</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s1">'load'</span><span class="p">,</span> <span class="nx">init</span><span class="p">)</span>
<span class="kd">let</span> <span class="nx">scene</span>
<span class="kd">let</span> <span class="nx">camera</span>
<span class="kd">let</span> <span class="nx">renderer</span>
<span class="kd">let</span> <span class="nx">sceneObjects</span> <span class="o">=</span> <span class="p">[]</span>

<span class="kd">function</span> <span class="nx">init</span><span class="p">()</span> <span class="p">{</span>
  <span class="nx">scene</span> <span class="o">=</span> <span class="k">new</span> <span class="nx">THREE</span><span class="p">.</span><span class="nx">Scene</span><span class="p">()</span>

  <span class="nx">camera</span> <span class="o">=</span> <span class="k">new</span> <span class="nx">THREE</span><span class="p">.</span><span class="nx">PerspectiveCamera</span><span class="p">(</span><span class="mi">75</span><span class="p">,</span> <span class="nb">window</span><span class="p">.</span><span class="nx">innerWidth</span> <span class="o">/</span> <span class="nb">window</span><span class="p">.</span><span class="nx">innerHeight</span><span class="p">,</span> <span class="mf">0.1</span><span class="p">,</span> <span class="mi">1000</span><span class="p">)</span>
  <span class="nx">camera</span><span class="p">.</span><span class="nx">position</span><span class="p">.</span><span class="nx">z</span> <span class="o">=</span> <span class="mi">5</span>

  <span class="nx">renderer</span> <span class="o">=</span> <span class="k">new</span> <span class="nx">THREE</span><span class="p">.</span><span class="nx">WebGLRenderer</span><span class="p">()</span>
  <span class="nx">renderer</span><span class="p">.</span><span class="nx">setSize</span><span class="p">(</span><span class="nb">window</span><span class="p">.</span><span class="nx">innerWidth</span><span class="p">,</span> <span class="nb">window</span><span class="p">.</span><span class="nx">innerHeight</span><span class="p">)</span>

  <span class="nb">document</span><span class="p">.</span><span class="nx">body</span><span class="p">.</span><span class="nx">appendChild</span><span class="p">(</span><span class="nx">renderer</span><span class="p">.</span><span class="nx">domElement</span><span class="p">)</span>
  <span class="nx">adjustLighting</span><span class="p">()</span>
  <span class="nx">addBasicCube</span><span class="p">()</span>
  <span class="nx">animationLoop</span><span class="p">()</span>
<span class="p">}</span>

<span class="kd">function</span> <span class="nx">adjustLighting</span><span class="p">()</span> <span class="p">{</span>
    <span class="kd">let</span> <span class="nx">pointLight</span> <span class="o">=</span> <span class="k">new</span> <span class="nx">THREE</span><span class="p">.</span><span class="nx">PointLight</span><span class="p">(</span><span class="mh">0xdddddd</span><span class="p">)</span>
    <span class="nx">pointLight</span><span class="p">.</span><span class="nx">position</span><span class="p">.</span><span class="kd">set</span><span class="p">(</span><span class="o">-</span><span class="mi">5</span><span class="p">,</span> <span class="o">-</span><span class="mi">3</span><span class="p">,</span> <span class="mi">3</span><span class="p">)</span>
    <span class="nx">scene</span><span class="p">.</span><span class="nx">add</span><span class="p">(</span><span class="nx">pointLight</span><span class="p">)</span>

    <span class="kd">let</span> <span class="nx">ambientLight</span> <span class="o">=</span> <span class="k">new</span> <span class="nx">THREE</span><span class="p">.</span><span class="nx">AmbientLight</span><span class="p">(</span><span class="mh">0x505050</span><span class="p">)</span>
    <span class="nx">scene</span><span class="p">.</span><span class="nx">add</span><span class="p">(</span><span class="nx">ambientLight</span><span class="p">)</span>
<span class="p">}</span>

<span class="kd">function</span> <span class="nx">addBasicCube</span><span class="p">()</span> <span class="p">{</span>
  <span class="kd">let</span> <span class="nx">geometry</span> <span class="o">=</span> <span class="k">new</span> <span class="nx">THREE</span><span class="p">.</span><span class="nx">BoxGeometry</span><span class="p">(</span><span class="mi">1</span><span class="p">,</span> <span class="mi">1</span><span class="p">,</span> <span class="mi">1</span><span class="p">)</span>
  <span class="kd">let</span> <span class="nx">material</span> <span class="o">=</span> <span class="k">new</span> <span class="nx">THREE</span><span class="p">.</span><span class="nx">MeshLambertMaterial</span><span class="p">()</span>  

  <span class="kd">let</span> <span class="nx">mesh</span> <span class="o">=</span> <span class="k">new</span> <span class="nx">THREE</span><span class="p">.</span><span class="nx">Mesh</span><span class="p">(</span><span class="nx">geometry</span><span class="p">,</span> <span class="nx">material</span><span class="p">)</span>
  <span class="nx">mesh</span><span class="p">.</span><span class="nx">position</span><span class="p">.</span><span class="nx">x</span> <span class="o">=</span> <span class="o">-</span><span class="mi">2</span>
  <span class="nx">scene</span><span class="p">.</span><span class="nx">add</span><span class="p">(</span><span class="nx">mesh</span><span class="p">)</span>
  <span class="nx">sceneObjects</span><span class="p">.</span><span class="nx">push</span><span class="p">(</span><span class="nx">mesh</span><span class="p">)</span>
<span class="p">}</span>

<span class="kd">function</span> <span class="nx">animationLoop</span><span class="p">()</span> <span class="p">{</span>
  <span class="nx">renderer</span><span class="p">.</span><span class="nx">render</span><span class="p">(</span><span class="nx">scene</span><span class="p">,</span> <span class="nx">camera</span><span class="p">)</span>

  <span class="k">for</span><span class="p">(</span><span class="kd">let</span> <span class="nx">object</span> <span class="k">of</span> <span class="nx">sceneObjects</span><span class="p">)</span> <span class="p">{</span>
    <span class="nx">object</span><span class="p">.</span><span class="nx">rotation</span><span class="p">.</span><span class="nx">x</span> <span class="o">+=</span> <span class="mf">0.01</span>
    <span class="nx">object</span><span class="p">.</span><span class="nx">rotation</span><span class="p">.</span><span class="nx">y</span> <span class="o">+=</span> <span class="mf">0.03</span>
  <span class="p">}</span>

  <span class="nx">requestAnimationFrame</span><span class="p">(</span><span class="nx">animationLoop</span><span class="p">)</span>
<span class="p">}</span>

</code></pre></div>

<h1>
  <a name="shaders" href="#shaders" class="anchor">
  </a>
  Shaders
</h1>

<p>Shaders are basically functions or small scripts that are executed by the GPU. This is where <a href="https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Getting_started_with_WebGL">WebGL</a> and <a href="https://developer.mozilla.org/en-US/docs/Games/Techniques/3D_on_the_web/GLSL_Shaders">GLSL (OpenGL Shading Language)</a>
 come into play. WebGL is a browser API that allows javascript to run 
code on the GPU. This can increase the performance of certain scripts 
because your GPU is optimized for doing graphics related calculations. 
WebGL even allows us to write code that will be executed directly by the
 GPU in the GLSL language. These pieces of GLSL code are our shaders and
 since threejs has a WebGL renderer we can write shaders to modify our 
mesh. In threejs you can create custom material by using the 'shader 
material'. This material accepts two shaders, a vertex shader and a 
fragment shader. Let's try to make 'gradient material'.</p>
<h2>
  <a name="vertex-shader" href="#vertex-shader" class="anchor">
  </a>
  Vertex Shader
</h2>

<p>A vertex shader is a function that is applied on every vertex (point)
 of a mesh. It is usually used to distort or animate the shape of a 
mesh. Within our script it looks something like this: </p>


<div class="highlight"><pre class="highlight javascript"><code><span class="kd">function</span> <span class="nx">vertexShader</span><span class="p">()</span> <span class="p">{</span>
  <span class="k">return</span> <span class="s2">`
    varying vec3 vUv; 

    void main() {
      vUv = position; 

      vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
      gl_Position = projectionMatrix * modelViewPosition; 
    }
  `</span>
<span class="p">}</span>
</code></pre></div>


<p>The first thing that you probably notice is that all our GLSL code is
 in a string. We do this because WebGL will pass this piece of code to 
our GPU and we have to pass the code to WebGL within javascript. The 
second thing you might notice is that we are using variables that we did
 not create. This is because threejs passes those variables to the GPU 
for us. </p>

<p>Within this piece of code we calculate where the points of our mesh 
should be placed. We do this by calculating where the points are in the 
scene by multiplying the position of the mesh in the scene 
(modelViewMatrix) and the position of the point. After that we multiply 
this value with the camera's relation to the scene (projectionMatrix) so
 the camera settings within threejs are respected by our shader. The 
gl_Position is the value that the GPU takes to draw our points. </p>

<p>Right now this vertex shader doesn't change anything about our shape.
 So why even bother creating this at all? We will need the positions of 
parts of our mesh to create a nice gradient. By creating a 'varying' 
variable we can pass the position to another shader.  </p>
<h2>
  <a name="fragment-shader" href="#fragment-shader" class="anchor">
  </a>
  Fragment shader
</h2>

<p>A fragment shader is a function that is applied on every fragment of 
our mesh. A fragment is a result of a process called rasterization which
 turns the entire mesh into a collection of triangles. For every pixel 
that is covered by our mesh there will be at least one fragment. The 
fragment shader is usually used to do color transformations on pixels. 
Our fragment shader looks like this: </p>


<div class="highlight"><pre class="highlight javascript"><code>  <span class="k">return</span> <span class="s2">`
      uniform vec3 colorA; 
      uniform vec3 colorB; 
      varying vec3 vUv;

      void main() {
        gl_FragColor = vec4(mix(colorA, colorB, vUv.z), 1.0);
      }
  `</span>
<span class="p">}</span>
</code></pre></div>


<p>As you can see we take the value of the position that was passed by 
the vertex shader. We want to apply a mix of the colors A and B based on
 the position of the fragment on the z axis of our mesh. But where do 
the colors A and B come from? These are 'uniform' variables which means 
they are passed into the shader from the outside. The mix function will 
calculate the RGB value we want to draw for this fragment. This color 
and an additional value for the opacity are passed to gl_FragColor. Our 
GPU will set the color of a fragment to this color.</p>
<h2>
  <a name="creating-the-material" href="#creating-the-material" class="anchor">
  </a>
  Creating the material
</h2>

<p>Now that we've created the shaders we can finally build our threejs mesh with a custom material.</p>


<div class="highlight"><pre class="highlight javascript"><code><span class="kd">function</span> <span class="nx">addExperimentalCube</span><span class="p">()</span> <span class="p">{</span>
  <span class="kd">let</span> <span class="nx">uniforms</span> <span class="o">=</span> <span class="p">{</span>
        <span class="na">colorB</span><span class="p">:</span> <span class="p">{</span><span class="na">type</span><span class="p">:</span> <span class="s1">'vec3'</span><span class="p">,</span> <span class="na">value</span><span class="p">:</span> <span class="k">new</span> <span class="nx">THREE</span><span class="p">.</span><span class="nx">Color</span><span class="p">(</span><span class="mh">0xACB6E5</span><span class="p">)},</span>
        <span class="na">colorA</span><span class="p">:</span> <span class="p">{</span><span class="na">type</span><span class="p">:</span> <span class="s1">'vec3'</span><span class="p">,</span> <span class="na">value</span><span class="p">:</span> <span class="k">new</span> <span class="nx">THREE</span><span class="p">.</span><span class="nx">Color</span><span class="p">(</span><span class="mh">0x74ebd5</span><span class="p">)}</span>
    <span class="p">}</span>

  <span class="kd">let</span> <span class="nx">geometry</span> <span class="o">=</span> <span class="k">new</span> <span class="nx">THREE</span><span class="p">.</span><span class="nx">BoxGeometry</span><span class="p">(</span><span class="mi">1</span><span class="p">,</span> <span class="mi">1</span><span class="p">,</span> <span class="mi">1</span><span class="p">)</span>
  <span class="kd">let</span> <span class="nx">material</span> <span class="o">=</span>  <span class="k">new</span> <span class="nx">THREE</span><span class="p">.</span><span class="nx">ShaderMaterial</span><span class="p">({</span>
    <span class="na">uniforms</span><span class="p">:</span> <span class="nx">uniforms</span><span class="p">,</span>
    <span class="na">fragmentShader</span><span class="p">:</span> <span class="nx">fragmentShader</span><span class="p">(),</span>
    <span class="na">vertexShader</span><span class="p">:</span> <span class="nx">vertexShader</span><span class="p">(),</span>
  <span class="p">})</span>

  <span class="kd">let</span> <span class="nx">mesh</span> <span class="o">=</span> <span class="k">new</span> <span class="nx">THREE</span><span class="p">.</span><span class="nx">Mesh</span><span class="p">(</span><span class="nx">geometry</span><span class="p">,</span> <span class="nx">material</span><span class="p">)</span>
  <span class="nx">mesh</span><span class="p">.</span><span class="nx">position</span><span class="p">.</span><span class="nx">x</span> <span class="o">=</span> <span class="mi">2</span>
  <span class="nx">scene</span><span class="p">.</span><span class="nx">add</span><span class="p">(</span><span class="nx">mesh</span><span class="p">)</span>
  <span class="nx">sceneObjects</span><span class="p">.</span><span class="nx">push</span><span class="p">(</span><span class="nx">mesh</span><span class="p">)</span>
<span class="p">}</span>
</code></pre></div>


<p>This is where everything comes together. Our 'uniforms' colorA and 
colorB are created and passed along with the vertex shader and fragment 
shader into the shader material. The material and geometry are used to 
create a mesh and the mesh is added to the scene.</p>


<div class="glitch-embed-wrap" style="height: 450px; width: 100%;margin: 1em auto 1.3em">
  <iframe sandbox="allow-same-origin allow-scripts allow-forms allow-top-navigation-by-user-activation" src="Creating%20a%20custom%20shader%20in%20Three_files/a." alt="three-cube-experiment on glitch" style="height: 100%; width: 100%; border: 0;margin:0;padding:0"></iframe>
</div>

<p><br><br>
I build this in glitch. A friend recommended it and it is great! Some add blockers block you loading the embed though, so <a href="https://three-cube-experiment.glitch.me/">here is a direct link</a> just in case.</p>

<p>The left cube is a cube using mesh lambert material, the right cube 
uses our own 'gradient material'. As you can see our material looks 
pretty sweet but ignores the light settings in the scene. This is 
because we didn't do the math in our fragment shader to take the light 
into account. This is hopefully something I figure out soon 😝.</p>

<h1>
  <a name="resources" href="#resources" class="anchor">
  </a>
  Resources
</h1>

<p>It took some time to figure this out and if you liked this you should
 really check out the sources I have used to learn and understand this:</p>

<ul>
<li><a href="https://www.youtube.com/watch?v=uD4GnMsAH1U&amp;index=5&amp;list=PL08jItIqOb2qyMOhtEUoLh100KpccQiRf">CJ Gammon - Three.js Part 5: Shaders</a></li>
<li><a href="https://thebookofshaders.com/06/">The book of shaders - color</a></li>
</ul>


      </div>
      <div class="article-actions" id="article-reaction-actions">
    <button id="reaction-butt-like" class="article-reaction-butt like-reaction-button activated" data-category="like" alt="heart-emoji" title="heart">
      <img alt="heart" src="Creating%20a%20custom%20shader%20in%20Three_files/emoji-one-heart-855b5a6263042e4c9448cf2cb0dd2e201598b77b1e3f.png"><span class="reaction-number" id="reaction-number-like">20</span>
    </button>
    <button id="reaction-butt-unicorn" class="article-reaction-butt unicorn-reaction-button activated" data-category="unicorn" alt="unicorn-emoji" title="unicorn">
      <img alt="unicorn" src="Creating%20a%20custom%20shader%20in%20Three_files/emoji-one-unicorn-695106da1194513bfa0092f1a75943f59089be7d6a.png"><span class="reaction-number" id="reaction-number-unicorn">10</span>
    </button>
    <button id="reaction-butt-readinglist" class="article-reaction-butt readinglist-reaction-button activated" data-category="readinglist" alt="unicorn-emoji" title="reading list">
      <img alt="reading list" src="Creating%20a%20custom%20shader%20in%20Three_files/emoji-one-bookmark-040f92162fa88c379d9d4e04bc5c192b1eb0b080d.png"><span class="reaction-number" id="reaction-number-readinglist">13</span>
    </button>
  <a class="article-actions-tweet-button" id="article-actions-tweet-button" rel="noopener" target="_blank" href="https://twitter.com/intent/tweet?text=%22Creating%20a%20custom%20shader%20in%20Three.js%22%20by%20@maniflames%20%23DEVcommunity%20https://dev.to/maniflames/creating-a-custom-shader-in-threejs-3bhi">
    <img src="Creating%20a%20custom%20shader%20in%20Three_files/twitter-99c56e7c338b4d5c17d78f658882ddf18b0bbde5b3f42f84e796.svg" alt="twitter logo">
  </a>
  <a class="article-actions-comments-count" href="#comments" id="jump-to-comments">
    DISCUSS
      <span class="article-actions-comments-count-number">(8)</span>
  </a>
  <div class="article-share-action-block">
    <button id="article-show-more-button" class="dropbtn" aria-label="Toggle dropdown menu">
      <img src="Creating%20a%20custom%20shader%20in%20Three_files/three-dots-943ace87a6e3393984e260d09db4d12e3793f6658c33197e9.svg" class="dropdown-icon" alt="dropdown menu icon">
    </button>
    <div class="dropdown-content">
      <div>
        <div class="dropdown-link-row">
          <clipboard-copy for="article-copy-link-input" aria-live="polite" aria-controls="article-copy-link-announcer" tabindex="0" role="button">
            <input type="text" id="article-copy-link-input" value="https://dev.to/maniflames/creating-a-custom-shader-in-threejs-3bhi" readonly="readonly">
            <img id="article-copy-icon" src="Creating%20a%20custom%20shader%20in%20Three_files/content-copy-d564d822fccd292272dc5db1b788fe414691a408b10ccf1.svg" alt="Copy to Clipboard">
            <span id="article-copy-link-announcer" role="alert" hidden="">Copied to Clipboard</span>
          </clipboard-copy>
        </div>
        <web-share-wrapper shareurl="https://dev.to/maniflames/creating-a-custom-shader-in-threejs-3bhi" sharetext="Creating a custom shader in Three.js" template="web-share-button">
          <div class="dropdown-link-row">
            <a target="_blank" href="https://twitter.com/intent/tweet?text=%22Creating%20a%20custom%20shader%20in%20Three.js%22%20by%20@maniflames%20%23DEVcommunity%20https://dev.to/maniflames/creating-a-custom-shader-in-threejs-3bhi">
              Share to Twitter
            </a>
          </div>
          <div class="dropdown-link-row">
            <a target="_blank" href="https://www.linkedin.com/shareArticle?mini=true&amp;url=https://dev.to/maniflames/creating-a-custom-shader-in-threejs-3bhi&amp;title=Creating%20a%20custom%20shader%20in%20Three.js&amp;summary=Something%20I%20have%20wanted%20to%20do%20for%20a%20while%20now.%20&amp;source=dev.to">
              Share to LinkedIn
            </a>
          </div>
          <div class="dropdown-link-row">
            <a target="_blank" href="https://www.reddit.com/submit?url=https://dev.to/maniflames/creating-a-custom-shader-in-threejs-3bhi&amp;title=Creating%20a%20custom%20shader%20in%20Three.js">
              Share to Reddit
            </a>
          </div>
          <div class="dropdown-link-row">
            <a target="_blank" href="https://www.facebook.com/sharer.php?u=https://dev.to/maniflames/creating-a-custom-shader-in-threejs-3bhi">
              Share to Facebook
            </a>
          </div>
        </web-share-wrapper>
        <template id="web-share-button">
          <div class="dropdown-link-row"><a href="#">Share Post</a></div>
        </template>
        <div class="dropdown-link-row"><a href="https://dev.to/report-abuse">Report Abuse</a></div>
      </div>
    </div>
  </div>
</div>

    </article>
        <div class="about-the-author" id="about-the-author">
  <div class="left-column">
    <a href="https://dev.to/maniflames">
      <img class="profile-pic" src="Creating%20a%20custom%20shader%20in%20Three_files/20086490-0693-47a3-9fe4-f289e548897d.webp" alt="maniflames profile">
    </a>
  </div>
  <div class="main-content">
    <h4><a href="https://dev.to/maniflames">Maniflames</a><button class="cta follow-action-button showing" data-info="{&quot;id&quot;:72293,&quot;className&quot;:&quot;User&quot;,&quot;style&quot;:&quot;full&quot;}" data-follow-action-button="true">+ FOLLOW</button></h4>
    <p>Exploring my interests to discover what I enjoy most :3 </p>
    <p class="social">
      <a href="https://dev.to/maniflames">
        @maniflames
      </a>
        <a href="http://twitter.com/maniflames" target="_blank" rel="noopener">
          <img alt="twitter" class="icon-img" src="Creating%20a%20custom%20shader%20in%20Three_files/twitter-logo-silhouette_1_letrqc.png" width="22" height="22"> maniflames
        </a>
        <a href="http://github.com/maniflames" target="_blank" rel="noopener">
          <img alt="github" class="icon-img" src="Creating%20a%20custom%20shader%20in%20Three_files/github-logo_m841aq.png" width="22" height="22"> maniflames
        </a>
        <a href="https://www.imanidap.nl/" target="_blank" rel="noopener">
          <img alt="link" class="icon-img" src="Creating%20a%20custom%20shader%20in%20Three_files/link-symbol_apfbll.png" width="22" height="22"> www.imanidap.nl
        </a>
    </p>
  </div>
</div>

    
      <div id="comments" style="margin-top: -56px;padding-bottom:56px;position:relative;z-index:-100" data-updated-at="2019-06-30 14:41:04 UTC"></div>
    <div class="comments-container-container">
      <div class="comments-container" id="comments-container" data-commentable-id="76870" data-commentable-type="Article">
        
<form class="new_comment" id="new_comment" action="/comments" accept-charset="UTF-8" method="post"><input name="utf8" type="hidden" value="✓">

  <input type="hidden" name="authenticity_token" value="NOTHING" id="new_comment_authenticity_token">

    <input value="76870" type="hidden" name="comment[commentable_id]" id="comment_commentable_id">
    <input value="Article" type="hidden" name="comment[commentable_type]" id="comment_commentable_type">
    
  <div class="field" id="textarea-wrapper">
    <textarea placeholder="Add to the discussion" onfocus="handleFocus(event)" onblur="handleBlur(event)" onkeyup="handleKeyUp(event)" onkeydown="handleKeyDown(event)" id="text-area" required="required" aria-label="Add a comment to the discussion" name="comment[body_markdown]"></textarea>
    <div class="preview-toggle comment-preview-div" id="preview-div"></div>
  </div>
  <div class="code-of-conduct" id="toggle-code-of-conduct-checkbox">
  </div>
  <a href="https://dev.to/p/editor_guide" class="markdown-guide" target="_blank" title="Markdown Guide">
    <img alt="markdown guide" class="icon-image" src="Creating%20a%20custom%20shader%20in%20Three_files/info-77808966a58690cfaad3e8c7923a4d78d8fab5d87e1c3f73aef7670.svg">
  </a>
  <div class="editor-image-upload">
    <input type="file" id="image-upload-main" name="file" accept="image/*" style="display:none">
    <button class="image-upload-button" id="image-upload-button-main" onclick="handleImageUpload(event,'main')" title="Upload Image">
      <img alt="upload image" class="icon-image" src="Creating%20a%20custom%20shader%20in%20Three_files/image-upload-82e70cf7bf38042009c533de1ad5806ab1c33a116c24bb1.svg">
    </button>
    <label class="image-upload-file-label" id="image-upload-file-label-main"></label>
    <input type="submit" id="image-upload-submit-main" value="Upload" style="display:none">
    <input class="uploaded-image" id="uploaded-image-main">
  </div>
  <div class="actions" id="submit-wrapper">
    <a aria-label="Cancel action" href="https://www.google.com/">
      <button id="cancel-button" class="comment-action-button comment-action-cancel">CANCEL</button>
</a>    <button id="preview-button" class="comment-action-button comment-action-preview">PREVIEW</button>
    <input type="submit" name="commit" value="SUBMIT" onclick="validateField(event)" class="comment-action-button" id="submit-button" data-disable-with="SUBMIT">
  </div>
</form>

        <div class="comment-trees" id="comment-trees-container">
                    <details open="">
      <summary><span>&nbsp;</span></summary>
      <div class="comment-hash-marker" id="89al"></div>
<div id="comment-node-146973" class="single-comment-node root  comment-deep-0" data-comment-id="146973" data-comment-author-id="52180">
    <div class="inner-comment">


      <div class="details ">
        <a href="https://dev.to/avasconcelos114">
          <img class="profile-pic" src="Creating%20a%20custom%20shader%20in%20Three_files/06a52b0a-9884-47f7-b09a-a41d4ff0aa22.webp" alt="avasconcelos114 profile image">
          <span class="comment-username">
            <span class="comment-username-inner">
              Andre Vasconcelos
            </span>
          </span>
        </a>
          <a href="https://github.com/avasconcelos114" rel="noopener noreferrer" target="_blank">
            <img class="icon-img" alt="github logo" src="Creating%20a%20custom%20shader%20in%20Three_files/github-logo-6a5bca60a4ebf959a6df7f08217acd07ac2bc285164fae04.svg">
          </a>
        <div class="comment-date">
  <a href="https://dev.to/avasconcelos114/comment/89al">
    <time datetime="2019-01-21T08:44:13Z" title="Monday, January 21, 2019, 9:44:13 AM">
      Jan 21
    </time>
  </a>
</div>

        <button class="dropbtn" aria-label="Toggle dropdown menu">
          <img class="dropdown-icon" alt="Dropdown menu icon" src="Creating%20a%20custom%20shader%20in%20Three_files/three-dots-943ace87a6e3393984e260d09db4d12e3793f6658c33197e9.svg">
        </button>
        <div class="dropdown">
          <div class="dropdown-content">
            <a href="https://dev.to/avasconcelos114/comment/89al">
              Permalink
            </a>
            <span class="comment-actions hidden" data-user-id="52180" style="display: none;">
              <a href="https://dev.to/avasconcelos114/comment/89al/settings" rel="nofollow" style="color:#0a0a0a;" data-no-instant="">Settings</a>
            </span>
            <span class="mod-actions hidden" style="display: none;">
              <a href="https://dev.to/avasconcelos114/comment/89al/mod" rel="nofollow" style="color:#0a0a0a">Moderate</a>
            </span>
            <a href="https://dev.to/report-abuse?url=https://dev.to/avasconcelos114/comment/89al">Report Abuse</a>
          </div>
        </div>
      </div>

      <div class="body ">
        

<p>The things you can do in three.js are just mindblowing  </p>

<p>I've never gotten as far as writing my own shaders but I dabbled with it when creating my company's website (<a href="https://wanderer.studio/">wanderer.studio</a>) and the sheer possibility of things you can create with it amaze me every time (just look at their <a href="https://threejs.org/">example page</a> in their site!)</p>

<p>Thank you for sharing your experiences with three.js :) </p>



        <button class="reaction-button" id="button-for-comment-146973" data-comment-id="146973" title="heart">
          <img alt="Favorite heart outline button" src="Creating%20a%20custom%20shader%20in%20Three_files/favorite-heart-outline-button-eafc0d6b1b73d9d1e00410de01d79a.svg">
          <img class="voted-heart" src="Creating%20a%20custom%20shader%20in%20Three_files/emoji-one-heart-855b5a6263042e4c9448cf2cb0dd2e201598b77b1e3f.png" alt="Favorite heart button">
        <span class="reactions-count" id="reactions-count-146973">2</span></button>
      </div>
      <div class="actions" data-comment-id="146973" data-path="/maniflames/creating-a-custom-shader-in-threejs-3bhi/comments/89al">
        <span class="current-user-actions hidden" style="display:none">
          <a data-no-instant="" href="https://dev.to/maniflames/creating-a-custom-shader-in-threejs-3bhi/comments/89al/delete_confirm" class="edit-butt" rel="nofollow">DELETE</a>
          <a href="https://dev.to/maniflames/creating-a-custom-shader-in-threejs-3bhi/comments/89al/edit" class="edit-butt" rel="nofollow">EDIT</a>
        </span>
          <a href="#/maniflames/creating-a-custom-shader-in-threejs-3bhi/comments/new/89al" class="toggle-reply-form" rel="nofollow">REPLY</a>
      </div>
    </div>
      <details open="">
      <summary><span>&nbsp;</span></summary>
      <div class="comment-hash-marker" id="89k5"></div>
<div id="comment-node-147217" class="single-comment-node child  comment-deep-1" data-comment-id="147217" data-comment-author-id="72293">
    <div class="inner-comment">


      <div class="details ">
        <a href="https://dev.to/maniflames">
          <img class="profile-pic" src="Creating%20a%20custom%20shader%20in%20Three_files/20086490-0693-47a3-9fe4-f289e548897d.jpg" alt="maniflames profile image">
          <span class="comment-username">
            <span class="comment-username-inner">
              Maniflames
            </span>
          </span>
        </a>
          <a href="https://twitter.com/maniflames" rel="noopener noreferrer" target="_blank">
            <img class="icon-img" alt="twitter logo" src="Creating%20a%20custom%20shader%20in%20Three_files/twitter-logo-42be7109de07f8c991a9832d432c9d12ec1a965b5c0004b.svg"></a>
          <a href="https://github.com/maniflames" rel="noopener noreferrer" target="_blank">
            <img class="icon-img" alt="github logo" src="Creating%20a%20custom%20shader%20in%20Three_files/github-logo-6a5bca60a4ebf959a6df7f08217acd07ac2bc285164fae04.svg">
          </a>
          <span class="op-marker">Author</span>
        <div class="comment-date">
  <a href="https://dev.to/maniflames/comment/89k5">
    <time datetime="2019-01-21T23:27:58Z" title="Tuesday, January 22, 2019, 12:27:58 AM">
      Jan 21
    </time>
  </a>
</div>

        <button class="dropbtn" aria-label="Toggle dropdown menu">
          <img class="dropdown-icon" alt="Dropdown menu icon" src="Creating%20a%20custom%20shader%20in%20Three_files/three-dots-943ace87a6e3393984e260d09db4d12e3793f6658c33197e9.svg">
        </button>
        <div class="dropdown">
          <div class="dropdown-content">
            <a href="https://dev.to/maniflames/comment/89k5">
              Permalink
            </a>
            <span class="comment-actions hidden" data-user-id="72293" style="display: none;">
              <a href="https://dev.to/maniflames/comment/89k5/settings" rel="nofollow" style="color:#0a0a0a;" data-no-instant="">Settings</a>
            </span>
            <span class="mod-actions hidden" style="display: none;">
              <a href="https://dev.to/maniflames/comment/89k5/mod" rel="nofollow" style="color:#0a0a0a">Moderate</a>
            </span>
            <a href="https://dev.to/report-abuse?url=https://dev.to/maniflames/comment/89k5">Report Abuse</a>
          </div>
        </div>
      </div>

      <div class="body ">
        

<p>Woah, the company website is super nice 👀</p>



        <button class="reaction-button" id="button-for-comment-147217" data-comment-id="147217" title="heart">
          <img alt="Favorite heart outline button" src="Creating%20a%20custom%20shader%20in%20Three_files/favorite-heart-outline-button-eafc0d6b1b73d9d1e00410de01d79a.svg">
          <img class="voted-heart" src="Creating%20a%20custom%20shader%20in%20Three_files/emoji-one-heart-855b5a6263042e4c9448cf2cb0dd2e201598b77b1e3f.png" alt="Favorite heart button">
        <span class="reactions-count" id="reactions-count-147217">2</span></button>
      </div>
      <div class="actions" data-comment-id="147217" data-path="/maniflames/creating-a-custom-shader-in-threejs-3bhi/comments/89k5">
        <span class="current-user-actions hidden" style="display:none">
          <a data-no-instant="" href="https://dev.to/maniflames/creating-a-custom-shader-in-threejs-3bhi/comments/89k5/delete_confirm" class="edit-butt" rel="nofollow">DELETE</a>
          <a href="https://dev.to/maniflames/creating-a-custom-shader-in-threejs-3bhi/comments/89k5/edit" class="edit-butt" rel="nofollow">EDIT</a>
        </span>
          <a href="#/maniflames/creating-a-custom-shader-in-threejs-3bhi/comments/new/89k5" class="toggle-reply-form" rel="nofollow">REPLY</a>
      </div>
    </div>
      <details open="">
      <summary><span>&nbsp;</span></summary>
      <div class="comment-hash-marker" id="89l3"></div>
<div id="comment-node-147241" class="single-comment-node child  comment-deep-2" data-comment-id="147241" data-comment-author-id="52180">
    <div class="inner-comment">


      <div class="details ">
        <a href="https://dev.to/avasconcelos114">
          <img class="profile-pic" src="Creating%20a%20custom%20shader%20in%20Three_files/06a52b0a-9884-47f7-b09a-a41d4ff0aa22.webp" alt="avasconcelos114 profile image">
          <span class="comment-username">
            <span class="comment-username-inner">
              Andre Vasconcelos
            </span>
          </span>
        </a>
          <a href="https://github.com/avasconcelos114" rel="noopener noreferrer" target="_blank">
            <img class="icon-img" alt="github logo" src="Creating%20a%20custom%20shader%20in%20Three_files/github-logo-6a5bca60a4ebf959a6df7f08217acd07ac2bc285164fae04.svg">
          </a>
        <div class="comment-date">
  <a href="https://dev.to/avasconcelos114/comment/89l3">
    <time datetime="2019-01-22T01:17:11Z" title="Tuesday, January 22, 2019, 2:17:11 AM">
      Jan 22
    </time>
  </a>
</div>

        <button class="dropbtn" aria-label="Toggle dropdown menu">
          <img class="dropdown-icon" alt="Dropdown menu icon" src="Creating%20a%20custom%20shader%20in%20Three_files/three-dots-943ace87a6e3393984e260d09db4d12e3793f6658c33197e9.svg">
        </button>
        <div class="dropdown">
          <div class="dropdown-content">
            <a href="https://dev.to/avasconcelos114/comment/89l3">
              Permalink
            </a>
            <span class="comment-actions hidden" data-user-id="52180" style="display: none;">
              <a href="https://dev.to/avasconcelos114/comment/89l3/settings" rel="nofollow" style="color:#0a0a0a;" data-no-instant="">Settings</a>
            </span>
            <span class="mod-actions hidden" style="display: none;">
              <a href="https://dev.to/avasconcelos114/comment/89l3/mod" rel="nofollow" style="color:#0a0a0a">Moderate</a>
            </span>
            <a href="https://dev.to/report-abuse?url=https://dev.to/avasconcelos114/comment/89l3">Report Abuse</a>
          </div>
        </div>
      </div>

      <div class="body ">
        

<p>Thanks! </p>

<p>You can make some pretty cool experiences just using the right models. I got mine from <a href="https://www.turbosquid.com/">turbosquid.com/</a>, they have a bunch of free models you can use to experiment with</p>



        <button class="reaction-button" id="button-for-comment-147241" data-comment-id="147241" title="heart">
          <img alt="Favorite heart outline button" src="Creating%20a%20custom%20shader%20in%20Three_files/favorite-heart-outline-button-eafc0d6b1b73d9d1e00410de01d79a.svg">
          <img class="voted-heart" src="Creating%20a%20custom%20shader%20in%20Three_files/emoji-one-heart-855b5a6263042e4c9448cf2cb0dd2e201598b77b1e3f.png" alt="Favorite heart button">
        <span class="reactions-count" id="reactions-count-147241">2</span></button>
      </div>
      <div class="actions" data-comment-id="147241" data-path="/maniflames/creating-a-custom-shader-in-threejs-3bhi/comments/89l3">
        <span class="current-user-actions hidden" style="display:none">
          <a data-no-instant="" href="https://dev.to/maniflames/creating-a-custom-shader-in-threejs-3bhi/comments/89l3/delete_confirm" class="edit-butt" rel="nofollow">DELETE</a>
          <a href="https://dev.to/maniflames/creating-a-custom-shader-in-threejs-3bhi/comments/89l3/edit" class="edit-butt" rel="nofollow">EDIT</a>
        </span>
          <a href="#/maniflames/creating-a-custom-shader-in-threejs-3bhi/comments/new/89l3" class="toggle-reply-form thread-indication" rel="nofollow">THREAD</a>
      </div>
    </div>
      <div class="comment-hash-marker" id="89ne"></div>
<div id="comment-node-147304" class="single-comment-node child  comment-deep-3" data-comment-id="147304" data-comment-author-id="72293">
    <div class="inner-comment">


      <div class="details ">
        <a href="https://dev.to/maniflames">
          <img class="profile-pic" src="Creating%20a%20custom%20shader%20in%20Three_files/20086490-0693-47a3-9fe4-f289e548897d.jpg" alt="maniflames profile image">
          <span class="comment-username">
            <span class="comment-username-inner">
              Maniflames
            </span>
          </span>
        </a>
          <a href="https://twitter.com/maniflames" rel="noopener noreferrer" target="_blank">
            <img class="icon-img" alt="twitter logo" src="Creating%20a%20custom%20shader%20in%20Three_files/twitter-logo-42be7109de07f8c991a9832d432c9d12ec1a965b5c0004b.svg"></a>
          <a href="https://github.com/maniflames" rel="noopener noreferrer" target="_blank">
            <img class="icon-img" alt="github logo" src="Creating%20a%20custom%20shader%20in%20Three_files/github-logo-6a5bca60a4ebf959a6df7f08217acd07ac2bc285164fae04.svg">
          </a>
          <span class="op-marker">Author</span>
        <div class="comment-date">
  <a href="https://dev.to/maniflames/comment/89ne">
    <time datetime="2019-01-22T06:47:02Z" title="Tuesday, January 22, 2019, 7:47:02 AM">
      Jan 22
    </time>
  </a>
</div>

        <button class="dropbtn" aria-label="Toggle dropdown menu">
          <img class="dropdown-icon" alt="Dropdown menu icon" src="Creating%20a%20custom%20shader%20in%20Three_files/three-dots-943ace87a6e3393984e260d09db4d12e3793f6658c33197e9.svg">
        </button>
        <div class="dropdown">
          <div class="dropdown-content">
            <a href="https://dev.to/maniflames/comment/89ne">
              Permalink
            </a>
            <span class="comment-actions hidden" data-user-id="72293" style="display: none;">
              <a href="https://dev.to/maniflames/comment/89ne/settings" rel="nofollow" style="color:#0a0a0a;" data-no-instant="">Settings</a>
            </span>
            <span class="mod-actions hidden" style="display: none;">
              <a href="https://dev.to/maniflames/comment/89ne/mod" rel="nofollow" style="color:#0a0a0a">Moderate</a>
            </span>
            <a href="https://dev.to/report-abuse?url=https://dev.to/maniflames/comment/89ne">Report Abuse</a>
          </div>
        </div>
      </div>

      <div class="body ">
        

<p>Woah, this is a site I definitely need. I always tried to find something sepecific in <a href="https://poly.google.com/">Google Poly</a> but could never really find it. I found a ton after just one search on turbosquid!</p>



        <button class="reaction-button" id="button-for-comment-147304" data-comment-id="147304" title="heart">
          <img alt="Favorite heart outline button" src="Creating%20a%20custom%20shader%20in%20Three_files/favorite-heart-outline-button-eafc0d6b1b73d9d1e00410de01d79a.svg">
          <img class="voted-heart" src="Creating%20a%20custom%20shader%20in%20Three_files/emoji-one-heart-855b5a6263042e4c9448cf2cb0dd2e201598b77b1e3f.png" alt="Favorite heart button">
        <span class="reactions-count" id="reactions-count-147304">2</span></button>
      </div>
      <div class="actions" data-comment-id="147304" data-path="/maniflames/creating-a-custom-shader-in-threejs-3bhi/comments/89ne">
        <span class="current-user-actions hidden" style="display:none">
          <a data-no-instant="" href="https://dev.to/maniflames/creating-a-custom-shader-in-threejs-3bhi/comments/89ne/delete_confirm" class="edit-butt" rel="nofollow">DELETE</a>
          <a href="https://dev.to/maniflames/creating-a-custom-shader-in-threejs-3bhi/comments/89ne/edit" class="edit-butt" rel="nofollow">EDIT</a>
        </span>
          <a href="#/maniflames/creating-a-custom-shader-in-threejs-3bhi/comments/new/89ne" class="toggle-reply-form" rel="nofollow">REPLY</a>
      </div>
    </div>
  
</div>


</div>

    </details>

</div>

    </details>

</div>

    </details>

                    <details open="">
      <summary><span>&nbsp;</span></summary>
      <div class="comment-hash-marker" id="89m3"></div>
<div id="comment-node-147267" class="single-comment-node root  comment-deep-0" data-comment-id="147267" data-comment-author-id="89190">
    <div class="inner-comment">


      <div class="details ">
        <a href="https://dev.to/dechamp">
          <img class="profile-pic" src="Creating%20a%20custom%20shader%20in%20Three_files/cc12c261-0ebe-401c-98eb-989218716aeb.webp" alt="dechamp profile image">
          <span class="comment-username">
            <span class="comment-username-inner">
              DeChamp
            </span>
          </span>
        </a>
          <a href="https://twitter.com/codeFiendio" rel="noopener noreferrer" target="_blank">
            <img class="icon-img" alt="twitter logo" src="Creating%20a%20custom%20shader%20in%20Three_files/twitter-logo-42be7109de07f8c991a9832d432c9d12ec1a965b5c0004b.svg"></a>
          <a href="https://github.com/dechamp" rel="noopener noreferrer" target="_blank">
            <img class="icon-img" alt="github logo" src="Creating%20a%20custom%20shader%20in%20Three_files/github-logo-6a5bca60a4ebf959a6df7f08217acd07ac2bc285164fae04.svg">
          </a>
        <div class="comment-date">
  <a href="https://dev.to/dechamp/comment/89m3">
    <time datetime="2019-01-22T03:57:22Z" title="Tuesday, January 22, 2019, 4:57:22 AM">
      Jan 22
    </time>
  </a>
</div>

        <button class="dropbtn" aria-label="Toggle dropdown menu">
          <img class="dropdown-icon" alt="Dropdown menu icon" src="Creating%20a%20custom%20shader%20in%20Three_files/three-dots-943ace87a6e3393984e260d09db4d12e3793f6658c33197e9.svg">
        </button>
        <div class="dropdown">
          <div class="dropdown-content">
            <a href="https://dev.to/dechamp/comment/89m3">
              Permalink
            </a>
            <span class="comment-actions hidden" data-user-id="89190" style="display: none;">
              <a href="https://dev.to/dechamp/comment/89m3/settings" rel="nofollow" style="color:#0a0a0a;" data-no-instant="">Settings</a>
            </span>
            <span class="mod-actions hidden" style="display: none;">
              <a href="https://dev.to/dechamp/comment/89m3/mod" rel="nofollow" style="color:#0a0a0a">Moderate</a>
            </span>
            <a href="https://dev.to/report-abuse?url=https://dev.to/dechamp/comment/89m3">Report Abuse</a>
          </div>
        </div>
      </div>

      <div class="body ">
        

<p>This is the first post that finally made me realize thank using 3d on
 the web, is really not that scary. Thanks for the great post! Also your
 little game is pretty awesome.</p>



        <button class="reaction-button" id="button-for-comment-147267" data-comment-id="147267" title="heart">
          <img alt="Favorite heart outline button" src="Creating%20a%20custom%20shader%20in%20Three_files/favorite-heart-outline-button-eafc0d6b1b73d9d1e00410de01d79a.svg">
          <img class="voted-heart" src="Creating%20a%20custom%20shader%20in%20Three_files/emoji-one-heart-855b5a6263042e4c9448cf2cb0dd2e201598b77b1e3f.png" alt="Favorite heart button">
        <span class="reactions-count" id="reactions-count-147267">2</span></button>
      </div>
      <div class="actions" data-comment-id="147267" data-path="/maniflames/creating-a-custom-shader-in-threejs-3bhi/comments/89m3">
        <span class="current-user-actions hidden" style="display:none">
          <a data-no-instant="" href="https://dev.to/maniflames/creating-a-custom-shader-in-threejs-3bhi/comments/89m3/delete_confirm" class="edit-butt" rel="nofollow">DELETE</a>
          <a href="https://dev.to/maniflames/creating-a-custom-shader-in-threejs-3bhi/comments/89m3/edit" class="edit-butt" rel="nofollow">EDIT</a>
        </span>
          <a href="#/maniflames/creating-a-custom-shader-in-threejs-3bhi/comments/new/89m3" class="toggle-reply-form" rel="nofollow">REPLY</a>
      </div>
    </div>
      <details open="">
      <summary><span>&nbsp;</span></summary>
      <div class="comment-hash-marker" id="89nh"></div>
<div id="comment-node-147307" class="single-comment-node child  comment-deep-1" data-comment-id="147307" data-comment-author-id="72293">
    <div class="inner-comment">


      <div class="details ">
        <a href="https://dev.to/maniflames">
          <img class="profile-pic" src="Creating%20a%20custom%20shader%20in%20Three_files/20086490-0693-47a3-9fe4-f289e548897d.jpg" alt="maniflames profile image">
          <span class="comment-username">
            <span class="comment-username-inner">
              Maniflames
            </span>
          </span>
        </a>
          <a href="https://twitter.com/maniflames" rel="noopener noreferrer" target="_blank">
            <img class="icon-img" alt="twitter logo" src="Creating%20a%20custom%20shader%20in%20Three_files/twitter-logo-42be7109de07f8c991a9832d432c9d12ec1a965b5c0004b.svg"></a>
          <a href="https://github.com/maniflames" rel="noopener noreferrer" target="_blank">
            <img class="icon-img" alt="github logo" src="Creating%20a%20custom%20shader%20in%20Three_files/github-logo-6a5bca60a4ebf959a6df7f08217acd07ac2bc285164fae04.svg">
          </a>
          <span class="op-marker">Author</span>
        <div class="comment-date">
  <a href="https://dev.to/maniflames/comment/89nh">
    <time datetime="2019-01-22T06:55:57Z" title="Tuesday, January 22, 2019, 7:55:57 AM">
      Jan 22
    </time>
  </a>
</div>

        <button class="dropbtn" aria-label="Toggle dropdown menu">
          <img class="dropdown-icon" alt="Dropdown menu icon" src="Creating%20a%20custom%20shader%20in%20Three_files/three-dots-943ace87a6e3393984e260d09db4d12e3793f6658c33197e9.svg">
        </button>
        <div class="dropdown">
          <div class="dropdown-content">
            <a href="https://dev.to/maniflames/comment/89nh">
              Permalink
            </a>
            <span class="comment-actions hidden" data-user-id="72293" style="display: none;">
              <a href="https://dev.to/maniflames/comment/89nh/settings" rel="nofollow" style="color:#0a0a0a;" data-no-instant="">Settings</a>
            </span>
            <span class="mod-actions hidden" style="display: none;">
              <a href="https://dev.to/maniflames/comment/89nh/mod" rel="nofollow" style="color:#0a0a0a">Moderate</a>
            </span>
            <a href="https://dev.to/report-abuse?url=https://dev.to/maniflames/comment/89nh">Report Abuse</a>
          </div>
        </div>
      </div>

      <div class="body ">
        

<p>Thanks! Of all people, you saying this actually means a lot to me 😁.
 I'm glad that nowadays there are a lot of libraries available that make
 the use of things like 3D this easy. I hope you find a chance to try it
 out one day! </p>



        <button class="reaction-button" id="button-for-comment-147307" data-comment-id="147307" title="heart">
          <img alt="Favorite heart outline button" src="Creating%20a%20custom%20shader%20in%20Three_files/favorite-heart-outline-button-eafc0d6b1b73d9d1e00410de01d79a.svg">
          <img class="voted-heart" src="Creating%20a%20custom%20shader%20in%20Three_files/emoji-one-heart-855b5a6263042e4c9448cf2cb0dd2e201598b77b1e3f.png" alt="Favorite heart button">
        <span class="reactions-count" id="reactions-count-147307">1</span></button>
      </div>
      <div class="actions" data-comment-id="147307" data-path="/maniflames/creating-a-custom-shader-in-threejs-3bhi/comments/89nh">
        <span class="current-user-actions hidden" style="display:none">
          <a data-no-instant="" href="https://dev.to/maniflames/creating-a-custom-shader-in-threejs-3bhi/comments/89nh/delete_confirm" class="edit-butt" rel="nofollow">DELETE</a>
          <a href="https://dev.to/maniflames/creating-a-custom-shader-in-threejs-3bhi/comments/89nh/edit" class="edit-butt" rel="nofollow">EDIT</a>
        </span>
          <a href="#/maniflames/creating-a-custom-shader-in-threejs-3bhi/comments/new/89nh" class="toggle-reply-form" rel="nofollow">REPLY</a>
      </div>
    </div>
  
</div>

    </details>

</div>

    </details>

                    <details open="">
      <summary><span>&nbsp;</span></summary>
      <div class="comment-hash-marker" id="99d3"></div>
<div id="comment-node-164609" class="single-comment-node root  comment-deep-0" data-comment-id="164609" data-comment-author-id="143487">
    <div class="inner-comment">


      <div class="details ">
        <a href="https://dev.to/anuragsahu">
          <img class="profile-pic" src="Creating%20a%20custom%20shader%20in%20Three_files/2ddd523c-3a60-4f04-99c3-d7b2c9c1f69e.webp" alt="anuragsahu profile image">
          <span class="comment-username">
            <span class="comment-username-inner">
              Anurag Sahu
            </span>
          </span>
        </a>
          <a href="https://github.com/AnuragSahu" rel="noopener noreferrer" target="_blank">
            <img class="icon-img" alt="github logo" src="Creating%20a%20custom%20shader%20in%20Three_files/github-logo-6a5bca60a4ebf959a6df7f08217acd07ac2bc285164fae04.svg">
          </a>
        <div class="comment-date">
  <a href="https://dev.to/anuragsahu/comment/99d3">
    <time datetime="2019-03-08T18:28:58Z" title="Friday, March 8, 2019, 7:28:58 PM">
      Mar  8
    </time>
  </a>
</div>

        <button class="dropbtn" aria-label="Toggle dropdown menu">
          <img class="dropdown-icon" alt="Dropdown menu icon" src="Creating%20a%20custom%20shader%20in%20Three_files/three-dots-943ace87a6e3393984e260d09db4d12e3793f6658c33197e9.svg">
        </button>
        <div class="dropdown">
          <div class="dropdown-content">
            <a href="https://dev.to/anuragsahu/comment/99d3">
              Permalink
            </a>
            <span class="comment-actions hidden" data-user-id="143487" style="display: none;">
              <a href="https://dev.to/anuragsahu/comment/99d3/settings" rel="nofollow" style="color:#0a0a0a;" data-no-instant="">Settings</a>
            </span>
            <span class="mod-actions hidden" style="display: none;">
              <a href="https://dev.to/anuragsahu/comment/99d3/mod" rel="nofollow" style="color:#0a0a0a">Moderate</a>
            </span>
            <a href="https://dev.to/report-abuse?url=https://dev.to/anuragsahu/comment/99d3">Report Abuse</a>
          </div>
        </div>
      </div>

      <div class="body ">
        

<p>Loved the Effort you put in to,</p>

<p>my learning</p>

<blockquote>
<p>the argument you pass in uniform are recoverable by the shaders<br>
Thanks for Helping me fix my code</p>
</blockquote>



        <button class="reaction-button" id="button-for-comment-164609" data-comment-id="164609" title="heart">
          <img alt="Favorite heart outline button" src="Creating%20a%20custom%20shader%20in%20Three_files/favorite-heart-outline-button-eafc0d6b1b73d9d1e00410de01d79a.svg">
          <img class="voted-heart" src="Creating%20a%20custom%20shader%20in%20Three_files/emoji-one-heart-855b5a6263042e4c9448cf2cb0dd2e201598b77b1e3f.png" alt="Favorite heart button">
        <span class="reactions-count" id="reactions-count-164609">2</span></button>
      </div>
      <div class="actions" data-comment-id="164609" data-path="/maniflames/creating-a-custom-shader-in-threejs-3bhi/comments/99d3">
        <span class="current-user-actions hidden" style="display:none">
          <a data-no-instant="" href="https://dev.to/maniflames/creating-a-custom-shader-in-threejs-3bhi/comments/99d3/delete_confirm" class="edit-butt" rel="nofollow">DELETE</a>
          <a href="https://dev.to/maniflames/creating-a-custom-shader-in-threejs-3bhi/comments/99d3/edit" class="edit-butt" rel="nofollow">EDIT</a>
        </span>
          <a href="#/maniflames/creating-a-custom-shader-in-threejs-3bhi/comments/new/99d3" class="toggle-reply-form" rel="nofollow">REPLY</a>
      </div>
    </div>
  
</div>

    </details>

                    <details open="">
      <summary><span>&nbsp;</span></summary>
      <div class="comment-hash-marker" id="898c"></div>
<div id="comment-node-146912" class="single-comment-node root  comment-deep-0" data-comment-id="146912" data-comment-author-id="81452">
    <div class="inner-comment">


      <div class="details ">
        <a href="https://dev.to/shoupn">
          <img class="profile-pic" src="Creating%20a%20custom%20shader%20in%20Three_files/aefbb8d9-48e3-4e7c-a98b-9a6cf4c773e2.webp" alt="shoupn profile image">
          <span class="comment-username">
            <span class="comment-username-inner">
              Nick Shoup
            </span>
          </span>
        </a>
          <a href="https://github.com/shoupn" rel="noopener noreferrer" target="_blank">
            <img class="icon-img" alt="github logo" src="Creating%20a%20custom%20shader%20in%20Three_files/github-logo-6a5bca60a4ebf959a6df7f08217acd07ac2bc285164fae04.svg">
          </a>
        <div class="comment-date">
  <a href="https://dev.to/shoupn/comment/898c">
    <time datetime="2019-01-21T03:30:38Z" title="Monday, January 21, 2019, 4:30:38 AM">
      Jan 21
    </time>
  </a>
</div>

        <button class="dropbtn" aria-label="Toggle dropdown menu">
          <img class="dropdown-icon" alt="Dropdown menu icon" src="Creating%20a%20custom%20shader%20in%20Three_files/three-dots-943ace87a6e3393984e260d09db4d12e3793f6658c33197e9.svg">
        </button>
        <div class="dropdown">
          <div class="dropdown-content">
            <a href="https://dev.to/shoupn/comment/898c">
              Permalink
            </a>
            <span class="comment-actions hidden" data-user-id="81452" style="display: none;">
              <a href="https://dev.to/shoupn/comment/898c/settings" rel="nofollow" style="color:#0a0a0a;" data-no-instant="">Settings</a>
            </span>
            <span class="mod-actions hidden" style="display: none;">
              <a href="https://dev.to/shoupn/comment/898c/mod" rel="nofollow" style="color:#0a0a0a">Moderate</a>
            </span>
            <a href="https://dev.to/report-abuse?url=https://dev.to/shoupn/comment/898c">Report Abuse</a>
          </div>
        </div>
      </div>

      <div class="body ">
        

<p>Will be checking out Three.js, looks promising for a lot of different ways to do data visualization. </p>



        <button class="reaction-button" id="button-for-comment-146912" data-comment-id="146912" title="heart">
          <img alt="Favorite heart outline button" src="Creating%20a%20custom%20shader%20in%20Three_files/favorite-heart-outline-button-eafc0d6b1b73d9d1e00410de01d79a.svg">
          <img class="voted-heart" src="Creating%20a%20custom%20shader%20in%20Three_files/emoji-one-heart-855b5a6263042e4c9448cf2cb0dd2e201598b77b1e3f.png" alt="Favorite heart button">
        <span class="reactions-count" id="reactions-count-146912">2</span></button>
      </div>
      <div class="actions" data-comment-id="146912" data-path="/maniflames/creating-a-custom-shader-in-threejs-3bhi/comments/898c">
        <span class="current-user-actions hidden" style="display:none">
          <a data-no-instant="" href="https://dev.to/maniflames/creating-a-custom-shader-in-threejs-3bhi/comments/898c/delete_confirm" class="edit-butt" rel="nofollow">DELETE</a>
          <a href="https://dev.to/maniflames/creating-a-custom-shader-in-threejs-3bhi/comments/898c/edit" class="edit-butt" rel="nofollow">EDIT</a>
        </span>
          <a href="#/maniflames/creating-a-custom-shader-in-threejs-3bhi/comments/new/898c" class="toggle-reply-form" rel="nofollow">REPLY</a>
      </div>
    </div>
  
</div>

    </details>

        </div>
      </div>
      <div class="show-comments-footer">
        <div>
  <a href="https://dev.to/code-of-conduct">code of conduct</a>
-
<a href="https://dev.to/report-abuse?url=http://dev.to/maniflames/creating-a-custom-shader-in-threejs-3bhi">report abuse</a>

</div>

      </div>
    </div>

  </div>

      <div class="container show-page-content-display" data-details="__design-patterns-in-java-58na" id="classic_article_97294">
  <div class="content-classification">
    <span class="content-classification-text">Classic DEV Post from Apr  4</span>
  </div>
  <div class="main-content-display">
    <h2>
  <a href="https://dev.to/awwsmm/design-patterns-in-java-58na?utm_source=additional_box&amp;utm_medium=internal&amp;utm_campaign=regular&amp;booster_org=" class="" data-details="__design-patterns-in-java-58na">Design Patterns in Java</a>
</h2>
<div class="content-author">
  <a href="https://dev.to/awwsmm?utm_source=additional_box&amp;utm_medium=internal&amp;utm_campaign=regular&amp;booster_org=">
    <img class="profile-pic" src="Creating%20a%20custom%20shader%20in%20Three_files/0495bf56-0d29-48e0-9746-25c60d2c673a_002.webp" alt="awwsmm profile image">
    <span>Andrew</span>
  </a>
</div>
<p>
  <a href="https://dev.to/awwsmm/design-patterns-in-java-58na?utm_source=additional_box&amp;utm_medium=internal&amp;utm_campaign=regular&amp;booster_org=" class="" data-details="__design-patterns-in-java-58na">
    

I thought it would be a fun to write a series of blog posts looking at differen...
  </a>
</p><div class="engagement-count">
    <img src="Creating%20a%20custom%20shader%20in%20Three_files/reactions-stack-ee166e138ca182a567f74c986b6f810f670f4d199aca.png" alt="Reactions"> 92
    <img src="Creating%20a%20custom%20shader%20in%20Three_files/comments-bubble-9958d41b969a1620c614347d5ad3f270ab49582c1d9f.png" alt="Reactions" class="comments-bubble"> 14
</div>
<p></p>

  </div>
  <div class="secondary-content-display">
      <div class="profile-pic-wrapper">
    <a href="https://dev.to/awwsmm?utm_source=additional_box&amp;utm_medium=internal&amp;utm_campaign=regular&amp;booster_org=" class="" data-details="__PROFILE">
      <img class="profile-image" src="Creating%20a%20custom%20shader%20in%20Three_files/0495bf56-0d29-48e0-9746-25c60d2c673a.webp" alt="Andrew profile image" loading="lazy" data-details="__PROFILE" style="border: 4px solid #73B1B7"></a>
  </div>
  <div class="org-name">
    <a href="https://dev.to/awwsmm?utm_source=additional_box&amp;utm_medium=internal&amp;utm_campaign=regular&amp;booster_org=" class="" data-details="__PROFILE">Andrew</a>
  </div>
<button class="cta follow-action-button user-profile-follow-button showing" style="color:#D2B48C;background-color:#73B1B7" data-info="{&quot;id&quot;:101393,&quot;className&quot;:&quot;User&quot;}">+ FOLLOW</button>

  </div>
</div>

    <div id="additional-content-area" data-article-id="76870,97294">    <div class="container show-page-content-display" data-details="__blockchain-using-nodejs-and-socketio-5gbe" id="classic_article_58328">
  <div class="content-classification">
    <span class="content-classification-text">Another Post You Might Like</span>
  </div>
  <div class="main-content-display">
    <h2>
  <a href="https://dev.to/sadarshannaiynar/blockchain-using-nodejs-and-socketio-5gbe?utm_source=additional_box&amp;utm_medium=internal&amp;utm_campaign=regular&amp;booster_org=" class="" data-details="__blockchain-using-nodejs-and-socketio-5gbe">Blockchain using NodeJS and Socket.io</a>
</h2>
<div class="content-author">
  <a href="https://dev.to/sadarshannaiynar?utm_source=additional_box&amp;utm_medium=internal&amp;utm_campaign=regular&amp;booster_org=">
    <img class="profile-pic" src="Creating%20a%20custom%20shader%20in%20Three_files/832b93bf-197a-4a8e-8575-560bd66ea3e8_002.webp" alt="sadarshannaiynar profile image">
    <span>Adarsh</span>
  </a>
</div>
<p>
  <a href="https://dev.to/sadarshannaiynar/blockchain-using-nodejs-and-socketio-5gbe?utm_source=additional_box&amp;utm_medium=internal&amp;utm_campaign=regular&amp;booster_org=" class="" data-details="__blockchain-using-nodejs-and-socketio-5gbe">
    Creating your own blockchain using NodeJS and Socket.io
  </a>
</p><div class="engagement-count">
    <img src="Creating%20a%20custom%20shader%20in%20Three_files/reactions-stack-ee166e138ca182a567f74c986b6f810f670f4d199aca.png" alt="Reactions"> 105
    <img src="Creating%20a%20custom%20shader%20in%20Three_files/comments-bubble-9958d41b969a1620c614347d5ad3f270ab49582c1d9f.png" alt="Reactions" class="comments-bubble"> 5
</div>
<p></p>

  </div>
  <div class="secondary-content-display">
      <div class="profile-pic-wrapper">
    <a href="https://dev.to/sadarshannaiynar?utm_source=additional_box&amp;utm_medium=internal&amp;utm_campaign=regular&amp;booster_org=" class="" data-details="__PROFILE">
      <img class="profile-image" src="Creating%20a%20custom%20shader%20in%20Three_files/832b93bf-197a-4a8e-8575-560bd66ea3e8.webp" alt="Adarsh profile image" loading="lazy" data-details="__PROFILE" style="border: 4px solid #8A8E91"></a>
  </div>
  <div class="org-name">
    <a href="https://dev.to/sadarshannaiynar?utm_source=additional_box&amp;utm_medium=internal&amp;utm_campaign=regular&amp;booster_org=" class="" data-details="__PROFILE">Adarsh</a>
  </div>
<button class="cta follow-action-button user-profile-follow-button showing" style="color:#FFFFFF;background-color:#8A8E91" data-info="{&quot;id&quot;:53377,&quot;className&quot;:&quot;User&quot;}">+ FOLLOW</button>

  </div>
</div>

    <div class="container show-page-content-display" data-details="__3-steps-to-getting-started-with-open-source-4f37" id="classic_article_89743">
  <div class="content-classification">
    <span class="content-classification-text">Another Post You Might Like</span>
  </div>
  <div class="main-content-display">
    <h2>
  <a href="https://dev.to/ryan_c_harris/3-steps-to-getting-started-with-open-source-4f37?utm_source=additional_box&amp;utm_medium=internal&amp;utm_campaign=regular&amp;booster_org=" class="" data-details="__3-steps-to-getting-started-with-open-source-4f37">3 Steps to Getting Started with Open Source</a>
</h2>
<div class="content-author">
  <a href="https://dev.to/ryan_c_harris?utm_source=additional_box&amp;utm_medium=internal&amp;utm_campaign=regular&amp;booster_org=">
    <img class="profile-pic" src="Creating%20a%20custom%20shader%20in%20Three_files/286da7e0-2de9-46b3-b8cd-c56b7f70c477_002.webp" alt="ryan_c_harris profile image">
    <span>ryanharris.dev</span>
  </a>
</div>
<p>
  <a href="https://dev.to/ryan_c_harris/3-steps-to-getting-started-with-open-source-4f37?utm_source=additional_box&amp;utm_medium=internal&amp;utm_campaign=regular&amp;booster_org=" class="" data-details="__3-steps-to-getting-started-with-open-source-4f37">
    Why open source can be good for your career and how to get started
  </a>
</p><div class="engagement-count">
    <img src="Creating%20a%20custom%20shader%20in%20Three_files/reactions-stack-ee166e138ca182a567f74c986b6f810f670f4d199aca.png" alt="Reactions"> 169
</div>
<p></p>

  </div>
  <div class="secondary-content-display">
      <div class="profile-pic-wrapper">
    <a href="https://dev.to/ryan_c_harris?utm_source=additional_box&amp;utm_medium=internal&amp;utm_campaign=regular&amp;booster_org=" class="" data-details="__PROFILE">
      <img class="profile-image" src="Creating%20a%20custom%20shader%20in%20Three_files/286da7e0-2de9-46b3-b8cd-c56b7f70c477.webp" alt="ryanharris.dev profile image" loading="lazy" data-details="__PROFILE" style="border: 4px solid #010C1F"></a>
  </div>
  <div class="org-name">
    <a href="https://dev.to/ryan_c_harris?utm_source=additional_box&amp;utm_medium=internal&amp;utm_campaign=regular&amp;booster_org=" class="" data-details="__PROFILE">ryanharris.dev</a>
  </div>
<button class="cta follow-action-button user-profile-follow-button showing" style="color:#FFFFFF;background-color:#010C1F" data-info="{&quot;id&quot;:143406,&quot;className&quot;:&quot;User&quot;}">+ FOLLOW</button>

  </div>
</div>

</div>
    <div class="more-articles container">
    <a href="https://dev.to/mzanggl/turn-any-non-fluent-api-into-a-fluent-one-tap-tap-tap-24i1" data-preload-image="">
      <div class="single-other-article">
        <div class="picture">
          <img loading="lazy" alt="mzanggl profile image" src="Creating%20a%20custom%20shader%20in%20Three_files/54b02fab-2b01-4a6e-8c53-23bc71b1eef8.webp" width="100" height="100">
        </div>
        <div class="content">
          <h3>Turn any non fluent API into a fluent one - tap tap tap </h3>
          <h4>
            Michael - <time datetime="2019-06-30T06:05:29Z" title="Sunday, June 30, 2019, 8:05:29 AM">Jun 30</time>
          </h4>
        </div>
      </div>
    </a>
    <a href="https://dev.to/sahilrajput/create-and-publish-your-first-chrome-extension-in-just-5-steps-3c3n" data-preload-image="https://res.cloudinary.com/practicaldev/image/fetch/s--AIje221a--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://res.cloudinary.com/practicaldev/image/fetch/s--WIsgirou--/c_imagga_scale%2Cf_auto%2Cfl_progressive%2Ch_420%2Cq_auto%2Cw_1000/https://thepracticaldev.s3.amazonaws.com/i/287slo8t8fpzmgnmd585.jpeg">
      <div class="single-other-article">
        <div class="picture">
          <img loading="lazy" alt="sahilrajput profile image" src="Creating%20a%20custom%20shader%20in%20Three_files/1db9489e-51c1-45c1-aad1-1c29386a6249.webp" width="100" height="100">
        </div>
        <div class="content">
          <h3>Create and publish your first Chrome extension in just 5 steps.</h3>
          <h4>
            Sahil Rajput - <time datetime="2019-06-30T13:30:31Z" title="Sunday, June 30, 2019, 3:30:31 PM">Jun 30</time>
          </h4>
        </div>
      </div>
    </a>
    <a href="https://dev.to/jsmanifest/10-things-not-to-do-when-building-react-applications-58a7" data-preload-image="https://res.cloudinary.com/practicaldev/image/fetch/s--rLzkX6Kw--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://res.cloudinary.com/practicaldev/image/fetch/s--_-ANrhqT--/c_imagga_scale%2Cf_auto%2Cfl_progressive%2Ch_420%2Cq_auto%2Cw_1000/https://thepracticaldev.s3.amazonaws.com/i/07wfwxnvcjs5d1wpbyaw.jpg">
      <div class="single-other-article">
        <div class="picture">
          <img loading="lazy" alt="jsmanifest profile image" src="Creating%20a%20custom%20shader%20in%20Three_files/c044236e-552f-42d9-bbde-0b9873f689f0.jpg" width="100" height="100">
        </div>
        <div class="content">
          <h3>10 Things NOT To Do When Building React Applications</h3>
          <h4>
            jsmanifest - <time datetime="2019-06-29T19:38:42Z" title="Saturday, June 29, 2019, 9:38:42 PM">Jun 29</time>
          </h4>
        </div>
      </div>
    </a>
    <a href="https://dev.to/liyasthomas/i-created-an-online-markdown-viewer-and-editor-56lm" data-preload-image="https://res.cloudinary.com/practicaldev/image/fetch/s--UAoDFNC1--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://res.cloudinary.com/practicaldev/image/fetch/s--d1LNcZES--/c_imagga_scale%2Cf_auto%2Cfl_progressive%2Ch_420%2Cq_auto%2Cw_1000/https://thepracticaldev.s3.amazonaws.com/i/mouvv687tmbrfpph6u22.png">
      <div class="single-other-article">
        <div class="picture">
          <img loading="lazy" alt="liyasthomas profile image" src="Creating%20a%20custom%20shader%20in%20Three_files/25043ede-0ba0-4310-9346-03f47650807c.webp" width="100" height="100">
        </div>
        <div class="content">
          <h3>I created an online markdown viewer and editor</h3>
          <h4>
            Liyas Thomas - <time datetime="2019-06-30T09:09:53Z" title="Sunday, June 30, 2019, 11:09:53 AM">Jun 30</time>
          </h4>
        </div>
      </div>
    </a>
</div>

</div>

  <style>
  .primary-sticky-nav-author, .primary-sticky-nav-author-element {
    border: 1px solid #551029 !important;
    box-shadow: 1px 1px 0px #551029 !important;
  }

  .primary-sticky-nav-author button {
    background-color: #61122F !important;
    color: #FFFFFF !important;
  }

  .primary-sticky-nav-author button a {
    background-color: #61122F !important;
    color: #FFFFFF !important;
  }

  .sticky-box-connector {
    background: #551029 !important;
  }

  .primary-sticky-nav-org-cta-link {
    background-color: #FFFFFF !important;
    color: #61122F !important;
    border: 2px solid #61122F !important;
  }
</style>

<div class="primary-sticky-nav" id="article-show-primary-sticky-nav">
  <div class="primary-sticky-nav-element primary-sticky-nav-author">
    <a href="https://dev.to/maniflames"><img src="Creating%20a%20custom%20shader%20in%20Three_files/20086490-0693-47a3-9fe4-f289e548897d_002.jpg" class="primary-sticky-nav-author-top-profile-image" alt="Maniflames profile image"></a>
    <div style="display:inline-block">
      <div class="primary-sticky-nav-author-name">
        <a href="https://dev.to/maniflames">
          Maniflames
        </a>
      </div>
      <div class="primary-sticky-nav-author-username">
        <a href="https://dev.to/maniflames">
          @maniflames
        </a>
      </div>
    </div>
    <div class="primary-sticky-nav-author-summary">
        Exploring my interests to discover what I enjoy most :3 
    </div>
    <div class="primary-sticky-nav-author-follow">
      <button class="cta follow-action-button showing" data-info="{&quot;id&quot;:72293,&quot;className&quot;:&quot;User&quot;,&quot;style&quot;:&quot;full&quot;}" data-follow-action-button="true">+ FOLLOW</button></div>
      <style>
  .user-metadata-details-inner a {
    color: #5c112d
  }
</style>

<div class="user-metadata-details">
  <div class="user-metadata-details-inner">

        <div class="row">
          <div class="key">
            work
          </div>
          <div class="value">
            <span>Student Developer </span>
              <span> at </span>
                <a href="https://brandnewguys.co/" target="_blank" rel="noopener">Brand New Guys</a>
          </div>
        </div>
        <div class="row">
          <div class="key">
            location
          </div>
          <div class="value">
            The Netherlands
          </div>
        </div>
        <div class="row">
          <div class="key">
            education
          </div>
          <div class="value">
            Student @ Rotterdam University of Applied Sciences
          </div>
        </div>
    <div class="row">
      <div class="key">
        joined
      </div>
      <div class="value">
        May 10, 2018
      </div>
    </div>
  </div>
</div>

  </div>
        <div class="html-variant-wrapper" id="html-variant-article-show-sidebar" data-variant-id="156">
          <style>
.base-article-show-sidebar-variant {
  font-size: 1.1em;
  line-height: 1.4em;
  margin: 15px auto 5px;
  width: 75%;
  padding: 0px 0px 10px;
  background: #021838;
  color: white;
  border-radius: 3px;
}

.base-article-show-sidebar-variant a {
  color: #a3c9ff;
  text-decoration: underline;
}


.base-article-show-sidebar-variant img {
  width: 100%;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}


.base-article-show-sidebar-variant p {
  padding: 0px 20px;
}
</style>


<div class="base-article-show-sidebar-variant">
  <img src="Creating%20a%20custom%20shader%20in%20Three_files/giphy.gif">
  <p>
   <b>Sore eyes?</b>
  </p>
  <p>
   <b><a href="https://dev.to/enter">dev.to</a></b> now has dark mode.
  </p>
  <p>
    Go to the "misc" section of <b><a href="https://dev.to/enter">your settings</a></b> and select <b>night theme</b> ❤️
  </p>
</div>
        </div>
</div>


    <script async="">
  if(document.querySelectorAll('.fluidvids').length == 0) {
    window.Fluidvids=function(a,b){"use strict";var c,d,e=b.head||b.getElementsByTagName("head")[0],f=".fluidvids-elem{position:absolute;top:0px;left:0px;width:100%;height:100%;}.fluidvids{width:100%;position:relative;}",g=function(a){return c=new RegExp("^(https?:)?//(?:"+d.join("|")+").*$","i"),c.test(a)},h=function(a){var c=b.createElement("div"),d=a.parentNode,e=100*(parseInt(a.height?a.height:a.offsetHeight,10)/parseInt(a.width?a.width:a.offsetWidth,10));d.insertBefore(c,a),a.className+=" fluidvids-elem",c.className+=" fluidvids",c.style.paddingTop=e+"%",c.appendChild(a)},i=function(){var a=b.createElement("div");a.innerHTML="<p>x</p><style>"+f+"</style>",e.appendChild(a.childNodes[1])},j=function(a){var c=a||{},e=c.selector||"iframe";d=c.players||["www.youtube.com","player.vimeo.com"];for(var f=b.querySelectorAll(e),j=0;j<f.length;j++){var k=f[j];g(k.src)&&h(k)}i()};return{init:j}}(window,document);
    Fluidvids.init({
      selector: ['iframe', 'object'], // runs querySelectorAll()
      players: ['www.youtube.com', 'player.vimeo.com'] // players to support
    });
  }
</script>


  <script async="">
    var videoPreviews = document.getElementsByClassName("ltag__twitter-tweet__media__video-wrapper");
      [].forEach.call(videoPreviews, function(el){
        el.onclick= function(e){
          var divHeight = el.offsetHeight;
          el.style.maxHeight = divHeight + "px";
          el.getElementsByClassName("ltag__twitter-tweet__media--video-preview")[0].style.display = "none";
          el.getElementsByClassName("ltag__twitter-tweet__video")[0].style.display = "block";
          el.getElementsByTagName("video")[0].play();
        }
      })
      var tweets = document.getElementsByClassName("ltag__twitter-tweet__main");
      [].forEach.call(tweets, function(tweet){
        tweet.onclick= function(e){
          if (e.target.nodeName == "A" || e.target.parentElement.nodeName == "A"){
            return;
          }
          window.open(tweet.dataset.url,"_blank");
        }
      });
      
    
    var waitingOnPodcast = setInterval(function(){
  if (typeof initializePodcastPlayback !== 'undefined') {
    initializePodcastPlayback();
    clearInterval(waitingOnPodcast);
  }
},1);

    
    var checkRunkit = setInterval(function() {
  try {
    if(typeof(RunKit) !== 'undefined') {
      var targets = document.getElementsByClassName("runkit-element");
      for (var i = 0; i < targets.length; i++) {
        var wrapperContent = targets[i].textContent;
        if(/^(<iframe src)/.test(wrapperContent) === false) {
          if (targets[i].children.length > 0) {
            var preamble = targets[i].children[0].textContent;
            var content = targets[i].children[1].textContent;
            targets[i].innerHTML = "";
            var notebook = RunKit.createNotebook({
              element: targets[i],
              source: content,
              preamble: preamble
            });
          }
        }
      }
      clearInterval(checkRunkit);
    }
  } catch(e) {
    console.error(e);
    clearInterval(checkRunkit);
  }
}, 200);

      if (document.head.querySelector(
    'meta[name="user-signed-in"][content="true"]',
  )) {

    function displayPollResults(json) {
      var totalVotes = json.voting_data.votes_count;
      json.voting_data.votes_distribution.forEach(function(point) {
        var pollOptionItem = document.getElementById('poll_option_list_item_'+point[0]);
        var optionText = document.getElementById('poll_option_label_'+point[0]).textContent;
        if (json.user_vote_poll_option_id === point[0]) {
          var votedClass = 'optionvotedfor'
        } else {
          var votedClass = 'optionnotvotedfor'
        }
        if (totalVotes === 0) {
          var percent = 0;
        } else {
          var percent = (point[1]/totalVotes)*100;
        }
        var roundedPercent = Math.round( percent * 10 ) / 10
        var percentFromRight = (100-roundedPercent)
        var html = '<span><span class="ltag-votepercent ltag-'+votedClass+'" style="right:'+percentFromRight+'%"></span>          <span class="ltag-votepercenttext">'+optionText+' — '+roundedPercent+'%</span></span>';
        pollOptionItem.innerHTML = html;
        pollOptionItem.classList.add('already-voted')
        document.getElementById('showmethemoney-'+json.poll_id).innerHTML = '<span class="ltag-voting-results-count">'+totalVotes+' total votes</span>';
      })
    }

    var polls = document.getElementsByClassName('ltag-poll');
    for (i = 0; i < polls.length; i += 1) {
      var poll = polls[i]
      var pollId = poll.dataset.pollId
      window.fetch('/poll_votes/'+pollId)
      .then(function(response){
        response.json().then(
          function(json){
            if (json.voted) {
              displayPollResults(json)
            } else {
              var els = document.getElementById('poll_'+json.poll_id).getElementsByClassName('ltag-polloption')
              for (i = 0; i < els.length; i += 1) {
                els[i].addEventListener('click', function(e) {
                  var tokenMeta = document.querySelector("meta[name='csrf-token']")
                  if (!tokenMeta) {
                    alert('Whoops. There was an error. Your vote was not counted. Try refreshing the page.')
                    return
                  }
                  var csrfToken = tokenMeta.getAttribute('content')
                  var optionId = e.target.dataset.optionId
                  window.fetch('/poll_votes', {
                    method: 'POST',
                    headers: {
                      'X-CSRF-Token': csrfToken,
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({poll_vote: { poll_option_id: optionId } }),
                    credentials: 'same-origin',
                  }).then(function(response){
                    response.json().then(function(j){displayPollResults(j)})
                  })
                });
              }
              document.getElementById('showmethemoney-'+json.poll_id).addEventListener('click', function(e) {
                pollId = this.dataset.pollId
                window.fetch('/poll_skips', {
                  method: 'POST',
                  headers: {
                    'X-CSRF-Token': csrfToken,
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({poll_skip: {poll_id: pollId }}),
                  credentials: 'same-origin',
                }).then(function(response){
                  response.json().then(function(j){displayPollResults(j)})
                })
              });
            }
          }
        )
      })
    }
  } else {
    var els = document.getElementsByClassName('ltag-poll')
    for (i = 0; i < els.length; i += 1) {
      els[i].onclick = function(e) {
        if (typeof showModal !== "undefined") {
          showModal('poll');
        }
      }
    }
}

  </script>

<script src="Creating%20a%20custom%20shader%20in%20Three_files/webShare-de8b819121c18e109035.js" defer="defer"></script>

      </div>
    </div>
        <footer>
  <div id="footer-container" class="container">
    <div class="inner-footer-container">
      <a href="https://dev.to/">Home</a> <a href="https://dev.to/about">About</a> <a href="https://dev.to/privacy">Privacy Policy</a>
      <a href="https://dev.to/terms">Terms of Use</a> <a href="https://dev.to/contact">Contact</a> <a href="https://dev.to/code-of-conduct">Code of Conduct</a><br>
      DEV Community copyright 2016 - 2019&nbsp; 🔥
    </div>
  </div>
</footer>

        <div class="global-signup-modal" id="global-signup-modal" style="display:none">
  <div class="global-signup-modal--bg" id="global-signup-modal-bg">
    <button class="close-modal-button">
      <img src="Creating%20a%20custom%20shader%20in%20Three_files/cancel-0be8005f8856ac2a9fa9cda5be88d724bebe1252f6c87c247b225.svg" class="search-img" alt="Close modal button">
    </button>
  </div>
  <div class="global-signup-modal--inner-a">
    <img class="sloan" alt="Sloan, the sloth mascot" src="Creating%20a%20custom%20shader%20in%20Three_files/sloan.png">
    <h1>Join our DEV Community :)</h1>
    <p>
      We're a place where coders share, stay up-to-date and grow their careers.
    </p>
    <a href="https://dev.to/users/auth/twitter?callback_url=https://dev.to/users/auth/twitter/callback" class="sign-up-link cta" data-no-instant="">
      <img src="Creating%20a%20custom%20shader%20in%20Three_files/twitter-logo-42be7109de07f8c991a9832d432c9d12ec1a965b5c0004b.svg" class="icon-img" alt="Twitter logo"> Auth With Twitter
    </a>
    <a href="https://dev.to/users/auth/github?state=signup-modal" class="sign-up-link cta" data-no-instant="">
      <img src="Creating%20a%20custom%20shader%20in%20Three_files/github-logo-6a5bca60a4ebf959a6df7f08217acd07ac2bc285164fae04.svg" class="icon-img" alt="GitHub logo"> Auth With GitHub
    </a>
    <p>
      <em>We strive for transparency and don't collect excess data.</em>
    </p>
  </div>
</div>

      <div id="live-article-indicator" class="live-article-indicator"></div>
      <img class="icon-img" style="display:none" alt="twitter logo" src="Creating%20a%20custom%20shader%20in%20Three_files/twitter-logo-42be7109de07f8c991a9832d432c9d12ec1a965b5c0004b.svg">
      <img class="icon-img" style="display:none" alt="github logo" src="Creating%20a%20custom%20shader%20in%20Three_files/github-logo-6a5bca60a4ebf959a6df7f08217acd07ac2bc285164fae04.svg">
  

</body></html>