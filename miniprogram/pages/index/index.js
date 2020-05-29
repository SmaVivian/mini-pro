//index.js
const app = getApp()
var page = 1
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: './user-unlogin.png',

    swiperList: ['https://docs-1255840532.cos.ap-shanghai.myqcloud.com/3968.jpg'],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,

    typeList: [
      {
        picUrl: '/images/type-1.jpg',
        name: '新鲜蔬菜',
        value: '1'
      },
      {
        picUrl: '/images/type-1.jpg',
        name: '时令水果',
        value: '2'
      },
      {
        picUrl: '/images/type-1.jpg',
        name: '水产冻品',
        value: '3'
      },
      {
        picUrl: '/images/type-1.jpg',
        name: '新鲜蔬菜',
        value: '4'
      },
      {
        picUrl: '/images/type-1.jpg',
        name: '新鲜蔬菜',
        value: '5'
      },
      {
        picUrl: '/images/type-1.jpg',
        name: '新鲜蔬菜',
        value: '6'
      },
      {
        picUrl: '/images/type-1.jpg',
        name: '新鲜蔬菜',
        value: '7'
      },
      {
        picUrl: '/images/type-1.jpg',
        name: '新鲜蔬菜',
        value: '8'
      },
      {
        picUrl: '/images/type-1.jpg',
        name: '新鲜蔬菜',
        value: '9'
      },
      {
        picUrl: '/images/type-1.jpg',
        name: '新鲜蔬菜',
        value: '10'
      },
    ],

    scrollTop: null,
    tabActive: '1',
    tabList: [
      {
        text: '热卖',
        value: '1'
      },
      {
        text: '包邮到家',
        value: '2'
      },
      {
        text: '惠享生活',
        value: '3'
      },
    ],
    dataList: [],
    isTotal: false,

    activeVideoIndex: null, // 显示的视频

    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })

    // this.clearCache() //清本页缓存
    this.getDataList(true)
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
    this.clearCache()
    this.getDataList(true) //第一次加载数据
    wx.stopPullDownRefresh()  // 停止当前页面的下拉刷新
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getDataList();//后台获取新数据并追加渲染
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  // 页面滚动触发事件
  onPageScroll(e) {
    this.setData({
      scrollTop: e.scrollTop
    })
  },

  // todo dele
  handleShop() {
    // console.log(1)
    wx.setTabBarBadge({
      index: 2,
      text: '2'
    })
  },

  handleTabClick(e) {
    console.log(e.currentTarget.dataset.id)
    this.setData({
      tabActive: e.currentTarget.dataset.id
    })
    this.clearCache()
    this.getDataList(true)
  },

  handleMyFunc() {
    wx.cloud.callFunction({
      // 云函数名称
      name: 'add',
      // 传给云函数的参数
      data: {
        a: 1,
        b: 2,
      },
      success: function(res) {
        console.log(res.result.sum) // 3
      },
      fail: console.error
    })
  },
  
  // handleScroll(e) {
  //   console.log(e.detail)
  //   this.setData({
  //     scrollTop: e.detail.scrollTop
  //   })
  // },

  // 点击播放视频
  videoPlay(e){
    var _index = e.currentTarget.dataset.id
    this.setData({
      activeVideoIndex: _index
    })
    console.log(this.data.activeVideoIndex)

    //停止正在播放的视频
    this.videoContext && this.videoContext.stop()
    setTimeout(() => {
      //将点击视频进行播放
      this.videoContext = wx.createVideoContext('myVideo' + this.data.activeVideoIndex)
      this.videoContext.play()
    }, 500)
  },

  changeIndicatorDots() {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },

  clearCache() {
    page = 1
    this.setData({
      activeVideoIndex: null, // 显示的视频
      dataList: []
    })
  },

  /**
   * 获取数据
   * @param {int} pg  分页标识 默认0
   */
  getDataList(isFirst) {
    // 标题栏显示刷新图标，转圈圈
    // wx.showNavigationBarLoading()
    // wx.showLoading({
    //   title: '玩命加载中',
    // })
    // wx.showToast({
    //   title: '1',
    // })
    wx.showLoading({
      "mask": true
    })
    wx.request({
      url: 'http://bjmuseum.org.cn/admin/article/getArticleListByUniqueType.do', //仅为示例，并非真实的接口地址
      // url: 'http://wx.tj720.com/admin/AppointOrder/museumList.do', //仅为示例，并非真实的接口地址
      data: {
        currentPage: isFirst ? 1 : page,
        size: 6,
        // type: this.data.tabActive
        uniqueName: 'xslw'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        wx.hideLoading()
        res = res.data
        if (res.success == 1) {//成功
          // 这一步实现了上拉加载更多
          this.setData({
            dataList: this.data.dataList.concat(res.data)
          })
          console.log(123,this.data.dataList)
          if(page <= res.page.totalPage) {
            page++
            this.setData({
              isTotal: false
            })
          } else {
            this.setData({
              isTotal: true
            })
          }
        } else {//失败
            console.log(res)
        }
      },
      fail: (res) => {
        wx.hideLoading()
      },
      complete: (res)=> {
        // todo dele
        // this.setData({
        //   dataList: [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},]
        // })
      }
    })
    // wx.request({
    //   url: 'http://wx.tj720.com/admin/AppointOrder/areaList.do', //仅为示例，并非真实的接口地址
    //   data: {
    //     x: '',
    //     y: ''
    //   },
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success (res) {
    //     console.log(12,res.data)
    //   }
    // })
  },

  onGetUserInfo: function(e) {
    console.log(11,e)
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

  // 上传图片
  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]
        
        // 上传图片
        const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath
            
            wx.navigateTo({
              url: '../storageConsole/storageConsole'
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  },

})
