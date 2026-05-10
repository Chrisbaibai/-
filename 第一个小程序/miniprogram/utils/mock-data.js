// 种子数据 - 主流电脑配件
const mockComponents = [
  // ===== CPU =====
  {
    category: 'cpu',
    name: 'Intel Core i9-14900K',
    brand: 'Intel',
    specs: { socket: 'LGA1700', cores: 24, threads: 32, tdp: 253, baseClock: '3.2GHz', boostClock: '6.0GHz' },
    latestPrice: 4299,
    priceSource: '京东'
  },
  {
    category: 'cpu',
    name: 'Intel Core i7-14700K',
    brand: 'Intel',
    specs: { socket: 'LGA1700', cores: 20, threads: 28, tdp: 253, baseClock: '3.4GHz', boostClock: '5.6GHz' },
    latestPrice: 3199,
    priceSource: '京东'
  },
  {
    category: 'cpu',
    name: 'Intel Core i5-14600K',
    brand: 'Intel',
    specs: { socket: 'LGA1700', cores: 14, threads: 20, tdp: 181, baseClock: '3.5GHz', boostClock: '5.3GHz' },
    latestPrice: 2299,
    priceSource: '京东'
  },
  {
    category: 'cpu',
    name: 'AMD Ryzen 9 7950X',
    brand: 'AMD',
    specs: { socket: 'AM5', cores: 16, threads: 32, tdp: 170, baseClock: '4.5GHz', boostClock: '5.7GHz' },
    latestPrice: 3799,
    priceSource: '京东'
  },
  {
    category: 'cpu',
    name: 'AMD Ryzen 7 7800X3D',
    brand: 'AMD',
    specs: { socket: 'AM5', cores: 8, threads: 16, tdp: 120, baseClock: '4.2GHz', boostClock: '5.0GHz' },
    latestPrice: 2899,
    priceSource: '京东'
  },
  {
    category: 'cpu',
    name: 'AMD Ryzen 5 7600X',
    brand: 'AMD',
    specs: { socket: 'AM5', cores: 6, threads: 12, tdp: 105, baseClock: '4.7GHz', boostClock: '5.3GHz' },
    latestPrice: 1599,
    priceSource: '京东'
  },

  // ===== 显卡 =====
  {
    category: 'gpu',
    name: 'NVIDIA RTX 4090',
    brand: 'NVIDIA',
    specs: { vram: '24GB GDDR6X', tdp: 450, length: 336 },
    latestPrice: 14999,
    priceSource: '京东'
  },
  {
    category: 'gpu',
    name: 'NVIDIA RTX 4080 SUPER',
    brand: 'NVIDIA',
    specs: { vram: '16GB GDDR6X', tdp: 320, length: 310 },
    latestPrice: 8999,
    priceSource: '京东'
  },
  {
    category: 'gpu',
    name: 'NVIDIA RTX 4070 Ti SUPER',
    brand: 'NVIDIA',
    specs: { vram: '16GB GDDR6X', tdp: 285, length: 300 },
    latestPrice: 6499,
    priceSource: '京东'
  },
  {
    category: 'gpu',
    name: 'NVIDIA RTX 4070 SUPER',
    brand: 'NVIDIA',
    specs: { vram: '12GB GDDR6X', tdp: 220, length: 267 },
    latestPrice: 4999,
    priceSource: '京东'
  },
  {
    category: 'gpu',
    name: 'AMD RX 7900 XTX',
    brand: 'AMD',
    specs: { vram: '24GB GDDR6', tdp: 355, length: 287 },
    latestPrice: 7499,
    priceSource: '京东'
  },
  {
    category: 'gpu',
    name: 'NVIDIA RTX 4060 Ti',
    brand: 'NVIDIA',
    specs: { vram: '8GB GDDR6', tdp: 160, length: 240 },
    latestPrice: 3299,
    priceSource: '京东'
  },

  // ===== 主板 =====
  {
    category: 'motherboard',
    name: '华硕 ROG MAXIMUS Z790 HERO',
    brand: '华硕',
    specs: { socket: 'LGA1700', chipset: 'Z790', formFactor: 'ATX', ddrGeneration: 'DDR5', maxRamSpeed: 7800 },
    latestPrice: 4999,
    priceSource: '京东'
  },
  {
    category: 'motherboard',
    name: '微星 MAG Z790 TOMAHAWK WIFI',
    brand: '微星',
    specs: { socket: 'LGA1700', chipset: 'Z790', formFactor: 'ATX', ddrGeneration: 'DDR5', maxRamSpeed: 7200 },
    latestPrice: 2199,
    priceSource: '京东'
  },
  {
    category: 'motherboard',
    name: '华硕 ROG STRIX B650E-F GAMING WIFI',
    brand: '华硕',
    specs: { socket: 'AM5', chipset: 'B650E', formFactor: 'ATX', ddrGeneration: 'DDR5', maxRamSpeed: 6400 },
    latestPrice: 2299,
    priceSource: '京东'
  },
  {
    category: 'motherboard',
    name: '微星 MAG B650M MORTAR WIFI',
    brand: '微星',
    specs: { socket: 'AM5', chipset: 'B650', formFactor: 'mATX', ddrGeneration: 'DDR5', maxRamSpeed: 6400 },
    latestPrice: 1399,
    priceSource: '京东'
  },

  // ===== 内存 =====
  {
    category: 'ram',
    name: '芝奇 Trident Z5 DDR5 6400 32GB(16Gx2)',
    brand: '芝奇',
    specs: { ddrGeneration: 'DDR5', capacity: '32GB', speed: 6400, modules: '16GBx2' },
    latestPrice: 899,
    priceSource: '京东'
  },
  {
    category: 'ram',
    name: '海盗船 DOMINATOR PLATINUM DDR5 5600 32GB(16Gx2)',
    brand: '海盗船',
    specs: { ddrGeneration: 'DDR5', capacity: '32GB', speed: 5600, modules: '16GBx2' },
    latestPrice: 1099,
    priceSource: '京东'
  },
  {
    category: 'ram',
    name: '金士顿 FURY Beast DDR5 6000 32GB(16Gx2)',
    brand: '金士顿',
    specs: { ddrGeneration: 'DDR5', capacity: '32GB', speed: 6000, modules: '16GBx2' },
    latestPrice: 749,
    priceSource: '京东'
  },
  {
    category: 'ram',
    name: '芝奇 Trident Z5 DDR4 3600 32GB(16Gx2)',
    brand: '芝奇',
    specs: { ddrGeneration: 'DDR4', capacity: '32GB', speed: 3600, modules: '16GBx2' },
    latestPrice: 599,
    priceSource: '京东'
  },

  // ===== 硬盘 =====
  {
    category: 'storage',
    name: '三星 990 PRO 2TB NVMe SSD',
    brand: '三星',
    specs: { type: 'NVMe M.2', capacity: '2TB', interface: 'PCIe 4.0', readSpeed: 7450, writeSpeed: 6900 },
    latestPrice: 1299,
    priceSource: '京东'
  },
  {
    category: 'storage',
    name: '西部数据 SN850X 2TB NVMe SSD',
    brand: '西部数据',
    specs: { type: 'NVMe M.2', capacity: '2TB', interface: 'PCIe 4.0', readSpeed: 7300, writeSpeed: 6600 },
    latestPrice: 1199,
    priceSource: '京东'
  },
  {
    category: 'storage',
    name: '三星 990 PRO 1TB NVMe SSD',
    brand: '三星',
    specs: { type: 'NVMe M.2', capacity: '1TB', interface: 'PCIe 4.0', readSpeed: 7450, writeSpeed: 6900 },
    latestPrice: 699,
    priceSource: '京东'
  },
  {
    category: 'storage',
    name: '致态 TiPlus7100 2TB NVMe SSD',
    brand: '致态',
    specs: { type: 'NVMe M.2', capacity: '2TB', interface: 'PCIe 4.0', readSpeed: 7000, writeSpeed: 6000 },
    latestPrice: 899,
    priceSource: '京东'
  },

  // ===== 显示器 =====
  {
    category: 'monitor',
    name: '华硕 ROG Swift PG27AQN 27寸 4K 144Hz',
    brand: '华硕',
    specs: { size: 27, resolution: '3840x2160', refreshRate: 144, panel: 'IPS', hdr: 'HDR600' },
    latestPrice: 6999,
    priceSource: '京东'
  },
  {
    category: 'monitor',
    name: '戴尔 Alienware AW3423DWF 34寸 OLED',
    brand: '戴尔',
    specs: { size: 34, resolution: '3440x1440', refreshRate: 165, panel: 'QD-OLED', hdr: 'HDR True Black 400' },
    latestPrice: 7999,
    priceSource: '京东'
  },
  {
    category: 'monitor',
    name: 'LG 27GP850-B 27寸 2K 180Hz',
    brand: 'LG',
    specs: { size: 27, resolution: '2560x1440', refreshRate: 180, panel: 'Nano IPS', hdr: 'HDR400' },
    latestPrice: 2499,
    priceSource: '京东'
  },
  {
    category: 'monitor',
    name: '小米 G27Q 27寸 2K 165Hz',
    brand: '小米',
    specs: { size: 27, resolution: '2560x1440', refreshRate: 165, panel: 'IPS', hdr: '无' },
    latestPrice: 1299,
    priceSource: '京东'
  }
]

module.exports = { mockComponents }
