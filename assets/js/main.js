/* ============================================================
   CAIP project page — interactions
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Tabs (Results) ---------- */
  var tabs = document.querySelectorAll(".tab");
  var panels = document.querySelectorAll(".tab-panel");
  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      var target = tab.getAttribute("data-tab");
      tabs.forEach(function (t) {
        var active = t === tab;
        t.classList.toggle("is-active", active);
        t.setAttribute("aria-selected", active ? "true" : "false");
      });
      panels.forEach(function (p) {
        var active = p.getAttribute("data-panel") === target;
        p.classList.toggle("is-active", active);
        p.hidden = !active;
      });
    });
  });

  /* ---------- Copy buttons (BibTeX, code) ---------- */
  document.querySelectorAll(".copy-btn[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var code = document.querySelector(btn.getAttribute("data-copy"));
      if (!code) return;
      var text = code.innerText;
      var done = function () {
        btn.textContent = "Copied!";
        btn.classList.add("copied");
        setTimeout(function () {
          btn.textContent = "Copy";
          btn.classList.remove("copied");
        }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(done);
      } else {
        var ta = document.createElement("textarea");
        ta.value = text; document.body.appendChild(ta); ta.select();
        try { document.execCommand("copy"); } catch (e) {}
        document.body.removeChild(ta); done();
      }
    });
  });

  /* ---------- Optional narration (AI readover) ---------- */
  /* Auto-enable the toggle only if an <audio> source has been provided. */
  var audio = document.getElementById("narration-audio");
  var toggle = document.getElementById("narration-toggle");
  if (audio && toggle && audio.querySelector("source")) {
    toggle.hidden = false;
    var playing = false;
    toggle.addEventListener("click", function () {
      playing = !playing;
      if (playing) {
        audio.play();
        toggle.innerHTML = '<span class="dot"></span> Pause narration';
      } else {
        audio.pause();
        toggle.innerHTML = '<span class="dot"></span> Play with narration';
      }
    });
    audio.addEventListener("ended", function () {
      playing = false;
      toggle.innerHTML = '<span class="dot"></span> Play with narration';
    });
  }

  /* ---------- Keep comparison-matrix videos in sync ----------
     Each encoder column (side / head cam / saliency) is the same rollout
     rendered three ways, so the three clips should stay frame-locked.
     They are independent <video autoplay loop> elements that start at
     staggered times (file sizes differ) and loop on their own clocks, so
     without correction they drift apart. Group by comparison/<task>/<enc>
     and nudge followers back to the leader (side view) when drift is large. */
  var cmpVids = document.querySelectorAll("video.cmp-vid");
  if (cmpVids.length) {
    var groups = {};
    cmpVids.forEach(function (v) {
      var src = v.currentSrc || (v.querySelector("source") && v.querySelector("source").src) || "";
      var m = src.match(/comparison\/([^/]+)\/([a-z0-9]+)_/i);
      if (!m) return;
      var key = m[1] + "/" + m[2]; /* task/encoder */
      (groups[key] = groups[key] || []).push(v);
    });
    Object.keys(groups).forEach(function (key) {
      var g = groups[key];
      if (g.length < 2) return;
      var leader = g[0]; /* side view — smallest file, loads first */
      (function tick() {
        var t = leader.currentTime;
        for (var i = 1; i < g.length; i++) {
          var v = g[i];
          if (v.readyState >= 2 && Math.abs(v.currentTime - t) > 0.12) {
            try { v.currentTime = t; } catch (e) {}
          }
        }
        requestAnimationFrame(tick);
      })();
    });
  }

  /* ---------- Nav active-section highlight ---------- */
  var sections = document.querySelectorAll("section[id]");
  var navLinks = document.querySelectorAll(".nav-links a");
  if ("IntersectionObserver" in window && sections.length) {
    var byId = {};
    navLinks.forEach(function (l) { byId[l.getAttribute("href")] = l; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          navLinks.forEach(function (l) { l.style.color = ""; });
          var link = byId["#" + e.target.id];
          if (link) link.style.color = "var(--accent)";
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { io.observe(s); });
  }
})();
