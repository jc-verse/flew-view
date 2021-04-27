
const baseUrl = '';

const headerOptions = {
  'GET': {
      'content-type': 'application/json; vjstdry=UTF-8',
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    },
  'POST': {
    'content-type': 'application/x-www-form-urlencoded',
  }
}

// 当配置项中不含有三种回调函数时，将以promise返回数据

const http =  ( url, options) => {
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
export default {
  http,
  baseUrl
};
