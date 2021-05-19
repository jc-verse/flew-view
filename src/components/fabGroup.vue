<template>
  <movable-area  class="movable_box" >
      <movable-view class="max" direction="vertical" :y='450' inertia :damping='50'>
        <div class="fab_group" @mousedown="onmousedown">
          <div class="user fab" v-for="(item, ind) in newList" :key="ind" @click.stop="clickFn(ind, item)" @mousedown="onmousedown" @mouseup="onmouseup">
            <i  :class="['iconfont','icon_item', item.icon ]"></i>
          </div>
        </div>
      </movable-view>
    </movable-area>
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
    },
    
  }
}
</script>
<style lang="scss" scoped>
@import url("/static/fonts/iconfont.css");
.fab_group{
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
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

.movable_box{
  position: fixed;
  right: 0;
  top: 0;
  // width: 20px;
  height: 100vh;
  width: 96rpx;
  .max{
    // width: 10px;
    height: 310rpx;
    width: 96rpx;
    // background: red;
  }
}

</style>