/* ============================================================
   PIMTABHAS — Admin JavaScript
   ============================================================ */

'use strict';

// ── PROTECTION ADMIN ────────────────────────────────────────
window.requireAdmin = function() {
  const token = localStorage.getItem('pimtabhas_token');
  const user  = (() => { try { return JSON.parse(localStorage.getItem('pimtabhas_user') || 'null'); } catch { return null; } })();

  if (!token || !user || user.role !== 'admin') {
    // En développement, on laisse passer pour la démo
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      console.warn('⚠️ Mode développement: accès admin sans authentification');
      return;
    }
    window.location.href = '../pages/espace-client.html';
  }
};

// ── SIDEBAR MOBILE ADMIN ─────────────────────────────────────
function initAdminSidebar() {
  const burger = document.getElementById('admin-burger');
  const sidebar = document.querySelector('.admin-sidebar');
  if (!burger || !sidebar) return;

  // Afficher burger sur mobile
  if (window.innerWidth <= 1024) {
    burger.style.display = 'block';
  }

  window.toggleAdminSidebar = function() {
    sidebar.classList.toggle('is-open');
  };

  // Fermer sidebar si clic extérieur
  document.addEventListener('click', (e) => {
    if (sidebar.classList.contains('is-open') &&
        !sidebar.contains(e.target) &&
        !burger.contains(e.target)) {
      sidebar.classList.remove('is-open');
    }
  });
}

// ── STATISTIQUES TEMPS RÉEL ──────────────────────────────────
async function loadDashboardStats() {
  try {
    const stats = await api.get('/admin/stats', true);
    const fields = {
      'stat-patients': stats.totalPatients,
      'stat-rdv':      stats.appointmentsThisMonth,
      'stat-orders':   stats.ordersThisMonth,
    };
    Object.entries(fields).forEach(([id, val]) => {
      const el = document.getElementById(id);
      if (el && val !== undefined) {
        animateCounter(el, val);
      }
    });
    if (stats.revenueThisMonth) {
      const el = document.getElementById('stat-revenue');
      if (el) el.textContent = formatRevenue(stats.revenueThisMonth);
    }
  } catch (err) {
    console.log('Stats unavailable (normal in dev mode)');
  }
}

function animateCounter(el, target) {
  let current = 0;
  const step  = target / 50;
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current).toLocaleString('fr-FR');
    if (current >= target) clearInterval(timer);
  }, 20);
}

function formatRevenue(amount) {
  if (amount >= 1000000) return (amount / 1000000).toFixed(1) + 'M';
  if (amount >= 1000)    return (amount / 1000).toFixed(0) + 'k';
  return amount.toLocaleString('fr-FR');
}

// ── GESTION DES RENDEZ-VOUS (ADMIN) ─────────────────────────
const AdminAppointments = {
  async getAll(params = {}) {
    const qs = new URLSearchParams(params).toString();
    return api.get(`/appointments?${qs}`, true);
  },

  async updateStatus(id, status) {
    return api.patch(`/appointments/${id}`, { status }, true);
  },

  async delete(id) {
    return api.delete(`/appointments/${id}`, true);
  },

  async create(data) {
    return api.post('/appointments', data, true);
  },

  async sendReminder(id) {
    return api.post(`/appointments/${id}/reminder`, {}, true);
  }
};

// ── GESTION DES PATIENTS (ADMIN) ─────────────────────────────
const AdminPatients = {
  async getAll(params = {}) {
    const qs = new URLSearchParams(params).toString();
    return api.get(`/users?${qs}`, true);
  },

  async getOne(id) {
    return api.get(`/users/${id}`, true);
  },

  async update(id, data) {
    return api.put(`/users/${id}`, data, true);
  },

  async delete(id) {
    return api.delete(`/users/${id}`, true);
  },

  async addNote(patientId, note) {
    return api.post(`/users/${patientId}/notes`, { note }, true);
  },

  async exportCSV() {
    const res = await fetch(`${window.API_BASE || '/api'}/users/export`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('pimtabhas_token')}` }
    });
    const blob = await res.blob();
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `patients_pimtabhas_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }
};

// ── GESTION DES COMMANDES (ADMIN) ────────────────────────────
const AdminOrders = {
  async getAll(params = {}) {
    const qs = new URLSearchParams(params).toString();
    return api.get(`/orders?${qs}`, true);
  },

  async getOne(id) {
    return api.get(`/orders/${id}`, true);
  },

  async updateStatus(id, status, trackingNumber = '') {
    return api.patch(`/orders/${id}`, { status, trackingNumber }, true);
  },

  async generateInvoice(id) {
    return api.get(`/orders/${id}/invoice`, true);
  },

  async exportCSV() {
    showToast('Export des commandes en cours…', 'info');
  }
};

// ── GESTION DES PRODUITS (ADMIN) ─────────────────────────────
const AdminProducts = {
  async getAll(params = {}) {
    const qs = new URLSearchParams(params).toString();
    return api.get(`/products?${qs}`, true);
  },

  async create(data) {
    return api.post('/products', data, true);
  },

  async update(id, data) {
    return api.put(`/products/${id}`, data, true);
  },

  async delete(id) {
    return api.delete(`/products/${id}`, true);
  },

  async toggleActive(id, active) {
    return api.patch(`/products/${id}`, { isActive: active }, true);
  },

  async updateStock(id, stock) {
    return api.patch(`/products/${id}`, { stock }, true);
  }
};

// ── GESTION DU BLOG (ADMIN) ───────────────────────────────────
const AdminBlog = {
  async getAll(params = {}) {
    const qs = new URLSearchParams(params).toString();
    return api.get(`/blog?${qs}`, true);
  },

  async create(data) {
    return api.post('/blog', data, true);
  },

  async update(id, data) {
    return api.put(`/blog/${id}`, data, true);
  },

  async delete(id) {
    return api.delete(`/blog/${id}`, true);
  },

  async publish(id) {
    return api.patch(`/blog/${id}`, { status: 'published', publishedAt: new Date().toISOString() }, true);
  },

  async unpublish(id) {
    return api.patch(`/blog/${id}`, { status: 'draft' }, true);
  }
};

// ── GESTION DES MESSAGES (ADMIN) ─────────────────────────────
const AdminMessages = {
  async getAll(params = {}) {
    const qs = new URLSearchParams(params).toString();
    return api.get(`/messages?${qs}`, true);
  },

  async reply(id, message) {
    return api.post(`/messages/${id}/reply`, { message }, true);
  },

  async markRead(id) {
    return api.patch(`/messages/${id}`, { isRead: true }, true);
  },

  async archive(id) {
    return api.patch(`/messages/${id}`, { status: 'archived' }, true);
  },

  async delete(id) {
    return api.delete(`/messages/${id}`, true);
  }
};

// ── TÉMOIGNAGES (ADMIN) ───────────────────────────────────────
const AdminTestimonials = {
  async getPending() {
    return api.get('/testimonials?status=pending', true);
  },

  async approve(id) {
    return api.patch(`/testimonials/${id}`, { status: 'approved' }, true);
  },

  async reject(id) {
    return api.patch(`/testimonials/${id}`, { status: 'rejected' }, true);
  },

  async delete(id) {
    return api.delete(`/testimonials/${id}`, true);
  }
};

// ── NEWSLETTER (ADMIN) ────────────────────────────────────────
const AdminNewsletter = {
  async getStats() {
    return api.get('/newsletter/stats', true);
  },

  async send(subject, content) {
    return api.post('/newsletter/send', { subject, content }, true);
  },

  async getSubscribers() {
    return api.get('/newsletter/subscribers', true);
  }
};

// ── UTILITAIRES ADMIN ─────────────────────────────────────────
window.adminUtils = {
  formatDate(date, options = {}) {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric', month: 'long', year: 'numeric', ...options
    });
  },

  formatDateTime(date) {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  },

  formatAmount(amount, currency = 'FCFA') {
    return amount.toLocaleString('fr-FR') + ' ' + currency;
  },

  statusBadge(status) {
    const map = {
      pending:    { label:'En attente',  color:'warning' },
      confirmed:  { label:'Confirmé',    color:'success' },
      processing: { label:'En préparation', color:'info' },
      shipped:    { label:'Expédiée',    color:'success' },
      delivered:  { label:'Livrée',      color:'success' },
      cancelled:  { label:'Annulée',     color:'error'   },
      published:  { label:'Publié',      color:'success' },
      draft:      { label:'Brouillon',   color:'warning' },
      approved:   { label:'Approuvé',    color:'success' },
      rejected:   { label:'Rejeté',      color:'error'   },
      done:       { label:'Terminé',     color:'gray'    },
    };
    const s = map[status] || { label: status, color: 'gray' };
    return `<span class="status-pill status-pill--${s.color}">${s.label}</span>`;
  },

  confirm(message) {
    return window.confirm(message);
  },

  async confirmAsync(message) {
    return new Promise(resolve => resolve(window.confirm(message)));
  },

  debounce: (fn, delay = 300) => {
    let timeout;
    return (...args) => { clearTimeout(timeout); timeout = setTimeout(() => fn(...args), delay); };
  }
};

// ── INIT ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initAdminSidebar();

  // Marquer lien actif dans la sidebar
  const currentPage = window.location.pathname.split('/').pop();
  document.querySelectorAll('.admin-nav__item').forEach(item => {
    const href = item.getAttribute('href');
    if (href && href.includes(currentPage)) {
      item.classList.add('active');
    }
  });

  // Charger stats si sur le dashboard
  if (currentPage === 'dashboard.html') {
    loadDashboardStats();
  }
});

// Exporter les modules admin
window.AdminAppointments  = AdminAppointments;
window.AdminPatients      = AdminPatients;
window.AdminOrders        = AdminOrders;
window.AdminProducts      = AdminProducts;
window.AdminBlog          = AdminBlog;
window.AdminMessages      = AdminMessages;
window.AdminTestimonials  = AdminTestimonials;
window.AdminNewsletter    = AdminNewsletter;
