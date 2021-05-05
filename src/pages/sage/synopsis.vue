<template>
  <div class="synopsis" :style='{ background: info.color || "#C8EDFF" }'>
    <div class="head">
      <div class="title" v-if="info.title">{{info.title || '' }}</div>
      <div class="title_en" v-if="info.eTitle">{{info.eTitle || ''}}</div>
    </div>
    <div class="r_b">
      <img src="/static/img1/icon_2.png" alt="">
    </div>

    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'synopsis',
  props: { 
    info: {
      type: Object,
      default: ()=> ({})
    }
  },
  mounted() {
    // console.log(1923, this.info)
  }
}
</script>

<style lang="scss" scoped>
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
      @include fontMixin(36rpx, #000000, bold);
    }
    .title_en{
      margin-top: 18rpx;
      @include fontMixin(28rpx, #333333, 400)
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