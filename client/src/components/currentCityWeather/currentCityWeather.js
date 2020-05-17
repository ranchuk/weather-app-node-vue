import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {favoritesAction} from '../../actions/favoritesAction'
import styled from 'styled-components'
import TodayWeather from './todayWeather';
import FiveDaysForecast from './fiveDaysforecast';
import FavoriteIcon from '@material-ui/icons/Favorite';

const CurrentCityWeather = () => {
    const dispatch = useDispatch()
    const {data: currentCity} = useSelector((state) => state.currentCity)
    const favorites = useSelector((state) => state.favorites.data)

    return <CurrentCityWeatherStyle>
                <TodayWeather currentCity={currentCity} favorites={favorites}/>
                <FiveDaysForecast currentCity={currentCity}/>
            </CurrentCityWeatherStyle>
}

export default CurrentCityWeather

const CurrentCityWeatherStyle = styled.div`
    margin-top:5rem;
    height: 100%;
    flex-direction: column;
    display:flex;
    justify-content: space-between;
    @media screen 
            and (max-device-width: 580px) 
            and (-webkit-min-device-pixel-ratio: 1) {     
            margin-top:10rem;
    }
`