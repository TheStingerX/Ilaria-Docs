(function () {
  var root = document.documentElement;
  root.classList.add("docs-toc-managed");

  var HEADER_OFFSET = 130;
  var BOTTOM_EPSILON = 4;
  var UNPIN_SCROLL_DELTA = 40;
  var LOCK_MS = 700;

  var pinnedHref = "";
  var pinnedScrollY = window.scrollY;
  var lockUntil = 0;
  var currentPath = location.pathname;
  var rafId = 0;

  function normalizeHref(href) {
    if (!href || href.charAt(0) !== "#") return "";
    try {
      return "#" + decodeURIComponent(href.slice(1));
    } catch (err) {
      return href;
    }
  }

  function getSidebarLinks() {
    var sidebar = document.getElementById("retype-sidebar-right") || document;
    return Array.prototype.slice.call(sidebar.querySelectorAll('a.toc-link[href^="#"]'));
  }

  function resolveHeading(href) {
    var rawId = href.slice(1);
    var decoded = normalizeHref(href).slice(1);
    return document.getElementById(decoded) || document.getElementById(rawId);
  }

  function pinHref(href, scrollNow) {
    pinnedHref = normalizeHref(href);
    pinnedScrollY = typeof scrollNow === "number" ? scrollNow : window.scrollY;
    lockUntil = pinnedHref ? Date.now() + LOCK_MS : 0;
  }

  function update() {
    rafId = 0;
    if (location.pathname !== currentPath) {
      currentPath = location.pathname;
      pinHref(location.hash, window.scrollY);
    }

    var links = getSidebarLinks();
    if (!links.length) return;

    var activeHref = "";
    if (pinnedHref) {
      for (var i = 0; i < links.length; i++) {
        if (normalizeHref(links[i].getAttribute("href")) === pinnedHref) {
          activeHref = pinnedHref;
          break;
        }
      }
      if (!activeHref) pinnedHref = "";
    }

    if (!activeHref) {
      var atBottom =
        window.scrollY > 0 &&
        window.innerHeight + window.scrollY >= root.scrollHeight - BOTTOM_EPSILON;
      if (atBottom) {
        activeHref = normalizeHref(links[links.length - 1].getAttribute("href"));
      } else {
        for (var j = 0; j < links.length; j++) {
          var href = normalizeHref(links[j].getAttribute("href"));
          var heading = resolveHeading(href);
          if (heading && heading.getBoundingClientRect().top <= HEADER_OFFSET) {
            activeHref = href;
          }
        }
        if (!activeHref) {
          activeHref = normalizeHref(links[0].getAttribute("href"));
        }
      }
    }

    var allLinks = document.querySelectorAll('a.toc-link[href^="#"]');
    for (var k = 0; k < allLinks.length; k++) {
      var link = allLinks[k];
      var match = normalizeHref(link.getAttribute("href")) === activeHref;
      link.classList.toggle("docs-toc-current", match);
    }
  }

  function scheduleUpdate() {
    if (!rafId) {
      rafId = window.requestAnimationFrame(update);
    }
  }

  if (location.hash) {
    pinHref(location.hash, window.scrollY);
  }

  window.addEventListener(
    "scroll",
    function () {
      if (pinnedHref) {
        if (Date.now() <= lockUntil) {
          pinnedScrollY = window.scrollY;
        } else if (Math.abs(window.scrollY - pinnedScrollY) > UNPIN_SCROLL_DELTA) {
          pinnedHref = "";
        }
      }
      scheduleUpdate();
    },
    { passive: true }
  );

  window.addEventListener("resize", scheduleUpdate, { passive: true });

  window.addEventListener("hashchange", function () {
    pinHref(location.hash, window.scrollY);
    update();
  });

  document.addEventListener("click", function (event) {
    var link =
      event.target && event.target.closest
        ? event.target.closest('a.toc-link[href^="#"]')
        : null;
    if (!link) return;
    pinHref(link.getAttribute("href"), window.scrollY);
    update();
  });

  function nodeHasTocLink(node) {
    if (!node || node.nodeType !== 1) return false;
    if (node.id === "retype-sidebar-right") return true;
    if (node.classList && node.classList.contains("toc-link")) return true;
    return !!(node.querySelector && node.querySelector(".toc-link"));
  }

  function startObserver() {
    if (!document.body || typeof MutationObserver === "undefined") {
      update();
      return;
    }
    var observer = new MutationObserver(function (mutations) {
      for (var i = 0; i < mutations.length; i++) {
        var m = mutations[i];
        if (m.target && m.target.closest && m.target.closest("#retype-sidebar-right")) {
          scheduleUpdate();
          return;
        }
        for (var a = 0; a < m.addedNodes.length; a++) {
          if (nodeHasTocLink(m.addedNodes[a])) {
            scheduleUpdate();
            return;
          }
        }
        for (var r = 0; r < m.removedNodes.length; r++) {
          if (nodeHasTocLink(m.removedNodes[r])) {
            scheduleUpdate();
            return;
          }
        }
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    update();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startObserver);
  } else {
    startObserver();
  }
})();
