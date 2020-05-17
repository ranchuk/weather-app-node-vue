import { weatherByKey as weatherByKeyAPI} from '../apiMap'
import axios from 'axios'
import {
  enqueueSnackbar,
  closeSnackbar,
} from './notificationAction';
import React from 'react'
import Button from '@material-ui/core/Button';
import config from '../config';

import {ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES, SET_FAVORITES, LOADING_FAVORITES_WAETHER, SET_FAVORITES_WEATHER, ERROR_FAVORITES_WAETHER} from '../actions/types'
export const favoritesAction = (city, add) => (dispatch) => {

    if (!add) {
        dispatch({
            type: REMOVE_FROM_FAVORITES,
            payload: city
          });


              dispatch(enqueueSnackbar({
                message: `${city.cityInfo.LocalizedName} removed from favorites`,
                options: {
                    key: new Date().getTime() + Math.random(),
                    variant: 'warning',
                    autoHideDuration: 2000,
                    action: key => (
                        <Button onClick={() => dispatch(closeSnackbar(key))}>dismiss me</Button>
                    ),
                },
              }))
    }
    else {
        dispatch({
            type: ADD_TO_FAVORITES,
            payload: city
        });
        dispatch(enqueueSnackbar({
          message: `${city.cityInfo.LocalizedName} added to favorites`,
          options: {
              key: new Date().getTime() + Math.random(),
              variant: 'success',
              autoHideDuration: 2000,
              action: key => (
                  <Button onClick={() => dispatch(closeSnackbar(key))}>dismiss me</Button>
              ),
          },
        }))
    }
};

export const setFavorites = (favorites) => {
    return{
        type: SET_FAVORITES,
        payload: favorites
    };
}

export const fetchFavoritesWeather = (favorites) => async (dispatch) => {
    dispatch(fetchFavoritesWeatherLoading(true))
  // THIS IS WORKING API CALL, REMOVE ON PRODUCTION

  try{
    if ( config.isProduction) {
      // const asyncRequests = []
      // for(let favorite of favorites){
      //     console.log(favorite.cityInfo.Key)
      //     asyncRequests.push(axios.get(weatherByKeyAPI(favorite.cityInfo.Key)))
      // }
      const favoritesKeys = []
      for(let favorite of favorites){
        favoritesKeys.push(favorite.cityInfo.Key)
      }
      const res = await axios.get(`/favoritesWeather?favorites=${favoritesKeys.toString()}`)
      // const res = await Promise.all(asyncRequests)
      console.log(res.data.data)

      dispatch({
          type: SET_FAVORITES_WEATHER,
          payload: res.data.data.map((favoriteWeather, index)=>{return {...favorites[index],todayWeather: favoriteWeather[0] }})
      });
      dispatch(fetchFavoritesWeatherLoading(false))

    }
    else{
      setTimeout(()=>{
        dispatch({
          type: SET_FAVORITES_WEATHER,
          payload: favorites.map((favorite, index)=>{return {...favorite, todayWeather: FavoritesWeatherMockData[index].data[0]}})
        });
        dispatch(fetchFavoritesWeatherLoading(false))

      },500)
    }
  }
    catch(e){
      dispatch(enqueueSnackbar({
        message: 'error fetching favorites weather information',
        options: {
            key: new Date().getTime() + Math.random(),
            variant: 'error',
            autoHideDuration: 2000,
            action: key => (
                <Button onClick={() => dispatch(closeSnackbar(key))}>dismiss me</Button>
            ),
        },
      }))
        // dispatch(fetchFavoritesWeatherLoading(false))
        dispatch(fetchFavoritesWeatherError(e))

  }
}

export const fetchFavoritesWeatherLoading = (isLoading) => {
    return {
      type: LOADING_FAVORITES_WAETHER,
      payload: isLoading
    };
};

export const fetchFavoritesWeatherError = (err) => {
    return {
      type: ERROR_FAVORITES_WAETHER,
      payload: err.message
    };
  };

const FavoritesWeatherMockData = [
  {
    data:[{
                LocalObservationDateTime: '2020-03-28T00:35:00+03:00',
                EpochTime: 1585344900,
                WeatherText: 'Mostly clear',
                WeatherIcon: 34,
                HasPrecipitation: false,
                PrecipitationType: null,
                IsDayTime: false,
                Temperature: {
                    Metric: {
                    Value: 16.9,
                    Unit: 'C',
                    UnitType: 17
                    },
                    Imperial: {
                    Value: 62,
                    Unit: 'F',
                    UnitType: 18
                    }
                },
                MobileLink: 'http://m.accuweather.com/en/il/porat/212568/current-weather/212568?lang=en-us',
                Link: 'http://www.accuweather.com/en/il/porat/212568/current-weather/212568?lang=en-us'
    }]
  },
  {
    data:[{
      LocalObservationDateTime: '2020-03-28T00:35:00+03:00',
      EpochTime: 1585344900,
      WeatherText: 'Mostly clear',
      WeatherIcon: 34,
      HasPrecipitation: false,
      PrecipitationType: null,
      IsDayTime: false,
      Temperature: {
        Metric: {
          Value: 16.9,
          Unit: 'C',
          UnitType: 17
        },
        Imperial: {
          Value: 62,
          Unit: 'F',
          UnitType: 18
        }
      },
      MobileLink: 'http://m.accuweather.com/en/il/porat/212568/current-weather/212568?lang=en-us',
      Link: 'http://www.accuweather.com/en/il/porat/212568/current-weather/212568?lang=en-us'
    }]
  },
  {
    data:[{
                LocalObservationDateTime: '2020-03-28T00:35:00+03:00',
                EpochTime: 1585344900,
                WeatherText: 'Mostly clear',
                WeatherIcon: 34,
                HasPrecipitation: false,
                PrecipitationType: null,
                IsDayTime: false,
                Temperature: {
                    Metric: {
                    Value: 16.9,
                    Unit: 'C',
                    UnitType: 17
                    },
                    Imperial: {
                    Value: 62,
                    Unit: 'F',
                    UnitType: 18
                    }
                },
                MobileLink: 'http://m.accuweather.com/en/il/porat/212568/current-weather/212568?lang=en-us',
                Link: 'http://www.accuweather.com/en/il/porat/212568/current-weather/212568?lang=en-us'
    }]
  },
  {
    data:[{
                LocalObservationDateTime: '2020-03-28T00:35:00+03:00',
                EpochTime: 1585344900,
                WeatherText: 'Mostly clear',
                WeatherIcon: 34,
                HasPrecipitation: false,
                PrecipitationType: null,
                IsDayTime: false,
                Temperature: {
                    Metric: {
                    Value: 16.9,
                    Unit: 'C',
                    UnitType: 17
                    },
                    Imperial: {
                    Value: 62,
                    Unit: 'F',
                    UnitType: 18
                    }
                },
                MobileLink: 'http://m.accuweather.com/en/il/porat/212568/current-weather/212568?lang=en-us',
                Link: 'http://www.accuweather.com/en/il/porat/212568/current-weather/212568?lang=en-us'
    }]
  },
  {
    data:[{
                LocalObservationDateTime: '2020-03-28T00:35:00+03:00',
                EpochTime: 1585344900,
                WeatherText: 'Mostly clear',
                WeatherIcon: 34,
                HasPrecipitation: false,
                PrecipitationType: null,
                IsDayTime: false,
                Temperature: {
                    Metric: {
                    Value: 16.9,
                    Unit: 'C',
                    UnitType: 17
                    },
                    Imperial: {
                    Value: 62,
                    Unit: 'F',
                    UnitType: 18
                    }
                },
                MobileLink: 'http://m.accuweather.com/en/il/porat/212568/current-weather/212568?lang=en-us',
                Link: 'http://www.accuweather.com/en/il/porat/212568/current-weather/212568?lang=en-us'
    }]
  },
  {
    data:[{
                LocalObservationDateTime: '2020-03-28T00:35:00+03:00',
                EpochTime: 1585344900,
                WeatherText: 'Mostly clear',
                WeatherIcon: 34,
                HasPrecipitation: false,
                PrecipitationType: null,
                IsDayTime: false,
                Temperature: {
                    Metric: {
                    Value: 16.9,
                    Unit: 'C',
                    UnitType: 17
                    },
                    Imperial: {
                    Value: 62,
                    Unit: 'F',
                    UnitType: 18
                    }
                },
                MobileLink: 'http://m.accuweather.com/en/il/porat/212568/current-weather/212568?lang=en-us',
                Link: 'http://www.accuweather.com/en/il/porat/212568/current-weather/212568?lang=en-us'
    }]
  },
  {
    data:[{
                LocalObservationDateTime: '2020-03-28T00:35:00+03:00',
                EpochTime: 1585344900,
                WeatherText: 'Mostly clear',
                WeatherIcon: 34,
                HasPrecipitation: false,
                PrecipitationType: null,
                IsDayTime: false,
                Temperature: {
                    Metric: {
                    Value: 16.9,
                    Unit: 'C',
                    UnitType: 17
                    },
                    Imperial: {
                    Value: 62,
                    Unit: 'F',
                    UnitType: 18
                    }
                },
                MobileLink: 'http://m.accuweather.com/en/il/porat/212568/current-weather/212568?lang=en-us',
                Link: 'http://www.accuweather.com/en/il/porat/212568/current-weather/212568?lang=en-us'
    }]
  },
  {
    data:[{
                LocalObservationDateTime: '2020-03-28T00:35:00+03:00',
                EpochTime: 1585344900,
                WeatherText: 'Mostly clear',
                WeatherIcon: 34,
                HasPrecipitation: false,
                PrecipitationType: null,
                IsDayTime: false,
                Temperature: {
                    Metric: {
                    Value: 16.9,
                    Unit: 'C',
                    UnitType: 17
                    },
                    Imperial: {
                    Value: 62,
                    Unit: 'F',
                    UnitType: 18
                    }
                },
                MobileLink: 'http://m.accuweather.com/en/il/porat/212568/current-weather/212568?lang=en-us',
                Link: 'http://www.accuweather.com/en/il/porat/212568/current-weather/212568?lang=en-us'
    }]
  }
]