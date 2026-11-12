/* Renders the content in js/data.js into the page. */

(function () {
  "use strict";

  var data = window.PI || {};

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function linkButton(label, href, accessibleName, extraClass) {
    var a = el("a", "btn btn--small" + (extraClass ? " " + extraClass : ""), label);
    a.href = href;
    if (!extraClass) {
      a.target = "_blank";
      a.rel = "noopener";
    }
    a.setAttribute("aria-label", accessibleName);
    return a;
  }

  /* Single-colour brand icons (24x24), drawn in the button's text colour */
  var ICONS = {
    spotify: "M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z",
    soundcloud: "M23.999 14.165c-.052 1.796-1.612 3.169-3.4 3.169h-8.18a.68.68 0 0 1-.675-.683V7.862a.747.747 0 0 1 .452-.724s.75-.513 2.333-.513a5.364 5.364 0 0 1 2.763.755 5.433 5.433 0 0 1 2.57 3.54c.282-.08.574-.121.868-.12.884 0 1.73.358 2.347.992s.948 1.49.922 2.373ZM10.721 8.421c.247 2.98.427 5.697 0 8.672a.264.264 0 0 1-.53 0c-.395-2.946-.22-5.718 0-8.672a.264.264 0 0 1 .53 0ZM9.072 9.448c.285 2.659.37 4.986-.006 7.655a.277.277 0 0 1-.55 0c-.331-2.63-.256-5.02 0-7.655a.277.277 0 0 1 .556 0Zm-1.663-.257c.27 2.726.39 5.171 0 7.904a.266.266 0 0 1-.532 0c-.38-2.69-.257-5.21 0-7.904a.266.266 0 0 1 .532 0Zm-1.647.77a26.108 26.108 0 0 1-.008 7.147.272.272 0 0 1-.542 0 27.955 27.955 0 0 1 0-7.147.275.275 0 0 1 .55 0Zm-1.67 1.769c.421 1.865.228 3.5-.029 5.388a.257.257 0 0 1-.514 0c-.21-1.858-.398-3.549 0-5.389a.272.272 0 0 1 .543 0Zm-1.655-.273c.388 1.897.26 3.508-.01 5.412-.026.28-.514.283-.54 0-.244-1.878-.347-3.54-.01-5.412a.283.283 0 0 1 .56 0Zm-1.668.911c.4 1.268.257 2.292-.026 3.572a.257.257 0 0 1-.514 0c-.241-1.262-.354-2.312-.023-3.572a.283.283 0 0 1 .563 0Z",
  };

  function iconButton(icon, href, accessibleName, tooltip) {
    var a = el("a", "btn btn--small btn--icon");
    a.href = href;
    a.target = "_blank";
    a.rel = "noopener";
    a.title = tooltip;
    a.setAttribute("aria-label", accessibleName);
    var ns = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(ns, "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");
    var path = document.createElementNS(ns, "path");
    path.setAttribute("d", ICONS[icon]);
    svg.appendChild(path);
    a.appendChild(svg);
    return a;
  }

  function trackCard(track) {
    var li = el("li", "track");

    var cover = el("img", "track__cover");
    cover.src = track.cover;
    cover.alt = "Cover art for " + track.title;
    cover.width = 600;
    cover.height = 600;
    cover.loading = "lazy";
    cover.decoding = "async";
    li.appendChild(cover);

    var body = el("div", "track__body");
    body.appendChild(el("h3", "track__title", track.title));

    var tag = "Original";
    if (track.type === "remix") tag = track.of ? "Remix of " + track.of : "Remix";
    body.appendChild(el("p", "track__tag", tag));

    var links = el("div", "track__links");
    if (track.spotify) {
      links.appendChild(iconButton("spotify", track.spotify, "Listen to " + track.title + " on Spotify", "Spotify"));
    }
    if (track.soundcloud) {
      links.appendChild(iconButton("soundcloud", track.soundcloud, "Listen to " + track.title + " on SoundCloud", "SoundCloud"));
    }
    if (track.download) {
      links.appendChild(linkButton("Download", track.download, "Download " + track.title + " for free", "btn--primary"));
    }
    body.appendChild(links);

    li.appendChild(body);
    return li;
  }

  function renderTracks() {
    var list = document.getElementById("track-list");
    if (!list || !Array.isArray(data.tracks)) return;
    data.tracks.forEach(function (track) {
      list.appendChild(trackCard(track));
    });
  }

  /* ---------- Sets ----------
     The poster is a local image. Nothing is requested from YouTube until play is pressed. */

  function renderSet() {
    var mount = document.getElementById("set-player");
    var set = data.set;
    if (!mount || !set || !set.youtube) return;

    var poster = el("a", "set__poster");
    poster.href = "https://www.youtube.com/watch?v=" + encodeURIComponent(set.youtube);
    poster.setAttribute("aria-label", "Play the set: " + set.title + ". Loads the video from YouTube.");

    var img = el("img");
    img.src = set.poster;
    img.alt = "";
    img.width = 1280;
    img.height = 720;
    img.loading = "lazy";
    img.decoding = "async";
    poster.appendChild(img);
    poster.appendChild(el("span", "btn btn--primary", "Play the set"));

    poster.addEventListener("click", function (event) {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.button > 0) return;
      event.preventDefault();
      var frame = el("iframe");
      frame.src = "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(set.youtube) + "?autoplay=1&rel=0";
      frame.title = set.title;
      frame.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
      frame.allowFullscreen = true;
      frame.referrerPolicy = "strict-origin-when-cross-origin";
      mount.replaceChild(frame, poster);
      frame.focus();
    });

    mount.appendChild(poster);

    var title = document.getElementById("set-title");
    if (title) title.textContent = set.title;
  }

  /* ---------- Events ---------- */

  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  /* Today's date in Barcelona as "YYYY-MM-DD", wherever the visitor is */
  function todayInMadrid() {
    var parts = {};
    new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Madrid", year: "numeric", month: "2-digit", day: "2-digit",
    }).formatToParts(new Date()).forEach(function (part) {
      parts[part.type] = part.value;
    });
    return parts.year + "-" + parts.month + "-" + parts.day;
  }

  function eventRow(event) {
    var bits = event.date.split("-");
    var li = el("li", "event");

    var time = el("time", "event__date");
    time.dateTime = event.date;
    time.appendChild(el("span", "event__day", String(Number(bits[2]))));
    time.appendChild(document.createTextNode(" "));
    time.appendChild(el("span", "event__month", MONTHS[Number(bits[1]) - 1] + " " + bits[0]));
    li.appendChild(time);

    var info = el("div", "event__info");
    if (event.name) {
      info.appendChild(el("p", "event__name", event.name));
      if (event.venue) {
        var venue = el("p", "event__note");
        if (event.map) {
          var map = el("a", null, event.venue);
          map.href = event.map;
          map.target = "_blank";
          map.rel = "noopener";
          map.setAttribute("aria-label", event.venue + ", open in maps");
          venue.appendChild(map);
        } else {
          venue.textContent = event.venue;
        }
        info.appendChild(venue);
      }
    } else {
      var name = el("p", "event__name event__name--secret");
      var bar = el("span", "event__redacted");
      bar.setAttribute("aria-hidden", "true");
      name.appendChild(bar);
      name.appendChild(document.createTextNode("Classified"));
      info.appendChild(name);
      info.appendChild(el("p", "event__note", "Venue confirmed, not disclosed."));
    }
    li.appendChild(info);
    return li;
  }

  function renderEvents() {
    var upcomingList = document.getElementById("events-upcoming");
    var pastList = document.getElementById("events-past");
    if (!upcomingList || !pastList || !Array.isArray(data.events)) return;

    var today = todayInMadrid();
    var byDate = function (a, b) { return a.date < b.date ? -1 : a.date > b.date ? 1 : 0; };

    /* An event stays upcoming through its whole day */
    var upcoming = data.events.filter(function (e) { return e.date >= today; }).sort(byDate);
    var past = data.events.filter(function (e) { return e.date < today; }).sort(byDate).reverse();

    upcoming.forEach(function (e) { upcomingList.appendChild(eventRow(e)); });
    past.forEach(function (e) { pastList.appendChild(eventRow(e)); });

    upcomingList.hidden = upcoming.length === 0;
    document.getElementById("events-empty").hidden = upcoming.length > 0;
    document.getElementById("events-past-wrap").hidden = past.length === 0;
  }

  /* ---------- Fruit chaos ----------
     Poke the mascot: it headbangs and throws fruit-coloured bits on the kick.
     Five quick pokes, or the Konami code, makes it rain mascots.
     None of this runs for visitors who prefer reduced motion. */

  function initFruitChaos() {
    var hero = document.querySelector(".hero");
    var scene = document.querySelector(".hero__scene");
    var mascot = scene && scene.querySelector(".hero__mascot img");
    if (!hero || !mascot || !hero.animate || !window.matchMedia) return;

    var calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    var COLOURS = ["#ffe135", "#ff6e00", "#01b308", "#ffffff"];
    var SHAPES = ["", " spark--chunk", " spark--wedge"];
    var BEAT = 400;
    var pokes = [];
    var kickTimer = 0;
    var raining = false;

    function rand(min, max) { return min + Math.random() * (max - min); }

    function burst() {
      var box = hero.getBoundingClientRect();
      var m = mascot.getBoundingClientRect();
      var x = m.left - box.left + m.width / 2;
      var y = m.top - box.top + m.height * 0.45;
      var reach = Math.min(box.width, 900) * 0.42;

      for (var i = 0; i < 22; i++) {
        var bit = el("span", "spark" + SHAPES[i % SHAPES.length]);
        var size = rand(10, 22);
        bit.style.width = bit.style.height = size + "px";
        bit.style.left = x - size / 2 + "px";
        bit.style.top = y - size / 2 + "px";
        bit.style.background = COLOURS[i % COLOURS.length];
        bit.setAttribute("aria-hidden", "true");
        hero.appendChild(bit);

        var angle = rand(-Math.PI, 0) + rand(-0.4, 0.4);
        var far = rand(0.45, 1) * reach;
        var dx = Math.cos(angle) * far;
        var dy = Math.sin(angle) * far;
        var spin = rand(-540, 540);
        var flight = bit.animate([
          { transform: "translate(0, 0) scale(0.3)", opacity: 1 },
          { transform: "translate(" + dx * 0.8 + "px, " + dy + "px) rotate(" + spin * 0.6 + "deg) scale(1)", opacity: 1, offset: 0.45 },
          { opacity: 1, offset: 0.75 },
          { transform: "translate(" + dx + "px, " + (dy + far * 0.7) + "px) rotate(" + spin + "deg) scale(0.8)", opacity: 0 },
        ], { duration: rand(2, 3) * BEAT, easing: "cubic-bezier(0.2, 0.7, 0.4, 1)", fill: "forwards" });
        flight.onfinish = flight.oncancel = (function (node) {
          return function () { node.remove(); };
        })(bit);
      }
    }

    function kick() {
      scene.classList.remove("is-kicked");
      void scene.offsetWidth;               /* restart the headbang */
      scene.classList.add("is-kicked");
      clearTimeout(kickTimer);
      kickTimer = setTimeout(function () { scene.classList.remove("is-kicked"); }, BEAT * 4);

      var title = hero.querySelector(".hero__title");
      if (title) {
        title.animate([
          { transform: "rotate(-3deg) scale(1.07)" },
          { transform: "rotate(-3deg) scale(1)" },
        ], { duration: BEAT, easing: "cubic-bezier(0.2, 1.6, 0.4, 1)" });
      }
      burst();
    }

    function rain() {
      if (raining) return;
      raining = true;
      var sky = el("div", "rain");
      sky.setAttribute("aria-hidden", "true");
      var longest = 0;
      for (var i = 0; i < 24; i++) {
        var fruit = el("img");
        fruit.src = mascot.getAttribute("src");
        fruit.alt = "";
        var width = rand(44, 96);
        fruit.style.width = width + "px";
        fruit.style.left = "calc(" + rand(0, 100) + "% - " + width / 2 + "px)";
        sky.appendChild(fruit);
        var tilt = rand(-40, 40);
        var delay = rand(0, 4) * BEAT;
        var duration = rand(5, 8) * BEAT;
        longest = Math.max(longest, delay + duration);
        fruit.animate([
          { transform: "translateY(-160px) rotate(" + tilt + "deg)" },
          { transform: "translateY(calc(100vh + 160px)) rotate(" + -tilt + "deg)" },
        ], { duration: duration, delay: delay, easing: "cubic-bezier(0.4, 0, 0.8, 0.6)", fill: "both" });
      }
      document.body.appendChild(sky);
      setTimeout(function () { sky.remove(); raining = false; }, longest + 100);
    }

    mascot.addEventListener("click", function () {
      if (calm.matches) return;
      kick();
      var now = Date.now();
      pokes = pokes.filter(function (t) { return now - t < 2000; });
      pokes.push(now);
      if (pokes.length >= 5) { pokes = []; rain(); }
    });

    var KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
    var step = 0;
    document.addEventListener("keydown", function (event) {
      var key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      step = key === KONAMI[step] ? step + 1 : (key === KONAMI[0] ? 1 : 0);
      if (step === KONAMI.length) {
        step = 0;
        if (!calm.matches) { kick(); rain(); }
      }
    });
  }

  renderTracks();
  renderSet();
  renderEvents();
  initFruitChaos();
})();
