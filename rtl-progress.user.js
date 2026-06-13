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
    '.ytp-progress-bar-container',
    '.ytp-fine-scrubbing-container',
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
  /* YouTube RTL - using proven CSS from Stylus */
  * {
    direction: rtl !important;
    text-align: right !important;
  }
  
  .ytp-progress-linear-live-buffer, .ytp-ad-progress, .ytp-load-progress, .ytp-play-progress, .ytp-hover-progress, .ytp-1m-progress, .ytp-15m-progress, .ytp-30m-progress, .ytp-60m-progress, .ytp-timed-markers-container, .ytp-clip-start-exclude, .ytp-clip-end-exclude {
    right: 0 !important;
    transform-origin: right !important;
  }

  .ytp-progress-bar {
    right: 0 !important;
  }

  .ytp-chapters-container, .ytp-chapter-hover-container {
    z-index: 32 !important;
    position: relative !important;
    right: 0 !important;
    height: 100% !important;
  }

  .ytp-clip-start, .ytp-clip-end {
    display: none !important;
    position: relative !important;
    width: 14px !important;
    height: 14px !important;
    bottom: -4.5px !important;
    margin-right: -7px !important;
  }

  .ytp-chapter-hover-container {
    float: right !important;
  }
  
  /* RTL positioning for overlays, tooltips, and panels */
  .ytp-tooltip, .ytp-thumbnail, .ytp-thumbnail-overlay, .ytp-settings-menu, .ytp-panel, .ytp-contextual-info-renderer {
    left: auto !important;
    right: auto !important;
  }
  
  /* Ensure draggable scrubber thumbnail stays centered on cursor */
  .ytp-scrubber-thumb, .ytp-tooltip, .ytp-hover-thumbnail, .ytp-filmstrip-overlay {
    transform: translateX(-50%) !important;
  }
  
  /* Settings and menus should be positioned from right in RTL */
  .ytp-settings-menu {
    right: 0 !important;
    left: auto !important;
  }
  
  .ytp-panel {
    right: 0 !important;
    left: auto !important;
  }
  
  /* Generic fallbacks for other players */
  .rtl-progress-visual { direction: rtl !important; }
  .rtl-progress-visual .progress, .rtl-progress-visual .progress-bar, .rtl-progress-visual .seek-bar, .rtl-progress-visual .vjs-progress-holder { direction: rtl !important; }
  `;
  document.head && document.head.appendChild(style);

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
      
      // Check if element has RTL direction set
      const isRTL = window.getComputedStyle(el).direction === 'rtl';
      const seekPos = isRTL ? (1 - rel) : rel;
      
      try{ video.currentTime = seekPos * video.duration; }catch(e){}
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
        const isRTL = window.getComputedStyle(el).direction === 'rtl';
        const rel = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
        const position = isRTL ? (1 - rel) : rel;
        const overlayX = rect.left + position * rect.width;
        const selectors = '.ytp-tooltip, .ytp-thumbnail-overlay, .ytp-thumbnail, .ytp-chapter-hover-container, .ytp-tooltip-duration, .ytp-preview';
        document.querySelectorAll(selectors).forEach(o=>{
          try{
            const parent = o.offsetParent || document.documentElement;
            const parentRect = parent.getBoundingClientRect();
            const left = overlayX - parentRect.left;
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
      const isRTL = window.getComputedStyle(el).direction === 'rtl';
      
      el.addEventListener('input', (ev)=>{
        const video = findAssociatedVideo(el);
        if (!video || isNaN(video.duration)) return;
        const min = parseFloat(el.min||0);
        const max = parseFloat(el.max||1);
        const val = parseFloat(el.value);
        const norm = (val - min) / (max - min || 1);
        const seekPos = isRTL ? (1 - norm) : norm;
        try{ video.currentTime = seekPos * video.duration; }catch(e){}
      });
      
      // Sync video currentTime changes back to range input (for external seeks)
      const video = findAssociatedVideo(el);
      if (video){
        video.addEventListener('timeupdate', ()=>{
          const min = parseFloat(el.min||0);
          const max = parseFloat(el.max||1);
          const norm = video.currentTime / video.duration;
          const inputVal = isRTL ? (1 - norm) : norm;
          el.value = min + inputVal * (max - min);
        });
      }
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

  // Monitor and fix YouTube UI elements positioned for LTR
  function fixPositioningForRTL(){
    try{
      // Fix scrubber thumb positioning
      const scrubberThumb = document.querySelector('.ytp-scrubber-thumb');
      if (scrubberThumb && scrubberThumb.style.left){
        const leftVal = parseFloat(scrubberThumb.style.left);
        const progressBar = document.querySelector('.ytp-progress-bar');
        if (progressBar){
          const barWidth = progressBar.offsetWidth;
          const thumbWidth = scrubberThumb.offsetWidth;
          scrubberThumb.style.left = 'auto';
          scrubberThumb.style.right = (barWidth - leftVal - thumbWidth) + 'px';
        }
      }
      
      // Fix tooltip positioning
      const tooltip = document.querySelector('.ytp-tooltip');
      if (tooltip && tooltip.style.left){
        const leftVal = parseFloat(tooltip.style.left);
        const parent = tooltip.offsetParent || document.documentElement;
        const parentWidth = parent.offsetWidth;
        tooltip.style.left = 'auto';
        tooltip.style.right = (parentWidth - leftVal) + 'px';
      }
      
      // Fix thumbnail overlay positioning
      const thumbnailOverlay = document.querySelector('.ytp-thumbnail-overlay');
      if (thumbnailOverlay && thumbnailOverlay.style.left){
        const leftVal = parseFloat(thumbnailOverlay.style.left);
        const parent = thumbnailOverlay.offsetParent || document.documentElement;
        const parentWidth = parent.offsetWidth;
        thumbnailOverlay.style.left = 'auto';
        thumbnailOverlay.style.right = (parentWidth - leftVal) + 'px';
      }
      
      // Fix settings menu positioning (should open from left in RTL)
      const settingsMenu = document.querySelector('.ytp-settings-menu');
      if (settingsMenu){
        settingsMenu.style.left = 'auto';
        settingsMenu.style.right = '0';
      }
    }catch(e){}
  }
  
  // Handle progress bar hover positioning for RTL
  const progressBar = document.querySelector('.ytp-progress-bar');
  if (progressBar){
    progressBar.addEventListener('mousemove', (e)=>{
      try{
        const rect = progressBar.getBoundingClientRect();
        const relPos = (e.clientX - rect.left) / rect.width;
        const rtlPos = 1 - relPos;
        const positionPx = rtlPos * rect.width;
        
        // Position tooltip
        const tooltip = document.querySelector('.ytp-tooltip');
        if (tooltip){
          tooltip.style.left = 'auto';
          tooltip.style.right = positionPx + 'px';
        }
        
        // Position thumbnail overlay
        const thumbnailOverlay = document.querySelector('.ytp-thumbnail-overlay');
        if (thumbnailOverlay){
          thumbnailOverlay.style.left = 'auto';
          thumbnailOverlay.style.right = positionPx + 'px';
        }
      }catch(e){}
    }, {passive:true});
  }
  
  // Also watch for inline style changes that YouTube makes
  const styleObserver = new MutationObserver(()=>{
    fixPositioningForRTL();
  });
  
  // Keep observing new elements as they appear
  const elementsToWatch = [
    '.ytp-scrubber-thumb',
    '.ytp-tooltip',
    '.ytp-thumbnail-overlay',
    '.ytp-settings-menu',
    '.ytp-panel'
  ];
  
  function attachStyleObservers(){
    elementsToWatch.forEach(selector => {
      try{
        const el = document.querySelector(selector);
        if (el && !el.dataset.rtlStyleObserved){
          el.dataset.rtlStyleObserved = '1';
          styleObserver.observe(el, {
            attributes: true,
            attributeFilter: ['style'],
            subtree: false
          });
        }
      }catch(e){}
    });
  }
  
  // Initial attachment
  attachStyleObservers();

  const mo = new MutationObserver((mutations)=>{
    for(const m of mutations){
      if (!m.addedNodes) continue;
      m.addedNodes.forEach(node=>{
        if (node.nodeType !== 1) return;
        scan(node);
        fixPositioningForRTL();
      });
    }
  });

  mo.observe(document.documentElement || document.body, { childList:true, subtree:true });
  
  // Setup intervals for monitoring
  const positionMonitor = setInterval(fixPositioningForRTL, 16);
  const styleWatcher = setInterval(attachStyleObservers, 500);
  
  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    clearInterval(positionMonitor);
    clearInterval(styleWatcher);
    styleObserver.disconnect();
    mo.disconnect();
  });

})();
