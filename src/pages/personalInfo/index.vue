<template>
  <PageJS>
    <div class="person_info_page">
      <div class="person_info_wrap">
        <div class="user_img_bar item">
          <div class="label">头像</div>
          <img class="user_img" src="" alt="">
        </div>
        <div class="item _F" v-for="(item, idx) in userInfoInputList" :key="idx">
          <div class="label">{{item.label || ''}}</div>
          <div class="item_content"></div>
        </div>
      </div>
      <div class="person_card">
        <div class="title">我的名片卡</div>
        <div class="card_content">
          <ItemInfo />
        </div>
      </div>
    </div>
  </PageJS>
</template>
<script>
import PageJS from '../../components/pageSj.vue';
import ItemInfo from '@/pages/mine/msgItem.vue'

export default {
  name: 'personalInfo',
  components: { PageJS, ItemInfo },
  data() {
    return {
      userInfoInputList: [
        { label: '微信号' },
        { label: '昵称' },
        { label: '性别' },
        { label: '生日' },
        { label: '手机号' },
        { label: '邮箱' },
      ]
    }
  }
}
</script>
<style scoped lang="scss">
.person_info_page {
  padding: 20rpx 30rpx;
  background-color: #F1F3F5;

  .person_info_wrap {
    border-radius: 32rpx;
    padding: 0 30rpx 20rpx;
    background-color: #fff;
    margin-bottom: 36rpx;
  
    .item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 96rpx;

      &.user_img_bar {
        height: 110rpx;

        .user_img {
          width: 80rpx;
          height: 80rpx;
          border-radius: 100%;
        }
      }
      
      &._F {
        border-top: 2rpx solid rgba(0, 0, 0, .5);
      }

      .label {
        font-size: 32rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #000000;
        line-height: 44rpx;
      }
    }
  }

  .person_card {

    .title {
      height: 44rpx;
      font-size: 32rpx;
      font-family: Helvetica;
      color: #000000;
      line-height: 44rpx;
      margin-bottom: 16rpx;
    }
    
    .card_content {
      background-color: #fff;
      border-radius: 16rpx;
      overflow: hidden;

      .msg_item_wrap {
        background-color: #fff;

      }
      
      .module_content {
        margin-right: 30rpx;
      }
    }
  }
}
</style>
