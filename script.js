// ===== Année automatique =====
document.getElementById("year").textContent = new Date().getFullYear();

// ===== Menu mobile =====
const toggle = document.getElementById("nav-toggle");
const nav = document.getElementById("main-nav");

toggle.addEventListener("click", () => {
  nav.classList.toggle("open");
});

// Fermer le menu au clic sur un lien
nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

// ===== Typing effect =====
const roles = [
  "Développeur Front-end",
  "Passionné de React",
  "Étudiant en Génie Logiciel",
  "Futur Dev Flutter"
];

const roleEl = document.getElementById("role-text");
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const current = roles[roleIndex];
  
  if (isDeleting) {
    roleEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    roleEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 40 : 80;

  if (!isDeleting && charIndex === current.length) {
    speed = 1800; // pause
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    speed = 400;
  }

  setTimeout(typeEffect, speed);
}

typeEffect();

// ===== Reveal on scroll =====
const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, {
  threshold: 0.15
});

reveals.forEach(el => observer.observe(el));
