import redis from 'redis'

//types missing
import Cacheman from 'cacheman'

//types missing
import EngineRedis from 'cacheman-redis'
import config from '../../config'
import log from '../logger'
const redisClient = () : redis.RedisClient => {
  const client = redis.createClient(config.redisURL);

  client.on('error', (error) => {
    log.error(error);
  });

  client.on('connect', () => {
    log.info('Redis database connection successful');
  });
  return client;
};

const apiCache = (redisC:redis.RedisClient) => {
  return async (req, res, next):Promise<any> => {
    
    const cache = new EngineRedis(redisC);
    const APICache = new Cacheman('nipek', { engine: cache, ttl: config.backendCacheExpiry });
    req.cache = APICache;
      // Tell Frontend to Cache responses
      res.set({
        "Cache-Control": "private, max-age=" + config.frontendCacheExpiry + "",
    });
    const key:any[] = [];
    key.push(req.url);
    key.push(req.ip);
    key.push(req.get('user-agent'));
    // if(req.appId){
    //   key.push(req.appId);
    // }
    req.cacheKey = key;
    // Remember to delete cache when you get a POST call
    // Only cache GET calls
    if (req.method === 'GET') {
      //  if record is not in cache, set cache else get cache
      req.cache.get(req.cacheKey)
        .then((resp) => {
          if (!resp) {
            // Will be set on successful response
            next();
          } else {
            res.send(resp, true);
          }
        })
        .catch((err) => {
          log.error('Failed to get cached data: ', err);
          // Don't block the call because of this failure.
          next();
        });
    } else {
      if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PUSH' || req.method === 'PATCH' || req.method === 'DELETE') {
        await req.cache.del(req.cacheKey);
      }
      next();
    }
  }
};

export {
  redisClient,
  apiCache,
};