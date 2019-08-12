import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import login from './modules/login'
import news from './modules/news'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    login: {
      namespaced: true,
      ...login
    },
    user: {
      namespaced: true,
      ...user
    },
    news: {
      namespaced: true,
      ...news
    }
  }
})

export default store
