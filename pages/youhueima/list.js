var app = getApp()
const post = require('../../utils/post')
const util = require('../../utils/util')
Page({
    data: {
      showNoData:false,
      total:0,
      list:null
    },
    onLoad: function(options) {
      this.setData({
        showNoData: this.data.showNoData
      });
      
      var postData = {}
      postData.adminid = app.globalData.adminInfo.adminid

      post(app.API.list, postData)
        .then(res => {
          console.log(res.data)
          if (res.data.state) {
            var total = res.data.total
            var list = res.data.list
            if (total < 1){
              this.data.showNoData = true
            }

            this.data.total = total
            this.data.list = list
            this.setData({
              showNoData: this.data.showNoData,
              list: this.data.list
            });
          } else {
            app.alert(res.data.message)
          }
        })
    }
})