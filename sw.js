//   "shortcuts": [
//     {
//       "name": "All movies",
//       "short_name": "Movies",
//       "description": "View the list of all movies available on hacker's jugad",
//       "url": "/movies?utm_source=homescreen",
//       "icons": [{ "src": "/assets/movies.png", "sizes": "192x192" }]
//     },
//     {
//       "name": "All web-series",
//       "short_name": "WebSeries",
//       "description": "View the list of all web series available on hacker's jugad",
//       "url": "/series?utm_source=homescreen",
//       "icons": [{ "src": "/assets/series.png", "sizes": "192x192" }]
//     }
//   ]

// servie worker


const cacheName = 'pwa-conf-v1';
const staticAssets = [
    './',
    './index.html',
    './assets/search-script.js',
    './assets/css/styles.css',
    './assets/'
];


self.addEventListener('install', async event => {
    console.log('install event');
    const cache = await caches.open(cacheName);
    await cache.addAll(staticAssets);
});

self.addEventListener('fetch', async event => {
    console.log('fetch event');
    const req = event.request;

    if (/.*(json)$/.test(req.url)) {
        event.respondWith(networkFirst(req));
    } else {
        event.respondWith(cacheFirst(req));
    }
});

async function cacheFirst(req) {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(req);
    return cachedResponse || networkFirst(req);
}

async function networkFirst(req) {
    const cache = await caches.open(cacheName);
    try {
        const fresh = await fetch(req);
        cache.put(req, fresh.clone());
        return fresh;
    } catch (e) {
        const cachedResponse = await cache.match(req);
        return cachedResponse;
    }
}