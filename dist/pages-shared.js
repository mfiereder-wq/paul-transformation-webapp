// Shared behaviour for all static PCT subpages (Services, Shop, AGB, Datenschutz, Impressum).
// Handles: mobile nav toggle, cookie consent banner, scroll-reveal animations, shop quick-view panels.
document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-button');
  const navigation = document.querySelector('.site-nav');
  menuToggle?.addEventListener('click', () => {
    const open = navigation.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
    menuToggle.textContent = open ? '×' : '☰';
  });
  navigation?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    navigation.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.setAttribute('aria-label', 'Menü öffnen');
    if (menuToggle) menuToggle.textContent = '☰';
  }));

  // Shop quick-view panels
  document.querySelectorAll('.quick-view').forEach((button) => button.addEventListener('click', () => {
    button.setAttribute('aria-expanded', String(button.getAttribute('aria-expanded') !== 'true'));
  }));

  // Scroll-reveal animations
  const motionReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealItems = document.querySelectorAll('.scroll-reveal, .scroll-stagger');
  if (!('IntersectionObserver' in window) || motionReduced) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: .16, rootMargin: '0px 0px -7% 0px' });
    revealItems.forEach((item) => revealObserver.observe(item));
  }

  // Cookie consent banner
  const cookieBanner = document.querySelector('#cookie-banner');
  if (cookieBanner) {
    const cookieChoice = localStorage.getItem('pct-cookie-consent');
    if (!cookieChoice) {
      cookieBanner.classList.add('is-visible');
    }
    cookieBanner.querySelectorAll('[data-cookie]').forEach((button) => button.addEventListener('click', () => {
      localStorage.setItem('pct-cookie-consent', button.dataset.cookie);
      cookieBanner.classList.remove('is-visible');
    }));
  }
});
