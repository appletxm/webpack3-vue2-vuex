import axios from 'axios'

const urlPrefix = '/api'

/* eslint-disable */
const configAxios = {
  decorate(urlPrefix) {
    // default axios config
    axios.defaults.baseURL = urlPrefix
    axios.defaults.withCredentials = true
    axios.defaults.header = true
    axios.defaults.headers.post['Content-Type'] = 'application/json'

    // 添加一个请求拦截器
    axios.interceptors.request.use(function (config) {
      // Do something before request is sent
      return config
    }, function (error) {
      // Do something with request error
      return Promise.reject(error)
    })

    // 添加一个响应拦截器
    axios.interceptors.response.use(function (response) {
      // Do something with response data
      return response.data
    }, function (error) {
      // Do something with response error
      return Promise.reject(error)
    })
  }
}
/* eslint-enable */

configAxios.decorate(urlPrefix)

export default configAxios
