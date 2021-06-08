<template>
    <scroll-view 
      :style="{height : customBarH}" 
      class="scrollBox" 
      id='scrollBox' 
      :scroll-y="true" 
      :show-scrollbar='false'
      :scroll-top="scrollTop"
      :lower-threshold='lowerNum'  
      @scrolltoupper="upper" 
      @scrolltolower="lower"
      @scroll="scroll"
    >
      <slot></slot>
    </scroll-view>
</template>

<script>
export default {
  name: 'scrollBox',
  data () {
    return {
      topNum: 0,
      scrollTop: 0,
      old: { scrollTop: 0 }
    }
  },
  props: {
    num: {
      type: Number,
      default: 0
    },
    lowerNum: {
      type: Number,
      default: 50
    }
  },
  computed: {
    customBarH () {
      const { topNum, num } = this;

      return topNum ? `calc(100vh - ${topNum * 2 + 8 + num}rpx)` : `calc(100vh - ${num}rpx)`;
    }
  },
  mounted () {
    this.createSelectorQuery().select('#scrollBox').boundingClientRect(res=>{
      // 获取当前dom 到顶部的距离
      this.topNum += res.top;
    }).exec()
    uni.getSystemInfo({
      success: (e) => {
        let statusBar = 0;
        let customBar = 0;

        // #ifdef H5
          statusBar = 0;
          customBar = e.statusBarHeight + 44;
        // #endif

        this.topNum += customBar;
      }
    })
  },
  methods: {
    upper (e) {
      // console.log(e)
    },
    lower (e) {
      this.$emit('lower')
    },
    scroll (e) {
      this.$emit('scroll', e);
      this.old.scrollTop = e.detail.scrollTop;
    },
    goTop: function(e) {
      this.scrollTop = this.old.scrollTop;
      this.$nextTick(function() {
        this.scrollTop = 0
      });
      uni.showToast({ icon:"none", title:"纵向滚动 scrollTop 值已被修改为 0"})
    }
  }
}
</script>

<style lang="scss" scoped>
.scrollBox{
  width: 100%;
  overflow: scroll;
}
</style>