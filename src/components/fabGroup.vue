<template>
  <movable-area class="movable_box">
    <movable-view
      class="max"
      direction="vertical"
      :y="450"
      inertia
      :damping="50"
    >
      <div class="fab_group">
        <!-- <cover-view class="controls-title"> -->
        <div
          class="user fab"
          v-for="(item, ind) in newList"
          :key="ind"
          @click.stop="handleClick(ind)"
        >
          <i v-if="item.icon" :class="['iconfont', 'icon_item', item.icon]"></i>
        </div>
        <!-- </cover-view> -->
      </div>
    </movable-view>
  </movable-area>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { isLogin, toLogin } from '@/common/utils';

  @Component
  class fabGroup extends Vue {
    @Prop({ default: [0, 1] }) shows!: number[];

    list = [
      { icon: 'iconuser' },
      { icon: 'iconzhuye' },
      { icon: 'iconkefu', name: '联系客服' },
      { icon: 'icontuichu1', name: '注销' },
    ];

    get newList() {
      return this.list.filter(
        (_, ind) =>
          this.shows.includes(ind) && (isLogin() || ![0, 2].includes(ind)),
      );
    }

    clickHandlers = [
      () => {
        if (isLogin()) {
          uni.navigateTo({ url: '/pages/mine/index' }); // 我的
        } else {
          this.$emit('noLogin');
        }
      },
      () => uni.navigateTo({ url: '/pages/home/index' }),
      () => this.$emit('QRPopup'),
      () => this.$emit('unLogin'),
    ];

    toLogin = toLogin;

    handleClick(ind: number) {
      this.$emit('clickItem', this.list[ind]);
      this.clickHandlers[ind]();
    }
  }
  export default fabGroup;
</script>

<style lang="scss" scoped>
  @import url('/static/fonts/iconfont.css');

  .movable_box {
    position: fixed;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 90vh;
    z-index: 100;
    .fab_group {
      .fab {
        // min-width: 96rpx;
        padding: 0 20rpx;
        box-sizing: border-box;
        height: 80rpx;
        background: #fbfbfc;
        border-radius: 40rpx 0% 0% 40rpx;
        color: #5c7bc1;
        box-shadow: #5c7bc1;
        // z-index: 1;
        @include pointer;
        @include flex_center;
        .icon_item {
          font-size: 48rpx;
        }
      }
      .fab:not(:first-child) {
        margin-top: 20rpx;
      }
    }
    .max {
      // width: 96rpx;
      width: auto;
      right: 0;
      left: auto;
      height: auto;
    }
    .controls-title {
      z-index: 999;
    }
  }
</style>
