import { $http } from '@/utils/http'
import { SET_USER_INFO } from '@/store/mutation-types'

const state = {
  name: ''
}

const mutations = {
  [SET_USER_INFO] (state, userInfo) {
    state.name = userInfo.name
  }
}

const actions = {
  async getUserInfo ({state, commit}, name) {
    let res = await $http('get', '/xxxx' + name)
    if (res.msg === 'success') {
      const info = res.data
      commit(SET_USER_INFO, info)
    }
    if (res.msg === 'fail') {
      console.log(res.verror)
    }
  }
}

export default {
  state,
  mutations,
  actions
}
