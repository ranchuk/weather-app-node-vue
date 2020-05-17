const axios = require('axios');
const client = require('./server').redisClient

class WeatherService {
  findFavoritesWeather= async (favoritesKeys) => {
    console.log(favoritesKeys)
    const asyncRequests = []
    for(let favoriteKey of favoritesKeys){
      asyncRequests.push(this.findCurrentCityWeather(favoriteKey))
    }
    const res = await Promise.all(asyncRequests)
    return res;
  }
  
    findFiveDaysForecasts = async (cityKey) => {
      try{
        const cache_results = await this.findFiveDaysForecastsCache(cityKey)
        if (cache_results)  {
            return cache_results;
        }
        else {
            console.log('Fetching 5 days forecast by key from accuweather')
            const res = await axios.get(`${process.env.ACCUWEATHER_BASE_URL}/forecasts/v1/daily/5day/${cityKey}?apikey=${process.env.ACCUWEATHER_KEY}`);
            client.setex(`${cityKey}_5`, 3600, JSON.stringify(res.data));
            return res.data;
        }
      }
      catch(err){
          console.log(err);
          return [];
      }
    }
    
    findFiveDaysForecastsCache = async (cityKey) => {
      let returnValue = false;
      try{
          console.log(`cache search for city key: ${cityKey}`)
          returnValue = await client.get(`${cityKey}_5`);
          if(returnValue){
            console.log(`Found in cache -no need to fetch again 5 days forecast from accuweather for cityKey=${cityKey}`)
          }
          
      }
      catch(err){
          console.log(err);
          returnValue = false;
      }
      return JSON.parse(returnValue);
    }

    findCurrentCityWeather = async (cityKey) => {
      try{
        const cache_results = await this.findCurrentCityWeatherCache(cityKey)
        if (cache_results)  {
            return cache_results;
        }
        else {
            console.log('Fetching city weather by key from accuweather')

            const res = await axios.get(`${process.env.ACCUWEATHER_BASE_URL}/currentconditions/v1/${cityKey}?apikey=${process.env.ACCUWEATHER_KEY}`);
            client.setex(cityKey, 3600, JSON.stringify(res.data));
            return res.data;
        }
      }
      catch(err){
          console.log(err);
          return [];
      }
    }

    findCurrentCityWeatherCache = async (cityKey) => {
      let returnValue = false;
      try{
          console.log(`cache search for city key: ${cityKey}`)
          returnValue = await client.get(cityKey);
          if(returnValue){
            console.log(`Found in cache -no need to fetch again currentcity weather from accuweather for cityKey=${cityKey}`)
          }
          
      }
      catch(err){
          console.log(err);
          returnValue = false;
      }
      return JSON.parse(returnValue);
    }

    autoCompleteSearch = async (query) => {
        try{
            const cache_results = await this.autoCompleteSearchCache(query)
            if (cache_results)  {
                return cache_results;
            }
            else {
                console.log('Fetching from accuweather')
                const res = await axios.get(`${process.env.ACCUWEATHER_BASE_URL}/locations/v1/cities/autocomplete?apikey=${process.env.ACCUWEATHER_KEY}&q=${query}`);
                client.set(query, JSON.stringify(res.data));
                // client.setex(query, 60, 'asdasd');
                return res.data;
            }
        }
        catch(err){
            console.log(err);
            return [];
        }
            
    }

    autoCompleteSearchCache = async (query) => {
      let returnValue = false;
        try{
            console.log(`cache search for: ${query}`)
            returnValue = await client.get(query);
            if(returnValue){
              console.log(`Found in cache -no need to fetch again from accuweather for query=${query}`)
            }
            
        }
        catch(err){
            console.log(err);
            returnValue = false;
        }
        return JSON.parse(returnValue);
    }

}

module.exports = WeatherService