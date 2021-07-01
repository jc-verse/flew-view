<template>
  <div class="group_info_item" :style="{background: cardStatu.bgColor }">

    <div class="msg_title">{{cardStatu.title || ''}}</div>
    <infoHead :infoData='cardInfo' headStyles='width:70rpx;height:70rpx' fontSize='34'>
      <template slot="right"> 
        <div class="btn_box">
          <div class="blue" v-if="cardStatu.showInfo.includes(4)" @click="clickBuoy(4)" >退出组队</div>
          <div class="blue" v-if="cardStatu.showInfo.includes(5)" @click="clickBuoy(5)" >完成</div>
          <div class="" v-if="cardStatu.showInfo.includes(6)" @click="clickBuoy(6)" >停止组队</div>          
          <div class="" v-if="cardStatu.showInfo.includes(7)" @click="clickBuoy(7)" >开启组队</div>
          <div class="" v-if="cardStatu.showInfo.includes(12)" @click="clickBuoy(12)" >退出</div>
          <!-- <div class="" v-if="cardStatu.showInfo.includes(13)" @click="clickBuoy(13)" >移除</div> -->
          <!-- <div class="blue" v-if="cardStatu.showInfo.includes(8)" @click="clickBuoy(8)" >联系客服</div> -->
        </div>
      </template>
    </infoHead>

    <div class="content">
      <!-- 个人信息 -->
      <information :topList='tops'/>
      <join-list v-if="cardStatu.showPhone || cardStatu.showMobile" title='联系方式' type='diy'>
        <template slot="diy" style='margin-bottom:20rpx'>
          <span class="copy">手机号：{{phoneOrMobile || ''}}</span>
          <span class="copy_btn" @click="copy(phoneOrMobile)">复制</span>
        </template>
      </join-list>
      <div class="QR_group" v-if="cardStatu.QRMsg">
        <div class="QR_tip">
          <div v-html="cardStatu.QRMsg"></div>
        </div>
        <div class="qr_img" @click="copy(copyItem.wxCode)">
          <image :src="QRImg" alt="" show-menu-by-longpress>
        </div>
      </div>
      <!-- 团队成员信息 -->
      <div class="group_infos" v-if='slaveList'>
        <div class="team_member" @click="showInfo=!showInfo">
          <div class="left">团队成员：{{slaveList}}</div>
          <i @click='clickDown' class='iconfont iconxiala' :class="[!showList? 'icon_active': '']"></i>
        </div>
        <!-- 团队成员信息 -->
        <CrewInfo 
          :styles='{background: "auto"}' 
          :info='ite' 
          v-for="(ite, ind) in cardStatu.slavelist" 
          :showBtn='showBtnList' 
          :showMobile ='cardStatu.showMobile'
          :key='ind' 
          v-show="showInfo"
          @clickBtn='clickBtnFn'
        />
      </div>
    </div>
    <div class="btn_box">
    </div>
    <div class="sign_box" v-if="cardStatu.showTask">任务</div>
    <TipPopup :title='popupStatu.title' ref='tipPopup' :msg='popupStatu.msg' @confirm='confirm'/>
    <TipPopup title='移除成员' ref='delPopup' msg='确认执行移除操作?' @confirm='delConfirm'/>
    <TipPopup title="操作提示" ref='noLogin' msg="是否登录后执行操作？" @confirm='toLogin'/>

  </div>
</template>

<script>
import joinList from '@/components/cards/joinList';
import infoHead from '@/components/cards/infoHead';
import information from '@/components/cards/information';
import CrewInfo from '@/components/cards/crewInfo';
import DiyPopup from '@/components/diyPopup';
import TipPopup from '@/components/cards/tipPopup'
import { isLogin, toLogin, copy } from '@/common/utils'
import { styles } from './const';
import { bsToStrFn, topListFn, joinName } from './units';
import { imgUrl } from '@/common/http'
const popups = {
  '4': { title: '退出组队', msg: '是否确认退出组队！', type: 4 },
  '5': { title: '完成', msg: '是否确认完成！', type: 5 },
  '6': { title: '停止组队', msg: '是否停止组队!', type: 6 },
  '7': { title: '开启组队', msg: '是否开启组队!', type: 7 },
  '8': { title: '联系客服', msg: '是否联系客服!', type: 8 },
  '12': { title: '退出活动', msg: '是否退出活动!', type: 12 },
}
function filterSFn (val, userId) {
  const { type, matchName, nikeName, id, isOrganize, academic, slave, activity = {}, subject, phone } = val;
  let obj = { title: '', bgColor: styles[type].bg ,showInfo: [], showTask: false, slavelist: [], showPhone: false, showMobile: false, QRMsg:'' } // 1 比赛经历  2个人留言  3 希望参加
  console.log('我是用户id：'+userId, ';我是队长Id：'+ id, `;我是不是队长：${userId == id?'是' : '不是'}`)
  console.log('【119】是卡片的全部数据')
  console.log(119, val)

  if (type == 1) {
    obj.showMobile = true
    if (userId == id) {
      obj.title = `竞赛组队：${matchName}`;
      if (isOrganize == 1) {
        obj.showInfo = [5, 7]
      } else if (isOrganize == 2) {
        obj.showInfo = [5, 6]
      } else {
        obj.showInfo = [5]
      }
    } else {
      obj.title = `竞赛组队:${matchName}`;
      obj.showInfo = [4]
    }
    obj.slavelist = slave || [];
  } else if (type == 2) { // 学术
    if (userId == academic.id) { // 申请人
      obj.title = `学术帮助: 向${nikeName}提出${subject}的学术帮助`
      obj.showInfo = [8];
      obj.QRMsg = `
        <p>对方已通过</p>
        <p>请添加客服微信号</p>
        <p>预约时间和缴费</p>
      `
    } else { // 队长
      obj.title = `学术帮助: ${academic.nikeName}向我提出${subject}的学术帮助` //：
      obj.showTask = true;
      obj.showInfo = [5];
      obj.QRMsg = `
        <p>对方已通过</p>
        <p>请添加客服微信号</p>
        <p>预约时间</p>
      `
    }
  } else if (type == 3) {
    if (userId == id) { // 被申请人
      obj.title = `学校咨询: ${academic.nikeName}向我提出学校咨询`
      obj.showTask = true;
      obj.showInfo = [5]
      obj.QRMsg = `
        <p>对方已通过</p>
        <p>请添加客服微信号</p>
        <p>预约时间</p>
      `
    } else {
      obj.title = `学校咨询: 向${nikeName}提出学校咨询` // ：我向${nikeName}提出学校咨询
      obj.QRMsg = `
        <p>对方已通过</p>
        <p>请添加客服微信号</p>
        <p>预约时间和缴费</p>
      `
    }
  } else if (type == 4) {
    obj.slavelist = slave || [];
    if (activity.serviceUid == userId) { // 发起者
      obj.title = `自主活动：${academic.nikeName}申请加入${activity.name}`
      obj.showInfo = [13]
    } else { // 成员
      obj.title = `自主活动：${activity.name}`
      obj.showInfo = [12]
      if (phone) {
        obj.showPhone = true
      }
    }
  }
  return obj
}
export default {
  name: 'group_item',
  components: { infoHead, information, joinList, CrewInfo, DiyPopup, TipPopup },
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
      QRImg: '', 
      copyItem: {},
      showList: false,
      showInfo: false,
      type: 4,
      detailData: {}
    }
  },
  onShow() {
    // const { copyWxData } = this.$store.state.QRData;
    // const [ copyItem ] = copyWxData;
    // this.QRImg = imgUrl+ copyItem.qrImg;
    // this.copyItem = copyItem;
  },
  mounted() {
    const { copyWxData } = this.$store.state.QRData;
    const [ copyItem ] = copyWxData;
    this.QRImg = imgUrl+ copyItem.qrImg;
    this.copyItem = copyItem;
  },
  computed : {
    tops() {
      return topListFn(this.cardInfo)
    },
    slaveList () {
      const slave = this.cardStatu.slavelist || [];
      return joinName(slave || []) || ''
    },
    popupStatu () {
      return popups[this.type]
    },
    cardStatu () {
      return filterSFn(this.infoData, this.userId)
    },
    cardInfo () {
      const { infoData, userId } = this;
      const { academic, id, type } = infoData;
      let info = {}
      if (type == 1) {
        info = infoData
      } else  if (type == 2) {
        if (academic.id == userId) { // 判断是否为队员
          info = infoData
        } else {
          info = academic
        } 
      } else if (type == 3) {
        if (id == userId) { // 判断是否为队长
          info = academic
        } else {
          info = infoData
        }
      } else {
        info = infoData
      }
      return info;
    },
    showBtnList () {
      const { showInfo }= this.cardStatu;
      if (showInfo.includes(13)){
        return [
          { code: 13, label: '移除' }
        ]
      } else {
        return []
      }
    },
    phoneOrMobile () {
      const { infoData, cardStatu } = this;
      const { phone, mobile } = infoData
      let num = ''
      if (cardStatu.showPhone) {
        num = phone
      }
      if (cardStatu.showMobile) {
        num = mobile
      }
      return num
    }
  },
  methods:{
    toLogin, copy,
    clickDown () {
      this.showList = !this.showList
    },
    clickBuoy (type) {
      if (!isLogin()) {
        this.$refs.noLogin.show()
        return 
      }
      this.type = type; // 4:退出组队 5: 完成  6: 关闭组队  7 开启组队   8：联系客服
      this.$refs.tipPopup.show()
    },
    confirm () {
      const { infoData, type } = this
      this.$emit('clickBtn', type, { data: infoData })
    },
    delConfirm () {
      const { detailData, type } = this
      this.$emit('clickBtn', type, { data: detailData })
    },
    clickBtnFn (type, data) {
      this.detailData = data;
      this.type = type
      this.$refs.delPopup.show();
    }
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
  overflow: hidden;

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
    // position: absolute;
    // top: 136rpx;
    // right: 0;
    display: flex;
    justify-content: revert;
    flex-direction: row-reverse;
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
.btn_box{
  display: flex;
  flex-direction: row-reverse;
  margin-right: -30rpx;
  > div {
    padding: 10rpx 10rpx;
    border-radius: 30rpx;
    background: #eeeeee ;
    @include fontMixin(26rpx, #666666 );
  }
  &>div:first-child{
    border-radius: 30rpx 0 0 30rpx;
  }
  &>div:not(:first-child){
    margin-right: 10rpx;
  }
  .disable{
    filter: grayscale(100%);
  }
  .blue{
    background: rgba(92, 134, 242, .1);
    color: rgb(92, 134, 242);
  }
  
}
.copy{
  color: #b0a8a8;
  }
.copy_btn{
  margin-left:20rpx;
  @include fontMixin(28rpx, #5C86F2)
}
.QR_group{
  width: 100%;
  // height: 200px;
  // background:red;
  padding: 20rpx;
  display: flex;
  justify-content: space-between;
  .QR_tip{
    flex-grow: 1;
    // background: blue;
    font-size: 28rpx;
    text-align: right;
    @include flex_center;
  }
  .qr_img{
    width: 250rpx;
    height: 250rpx;
    // margin: auto;
    @include img_fill;
  }
  .qr_tip{
    padding: 20rpx;
    text-align: center;
    color: #a1a1a1;
  }
  .wx_code{
    display: flex;
    justify-content: space-between;
    span{
      padding: 10rpx 20rpx;
      background: #0066ff;
      color: white;
      border-radius: 20rpx;
      font-size: 12px;
      margin: 20rpx 0 0;
    }
  }
}

</style>