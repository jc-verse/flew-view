<template>
  <div class="tag_item">
    <uni-data-picker
      class="picker_box"
      :localdata="item.list"
      :popup-title="item.ph"
      :placeholder="item.ph"
      @change="onchange"
      @nodeclick="onnodeclick"
    ></uni-data-picker>
  </div>
</template>

<script>
  import { uniDataPicker } from '@dcloudio/uni-ui';
  export default {
    name: 'tag_item',
    components: { uniDataPicker },
    props: {
      item: { type: Object, default: () => ({}) },
    },
    computed: {
      checkCity() {
        const b = this.formData[1];
        return Object.keys(b ? b : {}).length ? b.name : '请选择';
      },
    },
    mounted() {},
    data() {
      return {
        index: 0,
        formData: [],
      };
    },
    methods: {
      onchange(e) {
        const { id, code } = this.item;
        this.formData = e.detail.value;
        this.$emit('changeCity', id, code, e.detail.value);
      },
      onnodeclick(e) {
        console.log('onnodeclick', e);
      },
    },
  };
</script>

<style lang="scss" scoped>
  body {
    -webkit-overflow-scrolling: unset;
  }
  .tag_item {
    -webkit-overflow-scrolling: auto;
    padding: 8rpx 36rpx;
    flex-shrink: 0;
    background: #ececec;
    border-radius: 4px;
    // opacity: 0.56;
    white-space: nowrap;
    z-index: 10;
    @include flex_center;
    @include fontMixin(28rpx, #666666, 400);
    .icon_item {
      margin-left: 10rpx;
      font-size: 24rpx;
      display: inline-block;
    }
    .icon_active {
      transform: rotate(-90deg);
    }

    .uni-data-tree[data-v-7939fa20]
      /deep/
      .input-value-border[data-v-7939fa20] {
      border: none !important;
    }
  }
  .picker_box {
    // transform: translateZ(1px);
    // -webkit-overflow-scrolling:auto;
  }
</style>
