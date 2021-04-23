<template>
  <div class="formItem">
    <!-- 文本 -->
    <template v-if="headInit.params.genre === 'text'">
      {{  formData[headInit.code] }}
    </template>
    <!-- input -->
    <template v-if="headInit.params.genre === 'input'">
      <input class='input'
        v-model='formData[headInit.code]'
        :maxlength='headInit.params.max || 20'
        :type='headInit.params.type' 
        :placeholder='headInit.params.ph' 
        placeholder-class='placeH' 
      >
    </template>

    <!-- select -->
    <template v-if="headInit.params.genre === 'select'">
      <picker  range-key='label' :value="formData[headInit.code]" @change="change($event, 'select', headInit.code)" :range="headInit.params.list">
        <view class="select" v-if='formData[headInit.code]'>{{headInit.params.list[formData[headInit.code]].label}}</view>
        <view v-else style='color:#808080'>请选择</view>
      </picker>
    </template>

    <!-- checkbox -->
    <template v-if="headInit.params.genre === 'checkbox'">
      <checkbox-group @change='change($event, "checkout", headInit.code)' v-model='formData[headInit.code]'>
        <checkbox :value="headInit.code" :checked="formData[headInit.code]" />
      </checkbox-group>
    </template>

    <!-- custom -->
    <template v-if="headInit.params.genre === 'custom'">
      <div class="custom">
        <slot name='custom'></slot>
      </div>
    </template>

    <!-- custom -->
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
import combox  from './combox';
export default {
  name:'formItem',
  components: { combox },
  data () {
    return {
      formData: {
        info: '0',
        name: '小明',
        city:'这里'
      }
    }
  },
  props: {
    info: { type: Object, default: ()=> ({}) },
    headInit: { type: Object, default: ()=> ({}) }
  },
  methods: {
    comboxFn() {},
    change(e, type, code){
      const { value } = e.target
      switch (type) {
        case 'checkout':
          this.formData[code] = !!value.length;
          break;
        case 'input':
        case 'select':
          this.formData[code] = value;
          break;
        default:
          break;
      }
      this.$emit('change', this.datas)
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
  .custom, .select{
    @include fontMixin(26rpx, #808080)
  }
}
</style>