// ==UserScript==
// @name         Remove YouTube Shorts
// @namespace    qutebrowser-userscripts
// @version      1.0
// @description  Hide Shorts in YouTube recommendations and redirect /shorts/ URLs to watch pages
// @match        https://www.youtube.com/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    // Remove or hide nodes that point to /shorts/ or appear to be Shorts shelves/items
    function hideShorts(root = document) {
        try {
            // anchors linking to /shorts/
            root.querySelectorAll('a[href*="/shorts/"]')?.forEach(a => {
                const container = a.closest('ytd-rich-item-renderer, ytd-grid-video-renderer, ytd-compact-video-renderer, ytd-video-renderer, ytd-rich-shelf-renderer, ytd-reel-shelf-renderer') || a;
                if (container && container.style) container.style.display = 'none';
            });

            // known shelf elements for Shorts
            root.querySelectorAll('ytd-reel-shelf-renderer, ytd-rich-shelf-renderer').forEach(el => el.style.display = 'none');
        } catch (e) {
            // swallow DOM errors silently
        }
    }

    // Observe page mutations to hide newly-added Shorts content
    const observer = new MutationObserver(mutations => {
        for (const m of mutations) {
            for (const node of m.addedNodes) {
                if (node.nodeType === 1) hideShorts(node);
            }
        }
    });

    hideShorts(document);
    observer.observe(document.documentElement || document, { childList: true, subtree: true });

    // Redirect direct /shorts/ URLs to the equivalent watch?v= link
    try {
        if (location.pathname.startsWith('/shorts/')) {
            const parts = location.pathname.split('/shorts/');
            const id = (parts[1] || '').split(/[/?#]/)[0];
            if (id) {
                const params = new URLSearchParams(location.search);
                const t = params.get('t') || params.get('time_continue') || '';
                const timePart = t ? `&t=${encodeURIComponent(t)}` : '';
                location.replace(`https://www.youtube.com/watch?v=${encodeURIComponent(id)}${timePart}`);
            }
        }
    } catch (e) {}

})();
