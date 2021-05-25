/** 
 * 将url 和 json 拼接成带参url
 * url: String;
 * data: Object;
*/
export const joinUrl = (url, data = {}) => {
  
  const keys = Object.keys(data);

  const newUrl = keys.reduce((url, key)=> {
    let u = url
    if (!data[key]) {
      return u;
    }
    const flag = data[key] instanceof Object
    if (/\?/.test(url)) {
      u += `&${key}=${ flag ? JSON.stringify(data[key]) : data[key]}`
      return u;
    } else {
      u += `?${key}=${flag ? JSON.stringify(data[key]) : data[key]}`
      return u;
    }
  }, url)
  return newUrl;
}

// 获取当前页面路由信息
export const  getCurPage = () =>{
  let pages = getCurrentPages();
  let curPage = pages[pages.length-1]
  let curParam = curPage.options || (curPage.$route || {}).query;
  console.log(666,1,curPage)
  return curParam
}

// 获取当前页面路由
export const  getCurPageRoute = () =>{
  let pages = getCurrentPages();
  let curPage = pages[pages.length-1]
  return curPage.route
}

// 希望参加比赛的反向组成 - 定制
export const analysisFn = (deepList, items) => {
  console.log(12313, deepList)
  const arr = [];
  arr[0] = deepList.find(item => {
    const flag = item.id === items.organizeTypeId;
    if (flag) {
      arr[1] =item.children.find(ite => {
        const fla = ite.id === items.organizeTypeSon;
        if (fla) {
          arr[2] = ite.children.find(i =>{
            return i.id === items.organizeTypeSonMatchId;
          })
        }
        return fla;
      })
    }
    return flag;
  })
  return arr;
}
// 改装数据方便联动select 使用
export const  deepChange = (data) => {
  return  data.map(item => {
    const obj = {}
    for (const key in item) {
      if (Array.isArray(item[key])) {
        obj['children'] = deepChange(item[key]);
        // obj[key] = item[key]
      } else{
        obj[key] = item[key]
        if (/(name|sonName|matchName)/.test(key)) {
          obj['label'] = item[key]
        }
      }
    }
    return obj;
  })
}

// 将比赛信息重组
export const bsToStrFn = (arr = []) => {
  const list = arr || []
  return list.map(item => {
    const { createTime, name } = item;
    const year = createTime.split('-')[0]
    return `${year} ${name}`
  });
}
// 课程体系信息重组
export const bsToStrFun = (arr = []) => {
  const list = arr || []
  return list.map(item => {
    const { subject, fraction } = item;
    return `${subject} ${fraction}`
  });
}

export  function setStorage (obj) {
  for (const key in obj) {
    uni.setStorage({ key , data: obj[key] })
  }
}

export function isLogin () {
  const token = uni.getStorageSync('token');
  return !!token
}

export function toLogin () {
  uni.navigateTo({ url: joinUrl('/pages/guidance/index') });
  const count = uni.getStorageSync('count')
  try {
    uni.clearStorageSync();
  } catch (e) {
      // error
  }
  if (count) {
    setStorage({count: count + 1})
  }
}

// 时间转换格式
export function formatDate(time, formatStr) {
  let date = new Date(time);
  let Y = date.getFullYear();
  let M = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
  let D = date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate();
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();
  formatStr = formatStr || 'YYYY-MM-DD H:m:s';
  return formatStr.replace(/YYYY|MM|DD|H|m|s/ig, function (matches) {
      return ({
          YYYY: Y,
          MM: M,
          DD: D,
          H: h,
          m: m,
          s: s
      })[matches];
  })
}
