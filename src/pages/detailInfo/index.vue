<template>
  <page-sj>
    <div class="detail_info">
      <scroll-box>
        <div class="content_box">
          <div class="top">
            <infoHead :infoData="cardInfo" :showGender="false" />
            <!-- 个人信息 -->
            <information :topList="tops" />
          </div>
          <div class="center">
            <join-list title="比赛经历" :list="bList" v-if="bList.length" />
            <join-list
              title="专业方向"
              :value="cardInfo.professionalDirection"
              v-if="cardInfo.professionalDirection"
              type="text"
            ></join-list>
            <join-list
              title="个人留言"
              :value="cardInfo.personalMessage || '暂无留言'"
              type="text"
            />
            <join-list
              title="录取大学"
              :value="cardInfo.admission"
              v-if="cardInfo.admission"
              type="text"
            />
          </div>
          <div class="foot">
            <div class="foot_left">
              <div class="l_title">学术帮助：</div>
              <div class="l_content">
                <p>一对一 218元/时（限促:<span class="maney">178</span>元)</p>
                <p>一对多 价格另计</p>
                <p>更多优惠请咨询客服</p>
                <p>或关注微信公众号:</p>
                <p>视无域I界无疆</p>
              </div>
            </div>
            <div class="foot_right">
              <div class="r_t"> 报名请长按保存客服二维码添加微信</div>
              <div class="r_c">
                <img :src="QRImg" alt="" show-menu-by-longpress />
              </div>
              <div class="wx_code" @click="copy(copyItem.wxCode)">
                <span>点击复制客服微信</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 底部logo -->
        <bottom-logo />
      </scroll-box>
      <fab-group />
    </div>
  </page-sj>
</template>

<script>
  import scrollBox from '@/components/scrollBox';
  import pageSj from '@/components/pageSjNew';
  import fabGroup from '@/components/fabGroup';
  import bottomLogo from '@/components/bottomLogo';
  import infoHead from '@/components/cards/infoHead';
  import information from '@/components/cards/information';
  import joinList from '@/components/cards/joinList';
  import { topListFn, bsToStrFn } from './units';
  import { imgUrl } from '@/common/http';
  import { copy } from '@/common/utils';
  export default {
    name: 'detail_info',
    components: {
      scrollBox,
      fabGroup,
      bottomLogo,
      infoHead,
      information,
      joinList,
      pageSj,
    },
    data() {
      return {
        show: false,
        index: 0,
        cardInfo: {},
        QRImg: '',
        copyItem: {},
      };
    },
    computed: {
      tops() {
        return topListFn(this.cardInfo);
      },
      bList() {
        const { competitionExperience } = this.cardInfo;
        const arr = bsToStrFn(competitionExperience);
        return arr;
      },
    },
    onLoad() {
      const { copyWxData } = this.$store.state.QRData;
      const [copyItem] = copyWxData;
      this.QRImg = imgUrl + copyItem.qrImg;
      this.copyItem = copyItem;
    },
    onShow() {
      const this_ = this;
      uni.getStorage({
        key: 'helpInfo',
        success: (res) => {
          const { errMsg, data } = res;
          if (/ok/.test(errMsg) && data) {
            this_.cardInfo = data;
          }
        },
      });
    },
    methods: {
      copy,
    },
  };
</script>

<style lang="scss" scoped>
  @import url('/static/fonts/iconfont.css');
  $color: #b3b3b4;
  .detail_info {
    display: flex;
    flex-direction: column;
    background: #f1f3f5;
    .content_box {
      position: relative;
      display: flex;
      flex-direction: column;
      padding: 0 20rpx;
    }
    .content_box > div {
      margin: 20rpx 0 10rpx 0;
      border-radius: 8px;
      background: #ffffff;
      width: 100%;
      padding: 30rpx;
      box-sizing: border-box;
    }
    .top {
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
  .foot {
    height: 400rpx;
    display: flex;
    .foot_left {
      flex-grow: 1;
      height: 100%;
      font-size: 26rpx;
      @include flex_(center, start, column);
      .l_title {
        font-size: 28rpx;
        font-weight: 600;
        margin-bottom: 20rpx;
      }
    }
    .foot_right {
      flex-grow: 0;
      flex-shrink: 0;
      height: 100%;
      width: 260rpx;
      font-size: 24rpx;
      @include flex_(space-between, center, column);
      text-align: center;
      .r_c {
        width: 200rpx;
        height: 200rpx;
        @include img_fill;
      }
    }
  }
  .l_content {
    .maney {
      font-size: 32rpx;
      font-weight: bold;
    }
  }
</style>
