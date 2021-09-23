<template>
  <view>
    <view ref="uni-rate" class="uni-rate">
      <view
        class="uni-rate__icon"
        :class="{ 'uni-cursor-not-allowed': disabled }"
        :style="{ 'margin-right': `${margin * 2}rpx` }"
        v-for="(star, index) in stars"
        :key="index"
        @touchstart.stop="touchstart"
        @touchmove.stop="touchmove"
        @mousedown.stop="mousedown"
        @mousemove.stop="mousemove"
        @mouseleave="mouseleave"
      >
        <i
          class="iconfont iconB-pingfen"
          :style="{ color, fontSize: `${size * 2}rpx` }"
          :color="color"
          :type="isFill ? 'star-filled' : 'star'"
        />
        <!-- _ifdef APP-NVUE -->
        <view
          :style="{
            width: `${
              ((star.activeWitch.replace('%', '') * size) / 100) * 2
            }rpx`,
          }"
          class="uni-rate__icon-on"
        >
          <i
            class="iconfont iconB-pingfen"
            style="text-align: left"
            :style="{
              color: disabled ? '_ccc' : activeColor,
              fontSize: `${size * 2}rpx`,
            }"
            type="star-filled"
          />
        </view>
        <!-- _endif -->
        <!-- _ifndef APP-NVUE -->
        <view :style="{ width: star.activeWitch }" class="uni-rate__icon-on">
          <i
            class="iconfont iconB-pingfen"
            :style="{
              color: disabled ? disabledColor : activeColor,
              fontSize: `${size * 2}rpx`,
            }"
          />
        </view>
        <!-- _endif -->
      </view>
    </view>
  </view>
</template>

<script lang="ts">
  import { Component, Prop, Watch, Vue } from 'vue-property-decorator';

  // #ifdef APP-NVUE
  const dom: any = uni.requireNativePlugin('dom');
  // #endif

  @Component
  export default class rate extends Vue {
    name = 'UniRate';
    // 星星的类型，是否镂空
    @Prop({ default: true }) isFill!: boolean;
    // 星星未选中的颜色
    @Prop({ default: '_ececec' }) color!: string;
    // 星星选中状态颜色
    @Prop({ default: '_ffca3e' }) activeColor!: string;
    // 星星禁用状态颜色
    @Prop({ default: '_c0c0c0' }) disabledColor!: string;
    // 星星的大小
    @Prop({ default: 24 }) size!: number;
    // 当前评分
    @Prop({ default: 1 }) value!: number;
    // 最大评分
    @Prop({ default: 5 }) max!: number;
    // 星星的间距
    @Prop({ default: 0 }) margin!: number;
    // 是否可点击
    @Prop({ default: false }) disabled!: boolean;
    // 是否只读
    @Prop({ default: false }) readonly!: boolean;
    // 是否显示半星
    @Prop({ default: false }) allowHalf!: boolean;
    // 是否支持滑动手势
    @Prop({ default: true }) touchable!: boolean;

    valueSync = 0;
    userMouseFristMove = true;
    userRated = false;
    userLastRate = 1;

    @Watch('value')
    onValueChanged(newVal: number) {
      this.valueSync = newVal;
    }

    get stars() {
      const value = this.valueSync ? this.valueSync : 0;
      const starList = [];
      const floorValue = Math.floor(value);
      const ceilValue = Math.ceil(value);
      for (let i = 0; i < this.max; i++) {
        if (floorValue > i) {
          starList.push({
            activeWitch: '100%',
          });
        } else if (ceilValue - 1 === i) {
          starList.push({
            activeWitch: (value - floorValue) * 100 + '%',
          });
        } else {
          starList.push({
            activeWitch: '0',
          });
        }
      }
      return starList;
    }

    created() {
      this.valueSync = this.value;
      this._rateBoxLeft = 0;
      this._oldValue = null;
    }
    mounted() {
      setTimeout(() => {
        this._getSize();
      }, 100);
      // #ifdef H5
      this.PC = this.IsPC();
      // #endif
    }

    touchstart(e) {
      // #ifdef H5
      if (this.IsPC()) return;
      // #endif
      if (this.readonly || this.disabled) return;
      const { clientX, screenX } = e.changedTouches[0];
      // TODO 做一下兼容，只有 Nvue 下才有 screenX，其他平台式 clientX
      this._getRateCount(clientX || screenX);
    }
    touchmove(e) {
      // #ifdef H5
      if (this.IsPC()) return;
      // #endif
      if (this.readonly || this.disabled || !this.touchable) return;
      const { clientX, screenX } = e.changedTouches[0];
      this._getRateCount(clientX || screenX);
    }

    /**
     * 兼容 PC @tian
     */
    mousedown(e) {
      // #ifdef H5
      if (!this.IsPC()) return;
      if (this.readonly || this.disabled) return;
      const { clientX } = e;
      this.userLastRate = this.valueSync;
      this._getRateCount(clientX);
      this.userRated = true;
      // #endif
    }
    mousemove(e) {
      // #ifdef H5
      if (!this.IsPC()) return;
      if (this.userRated) return;
      if (this.userMouseFristMove) {
        console.log('---mousemove----', this.valueSync);
        this.userLastRate = this.valueSync;
        this.userMouseFristMove = false;
      }
      if (this.readonly || this.disabled || !this.touchable) return;
      const { clientX } = e;
      this._getRateCount(clientX);
      // #endif
    }
    mouseleave() {
      // #ifdef H5
      if (!this.IsPC()) return;
      if (this.readonly || this.disabled || !this.touchable) return;
      if (this.userRated) {
        this.userRated = false;
        return;
      }
      this.valueSync = this.userLastRate;
      // #endif
    }
    // #ifdef H5
    IsPC() {
      const userAgentInfo = navigator.userAgent;
      const Agents = [
        'Android',
        'iPhone',
        'SymbianOS',
        'Windows Phone',
        'iPad',
        'iPod',
      ];
      return Agents.reduce(
        (acc, agent) => acc && userAgentInfo.indexOf(agent) < 0,
        true,
      );
    }
    // #endif

    /**
     * 获取星星个数
     */
    _getRateCount(clientX) {
      const { size, _rateBoxLeft } = this;
      const rateMoveRange = clientX - _rateBoxLeft;
      let index = Math.floor(rateMoveRange / (size + this.margin));
      index = index < 0 ? 0 : index;
      index = index > this.max ? this.max : index;
      const range = Math.floor(rateMoveRange - (size + this.margin) * index);
      let value = 0;
      if (this._oldValue === index && !this.PC) return;
      this._oldValue = index;
      value = this.allowHalf
        ? range > size / 2
          ? index + 1
          : index + 0.5
        : index + 1;
      value = Math.max(0.5, Math.min(value, this.max));
      this.valueSync = value;
      this._onChange();
    }

    /**
     * 触发动态修改
     */
    _onChange() {
      this.$emit('input', this.valueSync);
      this.$emit('change', {
        value: this.valueSync,
      });
    }
    /**
     * 获取星星距离屏幕左侧距离
     */
    _getSize() {
      // #ifndef APP-NVUE
      uni
        .createSelectorQuery()
        .in(this)
        .select('.uni-rate')
        .boundingClientRect(() => {})
        .exec((ret) => {
          if (ret) this._rateBoxLeft = ret[0].left;
        });
      // #endif
      // #ifdef APP-NVUE
      dom.getComponentRect(this.$refs['uni-rate'], (ret: { size: { left: number } }) => {
        const size = ret.size;
        if (size) this._rateBoxLeft = size.left;
      });
      // #endif
    }
  }
</script>

<style lang="scss" scoped>
  .uni-rate {
    /* _ifndef APP-NVUE */
    display: flex;
    /* _endif */
    line-height: 1;
    font-size: 0;
    flex-direction: row;
    /* _ifdef H5 */
    cursor: pointer;
    /* _endif */
  }

  .uni-rate__icon {
    position: relative;
    line-height: 1;
    font-size: 0;
  }

  .uni-rate__icon-on {
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    line-height: 1;
    text-align: left;
  }

  .uni-cursor-not-allowed {
    /* _ifdef H5 */
    cursor: not-allowed !important;
    /* _endif */
  }
</style>
