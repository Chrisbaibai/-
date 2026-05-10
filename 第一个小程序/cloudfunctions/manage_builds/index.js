const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command

exports.main = async (event) => {
  const { action, buildId, build } = event
  const { OPENID } = cloud.getWXContext()

  switch (action) {
    case 'list':
      return listBuilds(OPENID)
    case 'get':
      return getBuild(buildId)
    case 'create':
      return createBuild(OPENID, build)
    case 'update':
      return updateBuild(buildId, build)
    case 'delete':
      return deleteBuild(buildId)
    default:
      return { success: false, error: '未知操作' }
  }
}

async function listBuilds(openid) {
  try {
    const { data } = await db.collection('builds')
      .where({ _openid: openid })
      .orderBy('createdAt', 'desc')
      .get()
    return { success: true, data }
  } catch (e) {
    return { success: false, error: e.message }
  }
}

async function getBuild(buildId) {
  try {
    const { data } = await db.collection('builds').doc(buildId).get()

    // 获取每个配件的详细信息
    const componentIds = Object.values(data.components).filter(Boolean)
    const componentDetails = {}

    for (const id of componentIds) {
      const { data: comp } = await db.collection('components').doc(id).get()
      if (comp) {
        // 找到这个配件属于哪个槽位
        for (const [slot, slotId] of Object.entries(data.components)) {
          if (slotId === id) {
            componentDetails[slot] = comp
          }
        }
      }
    }

    // 计算总价
    let totalPrice = 0
    for (const comp of Object.values(componentDetails)) {
      totalPrice += comp.latestPrice || 0
    }

    // 兼容性检查
    const warnings = checkCompatibility(componentDetails)

    return { success: true, build: data, componentDetails, totalPrice, warnings }
  } catch (e) {
    return { success: false, error: e.message }
  }
}

async function createBuild(openid, build) {
  try {
    // 计算总价
    const componentIds = Object.values(build.components).filter(Boolean)
    let totalPrice = 0

    for (const id of componentIds) {
      const { data: comp } = await db.collection('components').doc(id).get()
      if (comp) totalPrice += comp.latestPrice || 0
    }

    const { _id } = await db.collection('builds').add({
      data: {
        _openid: openid,
        name: build.name || '未命名方案',
        components: build.components,
        totalPrice,
        createdAt: new Date()
      }
    })

    return { success: true, buildId: _id }
  } catch (e) {
    return { success: false, error: e.message }
  }
}

async function updateBuild(buildId, build) {
  try {
    const componentIds = Object.values(build.components).filter(Boolean)
    let totalPrice = 0

    for (const id of componentIds) {
      const { data: comp } = await db.collection('components').doc(id).get()
      if (comp) totalPrice += comp.latestPrice || 0
    }

    await db.collection('builds').doc(buildId).update({
      data: {
        name: build.name,
        components: build.components,
        totalPrice,
        updatedAt: new Date()
      }
    })

    return { success: true }
  } catch (e) {
    return { success: false, error: e.message }
  }
}

async function deleteBuild(buildId) {
  try {
    await db.collection('builds').doc(buildId).remove()
    return { success: true }
  } catch (e) {
    return { success: false, error: e.message }
  }
}

// 兼容性检查（与前端 logic 一致）
function checkCompatibility(selected) {
  const warnings = []

  if (selected.cpu && selected.motherboard) {
    const cpuSocket = selected.cpu.specs && selected.cpu.specs.socket
    const mbSocket = selected.motherboard.specs && selected.motherboard.specs.socket
    if (cpuSocket && mbSocket && cpuSocket !== mbSocket) {
      warnings.push({
        type: 'cpu_motherboard',
        message: `CPU接口 (${cpuSocket}) 与主板接口 (${mbSocket}) 不兼容`,
        severity: 'error'
      })
    }
  }

  if (selected.ram && selected.motherboard) {
    const ramDDR = selected.ram.specs && selected.ram.specs.ddrGeneration
    const mbDDR = selected.motherboard.specs && selected.motherboard.specs.ddrGeneration
    if (ramDDR && mbDDR && ramDDR !== mbDDR) {
      warnings.push({
        type: 'ram_motherboard',
        message: `内存类型 (${ramDDR}) 与主板支持 (${mbDDR}) 不兼容`,
        severity: 'error'
      })
    }
  }

  if (selected.cpu || selected.gpu) {
    const cpuTdp = (selected.cpu && selected.cpu.specs && selected.cpu.specs.tdp) || 0
    const gpuTdp = (selected.gpu && selected.gpu.specs && selected.gpu.specs.tdp) || 0
    const totalTdp = cpuTdp + gpuTdp
    const recommendedPsu = Math.ceil(totalTdp * 1.5 / 100) * 100

    if (totalTdp > 0) {
      warnings.push({
        type: 'psu_wattage',
        message: `预估满载功耗约 ${totalTdp}W，建议电源功率 ≥ ${recommendedPsu}W`,
        severity: totalTdp > 500 ? 'warning' : 'info',
        totalTdp,
        recommendedPsu
      })
    }
  }

  return warnings
}
