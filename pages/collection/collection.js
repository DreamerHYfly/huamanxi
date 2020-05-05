// pages/collection/collection.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: 0,
    tab: 0,
    poemBackground: false,
    poemAppreciation: true,
    poemAnnotation: false,
    authorIntroduction: false,
    authorLife: false,
    authorContent: true,
    poemElementNum: '0',
    authorElementNum: '0',
    poem: [{
      poemId: '123',
      poemauthorId: '',
      poemTitle: '静夜思',
      peomDynasty: '唐代',
      poemAuthor: '李白',
      poemPoetry: '窗前明月光，疑是地上霜。\n举头望明月，低头思故乡。\n',
      interpretationContent: '译文\n明亮的月光洒在床前的窗户纸上，好像地上泛起了一层霜。 我禁不住抬起头来，看那天窗外空中的一轮明月，不由得低头沉思，想起远方的家乡。 韵译 皎洁月光洒满床，恰似朦胧一片霜。 仰首只见月一轮，低头教人倍思乡。\n\n注释\n⑴静夜思：静静的夜里，产生的思绪 。 ⑵床：今传五种说法。 一指井台。已经有学者撰文考证过。中国教育家协会理事程实将考证结果写成论文发表在刊物上，还和好友创作了《诗意图》。 二指井栏。从考古发现来看，中国最早的水井是木结构水井。古代井栏有数米高，成方框形围住井口，防止人跌入井内，这方框形既像四堵墙，又像古代的床。因此古代井栏又叫银床，说明井和床有关系，其关系的发生则是由于两者在形状上的相似和功能上的类同。古代井栏专门有一个字来指称，即“韩”字。《说文》释“韩”为“井垣也”，即井墙之意。 三“床”即“窗”的通假字。',
      appreciationContent: '鉴赏\n这首诗写的是在寂静的月夜思念家乡的感受。 　　诗的前两句，是写诗人在作客他乡的特定环境中一刹那间所产生的错觉。一个独处他乡的人，白天奔波忙碌，倒还能冲淡离愁，然而一到夜深人静的时候，心头就难免泛起阵阵思念故乡的波澜。何况是在月明之夜，更何况是月色如霜的秋夜。“疑是地上霜”中的“疑”字，生动地表达了诗人睡梦初醒，迷离恍惚中将照射在床前的清冷月光误作铺在地面的浓霜。而“霜”字用得更妙，既形容了月光的皎洁，又表达了季节的寒冷，还烘托出诗人飘泊他乡的孤寂凄凉之情。',
      backgroundContent: '创作背景\n李白《静夜思》一诗的写作时间是公元726年（唐玄宗开元之治十四年）旧历九月十五日左右。李白时年26岁，写作地点在当时扬州旅舍。其《秋夕旅怀》诗当为《静夜思》的续篇，亦同时同地所作。李白在一个月明星稀的夜晚，诗人抬望天空一轮皓月，思乡之情油然而生，写下了这首传诵千古、中外皆知的名诗《静夜思》。 版本说明 明代版本 　　这是目前流传比较广泛的版本。该版本虽然可能不完全是李白的原作，有个别字词后世或有所修改，但是流传度很高，并被收录于各版本的语文教科书中。',
      authorContent: '李白《静夜思》一诗的写作时间是公元726年（唐玄宗开元之治十四年）旧历九月十五日左右。李白时年26岁，写作地点在当时扬州旅舍。',
      authorImg: '/images/sushi.jpg'
    }, ],
    author: [{

    }]
  },
  // 页面切换
  changeItem: function(e) {
    this.setData({
      item: e.target.dataset.item,
    })
  },
  // tab切换
  changeTab: function(e) {
    this.setData({
      tab: e.detail.current
    })
  },


  toPoemDetail: function(e) {
    console.log(e.currentTarget.dataset.id)
    var that = this;
    wx.navigateTo({
      url: '/pages/poemDetail/poemDetail?poemId=' + e.currentTarget.dataset.id,
    })
  },
  toAuthorDetail: function(e) {
    var that = this;
    wx.navigateTo({
      url: '/pages/authorDetail/authorDetail?authorId=' + e.currentTarget.dataset.id,
    })
  },


  prePoem: function(e) {
    if (this.data.poemElementNum == 0) {
      this.setData({
        prePoemHide: true
      })
    } else {
      this.setData({
        prePoemHide: false
      });
      console.log(this.data.poemElementNum - 5)
      wx.request({
        url: 'https://www.wshuai.club:8088/huamanxi_wx/pageController/toPoemCollectedPage?poemElementNum=' + (this.data.poemElementNum - 5),
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
            console.log(res.data.poemElementNum)
            this.setData({
              poem: res.data.poetryPagePoems,
              poemElementNum: res.data.poemElementNum
            })
          }
        },
        complete: res => {
          console.log(res)
        }
      })
    }
  },
  nextPoem: function(e) {
    console.log(this.data.poemElementNum + 5)
    if (this.data.poemElementNum >= 50) {
      this.setData({
        nextPoemHide: true
      })
    } else {
      this.setData({
        nextPoemHide: false
      });
      wx.request({
        url: 'https://www.wshuai.club:8088/huamanxi_wx/pageController/toPoemCollectedPage?poemElementNum=' + (this.data.poemElementNum + 5),
        header: {
          'content-type': 'application/json',
          'cookie': wx.getStorageSync('sessionid')
        },
        success: res => {
          console.log(res.data.poemElementNum);
          if (res.data == false) {
            wx.navigateTo({
              url: '/pages/login/login'
            })
          } else {
            this.setData({
              poem: res.data.poetryPagePoems,
              poemElementNum: res.data.poemElementNum
            })
          }
        }
      })
    }
  },



  preAuthor: function(e) {
    if (this.data.authorElementNum == 0) {} else {
      wx.request({
        url: 'https://www.wshuai.club:8088/huamanxi_wx/pageController/toAuthorCollectedPage?authorElementNum=' + (this.data.authorElementNum - 5),
        header: {
          'content-type': 'application/json',
          'cookie': wx.getStorageSync('sessionid')
        },
        success: res => {
          console.log(res.data.authorElementNum)
          if (res.data == false) {
            wx.navigateTo({
              url: '/pages/login/login'
            })
          } else {
            this.setData({
              author: res.data.authorPageAuthors,
              authorElementNum: res.data.authorElementNum
            })
          }
        },
        complete: res => {
          console.log(res)
        }
      })
    }
  },
  nextAuthor: function(e) {
    if (this.data.authorElementNum >= 50) {} else {
      wx.request({
        url: 'https://www.wshuai.club:8088/huamanxi_wx/pageController/toAuthorCollectedPage?authorElementNum=' + (this.data.authorElementNum + 5),
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
            console.log(res.data.authorElementNum);
            this.setData({
              author: res.data.authorPageAuthors,
              authorElementNum: res.data.authorElementNum
            })
          }
        }
      })
    }
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
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
      header: {
        'content-type': 'application/json',
        'cookie': wx.getStorageSync('sessionid')
      },
      url: 'https://www.wshuai.club:8088/huamanxi_wx/pageController/toPoemCollectedPage',
      success: res => {
        if (res.data == false) {
          wx.navigateTo({
            url: '/pages/login/login'
          })
        } else {
          this.setData({
            poem: res.data.poetryPagePoems,
          })
        }
      }
    })
    wx.request({
      url: 'https://www.wshuai.club:8088/huamanxi_wx/pageController/toAuthorCollectedPage',
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
            author: res.data.authorPageAuthors
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