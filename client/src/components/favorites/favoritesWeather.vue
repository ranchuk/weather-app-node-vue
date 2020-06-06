<template>
  <div class="favoritePage">
    <span class="pageHeadline">Favorites</span>
    <div class="favoritesWrapper">
                <div v-for="favorite of favorites" :key="favorite.cityInfo.Key" class="favoriteWrapper" >
                    <div v-if="favoritesIsLoading || loaderTimer" class="animated-background">
                          <div class="background-masker header-top"></div>
                          <div class="background-masker header-left"></div>
                          <div class="background-masker header-right"></div>
                          <div class="background-masker header-bottom"></div>
                          <div class="background-masker subheader-left"></div>
                          <div class="background-masker subheader-right"></div>
                          <div class="background-masker subheader-bottom"></div>
                          <div class="background-masker content-top"></div>
                          <div class="background-masker content-first-end"></div>
                          <div class="background-masker content-second-line"></div>
                          <div class="background-masker content-second-end"></div>
                          <div class="background-masker content-third-line"></div>
                          <div class="background-masker content-third-end"></div>
                    </div>
                    <div v-else>
                      <div @click="handleSelect(favorite)">
                          <div class="cityAndTempStyle">
                              <span class="cityName" >{{favorite.cityInfo.LocalizedName}}</span> 
                              <div v-if="isCelsius">{{Math.round(favorite.todayWeather.Temperature.Metric.Value)}}°C</div>
                              <div v-if="!isCelsius">{{convertToF(Math.round(favorite.todayWeather.Temperature.Metric.Value))}}°F</div>
                          </div>
                          <div class="imageAndStatus">
                                <span class="weatherStatus">{{favorite.todayWeather.WeatherText}}</span>
                                <!-- <img class="image" :src="imgURL" alt="icon" />               -->
                          </div>
                      </div>
                      <button class="favoritesButton" @click="removeFromFavorites(favorite.cityInfo.Key)">Delete</button>
                    </div>
                </div>

      </div>
  </div>
</template>

<script>

import { mapActions, mapGetters } from "vuex";
import { convertToC, convertToF } from '../../utils/converter'

export default {
  name: 'Home',
  data(){
      return {
        loaderTimer: true,
        convertToC,
        convertToF,
      }
  },
  created() {
         this.favorites.length > 0 ? this.fetchFavoritesWeather() : null
  },
  mounted() {
        //  this.favorites.length > 0 ? this.fetchFavoritesWeather() : null
         setTimeout(()=>{
           this.loaderTimer = false
         },500)
 },
  computed: {
    ...mapGetters(["isCelsius","favorites","favoritesIsLoading"]),
    filteredFavorites() {
      return this.favorites.filter((favorite)=>favorite.todayWeather) // this filter for waiting until favorites response exist with today weather info
    }
  },
 methods: {
   ...mapActions(["fetchFavoritesWeather","removeFromFavorites","fetchCurrentCityWeather"]),
   async handleSelect(city) {
     await this.fetchCurrentCityWeather(JSON.parse(JSON.stringify(city.cityInfo)))
     console.log('redirect to home page')
     this.$router.push('/')
   }
 }
}
</script>

<style scoped>
.favoritePage {
    margin-top: 0rem;
    text-align: center;
}
.pageHeadline {
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

}
.favoritesWrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.favoriteWrapper {
    color:black;
    border:0.1rem solid #ffffff;
    border-radius: .5rem;
    margin:2rem;
    text-align:center;
    padding:1rem;
    cursor:pointer;

    font-size: 1.4rem;
    background-color:#ffffff;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); 
    min-width:25rem;
    min-height:20rem;
    max-width:20rem;

    transition: all .4s ease-in-out;

  
}
.favoriteWrapper:hover {
          transform: scale(1.1);
}
.cityAndTempStyle {
    display:flex;
    font-size: 2rem;
    font-weight: 400;
    letter-spacing: 0.5rem;
    margin-bottom: 2rem;

    @media screen 
            and (max-device-width: 580px) 
            and (-webkit-min-device-pixel-ratio: 1) { 
                font-size: 3rem;
    }
}
.favoritesButton {
  width: 100px;
  height: 50px;
}
.cityName {
    text-transform: uppercase;
    display: block;
    margin-right: 3rem;
    color:black;
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
</style>
