// The service worker: the app's shell offline, nothing else.
// - Pages: network first, so a new deploy shows at once; the last copy when there's no connection, or when the
//   network hasn't answered in 3 seconds (a weak signal shouldn't mean a blank screen).
// - Next's built files (/_next/static/, named by their content) and icons: cache first, they never change. The page
//   sends the ones its first visit loaded, so the first offline open works too. Files from older deploys are dropped.
// - Data (/api/): never touched. The app keeps its own last good data and says how old it is (the stale state).
// Bump CACHE when this file's rules change.

const CACHE = "app-v1";
const SLOW_MS = 3000;

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.add("/")).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("message", (event) => {
  const list = event.data && event.data.precache;
  if (!Array.isArray(list)) return;
  const keep = new Set(list);
  event.waitUntil(
    caches.open(CACHE).then(async (cache) => {
      await Promise.all(list.map((url) => cache.match(url).then((hit) => hit ?? cache.add(url).catch(() => undefined))));
      const keys = await cache.keys();
      await Promise.all(
        keys.filter((r) => new URL(r.url).pathname.startsWith("/_next/static/") && !keep.has(r.url)).map((r) => cache.delete(r)),
      );
    }),
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin || url.pathname.startsWith("/api/")) return;

  if (request.mode === "navigate") {
    event.respondWith(
      (async () => {
        const network = fetch(request).then((response) => {
          if (response.ok && url.pathname === "/") {
            const copy = response.clone();
            event.waitUntil(caches.open(CACHE).then((cache) => cache.put("/", copy)));
          }
          return response;
        });
        const quick = await Promise.race([network.catch(() => null), new Promise((resolve) => setTimeout(() => resolve(null), SLOW_MS))]);
        if (quick) return quick;
        const cached = await caches.match(url.pathname === "/" ? "/" : request, { ignoreSearch: true });
        return cached ?? network.catch(() => Response.error());
      })(),
    );
    return;
  }

  if (url.pathname.startsWith("/_next/static/") || /\.(?:woff2|png|svg|webmanifest)$/.test(url.pathname)) {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ??
          fetch(request).then((response) => {
            if (response.ok) {
              const copy = response.clone();
              event.waitUntil(caches.open(CACHE).then((cache) => cache.put(request, copy)));
            }
            return response;
          }),
      ),
    );
  }
});
