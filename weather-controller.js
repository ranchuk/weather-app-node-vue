const router = require('express').Router();
// const asyncWrapper = require('./utilities/async-wrapper').AsyncWrapper;
const WeatherService = require('./weather-service');
const weatherService = new WeatherService();

router.get('/autoCompleteSearch',async (req, res)=>{
        console.log(req.query.query)
        const data = await weatherService.autoCompleteSearch(req.query.query)
        res.status(200).json({data});
})

router.get('/currentCityWeather', async (req,res) => {
        const data = await Promise.all([weatherService.findCurrentCityWeather(req.query.key),weatherService.findFiveDaysForecasts(req.query.key)])
        res.status(200).json({data});
})
router.get('/favoritesWeather', async (req,res) => {
        const data = await weatherService.findFavoritesWeather([...req.query.favorites.split(',')])
        res.status(200).json({data});
})
router.get('/geoPosition', async (req,res) => {
        const data = await weatherService.geoPositionSearch([...req.query.cord.split(',')])
        res.status(200).json({data});
})

module.exports = router;