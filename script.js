/**
 * Portfolio — Navigation, scroll behavior, and animations
 */

(function () {
  'use strict';

  const NAV = document.getElementById('nav');
  const NAV_LINKS = document.getElementById('navLinks');
  const NAV_TOGGLE = document.getElementById('navToggle');
  const HERO = document.getElementById('hero');
  const SECTIONS = document.querySelectorAll('[id="hero"], [id="projects"], [id="about"], [id="contact"]');

  const NAV_HEIGHT = 72;
  const SCROLL_REVEAL_OPTIONS = { rootMargin: '0px 0px -80px 0px', threshold: 0.1 };

  // ——— Lucide Icons ———
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // ——— Scroll-based nav background ———
  function updateNavOnScroll() {
    if (window.scrollY > 20) {
      NAV.classList.add('scrolled');
    } else {
      NAV.classList.remove('scrolled');
    }
  }

  // ——— Active section (for nav highlight) ———
  function setActiveSection() {
    const scrollY = window.scrollY + NAV_HEIGHT + 100;
    let current = 'hero';

    SECTIONS.forEach(function (section) {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        current = section.id;
      }
    });

    NAV_LINKS.querySelectorAll('a[data-section]').forEach(function (link) {
      if (link.getAttribute('data-section') === current) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  // ——— Scroll reveal ———
  function initReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, SCROLL_REVEAL_OPTIONS);

    els.forEach(function (el) {
      observer.observe(el);
      // Reveal elements already in view on load
      var rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        el.classList.add('revealed');
      }
    });

    document.documentElement.classList.add('reveal-ready');
  }

  // ——— Mobile menu ———
  function openMenu() {
    NAV_LINKS.classList.add('is-open');
    NAV_TOGGLE.setAttribute('aria-expanded', 'true');
    NAV_TOGGLE.setAttribute('aria-label', 'Fechar menu');
  }

  function closeMenu() {
    NAV_LINKS.classList.remove('is-open');
    NAV_TOGGLE.setAttribute('aria-expanded', 'false');
    NAV_TOGGLE.setAttribute('aria-label', 'Abrir menu');
  }

  function toggleMenu() {
    const isOpen = NAV_LINKS.classList.contains('is-open');
    if (isOpen) closeMenu();
    else openMenu();
  }

  NAV_TOGGLE.addEventListener('click', toggleMenu);

  NAV_LINKS.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      if (window.matchMedia('(max-width: 768px)').matches) {
        closeMenu();
      }
    });
  });

  // ——— Smooth scroll with nav offset ———
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // ——— Scroll listeners ———
  window.addEventListener('scroll', function () {
    updateNavOnScroll();
    setActiveSection();
  }, { passive: true });

  window.addEventListener('resize', function () {
    if (window.matchMedia('(min-width: 769px)').matches) {
      closeMenu();
    }
  });

  // ——— Init ———
  updateNavOnScroll();
  setActiveSection();
  initReveal();
})();
