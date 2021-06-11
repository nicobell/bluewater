import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lang: 'en',
  },
  mutations: {
    SET_LANG(state, currentLang) {
      state.lang = currentLang
    },
  },
})
