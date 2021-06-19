<template>
  <page-sj> 
    <div class="consult" style="overflow: hidden;">
      <search @change='changeVal' :pValue='searchVal' :propertys="{'maxlength':'10'}"/>
      <tag-group @changeValue='changeTag' :showList='[1,2,3,5,6,4]'></tag-group>
      <scroll-box :num='2' @lower='lower'>
        <div class="group_info_list">
          <div class='list_tip' v-show='searchVal'>搜索到{{cardList.length || 0}}个关于“{{searchVal}}”的信息</div>
          <template>
            <group-item v-for="(item, ind) in cardList" :userId='userId' :infoData='item' :key='ind'  @clickBuoy='clickBuoy'/>
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
import { consultingList, consultingApplyService } from '@/common/api';

export default {
  name:'consult',
  components: { tagGroup, scrollBox, fabGroup, search, groupItem, pageSj },
  data() {
    return {
      searchVal: '',
      cardList: [],

      current: 1,
      size: 10,
      noConcat: false,
      userId: '',
      loading: false
    }
  },
  onShow() {
    this.initForm();
    this.userId = uni.getStorageSync('userId');
  },
  methods : {
    initForm (form={}) {
      this.current = 1;
      this.size = 10;
      this.cardList = [];
      this.noConcat = false;
      this.getInfo(form);
    },
    changeVal(val){
      if ( this.searchVal != val) {
        this.searchVal = val;
        this.initForm();
      }
    },
    getInfo(form={}) {
      const { current, size, searchVal } = this;
      const params = { current, size, ...form, nikeName:searchVal };
      consultingList(params).then(res => {
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
    consultingApplyService (id) {
      if (this.loading) return;
      this.throttle(true)
      consultingApplyService({ serviceUserId: id }).then(res => {
        const {data: nData} = res[1];
        const { code, data, success, msg } = nData || {};
        this.throttle(false)
        if (code === 200 && success) {
          uni.showToast({title: '申请成功！'})
        } else {
          uni.showToast({title:msg, icon:'none' })
        }
        
        this.initForm()
      }).catch(err=> {
        console.log(err);
        this.throttle(false)
      })
    },
    lower() {
      if (this.noConcat) return ;
      this.getInfo();
    },
    changeTag(form) {
      this.initForm(form)
    },
    // 点击卡片Btn
    clickBuoy (type, data) {
      const { id } = data
      switch (type) {
        case 1: // 申请服务
          this.consultingApplyService(id)
          break;
        // case 2: // 评价
        //   console.log('评价')
          // break;
      
        default:
          break;
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.consult{
  display: flex;
  flex-direction: column ;
  background: #F1F3F5;
  overflow: hidden;
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
