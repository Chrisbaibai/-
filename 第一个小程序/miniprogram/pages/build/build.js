const { checkCompatibility } = require('../../utils/compatibility.js')

const slotConfig = [
  { key: 'cpu', label: 'CPU 处理器', icon: '🧠', category: 'cpu' },
  { key: 'gpu', label: '显卡', icon: '🎮', category: 'gpu' },
  { key: 'motherboard', label: '主板', icon: '🔌', category: 'motherboard' },
  { key: 'ram', label: '内存', icon: '💾', category: 'ram' },
  { key: 'storage', label: '硬盘', icon: '💿', category: 'storage' },
  { key: 'psu', label: '电源', icon: '⚡', category: 'psu' },
  { key: 'case', label: '机箱', icon: ' ️', category: 'case' },
  { key: 'monitor', label: '显示器', icon: '🖥', category: 'monitor' }
]

Page({
  data: {
    slots: slotConfig,
    selected: {},       // {cpu: componentObj, gpu: componentObj, ...}
    warnings: [],
    totalPrice: 0,
    buildName: '',
    showPicker: false,
    pickerComponents: [],
    pickerSlotKey: '',
    pickerLoading: false
  },

  onLoad() {
    // 检查是否有从方案列表传入的编辑数据
  },

  // 点击槽位 → 打开配件选择弹窗
  onSlotSelect(e) {
    const slotKey = e.detail.slotKey
    const slot = slotConfig.find(s => s.key === slotKey)
    this.setData({ showPicker: true, pickerSlotKey: slotKey, pickerLoading: true })

    wx.cloud.callFunction({
      name: 'get_components',
      data: { action: 'list', category: slot.category, pageSize: 50 }
    }).then(res => {
      if (res.result.success) {
        this.setData({
          pickerComponents: res.result.data,
          pickerLoading: false
        })
      }
    })
  },

  // 在弹窗中选择了一个配件
  onPickerSelect(e) {
    const id = e.currentTarget.dataset.id
    const comp = this.data.pickerComponents.find(c => c._id === id)
    if (!comp) return

    const selected = { ...this.data.selected }
    selected[this.data.pickerSlotKey] = comp

    const warnings = checkCompatibility(selected)
    let totalPrice = 0
    Object.values(selected).forEach(c => { totalPrice += c.latestPrice || 0 })

    this.setData({
      selected,
      warnings,
      totalPrice,
      showPicker: false
    })
  },

  // 移除槽位配件
  onSlotRemove(e) {
    const slotKey = e.detail.slotKey
    const selected = { ...this.data.selected }
    delete selected[slotKey]

    const warnings = checkCompatibility(selected)
    let totalPrice = 0
    Object.values(selected).forEach(c => { totalPrice += c.latestPrice || 0 })

    this.setData({ selected, warnings, totalPrice })
  },

  // 关闭弹窗
  onPickerClose() {
    this.setData({ showPicker: false })
  },

  // 输入方案名称
  onNameInput(e) {
    this.setData({ buildName: e.detail.value })
  },

  // 保存方案
  onSave() {
    const { selected, totalPrice, buildName } = this.data
    if (Object.keys(selected).length === 0) {
      wx.showToast({ title: '请至少选择一个配件', icon: 'none' })
      return
    }

    const components = {}
    for (const [key, comp] of Object.entries(selected)) {
      components[key] = comp._id
    }

    wx.cloud.callFunction({
      name: 'manage_builds',
      data: {
        action: 'create',
        build: { name: buildName || '未命名方案', components }
      }
    }).then(res => {
      if (res.result.success) {
        wx.showToast({ title: '保存成功', icon: 'success' })
        this.setData({ buildName: '' })
      } else {
        wx.showToast({ title: '保存失败', icon: 'none' })
      }
    })
  },

  // 获取指定槽位的兼容性警告
  getWarningForSlot(slotKey) {
    const warnings = this.data.warnings
    const mapping = {
      cpu: ['cpu_motherboard'],
      motherboard: ['cpu_motherboard', 'ram_motherboard'],
      ram: ['ram_motherboard'],
      gpu: ['psu_wattage'],
      psu: ['psu_wattage']
    }
    const types = mapping[slotKey] || []
    const w = warnings.find(w => types.includes(w.type))
    return w || null
  }
})
