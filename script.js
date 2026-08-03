/* ─── NAVBAR: scroll effect + active link highlight ─── */
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  // Sticky style
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Highlight active nav link
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 90;
    if (window.scrollY >= sectionTop) current = section.getAttribute('id');
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

/* ─── MOBILE NAV: hamburger toggle ─── */
const hamburger = document.getElementById('hamburger');
const navLinksMenu = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinksMenu.classList.toggle('open');
});

// Close mobile nav when a link is clicked
navLinksMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinksMenu.classList.remove('open');
  });
});

// Close mobile nav on outside click
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target)) {
    hamburger.classList.remove('active');
    navLinksMenu.classList.remove('open');
  }
});

/* ─── TYPED TEXT EFFECT ─── */
const typedEl = document.getElementById('typed-text');
const phrases = [
  'MERN Stack Developer',
  'Telecom Network Analyst',
  'AI & Data Science Student',
  'Full Stack Engineer',
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const currentPhrase = phrases[phraseIndex];
  const displayText = isDeleting
    ? currentPhrase.substring(0, charIndex--)
    : currentPhrase.substring(0, charIndex++);

  typedEl.textContent = displayText;

  let speed = isDeleting ? 40 : 80;

  if (!isDeleting && charIndex > currentPhrase.length) {
    speed = 1800; // pause at end
    isDeleting = true;
  } else if (isDeleting && charIndex < 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    speed = 300;
  }

  setTimeout(type, speed);
}

type();

/* ─── FADE-IN ON SCROLL (Intersection Observer) ─── */
const fadeElements = document.querySelectorAll(
  '.stat-card, .skill-category, .timeline-card, .project-card, .edu-card, .cert-card, .contact-item, .about-text, .about-stats'
);

fadeElements.forEach(el => el.classList.add('fade-in'));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger delay based on index within its parent
        const siblings = Array.from(entry.target.parentElement.children);
        const index = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = `${index * 80}ms`;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

fadeElements.forEach(el => observer.observe(el));

/* ─── CONTACT FORM: submit handler ─── */
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const btn = contactForm.querySelector('button[type="submit"]');
  const name = document.getElementById('name').value.trim();

  // Simple success feedback
  btn.textContent = '✓ Message Sent!';
  btn.style.background = 'var(--accent)';
  btn.disabled = true;

  setTimeout(() => {
    btn.textContent = 'Send Message';
    btn.style.background = '';
    btn.disabled = false;
    contactForm.reset();
  }, 3000);
});

/* ─── ACTIVE NAV LINK STYLE ─── */
const style = document.createElement('style');
style.textContent = `.nav-links a.active { color: var(--white) !important; }`;
document.head.appendChild(style);

/* ─── SMOOTH SCROLL for browsers that need it ─── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
