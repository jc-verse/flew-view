<template>
  <div>
    <DiyPopup ref="popup" :noUp="true">
      <slot name="content_box">
        <div class="tip_box" slot="tip" @click.stop :style="{ width: `${width}rpx` }">
          <div class="title" v-if="title">{{ title }}</div>
          <slot name="content">
            <div class="msg">{{ msg }}</div>
          </slot>
          <div class="btns">
            <slot name="btn">
              <div class="no" @click.stop="close(false, type)">取消</div>
              <div class="yes" @click.stop="close(true, type)">确定</div>
            </slot>
          </div>
        </div>
      </slot>
    </DiyPopup>
  </div>
</template>

<script>
  import DiyPopup from '@/components/diyPopup'
  export default {
    name: 'tipPopup',
    // props: ['title', 'msg', 'type',],
    props: {
      title: {
        type: String,
        default: '',
      },
      msg: {
        type: String,
        default: '',
      },
      type: {
        type: String,
        default: '',
      },
      width: {
        type: Number,
        default: 500,
      },
    },

    components: { DiyPopup },
    methods: {
      close(flag) {
        if (flag) {
          const { type } = this
          this.$emit('confirm', type)
        }
        this.$refs.popup.hide()
      },
      show() {
        this.$refs.popup.show()
      },
    },
  }
</script>

<style lang="scss" scoped>
  .tip_box {
    width: 500rpx;
    // height: 300rpx;
    background: #ffffff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 20rpx;
    padding: 10rpx;
    .title {
      padding: 20rpx;
      font-weight: bold;
      width: 100%;
      text-align: center;
      // border-bottom: 1px solid #f5f5f5;
    }
    .msg {
      padding: 10rpx;
      min-height: 200rpx;
      width: 100%;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .btns {
      display: flex;
      width: 100%;
      justify-content: space-around;
      padding: 10rpx 0 20rpx;
      .yes,
      .no {
        text-align: center;
        border-radius: 50rpx;
        border: 1px solid rgba(92, 134, 242, 0.2);
        width: 150rpx;
        padding: 10rpx;
      }
      .yes {
        background: rgba(92, 134, 242, 0.2);
        color: #5c86f2;
      }
      .no {
        border-color: auto;
      }
    }
  }
</style>
