// Menu toggle + year + reveal animations + role typewriter
const roles = [
  'Développeur Front-end amateur',
  'Développeur Web Junior',
  'Développeur Front-end'
];

function typeLoop() {
  const roleText = document.getElementById('role-text');
  if (!roleText) return;

  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const tick = () => {
    const currentRole = roles[roleIndex];

    if (!deleting) {
      charIndex++;
      roleText.textContent = currentRole.slice(0, charIndex);

      if (charIndex === currentRole.length) {
        deleting = true;
        setTimeout(tick, 1200);
        return;
      }
    } else {
      charIndex--;
      roleText.textContent = currentRole.slice(0, charIndex);

      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }

    const speed = deleting ? 60 : 100;
    setTimeout(tick, speed);
  };

  tick();
}

document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('main-nav');

  toggle && toggle.addEventListener('click', () => {
    nav.classList.toggle('show');
    toggle.setAttribute('aria-expanded', nav.classList.contains('show'));
  });

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const revealItems = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealItems.forEach((item) => observer.observe(item));

  typeLoop();

  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      // Optionally, you can intercept and send via API instead of mailto.
      // Here we let the default mail client handle it.
      // e.preventDefault();
      // ... custom submission logic ...
    });
  }
});