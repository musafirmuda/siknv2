/**
 * SIKN Custom Script
 * Author: SIKN Team
 */

document.addEventListener("DOMContentLoaded", () => {
  // ── Initialize Lucide Icons ──────────────────────────────────────────────
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }

  // ── AOS Init ────────────────────────────────────────────────────────────
  if (typeof AOS !== "undefined") {
    AOS.init({ once: true, duration: 600 });
  }

  // ── Mobile: hamburger toggle ─────────────────────────────────────────────
  const hamburger = document.getElementById("mobileMenuToggle");
  const navList = document.querySelector(".header-nav");
  const overlay = document.getElementById("headerOverlay");
  const header = document.querySelector(".header");
  const dropdownItems = document.querySelectorAll(
    ".header-nav__item--dropdown"
  );

  function openMobileMenu() {
    navList.classList.add("is-open");
    overlay.classList.add("is-visible");
    document.body.classList.add("menu-open");
    hamburger.setAttribute("aria-expanded", "true");
    // Swap icon: menu → x
    hamburger.innerHTML = "";
    const icon = document.createElement("i");
    icon.setAttribute("data-lucide", "x");
    hamburger.appendChild(icon);
    if (typeof lucide !== "undefined") lucide.createIcons();
  }

  function closeMobileMenu() {
    navList.classList.remove("is-open");
    overlay.classList.remove("is-visible");
    document.body.classList.remove("menu-open");
    hamburger.setAttribute("aria-expanded", "false");
    // Swap icon: x → menu
    hamburger.innerHTML = "";
    const icon = document.createElement("i");
    icon.setAttribute("data-lucide", "menu");
    hamburger.appendChild(icon);
    if (typeof lucide !== "undefined") lucide.createIcons();
    // Close all open dropdowns
    dropdownItems.forEach((item) => {
      item.classList.remove("is-open");
      const trigger = item.querySelector(".header-nav__link--dropdown");
      if (trigger) trigger.setAttribute("aria-expanded", "false");
    });
  }

  if (hamburger && navList) {
    hamburger.addEventListener("click", () => {
      if (navList.classList.contains("is-open")) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  // Click overlay → close menu
  if (overlay) {
    overlay.addEventListener("click", closeMobileMenu);
  }

  dropdownItems.forEach((item) => {
    const trigger = item.querySelector(".header-nav__link--dropdown");
    const dropdown = item.querySelector(".header-dropdown");

    if (!trigger || !dropdown) return;

    // Mobile: toggle on click
    trigger.addEventListener("click", (e) => {
      // Only intercept on mobile (<992px); on desktop CSS hover handles it
      if (window.innerWidth < 992) {
        e.preventDefault();
        const isOpen = item.classList.toggle("is-open");
        trigger.setAttribute("aria-expanded", isOpen);
      }
    });
  });

  // ── Close dropdowns when clicking outside ───────────────────────────────
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".header-nav__item--dropdown")) {
      dropdownItems.forEach((item) => {
        item.classList.remove("is-open");
        const trigger = item.querySelector(".header-nav__link--dropdown");
        if (trigger) trigger.setAttribute("aria-expanded", "false");
      });
    }
  });

  // ── Auto-close mobile menu on resize to desktop ─────────────────────────
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 992 && navList.classList.contains("is-open")) {
      closeMobileMenu();
    }
  });

  // ── Scroll: shrink + glassmorphism ──────────────────────────────────────
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (window.scrollY > 50) {
          header.classList.add("header--scrolled");
        } else {
          header.classList.remove("header--scrolled");
        }
        ticking = false;
      });
      ticking = true;
    }
  });

  // ── Quick Links Swiper ──────────────────────────────────────────────────
  if (typeof Swiper !== "undefined") {
    const quickLinksSlider = document.querySelector(".quick-links__slider");
    if (quickLinksSlider) {
      new Swiper(".quick-links__slider", {
        slidesPerView: 1.2,
        spaceBetween: 12,
        grabCursor: true,
        navigation: {
          prevEl: "#quickLinkPrev",
          nextEl: "#quickLinkNext",
        },
        breakpoints: {
          576: { slidesPerView: 2.2, spaceBetween: 14 },
          768: { slidesPerView: 3.2, spaceBetween: 16 },
          992: { slidesPerView: 4, spaceBetween: 16 },
        },
      });
    }
  }

  // ── Info Terkini Swiper ──────────────────────────────────────────────────
  if (typeof Swiper !== "undefined") {
    const infoTerkiniEl = document.querySelector(".info-terkini__slider");
    if (infoTerkiniEl) {
      new Swiper(".info-terkini__slider", {
        slidesPerView: 1.1,
        spaceBetween: 24,
        grabCursor: true,
        navigation: {
          prevEl: "#infoTerkiniPrev",
          nextEl: "#infoTerkiniNext",
        },
        scrollbar: {
          el: "#infoTerkiniScrollbar",
          draggable: true,
        },
        breakpoints: {
          768: { slidesPerView: 1.5, spaceBetween: 24 },
          992: { slidesPerView: 1.3, spaceBetween: 32 },
        },
      });
    }
  }

  // ── Back to Top (show/hide on scroll) ──
  const backToTopBtn = document.getElementById("backToTop");
  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add("is-visible");
      } else {
        backToTopBtn.classList.remove("is-visible");
      }
    });
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ── Curriculum Image Swap on Hover ──────────────────────────────────────
  const curriculumItems = document.querySelectorAll(".curriculum-item");
  const curriculumImages = document.querySelectorAll(".struktur__image img");

  if (curriculumItems.length > 0 && curriculumImages.length > 0) {
    curriculumItems.forEach((item) => {
      const link = item.querySelector(".curriculum-item__link");
      if (link) {
        link.addEventListener("mouseenter", () => {
          const index = item.getAttribute("data-image");
          curriculumImages.forEach((img) => img.classList.remove("is-active"));
          if (curriculumImages[index]) {
            curriculumImages[index].classList.add("is-active");
          }
        });
      }
    });
  }

  console.log("SIKN Scripts Loaded Successfully");
});
