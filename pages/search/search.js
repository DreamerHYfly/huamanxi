// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: "",
    imgType1:false,
    imgType2:false,
    imgType3:false,
    authorType: [
      '李白', '杜甫', '苏轼', '王维', '杜牧', '陆游', '李煜', '元稹', '韩愈', '岑参', '齐己', '贾岛', '柳永', '曹操', '李贺', '曹植', '张籍', '孟郊', '皎然', '许浑', '罗隐', '贯休', '韦庄', '屈原', '王勃', '张祜', '王建', '晏殊', '岳飞', '姚合', '卢纶', '秦观', '钱起', '朱熹', '韩偓', '高适', '方干', '李峤', '赵嘏', '贺铸', '郑谷', '郑燮', '张说', '张炎', '白居易', '辛弃疾', '李清照', '刘禹锡', '李商隐', '陶渊明', '孟浩然', '柳宗元', '王安石', '欧阳修', '韦应物', '温庭筠', '刘长卿', '王昌龄', '杨万里', '诸葛亮', '范仲淹', '陆龟蒙', '晏几道', '周邦彦', '杜荀鹤', '吴文英', '马致远', '皮日休', '左丘明', '张九龄', '权德舆', '黄庭坚', '司马迁', '皇甫冉', '卓文君', '文天祥', '刘辰翁', '陈子昂'
    ],
    sceneryType: [
      
      '写景', '咏物', '春天', '夏天', '秋天', '冬天', '写雨', '写雪', '写风', '写花', '梅花', '荷花', '桃花', '菊花', '柳树', '月亮', '山水', '写山', '写水', '长江', '黄河', '儿童', '写鸟', '写马', '田园', '边塞', '地名', '抒情', '爱国', '离别', '送别', '思乡', '思念', '爱情', '励志', '讽刺', '哲理', '闺怨', '悼亡', '写人', '老师', '母亲', '友情', '战争', '读书', '生活', '惜时', '婉约', '豪放', '诗经', '民谣', '节日','春节'
    ],
    dynastyType: [
      '先秦', '两汉', '魏晋', '南北朝', '隋代', '唐代', '五代', '宋代', '金朝', '元代', '明代', '清代', '近代', '现代', '未知'
    ]
  },
  showInput: function() {
    this.setData({
      inputShowed: true
    });

  },
  hideInput: function() {
    this.setData({
      inputVal: "",
      inputShowed: false
    });

  },
  clearInput: function() {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function(e) {
    this.setData({
      inputVal: e.detail.value
    });
  },

  search: function(e) {
    var value = e.detail.value; // 搜索的内容
    wx.navigateTo({
      url: '/pages/poemlistSearch/poemlistSearch?searchValue=' + value,
    })
  },

  toSearchTag: function (e) {
    var value = e.currentTarget.dataset.text;
    wx.navigateTo({
      url: '/pages/poemlist/poemlist?searchValue=' + value + '&stype=Tag',
    })
  },
  toSearchAuthor: function (e) {
    var value = e.currentTarget.dataset.text;
    wx.navigateTo({
      url: '/pages/poemlist/poemlist?searchValue=' + value + '&stype=Author',
    })
  },
  toSearchDynasty: function (e) {
    var value = e.currentTarget.dataset.text;
    wx.navigateTo({
      url: '/pages/poemlist/poemlist?searchValue=' + value + '&stype=Dynasty',
    })
  },



  selectShow:function(e){
    
    var id = e.target.dataset.id;
    var idLen = id.charAt(id.length - 1);
    switch (idLen){
      
      case '1': this.setData({
        
        imgType1:!this.data.imgType1
      });break;
      case '2':this.setData({
        imgType2:!this.data.imgType2
      });break;
      case '3': this.setData({
        imgType3: !this.data.imgType3
      });break;
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