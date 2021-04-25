<template>
  <div class="nav_tab_box">
    <scroll-box>
      <div 
        class="tabItem_box " 
        :class="[index===ind? 'active_item': '' ]" 
        v-for="(item, ind) in list" :key="ind"
        @click="clickItem(item, ind)"
      >
        <div class="tabItem">
          {{ item.label }}
        </div>
      </div>
      <slot name='diy'></slot>
    </scroll-box>
  </div>
</template>
<script>
import scrollBox from '@/components/scrollBox'
export default {
  name: 'navTab',
  components: { scrollBox },
  props: {
    list: {
      type: Array,
      default:() => []
    },
    index: {
      type: Number,
      default: 0
    }
  },  
  data () {
    return {
      // index: 0
    }
  },
  methods:{
    clickItem(item, index) {
      console.log(1222354)
      this.$emit('clickItme', item, index)
    }
  },
}
</script> 

<style lang="scss" scoped>
@mixin flex_r_center{
  display: flex;
  justify-content:center;
}
@mixin font_1 {
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
}
.nav_tab_box{

  background: #FFFFFF;
  width: 160rpx;
  flex-grow: 0;
  flex-shrink: 1;
  .tabItem_box{
    width: 160rpx;
    padding: 12rpx 0;
    .tabItem{
      border-left: 12rpx solid #FFFFFF;
      padding: 20rpx 0;
      display: flex;
      justify-content: center;
      @include font_1;
      @include flex_r_center;
    }
  }
  .active_item{
    background: #F1F3F5;
    .tabItem{
      border-left-color: #676FDF;
    }
  }
}
</style>