<template>
  <div class="cityItem" @click="onSelect();$emit('city-selected', city.LocalizedName)">
       <h1>{{city.LocalizedName}}</h1>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: 'CityItem',
  props: ["city"],
  methods: {
    ...mapActions(["fetchCurrentCityWeather"]),
    onSelect() {
      this.fetchCurrentCityWeather(this.city);
    }
  }
}
</script>

<style scoped>
.cityItem {
    text-align: center;
    border: 0.1rem solid black;
    border-radius: 0.3rem;
    background-color:white;
    width:26.5rem;
    font-size: 1.5rem;
    padding: 1rem;
    cursor: pointer;
}
.cityItem:hover {
        background-color: gainsboro;
}
</style>
