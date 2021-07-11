<template>
  <div class="diy_search_box">
    <uni-search-bar
      class="search"
      v-model="value"
      @cancel="changeFn"
      @input="changeFn"
      :maxlength="propertys.maxlength || ''"
      :radius="100"
    >
      <i
        slot="searchIcon"
        @click="clickFn"
        class="iconfont iconsearch icon_search"
      ></i>
    </uni-search-bar>
  </div>
</template>

<script>
  import { uniSearchBar } from '@dcloudio/uni-ui';
  export default {
    name: 'search',
    components: { uniSearchBar },
    props: {
      propertys: {
        // 为实现动态添加属性【小程序】， 后面有时间再研究
        type: Object,
        default: () => {},
      },
      pValue: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        value: '',
      };
    },
    methods: {
      changeFn() {
        this.$emit('change', this.value);
      },
      clickFn() {
        this.$emit('click', this.value);
      },
    },
    watch: {
      pValue: {
        handler(newVal) {
          this.value = newVal;
        },
        immediate: true,
      },
    },
  };
</script>
<style lang="scss" scoped>
  @import url('/static/fonts/iconfont.css');

  $color: #999999;
  .diy_search_box {
    background: white;
    line-height: 62rpx;
    height: 90rpx;
    .icon_search {
      position: relative;
      margin-right: 20rpx;
      color: #999999;
      flex-grow: 0;
    }
  }
</style>
