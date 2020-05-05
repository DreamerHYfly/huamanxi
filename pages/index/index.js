//index.js
//获取应用实例
const util = require('../../utils/util.js')
const app = getApp();
const myaudio = wx.createInnerAudioContext({});
Page({
  data: {
    date: '2020-04-19',
    poem: [{
      poemId: '',
      poemTitle: '',
      poemDynasty: '',
      poemAuthor: '',
      poemContent: ''
    }]

  },
  //事件处理函数

  allSearch: function() {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  toPoemDetail: function(e) {
    wx.navigateTo({
      url: '/pages/poemDetail/poemDetail?poemId=' + e.currentTarget.dataset.id,
    })
  },
  

  onLoad: function() {
    this.setData({
      date: util.formatTime(new Date())
    })
    
  },
  onShow:function(){
    var that = this;
    wx.request({
      url: 'https://www.wshuai.club:8088/huamanxi_wx/pageController/loadHomePage',
      header: {
        'content-type': 'application/json',
        'cookie': wx.getStorageSync('sessionid')
      },
      success: res => {
        that.setData({
          poem: res.data
        })
      }
    })
  }

})