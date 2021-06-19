import { userCardInfo, totalTeamTypeList } from '@/common/api';
import { setStorage, deepChange } from '@/common/utils';
import {mapState,mapMutations} from 'vuex';
const isObject = (val) => {
  return  Object.prototype.toString.call(val) === "[object Object]"
}
export default {
  data () {
    return {
    }
  },
  onLoad() {
  },
  methods: {
    ...mapMutations([ 'setUserInfo', "setTotalList"]),
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
    totalTeamTypeList () {
      totalTeamTypeList().then(res => {
        const {data: nData} = res[1];
        const { data, code } = nData;
        if (code === 200) {
          this.setTotalList(deepChange(data || []))
        }
      }).catch(err => {console.log(err)})
    },
  }

}