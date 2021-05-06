import { totalTeamTypeList } from '@/common/api';
import { deepChange } from '@/common/utils';

export default {
  data () {
    return {
      totalList: []
    }
  },
  onShow() {
    const arr = getApp().globalData.totalList || [];
    const { totalList, } = this;
    if (!totalList.length && arr.length) {
      this.totalList = [ ...arr ]
    } else if (!totalList.length && !arr.length) {
      this.totalTeamTypeList()
    }
  },
  methods: {
    // 获取希望参加的list
    totalTeamTypeList () {
      totalTeamTypeList().then(res => {
        const {data: nData} = res[1];
        const { data, code } = nData;
        if (code === 200) {
          this.totalList = deepChange(data || [])

          getApp().globalData.totalList = [...this.totalList];
        }
      }).catch(err => {console.log(err)})
    },
  }
}