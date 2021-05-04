<template>
  <div class="list">
    <div class="item" v-for="(item, index) in newList" :style='{ background: item.styles.background }' :key="index" @click='clickItem(item)'>
      <div class="title_box">
        <div class="title">{{ item.name }}</div>
        <div class="subhead">{{ item.asName }}</div>
      </div>
      <i class="item_icon">
        <img :src="item.iconU" alt="">
      </i>
    </div>
  </div>
</template>

<script>
import { imgUrl } from '@/common/http';
import { colorList } from './const'
export default {
  data() {
    return {
      // list
    }
  },
  props: {
    list: {
      type: Array,
      default: ()=> []
    }
  },
  computed:{
    newList () {
      const newArr = this.list.map((item, index)=>{
        const cIndex = colorList.findIndex(ite => ite.id === item.id);
        const obj = {
          ...colorList[cIndex],
          ...item,
          iconU: imgUrl + item.backgroundImg  // 拼接图片路径
          }
        return obj
      })
      return newArr;
    }
  },
  methods: {
    clickItem(item) {
      this.$emit('clickItem', item)
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin font_1{
  font-size: 36rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #FFFFFF;
  line-height: 50rpx;
}
@mixin font_2 {
  font-size: 24rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #FFFFFF;
  line-height: 34rpx;
}
.list{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .item{
    flex-grow: 0;
    width: 336rpx;
    height: 310rpx;
    background: #A89CF4;
    box-shadow: 0px 0px 24rpx 0px rgba(21, 19, 47, 0.05);
    border-radius: 30rpx;
    position: relative;
    box-sizing: border-box;
    padding: 30rpx 10rpx 10rpx 30rpx;
    margin-bottom: 20rpx;
    .item_icon{
      width:242rpx;
      height: 188rpx;
      position: absolute;
      right: 0;
      bottom: 0;
      @include img_fill;
    }
    .title_box{
      .title{
        @include font_1
      }
      .subhead{
        @include font_2
      }
    }
  }
</style>