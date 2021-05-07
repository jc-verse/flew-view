import { userCardInfo } from '@/common/api';
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
          // data.competitionExperience = data.competitionExperienceList || [];
          // data.curriculumSystemType = Number(data.curriculumSystem) || '';
  
          // data.curriculumSystem = data.curriculumSystemList || [];
          // data.standardizedPerformance = data.standardizedPerformanceList || [];
          // if (!/http/.test(data.avatar)) {
          //   uni.getStorage({key:'avatarUrl',success: (res)=>{
          //     const { errMsg, data } = res;
          //     if (/ok/.test(errMsg)) {
          //       this.userData.avatar = data;
          //     }
          //   }});  
          // }
          data.wxCode = data.wxNum || '';
          data.name = data.userName || '';
          this.userData = {...data} || {};
        }
      }).catch(err => {console.log(err)})
    },
  }

}