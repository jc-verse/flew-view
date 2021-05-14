<template>
  <div class="group_info_item" :style='{background: cardStatu.bgColor || ""}'>
    <div class="event_tip">我申请的</div>
    <div class="msg_title">{{cardStatu.title || ''}}</div>
    <infoHead :infoData='infoData'/>

    <div class="content">
      <!-- 个人信息 -->
      <information :topList='tops'/>
      <!-- 经历 -->
      <div class="center">
        <join-list title='比赛经历'       :list='bList' v-if="cardStatu.showInfo.include(1) && bList.length"/>
        <join-list title='希望参加的比赛'  :list='tags'  v-if="cardStatu.showInfo.include(3) && tags.length" type='tag'/>
        <join-list title='个人留言'        :value='msg'  v-if="cardStatu.showInfo.include(2) && msg" type='text'/>
      </div>
    </div>
    <div class="btn_box">
      <div class="buoy" @click="clickBuoy(1)" >取消申请</div>
    </div>
    <DiyPopup ref='popup' :noUp='true'>
      <div class="tip_box" slot='tip' @click.stop>
        <div class="title">取消申请</div>
        <div class="msg">是否确认取消申请！</div>
        <div class="btns">
          <div class="no" @click.stop="close(false, 1)">取消</div>
          <div class="yes" @click.stop="close(true, 1)">确定</div>
        </div>
      </div>
    </DiyPopup>
  </div>
</template>

<script>
import joinList from '@/components/cards/joinList';
import infoHead from '@/components/cards/infoHead';
import information from '@/components/cards/information';
import DiyPopup from '@/components/diyPopup';
import { styles } from './const';
import { bsToStrFn, topListFn } from './units';

function filterSFn (val) {
  const { type, matchName, nikeName } = val;
  let obj = { title: '', bgColor: styles[type].bg ,showInfo: [] } // 1 比赛经历  2个人留言  3 希望参加
  if (type == 1) {
    obj.title = `竞赛组队：我向${nikeName}发起${matchName}的竞赛组队`;
    obj.showInfo = [ 1, 3 ]
  } else if (type == 2) {
    obj.title = `学术帮助：我向${nikeName}提出学术帮助`
    obj.showInfo = [ 1, 2 ]
  } else if (type == 3) {
    obj.title = `学校咨询：我向${nikeName}提出学校咨询`
    obj.showInfo = [ 1, 2 ]
  }
  return obj
}
export default {
  name: 'group_item',
  components: { infoHead, information, joinList, DiyPopup },
  props: {
    infoData : {
      type:Object,
      default:()=>({})
    }
  },
  data () {
    return {
      type: 1, // 点击时按钮编码
    }
  },
  computed : {
    tops() {
      const { infoData } = this;
      const arr = topListFn(infoData);
      return arr
    },
    bList() {
      const { competitionExperience  } = this.infoData;
      const arr = bsToStrFn(competitionExperience)
      return arr
    },
    tags() {
      const { matchList } = this.infoData || {};
      const arr = (matchList || '').split(',');
      return arr
    },
    msg () {
      const { infoData } = this;
      let  massage = ''
      if (infoData.personalMessage) {
        massage = infoData.personalMessage
      } else {
        massage = '暂未添加个人留言'
      }
      return massage
    },
    cardStatu () {
      return filterSFn(this.infoData)
    }
  },
  methods:{
    // 点击组队申请！
    clickBuoy (type) {
      this.type = type; // 1: 取消申请
      this.$refs.popup.show()
    },
    close (flag) {
      if (flag) {
        const { infoData, type } = this
        this.$emit('clickBtn', type, infoData)
      }
      this.$refs.popup.hide()
    },
  }
}
</script>

<style lang="scss" scoped>
@import url("/static/fonts/iconfont.css");
.group_info_item{
  background: #FFFFFF;
  border-radius: 8px;
  padding: 90rpx 30rpx 60rpx;
  margin-bottom: 20rpx;
  position: relative;

  .event_tip{
    position: absolute;
    left: 0;
    top: 0;
    padding: 20rpx;
    background: rgba(255, 215, 131, .2);
    border-radius: 30rpx 0px 30rpx 0;
    @include fontMixin(28rpx, #E59024)
  }
  .msg_title {
    @include fontMixin(32rpx,#000000,bold );
    @include ellipsis;
    line-height: 44rpx;
    margin-bottom: 30rpx;
    padding-right: 30rpx;
  }
  .content>div:not(:last-child){
    border-bottom: 2rpx solid #ECEEF6;
  }
  .team_member{
    display: flex;
    @include flex_center;
    @include fontMixin(30rpx, #676FDF ,400);
    .left{
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
    i{ 
      padding: 24rpx;
      color: rgba(0, 0, 0, 0.3)
    }
    .icon_active{
      transform: rotate(-90deg);
    }
  }
  .btn_box{
    position: absolute;
    top: 175rpx;
    right: 0;
    display: flex;
    justify-content: revert;
    flex-direction: row-reverse;
    .buoy, .evaluate{
      background: #eeeeee ;
      padding: 10rpx 20rpx;
      @include fontMixin(28rpx, #666666 );
    }
    .buoy{
      border-radius: 30rpx 0 0 30rpx;
      @include fontMixin(28rpx, #666666 );
    }
    .yes{
      background: rgba(92, 134, 242, .1);
      color: rgb(92, 134, 242);
    }
    .evaluate{
      border-radius: 30rpx;
      margin-right: 10rpx;
    }
  }
  
  
  .tip_msg{
    padding-top: 20rpx;
    @include fontMixin(30rpx,#676FDF)
  }
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