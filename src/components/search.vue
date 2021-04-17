<template>
  <div class="search_box">
    <div class="search">
      <i class="iconfont iconsearch icon_search" @click="clickFn"></i>
      <input 
        class="input" 
        v-model="value" 
        @input="changeFn" 
        placeholder-style='color: #999999; font-weight: 500;' 
        placeholder="请输入关键字搜索" type="text"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'search',
  props:{
    propertys:{ // 为实现动态添加属性【小程序】， 后面有时间再研究  
      type:Object,
      default: ()=>{}
    }
  },
  data() {  
    return {
      value: ''
    }
  },
  methods: {
    changeFn () {
      this.$emit('change', this.value)
    },
    clickFn () {
      this.$emit('click', this.value)
    }
  }
}
</script>
<style lang="scss" scoped>
@import url("/static/fonts/iconfont.css");
@mixin font_1{
  width: 345px;
  height: 33px;
  background: #F0F1F2;
  border-radius: 17px;
}

$color:#B3B3B4;
.search_box{
  background: white;
  padding: 16rpx 30rpx;
  // width: 95%;
  display: flex;
  .search{
    display: flex;
    align-items: center;
    width: 100%;
    height: 66rpx;
    background: #F0F1F2;
    border-radius: 34rpx;
    padding: 0 30rpx;
  }
  .icon_search{
    position: relative;
    margin-right: 20rpx;
    color: $color;
    flex-grow: 0;
  }
  .input{
    flex-grow: 1;
  }
}
</style>