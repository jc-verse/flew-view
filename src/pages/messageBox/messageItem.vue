<template>
  <div class="message_item">
    <div class="msg_title" v-if="info.type"
      >【{{ info.type | filterType }}】</div
    >
    <div class="msg_content" :class="[showDetail ? '' : 'ellipsis']">
      {{ info.content || "" }}
    </div>
    <div class="unRead" v-if="info.status == 1"></div>
    <div
      class="link"
      v-if="info.content && info.content.length > 20 && !showDetail"
      @click="clickDetail"
      >查看详情</div
    >
  </div>
</template>
<script>
  export default {
    props: {
      info: {
        type: Object,
        default: () => ({}),
      },
    },
    data() {
      return {
        showDetail: false,
      };
    },
    filters: {
      filterType(val) {
        const types = {
          1: "被申请",
          2: "申请中反馈",
          3: "发起中反馈",
          4: "申请组队被申请",
        };
        return types[val] || "";
      },
    },
    methods: {
      clickDetail() {
        this.showDetail = !this.showDetail;
      },
    },
  };
</script>
<style lang="scss" scoped>
  .message_item {
    padding: 32rpx 30rpx;
    background: #ffffff;
    border-radius: 32rpx;
    margin-bottom: 20rpx;
    position: relative;

    .msg_title {
      line-height: 44rpx;
      @include fontMixin2(32rpx, #000000, bold);
    }
    .ellipsis {
      @include ellipsis;
    }

    .msg_content {
      margin: 6rpx 0 12rpx;
      // height: 40rpx;
      font-weight: 400;
      line-height: 40rpx;
      @include fontMixin2(28rpx, #666666);
    }

    .link {
      height: 34rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      line-height: 34rpx;
      @include fontMixin2(24rpx, #676fdf);
    }
    .unRead {
      position: absolute;
      top: 20rpx;
      right: 20rpx;
      width: 20rpx;
      height: 20rpx;
      background: red;
      border-radius: 50%;
    }
  }
</style>
