<template>
  <div class="info_head" :style='styles'>
    <div class="left">
      <div class="user_head" :style="headStyles">
        <img :src="headImg" alt="" v-if="!isUser">
        <open-data type="userAvatarUrl" v-else></open-data>
      </div>
      <slot name='center'>
        <div class="title" :style='styles'> 
          <template v-if="!isUser">
            {{infoData.nikeName || ''}}
          </template>
          <open-data type="userNickName" v-else></open-data>
        </div>
        <div :class='["gender", infoData.sex ==2 ? "nv" : "" ]' :style='styles' v-if="showSex">
          <i :class="['iconfont', 'icon_item', icon  ]"></i>
        </div>
      </slot>
    </div>

    <div class="right">
      <slot name='right'></slot>
    </div>
  </div>
</template>

<script>
export default {
  name:'info_head',
  props: {
    infoData: {
      type: Object,
      default: ()=>({})
    },
    headStyles: {
      type: String,
      default: 'width: 100rpx;height: 100rpx'
    },
    styles: {
      type: String,
      default: ''
    },
    showGender: {
      type: Boolean,
      default: true
    },
    isUser:{
      type: Boolean,
      default: false
    }
  },
  computed: {
    showSex(){
      const { sex } = this.infoData
      return sex && sex != 3 && this.showGender
    },
    icon() {
      const {infoData} = this;
      const arr = ['iconxingbie-nan', 'iconxingbie-nv', '']
      return arr[infoData.sex-1]
    },
    headImg () {
      let url = 'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132'
      if (/(http|https)/.test(this.infoData.avatar)) {
        url = this.infoData.avatar || ''
      }
      return url
    }
  },
}
</script>

<style lang="scss" scoped>
@import url("/static/fonts/iconfont.css");
@mixin font_1{
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: bold;
  color: #131415;
  line-height: 25px;
}
.info_head{
  display: flex;
  justify-content: space-between;
    align-items: center;
  .left{
    display: flex;
    align-items: center;
  }
  div{
    margin-right: 20rpx;
  }
  .user_head{
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
    overflow: hidden;
    @include img_fill;
  }
  .title{
    max-width: 200rpx;
    @include font_1;
    @include ellipsis;
  }
  .gender{
    .icon_item{
      border-radius: 50%;
      background: rgba(154, 174, 228, .6);
      padding: 8rpx;
      color: #ffffff;
      font-size: 28rpx;
    }
  }
  .nv{
    transform: rotate(45deg);
    .icon_item{
      background: rgba(255, 133, 171, .6);
    }
  }
}
</style>