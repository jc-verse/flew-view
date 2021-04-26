<template>
  <div class="page_mine">
    <div class="header_wrap">
      <img class="bgs" src="@/static/img1/mine_bg.png" alt="">
      <div class="mine_title_wrap">
        <img @click="jumpTo" class="user_img" src="@/static/img1/icon_8.png" />
        <div class="user_info">
          <div class="user_name_level">
            <span class="name">我是用户名称</span>
            <span class="level">{{userLevel}}</span>
          </div>
          <div class="vip_num">
            <span class="text">会员号：</span>
            <span class="num">{{vipNum}}</span>
            <span class="desc">(已认证)</span>
          </div>
        </div>
        <div class="msg_icon" @click="jumpToMsg" >
          <img src="@/static/img1/msg_icon.png" alt="">
          <div class="target">1</div>
        </div>
      </div>
    </div>
    <div class="nav_wrap">
      <div class="nav_title">我的申请</div>
      <div class="nav_list">
        <div class="nav_item" v-for="(item, idx) in navList" :key="idx">
          <div @click="navClick(item)" :class="['item_content', item.id === actived ? 'actived' : '']">
            <img :src="item.icon" class="img">
            <div class="item_label">{{item.label}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="content_wrap">
      <ScrollBox>
        <!-- <MsgItem /> -->
        <GroupItem v-for="(item, idx) in 3" :key="idx" />
      </ScrollBox>
    </div>
  </div>
</template>
<script>
import PageJs from '../../components/pageSjNew.vue'
import MsgItem from './msgItem.vue'
import GroupItem from '../consult/groupItem.vue'
import ScrollBox from '@/components/scrollBox.vue'

export default {
  components: {
    PageJs,
    MsgItem,
    GroupItem,
    ScrollBox
  },
  data() {
    return {
      pageTitle: '我的页面',
      vipNum: 43434,
      userLevel: '3',
      actived: '1',
      navList: [
        { label: '进行中', id: '1', icon: require('@/static/img1/order_1.png') },
        { label: '被申请', id: '2', icon: require('@/static/img1/order_4.png') },
        { label: '发起中', id: '3', icon: require('@/static/img1/order_2.png') },
        { label: '申请记录', id: '4', icon: require('@/static/img1/order_3.png') },
      ]
    }
  },
  methods: {
    navClick(item) {
      const { id } = item;
      if (!id) return
      this.actived = id
    },
    jumpTo() {
      uni.navigateTo({ url: '/pages/personalInfo/index' })
    },
    jumpToMsg() {
      uni.navigateTo({ url: '/pages/messageBox/index' })
    },
    goToBack() {
      uni.navigateBack({ delta: 1 })
    }
  }
}
</script>
<style lang="scss" scoped>
.page_mine {
  height: 100vh;
  box-sizing: border-box;
  background: #F1F3F5;
  padding: 0 30rpx;
  overflow: hidden;
  

  .header_wrap {
    position: relative;
    z-index: 5;
    margin: 0 -30rpx;
    padding: 0 30rpx;

    .bgs {
      height: 100%;
      width: 100%;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: -1;
    }
  }

  .mine_title_wrap {
    padding-top: 48rpx;
    height: 268rpx;
    display: flex;

    .user_img {
      width: 120rpx;
      height: 120rpx;
      margin-right: 20rpx;
      border-radius: 100%;
    }

    .user_info {
      margin-top: 10rpx;
      flex: 1;

      .user_name_level {
        height: 50rpx;
        font-weight: 500;
        font-size: 36rpx;
        color: #fff;
        margin-bottom: 12rpx;

        .name {
          margin-right: 24rpx;
          font-family: PingFangSC-Medium;
        }
      }

      .vip_num {
        font-size: 28rpx;
        line-height: 40rpx;
        color: #fff;
      }
    }

    .msg_icon {
      width: 44rpx;
      height: 44rpx;
      margin-top: 16rpx;
      position: relative;

      img {
        width: 100%;
        height: 100%;
      }

      .target {
        background: #E65A57;
        height: 32rpx;
        min-width: 32rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        font-size: 24rpx;
        font-weight: 400;
        color: #fff;
        border-radius: 16rpx;
        left: 19px;
        top: -4px;
      }
    }
  }

  .nav_wrap {
    height: 260rpx;
    padding: 30rpx 18rpx 0;
    background: #FFFFFF;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    margin-bottom: 20rpx;
    margin-top: -30rpx;
    position: relative;
    z-index: 10;

    .nav_title {
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #333333;
      line-height: 22px;
      height: 22px;
      margin-bottom: 24rpx;
    }

    .nav_list {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .nav_item {
        width: 162rpx;
        height: 100%;
        display: flex;
        justify-content: center;

        .item_content {
          width: 130rpx;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 16rpx;

          .img {
            width: 56rpx;
            height: 56rpx;
            margin-bottom: 16rpx;
          }

          .item_label {
            font-size: 12px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #333333;
            line-height: 17px;
          }

          &.actived {
            background: #F1F3F5;
            border-radius: 8px 8px 0px 0px;
            position: relative;

            &::before {
              display: block;
              content: '';
              position: absolute;
              border-top: transparent 20rpx solid;
              border-right: transparent 32rpx solid;
              border-left: transparent 32rpx solid;
              border-bottom: #fff 20rpx solid;
              left: 50%;
              bottom: -20rpx;
              transform: translateX(-50%);
            }
          }
        }
      }
    }
  }

  .content_wrap {
    background: #FFFFFF;
    border-radius: 16rpx;
    padding: 40rpx 30rpx;

    /deep/ .group_info_item {
      margin-bottom: 20rpx;
      background: #FFF7E8;
    }
  }
}
</style>
