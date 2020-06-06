<template>
  <div v-if="getFiveDaysForecast" class="fiveDaysForecastList">
        <div v-for="(weatherItem, index) in getFiveDaysForecast" v-bind:key="index" class="fiveDaysItem">
                <div v-if="currentCityIsLoading || loaderTimer" class="animated-background">
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
                <div v-else class="day">
                        <div class="dayHeader">{{days[(new Date(moment(weatherItem.Date)).getDay())]}}</div>
                        <div class="">
                              <span v-if="isCelsius">
                                <span class="key">Max:</span> 
                                <span class="value">{{convertToC(weatherItem.Temperature.Maximum.Value)}}°C</span>
                              </span>
                                <span  v-if="!isCelsius">
                                  <span class="key">Max:</span> 
                                  <span class="value">{{convertToC(weatherItem.Temperature.Maximum.Value)}}°F</span>
                                </span>
                        </div>
                        <div class="">
                              <span v-if="isCelsius">
                                <span class="key">Min:</span> 
                                <span class="value">{{convertToC(weatherItem.Temperature.Minimum.Value)}}°C</span>
                              </span>
                              <span v-if="!isCelsius">
                                <span class="key">Max:</span> 
                                <span class="value">{{convertToC(weatherItem.Temperature.Minimum.Value)}}°F</span>
                              </span>
                        </div>
                </div>
        </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { convertToC } from '../../utils/converter'
import moment from 'moment'

export default {
  name: 'FiveDaysForecastList',
  data() {
    return {
      convertToC: convertToC,
      days : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      moment,
      loaderTimer: true
    }
  },
  mounted() {
        //  this.favorites.length > 0 ? this.fetchFavoritesWeather() : null
         setTimeout(()=>{
           this.loaderTimer = false
         },500)
 },
  computed: {
    ...mapGetters(["isCelsius","currentCity","currentCityIsLoading"]),
    getFiveDaysForecast() {
      return this.currentCity && this.currentCity.fiveDaysWeather.DailyForecasts
    }
  }
}
</script>

<style scoped>
  .fiveDaysForecastList {
    width: 100%;
        color:black;
        display: flex;
        justify-content: space-between;
        @media screen (max-device-width: 1049px) { 
            overflow:scroll;
            padding:1.5rem;
        }
  }
  .fiveDaysItem {
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
  }
  .day {
      margin-bottom:1rem;
      display:flex;
      justify-content:space-between;
      align-items: center;
      flex-direction: column;
  }
  .dayHeader {
    margin-bottom:1rem;
  font-size: 2.5rem;
  font-weight: 600;
  }
  .key {
    margin-right:0.5rem;
  }
</style>
