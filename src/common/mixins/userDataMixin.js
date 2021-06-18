import { userCardInfo } from '@/common/api';
import { setStorage } from '@/common/utils';
import {mapState,mapMutations} from 'vuex';
const isObject = (val) => {
  return  Object.prototype.toString.call(val) === "[object Object]"
}
export default {
  data () {
    return {
      userData: {}
    }
  },
  onLoad() {
    // const obj = getApp().globalData.userData;
    // const keys = Object.keys(obj)
    // if (isObject(obj) && keys.length) {
    //   // console.log(222, obj)
    //   this.userData = obj;
    // } else {
      // this.getUserInfo();
    // }
  },
  methods: {
    ...mapMutations([ 'setUserInfo']),
    // 获取信息
    getUserInfo() {
      const avatarUrl = uni.getStorageSync('avatarUrl')
      userCardInfo().then(res=> {
        const { data:nData } = res[1];
        const { data, code } = nData;
        if (code === 200) {
          data.wxCode = data.wxNum || '';
          data.name = data.userName || '';
          if (!data.avatar && avatarUrl) {
            data.avatar = avatarUrl
          }
          setStorage({userId: data.id})
          // getApp().globalData.userData = {...data} || {};
          this.userData = {...data} || {};
          this.setUserInfo({...data}) 
        }
      }).catch(err => {console.log(err)})
    },
  }

}