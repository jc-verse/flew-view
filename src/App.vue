<script>
  // import { joinUrl } from '@/common/utils'
  export default {
    globalData: {
      // totalList: [],// 希望参加的比赛
      // userData: {} //用户信息
    },

    onLaunch: function () {
      console.log("App Launch");
      // 小程序更新版本时引导客户冷重启小程序
      if (wx && wx.canIUse("getUpdateManager")) {
        const updateManager = wx.getUpdateManager();
        updateManager.onCheckForUpdate(function (res) {
          console.log("onCheckForUpdate====", res);
          // 请求完新版本信息的回调
          if (res.hasUpdate) {
            console.log("res.hasUpdate====");
            updateManager.onUpdateReady(function () {
              wx.showModal({
                title: "更新提示",
                content: "新版本已经准备好，是否重启应用？",
                success: function (res) {
                  console.log("success====", res);
                  // res: {errMsg: "showModal: ok", cancel: false, confirm: true}
                  if (res.confirm) {
                    // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                    updateManager.applyUpdate();
                  }
                },
              });
            });
            updateManager.onUpdateFailed(function () {
              // 新的版本下载失败
              wx.showModal({
                title: "已经有新版本了哟~",
                content:
                  "新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~",
              });
            });
          }
        });
      }
    },
    onShow: function () {
      console.log("App Show");
      uni.hideTabBar({
        //这里是为了不那么唐突
        animation: true,
        success() {
          console.debug("隐藏成功");
        },
      });
    },
    onHide: function () {
      console.log("App Hide");
    },
    // methods: {
    // 	joinUrl
    // }
  };
</script>

<style lang="scss">
  /*每个页面公共css */

  /*搜索组件*/
  .diy_search_box .uni-searchbar {
    padding: 8rpx 16rpx;
    .uni-searchbar__box {
      background-color: #f0f1f2 !important;
      // justify-content: start !important;
      border: none !important;
      height: 66rpx;
      .uni-input-input {
        color: #999999;
        font-size: 24rpx;
      }
    }
    .uni-searchbar__cancel {
      line-height: 66rpx;
      z-index: 10;
    }
  }
  .tag_item {
    .input-value-border {
      border: none !important;
      line-height: 40rpx !important;
    }
    .input-value {
      line-height: none;
    }
  }
  .tag_group {
    .uni-data-tree-cover {
      // z-index:998 !important;
      transform: translateZ(1px);
    }
    .uni-data-tree-dialog {
      // z-index:999 !important;
    }
  }
</style>
<style>
  @import "./static/fonts/iconfont.css";
  * {
    box-sizing: border-box;
  }
  /* 滚动条隐藏 */
  ::-webkit-scrollbar {
    display: none;
    width: 0 !important;
    height: 0 !important;
    -webkit-appearance: none;
    background: transparent;
  }
</style>
