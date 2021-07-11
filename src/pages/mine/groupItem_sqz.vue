<template>
  <div class="group_info_item" :style="{ background: cardStatu.bgColor || '' }">
    <div class="event_tip">我申请的</div>
    <div class="msg_title">{{ cardStatu.title || '' }}</div>
    <infoHead
      :infoData="infoData"
      headStyles="width:70rpx;height:70rpx"
      fontSize="34"
    >
      <template slot="right">
        <div class="btn_box">
          <div
            class=""
            @click="clickBuoy(1)"
            v-if="[1, 4].includes(infoData.type)"
            >取消申请</div
          >
          <div class="" v-else>待对方确认申请</div>
        </div>
      </template>
    </infoHead>

    <div class="content">
      <!-- 个人信息 -->
      <information :topList="tops" />
      <!-- 经历 -->
      <div class="center">
        <join-list
          title="比赛经历"
          :list="bList"
          v-if="cardStatu.showInfo.includes(1) && bList.length"
        />
        <join-list
          title="希望参加的比赛"
          :list="tags"
          v-if="cardStatu.showInfo.includes(3) && tags.length"
          type="tag"
        />
        <join-list
          title="个人留言"
          :value="msg || '暂无留言'"
          v-if="cardStatu.showInfo.includes(2) && msg"
          type="text"
        />
      </div>
    </div>
    <TipPopup
      title="取消申请"
      ref="tipPopup"
      msg="是否确认取消申请！"
      @confirm="confirm"
    />
    <TipPopup
      title="操作提示"
      ref="noLogin"
      msg="是否登录后执行操作？"
      @confirm="toLogin"
    />
  </div>
</template>

<script>
  import joinList from '@/components/cards/joinList';
  import infoHead from '@/components/cards/infoHead';
  import information from '@/components/cards/information';
  import TipPopup from '@/components/cards/tipPopup';
  import { styles } from './const';
  import { bsToStrFn, topListFn } from './units';
  import { isLogin, toLogin } from '@/common/utils';

  function filterSFn(val) {
    const { type, matchName, nikeName, activity = {}, subject } = val;
    let obj = { title: '', bgColor: styles[type].bg, showInfo: [] }; // 1 比赛经历  2个人留言  3 希望参加
    console.log('【119】是卡片的全部数据');
    console.log(119, val);
    if (type == 1) {
      obj.title = `竞赛组队：向${nikeName}发起${matchName}的竞赛组队`;
      obj.showInfo = [1, 3];
    } else if (type == 2) {
      obj.title = `学术帮助：向${nikeName}提出${subject}的学术帮助`;
      obj.showInfo = [1, 2];
    } else if (type == 3) {
      obj.title = `学校咨询：向${nikeName}提出学校咨询`;
      obj.showInfo = [1, 2];
    } else if (type == 4) {
      obj.title = `自主活动：申请加入${activity.name || ''}`;
    }
    return obj;
  }
  export default {
    name: 'group_item',
    components: { infoHead, information, joinList, TipPopup },
    props: {
      infoData: {
        type: Object,
        default: () => ({}),
      },
    },
    data() {
      return {
        type: 1, // 点击时按钮编码
      };
    },
    computed: {
      tops() {
        const { infoData } = this;
        const arr = topListFn(infoData);
        return arr;
      },
      bList() {
        const { competitionExperience } = this.infoData;
        const arr = bsToStrFn(competitionExperience);
        return arr;
      },
      tags() {
        const { matchList } = this.infoData || {};
        const arr = (matchList || '').split(',');
        return arr;
      },
      msg() {
        const { infoData } = this;
        let massage = '';
        if (infoData.personalMessage) {
          massage = infoData.personalMessage;
        } else {
          massage = '暂未添加个人留言';
        }
        return massage;
      },
      cardStatu() {
        return filterSFn(this.infoData);
      },
    },
    methods: {
      toLogin,
      // 点击组队申请！
      clickBuoy(type) {
        if (!isLogin()) {
          this.$refs.noLogin.show();
          return;
        }
        this.type = type; // 1: 取消申请
        this.$refs.tipPopup.show();
      },
      // 点击确认
      confirm() {
        const { infoData, type } = this;
        this.$emit('clickBtn', type, { data: infoData });
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import url('/static/fonts/iconfont.css');
  .group_info_item {
    background: #ffffff;
    border-radius: 8px;
    padding: 80rpx 30rpx 30rpx;
    margin-bottom: 20rpx;
    position: relative;

    .event_tip {
      position: absolute;
      left: 0;
      top: 0;
      padding: 10rpx 20rpx;
      background: rgba(255, 215, 131, 0.2);
      border-radius: 30rpx 0px 30rpx 0;
      @include fontMixin(28rpx, #e59024);
    }
    .msg_title {
      @include fontMixin(32rpx, #000000, bold);
      @include ellipsis;
      line-height: 44rpx;
      margin-bottom: 30rpx;
      padding-right: 30rpx;
    }
    .content > div:not(:last-child) {
      border-bottom: 2rpx solid #eceef6;
    }
    .team_member {
      display: flex;
      @include flex_center;
      @include fontMixin(30rpx, #676fdf, 400);
      .left {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      i {
        padding: 24rpx;
        color: rgba(0, 0, 0, 0.3);
      }
      .icon_active {
        transform: rotate(-90deg);
      }
    }
    .btn_box {
      // position: absolute;
      // top: 175rpx;
      // right: 0;
      display: flex;
      justify-content: revert;
      flex-direction: row-reverse;
      .buoy,
      .evaluate {
        background: #eeeeee;
        padding: 10rpx 20rpx;
        @include fontMixin(28rpx, #666666);
      }
      .buoy {
        border-radius: 30rpx 0 0 30rpx;
        @include fontMixin(28rpx, #666666);
      }
      .yes {
        background: rgba(92, 134, 242, 0.1);
        color: rgb(92, 134, 242);
      }
      .evaluate {
        border-radius: 30rpx;
        margin-right: 10rpx;
      }
    }

    .tip_msg {
      padding-top: 20rpx;
      @include fontMixin(30rpx, #676fdf);
    }
  }
  .btn_box {
    display: flex;
    flex-direction: row-reverse;
    margin-right: -30rpx;
    > div {
      padding: 10rpx 10rpx;
      border-radius: 30rpx;
      background: #eeeeee;
      @include fontMixin(26rpx, #666666);
    }
    & > div:first-child {
      border-radius: 30rpx 0 0 30rpx;
    }
    & > div:not(:first-child) {
      margin-right: 10rpx;
    }
    .disable {
      filter: grayscale(100%);
    }
    .blue {
      background: rgba(92, 134, 242, 0.1);
      color: rgb(92, 134, 242);
    }
  }
</style>
