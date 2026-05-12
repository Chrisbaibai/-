const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command

exports.main = async (event) => {
  const { action, category, keyword, page = 1, pageSize = 20, componentId } = event

  switch (action) {
    case 'list':
      return listComponents(category, page, pageSize)
    case 'search':
      return searchComponents(keyword, page, pageSize)
    case 'detail':
      return getComponentDetail(componentId)
    case 'init':
      return initDatabase()
    case 'record_search':
      return recordSearch(event)
    case 'hot_ranking':
      return getHotRanking(event.period || 'week')
    case 'hot_tips':
      return getHotTips(event.limit || 8)
    default:
      return { success: false, error: '未知操作' }
  }
}

// 按分类获取配件列表
async function listComponents(category, page, pageSize) {
  try {
    let query = db.collection('components')
    if (category && category !== 'all') {
      query = query.where({ category })
    }
    const countResult = await query.count()
    const total = countResult.total
    const { data } = await query
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .orderBy('latestPrice', 'asc')
      .get()

    return { success: true, data, total, page, pageSize }
  } catch (e) {
    return { success: false, error: e.message }
  }
}

// 搜索配件
async function searchComponents(keyword, page, pageSize) {
  try {
    const { data } = await db.collection('components')
      .where({
        name: db.RegExp({ regexp: keyword, options: 'i' })
      })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .get()

    return { success: true, data, page, pageSize }
  } catch (e) {
    return { success: false, error: e.message }
  }
}

// 获取配件详情
async function getComponentDetail(componentId) {
  try {
    const { data } = await db.collection('components').doc(componentId).get()

    // 获取最近30天价格历史
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    const dateStr = formatDate(thirtyDaysAgo)

    const { data: history } = await db.collection('price_history')
      .where({
        componentId,
        date: _.gte(dateStr)
      })
      .orderBy('date', 'asc')
      .limit(30)
      .get()

    return { success: true, component: data, priceHistory: history }
  } catch (e) {
    return { success: false, error: e.message }
  }
}

// 初始化数据库（导入种子数据）
async function initDatabase() {
  const { mockComponents } = require('./mock-data.js')
  const now = new Date()
  const today = formatDate(now)

  try {
    // 检查是否已有数据
    const { total } = await db.collection('components').count()
    if (total > 0) {
      return { success: true, message: `数据库已有 ${total} 条数据，跳过初始化` }
    }

    // 批量插入配件数据
    const results = []
    for (const comp of mockComponents) {
      const result = await db.collection('components').add({
        data: {
          ...comp,
          imageUrl: '',
          updatedAt: now
        }
      })
      results.push(result)

      // 同时写入初始价格记录
      await db.collection('price_history').add({
        data: {
          componentId: result._id,
          date: today,
          prices: [
            { platform: '京东', price: comp.latestPrice },
            { platform: '中关村', price: Math.round(comp.latestPrice * 0.98) }
          ]
        }
      })
    }

    return { success: true, message: `成功导入 ${results.length} 条配件数据` }
  } catch (e) {
    return { success: false, error: e.message }
  }
}

// 记录搜索日志
async function recordSearch(event) {
  try {
    const { keyword } = event
    if (!keyword) return { success: false, error: '关键词不能为空' }
    await db.collection('search_logs').add({
      data: {
        keyword: keyword.trim(),
        date: formatDate(new Date()),
        timestamp: new Date()
      }
    })
    return { success: true }
  } catch (e) {
    return { success: false, error: e.message }
  }
}

// 热榜排行（本周/本月/本年）
async function getHotRanking(period) {
  try {
    const startDate = getStartDate(period)
    const $ = db.command.aggregate
    const { list } = await db.collection('search_logs')
      .aggregate()
      .match({ date: $.gte(startDate) })
      .group({
        _id: '$keyword',
        count: $.sum(1)
      })
      .sort({ count: -1 })
      .limit(20)
      .end()
    const data = list.map(item => ({ keyword: item._id, count: item.count }))
    return { success: true, data }
  } catch (e) {
    return { success: false, error: e.message }
  }
}

// 热搜推荐词（今日，无数据回退7天）
async function getHotTips(limit) {
  try {
    const today = formatDate(new Date())
    const $ = db.command.aggregate
    let { list } = await db.collection('search_logs')
      .aggregate()
      .match({ date: today })
      .group({
        _id: '$keyword',
        count: $.sum(1)
      })
      .sort({ count: -1 })
      .limit(limit)
      .end()

    // 今日无数据，回退到最近7天
    if (!list || list.length === 0) {
      const startDate = getStartDate('week')
      const result = await db.collection('search_logs')
        .aggregate()
        .match({ date: $.gte(startDate) })
        .group({
          _id: '$keyword',
          count: $.sum(1)
        })
        .sort({ count: -1 })
        .limit(limit)
        .end()
      list = result.list
    }

    const data = list.map(item => ({ keyword: item._id, count: item.count }))
    return { success: true, data }
  } catch (e) {
    return { success: false, error: e.message }
  }
}

function getStartDate(period) {
  const d = new Date()
  if (period === 'week') d.setDate(d.getDate() - 7)
  else if (period === 'month') d.setDate(d.getDate() - 30)
  else if (period === 'year') d.setDate(d.getDate() - 365)
  return formatDate(d)
}

function formatDate(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}
