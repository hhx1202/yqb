var app = getApp()
Page({
    data: {
      
    },
    onLoad: function(options) {
      console.log(options.code)
      var code = options.code;
      // 如何查询到单个兑换码，那么直接跳到详情页面
      var id = 1;
      wx.navigateTo({ url: "detail?id=" + id })
    }
})