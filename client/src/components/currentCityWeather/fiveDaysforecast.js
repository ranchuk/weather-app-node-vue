import React from 'react';
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import moment from 'moment'
import {convertToC} from '../../utils'
// import {FiveDaysForecastStyle, DayStyle, DayStyleLineHeader, DayStyleLine} from './styles'

var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const FiveDaysForecast = ({currentCity}) => {
    const isCelsius = useSelector((state) => state.degreeType.isCelsius)

    return <ScrollWrapper>
                <FiveDaysForecastStyle>
                    {currentCity && currentCity.fiveDayaWeather && currentCity.fiveDayaWeather.DailyForecasts.map((weatherItem, index)=>{
                        return  <DayStyle key={index}>
                                    <DayStyleLineHeader>{days[(new Date(moment(weatherItem.Date)).getDay())]}</DayStyleLineHeader>
                                    {/* <DayStyleLine><KeyStyle>Day:</KeyStyle> <ValueStyle>{weatherItem.Day.IconPhrase}</ValueStyle></DayStyleLine>
                                    <DayStyleLine><KeyStyle>Night:</KeyStyle> <ValueStyle>{weatherItem.Night.IconPhrase}</ValueStyle></DayStyleLine> */}
                                    <DayStyleLine><KeyStyle>Max:</KeyStyle>  
                                        {isCelsius && <ValueStyle>{convertToC(weatherItem.Temperature.Maximum.Value)}°C</ValueStyle>}
                                        {!isCelsius && <ValueStyle>{weatherItem.Temperature.Maximum.Value}°F</ValueStyle>}
                                    </DayStyleLine>
                                    <DayStyleLine><KeyStyle>Min:</KeyStyle> 
                                        {isCelsius && <ValueStyle>{convertToC(weatherItem.Temperature.Minimum.Value)}°C</ValueStyle>}
                                        {!isCelsius && <ValueStyle>{weatherItem.Temperature.Minimum.Value}°F</ValueStyle>}
                                    </DayStyleLine>

                                </DayStyle>
                    })}
                </FiveDaysForecastStyle>
            </ScrollWrapper>

}

export default FiveDaysForecast
const KeyStyle = styled.div`
margin-right:0.5rem;
`
const ValueStyle = styled.div`
`
const ScrollWrapper= styled.div`
width: 100%;
padding: 2rem;
z-index: 1;
bottom: 0px;
animation-name: fadeIn;
animation-duration: 2s;
/* animation-timing-function: ease-out; */
@media screen 
        and (max-device-width: 580px) 
        and (-webkit-min-device-pixel-ratio: 1) { 
        }
@media screen 
        and (min-device-width: 1049px) 
        and (-webkit-min-device-pixel-ratio: 1) { 
            /* bottom: 0px; */
        }
    @keyframes fadeIn {
        0% {
            bottom: -10%;
            opacity: 0;
        }
        100% {
            bottom: 0px;
            opacity: 1;
        }
    }

`

export const FiveDaysForecastStyle = styled.div`

        display: flex;
        justify-content: space-between;
        /* margin-top:10rem; */
        @media screen 
        and (max-device-width: 1049px) 
        and (-webkit-min-device-pixel-ratio: 1) { 
            overflow:scroll;
            padding:1.5rem;
        }
`;

export const DayStyle = styled.div`        
    padding: 2.5rem;
    text-align:center;
    font-size: 1.8rem;
    height:15rem;
    background-color:#ffffff;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); 
    flex-grow:1;
    min-width:15rem;
    width: 20%;
    margin-right:2rem;
    border-radius: 2rem;
    /* letter-spacing: 0.1rem; */
    font-weight: 400;
`;
export const DayStyleLine = styled.div`
    margin-bottom:1rem;
    display:flex;
    justify-content:center;
    align-items: center;
`;
export const DayStyleLineHeader = styled.div`
margin-bottom:1rem;
font-size: 2.5rem;
font-weight: 600;
`;
