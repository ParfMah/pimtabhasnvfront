/* ============================================================
   PIMTABHAS — Shared Components (Header / Footer)
   Inclus dans toutes les pages via ce fichier JS
   ============================================================ */

'use strict';

(function () {

  // ── HEADER ──────────────────────────────────────────────────
  const HEADER_HTML = `
<div class="top-bar" role="complementary">
  <div class="top-bar__scroll">
    <span>🌿 Consultations en ligne disponibles 7j/7</span>
    <span>📦 Livraison internationale vers toute l'Afrique et la diaspora</span>
    <span>✨ Produits 100% naturels certifiés</span>
    <span>🌍 Accompagnement holistique personnalisé</span>
    <span>🌿 Consultations en ligne disponibles 7j/7</span>
    <span>📦 Livraison internationale vers toute l'Afrique et la diaspora</span>
    <span>✨ Produits 100% naturels certifiés</span>
    <span>🌍 Accompagnement holistique personnalisé</span>
  </div>
  <div class="top-bar__contacts">
    <a href="tel:+22901957111552">📞 +229 01 95 71 11 52</a>
    <a href="mailto:contact.pimtabhas@gmail.com">✉ contact.pimtabhas@gmail.com</a>
  </div>
</div>

<header class="site-header site-header--scrolled" role="banner">
  <div class="header-inner">
    <a href="../index.html" class="header-logo" aria-label="PIMTABHAS — Accueil">
      <img src="../assets/images/logo.svg" alt="Logo PIMTABHAS" class="header-logo__img"/>
      <div class="header-logo__text">
        <span class="header-logo__name">PIMTABHAS</span>
        <span class="header-logo__tagline">Bien-être · Tradition · Spiritualité</span>
      </div>
    </a>

    <nav class="header-nav" role="navigation" aria-label="Navigation principale">
      <div class="nav-item"><a href="../index.html" class="nav-link">Accueil</a></div>
      <div class="nav-item">
        <a href="about.html" class="nav-link">À Propos ▾</a>
        <div class="dropdown">
          <a href="about.html" class="dropdown__item">Notre Mission</a>
          <a href="founder.html" class="dropdown__item">Le Fondateur</a>
          <a href="about.html#representations" class="dropdown__item">Nos Représentations</a>
        </div>
      </div>
      <div class="nav-item">
        <a href="services.html" class="nav-link">Services ▾</a>
        <div class="dropdown">
          <a href="services.html" class="dropdown__item">Tous nos Services</a>
          <a href="consultations.html" class="dropdown__item">Consultations</a>
          <a href="consultation-spirituelle.html" class="dropdown__item">Consultation Spirituelle</a>
          <a href="consultation-divinatoire.html" class="dropdown__item">Consultation Divinatoire</a>
        </div>
      </div>
      <div class="nav-item"><a href="boutique.html" class="nav-link">Boutique</a></div>
      <div class="nav-item">
        <a href="blog.html" class="nav-link">Blog ▾</a>
        <div class="dropdown">
          <a href="blog.html" class="dropdown__item">Articles</a>
          <a href="temoignages.html" class="dropdown__item">Témoignages</a>
          <a href="faq.html" class="dropdown__item">FAQ</a>
        </div>
      </div>
      <div class="nav-item"><a href="contact.html" class="nav-link">Contact</a></div>
    </nav>

    <div class="header-actions">
      <a href="boutique.html#panier" class="header-cart" aria-label="Panier">
        🛒<span class="cart-badge" style="display:none">0</span>
      </a>
      <div data-auth="logged-out">
        <a href="espace-client.html" class="btn btn--outline-gold btn--sm">Connexion</a>
      </div>
      <div data-auth="logged-in" style="display:none">
        <a href="espace-client.html" class="btn btn--outline-gold btn--sm">Mon Espace</a>
      </div>
      <button class="burger" aria-label="Menu" aria-expanded="false">
        <span class="burger__line"></span>
        <span class="burger__line"></span>
        <span class="burger__line"></span>
      </button>
    </div>
  </div>
</header>

<nav id="mobile-menu" class="mobile-menu" role="navigation" aria-label="Navigation mobile">
  <button class="mobile-menu__close" style="position:absolute;top:1.5rem;right:1.5rem;background:rgba(255,255,255,.1);border:none;width:44px;height:44px;border-radius:50%;color:white;font-size:1.5rem;cursor:pointer;" aria-label="Fermer">✕</button>
  <div class="mobile-menu__nav">
    <a href="../index.html" class="mobile-nav-link">Accueil</a>
    <a href="about.html" class="mobile-nav-link">À Propos</a>
    <a href="founder.html" class="mobile-nav-link">Le Fondateur</a>
    <a href="services.html" class="mobile-nav-link">Nos Services</a>
    <a href="consultations.html" class="mobile-nav-link">Consultations</a>
    <a href="boutique.html" class="mobile-nav-link">Boutique</a>
    <a href="blog.html" class="mobile-nav-link">Blog</a>
    <a href="temoignages.html" class="mobile-nav-link">Témoignages</a>
    <a href="contact.html" class="mobile-nav-link">Contact</a>
  </div>
  <div style="display:flex;flex-direction:column;gap:.75rem;margin-top:auto">
    <a href="espace-client.html" class="btn btn--primary btn--lg">Mon Espace Client</a>
    <a href="consultations.html" class="btn btn--outline-cream btn--lg">Prendre Rendez-vous</a>
  </div>
</nav>`;

  // ── FOOTER ──────────────────────────────────────────────────
  const FOOTER_HTML = `
<footer class="site-footer" role="contentinfo">
  <div class="footer-stripe" aria-hidden="true"></div>
  <div class="footer-top">
    <div class="footer-brand">
      <img src="../assets/images/logo.svg" alt="Logo PIMTABHAS" class="footer-brand__logo"/>
      <p class="footer-brand__desc">Plateforme Internationale de Médecine Traditionnelle Africaine, de Bien-être Holistique et d'Accompagnement Spirituel — fondée par le Grand Maître Idelphonse KPALIKA.</p>
      <div class="footer-social">
        <a href="#" class="footer-social__link" aria-label="Facebook">f</a>
        <a href="#" class="footer-social__link" aria-label="Instagram">📷</a>
        <a href="#" class="footer-social__link" aria-label="YouTube">▶</a>
        <a href="#" class="footer-social__link" aria-label="WhatsApp" onclick="openWhatsApp();return false">💬</a>
      </div>
    </div>
    <div class="footer-col">
      <h3 class="footer-col__title">Services</h3>
      <nav class="footer-links">
        <a href="consultations.html">Consultations Traditionnelles</a>
        <a href="consultation-spirituelle.html">Accompagnement Spirituel</a>
        <a href="consultation-divinatoire.html">Consultation Divinatoire</a>
        <a href="boutique.html">Boutique Naturelle</a>
        <a href="espace-client.html">Suivi Personnalisé</a>
      </nav>
    </div>
    <div class="footer-col">
      <h3 class="footer-col__title">Informations</h3>
      <nav class="footer-links">
        <a href="about.html">À Propos</a>
        <a href="founder.html">Le Fondateur</a>
        <a href="blog.html">Blog & Articles</a>
        <a href="temoignages.html">Témoignages</a>
        <a href="faq.html">FAQ</a>
        <a href="contact.html">Contactez-nous</a>
      </nav>
    </div>
    <div class="footer-col">
      <h3 class="footer-col__title">Contact</h3>
      <div class="footer-contact-item"><span class="icon">📍</span><div>Cotonou, Bénin<br/><small style="opacity:.6">Siège principal</small></div></div>
      <div class="footer-contact-item"><span class="icon">📞</span><a href="tel:+22901957111552" style="color:rgba(248,246,240,.65);text-decoration:none">+229 01 95 71 11 52</a></div>
      <div class="footer-contact-item"><span class="icon">✉️</span><a href="mailto:contact.pimtabhas@gmail.com" style="color:rgba(248,246,240,.65);text-decoration:none">contact.pimtabhas@gmail.com</a></div>
      <div class="footer-contact-item"><span class="icon">⏰</span><div>Lun – Sam : 8h – 20h</div></div>
      <div style="margin-top:var(--space-5)"><a href="suivi-commande.html" class="btn btn--outline-gold btn--sm">📦 Suivi de commande</a></div>
    </div>
  </div>
  <div class="footer-mid">
    <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:var(--space-6)">
      <div>
        <h4 style="font-family:var(--font-accent);font-size:var(--text-xs);letter-spacing:.15em;text-transform:uppercase;color:var(--color-gold);margin-bottom:var(--space-2)">Newsletter</h4>
        <p style="font-size:var(--text-sm);color:rgba(248,246,240,.6)">Recevez nos conseils &amp; actualités</p>
      </div>
      <form class="footer-newsletter" data-newsletter novalidate>
        <input class="form-control form-control--dark" type="email" placeholder="Votre email…" required aria-label="Email newsletter"/>
        <button type="submit" class="btn btn--primary btn--sm" style="flex-shrink:0">S'abonner</button>
      </form>
    </div>
  </div>
  <div class="footer-bottom">
    <p class="footer-bottom__copy">© <span class="current-year"></span> PIMTABHAS — Idelphonse KPALIKA. Tous droits réservés.</p>
    <nav class="footer-bottom__links">
      <a href="politique-confidentialite.html">Confidentialité</a>
      <a href="conditions-generales.html">CGV</a>
      <a href="mentions-legales.html">Mentions légales</a>
    </nav>
  </div>
</footer>

<div class="whatsapp-float">
  <div class="whatsapp-bubble">Besoin d'aide ? Écrivez-nous !</div>
  <a href="#" class="whatsapp-btn" onclick="openWhatsApp();return false" aria-label="WhatsApp">💬</a>
</div>
<button id="scroll-top" aria-label="Retour en haut">↑</button>`;

  // ── INJECT ───────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    const headerEl = document.getElementById('site-header-placeholder');
    if (headerEl) headerEl.outerHTML = HEADER_HTML;

    const footerEl = document.getElementById('site-footer-placeholder');
    if (footerEl) footerEl.outerHTML = FOOTER_HTML;

    // Année courante
    document.querySelectorAll('.current-year').forEach(el => {
      el.textContent = new Date().getFullYear();
    });
  });

})();
