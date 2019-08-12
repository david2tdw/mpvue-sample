import * as TYPES from '../mutation-types'
import { $http } from '@/utils/http'

const state = {
  newsList: [],
  hasMore: false
}

const mutations = {
  [TYPES.SET_NEWS_LIST] (state, newsList) {
    state.newsList.push.apply(state.newsList, newsList)
  }
}

const actions = {
  getNewsList ({state, commit}, {queryParams} = {}) {
    console.log('222')
    $http('get', '/topics/latest.json')
      .then(res => {
        const list = res
        commit(TYPES.SET_NEWS_LIST, list)
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export default {
  state,
  mutations,
  actions
}
