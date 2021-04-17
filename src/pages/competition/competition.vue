<template>
<!-- 2.竞赛组队备份2 -->
  <div class="competition">
    <search @change='changeVal' :propertys="{'maxlength':'10'}"/>
    <diy-scroll>
      <cartList @clickItem='clickItem'/>
    </diy-scroll>
  </div>
</template>

<script>
import { list } from './const';
import search from '@/components/search';
import diyScroll from '@/components/diyScroll';
import cartList from './cartList'
export default {
  name:'competition',
  components: { search, cartList, diyScroll },
  data() {
    return {
      list
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
    scroll(val) {
      console.log(val)
    }
  }
}
</script>

<style lang="scss" scoped>

.competition{
  overflow: hidden;
  height: calc(100vh - 88rpx);
  display: flex;
  flex-direction: column ;
  background: #F1F3F5;
}
</style>
