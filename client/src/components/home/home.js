import React from 'react';
import { useSelector } from 'react-redux'

import styled from 'styled-components'
import CurrentCityWeather from '../currentCityWeather/currentCityWeather.js'
import CircularProgress from '@material-ui/core/CircularProgress';
const Home = () => {
    const currentCity = useSelector((state) => state.currentCity)

    return <HomeWrapper>
            {currentCity.loading || currentCity.data === null ? 
            <SpinnerWrapper>
                <CircularProgress color='inherit' size='6rem' /> 
                <SpinnerText>Loading weather data...</SpinnerText>
            </SpinnerWrapper> 
            : 
              <CurrentCityWeather className="CurrentCityWeatherStyle" />}
           </HomeWrapper>
}

export default Home

const HomeWrapper = styled.div`
    height: 100%;
`
export const SpinnerWrapper = styled.div`
    position: absolute;
    left:50%;
    top:50%;
    transform: translate(-50%,-50%);
    text-align:center;
    color:#ffffff;
`
export const SpinnerText = styled.div`
margin-top:1rem;
color:#ffffff;
font-size:3rem;
    @media screen 
            and (max-device-width: 580px) 
            and (-webkit-min-device-pixel-ratio: 1) { 
                font-size:2rem;
    }
`

