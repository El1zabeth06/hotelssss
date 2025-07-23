const CACHE_NAME = 'sunset-paradise-v1';
const URLS_TO_CACHE = [
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

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) =>
            cache.addAll(URLS_TO_CACHE))
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(fromCache(event.request));
    event.waitUntil(update(event.request));
});

function fromCache(request) {
    return caches.open(CACHE_NAME).then((cache) =>
        cache.match(request).then((matching) =>
            matching || Promise.reject('no-match')
        ));
}

function update(request) {
    return caches.open(CACHE_NAME).then((cache) =>
        fetch(request).then((response) =>
            cache.put(request, response)
        )
    );
}
