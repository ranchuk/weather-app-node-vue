<template>
<div>
<TodayWeather />
<FiveDaysForecast />
</div>
</template>

<script>
import TodayWeather from './todayWeather';
import FiveDaysForecast from './fiveDaysForecast'

export default {
  name: 'CurrentCityWeather',
  components: {
      TodayWeather,
      FiveDaysForecast
  }
}
</script>

<style scoped>

</style>
