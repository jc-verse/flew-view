import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
      userInfo: {},
      totalList: []
    },
    mutations: {
      setUserInfo(state, provider) {
        state.userInfo = provider;
      },
      setTotalList(state, provider) {
        state.totalList = provider;
      },
    },
    actions: {}
})
export default store