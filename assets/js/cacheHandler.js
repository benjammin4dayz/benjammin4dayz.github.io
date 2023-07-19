const purgeCache = async () => {
  try {
    const cacheKeys = await caches.keys();
    await Promise.all(
      cacheKeys.map(async (cacheKey) => {
        await caches.delete(cacheKey);
      })
    );
    console.log('Cache cleared successfully');
  } catch (error) {
    console.error('Failed to clear cache:', error);
  }
};
