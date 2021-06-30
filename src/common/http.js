import { joinUrl, getCurPageRoute } from '@/common/utils'
import { isLogin, setStorage, closeLogin } from './utils'
import encrypt from '@/assets/js/jsencrypt'

import store from '@/store'

// export const baseUrl = 'http://47.101.54.170:8111/server';
export const baseUrl = 'https://www.sjreach.cn/server'; // 生产
// export const baseUrl = 'https://dev.sjreach.cn/server'; // 测试
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
// 不加密
const noJMList = [ '/app/oss/upload' ] 

export const httpAPI =  ( url, options) => {
  const { data: qData, header = {}, method, token  } = options;
  let datas = {} 
  if (!noJMList.includes(url)) {
    datas = { json: encrypt.encryptLong(JSON.stringify(qData || '')) } // 数据加密
  } else {
    datas = qData;
  }
  const newToken = uni.getStorageSync('token') || token;
  // const newToken = '76C77C71273A5A01B1CBF4DB814E39A27CCFC1063003686E677158436BD1B8A8C66779801850E2C0033D0980BF4201A9' ;
  console.log(1234343,url, token, uni.getStorageSync('token'),qData)
  // let datas = qData;
  
  let htttpDefaultOpts = {
    url: baseUrl + url,
    data: datas,
    header: { 
        ...headerOptions[method || 'POST'],
        'admin-auth': newToken || '',
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
// const serverList = [
//   '/app/team-up/ranks',
//   '/app/academic/apply-service',
//   '/app/consulting/apply-service',
// ]
//  拦截特殊状态 
function interceptor (code , msg, url) {
  const route = getCurPageRoute() || '';
  switch(code) {
    case 20011: //是登陆已过期
      if (isLogin()) {
        console.log('msg: ', msg)
        uni.showToast({ title: '登陆已过期', icon:'none', duration: 1000 })
        store.commit('setUserInfo', {})
        store.commit('setToken', '')
        closeLogin();
      }
      break;
    case 1015: //是填写标准信息
    // toUserInfoUrl
      setStorage({ toUserInfoUrl: '/pages/userInfo/index' })
      break;
    case 1018: //是完善个人信息
      setStorage({ toUserInfoUrl: '/pages/userComplete/index' })
      break;
  }
}


export const httpJson = (fileName) => {
  return uni.request({
    url: `${imgUrl}${fileName}`,//json数据地址
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    const { data } = res[1];
    return data
  })
}