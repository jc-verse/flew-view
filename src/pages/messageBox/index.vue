<template>
  <PageJS  :styles="{background:'#F1F3F5'}">
    <div class="msg_center_wrap">
      <div class="sigle_msg_item" v-for="(item, idx) in msgList" :key="idx">
        <div class="time">{{item.time}}</div>
        <MessageItem :msg="subItem" v-for="(subItem, subIdx) in item.list" :key="subIdx" />
      </div>
    </div>
    <FabGroup/>
  </PageJS>
</template>
<script>
import PageJS from '../../components/pageSjNew.vue';
import MessageItem from './messageItem.vue'

import FabGroup from '@/components/fabGroup';
export default {
  name: 'message-center',
  components: { PageJS, MessageItem, FabGroup },
  data() {
    return {
      msgList: [
        { time: '15:00', list: [
          { title: '【被申请】', content: 'xxxx通过输入群申请跟您学习请尽快尽快跟哦～' },
          { title: '【被申请】', content: 'xxxx通过输入群申请跟您学习请尽快尽快跟哦～' },
          { title: '【被申请】', content: 'xxxx通过输入群申请跟您学习请尽快尽快跟哦～' },
          { title: '【被申请】', content: 'xxxx通过输入群申请跟您学习请尽快尽快跟哦～' }
        ] },
        {
          time: '14:39',
          list: [
            { title: '【发起中反馈】', content: '您发起的活动有人报名啦，快去看看吧～' }
          ]
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.msg_center_wrap {
  background: #F1F3F5;
  padding: 20rpx 30rpx 0;
  box-sizing: border-box;

  .sigle_msg_item {
    .time {
      height: 34rpx;
      font-size: 24rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #666666;
      line-height: 34rpx;
      margin-bottom: 20rpx;
      text-align: center;
    }
  }
}
</style>
