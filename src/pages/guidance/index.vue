<template>
<!-- 1.引导 -->
  <page-sj>
    <div class="content_box">
      <!-- 顶部海报 -->
      <div class="top_box" >
        <img src="@/static/img1/poster.png" alt="">
      </div>
      <!-- 中间操作 -->
      <div class="bottom_box">
        <p class="font_1">欢迎来到 视界 | Reach</p>
        
        <button type="default"  open-type="getUserInfo" @getuserinfo='getuserinfo' bindgetuserinfo='getuserinfo' class="btn" @click="clickBtn">进入</button>
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
function setStorage (obj) {
  for (const key in obj) {
    uni.setStorage({ key , data: obj[key] })
  }
}

export default {
  name:'guidance',
  components:{ bottomLogo, pageSj },
  data() {
    return {
      token:'',
      userInfo: {}
    }
  },
  mounted () {
    uni.getStorage({ key: 'token' }).then(res => {
      const {errMsg, data} = res
      if (errMsg === 'getStorage:ok' || data) {
        this.token = data;
      }else {
        this.login();
      }
    })
    
  },
  methods: {
    clickBtn() {
      if (this.token) {
        uni.navigateTo({ url: '/pages/home/index', success(res) {console.log(res)}, fail(err){console.log(err)} })
      } 
      
    },
    login () {
      const _this = this;
        uni.getProvider({
          service: 'oauth',
          success(res) {
            // 判断平台
            if (res.provider.includes('weixin')) {
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
                            _this.getuserinfo();
                            setStorage(nData)
                            _this.token = nData.token
                          }
                        })
                      }
                    })
                  }
                }
              })
            }
          }
        }
      )
    },
    getuserinfo(e) {
      uni.getUserInfo({
        success: (res) => {
          this.userInfo = res.userInfo;
          setStorage (res.userInfo)
          console.log(this.userInfo);
        },
        fail: () => {
          console.log("未授权");
        }
      })
      console.log(999, e)
    }
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
    @include img_fill;
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