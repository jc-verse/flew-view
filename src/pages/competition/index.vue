<template>
<!-- 2.竞赛组队备份2 -->
<page-sj>
  <div class="competition">
    <search @change='changeVal' :propertys="{'maxlength':'10'}"/>
    <scroll-box >
      <div class="content">
        <cartList @clickItem='clickItem' :list='list'/>
      </div>
    </scroll-box>
  </div>
  <FabGroup/>
</page-sj>
</template>

<script>
import search from '@/components/search';
import scrollBox from '@/components/scrollBox';
import pageSj from '@/components/pageSjNew';
import cartList from './cartList'
import { joinUrl } from '@/common/utils'
import FabGroup from '@/components/fabGroup';

import { teamTypeList } from '@/common/api';

export default {
  name:'competition',
  components: { search, cartList, scrollBox, pageSj, FabGroup },
  data() {
    return {
      list : [],
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 获取list
    getList () {
      teamTypeList().then(res=>{
        const { data:nData } = res[1];
        const { code, data } = nData;
        if (code === 200 ) {
          this.list = data || [];
        }
      }).catch(err => {console.log(err)})
    },
    changeVal(value) {
      console.log(1,value)
    },
    clickItem(item) {
      console.log(193, item)
      switch (item.id) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
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
