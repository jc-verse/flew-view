<template>
  <PageJS>
    <div class="person_info_page">
      <div class="person_info_wrap">
        <div class="user_img_bar item">
          <div class="label">头像</div>
          <img class="user_img" src="@/static/img1/msg_icon.png" alt="">
        </div>
        <div class="item _F" v-for="(item, idx) in userInfoInputList" :key="idx">
          <div class="label">{{item.label || ''}}</div>
          <div class="item_content" >
            <input v-if="item.type === 'input'" @keypress.stop="saveItemData(item)" type="text" v-model="item.text" />
            <span class="text" v-else>
              <picker v-if="item.id === 'sex'" @change="(e) => sexChange(e, item)" :value="item.text" :range="sexList">
                {{sexList[item.text]}}
              </picker>
              <picker v-if="item.id === 'birthday'" mode="date" :value="item.text" @change="(e) => bindDateChange(e, item)">
                {{item.text}}
              </picker>
            </span>
          </div>
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
      sexList: ['女', '男'],
      userInfoInputList: [
        { label: '微信号', id: 'weChat', type: 'input', status: '1', text: '请填写微信号' },
        { label: '昵称', id: 'nick', type: 'input', status: '1', text: '我是用户名称' },
        { label: '性别', id: 'sex', type: 'select', status: '1', text: 1 },
        { label: '生日', id: 'birthday', type: 'select', status: '1', text: '请填写生日' },
        { label: '手机号', id: 'phoneNum', type: 'input', status: '1', text: '请填写手机号' },
        { label: '邮箱', id: 'eMail', type: 'input', status: '1', text: '请填写邮箱' },
      ]
    }
  },
  methods: {
    editClick(item) {
      const { id } = item
      console.log('---item: ', item, id)
    },
    saveItemData(item) {
      const { text } = item
      console.log('------回车保存', text)
    },
    sexChange(val, item) {
      const { detail: { value } } = val
      item.text = value
    },
    bindDateChange(val, item) {
      const { detail: { value } } = val
      item.text = value
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
    
      .item_content {
        color: #888;

        input {
          text-align: right;
        }

        .text {
          display: inline-block;
          min-width: 60rpx;
        }
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
