import config from '../config'

const baseUrl = config.contentApi
const headerOptions = {
  POST: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  GET: {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
  },
}
const contentApi = (url, options) => {
  const { data: requestData, header = {}, method } = options
  const httpOpts = {
    url: baseUrl + url,
    data: requestData,
    header: {
      ...headerOptions[method || 'POST'],
      ...header,
    },
    withCredentials: true,
    method: method || 'POST',
  }
  return uni.request(httpOpts).then((res) => {
    return res
  })
}

export const getCompetitionEntries = (data) => {
  return contentApi('/competitions', { data, method: 'GET' })
}

export const getArticleEntries = (data) => {
  return contentApi('/articles', { data, method: 'GET' })
}

export default contentApi
