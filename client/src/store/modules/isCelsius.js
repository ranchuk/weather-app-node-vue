const state = {
    data: true,
    loading: false,
    errors: []};

const getters = {
  isCelsius: state => state.data,
};
const actions = {
  async setType({ commit }, isCelsius) {
    commit('setIsCelsius', isCelsius);
  },

}

const mutations = {
    setIsCelsius: (state, payload) => {
      state.data = payload;
    }
};

export default {
  state,
  getters,
  actions,
  mutations
};
