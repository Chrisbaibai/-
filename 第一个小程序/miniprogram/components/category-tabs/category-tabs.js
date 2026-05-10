Component({
  properties: {
    categories: {
      type: Array,
      value: [
        { key: 'all', label: '全部' },
        { key: 'cpu', label: 'CPU' },
        { key: 'gpu', label: '显卡' },
        { key: 'motherboard', label: '主板' },
        { key: 'ram', label: '内存' },
        { key: 'storage', label: '硬盘' },
        { key: 'monitor', label: '显示器' }
      ]
    },
    activeKey: {
      type: String,
      value: 'all'
    }
  },
  methods: {
    onTap(e) {
      const key = e.currentTarget.dataset.key
      this.setData({ activeKey: key })
      this.triggerEvent('change', { key })
    }
  }
})
