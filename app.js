App({
  config: {
    apiBase: 'https://yq.wzcpic.com/yqb/'
  },
  API: {
    login: 'https://yq.wzcpic.com/yqb/api/login.php',
    bind: 'https://yq.wzcpic.com/yqb/api/bind.php',
    unbind: 'https://yq.wzcpic.com/yqb/api/unbind.php',
  },
  globalData: {
    title:'乐清保',
    userInfo: null,
    adminInfo: null
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
              that.globalData.userInfo = res.data
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  getAdminInfo: function (cb) {
    var that = this
    if (this.globalData.adminInfo) {
      console.log('read openid from cache')
      typeof cb == "function" && cb(this.globalData.adminInfo)
    } else {
      //调用登录接口
      wx.login({
        success: res => {
          var postData = {}
          postData.code = res.code
          wx.request({
            url: this.API.login,
            data: postData,
            method: 'POST',
            header: {'content-type': 'application/x-www-form-urlencoded'},
            success: function (res) {
              console.log('read openid from api')
              if (res.data.state != 1){
                that.alert(res.data.message);
              }else{
                console.log(res.data.data)

                  var adminInfo = {}
                  adminInfo.openid = res.data.data.openid
                  adminInfo.adminid = res.data.data.adminid
                  adminInfo.adminname = res.data.data.adminname
                  adminInfo.sid = res.data.data.sid
                  adminInfo.sort = res.data.data.sort
                  adminInfo.shopname = res.data.data.shopname

                  that.globalData.adminInfo = adminInfo
                  typeof cb == "function" && cb(that.globalData.adminInfo)
                
              }
            }
          })
        }
      })
    }
  },
  onLaunch: function () {
    
  },
  alert: function(msg){
    wx.showModal({
      title: '提示',
      content: msg,
      showCancel: false
    })  
  }
})