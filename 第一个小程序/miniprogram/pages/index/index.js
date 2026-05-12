const categoryLabels = {
  all: '全部', cpu: 'CPU', gpu: '显卡', motherboard: '主板',
  ram: '内存', storage: '硬盘', monitor: '显示器'
}

Page({
  data: {
    components: [],
    activeCategory: 'all',
    loading: true
  },

  onLoad() {
    this.loadComponents()
  },

  onPullDownRefresh() {
    this.loadComponents().then(() => wx.stopPullDownRefresh())
  },

  onCategoryChange(e) {
    this.setData({ activeCategory: e.detail.key })
    this.loadComponents()
  },

  loadComponents() {
    this.setData({ loading: true })
    const category = this.data.activeCategory

    return wx.cloud.callFunction({
      name: 'get_components',
      data: { action: 'list', category, pageSize: 50 }
    }).then(res => {
      if (res.result.success) {
        this.setData({
          components: res.result.data,
          loading: false
        })
      } else {
        this.setData({ loading: false })
        wx.showToast({ title: '加载失败', icon: 'none' })
      }
    }).catch(() => {
      this.setData({ loading: false })
      wx.showToast({ title: '网络错误', icon: 'none' })
    })
  },

  onComponentTap(e) {
    const id = e.detail.id
    wx.navigateTo({ url: `/pages/component/detail?id=${id}` })
  },

  onSearchTap() {
    wx.navigateTo({ url: '/pages/search/search' })
  },

  onHotRankingTap() {
    wx.navigateTo({ url: '/pages/hot-ranking/hot-ranking' })
  }
})
