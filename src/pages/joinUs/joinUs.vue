<template>
  <div class="about_us">
    <diy-scroll class="dS" :styles='{height: isH5 ?"calc(100vh - 100rpx)": "100vh"}'>
      <div class="content">

        <div class="header_img">
          <img src="@/static/img1/join_bg.png" alt="">
        </div>

        <div class="text_box">
          <div class="title">
            <div class="title_bg"></div>
            <div class="tit">关于我们</div>
          </div>
          <div class="text_msg" v-html="textMsg">
          </div>
        </div>

        <div class="QRCodes">
          <div class="QRCode" v-for="(item, index) in QRList" :key="index">
            <div class="code">
              <img :src="item.code" alt="">
            </div>
            <div class="text">{{item.title}}</div>
          </div>
        </div>
      </div>
      
      <!-- 底部logo -->
      <bottom-logo/>
    </diy-scroll>
  </div>
</template>

<script>
import diyScroll from '@/components/diyScroll';
import bottomLogo from "@/components/bottomLogo";
import { textMsg } from './const';
export default {
  name:'about_us', 
  components: { diyScroll, bottomLogo },
  data () {
    return {
      textMsg,
      isH5: false,
      QRList: [
        { code:require('@/static/img1/QR_code.png'), title: '长按识别二维码加入我们的大家庭', id:1 },
        { code:require('@/static/img1/QR_code.png'), title: '长按识别二维码', id:2 },
      ]
    }
  },
  onLoad() {
    // #ifdef H5
      this.isH5 = true
    // #endif
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped>
.about_us{
  .content{
    .header_img{
      height: 320rpx;
      width: 100%;
      @include img_fill;
    }
    .text_box{
      padding: 30rpx;
      .title{
        display: inline-block;
        position: relative;
        height: 56rpx;
        width: 160rpx;
        .title_bg{
          position: absolute;
          bottom: 0;
          height: 20rpx;
          width: 100%;
          background: #D7DEF6;
        }
      }
      .tit{
        @include fontMixin(40rpx, #333333,bold);
        position: absolute
      }
      .text_msg{
        @include fontMixin(28rpx, #666666);
        line-height: 26px;
      }
    }
    .QRCodes{
      .QRCode{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 20rpx;
        .code{
          border: 26rpx solid #F3F5FC;
          width: 492rpx;
          height: 492rpx;
          @include img_fill;
        }
        .text{
          box-sizing: border-box;
          padding: 20rpx 0;
          @include fontMixin(28rpx, #666666)
        }
      }
    }
  }
}
</style>