var app = getApp()
Page({
    data: {
        id:null
    },
    onLoad: function(options) {
      this.data.id = options.id
      this.setData({
        id: this.data.id
      });
    }

})