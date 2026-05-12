// 种子数据 - 主流电脑配件（测试用）
const mockComponents = [
  // ===== CPU (8款) =====
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
    name: 'Intel Core i7-14700KF',
    brand: 'Intel',
    specs: { socket: 'LGA1700', cores: 20, threads: 28, tdp: 253, baseClock: '3.4GHz', boostClock: '5.6GHz' },
    latestPrice: 2999,
    priceSource: '京东'
  },
  {
    category: 'cpu',
    name: 'Intel Core i5-14600KF',
    brand: 'Intel',
    specs: { socket: 'LGA1700', cores: 14, threads: 20, tdp: 181, baseClock: '3.5GHz', boostClock: '5.3GHz' },
    latestPrice: 1999,
    priceSource: '京东'
  },
  {
    category: 'cpu',
    name: 'Intel Core i5-12400F',
    brand: 'Intel',
    specs: { socket: 'LGA1700', cores: 6, threads: 12, tdp: 65, baseClock: '2.5GHz', boostClock: '4.4GHz' },
    latestPrice: 799,
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
  {
    category: 'cpu',
    name: 'AMD Ryzen 5 5600',
    brand: 'AMD',
    specs: { socket: 'AM4', cores: 6, threads: 12, tdp: 65, baseClock: '3.5GHz', boostClock: '4.4GHz' },
    latestPrice: 699,
    priceSource: '京东'
  },

  // ===== 显卡 (8款) =====
  {
    category: 'gpu',
    name: 'NVIDIA RTX 4090 24GB',
    brand: 'NVIDIA',
    specs: { vram: '24GB GDDR6X', tdp: 450, length: 336 },
    latestPrice: 14999,
    priceSource: '京东'
  },
  {
    category: 'gpu',
    name: 'NVIDIA RTX 4080 SUPER 16GB',
    brand: 'NVIDIA',
    specs: { vram: '16GB GDDR6X', tdp: 320, length: 310 },
    latestPrice: 8999,
    priceSource: '京东'
  },
  {
    category: 'gpu',
    name: 'NVIDIA RTX 4070 Ti SUPER 16GB',
    brand: 'NVIDIA',
    specs: { vram: '16GB GDDR6X', tdp: 285, length: 300 },
    latestPrice: 6499,
    priceSource: '京东'
  },
  {
    category: 'gpu',
    name: 'NVIDIA RTX 4070 SUPER 12GB',
    brand: 'NVIDIA',
    specs: { vram: '12GB GDDR6X', tdp: 220, length: 267 },
    latestPrice: 4999,
    priceSource: '京东'
  },
  {
    category: 'gpu',
    name: 'NVIDIA RTX 4060 Ti 8GB',
    brand: 'NVIDIA',
    specs: { vram: '8GB GDDR6', tdp: 160, length: 240 },
    latestPrice: 3299,
    priceSource: '京东'
  },
  {
    category: 'gpu',
    name: 'NVIDIA RTX 4060 8GB',
    brand: 'NVIDIA',
    specs: { vram: '8GB GDDR6', tdp: 115, length: 240 },
    latestPrice: 2499,
    priceSource: '京东'
  },
  {
    category: 'gpu',
    name: 'AMD RX 7900 XTX 24GB',
    brand: 'AMD',
    specs: { vram: '24GB GDDR6', tdp: 355, length: 287 },
    latestPrice: 7499,
    priceSource: '京东'
  },
  {
    category: 'gpu',
    name: 'AMD RX 7800 XT 16GB',
    brand: 'AMD',
    specs: { vram: '16GB GDDR6', tdp: 263, length: 267 },
    latestPrice: 3999,
    priceSource: '京东'
  },

  // ===== 主板 (8款) =====
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
    name: '华硕 TUF GAMING B760M-PLUS WIFI D5',
    brand: '华硕',
    specs: { socket: 'LGA1700', chipset: 'B760', formFactor: 'mATX', ddrGeneration: 'DDR5', maxRamSpeed: 7200 },
    latestPrice: 1299,
    priceSource: '京东'
  },
  {
    category: 'motherboard',
    name: '微星 PRO B660M-A WIFI DDR4',
    brand: '微星',
    specs: { socket: 'LGA1700', chipset: 'B660', formFactor: 'mATX', ddrGeneration: 'DDR4', maxRamSpeed: 4800 },
    latestPrice: 799,
    priceSource: '京东'
  },
  {
    category: 'motherboard',
    name: '华硕 ROG STRIX X670E-E GAMING WIFI',
    brand: '华硕',
    specs: { socket: 'AM5', chipset: 'X670E', formFactor: 'ATX', ddrGeneration: 'DDR5', maxRamSpeed: 6400 },
    latestPrice: 3499,
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
  {
    category: 'motherboard',
    name: '华硕 TUF GAMING B550M-PLUS WIFI II',
    brand: '华硕',
    specs: { socket: 'AM4', chipset: 'B550', formFactor: 'mATX', ddrGeneration: 'DDR4', maxRamSpeed: 4866 },
    latestPrice: 799,
    priceSource: '京东'
  },
  {
    category: 'motherboard',
    name: '技嘉 B550M AORUS ELITE',
    brand: '技嘉',
    specs: { socket: 'AM4', chipset: 'B550', formFactor: 'mATX', ddrGeneration: 'DDR4', maxRamSpeed: 4733 },
    latestPrice: 599,
    priceSource: '京东'
  },

  // ===== 内存 (6款) =====
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
    name: '光威 天策 DDR5 5600 32GB(16Gx2)',
    brand: '光威',
    specs: { ddrGeneration: 'DDR5', capacity: '32GB', speed: 5600, modules: '16GBx2' },
    latestPrice: 499,
    priceSource: '京东'
  },
  {
    category: 'ram',
    name: '芝奇 Trident Z DDR4 3600 32GB(16Gx2)',
    brand: '芝奇',
    specs: { ddrGeneration: 'DDR4', capacity: '32GB', speed: 3600, modules: '16GBx2' },
    latestPrice: 599,
    priceSource: '京东'
  },
  {
    category: 'ram',
    name: '金士顿 FURY Beast DDR4 3200 16GB(8Gx2)',
    brand: '金士顿',
    specs: { ddrGeneration: 'DDR4', capacity: '16GB', speed: 3200, modules: '8GBx2' },
    latestPrice: 299,
    priceSource: '京东'
  },

  // ===== 硬盘 (6款) =====
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
  {
    category: 'storage',
    name: '铠侠 RC20 1TB NVMe SSD',
    brand: '铠侠',
    specs: { type: 'NVMe M.2', capacity: '1TB', interface: 'PCIe 3.0', readSpeed: 2100, writeSpeed: 1700 },
    latestPrice: 399,
    priceSource: '京东'
  },
  {
    category: 'storage',
    name: '西部数据 SN770 1TB NVMe SSD',
    brand: '西部数据',
    specs: { type: 'NVMe M.2', capacity: '1TB', interface: 'PCIe 4.0', readSpeed: 5150, writeSpeed: 4900 },
    latestPrice: 499,
    priceSource: '京东'
  },

  // ===== 显示器 (6款) =====
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
  },
  {
    category: 'monitor',
    name: 'AOC 24G2SP 24寸 1080P 165Hz',
    brand: 'AOC',
    specs: { size: 24, resolution: '1920x1080', refreshRate: 165, panel: 'IPS', hdr: '无' },
    latestPrice: 799,
    priceSource: '京东'
  },
  {
    category: 'monitor',
    name: 'HKC IG27Q 27寸 2K 170Hz',
    brand: 'HKC',
    specs: { size: 27, resolution: '2560x1440', refreshRate: 170, panel: 'Fast IPS', hdr: '无' },
    latestPrice: 999,
    priceSource: '京东'
  },

  // ===== 机箱 (5款) =====
  {
    category: 'case',
    name: '联力 O11 Dynamic EVO',
    brand: '联力',
    specs: { formFactor: 'ATX', material: '钢化玻璃+铝', gpuMaxLength: 420, cpuCoolerHeight: 167 },
    latestPrice: 899,
    priceSource: '京东'
  },
  {
    category: 'case',
    name: '追风者 P600S',
    brand: '追风者',
    specs: { formFactor: 'ATX', material: '钢板+钢化玻璃', gpuMaxLength: 435, cpuCoolerHeight: 190 },
    latestPrice: 799,
    priceSource: '京东'
  },
  {
    category: 'case',
    name: '爱国者 YOGO M2 Pro',
    brand: '爱国者',
    specs: { formFactor: 'mATX', material: '钢板+钢化玻璃', gpuMaxLength: 360, cpuCoolerHeight: 160 },
    latestPrice: 299,
    priceSource: '京东'
  },
  {
    category: 'case',
    name: '先马 平头哥M1',
    brand: '先马',
    specs: { formFactor: 'mATX', material: '钢板', gpuMaxLength: 320, cpuCoolerHeight: 155 },
    latestPrice: 149,
    priceSource: '京东'
  },
  {
    category: 'case',
    name: '乔思伯 C6',
    brand: '乔思伯',
    specs: { formFactor: 'Mini-ITX', material: '铝+钢化玻璃', gpuMaxLength: 220, cpuCoolerHeight: 75 },
    latestPrice: 399,
    priceSource: '京东'
  },

  // ===== 电源 (5款) =====
  {
    category: 'psu',
    name: '海韵 PRIME TX-1000 1000W 白金全模组',
    brand: '海韵',
    specs: { wattage: 1000, efficiency: '80+ 钛金', modular: '全模组', atxVersion: 'ATX 3.0' },
    latestPrice: 1599,
    priceSource: '京东'
  },
  {
    category: 'psu',
    name: '海盗船 RM850x 850W 金牌全模组',
    brand: '海盗船',
    specs: { wattage: 850, efficiency: '80+ 金牌', modular: '全模组', atxVersion: 'ATX 2.0' },
    latestPrice: 899,
    priceSource: '京东'
  },
  {
    category: 'psu',
    name: '长城 G7 750W 金牌全模组',
    brand: '长城',
    specs: { wattage: 750, efficiency: '80+ 金牌', modular: '全模组', atxVersion: 'ATX 2.0' },
    latestPrice: 499,
    priceSource: '京东'
  },
  {
    category: 'psu',
    name: '鑫谷 GM650 650W 金牌全模组',
    brand: '鑫谷',
    specs: { wattage: 650, efficiency: '80+ 金牌', modular: '全模组', atxVersion: 'ATX 2.0' },
    latestPrice: 399,
    priceSource: '京东'
  },
  {
    category: 'psu',
    name: '先马 500M 500W 铜牌直出',
    brand: '先马',
    specs: { wattage: 500, efficiency: '80+ 铜牌', modular: '直出', atxVersion: 'ATX 2.0' },
    latestPrice: 199,
    priceSource: '京东'
  }
]

module.exports = { mockComponents }
