<template>
<div class="currentCityWeatherStyle">
  <CurrentCityWeather />
</div>
</template>

<script>

import CurrentCityWeather from '../components/currentCityWeather/currentCityWeather'
export default {
  name: 'Home',
  components: {
    CurrentCityWeather
  }
}
</script>

<style scoped>
.currentCityWeatherStyle {
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
}

</style>
