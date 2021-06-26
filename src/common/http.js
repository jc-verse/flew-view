import { joinUrl, getCurPageRoute } from '@/common/utils'
import { isLogin, setStorage, closeLogin } from './utils'
import encrypt from '@/assets/js/jsencrypt'

import store from '@/store'

// export const baseUrl = 'http://47.101.54.170:8111/server';
export const baseUrl = 'https://www.sjreach.cn/server';
export const imgUrl = 'http://prod.qiniucdns.sjreach.cn/';
const headerOptions = {
  'POST': {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
    },
  'GET': {
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
  }
}

// const cryptStr = encrypt.encryptLong(str)
// console.log('加密后的结果：', cryptStr)

// const originalStr = encrypt.decryptLong(cryptStr)
// console.log('解密后的原始数据：', originalStr)
// 当配置项中不含有三种回调函数时，将以promise返回数据

export const httpAPI =  ( url, options) => {
  const { data, header = {}, method, token  } = options;
  const newToken = uni.getStorageSync('token') || token;
  console.log(1234343,url, token, uni.getStorageSync('token'))
  let datas = data;
  // datas = encrypt.encryptLong(JSON.stringify(data))
  let htttpDefaultOpts = {
    url: baseUrl + url,
    data: datas,
    header: { 
        ...headerOptions[method || 'POST'],
        'admin-auth': newToken,
        ...header
    },
    withCredentials: true,
    method: method || 'POST',
  };
  return uni.request(htttpDefaultOpts).then(res=> {
    const { data } = res[1];
    const { code, msg } = data || {}
    interceptor(code, msg, url)
    return res
  });
}
const serverList = [
  '/app/team-up/ranks',
  '/app/academic/apply-service',
  '/app/consulting/apply-service',
]
//  拦截特殊状态 
function interceptor (code , msg, url) {
  const route = getCurPageRoute() || '';
  switch(code) {
    case 20011: //是登陆已过期
      if (isLogin()) {
        console.log('msg: ', msg)
        uni.showToast({ title: '登陆已过期', icon:'none', duration: 1000, success: ()=> {

          if (!route.includes('guidance')) {
            // uni.navigateTo({ url: joinUrl('/pages/guidance/index') });
          }
        } })
        store.commit('setUserInfo', {})
        store.commit('setToken', '')
        closeLogin();
        // uni.removeStorage({ key: 'token' })
      }
      break;
    case 1015: //是填写标准信息
    // toUserInfoUrl
      setStorage({ toUserInfoUrl: '/pages/userInfo/index' })
      // if (!route.includes('userInfo') && serverList.includes(url)) {
      //   uni.navigateTo({ url: joinUrl('/pages/userInfo/index') });
      // }
      break;
    case 1018: //是完善个人信息
      setStorage({ toUserInfoUrl: '/pages/userComplete/index' })
      // if (!route.includes('userComplete') && serverList.includes(url)) {
      //   uni.navigateTo({ url: joinUrl('/pages/userComplete/index') });
      // }
      break;
  }
}
