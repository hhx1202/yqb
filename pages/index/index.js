//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '扫一扫',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  bindViewScan: function () {
    // 只允许从相机扫码
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        var code = res.result;
        wx.navigateTo({ url: "../youhueima/list_scan?code=" + code })
      }
    })
  },
  onLoad: function () {
    console.log('index onLoad')
    var that = this;
    app.getAdminInfo(function (adminInfo) {
      console.log(adminInfo)
      console.log('adminid:' + adminInfo.adminid)
      if (!adminInfo.adminid) {
        wx.redirectTo({ url: "../user/bind" })
      }
    })
  }
})
