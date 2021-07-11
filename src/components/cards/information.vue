<template>
  <div class="information">
    <div
      class="top_item"
      v-for="(item, ind) in tops"
      :key="ind"
      :style="{ minWidth: item.width || '' }"
    >
      <div v-if="item.code !== 'rate'">{{ `${item.title}：${item.val}` }}</div>

      <div class="rate" v-else>
        {{ `${item.title}：` }}
        <rate
          :size="18"
          :value="item.val || 0"
          :max="5"
          :readonly="item.readonly || false"
        ></rate>
      </div>
    </div>
  </div>
</template>

<script>
  // import {uniRate} from '@dcloudio/uni-ui'
  import rate from "@/components/cards/rate";
  import uniRate from "@dcloudio/uni-ui/lib/uni-rate/uni-rate.vue";
  export default {
    name: "information",
    components: { rate },
    props: {
      topList: {
        type: Array,
        default: () => [],
      },
    },
    computed: {
      tops() {
        return this.topList.filter((item) => !!item.val);
      },
    },
  };
</script>
<style lang="scss" scoped>
  .information {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    @include fontMixin(28rpx, #333333, 400);
    margin-top: 20rpx;
    .top_item {
      min-width: 50%;
      flex-grow: 1;
      margin-bottom: 20rpx;
    }
    .rate {
      display: flex;
      align-items: center;
    }
  }
</style>
