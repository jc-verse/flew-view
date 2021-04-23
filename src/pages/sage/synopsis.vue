<template>
  <div class="synopsis">
    <div class="head">
      <div class="title">赛智全球中学生可持续发展创新大赛</div>
      <div class="title_en">Students for the Advancement of Global Entrepreneurship</div>
    </div>
    <div class="r_b">
      <img src="/static/img1/icon_2.png" alt="">
    </div>
  </div>
</template>
<script>
export default {
  name: 'synopsis',
}
</script>

<style lang="scss" scoped>
@mixin font_1{
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: bold;
  color: #000000;
}
@mixin font_2{
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
  line-height: 20px;
}
.synopsis{
  width:100%;
  height: 350rpx;
  background: #C8EDFF;
  position: relative;
  flex-shrink: 0;

  @include flex_center;
  .head{
    text-align: center;
    z-index: 1;
    .title{
      @include font_1;
    }
    .title_en{
      margin-top: 18rpx;
      @include font_2
    }
  }
  .r_b{
    position: absolute;
    bottom: 0;
    right: 0;
    width: 400rpx;
    height: 240rpx;
    @include img_fill;
  }
}
</style>