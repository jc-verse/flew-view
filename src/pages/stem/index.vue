<template>
<!-- 2.竞赛组队备份2 -->
  <page-sj>
    <div class="page_box">
      <search @change='search' :propertys="{'maxlength':'10'}"/>
      <div class="content_box">
        <nav-tab :list="newMemu" :index='tabIndex' @clickItme="clickItme"/>
        <scroll-box style="width: 100%;" @lower='lower'>
          <div class="right_box">
            <div class="card_item" v-for="(item, index) in newCards" :key='index' @click="clickCardItem(item)">
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
import pageSj from '@/components/pageSjNew';

import navTab from '@/components/navTab';
import fabGroup from '@/components/fabGroup';
import { tabList, cardList, memus  } from './const';
import { joinUrl, getCurPage } from '@/common/utils';

import { teamTypeBranchList, teamTypeCompetition } from '@/common/api';
import { imgUrl } from '@/common/http';
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
      tabIndex: 0,
      tabs: [],
      cards: [],

      size: 10,
      current: 1,
      total: 0,
      noConcat: false
    }
  },
  computed: {
    newMemu () {
      const memu = this.tabs.map(item => ({...item, label: item.sonName}));
      return memu;
    },
    newCards () {
      let cards = this.cards.map(item => {
        return  {
          ...item,
          msg: item.matchName,
          url: imgUrl +  item.icon
        }
      }) || []
      return cards
    }
  },
  mounted () {
    /*获取当前路由*/

    const { id, title } = getCurPage()
    this.menuType = id || 0;
    this.title = title || '';
    uni.setNavigationBarTitle({ title: this.title })
    this.getList(this.menuType);
  },
  methods: {
    getList (organizeTypeId) {
      teamTypeBranchList({organizeTypeId}).then(res => {
        const { data:nData } = res[1];
        const { data, code } = nData || {};
        if (code === 200) {
          this.tabs = data;
          this.tabIndex = 0;
          this.getCardList()
        }
      }).catch(err => {console.log(err)})
    },
    getCardList (id) {
      const { current, size, tabIndex, tabs  } = this;
      if (!tabs.length) {return}
      const params = {
        current,
        organizeTypeSonId: id || tabs[tabIndex].id,
        size
      }
      teamTypeCompetition(params).then(res=> {
        const { data:nData } = res[1];
        const { data, code } = nData || {};
        if (code === 200) {
          const { size, total, pages, records } = data;
          const { cards } = this;
          this.cards = cards.concat(records || []);
          if (total> cards.length) {
            this.current += 1
          } else {
            this.noConcat = true;
          }
          console.log(1099,this.cards)
        }
      }).catch(err => {console.log(err)})
    },
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
      if(this.tabIndex !== index) {
        this.tabIndex = index;
        this.cards = [];
        this.current = 1;
        this.noConcat = false
        this.getCardList();
      }
    },
    // 触底
    lower() {
      if (!this.noConcat) {
        this.getCardList()
      }
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
