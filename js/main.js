/* Colombia Chic — Main JS */

// Nav scroll state
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Mobile menu
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
menuBtn.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  menuBtn.classList.toggle('open', open);
  menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});
document.querySelectorAll('.mobile-link').forEach(a => {
  a.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    menuBtn.classList.remove('open');
  });
});

// Scroll reveal
const revealObserver = new IntersectionObserver(
  entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObserver.unobserve(e.target); } }),
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Hero reveal on load
const heroContent = document.querySelector('.hero__content');
if (heroContent) {
  setTimeout(() => heroContent.classList.add('visible'), 200);
}

// Contact form (stub — wire to backend when ready)
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'Sending…';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Request Sent — We\'ll be in touch';
      setTimeout(() => { btn.textContent = original; btn.disabled = false; }, 4000);
    }, 1200);
  });
}

// Butterfly parallax on hero (subtle)
const heroSection = document.getElementById('hero');
const bflies = document.querySelectorAll('.butterfly');
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const progress = Math.min(window.scrollY / (heroSection?.offsetHeight || 600), 1);
      bflies.forEach((b, i) => {
        const dir = i % 2 === 0 ? 1 : -1;
        b.style.transform = `translateY(${progress * 40 * dir}px)`;
      });
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });
