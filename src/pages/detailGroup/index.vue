<template>
  <page-sj>
    <div class="detail_info">
      <scroll-box style="width: 100%">
        <div class="content_box">
          <div class="top">
            <infoHead :infoData="infoData">
              <template slot="right">
                <div class="btn_box">
                  <div class="" v-if="infoData.isActivity == 1">申请中</div>
                  <div class="" v-if="infoData.isActivity == 3">进行中</div>

                  <!-- <div class="blue" v-if="cardStatu.showInfo.includes(8)" @click="clickBuoy(8)" >联系客服</div> -->
                </div>
              </template>
            </infoHead>
            <!-- 个人信息 -->
            <information :topList="tops" />
          </div>
          <div class="center">
            <join-list
              title="活动信息"
              :value="infoData.activityInfo || '暂无活动信息'"
              type="text"
            />
            <join-list title="组队人数" type="diy">
              <div class="tags" slot="diy">
                <div class="tag">{{
                  `${infoData.alreadyNum || 0}/${infoData.num || 0}人`
                }}</div>
              </div>
            </join-list>
            <join-list
              title="招募要求"
              :value="infoData.requirement || '暂无招募要求'"
              type="text"
            />
          </div>
          <div
            class="memeber_box"
            v-if="infoData.memberVoList && infoData.memberVoList.length"
          >
            <div class="me_title">组队成员</div>
            <member
              v-for="(item, index) in infoData.memberVoList"
              :infoData="item"
              :key="index"
            />
          </div>

          <!-- 底部logo -->
          <bottom-logo />
        </div>
      </scroll-box>
      <fab-group />
      <div class="join_btn">
        <div class="btn" :class="[!canJoin ? 'noJoin' : '']" @click="joinGroup"
          >申请加入</div
        >
      </div>
    </div>
    <TipPopup
      title="申请加入"
      ref="tipPopup"
      :msg="`是否申请加入活动！`"
      @confirm="confirm"
    />
    <TipPopup
      title="操作提示"
      ref="noLogin"
      msg="是否登录后执行操作？"
      @confirm="toLogin"
    />
  </page-sj>
</template>

<script>
  import scrollBox from "@/components/scrollBox";
  import fabGroup from "@/components/fabGroup";
  import bottomLogo from "@/components/bottomLogo";
  import infoHead from "@/components/cards/infoHead";
  import information from "@/components/cards/information";
  import joinList from "@/components/cards/joinList";
  import { isLogin, toLogin } from "@/common/utils";
  import TipPopup from "@/components/cards/tipPopup";
  import { getCurPage } from "@/common/utils";
  import { activityList, attendActivity } from "@/common/api";
  import member from "./member";
  export default {
    name: "detail_info",
    components: {
      scrollBox,
      fabGroup,
      bottomLogo,
      infoHead,
      information,
      joinList,
      member,
      TipPopup,
    },
    data() {
      return {
        show: false,
        index: 0,
        infoData: {},
        loading: false,
      };
    },
    computed: {
      tops() {
        const { infoData } = this;
        const arr = [
          { title: "学校", val: infoData.schoolName || "", id: 1 },
          { title: "年级", val: infoData.grade || "", id: 2 },
          { title: "课程", val: infoData.curriculumSystem || "", id: 4 },
          { title: "标化", val: infoData.standardizedPerformance || "", id: 3 },
        ];
        return arr;
      },
      canJoin() {
        const { isActivity } = this.infoData;
        return [2].includes(isActivity);
      },
    },
    onShow() {
      const { activityId, type } = getCurPage();
      this.getInfo(activityId, type);
    },
    methods: {
      toLogin,
      // 获取详情
      getInfo(activityId, type) {
        const params = {
          activityId,
          type: type || "",
          current: 1,
          size: 10,
        };
        activityList(params).then((res) => {
          const { data: nData } = res[1];
          const { data, code } = nData;
          if (code === 200) {
            const { records } = data;
            this.infoData = records[0] || {};
            if (this.infoData.activityName) {
              uni.setNavigationBarTitle({ title: this.infoData.activityName });
            }
          }
        });
      },
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
      joinGroup() {
        if (!this.canJoin) {
          return;
        }
        if (!isLogin()) {
          this.$refs.noLogin.show();
          return;
        }
        this.$refs.tipPopup.show();
      },
      confirm() {
        this.attendActivity();
      },
      attendActivity() {
        if (this.loading) return;
        this.throttle(true);
        const { activityId } = this.infoData;
        attendActivity({ activityId })
          .then((res) => {
            const { data: nData } = res[1];
            const { data, code, msg } = nData;
            this.throttle(false);
            if (code === 200) {
              const { records } = data;
              this.infoData = records[0] || {};
              uni.showToast({ title: msg });
            } else {
              uni.showToast({ title: msg, icon: "none" });
            }
          })
          .catch((err) => {
            console.log(err);
            this.throttle(false);
            uni.showToast({ title: err });
          });
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import url("/static/fonts/iconfont.css");
  $color: #b3b3b4;
  .detail_info {
    display: flex;
    flex-direction: column;
    background: #f1f3f5;
    .content_box {
      position: relative;
      display: flex;
      flex-direction: column;
      padding: 0 20rpx 120rpx;
      > .top,
      > .center {
        margin: 20rpx 0 10rpx 0;
        border-radius: 8px;
        background: #ffffff;
        width: 100%;
        padding: 30rpx;
        box-sizing: border-box;
      }
    }
    .center {
      .tags {
        display: flex;
        flex-wrap: wrap;
        .tag {
          @include fontMixin(28rpx, #b0a8a8);
          margin-right: 20rpx;
        }
      }
    }
    .memeber_box {
      .me_title {
        font-size: 32rpx;
        font-family: Helvetica;
        color: #000000;
        line-height: 44rpx;
        padding: 20rpx 0 0 30rpx;
      }
    }
    .join_btn {
      position: fixed;
      bottom: 0;
      padding: 20rpx;
      width: 100%;
      background: #ffffff;
      box-sizing: border-box;
      .btn {
        background: #676fdf;
        padding: 20rpx 0;
        text-align: center;
        width: 100%;
        border-radius: 40rpx;
        @include fontMixin(32rpx, #ffffff);
      }
    }
    .noJoin {
      filter: grayscale(100%);
    }
    .btn_box {
      display: flex;
      flex-direction: row-reverse;
      margin-right: -20rpx;
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
  }
</style>
