<template>
  <page-sj> 
    <div class="consult">
      <search @change='changeVal' :pValue='searchVal' :propertys="{'maxlength':'10'}"/>
      <tag-group ></tag-group>
      <scroll-box>
        <div class="group_info_list">
          <div class='list_tip' v-show='searchVal'>搜索到3个关于“{{searchVal}}”的信息</div>
          <template v-if="!searchVal">
            <group-item v-for="(item, ind) in 3" :key='ind' @clickItem='clickItem'/>
          </template>
          <template v-if="searchVal">
            <search-item v-for="(item, ind) in 3" :key='ind' @clickItem='clickItem'/>
          </template>
        </div>
      </scroll-box>
      <fab-group/>
    </div>

  </page-sj>
</template>

<script>
import groupItem from './groupItem';
import searchItem from './searchItem';
import search from '@/components/search';
import scrollBox from '@/components/scrollBox';
import pageSj from '@/components/pageSj';
import tagGroup from '@/components/tagGroup';
import fabGroup from '@/components/fabGroup';
export default {
  name:'sage',
  components: { 
    tagGroup, 
    scrollBox, 
    fabGroup, 
    search, 
    groupItem,
    pageSj,
    searchItem
  },
  data() {
    return {
      show: false,
      index: 0,
      searchVal: 'qqqq'
    }
  },
  methods : {
    changeVal(val){
      this.searchVal = val
    },
    clickItem() {
      uni.navigateTo({ url: '/pages/detailInfo/index' })
    }
  },
}
</script>

<style lang="scss" scoped>
.consult{
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
