/** 
 * 将url 和 json 拼接成带参url
 * url: String;
 * data: Object;
*/
export const joinUrl = (url, data = {}) => {
  
  const keys = Object.keys(data);

  const newUrl = keys.reduce((url, key)=> {
    let u = url
    if (/\?/.test(url)) {
        u += `&${key}:${data[key]}`
    } else {
      u += `?${key}:${data[key]}`
    }
    return u
  }, url)
  return newUrl
}