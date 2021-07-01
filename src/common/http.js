import { joinUrl, getCurPageRoute } from '@/common/utils'
import { isLogin, setStorage, closeLogin } from './utils'
import encrypt from '@/assets/js/jsencrypt'

import store from '@/store'

// export const baseUrl = 'https://www.sjreach.cn/server'; // 生产
export const baseUrl = 'https://dev.sjreach.cn/server'; // 测试

export const imgUrl = 'https://prod.qiniucdns.sjreach.cn/'; // 七牛云资源链接


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
// 请求数据拦截
const dataFn = (url, data) => {
  const noJMList = [ '/app/oss/upload', '/app/user-info/update-business-card-info' ] 
  return noJMList.includes(url) ? data : { json: encrypt.encryptLong(JSON.stringify(data || '')) }
}

export const httpAPI =  ( url, options) => {
  const { data: qData, header = {}, method, token  } = options;
  const newToken = uni.getStorageSync('token') || token;
  console.log(1234343,url, token, uni.getStorageSync('token'),qData)
  const datas = dataFn(url, qData);
  
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