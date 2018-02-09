/**
 * 使用方法
 * const post = require('../../utils/post')
 * var postData = {}
 * post('https://www.baidu.com/', postData)
 * .then(res => {
 * ... 这里就是success事件的内容
 * })
*/
module.exports = (url, data) => {
  wx.showLoading({ title: 'Loading...' })
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      data: data,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: 'POST',
      dataType: 'json',
      success: resolve,
      fail: reject,
      complete: wx.hideLoading
    })
  })
}
