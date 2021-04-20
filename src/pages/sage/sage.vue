<template>
<!-- 2.SAGE -->
  <div class="page_box" :style='{height: isH5 ? "calc(100vh - 88rpx)": "100vh" }'>
    
    <diy-scroll :styles='{ display:"flex",flexDirection: "column", height: isH5 ? "": "100vh" }'>
      
      <tag-group ></tag-group>
      <synopsis></synopsis>
      <div class="group_info_list">
        <group-item v-for="(item, ind) in 3" :key='ind'/>
      </div>
    </diy-scroll>
    <fab-group/>
  </div>
</template>

<script>
import groupItem from './groupItem';
import synopsis from './synopsis';
import diyScroll from '@/components/diyScroll';
import tagGroup from '@/components/tagGroup';
import fabGroup from '@/components/fabGroup';
export default {
  name:'sage',
  components: { tagGroup, synopsis, groupItem, diyScroll, fabGroup },
  data() {
    return {
      show: false,
      index: 0,
      isH5: false
    }
  },
  onLoad() {
    // #ifdef H5
      this.isH5 = true
    // #endif
  },
  methods : {
  },
}
</script>

<style lang="scss" scoped>
@import url("/static/fonts/iconfont.css");
$color:#B3B3B4;
.page_box{
  overflow: hidden;
  height: 100vh;
  display: flex;
  flex-direction: column ;
  background: #F1F3F5;
  .content_box{
    background:red;
    height:100%;
    position: relative;
    display: flex;
    flex-direction: column;
  }
  .group_info_list{
    padding: 0 20rpx;
    z-index: 1;
    margin-top: -40rpx;
  }
}
</style>