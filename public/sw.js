import { skipWaiting, clientsClaim } from 'workbox-core';
import { precacheAndRoute } from 'workbox-precaching';

skipWaiting();
clientsClaim();

self.addEventListener('fetch', (fetchEvent) => {
    if (fetchEvent.request.url.endsWith('/receive-files/') && fetchEvent.request.method === 'POST') {
        return fetchEvent.respondWith(
            (async () => {
                const formData = await fetchEvent.request.formData();
                const image = formData.get('image');
                const keys = await caches.keys();
                const mediaCache = await caches.open(keys.filter((key) => key.startsWith('media'))[0]);
                await mediaCache.put('shared-image', new Response(image));
                return Response.redirect('./?share-target', 303);
            })(),
        );
    }
});

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

// This is your Service Worker, you can put any of your custom Service Worker
// code in this file, above the `precacheAndRoute` line.
precacheAndRoute(self.__WB_MANIFEST || []);