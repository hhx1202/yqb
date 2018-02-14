var app = getApp()
Page({
  data: {},
  loginBtnClick: function () {
    var postData = {}
    postData.adminid = app.globalData.adminInfo.adminid


    wx.request({
      url: app.API.unbind,
      data: postData,
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        if (res.data.state){
          wx.redirectTo({ url: "bind" })
        }else{
          app.alert(res.data.message)
        }
      },
      fail: function () {
      }
    })
  },
  onLoad: function () {
  }
})