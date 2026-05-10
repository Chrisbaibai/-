Component({
  properties: {
    item: {
      type: Object,
      value: {},
      observer: function(newVal) {
        if (newVal && newVal.specs) {
          const keys = Object.keys(newVal.specs).slice(0, 3)
          const specTags = keys.map(k => {
            const v = newVal.specs[k]
            return specLabels[k] ? specLabels[k] + ': ' + v : v
          })
          this.setData({ specTags })
        }
      }
    },
    priceChange: {
      type: Number,
      value: 0
    }
  },
  data: {
    specTags: []
  },
  methods: {
    onTap() {
      this.triggerEvent('tap', { id: this.data.item._id })
    }
  }
})

const specLabels = {
  socket: '接口',
  cores: '核心',
  threads: '线程',
  tdp: 'TDP',
  baseClock: '基础频率',
  boostClock: '加速频率',
  vram: '显存',
  chipset: '芯片组',
  formFactor: '板型',
  ddrGeneration: '内存类型',
  maxRamSpeed: '最大内存频率',
  capacity: '容量',
  speed: '频率',
  modules: '规格',
  type: '类型',
  interface: '接口',
  readSpeed: '读取速度',
  size: '尺寸',
  resolution: '分辨率',
  refreshRate: '刷新率',
  panel: '面板',
  hdr: 'HDR'
}
