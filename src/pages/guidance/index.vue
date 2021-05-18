<template>
<!-- 1.引导 -->
  <page-sj>
    <div class="content_box">
      <!-- 顶部海报 -->
      <div class="top_box" ></div>
      <!-- 中间 -->
      <div class="bottom_box">
        <p class="font_1">欢迎来到 视界 | Reach</p>
        
        <button class="btn" @click="clickBtn">进入</button>
      </div>
      <!-- 底部logo -->
      <bottom-logo/>
    </div>
  </page-sj>
</template>
<script>
import bottomLogo from "@/components/bottomLogo";
import pageSj from '@/components/pageSjNew';
import { jscode2session, login } from '@/common/api';
import { setStorage } from '@/common/utils';

export default {
  name:'guidance',
  components:{ bottomLogo, pageSj },
  data() {
    return {
      token:'',
      userInfo: {},
      canLogin: true,
    }
  },
  mounted () {
    // this.login();
    uni.getStorage({ 
      key: 'token', 
      success:(res) =>{
        const {errMsg, data} = res;
        if (/ok/.test(errMsg) && data) {
          this.token = data;
        }else {
          this.login();
        }
      },
      fail: (err)=>{
        this.login();
      }
    })
  },
  methods: {
    clickBtn() {
      if (!this.canLogin) return;
      this.canLogin = false;
      const _this = this;
      uni.getUserProfile({
        desc:'登录',
        success: (res) => {
          _this.userInfo = res.userInfo;
          setStorage (res.userInfo)
          console.log(988, _this.userInfo)
          if (!_this.token) {
            _this.login()
          } else {
            uni.redirectTo({ 
              url: '/pages/home/index', 
              success(res) {
                console.log(res)
              }, 
              fail(err){console.log(err)} 
            })
          }
        },
        fail: (err) => {
          _this.canLogin = true;
          console.log("未授权",err);
        }
      })
      
    },
    login () {
      const _this = this;
      uni.login({
        success(loginRes){
          const { code } = loginRes;
          if (code) {
            // 获取openid
            jscode2session({jsCode: code}).then(wxRes=>{
              console.log('wxRes', wxRes)
              const { data, statusCode } = wxRes[1];
              const { openid, session_key } = data;
              if (statusCode === 200) {
                setStorage(data)
                // 获取token
                login({ openId: openid }).then(logiRes => {
                  console.log('logiRes',logiRes)
                  const { data } = logiRes[1];
                  const { code, data: nData } = data;
                  if (code === 200) {
                    setStorage(nData)
                    _this.token = nData.token;
                    const keys = Object.keys(_this.userInfo)
                    if (keys.length) {
                      setTimeout(() => {
                        uni.redirectTo({ 
                          url: '/pages/home/index', 
                          success(res) {console.log(res)}, 
                          fail(err){console.log(err)} 
                        })
                      }, 1000);
                    } else {
                      _this.canLogin = true
                    }
                  }
                })
              }
            })
          }
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
    @include img_bg('http://qrw69n75w.hn-bkt.clouddn.com/web-22.png');
  }
  .btn{
    margin-top: 70rpx;
    width: 384rpx;
    height: 80rpx;
    background: #676FDF;
    border-radius: 40rpx;
    line-height: 80rpx;
    color: white;
  }
}
</style>