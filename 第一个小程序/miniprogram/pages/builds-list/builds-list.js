Page({
  data: {
    builds: [],
    loading: true
  },

  onShow() {
    this.loadBuilds()
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
    })
  },

  onBuildTap(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/build/build?id=${id}` })
  },

  onDelete(e) {
    const id = e.currentTarget.dataset.id
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
  }
})
