/* Primal Impulse site content.
   Edit this file to add tracks or events. Nothing else needs to change.

   Tracks
     title       shown on the card
     type        "original" or "remix"
     of          remixes only: "Artist - Song". Leave "" to show a plain "Remix" tag
     cover       square WebP, about 600px, in assets/covers/
     spotify     link, or "" to hide the button
     soundcloud  link, or "" to hide the button
     download    link to the free download, or "" to hide the button

   Set (the one featured DJ set)
     title       shown under the player
     youtube     the video ID: the part after youtu.be/ or after watch?v=
     poster      16:9 WebP in assets/sets/, shown until the visitor presses play

   Events
     date       "YYYY-MM-DD"
     name        event name, or null for a show that cannot be announced yet
     venue       optional: venue name and city, shown under the event name
     map         optional: map link for the venue; turns the venue into a link
   Past events move to "Past shows" on their own the day after. */

window.PI = {
  tracks: [
    {
      title: "APTerror",
      type: "remix",
      of: "",
      cover: "assets/covers/apterror.webp",
      spotify: "https://open.spotify.com/track/4Eqv4ZfHrcklZlUhXrbWx9",
      soundcloud: "https://soundcloud.com/primalimpulsedj/apterror",
      download: "",
    },
    {
      title: "Imperial March",
      type: "remix",
      of: "",
      cover: "assets/covers/imperial-march.webp",
      spotify: "https://open.spotify.com/track/13xb5fk5J5y9AnwUgEbiAH",
      soundcloud: "https://soundcloud.com/primalimpulsedj/imperial_march",
      download: "",
    },
    {
      title: "Bad Guy",
      type: "remix",
      of: "",
      cover: "assets/covers/bad-guy.webp",
      spotify: "https://open.spotify.com/track/7xqiJafoGskmfTovEdlBEy",
      soundcloud: "https://soundcloud.com/primalimpulsedj/bad_guy",
      download: "",
    },
    {
      title: "Zaag This Party",
      type: "remix",
      of: "",
      cover: "assets/covers/zaag-this-party.webp",
      spotify: "",
      soundcloud: "https://soundcloud.com/primalimpulsedj/zaagthisparty",
      download: "",
    },
    {
      title: "TOTO DE LOCA",
      type: "remix",
      of: "",
      cover: "assets/covers/toto-de-loca.webp",
      spotify: "",
      soundcloud: "https://soundcloud.com/primalimpulsedj/toto_de_loca",
      download: "",
    },
  ],

  set: {
    title: "Fruit Madnes LIVE | D9 Barcelona 2026",
    youtube: "dnShkwFV5jA",
    poster: "assets/sets/fruit-madness-d9.webp",
  },

  events: [
    { date: "2026-12-04", name: null },
    {
      date: "2027-01-05",
      name: "Hardstyle Takeover",
      venue: "9D9, Barcelona, Spain",
      map: "https://maps.app.goo.gl/LgERadMEQQeJFj8o6",
    },
    { date: "2027-01-09", name: null },
  ],
};
