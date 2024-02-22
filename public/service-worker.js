// service-worker.js
importScripts('https://cdn.jsdelivr.net/npm/localforage/dist/localforage.min.js');

const cacheName = 'my-cache';
const dataStore = localforage.createInstance({
  name: 'my-data-store'
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(cacheName)
      .then(cache => cache.match(event.request))
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request)
          .then(response => {
            const clonedResponse = response.clone();
            caches.open(cacheName)
              .then(cache => cache.put(event.request, clonedResponse));
            return response;
          });
      })
      .catch(error => {
        // Handle errors
      })
  );
});

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        cache.addAll([
          // Add files you want to cache during installation
        ]);
      })
  );
});

// Function to save fetched data into IndexedDB using LocalForage
function saveDataToIndexedDB(data) {
  dataStore.setItem('key', data)
    .then(() => console.log('Data saved to IndexedDB'))
    .catch(error => console.error('Error saving data to IndexedDB:', error));
}
