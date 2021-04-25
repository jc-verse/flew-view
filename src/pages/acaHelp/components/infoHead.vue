<template>
  <div class="info_head" :style='styles'>
    <div class="left">
      <div class="user_head" :style="headStyles">
        <img src="@/static/img1/icon_8.png" alt="">
      </div>
      <div class="title" :style='styles'> {{iconFilter.name || ''}} </div>
      <div :class='["gender", iconFilter.value]' :style='styles'>
        <i :class="['iconfont', 'icon_item', iconFilter.icon ]"></i>
      </div>
    </div>

    <div class="right">
      <slot name='right'></slot>
    </div>
  </div>
</template>

<script>
export default {
  name:'info_head',
  props: {
    iconFilter: {
      type: Object,
      default: ()=>({})
    },
    headStyles: {
      type: String,
      default: 'width: 100rpx;height: 100rpx'
    },
    styles: {
      type: String,
      default: ''
    } 

  }
}
</script>

<style lang="scss" scoped>
@import url("/static/fonts/iconfont.css");
@mixin font_1{
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: bold;
  color: #131415;
  line-height: 25px;
}
.info_head{
  display: flex;
  justify-content: space-between;
    align-items: center;
  .left{
    display: flex;
    align-items: center;
  }
  div{
    margin-right: 20rpx;
  }
  .user_head{
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
    overflow: hidden;
    @include img_fill;
  }
  .title{
    @include font_1;
  }
  .gender{
    .icon_item{
      border-radius: 50%;
      background: rgba(154, 174, 228, .6);
      padding: 8rpx;
      color: #ffffff;
      font-size: 28rpx;
    }
  }
  .nv{
    transform: rotate(45deg);
    .icon_item{
      background: rgba(255, 133, 171, .6);
    }
  }
}
</style>