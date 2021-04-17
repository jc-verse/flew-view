<template>
<!-- 1.引导 -->
  <div>
    <div class="content_box">
      <!-- 顶部海报 -->
      <div class="top_box" >
        <img src="@/static/img1/poster.png" alt="">
      </div>
      <!-- 中间操作 -->
      <div class="bottom_box">
        <p class="font_1">欢迎来到 视界 | Reach</p>
        <button type="default" class="btn" @click="clickBtn">进入</button>
      </div>
      <!-- 底部logo -->
      <bottom-logo/>
    </div>
  </div>
</template>
<script>
import bottomLogo from "@/components/bottomLogo.vue";
export default {
  name:'guidance',
  components:{ bottomLogo },
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
      uni.navigateTo({ url: '/pages/competition/competition' })
    }
  }
}
</script>
<style lang='scss' scoped>
.font_1{
  font-size: 21px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #4E2B2D;
  line-height: 29px;
}
.content_box{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 93vh;
  .top_box{
    width: 100%;
    img{
      width:100%
    }
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