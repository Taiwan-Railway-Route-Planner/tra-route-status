import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    stations: null,
  },
  mutations: {
    updateStation(state, newStations){
      state.stations = newStations;
    },
  },
  actions: {

  }
})
