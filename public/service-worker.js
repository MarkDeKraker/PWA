// Import localforage script
importScripts(
  "https://cdn.jsdelivr.net/npm/localforage/dist/localforage.min.js"
);

// Listen for fetch requests
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Save projects to IndexDB when online
  if (url.origin === "https://cmgt.hr.nl" && url.pathname === "/api/projects") {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const responseClone = response.clone();
          saveDataToIndexedDB(responseClone);
          return response;
        })
        .catch(() => {
          return loadFromIndexedDB();
        })
    );
    // Only return tags when service is online, otherwise return http error
  } else if (
    url.origin === "https://cmgt.hr.nl" &&
    url.pathname === "/api/tags"
  ) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          return response;
        })
        .catch(() => {
          return new Response(
            JSON.stringify({
              message: "Online connection is required to fetch tags",
            }),
            {
              status: 503,
              headers: { "Content-Type": "application/json" },
            }
          );
        })
    );
    // For all other requests, get data from the cache or make the request when online
  } else {
    event.respondWith(
      caches.match(event.request).then(function (response) {
        if (response) {
          return response;
        } else {
          return fetch(event.request).then(function (res) {
            return caches.open("prg9-cache").then(function (cache) {
              cache.put(event.request.url, res.clone());
              return res;
            });
          });
        }
      })
    );
  }
});

// Function to store the projecst to the IndexDB
function saveDataToIndexedDB(response) {
  const dataStore = localforage.createInstance({
    name: "prg9-store",
  });
  response.json().then((data) => {
    data.data.forEach((project) => {
      dataStore
        .setItem(`project-${project.project.id}`, project)
        .catch((error) =>
          console.error(
            `Error saving project ${project.project.id} to IndexedDB:`,
            error
          )
        );
    });
  });
}

// Function to load the projecst from the IndexDB
function loadFromIndexedDB() {
  const dataStore = localforage.createInstance({
    name: "prg9-store",
  });
  return dataStore
    .keys()
    .then((keys) => Promise.all(keys.map((key) => dataStore.getItem(key))))
    .then((data) => {
      const responseData = {
        data: data,
      };
      return new Response(JSON.stringify(responseData), {
        headers: { "Content-Type": "application/json" },
      });
    })
    .catch((error) => {
      console.error("Error loading data from IndexedDB:", error);
      throw error;
    });
}
