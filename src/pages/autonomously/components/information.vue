<template>
  <div class="information">
    <div class="top_item" v-for="(item, ind) in topList" :key="ind">
      <div>{{`${item.title}:${item.val}`}}</div>
    </div>
  </div>
  
</template>

<script>
export default {
  name: 'information',
  props: {
    topList: {
      type: Array,
      default: ()=> []
    }
  }
}
</script>
<style lang="scss" scoped>

.information{
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  @include fontMixin(28rpx, #333333 ,400);
  margin-top:20rpx;
  .top_item{
    flex-grow: 1;
    margin-bottom: 20rpx;
  }
}
</style>