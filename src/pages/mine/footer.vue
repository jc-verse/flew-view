<template>
  <div class="footer_wrap">
    <div class="content"></div>
    <div class="icon"></div>
  </div>
</template>

<script>
export default {

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
    @extend .display_center;
  }

  .icon {
    width: 60rpx;
  }
}
</style>