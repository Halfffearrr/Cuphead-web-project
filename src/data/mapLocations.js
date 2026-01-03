/**
 * 地图位置配置文件
 * ---------------------------
 * 坐标说明：
 * x: 距离容器左侧的百分比 (0-100)
 * y: 距离容器顶部的百分比 (0-100)
 * ---------------------------
 * 关联说明：
 * Boss 位置的 'id' 必须与 bossData.js 中的 id 一致，
 * 这样点击地图图标时，才能打开正确的 Boss 详情页。
 */

export const mapLocations = [
  // --- 1. 故事书 (左上角) ---
  {
    id: 'story-book',
    x: 10,   // 靠左
    y: 15,   // 靠上
    type: 'modal', // 点击弹出模态框
    icon: '/src/assets/images/markers/icon-book.png', // 请确保有此图标
    title: '往日传说', // 鼠标悬停显示的简短标题
    component: 'StoryModal' // 对应要渲染的 Vue 组件名
  },

  // --- 2. 游戏入口 (正中央 - 核心关卡) ---
  {
    id: 'game-entrance',
    x: 50,   // 水平居中
    y: 50,   // 垂直居中
    type: 'fullscreen', // 点击可能直接跳转或全屏
    icon: '/src/assets/images/markers/icon-casino.png',
    title: '恶魔赌场',
    component: 'GameLevel'
  },

  // --- 3. Boss 位置 (分散在地图各处) ---

  // Boss A: 对应之前的 "The Root Pack"
  {
    id: 'boss-forest', // 【关键】ID 对应 bossData 中的 id
    x: 80,
    y: 25,
    type: 'modal',
    icon: '/src/assets/images/markers/icon-vegetable.png',
    title: '暴怒藤蔓',
    component: 'BossInfoModal' // 点击后显示 Boss 详情弹窗
  },

  // Boss B: 对应之前的 "Dr. Kahl's Robot"
  {
    id: 'boss-factory', // 【关键】对应 ID
    x: 20,
    y: 75,
    type: 'modal',
    icon: '/src/assets/images/markers/icon-robot.png',
    title: '铁皮巨兽',
    component: 'BossInfoModal'
  },

  // Boss C: 对应之前的 "Blind Specter"
  {
    id: 'boss-abyss', // 【关键】对应 ID
    x: 75,
    y: 80,
    type: 'modal',
    icon: '/src/assets/images/markers/icon-ghost.png',
    title: '暗影幽灵',
    component: 'BossInfoModal'
  }
];
