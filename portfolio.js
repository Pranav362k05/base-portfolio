/**
 * Table of contents: active section highlight (scroll spy)
 */
(function () {
  "use strict";

  const sections = document.querySelectorAll("main section[id]");
  const links = document.querySelectorAll(".toc-list a[href^='#']");

  if (!sections.length || !links.length) return;

  function setActive(id) {
    links.forEach(function (link) {
      const href = link.getAttribute("href");
      const match = href === "#" + id;
      link.classList.toggle("active", match);
      if (match) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
  }

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    },
    {
      root: null,
      rootMargin: "-12% 0px -70% 0px",
      threshold: 0,
    }
  );

  sections.forEach(function (section) {
    observer.observe(section);
  });

  // Initial state: first section if near top
  window.addEventListener("load", function () {
    const first = sections[0];
    if (first && window.scrollY < 80) setActive(first.id);
  });
})();
