var app = getApp()
const post = require('../../utils/post')
const util = require('../../utils/util')
Page({
    data: {
      id:null,
      detail:null,
      canUse:false
    },
    bindViewUse: function () {
      // 使用兑换码
      if (this.data.detail == null){
        app.alert("兑换码不存在")
      }
      var postData = {}
      postData.openid = app.globalData.adminInfo.openid
      postData.id = this.data.id

      var that = this;

      post(app.API.use, postData)
        .then(res => {
          if (res.data.state){
            app.alert("操作成功")
            that.showPage(that.data.id)
          }else{
            app.alert(res.data.message)
          }
        })
    },
    onLoad: function(options) {
      var id = options.id
      this.data.id = id
      this.showPage(id)
    },
    showPage:function(id){
      console.log("showPage:" + id)

      var postData = {}
      postData.id = id

      var that = this;

      post(app.API.detail, postData)
        .then(res => {
          console.log("showPage post")
          console.log(res.data.data)
          if (res.data.state) {
            var detail = res.data.data

            if (detail.state < 1) {
              that.data.canUse = true
            }else{
              that.data.canUse = false
            }

            console.log("showPage canUse " + that.data.canUse)

            detail.overtime = util.timestampToDate(detail.overtime)
            that.data.detail = detail
            that.setData({
              canUse: that.data.canUse,
              detail: that.data.detail
            });
          } else {
            app.alert(res.data.message)
          }
        })
    }
})