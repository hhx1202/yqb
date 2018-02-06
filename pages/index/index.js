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
        wx.navigateTo({ url: "../youhueima/list_use?code=" + code })
      }
    })
  },
  onLoad: function () {
    var that = this;
    console.log('index\tonLoad')
    app.getAdminInfo(function (adminInfo) {
      console.log(adminInfo)
      if (adminInfo.adminid == undefined || adminInfo.adminid == '') {
        //wx.redirectTo({ url: "../bind/bind" })
      }
      //app.alert(adminInfo.openid")
      //that.setData({ userInfo: userInfo, hasUserInfo:true})
    })
  }
})
