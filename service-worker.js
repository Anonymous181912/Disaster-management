const CACHE_VERSION = 'v1';
const APP_SHELL = [
  'index.html',
  'index1.html',
  'dashboard.html',
  'kmap.html',
  'lang.html',
  'styles.css',
  'script.js',
  'translation.js',
  'manifest.webmanifest'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.map((key) => key !== CACHE_VERSION && caches.delete(key))
    ))
  );
  self.clients.claim();
});

// Network-first for HTML, cache-first for others
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const isHTML = request.destination === 'document' || (request.headers.get('accept') || '').includes('text/html');

  if (isHTML) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_VERSION).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        const copy = response.clone();
        caches.open(CACHE_VERSION).then((cache) => cache.put(request, copy));
        return response;
      });
    })
  );
});
