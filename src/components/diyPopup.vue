<template>
  <view class="uni-data-tree" @click.stop @touchmove.stop>
    <view class="uni-data-tree-input" @click.stop="handleInput">
      <slot :options="options" :data="inputSelected"></slot>
    </view>
    <!-- 遮罩层 -->
    <view class="uni-data-tree-cover" v-if="isOpened" @click="handleClose">
      <slot name="tip"></slot>
    </view>
    <!-- 内容区域 -->

    <view
      class="uni-data-tree-dialog"
      :style="{ top: styles.top }"
      v-if="isOpened && !noUp"
    >
      <view class="dialog-caption">
        <view class="title-area">
          <text class="dialog-title">{{ popupTitle }}</text>
        </view>
        <!-- 左侧关闭 -->
        <view class="dialog-close" @click.stop="handleClose(false)">
          <view class="dialog-close-plus" data-id="close"></view>
          <view
            class="dialog-close-plus dialog-close-rotate"
            data-id="close"
          ></view>
        </view>
        <!-- 右侧确定 -->
        <view class="dialog-confirm" @click.stop="handleClose(true)">确定</view>
      </view>
      <view style="height: 100%">
        <slot name="content"></slot>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component
  class diyPopup extends Vue {
    name = 'diyPopup';
    @Prop({ default: {} }) options!: [Object, any[]];
    @Prop({ default: '请选择' }) popupTitle!: string;
    @Prop({ default: { top: '20%' } }) styles!: Object;
    @Prop({ default: false }) noUp!: boolean;

    isOpened = false;
    inputSelected = [];

    show() {
      this.isOpened = true;
      this.$emit('popupopened');
    }
    hide(flag: boolean) {
      this.isOpened = false;
      this.$emit('popupclosed', flag);
    }
    handleInput() {
      this.show();
    }
    handleClose(bol: boolean) {
      this.hide(bol);
    }
  }

  export default diyPopup;
</script>

<style scoped lang="scss">
  .uni-data-tree {
    position: relative;
    font-size: 14px;
  }

  .error-text {
    color: #dd524d;
  }

  .uni-data-tree-cover {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 998;
    background-color: rgba(0, 0, 0, 0.4);
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    flex-direction: column;
  }

  .uni-data-tree-dialog {
    position: fixed;
    left: 0;
    top: 20%;
    right: 0;
    bottom: 0;
    background-color: #ffffff;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    flex-direction: column;
    z-index: 999;
    overflow: hidden;
    /* #ifdef APP-NVUE */
    width: 750rpx;
    z-index: 999;
    /* #endif */
  }

  .dialog-caption {
    position: relative;
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    flex-direction: row;
    border-bottom: 1px solid #f0f0f0;
  }

  .title-area {
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    align-items: center;
    /* #ifndef APP-NVUE */
    margin: auto;
    /* #endif */
    padding: 0 10px;
  }

  .dialog-title {
    font-weight: bold;
    line-height: 44px;
  }
  .dialog-confirm,
  .dialog-close {
    position: absolute;
    top: 0;
    bottom: 0;
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    flex-direction: row;
    align-items: center;
    padding: 0 15px;
  }
  .dialog-confirm {
    color: #676fdf;
    right: 0;
  }
  .dialog-close {
    left: 0;
  }

  .dialog-close-plus {
    width: 16px;
    height: 2px;
    background-color: #666;
    border-radius: 2px;
    transform: rotate(45deg);
  }

  .dialog-close-rotate {
    position: absolute;
    transform: rotate(-45deg);
  }

  /* #ifdef H5 */
  @media all and (min-width: 768px) {
    .uni-data-tree-cover {
      background-color: transparent;
    }

    .uni-data-tree-dialog {
      position: absolute;
      top: 100%;
      height: auto;
      min-height: 400px;
      max-height: 50vh;
      background-color: #fff;
      border-radius: 5px;
      box-shadow: 0 0 20px 5px rgba(0, 0, 0, 0.3);
    }

    .dialog-caption {
      display: none;
    }
  }

  /* #endif */
</style>
