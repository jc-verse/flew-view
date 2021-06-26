<template>
  <page-sj> 
    <div class="consult" style="overflow: hidden;">
      <search @change='changeVal' :pValue='searchVal' :propertys="{'maxlength':'10'}"/>
      <tag-group @changeValue='changeTag' :showList='[1,2,3,5,6,4]'></tag-group>
      <scroll-box :num='2' @lower='lower'>
        <div class="group_info_list">
          <div class='list_tip' v-show='searchVal'>搜索到{{cardList.length || 0}}个关于“{{searchVal}}”的信息</div>
          <template v-if="cardList.length">
            <group-item v-for="(item, ind) in cardList" :userId='userId' :infoData='item' :key='ind'  @clickBuoy='clickBuoy' @clickItem='clickItem(item)'/>
            <div class="loading" >{{!noConcat? '加载中...' :'到底了'}}</div>
          </template>
          <template v-else>
            <div class="noList">
              暂无咨询记录！
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
  onLoad() {
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
            const arr = [ ...this.cardList , ...records]
            const indexArr = arr.map(item => item.id);
            const newArr = [...new Set(indexArr)]
            this.cardList = arr.filter(item => newArr.includes(item.id)) ;
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
    },
    clickItem(item) {
      uni.setStorage({ key: 'helpInfo' , data: item })
      uni.navigateTo({ url: '/pages/consultDetail/index' })
    },
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
    min-height: 100%;
    .list_tip{
      padding-bottom: 20rpx;
      @include fontMixin(24rpx, #6d6c6c)
    }
  }
  .noList{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color:#ada9a9;
    }
  .loading{
    margin: 10rpx auto;
    color: #8f8f8f;
  }
}
</style>
