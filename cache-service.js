const asyncRedis = require("async-redis");
const promisify = require('util').promisify;

module.exports = class CachingService {

    // const REDIS_PORT = process.env.REDIS_PORT || 6379 // heroku deploy or local redis server (not docker redis service)
    // const client = redis.createClient(REDIS_PORT, 'redis'); // container redis with docker-compose.yml service name 'redis' 
    // const client = asyncRedis.createClient(REDIS_PORT);
    
        constructor(redisConfig) {
        this.plansKey = "plans";
        this.redisHost = redisConfig.host;
        this.redisPort = redisConfig.port;
        this.redisPassword = redisConfig.password;
        this.redisClient = asyncRedis.createClient({
            host: this.redisClient,
            port:this.redisPort,
            auth_pass:this.redisPassowrd
        })

    }
}
