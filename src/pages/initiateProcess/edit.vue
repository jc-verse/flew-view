<template>
<page-sj>
  <div class="initiateProcess">
    <div class="content">
      <form-item-box v-for='(ite, ind) in formHeads' :key='ind' :ite='ite' :show-b='ind+1 === formHeads.length' >
        <form-item :info='ite' :headInit='ite' :formData='formData' @change="changeFn"></form-item>
      </form-item-box>
    </div>
    <div class="btn" v-if="errList.length" @click='submit'> 确定 </div>
    <div class="btn btn_active" v-else  @click='submit'> 确定 </div>
  </div>
</page-sj>
  
</template>

<script>
import pageSj from '@/components/pageSjNew';

import formItem from '@/components/forms/formItem';
import formItemBox from '@/components/forms/formItemBox';
import { activityList, operationActivityEdit } from '@/common/api'
import { getCurPage } from '@/common/utils';
const arr = [
  { label: '请选择', id: '' },
  { label: '艺术', id: 1 },
  { label: '体育', id: 2 },
  { label: '学术', id: 3 },
  { label: '综合', id: 4 },
  { label: '其他', id: 5 },
]
const toDateTime = (date) => {
  return new Date(date).getTime();
}
export default {
  name: 'initiateProcess',
  components: { pageSj, formItem, formItemBox },
  data() {
    return {
      value: '',
      formHeads: [
        // { label: '发起者',    code:'name',          id: '' ,required: false,  params:  { ph: '请填写',     genre:'input',   type: 'text', max: 20} ,disabled:true},
        { label: '活动名称',  code:'activityName',  id: '' ,required: true,   params:  { ph: '请填写',     genre:'input',  type: 'text', max: 20} },
        // { label: '活动类型',  code:'activityType',  id: '' ,required: true,   params:  { ph: '请选择',     genre:'select', type: 'text', max: 20, list:arr} ,disabled:true},
        // { label: '开始时间',  code:'startTime',     id: '' ,required: true,   params:  { ph: '请选择',     genre:'date',   type: 'text', max: 20} ,disabled:true},
        // { label: '结束时间',  code:'endTime',       id: '' ,required: true,   params:  { ph: '请选择',     genre:'date',   type: 'text', max: 20} ,disabled:true},
        { label: '地点',      code:'address',       id: '' ,required: true,   params:  { ph: '请填写',     genre:'input',  type: 'text', max: 20} },
        { label: '活动信息',  code:'activityInfo',  id: '' ,required: true,   params:  { ph: '请填写',     genre:'input',  type: 'text', max: 20} },
        // { label: '参与人数',  code:'num',           id: '' ,required: true,   params:  { ph: '请填写',     genre:'input',  type: 'text', max: 20} ,disabled:true},
        { label: '招募要求',  code:'requirement',   id: '' ,required: false,  params:  { ph: '请填写',     genre:'input',  type: 'text', max: 20} },
        { label: '备注',      code:'remarks',       id: '' ,required: false,  params:  { ph: '请填写',     genre:'input',  type: 'text', max: 20} },
      ],    
      canClick: true,  
      formData: {
        // "endTime": "",
        // "num": '',
        // "activityType": '',
        // "startTime": ""
        "address": "",
        "activityId":'',
        "activityInfo": "",
        "activityName": "",
        "remarks": "",
        "requirement": "",
      }
    }
  },
  onShow() {
    const { activityId } = getCurPage()
    this.getInfo(activityId)
  },
  computed:{
    showBtn () {
      const arr = this.formHeads.find(item=>{
        return !this.formData[item.code]
      }) || [];
      return  arr.length === 0
    },
    errList () {
      const { formData, formHeads } = this;
      const errArr =  []
      const ite = formHeads.find(item => item.required && !formData[item.code]) || {};
      if (Object.keys(ite).length) {
        if ( ite.params.genre === 'input') {
          errArr.push(`${ite.label}不能为空！`)
        } 
      }
      return errArr
    }
  },
  methods:{
    submit() {
      const { errList, formData } = this;
      console.log(1, formData)
      if (errList.length) {
        uni.showToast({title: errList[0], icon:'none'})
        return 
      }
      this.canClick = false;
      this.operationActivityEdit();
    },
    operationActivityEdit() {
      const { formData } = this;
      const params = { ...formData, info: formData.activityInfo }
      const _this = this;
      operationActivityEdit(params).then(res => {
        const { data: nData } = res[1];
        const { data, code, msg } = nData;
        if (code === 200) {
          uni.showToast({ 
            title: msg || '',
            success: (res)=>{
              setTimeout(function () {
                uni.navigateBack({ delta:1,success:()=>{
                  _this.canClick = true;
                }})
              }, 1000);
            } 
          })
        }else {
          uni.showToast({ title: msg ,icon:'none', success: () =>{
            _this.canClick = true;
          } });
        }
      }).catch(err=> {
        console.log(err)
        this.canClick = true;
      })
    },
    // 改变表单
    changeFn({data, code, type}) {
      this.formData[code] = data;
    },
    // 获取详情
    getInfo(activityId) {
      const params = {
        activityId,
        current: 1,
        size: 10,
      }
      activityList(params).then(res => {
        const { data: nData } = res[1];
        const { data, code } = nData;
        if (code === 200) {
          console.log(123123, data)
          const { records } = data
          const info = records[0] || {};
          const { formHeads } = this;
          const infoObj = {}
          for (let i in formHeads) {
            infoObj[formHeads[i].code] = info[formHeads[i].code]
          }
          infoObj.activityId = info.activityId;
          this.formData = infoObj;
        }
      })
    },
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