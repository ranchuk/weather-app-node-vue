import axios from 'axios';

const state = {
    data: null,
    loading: false,
    errors: []
};

const getters = {
  currentCity: state => state.data,
  currentCityIsLoading: state => state.loading
};

const actions = {
  async fetchCurrentCityWeather({ commit }, city) {
    try{
      commit('setLoading', true);
      const res = await axios.get(`currentCityWeather?key=${city.Key}`)
      const todayWeather = res.data.data[0][0]
      const fiveDaysWeather = res.data.data[1]
      commit('setWeatherByKey', {todayWeather,fiveDaysWeather,cityInfo:city});
    }
    catch(err){
      console.log(err)
    }
   
    commit('setLoading', false);
    return Promise.resolve() // to be able to know when the response finished and use .then after it
  },
   async geoLocation({ commit, dispatch }) {
    try{
      commit('setLoading', true);
      const res = await axios.get(`geoPosition?cord=32.0853,34.7818`) // default Tel aviv
      dispatch('fetchCurrentCityWeather',res.data.data)
      navigator.geolocation.getCurrentPosition(success, error, options);
    }
    catch(err){
      console.log(err)
      commit('setLoading', false);
    }

    
      var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };
      
      async function success(pos) {
        var crd = pos.coords;
      
        // console.log('Your current position is:');
        // console.log(`Latitude : ${crd.latitude}`);
        // console.log(`Longitude: ${crd.longitude}`);
        // console.log(`More or less ${crd.accuracy} meters.`);
      
        try{
          const res = await axios.get(`geoPosition?cord=${crd.latitude}, ${crd.longitude}`) // default Tel aviv
          dispatch('fetchCurrentCityWeather',res.data.data)
        }
        catch(err){
          console.log(err)
        }
      }
      
      function error(err) {
        commit('setLoading', false);
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }
    }
}

const mutations = {
    setWeatherByKey: (state, payload) => {
      state.data = payload;
    },
    setLoading: (state, payload) => (state.loading = payload)
};

export default {
  state,
  getters,
  actions,
  mutations
};
