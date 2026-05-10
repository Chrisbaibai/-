Page({
  data: {
    keyword: '',
    results: [],
    searched: false,
    loading: false
  },

  onInput(e) {
    this.setData({ keyword: e.detail.value })
  },

  onSearch() {
    const keyword = this.data.keyword.trim()
    if (!keyword) return

    this.setData({ loading: true, searched: true })
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

  onComponentTap(e) {
    const id = e.detail.id
    wx.navigateTo({ url: `/pages/component/detail?id=${id}` })
  }
})
