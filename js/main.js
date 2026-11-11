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

  renderTracks();
})();
