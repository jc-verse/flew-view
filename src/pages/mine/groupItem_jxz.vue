<template>
  <div class="group_info_item" :style="{background: cardStatu.bgColor }">

    <div class="msg_title">{{cardStatu.title || ''}}</div>
    <infoHead :infoData='infoData'/>

    <div class="content">
      <!-- 个人信息 -->
      <information :topList='tops'/>
      <!-- 团队成员信息 -->
      <div class="group_infos" v-if='slaveList.length'>
        <div class="team_member" @click="showInfo=!showInfo">
          <div class="left">团队成员：{{slaveList}}</div>
          <i @click='clickDown' class='iconfont iconxiala' :class="[!showList? 'icon_active': '']"></i>
        </div>
        <!-- 团队成员信息 -->
        <CrewInfo :info='ite' v-for="(ite, ind) in infoData.slave" :key='ind' v-show="showInfo"/>
      </div>
    </div>
    <div class="btn_box">
      <template >
        <div class="buoy yes" v-if="cardStatu.showInfo.includes(4)" @click="clickBuoy(4)" >退出组队</div>
        <div class="buoy yes" v-if="cardStatu.showInfo.includes(5)" @click="clickBuoy(5)" >完成</div>
        <div class="evaluate" v-if="cardStatu.showInfo.includes(6)" @click="clickBuoy(6)" >停止组队</div>          
        <div class="evaluate" v-if="cardStatu.showInfo.includes(7)" @click="clickBuoy(7)" >开启组队</div>
      </template>
    </div>
    <div class="sign_box" v-if="cardStatu.showTask">任务</div>

    <DiyPopup ref='popup' :noUp='true'>
      <div class="tip_box" slot='tip' @click.stop>
        <div class="title">{{popupStatu.title || ''}}</div>
        <div class="msg">{{ popupStatu.msg || '' }}</div>
        <div class="btns">
          <div class="no" @click.stop="close(false, type)">取消</div>
          <div class="yes" @click.stop="close(true, type)">确定</div>
        </div>
      </div>
    </DiyPopup>
  </div>
</template>

<script>
import joinList from '@/components/cards/joinList';
import infoHead from '@/components/cards/infoHead';
import information from '@/components/cards/information';
import CrewInfo from '@/components/cards/crewInfo';
import DiyPopup from '@/components/diyPopup';

import { styles } from './const';
import { bsToStrFn, topListFn, joinName } from './units';
const popups = {
  '4': { title: '退出组队', msg: '是否确认退出组队！', type: 4 },
  '5': { title: '完成', msg: '是否确认完成！', type: 5 },
  '6': { title: '停止组队', msg: '是否停止组队!', type: 6 },
  '7': { title: '开启组队', msg: '是否开启组队!', type: 7 },
}
function filterSFn (val, userId) {
  const { type, matchName, nikeName, id, isOrganize } = val;
  let obj = { title: '', bgColor: styles[type].bg ,showInfo: [], showTask: false } // 1 比赛经历  2个人留言  3 希望参加
  console.log('我是用户id：'+userId, ';我是队长Id：'+ id, `;我是不是队长：${userId == id?'是' : '不是'}`)
  console.log('【119】是卡片的全部数据')
  console.log(119, val)
  if (userId == id) { // 队长
    if (type == 1) {
      obj.title = `竞赛组队：${matchName}`;
      if (isOrganize == 1) {
        obj.showInfo = [5, 7]
      } else if (isOrganize == 2) {
        obj.showInfo = [5, 6]
      } else {
        obj.showInfo = [5]
      }
    } else if (type == 2) {
      obj.title = `学术帮助`
      obj.showTask = true;
      obj.showInfo = [5]
    } else if (type == 3) {
      obj.title = `学校咨询`
      obj.showTask = true;
      obj.showInfo = [5]
    }
  } else {
    if (type == 1) {
      obj.title = `竞赛组队:${matchName}`;
      obj.showInfo = [4]
    } else if (type == 2) {
      obj.title = `学术帮助` //：我向${nikeName}提出学术帮助
    } else if (type == 3) {
      obj.title = `学校咨询` // ：我向${nikeName}提出学校咨询
      
    }
  }
  return obj
}
export default {
  name: 'group_item',
  components: { infoHead, information, joinList, CrewInfo, DiyPopup },
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
      showList: false,
      showInfo: false,
      type: 4
    }
  },
  computed : {
    tops() {
      return topListFn(this.infoData)
    },
    slaveList () {
      const slave = this.infoData.slave || [];
      return joinName(slave) || ''
    },
    popupStatu () {
      return popups[this.type]
    },
    cardStatu () {
      return filterSFn(this.infoData, this.userId)
    },
  },
  methods:{
    clickDown () {
      this.showList = !this.showList
    },
    clickBuoy (type) {
      this.type = type; // 4:退出组队 5: 完成  6: 关闭组队  7 开启组队  
      this.$refs.popup.show()
    },
    close (flag) {
      this.$refs.popup.hide()
      if (!flag) return
      const { infoData, type } = this
      this.$emit('clickBtn', type, { data: infoData })
    },
  }

}
</script>

<style lang="scss" scoped>
@import url("/static/fonts/iconfont.css");
.group_info_item{
  background: #FFFFFF;
  border-radius: 8px;
  padding: 40rpx 30rpx;
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
    @include fontMixin(30rpx,#676FDF);
    border-top: 2rpx solid rgba(0, 0, 0, 0.1);
  }
  .sign_box{
    position: absolute;
    right:20rpx;
    top: 10rpx;
    transform: translateX(50%) rotate(45deg);
    background-color: #FFE2BD;
    padding: 0 30rpx;
    @include fontMixin(24rpx,#DD8A20)
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