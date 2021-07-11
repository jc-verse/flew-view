<template>
  <div
    :class="['w_target', types !== '1' ? '_new' : '', direction]"
    :style="{ color: getSty.color, backgroundColor: getSty.bg }"
    >{{ text }}</div
  >
</template>

<script>
  const randomColor = [
    { color: '#E59024', bg: '#FFF2DA' },
    { color: '#5C86F2', bg: '' },
  ]

  export default {
    props: {
      text: {
        type: String,
        default: 'AMEA',
      },
      idx: {
        type: [Number],
        default: null,
      },
      types: {
        type: String,
        default: '1',
      },
      direction: {
        type: String,
        default: 'l',
      },
    },
    data() {
      return {}
    },
    computed: {
      getSty() {
        if (this.types !== '1') {
          return {
            color: '#666',
            bg: '#eee',
          }
        }
        const { idx } = this
        const _l = randomColor.length
        const _n = idx % _l
        const { color, bg } = randomColor[_n]
        return { color, bg }
      },
    },
    methods: {},
  }
</script>

<style lang="scss" scoped>
  .w_target {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 60rpx;
    padding: 0 24rpx;
    font-size: 28rpx;
    border-radius: 30rpx;

    &._new {
      color: #666;
      background-color: #eee;
      height: 56rpx;
      border-radius: 28rpx;

      &.l {
        margin-right: 30rpx;
      }

      &.r {
        margin-left: 20rpx;
      }

      &._r {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
    }
  }
</style>
