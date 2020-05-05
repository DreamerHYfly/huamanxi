// pages/poemDetail/poemDetail.js
const myaudio = wx.createInnerAudioContext({});
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isCollectionPoem: '1',
    audioCount: 0,
    poemId: '',
    poem: {},
    similarPoems: [{

    }],
    poemBackground: false,
    poemAppreciation: false,
    poemAnnotation: false,
    mainBody: true,
  },


  doTTS: function() {
    var that = this;
    console.log(this.data.audioCount);
    // myaudio.src = "http://tsn.baidu.com/text2audio?lan=zh&ie=UTF-8&per=4&spd=4&text=" + this.data.poem.poemTitle + '。' + this.data.poem.poemDynasty + '。' + this.data.poem.poemAuthor + '。' + this.data.poem.poemContent;




    myaudio.src = 'https://tsn.baidu.com/text2audio?lan=zh&tex=' + encodeURIComponent(encodeURIComponent('' + this.data.poem.poemTitle + '。' + this.data.poem.poemDynasty + '。' + this.data.poem.poemAuthor + '。' + this.data.poem.poemContent)) + '&ctp=1&cuid=D4-3B-04-CA-CD-E9&tok=25.02d5dd232fe8050901bdf96325d7f933.315360000.1902628568.282335-18577324&vol=9&per=106&spd=4&pit=5&aue=3';
    if (that.data.audioCount % 2 == 0) {
      myaudio.play();

      that.setData({
        audioCount: that.data.audioCount += 1
      })
    } else {
      myaudio.pause();
      that.setData({
        audioCount: that.data.audioCount += 1
      })
    }


  },

  isCollectionPoem: function(e) {
    if (this.data.isCollectionPoem == 0) {
      this.setData({
        isCollectionPoem: 1
      })
      wx.request({
        url: 'https://www.wshuai.club:8088/huamanxi_wx/pageController/collectPoem?poemId=' + this.data.poem.poemId + '&collection=' + this.data.isCollectionPoem,
        header: {
          'content-type': 'application/json',
          'cookie': wx.getStorageSync('sessionid')
        },
        success: res => {
          wx.showToast({
            success: true,
            title: '取消收藏成功',
          })
        }
      })
    } else {
      this.setData({
        isCollectionPoem: 0
      })
      wx.request({
        url: 'https://www.wshuai.club:8088/huamanxi_wx/pageController/collectPoem?poemId=' + this.data.poem.poemId + '&collection=' + this.data.isCollectionPoem,
        header: {
          'content-type': 'application/json',
          'cookie': wx.getStorageSync('sessionid')
        },
        success: res => {
          wx.showToast({
            success: true,
            title: '收藏成功',
          })
        }
      })
    }


  },


  thisSelect: function(e) {
    // console.log(e.currentTarget.dataset.index);
    var index = e.currentTarget.dataset.index;
    switch (index) {
      case '1':
        {
          this.setData({
            poemBackground: true,
            poemAppreciation: false,
            poemAnnotation: false,
            authorIntroduction: false,
            mainBody: false,
          })
        };
        break;
      case '2':
        {
          this.setData({
            poemBackground: false,
            poemAppreciation: true,
            poemAnnotation: false,
            authorIntroduction: false,
            mainBody: false,
          })
        };
        break;
      case '3':
        {
          this.setData({
            poemBackground: false,
            poemAppreciation: false,
            poemAnnotation: true,
            authorIntroduction: false,
            mainBody: false,
          })
        };
        break;
      case '4':
        {
          wx.navigateTo({
            url: '/pages/authorDetail/authorDetail?authorId=' + this.data.poem.poemAuthorId,
          })
        };
        break;
      case '5':
        {
          wx.navigateTo({
            url: '/pages/recite/recite?poemId=' + this.data.poem.poemId,
          })
        };
        break;
      case '7':
        {
          this.setData({
            poemBackground: false,
            poemAppreciation: false,
            poemAnnotation: false,
            mainBody: true,
          })
        };
        break;
    }
  },


  toPoemDetail: function(e) {
    var that = this;
    console.log(e)
    wx.navigateTo({
      url: '/pages/poemDetail/poemDetail?poemId=' + e.currentTarget.dataset.id,
    })
  },
  toAuthorDetail: function(e) {
    console.log(e)
    var that = this;
    wx.navigateTo({
      url: '/pages/authorDetail/authorDetail?authorId=' + e.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      poemId: options.poemId
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    wx.request({
      url: 'https://www.wshuai.club:8088/huamanxi_wx/pageController/toPoemDetails?poemId=' + this.data.poemId,
      header: {
        'content-type': 'application/json',
        'cookie': wx.getStorageSync('sessionid')
      },
      success: res => {
        if (res.data == false) {
          wx.navigateTo({
            url: '/pages/login/login'
          })
        } else {
          this.setData({
            poem: res.data.poem,
            isCollectionPoem: res.data.collected ? '0' : '1',
            similarPoems: res.data.similarPoems
          })
          wx.setNavigationBarTitle({
            title: this.data.poem.poemTitle,
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})