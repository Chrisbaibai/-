const specLabels = {
  socket: 'CPU接口', cores: '核心数', threads: '线程数', tdp: 'TDP功耗',
  baseClock: '基础频率', boostClock: '加速频率', vram: '显存',
  chipset: '芯片组', formFactor: '板型', ddrGeneration: '内存类型',
  maxRamSpeed: '最大内存频率', capacity: '容量', speed: '频率',
  modules: '规格', type: '类型', interface: '接口',
  readSpeed: '读取速度', writeSpeed: '写入速度',
  size: '尺寸', resolution: '分辨率', refreshRate: '刷新率',
  panel: '面板类型', hdr: 'HDR支持', length: '长度(mm)'
}

Page({
  data: {
    component: null,
    priceHistory: [],
    specList: [],
    loading: true
  },

  onLoad(query) {
    this.componentId = query.id
    this.loadDetail()
  },

  loadDetail() {
    wx.cloud.callFunction({
      name: 'get_components',
      data: { action: 'detail', componentId: this.componentId }
    }).then(res => {
      if (res.result.success) {
        const comp = res.result.component
        const specList = []
        if (comp.specs) {
          for (const [key, value] of Object.entries(comp.specs)) {
            specList.push({ label: specLabels[key] || key, value: String(value) })
          }
        }

        // 处理价格历史数据用于图表
        const history = res.result.priceHistory || []
        const chartData = history.map(h => {
          const minPrice = Math.min(...h.prices.map(p => p.price))
          return { date: h.date.slice(5), price: minPrice }
        })

        this.setData({
          component: comp,
          priceHistory: history,
          specList,
          chartData,
          loading: false
        })

        // 绘制价格曲线
        if (chartData.length > 1) {
          this.drawChart(chartData)
        }
      }
    })
  },

  drawChart(data) {
    const query = wx.createSelectorQuery()
    query.select('#priceChart')
      .fields({ node: true, size: true })
      .exec(res => {
        if (!res[0]) return
        const canvas = res[0].node
        const ctx = canvas.getContext('2d')
        const dpr = wx.getSystemInfoSync().pixelRatio
        canvas.width = res[0].width * dpr
        canvas.height = res[0].height * dpr
        ctx.scale(dpr, dpr)

        // 简易折线图绘制
        const w = res[0].width
        const h = res[0].height
        const pad = { top: 50, right: 20, bottom: 40, left: 60 }
        const cw = w - pad.left - pad.right
        const ch = h - pad.top - pad.bottom

        const prices = data.map(d => d.price)
        const minP = Math.min(...prices) * 0.98
        const maxP = Math.max(...prices) * 1.02
        const range = maxP - minP || 1

        ctx.clearRect(0, 0, w, h)
        ctx.fillStyle = '#fff'
        ctx.fillRect(0, 0, w, h)

        // 网格
        ctx.strokeStyle = '#f0f0f0'
        ctx.lineWidth = 1
        for (let i = 0; i <= 4; i++) {
          const y = pad.top + (ch / 4) * i
          ctx.beginPath()
          ctx.moveTo(pad.left, y)
          ctx.lineTo(w - pad.right, y)
          ctx.stroke()
          const p = maxP - (range / 4) * i
          ctx.fillStyle = '#999'
          ctx.font = '11px sans-serif'
          ctx.textAlign = 'right'
          ctx.fillText('¥' + Math.round(p), pad.left - 8, y + 4)
        }

        // 折线
        ctx.strokeStyle = '#0f3460'
        ctx.lineWidth = 2
        ctx.beginPath()
        data.forEach((d, i) => {
          const x = pad.left + (cw / (data.length - 1 || 1)) * i
          const y = pad.top + ch - ((d.price - minP) / range) * ch
          if (i === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        })
        ctx.stroke()

        // 数据点
        ctx.fillStyle = '#0f3460'
        data.forEach((d, i) => {
          const x = pad.left + (cw / (data.length - 1 || 1)) * i
          const y = pad.top + ch - ((d.price - minP) / range) * ch
          ctx.beginPath()
          ctx.arc(x, y, 3, 0, Math.PI * 2)
          ctx.fill()
        })

        // X轴日期
        ctx.fillStyle = '#999'
        ctx.font = '10px sans-serif'
        ctx.textAlign = 'center'
        const step = Math.max(1, Math.floor(data.length / 6))
        data.forEach((d, i) => {
          if (i % step === 0 || i === data.length - 1) {
            const x = pad.left + (cw / (data.length - 1 || 1)) * i
            ctx.fillText(d.date, x, h - 10)
          }
        })

        // 标题
        ctx.fillStyle = '#333'
        ctx.font = 'bold 13px sans-serif'
        ctx.textAlign = 'left'
        ctx.fillText('历史价格走势', pad.left, 20)
      })
  }
})
