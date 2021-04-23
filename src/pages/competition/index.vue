<template>
<!-- 2.竞赛组队备份2 -->
<page-sj>
  <div class="competition">
    <search @change='changeVal' :propertys="{'maxlength':'10'}"/>
    <scroll-box >
      <div class="content">
        <cartList @clickItem='clickItem'/>
      </div>
    </scroll-box>
  </div>
</page-sj>
</template>

<script>
import search from '@/components/search';
import scrollBox from '@/components/scrollBox';
import pageSj from '@/components/pageSj';
import cartList from './cartList'
import { joinUrl } from '@/common/utils'
export default {
  name:'competition',
  components: { search, cartList, scrollBox, pageSj },
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
      if (item.id === 5) {
        uni.navigateTo({ url: joinUrl('/pages/mine/index',item) })
      }
      switch (item.id) {
        case 1:
          uni.navigateTo({ url: joinUrl('/pages/stem/index',item), })
          break;
        case 2:
          uni.navigateTo({ url: joinUrl('/pages/stem/index',item) })
          break;
        case 3:
          uni.navigateTo({ url: joinUrl('/pages/stem/index',item) })
          break;
        case 4:
          uni.navigateTo({ url: joinUrl('/pages/stem/index',item) })
          break;
        case 5:
          uni.navigateTo({ url: joinUrl('/pages/stem/index',item) })
          break;
        case 6:
          uni.navigateTo({ url: joinUrl('/pages/stem/index',item) })
          break;
        case 7:
          uni.navigateTo({ url: joinUrl('/pages/stem/index',item) })
          break;
        case 8:
          uni.navigateTo({ url: joinUrl('/pages/autonomously/index',item) })
          break;
        default:
          break;
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
  display: flex;
  flex-direction: column ;
  background: #F1F3F5;
  .content{
    padding: 20rpx 30rpx 0
  }
}
</style>
