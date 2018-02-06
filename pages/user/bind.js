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
    console.log("用户名：" + this.data.username + " 密码：" + this.data.password);
    var username = this.data.username
    var password = this.data.password
    if (username == '' || password == ''){
      app.alert('请输入帐号或密码');
    }

    var data = {}
    data.username = username
    data.password = password


    wx.request({
      url: app.API.bind,
      data:data,
      method: 'POST',
      success: function (res) {
      },
      fail: function () {
      }
    })
  },
  onLoad: function () {
    console.log('onLoad bind')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo,
        title: app.globalData.title
      })
    })
  }
})