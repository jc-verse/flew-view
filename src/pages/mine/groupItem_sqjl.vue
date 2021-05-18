<template>
  <div class="group_info_item" :style='{background: statusInfo.bgColor}'>

    <div class="msg_title" :class="[showTitle?'ellipsis': '']" @click="clickTitle">{{ statusInfo.title }}</div>
    <infoHead :infoData='statusInfo.cardInfo'/>
    <div class="content">
      <!-- 个人信息 -->
      <information :topList='tops'/>
      <!-- 团队成员信息 -->
      <div class="group_infos" v-if='slaveList.length && statusInfo.showSlaveList'>
        <div class="team_member" @click="showInfo=!showInfo">
          <div class="left">团队成员：{{slaveList}}</div>
          <i @click='showList = !showList' class='iconfont iconxiala' :class="[!showList? 'icon_active': '']"></i>
        </div>
        <!-- 团队成员信息 -->
        <CrewInfo :styles='{background: "rgba(255,255,255,0)"}' :info='ite' v-for="(ite, ind) in infoData.slave" :key='ind' v-show="showInfo"/>
      </div>
      <!-- 当前状态 -->
      <div class="group_infos">
        <div class="tip_msg">
          {{ statusInfo.tip || '' }}
        </div>
      </div>
    </div>

    <div class="btn_box">
      <div class="buoy" v-if="statusInfo.showInfo.includes(8)" @click="clickBuoy(8)">联系客服</div>
      <div class="buoy" v-if="statusInfo.showInfo.includes(9)" @click="clickBuoy(9)" >评价</div>
    </div>

    <DiyPopup ref='popup' title="本次服务怎么样？来个评价吧！" @popupclosed='popupclosed'>
      <template slot='content' style='height:100%'>
        
        <div class="rate_box">
          <div class="rate_item" v-for="(item, index) in rateHeads" :key='index'>
            <div class="rate_title">{{item.title}}</div>
            <div class="rate_content">
              <Rate :size="32" :value="rateForm[item.code]  || 0" :max="5" @change='changeRate($event,item.code)'></Rate>
            </div>
          </div>
        </div>
      </template>
    </DiyPopup>
  </div>
</template>

<script>
import joinList from '@/components/cards/joinList';
import infoHead from '@/components/cards/infoHead';
import information from '@/components/cards/information';
import Rate from '@/components/cards/rate';
import CrewInfo from '@/components/cards/crewInfo';
import DiyPopup from '@/components/diyPopup';
import { bsToStrFn, topListFn } from './units';
import { statusScreen, joinName } from './units'
export default {
  name: 'group_item',
  components: { infoHead, information, joinList, DiyPopup, Rate, CrewInfo },
  props: {
    infoData : {
      type:Object,
      default:()=>({})
    },
    userId : {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      showTitle: true,
      showInfo: false,
      showList: false,
      type: 8,
      rateForm: {
        "dimension1": 3,
        "dimension2": 3,
        "dimension3": 3,
        "dimension4": 3,
      },
  // "relationshipId": 0
      rateHeads: [
        { title: '知识水平', value: '', code: 'dimension1' },
        { title: '理解程度', value: '', code: 'dimension2' },
        { title: '讲课态度', value: '', code: 'dimension3' },
        { title: '授课效率', value: '', code: 'dimension4' },
      ]
    }
  },
  computed : {
    tops() {
      const { statusInfo } = this;
      const arr = topListFn(statusInfo.cardInfo);
      return arr
    },
    statusInfo() {
      const { userId, infoData } = this;
      return statusScreen(infoData, userId)
    },
    slaveList () {
      const slave = this.infoData.slave || [];
      return joinName(slave) || ''
    },
  },
  // mounted() {
  //   this.$refs.popup.show()
  // },
  methods:{
    clickTitle() {
      this.showTitle = !this.showTitle;
    },
    changeRate (e,code) {
      console.log(133,e,code)
      this.rateForm[code] = e.value
    },
    popupclosed (flag) {
      if (flag) {
        const { infoData, rateForm } = this;
        this.$emit('clickBtn', 9, { data: infoData, rates: rateForm});
      }
      // this.$refs.popup.hide()
    },
    // 点击组队申请！
    clickBuoy (type) {
      this.type = type;
      switch (type) {
        case 8:
          console.log('联系客服');
          this.$emit('clickBtn', type, { data: this.infoData })
          break;
        case 9:
          console.log('评价');
          this.$refs.popup.show()
          break;
        default:
          break;
      }
    }
  },
}
</script>

<style lang="scss" scoped>
@import url("/static/fonts/iconfont.css");
.group_info_item{
  background: #FFFFFF;
  border-radius: 8px;
  padding: 40rpx 30rpx 40rpx;
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
    line-height: 44rpx;
    margin-bottom: 30rpx;
    padding-right: 30rpx;
  }
  .ellipsis{
    @include ellipsis;
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
    top: 136rpx;
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

.group_infos{
  border-top: 2rpx solid rgba(0, 0, 0,.1);
}

.rate_box{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  .rate_item{
    padding: 40rpx;
    @include flex_center;
    flex-direction: column;
    @include fontMixin(32rpx, #000, bold);
    .rate_title{
      padding: 10rpx;
    }
  }
}
.group_infos{
  border-top: 2rpx solid rgba(0, 0, 0,.1);
  .team_member{
    display: flex;
    @include flex_center;
    justify-content: space-between;
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
}
</style>