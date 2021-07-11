<template>
  <view class="uni-combox">
    <view v-if="label" class="uni-combox__label" :style="labelStyle">
      <text>{{ label }}</text>
    </view>
    <view class="uni-combox__input-box">
      <input
        class="uni-combox__input"
        type="text"
        :placeholder="placeholder"
        v-model="inputVal"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
      />
      <!-- <uni-icons class="uni-combox__input-arrow" type="arrowdown" size="14" @click="toggleSelector"></uni-icons> -->
      <view class="uni-combox__selector" v-if="showSelector">
        <scroll-view scroll-y="true" class="uni-combox__selector-scroll">
          <view
            class="uni-combox__selector-empty"
            v-if="filterCandidatesLength === 0"
          >
            <text class="item_box">{{ emptyTips }}</text>
          </view>
          <view
            class="uni-combox__selector-item"
            v-for="(item, index) in filterCandidates"
            :key="index"
            @click="onSelectorClick(index)"
          >
            <slot name="item">
              <div class="item_box">
                <i class="iconfont icondingwei icon_item"></i>
                <div class="value_box">
                  <div class="title">{{ '黄湖熟互殴中学' || item }}</div>
                  <div class="title_1">{{ '深圳市福田区' || item + 1 }}</div>
                </div>
              </div>
            </slot>
          </view>
        </scroll-view>
      </view>
    </view>
  </view>
</template>

<script>
  /**
   * Combox 组合输入框
   * @description 组合输入框一般用于既可以输入也可以选择的场景
   * @tutorial https://ext.dcloud.net.cn/plugin?id=1261
   * @property {String} label 左侧文字
   * @property {String} labelWidth 左侧内容宽度
   * @property {String} placeholder 输入框占位符
   * @property {Array} candidates 候选项列表
   * @property {String} emptyTips 筛选结果为空时显示的文字
   * @property {String} value 组合框的值
   */
  export default {
    name: 'uniCombox',
    props: {
      label: {
        type: String,
        default: '',
      },
      labelWidth: {
        type: String,
        default: 'auto',
      },
      placeholder: {
        type: String,
        default: '',
      },
      candidates: {
        type: Array,
        default() {
          return [];
        },
      },
      emptyTips: {
        type: String,
        default: '无匹配项',
      },
      value: {
        type: [String, Number],
        default: '',
      },
    },
    data() {
      return {
        showSelector: false,
        inputVal: '',
      };
    },
    computed: {
      labelStyle() {
        if (this.labelWidth === 'auto') {
          return {};
        }
        return {
          width: this.labelWidth,
        };
      },
      filterCandidates() {
        return this.candidates.filter((item) => {
          return item.toString().indexOf(this.inputVal) > -1;
        });
      },
      filterCandidatesLength() {
        return this.filterCandidates.length;
      },
    },
    watch: {
      value: {
        handler(newVal) {
          this.inputVal = newVal;
        },
        immediate: true,
      },
    },
    methods: {
      toggleSelector() {
        this.showSelector = !this.showSelector;
      },
      onFocus() {
        this.showSelector = true;
      },
      onBlur() {
        setTimeout(() => {
          this.showSelector = false;
        }, 153);
      },
      onSelectorClick(index) {
        this.inputVal = this.filterCandidates[index];
        this.showSelector = false;
        this.$emit('input', this.inputVal);
      },
      onInput() {
        setTimeout(() => {
          this.$emit('input', this.inputVal);
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  .uni-combox {
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    // height: 40px;1
    flex-direction: row;
    align-items: center;
    width: 100%;
    // border-bottom: solid 1px #DDDDDD;
  }

  .uni-combox__label {
    font-size: 16px;
    line-height: 22px;
    padding-right: 10px;
    color: #999999;
  }

  .uni-combox__input-box {
    position: relative;
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    flex: 1;
    flex-direction: row;
    align-items: center;
  }

  .uni-combox__input {
    flex: 1;
    font-size: 16px;
    height: 22px;
    line-height: 22px;
    border: none;
    text-align: end;
    outline: none;
    @include fontMixin(26rpx, #808080);
  }

  .uni-combox__input-arrow {
    padding: 10px;
  }

  .uni-combox__selector {
    /* #ifndef APP-NVUE */
    box-sizing: border-box;
    /* #endif */
    position: absolute;
    padding: 10rpx;
    top: 42px;
    left: 0;
    width: 100%;
    background-color: #ececec;
    border-radius: 6px;
    // box-shadow: #DDDDDD 4px 4px 8px, #DDDDDD -4px -4px 8px;
    z-index: 4;
  }

  .uni-combox__selector-scroll {
    /* #ifndef APP-NVUE */
    max-height: 200px;
    box-sizing: border-box;
    /* #endif */
  }

  .uni-combox__selector::before {
    /* #ifndef APP-NVUE */
    content: '';
    /* #endif */
    position: absolute;
    width: 0;
    height: 0;
    border-bottom: solid 6px #ececec;
    border-right: solid 6px transparent;
    border-left: solid 6px transparent;
    left: 80%;
    top: -6px;
    margin-left: -6px;
  }

  .uni-combox__selector-empty,
  .uni-combox__selector-item {
    /* #ifndef APP-NVUE */
    display: flex;
    cursor: pointer;
    /* #endif */
    line-height: 40rpx;
    font-size: 14px;
    text-align: center;
    border-bottom: solid 1px #dddddd;
    margin: 0px 10px;
    .item_box {
      padding: 10rpx;
      width: 100%;
      @include flex_center;
      .icon_item {
        @include fontMixin2(32rpx, #333333, bold);
      }
      .value_box {
        margin-left: 20rpx;
        .title {
          @include fontMixin2(28rpx, #333333);
        }
        .title_1 {
          @include fontMixin2(24rpx, #999999);
        }
      }
    }
  }

  .uni-combox__selector-empty:last-child,
  .uni-combox__selector-item:last-child {
    /* #ifndef APP-NVUE */
    border-bottom: none;
    /* #endif */
  }
</style>
