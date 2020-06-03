// miniprogram/pages/shop/shop.js
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
    this.getDataList()
    wx.removeTabBarBadge({
      index: 2
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    wx.setTabBarBadge({
      index: 2,
      text: '2'
    })
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
  changeCarNumber(e) {
    console.log(e.detail.value)
    if(e.detail.value > 10) {
      wx.showToast({
        icon: 'none',
        title: '数量超出范围',
      })
      e.detail.value = 10
    } else if(e.detail.value < 1) {
      wx.showToast({
        icon: 'none',
        title: '数量超出范围',
      })
      e.detail.value = 1
    }
    
    this.sendCartAdd('', e.currentTarget.dataset.id, e.detail.value)
  },
  handleShop(e) {
    this.sendCartAdd(e.currentTarget.dataset.type, e.currentTarget.dataset.id, '')
  },
  sendCartAdd(type, id, num) {
    wx.cloud.callFunction({
      // 云函数名称
      name: 'cart-add',
      // 传给云函数的参数
      data: {
        type: type,  // 1 加  2 减
        goodsId: id,
        num: num
      },
      success: (res) => {
        res = res.result
        if(res.success) {
          // wx.showToast({
          //   icon: 'none',
          //   title: '操作购物车成功',
          // })
          this.getDataList()
        } else {
          wx.showToast({
            icon: 'none',
            title: '操作购物车失败',
          })
        }
      },
      fail: (error) => {
        console.log(error)
      }
      // fail: console.error
    })
  }
})