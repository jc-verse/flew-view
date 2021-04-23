<template>
  <div class="page_mine">
    <div class="mine_title_wrap">
      <div class="user_img"></div>
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
    </div>
    <div class="nav_wrap">
      <div class="nav_title">我的申请</div>
      <div class="nav_list">
        <div class="nav_item" v-for="item in navList">
          <div :class="['item_content', item.id === actived ? 'actived' : '']">
            <img src="" :alt="item.label" class="img">
            <div class="item_label">{{item.label}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="content_wrap">
      <MsgItem />
    </div>
  </div>
</template>
<script>
import MsgItem from './msgItem.vue'


export default {
  components: {
    MsgItem
  },
  data() {
    return {
      pageTitle: '我的页面',
      vipNum: 43434,
      userLevel: '3',
      actived: '1',
      navList: [
        { label: '进行中', id: '1' },
        { label: '被申请', id: '2' },
        { label: '发起中', id: '3' },
        { label: '申请记录', id: '4' },
      ]
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

  .mine_title_wrap {
    height: 230rpx;
    border: 1px solid red;
  }

  .nav_wrap {
    height: 260rpx;
    padding: 30rpx 18rpx 0;
    background: #FFFFFF;
    border-radius: 8px;
    display: flex;
    flex-direction: column;

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
          }
        }
      }
    }
  }

  .content_wrap {
    background: #FFFFFF;
    border-radius: 16rpx;
  }
}
</style>
