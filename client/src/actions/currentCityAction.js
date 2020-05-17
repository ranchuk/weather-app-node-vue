import React from 'react'
import Button from '@material-ui/core/Button';
import {
  enqueueSnackbar,closeSnackbar,
} from './notificationAction';
import {fiveDatysForecasts as fiveDatysForecastsAPI, weatherByKey as weatherByKeyAPI} from '../apiMap'

import {SET_WEATHER_BY_KEY, LOADING_WEATHER_BY_KEY, ERROR_WEATHER_BY_KEY} from '../actions/types'
import axios from 'axios'
import config from '../config';

export const currentCityAction = (city) => async (dispatch) => {

  dispatch(currentCityLoading(true))
  try{

    if (config.isProduction) {
      const res = await axios.get(`/currentCityWeather?key=${city.Key}`)
      const todayWeather = res.data.data[0][0]
      const fiveDayaWeather = res.data.data[1]
      // console.log(todayWeather, fiveDayaWeather);

      dispatch({
        type: SET_WEATHER_BY_KEY,
        payload: {todayWeather,fiveDayaWeather,cityInfo:city}
      });
      dispatch(currentCityLoading(false))
    }
    else {
      setTimeout(()=>{
        dispatch({
          type: SET_WEATHER_BY_KEY,
          payload: {...weatherByKeyMockData, cityInfo:city}
        });
        dispatch(currentCityLoading(false))
      },500)
    }
  }
  catch(err){
    dispatch(enqueueSnackbar({
      message: 'error fetching weather information',
      options: {
          key: new Date().getTime() + Math.random(),
          variant: 'error',
          autoHideDuration: 2000,
          action: key => (
              <Button onClick={() => dispatch(closeSnackbar(key))}>dismiss me</Button>
          ),
      },
    }))
    console.error(err.message)
    dispatch(currentCityError(err))
    dispatch(currentCityLoading(false))
  }
};

export const currentCityLoading = (isLoading) => {
    return {
      type: LOADING_WEATHER_BY_KEY,
      payload: isLoading
    };
};

export const currentCityError = (err) => (dispatch) => {
  return {
    type: ERROR_WEATHER_BY_KEY,
    payload: err
  };
};

const weatherByKeyMockData = {
    todayWeather: {
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
    },
    fiveDayaWeather: {
      Headline: {
        EffectiveDate: '2020-03-28T08:00:00+03:00',
        EffectiveEpochDate: 1585371600,
        Severity: 5,
        Text: 'Air quality will be unhealthy for sensitive groups Monday morning through Wednesday morning',
        Category: 'rain',
        EndDate: '2020-03-28T14:00:00+03:00',
        EndEpochDate: 1585393200,
        MobileLink: 'http://m.accuweather.com/en/il/porat/212568/extended-weather-forecast/212568?lang=en-us',
        Link: 'http://www.accuweather.com/en/il/porat/212568/daily-weather-forecast/212568?lang=en-us'
      },
      DailyForecasts: [
        {
          Date: '2020-03-27T07:00:00+03:00',
          EpochDate: 1585281600,
          Temperature: {
            Minimum: {
              Value: 60,
              Unit: 'F',
              UnitType: 18
            },
            Maximum: {
              Value: 76,
              Unit: 'F',
              UnitType: 18
            }
          },
          Day: {
            Icon: 2,
            IconPhrase: 'Mostly sunny',
            HasPrecipitation: false
          },
          Night: {
            Icon: 35,
            IconPhrase: 'Partly cloudy',
            HasPrecipitation: false
          },
          Sources: [
            'AccuWeather'
          ],
          MobileLink: 'http://m.accuweather.com/en/il/porat/212568/daily-weather-forecast/212568?lang=en-us',
          Link: 'http://www.accuweather.com/en/il/porat/212568/daily-weather-forecast/212568?lang=en-us'
        },
        {
          Date: '2020-03-28T07:00:00+03:00',
          EpochDate: 1585368000,
          Temperature: {
            Minimum: {
              Value: 56,
              Unit: 'F',
              UnitType: 18
            },
            Maximum: {
              Value: 66,
              Unit: 'F',
              UnitType: 18
            }
          },
          Day: {
            Icon: 3,
            IconPhrase: 'Partly sunny',
            HasPrecipitation: true,
            PrecipitationType: 'Rain',
            PrecipitationIntensity: 'Light'
          },
          Night: {
            Icon: 35,
            IconPhrase: 'Partly cloudy',
            HasPrecipitation: false
          },
          Sources: [
            'AccuWeather'
          ],
          MobileLink: 'http://m.accuweather.com/en/il/porat/212568/daily-weather-forecast/212568?day=1&lang=en-us',
          Link: 'http://www.accuweather.com/en/il/porat/212568/daily-weather-forecast/212568?day=1&lang=en-us'
        },
        {
          Date: '2020-03-29T07:00:00+03:00',
          EpochDate: 1585454400,
          Temperature: {
            Minimum: {
              Value: 55,
              Unit: 'F',
              UnitType: 18
            },
            Maximum: {
              Value: 66,
              Unit: 'F',
              UnitType: 18
            }
          },
          Day: {
            Icon: 2,
            IconPhrase: 'Mostly sunny',
            HasPrecipitation: false
          },
          Night: {
            Icon: 33,
            IconPhrase: 'Clear',
            HasPrecipitation: false
          },
          Sources: [
            'AccuWeather'
          ],
          MobileLink: 'http://m.accuweather.com/en/il/porat/212568/daily-weather-forecast/212568?day=2&lang=en-us',
          Link: 'http://www.accuweather.com/en/il/porat/212568/daily-weather-forecast/212568?day=2&lang=en-us'
        },
        {
          Date: '2020-03-30T07:00:00+03:00',
          EpochDate: 1585540800,
          Temperature: {
            Minimum: {
              Value: 60,
              Unit: 'F',
              UnitType: 18
            },
            Maximum: {
              Value: 72,
              Unit: 'F',
              UnitType: 18
            }
          },
          Day: {
            Icon: 2,
            IconPhrase: 'Mostly sunny',
            HasPrecipitation: false
          },
          Night: {
            Icon: 35,
            IconPhrase: 'Partly cloudy',
            HasPrecipitation: false
          },
          Sources: [
            'AccuWeather'
          ],
          MobileLink: 'http://m.accuweather.com/en/il/porat/212568/daily-weather-forecast/212568?day=3&lang=en-us',
          Link: 'http://www.accuweather.com/en/il/porat/212568/daily-weather-forecast/212568?day=3&lang=en-us'
        },
        {
          Date: '2020-03-31T07:00:00+03:00',
          EpochDate: 1585627200,
          Temperature: {
            Minimum: {
              Value: 59,
              Unit: 'F',
              UnitType: 18
            },
            Maximum: {
              Value: 81,
              Unit: 'F',
              UnitType: 18
            }
          },
          Day: {
            Icon: 3,
            IconPhrase: 'Partly sunny',
            HasPrecipitation: false
          },
          Night: {
            Icon: 39,
            IconPhrase: 'Partly cloudy w/ showers',
            HasPrecipitation: true,
            PrecipitationType: 'Rain',
            PrecipitationIntensity: 'Light'
          },
          Sources: [
            'AccuWeather'
          ],
          MobileLink: 'http://m.accuweather.com/en/il/porat/212568/daily-weather-forecast/212568?day=4&lang=en-us',
          Link: 'http://www.accuweather.com/en/il/porat/212568/daily-weather-forecast/212568?day=4&lang=en-us'
        }
      ]
    }
  }