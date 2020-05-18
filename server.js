const express = require("express");
const app = express();
const path = require("path");
const dotenv = require('dotenv');
const Middleware = require('./middleware');
const WeatherController = require('./weather-controller');

Middleware(app);
dotenv.config()

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