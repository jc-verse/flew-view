<template>
<!-- 2.SAGE -->
<page-sj>
  <div class="page_box">
    <tag-group ></tag-group>
    <scroll-box @lower='lower'>
      <synopsis :info='newBg'>
        <div class="demo" @click="clickDemo">完善个人设置临时入口</div>
      </synopsis>
      <div class="group_info_list">
        <group-item v-for="(item, ind) in cardList" :totalList='totalList' :infoData='item' :key='ind' @clickBuoy='clickBuoy'/>
      </div>
    </scroll-box>
    <fab-group/>
  </div>
  <DiyPopup ref='popup' :noUp='true'>
    <div class="tip_box" slot='tip' @click.stop>
      <div class="title">组队申请</div>
      <div class="msg">是否确定</div>
      <div class="btns">
        <div class="no" @click.stop="close(false)">取消</div>
        <div class="yes" @click.stop="close(true)">确定</div>
      </div>
    </div>
  </DiyPopup>

</page-sj>
</template>

<script>
import pageSj from '@/components/pageSjNew';
import DiyPopup from '@/components/diyPopup';
import scrollBox from '@/components/scrollBox';
import fabGroup from '@/components/fabGroup';
import tagGroup from '@/components/forms/tagGroup' ;
import groupItem from './groupItem';
import synopsis from './synopsis';

import { getCurPage, joinUrl } from '@/common/utils';
import { branchCompetitionUser, totalTeamTypeList } from '@/common/api';
import { bgColors, demoData, deepChange  } from './const';


export default {
  name:'sage',
  components: { tagGroup, synopsis, groupItem, fabGroup, scrollBox, pageSj, DiyPopup },
  data() {
    return {
      show: false,
      index: 0,
      menuType: '1',
      cardList: [],
      current: 1,
      total: 0,
      demoData,
      totalList:[]
    }
  },
  computed: {
    newBg () {
      const { englishName, matchName } = (getCurPage() || {})
      const data = {
        ...bgColors[this.menuType],
        title: matchName || '',
        eTitle: englishName || ''
      };
      return data;
    }
  },
  mounted () {
    /*获取当前路由*/
    const { id, title } = getCurPage();
    this.menuType = id || 0;
    this.title = title || '';
    uni.setNavigationBarTitle({ title: this.title })
    this.getInfo();
    this.totalTeamTypeList();
  },
  methods : {
    getInfo () {
      const { menuType } = this;
      const params = {
        "current": 1,
        "organizeTypeSonId": '',
        "organizeTypeSonMatchId": menuType,
        "size": 10
      }
      branchCompetitionUser(params).then(res => {
        const { data: nData } = res[1];
        const { data, code } = nData;
        if (code === 200) {
          const { current, pages,records,searchCount, total  } = data;
          this.cardList = records.length ? records :demoData ;
          this.total = total;
        }
      })
    },
    // 获取希望参加的list
    totalTeamTypeList () {
      totalTeamTypeList().then(res => {
        const {data: nData} = res[1];
        const { data, code } = nData;
        if (code === 200) {
          this.totalList = deepChange(data || [])
        }
      }).catch(err => {console.log(err)})
    },
    clickBuoy (data) {
      this.open();
    },
    // 临时入口
    clickDemo () {
      uni.navigateTo({ url: joinUrl('/pages/userComplete/index') })
    },
    // 触底
    lower() {
      console.log(1992)
    },
    open() {
      this.$refs.popup.show()
    },
    close(flag) {
      this.$refs.popup.hide()
      if (flag) {
        uni.navigateTo({ url: joinUrl('/pages/userInfo/index',{type:'edit'}) })
      }
    }
  },
}
</script>

<style lang="scss" scoped>
@import url("/static/fonts/iconfont.css");
$color:#B3B3B4;
.page_box{
  display: flex;
  flex-direction: column ;
  background: #F1F3F5;
  .group_info_list{
    padding: 0 20rpx 20rpx;
    z-index: 1;
    margin-top: -40rpx;
  }
}
.demo {
  position: absolute;
  top: 10px;
  left: 10px;
  background: blue;
  border-radius: 10rpx;
  padding: 10rpx;
  color: #fff;
  font-family: HYQH-505;
}
.tip_box{
  width: 500rpx;
  // height: 300rpx;
  background: #ffffff;
  position: absolute;
  top:50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 101;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20rpx;
  .title{
    padding: 20rpx;
    font-weight: bold;
    width: 100%;
    text-align: center;
    // border-bottom: 1px solid #f5f5f5;
  }
  .msg{
    padding: 10rpx;
    min-height: 80rpx;
    width: 100%;
    text-align: center;
  }
  .btns{
    display: flex;
    width: 100%;
    justify-content: space-around;
    padding: 10rpx 0 20rpx;
    .yes, .no{
      text-align: center;
      border-radius: 30rpx;
      border: 1px solid rgba(92, 134, 242, 0.2);
      width: 150rpx;
      padding: 10rpx;
    }
    .yes{
      background: rgba(92, 134, 242, 0.2);
      color: #5C86F2
    };
    .no{
      border-color: auto;
    }
  }
}
</style>