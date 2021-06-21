<template>
  <page-sj> 
    <div class="acaHelp">
      <search @change='changeVal' :pValue='searchVal' :propertys="{'maxlength':'10'}"/>
      <tag-group @changeValue='changeTag' :showList='[1,2,3,5,6,4]'></tag-group>
      <scroll-box :num='2' @lower='lower'>
        <div class="group_info_list">
          <div class='list_tip' v-show='searchVal'>搜索到3个关于“{{searchVal}}”的信息</div>
          <template v-if="cardList.length">
            <group-item v-for="(item, ind) in cardList"  :infoData='item' :key='ind' @clickBuoy='clickBuoy' @clickItem='clickItem(item)'/>
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
    <!-- <DiyPopup ref='popup' :popupTitle="`${infoData.nikeName}的评价`" @popupclosed='popupclosed'>
      <template slot='content' style='height:100%'>
        
        <div class="rate_box">
          <div class="rate_item" v-for="(item, index) in rateHeads" :key='index'>
            <div class="rate_title">{{item.title}}</div>
            <div class="rate_content">
              <Rate 
                :size='34'  
                :value="rateForm[item.code]" 
                allowHalf 
                :max="5" 
                @change='changeRate($event,item.code)'
              ></Rate>
            </div>
          </div>
        </div>
      </template>
    </DiyPopup> -->

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
import DiyPopup from '@/components/diyPopup';
import DiyRate from '@/components/diyRate';
export default {
  name:'acaHelp',
  components: { tagGroup, scrollBox, fabGroup, search, groupItem, pageSj, DiyPopup, DiyRate },
  data() {
    return {
      searchVal: '',
      cardList: [],

      current: 1,
      size: 10,
      noConcat: false,
      rateForm: {
        dimension1: 0,
        dimension2: 0,
        dimension3: 0,
        dimension4: 0
      },
      loading: false
    }
  },
  onLoad() {
    this.initFotm();
  },
  methods : {
    initFotm (form = {}) {
      this.current = 1;
      this.size = 10;
      this.cardList = [];
      this.noConcat = false;
      this.getList(form);
    },
    changeVal(val){
      if ( this.searchVal != val) {
        this.searchVal = val;
        this.initFotm();
      }
    },
    clickItem(item) {
      uni.setStorage({ key: 'helpInfo' , data: item })
      uni.navigateTo({ url: '/pages/detailInfo/index' })

    },
    // 列表查询
    getList(form={}) {
      const { current, size, searchVal } = this;
      const params = { current, size, ...form, nikeName:searchVal };
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
    // 节流
    throttle(flag) {
      if (flag) {
        this.loading = true;
        uni.showLoading()
      } else {
        this.loading = false;
        uni.hideLoading()
      }
    },
    academicApplyService (serviceUserId, id) {
      if (this.loading) return;
      this.throttle(true);
      academicApplyService({ serviceUserId, id })
        .then(res => {
          const {data: nData} = res[1];
          const { code, data, success, msg } = nData || {};
          this.throttle(false);
          if (code === 200 ) {
            uni.showToast({title: msg})
            this.initFotm();
          } else {
            uni.showToast({title: msg, icon:'none' })
          }
        })
        .catch(err=>{
          this.throttle(false)
        })
        
    },
    // academicGetEvaluate(serviceUserId ) {
    //   academicGetEvaluate({serviceUserId}).then(res => {
    //     const {data: nData} = res[1];
    //     const { code, data, success } = nData || {};
    //     if (code === 200 && success) {
    //       this.rateForm = data
    //     }
    //   })
    // },
    lower() {
      if (this.noConcat) return ;
      this.getList();
    },
    // 改变筛选项
    changeTag(form) {
      this.initFotm(form);
    },
    // 点击卡片Btn
    clickBuoy (type, data, subjectId) {
      const { id } = data
      switch (type) {
        case 1: // 申请服务
          this.academicApplyService(id, subjectId)
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
