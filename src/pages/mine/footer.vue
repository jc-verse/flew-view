<template>
  <div class="footer_wrap">
    <div class="content">{{text}}</div>
    <div class="icon iconfont arrow-right"></div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
.display_center {
  display: flex;
  align-items: center;
}

.footer_wrap {
  height: 92rpx;
  border-top: #f7e7c9 2rpx solid;
  @extend .display_center;

  .content {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    height: 100%;
    @extend .display_center;
    color: #676FDF;
    font-weight: 400;
    font-size: 30rpx;
  }

  .icon {
    width: 60rpx;
    height: 100%;
  }
}
</style>