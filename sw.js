/* SafetyFirst Service Worker */
const APP_VERSION = 'v1';
const APP_CACHE = `safetyfirst-app-${APP_VERSION}`;
const RUNTIME_CACHE = 'safetyfirst-runtime';

// Core app shell to precache (local files only)
const APP_SHELL = [
  '/',
  '/index.html',
  '/index1.html',
  '/dashboard.html',
  '/kmap.html',
  '/lang.html',
  '/text.html',
  '/styles.css',
  '/script.js',
  '/translation.js',
  '/offline.html'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(APP_CACHE).then((cache) => cache.addAll(APP_SHELL))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((k) => k !== APP_CACHE && k !== RUNTIME_CACHE)
          .map((k) => caches.delete(k))
      );
      await self.clients.claim();
    })()
  );
});

function isSameOrigin(request) {
  try {
    return new URL(request.url).origin === self.location.origin;
  } catch (_) {
    return false;
  }
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  // App navigation requests: network-first, fallback to cache, then offline page
  if (request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const network = await fetch(request);
          const cache = await caches.open(RUNTIME_CACHE);
          cache.put(request, network.clone());
          return network;
        } catch (_) {
          const cached = await caches.match(request);
          return (
            cached || (await caches.match('/index1.html')) || (await caches.match('/offline.html'))
          );
        }
      })()
    );
    return;
  }

  // Same-origin static assets: cache-first
  if (isSameOrigin(request)) {
    const url = new URL(request.url);

    // Prefer SW-managed strategies by destination
    const destination = request.destination;

    if (['style', 'script', 'font', 'image'].includes(destination)) {
      event.respondWith(
        caches.match(request).then((cached) => {
          const fetchAndCache = fetch(request)
            .then((response) => {
              const copy = response.clone();
              caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, copy));
              return response;
            })
            .catch(() => cached);
          return cached || fetchAndCache;
        })
      );
      return;
    }

    // JSON/lang or other fetches: stale-while-revalidate
    if (url.pathname.startsWith('/lang/') || destination === 'json' || destination === '') {
      event.respondWith(
        (async () => {
          const cache = await caches.open(RUNTIME_CACHE);
          const cached = await cache.match(request);
          const networkPromise = fetch(request)
            .then((response) => {
              cache.put(request, response.clone());
              return response;
            })
            .catch(() => undefined);
          return cached || (await networkPromise) || (await caches.match('/offline.html'));
        })()
      );
      return;
    }
  }

  // Cross-origin or anything else: network-first with fallback to cache
  event.respondWith(
    (async () => {
      try {
        const network = await fetch(request);
        const cache = await caches.open(RUNTIME_CACHE);
        cache.put(request, network.clone());
        return network;
      } catch (_) {
        const cached = await caches.match(request);
        return cached || Response.error();
      }
    })()
  );
});
