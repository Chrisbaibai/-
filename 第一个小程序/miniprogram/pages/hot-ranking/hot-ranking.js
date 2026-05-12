Page({
  data: {
    activePeriod: 'week',
    rankingList: [],
    loading: true
  },

  onLoad() {
    this.loadRanking('week')
  },

  onPeriodChange(e) {
    const period = e.currentTarget.dataset.period
    if (period === this.data.activePeriod) return
    this.setData({ activePeriod: period })
    this.loadRanking(period)
  },

  loadRanking(period) {
    this.setData({ loading: true })
    wx.cloud.callFunction({
      name: 'get_components',
      data: { action: 'hot_ranking', period }
    }).then(res => {
      if (res.result.success) {
        this.setData({
          rankingList: res.result.data,
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

  onItemTap(e) {
    const keyword = e.currentTarget.dataset.keyword
    wx.navigateTo({ url: `/pages/search/search?keyword=${encodeURIComponent(keyword)}` })
  }
})
