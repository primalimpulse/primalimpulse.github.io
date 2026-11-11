# Primal Impulse website

Static site: plain HTML and CSS, no build step, no dependencies.

## Preview locally

    python3 -m http.server 8000

Then open http://localhost:8000

## Layout

    index.html            the page
    css/style.css         all styles; colour and font tokens are at the top
    assets/mascot.svg     the mascot, vectorised and coloured from Icon_Transparent.png
    assets/discoball.svg  the cracked disco ball
    assets/fonts/         self-hosted fonts (SIL Open Font License, texts included)

## Rules

- Colours: only #000000, #ffffff, #ff6e00, #01b308, #ffe135. Tints use alpha.
- Fonts: Bowlby One for titles, Barlow Semi Condensed for everything else.
