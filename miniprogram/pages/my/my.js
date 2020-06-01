const app = getApp()

// miniprogram/pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: '',

    wxlogin: true,
    isAuthorized: false, // 已取得授权
    userInfo: app.globalData.userInfo
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.db = wx.cloud.database()

    this.checkAuthSetting()
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
  // 检测权限，在旧版小程序若未授权会自己弹起授权
  checkAuthSetting() {
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: (res) => {
              // if (res.userInfo) {
              //   app.globalData.userInfo = res.userInfo
              // }

              app.globalData.userInfo = res.userInfo

              this.setData({
                userInfo: app.globalData.userInfo,
                isAuthorized: true,
                avatarUrl: res.userInfo.avatarUrl,
                wxlogin: true
              })
              console.log(111, this.data)
            }
          })
        } else {
          this.setData({
            wxlogin: false,
            userInfo: {
              isLoaded: true,
            }
          })
        }
      }
    })
  },
  // 手动获取用户数据
  async bindGetUserInfoNew(e) {
    const userInfo = e.detail.userInfo

    wx.cloud.callFunction({
      // 云函数名称
      name: 'user-login-register',
      // 传给云函数的参数
      data: {
        userInfo: {...userInfo}
      },
      success: (res) => {
        app.globalData.userInfo = userInfo
        this.setData({
          userInfo: app.globalData.userInfo,
          isAuthorized: true,
          avatarUrl: userInfo.avatarUrl,
          wxlogin: true
        })
        console.log(222, this.data)
      },
      fail: console.error
    })
  },
  // // 退出登录
  // async bindLogout() {
  //   const userInfo = this.data.userInfo

  //   await this.db.collection('users').doc(userInfo._id).update({
  //     data: {
  //       expireTime: 0
  //     }
  //   })

  //   this.setUserInfo()
  // },
  // cancelLogin() {
  //   this.setData({
  //     wxlogin: true
  //   })
  // },
})