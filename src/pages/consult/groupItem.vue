<template>
  <div class="group_info_item" @click.stop="clickItem">
    <infoHead :infoData="infoData">
      <template slot="right">
        <div class="btn_box">
          <div v-if="infoData.isConsulting == 2" @click.stop="clickBuoy(1)"
            >申请服务</div
          >
          <div v-if="infoData.isConsulting == 1" class="disable">{{
            '申请中'
          }}</div>
          <div v-if="infoData.isConsulting == 3" class="disable">{{
            '进行中'
          }}</div>
          <div class="orange" @click.stop="clickBuoy(2)">查看评价</div>
        </div>
      </template>
    </infoHead>
    <div class="content">
      <!-- 个人信息 -->
      <information :topList="tops" />
      <!-- 经历 -->
      <div class="center">
        <join-list title="课程体系" :list="bList" />
        <join-list
          title="个人留言"
          :value="infoData.personalMessage || '暂无留言'"
          type="text"
        />
      </div>
    </div>
    <TipPopup
      title="提示"
      ref="toUserInfo"
      msg="需要填写个人信息？"
      @confirm="toUserInfo(true)"
      @close="toUserInfo(false)"
    />

    <!-- <div class="buoy" v-if="userId != infoData.id"  @click.stop="clickBuoy(1)"> 申请服务 </div> -->
    <TipPopup
      title="申请服务"
      ref="tipPopup"
      msg="是否确认申请服务？"
      @confirm="confirm"
    />
    <TipPopup
      title="操作提示"
      ref="noLogin"
      msg="是否登录后执行操作？"
      @confirm="toLogin"
    />
    <DiyRate
      ref="diyRate"
      :rateData="rateForm"
      :readonly="true"
      :headList="headList"
    ></DiyRate>
  </div>
</template>

<script>
  import joinList from '@/components/cards/joinList';
  import infoHead from '@/components/cards/infoHead';
  import information from '@/components/cards/information';
  import TipPopup from '@/components/cards/tipPopup';
  import { bsToStrFun } from '@/common/utils';
  import { academicGetEvaluate } from '@/common/api';
  import DiyRate from '@/components/diyRate';
  import { isLogin, toLogin } from '@/common/utils';

  const headList = [
    { title: '讲解清晰', value: '', code: 'dimension1' },
    { title: '情况熟悉', value: '', code: 'dimension2' },
    { title: '态度友好', value: '', code: 'dimension3' },
    { title: '认真仔细', value: '', code: 'dimension4' },
  ];

  export default {
    name: 'group_item',
    components: {
      infoHead,
      information,
      joinList,
      TipPopup,
      DiyRate,
    },
    props: {
      infoData: {
        type: Object,
        default: () => ({}),
      },
      totalList: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {
        type: 1,
        rateForm: {},
        toUserInfoUrl: '',
        loading: false,
        headList,
      };
    },
    computed: {
      tops() {
        const { infoData } = this;
        const arr = [
          { title: '学校', val: infoData.schoolName || '', id: 1 },
          { title: '年级', val: infoData.grade || '', id: 2 },
          { title: '课程', val: infoData.curriculumSystem || '', id: 4 },
          { title: '标化', val: infoData.standardizedPerformance || '', id: 3 },
          { title: '专业', val: infoData.professionalDirection || '', id: 4 },
          { title: '成绩', val: infoData.schoolRecord || '', id: 3 },
          {
            title: '评价',
            val: infoData.star || 0,
            id: 5,
            code: 'rate',
            readonly: true,
          },
        ];
        return arr;
      },
      bList() {
        const { curriculumSystemList } = this.infoData;
        const arr = bsToStrFun(curriculumSystemList);
        return arr;
      },
    },
    methods: {
      toLogin,
      // 点击服务申请！

      // 节流
      throttle(flag) {
        if (flag) {
          this.loading = true;
          uni.showLoading();
        } else {
          this.loading = false;
          uni.hideLoading();
        }
      },
      academicGetEvaluate(serviceUserId) {
        if (this.loading) return;
        this.throttle(true);
        academicGetEvaluate({ serviceUserId, moduleType: 3 })
          .then((res) => {
            const { data: nData } = res[1];
            const { code, data, success } = nData || {};
            this.throttle(false);
            if (code === 200 && success) {
              this.rateForm = data;
              this.$refs.diyRate.show();
            }
          })
          .catch((err) => {
            console.log(err);
            this.throttle(false);
          });
      },
      clickBuoy(type) {
        if (!isLogin()) {
          this.$refs.noLogin.show();
          return;
        }
        const toUserInfoUrl = uni.getStorageSync('toUserInfoUrl');
        this.type = type;
        switch (type) {
          case 1:
            if (toUserInfoUrl) {
              this.toUserInfoUrl = toUserInfoUrl;
              this.$refs.toUserInfo.show();
            } else {
              this.$refs.tipPopup.show();
            }
            break;
          case 2:
            this.academicGetEvaluate(this.infoData.id);
            break;
          default:
            break;
        }
      },
      // 跳转信息录入
      toUserInfo(flag) {
        if (flag) {
          uni.navigateTo({ url: this.toUserInfoUrl });
          this.toUserInfoUrl = '';
        } else {
          uni.showToast({ title: '请录入信息后, 申请服务!', icon: 'none' });
        }
      },
      // 点击确定
      confirm() {
        const { type } = this;
        this.$emit('clickBuoy', type, this.infoData);
      },
      clickItem() {
        if (!isLogin()) {
          return;
        }
        this.$emit('clickItem');
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import url('/static/fonts/iconfont.css');
  .group_info_item {
    background: #ffffff;
    border-radius: 8px;
    padding: 30rpx;
    margin-bottom: 20rpx;
    position: relative;

    .content > div:not(:last-child) {
      border-bottom: 2rpx solid #eceef6;
    }
    .team_member {
      display: flex;
      @include flex_center;
      justify-content: space-between;
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
      display: flex;
      flex-direction: row-reverse;
      margin-right: -30rpx;
      > div {
        padding: 10rpx 10rpx;
        border-radius: 30rpx;
        background: rgba(92, 134, 242, 0.2);
        @include fontMixin(24rpx, #5c86f2, 500);
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
      .orange {
        background: #fff6e8;
        color: #ef8e17;
      }
    }
  }
</style>
