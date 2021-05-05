<template>
  <page-sj>
    <div class="about_us">
      <scroll-box>
        <div class="content">

          <div class="header_img"></div>

          <div class="text_box">
            <div class="title">
              <div class="title_bg"></div>
              <div class="tit">关于我们</div>
            </div>
            <div class="text_msg" v-html="textMsg">
            </div>
          </div>
        </div>
        
        <!-- 底部logo -->
        <bottom-logo/>
      </scroll-box>
    </div>
    <FabGroup/>
  </page-sj>
  
</template>

<script>
import scrollBox from '@/components/scrollBox';
import pageSj from '@/components/scrollBox';
import bottomLogo from "@/components/bottomLogo";
import FabGroup from '@/components/fabGroup';
import { textMsg } from './const';
export default {
  name:'about_us', 
  components: { bottomLogo, scrollBox, pageSj, FabGroup },
  data () {
    return {
      textMsg,
    }
  },
}
</script>

<style lang="scss" scoped>
.about_us{
  .content{
    .header_img{
      height: 320rpx;
      width: 100%;
      @include img_bg('http://qrw69n75w.hn-bkt.clouddn.com/web-16.png');
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
          background: rgba(255 ,155, 116 , .2);
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
  }
}
</style>