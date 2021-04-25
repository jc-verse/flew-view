<template>
<!-- 2.SAGE -->
<page-sj>
  <div class="page_box">
    <tag-group ></tag-group>
    <scroll-box>
      <synopsis :info='newBg'>
        <div class="demo" @click="clickDemo">完善个人设置临时入口</div>
      </synopsis>
      <div class="group_info_list">
        <group-item v-for="(item, ind) in 3" :key='ind' @clickBuoy='clickBuoy'/>
      </div>
    </scroll-box>
    <fab-group/>
  </div>
</page-sj>
</template>

<script>
import groupItem from './groupItem';
import synopsis from './synopsis';
import scrollBox from '@/components/scrollBox';
import pageSj from '@/components/pageSj';

import tagGroup from '@/components/tagGroup';
import fabGroup from '@/components/fabGroup';
import { getCurPage, joinUrl } from '@/common/utils';
import { bgColors } from './const';

export default {
  name:'sage',
  components: { tagGroup, synopsis, groupItem, fabGroup, scrollBox, pageSj },
  data() {
    return {
      show: false,
      index: 0,
      menuType: '1'
    }
  },
  computed: {
    newBg () {
      return bgColors[this.menuType];
    }
  },
  mounted () {
    /*获取当前路由*/
    let curPage = getCurPage();
    let curParam = curPage.options || curPage.$route.query;

    const { id, title } = curParam
    this.menuType = id || 0;
    this.title = title || '';
    uni.setNavigationBarTitle({ title: this.title })
  },
  methods : {
    clickBuoy () {
      uni.navigateTo({ url: joinUrl('/pages/userInfo/index') })
    },
    clickDemo () {
      uni.navigateTo({ url: joinUrl('/pages/userComplete/index') })
    }
  },
}
</script>

<style lang="scss" scoped>
@import url("/static/fonts/iconfont.css");
$color:#B3B3B4;
.page_box{
  display: flex;
  flex-direction: column ;
  background: #F1F3F5;
  .group_info_list{
    padding: 0 20rpx 20rpx;
    z-index: 1;
    margin-top: -40rpx;
  }
}
.demo {
  position: absolute;
  top: 10px;
  left: 10px;
  background: blue;
  border-radius: 10rpx;
  padding: 10rpx;
  color: #fff;
}
</style>