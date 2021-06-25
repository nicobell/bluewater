import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data: null,
    lang: 'en',
    isMobile: null,
    lastPage: null
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
    SET_LASTPAGE(state, page) {
      state.lastPage = page
    },
  },
  getters: {
    langDefault: state => {
      for (const property in state.data) {
        if (state.data[property]['default']) {
          return `/${property}`
        } else {
          return '/en'
        }
      }
    }
  }
})
