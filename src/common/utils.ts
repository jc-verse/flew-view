import store from '@/store';
/**
 * 将url 和 json 拼接成带参url
 * url: String;
 * data: Object;
 */
export const joinUrl = (
  url: string,
  data: { [key: string]: Object | string | undefined } = {},
) => {
  const keys = Object.keys(data);
  const newUrl = keys.reduce((url, key) => {
    if (!data[key]) return url;
    return `${url}${/\?/.test(url) ? '&' : '?'}${key}=${
      data[key] instanceof Object ? JSON.stringify(data[key]) : data[key]
    }`;
  }, url);
  return newUrl;
};

// 获取当前页面路由信息
export const getCurPage = () => {
  const pages = getCurrentPages();
  const curPage = pages[pages.length - 1];
  const curParam = curPage.options || (curPage.$route || {}).query;
  return curParam;
};

// 获取当前页面路由
export const getCurPageRoute = () => {
  const pages = getCurrentPages();
  const curPage = pages[pages.length - 1];
  return curPage.route;
};

// 希望参加比赛的反向组成 - 定制
export const analysisFn = (
  deepList: any[],
  items: {
    organizeTypeId: string;
    organizeTypeSon: string;
    organizeTypeSonMatchId: string;
  },
) => {
  const arr = [];
  arr[0] = deepList.find((item) => {
    const flag = item.id === items.organizeTypeId;
    if (flag) {
      arr[1] = item.children.find((ite) => {
        const fla = ite.id === items.organizeTypeSon;
        if (fla) {
          arr[2] = ite.children.find((i) => {
            return i.id === items.organizeTypeSonMatchId;
          });
        }
        return fla;
      });
    }
    return flag;
  });
  return arr;
};
// 改装数据方便联动select 使用
export const deepChange = (data: any[]) => {
  return data.map((item) => {
    const obj = {};
    for (const key in item) {
      if (Array.isArray(item[key])) {
        obj['children'] = deepChange(item[key]);
        // obj[key] = item[key]
      } else {
        obj[key] = item[key];
        if (/(name|sonName|matchName)/.test(key)) {
          obj['label'] = item[key];
        }
      }
    }
    return obj;
  });
};

// 将比赛信息重组
export const bsToStrFn = (arr = []) => {
  const list = arr || [];
  return list.map((item) => {
    const { time, name, wonAwards } = item;
    const year = time.split('-')[0];
    return `${year} ${name} ${wonAwards || ''}`;
  });
};
// 课程体系信息重组
export const bsToStrFun = (arr = []) => {
  const list = arr || [];
  return list.map((item) => {
    const { subject, fraction } = item;
    return `${subject} ${fraction}`;
  });
};
// 本地存储
export function setStorage(obj) {
  for (const key in obj) {
    uni.setStorage({ key, data: obj[key] });
  }
}
// 判断登录
export function isLogin() {
  const token = uni.getStorageSync('token');
  return !!token;
}
// 退出登录
export function closeLogin() {
  const count = uni.getStorageSync('count');
  const statement = uni.getStorageSync('statement');
  store.commit('setUserInfo', {});
  store.commit('setToken', '');
  try {
    uni.clearStorageSync();
  } catch (e) {
    // error
  }
  if (count) {
    setStorage({ count: count + 1, statement });
  }
}
// 返回引导页
export function toLogin() {
  uni.navigateTo({ url: joinUrl('/pages/guidance/index') });
  closeLogin();
}

// 时间转换格式
export function formatDate(time: string, formatStr: string) {
  if (!time) {
    return '';
  }
  let date = new Date(time);
  let Y = date.getFullYear();
  let M =
    date.getMonth() + 1 < 10
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1;
  let D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();
  formatStr = formatStr || 'YYYY-MM-DD H:m:s';
  return formatStr.replace(/YYYY|MM|DD|H|m|s/gi, (matches) => {
    return {
      YYYY: Y,
      MM: M,
      DD: D,
      H: h,
      m: m,
      s: s,
    }[matches];
  });
}
// 复制
export const copy = (value: string) => {
  uni.setClipboardData({
    data: value, // 要复制的文字
    success: () => {
      uni.getClipboardData({
        success: () => {
          uni.showToast({ title: '复制成功' });
        },
      });
    },
  });
};

export const filterForm = (obj) => {
  const form = {};
  for (var key in obj) {
    if (obj[key] || obj[key] === 0) {
      form[key] = obj[key];
    }
  }
  return form;
};
