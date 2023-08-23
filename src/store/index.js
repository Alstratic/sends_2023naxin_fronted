import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    cardId: null
  },
  mutations: {
    setCardId (state, id) {
      state.cardId = id
    }
  }
})
