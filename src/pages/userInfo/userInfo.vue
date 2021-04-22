<template>
  <page-sj>
    <scroll-box>
      <div class="userInfo">
        <div class="top">
          <div class="item_box" v-for='(ite, ind) in formHeads' :key='ind'>
            <div class="left" :class="[ite.required?'required': '']">{{ ite.label }}</div>
            <div class="right">
              <input type="text" 
                class='input'
                v-model='formData[ite.code]' 
                :placeholder='ite.ph' 
                placeholder-class='placeH' 
                :curser="value.length"
              >
            </div>
          </div>
        </div>

        <div class="center">
          <div class="item_box" v-for='(ite, ind) in centerHeads' :key='ind'>
            <div class="left" :class="[ite.required?'required': '']">{{ ite.label }}</div>
            <div class="right">
              <input type="text" 
                class='input'
                v-model='formData[ite.code]' 
                :placeholder='ite.ph' 
                placeholder-class='placeH' 
                :curser="value.length"
              >
            </div>
          </div>
        </div>

        <div class="bottom">
          <courseSystem/> 
          <div class="item_box" v-for='(ite, ind) in bottomHeads' :key='ind'>
            <div class="left" :class="[ite.required?'required': '']">{{ ite.label }}</div>
            <div class="right">
              <input type="text" 
                class='input'
                v-model='formData[ite.code]' 
                :placeholder='ite.ph' 
                placeholder-class='placeH' 
                :curser="value.length"
              >
            </div>
          </div>
        </div>

        <div class="center">
          <div class="item_box" v-for='(ite, ind) in lastHeads' :key='ind'>
            <div class="left" :class="[ite.required?'required': '']">{{ ite.label }}</div>
            <div class="right">
              <input type="text" 
                class='input'
                v-model='formData[ite.code]' 
                :placeholder='ite.ph' 
                placeholder-class='placeH' 
                :curser="value.length"
              >
            </div>
          </div>
        </div>

        <div class="btn" :class='[showBtn?"btn_active":""]' @click='submit'> 确定 </div>
      </div>
    </scroll-box>
  </page-sj>
  
</template>

<script>

import scrollBox from '@/components/scrollBox';
import pageSj from '@/components/pageSj';
import courseSystem from './courseSystem'
export default {
  name: 'userInfo',
  components:{ scrollBox, courseSystem, pageSj },
  data() {
    return {
      isH5: false,
      value: '',
      formHeads:[
        { label: '昵称', code:'name', id: '' ,required: false, ph: '获取微信名' },
        { label: '微信号', code:'activeName', id: '' ,required: true, ph: '请填写微信号' },
        { label: '姓名', code:'type', id: '' ,required: true, ph: '请填写真实姓名' },
        { label: '手机', code:'startTime', id: '' ,required: true, ph: '请填写电话' },
        { label: '学校', code:'endTime', id: '' ,required: true, ph: '请填写学校' },
        { label: '年级', code:'site', id: '' ,required: true, ph: '请填写年级' },
        { label: '性别', code:'info', id: '' ,required: true, ph: '请选择性别' },
        { label: '邮箱', code:'number', id: '' ,required: true, ph: '请填写邮箱' },
      ],
      centerHeads: [
        { label: '校内成绩', code:'name', id: '' ,required: false, ph: '例：45/45 ，4/4，A*A*A*A*' },
      ],
      bottomHeads:[
        { label: '比赛经历', code:'name', id: '' ,required: false, ph: '亮出你比赛经历吧' },
        { label: '希望参加的比赛', code:'name', id: '' ,required: false, ph: '请选择您希望参加的比赛' },
      ],
      lastHeads: [
        { label: '专业方向', code:'name', id: '' ,required: false, ph: '请填写' },
        { label: '个人留言', code:'name', id: '' ,required: false, ph: '请填写' },
        { label: '录取大学', code:'name', id: '' ,required: false, ph: '确认录取后请填写' },

      ],
      formData: {}
    }
  },
  onLoad() {
    // #ifdef H5
      this.isH5 = true
    // #endif
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
.userInfo{
  box-sizing: border-box;
  background: #F1F3F5;
  width: 100%;
  padding: 20rpx 30rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .center, .btn, .bottom{
    margin-top: 20rpx;
  }
  .top, .center, .bottom{
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
      position: relative;
      .required::before{
        content: '*';
        position: absolute;
        left: -20rpx;
        top: 50%;
        transform: translateY(-50%);
        color: red;
      }
      .right{
        // width: 200rpx;
        max-width: 70%;
        flex-grow: 1;
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
  .bottom {
    // height:1048rpx;
  }
  .btn{
    width: 100%;
    @include fontMixin(32rpx, #ffffff, bold);
    background: #C5C5C5 ;
    text-align: center;
    padding: 20rpx 0;
    border-radius: 40rpx;
    box-sizing: border-box;
  }
  .btn_active{
    background: #676FDF;
  }
}
</style>