<template>
  <div class="scroll_box">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.scroll_box::-webkit-scrollbar{
  display:none;/*ChromeSafari*/
}
.scroll_box{
  height: calc(100vh - 200rpx);
  background: #F1F3F5;
  padding: 20rpx 30rpx;
  // max-height: 86%;
  overflow: scroll;
  flex-grow: 1;
}
</style>