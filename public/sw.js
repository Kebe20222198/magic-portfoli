/**
 * Service Worker pour magic-portfolio
 * Stratégies :
 * - Cache-First : Images et assets statiques
 * - Network-First : Pages HTML (fraîcheur prioritaire)
 * - Stale-While-Revalidate : Blog posts et contenu
 */

const CACHE_VERSION = "v1.0.0"; // Incrémenter cette version pour invalider le cache
const STATIC_CACHE = `static-${CACHE_VERSION}`;
const IMAGES_CACHE = `images-${CACHE_VERSION}`;
const PAGES_CACHE = `pages-${CACHE_VERSION}`;
const API_CACHE = `api-${CACHE_VERSION}`;

// Assets statiques à mettre en cache au premier chargement
const STATIC_ASSETS = [
  "/",
  "/resume",
  "/favicon.ico",
];

// Installation du Service Worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch(() => {
        return Promise.resolve();
      });
    })
  );
  // Forcer l'activation immédiate
  self.skipWaiting();
});

// Activation du Service Worker
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Supprimer les anciens caches
          if (cacheName !== STATIC_CACHE &&
              cacheName !== IMAGES_CACHE &&
              cacheName !== PAGES_CACHE &&
              cacheName !== API_CACHE) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch - Gestion des stratégies de cache
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignorer les requêtes non-GET ou hors domaine
  if (request.method !== "GET") {
    return;
  }

  // 1. STRATÉGIE CACHE-FIRST pour les images (fraîcheur moins importante)
  if (url.pathname.startsWith("/images/") ||
      url.pathname.startsWith("/Rapports/") ||
      request.destination === "image") {
    return event.respondWith(
      caches.match(request).then((response) => {
        if (response) {
          return response;
        }

        return fetch(request).then((response) => {
          // Ne mettre en cache que les réponses 200 OK
          if (!response || response.status !== 200) {
            return response;
          }

          const responseToCache = response.clone();
          caches.open(IMAGES_CACHE).then((cache) => {
            cache.put(request, responseToCache);
          });
          return response;
        }).catch(() => {
          return new Response("Image non disponible", {
            status: 503,
            statusText: "Service Unavailable",
          });
        });
      })
    );
  }

  // 2. STRATÉGIE NETWORK-FIRST pour les pages (fraîcheur prioritaire)
  if (request.destination === "document" ||
      url.pathname === "/" ||
      url.pathname.startsWith("/resume")) {
    return event.respondWith(
      fetch(request)
        .then((response) => {
          // Ne mettre en cache que les réponses 200 OK
          if (!response || response.status !== 200) {
            return response;
          }

          const responseToCache = response.clone();
          caches.open(PAGES_CACHE).then((cache) => {
            cache.put(request, responseToCache);
          });
          return response;
        })
        .catch(() => {
          // Utiliser le cache si fetch échoue (offline)
          return caches.match(request).then((response) => {
            if (response) {
              return response;
            }
            // Fallback pour les pages non en cache
            return new Response("Page non disponible hors ligne", {
              status: 503,
              statusText: "Service Unavailable",
            });
          });
        })
    );
  }

  // 3. STRATÉGIE STALE-WHILE-REVALIDATE pour le CSS, JS, fonts
  if (request.destination === "style" ||
      request.destination === "script" ||
      request.destination === "font") {
    return event.respondWith(
      caches.match(request).then((response) => {
        const fetchPromise = fetch(request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(STATIC_CACHE).then((cache) => {
              cache.put(request, responseToCache);
            });
          }
          return networkResponse;
        });

        // Retourner le cache immédiatement, fetch en arrière-plan
        return response || fetchPromise;
      })
    );
  }

  // 4. STRATÉGIE PAR DÉFAUT - NETWORK-FIRST
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response && response.status === 200) {
          const responseToCache = response.clone();
          caches.open(API_CACHE).then((cache) => {
            cache.put(request, responseToCache);
          });
        }
        return response;
      })
      .catch(() => {
        return caches.match(request).catch(() => {
          return new Response("Ressource non disponible", {
            status: 503,
            statusText: "Service Unavailable",
          });
        });
      })
  );
});

// Gestion des messages depuis le client
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});


