importScripts('./node_modules/workbox-sw/build/workbox-sw.js');

const staticAssets = [
    './',
    './style.css',
    './app.js',
    './fallback.json',
    './images/fetch-dog.jpg'
];

workbox.setConfig({
    debug: true
});

workbox.precaching.precacheAndRoute(staticAssets);

console.info('precaching done. Setting up source handlers');

const extNews = ({
    url,
    event
}) => {
    return (url.host === 'https://newsapi.org/');
};

workbox.routing.registerRoute(
    /\.(?:png|jpg|jpeg|svg|gif)$/,
    new workbox.strategies.CacheFirst({
        cacheName: 'image-cache',
    })
);

const cHandler = new workbox.strategies.NetworkFirst();


workbox.r

workbox.routing.registerRoute(
    new RegExp('n/v2/'),
    new workbox.strategies.NetworkFirst({
        cacheName: 'news-cache'
    })
);