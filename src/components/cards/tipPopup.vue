<template>
  <div>
    <DiyPopup ref='popup' :noUp='true'>
    <div class="tip_box" slot='tip' @click.stop>
      <div class="title" v-if="title">{{title}}</div>
      <div class="msg">{{msg}}</div>
      <div class="btns">
        <div class="no" @click.stop="close(false, type)">取消</div>
        <div class="yes" @click.stop="close(true, type)">确定</div>
      </div>
    </div>
  </DiyPopup>
</div>
</template>

<script>
import DiyPopup from '@/components/diyPopup';
export default {
  name: 'tipPopup',
  props: ['title', 'msg', 'type'],
  components: {DiyPopup},
  methods: {
    close (flag) {
      if (flag) {
        const { type } = this
        this.$emit('confirm', type)
      }
      this.$refs.popup.hide()
    },
    show () {
      this.$refs.popup.show()
    }
  }
}
</script>

<style lang='scss' scoped>
.tip_box{
  width: 500rpx;
  // height: 300rpx;
  background: #ffffff;
  position: absolute;
  top:50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 101;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20rpx;
  .title{
    padding: 20rpx;
    font-weight: bold;
    width: 100%;
    text-align: center;
    // border-bottom: 1px solid #f5f5f5;
  }
  .msg{
    padding: 10rpx;
    min-height: 80rpx;
    width: 100%;
    text-align: center;
  }
  .btns{
    display: flex;
    width: 100%;
    justify-content: space-around;
    padding: 10rpx 0 20rpx;
    .yes, .no{
      text-align: center;
      border-radius: 30rpx;
      border: 1px solid rgba(92, 134, 242, 0.2);
      width: 150rpx;
      padding: 10rpx;
    }
    .yes{
      background: rgba(92, 134, 242, 0.2);
      color: #5C86F2
    };
    .no{
      border-color: auto;
    }
  }
}
</style>