<template>
<!-- 2.竞赛组队备份2 -->
  <page-sj>
    <div class="page_box">
      <Search @change='search' ref='search' :propertys="{'maxlength':'10'}"/>
      <div class="content_box">
        <template v-if="!searchValue">
          <nav-tab :list="newMemu" :index='tabIndex' @clickItme="clickItme"/>
          <scroll-box style="width: 100%;" @lower='lower'>
            <div class="right_box">
              <div class="card_item" v-for="(item, index) in newCards" :key='index' @click="clickCardItem(item)">
                <div class="card_l">
                  <img :src="item.url || defalutImg" alt="">
                </div>
                <div class="card_r">
                  <div>{{item.label || ''}}</div>
                  <!-- <div>{{item.englishName || ''}}</div> -->
                </div>
              </div>
            </div>
          </scroll-box>
        </template>
        <template v-else>
          <scroll-box style="width: 100%;">
            <div class="right_box">
              <div class="card_item" v-for="(item, index) in newCards" :key='index' @click="clickCardItem(item)">
                <div class="card_l">
                  <img :src="item.url || defalutImg" alt="">
                </div>
                <div class="card_r">
                  <div>{{item.matchName || ''}}</div>
                  <!-- <div>{{item.englishName || ''}}</div> -->
                </div>
              </div>
            </div>
          </scroll-box>
        </template>
      </div>
      <fab-group/>
    </div>
  </page-sj>
</template>

<script>
import Search from '@/components/forms/search';
import scrollBox from '@/components/scrollBox';
import pageSj from '@/components/pageSjNew';

import navTab from '@/components/navTab';
import fabGroup from '@/components/fabGroup';
import { tabList, cardList, memus  } from './const';
import { joinUrl, getCurPage } from '@/common/utils';

import { teamTypeBranchList, teamTypeCompetition } from '@/common/api';
import { imgUrl } from '@/common/http';
import commonMixin from '@/common/mixins/commonMixin'
export default {
  name:'competition',
  components: { Search, navTab, fabGroup, scrollBox, pageSj },
  mixins:[commonMixin],
  data() {
    return {
      tabList,
      cardList,
      defalutImg: require('@/static/img1/poster.png'),

      menuType: '1',
      title: '',
      tabIndex: 0,
      tabs: [],
      cards: [],
      
      // searchCards:[], //用于卡片搜索的集合
      searchValue: '',

      size: 10,
      current: 1,
      total: 0,
      noConcat: false // 分页控制
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
          label: item.matchName,
          url: imgUrl +  item.icon
        }
      }) || []
      return cards
    },
    // searchCards() {
    //   const { searchValue, searchCardList } = this;
    //   const arr = searchCardList.filter(item => item.label.includes(searchValue)).map(item => {
    //     return {
    //       ...item,
    //       label: item.matchName,
    //       url: item.icon ? imgUrl +  item.icon: ''
    //     }
    //   })
    //   console.log(9238,arr )
    //   return arr;
    // },
    // searchCardList () {//  当前大类下的所有三级菜单
    //   const { totalList, menuType } = this;
    //   console.log(99967, totalList, menuType)
    //   let arr = []; // 获取二级菜单
    //   let list = []; // 存放三级菜单
    //   if (totalList.length) {
    //     const obj = totalList.find(item => item.id == menuType) || {};
    //     arr = obj.children || [];
    //   }

    //   if (arr.length) { // 整合三级菜单
    //     arr.forEach(item => {
    //       if (item.children && Array.isArray(item.children)) {
    //         list = [...list, ...item.children];
    //       }
    //     })
    //   }
    //   return list;
    // }
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
      const { current, size, tabIndex, tabs, searchValue  } = this;
      if (!tabs.length) {return}
      const params = {
        current,
        organizeTypeSonId: id || tabs[tabIndex].id,
        size,
        keyword: searchValue || ''
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
        }
      }).catch(err => {console.log(err)})
    },
    search(value) {
      if (this.searchValue !== value) {
        this.cards = [];
        this.current = 1;
        this.noConcat = false;
        this.searchValue = value;
        this.getCardList();
      }
    },
    // 点击右侧卡片
    clickCardItem(item){
      const { title, menuType, tabs, tabIndex } = this;
      tabs[tabIndex].id
      const query = { ...item, title, menuType  } //id: menuType
      this.$refs.search.value = '';
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
        padding: 40rpx 20rpx;
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
          margin-right: 16rpx;
          @include flex_center;
          @include img_fill;
        }
        .card_r{
          @include fontMixin(30rpx, #333333, bold);
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
