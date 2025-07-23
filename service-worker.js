const CACHE_NAME = 'sunset-paradise-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/rooms.html',
  '/servies.html',
  '/contacts.html',
  '/style.css',
  '/slider.js',
  '/hotel.jpg',
  '/room1.jpg',
  '/room2.jpg',
  '/room3.jpg',
  '/spa.jpg',
  '/rest.jpg',
  '/swim.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS_TO_CACHE))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  if (event.request.url.includes('contacts.html')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
      .catch(() => {
        if (event.request.headers.get('accept').includes('text/html')) {
          return caches.match('/index.html');
        }
      })
  );
});