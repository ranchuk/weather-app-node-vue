const express = require("express");
const app = express();
const path = require("path");
const dotenv = require('dotenv');
const Middleware = require('./middleware');
// const redis = require('redis');
const asyncRedis = require("async-redis");

Middleware(app);
dotenv.config()


const REDIS_PORT = process.env.REDIS_URL || 6379 // heroku deploy or local redis server (not docker redis service)

// const client = redis.createClient(REDIS_PORT, 'redis'); // container redis with docker-compose.yml 
const client = asyncRedis.createClient(REDIS_PORT); 
client.on('error', (err)=>{
  console.log(err);
  client.quit();
})
client.on('connect', ()=>{
  const WeatherController = require('./weather-controller');
  app.use('', WeatherController);

       //Server static assets if in production
       if (process.env.NODE_ENV === "production") {
        //Set static folder
        app.use(express.static("client/build"));
  
        app.get("*", (req, res) => {
          res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
        });
      }
  
  const PORT = process.env.PORT || 5000;
  
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
})

module.exports.redisClient = client