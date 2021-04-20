<template>
  <div class="scroll_box" 
    :style="{ 
      padding: styles.padding || '', 
      background: styles.background || '',
      display: styles.display || 'auto',
      flexDirection:  styles.flexDirection || '',
      height: styles.height || 'calc(100vh - 200rpx)'
    }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name:'diyScroll',
  props: {
    styles: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.scroll_box::-webkit-scrollbar{
  display:none;/*ChromeSafari*/
}
.scroll_box{
  width: 100%;
  height: calc(100vh - 200rpx);
  box-sizing: border-box;
  // background: #F1F3F5;
  overflow: scroll;
  flex-grow: 1;
  // padding: 0; 
  flex-shrink: 1;
}
</style>