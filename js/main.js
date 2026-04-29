/* ============================================================
   Pinelabs SDK Docs — Main JS
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  if (typeof hljs !== "undefined") hljs.highlightAll();
  initScrollSpy();
  initSmoothScroll();
});

/* ---- Syntax highlighting ----------------------------------- */
// hljs is loaded via CDN; highlightAll() handles all <pre><code> blocks.

/* ---- Copy button ------------------------------------------- */
function copyCode(btn) {
  const block = btn.closest(".code-block");
  const code = block.querySelector("pre code");
  if (!code) return;

  navigator.clipboard
    .writeText(code.innerText)
    .then(() => {
      btn.textContent = "Copied!";
      btn.classList.add("copied");
      setTimeout(() => {
        btn.textContent = "Copy";
        btn.classList.remove("copied");
      }, 2000);
    })
    .catch(() => {
      // Fallback for older browsers
      const ta = document.createElement("textarea");
      ta.value = code.innerText;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      btn.textContent = "Copied!";
      btn.classList.add("copied");
      setTimeout(() => {
        btn.textContent = "Copy";
        btn.classList.remove("copied");
      }, 2000);
    });
}

/* ---- Language tabs ----------------------------------------- */
function switchTab(btn, groupId) {
  const lang = btn.dataset.lang;

  // 1. Sync active state across ALL tab groups sharing this groupId
  document.querySelectorAll(`.lang-tabs[data-tabs="${groupId}"] .lang-tab`).forEach(t => {
    t.classList.toggle('active', t.dataset.lang === lang);
  });

  // 2. Toggle ID-keyed blocks (e.g. Signatures section)
  document.querySelectorAll(`.code-block[id^="${groupId}-"]`).forEach(el => {
    el.classList.toggle('hidden', el.id !== `${groupId}-${lang}`);
  });

  // 3. Toggle data-lang-only blocks (e.g. Example section) within the nearest scoped container
  const container = btn.closest('.api-card-body')
                 || btn.closest('.api-card')
                 || btn.closest('section')
                 || document;
  container.querySelectorAll('.code-block:not([id])[data-lang]').forEach(el => {
    el.classList.toggle('hidden', el.dataset.lang !== lang);
  });
}

/* ---- Scroll spy -------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll("[id]");
  const sidebarLinks = document.querySelectorAll('.sidebar-link[href^="#"]');

  if (!sidebarLinks.length || !sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          sidebarLinks.forEach((link) => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === `#${id}`
            );
          });
        }
      });
    },
    {
      rootMargin: "-70px 0px -60% 0px",
      threshold: 0,
    }
  );

  sections.forEach((sec) => observer.observe(sec));
}

/* ---- Smooth scroll offset for fixed topbar ----------------- */
function initSmoothScroll() {
  const TOPBAR_H = 72;

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href").slice(1);
      const target = document.getElementById(targetId);
      if (!target) return;
      e.preventDefault();
      const y = target.getBoundingClientRect().top + window.scrollY - TOPBAR_H;
      window.scrollTo({ top: y, behavior: "smooth" });
    });
  });
}
