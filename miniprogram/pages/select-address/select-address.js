// miniprogram/pages/select-address/select-address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    // AUTH.checkHasLogined().then(isLogined => {
    //   if (isLogined) {
    //     this.initShippingAddress();
    //   } else {
    //     wx.showModal({
    //       title: '提示',
    //       content: '本次操作需要您的登录授权',
    //       cancelText: '暂不登录',
    //       confirmText: '前往登录',
    //       success(res) {
    //         if (res.confirm) {
    //           wx.switchTab({
    //             url: "/pages/my/index"
    //           })
    //         } else {
    //           wx.navigateBack()
    //         }
    //       }
    //     })
    //   }
    // })
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

  },

  addAddess: function() {
    wx.navigateTo({
      url: "/pages/address-add/address-add"
    })
  },

  editAddess: function(e) {
    wx.navigateTo({
      url: "/pages/address-add/index?id=" + e.currentTarget.dataset.id
    })
  },

  initShippingAddress: function() {
    // var that = this;
    // WXAPI.queryAddress(wx.getStorageSync('token')).then(function(res) {
    //   if (res.code == 0) {
    //     that.setData({
    //       addressList: res.data
    //     });
    //   } else if (res.code == 700) {
    //     that.setData({
    //       addressList: null
    //     });
    //   }
    // })
  }
})