// 价格曲线绘制工具
// 使用微信小程序 canvas 2D API 绘制历史价格折线图

/**
 * 绘制价格折线图
 * @param {Object} ctx - canvas 2d context
 * @param {Array} data - [{date: '05-01', price: 2999}, ...]
 * @param {Number} width - canvas 宽度
 * @param {Number} height - canvas 高度
 */
function drawPriceChart(ctx, data, width, height) {
  if (!data || data.length === 0) return

  const padding = { top: 40, right: 30, bottom: 50, left: 80 }
  const chartWidth = width - padding.left - padding.right
  const chartHeight = height - padding.top - padding.bottom

  const prices = data.map(d => d.price)
  const minPrice = Math.min(...prices) * 0.95
  const maxPrice = Math.max(...prices) * 1.05
  const priceRange = maxPrice - minPrice || 1

  // 清空画布
  ctx.clearRect(0, 0, width, height)

  // 背景
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, width, height)

  // 绘制网格线
  ctx.strokeStyle = '#f0f0f0'
  ctx.lineWidth = 1
  const gridLines = 5
  for (let i = 0; i <= gridLines; i++) {
    const y = padding.top + (chartHeight / gridLines) * i
    ctx.beginPath()
    ctx.moveTo(padding.left, y)
    ctx.lineTo(width - padding.right, y)
    ctx.stroke()

    // Y轴价格标签
    const price = maxPrice - (priceRange / gridLines) * i
    ctx.fillStyle = '#999'
    ctx.font = '20rpx sans-serif'
    ctx.textAlign = 'right'
    ctx.fillText('¥' + Math.round(price), padding.left - 10, y + 5)
  }

  // 绘制折线
  ctx.strokeStyle = '#0f3460'
  ctx.lineWidth = 2
  ctx.beginPath()
  data.forEach((d, i) => {
    const x = padding.left + (chartWidth / (data.length - 1 || 1)) * i
    const y = padding.top + chartHeight - ((d.price - minPrice) / priceRange) * chartHeight
    if (i === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  })
  ctx.stroke()

  // 绘制数据点
  ctx.fillStyle = '#0f3460'
  data.forEach((d, i) => {
    const x = padding.left + (chartWidth / (data.length - 1 || 1)) * i
    const y = padding.top + chartHeight - ((d.price - minPrice) / priceRange) * chartHeight
    ctx.beginPath()
    ctx.arc(x, y, 4, 0, Math.PI * 2)
    ctx.fill()
  })

  // 绘制 X 轴日期标签
  ctx.fillStyle = '#999'
  ctx.font = '18rpx sans-serif'
  ctx.textAlign = 'center'
  const step = Math.max(1, Math.floor(data.length / 6))
  data.forEach((d, i) => {
    if (i % step === 0 || i === data.length - 1) {
      const x = padding.left + (chartWidth / (data.length - 1 || 1)) * i
      ctx.fillText(d.date, x, height - padding.bottom + 25)
    }
  })

  // 标题
  ctx.fillStyle = '#333'
  ctx.font = 'bold 24rpx sans-serif'
  ctx.textAlign = 'left'
  ctx.fillText('历史价格走势', padding.left, 25)
}

module.exports = { drawPriceChart }
