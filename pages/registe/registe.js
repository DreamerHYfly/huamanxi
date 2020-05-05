// pages/registe/registe.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: false,
    userPassword: false,
    userEmail: false,
    userVcode: false,
    userRePassword: false,
    userSex: 1,
    userCheckShow: false,
    passwordCheckShow: false,
    userExist: false,
    passwordReCheckShow: false,
    sex: [{
        name: '1',
        value: '男'
      },
      {
        name: '0',
        value: '女',
        checked: 'true'
      }
    ]
  },

  


  userCheck: function(e) {
    var value = e.detail.value
    if (/^\w{3,10}$/.test(value)) {
      this.setData({
        userCheckShow: false
      })
      wx.request({
        url: 'https://www.wshuai.club:8088/huamanxi_wx/loginRegisterController/checkUsername?username=' + e.detail.value,
        success: res => {
          if (!res.data) {
            this.setData({
              userExist: true,
            })
          } else {
            this.setData({
              userExist: false,
            })
          }
        }
      })
    } else {
      this.setData({
        userCheckShow: true
      })
    }
  },

  passwordCheck: function(e) {
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

  passwordReCheck: function(e) {
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

  emailCheck: function(e) {
    var value = e.detail.value
    if ((/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value))) {
      this.setData({
        emailCheck: false
      })
    } else {
      this.setData({
        emailCheck: true
      })
    }
  },

  formSubmit: function(e) {
    var that = this;
    let userName = e.detail.value.userName;
    let userPassword = e.detail.value.userPassword;
    let userEmail = e.detail.value.userEmail;
    let userVcode = e.detail.value.userVcode;
    let userRePassword = e.detail.value.userRePassword;
    if (this.data.userCheckShow == false && passwordCheckShow == false && userExist == false && passwordReCheckShow==false){
      wx.request({
        url: 'https://www.wshuai.club:8088/huamanxi_wx/loginRegisterController/userRegister',
        method: 'post',
        data: {
          'username': userName,
          'userPassword': userPassword,
          'userEmail': userEmail,
          "userSex": that.data.name
        },
        success: res => {
          console.log(res.data + '---' + that.data.name)
          wx.showModal({
            title: '注册成功',
            content: '是否返回登录页面登录',
            showCancel: true,
            success: res => {
              if (res.cancel) {
                //点击取消，隐藏弹框

              } else {
                //点击确定
                wx.navigateTo({
                  url: '/pages/login/login',
                })
              }
            }
          })
        },
        fail: res => {
          wx.showToast({
            title: '失败',
            duration: 2000,
            icon: 'fail',
          })
        }
      })
    }

    



  },




  toLogin: function() {
    wx.navigateTo({
      url: '/pages/login/login',
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