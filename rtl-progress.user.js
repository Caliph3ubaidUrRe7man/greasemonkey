// ==UserScript==
// @name        RTL Video Progress Bar
// @version     1.0
// @description Visually flip video progress bars to right-to-left and map clicks/drags to mirrored seek positions (YouTube, Vimeo, Twitch, etc.).
// @match       *://*.youtube.com/*
// @match       *://*.vimeo.com/*
// @match       *://*.dailymotion.com/*
// @match       *://*.twitch.tv/*
// @match       *://*/*
// @grant       none
// @run-at      document-idle
// ==/UserScript==

(function(){
  'use strict';

  const SELECTORS = [
    'input[type="range"]',
    'progress',
    '.ytp-progress-bar',
    '.ytp-progress-holder',
    '.ytp-seek-bar',
    '.vjs-progress-holder',
    '.vjs-progress-control',
    '.progress',
    '.progress-bar',
    '.seek-bar'
  ];

  const style = document.createElement('style');
  style.textContent = `
  .rtl-progress-visual { transform: scaleX(-1) !important; }
  .rtl-progress-visual > * { transform: scaleX(-1) !important; }
  `;
  document.head && document.head.appendChild(style);

  // Additional CSS specifically for YouTube and other players to align UI elements
  const extraCss = `
  @-moz-document domain("youtube.com") {
    * { direction: rtl !important; text-align: right !important; }
    .ytp-progress-linear-live-buffer, .ytp-ad-progress, .ytp-load-progress, .ytp-play-progress, .ytp-hover-progress, .ytp-1m-progress, .ytp-15m-progress, .ytp-30m-progress, .ytp-60m-progress, .ytp-timed-markers-container, .ytp-clip-start-exclude, .ytp-clip-end-exclude { right: 0; transform-origin: right; }
    .ytp-progress-bar { right: 0 !important; }
    .ytp-chapters-container, .ytp-chapter-hover-container { z-index: 32; position: relative; right: 0 !important; height: 100%; }
    .ytp-clip-start, .ytp-clip-end { display: none; position: relative; width: 14px; height: 14px; bottom: -4.5px; margin-right: -7px !important; }
    .ytp-chapter-hover-container { float: right; }
    /* Ensure tooltip/thumbnail overlays are positioned by JS, not by YouTube's LTR logic */
    .ytp-tooltip, .ytp-thumbnail-overlay, .ytp-chapter-hover-container, .ytp-tooltip-duration { left: auto !important; right: auto !important; transform: translateX(-50%) !important; }
  }

  /* Generic fallbacks for other players */
  .rtl-progress-visual .progress, .rtl-progress-visual .progress-bar, .rtl-progress-visual .seek-bar, .rtl-progress-visual .vjs-progress-holder { direction: rtl !important; }
  `;
  const extraStyle = document.createElement('style');
  extraStyle.textContent = extraCss;
  document.head && document.head.appendChild(extraStyle);

  function findAssociatedVideo(el){
    for(let node = el; node; node = node.parentElement){
      try{
        const v = node.querySelector && node.querySelector('video');
        if (v) return v;
      }catch(e){}
    }
    return document.querySelector('video');
  }

  function attachTo(el){
    if (!el || el.dataset.rtlProgressAttached) return;
    el.dataset.rtlProgressAttached = '1';
    el.classList.add('rtl-progress-visual');

    let activePointer = null;

    function seekAtEvent(e){
      const video = findAssociatedVideo(el);
      if (!video || isNaN(video.duration) || !isFinite(video.duration) || video.duration === 0) return;
      const rect = el.getBoundingClientRect();
      const clientX = e.clientX !== undefined ? e.clientX : (e.touches && e.touches[0] && e.touches[0].clientX);
      if (clientX == null) return;
      let rel = (clientX - rect.left) / rect.width;
      rel = Math.max(0, Math.min(1, rel));
      const mirrored = 1 - rel;
      try{ video.currentTime = mirrored * video.duration; }catch(e){}
    }

    el.addEventListener('pointerdown', (ev)=>{
      activePointer = ev.pointerId;
      ev.preventDefault();
      ev.stopPropagation();
      try{ el.setPointerCapture && el.setPointerCapture(activePointer); }catch(e){}
      seekAtEvent(ev);
    }, {passive:false});

    window.addEventListener('pointermove', (ev)=>{
      if (activePointer === null) return;
      if (ev.pointerId !== activePointer) return;
      ev.preventDefault();
      ev.stopPropagation();
      seekAtEvent(ev);
    }, true);

    window.addEventListener('pointerup', (ev)=>{
      if (activePointer === null) return;
      if (ev.pointerId !== activePointer) return;
      activePointer = null;
      try{ el.releasePointerCapture && el.releasePointerCapture(ev.pointerId); }catch(e){}
    }, true);

    el.addEventListener('click', (ev)=>{ ev.preventDefault(); ev.stopPropagation(); seekAtEvent(ev); }, {passive:false});

    // Reposition hover tooltips / thumbnails for YouTube so previews and timestamps follow mirrored cursor
    function repositionOverlays(clientX){
      try{
        const rect = el.getBoundingClientRect();
        if (rect.width === 0) return;
        const rel = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
        const mirroredClientX = rect.left + (1 - rel) * rect.width;
        const selectors = '.ytp-tooltip, .ytp-thumbnail-overlay, .ytp-thumbnail, .ytp-chapter-hover-container, .ytp-tooltip-duration, .ytp-preview';
        document.querySelectorAll(selectors).forEach(o=>{
          try{
            const parent = o.offsetParent || document.documentElement;
            const parentRect = parent.getBoundingClientRect();
            const left = mirroredClientX - parentRect.left;
            o.style.left = left + 'px';
            o.style.right = 'auto';
            o.style.transform = 'translateX(-50%)';
          }catch(e){}
        });
      }catch(e){}
    }

    el.addEventListener('mousemove', (ev)=>{ if (ev.clientX != null) repositionOverlays(ev.clientX); }, {passive:true});
    el.addEventListener('touchmove', (ev)=>{ const t = ev.touches && ev.touches[0]; if (t) repositionOverlays(t.clientX); }, {passive:true});

    if (el.tagName && el.tagName.toLowerCase() === 'input' && el.type === 'range'){
      el.addEventListener('input', (ev)=>{
        const video = findAssociatedVideo(el);
        if (!video || isNaN(video.duration)) return;
        const min = parseFloat(el.min||0);
        const max = parseFloat(el.max||1);
        const val = parseFloat(el.value);
        const norm = (val - min) / (max - min || 1);
        const mirrored = 1 - norm;
        try{ video.currentTime = mirrored * video.duration; }catch(e){}
      });
    }
  }

  function scan(root=document){
    SELECTORS.forEach(sel=>{
      try{
        Array.from(root.querySelectorAll(sel)).forEach(attachTo);
      }catch(e){}
    });
  }

  scan();

  const mo = new MutationObserver((mutations)=>{
    for(const m of mutations){
      if (!m.addedNodes) continue;
      m.addedNodes.forEach(node=>{
        if (node.nodeType !== 1) return;
        scan(node);
      });
    }
  });

  mo.observe(document.documentElement || document.body, { childList:true, subtree:true });

})();
