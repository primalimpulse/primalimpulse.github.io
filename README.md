# Primal Impulse website

Static site: plain HTML, CSS and vanilla JS, no build step, no dependencies.

## Preview locally

    python3 -m http.server 8000

Then open http://localhost:8000

## Layout

    index.html            the page
    press.html            press kit: bio, photos, logos
    404.html              not-found page (GitHub Pages serves it automatically)
    css/style.css         all styles; colour and font tokens are at the top
    js/data.js            tracks, featured set and events; edit this to update the site
    js/main.js            renders js/data.js into the page
    assets/covers/        track covers (square WebP, about 600px)
    assets/press/         press kit originals plus small -preview.webp copies
    assets/sets/          poster for the featured set (16:9 WebP)
    assets/mascot.svg     the mascot, vectorised and coloured from Icon_Transparent.png
    assets/discoball.svg  the cracked disco ball
    assets/og.jpg         1200x630 image shown when the site is shared
    assets/fonts/         self-hosted fonts (SIL Open Font License, texts included)

## Deploy

GitHub Pages serves the `main` branch at https://primalimpulse.github.io/.
Pushing to `main` publishes the site.

## Rules

- Colours: only #000000, #ffffff, #ff6e00, #01b308, #ffe135. Tints use alpha.
- Fonts: Bowlby One for titles, Barlow Semi Condensed for everything else.
