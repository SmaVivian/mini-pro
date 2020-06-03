// miniprogram/pages/to-pay-order/to-pay-order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: [],
    orderPrice: ''
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
    this.getDataList()
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
  getDataList() {
    // wx.showLoading({
    //   "mask": true
    // })
    wx.cloud.callFunction({
      // 云函数名称
      name: 'getCartList',
      // 传给云函数的参数
      data: {
        
      },
      success: (res) => {
        // wx.hideLoading()
        res = res.result
        if (res.success == 1) {//成功
          this.setData({
            dataList: res.data.items,
            price: res.data.price
          })
          this.getOrderPrice(res.data.items)
        } else {//失败
          console.log(res)
        }
      },
      fail: (error) => {
        // wx.hideLoading()
        console.log(error)
      }
      // fail: console.error
    })
  },
  // 订单价格
  getOrderPrice(goodsArr) {
    // wx.showLoading({
    //   "mask": true
    // })
    wx.cloud.callFunction({
      // 云函数名称
      name: 'create-order',
      // 传给云函数的参数
      data: {
        calculate: true,
        goodsArr: goodsArr        
      },
      success: (res) => {
        // wx.hideLoading()
        res = res.result
        if (res.success == 1) {//成功
          this.setData({
            orderPrice: res.totalPrice
          })
        } else {//失败
          console.log(res)
        }
      },
      fail: (error) => {
        // wx.hideLoading()
        console.log(error)
      }
      // fail: console.error
    })
  },
  saveOrder() {
    wx.showLoading({
      "mask": true
    })
    wx.cloud.callFunction({
      // 云函数名称
      name: 'create-order',
      // 传给云函数的参数
      data: {
        goodsArr: this.data.dataList        
      },
      success: (res) => {
        wx.hideLoading()
        res = res.result
        if (res.success == 1) {//成功
          console.log('去支付')
          // wx.showToast({
          //   icon: 'none',
          //   title: 'dfg',
          // })
        } else {//失败
          wx.showToast({
            icon: 'none',
            title: res.error.msg,
          })
        }
      },
      fail: (error) => {
        wx.hideLoading()
        console.log(error)
      }
      // fail: console.error
    })
  }
})