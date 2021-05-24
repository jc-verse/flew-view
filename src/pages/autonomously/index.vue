<template>
  <page-sj>
    <div class='autonomously'>
      <div class="content_box">
        <!-- 左侧导航 -->
        <nav-tab :list="tabList" :index='tabIndex' @clickItme="clickItme">
          <div class="diy" slot='diy' @click="clickOpen"></div>
        </nav-tab>
        <!-- 右侧卡片 -->
        <scroll-box style='width:100%'>
          <div class="right_box" >
            <div v-for='(ite,ind) in cardList' :key='ind'>
              <cardItem :infoData='ite' @clickBtn='clickBtn'/>
            </div>
          </div>
        </scroll-box>
      </div>
      <fab-group/>
    </div>
    <TipPopup title="操作提示" ref='noLogin' msg="是否登录后执行操作？" @confirm='toLogin'/>
  </page-sj>
</template>

<script>
import scrollBox from '@/components/scrollBox';
import pageSj from '@/components/scrollBox';
import navTab from '@/components/navTab';
import fabGroup from '@/components/fabGroup';
import cardItem from './cardItem';
import TipPopup from '@/components/cards/tipPopup';
import {  cardList } from '@/components/const'
import { isLogin, toLogin } from '@/common/utils'
import { activityList } from '@/common/api'
const tabList = [
  { id: '', label: '全部' },
  { id: 1, label: '艺术' },
  { id: 2, label: '体育' },
  { id: 3, label: '学术' },
  { id: 4, label: '综合' },
  { id: 5, label: '其他' }
]
export default {
  name: 'autonomously',
  components: { scrollBox, navTab, fabGroup, cardItem, pageSj, TipPopup },
  data() {
    return {
      tabList,
      cardList,
      current: 1,
      type: 1,
      tabIndex: 0
    }
  },
  onShow() {
    this.initForm();
  },
  methods: {
    toLogin,
    initForm () {
      this.current = 1;
      this.cardList = [];
      this.getList();
    },
    clickOpen() {
      if (!isLogin()) {
        this.$refs.noLogin.show()
        return 
      }
      uni.navigateTo({ url: '/pages/initiateProcess/index' })
    },
    clickBtn() {
      if (!isLogin()) {
        this.$refs.noLogin.show()
        return 
      }
      uni.navigateTo({ url: '/pages/detailGroup/index' })
    },
    // 点击memu
    clickItme (item , index) {
      if(this.tabIndex !== index) {
        this.tabIndex = index;
        this.cardList = [];
        this.current = 1;
        // this.noConcat = false
        this.getList();
      }
    },
    
    getList () {
      const { current, size = 10, cardList, tabIndex } = this;
      const type = tabList[tabIndex].id
      const params = { current, type, size};
      activityList(params).then(res => {
        const { data: nData } = res[1];
        const { data, code } = nData;
        if (code === 200) {
          const { records } = data
          console.log('自主list', data)
          this.cardList = [ ...cardList, ...records];
        }
      })
    }
  }
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
    .diy{
      width: 160rpx;
      height: 160rpx;
      @include flex_center;
      @include img_bg('http://prod.qiniucdns.sjreach.cn/web-23.png');

    }
  }
}
</style>