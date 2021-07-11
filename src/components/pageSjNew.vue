<template>
  <scroll-view
    :style="{ height: customBarH, background: styles.background }"
    class="pageSjNew"
    id="pageSjNew"
    :scroll-y="true"
    :show-scrollbar="false"
    :scroll-top="scrollTop"
    @scrolltoupper="upper"
    @scrolltolower="lower"
    @scroll="scroll"
  >
    <slot></slot>
  </scroll-view>
</template>

<script>
  export default {
    name: 'pageSjNew',
    data() {
      return {
        topNum: 0,
        scrollTop: 0,
        old: { scrollTop: 0 },
      };
    },
    props: {
      styles: {
        type: Object,
        default: () => ({ background: '' }),
      },
    },
    computed: {
      customBarH() {
        const { topNum } = this;
        return topNum ? `calc(100vh - ${topNum * 2}rpx)` : '100vh';
      },
    },
    mounted() {
      // this.createSelectorQuery().select('#pageSjNew').boundingClientRect(res=>{
      //   // 获取当前dom 到顶部的距离
      //   this.topNum += res.top;
      // }).exec()
      uni.getSystemInfo({
        success: (e) => {
          let statusBar = 0;
          let customBar = 0;

          // #ifdef H5
          statusBar = 0;
          customBar = e.statusBarHeight + 44;
          // #endif

          this.topNum += customBar;
        },
      });
    },
    methods: {
      upper(e) {
        console.log(e);
      },
      lower(e) {
        console.log(e);
      },
      scroll(e) {
        this.$emit('scroll', e);
        this.old.scrollTop = e.detail.scrollTop;
      },
      goTop: function (e) {
        this.scrollTop = this.old.scrollTop;
        this.$nextTick(function () {
          this.scrollTop = 0;
        });
        uni.showToast({
          icon: 'none',
          title: '纵向滚动 scrollTop 值已被修改为 0',
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  .pageSjNew {
    width: 100%;
    overflow: scroll;
  }
</style>
