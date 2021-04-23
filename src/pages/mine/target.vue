<template>
  <div class="w_target">{{text}}</div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: 'AMEA'
    }
  }
}
</script>

<style lang="scss" scoped>
.w_target {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 60rpx;
  padding: 0 24rpx;
  font-size: 28rpx;
  border-radius: 30rpx;
}
</style>
