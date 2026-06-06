/* ============================================================
   PIMTABHAS — Main JavaScript
   ============================================================ */

'use strict';

// ── LOADER ──────────────────────────────────────────────────
window.addEventListener('load', () => {
  const loader = document.getElementById('site-loader');
  if (loader) {
    setTimeout(() => loader.classList.add('fade-out'), 400);
    setTimeout(() => loader.remove(), 900);
  }
  document.body.classList.remove('preload');
  initAll();
});

function initAll() {
  initHeader();
  initMobileMenu();
  initScrollReveal();
  initParticles();
  initScrollToTop();
  initCounters();
  initParallax();
  initDropdowns();
  initToasts();
  setActivePage();
  initCartBadge();
}

// ── HEADER SCROLL ────────────────────────────────────────────
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const heroSection = document.querySelector('.hero');
  let ticking = false;

  function updateHeader() {
    const scrollY = window.scrollY;
    if (scrollY > 60) {
      header.classList.add('site-header--scrolled');
      header.classList.remove('site-header--transparent');
    } else {
      if (heroSection) {
        header.classList.remove('site-header--scrolled');
        header.classList.add('site-header--transparent');
      }
    }
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }, { passive: true });

  updateHeader();
}

// ── MENU MOBILE ──────────────────────────────────────────────
function initMobileMenu() {
  const burger = document.querySelector('.burger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileClose = document.querySelector('.mobile-menu__close');

  if (!burger || !mobileMenu) return;

  function openMenu() {
    burger.classList.add('is-open');
    mobileMenu.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    burger.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    burger.classList.remove('is-open');
    mobileMenu.classList.remove('is-open');
    document.body.style.overflow = '';
    burger.setAttribute('aria-expanded', 'false');
  }

  burger.addEventListener('click', () => {
    burger.classList.contains('is-open') ? closeMenu() : openMenu();
  });

  if (mobileClose) mobileClose.addEventListener('click', closeMenu);

  // Fermer sur ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // Fermer sur lien mobile
  mobileMenu.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

// ── SCROLL REVEAL ────────────────────────────────────────────
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal, .reveal--left, .reveal--right, .reveal--scale');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

// ── PARTICULES HERO ──────────────────────────────────────────
function initParticles() {
  const container = document.querySelector('.hero__particles');
  if (!container) return;

  const count = window.innerWidth < 768 ? 12 : 24;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      width: ${Math.random() * 4 + 2}px;
      height: ${Math.random() * 4 + 2}px;
      --duration: ${Math.random() * 8 + 6}s;
      --delay: -${Math.random() * 8}s;
      opacity: ${Math.random() * 0.6 + 0.1};
    `;
    container.appendChild(particle);
  }
}

// ── SCROLL TO TOP ────────────────────────────────────────────
function initScrollToTop() {
  const btn = document.getElementById('scroll-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('is-visible', window.scrollY > 500);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ── COMPTEURS ANIMÉS ─────────────────────────────────────────
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const duration = 2000;
      let start = 0;
      const step = timestamp => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        el.textContent = Math.floor(eased * target).toLocaleString() + suffix;
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

// ── PARALLAX ─────────────────────────────────────────────────
function initParallax() {
  const parallaxEls = document.querySelectorAll('[data-parallax]');
  if (!parallaxEls.length) return;

  let ticking = false;

  function update() {
    const scrollY = window.scrollY;
    parallaxEls.forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || 0.3;
      const rect = el.getBoundingClientRect();
      const offset = (rect.top + scrollY - window.innerHeight / 2) * speed;
      el.style.transform = `translateY(${offset}px)`;
    });
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
}

// ── DROPDOWNS ────────────────────────────────────────────────
function initDropdowns() {
  // Click en dehors pour fermer
  document.addEventListener('click', (e) => {
    document.querySelectorAll('.dropdown.is-open').forEach(d => {
      if (!d.closest('.nav-item').contains(e.target)) {
        d.classList.remove('is-open');
      }
    });
  });
}

// ── ACTIVE PAGE ──────────────────────────────────────────────
function setActivePage() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.includes(currentPath)) {
      link.classList.add('active');
    }
  });
}

// ── TOASTS ───────────────────────────────────────────────────
function initToasts() {
  if (!document.querySelector('.toast-container')) {
    const container = document.createElement('div');
    container.className = 'toast-container';
    container.setAttribute('aria-live', 'polite');
    document.body.appendChild(container);
  }
}

window.showToast = function(message, type = 'success', duration = 4000) {
  const container = document.querySelector('.toast-container');
  if (!container) return;

  const icons = { success: '✓', error: '✕', warning: '⚠', info: 'ℹ' };
  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.innerHTML = `
    <span style="font-size:1.1rem;opacity:0.8">${icons[type] || '•'}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(120%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, duration);
};

// ── CART BADGE ───────────────────────────────────────────────
function initCartBadge() {
  updateCartBadge();
}

function updateCartBadge() {
  const cart = getCart();
  const total = cart.reduce((sum, item) => sum + item.qty, 0);
  const badges = document.querySelectorAll('.cart-badge');
  badges.forEach(badge => {
    badge.textContent = total;
    badge.style.display = total > 0 ? 'flex' : 'none';
  });
}

// ── PANIER (CART) ─────────────────────────────────────────────
function getCart() {
  try {
    return JSON.parse(localStorage.getItem('pimtabhas_cart') || '[]');
  } catch { return []; }
}

function saveCart(cart) {
  localStorage.setItem('pimtabhas_cart', JSON.stringify(cart));
  updateCartBadge();
}

window.addToCart = function(product) {
  const cart = getCart();
  const existing = cart.find(i => i.id === product.id);
  if (existing) {
    existing.qty += product.qty || 1;
  } else {
    cart.push({ ...product, qty: product.qty || 1 });
  }
  saveCart(cart);
  showToast(`"${product.name}" ajouté au panier`, 'success');
  return cart;
};

window.removeFromCart = function(productId) {
  const cart = getCart().filter(i => i.id !== productId);
  saveCart(cart);
};

window.clearCart = function() {
  saveCart([]);
};

// ── API CLIENT ───────────────────────────────────────────────
const API_BASE = window.location.hostname === 'localhost'
  ? 'http://localhost:5000/api'
  : '/api';

window.api = {
  async request(method, endpoint, data = null, auth = false) {
    const headers = { 'Content-Type': 'application/json' };
    const token = localStorage.getItem('pimtabhas_token');
    if (auth && token) headers['Authorization'] = `Bearer ${token}`;

    const options = { method, headers };
    if (data) options.body = JSON.stringify(data);

    try {
      const res = await fetch(`${API_BASE}${endpoint}`, options);
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Erreur serveur');
      return json;
    } catch (err) {
      console.error(`API ${method} ${endpoint}:`, err);
      throw err;
    }
  },

  get:    (endpoint, auth) => window.api.request('GET',    endpoint, null, auth),
  post:   (endpoint, data, auth) => window.api.request('POST',   endpoint, data, auth),
  put:    (endpoint, data, auth) => window.api.request('PUT',    endpoint, data, auth),
  patch:  (endpoint, data, auth) => window.api.request('PATCH',  endpoint, data, auth),
  delete: (endpoint, auth) => window.api.request('DELETE', endpoint, null, auth),
};

// ── AUTH ─────────────────────────────────────────────────────
window.auth = {
  getToken: () => localStorage.getItem('pimtabhas_token'),
  getUser:  () => {
    try { return JSON.parse(localStorage.getItem('pimtabhas_user') || 'null'); }
    catch { return null; }
  },
  isLoggedIn: () => !!localStorage.getItem('pimtabhas_token'),
  isAdmin:    () => {
    const u = window.auth.getUser();
    return u && u.role === 'admin';
  },
  logout: () => {
    localStorage.removeItem('pimtabhas_token');
    localStorage.removeItem('pimtabhas_user');
    window.location.href = '/index.html';
  },
  updateUI: () => {
    const user = window.auth.getUser();
    const loggedInEls = document.querySelectorAll('[data-auth="logged-in"]');
    const loggedOutEls = document.querySelectorAll('[data-auth="logged-out"]');
    const userNameEls = document.querySelectorAll('[data-user="name"]');

    loggedInEls.forEach(el => el.style.display = user ? '' : 'none');
    loggedOutEls.forEach(el => el.style.display = user ? 'none' : '');
    userNameEls.forEach(el => { if (user) el.textContent = user.firstName || 'Mon compte'; });
  }
};

// Mettre à jour l'UI auth au chargement
document.addEventListener('DOMContentLoaded', () => window.auth.updateUI());

// ── UTILITAIRES ──────────────────────────────────────────────
window.utils = {
  formatPrice: (amount, currency = 'XOF') => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
    }).format(amount);
  },

  formatDate: (date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(new Date(date));
  },

  debounce: (fn, delay = 300) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn(...args), delay);
    };
  },

  throttle: (fn, limit = 100) => {
    let lastRun = 0;
    return (...args) => {
      const now = Date.now();
      if (now - lastRun >= limit) {
        lastRun = now;
        fn(...args);
      }
    };
  },

  slugify: (str) => str
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, ''),

  sanitize: (str) => {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  },

  validateEmail: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),

  validatePhone: (phone) => /^[\+]?[\d\s\-]{8,15}$/.test(phone),

  scrollTo: (selector) => {
    const el = document.querySelector(selector);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

// ── SMOOTH SCROLL LINKS ──────────────────────────────────────
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;
  const target = document.querySelector(link.getAttribute('href'));
  if (target) {
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});

// ── WHATSAPP ─────────────────────────────────────────────────
window.openWhatsApp = function(message = '') {
  const phone = '+22901957111552'; // À remplacer
  const encoded = encodeURIComponent(message || 'Bonjour, je souhaite prendre contact avec PIMTABHAS.');
  window.open(`https://wa.me/${phone}?text=${encoded}`, '_blank');
};

// ── MODAL UTILITAIRE ─────────────────────────────────────────
window.modal = {
  open: (id) => {
    const backdrop = document.getElementById(id);
    if (backdrop) {
      backdrop.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
  },
  close: (id) => {
    const backdrop = id
      ? document.getElementById(id)
      : document.querySelector('.modal-backdrop.is-open');
    if (backdrop) {
      backdrop.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  }
};

// Fermer modal sur backdrop click
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-backdrop')) window.modal.close();
  if (e.target.classList.contains('modal__close')) window.modal.close();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') window.modal.close();
});

// ── FORM VALIDATION ──────────────────────────────────────────
window.validateForm = function(formEl) {
  let isValid = true;
  const fields = formEl.querySelectorAll('[required]');

  fields.forEach(field => {
    const value = field.value.trim();
    field.classList.remove('is-invalid', 'is-valid');

    const parent = field.closest('.form-group');
    if (parent) {
      parent.querySelector('.form-error')?.remove();
    }

    if (!value) {
      field.classList.add('is-invalid');
      addError(field, 'Ce champ est requis');
      isValid = false;
    } else if (field.type === 'email' && !utils.validateEmail(value)) {
      field.classList.add('is-invalid');
      addError(field, 'Adresse email invalide');
      isValid = false;
    } else if (field.type === 'tel' && !utils.validatePhone(value)) {
      field.classList.add('is-invalid');
      addError(field, 'Numéro de téléphone invalide');
      isValid = false;
    } else {
      field.classList.add('is-valid');
    }
  });

  return isValid;
};

function addError(field, message) {
  const parent = field.closest('.form-group');
  if (!parent) return;
  const err = document.createElement('div');
  err.className = 'form-error';
  err.innerHTML = `<span>⚠</span> ${message}`;
  parent.appendChild(err);
}

// ── LAZY IMAGES ──────────────────────────────────────────────
function initLazyImages() {
  const images = document.querySelectorAll('img[data-src]');
  if (!images.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  }, { rootMargin: '200px' });

  images.forEach(img => observer.observe(img));
}

document.addEventListener('DOMContentLoaded', initLazyImages);

// ── NEWSLETTER FORM ──────────────────────────────────────────
document.addEventListener('submit', async (e) => {
  const form = e.target;
  if (!form.dataset.newsletter) return;
  e.preventDefault();

  const emailInput = form.querySelector('[type="email"]');
  const email = emailInput?.value.trim();

  if (!email || !utils.validateEmail(email)) {
    showToast('Veuillez saisir une adresse email valide.', 'error');
    return;
  }

  const btn = form.querySelector('[type="submit"]');
  if (btn) { btn.disabled = true; btn.classList.add('btn--loading'); }

  try {
    await api.post('/newsletter/subscribe', { email });
    showToast('Inscription réussie ! Bienvenue dans notre communauté.', 'success');
    form.reset();
  } catch {
    showToast('Une erreur est survenue. Veuillez réessayer.', 'error');
  } finally {
    if (btn) { btn.disabled = false; btn.classList.remove('btn--loading'); }
  }
});

console.log('%c🌿 PIMTABHAS', 'font-size:20px;color:#0F6A4B;font-weight:bold');
console.log('%cPlateforme Internationale de Médecine Traditionnelle Africaine', 'color:#D4AF37');
