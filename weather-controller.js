const router = require('express').Router();
// const asyncWrapper = require('./utilities/async-wrapper').AsyncWrapper;
const WeatherService = require('./weather-service');
const weatherService = new WeatherService();

router.get('/autoCompleteSearch',async (req, res)=>{
        let data = await weatherService.autoCompleteSearch(req.query.query)
        res.status(200).json({data});
})

router.get('/currentCityWeather', async (req,res) => {
        const data = await Promise.all([weatherService.findCurrentCityWeather(req.query.key),weatherService.findFiveDaysForecasts(req.query.key)])
        // console.log(data)
        res.status(200).json({data});
})
router.get('/favoritesWeather', async (req,res) => {
        const data = await weatherService.findFavoritesWeather([...req.query.favorites.split(',')])
        // console.log(data);
        // console.log([...req.query.favorites.split(',')])
        // let id = req.params.id;
        // let userId = null;
        // let plan = await plansService.findOne(id);
        res.status(200).json({data});
})

module.exports = router;