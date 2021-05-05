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
      return u
    }
    const flag = data[key] instanceof Object
    if (/\?/.test(url)) {
      u += `&${key}=${ flag ? JSON.stringify(data[key]) : data[key]}`
      return u
    } else {
      u += `?${key}=${flag ? JSON.stringify(data[key]) : data[key]}`
      return  u;
    }
  }, url)
  return newUrl
}

// 获取当前页面路由信息
export const  getCurPage = () =>{
  let pages = getCurrentPages();
  let curPage = pages[pages.length-1];
  console.log(123,curPage)
  let curParam = curPage.options || (curPage.$route || {}).query;
  return curParam
}

// 希望参加比赛的反向组成 - 定制
export const analysisFn = (deepList, items) => {
  const arr = []
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
        return fla
      })
    }
    return flag
  })
  return arr
}