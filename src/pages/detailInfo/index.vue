<template>
<page-sj>
  <div class="detail_info" >
    <scroll-box>
      <div class="content_box">
        <div class="top">
          <infoHead :infoData='cardInfo' :showGender='false'/>
          <!-- 个人信息 -->
          <information :topList='tops'/>
        </div>
        <div class="center">
          <join-list title='比赛经历' :list='bList'/>
          <join-list title='专用方向' :value='cardInfo.professionalDirection' v-if="cardInfo.professionalDirection" type='text' ></join-list>
          <join-list title='个人留言' :value='cardInfo.personalMessage' v-if="cardInfo.personalMessage" type='text'/>
        </div>
        <div class="bottom">
          <div class="headline">{{ `一对一指导需要收取一定费用哦` }}</div>
          <div class="join_box">
            <div class="left">
              <image :src="QRImg" alt="" show-menu-by-longpress>
            </div>
          </div>
          <div class="b_tip">了解详情长按保存二维码，添加客服。</div>
          <div class="wx_code" @click="copy(copyItem.wxCode)">
            <span>点击复制客服微信</span>
          </div>
        </div>
      </div>
      
      <!-- 底部logo -->
      <bottom-logo/>
    </scroll-box>
    <fab-group/>
  </div>
</page-sj>
  
</template>

<script>
import scrollBox from '@/components/scrollBox';
import pageSj from '@/components/pageSjNew';
import fabGroup from '@/components/fabGroup';
import bottomLogo from "@/components/bottomLogo";
import infoHead from '@/components/cards/infoHead';
import information from '@/components/cards/information';
import joinList from '@/components/cards/joinList';
import { topListFn, bsToStrFn } from './units';
import {imgUrl} from '@/common/http'
import {copy} from '@/common/utils'
import { copyWxData } from '@/common/server_qr_wx';
export default {
  name:'detail_info',
  components: { 
    scrollBox, 
    fabGroup, 
    bottomLogo,
    infoHead,
    information,
    joinList,
    pageSj
  },
  data() {
    const [ copyItem ] = copyWxData;
    return {
      show: false,
      index: 0,
      cardInfo: {},
      QRImg: imgUrl+ copyItem.qrImg,
      copyItem
    }
  },
  computed : {
    tops() {
      return topListFn(this.cardInfo)
    },
    bList() {
      const { competitionExperience  } = this.cardInfo;
      const arr = bsToStrFn(competitionExperience);
      return arr;
    },
  },
  onShow () {
    const this_ = this
    uni.getStorage({key: 'helpInfo', success:(res) => {
      const {errMsg, data} = res;
      if (/ok/.test(errMsg) && data) {
          this_.cardInfo = data
        }
    }})
  },
  methods : {
    copy
  },
}
</script>

<style lang="scss" scoped>
@import url("/static/fonts/iconfont.css");
$color:#B3B3B4;
.detail_info{
  display: flex;
  flex-direction: column ;
  background: #F1F3F5;
  .content_box{
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 0 20rpx;
  }
  .content_box>div{
    margin: 20rpx 0 10rpx 0;
    border-radius: 8px;
    background: #ffffff;
    width: 100%;
    padding: 30rpx;
    box-sizing: border-box;
  }
  .top{
  }
  .center{
    .tags{
      display: flex;
      flex-wrap: wrap;
      .tag {
        @include fontMixin(28rpx,#b0a8a8);
        margin-right: 20rpx;
      }
    }
  }
  .bottom{
    display: flex;
    flex-direction: column;
    align-items: center;
    .join_box>.left{
      width: 200rpx;
      height: 200rpx;
      @include img_fill;
    }
    .headline{
      @include fontMixin(36rpx, #131415 ,bold);
      padding: 20rpx 0;
      font-size: 30rpx;
    }
    .b_tip{
      @include fontMixin(24rpx, #666666)
    }
  }
}
.wx_code{
  display: flex;
  justify-content: center;
  span{
    padding: 10rpx 20rpx;
    background: #0066ff;
    color: white;
    border-radius: 20rpx;
    font-size: 12px;
    margin: 20rpx 0 0;
  }
}
</style>
