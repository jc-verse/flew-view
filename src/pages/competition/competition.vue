<template>
<!-- 2.竞赛组队备份2 -->
  <div class="competition">
    <search @change='changeVal' :propertys="{'maxlength':'10'}"/>
    <diy-scroll :styles='{ padding: "20rpx 30rpx" }'>
      <cartList @clickItem='clickItem'/>
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
      
    }
  },
  onLoad() {
    
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
  height: calc(100vh - 88rpx);
  display: flex;
  flex-direction: column ;
  background: #F1F3F5;
}
.icon_search{
  position: relative;
  margin-right: 20rpx;
  color: $color;
  flex-grow: 0;
}
</style>
