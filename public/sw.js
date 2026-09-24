const CACHE_NAME = 'quickforma-studio-v1';
const ASSETS_TO_CACHE = [
  '/studio',
  '/site.webmanifest',
  '/branding/apple-touch-icon.png',
  '/branding/icon-192.png',
  '/branding/icon-512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);

  // Skip Sanity API dynamic queries & CDN WebSocket calls from offline caching
  if (url.hostname.includes('sanity.io') || url.pathname.includes('/api/')) {
    return;
  }

  // Stale-while-revalidate strategy for studio shell
  if (url.pathname.startsWith('/studio')) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        const fetchPromise = fetch(event.request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const responseToCache = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseToCache));
            }
            return networkResponse;
          })
          .catch(() => cachedResponse);

        return cachedResponse || fetchPromise;
      })
    );
  }
});
