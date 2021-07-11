<template>
  <div class="formItem">
    <!-- 文本 -->
    <template v-if="headInit.params.genre === 'text'">
      {{ formData[headInit.code] || '' }}
    </template>
    <!-- input -->
    <template v-if="headInit.params.genre === 'input'">
      <input
        class="input"
        :disabled="!!headInit.disabled"
        v-model="formData[headInit.code]"
        :maxlength="headInit.params.max || 20"
        :type="headInit.params.type"
        :placeholder="headInit.params.ph"
        placeholder-class="placeH"
        @input="change($event, 'input', headInit.code)"
      />
    </template>

    <!-- select -->
    <template v-if="headInit.params.genre === 'select'">
      <picker
        range-key="label"
        :value="formData[headInit.code]"
        :disabled="!!headInit.disabled"
        @change="change($event, 'select', headInit.code)"
        :range="headInit.params.list"
      >
        <div class="box">
          <view class="select" v-if="formData[headInit.code]">
            <slot name="select"></slot>
            {{ formData[headInit.code] | findIndex(headInit.params.list) }}
          </view>
          <view v-else style="color: #808080">请选择</view>
          <text
            v-if="showIcon || false"
            class="iconfont iconjiahao add_icon"
          ></text>
        </div>
      </picker>
    </template>

    <!-- select -->
    <template v-if="headInit.params.genre === 'date'">
      <picker
        range-key="label"
        mode="date"
        :fields="headInit.params.fields ? headInit.params.fields : 'day'"
        :disabled="!!headInit.disabled"
        :value="formData[headInit.code]"
        @change="change($event, 'date', headInit.code)"
        :range="headInit.params.list"
      >
        <view class="select" v-if="formData[headInit.code]">{{
          formData[headInit.code]
        }}</view>
        <view v-else style="color: #808080">请选择</view>
      </picker>
    </template>

    <!-- checkbox -->
    <template v-if="headInit.params.genre === 'checkbox'">
      <checkbox-group
        @change="change($event, 'checkout', headInit.code)"
        :disabled="!!headInit.disabled"
        v-model="formData[headInit.code]"
      >
        <checkbox :value="headInit.code" :checked="formData[headInit.code]" />
      </checkbox-group>
    </template>

    <!-- upload -->
    <template v-if="headInit.params.genre === 'upload'">
      <UploadImg
        @uploadImg="change($event, 'upload', headInit.code)"
        :statu="1"
      >
        <slot name="upload">
          <i
            class="iconfont icontupianshangchuan"
            style="color: #676fdf; font-size: 50rpx"
          ></i>
        </slot>
      </UploadImg>
    </template>

    <!-- custom -->
    <template v-if="headInit.params.genre === 'custom'">
      <div class="custom">
        <slot name="custom"></slot>
      </div>
    </template>

    <!-- inputSelect -->
    <template v-if="headInit.params.genre === 'inputSelect'">
      <div class="inputSelect">
        <slot name="inputSelect"></slot>
      </div>
    </template>

    <!-- combox -->
    <template v-if="headInit.params.genre === 'combox'">
      <combox
        v-model="formData[headInit.code]"
        :placeholder="headInit.params.ph"
        :candidates="headInit.params.candidates"
        @input="comboxFn"
        :style="{ width: '100%' }"
      >
      </combox>
      <!-- <uni-combox label='学校' :candidates='[1,6,2,3,4,5]' placeholder='123' v-model="formData[headInit.code]"></uni-combox> -->
    </template>
  </div>
</template>

<script>
  import UploadImg from './upload';
  import combox from './combox';
  export default {
    name: 'formItem',
    components: { combox, UploadImg },
    data() {
      return {};
    },
    props: {
      headInit: { type: Object, default: () => ({}) },
      formData: { type: Object, default: () => ({}) },
      showIcon: { type: Boolean, default: false },
    },
    computed: {},
    filters: {
      findIndex(val, arr) {
        const item =
          arr.find((item) => {
            return item.id === val || item.label === val;
          }) || {};
        return item.label || '';
      },
    },
    mounted() {},
    methods: {
      comboxFn() {},
      change(e, type, code) {
        const { value } = e.target || {};
        let val = value || '';
        switch (type) {
          case 'checkout':
            val = !!value.length;
            break;
          case 'date':
          case 'input':
            val = value;
            break;
          case 'upload':
            val = e.name || '';
            break;
          case 'select':
            const { list } = this.headInit.params || {};
            const ite = list.find((item, index) => index == value) || {};
            val = code === 'grade' ? ite.label : ite.id;
            break;
          default:
            break;
        }
        this.$emit('change', { data: val, code });
      },
    },
  };
</script>

<style lang="scss" scoped>
  .formItem {
    display: flex;
    justify-content: flex-end;
    .input,
    /deep/.uni-combox__input {
      border: none;
      text-align: end;
      outline: none;
    }
    input {
      text-align: right !important;
    }
    .custom,
    .select {
      @include fontMixin(32rpx);
      font-family: UICTFontTextStyleBody;
    }
    .box {
      display: flex;
      align-items: center;
    }
    .add_icon {
      display: inline-block;
      height: 40rpx;
      width: 40rpx;
      line-height: 40rpx;
      border-radius: 50%;
      background: rgba(103, 111, 223, 0.2);
      margin-right: 10rpx;
      margin-left: 10rpx;
      color: #676fdf;
      @include fontMixin(22rpx, #676fdf);
      @include flex_center;
    }
  }
</style>
