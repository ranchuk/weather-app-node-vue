import axios from 'axios';
const setLocalStorage = (favorites) => localStorage.setItem('favorites', JSON.stringify(favorites))

const state = {
    data: JSON.parse(localStorage.getItem('favorites')) || [],
    loading: false,
    errors: []
};

const getters = {
  favorites: state => state.data,
  favoritesIsLoading: state => state.loading
};

const actions = {
  async fetchFavoritesWeather({ commit }) {
    try{
      commit('setLoading', true);
      const favoritesKeys = []
      for(let favorite of state.data){
        favoritesKeys.push(favorite.cityInfo.Key)
      }
      const res = await axios.get(`favoritesWeather?favorites=${favoritesKeys.toString()}`)
      let newData = res.data.data.map((favoriteWeather, index)=>{
        return {...state.data[index],todayWeather: favoriteWeather[0] 
        }
      })
      
      commit('setFavorites', newData)
    }
    catch(err){
      console.log(err)
    }
    commit('setLoading', false);

  },
  addToFavorites({ commit }, city) {
    let newData = [...state.data, {cityInfo: city}]
    setLocalStorage(newData.map((city)=>{return {cityInfo: city.cityInfo}})) // keep only cityinfo and not weather data in the localstorage favorites
    commit('setFavorites', newData)
  },
  removeFromFavorites({commit}, key) {
    let newData = state.data.filter((favorite)=>favorite.cityInfo.Key !== key)
    setLocalStorage(newData.map((city)=>{return {cityInfo: city.cityInfo}})) // keep only cityinfo and not weather data in the localstorage favorites
    commit('setFavorites', newData)
  }
};

const mutations = {
    setFavorites: (state, payload) => {
      state.data = payload;
      state.loading = false;
    },
    setLoading: (state, payload) => (state.loading = payload)
};

export default {
  state,
  getters,
  actions,
  mutations
};
