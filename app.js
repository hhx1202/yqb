import { ToastPannel } from './component/toastText/toastText'

App({
  config: {
    apiBase: 'https://yq.wzcpic.com/yqb/'
  },
  API: {
    test: 'https://yq.wzcpic.com/yqb/api/test.php',
    login: 'https://yq.wzcpic.com/yqb/api/login.php',
    bind: 'https://yq.wzcpic.com/yqb/api/bind.php',
    unbind: 'https://yq.wzcpic.com/yqb/api/unbind.php',
    list: 'https://yq.wzcpic.com/yqb/api/list.php',
    scan: 'https://yq.wzcpic.com/yqb/api/list_scan.php',
    detail: 'https://yq.wzcpic.com/yqb/api/detail.php',
    use: 'https://yq.wzcpic.com/yqb/api/use.php'
  },
  globalData: {
    title:'乐清保',
    userInfo: null,
    adminInfo: null
  },
  ToastPannel,
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
  getAdminInfo: function (cb) {
    console.log('start getAdminInfo')
    var that = this
    if (this.globalData.adminInfo) {
      console.log('read adminInfo from cache')
      typeof cb == "function" && cb(this.globalData.adminInfo)
    } else {
      console.log('read adminInfo from api')
      //调用登录接口
      wx.login({
        success: res => {
          var data = {}
          data.code = res.code
          wx.request({
            url: this.API.login,
            data:data,
            method: 'POST',
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            success: function (res) {
              console.log('read adminInfo from api success')
              console.log(res.data)
              if (res.data.state == 1){
                var adminInfo = that.fillAdminInfo(res.data.data)
                that.globalData.adminInfo = adminInfo
                typeof cb == "function" && cb(that.globalData.adminInfo)
              }else{
                console.log(res.data.state)
                that.alert(res.data.message);
              }
            }
          })
        }
      })
    }
  },
  fillAdminInfo(data){
    var adminInfo = {}
    adminInfo.openid = data.openid
    adminInfo.adminid = data.adminid
    adminInfo.adminname = data.adminname
    adminInfo.sid = data.sid
    adminInfo.sort = data.sort
    adminInfo.shopname = data.shopname
    return adminInfo
  },
  onLaunch: function () {
    
  },
  alert: function(msg){
    if (msg == undefined){
      msg = '未定义'
    }
    wx.showModal({
      title: '提示',
      content: msg,
      showCancel: false
    })
  }
})