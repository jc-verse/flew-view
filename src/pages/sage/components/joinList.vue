<template>
  <div class="join_list">
    <div class="headline">{{ title }}</div>

    <div class="cList" v-if="type === 'text'">
      <div class="c_item" v-for="(ite,ind) in list" :key='ind'>{{ite || ''}}</div>
    </div>

    <div class="tag_list" v-if="type === 'tag'">
      <div :class="['tag_item', ind % 2 ?'tag_item_tow': '']" v-for="(ite,ind) in list" :key='ind'>{{ite || ''}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'join_list',
  props: {
    title: { type: String, default: '标题' },
    list: { type: Array, default: () => [] },
    type: { type: String, default: 'text' } // text/tag
  }
}
</script>

<style lang="scss" scoped>
.join_list{
  .headline{
    @include fontMixin(36rpx, #131415 ,bold);
    padding: 20rpx 0;
    font-size: 30rpx;
  }
  .cList{
    div{
      @include fontMixin(30rpx, #b0a8a8 ,400);
    }
  }
  .tag_list{
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    .tag_item{
      padding: 10rpx 24rpx;
      background: rgba(255 ,215 ,131, .2);
      border-radius: 15px;
      margin-bottom: 10rpx;
      margin-right: 20rpx;
      @include fontMixin(28rpx, #E59024 ,400);
    }
    .tag_item_tow{
      background: rgba(92 ,134 ,242, .2);
      color: #5C86F2;
    }
  }
}
</style>