<template>
  <PageJS  :styles="{background:'#F1F3F5'}">
    <ScrollBox @lower='lower'>
      <div class="msg_center_wrap" @click='userInfoClickRead'>
        <div class="sigle_msg_item" v-for="(item, idx) in list" :key="idx">
          <div class="time" v-if='item.showTime' >{{item.createTime | filterTime}}</div>
          <MessageItem  :info='item'/>
        </div>
        <div class="noList">
          当前无消息！
        </div>
      </div>
    </ScrollBox>
    <FabGroup/>
  </PageJS>
</template>
<script>
import PageJS from '@/components/pageSjNew.vue';
import ScrollBox from '@/components/scrollBox.vue';
import FabGroup from '@/components/fabGroup';
import MessageItem from './messageItem.vue'

import { userInfoMyMsgList, userInfoClickRead } from '@/common/api';
function isToday(date) {
  return new Date().toString().substr(0, 15) === date.toString().substr(0, 15);
}
export default {
  name: 'message-center',
  components: { PageJS, MessageItem, FabGroup, ScrollBox },
  data() {
    return {
      list: [],
      current: 1,
      size: 10,
      total: 0,
    }
  },
  computed: {
    // 收集未读消息id
    unReadList () {
      const unReads = this.list.filter(item => item.status == 1)|| []
      return unReads.map(item => item.id)
    }
  },
  onShow() {
    this.initInfo();
    this.userInfoMyMsgList()
  },
  methods: {
    initInfo () {
      this.list = [];
      this.current = 1;
    },
    // 获取消息列表
    userInfoMyMsgList () {
      const { current, size} = this;
      const params = { current , size }
      userInfoMyMsgList(params).then(res => {
        const { data: nData } = res[1];
        const { code, data } = nData;
        if (code === 200) {
          const { current, pages, records, searchCount, total } = data;
          const { list } = this;
          if (list.length < total) {
            this.list = [...list, ...records].sort((a, b)=>{
              const pTime = new Date(a.createTime).getTime();
              const nTime = new Date(b.createTime).getTime()
              return b-a
            }).map((ite,ind, arr)=>{
              // 60s 内的消息不展示时间
              const item = { ...ite, showTime: true }
              if (ind > 0) {
                const pTime = new Date(arr[ind-1].createTime).getTime();
                const nTime = new Date(item.createTime).getTime()
                if (nTime - pTime < 1000 * 60) {
                  item.showTime = false
                }
              }
              return item
            });
            this.total = total;
            this.current += 1;
          }
        }
      }).catch(err => {console.log(err)})
    },
    // 标记已读
    userInfoClickRead() {
      const { unReadList } = this;
      if (!unReadList.length) return;
      const params = {
        msgId: unReadList.join(',')
      };
      userInfoClickRead(params).then(res => {
        const { data: nData } = res[1];
        const { code, data, success } = nData;
        if (code === 200 && success) {
          this.signRead();
        }
      }).catch(err => {console.log(err)})
    },
    // 清除已读
    signRead() {
      const { unReadList, list } = this;
      this.list = list.map(item => {
        const obj = {...item}
        if (unReadList.includes(item.id)) {
          obj.status = 2;
        }
        return obj
      })
    },
    // 触底
    lower() {
      if (this.total > this.list.length) {
        this.userInfoMyMsgList();
      }
    }
  },
  filters: {
    // 当天消息只展示时间
    filterTime(val) {
      const flag = isToday(new Date(val))
      return flag? val.split(' ')[1] :val
    }
  },
}
</script>
<style lang="scss" scoped>
.msg_center_wrap {
  background: #F1F3F5;
  padding: 20rpx 30rpx 0;
  box-sizing: border-box;
  min-height: 100%;
  position: relative;
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
  .noList {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    color: #635656;
  }
}
</style>
