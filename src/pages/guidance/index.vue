<template>
<!-- 1.引导 -->
  <page-sj>
    <div class="content_box">
      <!-- 顶部海报 -->
      <div class="top_box" >
        <img src="@/static/img1/poster.png" alt="">
      </div>
      <!-- 中间操作 -->
      <div class="bottom_box">
        <p class="font_1">欢迎来到 视界 | Reach</p>
        <!-- open-type="getUserInfo" bindgetuserinfo='getuserinfo' -->
        <button type="default"  class="btn" @click="clickBtn">进入</button>
      </div>
      <!-- 底部logo -->
      <bottom-logo/>
    </div>
  </page-sj>
</template>
<script>
import bottomLogo from "@/components/bottomLogo";
import pageSj from '@/components/pageSjNew';
export default {
  name:'guidance',
  components:{ bottomLogo, pageSj },
  data() {
    return {}
  },
  onShow() {
    uni.hideTabBar({
      //这里是为了不那么唐突
      animation:true,
      success() {
        console.debug('隐藏成功')
      }
    })
  },
  methods: {
    clickBtn() {
      uni.navigateTo({ url: '/pages/home/index' })
    }
  }
}
</script>
<style lang='scss' scoped>
.font_1{
  @include fontMixin(42rpx, #4E2B2D, bold)
}
.content_box{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 100%;
  .top_box{
    width: 100%;
    height: 704rpx;
    flex-grow: 0;
    @include img_fill;
  }
  .btn{
    margin-top: 70rpx;
    width: 384rpx;
    height: 80rpx;
    background: #676FDF;
    border-radius: 40rpx;
    line-height: 80rpx;
    color: white;
  }
}
</style>