// "shortcuts": [
//   {
//     "name": "All movies",
//     "short_name": "Movies",
//     "description": "View the list of all movies available on hacker's jugad",
//     "url": "/movies",
//     "icons": [{ "src": "/assets/movies.png", "sizes": "192x192" }]
//   },
//   {
//     "name": "All web-series",
//     "short_name": "WebSeries",
//     "description": "View the list of all web series available on hacker's jugad",
//     "url": "/series",
//     "icons": [{ "src": "/assets/series.png", "sizes": "192x192" }]
//   }
// ]

// servie worker
const cache_Name = "pwa-conf-v1.057";
// const staticCacheName = [
//   '/credits.html',
//   '/404.html',
// ];

const staticAssets = [
  '/',
  '/index.html',
  '/credits.html',
  '/404.html',
  '/books.html',
  '/movies.html',
  '/series.html',
  '/offline.html',
  '/search.json',
];


self.addEventListener('install', function (event) {
  event.waitUntil(
    caches
      .open(cache_Name).then(function (cache) {
        return cache.addAll(staticAssets);
      })
      .then(() => {
        self.skipWaiting();
      })
  );
});;

self.addEventListener('fetch', async event => {
  // console.log('fetch event');
  const req = event.request;

  if (/.*(json)$/.test(req.url)) {
    event.respondWith(networkFirst(req));
  } else {
    event.respondWith(cacheFirst(req));
  }
});

async function cacheFirst(req) {
  const cache = await caches.open(cache_Name);
  const cachedResponse = await cache.match(req);
  return cachedResponse || networkFirst(req);
}

async function networkFirst(req) {
  const cache = await caches.open(cache_Name);
  try {
    const fresh = await fetch(req);
    cache.put(req, fresh.clone());
    return fresh;
  } catch (e) {
    // const cachedResponse = await cache.match(req);
    return caches.match('/offline.html');
  }
}

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.filter(function (cacheName) {
          return true;
          // Return true if you want to remove this cache,
          // but remember that caches are shared across
          // the whole origin
        }).map(function (cacheName) {
          if (cache_Name != cacheName && cacheName.startsWith("pwa-conf")) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});


self.addEventListener('message', function (event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});