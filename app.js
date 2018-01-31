App({
  config: {
    apiBase: 'https://yq.wzcpic.com/yqb/'
  },
  API: {
    openid: 'https://yq.wzcpic.com/yqb/api/openid.php?code=',
    login: 'https://yq.wzcpic.com/yqb/api/login.php?code='
  },
  globalData: {
    userInfo: null,
    openid: null
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      console.log('read userInfo from cache')
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  getUserOpenID: function (cb) {
    var that = this
    if (this.globalData.openid) {
      console.log('read openid from cache')
      typeof cb == "function" && cb(this.globalData.openid)
    } else {
      //调用登录接口
      wx.login({
        success: res => {
          wx.request({
            url: this.API.login + res.code,
            success: function (res) {
              console.log('read openid from api')
              that.globalData.openid = res.data.openid
              typeof cb == "function" && cb(that.globalData.openid)
            }
          })
        }
      })
    }
  },
  onLaunch: function () {
    var that = this;
    // 登录
    wx.login({
      success: res => {
        wx.request({
          url: this.API.login + res.code,
          success: function (res) {
            that.globalData.openid = res.data.openid
          }
        })
      }
    })
  }
})