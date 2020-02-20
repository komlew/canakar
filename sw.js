var cacheName = 'v1';
var contentToCache = [
  '',
  'index.html',
  'fonts/PlayfairDisplay-Regular.woff2',
];
self.addEventListener('install', function(e) {
  e.waitUntil(caches.open(cacheName).then(function(cache) {
    return cache.addAll(contentToCache);
  }));
});
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(r) {
      return r || fetch(e.request).then(function(response) {
        return caches.open(cacheName).then(function(cache) {
          cache.put(e.request, response.clone());
          return response;
        });
      });
    })
  );
});