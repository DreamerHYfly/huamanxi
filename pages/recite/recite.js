// pages/recite/recite.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    poemId: '',
    poem: {},
    inputcon: '',
    answer: [],
    result: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      poemId: options.poemId
    })
  },
  Refresh: function (e) {
    this.setData({
      inputcon: e.detail.value
    })
  },

  recitation: function () {
    var that = this;
    let fault = 0;
    let rightPoem = this.data.poem.poemContent || '';
    rightPoem = rightPoem.replace(/\s/g, "");
    let rightPoemArray = [];
    rightPoemArray = rightPoem.split("");
    let poem = this.data.inputcon;
    let poemArray1 = [];
    let poemArray2 = [];
    let answer = "";
    let finalPoem = "";
    finalPoem = poem.replace(/\s/g, "");
    poemArray2 = finalPoem.split("");
    for (let j = 0, k = 0; poemArray2.length > j && j < rightPoemArray.length; j++ , k++) {
      //先把少标点符号的情况给确定了
      if ((rightPoemArray[j] == '，' || rightPoemArray[j] == '。' || rightPoemArray[j] == '？' || rightPoemArray[j] == '！' || rightPoemArray[j] == '——') && rightPoemArray[j] != poemArray2[k]) {
        //判断末尾少符号的情况
        if (typeof (poemArray2[k]) == "undefined") {
          // poemArray2[k] = "<span style='color: red;'>" + k + "</span>";
          answer += (k + "->" + rightPoemArray[j] + "；");
          fault++;
        } else {
          //这是符号错误的情况
          if (poemArray2[k] == '，' || poemArray2[k] == '。' || poemArray2[k] == '！' || poemArray2[k] == '？') {
            // poemArray2[k] = "<span style='color: red;'>" + poemArray2[k] + "</span>";
            answer += (poemArray2[k] + "->" + rightPoemArray[j] + "；");
            fault++;
          } else {
            //这是不是标点符号的情况
            //判断末尾不是标点符号是其他字符的情况
            if (typeof (poemArray2[k + 1]) == "undefined") {
              // poemArray2[k] = "<span style='color: red;'>" + poemArray2[k] + "</span>";
              answer += (poemArray2[k] + "->" + rightPoemArray[j] + "；");
              fault++;
            } else {
              // poemArray2[k] = "<span style='color: red;'>" + poemArray2[k] + "</span>";
              answer += (poemArray2[k] + "字前面缺" + rightPoemArray[j] + "号；");
              fault++;
              //判断是否符号后面的字也错了，注意这里poemArray2[k]已经标红了
              let tem = j + 1;
              if (typeof (rightPoemArray[tem]) !== "undefined" && rightPoemArray[tem] !== poemArray2[k]) {
                answer += (poemArray2[k] + "->" + rightPoemArray[tem] + "；");

                fault++;
              }
              j++;
            }
          }
        }
      } else {
        if (rightPoemArray[j] != poemArray2[k]) {
          //判断末尾
          if (typeof (poemArray2[k]) == "undefined") {
            // poemArray2[k] = "<span style='color: red;'>" + k + "</span>";

            answer += (k + "->" + rightPoemArray[j] + "；");
            fault++;
          } else {
            // poemArray2[k] = "<span style='color: red;'>" + poemArray2[k] + "</span>";
            answer += (poemArray2[k] + "->" + rightPoemArray[j] + "；");
            fault++;
          }
        }
      }
    }


    var content = "";
    if (poemArray2.length != rightPoemArray.length) {
      content = "未背诵完整";
    } else {
      if (fault) {
        content = "有" + fault + "处错误";
      } else {
        content = "恭喜背诵正确！！！";
      }
    }


    wx.showToast({
      title: content
    })




    let resultPoem = "";
    for (let i = 0; i < poemArray2.length; i++) {
      resultPoem += poemArray2[i];
    }

    this.setData({
      result: resultPoem,
      answer: answer.split('；')
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    wx.request({
      url: 'https://www.wshuai.club:8088/huamanxi_wx/pageController/toRecitationPage?poemId=' + (this.data.poemId || 1),
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
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})