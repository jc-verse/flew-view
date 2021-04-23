<template>
<!-- 2.竞赛组队备份2 -->
  <div class="page_box">
    <search @change='changeVal' :propertys="{'maxlength':'10'}"/>
    <div class="content_box">
      <nav-tab :list="tabList"/>
      <diy-scroll>
        <div class="right_box">
          <div class="card_item" v-for="(item, index) in cardList" :key='index' @click="clickCardItem(item)">
            <div class="card_l">
              <img :src="item.url" alt="">
            </div>
            <div class="card_r">{{item.title || ''}}</div>
          </div>
        </div>
      </diy-scroll>
    </div>
    <fab-group/>
  </div>
</template>

<script>
import search from '@/components/search';
import diyScroll from '@/components/diyScroll';
import navTab from '@/components/navTab';
import fabGroup from '@/components/fabGroup';
import { tabList, cardList } from './const'
export default {
  name:'competition',
  components: { search, diyScroll, navTab, fabGroup },
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
      console.log(item)
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin font_1{
  font-size: 15px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
  line-height: 21px;
}
.page_box{
  overflow: hidden;
  height: calc(100vh - 88rpx);
  display: flex;
  flex-direction: column ;
  background: #F1F3F5;
  .content_box{
    flex-grow: 1;
    margin-top: 2rpx;
    display: flex;
    .right_box{
      // background: red;
      flex-grow: 1;
      padding: 20rpx 20rpx 0;
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
          @include font_1;
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
