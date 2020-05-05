// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: false,
    userPassword: false,
    userCheckShow:false,
    passwordCheckShow: false
  },


  userCheck: function(e) {
    var value = e.detail.value
    if(!(/^\w{3,10}$/.test(value))){
      this.setData({
        userCheckShow: true
      })
      
    }
    else {
      this.setData({
        userCheckShow: false
      })
    }
  },

  passwordCheck:function(e){
    var value = e.detail.value
    if (!(/^\w{6,12}$/.test(value))) {
      this.setData({
        passwordCheckShow: true
      })
    }
    else {
      this.setData({
        passwordCheckShow: false
      })
    }
  },

  confirm: function() {
    this.setData({
      'dialog.hidden': true,
      'dialog.title': '',
      'dialog.content': ''
    })
  },
  login: function(params) {
    wx.showToast({
      title: '登录中',
      icon: 'loading'
    })

    wx.request({
      url: 'https://www.wshuai.club:8088/huamanxi_wx/loginRegisterController/userLogin',
      data: params,
      success: res => {
        wx.removeStorageSync('sessionid');
        wx.setStorageSync("sessionid", res.header["Set-Cookie"]);
        if (res.data) {
          // 成功
          wx.hideToast();
          wx.navigateBack({

          })
        } else {
          // 失败
          wx.showModal({
            title: '登录失败',
            content: '账号或密码不正确',
            confirmColor: '#b02923',
            showCancel: false
          })
        }
      },
      complete: res => {
        // console.log(params);
      }
    })
  },

  formSubmit: function(e) {
    let that = this;
    let userName = e.detail.value.userName;
    let userPassword = e.detail.value.userPassword;
    if (userName == '') {
      this.setData({
        userName: true,
      })
      return false;
    } else {
      this.setData({
        userName: false,
      })
    }
    if (userPassword == '') {
      this.setData({
        userPassword: true,
      })
      return false;
    } else {
      this.setData({
        userPassword: false,
      })
    }
    // if (userName !== 'vanke' && userPassword !== '123456') {

    //   return false;
    // }
    let params = {
      'username': userName,
      'password': userPassword
    }
    that.login(params);
  },

  toRegiste: function(e) {
    wx.navigateTo({
      url: '/pages/registe/registe',
    })

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