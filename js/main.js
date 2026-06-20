/* Colombia Chic — Main JS */

// Nav scroll state
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Mobile menu with aria-expanded
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

function closeMobileMenu() {
  mobileMenu.hidden = true;
  menuBtn.classList.remove('open');
  menuBtn.setAttribute('aria-expanded', 'false');
  menuBtn.setAttribute('aria-label', 'Open menu');
}

menuBtn.addEventListener('click', () => {
  const open = mobileMenu.hidden;
  mobileMenu.hidden = !open;
  menuBtn.classList.toggle('open', open);
  menuBtn.setAttribute('aria-expanded', String(open));
  menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});
document.querySelectorAll('.mobile-link').forEach(a => a.addEventListener('click', closeMobileMenu));

// Scroll reveal
const revealObserver = new IntersectionObserver(
  entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObserver.unobserve(e.target); } }),
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Hero reveal on load (separate from observer to ensure it always shows)
const heroContent = document.querySelector('.hero__content');
if (heroContent) {
  heroContent.classList.add('visible');
  revealObserver.unobserve(heroContent);
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
