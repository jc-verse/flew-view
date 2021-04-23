<template>
<!-- 2.竞赛组队备份2 -->
  <div class="competition">
    <diy-scroll :styles='{ height: isH5 ?"calc(100vh - 400rpx)": "100vh" }'>
      
      <search @change='changeVal' :propertys="{'maxlength':'10'}"/>
      <div class="content">
        <cartList @clickItem='clickItem'/>
      </div>
    </diy-scroll>
  </div>
</template>

<script>
import search from '@/components/search';
import diyScroll from '@/components/diyScroll';
import cartList from './cartList'
export default {
  name:'competition',
  components: { search, cartList, diyScroll },
  data() {
    return {
      isH5: false,
    }
  },
  onLoad() {
    // #ifdef H5
      this.isH5 = true
    // #endif
  },
  onShow() {
    uni.hideTabBar({
      //这里是为了不那么唐突
      animation:true,
      success() {
        console.debug('隐藏成功')
      }
    })
  },
  methods: {
    changeVal(value) {
      console.log(1,value)
    },
    clickItem(item) {
      console.log(2,item)
      if (item.id === '5') {
        uni.navigateTo({ url: '/pages/mine/index' })
      }
    },
    search() {

    },
    input() {}
  }
}
</script>

<style lang="scss" scoped>
@import url("/static/fonts/iconfont.css");
$color:#B3B3B4;
.competition{
  overflow: hidden;
  height:100vh;
  display: flex;
  flex-direction: column ;
  background: #F1F3F5;
  .content{
    padding: 20rpx 30rpx
  }
}
</style>
