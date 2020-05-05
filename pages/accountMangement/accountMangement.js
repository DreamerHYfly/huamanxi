// pages/accountMangement/accountMangement.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    passwordReCheckShow: false,
    passwordCheckShow: false,
    passwordError: false,
    password: false
  },

  old_password: function(e) {
    var value = e.detail.value
    if (/^\w{6,12}$/.test(value)) {
      this.setData({
        password: false
      })
      wx.request({
        url: 'https://www.wshuai.club:8088/huamanxi_wx/loginRegisterController/checkPassword?password=' + value,
        header: {
          'content-type': 'application/json',
          'cookie': wx.getStorageSync('sessionid')
        },
        success: res => {
          console.log(res.data + '--' + value)
          if (res.data) {
            this.setData({
              passwordError: false
            })
          } else {
            this.setData({
              passwordError: true
            })
          }
        }
      })
    } else {
      this.setData({
        password: true
      })
    }
  },

  new_password: function(e) {
    var value = e.detail.value
    this.setData({
      userPassword: value
    })
    if (!(/^\w{6,12}$/.test(value))) {
      this.setData({
        passwordCheckShow: true
      })
    } else {
      this.setData({
        passwordCheckShow: false
      })
    }
  },

  re_password: function(e) {
    var value = e.detail.value
    if (value != this.data.userPassword) {
      this.setData({
        passwordReCheckShow: true
      })
    } else {
      this.setData({
        passwordReCheckShow: false
      })
    }
  },


  formSubmit: function(e) {
    console.log(e);
    if (this.data.passwordReCheckShow == false && this.data.passwordCheckShow == false && this.data.passwordError == false && this.data.password == false) {
      wx.request({
        url: 'https://www.wshuai.club:8088/huamanxi_wx/loginRegisterController/resetPassword?password=' + e.detail.value.userPassword,
        header: {
          'content-type': 'application/json',
          'cookie': wx.getStorageSync('sessionid')
        },
        success: res => {
          wx.showToast({
            success:true,
            title: '修改成功',
          })
        }
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.request({
      url: 'https://www.wshuai.club:8088/huamanxi_wx/pageController/ifLogin',
      header: {
        'content-type': 'application/json',
        'cookie': wx.getStorageSync('sessionid')
      },
      success: res => {
        if (res.data == false) {
          wx.navigateTo({
            url: '/pages/login/login'
          })
        }
      }
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