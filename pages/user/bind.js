var app = getApp()
Page({
  data: {
    username: '',
    password: ''
  },
  bindInputUsername: function (e) {
    this.setData({username: e.detail.value})
  },
  bindInputPassword: function (e) {
    this.setData({ password: e.detail.value })
  },
  loginBtnClick: function () {
    //console.log("用户名：" + this.data.username + " 密码：" + this.data.password);
    var username = this.data.username
    var password = this.data.password
    if (username == '' || password == ''){
      app.alert('请输入帐号或密码');
      return
    }

    var data = {}
    data.username = username
    data.password = password
    if (app.globalData.adminInfo){
      data.openid = app.globalData.adminInfo.openid
    }

    wx.request({
      url: app.API.bind,
      data:data,
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        console.log(res)
        if (!res.data.state){
          app.alert(res.data.message)
        }else{
          //app.alert(res.data.message)
          app.globatData.adminInfo = null
          wx.redirectTo({ url: "../index/index" })
        }
        return
      }
    })
  },
  onLoad: function () {
    console.log('onLoad bind')
  }
})