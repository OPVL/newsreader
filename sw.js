const staticAssets = [
    './',
    './style.css',
    './app.js',
    './fallback.json',
    './images/fetch-dog.jpg'
];

// called when a new service worked is detected and registered
self.addEventListener('install', async event => {
    const cache =  await caches.open('news-static');
    cache.addAll(staticAssets);
});

// handles all network requests
self.addEventListener('fetch', event => {
    const req = event.request;
    const url = new URL(req.url);

    if (url.origin === location.origin){
    event.respondWith(cacheFirst(req));
    } else {
        event.respondWith(networkFirst(req));
    }
});

async function cacheFirst(req){
    // will respond with either undefined if nothing matched or with the requested assets if they've been cached.
    const cachedResponse = await caches.match(req);

    return cachedResponse || fetch(req);
}

async function networkFirst(req) {
    const cache = await caches.open('news-dynamic');

    try {
        const res = await fetch(req);
        console.log('application online, caching results');
        
        cache.put(req, res.clone())
        return res;
    } catch (error) {
        console.info(error);
        const cachedResponse =  await cache.match(req);
        return cachedResponse || await caches.match('./fallback.json');
    }
}