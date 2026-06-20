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

// Active nav section tracker via IntersectionObserver
const navAnchors = document.querySelectorAll('.nav__links a[href^="#"]');
const sections = [...navAnchors].map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.removeAttribute('aria-current'));
      const active = document.querySelector(`.nav__links a[href="#${entry.target.id}"]`);
      if (active) active.setAttribute('aria-current', 'true');
    }
  });
}, { threshold: 0.3, rootMargin: `-${getComputedStyle(document.documentElement).getPropertyValue('--nav-h')} 0px 0px 0px` });

sections.forEach(s => sectionObserver.observe(s));

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
