<template>
  <div class="synopsis" :style="{ background: info.color || '#C8EDFF' }">
    <div class="head">
      <div class="title" v-if="info.title">{{ info.title || '' }}</div>
      <div class="title_en" v-if="info.eTitle">{{ info.eTitle || '' }}</div>
    </div>
    <div class="r_b">
      <img :src="info.url || 'http://prod.qiniucdns.sjreach.cn/web-28.png'" alt="" />
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
        default: () => ({}),
      },
    },
    data() {
      return {}
    },
    mounted() {},
  }
</script>

<style lang="scss" scoped>
  .synopsis {
    width: 100%;
    height: 350rpx;
    background: #c8edff;
    position: relative;
    flex-shrink: 0;
    box-sizing: border-box;
    padding-left: 15px;
    padding-top: 76rpx;
    // @include flex_(flex-start);
    .head {
      text-align: left;
      z-index: 1;
      .title {
        @include fontMixin(36rpx, #ffffff, bold);
      }
      .title_en {
        margin-top: 18rpx;
        @include fontMixin(28rpx, #ffffff, 400);
      }
    }
    .r_b {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 690rpx;
      height: 240rpx;
      @include img_fill;
    }
  }
</style>
