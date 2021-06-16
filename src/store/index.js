import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data:null,
    lang: 'en',
    isMobile: null,
  },
  mutations: {
    SET_LANG(state, currentLang) {
      state.lang = currentLang
    },
    SET_DEVICE(state, deviceW) {
      state.isMobile = deviceW
    },
    SET_DATA(state, data) {
      state.data = data
    },
  },
})
