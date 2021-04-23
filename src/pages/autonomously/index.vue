<template>
  <page-sj>
    <div class='autonomously'>
      <div class="content_box">
        <nav-tab :list="tabList"/>
        <scroll-box style='width:100%'>
          <div class="right_box" >
            <div v-for='(ite,ind) in 3' :key='ind'>
              <cardItem  />
            </div>
          </div>
        </scroll-box>
      </div>
      <fab-group/>
    </div>
  </page-sj>
</template>

<script>
import scrollBox from '@/components/scrollBox';
import pageSj from '@/components/scrollBox';
import navTab from '@/components/navTab';
import fabGroup from '@/components/fabGroup';
import cardItem from './cardItem';
import { tabList, cardList } from '@/components/const'
export default {
  name: 'autonomously',
  components: { scrollBox, navTab, fabGroup, cardItem, pageSj },
  data() {
    return {
      tabList,
      cardList,
      isH5: false
    }
  },
  onLoad() {
    // #ifdef H5
      this.isH5 = true
    // #endif
  },

}
</script>

<style lang="scss" scoped>
.autonomously{
  overflow: hidden;
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
      padding: 20rpx ;
      box-sizing: border-box;
      > div:not(:first-child){
        margin-top: 20rpx;
      }
    }
  }
}
.isH5{
  height: calc(100vh - 88rpx) ;
}
</style>