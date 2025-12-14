
const CACHE_NAME = 'godmode-v2-cache';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json'
];

// Mock Data for Offline API Support
const MOCK_API = {
    '/api/health': {
        status: "ONLINE (VERCEL-SYNC)",
        service: "Service Worker Core",
        version: "2.0.0",
        environment: "CLIENT_SIDE",
        licenseStatus: "GODMODE",
        corpId: "team_y4Iet78sTSfhEyA4qzPLybxz",
        timestamp: new Date().toISOString()
    },
    '/api/balance/demoUser': {
        userId: "demoUser",
        accounts: [
            { currency: "JPY", balance: 999999999 },
            { currency: "USD", balance: 8888888 },
            { currency: "BTC", balance: 99.9 },
            { currency: "TKG", balance: 1000000 }
        ]
    },
    '/api/transactions/demoUser': {
        transactions: [
            { id: 999, name: "Offline Mode Active", amount: 0, currency: "USD", type: "positive", date: "Now" },
            { id: 998, name: "Local Core Sync", amount: 9999, currency: "TKG", type: "positive", date: "1m ago" }
        ]
    },
    '/api/revenue': {
        revenue: 999999999
    }
};

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Network First strategy for API with Mock Fallback
  if (event.request.url.includes('/api/')) {
    event.respondWith(
      fetch(event.request).catch(() => {
        // Return mock data based on URL
        const url = new URL(event.request.url);
        const path = url.pathname;
        
        // Exact matches
        if (MOCK_API[path]) {
             return new Response(JSON.stringify(MOCK_API[path]), { 
                 headers: { 'Content-Type': 'application/json' } 
             });
        }
        
        // Fuzzy matching
        if (path.includes('/balance/')) return new Response(JSON.stringify(MOCK_API['/api/balance/demoUser']), { headers: { 'Content-Type': 'application/json' } });
        if (path.includes('/transactions/')) return new Response(JSON.stringify(MOCK_API['/api/transactions/demoUser']), { headers: { 'Content-Type': 'application/json' } });
        if (path.includes('/revenue')) return new Response(JSON.stringify(MOCK_API['/api/revenue']), { headers: { 'Content-Type': 'application/json' } });

        // Generic Fallback
        return new Response(JSON.stringify({ error: "Offline Mode", status: "Fallback" }), { 
            headers: { 'Content-Type': 'application/json' } 
        });
      })
    );
    return;
  }

  // Stale-While-Revalidate for others
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, networkResponse.clone());
        });
        return networkResponse;
      });
      return cachedResponse || fetchPromise;
    })
  );
});
