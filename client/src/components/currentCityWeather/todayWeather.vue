<template>
  <div v-if="!currentCityIsLoading && currentCity && !loaderTimer" class="todayWeatherStyle">
        <div class="cityAndTempStyle">
            <img class="favIcon" v-if="!isFavorite" @click="handleAddFavorite" v-bind:src="require('../../pictures/heart-outline.png')" alt="logo" width="40px" height="40px"/>  
            <img class="favIcon" v-if="isFavorite" @click="handleRemoveFavorite" v-bind:src="require('../../pictures/heart.png')" alt="logo" width="40px" height="40px"/>  
            <span class="cityName" >{{currentCity.cityInfo.LocalizedName}}</span> 
            <div v-if="isCelsius">{{Math.round(currentCity.todayWeather.Temperature.Metric.Value)}}°C</div>
            <div v-if="!isCelsius">{{convertToF(Math.round(currentCity.todayWeather.Temperature.Metric.Value))}}°F</div>
        </div>
        <div class="imageAndStatus">
              <span class="weatherStatus">{{currentCity.todayWeather.WeatherText}}</span>
              <img class="image" :src="imgURL" alt="icon" />              
        </div>
  </div>
  <div class="todayWeatherStyle" v-else><PulseLoader color="white"/></div>
</template>

<script>

import { mapGetters, mapActions } from "vuex";
import { convertToF } from '../../utils/converter'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
  import { mdiHeart  } from '@mdi/js'

export default {
  name: 'TodayWeather',
  components: {
    PulseLoader
  },
  data () {
    return {
      loaderTimer: true,
      currBackground: 0,
      convertToF: convertToF,
      mdiHeart: mdiHeart,
      imgURL: this.currentCity && `https://developer.accuweather.com/sites/default/files/${this.currentCity.todayWeather.WeatherIcon < 10 ? '0' + this.currentCity.todayWeather.WeatherIcon: this.currentCity.todayWeather.WeatherIcon}-s.png`
    }
  },
  mounted(){
         setTimeout(()=>{
           this.loaderTimer = false
         },500)
  },
  created(){
    this.currentCity ? null : this.geoLocation()
  },
  computed: {
    ...mapGetters(["isCelsius","currentCity","currentCityIsLoading","favorites"]),
    isFavorite() {
     const isFavorite = this.favorites.find((favorite)=>this.currentCity.cityInfo.Key === favorite.cityInfo.Key)
     return isFavorite
    }
  },
  methods: {
    ...mapActions(["geoLocation","addToFavorites","removeFromFavorites"]),
    handleAddFavorite(){
      this.addToFavorites(this.currentCity.cityInfo)
      // isFavorite ? dispatch(favoritesAction(currentCity, false)) : dispatch(favoritesAction(currentCity, true))
    },
    handleRemoveFavorite(){
      this.removeFromFavorites(this.currentCity.cityInfo.Key)
    }
  }
}
</script>

<style scoped>
.todayWeatherStyle {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 200px;
}
.cityAndTempStyle {
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
}
.favIcon{
  cursor: pointer;
}
.cityName {
    text-transform: uppercase;
    display: block;
    margin-right: 3rem;
    margin-left:1rem;
    @media screen 
            and (max-device-width: 580px) 
            and (-webkit-min-device-pixel-ratio: 1) { 
                margin-right: 1rem;
    }
}

.imageAndStatus{
    display:flex;
    align-items:center;
    justify-content: space-between;
    font-size:4rem;
    transform:translateX(5%);
}

.weatherStatus{
  text-transform: uppercase;
    font-size: 3rem;
    letter-spacing: 0.2rem;

    @media screen 
            and (max-device-width: 580px) 
            and (-webkit-min-device-pixel-ratio: 1) { 
                font-size: 2rem;
    }
}
.image {
    width:10rem;
    @media screen 
                and (max-device-width: 580px) 
                and (-webkit-min-device-pixel-ratio: 1) { 
                width:7rem;
    }
}
</style>
