<template>
  <div class="information">
    <div class="top_item" v-for="(item, ind) in topList" :key="ind" :style='{width: item.width || ""}'>
      <div v-if="item.code !=='rate' ">{{`${item.title}：${item.val}`}}</div>

      <div class="rate" v-else>{{`${item.title}：`}}<rate :size="18" :value="5" :max="5"></rate>
      </div>
    </div>
  </div>
  
</template>

<script>
// import {uniRate} from '@dcloudio/uni-ui'
import rate from '@/components/cards/rate';
import uniRate from '@dcloudio/uni-ui/lib/uni-rate/uni-rate.vue'
export default {
  name: 'information',
  components: { rate },
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
  >.top_item:first-child{
    width: 100%;
  }
  .top_item{
    min-width: 50%;
    flex-grow: 1;
    margin-bottom: 20rpx;
  }
  .rate{
    display: flex;
    align-items: center;
  }
}
</style>