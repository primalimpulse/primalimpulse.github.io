# Primal Impulse website

## Project
Primal Impulse is a Barcelona duo playing rawstyle, uptempo, hardstyle and hardcore (always name all four styles, in that order): Joan Gracia (the pineapple) and Dario Marinello (the banana). Tone: absurd, comedic rave parody. They take the music seriously, not themselves. The site is a hub for music, free downloads, DJ sets, events, bookings and social links. English only.

Read `index.html`, `css/style.css` and `README.md` before changing anything. The repo is the source of truth.

## Hard rules
- Stack: plain HTML, CSS, vanilla JS. No framework, build step, npm or backend. Must work on GitHub Pages and via `python3 -m http.server`.
- Colours: only #000000, #ffffff, #ff6e00, #01b308, #ffe135. Tints via alpha only. Tokens are at the top of `css/style.css`.
- Fonts: Bowlby One (titles), Barlow Semi Condensed 500/700 (everything else), self-hosted in `assets/fonts/`. No other fonts, no font CDNs.
- No third-party requests on page load, with one agreed exception: the GoatCounter script (`gc.zgo.at/count.js`, site `primal-impulse.goatcounter.com`, cookieless) at the end of every page. YouTube/Spotify/SoundCloud embeds are click-to-load. No cookie banner should ever be needed.
- No platform brand logos (Spotify, Instagram, etc.). Text links only.
- `assets/mascot.svg` is the official mascot. Do not redraw or recolour it without asking.
- Only list tracks and events the band has supplied. Never invent tracks, credits, dates, venues or links. Ask when something is missing.
- Never use the em dash character (U+2014) in code, copy, comments or commit messages.
- Accessibility floor: visible keyboard focus, real alt text, `prefers-reduced-motion` respected, works at 375px wide.
- Motion: one entrance on load, plus the mascot headbang on hover (`--beat: 0.4s`, 150 BPM). No scroll-reveal animations.
- Design principle: a clean dark stage where the fruit misbehaves. The hero is the one chaos moment; other sections stay quiet and disciplined. No uppercase eyebrow labels, no monospace data labels, no arrows on buttons.
- Commits: Conventional Commits. Do not push without asking.
- Verify every change at 375px, 820px and 1440px wide before calling it done.
- Be direct: if a request is a bad idea, say so and why.

## Data design
One file, `js/data.js`, loaded as a classic script (not a module, so it works from `file://` and allows comments):

```js
window.PI = {
  tracks: [
    { title: "", type: "original",            // or "remix"
      of: "",                                 // remixes only: "Artist - Song"
      cover: "assets/covers/x.webp",
      spotify: "", soundcloud: "", download: "" },
  ],
  set: { title: "", youtube: "VIDEO_ID", poster: "assets/sets/x.webp" },   // the one featured set
  events: [
    { date: "2026-12-04", name: null },       // null name renders as a secret/classified row
    { date: "", name: "", venue: "", map: "" }, // venue and map link are optional
  ],
};
```

- Track card: square cover, title, Original or "Remix of X" tag, a button for each listen link that exists, Download button hidden while `download` is empty.
- Covers: WebP, about 600px square, lazy-loaded, in `assets/covers/`.
- Set: one featured YouTube video. Poster is a self-hosted 16:9 WebP in `assets/sets/`; the youtube-nocookie iframe is only created when play is pressed.
- Events: ISO dates. "Today" is computed in Europe/Madrid. An event stays upcoming through its whole day, then moves to "Past shows" automatically. Upcoming sorted ascending, past descending. Empty upcoming list shows a prompt to book us. No ticket links.
- Downloads are GitHub Release assets in `Sklyvan/primal-impulse-downloads` (release tag `tracks`, files named `Primal-Impulse-Title-Mix.flac`). The site only stores URLs. To add one: `gh release upload tracks FILE --repo Sklyvan/primal-impulse-downloads`, then set `download` in `js/data.js`.
- A `<noscript>` fallback points to the social links.

## Steps (one at a time, stop for approval after each)
1. Done: sticky nav, poster-style hero, footer.
2. Done: Music section plus `js/data.js` and `js/main.js`
3. Done: Sets (latest YouTube session, click-to-load) and Events
4. Done: About and Contact (booking email: primalimpulse@gmail.com)
5. Done: `press.html` (bio, photos and logos from `assets/press/`; tech rider and longer bios still to come)
6. Done locally: GoatCounter, Open Graph tags and `assets/og.jpg`, `404.html`, Lighthouse pass. Pages already serves `main` at https://sklyvan.github.io/primal-impulse/, so pushing is the deploy. No custom domain yet: when there is one, add `CNAME`, change the `<base>` in `404.html` to `/`, and update the canonical and `og:` URLs in `index.html` and `press.html`.

## Still missing (ask, do not guess)
- Original "Artist - Song" for each remix (cards show a plain "Remix" tag until then)
- Download files for APTerror, Imperial March and Bad Guy; press kit content (longer bios, tech rider); domain name
