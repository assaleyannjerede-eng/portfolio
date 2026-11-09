// ===== PRELOADER =====
const preloader = document.getElementById("preloader");
const barFill = document.querySelector(".preloader-bar-fill");
let progress = 0;

function updateProgress(target) {
  const step = () => {
    if (progress < target) {
      progress += Math.max(0.8, (target - progress) * 0.12);
      if (progress > target) progress = target;
      barFill.style.width = progress + "%";
      requestAnimationFrame(step);
    }
  };
  requestAnimationFrame(step);
}

// Simulate loading stages
updateProgress(30);
window.addEventListener("DOMContentLoaded", () => updateProgress(70));
window.addEventListener("load", () => {
  updateProgress(100);
  setTimeout(() => {
    preloader.classList.add("hidden");
    document.body.classList.add("loaded");
    // Trigger initial reveals that are already in view
    document.querySelectorAll(".reveal, .reveal-scale, .reveal-left, .reveal-right").forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.9) {
        el.classList.add("visible");
        const fill = el.querySelector(".skill-fill");
        if (fill) {
          setTimeout(() => { fill.style.width = (fill.dataset.level || 0) + "%"; }, 150);
        }
      }
    });
  }, 450);
});

// Safety: hide preloader after max 3.5s
setTimeout(() => {
  if (!preloader.classList.contains("hidden")) {
    barFill.style.width = "100%";
    preloader.classList.add("hidden");
    document.body.classList.add("loaded");
  }
}, 3500);

// ===== Year =====
document.getElementById("year").textContent = new Date().getFullYear();

// ===== Header scroll =====
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 40);
}, { passive: true });

// ===== Mobile nav =====
const toggle = document.getElementById("nav-toggle");
const nav = document.getElementById("main-nav");

toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.classList.toggle("active", open);
  toggle.setAttribute("aria-expanded", open);
});

nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.classList.remove("active");
    toggle.setAttribute("aria-expanded", "false");
  });
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

  let speed = isDeleting ? 35 : 75;

  if (!isDeleting && charIndex === current.length) {
    speed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    speed = 350;
  }

  setTimeout(typeEffect, speed);
}

// Start typing after a short delay so preloader is visible first
setTimeout(typeEffect, 800);

// ===== Reveal on scroll =====
const reveals = document.querySelectorAll(".reveal, .reveal-scale, .reveal-left, .reveal-right");

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      const fill = entry.target.querySelector(".skill-fill");
      if (fill) {
        const level = fill.dataset.level || 0;
        setTimeout(() => { fill.style.width = level + "%"; }, 200);
      }
    }
  });
}, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

reveals.forEach(el => revealObserver.observe(el));

// ===== Counter animation =====
const counters = document.querySelectorAll("[data-count]");
let counted = false;

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !counted) {
      counted = true;
      counters.forEach(el => {
        const target = +el.dataset.count;
        const duration = 1400;
        const start = performance.now();

        function update(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(target * eased);
          if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
      });
    }
  });
}, { threshold: 0.5 });

if (counters.length) {
  const parent = counters[0].closest(".hero-stats");
  if (parent) counterObserver.observe(parent);
}

// ===== Cursor glow =====
const glow = document.getElementById("cursor-glow");
let mouseX = 0, mouseY = 0;
let glowX = 0, glowY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateGlow() {
  glowX += (mouseX - glowX) * 0.08;
  glowY += (mouseY - glowY) * 0.08;
  glow.style.left = glowX + "px";
  glow.style.top = glowY + "px";
  requestAnimationFrame(animateGlow);
}
animateGlow();

// ===== Button ripple position =====
document.querySelectorAll(".btn").forEach(btn => {
  btn.addEventListener("mousemove", (e) => {
    const rect = btn.getBoundingClientRect();
    btn.style.setProperty("--x", (e.clientX - rect.left) + "px");
    btn.style.setProperty("--y", (e.clientY - rect.top) + "px");
  });
});

// ===== Particles network =====
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let particles = [];
let width, height;

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

window.addEventListener("resize", resize);
resize();

class Particle {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 0.45;
    this.vy = (Math.random() - 0.5) * 0.45;
    this.size = Math.random() * 1.8 + 0.5;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 59, 92, 0.4)";
    ctx.fill();
  }
}

const particleCount = Math.min(80, Math.floor((window.innerWidth * window.innerHeight) / 16000));
for (let i = 0; i < particleCount; i++) {
  particles.push(new Particle());
}

function drawLines() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 150) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = "rgba(255, 59, 92, " + (0.14 * (1 - dist / 150)) + ")";
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, width, height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  drawLines();
  requestAnimationFrame(animateParticles);
}

animateParticles();

// ===== Contact form =====
const form = document.getElementById("contact-form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    const subject = encodeURIComponent("Message portfolio — " + name);
    const body = encodeURIComponent("Nom: " + name + "\nEmail: " + email + "\n\n" + message);
    window.location.href = "mailto:assalejeredeyann@gmail.com?subject=" + subject + "&body=" + body;
  });
}

// ===== Parallax subtle on orbs (mouse) =====
const orbs = document.querySelectorAll(".orb");
document.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 2;
  const y = (e.clientY / window.innerHeight - 0.5) * 2;
  orbs.forEach((orb, i) => {
    const factor = (i + 1) * 8;
    orb.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
  });
});
