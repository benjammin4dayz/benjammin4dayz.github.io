const cacheHandler = async () => {
  await detectCache();
  await purgeCache();
};

const detectCache = async () => {
  caches
    .keys()
    .then((cacheNames) => cacheNames)
    .catch((error) => {
      console.error('Failed to detect local caches: ' + error);
    });
};

const purgeCache = async () => {
  caches
    .keys()
    .then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          console.log(cacheName);
          return caches.delete(cacheName);
        })
      );
    })
    .then(() => {
      console.warn('Dev Heart: purged local caches...');
    })
    .catch((error) => {
      console.error(
        'An error occurred while attempting to purge local caches: ' + error
      );
    });
};
