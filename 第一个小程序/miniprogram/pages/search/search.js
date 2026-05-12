Page({
  data: {
    keyword: '',
    results: [],
    searched: false,
    loading: false,
    hotTips: []
  },

  onLoad(query) {
    this.loadHotTips()
    if (query && query.keyword) {
      const keyword = decodeURIComponent(query.keyword)
      this.setData({ keyword })
      this.onSearch()
    }
  },

  loadHotTips() {
    wx.cloud.callFunction({
      name: 'get_components',
      data: { action: 'hot_tips', limit: 8 }
    }).then(res => {
      if (res.result.success) {
        this.setData({ hotTips: res.result.data })
      }
    })
  },

  onInput(e) {
    this.setData({ keyword: e.detail.value })
  },

  onSearch() {
    const keyword = this.data.keyword.trim()
    if (!keyword) return

    this.setData({ loading: true, searched: true })

    // 记录搜索日志（不阻塞搜索结果）
    wx.cloud.callFunction({
      name: 'get_components',
      data: { action: 'record_search', keyword }
    })

    wx.cloud.callFunction({
      name: 'get_components',
      data: { action: 'search', keyword, pageSize: 30 }
    }).then(res => {
      if (res.result.success) {
        this.setData({
          results: res.result.data,
          loading: false
        })
      } else {
        this.setData({ loading: false })
      }
    })
  },

  onHotTipTap(e) {
    const keyword = e.currentTarget.dataset.keyword
    this.setData({ keyword })
    this.onSearch()
  },

  onComponentTap(e) {
    const id = e.detail.id
    wx.navigateTo({ url: `/pages/component/detail?id=${id}` })
  }
})
