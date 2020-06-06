<template>
  <div class="currentCityWeather">
      <TodayWeather />
      <FiveDaysForecastList />
  </div>
</template>

<script>
import TodayWeather from './todayWeather';
import FiveDaysForecastList from './fiveDaysForecastList'

export default {
  name: 'CurrentCityWeather',
  components: {
      TodayWeather,
      FiveDaysForecastList
  }
}
</script>

<style scoped>
.currentCityWeather {
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      height: 100%;
}
</style>
