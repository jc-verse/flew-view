<template>
  <div class="message_item">
    <div class="msg_title">{{msg.title}}</div>
    <div class="msg_content">
      {{msg.content}}
    </div>
    <div class="link">查看详情</div>
  </div>
</template>
<script>
export default {
  props: {
    msg: {
      type: Object,
      default: function() {
        return {}
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.message_item {
  padding: 32rpx 30rpx;
  background: #FFFFFF;
  border-radius: 32rpx;
  margin-bottom: 20rpx;
  
  .msg_title {
    height: 44rpx;
    font-size: 32rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #000000;
    line-height: 44rpx;
  }

  .msg_content {
    margin: 6rpx 0 12rpx;
    height: 40rpx;
    font-size: 28rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #666666;
    line-height: 40rpx;
  }

  .link {
    height: 34rpx;
    font-size: 24rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #676FDF;
    line-height: 34rpx;
  }
}
</style>
