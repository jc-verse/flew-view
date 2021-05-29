<template>
  <div class="info_head" :style='styles'>
    <div class="left">
      <div class="user_head" :class="[isUser? 'shadow': '']" :style="headStyles">
        <img :src="headImg" alt="" v-if="headImg">
        <!-- <open-data type="userAvatarUrl" v-else></open-data> -->
      </div>
      <slot name='center'>
        <div class="title" :class="[isUser? 'isHome': '']" :style='{"max-width": `${maxWidth}rpx`}'> 
          <!-- <template v-if="!isUser"> -->
            {{infoData.nikeName || ''}}
          <!-- </template>
          <open-data type="userNickName" v-else></open-data> -->
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
import {imgUrl} from '@/common/http'
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
    },
    maxWidth: {
      type: Number,
      default: 200
    }
  },
  computed: {
    showSex(){
      console.log(9999,this.infoData)
      const { sex } = this.infoData || 3
      return sex && sex != 3 && this.showGender
    },
    icon() {
      const {infoData} = this;
      const arr = ['iconxingbie-nan', 'iconxingbie-nv', '']
      console.log(1213, infoData.sex)
      return arr[infoData.sex-1]
    },
    headImg () {
      const { avatar } = this.infoData;
      let url = 'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132'
      if (/(http|https)/.test(avatar)) {
        url = avatar;
      } else if (avatar && avatar !== 'default_img.png') {
        url = imgUrl + avatar
      }
      console.log(123123, url)
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
  & div:not(:last-child){
    margin-right: 10rpx;
  }
  .user_head{
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
    overflow: hidden;
    background: white;

    @include img_fill;
  }
  .title{
    max-width: 200rpx;
    @include ellipsis;
    @include font_1
  }
  .isHome{
    @include fontMixin(13px, #485B89, bold)
  }
  .shadow{
    box-shadow: 0 0 4px rgba(128 ,128 ,128 , .4);
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