import wx from 'wx'
import Fly from 'flyio'

// flyio 使用方法参见：
// https://github.com/wendux/fly

const request = new Fly()

request.config.timeout = 10 * 1000
if (process.env.NODE_ENV === 'development') {
  request.config.baseURL = 'https://www.v2ex.com/api'
} else if (process.env.NODE_ENV === 'production') {
  request.config.baseURL = 'https://xxxxxx/api'
}

request.interceptors.request.use((request) => {
  wx.showLoading({ title: '拼命加载中...' })
  const token = wx.getStorageSync('miniToken')
  request.headers['miniToken'] = token
  // console.log('request.interceptors.request:', request)
  return request
})

request.interceptors.response.use(
  (response, promise) => {
    wx.hideLoading()
    return promise.resolve(response.data)
  },
  (err, promise) => {
    wx.hideLoading()
    console.log('response', err)
    if (err.response && err.response.data) {
      wx.showToast({
        title: err.response.data.verror,
        icon: 'none',
        duration: 3000
      })
    } else {
      wx.showToast({
        title: err.message,
        icon: 'none',
        duration: 3000
      })
    }
    return promise.resolve()
  }
)

export default request
