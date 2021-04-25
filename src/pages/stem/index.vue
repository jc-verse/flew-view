<template>
<!-- 2.竞赛组队备份2 -->
  <page-sj>
    <div class="page_box">
      <search @change='search' :propertys="{'maxlength':'10'}"/>
      <div class="content_box">
        <nav-tab :list="newMemu" :index='tabIndex' @clickItme="clickItme"/>
        <scroll-box>
          <div class="right_box">
            <div class="card_item" v-for="(item, index) in newMemu[tabIndex].list" :key='index' @click="clickCardItem(item)">
              <div class="card_l">
                <img :src="item.url || defalutImg" alt="">
              </div>
              <div class="card_r">{{item.msg || ''}}</div>
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
import { tabList, cardList, memus  } from './const';
import { joinUrl, getCurPage } from '@/common/utils';
export default {
  name:'competition',
  components: { search, navTab, fabGroup, scrollBox, pageSj },
  data() {
    return {
      tabList,
      cardList,
      defalutImg:require('@/static/img1/poster.png'),

      menuType: '1',
      title: '',
      tabIndex: 0
    }
  },
  computed: {
    newMemu () {
      const memu = memus[this.menuType];
      return memu
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
  methods: {
    search(value) {
      console.log(1,value)
    },
    // 点击右侧卡片
    clickCardItem(item){
      const { title, menuType } = this;
      const query = { ...item, title, id: menuType }
      uni.navigateTo({ url: joinUrl('/pages/sage/index', query) })
    },
    // 点击memu
    clickItme (item , index) {
      this.tabIndex = index;
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
        padding: 30rpx 20rpx;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        margin-bottom: 20rpx;
        .card_l{
          width: 100rpx;
          height: 100rpx;
          flex-shrink: 0;
          border-radius: 50%;
          overflow: hidden;
          margin-right: 6rpx;
          @include flex_center;
          @include img_fill;
        }
        .card_r{
          @include fontMixin(24rpx, #333333, bold);
          flex-grow: 1;
        }
      }
    }
    .right_box > div:last-child{
      margin-bottom: 0;
    }
  }
}

/deep/.uni-scroll-view-content{
  display: block  ;
}
</style>
