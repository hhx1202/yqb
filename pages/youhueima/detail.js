var app = getApp()
const post = require('../../utils/post')
const util = require('../../utils/util')
Page({
    data: {
        detail:null
    },
    bindViewUse: function () {
      // 使用兑换码
      if (this.data.detail == null){
        app.alert("兑换码不存在")
      }
      var postData = {}
      postData.id = this.data.detail.id
      post(app.API.use, postData)
        .then(res => {
          
        })
    },
    onLoad: function(options) {
      this.data.id = options.id

      var postData = {}
      postData.id = options.id
      
      post(app.API.detail, postData)
        .then(res => {
          console.log(res.data)
          if (res.data.state){
            var detail = res.data.data
            
            detail.overtime = util.timestampToDate(detail.overtime)
            this.data.detail = detail
            this.setData({
              detail: this.data.detail
            });
          }else{
            app.alert(res.data.message)
          }
        })


    }

})