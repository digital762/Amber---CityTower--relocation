/* ─── SMOOTH SCROLL with easing ─── */
function easeInOutQuart(t) {
  return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
}

function smoothScrollTo(targetY, duration) {
  const startY = window.scrollY;
  const diff = targetY - startY;
  let startTime = null;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, startY + diff * easeInOutQuart(progress));
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

document.querySelectorAll('a[href^="#"]').forEach(function(link) {
  link.addEventListener('click', function(e) {
    const id = this.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    const navH = document.querySelector('nav').offsetHeight;
    const targetY = target.getBoundingClientRect().top + window.scrollY - navH - 12;
    smoothScrollTo(targetY, 900);

    // close mobile menu if open
    closeMobileMenu();
  });
});

/* ─── NAV SCROLL SHADOW ─── */
const nav = document.querySelector('nav');
window.addEventListener('scroll', function() {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ─── MOBILE HAMBURGER NAV ─── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

function closeMobileMenu() {
  if (!mobileMenu) return;
  mobileMenu.classList.remove('open');
  hamburger.classList.remove('open');
  document.body.style.overflow = '';
}

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', function() {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  mobileMenu.addEventListener('click', function(e) {
    if (e.target === mobileMenu) closeMobileMenu();
  });
}

/* ─── SCROLL-TRIGGERED FADE-UP ─── */
const fadeEls = document.querySelectorAll('.fade-up');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  fadeEls.forEach(function(el) { observer.observe(el); });
} else {
  /* fallback: show all immediately */
  fadeEls.forEach(function(el) { el.classList.add('visible'); });
}

/* ─── FORM VALIDATION & SUBMISSION ─── */
const form = document.getElementById('contactForm');
const successMsg = document.getElementById('formSuccess');

function showError(input, msg) {
  input.classList.add('error');
  const err = input.parentElement.querySelector('.field-error');
  if (err) { err.textContent = msg; err.classList.add('visible'); }
}

function clearError(input) {
  input.classList.remove('error');
  const err = input.parentElement.querySelector('.field-error');
  if (err) err.classList.remove('visible');
}

function validateEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

if (form) {
  /* live clear on input */
  form.querySelectorAll('input, select').forEach(function(el) {
    el.addEventListener('input', function() { clearError(this); });
    el.addEventListener('change', function() { clearError(this); });
  });

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    let valid = true;

    const company = form.querySelector('[name="company"]');
    const name    = form.querySelector('[name="name"]');
    const email   = form.querySelector('[name="email"]');
    const phone   = form.querySelector('[name="phone"]');
    const empSize = form.querySelector('[name="employees"]');
    const movein  = form.querySelector('[name="movein"]');

    [company, name, email, phone, empSize, movein].forEach(clearError);

    if (!company.value.trim()) { showError(company, 'Company name is required'); valid = false; }
    if (!name.value.trim())    { showError(name,    'Your name is required');     valid = false; }
    if (!email.value.trim() || !validateEmail(email.value)) {
      showError(email, 'A valid business email is required'); valid = false;
    }
    if (!phone.value.trim())   { showError(phone,   'Phone number is required'); valid = false; }
    if (!empSize.value)        { showError(empSize,  'Please select a range');   valid = false; }
    if (!movein.value)         { showError(movein,   'Please select a timeframe'); valid = false; }

    if (!valid) return;

    const btn = form.querySelector('.btn-submit');
    btn.disabled = true;
    btn.textContent = 'Sending…';

    /* Simulate async submission — replace with real endpoint when ready */
    setTimeout(function() {
      form.style.display = 'none';
      if (successMsg) successMsg.classList.add('visible');
    }, 1200);
  });
}

/* ─── SUBTLE HERO PARALLAX ─── */
const heroBg = document.querySelector('.hero-bg');
if (heroBg) {
  window.addEventListener('scroll', function() {
    const offset = window.scrollY;
    if (offset < window.innerHeight) {
      heroBg.style.transform = 'translateY(' + offset * 0.25 + 'px)';
    }
  }, { passive: true });
}
