// pages/user/user.js
const util = require('../../utils/util.js');
const app = getApp();
var openid = wx.getStorageSync("openid");


Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasUserInfo: openid == "",
    userInfo: {},
    islogin: false,
    date:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      date: util.formatTime(new Date())
    })

    var that = this;
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

        } else {
          that.setData({
            islogin: false
          })
        }
      }
    })
  },

  collection: function() {
    wx.navigateTo({
      url: "../collection/collection?title=我的收藏"
    })
  },
  changePassword: function() {
    wx.navigateTo({
      url: "../accountMangement/accountMangement?title=修改密码"
    })
  },

  toLogin: function(e) {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },


  LogOut: function() {
    var that = this;
    wx.request({
      url: 'https://www.wshuai.club:8088/huamanxi_wx/loginRegisterController/userLogout',
      header: {
        'content-type': 'application/json',
        'cookie': wx.getStorageSync('sessionid')
      },
      success: res => {
        if (res.data) {
          wx.showToast({
            success: 'ture',
            title: '退出成功',
          })
          that.setData({
            islogin: true
          })
        }
      }
    })
  },


  allSearch: function() {
    wx.navigateTo({
      url: '/pages/search/search',
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
    var that = this;
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
          that.setData({
            islogin: true
          })
        } else {
          that.setData({
            islogin: false
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