<template>
<!-- 2.竞赛组队备份2 -->
  <page-sj>
    <div class="page_box">
      <search @change='changeVal' :propertys="{'maxlength':'10'}"/>
      <div class="content_box">
        <nav-tab :list="tabList"/>
        <scroll-box>
          <div class="right_box">
            <div class="card_item" v-for="(item, index) in cardList" :key='index' @click="clickCardItem(item)">
              <div class="card_l">
                <img :src="item.url" alt="">
              </div>
              <div class="card_r">{{item.title || ''}}</div>
            </div>
          </div>
        </scroll-box>
      </div>
      <fab-group/>
    </div>
  </page-sj>
</template>

<script>
import search from '@/components/search';
import scrollBox from '@/components/scrollBox';
import pageSj from '@/components/pageSj';

import navTab from '@/components/navTab';
import fabGroup from '@/components/fabGroup';
import { tabList, cardList } from './const'
import { joinUrl } from '@/common/utils';
export default {
  name:'competition',
  components: { search, navTab, fabGroup, scrollBox, pageSj },
  data() {
    return {
      tabList,
      cardList,
    }
  },
  onLoad() {
    
  },
  onShow() {},
  methods: {
    changeVal(value) {
      console.log(1,value)
    },
    clickCardItem(item){
      uni.navigateTo({ url: joinUrl('/pages/sage/index',item) })
    }
  }
}
</script>

<style lang="scss" scoped>
.page_box{
  display: flex;
  flex-direction: column ;
  background: #F1F3F5;
  .content_box{
    flex-grow: 1;
    margin-top: 2rpx;
    display: flex;
    .right_box{
      flex-grow: 1;
      padding: 20rpx;
      box-sizing: border-box;
      .card_item{
        width: 100%;
        background: #FFFFFF;
        border-radius: 8px;
        padding: 40rpx 20rpx;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        margin-bottom: 20rpx;
        .card_l{
          width: 100rpx;
          height: 100rpx;
          flex-shrink: 0;
          @include flex_center;
          @include img_fill;
        }
        .card_r{
          @include fontMixin(30rpx, #333333,bold);
          flex-grow: 1;
        }
      }
    }
    .right_box > div:last-child{
      margin-bottom: 0;
    }
  }
}
</style>
