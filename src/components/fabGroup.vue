<template>
  <movable-area  class="movable_box" >
    <movable-view class="max" direction="vertical" :y='450' inertia :damping='50'>
      <div class="fab_group" >
        <!-- <cover-view class="controls-title"> -->
          <div class="user fab" v-for="(item, ind) in newList" :key="ind" @click.stop="clickFn(ind, item)" >
            <i v-if="item.icon"  :class="['iconfont','icon_item', item.icon ]"></i>
          </div>
        <!-- </cover-view> -->
        
      </div>
    </movable-view>
  </movable-area>
</template>
<script>
import { uniFab } from '@dcloudio/uni-ui'
import { isLogin, toLogin } from '@/common/utils'
export default {
  components:{ uniFab },
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
        { icon: 'iconkefu' , id: 4 , name: '联系客服'},
        { icon: 'icontuichu1' , id: 3 , name: '注销'},
      ],
      isLogin: true
    }
  },
  computed : {
    newList () {
      const shows = this.shows;
      return this.list.filter(item=> {
        if (isLogin()) {
          return  shows.includes(item.id)
        } else {
          return  shows.includes(item.id) && ![1,3].includes(item.id) 
        }
      })
    }
  },
  methods: {
    toLogin,
    clickFn(ind, item) {
      this.$emit('clickItem', item)
      switch (item.id) {
        case 1:
          if (isLogin()) {
            uni.navigateTo({ url: '/pages/mine/index' }) // 我的
          } else {
            this.$emit('noLogin')
          }
          break;
        case 2:
          uni.navigateTo({ url: '/pages/home/index' })
          break;
        case 3:
          this.$emit('unLogin')
          break;
        case 4:
          this.$emit('QRPopup')
          break;
      }
    },
    
  }
}
</script>
<style lang="scss" scoped>
@import url("/static/fonts/iconfont.css");


.movable_box{
  position: fixed;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  height: 90vh;
  z-index:100;
  .fab_group{
    .fab{
      // min-width: 96rpx;
      padding: 0 20rpx;
      box-sizing: border-box;
      height: 80rpx;
      background: #FBFBFC;
      border-radius:40rpx 0% 0% 40rpx;
      color: #5C7BC1;
      box-shadow: #5C7BC1;
      // z-index: 1;
      @include pointer;
      @include flex_center;
      .icon_item{
        font-size: 48rpx;
      }
    }
    .fab:not(:first-child){
      margin-top: 20rpx;
    }
  }
  .max{
    // width: 96rpx;
    width: auto;
    right: 0;
    left: auto;
    height: auto;
  }
  .controls-title{
    z-index: 999;
  }
}

</style>