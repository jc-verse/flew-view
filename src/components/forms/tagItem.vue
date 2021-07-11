<template>
  <picker
    @change="onchange"
    :placeholder="item.ph"
    :value="index"
    range-key="label"
    :range="item.list"
  >
    <view class="tag_item">
      <span>{{ itemVal.label || "" }}</span>
      <span
        class="iconfont iconxiala icon_item"
        :class="[down ? 'icon_active' : '']"
      ></span>
    </view>
  </picker>
</template>

<script>
  export default {
    name: "tag_item",
    props: {
      item: { type: Object, default: () => ({}) },
    },
    data() {
      return {
        index: 0,
        down: true,
      };
    },
    computed: {
      itemVal() {
        const { item, index } = this;
        return item.list[index] || {};
      },
    },
    methods: {
      onchange: function (e) {
        const { item, index } = this;
        const { id, code } = item;
        this.index = e.detail.value;
        this.$emit("changeItem", id, code, item.list[e.detail.value]);
        // this.clickD(false)
      },
      clickD(falg) {
        this.down = !this.down;
      },
    },
    watch: {
      "item.list": {
        handler(val, oldVal) {
          if (this.item.id == 2) {
            const { item, index } = this;
            this.index = 0;
            this.$emit("changeItem", item.id, item.code, "");
          }
        },
      },
    },
  };
</script>

<style lang="scss" scoped>
  .tag_item {
    padding: 8rpx 36rpx;
    flex-shrink: 0;
    background: #ececec;
    border-radius: 4px;
    color: grey;
    // opacity: 0.56;
    white-space: nowrap;
    @include flex_center;
    @include fontMixin(28rpx, #666666, 400);
    .icon_item {
      margin-left: 10rpx;
      font-size: 24rpx;
      display: inline-block;
      // transform: translateY(4rpx);
    }
    .icon_active {
      transform: rotate(-90deg);
    }
  }
</style>
