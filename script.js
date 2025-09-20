/* Enhancements & dynamic elements for York's profile site */

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

/* Live Time */
function updateClocks() {
  const now = new Date();
  const pad = n => String(n).padStart(2, '0');
  const local = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  const localEl = $('#local-time');
  if (localEl) localEl.textContent = local;
}
setInterval(updateClocks, 1000);
updateClocks();

/* Year */
const yearEl = $('#year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* Scroll to top */
$('#scroll-top')?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* Intersection-based nav highlighting */
const navLinks = $$('a[data-nav]');
const sections = navLinks
  .map(a => {
    const target = $(a.getAttribute('href'));
    return target;
  })
  .filter(Boolean);

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = '#' + entry.target.id;
        navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === id));
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: [0.1, 0.5] });

  sections.forEach(sec => observer.observe(sec));
}

/* Smooth scroll for internal nav */
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    const hash = link.getAttribute('href');
    if (hash && hash.startsWith('#')) {
      const target = $(hash);
      if (target) {
        e.preventDefault();
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - 10,
          behavior: 'smooth'
        });
        history.replaceState(null, '', hash);
      }
    }
  });
});

/* Progressive enhancement: add a subtle fade-in */
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('ready');
});
