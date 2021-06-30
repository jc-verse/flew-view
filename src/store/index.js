import Vue from 'vue'
import Vuex from 'vuex';
import { setStorage, isLogin, closeLogin } from '@/common/utils';
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
      userInfo: {},
      totalList: [],
      token: '',
      cityList: [],
      QRData: {}
      // isLogin: ''
    },
    mutations: {
      setUserInfo(state, provider) {
        state.userInfo = provider || {};
        setStorage(provider)
      },
      setTotalList(state, provider) {
        state.totalList = provider;
      },
      setToken(state, provider) {
        state.token = provider || '';
        setStorage({ token: provider })
      },
      setCityList(state, provider) {
        state.cityList = provider || [];
      }, 
      setQRData(state, provider) {
        state.QRData = provider || {};
      }, 
      // setIsLogin(state, provider) {
      //   state.isLogin = provider;
      // },
    },
    actions: {}
})
export default store