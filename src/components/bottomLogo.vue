<template>
  <div class="b_logo">
    <div class="img_box">
      <img src="@/static/img1/bottom_logo.png" alt="">
    </div>
  </div>
</template>

<style lang='scss' scoped>
  .b_logo{
    width: 100%;
    padding: 10px 0;
    display: flex;
    justify-content: center;
    .img_box{
      height: 70rpx;
      width: 358rpx;
      @include img_fill;
    }
  }
</style>