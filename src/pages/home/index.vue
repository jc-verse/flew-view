<template>
  <page-sj>
    <div class="home_box">
      <header class="header">
        <info-head :iconFilter='iconFilter' headStyles='width: 80rpx;height: 80rpx;'>
          <div slot='center' class="name">{{'我是你的用户名称'}}</div>
          <i slot='right' @click="clickIcon" class='iconfont iconarrow_right icon_item'></i>
        </info-head>
      </header>
      <scroll-box>
        <div class="content">
          <div class="top_box">
            <!-- 1 -->
            <div class="top_1" @click="clickCard(1)">
              <div class="top" >
                <div class="title_msg">
                  <div class="title">{{'竞赛组队'}}</div>
                  <div class="msg">{{'寻找志同道合的朋友'}}</div>
                </div>
              </div>
              <div class="top_bg" >
                <img src="@/static/img1/bg_1.png" alt="">
              </div>
            </div>
          </div>
          <div class="bottom_box">
            <div class="left">
              <!-- 2 -->
              <div class="left_t" @click="clickCard(2)">
                <div class="title_msg">
                  <div class="title">{{'学校信息咨询'}}</div>
                  <div class="msg">{{'在校学生一对一答疑'}}</div>
                </div>
                <div class="left_t_bg">
                  <img src="@/static/img1/bg_2.png" alt="">
                </div>
              </div>
              <!-- 4 -->
              <div class="left_b" @click="clickCard(4)">
                <div class="title_msg">
                  <div class="title">{{'关于我们'}}</div>
                  <div class="msg">{{'来看看我们能给你的帮助'}}</div>
                </div>
                <div class="left_b_bg">
                  <img src="@/static/img1/bg_4.png" alt="">
                </div>
              </div>
            </div>
            <div class="right">
              <!-- 3 -->
              <div class="right_t" @click="clickCard(3)">
                <div class="title_msg">
                  <div class="title">{{'学术帮助'}}</div>
                  <div class="msg">{{'学霸的学习方法与解题思路'}}</div>
                </div>
                <div class="right_t_bg">
                  <img src="@/static/img1/bg_3.png" alt="">
                </div>
              </div>
              <!-- 5 -->
              <div class="right_b" @click="clickCard(5)">
                <div class="title_msg">
                  <div class="title">{{'加入我们'}}</div>
                  <div class="msg">{{'欢迎加入我们的团队'}}</div>
                </div>
                <div class="right_b_bg">
                  <img src="@/static/img1/bg_5.png" alt="">
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 底部logo -->
        <bottom-logo/>
      </scroll-box>

    </div>
  </page-sj>
</template>

<script>
import infoHead from '@/components/infoHead';
import bottomLogo from "@/components/bottomLogo";
import scrollBox from '@/components/scrollBox';
import pageSj from '@/components/pageSj';

export default {
  name: 'home',
  components: { infoHead, bottomLogo, scrollBox, pageSj },
  data () {
    return {
      genders: {
        'nan':{ icon:'iconxingbie-nan', id: '1', name:'某某男', value: '' },
        'nv': { icon:'iconxingbie-nv', id: '2', name:'某某女' , value: 'nv'}
      },
      isH5: false
    }
  },
  onLoad() {
    // #ifdef H5
      this.isH5 = true
    // #endif
  },
  computed : {
    iconFilter () {
      return this.genders[this.info || 'nv']
    },
  },
  methods: {
    clickIcon() {
      uni.navigateTo({ url: '/pages/mine/index' })
    },
    
    clickCard(val) {
      console.log(val)
      switch (val) {
        case 1:
          uni.navigateTo({ url: '/pages/competition/index' })
          break;
        case 2:
          uni.navigateTo({ url: '/pages/consult/index' })
          break;
        case 3:
          uni.navigateTo({ url: '/pages/acaHelp/index' })
          break;
        case 4:
          uni.navigateTo({ url: '/pages/aboutUs/index' })
          break;
        case 5:
          uni.navigateTo({ url: '/pages/joinUs/index' })
          break;
        default:
          break;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin abs_lb{
  position: absolute;
  bottom: 0;
  left: 0;
}
@mixin abs_rb{
  position: absolute;
  bottom: 0;
  right: 0;
}
@mixin flex_c_bet{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
@mixin tm($c1:#D1605D, $c2:#BF5C61) {
  padding: 20rpx;
  box-sizing:border-box;
  .title_msg{
    .title{
      @include fontMixin(32rpx, $c1, bold);
      margin-bottom: 6rpx;
    }
    .msg {
      @include fontMixin(24rpx, $c2)
    }
  }
}
.home_box {
  display: flex;
  align-items: center;
  flex-direction: column ;
  .header{
    width: 100%;
    padding: 0 0rpx 10rpx 30rpx;
    flex-grow: 0;
    flex-shrink: 0;
    box-sizing: border-box;
    .name{
      @include fontMixin(26rpx, #485B89, 500)
    }
  }
  .icon_item{
    // display: inline-block;
    // transform: rotate(-90deg);
    font-size: 40rpx;
  }
  .dS{
    width: 100%;
  }
  .content{
    width: 100%;
    padding: 0 30rpx;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    .top_box{
      width: 100%;
      height: calc((100vw - 36rpx)*9/16);
      flex-shrink: 0;
      .top_1{
        padding-top: 24rpx;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        position: relative;
        .top{
          width: 100%;
          height: 100%;
          background: #8C97FF;
          border-radius: 12px;
          padding: 15% 0 0 20rpx;
          box-sizing: border-box;
          // @include img_bg('@/static/img1/bg_6.png');
          .title_msg{
            .title{
              @include fontMixin(36rpx, #ffffff);
              margin-bottom: 10rpx;
            }
            .msg {
              @include fontMixin(28rpx, rgba(255,255, 255 , .5))
            }
          }
        }
        .top_bg{
          position: absolute;
          bottom: 0;
          right: -10rpx;
          width: 566rpx;
          height: 400rpx;
          @include img_fill
        }
      }
    }
    .bottom_box{
      margin-top:20rpx;
      width: 100%;
      display: flex;
      justify-content: space-between;
      .left{
        height: 100%;
        flex-grow: 1;
        margin-right: 10rpx;
        @include flex_c_bet;
        .left_t{
          height: 440rpx;
          width: 100%;
          background: rgba(255, 219, 228, .6);
          border-radius: 12px;
          margin-bottom: 20rpx;
          position: relative;
          @include tm($c1:#D1605D, $c2:rgba(191 ,92 ,97, .5));
          .left_t_bg{
            width: 100%;
            height:100%;
            @include abs_lb;
            @include img_fill;
          }
        }
        .left_b{
          height:260rpx;
          width: 100%;
          background: rgba(252 ,236 ,224, .6);
          border-radius: 12px;
          position: relative;
          @include tm($c1:#97493A, $c2:rgba(151 ,73, 58, .5));
          .left_b_bg{
            height: 100%;
            width: 100%;
            @include abs_lb;
            @include img_fill;
          }
        }
      }
      .right{
        margin-left: 10rpx;
        height: 100%;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .right_t{
          height: 242rpx;
          width: 100%;
          background: rgba(252, 223, 214, .6);
          border-radius: 12px;
          margin-bottom: 20rpx;
          position: relative;
          @include tm($c1:#D1605D, $c2:rgba(191, 92, 97, .5));
          .right_t_bg{
            width: 100%;
            height:100%;
            @include abs_rb;
            @include img_fill;
          }
        }
        .right_b{
          height: 458rpx;
          width: 100%;
          background: rgba(208, 207, 240, .6);
          border-radius: 12px;
          position: relative;
          @include tm($c1:#604C8A, $c2:rgba(96, 76, 138, .5));
          .right_b_bg{
            width: 100%;
            height:100%;
            @include abs_rb;
            @include img_fill;
          }
        }
      }
    }
  }
}
</style>