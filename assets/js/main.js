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

  /* ---------- Copy BibTeX ---------- */
  var copyBtn = document.getElementById("copy-bibtex");
  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      var code = document.querySelector("#bibtex code");
      if (!code) return;
      var text = code.innerText;
      var done = function () {
        copyBtn.textContent = "Copied!";
        copyBtn.classList.add("copied");
        setTimeout(function () {
          copyBtn.textContent = "Copy";
          copyBtn.classList.remove("copied");
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
  }

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
