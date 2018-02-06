var app = getApp()
Page({
  data: {},
  loginBtnClick: function () {
    console.log("用户名：" + this.data.username + " 密码：" + this.data.password);
    var username = this.data.username
    var password = this.data.password
    if (username == '' || password == ''){
      app.alert('请输入帐号或密码');
    }

    var data = {}
    data.adminid = app.globalData.adminInfo.adminid


    wx.request({
      url: app.API.unbind,
      data:data,
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        wx.redirectTo({ url: "bind" })
      },
      fail: function () {
      }
    })
  },
  onLoad: function () {
  }
})