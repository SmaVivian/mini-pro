// components/navbar/navbar.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    background: {
      type: String,
      value: 'rgba(255, 255, 255, 1)'
    },
    color: {
      type: String,
      value: 'rgba(0, 0, 0, 1)'
    },
    titleText: {
      type: String,
      value: 'vivi的定制小程序'
    },
    isHome: {
      type: Boolean,
      value: false
    },

    titleImg: {
      type: String,
      value: ''
    },
    backIcon: {
      type: String,
      value: ''
    },
    homeIcon: {
      type: String,
      value: ''
    },
    fontSize: {
      type: Number,
      value: 16
    },
    iconHeight: {
      type: Number,
      value: 19
    },
    iconWidth: {
      type: Number,
      value: 58
    }
  },

  attached: function () {
    var that = this;
    that.setNavSize();
    that.setStyle();
  },

  /**
   * 组件的初始数据
   */
  data: {
    inputVal: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindinput(e) {
      this.setData({
        inputVal: e.detail.value
      })
    },
    bindconfirm(e) {
      this.setData({
        inputVal: e.detail.value
      })
      // wx.navigateTo({
      //   url: '/pages/goods/list?name=' + this.data.inputVal,
      // })
    },
    goSearch(){
      console.log(11)
      wx.navigateTo({
        url: '/pages/search/search',
      })
      // wx.navigateTo({
      //   url: '/pages/goods/list?name=' + this.data.inputVal,
      // })
    },
    // 通过获取系统信息计算导航栏高度        
    setNavSize: function () {
      var that = this,
        sysinfo = wx.getSystemInfoSync(),
        statusHeight = sysinfo.statusBarHeight,
        isiOS = sysinfo.system.indexOf('iOS') > -1,
        navHeight;
      if (!isiOS) {
        navHeight = 48;
      } else {
        navHeight = 44;
      }
      app.globalData.navTotalHeight = statusHeight + navHeight
      that.setData({
        status: statusHeight,
        navHeight: navHeight
      })
    },
    setStyle: function () {
      var that = this,
        containerStyle, textStyle, iconStyle;
      containerStyle = [
        'background:' + that.data.background
      ].join(';');
      textStyle = [
        'color:' + that.data.color,
        'font-size:' + that.data.fontSize + 'px'
      ].join(';');
      iconStyle = [
        'width: ' + that.data.iconWidth + 'px',
        'height: ' + that.data.iconHeight + 'px'
      ].join(';');
      that.setData({
        containerStyle: containerStyle,
        textStyle: textStyle,
        iconStyle: iconStyle
      })
    },
    // 返回事件        
    back: function () {
      wx.navigateBack({
        delta: 1
      })
      this.triggerEvent('back', {
        back: 1
      })
    },
    home: function () {
      this.triggerEvent('home', {});
    }
  }
})