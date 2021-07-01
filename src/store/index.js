import Vue from 'vue'
import Vuex from 'vuex';
import { setStorage, isLogin, closeLogin } from '@/common/utils';
import city from '@/static/city.json';
import QRData from '@/static/server_qr_wx.json'

Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
      userInfo: {},
      totalList: [],
      token: '',
      cityList: city || [],
      QRData: QRData || {}
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