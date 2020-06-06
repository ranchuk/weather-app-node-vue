<template>
  <div class="citiesList">
        <span v-bind:key="city.id" v-for="city in cities">
              <CityItem v-bind:city="city" v-on:city-selected="$emit('city-selected', city.LocalizedName)"/>
        </span>
  </div>
</template>

<script>
import CityItem from './cityItem'

export default {
  name: 'CitiesList',
  components: {
    CityItem
  },
  props: ["cities"],
}
</script>

<style scoped>
.citiesList {
    position: absolute;
    z-index:1000;
    animation-name: dropDownSlow;
    animation-duration: 4s;
    animation-timing-function: ease-out;
    z-index: 1;
    @keyframes dropDownSlow {
        0% {
            height: 0rem;
        }
        100% {
            height:10rem;
        }
    }
}
</style>
