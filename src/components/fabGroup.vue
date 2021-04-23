<template>
  <div class="fab_group">
    <div class="user fab" v-for="(item, ind) in list" :key="ind" @click="clickFn(ind, item)">
      <i @click="clickFn" :class="['iconfont','icon_item', item.icon ]"></i>
    </div>
  </div>
</template>
<script>
import { uniFab } from '@dcloudio/uni-ui'
export default {
  components:{uniFab},
  data() {
    return {
      list : [
        { icon: 'iconuser' , id: 1 },
        { icon: 'iconzhuye' , id: 2 },
      ]
    }
  },
  methods: {
    clickFn(ind, item) {
      this.$emit('clickItem', item)
    }
  }
}
</script>
<style lang="scss" scoped>
@import url("/static/fonts/iconfont.css");
.fab_group{
  position: fixed;
  right: 0;
  bottom: 100rpx;
  z-index: 10;
  .fab{
    width: 96rpx;
    height: 80rpx;
    background: #FBFBFC;
    border-radius:40rpx 0% 0% 40rpx;
    color: #5C7BC1;
    box-shadow: #5C7BC1;
    @include pointer;
    @include flex_center;
    .icon_item{
      font-size: 48rpx;
    }
  }
  .fab:last-child{
    margin-top: 20rpx;
  }
}
</style>