# Greasemonkey Userscripts Collection

Professional, concise overview of the userscripts and helper files in this folder.

## Project Overview

This folder contains a small collection of Greasemonkey/Tampermonkey userscripts, configuration values, and helper/require files intended to improve media playback and site appearance across sites such as YouTube, Vimeo, Twitch, and general websites. The scripts include RTL progress bar support, a DarkReader variant, YouTube-specific helpers, and small fixes for site behavior.

## Files and Purpose

- `rtl-progress.user.js` — Visually flips progress bars (scaleX mirrored), maps clicks and drag actions to mirrored seek positions, and includes additional YouTube-specific CSS/JS to reposition hover thumbnails and timestamps so the timeline appears right-to-left. Works with a variety of progress controls (`input[type="range"]`, `.ytp-progress-bar`, `.vjs-progress-holder`, etc.) and uses a MutationObserver to attach to dynamic content.

- `darkreader.user.js` — A packaged DarkReader build (original project copyright retained). This copy includes an appended lightweight enforcement snippet that:
  - forces `prefers-color-scheme: dark` by overriding `window.matchMedia`,
  - sets common localStorage/sessionStorage keys and a cookie many sites check to enable their built-in dark themes,
  - injects a conservative fallback dark CSS and sets `meta[name="color-scheme"] = dark`.
  Use this for a best-effort dark mode when sites do not provide native dark themes.

- `helper.user.js` — Utility helper (small shared functions used by other scripts). Place common reusable code here so scripts can remain concise.

- `remove-youtube-shorts.user.js` — Removes or redirects YouTube Shorts UI/URLs to standard watch pages.

- `Return Youtube Dislike.user.js` — Restores dislike counts on YouTube using available public APIs or heuristics.

- `values.ini` — Configuration values used by one or more scripts. Edit carefully; some values are read at `document-start` so changes may require reloading pages or restarting the extension.

- `requires/` — Dependency snippets and compatibility items consumed by the userscripts. Example:
  - `gh_2215_make_GM_xhr_more_parallel_again.js` — compatibility/XHR helper.
  - `requires.ini` — metadata for required snippets.

## Installation

1. Install a userscript manager (GreaseMonkey, Tampermonkey, Violentmonkey) in your browser.
2. Copy each `.user.js` file's contents into the userscript manager as a new script, or import the files directly if the manager supports file import.
3. Ensure each script's `@match` rules match the sites you intend to affect (these scripts include broad patterns like `*://*/*` or site-specific `youtube.com` entries).
4. Give the scripts permission to run at document-start/document-idle as provided in the header blocks for best effect.

## Configuration and Tuning

- `values.ini` contains tunable parameters. Back up the original before editing.
- The RTL progress script injects CSS and JS to reposition YouTube hover previews; YouTube's markup can change over time — if thumbnails or timestamps are misplaced, update selectors inside `rtl-progress.user.js`.
- The DarkReader file includes a large engine; the appended enforcement snippet is intentionally conservative. If it breaks a specific site, remove or tune the appended block near the end of `darkreader.user.js`.

## Troubleshooting

- If a site appears broken or layout-shifted, disable the relevant userscript and reload the page to isolate the cause.
- For YouTube timeline hover thumbnails/timestamps remaining LTR: open the browser devtools, inspect the elements appearing on hover, note their class names, and add those selectors to `rtl-progress.user.js`'s overlay-reposition list.
- If dark mode is not applied to a particular site, it likely uses a nonstandard key or early JS check; inspect `localStorage` and cookies for site-specific flags and add them to the `darkreader.user.js` appended enforcement list.

## Security & Third-Party Licenses

- `darkreader.user.js` contains an upstream DarkReader distribution and retains the original MIT license header in-file. Respect that license when redistributing.
- Other files may include third-party snippets kept in `requires/`. Check headers inside those files for their licenses before redistributing.

## Contributing

- To propose improvements: edit or add site-specific fixes inside `dynamicFixes` / `inversionFixes` blocks in `darkreader.user.js`, or add selectors to `rtl-progress.user.js`.
- Create a pull request with a short description of the change and the site used for verification.

## Contact / Feedback

Open an issue in this repository with: site URL, browser and userscript manager, and a short description of what fails (include screenshots/devtools console logs if available).

---
_This README was generated to summarize the scripts and explain installation, configuration and troubleshooting steps._
