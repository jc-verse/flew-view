<template>
  <scroll-box> 
    <div class="consult">
      <search @change='changeVal' :propertys="{'maxlength':'10'}"/>
      <tag-group ></tag-group>
      <scroll-box>

        <div class="group_info_list">
          <div class='list_tip'>搜索到3个关于“包玉刚”的信息</div>
          <group-item v-for="(item, ind) in 3" :key='ind'/>
        </div>
      </scroll-box>
      <fab-group/>
    </div>

  </scroll-box>
</template>

<script>
import groupItem from './groupItem';
import search from '@/components/search';
import scrollBox from '@/components/scrollBox';
import tagGroup from '@/components/tagGroup';
import fabGroup from '@/components/fabGroup';
export default {
  name:'sage',
  components: { 
    tagGroup, 
    scrollBox, 
    fabGroup, 
    search, 
    groupItem
  },
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
.consult{
  overflow: hidden;
  height: 100vh;
  display: flex;
  flex-direction: column ;
  background: #F1F3F5;
  .group_info_list{
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 20rpx 30rpx;
    .list_tip{
      padding-bottom: 20rpx;
      @include fontMixin(24rpx, #6d6c6c)
    }
  }
}
</style>
