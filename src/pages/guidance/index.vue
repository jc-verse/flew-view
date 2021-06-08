<template>
<!-- 1.引导 -->
  <page-sj>
    <div class="content_box">
      <!-- 顶部海报 -->
      <div class="top_box" ></div>
      <!-- 中间 -->
      <div class="bottom_box">
        <p class="font_1">欢迎来到 视界 | Reach</p>
        
        <div class="btn_box">
          <div class="visitor" @click="visitorModule">访客</div>
          <div class="btn" @click="clickBtn">登录</div>
        </div>
      </div>
      <!-- 底部logo -->
      <bottom-logo/>
      <TipPopup title="声明" ref='tipPopup' msg="是否确认申请服务？" @confirm='confirm' :width='654'>
        <template #content>
          <div class="tip_content">
            <p>谢谢大家使用   视界 I Reach！</p> 
            <p>本程序学术帮助、学校咨询所涉及到的服务，只代表服务提供者个人的观点和见解与本程序无关。我们会尽力做好服务提供者的筛选,做到客观、公正、有内涵，对大家有帮助。</p>
            <p>由于是学生群体运营，有很多不足之处。请联系客服提出宝贵意见，让我们能真正帮助到大家，再次感谢！</p>
          </div>
        </template>
        <template #btn>
          <div class="tip_btn" @click="clickIknow"> 我知道了</div>
        </template>
      </TipPopup>

    </div>
  </page-sj>
</template>
<script>
import bottomLogo from "@/components/bottomLogo";
import pageSj from '@/components/pageSjNew';
import { jscode2session, login } from '@/common/api';
import { setStorage, isLogin } from '@/common/utils';
import TipPopup from '@/components/cards/tipPopup';
export default {
  name:'guidance',
  components:{ bottomLogo, pageSj, TipPopup },
  data() {
    return {
      token:'',
      userInfo: {},
      canLogin: true,
      wxInfoData: {},
      loading: false

    }
  },
  mounted () {
    // uni.getStorage({ 
    //   key: 'token', 
    //   success:(res) =>{
    //     const {errMsg, data} = res;
    //     if (/ok/.test(errMsg) && data) {
    //       this.token = data;
    //     }else {
    //       this.login();
    //     }
    //   },
    //   fail: (err)=>{
    //     this.login();
    //   }
    // })
    // if (!isLogin()) {
    //   this.login();
    // }
  },
  methods: {
    clickIknow(flag) { // flag 1: 不保存用户信息
      
      this.$refs.tipPopup.close();
      setStorage({statement: 'Y'})

      const _this = this;
      uni.getUserProfile({
        desc:'登录',
        success: (res) => {
          _this.userInfo = res.userInfo;
          _this.wxInfoData.iv = res.iv;
          _this.wxInfoData.encryptedData = res.encryptedData;
          if (flag !== 1) {
            setStorage (res.userInfo)
          }
          if (!_this.token) {
            _this.login()
          } else {
            uni.redirectTo({  url: '/pages/home/index', })
          }
        },
        fail: (err) => {
          _this.canLogin = true;
          console.log("未授权",err);
          uni.navigateTo({url: '/pages/home/index'})
        }
      })
      
    },
    clickBtn() {
      const statement = uni.getStorageSync('statement') || 'N';
      if (!this.canLogin) return;
        this.canLogin = false;
      if(statement !== "Y") { //判断是否首次登录，并阅读了声明
        this.$refs.tipPopup.show();
      } else {
        this.clickIknow(1);
      }
    },
    visitorModule() {
      uni.navigateTo({url: '/pages/home/index'})
    },
    // 节流
    throttle(flag) {
      if (flag) {
        this.loading = true;
        this.canClick = false;
        uni.showLoading()
      } else {
        this.loading = false;
        this.canClick = true;
        uni.hideLoading()
      }
    },
    login () {
      const _this = this;
      if (this.loading) return;
      this.throttle(true);
      uni.login({
        success(loginRes){
          const { code } = loginRes;
          if (code) {
            // 获取openid
            jscode2session({jsCode: code}).then(wxRes=>{
              console.log('wxRes', wxRes)
              const { data, statusCode } = wxRes[1];
              const { openid, session_key } = data;
              _this.throttle(false);
              if (statusCode === 200) {
                setStorage(data)
                // 获取token
                login({ openId: openid, session_key, ..._this.wxInfoData }).then(logiRes => {
                  console.log('logiRes',logiRes)
                  const { data } = logiRes[1];
                  const { code, data: nData } = data;
                  if (code === 200) {
                    setStorage(nData)
                    _this.token = nData.token;
                    console.log('token：', nData.token)
                    const keys = Object.keys(_this.userInfo)
                    if (keys.length) {
                      // setTimeout(() => {
                        uni.redirectTo({ 
                          url: '/pages/home/index', 
                          success(res) {console.log(res)}, 
                          fail(err){console.log(err)} 
                        })
                      // });
                    } else {
                      _this.canLogin = true
                    }
                  }
                })
              }
            }).catch(err => {
              console.log(err);
              _this.throttle(false);
            })
          } else {
            _this.throttle(false);
          }
        },
        fail: ()=>  {
          _this.throttle(false);
        }
      })
    },
  }
}
</script>
<style lang='scss' scoped>
.font_1{
  @include fontMixin(42rpx, #4E2B2D, bold)
}
.content_box{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 100%;
  .top_box{
    width: 100%;
    height: 704rpx;
    flex-grow: 0;
    @include img_bg('http://prod.qiniucdns.sjreach.cn/web-22.png');
  }
  .btn_box{
    @include flex_center;
    margin-top: 70rpx;
    >div{
      padding:20rpx 60rpx  ;
      background: #676FDF;
      border-radius: 40rpx;
      color: white;
    }
    &>div:not(:first-child){
      margin-left: 20rpx;
    }
    .visitor{
      filter: grayscale(100%);
    }
  }
  
  .tip_content{
    padding: 20rpx;
    word-break: break-word;
    border-bottom: 2rpx solid rgba(0, 0, 0,0.08);
    p{
      text-align: center;
      line-height: 22px;
      @include fontMixin(14px, #666666)
    }
  }
  .tip_btn{
    padding: 20rpx;
    @include fontMixin(16px, #676FDF, bold)
  }
}
</style>