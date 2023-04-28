import fetch from 'node-fetch';
import redis from 'redis';

async function cacheRedis() {
  // key to store results in Redis store
  const photosRedisKey = 'user:photos';
  var client = await redis.createClient(6379); // create and connect redis client to local instance.

  client.on('error', (err) => {
    // echo redis errors to the console
    console.log('Error ' + err);
  });

  // Try fetching the result from Redis first in case we have it cached
  const res = await client.get(photosRedisKey, (err, photos) => {
    console.log('========================================');
    console.log('photos: ', photos);
    console.log('========================================');
    // If that key exists in Redis store
    if (photos) {
      return JSON.parse(photos);
    } else {
      // Key does not exist in Redis store Fetch directly from remote api
      fetch('https://jsonplaceholder.typicode.com/photos')
        .then((response) => response.json())
        .then((photos) => {
          // Save the  API response in Redis store, data expire time in 3600 seconds, it means one hour
          client.setex(photosRedisKey, 3600, JSON.stringify(photos));

          return photos; // Send JSON response to client
        })
        .catch((error) => {
          console.log(error); // log error message
          return error.toString(); // send error to the client
        });
    }
  });

  return res;
}

console.log('========================================');
console.log('cacheRedis(): ', cacheRedis());
console.log('========================================');
