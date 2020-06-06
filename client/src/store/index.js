import Vuex from 'vuex';
import Vue from 'vue';
import currentCity from './modules/currentCity';
import favorites from './modules/favorites';
import isCelsius from './modules/isCelsius';

// Load Vuex
Vue.use(Vuex);

// Create store
export default new Vuex.Store({
  modules: {
    currentCity,
    favorites,
    isCelsius
  }
});

