<template>
<page-sj>
  <div class="initiateProcess">
    <div class="content">
      <!-- <div class="item_box" v-for='(ite, ind) in formHeads' :key='ind'>
        <div class="left">{{ ite.label }}</div>
        <div class="right">
          <input type="text" 
            class='input'
            v-model='formData[ite.code]' 
            :placeholder='ite.ph' 
            placeholder-class='placeH' 
            :curser="value.length"
          >
        </div>
      </div> -->
      <form-item-box v-for='(ite, ind) in formHeads' :key='ind' :ite='ite' :show-b='ind+1 === formHeads.length' >
        <form-item :info='ite' :headInit='ite'></form-item>
      </form-item-box>
    </div>
    <div class="btn" :class='[showBtn?"btn_active":""]' @click='submit'> 确定 </div>
  </div>
</page-sj>
  
</template>

<script>
import pageSj from '@/components/pageSjNew';

import formItem from '@/components/formItem';
import formItemBox from '@/components/formItemBox';
export default {
  name: 'initiateProcess',
  components: { pageSj, formItem, formItemBox },
  data() {
    return {
      value: '',
      formHeads:[
        { label: '发起者', code:'name', id: '' ,required: false, params: { ph: '获取微信名',    genre:'text', type: 'text', max: 20} },
        { label: '活动名称', code:'activeName', id: '' ,required: true, params: { ph: '请填写',    genre:'input', type: 'text', max: 20} },
        { label: '活动类型', code:'type', id: '' ,required: true, params: { ph: '选填',    genre:'select', type: 'text', max: 20} },
        { label: '开始时间', code:'startTime', id: '' ,required: true, params: { ph: '请选择',    genre:'date', type: 'text', max: 20} },
        { label: '结束时间', code:'endTime', id: '' ,required: true, params: { ph: '请选择',    genre:'date', type: 'text', max: 20} },
        { label: '地点',    code:'site', id: '' ,required: true, params: { ph: '请填写',    genre:'input', type: 'text', max: 20} },
        { label: '活动信息', code:'info', id: '' ,required: true, params: { ph: '请填写',    genre:'input', type: 'text', max: 20} },
        { label: '参与人数', code:'number', id: '' ,required: true, params: { ph: '请填写',    genre:'input', type: 'text', max: 20} },
        { label: '招募要求', code:'require', id: '' ,required: false, params: { ph: '请填写',    genre:'input', type: 'text', max: 20} },
        { label: '备注',    code:'remark', id: '' ,required: false, params: { ph: '请填写',    genre:'input', type: 'text', max: 20} },
      ],
      formData: {}
    }
  },
  computed:{
    showBtn () {
      const arr = this.formHeads.find(item=>{
        return !this.formData[item.code]
      }) || [];
      return  arr.length === 0
    }
  },
  methods:{
    submit() {
      console.log(1, this.formData)
    }
  }


}
</script>
<style lang="scss" scoped>
.initiateProcess{
  background: #F1F3F5;
  width: 100%;
  height: 100% ;
  padding: 20rpx 30rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  .content{
    width: 100%;
    background: #FFFFFF;
    border-radius: 16px;
    padding: 30rpx;
    box-sizing: border-box;
    >.item_box:last-child{
      border: none;
    }
    .item_box{
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2rpx solid rgba(0,0,0,.05);
      padding: 20rpx 0;
      .right{
        // width: 200rpx;
        .input{
          text-align: end;
        }
      }
      /deep/ .placeH{
        display: flex;
        justify-content: flex-end;
      }
    }
  }
  .btn{
    width: 100%;
    @include fontMixin(32rpx, #ffffff, bold);
    background: #C5C5C5 ;
    text-align: center;
    padding: 20rpx 0;
    border-radius: 40rpx;
  }
  .btn_active{
    background: #676FDF;
  }
}
</style>