/* ─── SMOOTH SCROLL with easing ─── */
function easeOutExpo(t) {
  return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

var _scrollRaf = null;

function smoothScrollTo(targetY, duration) {
  if (_scrollRaf) cancelAnimationFrame(_scrollRaf);

  var startY = window.scrollY;
  var diff = targetY - startY;
  var startTime = null;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    var elapsed = timestamp - startTime;
    var progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, startY + diff * easeOutExpo(progress));
    if (progress < 1) {
      _scrollRaf = requestAnimationFrame(step);
    } else {
      _scrollRaf = null;
    }
  }
  _scrollRaf = requestAnimationFrame(step);
}

document.querySelectorAll('a[href^="#"]').forEach(function(link) {
  link.addEventListener('click', function(e) {
    var id = this.getAttribute('href').slice(1);
    var target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    var navH = document.querySelector('nav').offsetHeight;
    var targetY = target.getBoundingClientRect().top + window.scrollY - navH - 12;
    smoothScrollTo(targetY, 1050);
    closeMobileMenu();
  });
});

/* ─── NAV SCROLL SHADOW ─── */
var nav = document.querySelector('nav');
if (nav) {
  window.addEventListener('scroll', function() {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

/* ─── HERO PARALLAX ─── */
var heroBg = document.querySelector('.hero-bg');
if (heroBg) {
  window.addEventListener('scroll', function() {
    if (window.scrollY < window.innerHeight) {
      heroBg.style.transform = 'translateY(' + window.scrollY * 0.25 + 'px)';
    }
  }, { passive: true });
}

/* ─── MOBILE HAMBURGER NAV ─── */
var hamburger = document.getElementById('hamburger');
var mobileMenu = document.getElementById('mobileMenu');

function closeMobileMenu() {
  if (!mobileMenu) return;
  mobileMenu.classList.remove('open');
  if (hamburger) {
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }
  document.body.style.overflow = '';
}

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', function() {
    var isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });
  mobileMenu.addEventListener('click', function(e) {
    if (e.target === mobileMenu) closeMobileMenu();
  });
}

/* ─── SCROLL-TRIGGERED FADE-UP ─── */
var fadeEls = document.querySelectorAll('.fade-up');
if ('IntersectionObserver' in window) {
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  fadeEls.forEach(function(el) { observer.observe(el); });
} else {
  fadeEls.forEach(function(el) { el.classList.add('visible'); });
}

/* ─── FORM VALIDATION ─── */
var form = document.getElementById('contactForm');
var successMsg = document.getElementById('formSuccess');

function showError(input, msg) {
  input.classList.add('error');
  input.setAttribute('aria-invalid', 'true');
  var err = input.parentElement.querySelector('.field-error');
  if (err) { err.textContent = msg; err.classList.add('visible'); }
}
function clearError(input) {
  input.classList.remove('error');
  input.removeAttribute('aria-invalid');
  var err = input.parentElement.querySelector('.field-error');
  if (err) err.classList.remove('visible');
}
function validateEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

if (form) {
  form.querySelectorAll('input, select').forEach(function(el) {
    el.addEventListener('input', function() { clearError(this); });
    el.addEventListener('change', function() { clearError(this); });
  });

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    var valid = true;
    var company = form.querySelector('[name="company"]');
    var name    = form.querySelector('[name="name"]');
    var email   = form.querySelector('[name="email"]');
    var phone   = form.querySelector('[name="phone"]');
    var empSize = form.querySelector('[name="employees"]');
    var movein  = form.querySelector('[name="movein"]');

    [company, name, email, phone, empSize, movein].forEach(clearError);

    if (!company.value.trim()) { showError(company, 'Company name is required'); valid = false; }
    if (!name.value.trim())    { showError(name, 'Your name is required'); valid = false; }
    if (!email.value.trim() || !validateEmail(email.value)) {
      showError(email, 'A valid business email is required'); valid = false;
    }
    if (!phone.value.trim())   { showError(phone, 'Phone number is required'); valid = false; }
    if (!empSize.value)        { showError(empSize, 'Please select a range'); valid = false; }
    if (!movein.value)         { showError(movein, 'Please select a timeframe'); valid = false; }
    if (!valid) return;

    var btn = form.querySelector('.btn-submit');
    btn.disabled = true;
    btn.textContent = 'Sending…';

    setTimeout(function() {
      form.style.display = 'none';
      if (successMsg) successMsg.classList.add('visible');
    }, 1200);
  });
}

