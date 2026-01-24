/**
 * mapLocations.js - 地图位置配置
 * 集中管理所有地图标记点数据
 */

export const mapLocations = [
  {
    id: 'story',
    x: 15,
    y: 45,
    icon: 'story',
    title: 'The Story',
    type: 'story',
    route: '/story',
    description: 'Learn the tale of Cuphead',
    unlocked: true
  },
  {
    id: 'game',
    x: 60,
    y: 40,
    icon: 'game',
    title: 'Play Game',
    type: 'game',
    route: '/game',
    description: 'Start your adventure',
    unlocked: true
  },
  {
    id: 'boss-gallery',
    x: 80,
    y: 45,
    icon: 'boss',
    title: 'Boss Gallery',
    type: 'boss',
    route: '/boss',
    description: 'View all Boss information',
    unlocked: true
  },
  {
    id: 'goopy',
    x: 35,
    y: 45,
    icon: 'skull',
    title: 'Goopy Le Grande',
    type: 'boss-point',
    route: '/boss',
    routeParams: { bossId: 1 },
    description: 'The bouncing blue slime',
    unlocked: true
  },
  {
    id: 'ribby-croaks',
    x: 70,
    y: 68,
    icon: 'skull',
    title: 'Ribby and Croaks',
    type: 'boss-point',
    route: '/boss',
    routeParams: { bossId: 2 },
    description: 'The boxing frog brothers',
    unlocked: true
  }
];

/**
 * 根据类型获取标记
 * @param {string} type - 标记类型
 */
export function getLocationsByType(type) {
  return mapLocations.filter(loc => loc.type === type);
}

/**
 * 根据 ID 获取标记
 * @param {string} id - 标记 ID
 */
export function getLocationById(id) {
  return mapLocations.find(loc => loc.id === id);
}

export default mapLocations;
