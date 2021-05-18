<template>
  <page-sj> 
    <div class="acaHelp">
      <search @change='changeVal' :pValue='searchVal' :propertys="{'maxlength':'10'}"/>
      <tag-group ></tag-group>
      <scroll-box :num='2' @lower='lower'>
        <div class="group_info_list">
          <div class='list_tip' v-show='searchVal'>搜索到3个关于“{{searchVal}}”的信息</div>
          <template v-if="cardList.length">
            <group-item v-for="(item, ind) in cardList" :infoData='item' :key='ind' @clickBuoy='clickBuoy' @clickItem='clickItem(item)'/>
          </template>
          <template v-else>
            <div class="noList">
              暂无学术帮助！
            </div>
          </template>
        </div>
      </scroll-box>
      <fab-group/>
    </div>

  </page-sj>
</template>

<script>
import groupItem from './groupItem';
import search from '@/components/forms/search';
import scrollBox from '@/components/scrollBox';
import pageSj from '@/components/pageSjNew';
import tagGroup from '@/components/forms/tagGroup';
import fabGroup from '@/components/fabGroup';
import { academicHelpList, academicApplyService } from '@/common/api';
export default {
  name:'acaHelp',
  components: { tagGroup, scrollBox, fabGroup, search, groupItem, pageSj },
  data() {
    return {
      searchVal: '',
      cardList: [],

      current: 1,
      size: 10,
      noConcat: false,
    }
  },
  onShow() {
    this.initFotm();
  },
  methods : {
    initFotm () {
      this.current = 1;
      this.size = 10;
      this.cardList = [];
      this.noConcat = false;
      this.getList();
    },
    changeVal(val){
      this.searchVal = val
    },
    clickItem(item) {
      uni.setStorage({ key: 'helpInfo' , data: item })
      uni.navigateTo({ url: '/pages/detailInfo/index' })

    },
    // 列表查询
    getList() {
      const { current, size } = this;
      const params = { current, size };
      academicHelpList(params).then(res => {
        const {data: nData} = res[1];
        const { code, data } = nData || {};
        if (code === 200) {
          const { current, pages, records, searchCount, total  } = data;
          if (records && records.length) {
            this.cardList = [ ...this.cardList , ...records] ;
            if (records.length < 10 && records) {
              this.noConcat = true;
            }else {
              this.current +=1;
            }
          } else  {
            this.noConcat = true;
          }
        }
      })
    },
    academicApplyService (id) {
      academicApplyService({ serviceUserId: id }).then(res => {
        const {data: nData} = res[1];
        const { code, data, success } = nData || {};
        if (code === 200 && success) {
          uni.showToast({title: '申请成功！'})
        }
      })
    },
    lower() {
      if (this.noConcat) return ;
      this.getList();
    },
    // 点击卡片Btn
    clickBuoy (type, data) {
      console.log(12222, type, data)
      const { id } = data
      switch (type) {
        case 1: // 申请服务
          this.academicApplyService(id)
          break;
        case 2: // 评价
          console.log('评价')
          break;
      
        default:
          break;
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.acaHelp{
  display: flex;
  flex-direction: column ;
  background: #F1F3F5;
  overflow: hidden;
  .group_info_list{
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 20rpx 30rpx;
    box-sizing: border-box;
    min-height: 100%;
    .list_tip{
      padding-bottom: 20rpx;
      @include fontMixin(24rpx, #6d6c6c)
    }
    .noList{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color:#ada9a9;
    }
  }
}
</style>
