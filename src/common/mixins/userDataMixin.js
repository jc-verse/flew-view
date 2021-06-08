import { userCardInfo } from '@/common/api';
import { setStorage } from '@/common/utils';
const isObject = (val) => {
  return  Object.prototype.toString.call(val) === "[object Object]"
}
export default {
  data () {
    return {
      userData: {}
    }
  },
  onShow() {
    const obj = getApp().globalData.userData;
    const keys = Object.keys(obj)
    if (isObject(obj) && keys.length) {
      console.log(222, obj)
    } else {
      this.getUserInfo();
    }
  },
  methods: {
    // 获取信息
    getUserInfo() {
      userCardInfo().then(res=> {
        const { data:nData } = res[1];
        const { data, code } = nData;
        if (code === 200) {
          data.wxCode = data.wxNum || '';
          data.name = data.userName || '';
          setStorage({userId: data.id})
          getApp().globalData.userData = {...data} || {};
          this.userData = {...data} || {};
        }
      }).catch(err => {console.log(err)})
    },
  }

}