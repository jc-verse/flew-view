import { joinUrl, getCurPageRoute } from '@/common/utils'
import { isLogin } from './utils'

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

// 当配置项中不含有三种回调函数时，将以promise返回数据

export const httpAPI =  ( url, options) => {
  const token = uni.getStorageSync('token');
  const { data, header = {}, method  } = options;
  let htttpDefaultOpts = {
    url: baseUrl + url,
    data: data,
    header: { 
        ...headerOptions[method || 'POST'],
        'admin-auth': token,
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
        uni.showToast({ title: '登陆已过期', icon:'none', duration: 1000, success: ()=> {
          if (!route.includes('guidance')) {
            // uni.navigateTo({ url: joinUrl('/pages/guidance/index') });
          }
        } })
        uni.removeStorage({ key: 'token' })
      }
      break;
    case 1015: //是填写标准信息
      if (!route.includes('userInfo') && serverList.includes(url)) {
        uni.navigateTo({ url: joinUrl('/pages/userInfo/index') });
      }
      break;
    case 1018: //是完善个人信息
      if (!route.includes('userComplete') && serverList.includes(url)) {
        uni.navigateTo({ url: joinUrl('/pages/userComplete/index') });
      }
      break;
  }
}
