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
    a.target = "_blank";
    a.rel = "noopener";
    a.setAttribute("aria-label", accessibleName);
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
      links.appendChild(linkButton("Spotify", track.spotify, "Listen to " + track.title + " on Spotify"));
    }
    if (track.soundcloud) {
      links.appendChild(linkButton("SoundCloud", track.soundcloud, "Listen to " + track.title + " on SoundCloud"));
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

  renderTracks();
  renderSet();
  renderEvents();
})();
