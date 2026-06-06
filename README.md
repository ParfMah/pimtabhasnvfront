# 🌿 PIMTABHAS — Frontend

**Plateforme Internationale de Médecine Traditionnelle Africaine, de Bien-être Holistique et d'Accompagnement Spirituel**

Fondée par **Idelphonse KPALIKA** — Grand Maître Spirituel & Expert en Médecine Traditionnelle Africaine.

---

## 📁 Structure du Projet

```
frontend/
├── index.html                        # Page d'accueil
├── pages/
│   ├── about.html                    # À Propos
│   ├── founder.html                  # Le Fondateur
│   ├── services.html                 # Nos Services
│   ├── consultations.html            # Prise de RDV (avec calendrier)
│   ├── consultation-spirituelle.html # Consultation Spirituelle
│   ├── consultation-divinatoire.html # Consultation Divinatoire
│   ├── boutique.html                 # Boutique (filtres, panier)
│   ├── checkout.html                 # Tunnel de commande
│   ├── blog.html                     # Blog & Articles
│   ├── temoignages.html              # Témoignages clients
│   ├── faq.html                      # FAQ interactive
│   ├── contact.html                  # Contact
│   ├── espace-client.html            # Auth + Dashboard client
│   ├── suivi-commande.html           # Suivi de livraison
│   ├── politique-confidentialite.html
│   ├── conditions-generales.html
│   └── mentions-legales.html
├── admin/
│   ├── dashboard.html                # Admin — Vue d'ensemble
│   ├── rendez-vous.html              # Admin — Gestion RDV
│   ├── patients.html                 # Admin — Gestion patients
│   ├── commandes.html                # Admin — Gestion commandes
│   ├── produits.html                 # Admin — Gestion produits
│   ├── messages.html                 # Admin — Messagerie
│   └── blog.html                     # Admin — Éditeur articles
└── assets/
    ├── css/
    │   ├── variables.css             # Design tokens (couleurs, typo, spacing)
    │   ├── reset.css                 # Reset & base styles
    │   ├── typography.css            # Système typographique
    │   ├── components.css            # Composants réutilisables
    │   ├── layout.css                # Header, Footer, Grid
    │   ├── animations.css            # Keyframes & effets
    │   ├── pages.css                 # Styles page-spécifiques
    │   └── admin.css                 # Styles admin
    ├── js/
    │   ├── main.js                   # JS principal (cart, auth, API, utils)
    │   ├── components.js             # Header/Footer injectés dynamiquement
    │   └── admin.js                  # JS administration
    └── images/
        ├── logo.svg                  # Logo principal (fond sombre)
        ├── logo-light.svg            # Logo fond clair
        ├── favicon.svg               # Favicon
        └── pattern-adinkra.svg       # Motif décoratif africain
```

---

## 🎨 Design System

### Palette de couleurs
| Variable | Valeur | Usage |
|---|---|---|
| `--color-emerald` | `#0F6A4B` | Couleur principale |
| `--color-gold` | `#D4AF37` | Accentuation premium |
| `--color-night` | `#0F172A` | Fonds sombres |
| `--color-cream` | `#F8F6F0` | Fond principal |
| `--color-bronze` | `#8B5E3C` | Accent tertiaire |

### Typographie
- **Display/Titres** : Cormorant Garamond (serif élégant)
- **Premium** : Cinzel (majuscules stylisées)
- **UI/Interface** : DM Sans (lisibilité)
- **Corps de texte** : Source Serif 4

---

## 🚀 Installation & Démarrage

### Option 1 — Serveur local simple
```bash
# Avec Python
python3 -m http.server 3000

# Avec Node.js (npx)
npx serve . -p 3000

# Avec PHP
php -S localhost:3000
```

Puis ouvrir : `http://localhost:3000`

### Option 2 — Extension VS Code
Installer **Live Server** et cliquer sur "Go Live".

### Option 3 — Déploiement statique Netlify/Vercel
```bash
# Glisser-déposer le dossier frontend/ sur netlify.com/drop
# ou connecter le repository Git
```

---

## ⚙️ Configuration API

Dans `assets/js/main.js`, l'URL de l'API se configure automatiquement :

```javascript
const API_BASE = window.location.hostname === 'localhost'
  ? 'http://localhost:5000/api'   // Développement
  : '/api';                        // Production (même domaine)
```

Pour un backend sur un domaine différent en production, modifier :
```javascript
const API_BASE = 'https://votre-api.onrender.com/api';
```

---

## 📱 Fonctionnalités Clés

### 🛒 E-Commerce
- Boutique avec filtres (catégorie, prix, note, disponibilité)
- Panier drawer dynamique (localStorage)
- Tunnel de commande complet (adresse, livraison, paiement)
- Suivi de commande en temps réel
- Calcul automatique des frais de livraison par zone géographique

### 📅 Consultations
- Calendrier de réservation interactif
- 3 types de consultation avec tarifs
- 3 modes : en ligne, présentiel, téléphone
- Créneaux horaires disponibles/indisponibles
- Confirmation par email automatique

### 👤 Espace Client
- Authentification sécurisée (JWT)
- Tableau de bord complet
- Historique des rendez-vous et commandes
- Dossier patient confidentiel
- Messagerie avec le praticien
- Gestion du profil

### 🛡️ Administration
- Dashboard avec statistiques et graphiques
- Gestion complète RDV, patients, commandes, produits
- Messagerie bidirectionnelle avec templates
- Éditeur d'articles de blog WYSIWYG
- Exports CSV

### 🌍 Internationalisation
- Interface en français (langue principale)
- Affichage des prix en FCFA
- Support multidevises (EUR, USD, GBP)
- Livraison internationale configurable

---

## 🔒 Sécurité Frontend

- Tokens JWT stockés en `localStorage`
- Sanitisation XSS via `utils.sanitize()`
- Validation des formulaires côté client
- Protection CSRF par en-têtes custom
- Routes admin protégées par vérification de rôle

---

## 📲 Technologies

- **HTML5** pur — Sémantique et accessible
- **CSS3** pur — Variables CSS, Grid, Flexbox, Animations
- **JavaScript Vanilla** — ES6+, Fetch API, IntersectionObserver
- **Aucun framework** ni dépendance externe

---

## 🌐 Déploiement Production

### Netlify (recommandé pour frontend statique)
1. Connecter le repo Git sur `app.netlify.com`
2. Build command : (vide, site statique)
3. Publish directory : `frontend/`
4. Configurer les redirects dans `netlify.toml` :

```toml
[[redirects]]
  from = "/api/*"
  to = "https://votre-backend.onrender.com/api/:splat"
  status = 200
  force = true
```

### Render Static Site
1. Créer un "Static Site" sur `render.com`
2. Build command : (vide)
3. Publish directory : `frontend/`

---

## 📞 Support

- **Email** : contact@pimtabhas.com
- **WhatsApp** : +229 97 00 00 00
- **Site** : https://pimtabhas.com

---

*© 2025 PIMTABHAS — Idelphonse KPALIKA. Tous droits réservés.*
