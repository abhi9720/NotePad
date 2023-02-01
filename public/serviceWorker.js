const CACHE_NAME = 'rapidApps';
const urlsToCache = [
    '/',
    'index.html',
    "/manifest.json",
    "/navbarlogo.png",
    "/NewsAppicon.png",
    "Icon-todo.png",
    "/bghome.gif",
    "/Icon-notepad.png",
    "/static/js/main.8825da77.js", //<--- New Bundle Added
    "/static/css/main.00cce73e.css", //<--- New Bundle Added
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