Page({
  data: {
    builds: [],
    loading: false,
    isLogin: false,
    userInfo: null,
    showPhoneModal: false
  },

  onLoad() {
    var app = getApp()
    this.setData({
      isLogin: app.globalData.isLogin,
      userInfo: app.globalData.userInfo
    })
  },

  onShow() {
    var app = getApp()
    this.setData({
      isLogin: app.globalData.isLogin,
      userInfo: app.globalData.userInfo
    })
    if (app.globalData.isLogin) {
      this.loadBuilds()
    }
  },

  onLogin() {
    wx.getUserProfile({
      desc: '用于完善用户资料',
      success: (res) => {
        var userInfo = res.userInfo
        wx.setStorageSync('userInfo', userInfo)
        var app = getApp()
        app.globalData.userInfo = userInfo
        app.globalData.isLogin = true
        this.setData({
          isLogin: true,
          userInfo: userInfo
        })
        this.loadBuilds()
      },
      fail: () => {
        wx.showToast({ title: '授权已取消', icon: 'none' })
      }
    })
  },

  loadBuilds() {
    this.setData({ loading: true })
    wx.cloud.callFunction({
      name: 'manage_builds',
      data: { action: 'list' }
    }).then(res => {
      if (res.result.success) {
        this.setData({
          builds: res.result.data,
          loading: false
        })
      } else {
        this.setData({ loading: false })
      }
    }).catch(() => {
      this.setData({ loading: false })
    })
  },

  onBuildTap(e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({ url: '/pages/build/build?id=' + id })
  },

  onDelete(e) {
    var id = e.currentTarget.dataset.id
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这个装机方案吗？',
      success: (res) => {
        if (res.confirm) {
          wx.cloud.callFunction({
            name: 'manage_builds',
            data: { action: 'delete', buildId: id }
          }).then(() => {
            wx.showToast({ title: '已删除', icon: 'success' })
            this.loadBuilds()
          })
        }
      }
    })
  },

  onNewBuild() {
    wx.switchTab({ url: '/pages/build/build' })
  },

  onShowPhone() {
    this.setData({ showPhoneModal: true })
  },

  onClosePhone() {
    this.setData({ showPhoneModal: false })
  },

  onCallPhone() {
    wx.makePhoneCall({
      phoneNumber: '15737182723'
    })
  },

  onRecycleQuote() {
    wx.showToast({ title: '功能开发中', icon: 'none' })
  }
})
