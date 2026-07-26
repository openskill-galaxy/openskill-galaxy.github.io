const CACHE_NAME = "openskill-galaxy-portal-v4";

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;

  const url = new URL(e.request.url);
  if (url.origin !== self.location.origin) return;

  // 数据 JSON 走网络优先，内容更新即时可见；离线时回退缓存
  const isData = url.pathname.startsWith("/data/");

  e.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      if (isData) {
        return fetch(e.request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              cache.put(e.request, networkResponse.clone());
            }
            return networkResponse;
          })
          .catch(() =>
            cache.match(e.request).then(
              (cached) =>
                cached ||
                new Response("Offline", { status: 503, statusText: "Service Unavailable" })
            )
          );
      }

      return cache.match(e.request).then((cachedResponse) => {
        const fetchPromise = fetch(e.request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              cache.put(e.request, networkResponse.clone());
            }
            return networkResponse;
          })
          .catch(() => null);

        return (
          cachedResponse ||
          fetchPromise.then(
            (r) =>
              r ||
              new Response("Offline", { status: 503, statusText: "Service Unavailable" })
          )
        );
      });
    })
  );
});
