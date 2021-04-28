
export const baseUrl = 'http://47.101.54.170:8111/server';

const headerOptions = {
  'POST': {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
      // 'X-Requested-With': 'XMLHttpRequest'
    },
  'GET': {
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
  }
}

// 当配置项中不含有三种回调函数时，将以promise返回数据

export const httpAPI =  ( url, options) => {
  const { data, header = {}, method  } = options;
  let htttpDefaultOpts = {
    url: baseUrl + url,
    data: data,
    header: { ...headerOptions[method || 'POST'], ...header },
    withCredentials: true,
    method: method || 'POST',
  };
  return uni.request(htttpDefaultOpts);
}

