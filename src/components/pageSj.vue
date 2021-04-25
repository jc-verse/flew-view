<template>
  <div class="page_sj" id="page_sj" :style="{height: customBarH}">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name:'page_sj',
  data () {
    return {
      topNum: 0
    }
  },
  computed: {
    customBarH () {
      const { topNum } = this;
      return topNum ? `calc(100vh - ${topNum * 2}rpx)` : '100vh';
    }
  },
  mounted(){
    uni.getSystemInfo({
      success: (e) => {
        let statusBar = 0
        let customBar = 0

        // #ifdef H5
          statusBar = 0;
          customBar = e.statusBarHeight + 44;
        // #endif

        this.topNum = customBar
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.page_sj{
  width: 100%;
  height: 100vh;
  overflow: auto;
}
.page_sj::-webkit-scrollbar{
  display: none;
}
</style>