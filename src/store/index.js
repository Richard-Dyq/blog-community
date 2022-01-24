import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/store'

Vue.use(Vuex)
const TOKEN = 'TOUTIAO_USER'
export default new Vuex.Store({
  state: {
    user: getItem(TOKEN)
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
      setItem(TOKEN, payload)
    }
  },
  actions: {
  },
  modules: {
  }
})
