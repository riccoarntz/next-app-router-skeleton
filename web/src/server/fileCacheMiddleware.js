// eslint-disable-next-line import/no-extraneous-dependencies
import { Cache } from 'file-system-cache';

const cache = new Cache({
  basePath: './.cache', // (optional) Path where cache files are stored (default).
  ttl: 60 * 5, // (optional) A time-to-live (in secs) on how long an item remains cached.
});

const fileCacheMiddleware = async (key, fn) => {
  if (process.env.NODE_ENV === 'development' && process.env.DEV_CACHE_ENABLED) {
    let data = await cache.get(key);
    if (!data) {
      data = await fn();
      await cache.set(key, data);
    }
    return data;
  }
  return fn();
};

export default fileCacheMiddleware;
