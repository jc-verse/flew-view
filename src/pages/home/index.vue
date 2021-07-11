<template>
  <page-sj>
    <div class="home_box">
      <header class="header" :class="[masklen ? 'masking' : '']" @click="clickIcon">
        <info-head
          headStyles="width: 80rpx;height: 80rpx;"
          :infoData="userDataNewFn"
          :isUser="true"
        >
          <i slot="right" class="iconfont iconarrow_right icon_item"></i>
        </info-head>
      </header>
      <scroll-box style="width: 100%">
        <div class="content">
          <div class="top_box">
            <!-- 1 -->
            <div
              class="top_1"
              @click="clickCard(1)"
              :class="[masklen && active !== 1 ? 'masking' : '']"
            >
              <div class="top">
                <div class="title_msg">
                  <div class="title">{{ '竞赛组队' }}</div>
                  <div class="msg">{{ '寻找志同道合的朋友' }}</div>
                </div>
              </div>
              <div class="top_bg"></div>
            </div>
          </div>
          <div class="bottom_box">
            <div class="left">
              <!-- 2 -->
              <div
                class="left_t"
                @click="clickCard(2)"
                :class="[masklen && active !== 2 ? 'masking' : '']"
              >
                <div class="title_msg">
                  <div class="title">{{ '学校信息咨询' }}</div>
                  <div class="msg">{{ '在校学生一对一答疑' }}</div>
                </div>
                <div class="left_t_bg"></div>
                <div class="sale_tip_1"></div>
              </div>
              <!-- 4 -->
              <div
                class="left_b"
                @click="clickCard(4)"
                :class="[masklen && active !== 3 ? 'masking' : '']"
              >
                <div class="title_msg">
                  <div class="title">{{ '关于我们' }}</div>
                  <div class="msg">{{ '来看看我们能给你的帮助' }}</div>
                </div>
                <div class="left_b_bg"> </div>
              </div>
            </div>
            <div class="right">
              <!-- 3 -->
              <div
                class="right_t"
                @click="clickCard(3)"
                :class="[masklen && active !== 4 ? 'masking' : '']"
              >
                <div class="title_msg">
                  <div class="title">{{ '学术帮助' }}</div>
                  <div class="msg">{{ '学霸的学习方法与解题思路' }}</div>
                </div>
                <div class="right_t_bg"></div>
                <div class="sale_tip_2"></div>
              </div>
              <!-- 5 -->
              <div
                class="right_b"
                @click="clickCard(5)"
                :class="[masklen && active !== 5 ? 'masking' : '']"
              >
                <div class="title_msg">
                  <div class="title">{{ '加入我们' }}</div>
                  <div class="msg">{{ '欢迎加入我们的团队' }}</div>
                </div>
                <div class="right_b_bg"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- 底部logo -->

        <bottom-logo />
      </scroll-box>
      <div class="mask_box" v-if="masklen" @click="clickMask">
        <div class="welcome" v-if="active > masklen" @click.stop="clickWel">欢迎来到视界！</div>
      </div>
    </div>

    <FabGroup :shows="[1, 3, 4]" @unLogin="unLogin" @QRPopup="QRPopup" @noLogin="clickIcon" />
    <TipPopup title="联系客服" ref="QRPopup" msg="是否登录后执行操作？" @confirm="toLogin">
      <template #content>
        <div class="qr_img">
          <image :src="QRImg" alt="" show-menu-by-longpress />
        </div>
        <div class="qr_tip">长按保存二维码添加客服微信</div>
        <div class="wx_code" @click="copy(copyItem.wxCode)">
          <span>点击复制客服微信</span>
        </div>
      </template>
      <template #btn> </template>
    </TipPopup>
    <TipPopup title="操作提示" ref="noLogin" msg="是否登录后执行操作？" @confirm="toLogin" />
    <TipPopup title="操作提示" ref="unLogin" msg="是否退出登录？" @confirm="toLogin" />
  </page-sj>
</template>

<script>
  import infoHead from '@/components/cards/infoHead'
  import bottomLogo from '@/components/bottomLogo'
  import scrollBox from '@/components/scrollBox'
  import pageSj from '@/components/pageSjNew'
  import TipPopup from '@/components/cards/tipPopup'

  import FabGroup from '@/components/fabGroup'
  import unitMixin from '@/common/mixins/unitMixin'
  import { isLogin, toLogin, setStorage, copy } from '@/common/utils'
  import { imgUrl } from '@/common/http'

  export default {
    name: 'home',
    components: { infoHead, bottomLogo, scrollBox, pageSj, FabGroup, TipPopup },
    mixins: [unitMixin],
    data() {
      return {
        QRImg: '',
        copyItem: {},
        statuList: [],
        active: 1,
      }
    },
    computed: {
      masklen() {
        return this.statuList.length
      },
      userDataNewFn() {
        const { userInfo, QRData } = this.$store.state
        const { copyWxData } = QRData
        if (copyWxData) {
          const [copyItem] = copyWxData
          this.QRImg = imgUrl + copyItem.qrImg
          this.copyItem = copyItem
        }
        return userInfo
      },
    },
    onLoad() {
      const { totalList } = this.$store.state
      if (!totalList.length) {
        this.totalTeamTypeList()
      }
      const count = uni.getStorageSync('count') || 0
      // 判断首次非登录-进入
      if (!count && isLogin()) {
        setStorage({ count: count + 1 })
        this.statuList = [1, 2, 3, 4, 5]
      }
    },
    mounted() {},
    methods: {
      copy,
      toLogin,
      QRPopup() {
        this.$refs.QRPopup.show()
      },
      unLogin() {
        this.$refs.unLogin.show()
      },
      // 点击 头像进入-> 我的页面
      clickIcon() {
        if (isLogin()) {
          uni.navigateTo({ url: '/pages/mine/index' }) // 我的
        } else {
          this.$refs.noLogin.show()
        }
      },
      // 点击卡片
      clickCard(val) {
        const routers = {
          1: '/pages/competition/index', // 竞赛组队
          2: '/pages/consult/index', // 学校信息咨询
          3: '/pages/acaHelp/index', // 关于我们
          4: '/pages/aboutUs/index', // 学术帮助
          5: '/pages/joinUs/index', // 加入我们
        }
        uni.navigateTo({ url: routers[val] })
      },
      // 点击蒙版  切换展示模块
      clickMask() {
        this.active += 1
      },
      // 点击按钮  关闭蒙版
      clickWel() {
        this.statuList = []
      },
    },
  }
</script>

<style lang="scss" scoped>
  @mixin abs_lb {
    position: absolute;
    bottom: 0;
    left: 0;
  }
  @mixin abs_rb {
    position: absolute;
    bottom: 0;
    right: 0;
  }
  @mixin flex_c_bet {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  @mixin tm($c1: #d1605d, $c2: #bf5c61) {
    padding: 20rpx;
    box-sizing: border-box;
    .title_msg {
      .title {
        @include fontMixin(32rpx, $c1, bold);
        margin-bottom: 6rpx;
      }
      .msg {
        @include fontMixin(24rpx, $c2);
      }
    }
  }
  .home_box {
    display: flex;
    align-items: center;
    flex-direction: column;
    z-index: 1;
    .header {
      width: 100vw;
      padding: 4rpx 20rpx 10rpx 30rpx;
      flex-grow: 0;
      flex-shrink: 0;
      box-sizing: border-box;
      // z-index: 10;
      .name {
        @include fontMixin(26rpx, #485b89, 500);
      }
    }
    .icon_item {
      // display: inline-block;
      // transform: rotate(-90deg);
      z-index: 100;
      font-size: 40rpx;
    }
    .dS {
      width: 100%;
    }
    .content {
      width: 100%;
      padding: 0 30rpx;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      .top_box {
        width: 100%;
        height: calc((100vw - 36rpx) * 9 / 16);
        flex-shrink: 0;
        .top_1 {
          padding-top: 24rpx;
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          position: relative;
          .top {
            width: 100%;
            height: 100%;
            background: #8c97ff;
            border-radius: 12px;
            padding: 15% 0 0 20rpx;
            box-sizing: border-box;
            @include img_bg('http://prod.qiniucdns.sjreach.cn/web-6.png');
            // @include img_bg('@/static/img1/bg_6.png');
            .title_msg {
              .title {
                @include fontMixin(36rpx, #ffffff);
                margin-bottom: 10rpx;
              }
              .msg {
                @include fontMixin(28rpx, rgba(255, 255, 255, 0.5));
              }
            }
          }
          .top_bg {
            position: absolute;
            bottom: 0;
            right: -10rpx;
            width: 566rpx;
            height: 400rpx;
            @include img_bg('http://prod.qiniucdns.sjreach.cn/web-1.png');
            // @include img_fill
          }
        }
      }
      .bottom_box {
        margin-top: 20rpx;
        width: 100%;
        display: flex;
        justify-content: space-between;
        .left {
          height: 100%;
          flex-grow: 1;
          margin-right: 10rpx;
          @include flex_c_bet;
          .left_t {
            height: 440rpx;
            width: 100%;
            background: rgba(255, 219, 228, 0.6);
            border-radius: 12px;
            margin-bottom: 20rpx;
            position: relative;
            @include tm($c1: #d1605d, $c2: rgba(191, 92, 97, 0.5));
            .left_t_bg {
              width: 100%;
              height: 100%;
              @include abs_lb;
              // @include img_fill;
              @include img_bg('http://prod.qiniucdns.sjreach.cn/web-2.png');
            }
            .sale_tip_1 {
              width: 112rpx;
              height: 112rpx;
              position: absolute;
              top: 0;
              right: 0;
              margin-right: -8rpx;
              margin-top: -6rpx;
              @include img_bg('http://prod.qiniucdns.sjreach.cn/sale_1.png');
            }
          }
          .left_b {
            height: 260rpx;
            width: 100%;
            background: rgba(252, 236, 224, 0.6);
            border-radius: 12px;
            position: relative;
            @include tm($c1: #97493a, $c2: rgba(151, 73, 58, 0.5));
            .left_b_bg {
              height: 100%;
              width: 100%;
              @include abs_lb;
              // @include img_fill;
              @include img_bg('http://prod.qiniucdns.sjreach.cn/web-4.png');
            }
          }
        }
        .right {
          margin-left: 10rpx;
          height: 100%;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .right_t {
            height: 242rpx;
            width: 100%;
            background: rgba(252, 223, 214, 0.6);
            border-radius: 12px;
            margin-bottom: 20rpx;
            position: relative;
            @include tm($c1: #d1605d, $c2: rgba(191, 92, 97, 0.5));
            .right_t_bg {
              width: 100%;
              height: 100%;
              @include abs_rb;
              @include img_bg('http://prod.qiniucdns.sjreach.cn/web-3.png');
              // @include img_fill;
            }
            .sale_tip_2 {
              width: 112rpx;
              height: 112rpx;
              position: absolute;
              left: 0;
              bottom: 0;
              margin-left: -8rpx;
              margin-bottom: -6rpx;
              @include img_bg('http://prod.qiniucdns.sjreach.cn/sale_2.png');
            }
          }
          .right_b {
            height: 458rpx;
            width: 100%;
            background: rgba(208, 207, 240, 0.6);
            border-radius: 12px;
            position: relative;
            @include tm($c1: #604c8a, $c2: rgba(96, 76, 138, 0.5));
            .right_b_bg {
              width: 100%;
              height: 100%;
              @include abs_rb;
              // @include img_fill;
              @include img_bg('http://prod.qiniucdns.sjreach.cn/web-5.png');
            }
          }
        }
      }
    }
  }
  .mask_box {
    z-index: 10;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    @include flex_center;
    .welcome {
      padding: 20rpx 40rpx;
      background: #5c86f2;
      color: #fff;
      border-radius: 40rpx;
    }
  }
  .masking {
    filter: blur(3px);
  }
  .qr_img {
    width: 420rpx;
    height: 420rpx;
    margin: auto;
    @include img_fill;
  }
  .qr_tip {
    padding: 20rpx;
    text-align: center;
    color: #a1a1a1;
  }
  .wx_code {
    display: flex;
    justify-content: center;
    span {
      padding: 10rpx 20rpx;
      background: #0066ff;
      color: white;
      border-radius: 20rpx;
      font-size: 12px;
      margin: 20rpx 0 0;
    }
  }
</style>
