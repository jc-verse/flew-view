<template>
  <div class="fab_group">
    <div class="user fab" v-for="(item, ind) in newList" :key="ind" @click="clickFn(ind, item)">
      <i @click="clickFn" :class="['iconfont','icon_item', item.icon ]"></i>
    </div>
  </div>
</template>
<script>
import { uniFab } from '@dcloudio/uni-ui'
export default {
  components:{uniFab},
  props: {
    shows: {
      type: Array,
      default: ()=> [1,2]
    },
  },
  data() {
    return {
      list : [
        { icon: 'iconuser' , id: 1 },
        { icon: 'iconzhuye' , id: 2 },
      ]
    }
  },
  computed : {
    newList () {
      const shows = this.shows;
      // console.log(122, shows)
      return this.list.filter(item=> shows.includes(item.id))
    }
  },
  methods: {
    clickFn(ind, item) {
      this.$emit('clickItem', item)
      switch (item.id) {
        case 1:
          uni.navigateTo({ url: '/pages/mine/index' })
          break;
        case 2:
          uni.navigateTo({ url: '/pages/home/index' })
          break;
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import url("/static/fonts/iconfont.css");
.fab_group{
  position: fixed;
  right: 0;
  bottom: 120rpx;
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