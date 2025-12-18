// ==UserScript==
// @name DarkReader
// @match *://*/*
// @grant none
// @run-at document-start
// ==/UserScript==

// MIT License

// Copyright (c) 2019 Alexander Shutau

// All rights reserved.

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

(function(){

  var dynamicFixes = [{
       "url": ["*"],
       "css": ".jfk-bubble {    background-color: ${white} !important;}.vimvixen-hint {    background-color: ${#ffd76e} !important;    border-color: ${#c59d00} !important;    color: ${#302505} !important;}"
   },
   {
       "url": ["4pda.ru"],
       "css": ".catend {    background: ${#e8e8e8} !important;}"
   },
   {
       "url": ["akinator.com"],
       "invert": [".bubble", ".bubble-body"],
       "css": ".bubble {    background-color: ${black} !important;    color: ${white} !important;}.bubble-body {    background-color: ${white} !important;    color: ${black} !important;}.question-number {    color: ${white} !important;}"
   },
   {
       "url": ["anilist.co"],
       "css": ":root {    --color-background: 39,44,56 !important;    --color-foreground: 31,35,45 !important;    --color-foreground-grey: 25,29,38 !important;    --color-foreground-grey-dark: 16,20,25 !important;    --color-foreground-blue: 25,29,38 !important;    --color-foreground-blue-dark: 19,23,29 !important;    --color-text: 159,173,189 !important;    --color-text-light: 129,140,153 !important;    --color-text-lighter: 133,150,165 !important;}"
   },
   {
       "url": ["app.datadoghq.com"],
       "invert": [".HostMap-canvas"],
       "css": ".log-dt-event.active, .log-dt-event.active:hover, .log-dt-event:hover {    background-color: rgb(37, 45, 58) !important;}svg text.time_cursor {    fill: ${black} !important;}"
   },
   {
       "url": ["app.mysms.com"],
       "css": ".message a {     color: grey;}"
   },
   {
       "url": ["app.youneedabudget.com"],
       "css": "[data-darkreader-inline-fill] {    fill: ${black} !important;}"
   },
   {
       "url": ["arstechnica.com"],
       "css": ".listing, .video-thumbnail {    background-blend-mode: initial !important;}.article-single figure img {    mix-blend-mode: initial !important;}"
   },
   {
       "url": ["askubuntu.com", "*.stackexchange.com"],
       "css": "body {  background-image: none !important;}"
   },
   {
       "url": ["atcoder.jp"],
       "css": "#fixed-server-timer {    color: #333;}"
   },
   {
       "url": ["aws.amazon.com"],
       "invert": ["a.lb-trigger", ".img-wrapper", "img[alt^=\"WEB_FreeTier\"]", ".lb-is-lazyloaded", ".lb-none-v-margin.lb-img"]
   },
   {
       "url": ["bbc.com/news", "bbc.com/sport", "bbc.com/weather", "bbc.com/travel", "bbc.com/capital", "bbc.com/autos", "bbc.com/culture", "bbc.com/future", "bbc.com/sounds", "bbc.com/food", "bbc.com/bitesize", "bbc.com/earth"],
       "invert": [".orb-nav-section.orb-nav-blocks", ".orb-icon.orb-icon-arrow"]
   },
   {
       "url": ["bgp.he.net"],
       "invert": ["img[src=\"/helogo.gif\"]", "img[src*=\"chart.googleapis.com\"]", "img[src^=\"/graphs/\"]"]
   },
   {
       "url": ["bitbucket.org"],
       "invert": ["a[href=\"/product\"]", ".registration-hero .form-prompt"]
   },
   {
       "url": ["cheapshark.com"],
       "css": ".header {    border-top: 10px solid #000 !important;}"
   },
   {
       "url": ["chtoes.li"],
       "invert": [".illustration", ".menu-page", ".menu-item"]
   },
   {
       "url": ["code.qt.io"],
       "invert": ["div#cgit", "td[class=\"logo\"]", "select", "input"]
   },
   {
       "url": ["codecademy.com"],
       "invert": [".CodeMirror-cursors", ".CodeMirror-selected", "span[class^=\"burger\"]"]
   },
   {
       "url": ["cookiepedia.co.uk"],
       "invert": [".main-logo", ".footer-logo"]
   },
   {
       "url": ["darksky.net"],
       "invert": [".currentLocationButton", ".searchButton", "span[class^=\"skycon swip\"]", "#right-arrow", "#left-arrow"]
   },
   {
       "url": ["datacamp.com"],
       "css": "video#vjs_video_3_html5_api.vjs-tech {    transform: translate(0px, 0px) !important;    background-color: rgb(175, 175, 175, 0.5);}"
   },
   {
       "url": ["developer.mozilla.org"],
       "invert": [".logo", "mark"]
   },
   {
       "url": ["digg.com"],
       "css": ".digg-story__title-link {    color: ${black} !important;}.digg-story__description {    color: ${black} !important;}"
   },
   {
       "url": ["docs.google.com"],
       "invert": [".docs-icon", ".punch-filmstrip-controls-icon", "#docs-editor canvas", ".docs-homescreen-icon", ".kix-equation-toolbar-icon", ".kix-equation-toolbar-palette-icon"]
   },
   {
       "url": ["dropbox.com"],
       "invert": [".dl-dropbox"]
   },
   {
       "url": ["drupal.org"],
       "css": "input[type=\"image\"] {  background: none;}"
   },
   {
       "url": ["dtf.ru"],
       "invert": ["mark"]
   },
   {
       "url": ["duolingo.com"],
       "invert": [".qLLbC", "._2boWj"]
   },
   {
       "url": ["education.github.com"],
       "invert": ["img[alt=\"GitHub Education\"]", ".octicon-logo-github"]
   },
   {
       "url": ["elearning.utdallas.edu"],
       "invert": [".contentBox.contentBox-edit", ".content.clearfix"]
   },
   {
       "url": ["etsy.com"],
       "invert": [".banner-container", ".secondary-banner-title"]
   },
   {
       "url": ["evernote.com"],
       "invert": [".global-logo svg"]
   },
   {
       "url": ["exmo.me"],
       "invert": ["canvas"]
   },
   {
       "url": ["facebook.com"],
       "css": ".fbNubButton {    background-image: none !important;}.jewelItemNew ._33e {    background-color: ${#d0d1d3} !important;}"
   },
   {
       "url": ["fantasy.premierleague.com"],
       "invert": [".ism-table"]
   },
   {
       "url": ["farside.ph.utexas.edu", "mathpages.com", "mathprofi.ru", "mathprofi.net", "mathworld.wolfram.com", "reference.wolfram.com", "terrytao.wordpress.com"],
       "invert": ["img"]
   },
   {
       "url": ["fastmail.com/mail"],
       "css": ".app-listItem.is-focused,.app-source.is-selected {    background-color: ${lightgray} !important;}.app-source.is-focused {    background-color: ${lightblue} !important;    color: ${black} !important;}.v-MailboxItem-unreadbadge {    background-color: ${darkblue} !important;}.v-Message-body {    border-color: transparent !important;}"
   },
   {
       "url": ["fivethirtyeight.com"],
       "invert": [".logo", ".site-logo", "#searchform", ".header-espn-link"]
   },
   {
       "url": ["github.blog"],
       "invert": ["a[href=\"https://github.com\"]", ".site-branding > svg"]
   },
   {
       "url": ["github.com"],
       "invert": [".octotree-sidebar"],
       "css": ".markdown-body code,.markdown-body pre {    background-color: ${rgba(27, 31, 35, 0.1)} !important;}.markdown-body pre code {    background-color: transparent !important;}.refined-github .dashboard .js-all-activity-header + div {    background-color: ${#e4e5e9} !important;    border-color: ${#bbc1c9} !important;}.refined-github .dashboard-rollup-items .body {    border-top-color: ${#bbc1c9} !important;}rect.day[data-count=\"0\"]{    fill: {#fff} !important;}"
   },
   {
       "url": ["gitlab.com"],
       "invert": [".js-contrib-calendar"]
   },
   {
       "url": ["giveawayoftheday.com"],
       "css": ".countdown-amount .diggit {    background: url(/images/sprite.png) 0 0 no-repeat !important;}"
   },
   {
       "url": ["google.*/maps", "google.*.*/maps"],
       "invert": ["#app-container.vasquette:not(.app-imagery-mode):not(.app-globe-mode) .widget-scene-canvas", ".widget-settings-button-icon", ".searchbox-hamburger::before", ".searchbox-searchbutton::before", ".maps-sprite-settings-chevron-left", "a.ita-kd-icon-button > span", "li.ita-kd-menuitem > span.ita-kd-menuitem-inputtool-icon", "li.ita-kd-menuitem > span.ita-kd-checkbox", "div.maps-sprite-common-chevron-left", "span.maps-sprite-common-chevron-right", "span.section-destination-via-line-icon", "div.section-directions-trip-travel-mode-icon", "div.goog-menu-button-dropdown", "button.searchbox-hamburger.white-foreground", "label.kd-radio-label:before", "label.kd-checkbox-label:before", "label.kd-checkbox-label:after", "button.section-directions-details-action-button", "div.section-loading-spinner", "a[title=\"Google Apps\"]", "a.gb_b > div", "a.gb_xc", ".gm-style img[role=\"presentation\"]:not([src*=\"v=840\"])", ".i4ewOd-xl07Ob", ".i4ewOd-LQLjdd li::before", ".un1lmc-j4gsHd"]
   },
   {
       "url": ["gsuite.google.com"],
       "invert": [".header--logo img"]
   },
   {
       "url": ["habr.com"],
       "invert": ["img[src*=\"//tex.s2cms.ru/\"]"],
       "css": "html {    text-shadow: none !important;}"
   },
   {
       "url": ["hdgo.cc", "vio.to"],
       "invert": [".hdplayer .big_play_button div", ".hdplayer .hdgo_controls div.hdgo_pause_control div", ".hdplayer .hdgo_controls div.hdgo_play_control div"]
   },
   {
       "url": ["hh.ru"],
       "css": "html {    text-shadow: none !important;}"
   },
   {
       "url": ["imdb.com"],
       "css": "#wrapper {    background: ${#e3e2dd} !important;}"
   },
   {
       "url": ["inbox.google.com"],
       "invert": [".actionIcon", "nav li img"]
   },
   {
       "url": ["instagram.com"],
       "invert": [".Igw0E.rBNOH.eGOV_.ybXk5._4EzTm", "._47KiJ", ".ltpMr", "._7zQEa", ".fr66n", "._15y0l", "._5e4p", ".wmtNn", "._5fEvj", ".XfCBB ._6q-tv", ".u-__7", ".MWDvN", ".g9vPa"]
   },
   {
       "url": ["jamboard.google.com"],
       "invert": [".docs-icon-img-container", ".jam-button-content", ".jam-icon-palette-black", ".jam-icon-sticky-note-black"]
   },
   {
       "url": ["java.com"],
       "invert": ["html #jvc0v2.bg1 .jvc0w1", "html #jvc0v2.bg3 .jvc0w1", "html #jvc0v2.bg5 .jvc0w1"]
   },
   {
       "url": ["jisho.org"],
       "invert": ["h1.logo"]
   },
   {
       "url": ["keep.google.com"],
       "invert": [".gb_oe", ".gb_je", ".gb_ef", ".gb_hc"]
   },
   {
       "url": ["lastpass.com"],
       "invert": [".lp-header__logo--link"]
   },
   {
       "url": ["lenovo.com"],
       "invert": [".m-megaMenu"],
       "css": ".m-mastheadUtilityLinks {    background: none !important;}"
   },
   {
       "url": ["lirc.org"],
       "css": "body {    background: none !important;}"
   },
   {
       "url": ["mail.google.com"],
       "invert": ["img.Hl", "img.Hk", "img.Ha", ".asor_t0", ".asor_i4"]
   },
   {
       "url": ["marginalrevolution.com"],
       "invert": [".logo-mobile", ".logo-desktop", "img[src$=\"mru-logo-450.png\"]"],
       "css": "nav {  background-color: #288d73 !important;}"
   },
   {
       "url": ["marketplace.visualstudio.com"],
       "css": ".ux-updated-date {    color: ${rgb(55, 255, 0)} !important;}.ms-Grid-row {    color: ${rgba(0, 0, 0, .8)} !important;}"
   },
   {
       "url": ["marktplaats.nl"],
       "invert": [".mp-Header-logo", ".mp-svg-messages", ".mp-svg-notification", ".mp-svg-profile", ".svg-icon-block"]
   },
   {
       "url": ["mastarti.com", "streamguard.cc"],
       "invert": [".fp-play-icon div", ".fp-pause-icon .fp-pause-block div", ".fp-volumebar em.fp-color", ".fp-fullscreen-line", ".fp-fullscreen-dot"]
   },
   {
       "url": ["medium.com"],
       "invert": [".svgIcon", ".svgIcon-use"],
       "css": "a {  text-decoration-line: underline !important;}"
   },
   {
       "url": ["medium.freecodecamp.org"],
       "css": "span.markup--quote.markup--p-quote.is-other {    background-image: linear-gradient(rgba(14, 255, 167, 0.2), rgba(14, 255, 167, 0.2)) !important;}"
   },
   {
       "url": ["messages.android.com"],
       "invert": [".x4Tquc", ".QrWqSe", ".XCHXxd", ".pXeIKc"]
   },
   {
       "url": ["messages.google.com"],
       "invert": [".x4Tquc", ".QrWqSe", ".XCHXxd", ".pXeIKc"],
       "css": ".input-background {  --input-bg-fade-color: #202124 !important;}"
   },
   {
       "url": ["messenger.com"],
       "invert": ["._4rv6", "a._4ce_"]
   },
   {
       "url": ["monstercat.com"],
       "css": ".volume-slider-outer {  z-index: -99999999999;  background-color: ${#4d4d4d} !important;}.volume-slider-inner{  background-color: ${#1873cc} !important;}.volume-slider-handle {  background-color: ${#1d1d1d} !important;}.title, h3, .line-bottom, .line-top, a, .one-line-ellipsis {  color: ${#4b4e50} !important;}"
   },
   {
       "url": ["news.ycombinator.com"],
       "invert": [".votearrow"]
   },
   {
       "url": ["nicehash.com"],
       "invert": [".chart"]
   },
   {
       "url": ["npmjs.com"],
       "invert": ["header a[href=\"/\"] svg", "#orgs_panel img.h2", "#enterprise_detail_panel img.h2", "#customers_panel img[src*=\"adobe.full.png\"]", "#customers_panel img[src*=\"bbc.full.png\"]", "#customers_panel img[src*=\"conde-nast.full.png\"]", "#customers_panel img[src*=\"netflix.full.png\"]", "#customers_panel img[src*=\"visa.full.png\"]"]
   },
   {
       "url": ["ntlite.com"],
       "css": ".fr-wrapper *::selection {    background-color: dodgerblue !important;}"
   },
   {
       "url": ["nzbget.*"],
       "invert": [".icon-top", ".icon-bottom", ".icon-up", ".icon-down"]
   },
   {
       "url": ["nzz.ch"],
       "invert": [".logo"],
       "css": ".logo {    background-color: unset !important;    color: ${white} !important;}"
   },
   {
       "url": ["online.rbb.bg"],
       "invert": [".has-context:hover", ".active", ".btn"]
   },
   {
       "url": ["op.gg"],
       "invert": [".Level", ".ranking-highest__icon .ranking-highest__level"]
   },
   {
       "url": ["opencollective.com"],
       "css": ".cover.COLECTIVE {    background-color: ${black} !important;}.backgroundCover {    background-image: unset !important;}"
   },
   {
       "url": ["pgatour.com"],
       "css": ".score-card tr td.birdie {    background-image: initial;    background-color: rgb(1, 76, 181);}"
   },
   {
       "url": ["play.google.com"],
       "invert": ["a[title=\"Google Apps\"]", "a[href=\"/store\"] > img", ".bUWb7c", ".WF1WQd"]
   },
   {
       "url": ["play.google.com/apps/publish"],
       "invert": [".IXNAUGB-u-e", ".IXNAUGB-U-g img", ".IXNAUGB-U-g", "img[src^=\"data:image/png;\"]", ".LTMPNY-u-e"]
   },
   {
       "url": ["plus.google.com"],
       "invert": ["a[title=\"Google Apps\"]", "a.gb_b > div"]
   },
   {
       "url": ["producthunt.com"],
       "invert": ["[class=\"icon_f5f81\"]"]
   },
   {
       "url": ["reddit.com"],
       "invert": ["header a[href=\"/\"] svg:nth-child(2)"],
       "css": "._1vyLCp-v-tE5QvZovwrASa {   background-color: ${#DAE0E6} !important;}._1ump7uMrSA43cqok14tPrG::before {  background: transparent !important;}"
   },
   {
       "url": ["richie-bendall.ml"],
       "css": ".content--card {    background-color: #303030;}::-webkit-scrollbar {    width: 0;    color: transparent;}body {    background-color: #5c6bc0;}.app--bar, .drawer--content :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled) .mdc-list-item--activated:after, :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled) .mdc-list-item--activated:before {    background-color: #3f51b5;}.btc-dialog .mdc-button {    color: #3f51b5;}.btc-dialog svg {    fill: white;}"
   },
   {
       "url": ["richiebendallstatus.ml"],
       "css": "#page-container {    background-image: none;}.success-bg {    background-color: #80BA27;}.warning-bg {    background-color: #f7921e;}.success {    color: #80BA27;}.warning {    color: #f7921e;}.danger-bg {    background-color: #ff0000;}.paused-bg, .info-bg, .black-bg {    background-color: #17252e;}"
   },
   {
       "url": ["runkit.com"],
       "invert": [".CodeMirror div.CodeMirror-cursor"]
   },
   {
       "url": ["scratch.mit.edu/projects/editor"],
       "css": "path.blocklyFlyoutBackground {    fill: rgb(32, 32, 32);}"
   },
   {
       "url": ["scribd.com"],
       "invert": [".a", ".logo"]
   },
   {
       "url": ["secure.ally.com"],
       "invert": [".nobd-aob-day", "#lp_invite", "#manageNonAllyAccountsFrame .third-party-iframe", "#billPayFrame"]
   },
   {
       "url": ["semmle.com"],
       "css": "#Header-logo * {    fill: #ffffff !important;}"
   },
   {
       "url": ["senscritique.com"],
       "invert": [".d-media-videos::before", ".eins-wish.black", ".eins-logo-small", ".header-navigation-main-item a img", ".eins-search-header", ".eins-poll", ".eins-compass", ".eins-compass-xl", ".eins-notification", ".eins-tv", ".eins-ticket", ".eins-current.black", ".eins-done.green", ".eins-done.white", ".eins-newspaper", ".juyLRn"],
       "css": ".ecap-products-next, .ecap-products-prev {    background-color: hsla(100, 20%, 50%, .8) !important;    color: ${black} !important;}.d-chevron3-b, .d-chevron3-l, .d-chevron3-r, .d-chevron3-t {    background-image: -webkit-image-set(url(https://static.senscritique.com/img/layout/icons/chevrons/chevron-size3.png?201710121789416) 1x,url(https://static.senscritique.com/img/layout/icons/chevrons/chevron-size3@2x.png?201710121789416) 2x);}"
   },
   {
       "url": ["share.dmhy.org"],
       "css": ".jmd_base td a {    color: ${#3391ff};}.jmd .today a {    color: ${#fff};}"
   },
   {
       "url": ["skyscanner.*", "skyscanner.*.*", "backpack.github.io", "tianxun.cn", "whoflies.com"],
       "css": "body {    background: ${white} !important;}[class*=bpk-flare-bar__curve] {    fill: ${white} !important;}"
   },
   {
       "url": ["slack.com"],
       "invert": [".slack_logo > img"]
   },
   {
       "url": ["soundcloud.com"],
       "invert": [".notificationIcon.messages::before"],
       "css": "body {    background: ${white} !important;}.listenEngagement, .commentForm__wrapper {    border: none !important;}.commentForm__wrapper {    background: none !important;}"
   },
   {
       "url": ["source.dot.net"],
       "css": ".r {    border-style: none !important;}"
   },
   {
       "url": ["stackoverflow.com"],
       "invert": ["._glyph"]
   },
   {
       "url": ["strava.com"],
       "invert": [".icon-dark", ".labelGroup", "#effort-box"],
       "css": ".base-chart .grid-line, #athlete-history-chart .vgrid {  stroke: #555555;}#athlete-history-chart #effort-box {  fill: #3e3e3e;  stroke: black;}#basic-analysis .xaxis-container .background, #basic-analysis rect.static-info-box,#basic-analysis rect.static-label-box {  fill: #2c2c2c;}.base-chart rect.simple-bar.segmentbar {  opacity: 1;}.base-chart rect.simple-bar {  fill: #444444;  stroke: #252627;}.current-week-label { fill: black; }.sum.no-rest { fill: black; }.options img {  filter: invert(40%);}#infoBox text {  color: black;}"
   },
   {
       "url": ["subdivx.com"],
       "invert": ["#cabecera img", "#contenedor_foro .cita img", "#contenedor_foro .datos img[src*=\"/img/\"]", "#perfil_izq img[src*=\"img/\"]"],
       "css": "BODY * {   color: ${#333};}A {    color: ${#0366d6} !important;}input[type=\"text\"],input[type=\"password\"],input[type=\"button\"],input[type=\"submit\"] {    background: ${#bbb};    border: 1px solid #999;}input[type=\"submit\"]:hover {    background: ${#999};    border: 1px solid #999;}mark {    background: ${#f00} !important;    color: ${#fff} !important;}#barra a,#menu_largo a,#menu_largo_chat a,#foro_tema_menu a,#ultimos_foros_renglon .link_foro_tema,.titulo_menu_izq {    color: #ddd !important;}#wrapper {    background-image: none !important;}#contenedor_gral {    display: table;    background: ${#e0e0e0} !important;    box-shadow: rgba(0, 0, 0, 0.7) 0px 0px 8px;    height: -webkit-fill-available !important;    width: fit-content !important;}#cabecera {    background: ${#e4e4e4};}#barra,#menu_top,#menu_detalle_buscador,#menu_detalle,#menu_largo,#menu_largo_chat,#prog_menu_detalle,#primer_msg_voto,#reg_menu_detalle,#drdivx_menu_detalle,#contenedor_foro .fecha,#perfil_menu,#foro_tema_menu {    background: ${rgb(153,173,206)} !important;    background: linear-gradient(to bottom, ${rgb(153,173,206)} 0%, ${rgb(75,110,171)} 100%) !important;}#foro_home,#foro_home_renglon,#cuadrados_izq,#cuadrados_izq_reng,#chat_reng,#contenedor_foro,#contenedor_foro .datos,#contenedor_foro .cita,#contenedor_foro .mensaje {    background: ${#fff} !important;}#foro_home_datos,#cuadrados_izq {   color: ${#999} !important;}#foro_home_datos a {   color: ${#669} !important;}"
   },
   {
       "url": ["technews.tw"],
       "css": "div#main.wrapper {    background-color: #000;}a {    color: rgb(206, 202, 195); }div {    background-color: #000 !important;}.widget-area .widget{    background-color: #000;}.site-header {    background-color: #000;}div.tipbar {   background-image:  none !important;}div.content table tr td h1.entry-title a{   color: rgb(206, 202, 195); }"
   },
   {
       "url": ["theguardian.com"],
       "invert": [".inline-the-guardian-logo__svg"]
   },
   {
       "url": ["thenextweb.com"],
       "invert": [".icon[class*=\"--dark\"]"]
   },
   {
       "url": ["theverge.com"],
       "invert": [".c-global-header__logo-large", ".c-masthead__logo"]
   },
   {
       "url": ["tjournal.ru"],
       "invert": ["mark"],
       "css": "mark a {  color: ${#346eb8} !important;}"
   },
   {
       "url": ["translate.google.*", "translate.google.*.*"],
       "invert": ["div.jfk-button-img", ".tlid-copy-translation-button", ".starbutton"]
   },
   {
       "url": ["tw.appledaily.com"],
       "invert": [".caltrigger img"],
       "css": ".ndgNav_second {    background-color: transparent !important;    box-shadow: none !important;}.ndgTag_front img, .ndgTag_end img {   display: none;}[class^=ndgTag] {    border-top-color: transparent !important;}"
   },
   {
       "url": ["underconsideration.com/brandnew"],
       "css": ".post-message {  color: ${black} !important;}"
   },
   {
       "url": ["vc.ru"],
       "invert": ["mark"],
       "css": "#page_wrapper {  background-color: ${#fff4e0} !important;}"
   },
   {
       "url": ["virtualbox.org"],
       "css": "body {    background: transparent !important;}"
   },
   {
       "url": ["w3.org"],
       "invert": ["img[alt~=\"equation\"]", "img[alt~=\"Equation\"]"]
   },
   {
       "url": ["web.archive.org"],
       "invert": ["#wm-sparkline-canvas", ".yt", ".sparkline-canvas", ".sparkline-mouse-highlight", ".search-toolbar-logo", "#wm-logo"],
       "css": ".measure {    z-index: 0 !important;}"
   },
   {
       "url": ["web.whatsapp.com"],
       "invert": [".tail-container", ".selectable-text > span._3PxOr"],
       "css": "._1pw2F {    border-color: white !important;    border-width: 15px !important;    border-style: solid !important;}"
   },
   {
       "url": ["webtoons.com"],
       "css": ".card_item .info {    color: black;}.card_item .info .subj {    text-shadow: -1px 1px white; }.card_item .update {    color: black;    text-shadow: -1px -1px white;}.card_item .info .author {    text-shadow: -1px -1px white;}"
   },
   {
       "url": ["what-if.xkcd.com"],
       "invert": [".illustration", ".archive-image", ".logo"]
   },
   {
       "url": ["whois.com"],
       "invert": ["img[src=\"/images/logo.gif\"]", "img[src=\"//cdnassets.com/ui/resellerdata/120000_149999/129394/supersite2/supersite/themes/EliteGreen-ResponsiveTheme/images/logo.gif\"]"]
   },
   {
       "url": ["wikibooks.org"],
       "invert": [".mwe-math-element"]
   },
   {
       "url": ["wikipedia.org"],
       "invert": [".mwe-math-element", ".mw-wiki-logo", ".central-textlogo__image", ".svg-Wikimedia-logo_black", "li::marker"],
       "css": "div .thumbimage[src$=\".png\"],div .thumbimage img[src$=\".png\"] {    background-color: white;}"
   },
   {
       "url": ["wikiwand.com"],
       "invert": ["img.mwe-math-fallback-image-inline", "img.immediate.ntmb", "img.logo_img", "td.icon", "li.menu-tooltip:not(.lang_btn)"]
   },
   {
       "url": ["www.bing.com"],
       "css": ".b_searchboxForm {    box-shadow: ${rgba(0, 0, 0, 0.1)} 0px 0px 0px 1px !important;}.b_searchboxForm:hover {    box-shadow: ${rgba(0, 0, 0, 0.1)} 0px 0px 0px 1px !important;}.b_focus .b_searchboxForm {    box-shadow: ${rgba(0, 0, 0, 0.1)} 0px 0px 0px 1px !important;}#sw_as #sa_ul:not(:empty) {    box-shadow: ${rgba(0, 0, 0, 0.1)} 0px 0px 0px 1px !important;}#b_results > li.b_ans.b_topborder, #b_results > li.b_ans.b_topborder.b_tophb.b_topshad {    box-shadow: ${rgba(13, 13, 13, 0.05)} 0px 0px 0px 1px !important;}"
   },
   {
       "url": ["www.ebay.*", "www.ebay.*.*"],
       "css": "html, body {    background-image: none !important;}"
   },
   {
       "url": ["www.gamer.com.tw", "forum.gamer.com.tw"],
       "invert": [".gsc-search-box", ".TOP-msglist div.new a", ".BA-ctag1 a"],
       "css": "body, .BA-topbg {    background: none;}.TOP-bh {    background: linear-gradient(to right, #117e96 0%, #116b80 35%, #125b6b 80%);}.TOP-msglist div.new a {    color: ${#3391ff};}"
   },
   {
       "url": ["www.google.*", "www.google.*.*"],
       "invert": [".gb_hc", ".gb_ec", ".gb_x.gb_Vb", ".gb_x.gb_Ub", ".gb_0b", "#dictionary-modules img", "a[title=\"Google Apps\"]", "a.gb_b > div"],
       "css": ".RNNXgb {    box-shadow: 0 0 2px 0 ${rgba(0,0,0,0.16)}, 0 0 0 1px ${rgba(0,0,0,0.08)} !important;}.Gor6zc {    background-color: white !important;}"
   },
   {
       "url": ["wx.qq.com", "wx2.qq.com"],
       "css": "body {    background-image: none !important;}"
   },
   {
       "url": ["youtube.com"],
       "css": "html[hide-scrollbar] ::-webkit-scrollbar {    display: none !important;}#contenteditable-textarea {    color: ${black} !important;}#like-bar {    background-color: ${rgb(144, 144, 144)} !important;}html:not(.style-scope) {    --primary-text-color: ${#212121} !important;    --primary-background-color: ${#ffffff} !important;    --disabled-text-color: ${#9b9b9b} !important;    --divider-color: ${#dbdbdb} !important;    --error-color: ${#dd2c00} !important;    --primary-color: ${#3f51b5} !important;    --accent-color: ${#ff4081} !important;    --yt-live-chat-action-panel-background-color: ${hsla(0, 0%, 93.3%, .4)} !important;    --yt-live-chat-action-panel-background-color-transparent: ${hsla(0, 0%, 97%, .8)} !important;    --yt-live-chat-background-color: ${hsl(0, 0%, 100%)} !important;    --yt-live-chat-primary-text-color: ${hsl(0, 0%, 6.7%)} !important;    --yt-live-chat-secondary-background-color: ${hsl(0, 0%, 93.3%)} !important;    --yt-live-chat-secondary-text-color: ${hsla(0, 0%, 6.7%, .6)} !important;    --yt-live-chat-tertiary-text-color: ${hsla(0, 0%, 6.7%, .4)} !important;    --yt-live-chat-disabled-icon-button-color: ${hsla(0, 0%, 6.7%, .2)} !important;    --yt-live-chat-picker-button-color: ${hsla(0, 0%, 6.7%, .4)} !important;    --yt-live-chat-text-input-field-suggestion-background-color: ${hsl(0, 0%, 100%)} !important;    --yt-live-chat-text-input-field-suggestion-background-color-hover: ${#eee} !important;    --yt-live-chat-text-input-field-suggestion-text-color: ${#666} !important;    --yt-live-chat-text-input-field-suggestion-text-color-hover: ${#333} !important;    --yt-live-chat-vem-background-color: ${hsl(0, 0, 93.3%)} !important;    --yt-emoji-picker-search-background-color: ${hsla(0, 0%, 100%, .6)} !important;    --yt-emoji-picker-search-color: ${hsla(0, 0%, 6.7%, .8)} !important;    --yt-emoji-picker-search-placeholder-color: ${hsla(0, 0%, 6.7%, .6)} !important;    --ytd-searchbox-border-color: ${hsla(0, 0%, 53.3%, .2)} !important;    --ytd-searchbox-legacy-border-color: ${#ccc} !important;    --ytd-searchbox-legacy-border-shadow-color: ${#eee} !important;    --ytd-searchbox-legacy-button-color: ${#f8f8f8} !important;    --ytd-searchbox-legacy-button-border-color: ${#d3d3d3} !important;    --ytd-searchbox-legacy-button-focus-color: ${#e9e9e9} !important;    --ytd-searchbox-legacy-button-hover-color: ${#f0f0f0} !important;    --ytd-searchbox-legacy-button-hover-border-color: ${#c6c6c6} !important;    --ytd-searchbox-legacy-button-icon-color: ${#333} !important;    --ytd-moderation-panel-background: ${hsla(0, 0%, 93.3%, .6)} !important;    --ytd-moderation-panel-hover: ${hsla(0, 0%, 93.3%, .8)} !important;    --ytd-moderation-panel-comment-text: ${hsl(0, 0%, 6.7%)} !important;    --ytd-moderation-panel-comment-metadata-text: ${hsla(0, 0%, 6.7%, .6)} !important;    --ytd-moderation-icon-color: ${hsla(0, 0%, 6.7%, .6)} !important;    --ytd-moderation-icon-hover-color: ${hsl(0, 0%, 6.7%)} !important;    --ytd-comment-text-color: ${hsl(0, 0%, 6.7%)} !important;    --ytd-watch-card-secondary-text-color: ${hsl(0, 0%, 53.3%)} !important;    --ytd-watch-card-album-header-background: ${hsl(0, 0%, 100%)} !important;    --ytd-backstage-metadata-text-color: ${hsl(0, 0%, 53.3%)} !important;    --ytd-backstage-video-link-background-color: ${hsla(0, 0%, 93.3%, .4)} !important;    --ytd-backstage-image-alert-color: ${hsla(0, 0%, 6.7%, .6)} !important;    --ytd-backstage-cancel-background-color: ${hsl(0, 0%, 100%)} !important;    --ytd-backstage-cancel-color: ${hsla(0, 0%, 6.7%, .4)} !important;    --ytd-backstage-attachment-background-color: ${hsl(0, 0%, 100%)} !important;    --ytd-backstage-creationbox-background-color: ${hsl(0, 0%, 98%)} !important;    --ytd-backstage-creationbox-background-color-focus: ${hsl(0, 0%, 96%)} !important;    --ytd-backstage-creationbox-inactive-color: ${hsla(0, 0%, 0%, .26)} !important;    --ytd-backstage-creationbox-text-color: ${hsla(0, 0%, 0%, .54)} !important;    --ytd-backstage-creationbox-input-text-color: ${hsla(0, 0%, 0%, .87)} !important;    --ytd-backstage-creationbox-disabled-button-color: ${hsla(0, 0%, 0%, .04)} !important;    --ytd-backstage-creationbox-disabled-button-text-color: ${hsl(0, 0%, 100%)} !important;    --ytd-backstage-attachment-icon-hover-color: ${hsla(0, 0%, 0%, .74)} !important;    --ytd-sponsorships-background-color-focus: ${hsla(0, 0%, 93.3%, .4)} !important;    --ytd-badge-disabled-color: ${hsla(0, 0%, 53.3%, .4)} !important;    --ytd-collection-badge-color: ${hsla(0, 0%, 6.7%, .8)} !important;    --ytd-owner-badge-color: ${hsla(0, 0%, 6.7%, .4)} !important;    --ytd-simple-badge-color: ${hsla(0, 0%, 6.7%, .6)} !important;    --ytd-shopping-product-info: ${hsla(0, 0%, 6.7%, .8)} !important;    --ytd-transcript-cue-hover-background-color: ${hsl(0, 0%, 93.3%)} !important;    --ytd-transcript-toolbar-background-color: ${hsl(0, 0%, 93.3%)} !important;    --ytd-transcript-toolbar-text: ${hsl(0, 0%, 6.7%)} !important;    --ytd-video-publish-date-color: ${hsla(0, 0%, 6.7%, .6)} !important;    --ytd-vat-notice-text: ${hsla(0, 0%, 6.7%, .6)} !important;    --ytd-offer-background-color: ${hsla(0, 0%, 93.3%, .4)} !important;    --ytd-video-game-watch-card-logo-color: ${hsl(0, 0%, 6.7%)} !important;    --ytd-watch-split-pane-sidebar-background-color: ${hsl(0, 0%, 98%)} !important;    --yt-swatch-icon-color: ${hsla(0, 0%, 6.7%, .4)} !important;    --yt-swatch-primary: ${hsl(0, 0%, 100%)} !important;    --yt-swatch-primary-darker: ${rgb(230, 230, 230)} !important;    --yt-swatch-text: ${hsla(0, 0%, 6.7%, .4)} !important;    --yt-swatch-input-text: ${hsl(0, 0%, 6.7%)} !important;    --yt-swatch-textbox-bg: ${rgb(255, 255, 255)} !important;    --yt-spec-brand-background-solid: ${#FFFFFF} !important;    --yt-spec-brand-background-primary: ${rgba(255, 255, 255, 0.98)} !important;    --yt-spec-brand-background-secondary: ${rgba(255, 255, 255, 0.95)} !important;    --yt-spec-feed-background-a: ${#F9F9F9} !important;    --yt-spec-feed-background-b: ${#F3F3F3} !important;    --yt-spec-feed-background-c: ${#EDEDED} !important;    --yt-spec-error-background: ${#1F1F1F} !important;    --yt-spec-text-primary: ${#0A0A0A} !important;    --yt-spec-text-primary-inverse: ${#FFFFFF} !important;    --yt-spec-text-secondary: ${#606060} !important;    --yt-spec-text-disabled: ${#909090} !important;    --yt-spec-call-to-action: ${#065FD4} !important;    --yt-spec-icon-active-other: ${#606060} !important;    --yt-spec-icon-inactive: ${#909090} !important;    --yt-spec-icon-disabled: ${#CCCCCC} !important;    --yt-spec-badge-chip-background: ${rgba(0, 0, 0, 0.05)} !important;    --yt-spec-suggested-action: ${#F2F8FF} !important;    --yt-spec-button-chip-background-hover: ${rgba(0, 0, 0, 0.10)} !important;    --yt-spec-touch-response: ${#000000} !important;    --yt-spec-filled-button-text: ${#FFFFFF} !important;    --yt-spec-call-to-action-inverse: ${#3EA6FF} !important;    --yt-spec-brand-icon-active: ${#FF0000} !important;    --yt-spec-brand-icon-inactive: ${#606060} !important;    --yt-spec-brand-button-background: ${#CC0000} !important;    --yt-spec-brand-link-text: ${#CC0000} !important;    --yt-spec-filled-button-focus-outline: ${rgba(0, 0, 0, 0.60)} !important;    --yt-spec-call-to-action-button-focus-outline: ${rgba(6, 95, 212, 0.30)} !important;    --yt-spec-brand-text-button-focus-outline: ${rgba(204, 0, 0, 0.30)} !important;    --yt-spec-inactive-text-button-focus-outline: ${#CCCCCC} !important;    --yt-spec-brand-subscribe-button-background: ${#FF0000} !important;    --yt-spec-wordmark-text: ${#282828} !important;    --yt-spec-10-percent-layer: ${rgba(0, 0, 0, 0.10)} !important;    --yt-spec-selected-nav-text: ${#CC0000} !important;    --yt-spec-themed-blue: ${#065FD4} !important;    --yt-spec-themed-green: ${#107516} !important;    --yt-std-body-300: ${hsla(0, 0%, 0%, .54)} !important;    --yt-std-surface-200: ${hsl(0, 0%, 98%)} !important;    --yt-std-surface-300: ${hsl(0, 0%, 96%)} !important;    --yt-std-surface-400: ${hsl(0, 0%, 93%)} !important;    --yt-primary-color: ${hsl(0, 0%, 6.7%)} !important;    --yt-primary-text-color: ${hsl(0, 0%, 6.7%)} !important;    --yt-hovered-text-color: ${hsla(0, 0%, 6.7%, .8)} !important;    --yt-secondary-text-color: ${hsla(0, 0%, 6.7%, .8)} !important;    --yt-tertiary-text-color: ${hsla(0, 0%, 6.7%, .6)} !important;    --yt-placeholder-text-color: ${hsla(0, 0%, 6.7%, .6)} !important;    --yt-border-color: ${hsl(0, 0%, 93.3%)} !important;    --yt-commentbox-border-inactive: ${hsl(0, 0%, 93.3%)} !important;    --yt-commentbox-border-active: ${hsla(0, 0%, 6.7%, .6)} !important;    --yt-primary-disabled-button-text-color: ${hsl(0, 0%, 100%)} !important;    --yt-paper-button-ink-color: ${hsl(0, 0%, 53.3%)} !important;    --yt-icon-color: ${hsla(0, 0%, 6.7%, .4)} !important;    --yt-icon-hover-color: ${hsla(0, 0%, 6.7%, .8)} !important;    --yt-icon-disabled-color: ${hsla(0, 0%, 6.7%, .6)} !important;    --yt-icon-active-color: ${hsl(0, 0%, 6.7%)} !important;    --yt-expand-color: ${hsla(0, 0%, 6.7%, .6)} !important;    --yt-placeholder-text: ${hsla(0, 0%, 6.7%, .6)} !important;    --yt-playlist-background-header: ${hsl(0, 0%, 93.3%)} !important;    --yt-playlist-background-item: ${hsla(0, 0%, 93.3%, .6)} !important;    --yt-playlist-title-text: ${hsl(0, 0%, 6.7%)} !important;    --yt-playlist-message-text: ${hsla(0, 0%, 6.7%, .6)} !important;    --yt-playlist-message-text-hover: ${hsl(0, 0%, 6.7%)} !important;    --yt-button-active-color: ${hsl(0, 0%, 6.7%)} !important;    --yt-copyright-text: ${hsla(0, 0%, 6.7%, .6)} !important;    --yt-guide-entry-text-color: ${hsla(0, 0%, 6.7%, .8)} !important;    --yt-thumbnail-placeholder-color: ${hsl(0, 0%, 89%)} !important;    --yt-featured-channel-title-text-color: ${hsla(0, 0%, 0%, .54)} !important;    --yt-formatted-string-deemphasize-color: ${hsl(0, 0%, 53.3%)} !important;    --yt-alert-background: ${hsla(0, 0%, 93.3%, .4)} !important;    --yt-video-secondary-info-description-background: ${hsla(0, 0%, 93.3%, .6)} !important;    --yt-material-searchbox-inactive: ${hsla(0, 0%, 93.3%, .6)} !important;    --yt-material-searchbox-active: ${hsl(0, 0%, 100%)} !important;    --yt-material-searchbox-inactive-shadow: ${hsla(0, 0%, 53.3%, .2)} !important;    --yt-material-searchbox-active-shadow: ${hsla(0, 0%, 0%, .26)} !important;    --yt-material-searchbox-inset: ${hsla(0, 0%, 0%, .04)} !important;    --yt-simple-menu-header-background: ${hsl(0, 0%, 93.3%)} !important;    --yt-item-section-header-color: ${hsla(0, 0%, 6.7%, .6)} !important;    --yt-menu-hover-backgound-color: ${hsl(0, 0%, 93.3%)} !important;    --yt-menu-focus-background-color: ${hsla(0, 0%, 6.7%, .2)} !important;    --yt-chat-bubble-other-border-color: ${#CCCCCC} !important;    --yt-chat-bubble-other-background-color: ${#F9F9F9} !important;    --yt-chat-bubble-self-border-color: ${#CCCCCC} !important;    --yt-chat-bubble-self-background-color: ${#EDEDED} !important;    --yt-app-background: ${hsl(0, 0%, 100%)} !important;    --yt-main-app-background: ${hsl(0, 0%, 98%)} !important;    --yt-main-app-background-tmp: ${hsl(0, 0%, 100%)} !important;    --yt-guide-background: ${hsl(0, 0%, 96%)} !important;    --yt-dialog-background: ${hsl(0, 0%, 100%)} !important;    --yt-searchbox-background: ${hsl(0, 0%, 100%)} !important;    --yt-channel-header-background: ${hsl(0, 0%, 98%)} !important;    --yt-sidebar-background: ${hsl(0, 0%, 98%)} !important;    --yt-transcript-background: ${hsl(0, 0%, 100%)} !important;    --yt-spec-general-background-a: ${white} !important;    --yt-spec-general-background-b: ${#f1f1f1} !important;    --yt-spec-general-background-c: ${#e9e9e9} !important;}.ytp-volume-slider-handle {    background-color: white !important;}.ytp-volume-slider-handle::before {    background-color: white !important;}.ytp-volume-slider-handle::after {    background-color: rgba(255,255,255,.2) !important;}"
   },
   {
       "url": ["yuque.com"],
       "invert": [".lake-math-content-preview-img > img", ".lake-math-container > img", "div[data-lake-card=\"mindmap\"] > div > div > div"]
   },
   {
       "url": ["zhuanlan.zhihu.com"],
       "invert": ["img[eeimg=\"1\"]"]
   }
];

var inversionFixes = [{
       "url": ["*"],
       "invert": ["img", "video", ":not(object):not(body)>embed", "object", "svg image", "[style*=\"background:url\"]", "[style*=\"background-image:url\"]", "[style*=\"background: url\"]", "[style*=\"background-image: url\"]", "[background]", "twitterwidget"],
       "noInvert": ["[style*=\"background:url\"] *", "[style*=\"background-image:url\"] *", "[style*=\"background: url\"] *", "[style*=\"background-image: url\"] *", "input", "[background] *", "img[src^=\"https://s0.wp.com/latex.php\"]", "twitterwidget .NaturalImage-image"],
       "removeBg": [".compatibility-with-darkreader-below-4-3-3"],
       "css": [".compatibility-with-darkreader-below-4-3-3 {", "background: white !important;", "}"]
   },
   {
       "url": ["airbnb.com"],
       "invert": [".background-cover", "#footer", "#photo-modal"],
       "noInvert": ["#footer *", "#photo-modal *"]
   },
   {
       "url": ["algassert.com"],
       "noInvert": ["img"]
   },
   {
       "url": ["aliexpress.com"],
       "css": ["#j-qrcode-img, #J_QRCodeImg {", "background-color: white !important;", "}"]
   },
   {
       "url": ["amazon.com"],
       "invert": ["#navbar", "#nav-subnav", "#navFooter", ".dv-storefront-page", ".av-hero-background-size", ".av-detail-bottom-bar", ".webPlayerContainer", ".avu-content", ".avu-section-alt", ".av-badges", ".controlsOverlayTopRight", ".pausedOverlay", ".nav-flyout"],
       "noInvert": [".DigitalVideoWebNodeLists_Item__itemImage", ".av-hero-background", ".avu-content img", ".dv-tile img", "video"]
   },
   {
       "url": ["anankeiot.com"],
       "invert": ["#sidebar-left", ".page-header", ".add-button", ".panel-footer"]
   },
   {
       "url": ["androidpolice.com"],
       "invert": [".ap-nav-wrapper", ".footer", ".logo"],
       "noInvert": [".ap-nav-wrapper *", ".footer *"]
   },
   {
       "url": ["answers.unity.com"],
       "invert": [".header-wrapper", ".navbar"]
   },
   {
       "url": ["askubuntu.com"],
       "removeBg": ["body"]
   },
   {
       "url": ["atlassian.net"],
       "invert": [".EditPage_withPanels_3Hr", ".aui-toolbar", ".editor", ".toolbar-item"]
   },
   {
       "url": ["aws.amazon.com"],
       "invert": [".m-nav-header", ".m-nav-panel-wrapper"]
   },
   {
       "url": ["bart.gov/schedules"],
       "noInvert": ["img"]
   },
   {
       "url": ["basho.com"],
       "invert": ["#site-navigation", "footer", "header", ".featured-news-wrapper", ":not(.lang):not(#foot-logo)>img"]
   },
   {
       "url": ["bbc.com"],
       "invert": ["div.orb-nav-section.orb-nav-blocks > a > img"]
   },
   {
       "url": ["betterexplained.com"],
       "noInvert": ["img.tex"]
   },
   {
       "url": ["bit-tech.net", "forums.bit-tech.net"],
       "invert": ["div#subNav", "div#anotherSubNav", ".footerContainer", "div.footer", "#bitFooter", ".nodeIcon", "li.navTab.forums.selected", "li.navTab.xengallery.selected", "li.navTab.members.selected"],
       "removeBg": ["#blurBackground", ".background-image", "#headerMover", "#loginBar"]
   },
   {
       "url": ["buxfer.com"],
       "invert": [".UIDesktopAppHeader", ".UISidebarDrawer", ".UISidebar"]
   },
   {
       "url": ["bytesloader.com"],
       "invert": [".footer-distributed", ".navbar-inverse"]
   },
   {
       "url": ["central.bitdefender.com"],
       "invert": ["#left_nav", ".top_nav", "#user_avatar"],
       "noInvert": [".logo", "#left_nav *", ".top_nav *"]
   },
   {
       "url": ["cloud.digitalocean.com"],
       "invert": [".aurora-container-left"]
   },
   {
       "url": ["codebasehq.com"],
       "invert": ["a.Project__link"]
   },
   {
       "url": ["codecombat.com"],
       "invert": [".modal-content", ".map-background", ".game-controls", ".level-content", ".modal-backdrop"]
   },
   {
       "url": ["dailymail.co.uk"],
       "noInvert": [".masthead #logo"]
   },
   {
       "url": ["dedication.pl"],
       "invert": [".wwzing"]
   },
   {
       "url": ["deezer.com"],
       "invert": [".page-sidebar"],
       "noInvert": [".player-cover *"]
   },
   {
       "url": ["devdocs.io"],
       "noInvert": ["._theme-dark"]
   },
   {
       "url": ["developer.chrome.com"],
       "css": ["mark, pre b {", "background-color: ${#fe7} !important;", "}"]
   },
   {
       "url": ["developer.mozilla.org"],
       "invert": ["#nav-footer", ".highlight-span", ".readOnlyInline", "#nav-sec", "#toc", ".socialaccount-providers", ".toggle-container .current"]
   },
   {
       "url": ["developer.playfab.com"],
       "invert": ["header"]
   },
   {
       "url": ["deviantart.com"],
       "invert": ["#navbar-menu", "#overhead-collect", ".text-wrap", ".thumb > .info", ".mobileMenuWrapper", ".tv150-tag", ".hero", ".hero-thumb", ".hero-thumb > .info", ".loggedOut", ".minibrowse-mobile-paddles-container"],
       "noInvert": [".extra-info .avatar", ".tt-crop > .tinythumb"]
   },
   {
       "url": ["disqus.com/embed/"],
       "invert": ["body.dark"],
       "noInvert": ["body.dark *"]
   },
   {
       "url": ["docs.gamesparks.com"],
       "invert": [".side-menu", ".home-menu", ".hljs"]
   },
   {
       "url": ["docs.google.com"],
       "invert": [".jfk-palette-colorswatch", "[aria-label^=\"Google Account\"]", "div[title=\"Profile\"]", ".kix-embeddedobject-image"]
   },
   {
       "url": ["docs.microsoft.com"],
       "noInvert": [".theme-dark", ".theme_night"]
   },
   {
       "url": ["docs.unity3d.com"],
       "invert": [".header", ".navbar-inverse"]
   },
   {
       "url": ["doodle.com"],
       "invert": [".d-footerContentContainer"]
   },
   {
       "url": ["drive.google.com"],
       "invert": ["[aria-label^=\"Showing viewer\"] > [aria-label^=\"Displaying\"]", "[aria-label^=\"Showing viewer\"] > [role=\"toolbar\"]", "[aria-label^=\"Showing viewer\"] [role=\"button\"][data-tooltip=\"Previous\"]", "[aria-label^=\"Showing viewer\"] [role=\"button\"][data-tooltip=\"Next\"]", "[aria-label^=\"Showing viewer\"] [aria-label^=\"Page\"]", "[aria-label^=\"Showing viewer\"] [aria-label^=\"Page\"] + div", "[aria-label^=\"No preview available\"]", "[aria-label^=\"No preview available\"] ~ div", "[aria-label^=\"There was a problem previewing\"]", "[aria-label^=\"There was a problem previewing\"] ~ div", "[aria-label^=\"Google Account\"]", "div[title=\"Profile\"]"]
   },
   {
       "url": ["dsl.sk"],
       "noInvert": ["#header img", "#title_bar img", "#bg > table > tbody > tr:nth-of-type(1) > td:nth-of-type(1)", "img[src=\"images/article_perex.gif\"]", "img[src=\"/images/design/feedback_pos.png\"]", "img[src=\"/images/design/feedback_neg.png\"]"],
       "removeBg": ["#menu", "#bg > table > tbody > tr:nth-of-type(1) > td:nth-of-type(1)"]
   },
   {
       "url": ["duckduckgo.com"],
       "invert": ["html:not(.dark-bg) #logo_homepage_link", "html:not(.dark-bg) span.header__logo.js-logo-ddg"],
       "noInvert": ["html.dark-bg", "html.dark-bg *"]
   },
   {
       "url": ["ebay.*"],
       "invert": ["body[style*=\"background-image: url\"] img", "body[style*=\"background-image: url\"] video", "body[style*=\"background-image: url\"] [style*=\"background-image: url\"]"],
       "noInvert": ["body[style*=\"background-image: url\"]"]
   },
   {
       "url": ["electronics-tutorials.ws"],
       "removeBg": ["img"]
   },
   {
       "url": ["electronjs.org"],
       "invert": ["header", ".jumbotron-home", ".highlight-dark"]
   },
   {
       "url": ["exhentai.org", "e-hentai.org"],
       "invert": ["#gd1", ".gdtm > div"]
   },
   {
       "url": ["facebook.com"],
       "invert": ["._3ixn", "._2teu", ".userContentWrapper canvas", "._4lqu", "._4lqt", "._24ws", "._1z0-", "._19eb", "._5rpb", "._5rpu", "._3t54", "._1-h1", "._3pit", "._5asn", "._1e8c", "._2b-0", "._2w_u", "._4who", "._4g9v", "._3s6x", "._5b-_", "._2r86", "._2r84 ._62jm", "._3ekx", "._3uzm", "._4-lv", "._6m3", "._2t_q", "._4-lv [role=\"button\"]", "._2ph-", "._39n", "._3u15", ".snowliftOverlay", ".coverNoImage", ".fbTimelineProfilePicSelector", ".uiTooltipX", "body.UIPage_LoggedOut #blueBarDOMInspector", "body.UIPage_LoggedOut #blueBarDOMInspector .inputtext", "canvas"],
       "noInvert": [".uiStreamStory video", ".inputtext"],
       "removeBg": ["._4d3w .stageWrapper", "._4lpe", ".stage", ".videoStage"],
       "css": ["._2s1x ._2s1y {", "background: #9BB5E8 !important;", "border-bottom-color: #92A6CA !important;", "color: black !important;", "}", ".uiContextualLayerParent {", "box-shadow: none !important;", "}"]
   },
   {
       "url": ["farside.ph.utexas.edu"],
       "noInvert": ["img"]
   },
   {
       "url": ["feedback.unity3d.com"],
       "invert": [".header-wrapper", ".navbar", ".bg-ud"]
   },
   {
       "url": ["feedly.com"],
       "invert": [".people .photo", "#feedlyUndoSign", "#feedlySignPart", ".pinContainer", ".visual-overlay"],
       "css": [".entry-overlay {", "background-color: rgba(220,220,220,0.5);", "}"]
   },
   {
       "url": ["feynmanlectures.caltech.edu"],
       "noInvert": ["img"]
   },
   {
       "url": ["forum.unity.com"],
       "invert": [".main-navigation", ".sub-nav", ".unity-logo", ".icon", ".sub-nav"]
   },
   {
       "url": ["gamesparks.com"],
       "invert": [".main_header", ".block_compatibility", ".grid_overlay", ".block_insights", ".main_footer", ".docs-hero"]
   },
   {
       "url": ["genk.vn"],
       "invert": [".ghw-bottom-header", ".ghw-top-header"]
   },
   {
       "url": ["gigaom.com"],
       "invert": [".bg"]
   },
   {
       "url": ["github.com"],
       "invert": [".jumbotron-codelines", ".bg-gray-dark", ".bg-gray-dark .form-group", ".js-project-header", ".header-logo-invertocat", ".notification-indicator", ".label", ".label-color", ".tooltipped:not(.notification-indicator)::before", ".tooltipped:not(.notification-indicator)::after", ".HeaderNavlink [data-ga-click*=\"(Logged out)\"]"],
       "css": ["header {", "background-color: #dae1e7 !important;", "}", ".markdown-body img {", "background-color: transparent !important;", "}", ".Header .header-search-wrapper {", "background-color: rgba(0, 0, 0, 0.125) !important;", "}", ".js-selected-navigation-item {", "color: rgba(0, 0, 0, 0.75) !important;", "}", "header,", ".HeaderNavlink,", ".Header .header-search-input,", ".Header .header-search-input::placeholder {", "color: rgba(0, 0, 0, 0.75) !important;", "}", ".Header .header-search-scope {", "border-right-color: #ccd7e1 !important;", "color: rgba(0, 0, 0, 0.75) !important;", "}", ".select-menu-item.navigation-focus,", ".select-menu-item.navigation-focus.selected,", ".select-menu-item.navigation-focus.select-menu-action,", ".select-menu-item.navigation-focus .description-inline {", "background: #93c6ff !important;", "color: black !important;", "}", ".HeaderMenu-link,", ".select-menu-item.navigation-focus > .octicon,", ".select-menu-item.navigation-focus.selected > .octicon,", ".select-menu-item.navigation-focus.select-menu-action > .octicon,", ".select-menu-item.navigation-focus .description-inline > .octicon {", "color: black !important;", "}"]
   },
   {
       "url": ["gitlab.*"],
       "invert": ["gl-emoji", ".navbar", ".code.dark", ".code.dark .notes_holder", ".code.solarized-dark", ".code.solarized-dark .notes_holder", ".code.monokai", ".code.monokai .notes_holder", ".blame-commit"],
       "noInvert": [".ui_light .navbar"],
       "css": ["#build-trace {", "background: rgba(255, 255, 255, 0.7) !important;", "}", "pre code {", "color: #777777 !important;", "}"]
   },
   {
       "url": ["google.*", "google.*.*"],
       "invert": [".gb_2", ".gb_M", ".gsri_a", ".gbii", ".gbip", ".azp", ".aLF-aPX-KP", ".irc_bg", ".RY3tic", "canvas.circle", "#app-container.vasquette.app-imagery-mode .widget-scene-canvas", "#app-container.vasquette.app-globe-mode .widget-scene-canvas"],
       "noInvert": [".irc_mi", ".irc_rii", ".irc_mut", ".act-icon-dark-gray", ".amI", ".amJ", ".adk", ".adj", "[src*=\"ic_\"]", "[src*=\"black\"]", ".mL", ".ajT", ".hB", ".hA", ".mK", ".mI", "input[style*=\"data:image\"]", "img[src*=\"/books/content?\"]"],
       "css": [".pI {", "background: rgba(255, 255, 255, 0.7) !important;", "}", ".eB {", "background: rgba(255, 255, 255, 0.4) !important;", "}"]
   },
   {
       "url": ["granttree.co.uk"],
       "invert": ["img", "video", "embed", ".photo"]
   },
   {
       "url": ["habitica.com"],
       "invert": ["nav.navbar", "#app-header", ".header", ".quest-boss", ".character-sprites", ".item-content", ".drawer-container .item", ".npc_matt", ".npc", ".seasonal .background", ".image", ".habitica-emoji", ".daniel_front", ".world-boss", ".dropdown-menu", ".dropdown-menu .notification", ".fade.show", ".modal-content", ".drawer-container"],
       "noInvert": ["#app-header .character-sprites", ".seasonal .background .npc"]
   },
   {
       "url": ["habr.com"],
       "noInvert": ["img[src*=\"//tex.s2cms.ru/\"]"]
   },
   {
       "url": ["hangouts.google.com"],
       "invert": [".g-Ue-ad", ".g-Ue-v0h5Oe", ".bdXzDb .pTh3n", ".gb_Hc", ".Ik", ".gbii", ".vm", ".Ce1Y1c"],
       "noInvert": ["#gbq1"],
       "removeBg": [".g-Qx-eb"],
       "css": [".kFx1Ae-xdwExf-eb-m,", ".g-Qx-r4m2rf-wZVHld {", "display: none;", "}"]
   },
   {
       "url": ["homestuck.com"],
       "invert": [".read-link", "body.scratch", "body.sweet", "body:not(.scratch):not(.sweet) #animation_container", "body:not(.scratch):not(.sweet) .nav-btn--center", "body:not(.scratch):not(.sweet) #nav-container", "body:not(.scratch):not(.sweet) #game_overlay", "body.scratch #overlay", "body.sweet #overlay", "body.sweet #gamenav-container", "body.scratch #site-search", "body.sweet #site-search", "body.scratch .o_chat-log-btn"],
       "noInvert": ["body.scratch img", "body.sweet img"],
       "removeBg": ["body:not(.scratch):not(.sweet)", "body:not(.scratch):not(.sweet) .o_site-footer"]
   },
   {
       "url": ["html5rocks.com"],
       "invert": [".prettyprint"]
   },
   {
       "url": ["hysterical-amusement.surge.sh"],
       "invert": ["body", ".instructionsContainer", "#liveOutput"]
   },
   {
       "url": ["ign.com"],
       "invert": [".video_embed_content-poster", ".video_embed_content-poster-play-button"],
       "removeBg": ["#review-promo"]
   },
   {
       "url": ["imdb.com"],
       "invert": ["#nb20 > div", "#navbar-suggestionsearch", ".caption_overlay", ".vital", ".slate_wrapper > .poster", ".slate", ".slate_fade_top", ".slate_fade_bottom", ".ab_hero", ".ab_hero .ninja_image", ".sub_nav", ".app-links", "#navMenuPro img", "#proAd", ".rec_default_image", "#photo-container", "#video-container"],
       "noInvert": ["#navMenuPro", "#photo-container img", "#video-container img", "#video-container video"],
       "removeBg": ["#nb20"]
   },
   {
       "url": ["immutables.github.io"],
       "invert": [".illustration", ".documentation .highlight"]
   },
   {
       "url": ["instagram.com"],
       "invert": ["._mli86", "._cqw45._2pnef"],
       "css": ["[role=\"dialog\"] {", "background-color: rgba(255, 255, 255, 0.5) !important;", "}", "._sxolz {", "background-color: #fff !important;", "}"]
   },
   {
       "url": ["io9.com"],
       "css": ["html {", "height: auto !important;", "}"]
   },
   {
       "url": ["iopscience.iop.org"],
       "noInvert": ["img[alt*=\"Equation\"]"]
   },
   {
       "url": ["java.com"],
       "invert": ["html #jvc0v2.bg1 .jvc0w1", "html #jvc0v2.bg2 .jvc0w1", "html #jvc0v2.bg3 .jvc0w1", "html #jvc0v2.bg4 .jvc0w1", "html #jvc0v2.bg5 .jvc0w1"]
   },
   {
       "url": ["javarepl.com"],
       "invert": [".terminal-content"],
       "removeBg": ["body"]
   },
   {
       "url": ["jeremykun.com"],
       "noInvert": ["img[src*=\".gif\"]", "img[src*=\".png\"]"]
   },
   {
       "url": ["jira.*", "jira.*.*"],
       "invert": [".chart img"]
   },
   {
       "url": ["khanacademy.org"],
       "invert": [".task-container .modal-backdrop"]
   },
   {
       "url": ["kinopoisk.ru"],
       "invert": ["#GOWrapper", "#external_header_wrapper", ".header-fresh-search-partial-component_theme_default", ".header-fresh-partial-component_theme_light", ".footer-v2-partial-component__navigation-wrapper", ".footer-v2-partial-component__bottom-navigation", ".header-fresh-partial-component_theme_default .header-fresh-partial-component__dropdown", ".info_title .gradient", ".info_title .gradient_director", ".movie-ticket-button", ".movie-trailer-button", ".randomMovie .name", ".picAndNums", ".promo-special", ".flag", ".main_info__quote", ".feedback_img", ".main_slider_arrow", "#top_3banners", ".yearsBox", ".bottom_bg", ".insert", ".trailer_descr", ".arrow", ".play", ".kp2-authapi-overlay", ".kp2-authapi-paranja", ".app__sticky-header", ".search-suggest__content", ".video-snippet__inner:after", ".video-snippet__content", ".tabs__tab_selected"],
       "noInvert": [".right-slider p", "#top_3banners img", ".zod img", ".peopleInfo table img", ".date img", ".rating img"],
       "removeBg": ["#content_block", ".box_block table table *"],
       "css": [".discovery-trailers-overlay {", "background: rgba(255, 255, 255, 0.8) !important;", "}", "#popup_info_wrapper * {", "color: #bbb !important;", "}"]
   },
   {
       "url": ["last.fm"],
       "invert": ["div.masthead-logo", "ul.navlist-items", "div.navlist-more-wrap", "div.header-title-label-wrap", "div.grid-items-cover-image-image::after", "div.grid-items-item-details", "div.featured-item-details", "div.top-bar", "div.features-footer-cover-image::after", "p.features-footer-content", "button.btn-primary", "a.btn-primary", "footer"]
   },
   {
       "url": ["libretexts.org"],
       "noInvert": ["img"]
   },
   {
       "url": ["lifehacker.com"],
       "invert": [".videoCube a .thumbBlock"],
       "css": ["html {", "height: auto !important;", "}"]
   },
   {
       "url": ["linerad.io"],
       "invert": [".header h1 img"]
   },
   {
       "url": ["linkedin.com"],
       "invert": ["#top-header", "#responsive-nav-scrollable"],
       "noInvert": ["#top-header *", "#responsive-nav-scrollable *"]
   },
   {
       "url": ["mail.live.com"],
       "invert": ["img:not([src=\"https://a.gfx.ms/rte_metro2.png\"])", "video", "object", ".ComposeContent"],
       "removeBg": [".ComposeContent"]
   },
   {
       "url": ["mail.protonmail.com"],
       "css": [".angular-squire-iframe body,", ".angular-squire-iframe body div {", "background: #0D0E12 !important;", "color: #fff !important;", "}"]
   },
   {
       "url": ["mailchimp.com"],
       "invert": ["svg"],
       "noInvert": [".cke_button_icon"]
   },
   {
       "url": ["mathpages.com"],
       "noInvert": ["img"]
   },
   {
       "url": ["mathprofi.ru", "mathprofi.net"],
       "noInvert": ["p img"]
   },
   {
       "url": ["mathworld.wolfram.com"],
       "noInvert": ["img"]
   },
   {
       "url": ["medium.com"],
       "noInvert": [".canvas-renderer"]
   },
   {
       "url": ["meduza.io"],
       "invert": [".Header-root", ".Footer-root"]
   },
   {
       "url": ["messenger.com"],
       "invert": ["._4tsk"]
   },
   {
       "url": ["minhaclaro.claro.com.br"],
       "invert": [".header-black", ".header-red-desktop-logada", "#txt-busca-header-desktop"]
   },
   {
       "url": ["mixtape.moe/$"],
       "invert": ["body", ".top > .menu", "#upload-filelist", ".file-url"]
   },
   {
       "url": ["mspaintadventures.ru"],
       "invert": [".row", ".row img", ".row object", ".mspa_content_inner > .mspa_page_pictures", ".adv_content_inner > .adv_page_pictures", ".sidebar", ".content", ".footer", ".copyright", ".row:nth-of-type(1) > .header", ".row:nth-of-type(1) > .header > .banner", ".row:nth-of-type(1)[style*='width:940px'] div:not(.nav)"],
       "noInvert": [".nav img", "#page > .content", ".row > .row", ".content > .content", ".mspa_content_inner > .mspa_page_text img", ".adv_content_inner > .adv_page_text img"],
       "css": ["body {", "background-color: #fff !important;", "}", ".sidebar {", "border-color: #fff !important;", "}", "html,", ".banner,", ".row:nth-of-type(2),", ".row:nth-of-type(4) {", "background-color: #000 !important;", "}"]
   },
   {
       "url": ["my.mail.ru/(music|mail|vk|ok|bk|list|gmail.com|inbox)"],
       "invert": [".b-head-layer_music", ".b-head__menu__logo", ".b-head__portal-navigation-wrapper", ".b-history-event__videoevent-name", ".b-music__genre__header__info", ".b-music__playlists--tile__item__controls", ".b-music__playlists--tile__item__stats", ".b-music__section__content", ".b-music__section__footer", ".b-music__section__row", ".b-music__top-artists__item__cover", ".b-music__top-artists__item__info", ".b-music__user-header__content", ".b-music__user-header__controls", ".b-music__user-header__title", ".b-popup__fade", ".btn-import", ".filed-images", ".l-music__menu-main", ".l-music__portal-navigation", ".l-music__search-form", ".l-music__sidebar__playlist-playing > .cover", ".playlists-block", ".smiles", ".songs-table__row__col__cover", ".ui-button-main"],
       "noInvert": ["html", ".b-music__artist-header__content", ".b-music__artist-header__cover", ".b-music__section__cell", ".fixed-menu > .b-music__section__footer", ".l-mm__avatar", ".l-music__player__song__cover", ".playlists-block"],
       "removeBg": [".b-music__user-header__bg--no-profile-cover"],
       "css": [".l-music {", "background: #111;", "}"]
   },
   {
       "url": ["mydealz.de"],
       "invert": [".nav", ".search", ".threadTempBadge-icon", ".emoji", ".comment-image", ".avatar", "#footer", "#thread-comments", ".cept-action-user-profile", ".popover--mainNav", ".supportImage", ".profileHeader", ".cept-thread-image-link", ".cept-thread-image-clickout"],
       "noInvert": [".cept-userProfile-avatar", ".imgFrame-img"],
       "css": [".cept-dealBtn, .btn--facebook{", "letter-spacing: 0.5px;", "}", ".twitter-share-button{", "letter-spacing: 1.5px;", "}", ".text--color-red, .vote-temp--hot, .vote-temp--burn, .icon--plus{", "color: #ff3d00;", "}"]
   },
   {
       "url": ["myfitnesspal.com"],
       "invert": ["#fancybox-overlay"]
   },
   {
       "url": ["neopets.com"],
       "invert": ["#ban", "#header"]
   },
   {
       "url": ["nodejs.org"],
       "invert": ["#column2", "footer", "header"],
       "css": ["#column2.interior {", "background: #212121;", "}", "#column2 ul {", "background-color: #212121;", "}"]
   },
   {
       "url": ["nvidia.com"],
       "invert": [".sub-brand-nav", ".brandLink"]
   },
   {
       "url": ["onliner.by"],
       "invert": [".b-tile-main", ".b-teasers-2__teaser", ".news-tiles__subtitle", ".b-opinions-main-2__tile", ".news-header__top > .news-header__title", ".b-tile-grad"],
       "noInvert": [".b-opinions-main-2__tile *", ".b-teasers-2__teaser-i"]
   },
   {
       "url": ["op.gg"],
       "invert": [".__sprite"]
   },
   {
       "url": ["openclassrooms.com"],
       "invert": ["code.ace"],
       "noInvert": ["[class*=ace] *"]
   },
   {
       "url": ["opencollective.com"],
       "invert": [".CollectiveCover", ".Footer", ".MailChimpInputSection", ".PublicFooter"],
       "noInvert": [".CollectiveCover *", ".Footer *", ".MailChimpInputSection *", ".PublicFooter *"]
   },
   {
       "url": ["otakumode.com"],
       "invert": [".c-slick-image-viewer__main-image img"]
   },
   {
       "url": ["outlook.live.com"],
       "invert": ["#O365_NavHeader"]
   },
   {
       "url": ["pagerduty.com"],
       "removeBg": ["body"]
   },
   {
       "url": ["pandora.com"],
       "invert": ["#body", ".contentbox", "#detailContainer", "#mainContent", ".slidesBackground", ".slidesForeground"],
       "css": [".skinContainer,", ".slidesBackground,", ".slidesForeground,", "#trackDetail,", ".track_detail_close {", "background-color: black !important;", "}", ".fxCol-cont-1,", ".jspContainer,", "#trackInfoButtons {", "background-color: white !important;", "}", "#brandingBar,", ".contentnav,", ".top {", "background-color: #3d4043 !important;", "}", "#playerBar {", "background-color: #0d0d0d !important;", "}"]
   },
   {
       "url": ["paper.dropbox.com"],
       "invert": [".attrcomment.attrcomment"]
   },
   {
       "url": ["perforce.com"],
       "invert": [".title-bar", ".sidenav-wrapper"]
   },
   {
       "url": ["photos.google.com"],
       "invert": [".DwJIde .QtDoYb svg"],
       "css": [".ZSTBVb, .DwJIde .NRbSyd {", "background: white !important;", "}"]
   },
   {
       "url": ["play.afreecatv.com"],
       "invert": ["#afreecatv_player"]
   },
   {
       "url": ["playfab.com"],
       "invert": [".hero"]
   },
   {
       "url": ["poeaffix.net"],
       "invert": ["#header"],
       "noInvert": ["img"]
   },
   {
       "url": ["prntscr.com", "prnt.sc"],
       "invert": [".header"]
   },
   {
       "url": ["producthunt.com"],
       "invert": [".backgroundImage_1hK9M", ".v-image"],
       "noInvert": [".backgroundImage_1hK9M *", ".v-image *"],
       "css": [".post-detail--body--gallery-fullscreen--image {", "background-color: black;", "}"]
   },
   {
       "url": ["python.org"],
       "invert": ["nav ul li > a", "nav .tier-2", "#site-navigation", "header", ".featured-news-wrapper", ":not(.lang):not(#foot-logo) > img"],
       "noInvert": [":not(.lang):not(#foot-logo) > img", "#content > div > section > div"]
   },
   {
       "url": ["quora.com"],
       "invert": [".section_photo"]
   },
   {
       "url": ["reactjs.org"],
       "invert": [".gatsby-highlight", ".css-mlkfzr", ".css-17t02fm"]
   },
   {
       "url": ["readthedocs.io"],
       "invert": [".wy-nav-side", ".rst-versions", "li.current"]
   },
   {
       "url": ["reddit.com/r/(homestuck|Undertale)"],
       "invert": ["#header", "#header-bottom-right", "#sr-header-area", ".md h4"],
       "noInvert": ["#header-img"],
       "removeBg": ["body"]
   },
   {
       "url": ["reddit.com/r/europe"],
       "invert": [".flair"]
   },
   {
       "url": ["reddit.com/r/firefox"],
       "invert": ["#header", "#header-bottom-right"]
   },
   {
       "url": ["reddit.com/r/GlobalOffensive"],
       "invert": ["#header", ".side"],
       "noInvert": ["#header *", ".side *"],
       "css": ["#mail::before {", "display: none !important;", "}"]
   },
   {
       "url": ["reddit.com/r/Paranormal"],
       "invert": ["#header", "#sr-header-area", "#header-bottom-right"]
   },
   {
       "url": ["reddit.com/r/skyrimmods"],
       "invert": ["#header", ".infobar"]
   },
   {
       "url": ["reference.wolfram.com"],
       "noInvert": ["img"]
   },
   {
       "url": ["regexr.com"],
       "invert": ["canvas.highlights"]
   },
   {
       "url": ["rijnijssel.elo.education-online.nl"],
       "noInvert": [".app-left-sidebar"]
   },
   {
       "url": ["roblox.com"],
       "invert": [".thumbnail-span", ".color-dot", ".avatar-back"],
       "noInvert": [".thumbnail-span *", ".avatar-back *"],
       "css": [".avatar-thumbnail .enable-three-dee {", "background-color: #000000;", "color: #FFFFFF;", "}"]
   },
   {
       "url": ["ruby.sketchup.com", "rubydoc.info"],
       "invert": ["#navbar"],
       "noInvert": ["#navbar a > img", "#nav"]
   },
   {
       "url": ["scotch.io"],
       "invert": [".language-js", ".language-javascript"]
   },
   {
       "url": ["script.google.com"],
       "invert": [".docs-icon-img-container"]
   },
   {
       "url": ["semlar.com"],
       "invert": [".thumbnail", ".col-sm-2", ".img-rounded", "#alert-list", ".background-texture"],
       "noInvert": ["img"]
   },
   {
       "url": ["shiyanlou.com"],
       "invert": ["#display"]
   },
   {
       "url": ["shop.ubi.com"],
       "invert": ["#topNavbar", "#UplayHeader"]
   },
   {
       "url": ["slack.com"],
       "invert": [".client_channels_list_container", "figure", ".member_preview_link.member_image"],
       "noInvert": [".client_channels_list_container *", "figure *"],
       "css": [".emoji {", "background-color: white;", "}"]
   },
   {
       "url": ["slushpool.com"],
       "invert": [".siteHeader", ".contentHeader", ".contentSlider"]
   },
   {
       "url": ["spotify.com"],
       "invert": ["img", "video", "embed", ".hero", ".header-main", ".search-bar", "#bg-wrap", "#main"]
   },
   {
       "url": ["stackexchange.com", "askubuntu.com", "mathoverflow.com", "serverfault.com", "stackapps.com", "stackoverflow.com", "superuser.com"],
       "css": ["#hlogo a {", "text-indent: -256em !important;", "}"]
   },
   {
       "url": ["statlect.com"],
       "noInvert": ["span.displayed > img", "span.inm > img", "#lensDIV img", ".gs-image-box img.gs-image", "img[alt=\"Table of Contents\"]"]
   },
   {
       "url": ["studio.restlet.com", "cloud.rest-let.com"],
       "invert": [".left-panel", ".header", ".editor-ace"],
       "noInvert": [".avatar"]
   },
   {
       "url": ["subscription.packtpub.com"],
       "invert": [".sidebar", ".navbar", ".cover-info-overlay"]
   },
   {
       "url": ["symfony.com"],
       "invert": ["#sln", ".header__top :not(img)", ".highlighttable"],
       "noInvert": ["[class^=\"sln-visible-\"] > img:first-child"]
   },
   {
       "url": ["terraform.io"],
       "invert": [".mega-nav-banner"]
   },
   {
       "url": ["terrytao.wordpress.com"],
       "noInvert": ["img"]
   },
   {
       "url": ["toggl.com"],
       "invert": [".left-nav"]
   },
   {
       "url": ["tpondemand.com"],
       "invert": [".tau-cover-view__overlay", ".tau-app-secondary-pane", ".app-header", ".uv-popover-content"],
       "noInvert": [".tau-app-secondary-pane *", ".app-header *"]
   },
   {
       "url": ["tproger.ru"],
       "invert": [".top-duft-punk", "#colophon"],
       "noInvert": [".text_logo img", ".tmenu_icon"]
   },
   {
       "url": ["translate.yandex.ru"],
       "css": [".application.state-new .container_main,", ".application.state-new .container_main[style],", ".application.state-new .header {", "border-bottom-color: transparent;", "}"]
   },
   {
       "url": ["travis-ci.org"],
       "invert": [".job-log"]
   },
   {
       "url": ["tvtime.com"],
       "noInvert": [".page-sidebar *", ".page-left *"]
   },
   {
       "url": ["tweakers.net"],
       "invert": ["#menubar", "#menubottombar", "#tracker", ".button"]
   },
   {
       "url": ["twitch.tv"],
       "invert": ["#site_footer", "#carousel_background::after", "#left_col", ".player", ".badge", ".social-column", ".top-nav", ".anon-front__featured-section", ".side-nav", ".footer"],
       "noInvert": [".player *", ".social-column *", ".top-nav *", ".anon-front__featured-section *", ".side-nav *", ".footer *"],
       "removeBg": ["#carousel", ".chat-container", ".conversations-list-header", ".dark_wrapper ul", "html", ".nav", ".js-conversations-list", ".js-conversations-list-bottom-bar", ".rightcol-content > .top"],
       "css": [".chat_text_input,", ".colon,", ".dark_wrapper *,", ".message,", ".room-title,", ".selected > a {", "color:black !important;", "}", ".chat_text_input {", "border: 1px solid black !important;", "}"]
   },
   {
       "url": ["twitter.com"],
       "invert": [".tcu-textEllipse--multiline", ".GalleryTweet .tweet", ".Gallery-media", ".DashboardProfileCard-bg", ".SummaryCard-content"],
       "noInvert": [".Gallery-media *"],
       "css": [".gallery-overlay,", "#permalink-overlay {", "background: rgba(255, 255, 255, 0.7) !important;", "}"]
   },
   {
       "url": ["ubi.com"],
       "removeBg": ["html", "body"]
   },
   {
       "url": ["unicode.org"],
       "invert": [".chars"]
   },
   {
       "url": ["unity3d.com"],
       "invert": [".main-navigation", ".sub-nav", ".wrapper", ".unity-logo", ".icon", ".main-footer"]
   },
   {
       "url": ["unity3d.com/learn"],
       "invert": [".main-navigation", ".sub-nav", ".wrapper", ".unity-logo", ".bg-instructors", ".hero", ".bg-workflow"]
   },
   {
       "url": ["unityhacks.com"],
       "invert": ["#unityhacks_sidebar", "#exposeMask", "#logoBlock", "#navigation", "#moderatorBar", ".xenOverlay .sectionMain .heading overlayOnly", ".banner_owner", ".banner_staff", ".banner_supportleader", ".banner_supporter", ".banner_partner", ".banner_designer", ".banner_promoter", ".banner_honorable", ".banner_premium", ".messageHeading", ".subHeading", ".ToggleTrigger", ".prefix", ".PopupOpen", ".categoryStrip", ".secondaryContent h3", ".LTR", ".callToAction", ".xenOverlay .section .heading", ".xenTooltip", ".redactor_dropdown", ".errorOverlay", ".sectionHeaders", ".button", "[title=\"Unread messages\"]", "footer"],
       "noInvert": ["#logo *", "#taigachat_toolbar *", ".listItemText h3", ".pollBlock .pollResult div", ".pollBlock .pollResult h3"]
   },
   {
       "url": ["vergil.chemistry.gatech.edu/notes"],
       "noInvert": ["img"]
   },
   {
       "url": ["virtua.speedtestcustom.com"],
       "noInvert": [".branding"]
   },
   {
       "url": ["vk.com"],
       "invert": ["#video_player", ".mv_playlist", ".page_header_cont", ".page_album_title", ".article_snippet__fade", ".article_snippet__info", ".article_snippet__read_btn", "#layer_bg", "#box_layer_bg", "#pv_more_acts_tt", ".login_app_devices", ".friends_import_icon", ".articleSnippet__inner", ".articleSnippet_button", "#z_photoview", ".vv_summary", ".thumb_map:after", ".input_back_wrap[style*=none] ~ #ts_input", "#ts_cont_wrap", "#ts_cont_wrap img", "#top_notify_wrap", "#top_notify_wrap .feedback_sticky_icon", "#audio_layer_tt", "#audio_layer_tt [style*=background-image]", ".audio_page_player_play .icon", ".page_video_play_icon", ".apps_featured_thumb_content", "[class^=apps_featured]:before", ".apps_frtt_photo", ".apps_frtt_level", ".settings_separated_row_iconed:before", ".owner_photo_bubble_wrap", "#top_profile_menu", ".tt_black", ".tt_w.tt_black", ".box_title", ".box_layer_wrap", "#box_loader", ".chat_tab_close", "#notifiers_wrap", ".notifier_image_wrap", ".doc_ext", ".doc_title", ".like_tt::after", ".audio_row__cover_back", ".poster__text"],
       "noInvert": ["#video_player *", ".mv_playlist *", ".page_header_cont *", "#z_photoview img", ".box_grey .box_title"],
       "removeBg": [".mv_layer_bg", ".pv_bottom_info", ".pv_img_area_wrap", ".vv_body", ".like_tt"],
       "css": [".pv_bottom_info *,", ".like_tt {", "color: #000 !important;", "}", "#pv_more_acts_tt * {", "color: #eee !important;", "}", "#top_notify_wrap,", "#audio_layer_tt {", "box-shadow: none;", "}", ".chat_onl_inner {", "background-color: #dae1e8 !important;", "}", ".chat_tab_wrap:hover {", "background-color: #ccd5de !important;", "}", ".photos_row {", "background-color: #000 !important;", "border-color: #000 !important;", "}"]
   },
   {
       "url": ["vocabolario.sns.it"],
       "invert": ["img[src]"],
       "noInvert": ["body[background]"]
   },
   {
       "url": ["vuejs.org"],
       "invert": [".content", "pre", "h3", "p"],
       "noInvert": ["img"]
   },
   {
       "url": ["w3schools.com"],
       "invert": ["#topnav"]
   },
   {
       "url": ["wallet.trezor.io"],
       "invert": [".page-header", ".qr-code"],
       "removeBg": [".qr-code"]
   },
   {
       "url": ["web.telegram.org"],
       "invert": [".im_dialog_unread", ".icon-message-status", ".dropdown-toggle", ".icon-tg-title"]
   },
   {
       "url": ["web.whatsapp.com"],
       "invert": [".qrcode .icon-logo"],
       "css": [".qrcode {", "border: 8px solid black;", "}"]
   },
   {
       "url": ["wikipedia.org"],
       "invert": [".mwe-popups-discreet > svg", ".mw-mmv-overlay", "#Vorlage_Infobox_Chemikalie > tbody > tr:nth-child(2) > td > a"],
       "noInvert": [".mwe-math-fallback-image-inline", ".mwe-math-fallback-image-display", ".mwe-popups image", "img[src*=\"svg.png\"]", "img[alt^=\"Skeletal\" i]", "img[alt^=\"Structural\" i]"]
   },
   {
       "url": ["wikiwand.com"],
       "removeBg": ["img"]
   },
   {
       "url": ["wolfram.com"],
       "noInvert": [".numberedequation", ".displayformula", ".inlineformula"]
   },
   {
       "url": ["wolframalpha.com"],
       "noInvert": ["img"]
   },
   {
       "url": ["yandex.*"],
       "invert": ["body.b-page_theme_pure_night", "[class*=\"icon_moon_\"]", ".favicon", ".weather__icon", ".traffic__icon", ".dist-popup__image", ".footer_distro_yes", ".serp-footer", ".distro__icon", ".services-big__item_icon", ".services-all__icon", ".popup2:before", "html.i-ua_swipe_yes .informers7__icon", "html.i-ua_swipe_yes .zen__item-domain", "html.i-ua_swipe_yes .zen__item-title", "html.i-ua_swipe_yes .teaser__service-bg", "html.i-ua_swipe_yes .stream-intro", "html.i-ua_swipe_yes .edadeal", "html.i-ua_swipe_yes .afisha", "html.i-ua_swipe_yes .services__icon", "html.i-ua_swipe_yes .menu2__list"],
       "noInvert": ["body.b-page_theme_pure_night *", "html.i-ua_swipe_yes .stream-intro__vod-preview", "html.i-ua_swipe_yes .edadeal__item-img", "html.i-ua_swipe_yes .afisha__film-image"],
       "removeBg": ["html.i-ua_swipe_yes .mini-suggest__popup-spacer", "html.i-ua_swipe_yes .menu2__container"]
   },
   {
       "url": ["youtube.com"],
       "invert": ["html[dark=true] #scrim", ".html5-video-player", ".has-custom-banner", "#theater-background", "#watch-appbar-playlist", "html:not([dark=true]) #header > #background", "html:not([dark=true]) #links-holder yt-formatted-string", "html:not([dark=true]) #subscribe-button", "ytd-thumbnail-overlay-time-status-renderer", "ytd-thumbnail-overlay-toggle-button-renderer", "paper-toast", "ytd-masthead[dark]", "html:not([dark=true]) ytd-masthead[dark] #avatar-btn"],
       "noInvert": ["html[dark=true]", "html[dark=true] *", ".html5-video-player *", ".has-custom-banner *", "#watch-appbar-playlist *"],
       "css": ["#scrim.app-drawer {", "background: rgba(255, 255, 255, 0.5);", "}", "#player-theater-container {", "background: none !important;", "}"]
    }
  ];


  async function getOKResponse(url, mimeType) {
      const response = await fetch(url, {
          cache: "force-cache",
          credentials: "omit"
      });
      if (
          mimeType &&
          !response.headers.get("Content-Type").startsWith(mimeType)
      ) {
          throw new Error(`Mime type mismatch when loading ${url}`);
      }
      if (!response.ok) {
          throw new Error(
              `Unable to load ${url} ${response.status} ${response.statusText}`
          );
      }
      return response;
  }
  async function loadAsDataURL(url, mimeType) {
      const response = await getOKResponse(url, mimeType);
      const blob = await response.blob();
      const dataURL = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(blob);
      });
      return dataURL;
  }
  async function loadAsText(url, mimeType) {
      const response = await getOKResponse(url, mimeType);
      const text = await response.text();
      return text;
  }

  function parseArray(text) {
      return text
          .replace(/\r/g, "")
          .split("\n")
          .map((s) => s.trim())
          .filter((s) => s);
  }
  function formatArray(arr) {
      return arr.concat("").join("\n");
  }
  function getStringSize(value) {
      return value.length * 2;
  }

  function parse24HTime(time) {
      return time.split(":").map((x) => parseInt(x));
  }
  function compareTime(a, b) {
      if (a[0] === b[0] && a[1] === b[1]) {
          return 0;
      }
      if (a[0] < b[0] || (a[0] === b[0] && a[1] < b[1])) {
          return -1;
      }
      return 1;
  }
  function isInTimeInterval(date, time0, time1) {
      const a = parse24HTime(time0);
      const b = parse24HTime(time1);
      const t = [date.getHours(), date.getMinutes()];
      if (compareTime(a, b) > 0) {
          return compareTime(a, t) <= 0 || compareTime(t, b) < 0;
      }
      return compareTime(a, t) <= 0 && compareTime(t, b) < 0;
  }
  function getDuration(time) {
      let duration = 0;
      if (time.seconds) {
          duration += time.seconds * 1000;
      }
      if (time.minutes) {
          duration += time.minutes * 60 * 1000;
      }
      if (time.hours) {
          duration += time.hours * 60 * 60 * 1000;
      }
      if (time.days) {
          duration += time.days * 24 * 60 * 60 * 1000;
      }
      return duration;
  }

  function scale(x, inLow, inHigh, outLow, outHigh) {
      return ((x - inLow) * (outHigh - outLow)) / (inHigh - inLow) + outLow;
  }
  function clamp(x, min, max) {
      return Math.min(max, Math.max(min, x));
  }
  function multiplyMatrices(m1, m2) {
      const result = [];
      for (let i = 0; i < m1.length; i++) {
          result[i] = [];
          for (let j = 0; j < m2[0].length; j++) {
              let sum = 0;
              for (let k = 0; k < m1[0].length; k++) {
                  sum += m1[i][k] * m2[k][j];
              }
              result[i][j] = sum;
          }
      }
      return result;
  }

  function createFilterMatrix(config) {
      let m = Matrix.identity();
      if (config.sepia !== 0) {
          m = multiplyMatrices(m, Matrix.sepia(config.sepia / 100));
      }
      if (config.grayscale !== 0) {
          m = multiplyMatrices(m, Matrix.grayscale(config.grayscale / 100));
      }
      if (config.contrast !== 100) {
          m = multiplyMatrices(m, Matrix.contrast(config.contrast / 100));
      }
      if (config.brightness !== 100) {
          m = multiplyMatrices(m, Matrix.brightness(config.brightness / 100));
      }
      if (config.mode === 1) {
          m = multiplyMatrices(m, Matrix.invertNHue());
      }
      return m;
  }
  function applyColorMatrix([r, g, b], matrix) {
      const rgb = [[r / 255], [g / 255], [b / 255], [1], [1]];
      const result = multiplyMatrices(matrix, rgb);
      return [0, 1, 2].map((i) =>
          clamp(Math.round(result[i][0] * 255), 0, 255)
      );
  }
  const Matrix = {
      identity() {
          return [
              [1, 0, 0, 0, 0],
              [0, 1, 0, 0, 0],
              [0, 0, 1, 0, 0],
              [0, 0, 0, 1, 0],
              [0, 0, 0, 0, 1]
          ];
      },
      invertNHue() {
          return [
              [0.333, -0.667, -0.667, 0, 1],
              [-0.667, 0.333, -0.667, 0, 1],
              [-0.667, -0.667, 0.333, 0, 1],
              [0, 0, 0, 1, 0],
              [0, 0, 0, 0, 1]
          ];
      },
      brightness(v) {
          return [
              [v, 0, 0, 0, 0],
              [0, v, 0, 0, 0],
              [0, 0, v, 0, 0],
              [0, 0, 0, 1, 0],
              [0, 0, 0, 0, 1]
          ];
      },
      contrast(v) {
          const t = (1 - v) / 2;
          return [
              [v, 0, 0, 0, t],
              [0, v, 0, 0, t],
              [0, 0, v, 0, t],
              [0, 0, 0, 1, 0],
              [0, 0, 0, 0, 1]
          ];
      },
      sepia(v) {
          return [
              [
                  0.393 + 0.607 * (1 - v),
                  0.769 - 0.769 * (1 - v),
                  0.189 - 0.189 * (1 - v),
                  0,
                  0
              ],
              [
                  0.349 - 0.349 * (1 - v),
                  0.686 + 0.314 * (1 - v),
                  0.168 - 0.168 * (1 - v),
                  0,
                  0
              ],
              [
                  0.272 - 0.272 * (1 - v),
                  0.534 - 0.534 * (1 - v),
                  0.131 + 0.869 * (1 - v),
                  0,
                  0
              ],
              [0, 0, 0, 1, 0],
              [0, 0, 0, 0, 1]
          ];
      },
      grayscale(v) {
          return [
              [
                  0.2126 + 0.7874 * (1 - v),
                  0.7152 - 0.7152 * (1 - v),
                  0.0722 - 0.0722 * (1 - v),
                  0,
                  0
              ],
              [
                  0.2126 - 0.2126 * (1 - v),
                  0.7152 + 0.2848 * (1 - v),
                  0.0722 - 0.0722 * (1 - v),
                  0,
                  0
              ],
              [
                  0.2126 - 0.2126 * (1 - v),
                  0.7152 - 0.7152 * (1 - v),
                  0.0722 + 0.9278 * (1 - v),
                  0,
                  0
              ],
              [0, 0, 0, 1, 0],
              [0, 0, 0, 0, 1]
          ];
      }
  };

  function parseSitesFixesConfig(text, options) {
      const sites = [];
      const blocks = text.replace(/\r/g, "").split(/^\s*={2,}\s*$/gm);
      blocks.forEach((block) => {
          const lines = block.split("\n");
          const commandIndices = [];
          lines.forEach((ln, i) => {
              if (ln.match(/^\s*[A-Z]+(\s[A-Z]+)*\s*$/)) {
                  commandIndices.push(i);
              }
          });
          if (commandIndices.length === 0) {
              return;
          }
          const siteFix = {
              url: parseArray(lines.slice(0, commandIndices[0]).join("\n"))
          };
          commandIndices.forEach((commandIndex, i) => {
              const command = lines[commandIndex].trim();
              const valueText = lines
                  .slice(
                      commandIndex + 1,
                      i === commandIndices.length - 1
                          ? lines.length
                          : commandIndices[i + 1]
                  )
                  .join("\n");
              const prop = options.getCommandPropName(command);
              if (!prop) {
                  return;
              }
              const value = options.parseCommandValue(command, valueText);
              siteFix[prop] = value;
          });
          sites.push(siteFix);
      });
      return sites;
  }

  function getURLHost(url) {
      return url.match(/^(.*?\/{2,3})?(.+?)(\/|$)/)[2];
  }
  function compareURLPatterns(a, b) {
      return a.localeCompare(b);
  }
  function isURLInList(url, list) {
      for (let i = 0; i < list.length; i++) {
          if (isURLMatched(url, list[i])) {
              return true;
          }
      }
      return false;
  }
  function isURLMatched(url, urlTemplate) {
      const regex = createUrlRegex(urlTemplate);
      return Boolean(url.match(regex));
  }
  function createUrlRegex(urlTemplate) {
      urlTemplate = urlTemplate.trim();
      const exactBeginning = urlTemplate[0] === "^";
      const exactEnding = urlTemplate[urlTemplate.length - 1] === "$";
      urlTemplate = urlTemplate
          .replace(/^\^/, "")
          .replace(/\$$/, "")
          .replace(/^.*?\/{2,3}/, "")
          .replace(/\?.*$/, "")
          .replace(/\/$/, "");
      let slashIndex;
      let beforeSlash;
      let afterSlash;
      if ((slashIndex = urlTemplate.indexOf("/")) >= 0) {
          beforeSlash = urlTemplate.substring(0, slashIndex);
          afterSlash = urlTemplate.replace("$", "").substring(slashIndex);
      } else {
          beforeSlash = urlTemplate.replace("$", "");
      }
      let result = exactBeginning
          ? "^(.*?\\:\\/{2,3})?"
          : "^(.*?\\:\\/{2,3})?([^/]*?\\.)?";
      const hostParts = beforeSlash.split(".");
      result += "(";
      for (let i = 0; i < hostParts.length; i++) {
          if (hostParts[i] === "*") {
              hostParts[i] = "[^\\.\\/]+?";
          }
      }
      result += hostParts.join("\\.");
      result += ")";
      if (afterSlash) {
          result += "(";
          result += afterSlash.replace("/", "\\/");
          result += ")";
      }
      result += exactEnding ? "(\\/?(\\?[^/]*?)?)$" : "(\\/?.*?)$";
      return new RegExp(result, "i");
  }
  function isURLEnabled(url, userSettings, {isProtected, isInDarkList}) {
      if (isProtected) {
          return false;
      }
      const isURLInUserList = isURLInList(url, userSettings.siteList);
      if (userSettings.applyToListedOnly) {
          return isURLInUserList;
      }
      const isURLInEnabledList = isURLInList(
          url,
          userSettings.siteListEnabled
      );
      if (isURLInEnabledList && isInDarkList) {
          return true;
      }
      return !isInDarkList && !isURLInUserList;
  }

  function createTextStyle(config) {
      const lines = [];
      lines.push("* {");
      if (config.useFont && config.fontFamily) {
          lines.push(`  font-family: ${config.fontFamily} !important;`);
      }
      if (config.textStroke > 0) {
          lines.push(
              `  -webkit-text-stroke: ${config.textStroke}px !important;`
          );
          lines.push(`  text-stroke: ${config.textStroke}px !important;`);
      }
      lines.push("}");
      return lines.join("\n");
  }

  var FilterMode;
  (function(FilterMode) {
      FilterMode[(FilterMode["light"] = 0)] = "light";
      FilterMode[(FilterMode["dark"] = 1)] = "dark";
  })(FilterMode || (FilterMode = {}));
  function createCSSFilterStyleheet(config, url, frameURL, inversionFixes) {
      const filterValue = getCSSFilterValue(config);
      const reverseFilterValue = "invert(100%) hue-rotate(180deg)";
      return cssFilterStyleheetTemplate(
          filterValue,
          reverseFilterValue,
          config,
          url,
          frameURL,
          inversionFixes
      );
  }
  function cssFilterStyleheetTemplate(
      filterValue,
      reverseFilterValue,
      config,
      url,
      frameURL,
      inversionFixes
  ) {
      const fix = getInversionFixesFor(frameURL || url, inversionFixes);
      const lines = [];
      lines.push("@media screen {");
      if (filterValue && !frameURL) {
          lines.push("");
          lines.push("/* Leading rule */");
          lines.push(createLeadingRule(filterValue));
      }
      if (config.mode === FilterMode.dark) {
          lines.push("");
          lines.push("/* Reverse rule */");
          lines.push(createReverseRule(reverseFilterValue, fix));
      }
      if (config.useFont || config.textStroke > 0) {
          lines.push("");
          lines.push("/* Font */");
          lines.push(createTextStyle(config));
      }
      lines.push("");
      lines.push("/* Text contrast */");
      lines.push("html {");
      lines.push("  text-shadow: 0 0 0 !important;");
      lines.push("}");
      lines.push("");
      lines.push("/* Full screen */");
      [":-webkit-full-screen", ":-moz-full-screen", ":fullscreen"].forEach(
          (fullScreen) => {
              lines.push(`${fullScreen}, ${fullScreen} * {`);
              lines.push("  -webkit-filter: none !important;");
              lines.push("  filter: none !important;");
              lines.push("}");
          }
      );
      if (!frameURL) {
          const [r, g, b] = applyColorMatrix(
              [255, 255, 255],
              createFilterMatrix(config)
          );
          const bgColor = {
              r: Math.round(r),
              g: Math.round(g),
              b: Math.round(b),
              toString() {
                  return `rgb(${this.r},${this.g},${this.b})`;
              }
          };
          lines.push("");
          lines.push("/* Page background */");
          lines.push("html {");
          lines.push(`  background: ${bgColor} !important;`);
          lines.push("}");
      }
      if (fix.css && fix.css.length > 0 && config.mode === FilterMode.dark) {
          lines.push("");
          lines.push("/* Custom rules */");
          lines.push(fix.css);
      }
      lines.push("");
      lines.push("}");
      return lines.join("\n");
  }
  function getCSSFilterValue(config) {
      const filters = [];
      if (config.mode === FilterMode.dark) {
          filters.push("invert(100%) hue-rotate(180deg)");
      }
      if (config.brightness !== 100) {
          filters.push(`brightness(${config.brightness}%)`);
      }
      if (config.contrast !== 100) {
          filters.push(`contrast(${config.contrast}%)`);
      }
      if (config.grayscale !== 0) {
          filters.push(`grayscale(${config.grayscale}%)`);
      }
      if (config.sepia !== 0) {
          filters.push(`sepia(${config.sepia}%)`);
      }
      if (filters.length === 0) {
          return null;
      }
      return filters.join(" ");
  }
  function createLeadingRule(filterValue) {
      return [
          "html {",
          `  -webkit-filter: ${filterValue} !important;`,
          `  filter: ${filterValue} !important;`,
          "}"
      ].join("\n");
  }
  function joinSelectors(selectors) {
      return selectors.map((s) => s.replace(/\,$/, "")).join(",\n");
  }
  function createReverseRule(reverseFilterValue, fix) {
      const lines = [];
      if (fix.invert.length > 0) {
          lines.push(`${joinSelectors(fix.invert)} {`);
          lines.push(`  -webkit-filter: ${reverseFilterValue} !important;`);
          lines.push(`  filter: ${reverseFilterValue} !important;`);
          lines.push("}");
      }
      if (fix.noinvert.length > 0) {
          lines.push(`${joinSelectors(fix.noinvert)} {`);
          lines.push("  -webkit-filter: none !important;");
          lines.push("  filter: none !important;");
          lines.push("}");
      }
      if (fix.removebg.length > 0) {
          lines.push(`${joinSelectors(fix.removebg)} {`);
          lines.push("  background: white !important;");
          lines.push("}");
      }
      return lines.join("\n");
  }
  function getInversionFixesFor(url, inversionFixes) {
      const common = {
          url: inversionFixes[0].url,
          invert: inversionFixes[0].invert || [],
          noinvert: inversionFixes[0].noinvert || [],
          removebg: inversionFixes[0].removebg || [],
          css: inversionFixes[0].css || ""
      };
      if (url) {
          const matches = inversionFixes
              .slice(1)
              .filter((s) => isURLInList(url, s.url))
              .sort((a, b) => b.url[0].length - a.url[0].length);
          if (matches.length > 0) {
              const found = matches[0];
              return {
                  url: found.url,
                  invert: common.invert.concat(found.invert || []),
                  noinvert: common.noinvert.concat(found.noinvert || []),
                  removebg: common.removebg.concat(found.removebg || []),
                  css: [common.css, found.css].filter((s) => s).join("\n")
              };
          }
      }
      return common;
  }
  const inversionFixesCommands = {
      "INVERT": "invert",
      "NO INVERT": "noinvert",
      "REMOVE BG": "removebg",
      "CSS": "css"
  };
  function parseInversionFixes(text) {
      return parseSitesFixesConfig(text, {
          commands: Object.keys(inversionFixesCommands),
          getCommandPropName: (command) =>
              inversionFixesCommands[command] || null,
          parseCommandValue: (command, value) => {
              if (command === "CSS") {
                  return value.trim();
              }
              return parseArray(value);
          }
      });
  }
  function formatInversionFixes(inversionFixes) {
      const fixes = inversionFixes
          .slice()
          .sort((a, b) => compareURLPatterns(a.url[0], b.url[0]));
      return formatSitesFixesConfig(fixes, {
          props: Object.values(inversionFixesCommands),
          getPropCommandName: (prop) =>
              Object.entries(inversionFixesCommands).find(
                  ([, p]) => p === prop
              )[0],
          formatPropValue: (prop, value) => {
              if (prop === "css") {
                  return value.trim();
              }
              return formatArray(value).trim();
          },
          shouldIgnoreProp: (prop, value) => {
              if (prop === "css") {
                  return !value;
              }
              return !(Array.isArray(value) && value.length > 0);
          }
      });
  }

  const dynamicThemeFixesCommands = {
      INVERT: "invert",
      CSS: "css"
  };
  function parseDynamicThemeFixes(text) {
      return parseSitesFixesConfig(text, {
          commands: Object.keys(dynamicThemeFixesCommands),
          getCommandPropName: (command) =>
              dynamicThemeFixesCommands[command] || null,
          parseCommandValue: (command, value) => {
              if (command === "CSS") {
                  return value.trim();
              }
              return parseArray(value);
          }
      });
  }
  function formatDynamicThemeFixes(dynamicThemeFixes) {
      const fixes = dynamicThemeFixes
          .slice()
          .sort((a, b) => compareURLPatterns(a.url[0], b.url[0]));
      return formatSitesFixesConfig(fixes, {
          props: Object.values(dynamicThemeFixesCommands),
          getPropCommandName: (prop) =>
              Object.entries(dynamicThemeFixesCommands).find(
                  ([, p]) => p === prop
              )[0],
          formatPropValue: (prop, value) => {
              if (prop === "css") {
                  return value.trim();
              }
              return formatArray(value).trim();
          },
          shouldIgnoreProp: (prop, value) => {
              if (prop === "css") {
                  return !value;
              }
              return !(Array.isArray(value) && value.length > 0);
          }
      });
  }
  function getDynamicThemeFixesFor(url, frameURL, fixes) {
      if (fixes.length === 0 || fixes[0].url[0] !== "*") {
          return null;
      }
      const common = {
          url: fixes[0].url,
          invert: fixes[0].invert || [],
          css: fixes[0].css || []
      };
      const sortedBySpecificity = fixes
          .slice(1)
          .map((theme) => {
              return {
                  specificity: isURLInList(frameURL || url, theme.url)
                      ? theme.url[0].length
                      : 0,
                  theme
              };
          })
          .filter(({specificity}) => specificity > 0)
          .sort((a, b) => b.specificity - a.specificity);
      if (sortedBySpecificity.length === 0) {
          return common;
      }
      const match = sortedBySpecificity[0].theme;
      return {
          url: match.url,
          invert: common.invert.concat(match.invert || []),
          css: [common.css, match.css].filter((s) => s).join("\n")
      };
  }

  const darkTheme = {
      neutralBg: [16, 20, 23],
      neutralText: [167, 158, 139],
      redBg: [64, 12, 32],
      redText: [247, 142, 102],
      greenBg: [32, 64, 48],
      greenText: [128, 204, 148],
      blueBg: [32, 48, 64],
      blueText: [128, 182, 204],
      fadeBg: [16, 20, 23, 0.5],
      fadeText: [167, 158, 139, 0.5]
  };
  const lightTheme = {
      neutralBg: [255, 242, 228],
      neutralText: [0, 0, 0],
      redBg: [255, 85, 170],
      redText: [140, 14, 48],
      greenBg: [192, 255, 170],
      greenText: [0, 128, 0],
      blueBg: [173, 215, 229],
      blueText: [28, 16, 171],
      fadeBg: [0, 0, 0, 0.5],
      fadeText: [0, 0, 0, 0.5]
  };
  function rgb([r, g, b, a]) {
      if (typeof a === "number") {
          return `rgba(${r}, ${g}, ${b}, ${a})`;
      }
      return `rgb(${r}, ${g}, ${b})`;
  }
  function mix(color1, color2, t) {
      return color1.map((c, i) => Math.round(c * (1 - t) + color2[i] * t));
  }
  function createStaticStylesheet(config, url, frameURL, staticThemes) {
      const srcTheme = config.mode === 1 ? darkTheme : lightTheme;
      const theme = Object.entries(srcTheme).reduce((t, [prop, color]) => {
          t[prop] = applyColorMatrix(
              color,
              createFilterMatrix({...config, mode: 0})
          );
          return t;
      }, {});
      const commonTheme = getCommonTheme(staticThemes);
      const siteTheme = getThemeFor(frameURL || url, staticThemes);
      const lines = [];
      if (!siteTheme || !siteTheme.noCommon) {
          lines.push("/* Common theme */");
          lines.push(...ruleGenerators.map((gen) => gen(commonTheme, theme)));
      }
      if (siteTheme) {
          lines.push(`/* Theme for ${siteTheme.url.join(" ")} */`);
          lines.push(...ruleGenerators.map((gen) => gen(siteTheme, theme)));
      }
      if (config.useFont || config.textStroke > 0) {
          lines.push("/* Font */");
          lines.push(createTextStyle(config));
      }
      return lines.filter((ln) => ln).join("\n");
  }
  function createRuleGen(
      getSelectors,
      generateDeclarations,
      modifySelector = (s) => s
  ) {
      return (siteTheme, themeColors) => {
          const selectors = getSelectors(siteTheme);
          if (selectors == null || selectors.length === 0) {
              return null;
          }
          const lines = [];
          selectors.forEach((s, i) => {
              let ln = modifySelector(s);
              if (i < selectors.length - 1) {
                  ln += ",";
              } else {
                  ln += " {";
              }
              lines.push(ln);
          });
          const declarations = generateDeclarations(themeColors);
          declarations.forEach((d) => lines.push(`    ${d} !important;`));
          lines.push("}");
          return lines.join("\n");
      };
  }
  const mx = {
      bg: {
          hover: 0.075,
          active: 0.1
      },
      fg: {
          hover: 0.25,
          active: 0.5
      },
      border: 0.5
  };
  const ruleGenerators = [
      createRuleGen(
          (t) => t.neutralBg,
          (t) => [`background-color: ${rgb(t.neutralBg)}`]
      ),
      createRuleGen(
          (t) => t.neutralBgActive,
          (t) => [`background-color: ${rgb(t.neutralBg)}`]
      ),
      createRuleGen(
          (t) => t.neutralBgActive,
          (t) => [
              `background-color: ${rgb(
                  mix(t.neutralBg, [255, 255, 255], mx.bg.hover)
              )}`
          ],
          (s) => `${s}:hover`
      ),
      createRuleGen(
          (t) => t.neutralBgActive,
          (t) => [
              `background-color: ${rgb(
                  mix(t.neutralBg, [255, 255, 255], mx.bg.active)
              )}`
          ],
          (s) => `${s}:active, ${s}:focus`
      ),
      createRuleGen(
          (t) => t.neutralText,
          (t) => [`color: ${rgb(t.neutralText)}`]
      ),
      createRuleGen(
          (t) => t.neutralTextActive,
          (t) => [`color: ${rgb(t.neutralText)}`]
      ),
      createRuleGen(
          (t) => t.neutralTextActive,
          (t) => [
              `color: ${rgb(
                  mix(t.neutralText, [255, 255, 255], mx.fg.hover)
              )}`
          ],
          (s) => `${s}:hover`
      ),
      createRuleGen(
          (t) => t.neutralTextActive,
          (t) => [
              `color: ${rgb(
                  mix(t.neutralText, [255, 255, 255], mx.fg.active)
              )}`
          ],
          (s) => `${s}:active, ${s}:focus`
      ),
      createRuleGen(
          (t) => t.neutralBorder,
          (t) => [
              `border-color: ${rgb(
                  mix(t.neutralBg, t.neutralText, mx.border)
              )}`
          ]
      ),
      createRuleGen(
          (t) => t.redBg,
          (t) => [`background-color: ${rgb(t.redBg)}`]
      ),
      createRuleGen(
          (t) => t.redBgActive,
          (t) => [`background-color: ${rgb(t.redBg)}`]
      ),
      createRuleGen(
          (t) => t.redBgActive,
          (t) => [
              `background-color: ${rgb(
                  mix(t.redBg, [255, 0, 64], mx.bg.hover)
              )}`
          ],
          (s) => `${s}:hover`
      ),
      createRuleGen(
          (t) => t.redBgActive,
          (t) => [
              `background-color: ${rgb(
                  mix(t.redBg, [255, 0, 64], mx.bg.active)
              )}`
          ],
          (s) => `${s}:active, ${s}:focus`
      ),
      createRuleGen((t) => t.redText, (t) => [`color: ${rgb(t.redText)}`]),
      createRuleGen(
          (t) => t.redTextActive,
          (t) => [`color: ${rgb(t.redText)}`]
      ),
      createRuleGen(
          (t) => t.redTextActive,
          (t) => [
              `color: ${rgb(mix(t.redText, [255, 255, 0], mx.fg.hover))}`
          ],
          (s) => `${s}:hover`
      ),
      createRuleGen(
          (t) => t.redTextActive,
          (t) => [
              `color: ${rgb(mix(t.redText, [255, 255, 0], mx.fg.active))}`
          ],
          (s) => `${s}:active, ${s}:focus`
      ),
      createRuleGen(
          (t) => t.redBorder,
          (t) => [`border-color: ${rgb(mix(t.redBg, t.redText, mx.border))}`]
      ),
      createRuleGen(
          (t) => t.greenBg,
          (t) => [`background-color: ${rgb(t.greenBg)}`]
      ),
      createRuleGen(
          (t) => t.greenBgActive,
          (t) => [`background-color: ${rgb(t.greenBg)}`]
      ),
      createRuleGen(
          (t) => t.greenBgActive,
          (t) => [
              `background-color: ${rgb(
                  mix(t.greenBg, [128, 255, 182], mx.bg.hover)
              )}`
          ],
          (s) => `${s}:hover`
      ),
      createRuleGen(
          (t) => t.greenBgActive,
          (t) => [
              `background-color: ${rgb(
                  mix(t.greenBg, [128, 255, 182], mx.bg.active)
              )}`
          ],
          (s) => `${s}:active, ${s}:focus`
      ),
      createRuleGen(
          (t) => t.greenText,
          (t) => [`color: ${rgb(t.greenText)}`]
      ),
      createRuleGen(
          (t) => t.greenTextActive,
          (t) => [`color: ${rgb(t.greenText)}`]
      ),
      createRuleGen(
          (t) => t.greenTextActive,
          (t) => [
              `color: ${rgb(mix(t.greenText, [182, 255, 224], mx.fg.hover))}`
          ],
          (s) => `${s}:hover`
      ),
      createRuleGen(
          (t) => t.greenTextActive,
          (t) => [
              `color: ${rgb(mix(t.greenText, [182, 255, 224], mx.fg.active))}`
          ],
          (s) => `${s}:active, ${s}:focus`
      ),
      createRuleGen(
          (t) => t.greenBorder,
          (t) => [
              `border-color: ${rgb(mix(t.greenBg, t.greenText, mx.border))}`
          ]
      ),
      createRuleGen(
          (t) => t.blueBg,
          (t) => [`background-color: ${rgb(t.blueBg)}`]
      ),
      createRuleGen(
          (t) => t.blueBgActive,
          (t) => [`background-color: ${rgb(t.blueBg)}`]
      ),
      createRuleGen(
          (t) => t.blueBgActive,
          (t) => [
              `background-color: ${rgb(
                  mix(t.blueBg, [0, 128, 255], mx.bg.hover)
              )}`
          ],
          (s) => `${s}:hover`
      ),
      createRuleGen(
          (t) => t.blueBgActive,
          (t) => [
              `background-color: ${rgb(
                  mix(t.blueBg, [0, 128, 255], mx.bg.active)
              )}`
          ],
          (s) => `${s}:active, ${s}:focus`
      ),
      createRuleGen((t) => t.blueText, (t) => [`color: ${rgb(t.blueText)}`]),
      createRuleGen(
          (t) => t.blueTextActive,
          (t) => [`color: ${rgb(t.blueText)}`]
      ),
      createRuleGen(
          (t) => t.blueTextActive,
          (t) => [
              `color: ${rgb(mix(t.blueText, [182, 224, 255], mx.fg.hover))}`
          ],
          (s) => `${s}:hover`
      ),
      createRuleGen(
          (t) => t.blueTextActive,
          (t) => [
              `color: ${rgb(mix(t.blueText, [182, 224, 255], mx.fg.active))}`
          ],
          (s) => `${s}:active, ${s}:focus`
      ),
      createRuleGen(
          (t) => t.blueBorder,
          (t) => [
              `border-color: ${rgb(mix(t.blueBg, t.blueText, mx.border))}`
          ]
      ),
      createRuleGen(
          (t) => t.fadeBg,
          (t) => [`background-color: ${rgb(t.fadeBg)}`]
      ),
      createRuleGen((t) => t.fadeText, (t) => [`color: ${rgb(t.fadeText)}`]),
      createRuleGen(
          (t) => t.transparentBg,
          () => ["background-color: transparent"]
      ),
      createRuleGen((t) => t.noImage, () => ["background-image: none"]),
      createRuleGen(
          (t) => t.invert,
          () => ["filter: invert(100%) hue-rotate(180deg)"]
      )
  ];
  const staticThemeCommands = [
      "NO COMMON",
      "NEUTRAL BG",
      "NEUTRAL BG ACTIVE",
      "NEUTRAL TEXT",
      "NEUTRAL TEXT ACTIVE",
      "NEUTRAL BORDER",
      "RED BG",
      "RED BG ACTIVE",
      "RED TEXT",
      "RED TEXT ACTIVE",
      "RED BORDER",
      "GREEN BG",
      "GREEN BG ACTIVE",
      "GREEN TEXT",
      "GREEN TEXT ACTIVE",
      "GREEN BORDER",
      "BLUE BG",
      "BLUE BG ACTIVE",
      "BLUE TEXT",
      "BLUE TEXT ACTIVE",
      "BLUE BORDER",
      "FADE BG",
      "FADE TEXT",
      "TRANSPARENT BG",
      "NO IMAGE",
      "INVERT"
  ];
  function upperCaseToCamelCase(text) {
      return text
          .split(" ")
          .map((word, i) => {
              return i === 0
                  ? word.toLowerCase()
                  : word.charAt(0).toUpperCase() +
                        word.substr(1).toLowerCase();
          })
          .join("");
  }
  function parseStaticThemes($themes) {
      return parseSitesFixesConfig($themes, {
          commands: staticThemeCommands,
          getCommandPropName: upperCaseToCamelCase,
          parseCommandValue: (command, value) => {
              if (command === "NO COMMON") {
                  return true;
              }
              return parseArray(value);
          }
      });
  }
  function camelCaseToUpperCase(text) {
      return text.replace(/([a-z])([A-Z])/g, "$1 $2").toUpperCase();
  }
  function formatStaticThemes(staticThemes) {
      const themes = staticThemes
          .slice()
          .sort((a, b) => compareURLPatterns(a.url[0], b.url[0]));
      return formatSitesFixesConfig(themes, {
          props: staticThemeCommands.map(upperCaseToCamelCase),
          getPropCommandName: camelCaseToUpperCase,
          formatPropValue: (prop, value) => {
              if (prop === "noCommon") {
                  return "";
              }
              return formatArray(value).trim();
          },
          shouldIgnoreProp: (prop, value) => {
              if (prop === "noCommon") {
                  return !value;
              }
              return !(Array.isArray(value) && value.length > 0);
          }
      });
  }
  function getCommonTheme(themes) {
      return themes[0];
  }
  function getThemeFor(url, themes) {
      const sortedBySpecificity = themes
          .slice(1)
          .map((theme) => {
              return {
                  specificity: isURLInList(url, theme.url)
                      ? theme.url[0].length
                      : 0,
                  theme
              };
          })
          .filter(({specificity}) => specificity > 0)
          .sort((a, b) => b.specificity - a.specificity);
      if (sortedBySpecificity.length === 0) {
          return null;
      }
      return sortedBySpecificity[0].theme;
  }

  class LocalStorageWrapper {
      get(key) {
          try {
              return localStorage.getItem(key);
          } catch (err) {
              console.error(err);
              return null;
          }
      }
      set(key, value) {
          try {
              localStorage.setItem(key, value);
          } catch (err) {
              console.error(err);
              return;
          }
      }
      remove(key) {
          try {
              localStorage.removeItem(key);
          } catch (err) {
              console.error(err);
              return;
          }
      }
      has(key) {
          try {
              return localStorage.getItem(key) != null;
          } catch (err) {
              console.error(err);
              return false;
          }
      }
  }
  class TempStorage {
      constructor() {
          this.map = new Map();
      }
      get(key) {
          return this.map.get(key);
      }
      set(key, value) {
          this.map.set(key, value);
      }
      remove(key) {
          this.map.delete(key);
      }
      has(key) {
          return this.map.has(key);
      }
  }

  function isFirefox() {
      return navigator.userAgent.includes("Firefox");
  }
  function isEdge() {
      return navigator.userAgent.includes("Edg");
  }
  function isWindows() {
      return navigator.platform.toLowerCase().startsWith("win");
  }
  function isMacOS() {
      return navigator.platform.toLowerCase().startsWith("mac");
  }

  function setShortcut(command, shortcut) {
      if (
          typeof browser !== "undefined" &&
          browser.commands &&
          browser.commands.update
      ) {
          browser.commands.update({name: command, shortcut});
      }
  }


  var ThemeEngines = {
      cssFilter: "cssFilter",
      svgFilter: "svgFilter",
      staticTheme: "staticTheme",
      dynamicTheme: "dynamicTheme"
  };

  const SAVE_TIMEOUT = 1000;
  class UserStorage {
      constructor() {
          this.timeout = null;
          this.defaultSettings = {
              enabled: true,
              theme: {
                  mode: 1,
                  brightness: 100,
                  contrast: 100,
                  grayscale: 0,
                  sepia: 0,
                  useFont: false,
                  fontFamily: isMacOS()
                      ? "Helvetica Neue"
                      : isWindows()
                      ? "Segoe UI"
                      : "Open Sans",
                  textStroke: 0,
                  engine: ThemeEngines.dynamicTheme,
                  stylesheet: ""
              },
              customThemes: [],
              siteList: [],
              siteListEnabled: [],
              applyToListedOnly: false,
              changeBrowserTheme: false,
              notifyOfNews: false,
              syncSettings: true,
              automation: "",
              time: {
                  activation: "18:00",
                  deactivation: "9:00"
              },
              location: {
                  latitude: null,
                  longitude: null
              }
          };
          this.settings = null;
      }
      async loadSettings() {
          this.settings = await this.loadSettingsFromStorage();
      }
      cleanup() {

      }
      loadSettingsFromStorage() {
          return new Promise((resolve) => {

      })}
      async saveSettings() {
          const saved = await this.saveSettingsIntoStorage(this.settings);
          this.settings = saved;
      }
      saveSettingsIntoStorage(settings) {
          if (this.timeout) {
              clearInterval(this.timeout);
          }
          return new Promise((resolve) => {
              this.timeout = setTimeout(() => {
                  this.timeout = null;
                  if (settings.syncSettings) {

                  } else {

                  }
              }, SAVE_TIMEOUT);
          });
      }
      set($settings) {
          if ($settings.siteList) {
              if (!Array.isArray($settings.siteList)) {
                  const list = [];
                  for (const key in $settings.siteList) {
                      const index = Number(key);
                      if (!isNaN(index)) {
                          list[index] = $settings.siteList[key];
                      }
                  }
                  $settings.siteList = list;
              }
              const siteList = $settings.siteList.filter((pattern) => {
                  let isOK = false;
                  try {
                      isURLMatched("https://google.com/", pattern);
                      isOK = true;
                  } catch (err) {
                      console.warn(`Pattern "${pattern}" excluded`);
                  }
                  return isOK && pattern !== "/";
              });
              $settings = {...$settings, siteList};
          }
          this.settings = {...this.settings, ...$settings};
      }
      migrateSettings_4_6_2(settings_4_6_2) {
          function migrateTheme(filterConfig_4_6_2) {
              const f = filterConfig_4_6_2;
              return {
                  mode: f.mode,
                  brightness: f.brightness,
                  contrast: f.contrast,
                  grayscale: f.grayscale,
                  sepia: f.sepia,
                  useFont: f.useFont,
                  fontFamily: f.fontFamily,
                  textStroke: f.textStroke,
                  engine: f.engine,
                  stylesheet: f.stylesheet
              };
          }
          try {
              const s = settings_4_6_2;
              const settings = {
                  ...this.defaultSettings,
                  enabled: s.enabled,
                  theme: migrateTheme(s.config),
                  customThemes: s.config.custom
                      ? s.config.custom.map((c) => {
                            return {
                                url: c.url,
                                theme: migrateTheme(c.config)
                            };
                        })
                      : [],
                  siteList: s.config.siteList,
                  applyToListedOnly: s.config.invertListed,
                  changeBrowserTheme: s.config.changeBrowserTheme
              };

              return settings;
          } catch (err) {
              console.error(
                  "Settings migration error:",
                  err,
                  "Loaded settings:",
                  settings_4_6_2
              );
              return this.defaultSettings;
          }
      }
  }

  function hslToRGB({h, s, l, a = 1}) {
      if (s === 0) {
          const [r, b, g] = [l, l, l].map((x) => Math.round(x * 255));
          return {r, g, b, a};
      }
      const c = (1 - Math.abs(2 * l - 1)) * s;
      const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
      const m = l - c / 2;
      const [r, g, b] = (h < 60
          ? [c, x, 0]
          : h < 120
          ? [x, c, 0]
          : h < 180
          ? [0, c, x]
          : h < 240
          ? [0, x, c]
          : h < 300
          ? [x, 0, c]
          : [c, 0, x]
      ).map((n) => Math.round((n + m) * 255));
      return {r, g, b, a};
  }
  function rgbToHSL({r: r255, g: g255, b: b255, a = 1}) {
      const r = r255 / 255;
      const g = g255 / 255;
      const b = b255 / 255;
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const c = max - min;
      const l = (max + min) / 2;
      if (c === 0) {
          return {h: 0, s: 0, l, a};
      }
      let h =
          (max === r
              ? ((g - b) / c) % 6
              : max === g
              ? (b - r) / c + 2
              : (r - g) / c + 4) * 60;
      if (h < 0) {
          h += 360;
      }
      const s = c / (1 - Math.abs(2 * l - 1));
      return {h, s, l, a};
  }
  function toFixed(n, digits = 0) {
      const fixed = n.toFixed(digits);
      if (digits === 0) {
          return fixed;
      }
      const dot = fixed.indexOf(".");
      if (dot >= 0) {
          const zerosMatch = fixed.match(/0+$/);
          if (zerosMatch) {
              if (zerosMatch.index === dot + 1) {
                  return fixed.substring(0, dot);
              }
              return fixed.substring(0, zerosMatch.index);
          }
      }
      return fixed;
  }
  function rgbToString(rgb) {
      const {r, g, b, a} = rgb;
      if (a != null && a < 1) {
          return `rgba(${toFixed(r)}, ${toFixed(g)}, ${toFixed(b)}, ${toFixed(
              a,
              2
          )})`;
      }
      return `rgb(${toFixed(r)}, ${toFixed(g)}, ${toFixed(b)})`;
  }
  function rgbToHexString({r, g, b, a}) {
      return `#${(a != null && a < 1
          ? [r, g, b, Math.round(a * 255)]
          : [r, g, b]
      )
          .map((x) => {
              return `${x < 16 ? "0" : ""}${x.toString(16)}`;
          })
          .join("")}`;
  }
  const rgbMatch = /^rgba?\([^\(\)]+\)$/;
  const hslMatch = /^hsla?\([^\(\)]+\)$/;
  const hexMatch = /^#[0-9a-f]+$/i;
  function parse($color) {
      const c = $color.trim().toLowerCase();
      if (c.match(rgbMatch)) {
          return parseRGB(c);
      }
      if (c.match(hslMatch)) {
          return parseHSL(c);
      }
      if (c.match(hexMatch)) {
          return parseHex(c);
      }
      if (knownColors.has(c)) {
          return getColorByName(c);
      }
      if (systemColors.has(c)) {
          return getSystemColor(c);
      }
      if ($color === "transparent") {
          return {r: 0, g: 0, b: 0, a: 0};
      }
      throw new Error(`Unable to parse ${$color}`);
  }
  function getNumbersFromString(str, splitter, range, units) {
      const raw = str.split(splitter).filter((x) => x);
      const unitsList = Object.entries(units);
      const numbers = raw
          .map((r) => r.trim())
          .map((r, i) => {
              let n;
              const unit = unitsList.find(([u]) => r.endsWith(u));
              if (unit) {
                  n =
                      (parseFloat(r.substring(0, r.length - unit[0].length)) /
                          unit[1]) *
                      range[i];
              } else {
                  n = parseFloat(r);
              }
              if (range[i] > 1) {
                  return Math.round(n);
              }
              return n;
          });
      return numbers;
  }
  const rgbSplitter = /rgba?|\(|\)|\/|,|\s/gi;
  const rgbRange = [255, 255, 255, 1];
  const rgbUnits = {"%": 100};
  function parseRGB($rgb) {
      const [r, g, b, a = 1] = getNumbersFromString(
          $rgb,
          rgbSplitter,
          rgbRange,
          rgbUnits
      );
      return {r, g, b, a};
  }
  const hslSplitter = /hsla?|\(|\)|\/|,|\s/gi;
  const hslRange = [360, 1, 1, 1];
  const hslUnits = {"%": 100, "deg": 360, "rad": 2 * Math.PI, "turn": 1};
  function parseHSL($hsl) {
      const [h, s, l, a = 1] = getNumbersFromString(
          $hsl,
          hslSplitter,
          hslRange,
          hslUnits
      );
      return hslToRGB({h, s, l, a});
  }
  function parseHex($hex) {
      const h = $hex.substring(1);
      switch (h.length) {
          case 3:
          case 4: {
              const [r, g, b] = [0, 1, 2].map((i) =>
                  parseInt(`${h[i]}${h[i]}`, 16)
              );
              const a =
                  h.length === 3 ? 1 : parseInt(`${h[3]}${h[3]}`, 16) / 255;
              return {r, g, b, a};
          }
          case 6:
          case 8: {
              const [r, g, b] = [0, 2, 4].map((i) =>
                  parseInt(h.substring(i, i + 2), 16)
              );
              const a =
                  h.length === 6 ? 1 : parseInt(h.substring(6, 8), 16) / 255;
              return {r, g, b, a};
          }
      }
      throw new Error(`Unable to parse ${$hex}`);
  }
  function getColorByName($color) {
      const n = knownColors.get($color);
      return {
          r: (n >> 16) & 255,
          g: (n >> 8) & 255,
          b: (n >> 0) & 255,
          a: 1
      };
  }
  function getSystemColor($color) {
      const n = systemColors.get($color);
      return {
          r: (n >> 16) & 255,
          g: (n >> 8) & 255,
          b: (n >> 0) & 255,
          a: 1
      };
  }
  const knownColors = new Map(
      Object.entries({
          aliceblue: 0xf0f8ff,
          antiquewhite: 0xfaebd7,
          aqua: 0x00ffff,
          aquamarine: 0x7fffd4,
          azure: 0xf0ffff,
          beige: 0xf5f5dc,
          bisque: 0xffe4c4,
          black: 0x000000,
          blanchedalmond: 0xffebcd,
          blue: 0x0000ff,
          blueviolet: 0x8a2be2,
          brown: 0xa52a2a,
          burlywood: 0xdeb887,
          cadetblue: 0x5f9ea0,
          chartreuse: 0x7fff00,
          chocolate: 0xd2691e,
          coral: 0xff7f50,
          cornflowerblue: 0x6495ed,
          cornsilk: 0xfff8dc,
          crimson: 0xdc143c,
          cyan: 0x00ffff,
          darkblue: 0x00008b,
          darkcyan: 0x008b8b,
          darkgoldenrod: 0xb8860b,
          darkgray: 0xa9a9a9,
          darkgrey: 0xa9a9a9,
          darkgreen: 0x006400,
          darkkhaki: 0xbdb76b,
          darkmagenta: 0x8b008b,
          darkolivegreen: 0x556b2f,
          darkorange: 0xff8c00,
          darkorchid: 0x9932cc,
          darkred: 0x8b0000,
          darksalmon: 0xe9967a,
          darkseagreen: 0x8fbc8f,
          darkslateblue: 0x483d8b,
          darkslategray: 0x2f4f4f,
          darkslategrey: 0x2f4f4f,
          darkturquoise: 0x00ced1,
          darkviolet: 0x9400d3,
          deeppink: 0xff1493,
          deepskyblue: 0x00bfff,
          dimgray: 0x696969,
          dimgrey: 0x696969,
          dodgerblue: 0x1e90ff,
          firebrick: 0xb22222,
          floralwhite: 0xfffaf0,
          forestgreen: 0x228b22,
          fuchsia: 0xff00ff,
          gainsboro: 0xdcdcdc,
          ghostwhite: 0xf8f8ff,
          gold: 0xffd700,
          goldenrod: 0xdaa520,
          gray: 0x808080,
          grey: 0x808080,
          green: 0x008000,
          greenyellow: 0xadff2f,
          honeydew: 0xf0fff0,
          hotpink: 0xff69b4,
          indianred: 0xcd5c5c,
          indigo: 0x4b0082,
          ivory: 0xfffff0,
          khaki: 0xf0e68c,
          lavender: 0xe6e6fa,
          lavenderblush: 0xfff0f5,
          lawngreen: 0x7cfc00,
          lemonchiffon: 0xfffacd,
          lightblue: 0xadd8e6,
          lightcoral: 0xf08080,
          lightcyan: 0xe0ffff,
          lightgoldenrodyellow: 0xfafad2,
          lightgray: 0xd3d3d3,
          lightgrey: 0xd3d3d3,
          lightgreen: 0x90ee90,
          lightpink: 0xffb6c1,
          lightsalmon: 0xffa07a,
          lightseagreen: 0x20b2aa,
          lightskyblue: 0x87cefa,
          lightslategray: 0x778899,
          lightslategrey: 0x778899,
          lightsteelblue: 0xb0c4de,
          lightyellow: 0xffffe0,
          lime: 0x00ff00,
          limegreen: 0x32cd32,
          linen: 0xfaf0e6,
          magenta: 0xff00ff,
          maroon: 0x800000,
          mediumaquamarine: 0x66cdaa,
          mediumblue: 0x0000cd,
          mediumorchid: 0xba55d3,
          mediumpurple: 0x9370db,
          mediumseagreen: 0x3cb371,
          mediumslateblue: 0x7b68ee,
          mediumspringgreen: 0x00fa9a,
          mediumturquoise: 0x48d1cc,
          mediumvioletred: 0xc71585,
          midnightblue: 0x191970,
          mintcream: 0xf5fffa,
          mistyrose: 0xffe4e1,
          moccasin: 0xffe4b5,
          navajowhite: 0xffdead,
          navy: 0x000080,
          oldlace: 0xfdf5e6,
          olive: 0x808000,
          olivedrab: 0x6b8e23,
          orange: 0xffa500,
          orangered: 0xff4500,
          orchid: 0xda70d6,
          palegoldenrod: 0xeee8aa,
          palegreen: 0x98fb98,
          paleturquoise: 0xafeeee,
          palevioletred: 0xdb7093,
          papayawhip: 0xffefd5,
          peachpuff: 0xffdab9,
          peru: 0xcd853f,
          pink: 0xffc0cb,
          plum: 0xdda0dd,
          powderblue: 0xb0e0e6,
          purple: 0x800080,
          rebeccapurple: 0x663399,
          red: 0xff0000,
          rosybrown: 0xbc8f8f,
          royalblue: 0x4169e1,
          saddlebrown: 0x8b4513,
          salmon: 0xfa8072,
          sandybrown: 0xf4a460,
          seagreen: 0x2e8b57,
          seashell: 0xfff5ee,
          sienna: 0xa0522d,
          silver: 0xc0c0c0,
          skyblue: 0x87ceeb,
          slateblue: 0x6a5acd,
          slategray: 0x708090,
          slategrey: 0x708090,
          snow: 0xfffafa,
          springgreen: 0x00ff7f,
          steelblue: 0x4682b4,
          tan: 0xd2b48c,
          teal: 0x008080,
          thistle: 0xd8bfd8,
          tomato: 0xff6347,
          turquoise: 0x40e0d0,
          violet: 0xee82ee,
          wheat: 0xf5deb3,
          white: 0xffffff,
          whitesmoke: 0xf5f5f5,
          yellow: 0xffff00,
          yellowgreen: 0x9acd32
      })
  );
  const systemColors = new Map(
      Object.entries({
          "ActiveBorder": 0x3b99fc,
          "ActiveCaption": 0x000000,
          "AppWorkspace": 0xaaaaaa,
          "Background": 0x6363ce,
          "ButtonFace": 0xffffff,
          "ButtonHighlight": 0xe9e9e9,
          "ButtonShadow": 0x9fa09f,
          "ButtonText": 0x000000,
          "CaptionText": 0x000000,
          "GrayText": 0x7f7f7f,
          "Highlight": 0xb2d7ff,
          "HighlightText": 0x000000,
          "InactiveBorder": 0xffffff,
          "InactiveCaption": 0xffffff,
          "InactiveCaptionText": 0x000000,
          "InfoBackground": 0xfbfcc5,
          "InfoText": 0x000000,
          "Menu": 0xf6f6f6,
          "MenuText": 0xffffff,
          "Scrollbar": 0xaaaaaa,
          "ThreeDDarkShadow": 0x000000,
          "ThreeDFace": 0xc0c0c0,
          "ThreeDHighlight": 0xffffff,
          "ThreeDLightShadow": 0xffffff,
          "ThreeDShadow": 0x000000,
          "Window": 0xececec,
          "WindowFrame": 0xaaaaaa,
          "WindowText": 0x000000,
          "-webkit-focus-ring-color": 0xe59700
      }).map(([key, value]) => [key.toLowerCase(), value])
  );

  const colorModificationCache = new Map();
  function modifyColorWithCache(rgb, filter, modifyHSL) {
      let fnCache;
      if (colorModificationCache.has(modifyHSL)) {
          fnCache = colorModificationCache.get(modifyHSL);
      } else {
          fnCache = new Map();
          colorModificationCache.set(modifyHSL, fnCache);
      }
      const id = Object.entries(rgb)
          .concat(
              Object.entries(filter).filter(
                  ([key]) =>
                      [
                          "mode",
                          "brightness",
                          "contrast",
                          "grayscale",
                          "sepia"
                      ].indexOf(key) >= 0
              )
          )
          .map(([key, value]) => `${key}:${value}`)
          .join(";");
      if (fnCache.has(id)) {
          return fnCache.get(id);
      }
      const hsl = rgbToHSL(rgb);
      const modified = modifyHSL(hsl);
      const {r, g, b, a} = hslToRGB(modified);
      const matrix = createFilterMatrix(filter);
      const [rf, gf, bf] = applyColorMatrix([r, g, b], matrix);
      const color =
          a === 1
              ? rgbToHexString({r: rf, g: gf, b: bf})
              : rgbToString({r: rf, g: gf, b: bf, a});
      fnCache.set(id, color);
      return color;
  }
  function modifyLightModeHSL({h, s, l, a}) {
      const lMin = 0;
      const lMid = 0.4;
      const lMax = 0.9;
      const sNeutralLim = 0.36;
      const lNeutralDark = 0.2;
      const lNeutralLight = 0.8;
      const sColored = 0.16;
      const hColoredL0 = 205;
      const hColoredL1 = 40;
      const lx = scale(l, 0, 1, lMin, lMax);
      let hx = h;
      let sx = s;
      const isNeutral =
          l < lNeutralDark || l > lNeutralLight || s < sNeutralLim;
      if (isNeutral) {
          sx =
              l < lMid
                  ? scale(l, 0, lMid, sColored, 0)
                  : scale(l, lMid, 1, 0, sColored);
          hx = l < lMid ? hColoredL0 : hColoredL1;
      }
      return {h: hx, s: sx, l: lx, a};
  }
  function modifyBgHSL({h, s, l, a}) {
      const lMin = 0.1;
      const lMaxS0 = 0.25;
      const lMaxS1 = 0.4;
      const sNeutralLim = 0.12;
      const lNeutralLight = 0.8;
      const sColored = 0.05;
      const hColored = 205;
      const hBlue0 = 200;
      const hBlue1 = 280;
      const lMax = scale(s, 0, 1, lMaxS0, lMaxS1);
      const lx = l < lMax ? l : l < 0.5 ? lMax : scale(l, 0.5, 1, lMax, lMin);
      const isNeutral =
          (l >= lNeutralLight && h > hBlue0 && h < hBlue1) || s < sNeutralLim;
      let hx = h;
      let sx = s;
      if (isNeutral) {
          sx = sColored;
          hx = hColored;
      }
      return {h: hx, s: sx, l: lx, a};
  }
  function modifyBackgroundColor(rgb, filter) {
      if (filter.mode === 0) {
          return modifyColorWithCache(rgb, filter, modifyLightModeHSL);
      }
      return modifyColorWithCache(rgb, {...filter, mode: 0}, modifyBgHSL);
  }
  function modifyFgHSL({h, s, l, a}) {
      const lMax = 0.9;
      const lMinS0 = 0.7;
      const lMinS1 = 0.6;
      const sNeutralLim = 0.24;
      const lNeutralDark = 0.2;
      const sColored = 0.1;
      const hColored = 40;
      const hBlue0 = 205;
      const hBlue1 = 245;
      const hBlueMax = 220;
      const lBlueMin = 0.7;
      const isBlue = h > hBlue0 && h <= hBlue1;
      const lMin = scale(
          s,
          0,
          1,
          isBlue ? scale(h, hBlue0, hBlue1, lMinS0, lBlueMin) : lMinS0,
          lMinS1
      );
      const lx = l < 0.5 ? scale(l, 0, 0.5, lMax, lMin) : l < lMin ? lMin : l;
      let hx = h;
      let sx = s;
      if (isBlue) {
          hx = scale(hx, hBlue0, hBlue1, hBlue0, hBlueMax);
      }
      const isNeutral = l < lNeutralDark || s < sNeutralLim;
      if (isNeutral) {
          sx = sColored;
          hx = hColored;
      }
      return {h: hx, s: sx, l: lx, a};
  }
  function modifyForegroundColor(rgb, filter) {
      if (filter.mode === 0) {
          return modifyColorWithCache(rgb, filter, modifyLightModeHSL);
      }
      return modifyColorWithCache(rgb, {...filter, mode: 0}, modifyFgHSL);
  }
  function modifyBorderHSL({h, s, l, a}) {
      const lMinS0 = 0.2;
      const lMinS1 = 0.3;
      const lMaxS0 = 0.4;
      const lMaxS1 = 0.5;
      const lMin = scale(s, 0, 1, lMinS0, lMinS1);
      const lMax = scale(s, 0, 1, lMaxS0, lMaxS1);
      const lx = scale(l, 0, 1, lMax, lMin);
      return {h, s, l: lx, a};
  }
  function modifyBorderColor(rgb, filter) {
      if (filter.mode === 0) {
          return modifyColorWithCache(rgb, filter, modifyLightModeHSL);
      }
      return modifyColorWithCache(rgb, {...filter, mode: 0}, modifyBorderHSL);
  }

  const themeColorTypes = {
      accentcolor: "bg",
      button_background_active: "text",
      button_background_hover: "text",
      frame: "bg",
      icons: "text",
      icons_attention: "text",
      popup: "bg",
      popup_border: "bg",
      popup_highlight: "bg",
      popup_highlight_text: "text",
      popup_text: "text",
      tab_background_text: "text",
      tab_line: "bg",
      tab_loading: "bg",
      tab_selected: "bg",
      textcolor: "text",
      toolbar: "bg",
      toolbar_bottom_separator: "border",
      toolbar_field: "bg",
      toolbar_field_border: "border",
      toolbar_field_border_focus: "border",
      toolbar_field_focus: "bg",
      toolbar_field_separator: "border",
      toolbar_field_text: "text",
      toolbar_field_text_focus: "text",
      toolbar_text: "text",
      toolbar_top_separator: "border",
      toolbar_vertical_separator: "border"
  };
  const $colors = {
      accentcolor: "#111111",
      frame: "#111111",
      popup: "#cccccc",
      popup_text: "black",
      tab_background_text: "white",
      tab_line: "#23aeff",
      tab_loading: "#23aeff",
      textcolor: "white",
      toolbar: "#707070",
      toolbar_field: "lightgray",
      toolbar_field_text: "black"
  };
  function setWindowTheme(filter) {
      const colors = Object.entries($colors).reduce((obj, [key, value]) => {
          const type = themeColorTypes[key];
          const modify = {
              bg: modifyBackgroundColor,
              text: modifyForegroundColor,
              border: modifyBorderColor
          }[type];
          const rgb = parse(value);
          const modified = modify(rgb, filter);
          obj[key] = modified;
          return obj;
      }, {});
      if (
          typeof browser !== "undefined" &&
          browser.theme &&
          browser.theme.update
      ) {
          browser.theme.update({colors});
      }
  }
  function resetWindowTheme() {
      if (
          typeof browser !== "undefined" &&
          browser.theme &&
          browser.theme.reset
      ) {
          browser.theme.reset();
      }
  }

  function createSVGFilterStylesheet(config, url, frameURL, inversionFixes) {
      let filterValue;
      let reverseFilterValue;
      if (isFirefox()) {
          filterValue = getEmbeddedSVGFilterValue(
              getSVGFilterMatrixValue(config)
          );
          reverseFilterValue = getEmbeddedSVGFilterValue(
              getSVGReverseFilterMatrixValue()
          );
      } else {
          filterValue = "url(#dark-reader-filter)";
          reverseFilterValue = "url(#dark-reader-reverse-filter)";
      }
      return cssFilterStyleheetTemplate(
          filterValue,
          reverseFilterValue,
          config,
          url,
          frameURL,
          inversionFixes
      );
  }
  function getEmbeddedSVGFilterValue(matrixValue) {
      const id = "dark-reader-filter";
      const svg = [
          '<svg xmlns="http://www.w3.org/2000/svg">',
          `<filter id="${id}" style="color-interpolation-filters: sRGB;">`,
          `<feColorMatrix type="matrix" values="${matrixValue}" />`,
          "</filter>",
          "</svg>"
      ].join("");
      return `url(data:image/svg+xml;base64,${btoa(svg)}#${id})`;
  }
  function toSVGMatrix(matrix) {
      return matrix
          .slice(0, 4)
          .map((m) => m.map((m) => m.toFixed(3)).join(" "))
          .join(" ");
  }
  function getSVGFilterMatrixValue(config) {
      return toSVGMatrix(createFilterMatrix(config));
  }
  function getSVGReverseFilterMatrixValue() {
      return toSVGMatrix(Matrix.invertNHue());
  }

  const matchesMediaQuery = (query) =>
      Boolean(window.matchMedia(query).matches);
  const matchesDarkTheme = () =>
      matchesMediaQuery("(prefers-color-scheme: dark)");
  const matchesLightTheme = () =>
      matchesMediaQuery("(prefers-color-scheme: light)");
  const isColorSchemeSupported = matchesDarkTheme() || matchesLightTheme();
  function isSystemDarkModeEnabled() {
      if (!isColorSchemeSupported) {
          return false;
      }
      return matchesDarkTheme();
  }

  function logInfo(...args) {}
  function logWarn(...args) {}

  function throttle(callback) {
      let pending = false;
      let frameId = null;
      let lastArgs;
      const throttled = (...args) => {
          lastArgs = args;
          if (frameId) {
              pending = true;
          } else {
              callback(...lastArgs);
              frameId = requestAnimationFrame(() => {
                  frameId = null;
                  if (pending) {
                      callback(...lastArgs);
                      pending = false;
                  }
              });
          }
      };
      const cancel = () => {
          cancelAnimationFrame(frameId);
          pending = false;
          frameId = null;
      };
      return Object.assign(throttled, {cancel});
  }
  function createAsyncTasksQueue() {
      const tasks = [];
      let frameId = null;
      function runTasks() {
          let task;
          while ((task = tasks.shift())) {
              task();
          }
          frameId = null;
      }
      function add(task) {
          tasks.push(task);
          if (!frameId) {
              frameId = requestAnimationFrame(runTasks);
          }
      }
      function cancel() {
          tasks.splice(0);
          cancelAnimationFrame(frameId);
          frameId = null;
      }
      return {add, cancel};
  }

  function createNodeAsap({
      selectNode,
      createNode,
      updateNode,
      selectTarget,
      createTarget,
      isTargetMutation
  }) {
      const target = selectTarget();
      if (target) {
          const prev = selectNode();
          if (prev) {
              updateNode(prev);
          } else {
              createNode(target);
          }
      } else {
          const observer = new MutationObserver((mutations) => {
              const mutation = mutations.find(isTargetMutation);
              if (mutation) {
                  unsubscribe();
                  const target = selectTarget();
                  selectNode() || createNode(target);
              }
          });
          const ready = () => {
              if (document.readyState !== "complete") {
                  return;
              }
              unsubscribe();
              const target = selectTarget() || createTarget();
              selectNode() || createNode(target);
          };
          const unsubscribe = () => {
              document.removeEventListener("readystatechange", ready);
              observer.disconnect();
          };
          if (document.readyState === "complete") {
              ready();
          } else {
              document.addEventListener("readystatechange", ready);
              observer.observe(document, {childList: true, subtree: true});
          }
      }
  }
  function removeNode(node) {
      node && node.parentNode && node.parentNode.removeChild(node);
  }
  function watchForNodePosition(node, onRestore) {
      const MAX_ATTEMPTS_COUNT = 10;
      const ATTEMPTS_INTERVAL = getDuration({seconds: 10});
      const prevSibling = node.previousSibling;
      const parent = node.parentElement;
      if (!parent) {
          return {stop: () => {}};
      }
      let attempts = 0;
      let start = null;
      const restore = throttle(() => {
          attempts++;
          const now = Date.now();
          if (start == null) {
              start = now;
          } else if (attempts >= MAX_ATTEMPTS_COUNT) {
              if (now - start < ATTEMPTS_INTERVAL) {
                  stop();
                  return;
              }
              start = now;
              attempts = 1;
          }
          if (prevSibling && prevSibling.parentElement !== parent) {
              stop();
              return;
          }
          parent.insertBefore(
              node,
              prevSibling ? prevSibling.nextSibling : parent.firstChild
          );
          onRestore && onRestore();
      });
      const observer = new MutationObserver(() => {
          if (!node.parentElement) {
              restore();
          }
      });
      const run = () => {
          observer.observe(parent, {childList: true});
      };
      const stop = () => {
          observer.disconnect();
      };
      run();
      return {run, stop};
  }

  function createOrUpdateStyle(css) {
      createNodeAsap({
          selectNode: () => document.getElementById("dark-reader-style"),
          createNode: (target) => {
              const style = document.createElement("style");
              style.id = "dark-reader-style";
              style.type = "text/css";
              style.textContent = css;
              target.appendChild(style);
          },
          updateNode: (existing) => {
              if (
                  css.replace(/^\s+/gm, "") !==
                  existing.textContent.replace(/^\s+/gm, "")
              ) {
                  existing.textContent = css;
              }
          },
          selectTarget: () => document.head,
          createTarget: () => {
              const head = document.createElement("head");
              document.documentElement.insertBefore(
                  head,
                  document.documentElement.firstElementChild
              );
              return head;
          },
          isTargetMutation: (mutation) =>
              mutation.target.nodeName.toLowerCase() === "head"
      });
  }
  function removeStyle() {
      removeNode(document.getElementById("dark-reader-style"));
  }

  function createOrUpdateSVGFilter(svgMatrix, svgReverseMatrix) {
      createNodeAsap({
          selectNode: () => document.getElementById("dark-reader-svg"),
          createNode: (target) => {
              const SVG_NS = "http://www.w3.org/2000/svg";
              const createMatrixFilter = (id, matrix) => {
                  const filter = document.createElementNS(SVG_NS, "filter");
                  filter.id = id;
                  filter.style.colorInterpolationFilters = "sRGB";
                  filter.setAttribute("x", "0");
                  filter.setAttribute("y", "0");
                  filter.setAttribute("width", "99999");
                  filter.setAttribute("height", "99999");
                  filter.appendChild(createColorMatrix(matrix));
                  return filter;
              };
              const createColorMatrix = (matrix) => {
                  const colorMatrix = document.createElementNS(
                      SVG_NS,
                      "feColorMatrix"
                  );
                  colorMatrix.setAttribute("type", "matrix");
                  colorMatrix.setAttribute("values", matrix);
                  return colorMatrix;
              };
              const svg = document.createElementNS(SVG_NS, "svg");
              svg.id = "dark-reader-svg";
              svg.style.height = "0";
              svg.style.width = "0";
              svg.appendChild(
                  createMatrixFilter("dark-reader-filter", svgMatrix)
              );
              svg.appendChild(
                  createMatrixFilter(
                      "dark-reader-reverse-filter",
                      svgReverseMatrix
                  )
              );
              target.appendChild(svg);
          },
          updateNode: (existing) => {
              const existingMatrix = existing.firstChild.firstChild;
              if (existingMatrix.getAttribute("values") !== svgMatrix) {
                  existingMatrix.setAttribute("values", svgMatrix);
                  const style = document.getElementById("dark-reader-style");
                  const css = style.textContent;
                  style.textContent = "";
                  style.textContent = css;
              }
          },
          selectTarget: () => document.head,
          createTarget: () => {
              const head = document.createElement("head");
              document.documentElement.insertBefore(
                  head,
                  document.documentElement.firstElementChild
              );
              return head;
          },
          isTargetMutation: (mutation) =>
              mutation.target.nodeName.toLowerCase() === "head"
      });
  }
  function removeSVGFilter() {
      removeNode(document.getElementById("dark-reader-svg"));
  }

  function parseURL(url) {
      const a = document.createElement("a");
      a.href = url;
      return a;
  }
  function getAbsoluteURL($base, $relative) {
      if ($relative.match(/^.*?\/\//) || $relative.match(/^data\:/)) {
          if ($relative.startsWith("//")) {
              return `${location.protocol}${$relative}`;
          }
          return $relative;
      }
      const b = parseURL($base);
      if ($relative.startsWith("/")) {
          const u = parseURL(`${b.protocol}//${b.host}${$relative}`);
          return u.href;
      }
      const pathParts = b.pathname
          .split("/")
          .concat($relative.split("/"))
          .filter((p) => p);
      let backwardIndex;
      while ((backwardIndex = pathParts.indexOf("..")) > 0) {
          pathParts.splice(backwardIndex - 1, 2);
      }
      const u = parseURL(`${b.protocol}//${b.host}/${pathParts.join("/")}`);
      return u.href;
  }

  function iterateCSSRules(rules, iterate) {
      Array.from(rules).forEach((rule) => {
          if (rule instanceof CSSMediaRule) {
              const media = Array.from(rule.media);
              if (
                  media.includes("screen") ||
                  media.includes("all") ||
                  !(media.includes("print") || media.includes("speech"))
              ) {
                  iterateCSSRules(rule.cssRules, iterate);
              }
          } else if (rule instanceof CSSStyleRule) {
              iterate(rule);
          } else if (rule instanceof CSSImportRule) {
              try {
                  iterateCSSRules(rule.styleSheet.cssRules, iterate);
              } catch (err) {}
          }
      });
  }
  function iterateCSSDeclarations(style, iterate) {
      Array.from(style).forEach((property) => {
          const value = style.getPropertyValue(property).trim();
          if (!value) {
              return;
          }
          iterate(property, value);
      });
  }
  function isCSSVariable(property) {
      return (
          property.startsWith("--") && !property.startsWith("--darkreader")
      );
  }
  function getCSSVariables(rules) {
      const variables = new Map();
      rules &&
          iterateCSSRules(rules, (rule) => {
              rule.style &&
                  iterateCSSDeclarations(rule.style, (property, value) => {
                      if (isCSSVariable(property)) {
                          variables.set(property, value);
                      }
                  });
          });
      return variables;
  }
  function getElementCSSVariables(element) {
      const variables = new Map();
      iterateCSSDeclarations(element.style, (property, value) => {
          if (isCSSVariable(property)) {
              variables.set(property, value);
          }
      });
      return variables;
  }
  const cssURLRegex = /url\((('.+?')|(".+?")|([^\)]*?))\)/g;
  const cssImportRegex = /@import (url\()?(('.+?')|(".+?")|([^\)]*?))\)?;?/g;
  function getCSSURLValue(cssURL) {
      return cssURL
          .replace(/^url\((.*)\)$/, "$1")
          .replace(/^"(.*)"$/, "$1")
          .replace(/^'(.*)'$/, "$1");
  }
  function getCSSBaseBath(url) {
      const cssURL = parseURL(url);
      return `${cssURL.protocol}//${cssURL.host}${cssURL.pathname
          .replace(/\?.*$/, "")
          .replace(/(\/)([^\/]+)$/i, "$1")}`;
  }
  function replaceCSSRelativeURLsWithAbsolute($css, cssBasePath) {
      return $css.replace(cssURLRegex, (match) => {
          const pathValue = getCSSURLValue(match);
          return `url("${getAbsoluteURL(cssBasePath, pathValue)}")`;
      });
  }
  const cssCommentsRegex = /\/\*[\s\S]*?\*\//g;
  function removeCSSComments($css) {
      return $css.replace(cssCommentsRegex, "");
  }
  const fontFaceRegex = /@font-face\s*{[^}]*}/g;
  function replaceCSSFontFace($css) {
      return $css.replace(fontFaceRegex, "");
  }
  const varRegex = /var\((--[^\s,]+),?\s*([^\(\)]*(\([^\(\)]*\)[^\(\)]*)*\s*)\)/g;
  function replaceCSSVariables(value, variables) {
      let missing = false;
      const result = value.replace(varRegex, (match, name, fallback) => {
          if (variables.has(name)) {
              return variables.get(name);
          } else if (fallback) {
              return fallback;
          } else {
              missing = true;
          }
          return match;
      });
      if (missing) {
          return result;
      }
      if (result.match(varRegex)) {
          return replaceCSSVariables(result, variables);
      }
      return result;
  }

  function isDeepSelectorSupported() {
      try {
          document.querySelector("x /deep/ x");
          return true;
      } catch (err) {
          return false;
      }
  }

  function getMatches(regex, input, group = 0) {
      const matches = [];
      let m;
      while ((m = regex.exec(input))) {
          matches.push(m[group]);
      }
      return matches;
  }


  function clearColorModificationCache() {
      colorModificationCache.clear();
  }
  function noopHSL(hsl) {
      return hsl;
  }
  function modifyColor(rgb, theme) {
      return modifyColorWithCache(rgb, theme, noopHSL);
  }
  function modifyShadowColor(rgb, filter) {
      return modifyBackgroundColor(rgb, filter);
  }
  function modifyGradientColor(rgb, filter) {
      return modifyBackgroundColor(rgb, filter);
  }

  let counter = 0;
  const resolvers = new Map();
  const rejectors = new Map();
  function bgFetch(request) {
      return new Promise((resolve, reject) => {
          const id = ++counter;
          resolvers.set(id, resolve);
          rejectors.set(id, reject);

      });
  }
  // chrome.runtime.onMessage.addListener(({type, data, error, id}) => {
  //     if (type === "fetch-response") {
  //         const resolve = resolvers.get(id);
  //         const reject = rejectors.get(id);
  //         resolvers.delete(id);
  //         rejectors.delete(id);
  //         if (error) {
  //             reject && reject(error);
  //         } else {
  //             resolve && resolve(data);
  //         }
  //     }
  // });

  async function getImageDetails(url) {
      let dataURL;
      if (url.startsWith("data:")) {
          dataURL = url;
      } else {
          dataURL = await getImageDataURL(url);
      }
      const image = await urlToImage(dataURL);
      const info = analyzeImage(image);
      return {
          src: url,
          dataURL,
          width: image.naturalWidth,
          height: image.naturalHeight,
          ...info
      };
  }
  async function getImageDataURL(url) {
      if (getURLHost(url) === location.host) {
          return await loadAsDataURL(url);
      }
      return await bgFetch({url, responseType: "data-url"});
  }
  async function urlToImage(url) {
      return new Promise((resolve, reject) => {
          const image = new Image();
          image.onload = () => resolve(image);
          image.onerror = () => reject(`Unable to load image ${url}`);
          image.src = url;
      });
  }
  function analyzeImage(image) {
      const MAX_ANALIZE_PIXELS_COUNT = 32 * 32;
      const naturalPixelsCount = image.naturalWidth * image.naturalHeight;
      const k = Math.min(
          1,
          Math.sqrt(MAX_ANALIZE_PIXELS_COUNT / naturalPixelsCount)
      );
      const width = Math.max(1, Math.round(image.naturalWidth * k));
      const height = Math.max(1, Math.round(image.naturalHeight * k));
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext("2d");
      context.imageSmoothingEnabled = false;
      context.drawImage(image, 0, 0, width, height);
      const imageData = context.getImageData(0, 0, width, height);
      const d = imageData.data;
      const TRANSPARENT_ALPHA_THRESHOLD = 0.05;
      const DARK_LIGHTNESS_THRESHOLD = 0.4;
      const LIGHT_LIGHTNESS_THRESHOLD = 0.7;
      let transparentPixelsCount = 0;
      let darkPixelsCount = 0;
      let lightPixelsCount = 0;
      let i, x, y;
      let r, g, b, a;
      let l, min, max;
      for (y = 0; y < height; y++) {
          for (x = 0; x < width; x++) {
              i = 4 * (y * width + x);
              r = d[i + 0] / 255;
              g = d[i + 1] / 255;
              b = d[i + 2] / 255;
              a = d[i + 3] / 255;
              if (a < TRANSPARENT_ALPHA_THRESHOLD) {
                  transparentPixelsCount++;
              } else {
                  min = Math.min(r, g, b);
                  max = Math.max(r, g, b);
                  l = (max + min) / 2;
                  if (l < DARK_LIGHTNESS_THRESHOLD) {
                      darkPixelsCount++;
                  }
                  if (l > LIGHT_LIGHTNESS_THRESHOLD) {
                      lightPixelsCount++;
                  }
              }
          }
      }
      const totalPixelsCount = width * height;
      const opaquePixelsCount = totalPixelsCount - transparentPixelsCount;
      const DARK_IMAGE_THRESHOLD = 0.7;
      const LIGHT_IMAGE_THRESHOLD = 0.7;
      const TRANSPARENT_IMAGE_THRESHOLD = 0.1;
      const LARGE_IMAGE_PIXELS_COUNT = 800 * 600;
      return {
          isDark: darkPixelsCount / opaquePixelsCount >= DARK_IMAGE_THRESHOLD,
          isLight:
              lightPixelsCount / opaquePixelsCount >= LIGHT_IMAGE_THRESHOLD,
          isTransparent:
              transparentPixelsCount / totalPixelsCount >=
              TRANSPARENT_IMAGE_THRESHOLD,
          isLarge: naturalPixelsCount >= LARGE_IMAGE_PIXELS_COUNT
      };
  }
  function getFilteredImageDataURL({dataURL, width, height}, filter) {
      const matrix = getSVGFilterMatrixValue(filter);
      const svg = [
          `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${width}" height="${height}">`,
          "<defs>",
          '<filter id="darkreader-image-filter">',
          `<feColorMatrix type="matrix" values="${matrix}" />`,
          "</filter>",
          "</defs>",
          `<image width="${width}" height="${height}" filter="url(#darkreader-image-filter)" xlink:href="${dataURL}" />`,
          "</svg>"
      ].join("");
      const bytes = new Uint8Array(svg.length);
      for (let i = 0; i < svg.length; i++) {
          bytes[i] = svg.charCodeAt(i);
      }
      const blob = new Blob([bytes], {type: "image/svg+xml"});
      const objectURL = URL.createObjectURL(blob);
      return objectURL;
  }

  function getModifiableCSSDeclaration(property, value, rule, isCancelled) {
      const important = Boolean(
          rule && rule.style && rule.style.getPropertyPriority(property)
      );
      const sourceValue = value;
      if (property.startsWith("--")) {
          return null;
      } else if (
          (property.indexOf("color") >= 0 &&
              property !== "-webkit-print-color-adjust") ||
          property === "fill" ||
          property === "stroke"
      ) {
          const modifier = getColorModifier(property, value);
          if (modifier) {
              return {property, value: modifier, important, sourceValue};
          }
      } else if (property === "background-image") {
          const modifier = getBgImageModifier(
              property,
              value,
              rule,
              isCancelled
          );
          if (modifier) {
              return {property, value: modifier, important, sourceValue};
          }
      } else if (property.indexOf("shadow") >= 0) {
          const modifier = getShadowModifier(property, value);
          if (modifier) {
              return {property, value: modifier, important, sourceValue};
          }
      }
      return null;
  }
  function getModifiedUserAgentStyle(filter, isIFrame) {
      const lines = [];
      if (!isIFrame) {
          lines.push("html {");
          lines.push(
              `    background-color: ${modifyBackgroundColor(
                  {r: 255, g: 255, b: 255},
                  filter
              )} !important;`
          );
          lines.push("}");
      }
      lines.push(
          `${isIFrame ? "" : "html, body, "}input, textarea, select, button {`
      );
      lines.push(
          `    background-color: ${modifyBackgroundColor(
              {r: 255, g: 255, b: 255},
              filter
          )};`
      );
      lines.push("}");
      lines.push("html, body, input, textarea, select, button {");
      lines.push(
          `    border-color: ${modifyBorderColor(
              {r: 76, g: 76, b: 76},
              filter
          )};`
      );
      lines.push(
          `    color: ${modifyForegroundColor({r: 0, g: 0, b: 0}, filter)};`
      );
      lines.push("}");
      lines.push("a {");
      lines.push(
          `    color: ${modifyForegroundColor(
              {r: 0, g: 64, b: 255},
              filter
          )};`
      );
      lines.push("}");
      lines.push("table {");
      lines.push(
          `    border-color: ${modifyBorderColor(
              {r: 128, g: 128, b: 128},
              filter
          )};`
      );
      lines.push("}");
      lines.push("::placeholder {");
      lines.push(
          `    color: ${modifyForegroundColor(
              {r: 169, g: 169, b: 169},
              filter
          )};`
      );
      lines.push("}");
      ["::selection", "::-moz-selection"].forEach((selection) => {
          lines.push(`${selection} {`);
          lines.push(
              `    background-color: ${modifyBackgroundColor(
                  {r: 0, g: 96, b: 212},
                  filter
              )};`
          );
          lines.push(
              `    color: ${modifyForegroundColor(
                  {r: 255, g: 255, b: 255},
                  filter
              )};`
          );
          lines.push("}");
      });
      lines.push("input:-webkit-autofill,");
      lines.push("textarea:-webkit-autofill,");
      lines.push("select:-webkit-autofill {");
      lines.push(
          `    background-color: ${modifyBackgroundColor(
              {r: 250, g: 255, b: 189},
              filter
          )} !important;`
      );
      lines.push(
          `    color: ${modifyForegroundColor(
              {r: 0, g: 0, b: 0},
              filter
          )} !important;`
      );
      lines.push("}");
      if (!isMacOS()) {
          lines.push("::-webkit-scrollbar {");
          lines.push(
              `    background-color: ${modifyBackgroundColor(
                  {r: 241, g: 241, b: 241},
                  filter
              )};`
          );
          lines.push(
              `    color: ${modifyForegroundColor(
                  {r: 96, g: 96, b: 96},
                  filter
              )};`
          );
          lines.push("}");
          lines.push("::-webkit-scrollbar-thumb {");
          lines.push(
              `    background-color: ${modifyBackgroundColor(
                  {r: 193, g: 193, b: 193},
                  filter
              )};`
          );
          lines.push("}");
          lines.push("::-webkit-scrollbar-thumb:hover {");
          lines.push(
              `    background-color: ${modifyBackgroundColor(
                  {r: 166, g: 166, b: 166},
                  filter
              )};`
          );
          lines.push("}");
          lines.push("::-webkit-scrollbar-thumb:active {");
          lines.push(
              `    background-color: ${modifyBackgroundColor(
                  {r: 96, g: 96, b: 96},
                  filter
              )};`
          );
          lines.push("}");
          lines.push("::-webkit-scrollbar-corner {");
          lines.push(
              `    background-color: ${modifyBackgroundColor(
                  {r: 255, g: 255, b: 255},
                  filter
              )};`
          );
          lines.push("}");
          lines.push("* {");
          lines.push(
              `    scrollbar-color: ${modifyBackgroundColor(
                  {r: 193, g: 193, b: 193},
                  filter
              )} ${modifyBackgroundColor({r: 241, g: 241, b: 241}, filter)};`
          );
          lines.push("}");
      }
      return lines.join("\n");
  }
  function getModifiedFallbackStyle(filter, {strict}) {
      const lines = [];
      lines.push(`html, body, ${strict ? "body *" : "body > *"} {`);
      lines.push(
          `    background-color: ${modifyBackgroundColor(
              {r: 255, g: 255, b: 255},
              filter
          )} !important;`
      );
      lines.push(
          `    border-color: ${modifyBorderColor(
              {r: 64, g: 64, b: 64},
              filter
          )} !important;`
      );
      lines.push(
          `    color: ${modifyForegroundColor(
              {r: 0, g: 0, b: 0},
              filter
          )} !important;`
      );
      lines.push("}");
      return lines.join("\n");
  }
  const unparsableColors = new Set([
      "inherit",
      "transparent",
      "initial",
      "currentcolor",
      "none"
  ]);
  const colorParseCache = new Map();
  function parseColorWithCache($color) {
      $color = $color.trim();
      if (colorParseCache.has($color)) {
          return colorParseCache.get($color);
      }
      const color = parse($color);
      colorParseCache.set($color, color);
      return color;
  }
  function tryParseColor($color) {
      try {
          return parseColorWithCache($color);
      } catch (err) {
          return null;
      }
  }
  function getColorModifier(prop, value) {
      if (unparsableColors.has(value.toLowerCase())) {
          return value;
      }
      try {
          const rgb = parseColorWithCache(value);
          if (prop.indexOf("background") >= 0) {
              return (filter) => modifyBackgroundColor(rgb, filter);
          }
          if (prop.indexOf("border") >= 0 || prop.indexOf("outline") >= 0) {
              return (filter) => modifyBorderColor(rgb, filter);
          }
          return (filter) => modifyForegroundColor(rgb, filter);
      } catch (err) {
          return null;
      }
  }
  const gradientRegex = /[\-a-z]+gradient\(([^\(\)]*(\(([^\(\)]*(\(.*?\)))*[^\(\)]*\))){0,15}[^\(\)]*\)/g;
  const imageDetailsCache = new Map();
  const awaitingForImageLoading = new Map();
  function getBgImageModifier(prop, value, rule, isCancelled) {
      try {
          const gradients = getMatches(gradientRegex, value);
          const urls = getMatches(cssURLRegex, value);
          if (urls.length === 0 && gradients.length === 0) {
              return value;
          }
          const getIndices = (matches) => {
              let index = 0;
              return matches.map((match) => {
                  const valueIndex = value.indexOf(match, index);
                  index = valueIndex + match.length;
                  return {match, index: valueIndex};
              });
          };
          const matches = getIndices(urls)
              .map((i) => ({type: "url", ...i}))
              .concat(
                  getIndices(gradients).map((i) => ({type: "gradient", ...i}))
              )
              .sort((a, b) => a.index - b.index);
          const getGradientModifier = (gradient) => {
              const match = gradient.match(/^(.*-gradient)\((.*)\)$/);
              const type = match[1];
              const content = match[2];
              const partsRegex = /([^\(\),]+(\([^\(\)]*(\([^\(\)]*\)*[^\(\)]*)?\))?[^\(\),]*),?/g;
              const colorStopRegex = /^(from|color-stop|to)\(([^\(\)]*?,\s*)?(.*?)\)$/;
              const parts = getMatches(partsRegex, content, 1).map((part) => {
                  part = part.trim();
                  let rgb = tryParseColor(part);
                  if (rgb) {
                      return (filter) => modifyGradientColor(rgb, filter);
                  }
                  const space = part.lastIndexOf(" ");
                  rgb = tryParseColor(part.substring(0, space));
                  if (rgb) {
                      return (filter) =>
                          `${modifyGradientColor(
                              rgb,
                              filter
                          )} ${part.substring(space + 1)}`;
                  }
                  const colorStopMatch = part.match(colorStopRegex);
                  if (colorStopMatch) {
                      rgb = tryParseColor(colorStopMatch[3]);
                      if (rgb) {
                          return (filter) =>
                              `${colorStopMatch[1]}(${
                                  colorStopMatch[2]
                                      ? `${colorStopMatch[2]}, `
                                      : ""
                              }${modifyGradientColor(rgb, filter)})`;
                      }
                  }
                  return () => part;
              });
              return (filter) => {
                  return `${type}(${parts
                      .map((modify) => modify(filter))
                      .join(", ")})`;
              };
          };
          const getURLModifier = (urlValue) => {
              let url = getCSSURLValue(urlValue);
              if (rule.parentStyleSheet.href) {
                  const basePath = getCSSBaseBath(rule.parentStyleSheet.href);
                  url = getAbsoluteURL(basePath, url);
              } else if (
                  rule.parentStyleSheet.ownerNode &&
                  rule.parentStyleSheet.ownerNode.baseURI
              ) {
                  url = getAbsoluteURL(
                      rule.parentStyleSheet.ownerNode.baseURI,
                      url
                  );
              } else {
                  url = getAbsoluteURL(location.origin, url);
              }
              const absoluteValue = `url("${url}")`;
              return async (filter) => {
                  let imageDetails;
                  if (imageDetailsCache.has(url)) {
                      imageDetails = imageDetailsCache.get(url);
                  } else {
                      try {
                          if (awaitingForImageLoading.has(url)) {
                              const awaiters = awaitingForImageLoading.get(
                                  url
                              );
                              imageDetails = await new Promise((resolve) =>
                                  awaiters.push(resolve)
                              );
                              if (!imageDetails) {
                                  return null;
                              }
                          } else {
                              awaitingForImageLoading.set(url, []);
                              imageDetails = await getImageDetails(url);
                              imageDetailsCache.set(url, imageDetails);
                              awaitingForImageLoading
                                  .get(url)
                                  .forEach((resolve) =>
                                      resolve(imageDetails)
                                  );
                              awaitingForImageLoading.delete(url);
                          }
                          if (isCancelled()) {
                              return null;
                          }
                      } catch (err) {
                          logWarn(err);
                          if (awaitingForImageLoading.has(url)) {
                              awaitingForImageLoading
                                  .get(url)
                                  .forEach((resolve) => resolve(null));
                              awaitingForImageLoading.delete(url);
                          }
                          return absoluteValue;
                      }
                  }
                  const bgImageValue =
                      getBgImageValue(imageDetails, filter) || absoluteValue;
                  return bgImageValue;
              };
          };
          const getBgImageValue = (imageDetails, filter) => {
              const {
                  isDark,
                  isLight,
                  isTransparent,
                  isLarge,
                  width
              } = imageDetails;
              let result;
              if (
                  isDark &&
                  isTransparent &&
                  filter.mode === 1 &&
                  !isLarge &&
                  width > 2
              ) {
                  logInfo(`Inverting dark image ${imageDetails.src}`);
                  const inverted = getFilteredImageDataURL(imageDetails, {
                      ...filter,
                      sepia: clamp(filter.sepia + 10, 0, 100)
                  });
                  result = `url("${inverted}")`;
              } else if (isLight && !isTransparent && filter.mode === 1) {
                  if (isLarge) {
                      result = "none";
                  } else {
                      logInfo(`Dimming light image ${imageDetails.src}`);
                      const dimmed = getFilteredImageDataURL(
                          imageDetails,
                          filter
                      );
                      result = `url("${dimmed}")`;
                  }
              } else if (filter.mode === 0 && isLight && !isLarge) {
                  logInfo(`Applying filter to image ${imageDetails.src}`);
                  const filtered = getFilteredImageDataURL(imageDetails, {
                      ...filter,
                      brightness: clamp(filter.brightness - 10, 5, 200),
                      sepia: clamp(filter.sepia + 10, 0, 100)
                  });
                  result = `url("${filtered}")`;
              } else {
                  result = null;
              }
              return result;
          };
          const modifiers = [];
          let index = 0;
          matches.forEach(({match, type, index: matchStart}, i) => {
              const prefixStart = index;
              const matchEnd = matchStart + match.length;
              index = matchEnd;
              modifiers.push(() => value.substring(prefixStart, matchStart));
              modifiers.push(
                  type === "url"
                      ? getURLModifier(match)
                      : getGradientModifier(match)
              );
              if (i === matches.length - 1) {
                  modifiers.push(() => value.substring(matchEnd));
              }
          });
          return (filter) => {
              const results = modifiers.map((modify) => modify(filter));
              if (results.some((r) => r instanceof Promise)) {
                  return Promise.all(results).then((asyncResults) => {
                      return asyncResults.join("");
                  });
              }
              return results.join("");
          };
      } catch (err) {
          return null;
      }
  }
  function getShadowModifier(prop, value) {
      try {
          let index = 0;
          const colorMatches = getMatches(
              /(^|\s)([a-z]+\(.+?\)|#[0-9a-f]+|[a-z]+)(.*?(inset|outset)?($|,))/gi,
              value,
              2
          );
          const modifiers = colorMatches.map((match, i) => {
              const prefixIndex = index;
              const matchIndex = value.indexOf(match, index);
              const matchEnd = matchIndex + match.length;
              index = matchEnd;
              const rgb = tryParseColor(match);
              if (!rgb) {
                  return () => value.substring(prefixIndex, matchEnd);
              }
              return (filter) =>
                  `${value.substring(
                      prefixIndex,
                      matchIndex
                  )}${modifyShadowColor(rgb, filter)}${
                      i === colorMatches.length - 1
                          ? value.substring(matchEnd)
                          : ""
                  }`;
          });
          return (filter) =>
              modifiers.map((modify) => modify(filter)).join("");
      } catch (err) {
          return null;
      }
  }
  function cleanModificationCache() {
      colorParseCache.clear();
      clearColorModificationCache();
      imageDetailsCache.clear();
      awaitingForImageLoading.clear();
  }

  const overrides = {
      "background-color": {
          customProp: "--darkreader-inline-bgcolor",
          cssProp: "background-color",
          dataAttr: "data-darkreader-inline-bgcolor",
          store: new WeakSet()
      },
      "background-image": {
          customProp: "--darkreader-inline-bgimage",
          cssProp: "background-image",
          dataAttr: "data-darkreader-inline-bgimage",
          store: new WeakSet()
      },
      "border-color": {
          customProp: "--darkreader-inline-border",
          cssProp: "border-color",
          dataAttr: "data-darkreader-inline-border",
          store: new WeakSet()
      },
      "border-bottom-color": {
          customProp: "--darkreader-inline-border-bottom",
          cssProp: "border-bottom-color",
          dataAttr: "data-darkreader-inline-border-bottom",
          store: new WeakSet()
      },
      "border-left-color": {
          customProp: "--darkreader-inline-border-left",
          cssProp: "border-left-color",
          dataAttr: "data-darkreader-inline-border-left",
          store: new WeakSet()
      },
      "border-right-color": {
          customProp: "--darkreader-inline-border-right",
          cssProp: "border-right-color",
          dataAttr: "data-darkreader-inline-border-right",
          store: new WeakSet()
      },
      "border-top-color": {
          customProp: "--darkreader-inline-border-top",
          cssProp: "border-top-color",
          dataAttr: "data-darkreader-inline-border-top",
          store: new WeakSet()
      },
      "box-shadow": {
          customProp: "--darkreader-inline-boxshadow",
          cssProp: "box-shadow",
          dataAttr: "data-darkreader-inline-boxshadow",
          store: new WeakSet()
      },
      "color": {
          customProp: "--darkreader-inline-color",
          cssProp: "color",
          dataAttr: "data-darkreader-inline-color",
          store: new WeakSet()
      },
      "fill": {
          customProp: "--darkreader-inline-fill",
          cssProp: "fill",
          dataAttr: "data-darkreader-inline-fill",
          store: new WeakSet()
      },
      "stroke": {
          customProp: "--darkreader-inline-stroke",
          cssProp: "stroke",
          dataAttr: "data-darkreader-inline-stroke",
          store: new WeakSet()
      },
      "outline-color": {
          customProp: "--darkreader-inline-outline",
          cssProp: "outline-color",
          dataAttr: "data-darkreader-inline-outline",
          store: new WeakSet()
      }
  };
  const overridesList = Object.values(overrides);
  const INLINE_STYLE_ATTRS = ["style", "fill", "stroke", "bgcolor", "color"];
  const INLINE_STYLE_SELECTOR = INLINE_STYLE_ATTRS.map(
      (attr) => `[${attr}]`
  ).join(", ");
  function getInlineOverrideStyle() {
      return overridesList
          .map(({dataAttr, customProp, cssProp}) => {
              return [
                  `[${dataAttr}] {`,
                  `  ${cssProp}: var(${customProp}) !important;`,
                  "}"
              ].join("\n");
          })
          .join("\n");
  }
  let observer = null;
  function expand(nodes, selector) {
      const results = [];
      nodes.forEach((n) => {
          if (n instanceof Element) {
              if (n.matches(selector)) {
                  results.push(n);
              }
              results.push(...Array.from(n.querySelectorAll(selector)));
          }
      });
      return results;
  }
  function watchForInlineStyles(elementStyleDidChange) {
      if (observer) {
          observer.disconnect();
      }
      observer = new MutationObserver((mutations) => {
          mutations.forEach((m) => {
              const createdInlineStyles = expand(
                  Array.from(m.addedNodes),
                  INLINE_STYLE_SELECTOR
              );
              if (createdInlineStyles.length > 0) {
                  createdInlineStyles.forEach((el) =>
                      elementStyleDidChange(el)
                  );
              }
              if (m.type === "attributes") {
                  if (INLINE_STYLE_ATTRS.includes(m.attributeName)) {
                      elementStyleDidChange(m.target);
                  }
                  overridesList
                      .filter(
                          ({store, dataAttr}) =>
                              store.has(m.target) &&
                              !m.target.hasAttribute(dataAttr)
                      )
                      .forEach(({dataAttr}) =>
                          m.target.setAttribute(dataAttr, "")
                      );
              }
          });
      });
      observer.observe(document, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: INLINE_STYLE_ATTRS.concat(
              overridesList.map(({dataAttr}) => dataAttr)
          )
      });
  }
  function stopWatchingForInlineStyles() {
      if (observer) {
          observer.disconnect();
          observer = null;
      }
  }
  const inlineStyleCache = new WeakMap();
  const filterProps = [
      "brightness",
      "contrast",
      "grayscale",
      "sepia",
      "mode"
  ];
  function getInlineStyleCacheKey(el, theme) {
      return INLINE_STYLE_ATTRS.map(
          (attr) => `${attr}="${el.getAttribute(attr)}"`
      )
          .concat(filterProps.map((prop) => `${prop}="${theme[prop]}"`))
          .join(" ");
  }
  function overrideInlineStyle(element, theme) {
      const cacheKey = getInlineStyleCacheKey(element, theme);
      if (cacheKey === inlineStyleCache.get(element)) {
          return;
      }
      const unsetProps = new Set(Object.keys(overrides));
      function setCustomProp(targetCSSProp, modifierCSSProp, cssVal) {
          const {customProp, dataAttr} = overrides[targetCSSProp];
          const mod = getModifiableCSSDeclaration(
              modifierCSSProp,
              cssVal,
              null,
              null
          );
          if (!mod) {
              return;
          }
          let value = mod.value;
          if (typeof value === "function") {
              value = value(theme);
          }
          element.style.setProperty(customProp, value);
          if (!element.hasAttribute(dataAttr)) {
              element.setAttribute(dataAttr, "");
          }
          unsetProps.delete(targetCSSProp);
      }
      if (element.hasAttribute("bgcolor")) {
          let value = element.getAttribute("bgcolor");
          if (
              value.match(/^[0-9a-f]{3}$/i) ||
              value.match(/^[0-9a-f]{6}$/i)
          ) {
              value = `#${value}`;
          }
          setCustomProp("background-color", "background-color", value);
      }
      if (element.hasAttribute("color")) {
          let value = element.getAttribute("color");
          if (
              value.match(/^[0-9a-f]{3}$/i) ||
              value.match(/^[0-9a-f]{6}$/i)
          ) {
              value = `#${value}`;
          }
          setCustomProp("color", "color", value);
      }
      if (element.hasAttribute("fill") && element instanceof SVGElement) {
          const SMALL_SVG_LIMIT = 32;
          const value = element.getAttribute("fill");
          let isBg = false;
          if (!(element instanceof SVGTextElement)) {
              const {width, height} = element.getBoundingClientRect();
              isBg = width > SMALL_SVG_LIMIT || height > SMALL_SVG_LIMIT;
          }
          setCustomProp("fill", isBg ? "background-color" : "color", value);
      }
      if (element.hasAttribute("stroke")) {
          const value = element.getAttribute("stroke");
          setCustomProp(
              "stroke",
              element instanceof SVGLineElement ||
                  element instanceof SVGTextElement
                  ? "border-color"
                  : "color",
              value
          );
      }
      element.style &&
          iterateCSSDeclarations(element.style, (property, value) => {
              if (
                  property === "background-image" &&
                  value.indexOf("url") >= 0
              ) {
                  return;
              }
              if (overrides.hasOwnProperty(property)) {
                  setCustomProp(property, property, value);
              }
          });
      if (
          element.style &&
          element instanceof SVGTextElement &&
          element.style.fill
      ) {
          setCustomProp(
              "fill",
              "color",
              element.style.getPropertyValue("fill")
          );
      }
      Array.from(unsetProps).forEach((cssProp) => {
          const {store, dataAttr} = overrides[cssProp];
          store.delete(element);
          element.removeAttribute(dataAttr);
      });
      inlineStyleCache.set(element, getInlineStyleCacheKey(element, theme));
  }

  const metaThemeColorName = "theme-color";
  const metaThemeColorSelector = `meta[name="${metaThemeColorName}"]`;
  let srcMetaThemeColor = null;
  let observer$1 = null;
  function changeMetaThemeColor(meta, theme) {
      srcMetaThemeColor = srcMetaThemeColor || meta.content;
      try {
          const color = parse(srcMetaThemeColor);
          meta.content = modifyBackgroundColor(color, theme);
      } catch (err) {}
  }
  function changeMetaThemeColorWhenAvailable(theme) {
      const meta = document.querySelector(metaThemeColorSelector);
      if (meta) {
          changeMetaThemeColor(meta, theme);
      } else {
          if (observer$1) {
              observer$1.disconnect();
          }
          observer$1 = new MutationObserver((mutations) => {
              loop: for (const m of mutations) {
                  for (const node of Array.from(m.addedNodes)) {
                      if (
                          node instanceof HTMLMetaElement &&
                          node.name === metaThemeColorName
                      ) {
                          observer$1.disconnect();
                          observer$1 = null;
                          changeMetaThemeColor(node, theme);
                          break loop;
                      }
                  }
              }
          });
          observer$1.observe(document.head, {childList: true});
      }
  }
  function restoreMetaThemeColor() {
      if (observer$1) {
          observer$1.disconnect();
          observer$1 = null;
      }
      const meta = document.querySelector(metaThemeColorSelector);
      if (meta && srcMetaThemeColor) {
          meta.content = srcMetaThemeColor;
      }
  }

  const STYLE_SELECTOR = isDeepSelectorSupported()
      ? 'html /deep/ link[rel*="stylesheet" i], html /deep/ style'
      : 'html link[rel*="stylesheet" i], html style';
  function shouldManageStyle(element) {
      return (
          (element instanceof HTMLStyleElement ||
              (element instanceof HTMLLinkElement &&
                  element.rel &&
                  element.rel.toLowerCase().includes("stylesheet"))) &&
          !element.classList.contains("darkreader") &&
          element.media !== "print"
      );
  }
  const asyncQueue = createAsyncTasksQueue();
  function manageStyle(element, {update, loadingStart, loadingEnd}) {
      const prevStyles = [];
      let next = element;
      while (
          (next = next.nextElementSibling) &&
          next.matches(".darkreader")
      ) {
          prevStyles.push(next);
      }
      let corsCopy =
          prevStyles.find((el) => el.matches(".darkreader--cors")) || null;
      let syncStyle =
          prevStyles.find((el) => el.matches(".darkreader--sync")) || null;
      let corsCopyPositionWatcher = null;
      let syncStylePositionWatcher = null;
      let cancelAsyncOperations = false;
      function isCancelled() {
          return cancelAsyncOperations;
      }
      const observer = new MutationObserver(() => {
          update();
      });
      const observerOptions = {
          attributes: true,
          childList: true,
          characterData: true
      };
      function containsCSSImport() {
          return (
              element instanceof HTMLStyleElement &&
              element.textContent.trim().match(cssImportRegex)
          );
      }
      function getRulesSync() {
          if (corsCopy) {
              return corsCopy.sheet.cssRules;
          }
          if (element.sheet == null) {
              return null;
          }
          if (element instanceof HTMLLinkElement) {
              try {
                  return element.sheet.cssRules;
              } catch (err) {
                  return null;
              }
          }
          if (containsCSSImport()) {
              return null;
          }
          return safeGetSheetRules();
      }
      let isLoadingRules = false;
      let wasLoadingError = false;
      async function getRulesAsync() {
          let cssText;
          let cssBasePath;
          if (element instanceof HTMLLinkElement) {
              if (element.sheet == null) {
                  try {
                      await linkLoading(element);
                      if (cancelAsyncOperations) {
                          return null;
                      }
                  } catch (err) {
                      wasLoadingError = true;
                      return null;
                  }
              }
              try {
                  if (element.sheet.cssRules != null) {
                      return element.sheet.cssRules;
                  }
              } catch (err) {}
              cssText = await loadText(element.href);
              cssBasePath = getCSSBaseBath(element.href);
              if (cancelAsyncOperations) {
                  return null;
              }
          } else if (containsCSSImport()) {
              cssText = element.textContent.trim();
              cssBasePath = getCSSBaseBath(location.href);
          } else {
              return null;
          }
          if (cssText) {
              try {
                  const fullCSSText = await replaceCSSImports(
                      cssText,
                      cssBasePath
                  );
                  corsCopy = createCORSCopy(element, fullCSSText);
                  if (corsCopy) {
                      corsCopyPositionWatcher = watchForNodePosition(
                          corsCopy
                      );
                  }
              } catch (err) {}
              if (corsCopy) {
                  return corsCopy.sheet.cssRules;
              }
          }
          return null;
      }
      function details() {
          const rules = getRulesSync();
          if (!rules) {
              if (isLoadingRules || wasLoadingError) {
                  return null;
              }
              isLoadingRules = true;
              loadingStart();
              getRulesAsync()
                  .then((results) => {
                      isLoadingRules = false;
                      loadingEnd();
                      if (results) {
                          update();
                      }
                  })
                  .catch((err) => {
                      isLoadingRules = false;
                      loadingEnd();
                  });
              return null;
          }
          const variables = getCSSVariables(rules);
          return {variables};
      }
      function getFilterKey(filter) {
          return ["mode", "brightness", "contrast", "grayscale", "sepia"]
              .map((p) => `${p}:${filter[p]}`)
              .join(";");
      }
      let renderId = 0;
      const rulesTextCache = new Map();
      const rulesModCache = new Map();
      let prevFilterKey = null;
      function render(filter, variables) {
          const rules = getRulesSync();
          if (!rules) {
              return;
          }
          cancelAsyncOperations = false;
          let rulesChanged = rulesModCache.size === 0;
          const notFoundCacheKeys = new Set(rulesModCache.keys());
          const filterKey = getFilterKey(filter);
          const filterChanged = filterKey !== prevFilterKey;
          const modRules = [];
          iterateCSSRules(rules, (rule) => {
              const cssText = rule.cssText;
              let textDiffersFromPrev = false;
              notFoundCacheKeys.delete(cssText);
              if (!rulesTextCache.has(cssText)) {
                  rulesTextCache.set(cssText, cssText);
                  textDiffersFromPrev = true;
              }
              let vars = null;
              let varsRule = null;
              if (variables.size > 0 || cssText.includes("var(")) {
                  const cssTextWithVariables = replaceCSSVariables(
                      cssText,
                      variables
                  );
                  if (rulesTextCache.get(cssText) !== cssTextWithVariables) {
                      rulesTextCache.set(cssText, cssTextWithVariables);
                      textDiffersFromPrev = true;
                      vars = document.createElement("style");
                      vars.classList.add("darkreader");
                      vars.classList.add("darkreader--vars");
                      vars.media = "screen";
                      vars.textContent = cssTextWithVariables;
                      element.parentNode.insertBefore(
                          vars,
                          element.nextSibling
                      );
                      varsRule = vars.sheet.cssRules[0];
                  }
              }
              if (textDiffersFromPrev) {
                  rulesChanged = true;
              } else {
                  modRules.push(rulesModCache.get(cssText));
                  return;
              }
              const modDecs = [];
              const targetRule = varsRule || rule;
              targetRule &&
                  targetRule.style &&
                  iterateCSSDeclarations(
                      targetRule.style,
                      (property, value) => {
                          const mod = getModifiableCSSDeclaration(
                              property,
                              value,
                              rule,
                              isCancelled
                          );
                          if (mod) {
                              modDecs.push(mod);
                          }
                      }
                  );
              let modRule = null;
              if (modDecs.length > 0) {
                  modRule = {
                      selector: rule.selectorText,
                      declarations: modDecs
                  };
                  if (rule.parentRule instanceof CSSMediaRule) {
                      modRule.media = rule.parentRule.media.mediaText;
                  }
                  modRules.push(modRule);
              }
              rulesModCache.set(cssText, modRule);
              removeNode(vars);
          });
          notFoundCacheKeys.forEach((key) => {
              rulesTextCache.delete(key);
              rulesModCache.delete(key);
          });
          prevFilterKey = filterKey;
          if (!rulesChanged && !filterChanged) {
              return;
          }
          renderId++;
          function setRule(target, index, declarations) {
              const {selector} = declarations[0];
              target.insertRule(`${selector} {}`, index);
              const style = target.cssRules.item(index).style;
              declarations.forEach(
                  ({property, value, important, sourceValue}) => {
                      style.setProperty(
                          property,
                          value == null ? sourceValue : value,
                          important ? "important" : ""
                      );
                  }
              );
          }
          const readyDeclarations = [];
          const asyncDeclarations = new Map();
          let asyncDeclarationCounter = 0;
          function buildStyleSheet() {
              const groups = [];
              readyDeclarations.forEach((decl, i) => {
                  let mediaGroup;
                  let selectorGroup;
                  const prev = i === 0 ? null : readyDeclarations[i - 1];
                  const isSameMedia = prev && prev.media === decl.media;
                  const isSameMediaAndSelector =
                      prev && isSameMedia && prev.selector === decl.selector;
                  if (isSameMedia) {
                      mediaGroup = groups[groups.length - 1];
                  } else {
                      mediaGroup = [];
                      groups.push(mediaGroup);
                  }
                  if (isSameMediaAndSelector) {
                      selectorGroup = mediaGroup[mediaGroup.length - 1];
                  } else {
                      selectorGroup = [];
                      mediaGroup.push(selectorGroup);
                  }
                  selectorGroup.push(decl);
              });
              if (!syncStyle) {
                  syncStyle = document.createElement("style");
                  syncStyle.classList.add("darkreader");
                  syncStyle.classList.add("darkreader--sync");
                  syncStyle.media = "screen";
              }
              syncStylePositionWatcher && syncStylePositionWatcher.stop();
              element.parentNode.insertBefore(
                  syncStyle,
                  corsCopy ? corsCopy.nextSibling : element.nextSibling
              );
              const sheet = syncStyle.sheet;
              for (let i = sheet.cssRules.length - 1; i >= 0; i--) {
                  sheet.deleteRule(i);
              }
              groups.forEach((mediaGroup) => {
                  const {media} = mediaGroup[0][0];
                  let target;
                  if (media) {
                      sheet.insertRule(
                          `@media ${media} {}`,
                          sheet.cssRules.length
                      );
                      target = sheet.cssRules[sheet.cssRules.length - 1];
                  } else {
                      target = sheet;
                  }
                  mediaGroup.forEach((selectorGroup) => {
                      const asyncItems = selectorGroup.filter(
                          ({value}) => value == null
                      );
                      if (asyncItems.length > 0) {
                          asyncItems.forEach(({asyncKey}) =>
                              asyncDeclarations.set(asyncKey, {
                                  declarations: selectorGroup,
                                  target,
                                  index: target.cssRules.length
                              })
                          );
                      }
                      setRule(target, target.cssRules.length, selectorGroup);
                  });
              });
              if (syncStylePositionWatcher) {
                  syncStylePositionWatcher.run();
              } else {
                  syncStylePositionWatcher = watchForNodePosition(
                      syncStyle,
                      buildStyleSheet
                  );
              }
          }
          function rebuildAsyncRule(key) {
              const {declarations, target, index} = asyncDeclarations.get(
                  key
              );
              target.deleteRule(index);
              setRule(target, index, declarations);
              asyncDeclarations.delete(key);
          }
          modRules
              .filter((r) => r)
              .forEach(({selector, declarations, media}) => {
                  declarations.forEach(
                      ({property, value, important, sourceValue}) => {
                          if (typeof value === "function") {
                              const modified = value(filter);
                              if (modified instanceof Promise) {
                                  const index = readyDeclarations.length;
                                  const asyncKey = asyncDeclarationCounter++;
                                  readyDeclarations.push({
                                      media,
                                      selector,
                                      property,
                                      value: null,
                                      important,
                                      asyncKey,
                                      sourceValue
                                  });
                                  const promise = modified;
                                  const currentRenderId = renderId;
                                  promise.then((asyncValue) => {
                                      if (
                                          !asyncValue ||
                                          cancelAsyncOperations ||
                                          currentRenderId !== renderId
                                      ) {
                                          return;
                                      }
                                      readyDeclarations[
                                          index
                                      ].value = asyncValue;
                                      asyncQueue.add(() => {
                                          if (
                                              cancelAsyncOperations ||
                                              currentRenderId !== renderId
                                          ) {
                                              return;
                                          }
                                          rebuildAsyncRule(asyncKey);
                                      });
                                  });
                              } else {
                                  readyDeclarations.push({
                                      media,
                                      selector,
                                      property,
                                      value: modified,
                                      important,
                                      sourceValue
                                  });
                              }
                          } else {
                              readyDeclarations.push({
                                  media,
                                  selector,
                                  property,
                                  value,
                                  important,
                                  sourceValue
                              });
                          }
                      }
                  );
              });
          buildStyleSheet();
      }
      let rulesCount = null;
      let rulesCheckFrameId = null;
      function safeGetSheetRules() {
          try {
              return element.sheet.cssRules;
          } catch (err) {
              return null;
          }
      }
      function subscribeToSheetChanges() {
          if (element.sheet && safeGetSheetRules()) {
              rulesCount = element.sheet.cssRules.length;
          }
          unsubscribeFromSheetChanges();
          const checkForUpdate = () => {
              if (
                  element.sheet &&
                  safeGetSheetRules() &&
                  element.sheet.cssRules.length !== rulesCount
              ) {
                  rulesCount = element.sheet.cssRules.length;
                  update();
              }
              rulesCheckFrameId = requestAnimationFrame(checkForUpdate);
          };
          checkForUpdate();
      }
      function unsubscribeFromSheetChanges() {
          cancelAnimationFrame(rulesCheckFrameId);
      }
      function pause() {
          observer.disconnect();
          corsCopyPositionWatcher && corsCopyPositionWatcher.stop();
          syncStylePositionWatcher && syncStylePositionWatcher.stop();
          cancelAsyncOperations = true;
          unsubscribeFromSheetChanges();
      }
      function destroy() {
          pause();
          removeNode(corsCopy);
          removeNode(syncStyle);
      }
      function watch() {
          observer.observe(element, observerOptions);
          if (element instanceof HTMLStyleElement) {
              subscribeToSheetChanges();
          }
      }
      return {
          details,
          render,
          pause,
          destroy,
          watch
      };
  }
  function linkLoading(link) {
      return new Promise((resolve, reject) => {
          const cleanUp = () => {
              link.removeEventListener("load", onLoad);
              link.removeEventListener("error", onError);
          };
          const onLoad = () => {
              cleanUp();
              resolve();
          };
          const onError = () => {
              cleanUp();
              reject(`Link loading failed ${link.href}`);
          };
          link.addEventListener("load", onLoad);
          link.addEventListener("error", onError);
      });
  }
  function getCSSImportURL(importDeclaration) {
      return getCSSURLValue(importDeclaration.substring(8).replace(/;$/, ""));
  }
  async function loadText(url) {
      if (url.startsWith("data:")) {
          return await (await fetch(url)).text();
      }
      return await bgFetch({url, responseType: "text", mimeType: "text/css"});
  }
  async function replaceCSSImports(cssText, basePath) {
      cssText = removeCSSComments(cssText);
      cssText = replaceCSSFontFace(cssText);
      cssText = replaceCSSRelativeURLsWithAbsolute(cssText, basePath);
      const importMatches = getMatches(cssImportRegex, cssText);
      for (const match of importMatches) {
          const importURL = getCSSImportURL(match);
          const absoluteURL = getAbsoluteURL(basePath, importURL);
          let importedCSS;
          try {
              importedCSS = await loadText(absoluteURL);
              importedCSS = await replaceCSSImports(
                  importedCSS,
                  getCSSBaseBath(absoluteURL)
              );
          } catch (err) {
              importedCSS = "";
          }
          cssText = cssText.split(match).join(importedCSS);
      }
      cssText = cssText.trim();
      return cssText;
  }
  function createCORSCopy(srcElement, cssText) {
      if (!cssText) {
          return null;
      }
      const cors = document.createElement("style");
      cors.classList.add("darkreader");
      cors.classList.add("darkreader--cors");
      cors.media = "screen";
      cors.textContent = cssText;
      srcElement.parentNode.insertBefore(cors, srcElement.nextSibling);
      cors.sheet.disabled = true;
      return cors;
  }

  let observer$2 = null;
  function getAllManageableStyles(nodes) {
      const results = [];
      Array.from(nodes).forEach((node) => {
          if (node instanceof Element) {
              if (shouldManageStyle(node)) {
                  results.push(node);
              }
              results.push(
                  ...Array.from(node.querySelectorAll(STYLE_SELECTOR)).filter(
                      shouldManageStyle
                  )
              );
          }
      });
      return results;
  }
  function iterateShadowNodes(nodes, iterator) {
      Array.from(nodes).forEach((node) => {
          if (node instanceof Element) {
              if (node.shadowRoot) {
                  iterator(node);
              }
              iterateShadowNodes(node.childNodes, iterator);
          }
      });
  }
  const shadowObservers = new Set();
  function watchForStyleChanges(update) {
      if (observer$2) {
          observer$2.disconnect();
          shadowObservers.forEach((o) => o.disconnect());
          shadowObservers.clear();
      }
      function handleMutations(mutations) {
          const createdStyles = mutations.reduce(
              (nodes, m) =>
                  nodes.concat(getAllManageableStyles(m.addedNodes)),
              []
          );
          const removedStyles = mutations.reduce(
              (nodes, m) =>
                  nodes.concat(getAllManageableStyles(m.removedNodes)),
              []
          );
          const updatedStyles = mutations
              .filter(
                  ({target, type}) =>
                      type === "attributes" && shouldManageStyle(target)
              )
              .reduce((styles, {target}) => {
                  styles.push(target);
                  return styles;
              }, []);
          if (
              createdStyles.length +
                  removedStyles.length +
                  updatedStyles.length >
              0
          ) {
              update({
                  created: createdStyles,
                  updated: updatedStyles,
                  removed: removedStyles
              });
          }
          const allAddedNodes = [];
          mutations.forEach((m) => {
              m.addedNodes.forEach((n) => {
                  allAddedNodes.push(n);
              });
          });
          iterateShadowNodes(allAddedNodes, subscribeForShadowRootChanges);
      }
      function subscribeForShadowRootChanges(node) {
          const shadowObserver = new MutationObserver(handleMutations);
          shadowObserver.observe(node.shadowRoot, mutationObserverOptions);
          shadowObservers.add(shadowObserver);
      }
      const mutationObserverOptions = {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: ["rel"]
      };
      observer$2 = new MutationObserver(handleMutations);
      observer$2.observe(document.documentElement, mutationObserverOptions);
      iterateShadowNodes(
          document.documentElement.children,
          subscribeForShadowRootChanges
      );
  }
  function stopWatchingForStyleChanges() {
      if (observer$2) {
          observer$2.disconnect();
          observer$2 = null;
          shadowObservers.forEach((o) => o.disconnect());
          shadowObservers.clear();
      }
  }

  const styleManagers = new Map();
  const variables = new Map();
  let filter = null;
  let fixes = null;
  let isIFrame = null;
  function createOrUpdateStyle$1(className) {
      let style = (document.head || document).querySelector(`.${className}`);
      if (!style) {
          style = document.createElement("style");
          style.classList.add("darkreader");
          style.classList.add(className);
          style.media = "screen";
      }
      return style;
  }
  const stylePositionWatchers = new Map();
  function setupStylePositionWatcher(node, alias) {
      stylePositionWatchers.has(alias) &&
          stylePositionWatchers.get(alias).stop();
      stylePositionWatchers.set(alias, watchForNodePosition(node));
  }
  function stopStylePositionWatchers() {
      Array.from(stylePositionWatchers.values()).forEach((watcher) =>
          watcher.stop()
      );
      stylePositionWatchers.clear();
  }
  function createStaticStyleOverrides() {
      const fallbackStyle = createOrUpdateStyle$1("darkreader--fallback");
      document.head.insertBefore(fallbackStyle, document.head.firstChild);
      fallbackStyle.textContent = getModifiedFallbackStyle(filter, {
          strict: true
      });
      setupStylePositionWatcher(fallbackStyle, "fallback");
      const userAgentStyle = createOrUpdateStyle$1("darkreader--user-agent");
      document.head.insertBefore(userAgentStyle, fallbackStyle.nextSibling);
      userAgentStyle.textContent = getModifiedUserAgentStyle(
          filter,
          isIFrame
      );
      setupStylePositionWatcher(userAgentStyle, "user-agent");
      const textStyle = createOrUpdateStyle$1("darkreader--text");
      document.head.insertBefore(textStyle, fallbackStyle.nextSibling);
      if (filter.useFont || filter.textStroke > 0) {
          textStyle.textContent = createTextStyle(filter);
      } else {
          textStyle.textContent = "";
      }
      setupStylePositionWatcher(textStyle, "text");
      const invertStyle = createOrUpdateStyle$1("darkreader--invert");
      document.head.insertBefore(invertStyle, textStyle.nextSibling);
      if (fixes && Array.isArray(fixes.invert) && fixes.invert.length > 0) {
          invertStyle.textContent = [
              `${fixes.invert.join(", ")} {`,
              `    filter: ${getCSSFilterValue({
                  ...filter,
                  contrast:
                      filter.mode === 0
                          ? filter.contrast
                          : clamp(filter.contrast - 10, 0, 100)
              })} !important;`,
              "}"
          ].join("\n");
      } else {
          invertStyle.textContent = "";
      }
      setupStylePositionWatcher(invertStyle, "invert");
      const inlineStyle = createOrUpdateStyle$1("darkreader--inline");
      document.head.insertBefore(inlineStyle, invertStyle.nextSibling);
      inlineStyle.textContent = getInlineOverrideStyle();
      setupStylePositionWatcher(inlineStyle, "inline");
      const overrideStyle = createOrUpdateStyle$1("darkreader--override");
      document.head.appendChild(overrideStyle);
      overrideStyle.textContent =
          fixes && fixes.css ? replaceCSSTemplates(fixes.css) : "";
      setupStylePositionWatcher(overrideStyle, "override");
  }
  function replaceCSSTemplates($cssText) {
      return $cssText.replace(/\${(.+?)}/g, (m0, $color) => {
          try {
              const color = parseColorWithCache($color);
              return modifyColor(color, filter);
          } catch (err) {
              return $color;
          }
      });
  }
  function cleanFallbackStyle() {
      const fallback = document.head.querySelector(".darkreader--fallback");
      if (fallback) {
          fallback.textContent = "";
      }
  }
  function createDynamicStyleOverrides() {
      cancelRendering();
      updateVariables(getElementCSSVariables(document.documentElement));
      const newManagers = Array.from(
          document.querySelectorAll(STYLE_SELECTOR)
      )
          .filter(
              (style) => !styleManagers.has(style) && shouldManageStyle(style)
          )
          .map((style) => createManager(style));
      const newVariables = newManagers
          .map((manager) => manager.details())
          .filter((details) => details && details.variables.size > 0)
          .map(({variables}) => variables);
      if (newVariables.length === 0) {
          styleManagers.forEach((manager) =>
              manager.render(filter, variables)
          );
          if (loadingStyles.size === 0) {
              cleanFallbackStyle();
          }
      } else {
          newVariables.forEach((variables) => updateVariables(variables));
          throttledRenderAllStyles(() => {
              if (loadingStyles.size === 0) {
                  cleanFallbackStyle();
              }
          });
      }
      newManagers.forEach((manager) => manager.watch());
      const inlineStyleElements = Array.from(
          document.querySelectorAll(INLINE_STYLE_SELECTOR)
      );
      inlineStyleElements.forEach((el) => overrideInlineStyle(el, filter));
  }
  let loadingStylesCounter = 0;
  const loadingStyles = new Set();
  function createManager(element) {
      if (styleManagers.has(element)) {
          return;
      }
      const loadingStyleId = ++loadingStylesCounter;
      function loadingStart() {
          if (!isPageLoaded() || !didDocumentShowUp) {
              loadingStyles.add(loadingStyleId);
              const fallbackStyle = document.querySelector(
                  ".darkreader--fallback"
              );
              if (!fallbackStyle.textContent) {
                  fallbackStyle.textContent = getModifiedFallbackStyle(
                      filter,
                      {strict: false}
                  );
              }
          }
      }
      function loadingEnd() {
          loadingStyles.delete(loadingStyleId);
          if (loadingStyles.size === 0 && isPageLoaded()) {
              cleanFallbackStyle();
          }
      }
      function update() {
          const details = manager.details();
          if (!details) {
              return;
          }
          if (details.variables.size === 0) {
              manager.render(filter, variables);
          } else {
              updateVariables(details.variables);
              throttledRenderAllStyles();
          }
      }
      const manager = manageStyle(element, {
          update,
          loadingStart,
          loadingEnd
      });
      styleManagers.set(element, manager);
      return manager;
  }
  function updateVariables(newVars) {
      if (newVars.size === 0) {
          return;
      }
      newVars.forEach((value, key) => variables.set(key, value));
      variables.forEach((value, key) =>
          variables.set(key, replaceCSSVariables(value, variables))
      );
  }
  function removeManager(element) {
      const manager = styleManagers.get(element);
      if (manager) {
          manager.destroy();
          styleManagers.delete(element);
      }
  }
  const throttledRenderAllStyles = throttle((callback) => {
      styleManagers.forEach((manager) => manager.render(filter, variables));
      callback && callback();
  });
  const cancelRendering = function() {
      throttledRenderAllStyles.cancel();
  };
  function isPageLoaded() {
      return (
          document.readyState === "complete" ||
          document.readyState === "interactive"
      );
  }
  function onReadyStateChange() {
      if (!isPageLoaded()) {
          return;
      }
      document.removeEventListener("readystatechange", onReadyStateChange);
      if (loadingStyles.size === 0) {
          cleanFallbackStyle();
      }
  }
  let documentVisibilityListener = null;
  let didDocumentShowUp = !document.hidden;
  function watchForDocumentVisibility(callback) {
      const alreadyWatching = Boolean(documentVisibilityListener);
      documentVisibilityListener = () => {
          if (!document.hidden) {
              stopWatchingForDocumentVisibility();
              callback();
              didDocumentShowUp = true;
          }
      };
      if (!alreadyWatching) {
          document.addEventListener(
              "visibilitychange",
              documentVisibilityListener
          );
      }
  }
  function stopWatchingForDocumentVisibility() {
      document.removeEventListener(
          "visibilitychange",
          documentVisibilityListener
      );
      documentVisibilityListener = null;
  }
  function createThemeAndWatchForUpdates() {
      createStaticStyleOverrides();
      function runDynamicStyle() {
          createDynamicStyleOverrides();
          watchForUpdates();
      }
      if (document.hidden) {
          watchForDocumentVisibility(runDynamicStyle);
      } else {
          runDynamicStyle();
      }
      changeMetaThemeColorWhenAvailable(filter);
  }
  function watchForUpdates() {
      watchForStyleChanges(({created, updated, removed}) => {
          const createdStyles = new Set(created);
          const movedStyles = new Set(
              removed.filter((style) => createdStyles.has(style))
          );
          removed
              .filter((style) => !movedStyles.has(style))
              .forEach((style) => removeManager(style));
          const newManagers = Array.from(new Set(created.concat(updated)))
              .filter((style) => !styleManagers.has(style))
              .map((style) => createManager(style));
          const newVariables = newManagers
              .map((manager) => manager.details())
              .filter((details) => details && details.variables.size > 0)
              .map(({variables}) => variables);
          if (newVariables.length === 0) {
              newManagers.forEach((manager) =>
                  manager.render(filter, variables)
              );
          } else {
              newVariables.forEach((variables) => updateVariables(variables));
              throttledRenderAllStyles();
          }
          newManagers.forEach((manager) => manager.watch());
      });
      watchForInlineStyles((element) => {
          overrideInlineStyle(element, filter);
          if (element === document.documentElement) {
              const rootVariables = getElementCSSVariables(
                  document.documentElement
              );
              if (rootVariables.size > 0) {
                  updateVariables(rootVariables);
                  throttledRenderAllStyles();
              }
          }
      });
      document.addEventListener("readystatechange", onReadyStateChange);
  }
  function stopWatchingForUpdates() {
      styleManagers.forEach((manager) => manager.pause());
      stopStylePositionWatchers();
      stopWatchingForStyleChanges();
      stopWatchingForInlineStyles();
      document.removeEventListener("readystatechange", onReadyStateChange);
  }
  function createOrUpdateDynamicTheme(
      filterConfig,
      dynamicThemeFixes,
      iframe
  ) {
      filter = filterConfig;
      fixes = dynamicThemeFixes;
      isIFrame = iframe;
      if (document.head) {
          createThemeAndWatchForUpdates();
      } else {
          if (!isFirefox()) {
              const fallbackStyle = createOrUpdateStyle$1(
                  "darkreader--fallback"
              );
              document.documentElement.appendChild(fallbackStyle);
              fallbackStyle.textContent = getModifiedFallbackStyle(filter, {
                  strict: true
              });
          }
          const headObserver = new MutationObserver(() => {
              if (document.head) {
                  headObserver.disconnect();
                  createThemeAndWatchForUpdates();
              }
          });
          headObserver.observe(document, {childList: true, subtree: true});
      }
  }
  function removeDynamicTheme() {
      cleanDynamicThemeCache();
      removeNode(document.querySelector(".darkreader--fallback"));
      if (document.head) {
          restoreMetaThemeColor();
          removeNode(document.head.querySelector(".darkreader--user-agent"));
          removeNode(document.head.querySelector(".darkreader--text"));
          removeNode(document.head.querySelector(".darkreader--invert"));
          removeNode(document.head.querySelector(".darkreader--inline"));
          removeNode(document.head.querySelector(".darkreader--override"));
      }
      Array.from(styleManagers.keys()).forEach((el) => removeManager(el));
      Array.from(document.querySelectorAll(".darkreader")).forEach(
          removeNode
      );
  }
  function cleanDynamicThemeCache() {
      stopWatchingForDocumentVisibility();
      cancelRendering();
      stopWatchingForUpdates();
      cleanModificationCache();
  }

  function watchForColorSchemeChange(callback) {
      const query = window.matchMedia("(prefers-color-scheme: dark)");
      const onChange = () => callback({isDark: query.matches});
      query.addListener(onChange);
      return {
          disconnect() {
              query.removeListener(onChange);
          }
      };
  }

  function onMessage({type, data}) {
      switch (type) {
          case "add-css-filter":
          case "add-static-theme": {
              const css = data;
              removeDynamicTheme();
              createOrUpdateStyle(css);
              break;
          }
          case "add-svg-filter": {
              const {css, svgMatrix, svgReverseMatrix} = data;
              removeDynamicTheme();
              createOrUpdateSVGFilter(svgMatrix, svgReverseMatrix);
              createOrUpdateStyle(css);
              break;
          }
          case "add-dynamic-theme": {
              const {filter, fixes, isIFrame} = data;
              removeStyle();
              createOrUpdateDynamicTheme(filter, fixes, isIFrame);
              break;
          }
          case "clean-up": {
              removeStyle();
              removeSVGFilter();
              removeDynamicTheme();
              break;
          }
      }
  }
  const colorSchemeWatcher = watchForColorSchemeChange(({isDark}) => {

  });
  const fallbackClassName = 'darkreader--safari-fallback';
  function createFallbackStyle(theme) {
      const target = document.documentElement;
      let style = target.querySelector(`.${fallbackClassName}`);
      if (!style) {
          style = document.createElement('style');
          style.classList.add('darkreader');
          style.classList.add(fallbackClassName);
          style.media = 'screen';
      }
      style.textContent = getModifiedFallbackStyle(theme);
      target.appendChild(style);
      return style;
  }

  let iframeAddedToFixes = false;
  function apply(isEnabled, topURL, isIFrame, theme) {
      if (isEnabled) {
          if (theme.engine === 'cssFilter') {
              removeDynamicTheme();
              if (!isIFrame) {
                  if (!iframeAddedToFixes) {
                      inversionFixes.forEach((fix) => {
                          if (!fix.invert) {
                              fix.invert = [];
                          }
                          fix.invert.unshift('iframe');
                      });
                      iframeAddedToFixes = true;
                  }
                  const cssText = createCSSFilterStyleheet(theme, location.href, isIFrame ? location.href : null, inversionFixes).replace(/\n\/\* Page background \*\/\s*html \{[\s\S]+?\}/m, ''); // <html> background is inverted in Safari
                  createOrUpdateStyle$1(cssText);
              }
          }
          else if (theme.engine === 'dynamicTheme') {
              removeStyle();
              let fixes = getDynamicThemeFixesFor(topURL, isIFrame ? null : location.href, dynamicFixes) || {};
              fixes = {
                  ...(fixes),
                  invert: (fixes.invert || []).concat('embed[type="application/pdf"]'),
              };
              createOrUpdateDynamicTheme(theme, fixes, isIFrame);
          }
      }
      else {
          if (theme.engine === 'cssFilter') {
              removeStyle();
          }
          else if (theme.engine === 'dynamicTheme') {
              removeDynamicTheme();
          }
      }
  }

  let topURL;
  try {
      topURL = window.top.location.href;
  }
  catch (err) {
      return;
  }
  isIFrame = window.top !== window;
  const defaultTheme = {
      mode: 1,
      brightness: 87,
      contrast: 120,
      sepia: 0,
      grayscale: 0,
      useFont: false,
      fontFamily: '',
      textStroke: 0,
      engine: 'dynamicTheme',
  };
  apply(true, topURL, isIFrame, defaultTheme);
})();
