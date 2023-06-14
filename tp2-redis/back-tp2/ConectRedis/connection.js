const redis = require("redis")

const redisclient = redis.createClient({
  url: 'redis://db-redis-node:6379'
});

module.exports = redisclient;

