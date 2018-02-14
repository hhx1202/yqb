const app = getApp()
const fetch = require('../../utils/fetch')

Page({
  data: {
    showNoData: false,
    total: 0,
    list: null
  },
  onLoad: function(options) {
    var code = options.code; // 客户的二维码
      // 如何查询到单个兑换码，那么直接跳到详情页面
    //var code = 'http://weixin.qq.com/q/ckizCJHlO_lCI9Gm3mA6'

    var data = {}
    data.qrcode = code
    data.openid = 'okFKG5Cj4oMvogHjDT8zfBFGxrqo'
    fetch(app.API.scan, data, 'POST', {'content-type': 'application/x-www-form-urlencoded'})
    .then(res => {
      console.log(res.data)
      if (res.data.state){
        var total = res.data.total
        var list = res.data.list
        console.log(list)
        if (total < 1) {
          this.data.showNoData = true
        }

        if (total == 10){
          // 单个走你
          var id = list[0]['id']
          //wx.navigateTo({ url: "detail?id=" + id })
        }else{
          this.setData({
            showNoData: this.data.showNoData,
            list: list
          });
        }
      }else{
        app.alert(res.data.message)
      }
    })
      
      var id = 1;
      //wx.navigateTo({ url: "detail?id=" + id })
  }
})