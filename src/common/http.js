import { joinUrl } from '@/common/utils'
export const baseUrl = 'http://47.101.54.170:8111/server';
export const imgUrl = 'http://qrw69n75w.hn-bkt.clouddn.com/';
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
    interceptor(code, msg)
    return res
  });
}
//  拦截特殊状态 
function interceptor (code , msg) {
  // switch(code) {
  //   case 20011: //是登陆已过期
  //     uni.navigateTo({ url: joinUrl('/pages/guidance/index') });
  //     uni.showToast({ title: msg, duration: 1000 })
  //     break;
  //   case 1015: //是填写标准信息
  //     console.log(123123)
  //     // uni.navigateTo({ url: joinUrl('/pages/userInfo/index') });
  //     uni.showToast({ title: msg, duration: 1000 })
  //     break;
  //   case 1018: //是完善个人信息
  //     uni.navigateTo({ url: joinUrl('/pages/userComplete/index') });
  //     uni.showToast({ title: msg, duration: 1000 })
  //     break;
  // }
}
