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
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindViewScan: function () {
    // 只允许从相机扫码
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        console.log(res)
        
        wx.showToast({
          title: res.result,
          icon: 'success',
          duration: 2000
        })
      }
    })
  },
  onLoad: function () {
    var that = this;
    console.log('user index onLoad')
    app.getUserInfo(function (userInfo) {
      console.log(userInfo)
      that.setData({ userInfo: userInfo, hasUserInfo:true})
    })
  }
})
