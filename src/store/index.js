import Vue from 'vue'
import Vuex from 'vuex'

import data from './data.json';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lang: "",
    data:data
  },
  mutations: {
    SET_LANG(state, currentLang) {
      state.lang = currentLang
    },
    SET_DATA(state, payload) {
      state.data = payload
    },
  },
})
