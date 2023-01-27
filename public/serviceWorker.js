const CACHE_NAME = 'repidApps';
const urlsToCache = [
    '/',
    'index.html',
    "/manifest.json",
    "/logo192.png",
    "/logo512.png",
    "/navbarlogo.png",
    "/NewsAppicon.png",
    "Icon-todo.png",
    "/Icon-notepad.png",
    "/static/js/main.3539620b.js", //<--- New Bundle Added
    "/static/css/main.786a34fb.css", //<--- New Bundle Added
];

const self = this;

//install serviceWorker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    )
});

//Listen for request
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                return cachedResponse || fetch(event.request).catch(() => caches.match('offline.html'))
            })
    )
});

//Active the seriveWorker

self.addEventListener('activate', (event) => {
    const cacheWhitelist = [];
    cacheWhitelist.push(CACHE_NAME);

    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(

            cacheNames.map((cacheName) => {
                if (!cacheWhitelist.includes(cacheName)) {
                    return caches.delete(cacheName);
                }
            })
        ))
    )
});