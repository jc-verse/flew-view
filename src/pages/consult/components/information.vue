<template>
  <div class="information">
    <div class="top_item" v-for="(item, ind) in topList" :key="ind">
      <div v-if="item.code !=='rate' ">{{`${item.title}:${item.val}`}}</div>

      <div class="rate" v-else>{{`${item.title}:`}}
        <!-- <uni-rate :size="18" :value="5" :max="10"></uni-rate> -->
      </div>
    </div>
  </div>
  
</template>

<script>
// import {uniRate} from '@dcloudio/uni-ui'
import UniRate from '@dcloudio/uni-ui/lib/uni-rate/uni-rate.vue'
export default {
  name: 'information',
  // components: { uniRate },
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
    min-width: 50%;
    flex-grow: 1;
    margin-bottom: 20rpx;
  }
}
</style>