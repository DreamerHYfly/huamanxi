// pages/authorDetail/authorDetail.js

const audioRecitation = wx.createInnerAudioContext({});
Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorId: '',
    isCollectionAuthor: 1,
    audioCount: 0,
    authorImg: '',
    authorName: '',
    authordescContent: '',
    authorIntroduceContent: '',
  },

  doTTS: function() {
    var that = this;
    console.log(that.data)
    audioRecitation.src = 'https://tsn.baidu.com/text2audio?lan=zh&tex=' + encodeURIComponent(encodeURIComponent(''+this.data.authorName + "。作者简介。" + this.data.authordescContent))+'&ctp=1&cuid=D4-3B-04-CA-CD-E9&tok=25.02d5dd232fe8050901bdf96325d7f933.315360000.1902628568.282335-18577324&vol=9&per=106&spd=4&pit=5&aue=3';
    // audioRecitation.src = "http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&per=4&spd=4&text=你好";
    if (that.data.audioCount % 2 == 0) {
      audioRecitation.play();
      that.setData({
        audioCount: that.data.audioCount += 1
      })
    } else {
      audioRecitation.pause();
      that.setData({
        audioCount: that.data.audioCount += 1
      })
    }
  },


  isCollectionAuthor: function(e) {
    if (this.data.isCollectionAuthor == 0) {
      this.setData({
        isCollectionAuthor: 1
      })
      wx.request({
        url: 'https://www.wshuai.club:8088/huamanxi_wx/pageController/collectAuthor?authorId=' + this.data.authorId + '&collection=1',
        header: {
          'content-type': 'application/json',
          'cookie': wx.getStorageSync('sessionid')
        },
        success: res => {
          console.log(res.data)
          console.log(this.data.isCollectionAuthor)
          wx.showToast({
            success: true,
            title: '取消收藏成功',
          })
        }
      })
    } else {
      this.setData({
        isCollectionAuthor: 0
      })
      wx.request({
        url: 'https://www.wshuai.club:8088/huamanxi_wx/pageController/collectAuthor?authorId=' + this.data.authorId + '&collection=0',
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
      case '5':
        {
          this.setData({
            authorIntroduction: !this.data.authorIntroduction
          })
        };
        break;
      case '6':
        {
          this.setData({
            authorLife: !this.data.authorLife
          })
        };
        break;

    }
  },

  reSetImage: function(e) {
    this.setData({
      authorImg: '/images/sushi.png'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      authorId: options.authorId
    }),
    wx.request({
      url: 'https://www.wshuai.club:8088/huamanxi_wx/pageController/toAuthorDetails?authorId=' + options.authorId,
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
            isCollectionAuthor: res.data.collected ? '0' : '1',
            authorId: res.data.author.authorId,
            authorName: res.data.author.authorName,
            authordescContent: res.data.author.authorDesc,
            authorIntroduceContent: res.data.author.authorIntro.replace(/\s/g, '').replace(/<[^>]+>/g, ''),
            authorImg: 'http://175.24.30.126:8089/huamanxi/img/poet/' + res.data.author.authorImg

          })
          wx.setNavigationBarTitle({
            title: this.data.authorName,
          })
        }
      }
    })

    wx.setNavigationBarTitle({
      title: this.data.authorName
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
      url: 'https://www.wshuai.club:8088/huamanxi_wx/pageController/toAuthorDetails?authorId=' + this.data.authorId,
      header: {
        'content-type': 'application/json',
        'cookie': wx.getStorageSync('sessionid')
      },
      success: res => {
        if (res.data == false) {
          // wx.navigateTo({
          //   url: '/pages/login/login'
          // })
        } else {
          this.setData({
            isCollectionAuthor: res.data.collected ? '0' : '1',
            authorId: res.data.author.authorId,
            authorName: res.data.author.authorName,
            authordescContent: res.data.author.authorDesc,
            authorIntroduceContent: res.data.author.authorIntro.replace(/\s/g, '').replace(/<[^>]+>/g, ''),
            authorImg: 'http://175.24.30.126:8089/huamanxi/img/poet/' + res.data.author.authorImg

          })
          wx.setNavigationBarTitle({
            title: this.data.authorName,
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