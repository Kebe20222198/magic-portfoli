# 🚀 Guide d'Optimisation Performance & Cache

Ce document détaille toutes les optimisations effectuées sur le portfolio magic-portfolio pour maximiser la performance et implémenter une stratégie de cache complète.

---

## 📋 Table des matières

1. [Configuration Next.js](#1-configuration-nextjs)
2. [Service Worker](#2-service-worker)
3. [Revalidation ISR](#3-revalidation-isr)
4. [Cache Headers](#4-cache-headers)
5. [Métriques & Monitoring](#5-métriques--monitoring)
6. [Dépannage](#6-dépannage)

---

## 1. Configuration Next.js

### 📝 Fichier : `next.config.mjs`

#### Optimisations appliquées :

### 🖼️ Images

```javascript
images: {
  formats: ["image/avif", "image/webp"],  // Formats modernes (30-35% plus petits)
  minimumCacheTTL: 31536000,               // Cache 1 an
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
}
```

**Bénéfices :**
- ✅ Images AVIF/WebP automatiquement converties
- ✅ Responsive images avec sizes optimisés
- ✅ Cache agressif pour images immuables

### 📦 Compression & Minification

```javascript
compress: true,                    // Gzip activé
productionBrowserSourceMaps: false, // Réduit la taille (pas de source maps en prod)
swcMinify: true,                   // Minification SWC (plus rapide que Terser)
poweredByHeader: false,            // Sécurité (cache le header "X-Powered-By")
reactStrictMode: true,             // Détection de bugs en dev
```

### 🔒 Experimental Features

```javascript
experimental: {
  optimizePackageImports: ["@once-ui-system/core", "react-icons"],
  // Tree-shaking optimisé : importe seulement les composants utilisés
}
```

---

## 2. Service Worker

### 📝 Fichier : `public/sw.js`

Le Service Worker implémente **4 stratégies de cache différentes** :

### 1️⃣ Cache-First (Images & Rapports)

```javascript
// Pour : /images/*, /Rapports/*
// Stratégie : Cache d'abord, réseau en fallback
// Idéal pour : Ressources immuables
```

**Avantages :**
- ⚡ Chargement instantané depuis le cache
- 📴 Fonctionne hors ligne
- 💾 Réduit la bande passante

**Quand l'utiliser :**
- Images avec noms hachés (ex: image-abc123.jpg)
- Fichiers statiques qui ne changent jamais

### 2️⃣ Network-First (Pages HTML)

```javascript
// Pour : Pages HTML principales (/, /blog/, /work/, etc.)
// Stratégie : Réseau d'abord, cache en fallback
// Idéal pour : Contenu qui doit être à jour
```

**Avantages :**
- 🔄 Toujours la version la plus récente
- 📴 Version en cache si hors ligne
- ✅ Meilleure fraîcheur des données

**Quand l'utiliser :**
- Pages de contenu
- Pages qui changent régulièrement
- Articles de blog

### 3️⃣ Stale-While-Revalidate (Assets)

```javascript
// Pour : CSS, JS, Fonts
// Stratégie : Cache immédiat + mise à jour en arrière-plan
// Idéal pour : Assets avec versioning
```

**Avantages :**
- ⚡ Chargement ultra-rapide du cache
- 🔄 Mise à jour silencieuse en arrière-plan
- 🎯 Expérience utilisateur optimale

### 4️⃣ Network-First par défaut

```javascript
// Stratégie générale pour tout ce qui n'a pas de règle spécifique
// Permet la flexibilité et la fallback appropriée
```

### 🔄 Versioning du Cache

```javascript
const CACHE_VERSION = "v1.0.0";  // Incrémenter pour invalider tout le cache

// Pour forcer l'invalidation :
// 1. Incrémenter CACHE_VERSION
// 2. Tous les anciens caches seront supprimés à l'activation
// 3. Redéployer l'application
```

### 📝 Composant : `src/components/ServiceWorkerRegistration.tsx`

Enregistrement et gestion du Service Worker avec :

```typescript
// ✅ Enregistrement automatique après 2 secondes (non-bloquant)
// ✅ Vérification des mises à jour toutes les heures
// ✅ Gestion des nouvelles versions disponibles
// ✅ Fallback silencieux si SW non supporté
```

**Intégration :** Automatiquement inclus dans `layout.tsx` (exécution côté client)

---

## 3. Revalidation ISR

### 📝 Incremental Static Regeneration

ISR combine SSG (Static Site Generation) et dynamique pour:
- ✅ Performance de contenu statique
- ✅ Fraîcheur du contenu dynamique
- ✅ Pas de rebuild complet

### Pages et timing :

| Page | `revalidate` | Justification |
|------|-------------|---------------|
| `/` (Home) | 86400s (24h) | Contenu relativement statique |
| `/about` | 86400s (24h) | Contenu personnel, rarement changé |
| `/work` | 86400s (24h) | Portfolio, changements peu fréquents |
| `/work/[slug]` | 86400s (24h) | Articles de projets, actualisés monthly |
| `/blog` | 43200s (12h) | Liste de posts, peut être modifiée |
| `/blog/[slug]` | 43200s (12h) | Articles de blog, mise à jour rapide |

### Comment ça fonctionne :

```
1. Utilisateur visite page → revalidation timer commence
2. Première visite : SSG (génération statique)
3. Si < 43200s depuis dernier build : cache statique
4. Si > 43200s depuis dernier build : régénération en arrière-plan
5. Utilisateur reçoit l'ancienne version (rapide)
6. Prochaine visite : nouvelle version disponible
```

**Avantages :**
- 🚀 Vitesse SSG pour toutes les pages
- 🔄 Contenu à jour sans attendre
- 💰 Pas de requêtes serveur continues

---

## 4. Cache Headers

### 📝 Fichier : `next.config.mjs` - `async headers()`

### Images Statiques
```
Path: /images/:path*
Header: Cache-Control: public, max-age=31536000, immutable
Durée: 1 an (immuable = contenu ne change jamais)
```

### Rapports & PDFs
```
Path: /Rapports/:path*
Header: Cache-Control: public, max-age=2592000, must-revalidate
Durée: 30 jours (peut être mis à jour)
```

### Assets Statiques
```
Path: /static/:path*
Header: Cache-Control: public, max-age=31536000, immutable
Durée: 1 an
```

### Service Worker
```
Path: /sw.js
Header: Cache-Control: public, max-age=0, must-revalidate
Durée: Pas de cache (toujours récent)
Raison: Critique pour les mises à jour
```

### Pages HTML
```
Path: /:path*
Header: Cache-Control: public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800
Durée: 24h (navigateur) + 7j (serveur/CDN)
```

### 🔐 Headers de Sécurité

```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

---

## 5. Métriques & Monitoring

### 📊 Core Web Vitals à mesurer

| Métrique | Cible | Outil |
|----------|-------|-------|
| **LCP** (Largest Contentful Paint) | < 2.5s | Lighthouse, PageSpeed |
| **FID** (First Input Delay) | < 100ms | Chrome DevTools |
| **CLS** (Cumulative Layout Shift) | < 0.1 | Lighthouse |
| **TTFB** (Time to First Byte) | < 600ms | Ping, Lighthouse |

### 🔍 Outils de monitoring

```bash
# Lighthouse (local)
npm run build
npm run start
# Puis : Chrome DevTools → Lighthouse

# PageSpeed Insights (online)
# https://pagespeed.web.dev/

# WebPageTest
# https://www.webpagetest.org/

# Chrome DevTools
# F12 → Network → Performance
```

### 📈 Statistiques attendues après optimisation

| Métrique | Avant | Après | Gain |
|----------|-------|-------|------|
| Size JS | ~200KB | ~150KB | -25% |
| Size Images | ~5MB | ~2-3MB | -40% |
| LCP | ~3.5s | ~1.8s | -49% |
| Cache Hit | 0% | ~80% | ∞ |

---

## 6. Dépannage

### ❌ Le Service Worker n'est pas enregistré

```javascript
// ✅ Solution
// 1. Vérifier console du navigateur : F12 → Console
// 2. Vérifier support SW : console.log("serviceWorker" in navigator)
// 3. SW ne fonctionne qu'en HTTPS (sauf localhost)
// 4. Vérifier que /sw.js existe et est accessible
```

### ❌ Les changements ne sont pas visibles

```javascript
// ✅ Solution
// 1. Incrémenter CACHE_VERSION dans sw.js
// 2. Hard refresh : Ctrl+Shift+R (Windows) ou Cmd+Shift+R (Mac)
// 3. Supprimer cache : DevTools → Application → Cache Storage → Delete all
// 4. Vérifier revalidate time (si > 12h, attendre ou force rebuild)
```

### ❌ Les images ne sont pas optimisées

```javascript
// ✅ Solution
// 1. Utiliser <Image> de next/image au lieu de <img>
// 2. Vérifier formats supportés dans next.config.mjs
// 3. Next génère automatiquement AVIF/WebP au build
// 4. Vérifier les images sont dans /public/images/
```

### ❌ Performance lente en développement

```bash
# ✅ Solution
# Dev mode = pas d'optimisation, c'est normal

# Pour tester optimisations :
npm run build      # Buildoptimisé
npm run start      # Produit mode

# Puis tester avec Lighthouse
```

### ❌ Fichiers source maps exposés en prod

```javascript
// ✅ Solution
// Source maps désactivés dans next.config.mjs :
// productionBrowserSourceMaps: false  ✅

// Vérifier :
// Network Tab → Fichiers.js → pas de .map
```

---

## 🎯 Checklist de Performance

- [x] Service Worker enregistré et fonctionnel
- [x] Images optimisées (AVIF/WebP)
- [x] Cache headers correctement configurés
- [x] ISR revalidate appliquée à toutes les pages
- [x] Compression gzip activée
- [x] Source maps désactivées en prod
- [x] Headers de sécurité ajoutés
- [x] SWC minify activé
- [x] Package imports optimisés
- [x] React Strict Mode en dev

---

## 📚 Ressources utiles

- [Next.js Image Optimization](https://nextjs.org/docs/basic-features/image-optimization)
- [Next.js Cache Headers](https://nextjs.org/docs/app/api-reference/next-config-js/headers)
- [Service Workers MDN](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [ISR Documentation](https://nextjs.org/docs/basic-features/data-fetching#incremental-static-regeneration)
- [Web Vitals](https://web.dev/vitals/)
- [Cache Headers Guide](https://www.keycdn.com/blog/http-cache-headers)

---

## 🚀 Déploiement

### Vercel (recommandé pour Next.js)

```bash
# Vercel gère automatiquement :
# ✅ AVIF/WebP optimization
# ✅ Image caching (Edge Networks)
# ✅ Compression gzip
# ✅ ISR revalidation

vercel deploy --prod
```

### Netlify

```bash
# Même features que Vercel
# Build command: npm run build
# Publish directory: .next/standalone
```

### Docker / Self-hosted

```dockerfile
# Assurer que les headers sont servies par le reverse proxy
# (Nginx, Apache, etc.)

# Example Nginx config:
location / {
  proxy_pass http://next-app:3000;
  add_header Cache-Control "public, max-age=86400" always;
}
```

---

**Dernière mise à jour :** 2024
**Auteur :** Optimisation Performance Next.js
**Version :** 1.0.0

