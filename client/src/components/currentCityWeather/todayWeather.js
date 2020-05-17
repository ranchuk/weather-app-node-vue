import React from 'react';
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import {convertToF} from '../../utils'
import { useDispatch } from 'react-redux'
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

import {favoritesAction} from '../../actions/favoritesAction'

const TodayWeather = ({currentCity, favorites}) => {
    const dispatch = useDispatch()
    const isCelsius = useSelector((state) => state.degreeType.isCelsius)
    const isFavorite = currentCity && favorites.length > 0 && favorites.find((favorite)=>favorite.cityInfo.Key=== currentCity.cityInfo.Key)

    const favoriteFunc = () => {
        isFavorite ? dispatch(favoritesAction(currentCity, false)) : dispatch(favoritesAction(currentCity, true))
    }
    return   <TodayWeatherStyle>
                         <CityAndTempStyle>
                            <CityName>{currentCity && currentCity.cityInfo && currentCity.cityInfo.LocalizedName}</CityName>
                            {isCelsius && <div>{Math.round(currentCity.todayWeather.Temperature.Metric.Value)}°C</div>}
                            {!isCelsius && <div>{convertToF(currentCity.todayWeather.Temperature.Metric.Value)}°F</div>}
                        </CityAndTempStyle>
                        <StickySide onClick={()=>favoriteFunc()}>
                                <IconStyle>{!isFavorite ? <FavoriteBorderIcon color={"secondary"} fontSize={"inherit"}/> :
                                <FavoriteIcon color={"secondary"}  fontSize={"inherit"}/>}
                                </IconStyle>
                        </StickySide>
                        <ImageAndStatus>
                            <WeatherStatus>{currentCity.todayWeather.WeatherText}</WeatherStatus>
                            <Image
                            src={`https://developer.accuweather.com/sites/default/files/${
                                currentCity.todayWeather.WeatherIcon < 10
                                ? "0" + currentCity.todayWeather.WeatherIcon
                                : currentCity.todayWeather.WeatherIcon
                            }-s.png`}
                            alt="icon"
                            />
                            
                        </ImageAndStatus>
            </TodayWeatherStyle>

}

export default TodayWeather
const IconStyle = styled.span`
    position:absolute;
    display:inline-block;
    right: 0px;
    top:50%;
    display:flex;
    align-items:center;
    transform:translateY(-50%);
`
export const StickySide = styled.div`
font-size:4rem;
position: absolute;
border-radius:1rem;
width: 15rem ;
height:5rem;
background-color:#ffffff;
transition: all .4s ease-in-out;
animation: mymove 6s infinite;
top:50%;

&:hover {
    transform: scale(1.1);
    left: 0rem;
}
cursor: pointer;
@media screen 
            and (max-device-width: 580px) 
            and (-webkit-min-device-pixel-ratio: 1) { 
                top:150%;
    }
@keyframes mymove {
        0% {
            left:-12rem;
        }
        30% {
            left: -7rem;
        }
        70% {
            left: -7rem;
        }
        100% {
            left:-12rem;
        }
}
`
export const ImageAndStatus = styled.div`
display:flex;
align-items:center;
justify-content: space-between;
font-size:4rem;
transform:translateX(5%);
`
export const Image = styled.img`
width:10rem;
@media screen 
            and (max-device-width: 580px) 
            and (-webkit-min-device-pixel-ratio: 1) { 
                width:7rem;
    }
`
export const WeatherStatus = styled.span`
    text-transform: uppercase;
    font-size: 3rem;
    letter-spacing: 0.2rem;

    @media screen 
            and (max-device-width: 580px) 
            and (-webkit-min-device-pixel-ratio: 1) { 
                font-size: 2rem;
    }
`
export const CityName = styled.span`
    text-transform: uppercase;
    display: block;
    margin-right: 3rem;
    @media screen 
            and (max-device-width: 580px) 
            and (-webkit-min-device-pixel-ratio: 1) { 
                margin-right: 1rem;
    }
`
export const TodayWeatherStyle = styled.div`
    position:relative;
    display:flex;
    flex-direction:column;
    align-items:center;
    color:#ffffff;
    animation-name: fadeIn;
    animation-duration: 2s;
    animation-timing-function: ease-out;
    z-index: 1;
    @keyframes fadeIn {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
`

export const CityAndTempStyle = styled.div`
    display:flex;
    font-size: 6rem;
    font-weight: 400;
    letter-spacing: 0.5rem;
    margin-bottom: 2rem;

    @media screen 
            and (max-device-width: 580px) 
            and (-webkit-min-device-pixel-ratio: 1) { 
                font-size: 3rem;
    }
`