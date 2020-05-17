import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import styled from 'styled-components'
import {fetchFavoritesWeather} from '../../actions/favoritesAction'
import {favoritesAction} from '../../actions/favoritesAction'
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import {currentCityAction} from '../../actions/currentCityAction';
import {convertToF} from '../../utils'
import { SpinnerWrapper, SpinnerText} from '../home/home'
const Favorites = (props) => {
    const dispatch = useDispatch()
    const favorites = useSelector((state) => state.favorites)
    const isCelsius = useSelector((state) => state.degreeType.isCelsius)

    useEffect(()=>{
        favorites.data.length > 0 && dispatch(fetchFavoritesWeather(favorites.data))
    },[])

return <FavoritesPage> 
                <PageHeadline>Favorites</PageHeadline>
                {favorites.data.length === 0 ? 
                <NoFavoritesStyle>No Favorites Selected</NoFavoritesStyle> :
                 favorites.loading ? 
                <SpinnerWrapper>
                    <CircularProgress color='inherit' size='6rem'/>
                    <SpinnerText>Loading weather data...</SpinnerText>
                </SpinnerWrapper> : (
                <FavoritesWrapper>
                        {favorites.data.map((favorite, index)=>{
                        return <FavoriteItemWrapper key={index}>
                                    <FavoriteItem onClick={(e)=> {dispatch(currentCityAction(favorite.cityInfo)); props.history.push('/')}}>
                                    <CityAndTempStyle>
                                        <FavoriteTitle>{favorite.cityInfo.LocalizedName}</FavoriteTitle>
                                        {isCelsius && <span>{Math.round(favorite.todayWeather.Temperature.Metric.Value)}°C</span>}
                                        {!isCelsius && <span>{convertToF(favorite.todayWeather.Temperature.Metric.Value)}°F</span>}
                                    </CityAndTempStyle>

                                        <ImageAndStatus>
                                            <span>{favorite.todayWeather.WeatherText}</span>
                                                <Image
                                                src={`https://developer.accuweather.com/sites/default/files/${
                                                    favorite.todayWeather.WeatherIcon < 10
                                                    ? "0" + favorite.todayWeather.WeatherIcon
                                                    : favorite.todayWeather.WeatherIcon
                                                }-s.png`}
                                                alt="icon"
                                                />
                                        </ImageAndStatus>
                                    </FavoriteItem>
                                    <Button onClick={(e)=>dispatch(favoritesAction(favorite, false))} variant="contained" color="secondary" fontSize="inherit" startIcon={<DeleteIcon />}><span>Remove from Favorite</span></Button>
                                </FavoriteItemWrapper>})}
               </FavoritesWrapper>)}
        </FavoritesPage>
}

export default Favorites
export const ImageAndStatus = styled.div`
display:flex;
align-items:center;
justify-content: space-around;
font-size:2.5rem;
transform: translateX(5%);
@media screen 
            and (max-device-width: 580px) 
            and (-webkit-min-device-pixel-ratio: 1) { 
                font-size:2rem;
    }
`
export const Image = styled.img`
width:10rem;
`
const NoFavoritesStyle = styled.div`
    color:#ffffff;
    position: absolute;
    left:50%;
    top:50%;
    transform: translate(-50%,-50%);
    font-size: 3rem;
`
// const SpinnerWrapper = styled.div`
//     position: absolute;
//     left:50%;
//     top:50%;
//     transform: translate(-50%,-50%);
//     text-align: center;
// `
// export const SpinnerText = styled.div`
// margin-top:10px;
// `
const FavoritesPage = styled.div`
    margin-top: 0rem;
    text-align: center;
`
const PageHeadline = styled.span`
display:inline-block;
margin-bottom: 5rem;
color:#ffffff;
    font-size: 4.5rem;
    @media screen 
            and (max-device-width: 580px) 
            and (-webkit-min-device-pixel-ratio: 1) {     
            font-size: 3rem;
            margin-bottom: 3rem;

    }
`
const FavoritesWrapper = styled.div`
                font-size: 1.5rem;
    display:flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content:space-between;
`;
const FavoriteItemWrapper = styled.div`
    border:0.1rem solid #ffffff;
    border-radius: 1.5rem;
    margin:2rem;
    text-align:center;
    padding:2rem;
    cursor:pointer;

    font-size: 1.4rem;
    background-color:#ffffff;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); 
    min-width:15rem;
    max-width:20rem;

    transition: all .4s ease-in-out;

    &:hover {
        transform: scale(1.1);
    }
`;
const FavoriteItem = styled.div`
    cursor:pointer;
    margin-bottom:30px;
`;

const FavoriteTitle = styled.span`
    display:block;
`

const ImageAndTemp = styled.div`
display: flex;
justify-content: center;
align-items: center;
font-size:25px;
`

export const CityAndTempStyle = styled.div`
    display:flex;
    align-items:center;
    font-size: 2.5rem;
    margin-bottom: 1rem;
    justify-content: space-around;

    @media screen 
            and (max-device-width: 580px) 
            and (-webkit-min-device-pixel-ratio: 1) { 
                font-size: 2rem;
    }
`