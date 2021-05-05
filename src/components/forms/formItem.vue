<template>
  <div class="formItem">
    <!-- 文本 -->
    <template v-if="headInit.params.genre === 'text'">
      {{  formData[headInit.code] || '' }}
    </template>
    <!-- input -->
    <template v-if="headInit.params.genre === 'input'">
      <input class='input'
        :disabled='!!headInit.disabled'
        v-model='formData[headInit.code]'
        :maxlength='headInit.params.max || 20'
        :type='headInit.params.type' 
        :placeholder='headInit.params.ph' 
        placeholder-class='placeH' 
        @input="change($event, 'input', headInit.code)"
      >
    </template>

    <!-- select -->
    <template v-if="headInit.params.genre === 'select'" >
      <picker  range-key='label' :value="formData[headInit.code]" :disabled='!!headInit.disabled'  @change="change($event, 'select', headInit.code)" :range="headInit.params.list">
        <view class="select" v-if='formData[headInit.code]'>{{formData[headInit.code] | findIndex(headInit.params.list)}}</view>
        <view v-else style='color:#808080'>请选择</view>
      </picker>
    </template>

    
    <!-- select -->
    <template v-if="headInit.params.genre === 'date'">
      <picker  range-key='label' mode='date' :disabled='!!headInit.disabled' :value="formData[headInit.code]" @change="change($event, 'select', headInit.code)" :range="headInit.params.list">
        <view class="select"  v-if='formData[headInit.code]'>{{headInit.params.list[formData[headInit.code]].label}}</view>
        <view v-else style='color:#808080'>请选择</view>
      </picker>
    </template>

    <!-- checkbox -->
    <template v-if="headInit.params.genre === 'checkbox'">
      <checkbox-group @change='change($event, "checkout", headInit.code)' :disabled='!!headInit.disabled' v-model='formData[headInit.code]'>
        <checkbox :value="headInit.code" :checked="formData[headInit.code]" />
      </checkbox-group>
    </template>

    <!-- upload -->
    <template v-if="headInit.params.genre === 'upload'">
      <UploadImg @uploadImg='change($event, "upload", headInit.code)' :statu='1'>
        <slot name='upload'>
          <i class="iconfont icontupianshangchuan " style="color:#676FDF;font-size:50rpx"></i>
        </slot>
      </UploadImg>
    </template>

    <!-- custom -->
    <template v-if="headInit.params.genre === 'custom'">
      <div class="custom">
        <slot name='custom'></slot>
      </div>
    </template>

    <!-- combox -->
    <template v-if="headInit.params.genre === 'combox'">
      <combox 
        v-model="formData[headInit.code]"
        :placeholder='headInit.params.ph'
        :candidates='headInit.params.candidates'
        @input='comboxFn'
        :style='{width:"100%"}'
      >
        
      </combox>
      <!-- <uni-combox label='学校' :candidates='[1,6,2,3,4,5]' placeholder='123' v-model="formData[headInit.code]"></uni-combox> -->
    </template>
    
  </div>
</template>

<script>
import UploadImg from "./upload";
import combox  from './combox';
export default {
  name:'formItem',
  components: { combox, UploadImg },
  data () {
    return {
    }
  },
  props: {
    headInit: { type: Object, default: ()=> ({}) },
    formData: { type: Object, default: ()=> ({}) }
  },
  computed: {
  },
  filters: {
    findIndex (val, arr) {
      const item =  arr.find(item=> {
        return item.id === val
      }) || {}
      return item.label || ''
    }
  },
  methods: {
    comboxFn() {},
    change(e, type, code){
      const { value } = e.target || {}
      let val = value || ''
      switch (type) {
        case 'checkout':
          val = !!value.length;
          break;
        case 'input':
          val = value;
          break;
        case 'upload':
          val = e.name || '';
          break;
        case 'select':
          const {list} = this.headInit.params || {}
          const ite = list.find((item, index) => index == value) || {}
          val = ite.id;
          break;
        default:
          break;
      }
      console.log(199, this.formData, this.headInit.code)
      this.$emit('change', {data : val , code} )
    }
  }
}
</script>

<style lang="scss" scoped>
.formItem{
  display: flex;
  justify-content: flex-end;
  .input,/deep/.uni-combox__input{
    border: none;
    text-align: end;
    outline: none;
  }
  input {
    text-align: right !important;
  }
  .custom, .select{
    @include fontMixin(26rpx, #808080)
  }
}
</style>