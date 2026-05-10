// 兼容性检查工具
// 对 components 集合中的配件进行兼容性校验

/**
 * 检查装机方案的兼容性
 * @param {Object} selected - 已选配件 {cpu: {...}, gpu: {...}, motherboard: {...}, ram: {...}}
 * @returns {Array} warnings - 不兼容警告列表 [{type, message, severity}]
 */
function checkCompatibility(selected) {
  const warnings = []

  // CPU ↔ 主板：socket 必须匹配
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

  // 内存 ↔ 主板：DDR 代数必须匹配
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

  // 功耗估算：CPU TDP + GPU TDP
  if (selected.cpu || selected.gpu) {
    const cpuTdp = (selected.cpu && selected.cpu.specs && selected.cpu.specs.tdp) || 0
    const gpuTdp = (selected.gpu && selected.gpu.specs && selected.gpu.specs.tdp) || 0
    const totalTdp = cpuTdp + gpuTdp
    const recommendedPsu = Math.ceil(totalTdp * 1.5 / 100) * 100 // 建议留50%余量，取整百

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

module.exports = { checkCompatibility }
