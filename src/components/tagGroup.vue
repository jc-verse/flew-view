<template>
  <div class="tag_group">
    <div class="tag_list">
      <div class="tag_item_box" v-for="(item, ind) in tagList" :key='ind'>
        <div class="tag_item" @click="clickItem(item, ind)">
          <span>{{item.label || ''}}</span>
          <i class='iconfont iconsearch icon_item' :class="[index === ind ? 'icon_active': '']"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'tagGroup',
  props: {
    list: {
      type: Array,
      default:() => []
    }
  },  
  data () {
    return {
      index: 0,
      tagList: [
        { label: '省份', id: 1 },
        { label: '学校', id: 2 },
        { label: '省份2', id: 3 },
        { label: '省份3', id: 4 },
        { label: '省份41111', id: 5 },
        { label: '省份5', id: 6 },
        { label: '省份6', id: 7 },
        { label: '省份7', id: 8 },
      ]
    }
  },
  methods:{
    clickItem(item, index) {
      this.index = index;
      this.$emit('clickItme', item)
    }
  },
}
</script> 

<style lang="scss" scoped>
@import url("/static/fonts/iconfont.css");
@mixin font_1 {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
}
.tag_group::-webkit-scrollbar{
  display: none;
}
.tag_group{
  background: #ffffff;
  box-sizing: border-box;
  overflow: scroll;
  padding: 24rpx 10rpx;
  .tag_list{
    display: flex;
    box-sizing: border-box;
    .tag_item_box{
      padding: 0 10rpx;
      .tag_item{
        padding: 8rpx 36rpx;
        flex-shrink: 0;
        background: #ECECEC;
        border-radius: 4px;
        opacity: 0.56;
        white-space: nowrap;
        @include flex_center;
        @include font_1;
        .icon_item {
          margin-left: 10rpx;
          font-size: 24rpx;
        }
        .icon_active{
          transform: rotate(-45deg);
        }
      }
    }
    
  }
}
</style>