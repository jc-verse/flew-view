<template>
<!-- 2.SAGE -->
  <div class="page_box">
    <tag-group ></tag-group>
    <div class="content_box">
      <synopsis></synopsis>
      <div class="group_info_list">
        <div class="group_info_item">
          <div class="info_header">
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import synopsis from './synopsis';
import tagGroup from '@/components/tagGroup';
export default {
  name:'sage',
  components: { tagGroup, synopsis },
  data() {
    return {
      show: false
    }
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
  height: calc(100vh - 88rpx);
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
    .group_info_item{
      z-index: 2;
      margin-top: -40rpx;
      height: 330px;
      background: #FFFFFF;
      border-radius: 8px;
    }
  }
}
</style>