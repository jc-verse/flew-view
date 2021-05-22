<template>
  <movable-area  class="movable_box" >
    <movable-view class="max" direction="vertical" :y='450' inertia :damping='50'>
      <div class="fab_group" @mousedown="onmousedown">
        <div class="user fab" v-for="(item, ind) in newList" :key="ind" @click.stop="clickFn(ind, item)" @mousedown="onmousedown" @mouseup="onmouseup">
          <i v-if="item.icon"  :class="['iconfont','icon_item', item.icon ]"></i>
          <text style="color: red">{{item.name  || ''}}</text>
        </div>
      </div>
    </movable-view>
    <TipPopup title="操作提示" ref='noLogin' msg="是否登录后执行操作？" @confirm='toLogin'/>
  </movable-area>
</template>
<script>
import { uniFab } from '@dcloudio/uni-ui'
import TipPopup from '@/components/cards/tipPopup';
import { isLogin, toLogin } from '@/common/utils'
export default {
  components:{ uniFab, TipPopup },
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
        { icon: '' , id: 3 , name: '注销'},
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
          return  shows.includes(item.id) && item.id != 3
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
            this.$refs.noLogin.show()
          }
          break;
        case 2:
          uni.navigateTo({ url: '/pages/home/index' })
          break;
        case 3:
          toLogin();
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