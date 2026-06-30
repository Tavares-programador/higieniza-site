/* =====================================================================
   HIGIENIZA+ — MAIN.JS
   Navbar, menu mobile, reveal on scroll, comparador antes/depois.
   ===================================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------- LOADER ---------- */
  const loader = document.getElementById("loader");
  window.addEventListener("load", () => {
    if (loader) loader.classList.add("hidden");
  });
  // fallback se o load já passou
  setTimeout(() => { if (loader) loader.classList.add("hidden"); }, 1500);

  /* ---------- NAVBAR SCROLL ---------- */
  const nav = document.getElementById("mainNav");
  if (nav){
    const toggleScrolled = () => nav.classList.toggle("scrolled", window.scrollY > 30);
    toggleScrolled();
    window.addEventListener("scroll", toggleScrolled);
  }

  /* ---------- MENU MOBILE ---------- */
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  if (navToggle && navMenu){
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen);
    });

    navMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- REVEAL ON SCROLL ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length){
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting){
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach(el => observer.observe(el));
  }

  /* ---------- COMPARADOR ANTES / DEPOIS ---------- */
  const compare = document.querySelector(".compare");
  if (compare){
    const beforeWrap = compare.querySelector(".compare-before-wrap");
    const handle = compare.querySelector(".compare-handle");
    const hint = compare.querySelector(".compare-hint");
    let dragging = false;

    function setPosition(percent){
      const clamped = Math.min(98, Math.max(2, percent));
      beforeWrap.style.width = clamped + "%";
      handle.style.left = clamped + "%";
    }

    function positionFromClientX(clientX){
      const rect = compare.getBoundingClientRect();
      const percent = ((clientX - rect.left) / rect.width) * 100;
      setPosition(percent);
      if (hint) hint.classList.add("fade");
    }

    handle.addEventListener("pointerdown", (e) => {
      dragging = true;
      handle.setPointerCapture(e.pointerId);
      e.preventDefault();
    });

    handle.addEventListener("pointermove", (e) => {
      if (!dragging) return;
      positionFromClientX(e.clientX);
    });

    handle.addEventListener("pointerup", () => { dragging = false; });
    handle.addEventListener("pointercancel", () => { dragging = false; });

    compare.addEventListener("click", (e) => {
      if (e.target.closest(".compare-handle")) return;
      positionFromClientX(e.clientX);
    });

    // estado inicial
    setPosition(50);
  }

});
