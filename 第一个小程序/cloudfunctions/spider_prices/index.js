const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command

// 定时触发器入口
exports.main = async (event) => {
  const today = formatDate(new Date())
  console.log(`[${today}] 开始执行价格更新任务`)

  try {
    // 获取所有配件
    const { data: components } = await db.collection('components').limit(100).get()
    console.log(`共 ${components.length} 个配件待更新`)

    let successCount = 0
    let failCount = 0

    for (const comp of components) {
      try {
        // 模拟从多平台获取价格（实际部署时替换为真实爬虫逻辑或第三方API）
        const prices = await fetchPrices(comp)

        // 写入价格历史
        await db.collection('price_history').add({
          data: {
            componentId: comp._id,
            date: today,
            prices
          }
        })

        // 更新配件的最新价格（取最低价）
        const minPrice = Math.min(...prices.map(p => p.price))
        await db.collection('components').doc(comp._id).update({
          data: {
            latestPrice: minPrice,
            priceSource: prices.find(p => p.price === minPrice).platform,
            updatedAt: new Date()
          }
        })

        successCount++
      } catch (e) {
        console.error(`更新 ${comp.name} 失败:`, e.message)
        failCount++
      }
    }

    console.log(`价格更新完成: 成功 ${successCount}, 失败 ${failCount}`)
    return { success: true, successCount, failCount, date: today }
  } catch (e) {
    console.error('价格更新任务失败:', e)
    return { success: false, error: e.message }
  }
}

/**
 * 获取配件的多平台价格
 * === 重要 ===
 * 这里是模拟逻辑，实际部署时需要替换为以下方案之一：
 * 1. 第三方比价API（如慢慢买API、什么值得买API等）
 * 2. 自建爬虫服务（需要代理IP池应对反爬）
 * 3. 通过腾讯云函数+无头浏览器爬取
 *
 * 当前逻辑：基于已有价格做 ±5% 随机波动，方便测试功能
 */
async function fetchPrices(component) {
  const basePrice = component.latestPrice || 1000

  // 模拟京东价格
  const jdPrice = Math.round(basePrice * (0.97 + Math.random() * 0.06))
  // 模拟中关村在线价格
  const zolPrice = Math.round(basePrice * (0.95 + Math.random() * 0.06))
  // 模拟淘宝价格
  const tbPrice = Math.round(basePrice * (0.96 + Math.random() * 0.05))

  return [
    { platform: '京东', price: jdPrice },
    { platform: '中关村', price: zolPrice },
    { platform: '淘宝', price: tbPrice }
  ]
}

function formatDate(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}
